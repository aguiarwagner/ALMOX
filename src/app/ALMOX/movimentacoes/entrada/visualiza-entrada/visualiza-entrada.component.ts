import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PoDynamicViewField, PoModalComponent, PoNotificationService, PoPageAction, PoSelectOption, PoTableColumn } from '@po-ui/ng-components';
import { AlmoxService } from 'src/app/almox/almox.service';
import { Mapa } from 'src/app/almox/shared/mapa';


@Component({
  selector: 'app-visualizar',
  templateUrl: './visualiza-entrada.component.html',
  styleUrls: ['./visualiza-entrada.component.scss']
})
export class VisualizaEntradaComponent implements OnInit {
  columns: Array<PoTableColumn>;
  columnsName: Array<string>;
  SelFornec: Array<PoSelectOption>;
  SelProduto: Array<PoSelectOption>;
  descfornec: string;
  recnoCabec: string;
  numnf: string;
  serienf: string;
  datent = new Date();
  isLoading: boolean = true;
  tableActions: Array<PoPageAction>;
  itemsFiltered: Array<any>;
  items1: Array<any>;
  mapa: Mapa = new Mapa();
  items: Array<any>;
  itens_mapa;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private almoxService: AlmoxService,
    public poNotification: PoNotificationService
  ) { }

  ngOnInit(): void {
    this.columns = [
      { property: 'item', label: 'Item', type: 'number', width: '5%'},
      { property: 'descprod', label: 'produto', type: 'string', width: '30%'},
      { property: 'recnoProd', label: 'recno', type: 'string', width: '30%',visible: false},
      { property: 'quant', label: 'Quantidade', type: 'number', width: '20%'},
      { property: 'valunit', label: 'Valor Unitário', type: 'number', width: '20%'},
      { property: 'valtot', label: 'Total', type: 'number', width: '15%'},
      { property: 'numnf', label: 'numnf', type: 'number', width: '15%',visible: false},
      { property: 'serienf', label: 'serienf', type: 'number', width: '15%',visible: false}
    ];
    this.visualEntrada();
  }

  visualEntrada(){
    this.recnoCabec = this.activatedRoute.snapshot.paramMap.get('id');
    this.getItens();
  }

  Cancel(){
    this.router.navigate(['entrada']);
  }

  getItens(){
    this.almoxService.getEntradaId(this.recnoCabec).subscribe(dados => {
      this.itens_mapa = [];
      this.itens_mapa = dados
      this.items = this.itens_mapa
     .map( data => {
        return {
          recno: data.recno,
          descfornec: data.descfornec,
          serienf: data.serienf,
          datent: data.datent,
          item: data.item,
          recnoitem: data.recnoitem,
          codprod: data.codprod,
          valunit: data.valunit,
          valtot: data.valtot,
          quant: data.quant,
          descprod: data.descprod,
        }
      });

      this.numnf = this.items[0].numnf
      this.serienf = this.items[0].serienf
      this.descfornec = this.items[0].descfornec
      this.datent = this.items[0].datent
      this.itemsFiltered = [];
      this.isLoading = false;
      this.SelFornec = [];
      for (let index = 0; index < this.items.length; index++) {
        this.itemsFiltered.push(
          {  item: this.items[index].item += 1,descprod:  this.items[index].descprod, quant: this.items[index].quant, valunit: this.items[index].valunit, valtot: this.items[index].valtot }
        );
      }
    });
  }




}
