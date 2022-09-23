import { Component, OnInit } from '@angular/core';
import { ResumeService } from '@app/core/services/resume/resume.service';
import { ProductModel } from '@core/models/product.model';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.page.html',
  styleUrls: ['./resume.page.scss'],
})
export class ResumePage implements OnInit {
  public productsAccount: ProductModel[] = [];
  public productsCredits: ProductModel[] = [];

  constructor(private resumeService: ResumeService) {}

  get productAccountLength(){
    return this.productsAccount.length > 0 ;
  }

  get productCreditsLength(){
    return this.productsCredits.length > 0 ;
  }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.resumeService.getProducts().subscribe((res) => {
      const products: ProductModel[] = res.data;

      products.forEach(product => {
        if(product.productType === 'CA' && product.productStatus === 'ACTIVA') {
          this.productsAccount.push(product);
        }
        if(product.productType === 'CC' && product.productStatus === 'ACTIVA') {
          this.productsCredits.push(product);
        }
      });

    });
  }


}
