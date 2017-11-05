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
        this.inseirCategorias(db);
      })
      .catch(e => console.error(e));
  }

  //HELPERS
  private createTables(db: SQLiteObject) {
    db.sqlBatch([
      ['CREATE TABLE IF NOT EXISTS disciplinas (id INTEGER primary key AUTOINCREMENT NOT NULL, nome TEXT NOT NULL, professor TEXT)'],
      ['CREATE TABLE IF NOT EXISTS categorias (id INTEGER primary key AUTOINCREMENT NOT NULL, nome TEXT)'],
      ['CREATE TABLE IF NOT EXISTS fotos (id INTEGER primary key AUTOINCREMENT NOT NULL, img, disciplina_id integer, FOREIGN KEY(disciplina_id) REFERENCES disciplinas(id))'],
      ['CREATE TABLE IF NOT EXISTS tarefas (id INTEGER primary key AUTOINCREMENT NOT NULL, descricao TEXT, entrega NUMERIC, disciplina_id INTEGER, categoria_id INTEGER, FOREIGN KEY(disciplina_id) REFERENCES disciplinas(id), FOREIGN KEY(categoria_id) REFERENCES categorias(id))']
    ])
      .then(() => console.log('Tabelas criadas'))
      .catch(e => console.error('Erro ao criar as tabelas', e));
  }

  private inseirCategorias(db: SQLiteObject) {
    db.executeSql('SELECT COUNT(id) as qtd from categorias', {})
      .then((data: any) => {
        if (data.rows.item(0).qtd == 0) {
          db.sqlBatch([
            ['INSERT INTO categorias (nome) VALUES (?)', ['Atividade']],
            ['INSERT INTO categorias (nome) VALUES (?)', ['Trabalho']],
            ['INSERT INTO categorias (nome) VALUES (?)', ['Prova']],
          ])
            .then(() => console.log('Dados inseridos'))
            .catch(e => console.error('Erro ao incluir dados', e));
        }
      })
      .catch(e => console.error('Erro na consulta categorias', e));
  }


}
