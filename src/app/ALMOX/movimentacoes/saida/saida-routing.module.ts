import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AlteraSaidaComponent } from './altera-saida/altera-saida.component';
import { ExcluiSaidaComponent } from './exclui-saida/exclui-saida.component';
import { IncluiSaidaComponent } from './inclui-saida/inclui-saida.component';
import { SaidaComponent } from './saida.component';
import { VisualizaSaidaComponent } from './visualiza-saida/visualiza-saida.component';
//import { VisualizaSaidaComponent } from './visualiza-saida/visualiza-saida.component';


const routes: Routes = [
  { path: '', component: SaidaComponent },
  { path: 'incluisaida', component: IncluiSaidaComponent },
  { path: 'excluisaida', component: ExcluiSaidaComponent },
  { path: 'alterasaida', component: AlteraSaidaComponent },
  { path: 'visualsaida', component: VisualizaSaidaComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class saidaRoutingModule { }
