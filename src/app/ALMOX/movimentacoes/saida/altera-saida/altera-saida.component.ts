import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PoDialogService, PoModalAction, PoModalComponent, PoNotificationService, PoPageAction, PoSelectOption, PoTableColumn } from '@po-ui/ng-components';
import { AlmoxService } from 'src/app/almox/almox.service';

@Component({
  selector: 'app-altera-saida',
  templateUrl: './altera-saida.component.html',
  styleUrls: ['./altera-saida.component.scss']
})
export class AlteraSaidaComponent implements OnInit {
  recnoIgreja: number;
  valorUnitario: number;
  valorTotal: number;
  quantidade: number;
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
  recno: number;
  recnoProduto: number;
  item: number;
  valunitAltera: number;
  valtotAltera: number;
  quantAltera: number;
  descprodAlteracao: string;
  nItemAtu: number;
  aProdutos: Array<any>;
  itemsTable: Array<any>;
  aGrava: Array<any>;
  lOk: boolean = false;
  itens;
  items: Array<any>;

  @ViewChild('alteraItemModal') alteraItemModal: PoModalComponent;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private almoxService: AlmoxService,
    public poNotification: PoNotificationService,
    private poAlert: PoDialogService,
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.laltera = false;
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
      { action: this.alteraItemSaida.bind(this), label: 'Alterar' }
    ]

    this.getIgreja();
    this.getProduto();
    this.AlteraSaida();
  }

  AlteraSaida(){
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
          recnoProduto: data.recnoProduto,
          codigoProduto: data.codigoProduto,
          valorUnitario: data.valorUnitario,
          quantidade: data.quantidade,
          descricaoProduto: data.descricaoProduto,
          recnoIgreja: data.recnoIgreja,
        }
      });
      
      this.recnoIgreja = this.items[0].recnoIgreja
      //this.recnoProduto = this.items[0].recnoProduto
      //this.codigoRelatorio = this.items[0].codigoRelatorio
      this.recno = this.items[0].recno
      this.dataSaida = this.items[0].dataSaida
      this.Solicitante = this.items[0].solicitante
      this.cpfSolicitante = this.items[0].cpfSolicitante


      this.itemsTable = [];
      this.isLoading = false;
      //this.SelFornec = [];
      for (let index = 0; index < this.items.length; index++) {
        this.itemsTable.push(
          { recnoProduto: this.items[index].recnoProduto, item: this.items[index].item,descricaoProduto:  this.items[index].descricaoProduto, quantidade: this.items[index].quantidade, valorUnitario: this.items[index].valorUnitario, valorTotal: this.items[index].valorTotal }
        );
      }
    });

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

  alteraItemSaida(event){
    this.nItemAtu = event.item;
    this.cProdutoAlterado = event.recnoProduto;
    this.valunitAltera = event.valorUnitario;
    this.quantAltera = event.quantidade;
    this.valtotAltera = event.valorTotal;
    this.alteraItemModal.open();
    this.laltera = true;
  }


  alteraProdutoSel(event){
    for (let index = 0; index < this.aProdutos.length; index++) {
      if (this.aProdutos[index].recno == event){
        this.valorUnitario = parseFloat(this.aProdutos[index].valorUnitario)
      }
    }
  }

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

  Adiciona(){

    if (this.laltera){
      for(var i = 0; i < this.itemsTable.length; i++){
        if (this.itemsTable[i].recnoProduto == this.recnoProduto){
          this.itemsTable[i].descricaoProduto =  this.descricaoProduto;
          this.itemsTable[i].item =  this.item++;
          this.itemsTable[i].recno =  this.recnoProduto;
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
            this.recnoProduto = this.aProdutos[i].recno;
          }
        }
        this.item = this.itemsTable.length + 1;
        this.itemsTable.push(
          { recnoProduto: this.recnoProduto, item: this.item,descricaoProduto:this.descricaoProduto, quantidade:this.quantidade ,valorUnitario:this.valorUnitario, valorTotal: this.quantidade * this.valorUnitario})

        this.laltera = false;
      }
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

  gravaSaida(){
    this.aGrava = [];
    this.aGrava.push([{recno: this.recno, recnoIgreja: this.recnoIgreja, dataSaida: this.dataSaida, solicitante: this.Solicitante, cpfSolicitante: this.cpfSolicitante}])
    this.aGrava.push([this.itemsTable]);

    this.almoxService.putSaida(this.aGrava).subscribe(() => {
      this.lOk = true
      this.poNotification.success("Registro alterado com sucesso!");
      location.reload();
    })

    const sleep = (milliseconds) => {
      return new Promise((resolve) => setTimeout(resolve, milliseconds));
    };

    // Aguarda 5 segundos
    sleep(5000).then(() => {
      if (!this.lOk) {
        this.poNotification.error("Erro na alteração da saida!");
      }
    });
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

  salvarAlteracao(){
    for(var i = 0; i < this.aProdutos.length; i++){
      if (parseInt(this.aProdutos[i].codigoProduto) == parseInt(this.cProdutoAlterado)){
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

  Cancela(){
    this.router.navigate(['saida']);
  };

}
