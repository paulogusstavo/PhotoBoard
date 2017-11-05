import { CadastroTarefaPage } from '../cadastro-tarefa/cadastro-tarefa';
import { Tarefa, TarefaProvider } from './../../providers/tarefa/tarefa';
import { FotosProvider } from './../../providers/fotos/fotos';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-fotos-view',
  templateUrl: 'fotos-view.html',
})

export class FotosViewPage {

  // public tarefas: any = [{ "id": "1", "descricao": "Atividade_TDE 1", "entrega": "01/01/2018", "categoria_id": "1", "disciplina_id": "1" },
  // { "id": "2", "descricao": "Atividade_TDE 2", "entrega": "02/01/2018", "categoria_id": "2", "disciplina_id": "1" },
  // { "id": "3", "descricao": "Atividade_TDE 3", "entrega": "03/01/2018", "categoria_id": "3", "disciplina_id": "1" }];
  public tarefas: any = [];
  public photos: any = [];
  private nomeDisciplina: string = String();
  segment = 'fotos';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public camera: Camera,
    private fotosProvider: FotosProvider,
    private tarefaProvider: TarefaProvider,
    private alertCtrl: AlertController,
    private toast: ToastController) {

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

  //-----NOME_DISCIPLINA-------------------------------------------------------------------------------
  public getDisciplina() { return this.nomeDisciplina; }

  //-----EDITAR_TAREFA---------------------------------------------------------------------------------
  editTarefa(id: number) { this.navCtrl.push(CadastroTarefaPage, { id: id }); }


  //-----REMOVER_DISCIPLINA_ALERTA---------------------------------------------------------------------
  private removeTarefa(tarefa: Tarefa) {
    this.tarefaProvider.remove(tarefa.id)
      .then(() => {
        var index = this.tarefas.indexOf(tarefa);
        this.tarefas.splice(index, 1);
        this.toast.create(
          { message: 'Disciplina Removida.', duration: 3000, position: 'botton' }).present();
      })
  }

  alertaRemover(tarefa: Tarefa) {
    let confirm = this.alertCtrl.create({
      title: 'Deseja excluir a tarefa?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => { }
        },
        {
          text: 'EXCLUIR',
          handler: () => { this.removeTarefa(tarefa); }
        }
      ]
    });
    confirm.present();
  }

  //HELPERS
  getNomeCategoria(id: number) {
    if (id == 1) {
      return "Atividade";
    } else if (id == 2) {
      return "Trabalho";
    } else if (id == 3) {
      return "Prova";
    }
  }


}