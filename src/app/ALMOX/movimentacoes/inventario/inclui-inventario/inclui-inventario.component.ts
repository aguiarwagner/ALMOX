import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inclui-inventario',
  templateUrl: './inclui-inventario.component.html',
  styleUrls: ['./inclui-inventario.component.scss']
})
export class IncluiInventarioComponent implements OnInit {
  cProdutoSelecionado: string;
  cProdutoAlterado: string;
  constructor() { }

  ngOnInit(): void {
  }

}
