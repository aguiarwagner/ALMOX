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
      { property: 'descfornec', label: 'Fornecedor', type: 'string', width: '30%'},
      { property: 'datent', label: 'Data entrada', type: 'string', width: '20%'},
      { property: 'numnf', label: 'Numero da NF', type: 'string', width: '15%'},
      { property: 'serienf', label: 'Serie da NF', type: 'string', width: '10%'}
    ];


    this.visualEntrada();
  }

  visualEntrada(){
    this.recnoCabec = this.activatedRoute.snapshot.paramMap.get('id');
    debugger
    //this.descfornec = this.activatedRoute.snapshot.paramMap.get('descfornec');
    //this.numnf = this.activatedRoute.snapshot.paramMap.get('numnf');
    //this.serienf = this.activatedRoute.snapshot.paramMap.get('serienf');
    //const datent = this.activatedRoute.snapshot.paramMap.get('datent');
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
          numnf: data.numnf,
        }
      });

      this.numnf = this.items[0].numnf
      this.serienf = this.items[0].serienf
      this.descfornec = this.items[0].descfornec
      this.datent = this.items[0].datent
      this.itemsFiltered = [];
      this.isLoading = false;
      this.SelFornec = [];
      this.SelFornec.push(
        { label: this.items[0].descfornec, value: 1 }
        );



    });
  }




}
