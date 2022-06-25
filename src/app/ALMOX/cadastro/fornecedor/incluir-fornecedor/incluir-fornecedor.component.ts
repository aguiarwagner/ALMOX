import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PoNotificationService, PoSelectOption } from '@po-ui/ng-components';
import { AlmoxService } from 'src/app/almox/almox.service';
import { Mapa } from 'src/app/almox/shared/mapa';

@Component({
  selector: 'app-incluir-fornecedor',
  templateUrl: './incluir-fornecedor.component.html',
  styleUrls: ['./incluir-fornecedor.component.scss']
})
export class IncluirFornecedorComponent implements OnInit {
  mapa: Mapa = new Mapa();
  statusOptions: Array<PoSelectOption>
  lOk: boolean;
  cnpj: string;

  constructor(
    private almoxService: AlmoxService,
    public poNotification: PoNotificationService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  gravaFornecedor() {

    if (this.mapa.tipo == undefined) {
      this.poNotification.success("Preencha o tipo do fornecedor!");
      return;
    }

    if (this.mapa.cnpj == undefined) {
      this.poNotification.success("Preencha o CNPJ!");
      return;
    }

    if (this.mapa.nome == undefined) {
      this.poNotification.success("Preencha o nome do fornecedor!");
      return;
    }
    debugger
    this.mapa.ultcompra = '  /  /    '
    this.almoxService.postFornecedor(this.mapa).subscribe(() => {
      this.lOk = true
      this.router.navigate(["/fornecedor"]);
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

  CancelGrava(){
    this.router.navigate(['fornecedor']);
  }

  readonly SelTipo: Array<PoSelectOption> = [
    { label: 'Jurídico', value: '1' },
    { label: 'Físico', value: '2' }

  ];

}
