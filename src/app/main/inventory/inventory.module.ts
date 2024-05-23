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
import { PrintNhatKyChungComponent } from './PrintNhatKyChung/printnhatkychung.component';
import { PreviewComponent } from './Preview/preview.component';
import { SoChiTietTKComponent } from './TheoDoiHoatDong/sochitiettk.component';

import { SoQuyTienGuiNHComponent } from './SoTienGuiNH/soquytienguinh.component';
import { PreviewSQTNHComponent } from './SoTienGuiNH/preview-sqnh.component';
import { SoQuyTongHopComponent } from './SoTienGuiNH/tonghop.component';
import { TongHopBaoCaoComponent } from './TongHopBaoCao/tonghopbaocao.component';
import { TheKhoComponent } from './TheKho/thekho.component';
import { PreviewTheKhoComponent } from './TheKho/preview-thekho.component';
import { HoaDonMuaVaoComponent } from './HoaDonMuaVao/hoadonmuavao.component';
import { PreviewHDMVComponent } from './HoaDonMuaVao/preview-hoadonmuavao.component';
import { HoaDonBanRaComponent } from './HoaDonMuaVao/hoadonbanra.component';
import { SoChiTietKhoComponent } from './SoChiTietKho/sochitietkho.component';
import { PreviewSCTKComponent } from './SoChiTietKho/preview-sochitietkho.component';
import { SoChiTietCongNoComponent } from './SoChiTietCongNo/sochitietcongno.component';
import { PreviewSCCNComponent } from './SoChiTietCongNo/preview-sochitietcongno.component';
import { SoQuyTienMatComponent } from './SoQuyTienMat/soquytienmat.component';
import { PreviewSQTMComponent } from './SoQuyTienMat/preview-sqtm.component';
import { BangKeChungTuComponent } from './BanKeChungTu/bangkechungtu.component';
import { PreviewBKCTComponent } from './BanKeChungTu/preview-bkct.component';


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
    SoChiTietTKComponent,
    SoQuyTienMatComponent,
    SoQuyTienGuiNHComponent,
    TongHopBaoCaoComponent,
    SoQuyTongHopComponent,
    TheKhoComponent,
    HoaDonMuaVaoComponent,
    HoaDonBanRaComponent,
    SoChiTietKhoComponent,
    SoChiTietCongNoComponent,
    BangKeChungTuComponent,


    PreviewSQTMComponent,
    PrintTKComponent,
    PrintCanDoiKeToanComponent,
    PrintNhatKyChungComponent,
    PreviewComponent,
    PreviewSQTNHComponent,
    PreviewTheKhoComponent,
    PreviewHDMVComponent,
    PreviewSCTKComponent,
    PreviewSCCNComponent,
    PreviewBKCTComponent
    
   

    
    // SimpleTinyComponent
  ],
  providers: [
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' },
    DataService, UtilityService, UploadService,ColuminfoService
  ]
})
export class inventoryModule {
}
