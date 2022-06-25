import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators'
import { Router } from '@angular/router';

import { PoBreadcrumb, PoCheckboxGroupOption, PoDisclaimer, PoDisclaimerGroup, PoPageAction, PoPageFilter, PoTableColumn } from '@po-ui/ng-components';
import { AlmoxService } from '../../almox.service';


@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.scss']
})
export class ProdutoComponent implements OnInit {

  columns: Array<PoTableColumn>;
  loadButton = false;
  labelButton = "Cadastrar produtos";
  isLoading: boolean = true;
  tableActions: Array<PoPageAction>;
  pageActions: Array<PoPageAction>;
  itemsFiltered: Array<any>;
  itens_mapa;
  items: Array<any>;
  breadcrumb: PoBreadcrumb;
  disclaimerGroup: PoDisclaimerGroup;
  cod;
  codprod;
  recno;
  descprod;
  valunit;
  datent;
  datsaida;
  estminimo;
  unimed;
  lControlFilter: boolean = false;

  private disclaimers: Array<PoDisclaimer> = [];


  constructor(

    private router: Router,
    private almoxService: AlmoxService
  ) { }

  ngOnInit() {

    this.columns = [
      { property: 'cod', label: 'Código do Produto', type: 'string', width: '10%'},
      { property: 'descprod', label: 'Descrição do Produto', type: 'string', width: '30%'},
      { property: 'valunit', label: 'Valor Unitário', type: 'string', width: '15%'},
      { property: 'unimed', label: 'Unidade de Medida', type: 'string', width: '10%'}

    ];
    this.tableActions = [
      { action: this.visualProduto.bind(this), label: "Visualizar" },
      { action: this.alteraProduto.bind(this), label: 'Alterar' },
      { action: this.excluirProduto.bind(this), label: 'Excluir' }

     ]
     this.disclaimerGroup = {
      title: 'Filters',
      disclaimers: [],
      change: this.onChangeDisclaimer.bind(this)
    };
     this.carregaProduct()
  }
  private setLiteralsDefaultValues() {
    this.breadcrumb = {
      items: [
        { label: 'Cadastro de Produtos', link: '/produto' }
      ]
    };
  }

  carregaProduct(){
    var produtos = [];
    this.almoxService.getProduct().subscribe(dados => {
      this.itens_mapa = [];
      this.itens_mapa = dados
      this.items = this.itens_mapa
     .map( data => {
        return {
          cod: data.cod,
          descprod: data.descprod,
          unimed: data.unimed,
          valunit: data.valunit
        }
    });
    if (this.items.length > 0) {
      for(var i = 0; i < this.items.length; i++){
        this.codprod = this.items[i].codprod;
        this.recno     = this.items[i].recno;
        this.descprod = this.items[i].descprod;
        this.valunit = this.items[i].valunit;
        this.datent = this.items[i].datent;
        this.datsaida = this.items[i].datsaida;
        this.estminimo = this.items[i].estminimo;
        this.unimed = this.items[i].unimed;
        //this.itemsFiltered = this.items;
      }
    }
    this.itemsFiltered = [...this.items];
    this.isLoading = false

    });
  };

  private excluirProduto(mapa) {
      this.router.navigate(['produto/excluirproduto', mapa.cod]);
      };

  private visualProduto(mapa) {

  this.router.navigate(['produto/visualproduto', mapa.cod]);
  };

  //Filtro
  public readonly filterSettings: PoPageFilter = {
    action: this.filterAction.bind(this),
    placeholder: 'Search'
  };

  filterAction(labelFilter: string | Array<string>) {
    const filter = typeof labelFilter === 'string' ? [labelFilter] : [...labelFilter];
    this.populateDisclaimers(filter);
    this.filter();
  }

  private filter() {
    const filters = this.disclaimers.map(disclaimer => disclaimer.value);
    if (filters.length > 0) {
      this.applyFilters(filters);
      this.lControlFilter = true;
    } else {
      this.resetFilters()
    }
  }

  private resetFilters() {
    if (this.lControlFilter){
      this.itemsFiltered = [...this.items];
    }
  }

  private applyFilters(filters) {
    this.itemsFiltered = this.items.filter(item => {
      return Object.keys(item)
        .some(key => (!(item[key] instanceof Object) && this.includeFilter(item[key], filters)));
    });
  }

  private includeFilter(item, filters) {
    return filters.some(filter => String(item).toLocaleLowerCase().includes(filter.toLocaleLowerCase()));
  }

  private onChangeDisclaimer(disclaimers) {
    this.disclaimers = disclaimers;
    this.filter();
  }

  private populateDisclaimers(filters) {
    this.disclaimers = filters.map(value => ({ value }));

    if (this.disclaimers && this.disclaimers.length > 0) {
      this.disclaimerGroup.disclaimers = [...this.disclaimers];
    } else {
      this.disclaimerGroup.disclaimers = [];
    }
  }

  private alteraProduto(mapa) {
    this.router.navigate(['produto/alteraproduto', mapa.cod]);
  }

  inCluiProd(){
      this.router.navigate(['produto/incluirproduto']);
  }
}
