import { BanHangListComponent } from './BanHangList/banhang-list.component';
import { Routes, RouterModule } from '@angular/router';
import { NhapKhoListComponent } from './NhapKhoList/nhapkho-list.component';
const routes: Routes = [
    { path: 'banhang', component: BanHangListComponent },
    { path: 'nhapkho', component: NhapKhoListComponent }

];
export const inventoryRouter = RouterModule.forChild(routes);