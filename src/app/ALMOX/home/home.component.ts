//import { AlmoxService } from './../almox.service';
import { Component, NgModule, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Almox } from '../almox';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  //nameUser = [{user: 'Wagner'}];
  //nameUser = {} as Almox;
  products: Almox[];
  //products: Almox[];

  constructor(
    //private AlmoxService: AlmoxService
  ) { }

  ngOnInit() {
    this.carregaProduct()

  }
  carregaProduct(){

    //this.AlmoxService.getProduct().subscribe(dados =>
    //  {
    //  //this.user = userName;
    //  //console.log(this.products);
    //  //this.products = dados['product']; //trouxe o resultado em obejto
    //  this.products = dados.content;
    //  console.log(this.products);
    //  });
  }
}
