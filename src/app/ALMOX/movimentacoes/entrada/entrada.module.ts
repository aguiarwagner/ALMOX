import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { PoModule } from '@po-ui/ng-components';

import { AlmoxService } from '../../almox.service';
import { entradaRoutingModule } from './entrada-routing.module';
import { EntradaComponent } from './entrada.component';

import { VisualizaEntradaComponent } from './visualiza-entrada/visualiza-entrada.component';
import { ExcluiEntradaComponent } from './exclui-entrada/exclui-entrada.component';
import { IncluiEntradaComponent } from './inclui-entrada/inclui-entrada.component';
import { AlteraEntradaComponent } from './altera-entrada/altera-entrada.component';



@NgModule({
  imports: [
    CommonModule,
    entradaRoutingModule,
    PoModule,
    FormsModule,
    HttpClientModule,
    RouterModule,

  ],
  declarations: [
    EntradaComponent,
    IncluiEntradaComponent,
    VisualizaEntradaComponent,
    ExcluiEntradaComponent,
    AlteraEntradaComponent
    ],
  exports: [
    EntradaComponent
  ],
  //schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
   providers: [AlmoxService],
})
export class EntradaModule { }
