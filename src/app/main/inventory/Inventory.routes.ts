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
const routes: Routes = [
    { path: 'banhang', component: BanHangListComponent },
    { path: 'nhapkho', component: NhapKhoListComponent },
    { path: 'baocao', component: TheoDoiChungTuComponent },
    { path: 'candoi', component: CanDoiKeToanComponent2 },
    { path: 'hoatdong', component: HoaDongListComponent },
    { path: 'luuchuyentt', component: LuuChuyenTienTeListComponent2 },
    { path: 'nhapxuattk', component: NhapXuatTonKhoComponent },
    {path: 'printCDKT', component: PrintCanDoiKeToanComponent},
    {path: 'printTK', component: PrintTKComponent}
    

];
export const inventoryRouter = RouterModule.forChild(routes);