import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AlteraEntradaComponent } from './altera-entrada/altera-entrada.component';
import { EntradaComponent } from './entrada.component';
import { ExcluiEntradaComponent } from './exclui-entrada/exclui-entrada.component';
import { IncluiEntradaComponent } from './inclui-entrada/inclui-entrada.component';
import { VisualizaEntradaComponent } from './visualiza-entrada/visualiza-entrada.component';


const routes: Routes = [
  { path: '', component: EntradaComponent },
  { path: 'incluir', component: IncluiEntradaComponent },
  { path: 'visualentrada/:id', component: VisualizaEntradaComponent },
  { path: 'excluientrada/:id', component: ExcluiEntradaComponent },
  { path: 'alteraentrada/:id', component: AlteraEntradaComponent },
  //{ path: 'visualproduto/:id', component: VisualProdutoComponent},
  //{ path: 'excluirproduto/:id', component: ExcluirProdutoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class entradaRoutingModule { }
