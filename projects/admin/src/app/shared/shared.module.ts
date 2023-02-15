import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmPopupComponent } from './confirm-popup/confirm-popup.component';
import { MaterialModule } from '../material/material.module';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    TranslateModule.forChild({
      extend:true
    })
  ],
  exports: [MaterialModule,TranslateModule],
  declarations: [ConfirmPopupComponent]
})
export class SharedModule { }
