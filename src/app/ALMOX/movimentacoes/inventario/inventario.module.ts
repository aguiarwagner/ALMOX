import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { PoModule } from '@po-ui/ng-components';

import { AlmoxService } from '../../almox.service';
import { inventarioRoutingModule } from './inventario-routing.module';
import { InventarioComponent } from './inventario.component';
import { IncluiInventarioComponent } from './inclui-inventario/inclui-inventario.component';
import { AlteraInventarioComponent } from './altera-inventario/altera-inventario.component';
import { ExcluiInventarioComponent } from './exclui-inventario/exclui-inventario.component';
import { VisualizaInventarioComponent } from './visualiza-inventario/visualiza-inventario.component';


@NgModule({
  imports: [
    CommonModule,
    inventarioRoutingModule,
    PoModule,
    FormsModule,
    HttpClientModule,
    RouterModule
  ],
  declarations: [

    //VisualProdutoComponent,
    InventarioComponent,

    IncluiInventarioComponent,

    AlteraInventarioComponent,

    ExcluiInventarioComponent,

    VisualizaInventarioComponent

    //AlmoxService

  ],
  exports: [
    InventarioComponent
  ],
  //schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
   providers: [AlmoxService],
})
export class InventarioModule { }
