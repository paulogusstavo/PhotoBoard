import { Component } from '@angular/core';
import { NavController, ToastController, AlertController } from 'ionic-angular';
import { DisciplinaProvider, Disciplina } from '../../providers/disciplina/disciplina'
import { CadastroDisciplinaPage } from '../cadastro-disciplina/cadastro-disciplina';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FotosProvider } from '../../providers/fotos/fotos';
import { Platform } from 'ionic-angular';
import { normalizeURL } from 'ionic-angular';
import { FotosViewPage } from '../fotos-view/fotos-view';
import { Base64 } from '@ionic-native/base64';
import { File } from '@ionic-native/file';
declare var window: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  // public disciplinas: any[] = [{"id": "1", "nome": "Programação IV", "professor": "José Eduardo Nunes Lino" },
  // {"id": "2", "nome": "Empreendedorismo", "professor": "Carlos Silla" }];
  public disciplinas: any[] = [];
  public photos: any = [];
  public imageUrl: string;

  constructor(public navCtrl: NavController,
    private toast: ToastController,
    private disciplinaProvider: DisciplinaProvider,
    private alertCtrl: AlertController,
    private camera: Camera,
    private fotoProvider: FotosProvider,
    private platform: Platform,
    private base64: Base64,
    private file: File) { }

  ionViewDidEnter() { this.getAllDisciplinas(); }

  addDisciplina() { this.navCtrl.push(CadastroDisciplinaPage); }

  editDisciplina(id: number) { this.navCtrl.push(CadastroDisciplinaPage, { id: id }); }

  itemSelecionado(id: number, nome: string) {
    this.navCtrl.push(FotosViewPage, { id: id, nome: nome });
  }

  getAllDisciplinas() {
    this.disciplinaProvider.getAll()
      .then((result: any[]) => {
        this.disciplinas = result;
      })
  }

  //-----REMOVER_DISCIPLINA_ALERTA---------------------------------------------------------------------
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
      let alert = this.alertCtrl.create();
      alert.setTitle('Selecione uma disciplina');
      for (let i = 0; i < this.disciplinas.length; i++) {
        alert.addInput({
          type: 'radio',
          label: this.disciplinas[i].nome.toString(),
          value: i.toString(),
          handler: (data) => {
            if (alert['instance']['d']['inputs'][data.value]['checked'] === false) {
              for (let i = 0; i < alert['instance']['d']['inputs'].length; i++) {
                alert['instance']['d']['inputs'][i]['checked'] = false;
              }
              alert['instance']['d']['inputs'][0]['checked'] = true;
            };
          }
        })
      }

      alert.addButton('Cancelar');
      alert.addButton({
        text: 'OK',
        handler: data => {
          var disciplina_ID = +data;
          data++;
          this.abrirCamera(data);
        }
      });

      alert.present();

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
      quality: 50,
      // destinationType: this.platform.is('ios') ? this.camera.DestinationType.FILE_URI : this.camera.DestinationType.DATA_URL,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      saveToPhotoAlbum: false
    }

    this.camera.getPicture(options)
      .then((imageData) => {
        let base64Image = 'data:image/jpeg;base64,' + imageData;

        this.fotoProvider.insert(base64Image, idDisciplina);

      }, (error) => {
        console.error(error)
        this.ionViewDidEnter();
      });
  }


}
