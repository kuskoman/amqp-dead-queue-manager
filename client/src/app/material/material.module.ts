import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { materialModules } from './material-modules';

@NgModule({
  imports: [CommonModule, ...materialModules],
  exports: [...materialModules],
})
export class AngularMaterialModule {}
