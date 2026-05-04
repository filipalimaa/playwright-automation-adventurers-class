import { createCharacter, getMyCharacter } from "./client/character-client";
import { getToken } from "./client/token-client";
import { expect, request, test } from '@playwright/test'
/* import { BARBARIAN_CHAR, WIZARD_CHAR } from "./data/create-character-data";*/
import { WARLOCK_CHAR } from "./data/create-character-data";

let token = '';
let characterId = 0;

test.describe.serial('Create Bruno The Barbarian', () => {

    test.beforeAll(async ({ request }) => {
        token = await getToken(request);
    });

    test('Create My Warlock Character', async ({ request }) => {

        const characterResponse = await createCharacter(
            request, 
            token, 
            WARLOCK_CHAR,
        );

        expect(characterResponse.status()).toBe(201);

        const responseBody = await characterResponse.json();
        expect(responseBody.id).toBeDefined();

    });

    /*test('Create Wizard Character Draft', async ({request}) => {

        const characterResponse = await createCharacter(
            request, 
            token, 
            WIZARD_CHAR,
        );

    });*/

    test('Get All Characters and find my Warlock Character by Name', async ({ request }) => {

        const myCharacter = await getMyCharacter(request, token);

        expect(myCharacter).toBeDefined();
        expect(myCharacter.name).toBe('Vael Phira, The Warlock Half-elf');

        characterId = myCharacter.id;
        expect(characterId).toBeGreaterThan(0);
    })



});