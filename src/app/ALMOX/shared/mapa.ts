export class Mapa {
  id: number;
  codprod: string;
  descprod: string;
  estminimo: number;
  unimed: string;
  valunit: number;
  endereco: string;
  tel: string;
  cep: string;
  atalho: number;
  codrelat: string;
  descigreja: string;
  produto: string;
  recno: number;
  quant: number;
  valtotal: number;
  nome: string;
  cnpj: string;
  tipo: number;
  ultcompra: string;
  descfornec: string;
  codifornec: string;
  datent: string;
  numnf: string;
  serienf: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
