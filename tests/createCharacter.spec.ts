import { createCharacter, getMyCharacter } from "./client/character-client";
import { getToken } from "./client/token-client";
import { request, test } from '@playwright/test'
/* import { BARBARIAN_CHAR, WIZARD_CHAR } from "./data/create-character-data";*/
import { WARLOCK_CHAR } from "./data/create-character-data";

let token = '';
let characterId = 0;

test.describe.serial('Create Bruno The Barbarian', () => {

    test.beforeAll(async ({ request }) => {
        token = await getToken(request);
    });

    test('Create My Warlock Character', async ({request}) => {

        const characterResponse = await createCharacter(
            request, 
            token, 
            WARLOCK_CHAR,
        );

    });

    /*test('Create Wizard Character Draft', async ({request}) => {

        const characterResponse = await createCharacter(
            request, 
            token, 
            WIZARD_CHAR,
        );

    });*/



});