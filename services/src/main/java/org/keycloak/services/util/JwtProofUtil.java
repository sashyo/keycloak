package org.keycloak.services.util;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.jboss.logging.Logger;
import org.keycloak.common.ClientConnection;
import org.keycloak.common.constants.ServiceAccountConstants;
import org.keycloak.events.Errors;
import org.keycloak.events.EventBuilder;
import org.keycloak.events.admin.ResourceType;
import org.keycloak.models.*;
import org.keycloak.models.utils.KeycloakModelUtils;
import org.keycloak.protocol.oidc.OIDCLoginProtocol;
import org.keycloak.protocol.oidc.TokenManager;
import org.keycloak.representations.AccessToken;
import org.keycloak.services.Urls;
import org.keycloak.services.managers.AuthenticationManager;
import org.keycloak.services.managers.UserSessionCrossDCManager;
import org.keycloak.services.managers.UserSessionManager;
import org.keycloak.services.resources.admin.AdminEventBuilder;
import org.keycloak.services.resources.admin.ClientScopeEvaluateResource;
import org.keycloak.services.resources.admin.permissions.AdminPermissionEvaluator;
import org.keycloak.sessions.AuthenticationSessionModel;
import org.keycloak.sessions.RootAuthenticationSessionModel;
import org.keycloak.utils.OAuth2Error;

public class JwtProofUtil {

    private static final Logger logger = Logger.getLogger(JwtProofUtil.class);
    protected final RealmModel realm;
    private final AdminPermissionEvaluator auth;

    protected final ClientConnection clientConnection;

    protected final KeycloakSession session;

    public JwtProofUtil(KeycloakSession session, AdminPermissionEvaluator auth) {
        this.session = session;
        this.clientConnection = session.getContext().getConnection();
        this.auth = auth;
        this.realm = session.getContext().getRealm();

    }

    public String getJwtProof(UserModel user, ClientModel client) {
        logger.debugf("getJwtProof invoked. User: %s, Scope param: %s", user.getUsername(), "openId");

        // Set a specific client to a keycloak session. This is done, so we can get the scope for a client.
        // Clients have different scope requirement which modifies the access token that is returned.
        session.getContext().setClient(client);

        ClientScopeEvaluateResource clientScopeEvaluateResource = new ClientScopeEvaluateResource(session, session.getContext().getUri(), realm, auth, client, clientConnection);

        ObjectMapper objMapper = new ObjectMapper();
        objMapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);

        AccessToken accessToken = clientScopeEvaluateResource.generateExampleAccessToken("openId", user.getId());

        try {
            return objMapper.writeValueAsString(accessToken);

        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }
}
