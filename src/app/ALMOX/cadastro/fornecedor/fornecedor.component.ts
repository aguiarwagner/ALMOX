import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PoBreadcrumb, PoDisclaimer, PoDisclaimerGroup, PoPageAction, PoPageFilter, PoTableColumn } from '@po-ui/ng-components';
import { AlmoxService } from '../../almox.service';

@Component({
  selector: 'app-fornecedor',
  templateUrl: './fornecedor.component.html',
  styleUrls: ['./fornecedor.component.scss']
})
export class FornecedorComponent implements OnInit {
  columns: Array<PoTableColumn>;
  loadButton = false;
  labelButton = "Cadastrar Fornecedor";
  isLoading: boolean = true;
  tableActions: Array<PoPageAction>;
  pageActions: Array<PoPageAction>;
  itemsFiltered: Array<any>;
  itens_mapa;
  items: Array<any>;
  breadcrumb: PoBreadcrumb;
  disclaimerGroup: PoDisclaimerGroup;
  nome;
  lControlFilter: boolean = false;
  private disclaimers: Array<PoDisclaimer> = [];


  constructor(
    private router: Router,
    private almoxService: AlmoxService
  ) { }

  ngOnInit() {


    this.columns = [
      { property: 'nome', label: 'Fornecedor', type: 'string', width: '30%'},
      { property: 'cnpj', label: 'CNPJ', type: 'string', width: '15%'},
      { property: 'ultcompra', label: 'Última Compra', type: 'string', width: '30%'},
      { property: 'tipo', label: 'Tipo', type: 'string', width: '10%'}
      //{ property: 'unimed', label: 'Unidade de Medida', type: 'string', width: '10%'}

    ];
    this.tableActions = [
      { action: this.visualFornec.bind(this), label: "Visualizar" },
      { action: this.alteraFornec.bind(this), label: 'Alterar' },
      { action: this.excluirFornec.bind(this), label: 'Excluir' }

     ]

     this.disclaimerGroup = {
      title: 'Filters',
      disclaimers: [],
      change: this.onChangeDisclaimer.bind(this)
    };

     this.carregaFornec()
  }
  private setLiteralsDefaultValues() {
    this.breadcrumb = {
      items: [
        { label: 'Cadastro de Fornecedor', link: '/fornecedor' }
      ]
    };
  }

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


  carregaFornec(){
    debugger
    this.almoxService.getFornecedor().subscribe(dados => {
      this.itens_mapa = [];
      this.itens_mapa = dados
      //const cnpj = '(00) 0 0000-0000';
      this.items = this.itens_mapa
     .map( data => {
        return {
          recno: data.recno,
          nome: data.nome,
          cnpj: data.cnpj,
          ultcompra: data.ultcompra,
          tipo: data.tipo,
          tel: data.tel,
          endereco: data.endereco
        }
    });
    if (this.items.length > 0) {
      for(var i = 0; i < this.items.length; i++){
        this.nome = this.items[i].nome;
        this.itemsFiltered = this.items;
      }
    }
    this.isLoading = false
  });
  }

  incluiFornecedor(){
    this.router.navigate(['fornecedor/incluirfornecedor']);
  }

  visualFornec(mapa){
    this.router.navigate(['fornecedor/visualfornecedor', mapa.recno]);
  }

  alteraFornec(mapa){
    this.router.navigate(['fornecedor/alterafornecedor', mapa.recno]);
  }

  excluirFornec(mapa){
    debugger
    this.router.navigate(['fornecedor/excluirfornecedor', mapa.recno]);
  }

}
