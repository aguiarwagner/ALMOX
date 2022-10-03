import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PoNotificationService, PoSelectOption, PoTableColumn } from '@po-ui/ng-components';
import { AlmoxService } from 'src/app/almox/almox.service';

@Component({
  selector: 'app-visualiza-saida',
  templateUrl: './visualiza-saida.component.html',
  styleUrls: ['./visualiza-saida.component.scss']
})
export class VisualizaSaidaComponent implements OnInit {
  items: Array<any>;
  itemsFiltered: Array<any>;
  itens;
  descricaoIgreja: string = "";
  codigoRelatorio: string;
  dataSaida = new Date();
  descricaoProduto: string;
  solicitante: string = "";
  cpfSolicitante: string = "";
  item: number;
  quant: number;
  valorUnitario: number;
  valorTotal: number;
  isLoading: boolean = false;
  SelFornec: Array<PoSelectOption>;
  columns: Array<PoTableColumn>;


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
      { property: 'quantidade', label: 'Quantidade', type: 'number', width: '20%'},
      { property: 'valorUnitario', label: 'Valor Unitário', type: 'number', width: '20%'},
      { property: 'valorTotal', label: 'Total', type: 'number', width: '15%'},
    ];
    this.visualSaida();
  }

  visualSaida(){
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.almoxService.getSaida(id).subscribe(dados => {
      this.itens = [];
      this.itens = dados
      this.items = this.itens
     .map( data => {
        return {
          recno: data.recno,
          descricaoIgreja: data.descricaoIgreja,
          dataSaida: data.dataSaida,
          codigoRelatorio: data.codigoRelatorio,
          solicitante: data.solicitante,
          cpfSolicitante: data.cpfSolicitante,
          item: data.item,
          valorTotal: data.valorTotal,
          recnoprod: data.recnoprod,
          codigoProduto: data.codigoProduto,
          valorUnitario: data.valorUnitario,
          quantidade: data.quantidade,
          descricaoProduto: data.descricaoProduto,
        }
      });

      this.descricaoIgreja = this.items[0].descricaoIgreja
      this.codigoRelatorio = this.items[0].codigoRelatorio
      this.dataSaida = this.items[0].dataSaida
      this.solicitante = this.items[0].solicitante
      this.cpfSolicitante = this.items[0].cpfSolicitante


      this.itemsFiltered = [];
      this.isLoading = false;
      this.SelFornec = [];
      for (let index = 0; index < this.items.length; index++) {
        this.itemsFiltered.push(
          {  item: this.items[index].item,descricaoProduto:  this.items[index].descricaoProduto, quantidade: this.items[index].quantidade, valorUnitario: this.items[index].valorUnitario, valorTotal: this.items[index].valorTotal }
        );
      }
    });

  }

  Cancel(){
    this.router.navigate(['saida']);
  }
}
