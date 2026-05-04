// Este ficheiro é o que vai permitir gerar um token, a partir das credenciais do utilizador

import { APIRequestContext } from "@playwright/test";

export async function getToken( request: APIRequestContext) {

    const response = await request.post('/api/auth/token', {
        data: {
            username: process.env.USERNAME,
            password: process.env.PASSWORD,
        },
    });

    const responseToken = await response.json();

    return responseToken.token;

}