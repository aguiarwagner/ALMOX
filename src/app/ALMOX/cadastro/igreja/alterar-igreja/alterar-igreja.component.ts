import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PoBreadcrumb, PoDisclaimerGroup, PoNotificationService, PoPageAction, PoTableColumn } from '@po-ui/ng-components';
import { AlmoxService } from 'src/app/almox/almox.service';
import { Mapa } from 'src/app/almox/shared/mapa';

@Component({
  selector: 'app-alterar-igreja',
  templateUrl: './alterar-igreja.component.html',
  styleUrls: ['./alterar-igreja.component.scss']
})
export class AlterarIgrejaComponent implements OnInit {
  mapa: Mapa = new Mapa();
  columns: Array<PoTableColumn>;
  pageActions: Array<PoPageAction>;
  breadcrumb: PoBreadcrumb;
  disclaimerGroup: PoDisclaimerGroup;
  loadButton = false;
  labelButton = "Cadastrar Igrejas";
  isLoading: boolean = true;
  itemsFiltered: Array<any>;
  itens_mapa;
  items: Array<any>;
  tableActions: Array<PoPageAction>;
  lOk: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private almoxService: AlmoxService,
    public poNotification: PoNotificationService
  ) { }

  ngOnInit(): void {
    this.carregaIgreja()
  }

  carregaIgreja(){
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.almoxService.getIgrejaid(id).subscribe(dados => {
      this.itens_mapa = [];
      this.itens_mapa = dados
      this.items = this.itens_mapa
     .map( data => {
        return {
          recno: data.recno,
          descigreja: data.descigreja,
          codrelat: data.codrelat,
          atalho: data.atalho,
          endereco: data.endereco,
          tel: data.tel,
          cep: data.cep
        }
    });
    if (this.items.length > 0) {
      for(var i = 0; i < this.items.length; i++){
        this.mapa.recno = this.items[i].recno;
        this.mapa.descigreja = this.items[i].descigreja;
        this.mapa.codrelat = this.items[i].codrelat;
        this.mapa.atalho = this.items[i].atalho;
        this.mapa.endereco = this.items[i].endereco;
        this.mapa.tel = this.items[i].tel;
        this.mapa.cep = this.items[i].cep;
      }
    }

    });

  }

  alteraIgreja(){
    this.lOk = false;
    if (this.mapa.descigreja == undefined) {
      this.poNotification.success("Preencha a Igreja!");
      return;
    }

    if (this.mapa.codrelat == undefined) {
      this.poNotification.success("Preencha o código do relatório!");
      return;
    }

    if (this.mapa.endereco == undefined) {
      this.poNotification.success("Preencha o endereço");
      return;
    }

    this.almoxService.putIgreja(this.mapa).subscribe(() => {
      this.lOk = true
      this.router.navigate(["/igreja"]);
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
    this.router.navigate(['igreja']);
  }

}
