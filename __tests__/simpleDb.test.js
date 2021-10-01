import { rm, mkdir } from 'fs/promises';
import { SimpleDataBase } from '../library/simpleDb';

describe('simple data structure test', () => {
  const rootDir = './store';
    
  beforeEach(() => {
    return rm(rootDir, { force: true, recursive: true }).then(() => {
      return mkdir(rootDir);
    });
  });

  it('save object has id', () => {
    const simpleDb = new SimpleDataBase(rootDir);

    const data = {
      a: 'a',
      b: 'b'
    };

    return simpleDb
      .save(data)
      .then(() => {
        expect(data.id).toEqual(expect.any(String));
      });
  });

  it('save and get an object', () => {
    const simpleDb = new SimpleDataBase(rootDir);

    const data = {
      a: 'a',
      b: 'b'
    };


    return simpleDb
      .save(data).then((object) => {
        return simpleDb.get(object).then((result) => {
          expect(result).toEqual({ a: 'a', b: 'b', id: expect.any(String) });
        });
      });   
  });

  it('it should return null if it can not get object', () => {
    const simpleDb = new SimpleDataBase(rootDir);
    const data = {
      a: 666
    };
    


    return simpleDb
      .get(data).then((nullRes) => {
        expect(nullRes).toBe(null);
      });
      
  });



  it('return all objects', async () => {
    const simpleDb = new SimpleDataBase(rootDir);
    const data1 = {
      a: 'a',
      b: 'b'
    };

    const data2 = {
      a: 'a',
      b: 'b'
    };
    const lordyPlease = [data1, data2];
    await Promise.all(lordyPlease.map((item) => {
      return simpleDb.save(item);
    }));
    return simpleDb
      .getAll(lordyPlease).then((result) => {
        expect(result).toEqual(expect.arrayContaining([data1, data2]));
      });
  });


});
