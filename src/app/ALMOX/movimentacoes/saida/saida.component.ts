import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PoDisclaimer, PoPageAction, PoTableColumn ,PoPageFilter, PoDisclaimerGroup, PoBreadcrumb} from '@po-ui/ng-components';
import { AlmoxService } from '../../almox.service';

@Component({
  selector: 'app-saida',
  templateUrl: './saida.component.html',
  styleUrls: ['./saida.component.scss']
})
export class SaidaComponent implements OnInit {
  itemsFiltered: Array<any>;
  columns: Array<PoTableColumn>;
  tableActions: Array<PoPageAction>;
  pageActions: Array<PoPageAction>;
  isLoading: boolean = true;
  labelButton = "Nova Saída";
  loadButton = false;
  lControlFilter: boolean = false;
  private disclaimers: Array<PoDisclaimer> = [];
  disclaimerGroup: PoDisclaimerGroup;
  breadcrumb: PoBreadcrumb;
  codrelat;
  descigreja;
  datsaida;
  recno;
  datent;
  numnf;
  serienf;

  itens_mapa;
  items: Array<any>;


  constructor(
    private router: Router,
    private almoxService: AlmoxService
  ) { }

  ngOnInit() {

    this.isLoading = false;
    this.columns = [

      { property: 'descigreja', label: 'Igreja', type: 'string', width: '30%'},
      { property: 'datsaida', label: 'Data da saída', type: 'string', width: '20%'},
      { property: 'codrelat', label: 'Código do Relatório', type: 'string', width: '15%'}
      //{ property: 'serienf', label: 'Serie da NF', type: 'string', width: '10%'}

    ];
    this.tableActions = [
      { action: this.incluiSaida.bind(this), label: "Incluir" },
      { action: this.visualSaida.bind(this), label: "Visualizar" },
      { action: this.alteraSaida.bind(this), label: 'Alterar' },
      { action: this.excluirSaida.bind(this), label: 'Excluir' }

     ]
     this.disclaimerGroup = {
      title: 'Filters',
      disclaimers: [],
      change: this.onChangeDisclaimer.bind(this)
    };
     this.getSaida()
  }

  getSaida(){
    var produtos = [];
    this.almoxService.getSaidaCabec().subscribe(dados => {
      this.itens_mapa = [];
      this.itens_mapa = dados
      this.items = this.itens_mapa
     .map( data => {
        return {
          recno: data.recno,
          descigreja: data.descigreja,
          datsaida: data.datsaid,
          codrelat: data.codrelat,
        }
    });
    if (this.items.length > 0) {
      for(var i = 0; i < this.items.length; i++){
        this.descigreja = this.items[i].descigreja;
        this.recno     = this.items[i].recno;
        this.codrelat = this.items[i].codrelat;
        this.datsaida = this.items[i].datsaida;
        //this.numnf = this.items[i].numnf;
      }
    }
    this.itemsFiltered = [...this.items];
    this.isLoading = false

    });
  }
  visualSaida(mapa){
    debugger
    this.router.navigate(['saida/visualsaida', mapa.recno]);
  }
  alteraSaida(mapa){
    this.router.navigate(['saida/alterasaida', mapa.recno]);
  }
  excluirSaida(mapa){
    this.router.navigate(['saida/excluisaida', mapa.recno]);
  }
  incluiSaida(mapa){
    this.router.navigate(['saida/excluisaida', mapa.recno]);
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

  incluir(){
    this.router.navigate(['saida/incluir']);

}

}
