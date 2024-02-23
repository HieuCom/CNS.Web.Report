import { Component, OnInit } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { AuthenService } from '../../core/services/authen.service';
import { SystemConstants } from '../../core/common/system.constants';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.css']
})
export class SidebarMenuComponent implements OnInit {
  public functions: any[];
  public userLevel: any;
  constructor(private authenService: AuthenService, private dataService: DataService) { }

  ngOnInit() {
    const user = this.authenService.getLoggedInUser();
    let data = [];
      data.push("@UserName",  user.username);
      let params = { "CommandText": "uspUser___FindUserName", "CommandType": 1025, "Parameters": data }
       this.dataService.post('/commands', params).subscribe((response: any) => {
        if (response.Data) {
          this.userLevel = response.Data[0].Level;
        }
      });
    // const params = { '@UserName': user.username, '@OrganizationId': user.orgCurrentId };
    // this.dataService.submit('/auth/accounts/GetUserRightFunctions', params).subscribe((result: any) => {
    //   let url = "/auth/accounts?filter=UserName='"+user.username+"'"
    //   this.dataService.post(url).subscribe((result: any) => {
    //   this.functions = result;
    // }, error => this.dataService.handleError(error));
  }
}
