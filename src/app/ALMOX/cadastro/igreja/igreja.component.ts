import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PoBreadcrumb, PoDisclaimer, PoDisclaimerGroup, PoPageAction, PoPageFilter, PoTableColumn } from '@po-ui/ng-components';
import { AlmoxService } from '../../almox.service';

@Component({
  selector: 'app-igreja',
  templateUrl: './igreja.component.html',
  styleUrls: ['./igreja.component.scss']
})
export class IgrejaComponent implements OnInit {
  columns: Array<PoTableColumn>;
  pageActions: Array<PoPageAction>;
  breadcrumb: PoBreadcrumb;
  disclaimerGroup: PoDisclaimerGroup;
  loadButton = false;
  labelButton = "Cadastrar Igrejas";
  isLoading: boolean = true;
  itemsFiltered: Array<any>;
  itens_mapa;
  items: Array<any>;
  tableActions: Array<PoPageAction>;

  lControlFilter: boolean = false;
  private disclaimers: Array<PoDisclaimer> = [];

  constructor(
    private router: Router,
    private almoxService: AlmoxService
  ) { }
  ngOnInit() {
    this.columns = [
      { property: 'descricaoIgreja', label: 'Igreja', type: 'string', width: '40%'},
      { property: 'codigoRelatorio', label: 'Código do Relatório', type: 'string', width: '15%'},
      { property: 'atalho', label: 'Atalho', type: 'string', width: '15%'}

    ];
    this.tableActions = [
      { action: this.visualIgreja.bind(this), label: "Visualizar" },
      { action: this.alteraIgreja.bind(this), label: 'Alterar' },
      { action: this.excluirIgreja.bind(this), label: 'Excluir' }

     ]

     this.disclaimerGroup = {
      title: 'Filters',
      disclaimers: [],
      change: this.onChangeDisclaimer.bind(this)
    };

     this.carregaIgrejas()
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


  carregaIgrejas(){
    this.almoxService.getIgreja().subscribe(dados => {
    this.itens_mapa = [];
      this.itens_mapa = dados
      this.items = this.itens_mapa
     .map( data => {
        return {
          recno: data.recno,
          descricaoIgreja: data.descricaoIgreja,
          codigoRelatorio: data.codigoRelatorio,
          atalho: data.atalho
        }
    });
    if (this.items.length > 0) {
      for(var i = 0; i < this.items.length; i++){
        this.itemsFiltered = this.items;
      }
    }
    this.isLoading = false

    });
  }

  excluirIgreja(mapa){
    this.router.navigate(['igreja/excluirigreja', mapa.recno]);
  }

  alteraIgreja(mapa){
    this.router.navigate(['igreja/alterarigreja', mapa.recno]);
  }

  visualIgreja(mapa){
    this.router.navigate(['igreja/visualigreja', mapa.recno]);
  }

  inluiIgreja(){
    this.router.navigate(['igreja/incluirigreja']);
  }
}
