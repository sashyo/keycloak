import type KeycloakAdminClient from "@keycloak/keycloak-admin-client";
import type MappingsRepresentation from "@keycloak/keycloak-admin-client/lib/defs/mappingsRepresentation";
import type RoleRepresentation from "@keycloak/keycloak-admin-client/lib/defs/roleRepresentation";
import type { ClientScopes } from "@keycloak/keycloak-admin-client/lib/resources/clientScopes";
import type { Clients } from "@keycloak/keycloak-admin-client/lib/resources/clients";
import type { Groups } from "@keycloak/keycloak-admin-client/lib/resources/groups";
import type { Roles } from "@keycloak/keycloak-admin-client/lib/resources/roles";
import type { Users } from "@keycloak/keycloak-admin-client/lib/resources/users";

import { adminClient } from "../../admin-client";
import { Row } from "./RoleMapping";

export type ResourcesKey = keyof KeycloakAdminClient;

type DeleteFunctions =
  | keyof Pick<Groups, "delClientRoleMappings" | "delRealmRoleMappings">
  | keyof Pick<ClientScopes, "delClientScopeMappings" | "delRealmScopeMappings">
  | keyof Pick<Roles, "delCompositeRoles">;

type ListEffectiveFunction =
  | keyof Pick<Groups, "listRoleMappings" | "listAvailableRealmRoleMappings">
  | keyof Pick<
      ClientScopes,
      | "listScopeMappings"
      | "listAvailableRealmScopeMappings"
      | "listCompositeClientScopeMappings"
    >
  | keyof Pick<Roles, "getCompositeRoles" | "getCompositeRolesForClient">
  | keyof Pick<
      Users,
      "listCompositeClientRoleMappings" | "listCompositeRealmRoleMappings"
    >;

type ListAvailableFunction =
  | keyof Pick<
      Groups,
      "listAvailableClientRoleMappings" | "listAvailableRealmRoleMappings"
    >
  | keyof Pick<
      ClientScopes,
      "listAvailableClientScopeMappings" | "listAvailableRealmScopeMappings"
    >
  | keyof Pick<Roles, "find">
  | keyof Pick<Clients, "listRoles">;

type FunctionMapping = {
  delete: DeleteFunctions[];
  listAvailable: ListAvailableFunction[];
  listEffective: ListEffectiveFunction[];
};

type ResourceMapping = Partial<Record<ResourcesKey, FunctionMapping>>;
const groupFunctions: FunctionMapping = {
  delete: ["delClientRoleMappings", "delRealmRoleMappings"],
  listEffective: [
    "listRoleMappings",
    "listCompositeRealmRoleMappings",
    "listCompositeClientRoleMappings",
  ],
  listAvailable: [
    "listAvailableClientRoleMappings",
    "listAvailableRealmRoleMappings",
  ],
};

const clientFunctions: FunctionMapping = {
  delete: ["delClientScopeMappings", "delRealmScopeMappings"],
  listEffective: [
    "listScopeMappings",
    "listAvailableRealmScopeMappings",
    "listCompositeClientScopeMappings",
  ],
  listAvailable: [
    "listAvailableClientScopeMappings",
    "listAvailableRealmScopeMappings",
  ],
};

const mapping: ResourceMapping = {
  groups: groupFunctions,
  users: groupFunctions,
  clientScopes: clientFunctions,
  clients: clientFunctions,
  roles: {
    delete: ["delCompositeRoles", "delCompositeRoles"],
    listEffective: [
      "getCompositeRoles",
      "getCompositeRoles",
      "getCompositeRolesForClient",
    ],
    listAvailable: ["listRoles", "find"],
  },
};

type queryType =
  | DeleteFunctions
  | ListAvailableFunction
  | ListEffectiveFunction;

const castAdminClient = (resource: ResourcesKey) =>
  adminClient[resource] as unknown as {
    [index in queryType]: (...params: any) => Promise<RoleRepresentation[]>;
  };

const applyQuery = (
  type: ResourcesKey,
  query: queryType,
  ...params: object[]
): Promise<RoleRepresentation[]> => castAdminClient(type)[query](...params);

export const deleteMapping = (type: ResourcesKey, id: string, rows: Row[]) =>
  rows.map((row) => {
    const role = { id: row.role.id!, name: row.role.name! };
    const query = mapping[type]?.delete[row.client ? 0 : 1]!;
    console.log(mapping[type]);

    var result = applyQuery(
      type,
      query,
      {
        id,
        clientUniqueId: row.client?.id,
        client: row.client?.id,
        roles: [role],
      },
      [role],
    );
    return result
  });

/* TIDE IMPLEMENTATION START */
export const regenerateJwtProofAfterRoleDelete = async (type: ResourcesKey, id: string, rows: Row[]) => {
  const clientIds = rows
  .filter((row) => row.client !== undefined)
  .map((row) => {
    return row.client!.id!
  })
  const clientUniqueIds = Array.from(new Set(clientIds));
  console.log(type);

  if (clientUniqueIds.length > 0 || clientUniqueIds !== undefined ){
        if (type === "groups"){
          await adminClient.groups.regenerateGroupMembersJwtProofs({
            id,
            clientIds: clientUniqueIds,
          })
        }
        if (type === "users") {
          await adminClient.users.regenerateUserJwtProof({                
            id,
            clientIds: clientUniqueIds,
          })
        }
  }
};
/* TIDE IMPLEMENTATION END */

export const getMapping = async (
  type: ResourcesKey,
  id: string,
): Promise<MappingsRepresentation> => {
  const query = mapping[type]!.listEffective[0];
  const result = applyQuery(type, query, { id });
  if (type !== "roles") {
    return result as MappingsRepresentation;
  }
  const roles = await result;
  const clientRoles = await Promise.all(
    roles
      .filter((r) => r.clientRole)
      .map(async (role) => {
        const client = await adminClient.clients.findOne({
          id: role.containerId!,
        });

        role.containerId = client?.clientId;
        return { ...client, mappings: [role] };
      }),
  );

  return {
    clientMappings: clientRoles,
    realmMappings: roles.filter((r) => !r.clientRole),
  };
};

export const getEffectiveRoles = async (
  type: ResourcesKey,
  id: string,
): Promise<Row[]> => {
  const query = mapping[type]!.listEffective[1];
  if (type !== "roles") {
    return (await applyQuery(type, query, { id })).map((role) => ({
      role,
    }));
  }
  const roles = await applyQuery(type, query, { id });
  const parentRoles = await Promise.all(
    roles
      .filter((r) => r.composite)
      .map((r) => applyQuery(type, query, { id: r.id })),
  );
  return [...roles, ...parentRoles.flat()].map((role) => ({ role }));
};

export const getAvailableRoles = async (
  type: ResourcesKey,
  params: Record<string, string | number>,
): Promise<Row[]> => {
  const query = mapping[type]!.listAvailable[1];
  return (await applyQuery(type, query, params)).map((role) => ({
    role,
  }));
};

// Define a type guard function
function isDeleteFunctions(query: queryType): query is DeleteFunctions {
  // Check if query is of type DeleteFunctions
  return (
      query === "delClientRoleMappings" ||
      query === "delRealmRoleMappings" ||
      query === "delClientScopeMappings" ||
      query === "delRealmScopeMappings" ||
      query === "delCompositeRoles"
  );
}
