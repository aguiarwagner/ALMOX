import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PoNotificationService } from '@po-ui/ng-components';
import { AlmoxService } from 'src/app/almox/almox.service';

@Component({
  selector: 'app-visualiza-saida',
  templateUrl: './visualiza-saida.component.html',
  styleUrls: ['./visualiza-saida.component.scss']
})
export class VisualizaSaidaComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private almoxService: AlmoxService,
    public poNotification: PoNotificationService
  ) { }

  ngOnInit(): void {
    this.visualSaida();
  }
  visualSaida(){
    debugger
    const id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  Cancel(){
    this.router.navigate(['saida']);
  }
}
