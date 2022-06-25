import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PoDisclaimer, PoPageAction, PoTableColumn ,PoPageFilter, PoDisclaimerGroup, PoBreadcrumb} from '@po-ui/ng-components';
import { AlmoxService } from '../../almox.service';

@Component({
  selector: 'app-entrada',
  templateUrl: './entrada.component.html',
  styleUrls: ['./entrada.component.scss']
})
export class EntradaComponent implements OnInit {
  itemsFiltered: Array<any>;
  columns: Array<PoTableColumn>;
  tableActions: Array<PoPageAction>;
  pageActions: Array<PoPageAction>;
  isLoading: boolean = true;
  labelButton = "Nova Entrada";
  loadButton = false;
  lControlFilter: boolean = false;
  private disclaimers: Array<PoDisclaimer> = [];
  disclaimerGroup: PoDisclaimerGroup;
  breadcrumb: PoBreadcrumb;
  descfornec;
  recno;
  datent;
  numnf;
  serienf;

  itens_mapa;
  items: Array<any>;

  constructor(
    private router: Router,
    private almoxService: AlmoxService) { }

  ngOnInit() {
    this.isLoading = false;
    this.columns = [

      { property: 'descfornec', label: 'Fornecedor', type: 'string', width: '30%'},
      { property: 'datent', label: 'Data entrada', type: 'string', width: '20%'},
      { property: 'numnf', label: 'Numero da NF', type: 'string', width: '15%'},
      { property: 'serienf', label: 'Serie da NF', type: 'string', width: '10%'}

    ];
    this.tableActions = [
      { action: this.visualEntrada.bind(this), label: "Visualizar" },
      { action: this.alteraEntrada.bind(this), label: 'Alterar' },
      { action: this.excluirEntrada.bind(this), label: 'Excluir' }

     ]
     this.disclaimerGroup = {
      title: 'Filters',
      disclaimers: [],
      change: this.onChangeDisclaimer.bind(this)
    };

     this.getEntrada()
  }

  incluir(){
      this.router.navigate(['entrada/incluir']);

  }

  getEntrada(){
    var produtos = [];
    this.almoxService.getEntCabec().subscribe(dados => {
      this.itens_mapa = [];
      this.itens_mapa = dados
      this.items = this.itens_mapa
     .map( data => {
        return {
          recno: data.recno,
          descfornec: data.descfornec,
          serienf: data.serienf,
          datent: data.datent,
          numnf: data.numnf,
        }
    });
    if (this.items.length > 0) {
      for(var i = 0; i < this.items.length; i++){
        this.descfornec = this.items[i].descfornec;
        this.recno     = this.items[i].recno;
        this.serienf = this.items[i].serienf;
        this.datent = this.items[i].datent;
        this.numnf = this.items[i].numnf;
      }
    }
    this.itemsFiltered = [...this.items];
    this.isLoading = false

    });
  }
  visualEntrada(mapa){
    this.router.navigate(['entrada/visualentrada', mapa.recno]);
    //this.router.navigate(['entrada/visualentrada'],  mapa.recno  );
    //this.router.navigate(['entrada/visualentrada'],  {  mapa }  );
    //{ queryParams: { order: 'popular', 'price-range': 'not-cheap' } });
}


  alteraEntrada(mapa){
    this.router.navigate(['entrada/alteraentrada', mapa.recno]);
  }
  excluirEntrada(mapa){
    this.router.navigate(['entrada/excluientrada', mapa.recno]);
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

}
