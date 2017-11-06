import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, LOCALE_ID } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MyApp } from './app.component';

//Pages
import { FotosViewPage } from '../pages/fotos-view/fotos-view';
import { CadastroDisciplinaPage } from '../pages/cadastro-disciplina/cadastro-disciplina';
import { CadastroTarefaPage } from '../pages/cadastro-tarefa/cadastro-tarefa';
import { HomePage } from '../pages/home/home';

//Providers
import { DatabaseProvider } from '../providers/database/database';
import { DisciplinaProvider } from '../providers/disciplina/disciplina';
import { FotosProvider } from '../providers/fotos/fotos';
import { CategoriaProvider } from '../providers/categoria/categoria';
import { TarefaProvider } from '../providers/tarefa/tarefa';

//Plugin
import { SQLite } from '@ionic-native/sqlite';
import { Camera } from '@ionic-native/camera';
import { Base64 } from '@ionic-native/base64';
import { File } from '@ionic-native/file';
import { StatusBar } from '@ionic-native/status-bar';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CadastroDisciplinaPage,
    CadastroTarefaPage,
    FotosViewPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      tabsPlacement: 'top',
      backButtonText: ''
     })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CadastroDisciplinaPage,
    FotosViewPage,
    CadastroTarefaPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SQLite,
    {provide: LOCALE_ID, useValue: 'pt-BR'},
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DatabaseProvider,
    DisciplinaProvider,
    FotosProvider,
    Camera,
    Base64,
    File,
    TarefaProvider,
    CategoriaProvider,
    CadastroTarefaPage,
    StatusBar
  ]
})
export class AppModule {}
