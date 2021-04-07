import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { shareIcons } from './share-icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzRateModule } from 'ng-zorro-antd/rate';
@NgModule({
  declarations: [],
  imports: [
    NzGridModule,
    NzInputModule,
    NzButtonModule,
    NzDrawerModule,
    NzFormModule,
    NzToolTipModule,
    NzCheckboxModule,
    NzModalModule,
    NzSelectModule,
    NzCarouselModule,
    NzRateModule,
    NzIconModule.forChild(shareIcons),
  ],
  exports: [
    CommonModule,
    NzGridModule,
    NzIconModule,
    NzInputModule,
    NzButtonModule,
    NzDrawerModule,
    NzFormModule,
    NzToolTipModule,
    NzCheckboxModule,
    NzModalModule,
    NzSelectModule,
    NzCarouselModule,
    NzRateModule
  ],
  providers: []
})
export class NgZorroAntdModule { }
