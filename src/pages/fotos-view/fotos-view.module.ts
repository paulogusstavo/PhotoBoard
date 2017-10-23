import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FotosViewPage } from './fotos-view';

@NgModule({
  declarations: [
    FotosViewPage,
  ],
  imports: [
    IonicPageModule.forChild(FotosViewPage),
  ],
})
export class FotosViewPageModule {}
