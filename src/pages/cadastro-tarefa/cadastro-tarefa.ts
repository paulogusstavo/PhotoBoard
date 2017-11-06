import { TarefaProvider, Tarefa } from './../../providers/tarefa/tarefa';
import { CategoriaProvider } from './../../providers/categoria/categoria';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-cadastro-tarefa',
  templateUrl: 'cadastro-tarefa.html',
})
export class CadastroTarefaPage {

  categorias: any[];
  model: Tarefa;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private categoriaProvider: CategoriaProvider, private toast: ToastController,
    private tarefaProvider: TarefaProvider) {

      this.model = new Tarefa();

    //Carregar tarefa se editar.
    if (this.navParams.data.id) {
      this.tarefaProvider.get(this.navParams.data.id)
        .then((result: any) => {
          this.model = result;
        })
    }


  }

  ionViewDidLoad() {
    //Carregar as categorias do BD.
    this.categoriaProvider.getAll()
      .then((result: any[]) => {
        this.categorias = result;
      })
      .catch(() => {
        this.toast.create({ message: 'Erro ao carregar as categorias', duration: 3000, position: 'bottom' }).present();
      });
  }

  save() {
    this.saveTarefa()
      .then(() => {
        this.toast.create({ message: 'TAREFA SALVA!', duration: 3000, position: 'bottom' }).present();
        this.navCtrl.pop();
      })
      .catch(() => {
        this.toast.create({ message: 'Erro ao salvar tarefa.', duration: 3000, position: 'bottom' }).present();
      })

  }

  private saveTarefa() {
    if (this.model.id) {
      this.model.disciplina_id = this.navParams.data.disciplina;
      return this.tarefaProvider.update(this.model);
    } else {
      this.model.disciplina_id = this.navParams.data.disciplina;
      return this.tarefaProvider.insert(this.model);
    }
  }

}
