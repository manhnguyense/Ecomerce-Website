import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { CartModule } from './../cart/cart.module';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzFormModule } from 'ng-zorro-antd/form';
import { ReactiveFormsModule } from '@angular/forms';
import { shareIcons } from './../../shared/share-icon';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { PaymentComponent } from './components/payment/payment.component';
import { ShippingComponent } from './components/shipping/shipping.component';
import { InformationComponent } from './components/information/information.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { CartItemModule } from './../../shared/modules/cart-item/cart-item.module';
import { checkoutRoutes } from './checkout.routing';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { CheckoutComponent } from './page/checkout/checkout.component';
import { FooterComponent } from './components/footer/footer.component';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { OrderStepsComponent } from './components/order-steps/order-steps.component';
import { ProductGroupComponent } from './components/product-group/product-group.component';
import { CheckoutSummaryComponent } from './components/checkout-summary/checkout-summary.component';
@NgModule({
  declarations: [
    InformationComponent,
    ShippingComponent,
    PaymentComponent,
    CheckoutComponent,
    FooterComponent,
    OrderStepsComponent,
    ProductGroupComponent,
    CheckoutSummaryComponent
  ],
  imports: [
    CommonModule,
    CartItemModule,
    ReactiveFormsModule,
    CartModule,

    NzInputModule,
    NzGridModule,
    NzBreadCrumbModule,
    NzFormModule,
    NzSelectModule,
    NzButtonModule,
    NzStepsModule,
    NzPopoverModule,

    NzIconModule.forChild(shareIcons),
    RouterModule.forChild(checkoutRoutes)
  ]
})
export class CheckoutModule { }
