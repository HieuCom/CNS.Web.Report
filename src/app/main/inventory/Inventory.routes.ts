import { BanHangListComponent } from './BanHangList/banhang-list.component';
import { Routes, RouterModule } from '@angular/router';
import { NhapKhoListComponent } from './NhapKhoList/nhapkho-list.component';
import { TheoDoiChungTuComponent } from './TheoDoiChungTu/theodoichungtu.component';
import { HoaDongListComponent } from './TheoDoiHoatDong/hoatdong-list.component';
import { PrintCanDoiKeToanComponent } from './PrintCDKT/CanDoiKeToan/TheoDoiChungTu/print-candoiketoan.component';
import { LuuChuyenTienTeListComponent2 } from './TheoDoiHoatDong/lctt';
import { CanDoiKeToanComponent2 } from './TheoDoiHoatDong/cdkt.component';
import { NhapXuatTonKhoComponent } from './TheoDoiHoatDong/nhapxuattonkho.component';
import { PrintTKComponent } from './PrintTonKho/printtk.component';
import { SoNhatKyChungComponent } from './TheoDoiHoatDong/sonhatkychung.component';
import { PrintNhatKyChungComponent } from './PrintNhatKyChung/printnhatkychung.component';
import { PreviewComponent } from './Preview/preview.component';
import { SoChiTietTKComponent } from './TheoDoiHoatDong/sochitiettk.component';

import { PreviewSQTNHComponent } from './SoTienGuiNH/preview-sqnh.component';

import { SoQuyTienGuiNHComponent } from './SoTienGuiNH/soquytienguinh.component';
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
import { PreviewBKCTComponent } from './BanKeChungTu/preview-bkct.component';
import { BangKeChungTuComponent } from './BanKeChungTu/bangkechungtu.component';

const routes: Routes = [
    { path: 'banhang', component: BanHangListComponent },
    { path: 'nhapkho', component: NhapKhoListComponent },
    { path: 'baocao', component: TheoDoiChungTuComponent },
    { path: 'candoi', component: CanDoiKeToanComponent2 },
    { path: 'hoatdong', component: HoaDongListComponent },
    { path: 'luuchuyentt', component: LuuChuyenTienTeListComponent2 },
    { path: 'nhapxuattk', component: NhapXuatTonKhoComponent },
    { path: 'sonhatky', component: SoNhatKyChungComponent },
    { path: 'sochitiettk', component: SoChiTietTKComponent },
    { path: 'soquytienmat', component: SoQuyTienMatComponent },
    { path: 'sotienguinh', component: SoQuyTienGuiNHComponent },
    { path: 'soquytonghop', component: SoQuyTongHopComponent },
    {path: 'tonghopbaocao', component: TongHopBaoCaoComponent},
    {path: 'thekho', component: TheKhoComponent},
    {path: 'hoadonmuavao', component: HoaDonMuaVaoComponent},
    {path: 'hoadonbanra', component: HoaDonBanRaComponent},
    {path: 'sochitietkho', component: SoChiTietKhoComponent},
    {path: 'sochitietcongno', component: SoChiTietCongNoComponent},
    {path: 'bangkechungtu', component: BangKeChungTuComponent},

    
    {path: 'printCDKT', component: PrintCanDoiKeToanComponent},
    {path: 'printTK', component: PrintTKComponent},
    {path: 'printNKC', component: PrintNhatKyChungComponent},
    {path: 'print', component: PreviewComponent},
    {path: 'prinSQTM', component: PreviewBKCTComponent},
    {path: 'printSQTGNH', component: PreviewSQTNHComponent},
    {path: 'printTheKho', component: PreviewTheKhoComponent},
    {path: 'printHDMV', component: PreviewHDMVComponent},
    {path: 'printSCTK', component: PreviewSCTKComponent},
    {path: 'printSCCN', component: PreviewSCCNComponent},
    {path: 'printBKCT', component: PreviewBKCTComponent},
    
    

];
export const inventoryRouter = RouterModule.forChild(routes);