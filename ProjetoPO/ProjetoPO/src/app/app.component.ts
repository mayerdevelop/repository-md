import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PoBreadcrumb, PoModalComponent, PoPageAction } from '@po-ui/ng-components';

import { PoPageDynamicTableOptions } from '@po-ui/ng-templates';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(PoModalComponent, { static: true })
  poModal!: PoModalComponent;
  quickSearchWidth: number = 3;
  detailedChamado: Array<any> = []

  serviceApi = `http://200.98.81.201:40160/rest/EnvChamdo/?cod_cliente=${localStorage.getItem('cod_cliente')}&loja_cliente=${localStorage.getItem('loja_cliente')}`;

  public readonly actions: Array<PoPageAction> = [
    { label: 'Formulário', url: '/FORMULARIO', icon: 'po-icon po-icon-cart' },
  ];
  public readonly breadcrumb: PoBreadcrumb = {
    items: [{ label: 'Home', link: '/' }, { label: 'Garantia' }]
  };

  constructor(public http: HttpClient) { }

  onLoad(): PoPageDynamicTableOptions {
    return {
      fields: [
        { property: 'chamado', label: 'Chamado', gridLgColumns: 6 , filter: true},
        { property: 'nota', label: 'Nota', gridLgColumns: 4 , filter: true},
        { property: 'item', label: 'Item', gridLgColumns: 4, filter: true },
        { property: 'emissao', label: 'Emissão', gridLgColumns: 4, filter: true },
        { property: 'produto', label: 'Produto', gridLgColumns: 4, filter: true },
        { property: 'descricao', label: 'Descrição', gridLgColumns: 20, filter: true },
        { property: 'quantidade', label: 'Quantidade', gridLgColumns: 4 , filter: true},
        { property: 'preco', label: 'Valor', gridLgColumns: 4, filter: true },
        { property: 'defeito', label: 'Defeito', gridLgColumns: 4, filter: true },
        { property: 'tipodefeito', label: 'Tipo Defeito', gridLgColumns: 4, filter: true },
        { property: 'status', type: 'label', labels:[
          { value: '2', color: 'color-11', label: 'Atendido' },
          { value: '1', color: 'color-08', label: 'Em Aberto' },
          { value: '3', color: 'color-07', label: 'Negado' },
        ], gridLgColumns: 4, filter: true },
      ]
    };
  }

  ngOnInit(): void {
  } 
  modalOpen() {
    this.poModal.open();
  }

}
