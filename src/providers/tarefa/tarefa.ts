import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../database/database';

@Injectable()
export class TarefaProvider {

  constructor(private dbProvider: DatabaseProvider) { }

  //-----INSERIR-------------------------------------------------------
  public insert(tarefa: Tarefa) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'INSERT INTO tarefas (descricao, entrega, categoria_id, disciplina_id) VALUES (?, ?, ?, ?)';
        let data = [tarefa.descricao, tarefa.entrega, tarefa.categoria_id, tarefa.disciplina_id];
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  //-----ATUALIZAR-----------------------------------------------------
  public update(tarefa: Tarefa) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'UPDATE tarefas SET descricao = ?, entrega = ?, categoria_id = ?, disciplina_id = ? WHERE id = ?';
        let data = [tarefa.descricao, tarefa.entrega, tarefa.categoria_id, tarefa.disciplina_id, tarefa.id];
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  //-----REMOVER-------------------------------------------------------
  public remove(id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'DELETE FROM tarefas WHERE id = ?';
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
        let sql = 'SELECT * FROM tarefas WHERE id = ?';
        let dados = [id];

        return db.executeSql(sql, dados)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let item = data.rows.item(0);
              let tarefa = new Tarefa();
              tarefa.id = item.id;
              tarefa.descricao = item.descricao;
              tarefa.entrega = item.entrega;
              tarefa.categoria_id = item.categoria_id;
              tarefa.disciplina_id = item.categoria_id;

              return tarefa;
            }

            return null;
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  //-----GET(ALL)----------------------------------------------------
  public getAll(id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'SELECT * FROM tarefas WHERE disciplina_id = ?';
        let dados = [id];

        return db.executeSql(sql, dados)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let tarefas: any[] = [];
              for (var i = 0; i < data.rows.length; i++) {
                var tarefa = data.rows.item(i);
                tarefas.push(tarefa);
              }
              return tarefas;
            } else {
              return [];
            }
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

}

export class Tarefa {
  id: number;
  descricao: string;
  entrega: Date;
  //Foreing Keys
  categoria_id: number;
  disciplina_id: number;
}