import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesModule } from './pages/pages.module';
import { SharedComponentsModule } from './shared/shared.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, SharedComponentsModule, PagesModule],
  exports: [SharedComponentsModule],
})
export class ComponentsModule {}
