import { ProductDetail } from './../../model/product-detail';
import { ProductService } from '@modules/product/services/product.service';
import { finalize } from 'rxjs/operators';
import { BaseParams } from '@modules/common/base-params';
import { BrandService } from '@modules/brand/services/brand.service';
import { CategoryService } from '@modules/category/services/category.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { Brand } from '@modules/brand/models/brand';
import { Category } from '@modules/category/models/category';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  isLoadingCategoryInSelect = true;
  isLoadingBrandInSelect = true;
  isLoadingProductEdit = false;
  isLoadingButtonSubmit = false;

  listCategory: Category[];
  listBrand: Brand[];
  productForm: FormGroup;
  params = new BaseParams();

  //image
  listImage: NzUploadFile[] = [];

  //productDetail

  listProductDetail: ProductDetail[] = [];

  productId: number;
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly categoryService: CategoryService,
    private readonly brandService: BrandService,
    private readonly productService: ProductService,
    private readonly messageService: NzMessageService,
    private readonly activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.loadCategory();
    this.loadBrand();

    //edit mode
    this.productId = this.activatedRoute.snapshot.params.id;
    if (this.productId !== undefined) {
      this.loadProductEdit(this.productId);
    }
  }

  loadProductEdit(productId: number) {
    this.isLoadingProductEdit = true;
    this.productService.getById(productId).pipe(
      finalize(() => this.isLoadingProductEdit = false)
    )
      .subscribe(res => {
        if (res.code == "OK") {
          let listProductDetail = [];
          let listFile = [];
          const product = res.data;

          this.productForm.controls.productName.setValue(product.productName);
          this.productForm.controls.price.setValue(product.price);
          this.productForm.controls.categoryId.setValue(product.categoryId);
          this.productForm.controls.brandId.setValue(product.brandId);

          product.productImages.forEach((productImage, index) => {
            let file = {
              uid: index,
              url: productImage.image,
              name: 'image.png',
            };
            listFile.push(file)
          })
          this.listImage = listFile;


          product.productDetails.forEach(item => {
            listProductDetail.push(item);
          })

          this.listProductDetail = listProductDetail;
        }
      });
  }

  buildForm() {
    this.productForm = this.formBuilder.group({
      productName: [null, Validators.required],
      price: [null, [Validators.required, Validators.min(0)]],
      brandId: [null, Validators.required],
      categoryId: [null, Validators.required],
    })
  }

  loadCategory() {
    this.params.pageSize = 50;
    this.categoryService.getAll(this.params).pipe(
      finalize(() => this.isLoadingCategoryInSelect = false)
    ).subscribe(
      res => {
        if (res.code == "OK") {
          this.listCategory = res.data.content;
        }
      }
    )
  }

  loadBrand() {
    this.params.pageSize = 50;
    this.brandService.getAll(this.params).pipe(
      finalize(() => this.isLoadingBrandInSelect = false)
    ).subscribe(
      res => {
        if (res.code == "OK") {
          this.listBrand = res.data.content;
        }
      }
    )
  }

  submitForm() {
    let product = {
      id: null,
      categoryName: null,
      brandName: null,
      productName: this.productForm.get("productName").value,
      price: this.productForm.get("price").value,
      categoryId: this.productForm.get("categoryId").value,
      brandId: this.productForm.get("brandId").value,
      productDetails: this.listProductDetail,
      productImages: [],
      images: []
    };

    this.listImage.forEach(f => {
      if (f.status === "done") {
        this.productId == undefined || f.url === undefined ? product.images.push(f.response.data[0]) : product.images.push(f.url);
      }
    })

    this.isLoadingButtonSubmit = true;

    //edit mode
    if (this.productId != undefined) {
      product.id = this.productId;
      this.productService
        .update(product)
        .pipe(finalize(() => (this.isLoadingButtonSubmit = false)))
        .subscribe((res) => {
          if (res.code == 'OK') {
            this.messageService.create('success', `Update product successfully!`);
            this.productForm.reset();
          }
        });
    }
    //create mode
    else {
      this.productService
        .create(product)
        .pipe(finalize(() => (this.isLoadingButtonSubmit = false)))
        .subscribe((res) => {
          if (res.code == 'OK') {
            this.messageService.create('success', `Create product successfully!`);
          }
        });
    }
  }

}
