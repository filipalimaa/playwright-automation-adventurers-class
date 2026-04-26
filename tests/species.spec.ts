import { test, expect } from '@playwright/test';

const BASE_URL = 'https://adventurers-guild-api.vercel.app';

test.describe('GET /api/species', () => {

  test('Status code is 200', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/api/species`);
    expect(response.status()).toBe(200);
  });

  test('Response is an array', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/api/species`);
    const responseBody = await response.json();
    expect(Array.isArray(responseBody)).toBe(true);
  });

  test('Each species has id and name with correct types', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/api/species`);
    const responseBody = await response.json();

    for (const species of responseBody) {
      expect(typeof species.id).toBe('number');
      expect(typeof species.name).toBe('string');
      expect(species.name.length).toBeGreaterThan(0);
    }
  });

  test('Dragonborn is the first species with id 1', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/api/species`);
    const responseBody = await response.json();

    expect(responseBody[0].id).toBe(1);
    expect(responseBody[0].name).toBe('Dragonborn');
  });

  test('Species list contains Elf', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/api/species`);
    const responseBody = await response.json();

    const names = responseBody.map((s: { name: string }) => s.name);
    expect(names).toContain('Elf');
  });

  test('Species list contains Half-Elf', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/api/species`);
    const responseBody = await response.json();

    const names = responseBody.map((s: { name: string }) => s.name);
    expect(names).toContain('Half-Elf');
  });

});

test.describe('GET /api/species/:identifier', () => {

  test('Get Elf detail by id — status 200', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/api/species/3`);
    expect(response.status()).toBe(200);
  });

  test('Get Elf detail by id — validate all fields', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/api/species/3`);
    const species = await response.json();

    expect(species.id).toBe(3);
    expect(species.name).toBe('Elf');
    expect(species.slug).toBe('elf');
    expect(typeof species.description).toBe('string');
    expect(species.creatureType).toBe('Humanoid');
    expect(species.size).toBe('Medium');
    expect(typeof species.speed).toBe('number');
    expect(species.speed).toBeGreaterThan(0);
  });

  test('Get Elf detail — specialTraits is a non-empty array', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/api/species/3`);
    const species = await response.json();

    expect(Array.isArray(species.specialTraits)).toBe(true);
    expect(species.specialTraits.length).toBeGreaterThan(0);
    expect(typeof species.specialTraits[0].name).toBe('string');
    expect(typeof species.specialTraits[0].description).toBe('string');
  });

  test('Get Half-Elf detail by slug', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/api/species/half-elf`);
    const species = await response.json();

    expect(response.status()).toBe(200);
    expect(species.name).toBe('Half-Elf');
    expect(species.id).toBe(5);
    expect(typeof species.speed).toBe('number');
  });

  test('Get Dragonborn detail — subspecies is an array', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/api/species/1`);
    const species = await response.json();

    expect(response.status()).toBe(200);
    expect(Array.isArray(species.subspecies)).toBe(true);
    expect(species.subspecies.length).toBeGreaterThan(0);
    expect(typeof species.subspecies[0].name).toBe('string');
  });

  test('Invalid species returns 404', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/api/species/dragon-unicorn`);
    expect(response.status()).toBe(404);
  });

});