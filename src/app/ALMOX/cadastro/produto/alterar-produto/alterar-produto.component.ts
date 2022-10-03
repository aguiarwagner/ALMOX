import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PoNotificationService, PoSelectOption } from '@po-ui/ng-components';
import { AlmoxService } from 'src/app/almox/almox.service';
import { Mapa } from 'src/app/almox/shared/mapa';


@Component({
  selector: 'app-alterar-produto',
  templateUrl: './alterar-produto.component.html',
  styleUrls: ['./alterar-produto.component.scss']
})
export class AlterarProdutoComponent implements OnInit {
  mapa: Mapa = new Mapa();
  itens_mapa;
  items: Array<any>;
  itemsFiltered: Array<any>;
  codigoProduto;
  lOk: boolean;

  statusOptions: Array<PoSelectOption>


  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private almoxService: AlmoxService,
    public poNotification: PoNotificationService
  ) {}

  ngOnInit(): void {
    this.getDados()
  }

  private getDados() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    var produtos = [];
    this.almoxService.getProductid(id).subscribe(dados => {
      this.itens_mapa = [];
      this.itens_mapa = dados
      debugger
      this.items = this.itens_mapa
     .map( data => {
        return {
          codigoProduto: data.codigoProduto,
          //dataEntrada: data.dataEntrada,
          descricaoProduto: data.descricaoProduto,
          //dataSaida: data.dataSaida,
          estoqueMinimo: data.estoqueMinimo,
          unidadeMedida: data.unidadeMedida,
          valorUnitario: data.valorUnitario
        }
    });
    if (this.items.length > 0) {
      for(var i = 0; i < this.items.length; i++){
        this.mapa.codigoProduto = this.items[i].codigoProduto;
        this.mapa.descricaoProduto = this.items[i].descricaoProduto;
        this.mapa.valorUnitario = this.items[i].valorUnitario;
        this.mapa.estoqueMinimo = this.items[i].estoqueMinimo;
        this.mapa.unidadeMedida = this.items[i].unidadeMedida;
        this.mapa.estoqueMinimo = this.items[i].estoqueMinimo;
      }
    }
    })

  }

  gravaProd(){
    debugger
    this.almoxService.putProduct(this.mapa).subscribe(() => {
      this.lOk = true
      this.router.navigate(["/produto"]);
      this.poNotification.success("Registro alterado com sucesso!");
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
  CancelProd(){
    this.router.navigate(['produto']);
  }

  readonly SelUnimed: Array<PoSelectOption> = [
    { label: 'Caixa', value: 'CX' },
    { label: 'Unidade', value: 'UN' },
    { label: 'Galão', value: 'GL' },
    { label: 'Peça', value: 'PC' },
    { label: 'Pacote', value: 'PT' },
    { label: 'Fardo', value: 'FD' },
    { label: 'Par', value: 'PR' },
  ];

}

