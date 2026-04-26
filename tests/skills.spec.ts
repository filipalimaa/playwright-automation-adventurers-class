import { test, expect } from '@playwright/test';

const BASE_URL = 'https://adventurers-guild-api.vercel.app';

test.describe('GET /api/skills', () => {

  test('Status code is 200', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/api/skills`);
    expect(response.status()).toBe(200);
  });

  test('Response is an array', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/api/skills`);
    const responseBody = await response.json();
    expect(Array.isArray(responseBody)).toBe(true);
  });

  test('Each skill has id and name fields with correct types', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/api/skills`);
    const responseBody = await response.json();

    for (const skill of responseBody) {
      expect(typeof skill.id).toBe('number');
      expect(typeof skill.name).toBe('string');
      expect(skill.name.length).toBeGreaterThan(0);
    }
  });

  test('Athletics is the first skill with id 1', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/api/skills`);
    const responseBody = await response.json();

    expect(responseBody[0].id).toBe(1);
    expect(responseBody[0].name).toBe('Athletics');
  });

  test('Acrobatics is the second skill with id 2', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/api/skills`);
    const responseBody = await response.json();

    expect(responseBody[1].id).toBe(2);
    expect(responseBody[1].name).toBe('Acrobatics');
  });

  test('Skill list contains Stealth', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/api/skills`);
    const responseBody = await response.json();

    const skillNames = responseBody.map((s: { name: string }) => s.name);
    expect(skillNames).toContain('Stealth');
  });

  test('Skill list contains Perception', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/api/skills`);
    const responseBody = await response.json();

    const skillNames = responseBody.map((s: { name: string }) => s.name);
    expect(skillNames).toContain('Perception');
  });

});

test.describe('GET /api/skills/:identifier', () => {

  test('Get Athletics detail by id — status 200', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/api/skills/1`);
    expect(response.status()).toBe(200);
  });

  test('Get Athletics detail by id — validate all fields', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/api/skills/1`);
    const skill = await response.json();

    expect(skill.id).toBe(1);
    expect(skill.name).toBe('Athletics');
    expect(skill.attribute).toBe('STR');
    expect(typeof skill.description).toBe('string');
    expect(typeof skill.exampleofuse).toBe('string');
    expect(Array.isArray(skill.commonclasses)).toBe(true);
  });

  test('Get Stealth detail by slug', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/api/skills/stealth`);
    const skill = await response.json();

    expect(response.status()).toBe(200);
    expect(skill.name).toBe('Stealth');
    expect(skill.attribute).toBe('DEX');
    expect(skill.commonclasses).toContain('Rogue');
  });

  test('Get skill detail by slug — commonclasses is an array of strings', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/api/skills/1`);
    const skill = await response.json();

    for (const cls of skill.commonclasses) {
      expect(typeof cls).toBe('string');
    }
  });

  test('Invalid skill returns 404', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/api/skills/not-a-real-skill`);
    expect(response.status()).toBe(404);
  });

});