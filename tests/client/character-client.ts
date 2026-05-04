import { APIRequestContext } from "@playwright/test";
import { CharacterListItem } from "../types/create-character-response";

export type CreateCharacterType = {
    name: string,
    classId?: number,
    speciesId?: number,
    backgroundId?: number;
};

// Função para criar uma character
export async function createCharacter(
    request: APIRequestContext, 
    token: string,
    data: CreateCharacterType,

) {

    const response = await request.post('/api/characters', {
        headers: { Authorization: 'Bearer ' + token },
        data,
    });

    console.log(await response.json());

    return response;
};

// Função p/ obter a informação de todas as characters e o id da character que quero
export async function getMyCharacter(
    request :APIRequestContext,
    token: string,
) {
    const response = await request.get('/api/characters', {
        headers: { Authorization: 'Bearer ' + token },
    });

    const allCharacters = await response.json();
    const myCharacter = allCharacters.find((char: CharacterListItem) => char.name === 'Vael Phira, The Warlock Half-elf');

    return myCharacter;
};

// Função p/ obter a minha character pelo Id
export async function getCharacterById(
    request: APIRequestContext,
    token: string,
    Id: number,
) {

    const response = await request.get('/api/characters/' + Id, {
        headers: { Authorization: 'Bearer ' + token },
    });
    
    return response;
}