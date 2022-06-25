import { Component } from '@angular/core';

import { PoMenuItem } from '@po-ui/ng-components';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ALMOX';
  readonly menus: Array<PoMenuItem> = [
    {
      label: 'Home',
      link: 'home',
      icon: 'po-icon-home',
      shortLabel: 'Home'
    },
    //{
    //  label: 'Produto',
    //  link: 'produto',
    //  icon: 'po-icon-world',
    //  shortLabel: 'Produto'
    //},
    { label: 'Cadastro', icon: 'po-icon-company', shortLabel: 'Cadastro', subItems: [
      { label: 'Produto', link: './produto' },
      { label: 'Fornecedor', link: './fornecedor' },
      { label: 'Igreja', link: './igreja' }
    ]},
    { label: 'Movimentações', icon: 'po-icon-company', shortLabel: 'Movimentações', subItems: [
      { label: 'Entrada', link: './entrada', icon: 'po-icon-world', shortLabel: 'Entrada' },
      { label: 'Saída', link: './saida', icon: 'po-icon-world', shortLabel: 'Saída' },
      { label: 'Inventário', link: './inventario', icon: 'po-icon-world', shortLabel: 'Inventário' }
    ]},

    { label: 'Relatórios', icon: 'po-icon-company', shortLabel: 'Relatórios', subItems: [
      { label: 'Entrada', link: './entrada', icon: 'po-icon-world', shortLabel: 'Entrada' },
      { label: 'Saída', link: './saida', icon: 'po-icon-world', shortLabel: 'Saída' },
      { label: 'Inventário', link: './inventario', icon: 'po-icon-world', shortLabel: 'Inventário' }
    ]},

  ];
}
