import { readFile, writeFile, readdir } from 'fs/promises';
import path from 'path';
// import path from 'path';
import shortid from 'shortid';

export class SimpleDataBase {
  constructor(store) {
    this.store = store;
  }

  getAllPaths() {
    return `${this.store}.json`;
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
    return readFile(letMeIn, 'utf-8')
      .then((result) => JSON.parse(result))
      .catch((error) => {
        if (error) {
          return null;
        }
        throw error;
      });
  }
  getAll() {
    return readdir(this.store).then((results) => {
      return Promise.all(
        results.map((item) => {
          return path.join(this.store, item);
        })
      ).then((welp) => {
        return Promise.all(
          welp.map((omg) => {
            return readFile(omg, 'utf-8').then((itneverends) => {
              return JSON.parse(itneverends);
            });
          })
        );
      });
    });
  }
}
