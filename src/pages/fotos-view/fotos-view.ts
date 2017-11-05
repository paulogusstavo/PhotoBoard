import { CadastroTarefaPage } from '../cadastro-tarefa/cadastro-tarefa';
import { Tarefa, TarefaProvider } from './../../providers/tarefa/tarefa';
import { FotosProvider } from './../../providers/fotos/fotos';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-fotos-view',
  templateUrl: 'fotos-view.html',
})
export class FotosViewPage {

  public photos: any = [];
  public tarefas: any = [];
  private nomeDisciplina: string = String();
  segment = 'fotos';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public camera: Camera,
    private fotosProvider: FotosProvider,
    private tarefaProvider: TarefaProvider) {

    //Carrega nome da disciplina.
    this.nomeDisciplina = this.navParams.data.nome;

    //Carregar fotos do banco.
    fotosProvider.getPhotos(navParams.data.id)
      .then((result: any) => {
        this.photos = result;
      });

  }

  ionViewDidEnter() { this.getAllTarefas(); }

  getAllTarefas() {
    this.tarefaProvider.getAll(this.navParams.data.id)
    .then((result: any[]) => {
      this.tarefas = result;
    });
  }

  addTarefa() { this.navCtrl.push(CadastroTarefaPage, { disciplina: this.navParams.data.id }); }

  //-----NOME_DISCIPLINA-----------------------------------------------
  public getDisciplina() { return this.nomeDisciplina; }





}
