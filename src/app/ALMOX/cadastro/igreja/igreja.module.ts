//import { AlmoxService } from './../almox.service';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { PoModule } from '@po-ui/ng-components';
import { IgrejaComponent } from './igreja.component';
import { AlmoxService } from '../../almox.service';
import { igrejaRoutingModule } from './igreja-routing.module';
import { IncluirIgrejaComponent } from './incluir-igreja/incluir-igreja.component';
import { AlterarIgrejaComponent } from './alterar-igreja/alterar-igreja.component';
import { VisualIgrejaComponent } from './visual-igreja/visual-igreja.component';
import { ExcluirIgrejaComponent } from './excluir-igreja/excluir-igreja.component';



@NgModule({
  imports: [
    CommonModule,
    igrejaRoutingModule,
    PoModule,
    FormsModule,
    HttpClientModule,
    RouterModule
  ],
  declarations: [
    IgrejaComponent,
    IncluirIgrejaComponent,
    AlterarIgrejaComponent,
    VisualIgrejaComponent,
    ExcluirIgrejaComponent
  ],
  exports: [
    IgrejaComponent
  ],
  //schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
   providers: [AlmoxService],
})
export class IgrejaModule { }
