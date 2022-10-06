import { IncluiInventarioComponent } from './inclui-inventario/inclui-inventario.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventarioComponent } from './inventario.component';



const routes: Routes = [
  { path: '', component: InventarioComponent },
  { path: 'incluiinventario', component: IncluiInventarioComponent },
  //{ path: 'alteraproduto/:id', component: AlterarProdutoComponent },
  //{ path: 'visualproduto/:id', component: VisualProdutoComponent},
  //{ path: 'excluirproduto/:id', component: ExcluirProdutoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class inventarioRoutingModule { }
