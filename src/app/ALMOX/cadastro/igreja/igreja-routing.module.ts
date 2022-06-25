import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VisualProdutoComponent } from '../produto/visual-produto/visual-produto.component';
import { AlterarIgrejaComponent } from './alterar-igreja/alterar-igreja.component';
import { ExcluirIgrejaComponent } from './excluir-igreja/excluir-igreja.component';
import { IgrejaComponent } from './igreja.component';
import { IncluirIgrejaComponent } from './incluir-igreja/incluir-igreja.component';
import { VisualIgrejaComponent } from './visual-igreja/visual-igreja.component';

const routes: Routes = [
  { path: '', component: IgrejaComponent },
  { path: 'incluirigreja', component: IncluirIgrejaComponent },
  { path: 'alterarigreja/:id', component: AlterarIgrejaComponent },
  { path: 'visualigreja/:id', component: VisualIgrejaComponent},
  { path: 'excluirigreja/:id', component: ExcluirIgrejaComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class igrejaRoutingModule { }
