import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';



import { HomeComponent } from './ALMOX/home/home.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { PoModule } from '@po-ui/ng-components';
import { RouterModule } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { AlmoxService } from './almox/almox.service';
import { InventarioComponent } from './ALMOX/movimentacoes/inventario/inventario.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    //InventarioComponent,
    //IgrejaComponent,
    //SaidaComponent,
    //FornecedorComponent,
    //ssProdutoComponent,
    //EntradaComponent
    //AlmoxService
    //IncluirProdutoComponent
    //AlterarProdutoComponent,
    //VisualProdutoComponent,
    //ProdutoComponent
    //IncluirComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    PoModule,
    RouterModule.forRoot([])
  ],
  providers: [HttpClientModule, AlmoxService],
  bootstrap: [AppComponent]
})
export class AppModule { }

