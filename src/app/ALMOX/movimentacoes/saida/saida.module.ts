import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { PoModule } from '@po-ui/ng-components';

import { SaidaComponent } from './saida.component';
import { AlmoxService } from '../../almox.service';
import { saidaRoutingModule } from './saida-routing.module';
import { ExcluiSaidaComponent } from './exclui-saida/exclui-saida.component';
import { AlteraSaidaComponent } from './altera-saida/altera-saida.component';
import { IncluiSaidaComponent } from './inclui-saida/inclui-saida.component';
import { VisualizaSaidaComponent } from './visualiza-saida/visualiza-saida.component';
import { ImprimeSaidaComponent } from './imprime-saida/imprime-saida.component';


@NgModule({
  imports: [
    CommonModule,
    saidaRoutingModule,
    PoModule,
    FormsModule,
    HttpClientModule,
    RouterModule
  ],
  declarations: [
    SaidaComponent,
    ExcluiSaidaComponent,
    AlteraSaidaComponent,
    VisualizaSaidaComponent,
    IncluiSaidaComponent,
    ImprimeSaidaComponent
  ],
  exports: [
    SaidaComponent
  ],
   providers: [AlmoxService],
})
export class SaidaModule { }
