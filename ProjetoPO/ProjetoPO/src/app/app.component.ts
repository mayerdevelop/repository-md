import { Component } from '@angular/core';

import { PoMenuItem } from '@po-ui/ng-components';

import {  PoPageDynamicTableCustomTableAction, PoPageDynamicTableOptions } from '@po-ui/ng-templates';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  readonly menus: Array<PoMenuItem> = [
    { label: 'Home', action: this.onClick.bind(this) },
    { label: 'Teste', action: this.onClick.bind(this) }
  ];

  serviceApi = `http://200.98.81.201:40160/rest/Financial/?CODIGO=03463964`;


  tableCustomActions: Array<PoPageDynamicTableCustomTableAction> = [];

  onLoad(): PoPageDynamicTableOptions {
    return {
      fields: [
        { property: 'titulo', label: 'Título', gridLgColumns: 4 , filter: true},
        { property: 'prefixo', label: 'Prefixo', gridLgColumns: 4, filter: true },
        { property: 'filial', label: 'Filial', gridLgColumns: 4, filter: true },
        { property: 'emissao', label: 'Emissão', gridLgColumns: 4, filter: true },
        { property: 'cliente', label: 'Cliente', gridLgColumns: 12 , filter: true},
        { property: 'vencimento', label: 'Vencimento', gridLgColumns: 4, filter: true },
        { property: 'valor', label: 'Valor', gridLgColumns: 4, filter: true },
        { property: 'parcela', allowColumnsManager: true, label: 'Parcela', gridLgColumns: 4, filter: true },
        { property: 'status', type: 'label', labels:[
          { value: 'Pago', color: 'color-11', label: 'Pago' },
          { value: 'Em Aberto', color: 'color-08', label: 'Em Aberto' },
          { value: 'Atrasado', color: 'color-07', label: 'Atrasado' },
        ], gridLgColumns: 4, filter: true },
      ]
    };
  }

  private onClick() {
    alert('Clicked in menu item')
  }

}
