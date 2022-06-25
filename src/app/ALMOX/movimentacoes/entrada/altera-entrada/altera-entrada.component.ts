import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PoNotificationService } from '@po-ui/ng-components';
import { AlmoxService } from 'src/app/almox/almox.service';

@Component({
  selector: 'app-altera-entrada',
  templateUrl: './altera-entrada.component.html',
  styleUrls: ['./altera-entrada.component.scss']
})
export class AlteraEntradaComponent implements OnInit {
  //dados: Array <any>;

  @Input() dados: Array<{ id: number, nome: string }>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private almoxService: AlmoxService,
    public poNotification: PoNotificationService
  ) { }

  ngOnInit(): void {
    //this.dados = [];
    //this.dados = [{nome: string, Id: number}];
    this.dados = [{
      "id": 442,
      "nome": "Myrtle"
    }, {
      "id": 376,
      "nome": "Georgette"
    }, {
      "id": 882,
      "nome": "Manning"
    }, {
      "id": 414,
      "nome": "Essie"
    }, {
      "id": 466,
      "nome": "Augusta"
    }, {
      "id": 315,
      "nome": "Mueller"
    }, {
      "id": 344,
      "nome": "Walter"}];

    debugger

    this.alteraEntrada();
  }

  alteraEntrada(){
    const id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  Cancel(){
    this.router.navigate(['entrada']);
  }
}
