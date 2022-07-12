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
  descigreja: string = "";
  codrelat: string;
  datasaida = new Date();
  descprod: string;
  solicitante: string = "";
  cpfsolicitante: string = "";
  item: number;
  quant: number;
  valunit: number;
  valtot: number;
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
      { property: 'descprod', label: 'Produto', type: 'string', width: '30%'},
      { property: 'quant', label: 'Quantidade', type: 'number', width: '20%'},
      { property: 'valunit', label: 'Valor Unitário', type: 'number', width: '20%'},
      { property: 'valtot', label: 'Total', type: 'number', width: '15%'},
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
          descigreja: data.descigreja,
          datasaida: data.datasaida,
          codrelat: data.codrelat,
          solicitante: data.solicitante,
          cpfsolicitante: data.cpfsolicitante,
          item: data.item,
          valtot: data.valtot,
          recnoprod: data.recnoprod,
          codprod: data.codprod,
          valunit: data.valunit,
          quant: data.quant,
          descprod: data.descprod,
        }
      });

      this.descigreja = this.items[0].descigreja
      this.codrelat = this.items[0].codrelat
      this.datasaida = this.items[0].datasaida
      this.solicitante = this.items[0].solicitante
      this.cpfsolicitante = this.items[0].cpfsolicitante


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
  Cancel(){
    this.router.navigate(['saida']);
  }
}
