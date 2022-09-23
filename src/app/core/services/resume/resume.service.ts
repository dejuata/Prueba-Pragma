import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductModel } from '@app/core/models/product.model';
import { environment } from '@environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ResumeService {
  private readonly uriProducts = '/api/products/';

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get(`${environment.backendUrl}${this.uriProducts}`).pipe(
      map((res: any) => {
        if (res.products) {
          return {
            status: true,
            data: res.products.map((product) => ProductModel.import(product)),
          };
        } else {
          return { status: false, data: [] };
        }
      })
    );
  }
}
