import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PoBreadcrumb, PoModalAction, PoModalComponent, PoPageAction, PoSelectOption } from '@po-ui/ng-components';

import { Subscription } from 'rxjs';
import { PoNotificationService } from "@po-ui/ng-components";

import { AlmoxService } from 'src/app/almox/almox.service';
import { Router } from '@angular/router';
import { Mapa } from 'src/app/almox/shared/mapa';

@Component({
  selector: 'app-incluir-produto',
  templateUrl: './incluir-produto.component.html',
  styleUrls: ['./incluir-produto.component.scss']
})
export class IncluirProdutoComponent implements OnInit {
  literals = {};
  isPageEdit: boolean;
  editProdutoActions: Array<PoPageAction>;
  newProdutoBreadcrumb: PoBreadcrumb;
  editProdutoBreadcrumb: PoBreadcrumb;
  newProdutoActions: Array<PoPageAction>;
  mapa: Mapa = new Mapa();
  codigoProduto: string;
  unidadeMedida: string;
 // private literalsSubscription: Subscription;
  confirmReturnToListAction: PoModalAction;
  descricaoProduto: string;
  lOk: boolean;
  valorUnitario: number;
  estoqueMinimo: number;
  statusOptions: Array<PoSelectOption>

  constructor(
    private almoxService: AlmoxService,
    public poNotification: PoNotificationService,
    private router: Router
  ) { }

  ngOnInit(): void {

  }

  gravaProd() {

    if (this.mapa.descricaoProduto == undefined) {
      this.poNotification.success("Preencha a descrção do produto!");
      return;
    }

    if (this.mapa.codigoProduto == undefined) {
      this.poNotification.success("Preencha o código do produto!");
      return;
    }

    if (this.mapa.unidadeMedida == undefined) {
      this.poNotification.success("Preencha a unidade de medida!");
      return;
    }
    debugger
    this.almoxService.postProduct(this.mapa).subscribe(() => {
      this.lOk = true
      this.router.navigate(["/produto"]);
      this.poNotification.success("Registro incluído com sucesso!");
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
