import { readFile, writeFile } from 'fs/promises';
import path from 'path';
import shortid from 'shortid';


export class SimpleDataBase {
  constructor(store) {
    this.store = store;
  }

  save(object) {
    object.id = shortid.generate();
    const stringData = JSON.stringify(object);
    return writeFile(`${this.store}/${object.id}.json`, stringData).then(() => {
      return object.id;
    });
  }
  // get(object) {
  //   const aFile = JSON.stringify(object) ;
  //   this.file = path.join(this.store, aFile);
  //   return readFile(this.file, 'utf-8').then((result) => {
  //     return JSON.parse(result);
  //   });
  // }
  

  
}
