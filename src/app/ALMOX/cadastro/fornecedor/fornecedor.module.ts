import { FornecedorComponent } from './fornecedor.component';
//import { AlmoxService } from './../almox.service';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { PoModule } from '@po-ui/ng-components';
import { FornecedorRoutingModule } from './fornecedor-routing.module';
import { AlterarFornecedorComponent } from './alterar-fornecedor/alterar-fornecedor.component';
import { IncluirFornecedorComponent } from './incluir-fornecedor/incluir-fornecedor.component';
import { ExcluirFornecedorComponent } from './excluir-fornecedor/excluir-fornecedor.component';
import { VisualFornecedorComponent } from './visual-fornecedor/visual-fornecedor.component';


@NgModule({
  imports: [
    CommonModule,
    FornecedorRoutingModule,
    PoModule,
    FormsModule,
    HttpClientModule,
    RouterModule
  ],
  declarations: [
    FornecedorComponent,
    AlterarFornecedorComponent,
    VisualFornecedorComponent,
    IncluirFornecedorComponent,
    ExcluirFornecedorComponent,

  ],
  exports: [
    FornecedorComponent
  ],
  //schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
   //providers: [AlmoxService],s
})
export class FornecedorModule { }
