import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';




const endpoint = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest';
const httpOptions = {
  method: 'GET',
  qs: {
    start: 1,
    limit: 5000,
    convert: 'USD'
  },
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'X-CMC_PRO_API_KEY': 'b54bcf4d-1bca-4e8e-9a24-22ff2c3d462c'
  }),
  json: true,
  gzip: true
};

@Injectable({
  providedIn: 'root'
})
export class RestService {

  protected url = 'https://public-api.wordpress.com/rest/v1.1/sites/vocon-it.com/posts';

  constructor(private http: HttpClient, public sanitizer: DomSanitizer) {}

   private extractData(res: Response) {
    let body = res;
    return body || { };
  }
  
  getProducts(): Observable<any> {
    return this.http.get(this.url).pipe(
      map(this.extractData));
  }
  
  getProduct(id): Observable<any> {
    return this.http.get(endpoint + 'products/' + id).pipe(
      map(this.extractData));
  }
  
  addProduct (product): Observable<any> {
    console.log(product);
    return this.http.post<any>(endpoint + 'products', JSON.stringify(product), httpOptions).pipe(
      tap((product) => console.log(`added product w/ id=${product.id}`)),
      catchError(this.handleError<any>('addProduct'))
    );
  }
  
  updateProduct (id, product): Observable<any> {
    return this.http.put(endpoint + 'products/' + id, JSON.stringify(product), httpOptions).pipe(
      tap(_ => console.log(`updated product id=${id}`)),
      catchError(this.handleError<any>('updateProduct'))
    );
  }
  
  deleteProduct (id): Observable<any> {
    return this.http.delete<any>(endpoint + 'products/' + id, httpOptions).pipe(
      tap(_ => console.log(`deleted product id=${id}`)),
      catchError(this.handleError<any>('deleteProduct'))
    );
  }
  
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
