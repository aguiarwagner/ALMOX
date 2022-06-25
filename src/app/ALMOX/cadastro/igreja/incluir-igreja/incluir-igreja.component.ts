import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PoNotificationService } from '@po-ui/ng-components';
import { AlmoxService } from 'src/app/almox/almox.service';
import { Mapa } from 'src/app/almox/shared/mapa';




@Component({
  selector: 'app-incluir-igreja',
  templateUrl: './incluir-igreja.component.html',
  styleUrls: ['./incluir-igreja.component.scss']
})
export class IncluirIgrejaComponent implements OnInit {
  mapa: Mapa = new Mapa();
  endereco: string;
  lOk: boolean;

  constructor(
    private almoxService: AlmoxService,
    public poNotification: PoNotificationService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  gravaIgreja(){
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
    debugger
    this.almoxService.postIgreja(this.mapa).subscribe(() => {
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
