import { catchError } from 'rxjs/operators';
import { environment } from './../../../../environments/environment';
import { ProductOptions } from './../../model/product/product-option';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseParams } from '@core/model/base-params';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private readonly httpClient: HttpClient) { }

  getListProduct(productOption: ProductOptions, baseParams: BaseParams) {
    let params = new HttpParams()
      .append('page', `${baseParams.pageIndex}`)
      .append('pageSize', `${baseParams.pageSize}`)

    return this.httpClient.post(`${environment.productServiceUrl}/api/product/product-all-store`, productOption,
      { params }).pipe(
        catchError(error => {
          return of(error.error);
        })
      );
  }
  getProductById(id: number) {
    return this.httpClient.get(`${environment.productServiceUrl}/api/product/${id}`).pipe(
      catchError(error => {
        return of(error.error);
      })
    );
  }
}
