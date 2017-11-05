import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { DisciplinaProvider, Disciplina } from '../../providers/disciplina/disciplina';

@IonicPage()
@Component({
  selector: 'page-cadastro-disciplina',
  templateUrl: 'cadastro-disciplina.html',
})
export class CadastroDisciplinaPage {

  model: Disciplina;

  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    private toast: ToastController, private disciplinaProvider: DisciplinaProvider,) {

    this.model = new Disciplina();

    //Carregar disciplina se editar.
    if (this.navParams.data.id) {
      this.disciplinaProvider.get(this.navParams.data.id)
        .then((result: any) => {
          this.model = result;
        })
    }

  }

  ionViewDidLoad() { }

  save() {
    this.saveDisciplina()
      .then(() => {
        this.toast.create({ message: 'Disciplina Salva.', duration: 3000, position: 'bottom' }).present();
        this.navCtrl.pop();
      })
      .catch(() => {
        this.toast.create({ message: 'Erro ao salvar disciplina.', duration: 3000, position: 'bottom' }).present();
      })

  }

  private saveDisciplina() {
    if (this.model.id) {
      return this.disciplinaProvider.update(this.model);
    } else {
      return this.disciplinaProvider.insert(this.model);
    }
  }


}
