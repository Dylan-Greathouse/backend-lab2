import { readFile, writeFile } from 'fs/promises';
// import path from 'path';
import shortid from 'shortid';


export class SimpleDataBase {
  constructor(store) {
    this.store = store;
  }

  getPath(id) {
    return `${this.store}/${id}.json`;
  }

  save(object) {
    object.id = shortid.generate();
    const stringData = JSON.stringify(object);
    return writeFile(this.getPath(object.id), stringData).then(() => {
      return object.id;
    });
  }
  get(id) {
    const letMeIn = this.getPath(id);
    return readFile(letMeIn, 'utf-8').then((result) => 
      JSON.parse(result)).catch((error) => {
      if(error) {
        return null;
      } throw error;
    });
  }
  

  
}
