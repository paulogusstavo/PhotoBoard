import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, LOCALE_ID } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { SQLite } from '@ionic-native/sqlite';
//Providers
import { DatabaseProvider } from '../providers/database/database';
import { DisciplinaProvider } from '../providers/disciplina/disciplina';
import { FotosProvider } from '../providers/fotos/fotos';
import { CadastroDisciplinaPage } from '../pages/cadastro-disciplina/cadastro-disciplina';
import { Camera } from '@ionic-native/camera';
import { FotosViewPage } from '../pages/fotos-view/fotos-view';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CadastroDisciplinaPage,
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
    FotosViewPage
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
    Camera
  ]
})
export class AppModule {}
