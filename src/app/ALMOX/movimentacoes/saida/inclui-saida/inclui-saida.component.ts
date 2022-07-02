import { Component, OnInit } from '@angular/core';
import { PoSelectOption } from '@po-ui/ng-components';

@Component({
  selector: 'app-inclui-saida',
  templateUrl: './inclui-saida.component.html',
  styleUrls: ['./inclui-saida.component.scss']
})
export class IncluiSaidaComponent implements OnInit {
  recnoIgreja: number;
  selIgreja: Array<PoSelectOption> = [];
  constructor() { }

  ngOnInit(): void {
  }

}
