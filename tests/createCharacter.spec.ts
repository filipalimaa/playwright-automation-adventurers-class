import { createCharacter, deleteCharacter, getCharacterById, getMyCharacter, updateCharacter } from "./client/character-client";
import { getToken } from "./client/token-client";
import { expect, request, test } from '@playwright/test'
/* import { BARBARIAN_CHAR, WIZARD_CHAR } from "./data/create-character-data";*/
import { UPDATED_WARLOCK_CHAR, WARLOCK_CHAR } from "./data/create-character-data";

let token = '';
let characterId = 0;

test.describe.serial('Create Vael Phira, The Warlock Half-elf', () => {

    test.beforeAll(async ({ request }) => {
        token = await getToken(request);
    });

    test('Create My Warlock Character', async ({ request }) => {

        const characterResponse = await createCharacter(
            request, 
            token, 
            WARLOCK_CHAR,
        );

        console.log('Status:', characterResponse.status());
        console.log('Body:', await characterResponse.json());
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
    });

    test('Get Character By Id and Validate Data', async ({ request }) => {

        const character = await getCharacterById(request, token, characterId);

        console.log('Status:', character.status());
        console.log('characterId usado:', characterId);

        const characterBody = await character.json();

        expect(characterBody.id).toBe(characterId);
        expect(characterBody.name).toBe('Vael Phira, The Warlock Half-elf');
    });

    test('Update Character', async ({ request }) => {
        
        const response = await updateCharacter(request, token, characterId, UPDATED_WARLOCK_CHAR);
        expect(response.status()).toBe(200);

        const body = await response.json();
        expect(body.level).toBe(UPDATED_WARLOCK_CHAR.level);

    });

    test('Delete Character', async ({ request }) => {
        const response = await deleteCharacter(request, token, characterId);

        expect(response.status()).toBe(200);
    });

    test('Deleted character returns 404', async ({ request }) => {
        const response = await getCharacterById(request, token, characterId);

        expect(response.status()).toBe(404);
    });

});