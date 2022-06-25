import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AlterarProdutoComponent } from './alterar-produto/alterar-produto.component';
import { ExcluirProdutoComponent } from './excluir-produto/excluir-produto.component';
import { IncluirProdutoComponent } from './incluir-produto/incluir-produto.component';
import { ProdutoComponent } from './produto.component';
import { VisualProdutoComponent } from './visual-produto/visual-produto.component';

const routes: Routes = [
  { path: '', component: ProdutoComponent },
  { path: 'incluirproduto', component: IncluirProdutoComponent },
  { path: 'alteraproduto/:id', component: AlterarProdutoComponent },
  { path: 'visualproduto/:id', component: VisualProdutoComponent},
  { path: 'excluirproduto/:id', component: ExcluirProdutoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class produtoRoutingModule { }
