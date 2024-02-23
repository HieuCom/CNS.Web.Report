import { BanHangListComponent } from './BanHangList/banhang-list.component';
import { Routes, RouterModule } from '@angular/router';
import { NhapKhoListComponent } from './NhapKhoList/nhapkho-list.component';
import { TheoDoiChungTuComponent } from './TheoDoiChungTu/theodoichungtu.component';
const routes: Routes = [
    { path: 'banhang', component: BanHangListComponent },
    { path: 'nhapkho', component: NhapKhoListComponent },
    { path: 'baocao', component: TheoDoiChungTuComponent },
    

];
export const inventoryRouter = RouterModule.forChild(routes);