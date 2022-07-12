import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponsePageable } from './ResponsePageable';
import { Mapa } from './shared/mapa';

@Injectable({
  providedIn: 'root'
})
export class AlmoxService {
  httpOptions = {
    headers: new HttpHeaders({
      'content-Type': 'application/json'
    })
  };

constructor(
  private http: HttpClient
  ) { }


  getProduct(): Observable<ResponsePageable> {

    return this.http.get<ResponsePageable>('http://localhost:5000/produtos');

  }

  getProductid(id: string): Observable<ResponsePageable> {

    return this.http.get<ResponsePageable>('http://localhost:5000/produtos?codprod='+id);

  }

  putProduct(mapa: Mapa): Observable<ResponsePageable> {

    return this.http.put<ResponsePageable>('http://localhost:5000/produtos', mapa);

  }

  postProduct(mapa: Mapa)  {
    return this.http.post('http://localhost:5000/produtos', mapa);
  }

  postEntrada(mapa)  {
    return this.http.post('http://localhost:5000/entrada', mapa);
  }

  getEntrada(recno: string): Observable<ResponsePageable> {
    return this.http.get<ResponsePageable>('http://localhost:5000/entrada?recno='+recno);
  }

  getSaida(recno: string): Observable<ResponsePageable> {
    return this.http.get<ResponsePageable>('http://localhost:5000/saida?recno='+recno);
  }

  getEntradaId(recno: string): Observable<ResponsePageable> {
    return this.http.get<ResponsePageable>('http://localhost:5000/entrada?recno='+recno);
  }

  //postEntrada(mapa: Mapa)  {
  //  return this.http.post('http://localhost:5000/entrada', mapa);
  //}

  postEntradaItem(mapa: Mapa)  {
    return this.http.post('http://localhost:5000/entrada', mapa);
  }

  deleteProduct(codprod: string)  {
    return this.http.delete('http://localhost:5000/produtos?codprod='+codprod);
  }

  deleteEntrada(recno: string)  {
    return this.http.delete('http://localhost:5000/entrada?recno='+recno);
  }

  getIgreja(): Observable<ResponsePageable> {
  return this.http.get<ResponsePageable>('http://localhost:5000/igreja');
  }

  getIgrejaid(id: string): Observable<any> {
    return this.http.get('http://localhost:5000/igreja?recno='+id);
  }

  postIgreja(mapa: Mapa)  {
    return this.http.post('http://localhost:5000/igreja', mapa);
  }

  postSaida(mapa)  {
    return this.http.post('http://localhost:5000/saida', mapa);
  }

  putIgreja(mapa: Mapa)  {
    return this.http.put('http://localhost:5000/igreja', mapa);
  }

  deleteIgrejaid(id: number): Observable<any> {
    return this.http.delete('http://localhost:5000/igreja?recno='+id);
  }

  getFornecedor(): Observable<ResponsePageable> {
    return this.http.get<ResponsePageable>('http://localhost:5000/fornecedor');
  }

  postFornecedor(mapa: Mapa)  {
    return this.http.post('http://localhost:5000/fornecedor', mapa);
  }

  getFornecedorId(id: string): Observable<any> {
    return this.http.get('http://localhost:5000/fornecedor?recno='+id);
  }

  putFornecedor(mapa: Mapa)  {
    return this.http.put('http://localhost:5000/fornecedor', mapa);
  }
  deleteFornecedor(id: number): Observable<any> {
    return this.http.delete('http://localhost:5000/fornecedor?recno='+id);
  }

  getEntCabec(): Observable<ResponsePageable> {

    return this.http.get<ResponsePageable>('http://localhost:5000/entrada');

  }

  getSaidaCabec(): Observable<ResponsePageable> {

    return this.http.get<ResponsePageable>('http://localhost:5000/saida');

  }

}
