import { readFile, writeFile } from 'fs/promises';
import path from 'path';
import shortid from 'shortid';


export class SimpleDataBase {
  constructor(store) {
    this.ObjId = shortid.generate();
    const dataFile = `${this.ObjId}.json`;
    this.file = path.join(store, dataFile);
  }

  save(object) {
    object['id'] = this.ObjId;
    const stringData = JSON.stringify(object);
    return writeFile(this.file, stringData).then(() => {
      return this.ObjId;
    });
  }
  get(object) {
    return readFile(this.file, object).then((result) => {
      return JSON.parse(result);
    });
  }
  

  
}
