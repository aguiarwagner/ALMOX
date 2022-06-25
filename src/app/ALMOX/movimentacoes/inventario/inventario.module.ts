import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { PoModule } from '@po-ui/ng-components';

import { AlmoxService } from '../../almox.service';
import { inventarioRoutingModule } from './inventario-routing.module';
import { InventarioComponent } from './inventario.component';


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
    InventarioComponent

    //AlmoxService

  ],
  exports: [
    InventarioComponent
  ],
  //schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
   providers: [AlmoxService],
})
export class InventarioModule { }
