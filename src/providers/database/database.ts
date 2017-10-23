import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';


@Injectable()
export class DatabaseProvider {

  constructor(private sqlite: SQLite) { }


  public getDB() {
    return this.sqlite.create({
      name: 'photoBoard.db',
      location: 'default'
    });
  }

  public createDataBase() {
    return this.getDB()
      .then((db: SQLiteObject) => {
        this.createTables(db);
      })
      .catch(e => console.error(e));
  }

  //HELPERS
  private createTables(db: SQLiteObject) {
    db.sqlBatch([
      ['CREATE TABLE IF NOT EXISTS disciplinas (id integer primary key AUTOINCREMENT NOT NULL, nome TEXT NOT NULL, professor TEXT)'],
      ['CREATE TABLE IF NOT EXISTS fotos (id integer primary key AUTOINCREMENT NOT NULL, img TEXT, disciplina_id integer, FOREIGN KEY(disciplina_id) REFERENCES disciplinas(id))']
    ])
      .then(() => console.log('Tabelas criadas'))
      .catch(e => console.error('Erro ao criar as tabelas', e));
  }

}
