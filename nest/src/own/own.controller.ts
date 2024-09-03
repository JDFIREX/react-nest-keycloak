import {Controller, Get, Query, Res} from '@nestjs/common';
import axios from 'axios';
import { Response } from 'express';

// OAuth 2.0 Authorization Flows:

// 1. Standard Flow (Authorization Code Flow):
//    - Recommended for server-side applications (backend).
//    - Two-step process: obtain an authorization code, then exchange it for an access token.
//    - Secure as tokens are not exposed to the user's browser.
//    - Can use refresh tokens to maintain long-term sessions.

// 2. Implicit Flow:
//    - Designed for client-side applications (e.g., Single Page Applications - SPA).
//    - One-step process: directly obtain an access token after user authorization.
//    - Less secure as the token is exposed in the browser's URL.
//    - No refresh token available; ideal for scenarios where simplicity and speed are prioritized.

// 3. Direct Access Grants (Resource Owner Password Credentials Flow):
//    - Simplest flow where the user's credentials are directly passed to the server.
//    - The application exchanges the user's credentials for an access token.
//    - Least secure as it exposes user credentials to the application.
//    - Suitable for trusted applications or in scenarios where other flows are impractical.


@Controller('own')
export class OwnController {
    constructor() {}

    @Get("/connect/keycloak")
    async connectKeycloak(@Res() res: Response) {
        console.log('connect keycloak');
        // params
        // client_id: cms-strapi-app
        // response_type: code
            // code: Authorization Code Flow - PKCE (Proof Key for Code Exchange) Flow (recommended)
                // - https://tools.ietf.org/html/rfc7636
                // - https://openid.net/specs/openid-connect-core-1_0.html#CodeFlowAuth
                // - https://datatracker.ietf.org/doc/html/rfc6749#section-4.1
            // id_token: Implicit Flow
                // - https://openid.net/specs/openid-connect-core-1_0.html#ImplicitFlowAuth
                // - https://datatracker.ietf.org/doc/html/rfc6749#section-4.2
            // token: Implicit Flow -
        // redirect_uri: http://localhost:3001/own/connect/keycloak/callback
        // scope: openid
            // openid: required scope for OpenID Connect - https://openid.net/specs/openid-connect-core-1_0.html#ScopeClaims
            // other scopes: profile, email, address, phone, offline_access

        return res.redirect(
            'http://localhost:8088/realms/intranet-local-test/protocol/openid-connect/auth?client_id=cms-strapi-app&scope=openid&response_type=code&redirect_uri=http://localhost:3001/own/connect/keycloak/callback',
        );
    }

    @Get("/connect/keycloak/callback")
    async connectKeycloakCallback(@Res() res: Response, @Query("code") code: string) {
        console.log("callback")
        console.log(code)
        // get token from keycloak and save it to session
        // params
        // client_id: cms-strapi-app
        // grant_type: authorization_code
            // - https://tools.ietf.org/html/rfc6749#section-4.1.3
            // - https://openid.net/specs/openid-connect-core-1_0.html#TokenRequest
            // other grant_type
                // - implicit: Implicit Flow
                // - password: Resource Owner Password Credentials Flow
                // - client_credentials: Client Credentials Flow
                // - refresh_token: Refresh Token Flow
        // redirect_uri: http://localhost:3001/own/connect/keycloak/callback
        // code: <code>
        // client_secret: <client_secret>
        const token = await axios.post(
            'http://localhost:8088/realms/intranet-local-test/protocol/openid-connect/token',
            new URLSearchParams({
                client_id: 'cms-strapi-app',
                grant_type: 'authorization_code',
                code,
                redirect_uri: 'http://localhost:3001/own/connect/keycloak/callback',
                client_secret: 'zKe5GT6zFfmmcrLsVfeP982EdnrrpmsW'
            }),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            },
        ).catch((error) => {
            console.log(error)
            throw Error("Failed to get token")
        })
        console.log("token")
        console.log(JSON.stringify(token.data, null, 2))

        // get user info from keycloak
        const userInfo = await axios.get("http://localhost:8088/realms/intranet-local-test/protocol/openid-connect/userinfo", {
            headers: {
                Authorization: `Bearer ${token.data.access_token}`
            }
        })

        console.log(JSON.stringify(userInfo.data, null, 2))

        // set cookie for res
        res.cookie("token", JSON.stringify(token.data.id_token), { httpOnly: true, secure: true, sameSite: "strict" })

        // redirect to home page of my frontend app
        return res.redirect("http://localhost:3000?token=" + JSON.stringify(token.data.id_token))
    }
}
