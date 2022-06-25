import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './ALMOX/home/home.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  //{path: 'almox/cadastro/produto', component: ProdutoComponent},
  //{path: 'igreja', component: IgrejaComponent},
  //{path: 'saida', component: SaidaComponent},
  //{path: 'fornecedor', component: FornecedorComponent},
  //{path: 'entrada', component: EntradaComponent},
  {path: 'igreja', loadChildren: () => import('./almox/cadastro/igreja/igreja.module').then(m => m.IgrejaModule)},
  {path: 'produto', loadChildren: () => import('./almox/cadastro/produto/produto.module').then(m => m.ProdutoModule)},
  {path: 'fornecedor', loadChildren: () => import('./almox/cadastro/fornecedor/fornecedor.module').then(m => m.FornecedorModule)},
  {path: 'entrada', loadChildren: () => import('./almox/movimentacoes/entrada/entrada.module').then(m => m.EntradaModule)},
  {path: 'saida', loadChildren: () => import('./almox/movimentacoes/saida/saida.module').then(m => m.SaidaModule)},
  {path: 'inventario', loadChildren: () => import('./almox/movimentacoes/inventario/inventario.module').then(m => m.InventarioModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
