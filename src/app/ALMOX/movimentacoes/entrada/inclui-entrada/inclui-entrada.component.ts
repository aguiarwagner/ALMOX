import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PoModalAction, PoModalComponent, PoNotificationService, PoPageAction, PoSelectOption, PoTableColumn } from '@po-ui/ng-components';
import { AlmoxService } from 'src/app/almox/almox.service';
import { Mapa } from 'src/app/almox/shared/mapa';

@Component({
  selector: 'app-incluir',
  templateUrl: './inclui-entrada.component.html',
  styleUrls: ['./inclui-entrada.component.scss']
})
export class IncluiEntradaComponent implements OnInit {
  actionsRight = false;
  detailedUser;
  dependents;
  cProduto = "Selecione o produto"
  descprod: string;
  descprodAlteracao: string;
  descprod2: string;
  datent = new Date();
  now: Date;
  valunit: number;
  nItemAtu: number;
  valunitAltera: number;
  quant: number;
  quantAltera: number;
  numnf: number;
  serienf: number;
  valtot: number;
  valtotAltera: number;
  recno: number;
  item: number;
  recnofornec: number;
  lOk: boolean = false;
  laltera: boolean;
  isLoading: boolean = true;
  quickSearchWidth: number = 3;
  cNome: string;
  SelFornec: Array<PoSelectOption>;
  SelProduto: Array<PoSelectOption>;
  SelProduto2: Array<PoSelectOption>;
  itens_mapa;
  items: Array<any>;
  items2: Array<any>;
  columns: Array<PoTableColumn>;
  tableActions: Array<PoPageAction>;
  itemsFiltered: Array<any>;
  aGrava: Array<any>;
  cProdutoSelecionado: string;
  cProdutoAlterado: string;

  @ViewChild('userDetailModal') userDetailModal: PoModalComponent;
  @ViewChild('alteraItemModal') alteraItemModal: PoModalComponent;

  mapa: Mapa = new Mapa();

  constructor(
    private almoxService: AlmoxService,
    public poNotification: PoNotificationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.now = new Date();
    this.datent = this.now;
    this.descprodAlteracao = "";
    this.laltera = false;
    this.getFornec();
    this.getProduto();
    this.isLoading = false;
    this.itemsFiltered = [];
    this.item = 0;
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

    this.tableActions = [
      { action: this.alteraEntrada.bind(this), label: 'Alterar' }
     ]
  }
  grava(){
    this.aGrava = [];
    this.aGrava.push([{numnf: this.numnf, serienf: this.serienf,recnoFornec: this.recnofornec, datent: this.datent}])
    this.aGrava.push([this.itemsFiltered]);

    this.almoxService.postEntrada(this.aGrava).subscribe(() => {
      this.lOk = true
      this.poNotification.success("Registro incluído com sucesso!");
      this.itemsFiltered = [];
      this.serienf = undefined;
      this.numnf = undefined;
      this.recnofornec = undefined;
      this.quant = undefined;
      this.valunit = undefined;
      this.valtot = undefined;
      location.reload();
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

  gravaDescProd(event){
    this.descprodAlteracao = event.descprod;
  }

  salvarAlteracao(){
    for(var i = 0; i < this.items.length; i++){
      if (this.items[i].recno == this.cProdutoAlterado){
        this.descprodAlteracao = this.items[i].descprod
      };
    }
    for(var i = 0; i < this.itemsFiltered.length; i++){
      if (this.itemsFiltered[i].item == this.nItemAtu){
        this.itemsFiltered[i].descprod = this.descprodAlteracao;
        this.itemsFiltered[i].quant = this.quantAltera;
        this.itemsFiltered[i].valunit = this.valunitAltera;
        this.itemsFiltered[i].valtot = this.quantAltera * this.valunitAltera;
      };
    }
    this.laltera = false;
  }

  ActionAlteracao: PoModalAction = {
    action: () => {
      this.alteraItemModal.close();
      this.salvarAlteracao();
    },
    label: 'Salvar'
  };

  ActionExclusao: PoModalAction = {
    action: () => {
      this.alteraItemModal.close();
      this.excluirAlteracao();
    },
    label: 'Excluir'
  };

  excluirAlteracao(){
    debugger
    for (let index = 0; index < this.itemsFiltered.length; index++) {
      if (this.itemsFiltered[index].item == this.nItemAtu){
        this.itemsFiltered.splice(index,1);
      };
    }
    //Reorganizo os items
    for (let index = 0; index < this.itemsFiltered.length; index++) {
      this.itemsFiltered[index].item = index + 1;
    }
    this.laltera = false;
  };

  alteraEntrada(event){
    this.nItemAtu = event.item;
    this.cProdutoAlterado = event.recnoProd;
    this.valunitAltera = event.valunit;
    this.quantAltera = event.quant;
    this.valtotAltera = event.valtot;
    this.alteraItemModal.open();
    this.laltera = true;
  }

  Cancela(){
    this.router.navigate(['entrada']);
  };

  getFornec(){
    this.almoxService.getFornecedor().subscribe(dados => {
      this.itens_mapa = [];
      this.itens_mapa = dados
      this.items2 = this.itens_mapa
     .map( data => {
        return {
          recno: data.recno,
          nome: data.nome,
        };
    });

    this.SelFornec = [];
    if (this.items2.length > 0) {
      for(var i = 0; i < this.items2.length; i++){
        this.SelFornec.push(
          { label: this.items2[i].nome, value: this.items2[i].recno })
      }
    }
    });

  }

  Adiciona(){

    if (this.laltera){
      for(var i = 0; i < this.itemsFiltered.length; i++){
        if (this.itemsFiltered[i].recnoProd == this.recno){
          this.itemsFiltered[i].descprod =  this.descprod;
          this.itemsFiltered[i].item =  this.item;
          this.itemsFiltered[i].recno =  this.recno;
          this.itemsFiltered[i].quant = this.quant;
          this.itemsFiltered[i].valunit = this.valunit;
          this.itemsFiltered[i].valtot = this.valtot;
          this.itemsFiltered[i].numnf = this.numnf;
          this.itemsFiltered[i].serienf = this.serienf;
        }
      }
    }else{
      for(var i = 0; i < this.items.length; i++){
        if (this.items[i].recno == this.cProdutoSelecionado){
          this.descprod = this.items[i].descprod;
          this.recno = this.items[i].recno;
        }
      }

      this.itemsFiltered.push(
        { recnoProd: this.recno, item: this.item += 1,descprod:this.descprod, quant:this.quant ,valunit:this.valunit, valtot: this.quant * this.valunit, numnf: this.numnf, serienf: this.serienf })
      }
      this.laltera = false;
  }

  getProduto(){
    this.almoxService.getProduct().subscribe(dados => {
      this.itens_mapa = [];
      this.itens_mapa = dados
      this.items = this.itens_mapa
     .map( data => {
        return {
          cod: data.cod,
          descprod: data.descprod,
          recno: data.recno,
        }
    });

    this.SelProduto = [];
    if (this.items.length > 0) {
      for(var i = 0; i < this.items.length; i++){
        this.SelProduto.push(
          { label: this.items[i].descprod, value: this.items[i].recno })
      };
    }
    });
  };

  somaValor(valor, opcao){
    if (opcao == 1){
      if (this.valunit == undefined){
        this.valtot = parseInt(valor);
      }else{
        this.valtot = parseInt(valor) * this.valunit;
      };
    }else{
      if (this.quant == undefined){
        this.valtot = parseInt(valor);
      }else{
        this.valtot = parseInt(valor) * this.quant;
      }
    }
  }

  somaValorAlteracao(valor, opcao){
    if (opcao == 1){
      if (this.valunitAltera == undefined){
        this.valtotAltera = parseInt(valor);
      }else{
        this.valtotAltera = parseInt(valor) * this.valunitAltera;
      }
    }else{
      if (this.quantAltera == undefined){
        this.valtotAltera = parseInt(valor);
      }else{
        this.valtotAltera = parseInt(valor) * this.quantAltera;
      }
    }
  }
}
