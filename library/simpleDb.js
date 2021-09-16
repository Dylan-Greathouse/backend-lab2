import { readFile, writeFile } from 'fs/promises';
import path from 'path';
import shortid from 'shortid';


export class SimpleDataBase {
  constructor(store) {
    const dataFile = `${shortid.generate()}.txt`;
    this.file = path.join(store, dataFile);
  }

  keep(object) {
    return writeFile(this.file, object);
  }

  tell() {
    return readFile(this.file, 'utf-8').catch((err) => {
      if(err.code === 'ENOENT') {
        return null;
      }
      throw err;
    });
  }

  
}
