import { ImprimeSaidaComponent } from './imprime-saida/imprime-saida.component';
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
  { path: 'excluisaida/:id', component: ExcluiSaidaComponent },
  { path: 'alterasaida/:id', component: AlteraSaidaComponent },
  { path: 'visualsaida/:id', component: VisualizaSaidaComponent },
  { path: 'imprimesaida/:id', component: ImprimeSaidaComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class saidaRoutingModule { }
