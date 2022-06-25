import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlterarProdutoComponent } from '../produto/alterar-produto/alterar-produto.component';
import { ExcluirProdutoComponent } from '../produto/excluir-produto/excluir-produto.component';
import { IncluirProdutoComponent } from '../produto/incluir-produto/incluir-produto.component';
import { VisualProdutoComponent } from '../produto/visual-produto/visual-produto.component';
import { AlterarFornecedorComponent } from './alterar-fornecedor/alterar-fornecedor.component';
import { ExcluirFornecedorComponent } from './excluir-fornecedor/excluir-fornecedor.component';
import { FornecedorComponent } from './fornecedor.component';
import { IncluirFornecedorComponent } from './incluir-fornecedor/incluir-fornecedor.component';
import { VisualFornecedorComponent } from './visual-fornecedor/visual-fornecedor.component';



const routes: Routes = [
  { path: '', component: FornecedorComponent },
  { path: 'incluirfornecedor', component: IncluirFornecedorComponent },
  { path: 'alterafornecedor/:id', component: AlterarFornecedorComponent },
  { path: 'visualfornecedor/:id', component: VisualFornecedorComponent},
  { path: 'excluirfornecedor/:id', component: ExcluirFornecedorComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FornecedorRoutingModule { }
