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
  valunit: number;
  valtot: number;
  quant: number;
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
  datasaida = new Date();
  now: Date;
  SelProduto: Array<PoSelectOption>;
  cProdutoSelecionado: string;
  cProdutoAlterado: string;
  Solicitante: string;
  cpfSolicitante: string;
  laltera: boolean;
  descprod: string;
  recno: number;
  item: number;
  valunitAltera: number;
  valtotAltera: number;
  quantAltera: number;
  descprodAlteracao: string;
  nItemAtu: number;

  @ViewChild('alteraItemModal') alteraItemModal: PoModalComponent;

  constructor(
    private almoxService: AlmoxService,
    public poNotification: PoNotificationService,
    private poAlert: PoDialogService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.laltera = false;
    this.now = new Date();
    this.datasaida = this.now;
    this.itemsTable = [];
    this.item = 0;
    this.isLoading = false;
    this.valunit = 0;
    this.quant = 0 ;

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
      { action: this.alteraSaida.bind(this), label: 'Alterar' }
    ]

    this.getFornec();
    this.getProduto();
  }

  alteraSaida(event){
    this.nItemAtu = event.item;
    this.cProdutoAlterado = event.recnoProd;
    this.valunitAltera = event.valunit;
    this.quantAltera = event.quant;
    this.valtotAltera = event.valtot;
    this.alteraItemModal.open();
    this.laltera = true;
  }

  salvarAlteracao(){
    for(var i = 0; i < this.itens.length; i++){
      if (this.itens[i].recno == this.cProdutoAlterado){
        this.descprodAlteracao = this.itens[i].descprod
      };
    }
    for(var i = 0; i < this.itemsTable.length; i++){
      if (this.itemsTable[i].item == this.nItemAtu){
        this.itemsTable[i].descprod = this.descprodAlteracao;
        this.itemsTable[i].quant = this.quantAltera;
        this.itemsTable[i].valunit = this.valunitAltera;
        this.itemsTable[i].valtot = this.quantAltera * this.valunitAltera;
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

  getFornec(){
    this.almoxService.getIgreja().subscribe(dados => {
      this.itens = [];
      this.itens = dados
      this.items = this.itens
     .map( data => {
        return {
          recno: data.recno,
          nome: data.descigreja,
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
        this.valunit = parseFloat(this.aProdutos[index].valunit)
      }


    }
  }

  Adiciona(){

    if (this.laltera){
      for(var i = 0; i < this.itemsTable.length; i++){
        if (this.itemsTable[i].recnoProd == this.recno){
          this.itemsTable[i].descprod =  this.descprod;
          this.itemsTable[i].item =  this.item;
          this.itemsTable[i].recno =  this.recno;
          this.itemsTable[i].quant = this.quant;
          this.itemsTable[i].valunit = this.valunit;
          this.itemsTable[i].valtot = this.valtot;
        }
      }
    }else{
      if (this.validaItens()){
        for(var i = 0; i < this.aProdutos.length; i++){
          if (this.aProdutos[i].recno == this.cProdutoSelecionado){
            this.descprod = this.aProdutos[i].descprod;
            this.recno = this.aProdutos[i].recno;
          }
        }

        this.itemsTable.push(
          { recnoProd: this.recno, item: this.item += 1,descprod:this.descprod, quant:this.quant ,valunit:this.valunit, valtot: this.quant * this.valunit})

        this.laltera = false;
      }
    }
  }

  gravaSaida(){
    this.aGrava = [];
    this.aGrava.push([{recnoigreja: this.recnoIgreja, datasaida: this.datasaida, solicitante: this.Solicitante, cpfsolicitante: this.cpfSolicitante}])
    this.aGrava.push([this.itemsTable]);

    this.almoxService.postSaida(this.aGrava).subscribe(() => {
      this.lOk = true
      this.poNotification.success("Registro incluído com sucesso!");
      //this.itemsFiltered = [];
      //this.serienf = undefined;
      //this.numnf = undefined;
      //this.recnofornec = undefined;
      //this.quant = undefined;
      //this.valunit = undefined;
      //this.valtot = undefined;
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
    }else if(this.datasaida == undefined) {
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
    if(this.valunit == undefined || this.valunit == 0 || this.quant == undefined || this.quant == 0 || this.cProdutoSelecionado == undefined  ){
      this.poAlert.alert({title: "Atenção!", message: "Preencha todos os itens para depois poder adicionar."});
      return false;
    }else{
      return true
    }

  }

  getProduto(){
    this.almoxService.getProduct().subscribe(dados => {
      this.itens = [];
      this.itens = dados
      this.aProdutos = this.itens
     .map( data => {
        return {
          cod: data.cod,
          descprod: data.descprod,
          recno: data.recno,
          valunit: data.valunit,
        }
    });

    this.SelProduto = [];
    if (this.aProdutos.length > 0) {
      for(var i = 0; i < this.aProdutos.length; i++){
        this.SelProduto.push(
          { label: this.aProdutos[i].descprod, value: this.aProdutos[i].recno })
      };
    }
    });
  };

  Cancela(){
    this.router.navigate(['saida']);
  };

}
