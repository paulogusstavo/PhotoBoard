import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../database/database';


@Injectable()
export class DisciplinaProvider {

  constructor(private dbProvider: DatabaseProvider) { }

  //-----INSERIR-------------------------------------------------------
  public insert(disciplina: Disciplina) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'INSERT INTO disciplinas (nome, professor) VALUES (?, ?)';
        let data = [disciplina.nome, disciplina.professor];
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  //-----ATUALIZAR-----------------------------------------------------
  public update(disciplina: Disciplina) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'UPDATE disciplinas SET nome = ?, professor = ? WHERE id = ?';
        let data = [disciplina.nome, disciplina.professor, disciplina.id];
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  //-----REMOVER-------------------------------------------------------
  public remove(id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'DELETE FROM disciplinas WHERE id = ?';
        let data = [id];
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  //-----GET----------------------------------------------------------
  public get(id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'SELECT * FROM disciplinas WHERE id = ?';
        let dados = [id];

        return db.executeSql(sql, dados)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let item = data.rows.item(0);
              let disciplina = new Disciplina();
              disciplina.id = item.id;
              disciplina.nome = item.nome;
              disciplina.professor = item.professor;

              return disciplina;
            }

            return null;
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  //-----GET(ALL)----------------------------------------------------
  public getAll() {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'SELECT * FROM disciplinas';

        return db.executeSql(sql, null)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let disciplinas: any[] = [];
              for (var i = 0; i < data.rows.length; i++) {
                var disciplina = data.rows.item(i);
                disciplinas.push(disciplina);
              }
              return disciplinas;
            } else {
              return [];
            }
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }


}

export class Disciplina {
  id: number;
  nome: string;
  professor: string;
}