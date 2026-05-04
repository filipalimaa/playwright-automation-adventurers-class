import { test, expect } from '@playwright/test';

test.describe.serial('Character Flow Validation', () => {

    let token = '';
    let charID = 0;

    test.beforeAll(async ({ request }) => {
    const tokenResponse = await request.post(
        '/api/auth/token',
        { 
            data: { 
                username: 'filipam', 
                password: 'V3q@H8m!R5t#K1pN'
            },
        });

    expect(tokenResponse.status()).toBe(200);

    const responseBody = await tokenResponse.json();
    token = responseBody.token;
    });

    test('Character List', async ({ request }) => {
        // GET CHARACTERS
        const charactersResponse = await request.get('api/characters', { 
            headers: {Authorization: 'Bearer '+ token },
        });

        expect(charactersResponse.status()).toBe(200);
        const characterResponseBody = await charactersResponse.json();
        
        expect(typeof characterResponseBody[0].id).toBe('number');
        expect(characterResponseBody[0].id).toBe(1677);
        expect(characterResponseBody[0].name).toBe('Filipa The Barbarian');
        expect(characterResponseBody[0].status).toBe('draft');

        charID = characterResponseBody[0].id;
    });

    test('Character by ID', async ({ request }) => {
    
    const charactersIDResponse = await request.get('/api/characters/' + charID);
    });

});




