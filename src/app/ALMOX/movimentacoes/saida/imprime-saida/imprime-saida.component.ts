import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PoNotificationService } from '@po-ui/ng-components';
import printJS from 'print-js'

import { AlmoxService } from 'src/app/almox/almox.service';

@Component({
  selector: 'app-imprime-saida',
  templateUrl: './imprime-saida.component.html',
  styleUrls: ['./imprime-saida.component.scss']
})
export class ImprimeSaidaComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private almoxService: AlmoxService,
    public poNotification: PoNotificationService
  ) { }

  ngOnInit(): void {
    debugger
    const id = this.activatedRoute.snapshot.paramMap.get('id');

  }

}
