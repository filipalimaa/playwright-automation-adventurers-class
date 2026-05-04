import { CreateCharacterType } from "../client/character-client";
import { updateCharacterType } from "../types/create-character-response";

export const WARLOCK_CHAR: CreateCharacterType = {
    name: 'Vael Phira, The Warlock Half-elf',
    classId: 11,
    speciesId: 3,
    backgroundId: 4
};

export const UPDATED_WARLOCK_CHAR: updateCharacterType = {
    level: 2
}

/* export const BARBARIAN_CHAR: CreateCharacterType = {
    name: 'Conan The Barbarian',
    classId: 1,
    speciesId: 8,
    backgroundId: 16,
};

export const WIZARD_CHAR: CreateCharacterType = {
    name: 'Bruno The Wise',
    classId: 12,
    speciesId: 8,
    backgroundId: 13,
};*/