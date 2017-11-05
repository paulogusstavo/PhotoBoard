import { Injectable } from '@angular/core';
import { DatabaseProvider } from '../database/database';
import { SQLiteObject } from '@ionic-native/sqlite';
import { ToastController } from 'ionic-angular';

@Injectable()
export class FotosProvider {

  constructor(private dbProvider: DatabaseProvider, private toast: ToastController) { }

  //-----INSERIR-------------------------------------------------------
  public insert(foto: any, idDisciplina: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'INSERT INTO fotos (img, disciplina_id) VALUES (?, ?)';
        let data = [foto, idDisciplina];
        return db.executeSql(sql, data)
          .catch((e) => {
            this.toast.create(
              { message: 'ERRO 01', duration: 3000, position: 'botton' }).present();
            console.error(e)
          });
      })
      .catch((e) => {
        this.toast.create(
          { message: 'ERRO 02', duration: 3000, position: 'botton' }).present();
        console.error(e)
      });
  }

  //-----GET(ALL)------------------------------------------------------
  public getPhotos(idDisciplina: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'SELECT img FROM fotos WHERE disciplina_id = ?';
        let data = [idDisciplina];

        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let fotos: any[] = [];
              for (var i = 0; i < data.rows.length; i++) {
                var foto = data.rows.item(i);
                fotos.push(foto);
              }
              return fotos;
            } else {
              return [];
            }
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }



}