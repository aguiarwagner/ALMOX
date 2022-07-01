import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PoNotificationService, PoPageAction, PoSelectOption, PoTableColumn } from '@po-ui/ng-components';
import { AlmoxService } from 'src/app/almox/almox.service';
import { Mapa } from 'src/app/almox/shared/mapa';

@Component({
  selector: 'app-excluir',
  templateUrl: './exclui-entrada.component.html',
  styleUrls: ['./exclui-entrada.component.scss']
})
export class ExcluiEntradaComponent implements OnInit {
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
  lOk: boolean;

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
      { property: 'recnoProd', label: 'recno', type: 'string', width: '30%',visible: false},
      { property: 'quant', label: 'Quantidade', type: 'number', width: '20%'},
      { property: 'valunit', label: 'Valor Unitário', type: 'number', width: '20%'},
      { property: 'valtot', label: 'Total', type: 'number', width: '15%'},
      { property: 'numnf', label: 'numnf', type: 'number', width: '15%',visible: false},
      { property: 'serienf', label: 'serienf', type: 'number', width: '15%',visible: false}
    ];
    this.ExcluiEntrada();
  }

  ExcluiEntrada(){
    this.recnoCabec  = this.activatedRoute.snapshot.paramMap.get('id');
    this.getItens();
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
          numnf: data.numnf,
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

  //Confirma a exclusão da NF
  confirmaExclusao(){
    var teste;
    debugger
    this.almoxService.deleteEntrada(this.items[0].recno).subscribe(() => {
      this.lOk = true
      this.router.navigate(["/produto"]);
      this.poNotification.success("Registro ecluido com sucesso!");
    })

    const sleep = (milliseconds) => {
      return new Promise((resolve) => setTimeout(resolve, milliseconds));
    };

    // Aguarda 5 segundos
    sleep(5000).then(() => {
      if (!this.lOk) {
        this.poNotification.error("Erro na inclusão!");
      }
    });

  }


  Cancel(){
    this.router.navigate(['entrada']);
  }

}
