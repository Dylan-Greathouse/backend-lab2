import { rm, mkdir } from 'fs/promises';
import { SimpleDataBase } from '../library/simpleDb';

describe('simple data structure test', () => {
  const rootDir = './__tests__/store';
    
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

  // it('it should return null if it can not get object', () => {
  //   const keeper = new SimpleDataBase(rootDir);

  //   return keeper.tell().then((message) => {
  //     expect(message).toBeNull();
  //   });
  // });



  // it('return all objects', () => {

  // });


});
