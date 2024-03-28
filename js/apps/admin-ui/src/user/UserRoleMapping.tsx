import type { RoleMappingPayload } from "@keycloak/keycloak-admin-client/lib/defs/roleRepresentation";
import { AlertVariant } from "@patternfly/react-core";
import { useTranslation } from "react-i18next";

import { adminClient } from "../admin-client";
import { useAlerts } from "../components/alert/Alerts";
import { RoleMapping, Row } from "../components/role-mapping/RoleMapping";

type UserRoleMappingProps = {
  id: string;
  name: string;
};

export const UserRoleMapping = ({ id, name }: UserRoleMappingProps) => {
  const { t } = useTranslation();
  const { addAlert, addError } = useAlerts();

  const assignRoles = async (rows: Row[]) => {
    try {
      const realmRoles = rows
        .filter((row) => row.client === undefined)
        .map((row) => row.role as RoleMappingPayload)
        .flat();
      await adminClient.users.addRealmRoleMappings({
        id,
        roles: realmRoles,
      });
      const clientIds = await Promise.all(    
          rows
            .filter((row) => row.client !== undefined)
            .map((row) => {
              const role = row.role as RoleMappingPayload
              adminClient.users.addClientRoleMappings({
                id,
                clientUniqueId: row.client!.id!,
                roles: [role],
              })
              return row.client!.id!;
            })
      );
      const uniqueClientIds = Array.from(new Set(clientIds));
      
      await adminClient.users.regenerateJwtProofs({                
        id,
        clientIds: uniqueClientIds,
      })
      addAlert(t("userRoleMappingUpdatedSuccess"), AlertVariant.success);
    } catch (error) {
      addError("roleMappingUpdatedError", error);
    }
  };

  return <RoleMapping name={name} id={id} type="users" save={assignRoles} />;
};
