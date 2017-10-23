import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadastroDisciplinaPage } from './cadastro-disciplina';

@NgModule({
  declarations: [
    CadastroDisciplinaPage,
  ],
  imports: [
    IonicPageModule.forChild(CadastroDisciplinaPage),
  ],
})
export class CadastroDisciplinaPageModule {}
