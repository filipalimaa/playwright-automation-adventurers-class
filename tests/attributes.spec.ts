import { test, expect } from '@playwright/test';

test('Validate STR attribute', async ({ request }) => {
  
    const response = await request.get(
        'https://adventurers-guild-api.vercel.app/api/attributes',
    );

    const responseBody = await response.json();

    expect(response.status()).toBe(200);

    expect(responseBody[0].id).toBe(1);

    expect(responseBody[0].name).toBe('Strength');
    expect(responseBody[0].shortname).toBe('STR');
    expect(responseBody[0].description).toBe(
    'Measures physical power, carrying capacity, and effectiveness in brute-force actions such as lifting, pushing, and melee attacks.',
        );
    expect(responseBody[0].skills[0]).toBe('Athletics');
});

test('Validate DEX attribute', async ({ request }) => {
  
    const response = await request.get(
        'https://adventurers-guild-api.vercel.app/api/attributes',
    );

    const responseBody = await response.json();

    expect(response.status()).toBe(200);

    expect(responseBody[1].id).toBe(2);

    expect(responseBody[1].name).toBe('Dexterity');
    expect(responseBody[1].shortname).toBe('DEX');
    expect(responseBody[1].description).toBe(
    'Measures agility, reflexes, balance, and coordination. It affects actions that require speed, precision, and stealth.',
        );
    expect(responseBody[1].skills[0]).toBe('Acrobatics');
});

test('Validate CON attribute', async ({ request }) => {
  
    const response = await request.get(
        'https://adventurers-guild-api.vercel.app/api/attributes',
    );

    const responseBody = await response.json();

    expect(response.status()).toBe(200);

    expect(responseBody[2].id).toBe(3);

    expect(responseBody[2].name).toBe('Constitution');
    expect(responseBody[2].shortname).toBe('CON');
    expect(responseBody[2].description).toBe(
    'Measures endurance, resilience, and physical toughness. It is commonly associated with health, stamina, and resistance to harm.',
        );
    expect(responseBody[2].skills[0]).toHaveLength(0);
});

test('Validate INT attribute', async ({ request }) => {
  
    const response = await request.get(
        'https://adventurers-guild-api.vercel.app/api/attributes',
    );

    const responseBody = await response.json();

    expect(response.status()).toBe(200);

    expect(responseBody[3].id).toBe(4);

    expect(responseBody[3].name).toBe('Intelligence');
    expect(responseBody[3].shortname).toBe('INT');
    expect(responseBody[3].description).toBe(
    'Measures reasoning, memory, knowledge, and analytical ability. It is linked to learning, investigation, and logical thinking.',
        );
    expect(responseBody[3].skills[0]).toBe('Arcana');
});