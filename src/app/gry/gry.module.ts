import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GryPageRoutingModule } from './gry-routing.module';

import { GryPage } from './gry.page';

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GryPageRoutingModule,
    ReactiveFormsModule, 
  ],

})
export class GryPageModule {}
