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
  numeroNF: string;
  serieNF: string;
  dataEntrada = new Date();
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
      { property: 'descricaoProduto', label: 'Produto', type: 'string', width: '30%'},
      { property: 'recnoProd', label: 'recno', type: 'string', width: '30%',visible: false},
      { property: 'quantidade', label: 'Quantidade', type: 'number', width: '20%'},
      { property: 'valorUnitario', label: 'Valor Unitário', type: 'number', width: '20%'},
      { property: 'valorTotal', label: 'Total', type: 'number', width: '15%'},
      { property: 'numeroNF', label: 'numeroNF', type: 'number', width: '15%',visible: false},
      { property: 'serieNF', label: 'serieNF', type: 'number', width: '15%',visible: false}
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
          serieNF: data.serieNF,
          numeroNF: data.numeroNF,
          dataEntrada: data.dataEntrada,
          item: data.item,
          recnoitem: data.recnoitem,
          codigoProduto: data.codigoProduto,
          valorUnitario: data.valorUnitario,
          valorTotal: data.valorTotal,
          quantidade: data.quantidade,
          descricaoProduto: data.descricaoProduto,
        }
      });

      this.numeroNF = this.items[0].numeroNF
      this.serieNF = this.items[0].serieNF
      this.descfornec = this.items[0].descfornec
      this.dataEntrada = this.items[0].dataEntrada
      this.itemsFiltered = [];
      this.isLoading = false;
      this.SelFornec = [];
      for (let index = 0; index < this.items.length; index++) {
        this.itemsFiltered.push(
          {  item: this.items[index].item += 1,descricaoProduto:  this.items[index].descricaoProduto, quantidade: this.items[index].quantidade, valorUnitario: this.items[index].valorUnitario, valorTotal: this.items[index].valorTotal }
        );
      }
    });
  }




}
