import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PoNotificationService } from '@po-ui/ng-components';
import { AlmoxService } from 'src/app/almox/almox.service';

@Component({
  selector: 'app-excluir',
  templateUrl: './exclui-entrada.component.html',
  styleUrls: ['./exclui-entrada.component.scss']
})
export class ExcluiEntradaComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private almoxService: AlmoxService,
    public poNotification: PoNotificationService
  ) { }

  ngOnInit(): void {
    this.ExcluiEntrada();
  }

  ExcluiEntrada(){
    const id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  Cancel(){
    this.router.navigate(['entrada']);
  }

}
