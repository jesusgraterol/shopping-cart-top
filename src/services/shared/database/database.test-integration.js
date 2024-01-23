/**
 * @jest-environment jsdom
 */
import Database from './database.service.js';

// the key that will be used to store the test data
const key = 'test-database';

describe('Database CRUD Flow', () => {
  beforeAll(() => { });

  afterAll(() => { Database.delete(key) });

  beforeEach(() => { Database.delete(key) });

  afterEach(() => { });

  test('can create, read, update and delete data', () => {
    // there should be no data
    expect(Database.read(key)).toBe(undefined);

    // can store an array of items and then read them
    const testList = [ {id: 0, name: 'Johan'}, { id: 1, name: 'Carlos'} ];
    Database.write(key, testList);
    const savedList = Database.read(key);
    expect(testList).toEqual(savedList);

    // can update whatever data was initially stored
    const updatedTestList = [ {id: 0, name: 'Johan'}, { id: 1, name: 'Carlos'}, { id: 2, name: 'Joe'} ];
    Database.write(key, updatedTestList);
    const updatedSavedList = Database.read(key);
    expect(updatedTestList).toEqual(updatedSavedList);

    // can fully delete the data
    Database.delete(key)
    const deletedList = Database.read(key);
    expect(deletedList).toBe(undefined);
  });
});
