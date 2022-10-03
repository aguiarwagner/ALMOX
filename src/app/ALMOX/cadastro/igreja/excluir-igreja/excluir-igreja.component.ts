import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PoNotificationService } from '@po-ui/ng-components';
import { AlmoxService } from 'src/app/almox/almox.service';
import { Mapa } from 'src/app/almox/shared/mapa';

@Component({
  selector: 'app-excluir-igreja',
  templateUrl: './excluir-igreja.component.html',
  styleUrls: ['./excluir-igreja.component.scss']
})
export class ExcluirIgrejaComponent implements OnInit {
  mapa: Mapa = new Mapa();
  itens_mapa;
  items: Array<any>;
  lOk: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private almoxService: AlmoxService,
    public poNotification: PoNotificationService
  ) { }

  ngOnInit(): void {
    this.carregaIgreja();
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
          this.mapa.recno = this.items[i].recno;
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

  excluiIgreja(){
    this.almoxService.deleteIgrejaid(this.mapa.recno).subscribe(() => {
      this.lOk = true
      this.router.navigate(["/igreja"]);
      this.poNotification.success("Registro excluido com sucesso!");
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

  CancelGrava(){
    this.router.navigate(['igreja']);
  }
}
