import { SQLiteObject } from '@ionic-native/sqlite';
import { Injectable } from '@angular/core';
import { DatabaseProvider } from './../database/database';

@Injectable()
export class CategoriaProvider {

  constructor(private dbProvider: DatabaseProvider) { }

  //-----GET(ALL)----------------------------------------------------
  public getAll() {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'SELECT * FROM categorias';

        return db.executeSql(sql, [])
          .then((data: any) => {
            if (data.rows.length > 0) {
              let categorias: any[] = [];
              for (var i = 0; i < data.rows.length; i++) {
                var categoria = data.rows.item(i);
                categorias.push(categoria);
              }
              return categorias;
            } else {
              return [];
            }
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

}

export class Categoria {
  id: number;
  nome: string;
}


