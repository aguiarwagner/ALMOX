import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PoDialogService, PoModalAction, PoModalComponent, PoNotificationService, PoPageAction, PoSelectOption, PoTableColumn } from '@po-ui/ng-components';
import { AlmoxService } from 'src/app/almox/almox.service';
//import { threadId } from 'worker_threads';

@Component({
  selector: 'app-inclui-saida',
  templateUrl: './inclui-saida.component.html',
  styleUrls: ['./inclui-saida.component.scss']
})
export class IncluiSaidaComponent implements OnInit {
  recnoIgreja: number;
  valorUnitario: number;
  valorTotal: number;
  quantidade: number;
  aGrava: Array<any>;
  lOk: boolean = false;
  itens;
  items: Array<any>;
  aProdutos: Array<any>;
  itemsTable: Array<any>;
  selIgreja: Array<PoSelectOption> = [];
  columns: Array<PoTableColumn>;
  tableActions: Array<PoPageAction>;
  isLoading: boolean = true;
  dataSaida = new Date();
  now: Date;
  SelProduto: Array<PoSelectOption>;
  cProdutoSelecionado: string;
  cProdutoAlterado: string;
  Solicitante: string;
  cpfSolicitante: string;
  laltera: boolean;
  descricaoProduto: string;
  saldoProduto: string;
  quantidadeEstoque: number;
  recno: number;
  item: number;
  valunitAltera: number;
  valorTotalEstoque: number;
  valorUnitarioEstoque: number;
  valtotAltera: number;
  quantAltera: number;
  descprodAlteracao: string;
  nItemAtu: number;

  @ViewChild('alteraItemModal') alteraItemModal: PoModalComponent;
  @ViewChild('mostraSaldoProduto') mostraSaldoProduto: PoModalComponent;

  constructor(
    private almoxService: AlmoxService,
    public poNotification: PoNotificationService,
    private poAlert: PoDialogService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.laltera = false;
    this.now = new Date();
    this.dataSaida = this.now;
    this.itemsTable = [];
    this.item = 0;
    this.isLoading = false;
    this.valorUnitario = 0;
    this.quantidade = 0 ;



    this.columns = [
      { property: 'item', label: 'Item', type: 'number', width: '5%'},
      { property: 'descricaoProduto', label: 'produto', type: 'string', width: '30%'},
      { property: 'recnoProduto', label: 'recno', type: 'string', width: '30%',visible: false},
      { property: 'quantidade', label: 'Quantidade', type: 'number', width: '20%'},
      { property: 'valorUnitario', label: 'Valor Unitário', type: 'number', width: '20%'},
      { property: 'valorTotal', label: 'Total', type: 'number', width: '15%'},
      { property: 'numnf', label: 'numnf', type: 'number', width: '15%',visible: false},
      { property: 'serienf', label: 'serienf', type: 'number', width: '15%',visible: false}
    ];
    this.tableActions = [
      { action: this.alteraSaida.bind(this), label: 'Alterar' }
    ]

    this.getIgreja();
    this.getProduto();
  }

  mostraSaldo(event){
    let teste = "";
    if (this.cProdutoSelecionado == '' || this.cProdutoSelecionado == undefined){
      this.poNotification.information("Selecione um produto para mostrar o saldo através da tecla F1");
    }else{
      for (let index = 0; index < this.aProdutos.length; index++) {
        if(this.aProdutos[index].recno == this.cProdutoSelecionado){
          this.saldoProduto = this.cProdutoSelecionado;
          this.quantidadeEstoque = this.aProdutos[index].quantidadeEstoque;
          this.valorUnitarioEstoque = this.aProdutos[index].valorUnitario;
          this.valorTotalEstoque = this.quantidadeEstoque * this.valorUnitarioEstoque;
          this.mostraSaldoProduto.open();
        }

        
      }
      this.aProdutos

    }
    
  }

  alteraSaida(event){
    this.nItemAtu = event.item;
    this.cProdutoAlterado = event.recnoProduto;
    this.valunitAltera = event.valorUnitario;
    this.quantAltera = event.quantidade;
    this.valtotAltera = event.valorTotal;
    this.alteraItemModal.open();
    this.laltera = true;
  }

  salvarAlteracao(){
    for(var i = 0; i < this.itens.length; i++){
      if (this.itens[i].recno == this.cProdutoAlterado){
        this.descprodAlteracao = this.itens[i].descricaoProduto
      };
    }
    for(var i = 0; i < this.itemsTable.length; i++){
      if (this.itemsTable[i].item == this.nItemAtu){
        this.itemsTable[i].descricaoProduto = this.descprodAlteracao;
        this.itemsTable[i].quantidade = this.quantAltera;
        this.itemsTable[i].valorUnitario = this.valunitAltera;
        this.itemsTable[i].valorTotal = this.quantAltera * this.valunitAltera;
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
    for (let index = 0; index < this.itemsTable.length; index++) {
      if (this.itemsTable[index].item == this.nItemAtu){
        this.itemsTable.splice(index,1);
      };
    }
    //Reorganizo os items
    for (let index = 0; index < this.itemsTable.length; index++) {
      this.itemsTable[index].item = index + 1;
    }
    this.laltera = false;
  };  

  somaValor(valor, opcao){
    //this.shortcut.add()
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

  getIgreja(){
    this.almoxService.getIgreja().subscribe(dados => {
      this.itens = [];
      this.itens = dados
      this.items = this.itens
     .map( data => {
        return {
          recno: data.recno,
          nome: data.descricaoIgreja,
        };
    });
    this.selIgreja = [];
    if (this.items.length > 0) {
      for(var i = 0; i < this.items.length; i++){
        this.selIgreja.push(
          { label: this.items[i].nome, value: this.items[i].recno })
      }
    }
    });

  }

  alteraProdutoSel(event){
    for (let index = 0; index < this.aProdutos.length; index++) {
      if (this.aProdutos[index].recno == event){
        this.valorUnitario = parseFloat(this.aProdutos[index].valorUnitario)
      }
    }
  }

  Adiciona(){

    if (this.laltera){
      for(var i = 0; i < this.itemsTable.length; i++){
        if (this.itemsTable[i].recnoProduto == this.recno){
          this.itemsTable[i].descricaoProduto =  this.descricaoProduto;
          this.itemsTable[i].item =  this.item;
          this.itemsTable[i].recno =  this.recno;
          this.itemsTable[i].quantidade = this.quantidade;
          this.itemsTable[i].valorUnitario = this.valorUnitario;
          this.itemsTable[i].valorTotal = this.valorTotal;
        }
      }
    }else{
      if (this.validaItens()){
        for(var i = 0; i < this.aProdutos.length; i++){
          if (this.aProdutos[i].recno == this.cProdutoSelecionado){
            this.descricaoProduto = this.aProdutos[i].descricaoProduto;
            this.recno = this.aProdutos[i].recno;
          }
        }

        this.itemsTable.push(
          { recnoProduto: this.recno, item: this.item += 1,descricaoProduto:this.descricaoProduto, quantidade:this.quantidade ,valorUnitario:this.valorUnitario, valorTotal: this.quantidade * this.valorUnitario})

        this.laltera = false;
      }
    }
  }

  gravaSaida(){
    this.aGrava = [];
    this.aGrava.push([{recnoIgreja: this.recnoIgreja, dataSaida: this.dataSaida, solicitante: this.Solicitante, cpfSolicitante: this.cpfSolicitante}])
    this.aGrava.push([this.itemsTable]);

    this.almoxService.postSaida(this.aGrava).subscribe(() => {
      this.lOk = true
      this.poNotification.success("Registro incluído com sucesso!");
      //this.itemsFiltered = [];
      //this.serienf = undefined;
      //this.numnf = undefined;
      //this.recnofornec = undefined;
      //this.quantidade = undefined;
      //this.valorUnitario = undefined;
      //this.valorTotal = undefined;
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

  validaDados(){
    if(this.recnoIgreja == undefined ){
      this.poAlert.alert({title: "Atenção!", message: "Preencha a Igreja que deseja fazer a saída de materiais."});
      return false
    }else if(this.dataSaida == undefined) {
      this.poAlert.alert({title: "Atenção!", message: "Preencha a data de saída."});
      return false
    }else if (this.itemsTable.length == 0) {
      this.poAlert.alert({title: "Atenção!", message: "Não foram adicionados itens para gravação."});
      return false
    } else{
      this.gravaSaida();
    }

  }

  validaItens(){
    if(this.valorUnitario == undefined || this.valorUnitario == 0 || this.quantidade == undefined || this.quantidade == 0 || this.cProdutoSelecionado == undefined  ){
      this.poAlert.alert({title: "Atenção!", message: "Preencha todos os itens para depois poder adicionar."});
      return false;
    }else{
      //Verifico se o produto possui saldo
      //var saldoProduto = this.aProdutos.filter(p => p.value.includes(this.cProdutoSelecionado));
      for (let index = 0; index < this.aProdutos.length; index++) {
        if (this.aProdutos[index].recno == this.cProdutoSelecionado){
          if(this.aProdutos[index].quantidadeEstoque < this.quantidade){
            this.poAlert.alert({title: "Atenção!", message: "O produto não possui saldo para atender esta requisição, faça inventário ou dê entrada no produto."});
            return false;
          }else{
            return true
          }
        } 
      }
    }
  }

  getProduto(){
    this.almoxService.getProduct().subscribe(dados => {
      this.itens = [];
      this.itens = dados
      this.aProdutos = this.itens
     .map( data => {
        return {
          codigoProduto: data.codigoProduto,
          descricaoProduto: data.descricaoProduto,
          recno: data.recno,
          valorUnitario: data.valorUnitario,
          quantidadeEstoque: data.quantidade,
        }
    });

    this.SelProduto = [];
    if (this.aProdutos.length > 0) {
      for(var i = 0; i < this.aProdutos.length; i++){
        this.SelProduto.push(
          { label: this.aProdutos[i].descricaoProduto, value: this.aProdutos[i].recno })
      };
    }
    });
  };

  Cancela(){
    this.router.navigate(['saida']);
  };

}
