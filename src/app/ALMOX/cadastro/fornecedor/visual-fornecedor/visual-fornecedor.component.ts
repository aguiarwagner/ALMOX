import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PoNotificationService, PoSelectOption } from '@po-ui/ng-components';
import { AlmoxService } from 'src/app/almox/almox.service';
import { Mapa } from 'src/app/almox/shared/mapa';

@Component({
  selector: 'app-visualizar-fornecedor',
  templateUrl: './visual-fornecedor.component.html',
  styleUrls: ['./visual-fornecedor.component.scss']
})
export class VisualFornecedorComponent implements OnInit {
  mapa: Mapa = new Mapa();
  items: Array<any>;
  itens_mapa;
  cod;
  lOk: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private almoxService: AlmoxService,
    public poNotification: PoNotificationService
  ) { }

  ngOnInit(): void {
  this.visualFornecedor()
  }

  visualFornecedor(){
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
          cep: data.cep
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
        this.mapa.cep = this.items[i].cep;
      }
    }
    })

  }

  CancelGrava(){
    this.router.navigate(['fornecedor']);
  }

  readonly SelTipo: Array<PoSelectOption> = [
    { label: 'Jurídico', value: '1' },
    { label: 'Físico', value: '2' }

  ];

}
