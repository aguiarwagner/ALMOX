import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PoNotificationService } from '@po-ui/ng-components';
import { AlmoxService } from 'src/app/almox/almox.service';
import { Mapa } from 'src/app/almox/shared/mapa';

@Component({
  selector: 'app-excluir-fornecedor',
  templateUrl: './excluir-fornecedor.component.html',
  styleUrls: ['./excluir-fornecedor.component.scss']
})
export class ExcluirFornecedorComponent implements OnInit {
  mapa: Mapa = new Mapa();
  lOk: boolean;
  items: Array<any>;
  itens_mapa;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private almoxService: AlmoxService,
    public poNotification: PoNotificationService
  ) { }

  ngOnInit(): void {
    this.carregaFornecedor()
  }

  carregaFornecedor(){
    debugger
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.almoxService.getFornecedorId(id).subscribe(dados => {
      this.itens_mapa = [];
      this.itens_mapa = dados
      this.items = this.itens_mapa
     .map( data => {
        return {
          nome: data.nome,
          cnpj: data.cnpj,
          tipo: data.tipo,
          tel: data.tel,
          endereco: data.endereco,
          ultcompra: data.ultcompra,
          recno: data.recno
        }
    });
    if (this.items.length > 0) {
      for(var i = 0; i < this.items.length; i++){
        this.mapa.nome = this.items[i].nome;
        this.mapa.cnpj = this.items[i].cnpj;
        this.mapa.tipo = this.items[i].tipo;
        this.mapa.tel = this.items[i].tel;
        this.mapa.endereco = this.items[i].endereco;
        this.mapa.ultcompra = this.items[i].ultcompra;
        this.mapa.recno = this.items[i].recno;
      }
    }
    })

  }

  CancelGrava(){
    this.router.navigate(['fornecedor']);
  }

  excluiFornecedor() {
    debugger
    this.almoxService.deleteFornecedor(this.mapa.recno).subscribe(() => {
      this.lOk = true
      this.router.navigate(["/fornecedor"]);
      this.poNotification.success("Registro ecluido com sucesso!");
    })

    const sleep = (milliseconds) => {
      return new Promise((resolve) => setTimeout(resolve, milliseconds));
    };

    // Aguarda 5 segundos
    sleep(5000).then(() => {
      if (!this.lOk) {
        this.poNotification.error("Erro na exclusão!");
      }
    });
  }

}
