import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { DatabaseProvider } from '../providers/database/database';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = null;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, dbProvider: DatabaseProvider) {
    platform.ready().then(() => {

      statusBar.styleDefault();

      //Criar o banco de dados (Antes de iniciar a pagina inicial)
      dbProvider.createDataBase()
        .then(() => {
          // fechando a SplashScreen somente quando o banco for criado
          this.homePage(splashScreen);
        })
        .catch(() => {
          // ou se houver erro na criação do banco
          this.homePage(splashScreen);
        });
    });

  }

  private homePage(splashScreen: SplashScreen) {
    splashScreen.hide();
    this.rootPage = HomePage;
  }

}

