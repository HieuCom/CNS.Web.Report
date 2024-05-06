import {  NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TranslateModule } from '@ngx-translate/core';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { BanHangComponent } from './BanHang/banhang.component';
import { BanHangListComponent } from './BanHangList/banhang-list.component';
import { UtilityService } from 'src/app/core/services/utility.service';
import { SignalrService } from 'src/app/core/services/signalr.service';
import { DataService } from 'src/app/core/services/data.service';
import { AuthenService } from 'src/app/core/services/authen.service';
import { UploadService } from 'src/app/core/services/upload.service';
import { inventoryRouter } from './Inventory.routes';
import { CommonpipeModule } from '../pipe/commonpipe.module';
import { NhapKhoComponent } from './NhapKho/nhapkho.component';
import { NhapKhoListComponent } from './NhapKhoList/nhapkho-list.component';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { SelectTonKhoComponent } from './SelectTonKho/selecttonkho.component';
import { TheoDoiChungTuComponent } from './TheoDoiChungTu/theodoichungtu.component';
import { HoaDongListComponent } from './TheoDoiHoatDong/hoatdong-list.component';
import { PrintCanDoiKeToanComponent } from './PrintCDKT/CanDoiKeToan/TheoDoiChungTu/print-candoiketoan.component';
import { ColuminfoService } from 'src/app/core/services/columinfo.service';
import { CanDoiKeToanComponent2 } from './TheoDoiHoatDong/cdkt.component';
import { LuuChuyenTienTeListComponent2 } from './TheoDoiHoatDong/lctt';
import { NhapXuatTonKhoComponent } from './TheoDoiHoatDong/nhapxuattonkho.component';
import { PrintTKComponent } from './PrintTonKho/printtk.component';
import { SoNhatKyChungComponent } from './TheoDoiHoatDong/sonhatkychung.component';

@NgModule({
  imports: [
    CommonModule,
    TabsModule,
    TranslateModule,
    PaginationModule,
    FormsModule,
    ReactiveFormsModule,
    inventoryRouter,
    SharedModule,
    EditorModule,
    BsDatepickerModule.forRoot(),
    ProgressbarModule.forRoot(),
    CommonpipeModule,
    TypeaheadModule.forRoot()
  ],
  declarations: [
    BanHangListComponent,
    BanHangComponent,
    NhapKhoComponent,
    NhapKhoListComponent,
    SelectTonKhoComponent,
    TheoDoiChungTuComponent,
    CanDoiKeToanComponent2,
    HoaDongListComponent,
    LuuChuyenTienTeListComponent2,
    NhapXuatTonKhoComponent,
    SoNhatKyChungComponent,
    PrintTKComponent,
    PrintCanDoiKeToanComponent,

    
    // SimpleTinyComponent
  ],
  providers: [
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' },
    DataService, UtilityService, UploadService,ColuminfoService
  ]
})
export class inventoryModule {
}
