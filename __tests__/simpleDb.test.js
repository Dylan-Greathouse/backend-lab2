import { rm, readdir, mkdir } from 'fs/promises';
import { SimpleDataBase } from '../library/simpleDb';

describe('simple data structure test', () => {
  const rootDir = '../__tests__/store';
    
  beforeEach(() => {
    return rm(rootDir, { force: true, recursive: true }).then(() => {
      return mkdir(rootDir);
    });
  });

  it('save object has id', () => {

  });

  it('save and get an object', () => {

  });

  it.only('it should return null if it can not get object', () => {
    const keeper = new SimpleDataBase(rootDir);

    return keeper.tell().then((message) => {
      expect(message).toBeNull();
    });
  });



  it('return all objects', () => {

  });


});
