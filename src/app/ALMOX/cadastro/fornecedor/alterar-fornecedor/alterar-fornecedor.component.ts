import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PoNotificationService, PoSelectOption } from '@po-ui/ng-components';
import { AlmoxService } from 'src/app/almox/almox.service';
import { Mapa } from 'src/app/almox/shared/mapa';

@Component({
  selector: 'app-alterar-fornecedor',
  templateUrl: './alterar-fornecedor.component.html',
  styleUrls: ['./alterar-fornecedor.component.scss']
})
export class AlterarFornecedorComponent implements OnInit {
  mapa: Mapa = new Mapa();
  statusOptions: Array<PoSelectOption>
  lOk: boolean;
  items: Array<any>;
  itens_mapa;
  tipo: number;



  constructor(
    private activatedRoute: ActivatedRoute,
    private almoxService: AlmoxService,
    public poNotification: PoNotificationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getFornecedor()
  }

  getFornecedor(){
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    var produtos = [];
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
          recno: data.recno,
          cep: data.cep,
        }
    });
    if (this.items.length > 0) {
      for(var i = 0; i < this.items.length; i++){
        this.mapa.nome = this.items[i].nome;
        this.mapa.cnpj = this.items[i].cnpj;
        this.mapa.cep = this.items[i].cep;
        if (this.items[i].tipo = "Jurídico"){
          this.mapa.tipo = 1;
        }else{
          this.mapa.tipo = 2;
        }
        //this.mapa.tipo = this.items[i].tipo;
        this.mapa.tel = this.items[i].tel;
        this.mapa.endereco = this.items[i].endereco;
        this.mapa.ultcompra = this.items[i].ultcompra;
        this.mapa.recno = this.items[i].recno;
        this.mapa.cep = this.items[i].cep;
      }
    }
    })

  }

  alteraFornecedor() {

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
    if (this.mapa.ultcompra == undefined){
      this.mapa.ultcompra = '  /  /    '
    }

    this.almoxService.putFornecedor(this.mapa).subscribe(() => {
      this.lOk = true
      this.router.navigate(["/fornecedor"]);
      this.poNotification.success("Registro alterado com sucesso!");
    })
    const sleep = (milliseconds) => {
      return new Promise((resolve) => setTimeout(resolve, milliseconds));
    };

    // Aguarda 5 segundos
    sleep(5000).then(() => {
      if (!this.lOk) {
        this.poNotification.error("Erro na alteração!");
      }
    });

  }

  CancelGrava(){
    this.router.navigate(['fornecedor']);
  }

  readonly SelTipo: Array<PoSelectOption> = [
    { label: 'Jurídico', value: 1 },
    { label: 'Físico', value: 2 }

  ];

}
