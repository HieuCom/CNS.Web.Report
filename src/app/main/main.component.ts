import { Component, OnInit } from '@angular/core';
import { SystemConstants } from '../core/common/system.constants';
import { UrlConstants } from '../core/common/url.constants';
import { UtilityService } from '../core/services/utility.service';
import { AuthenService } from '../core/services/authen.service';
import { LoggedInUser } from '../core/domain/loggedin.user';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  public user: LoggedInUser;
  year = new Date().getFullYear();
  // public baseFolder: string = environment.ROOT_PATH;
  constructor(private utilityService: UtilityService, private authenService: AuthenService) { }

  ngOnInit() {
    this.user = this.authenService.getLoggedInUser();
    // this.user = JSON.parse(localStorage.getItem(SystemConstants.CURRENT_USER));
    // console.log(this.user);
  }
  logout() {
    localStorage.removeItem(SystemConstants.CURRENT_USER);
    this.utilityService.navigate(UrlConstants.LOGIN);
  }
}
