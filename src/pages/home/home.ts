import { Component } from '@angular/core';
import { NavController, ToastController, AlertController } from 'ionic-angular';
import { DisciplinaProvider, Disciplina } from '../../providers/disciplina/disciplina'
import { CadastroDisciplinaPage } from '../cadastro-disciplina/cadastro-disciplina';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FotosProvider } from '../../providers/fotos/fotos';
import { Platform } from 'ionic-angular';
import { normalizeURL } from 'ionic-angular';
import { FotosViewPage } from '../fotos-view/fotos-view'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  // public disciplinas: any[] = [{"nome":"Programacao IV", "professor":"Jose Lino"}, {"nome":"Programacao IV", "professor":"Jose Lino"}];
  public disciplinas: any[] = [];
  public photos: any = [];

  constructor(public navCtrl: NavController,
    private toast: ToastController,
    private disciplinaProvider: DisciplinaProvider,
    private alertCtrl: AlertController,
    private camera: Camera,
    private fotoProvider: FotosProvider,
    private platform: Platform) { }

  ionViewDidEnter() { this.getAllDisciplinas(); }

  addDisciplina() { this.navCtrl.push(CadastroDisciplinaPage); }

  editDisciplina(id: number) { this.navCtrl.push(CadastroDisciplinaPage, { id: id }); }

  itemSelecionado(id: number, nome: string) {
    this.toast.create({ message: 'ENTROU ITEM- ' + id, duration: 3000, position: 'botton' }).present();
    this.navCtrl.push(FotosViewPage, { id: id, nome: nome });
  }

  getAllDisciplinas() {
    this.disciplinaProvider.getAll()
      .then((result: any[]) => {
        this.disciplinas = result;
      })
  }

  //-----REMOVER_DISCIPLINA---------------------------------------------------------------------
  private removeDisciplina(disciplina: Disciplina) {
    this.disciplinaProvider.remove(disciplina.id)
      .then(() => {
        var index = this.disciplinas.indexOf(disciplina);
        this.disciplinas.splice(index, 1);
        this.toast.create(
          { message: 'Disciplina Removida.', duration: 3000, position: 'botton' }).present();
      })
  }

  alertaRemover(disciplina: Disciplina) {
    let confirm = this.alertCtrl.create({
      title: 'Deseja realmente excluir?',
      message: 'Ao excluir a disciplina, todas as fotos também serão excluidas!',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => { }
        },
        {
          text: 'EXCLUIR',
          handler: () => { this.removeDisciplina(disciplina); }
        }
      ]
    });
    confirm.present();
  }


  //-----NOVA_FOTO----------------------------------------------------------------------------
  novaFoto() {
    if (this.disciplinas.length == 0) { //Não possui disciplinas cadastradas.
      this.alertaNovaFoto();
    } else //Possui disciplinas cadastradas.
    {
      this.abrirCamera(1);
    }

  }

  private alertaNovaFoto() {
    let confirm = this.alertCtrl.create({
      title: 'Nenhuma disciplina encontrada!',
      message: 'Para tirar fotos, é necessário ter ao menos uma disciplina cadastrada!',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => { }
        },
        {
          text: 'Cadastrar',
          handler: () => { this.addDisciplina(); }
        }
      ]
    });
    confirm.present();
  }

  //-----CHAMAR_CAMERA--------------------------------------------------------------------------
  abrirCamera(idDisciplina: number) { //Abrir e Salvar foto no banco.

    const options: CameraOptions = {
      quality: 50, //Verificação da plataforma. (Necessário, pois ios com problemas.)
      // destinationType: this.platform.is('ios') ? this.camera.DestinationType.FILE_URI : this.camera.DestinationType.DATA_URL,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      saveToPhotoAlbum: false
    }

    this.camera.getPicture(options)
      .then((imageData) => {
        let base64Image = null;
        // if (this.platform.is('ios'))
        //   base64Image = normalizeURL(imageData);
        // else
        base64Image = "data:image/jpeg;base64," + imageData;

        //Salvar fotos no banco interno.
        this.addPhoto(base64Image);
        this.fotoProvider.insert(base64Image, idDisciplina);

      }, (error) => {
        console.error(error)
        this.ionViewDidEnter();
      });
  }

  addPhoto(photo) {
    this.photos.push(photo);
    this.photos.reverse();
}


}
