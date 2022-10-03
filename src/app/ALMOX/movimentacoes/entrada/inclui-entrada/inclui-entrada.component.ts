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
  descricaoProduto: string;
  descprodAlteracao: string;
  descprod2: string;
  dataEntrada = new Date();
  now: Date;
  valorUnitario: number;
  nItemAtu: number;
  valunitAltera: number;
  quantidade: number;
  quantidadeAltera: number;
  numeroNF: number;
  serieNF: number;
  valorTotal: number;
  valorTotalAltera: number;
  recno: number;
  item: number;
  recnoFornecedor: number;
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
    this.dataEntrada = this.now;
    this.descprodAlteracao = "";
    this.laltera = false;
    this.getFornec();
    this.getProduto();
    this.isLoading = false;
    this.itemsFiltered = [];
    this.item = 0;
    this.columns = [
      { property: 'item', label: 'Item', type: 'number', width: '5%'},
      { property: 'descricaoProduto', label: 'produto', type: 'string', width: '30%'},
      { property: 'recnoProduto', label: 'recno', type: 'string', width: '30%',visible: false},
      { property: 'quantidade', label: 'Quantidade', type: 'number', width: '20%'},
      { property: 'valorUnitario', label: 'Valor Unitário', type: 'number', width: '20%'},
      { property: 'valorTotal', label: 'Total', type: 'number', width: '15%'},
      { property: 'numeroNF', label: 'numeroNF', type: 'number', width: '15%',visible: false},
      { property: 'serieNF', label: 'serieNF', type: 'number', width: '15%',visible: false}
    ];

    this.tableActions = [
      { action: this.alteraEntrada.bind(this), label: 'Alterar' }
     ]
  }
  grava(){
    this.aGrava = [];
    this.aGrava.push([{numeroNF: this.numeroNF, serieNF: this.serieNF,recnoFornecedor: this.recnoFornecedor, dataEntrada: this.dataEntrada}])
    this.aGrava.push([this.itemsFiltered]);

    this.almoxService.postEntrada(this.aGrava).subscribe(() => {
      this.lOk = true
      this.poNotification.success("Registro incluído com sucesso!");
      this.itemsFiltered = [];
      this.serieNF = undefined;
      this.numeroNF = undefined;
      this.recnoFornecedor = undefined;
      this.quantidade = undefined;
      this.valorUnitario = undefined;
      this.valorTotal = undefined;
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
    this.descprodAlteracao = event.descricaoProduto;
  }

  salvarAlteracao(){
    for(var i = 0; i < this.items.length; i++){
      if (this.items[i].recno == this.cProdutoAlterado){
        this.descprodAlteracao = this.items[i].descricaoProduto
      };
    }
    for(var i = 0; i < this.itemsFiltered.length; i++){
      if (this.itemsFiltered[i].item == this.nItemAtu){
        this.itemsFiltered[i].descricaoProduto = this.descprodAlteracao;
        this.itemsFiltered[i].quantidade = this.quantidadeAltera;
        this.itemsFiltered[i].valorUnitario = this.valunitAltera;
        this.itemsFiltered[i].valorTotal = this.quantidadeAltera * this.valunitAltera;
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
    this.cProdutoAlterado = event.recnoProduto;
    this.valunitAltera = event.valorUnitario;
    this.quantidadeAltera = event.quantidade;
    this.valorTotalAltera = event.valorTotal;
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
        if (this.itemsFiltered[i].recnoProduto == this.recno){
          this.itemsFiltered[i].descricaoProduto =  this.descricaoProduto;
          this.itemsFiltered[i].item =  this.item;
          this.itemsFiltered[i].recno =  this.recno;
          this.itemsFiltered[i].quantidade = this.quantidade;
          this.itemsFiltered[i].valorUnitario = this.valorUnitario;
          this.itemsFiltered[i].valorTotal = this.valorTotal;
          this.itemsFiltered[i].numeroNF = this.numeroNF;
          this.itemsFiltered[i].serieNF = this.serieNF;
        }
      }
    }else{
      for(var i = 0; i < this.items.length; i++){
        if (this.items[i].recno == this.cProdutoSelecionado){
          this.descricaoProduto = this.items[i].descricaoProduto;
          this.recno = this.items[i].recno;
        }
      }

      this.itemsFiltered.push(
        { recnoProduto: this.recno, item: this.item += 1,descricaoProduto:this.descricaoProduto, quantidade:this.quantidade ,valorUnitario:this.valorUnitario, valorTotal: this.quantidade * this.valorUnitario, numeroNF: this.numeroNF, serieNF: this.serieNF })
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
          codigoProduto: data.codigoProduto,
          descricaoProduto: data.descricaoProduto,
          recno: data.recno,
        }
    });

    this.SelProduto = [];
    if (this.items.length > 0) {
      for(var i = 0; i < this.items.length; i++){
        this.SelProduto.push(
          { label: this.items[i].descricaoProduto, value: this.items[i].recno })
      };
    }
    });
  };

  somaValor(valor, opcao){
    if (opcao == 1){
      if (this.valorUnitario == undefined){
        this.valorTotal = parseInt(valor);
      }else{
        this.valorTotal = parseInt(valor) * this.valorUnitario;
      };
    }else{
      if (this.quantidade == undefined){
        this.valorTotal = parseInt(valor);
      }else{
        this.valorTotal = parseInt(valor) * this.quantidade;
      }
    }
  }

  somaValorAlteracao(valor, opcao){
    if (opcao == 1){
      if (this.valunitAltera == undefined){
        this.valorTotalAltera = parseInt(valor);
      }else{
        this.valorTotalAltera = parseInt(valor) * this.valunitAltera;
      }
    }else{
      if (this.quantidadeAltera == undefined){
        this.valorTotalAltera = parseInt(valor);
      }else{
        this.valorTotalAltera = parseInt(valor) * this.quantidadeAltera;
      }
    }
  }
}
