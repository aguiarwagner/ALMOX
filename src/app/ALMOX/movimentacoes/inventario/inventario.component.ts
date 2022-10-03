import { Component, OnInit } from '@angular/core';
import { PoBreadcrumb, PoDisclaimer, PoDisclaimerGroup, PoPageAction, PoPageFilter, PoTableColumn } from '@po-ui/ng-components';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.scss']
})
export class InventarioComponent implements OnInit {
  isLoading: boolean = true;
  labelButton = "Novo Inventário";
  loadButton = false;
  itemsFiltered: Array<any>;
  columns: Array<PoTableColumn>;
  tableActions: Array<PoPageAction>;
  pageActions: Array<PoPageAction>;
  private disclaimers: Array<PoDisclaimer> = [];
  disclaimerGroup: PoDisclaimerGroup;
  breadcrumb: PoBreadcrumb;
  lControlFilter: boolean = false;
  itens_mapa;
  items: Array<any>;

  constructor() { }

  ngOnInit(): void {
    this.isLoading = false;
    this.columns = [

      { property: 'descricaoIgreja', label: 'Igreja', type: 'string', width: '30%'},
      { property: 'dataSaida', label: 'Data da saída', type: 'date', width: '20%'},
      { property: 'codigoRelatorio', label: 'Código do Relatório', type: 'string', width: '15%'},
      { property: 'solicitante', label: 'Solicitante', type: 'string', width: '10%'}

    ];
    this.tableActions = [
      //{ action: this.visualSaida.bind(this), label: "Visualizar" },
      //{ action: this.alteraSaida.bind(this), label: 'Alterar' },
      //{ action: this.excluirSaida.bind(this), label: 'Excluir' }

     ]
     this.disclaimerGroup = {
      title: 'Filters',
      disclaimers: [],
      change: this.onChangeDisclaimer.bind(this)
    };
     this.getInventario()
  }

  getInventario(){
    
  }

  incluirInventario(){

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
