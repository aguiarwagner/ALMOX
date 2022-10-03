import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PoBreadcrumb, PoDisclaimerGroup, PoNotificationService, PoPageAction, PoTableColumn } from '@po-ui/ng-components';
import { AlmoxService } from 'src/app/almox/almox.service';
import { Mapa } from 'src/app/almox/shared/mapa';

@Component({
  selector: 'app-visual-igreja',
  templateUrl: './visual-igreja.component.html',
  styleUrls: ['./visual-igreja.component.scss']
})
export class VisualIgrejaComponent implements OnInit {
  mapa: Mapa = new Mapa();
  columns: Array<PoTableColumn>;
  pageActions: Array<PoPageAction>;
  breadcrumb: PoBreadcrumb;
  disclaimerGroup: PoDisclaimerGroup;
  loadButton = false;
  labelButton = "Cadastrar de Igrejas";
  isLoading: boolean = true;
  itemsFiltered: Array<any>;
  itens_mapa;
  items: Array<any>;
  tableActions: Array<PoPageAction>;
  isPageEdit: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private almoxService: AlmoxService,
    public poNotification: PoNotificationService
  ) { }

  ngOnInit(): void {
    this.visualIgreja();
  }
  visualIgreja(){

    const id = this.activatedRoute.snapshot.paramMap.get('id');

    this.isPageEdit = true;

      this.almoxService.getIgrejaid(id).subscribe(dados => {
        this.itens_mapa = [];
        this.itens_mapa = dados
        this.items = this.itens_mapa
       .map( data => {
          return {
            recno: data.recno,
            descricaoIgreja: data.descricaoIgreja,
            codigoRelatorio: data.codigoRelatorio,
            atalho: data.atalho,
            endereco: data.endereco,
            telefone: data.telefone,
            cep: data.cep
          }
      });
      if (this.items.length > 0) {
        for(var i = 0; i < this.items.length; i++){
          this.mapa.descricaoIgreja = this.items[i].descricaoIgreja;
          this.mapa.codigoRelatorio = this.items[i].codigoRelatorio;
          this.mapa.atalho = this.items[i].atalho;
          this.mapa.endereco = this.items[i].endereco;
          this.mapa.telefone = this.items[i].telefone;
          this.mapa.cep = this.items[i].cep;

        }
      }

      });

  }

  CancelGrava(){
    this.router.navigate(['igreja']);
  }

}
