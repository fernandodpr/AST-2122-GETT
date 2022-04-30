import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CompraComponent } from './components/compra/compra.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
