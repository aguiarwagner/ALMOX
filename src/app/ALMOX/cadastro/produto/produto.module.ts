import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { PoModule } from '@po-ui/ng-components';

import { produtoRoutingModule } from './produto-routing.module';

import { IncluirProdutoComponent } from './incluir-produto/incluir-produto.component';
import { ProdutoComponent } from './produto.component';
import { AlmoxService } from '../../almox.service';
import { AlterarProdutoComponent } from './alterar-produto/alterar-produto.component';
import { VisualProdutoComponent } from './visual-produto/visual-produto.component';
import { ExcluirProdutoComponent } from './excluir-produto/excluir-produto.component';

@NgModule({
  imports: [
    CommonModule,
    produtoRoutingModule,
    PoModule,
    FormsModule,
    HttpClientModule,
    RouterModule
  ],
  declarations: [

    //VisualProdutoComponent,
    IncluirProdutoComponent,
    AlterarProdutoComponent,
    VisualProdutoComponent,
    ExcluirProdutoComponent,
    ProdutoComponent

    //AlmoxService

  ],
  exports: [
    ProdutoComponent
  ],
  //schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
   providers: [AlmoxService],
})
export class ProdutoModule { }
