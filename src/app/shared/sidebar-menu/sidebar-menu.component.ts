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
  constructor(private authenService: AuthenService, private dataService: DataService) { }

  ngOnInit() {
    // const user = this.authenService.getLoggedInUser();
    // const params = { '@UserName': user.username, '@OrganizationId': user.orgCurrentId };
    // this.dataService.submit('/auth/accounts/GetUserRightFunctions', params).subscribe((result: any) => {
    //   this.functions = result;
    // }, error => this.dataService.handleError(error));
  }

}

// functions = [
//   {
//     "ID": "TASK",
//     "Name": "Quản lý công việc",
//     "Url": "/",
//     "DisplayOrder": 4,
//     "ParentId": null,
//     "Parent": null,
//     "ChildFunctions": [
//       {
//         "ID": "ALC_TASK_LIST",
//         "Name": "Mục việc chưa khởi tạo",
//         "Url": "/main/task/alcTaskItem",
//         "DisplayOrder": 1,
//         "ParentId": "TASK",
//         "Parent": {
//           "ID": "TASK",
//           "Name": "Quản lý công việc",
//           "Url": "/",
//           "DisplayOrder": 4,
//           "ParentId": null,
//           "Parent": null,
//           "ChildFunctions": null,
//           "Status": true,
//           "IconAwesome": "fa-tasks"
//         },
//         "ChildFunctions": null,
//         "Status": true,
//         "IconAwesome": null
//       },
//       {
//         "ID": "TASK_LIST",
//         "Name": "Danh sách công việc",
//         "Url": "/main/task",
//         "DisplayOrder": 2,
//         "ParentId": "TASK",
//         "Parent": {
//           "ID": "TASK",
//           "Name": "Quản lý công việc",
//           "Url": "/",
//           "DisplayOrder": 4,
//           "ParentId": null,
//           "Parent": null,
//           "ChildFunctions": null,
//           "Status": true,
//           "IconAwesome": "fa-tasks"
//         },
//         "ChildFunctions": null,
//         "Status": true,
//         "IconAwesome": null
//       }
//     ],
//     "Status": true,
//     "IconAwesome": "fa-tasks"
//   }
// ]