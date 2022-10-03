export class Mapa {
  id: number;
  codigoProduto: string;
  descricaoProduto: string;
  estoqueMinimo: number;
  unidadeMedida: string;
  valorUnitario: number;
  endereco: string;
  telefone: string;
  cep: string;
  atalho: number;
  codigoRelatorio: string;
  descricaoIgreja: string;
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
  dataEntrada: string;
  numnf: string;
  serienf: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
