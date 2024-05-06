import { Component, ElementRef, EventEmitter, OnInit, TemplateRef, ViewChild, ɵɵinjectPipeChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MessageContstants } from 'src/app/core/common/message.constants';
import { FormErrors } from 'src/app/core/helpers/form.errors';
import { AuthenService } from 'src/app/core/services/authen.service';
import { ColuminfoService } from 'src/app/core/services/columinfo.service';
import { DataService } from 'src/app/core/services/data.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-printtk',
  templateUrl: './printtk.html',
  styleUrls: ['./printtk.component.css']
})
export class PrintTKComponent implements OnInit {
  public fromDate: string ='';
  public toDate: string = '';
  public chungtus: any[];
  public pageNumber: number = 1;
  public pageSize: number = 20;
  public pageDisplay: number = 10;
  public totalRow: number;
  public userLoginId: number;
  public nametable :string ;

   

  constructor(private _dataService: DataService,
    private route: ActivatedRoute,
    private columnInfoService: ColuminfoService,
    private _authenService: AuthenService) {
  }

  ngOnInit() {
    var user = this._authenService.getLoggedInUser();
    this.getUserIdLogin(user.username);


  
    //get param from component

    this.route.queryParams.subscribe(params => {
      this.fromDate =params['fromDate']
      this.toDate = params['toDate']
      this.nametable = params['nametable']
      // .split('-').reverse().join('/')
     
    });

    this.chungtus = history.state.chungtus;
    this.chungtus.sort((a, b) => (a.MA_NHOM_NL > b.MA_NHOM_NL) ? 1 : ((b.MA_NHOM_NL > a.MA_NHOM_NL) ? -1 : 0));
    //this.loadData();
  }

  
  getTotal(chungtus, groupName, field) {
    return chungtus
      .filter(chungtu => chungtu.MA_NHOM_NL === groupName)
      .reduce((sum, chungtu) => sum + chungtu[field], 0);
}

  async getUserIdLogin(userName) {
    if (userName) {
      let data = [];
      data.push("@UserName", userName);
      let params = { "CommandText": "uspDoiTuong___FindUserName", "CommandType": 1025, "Parameters": data }
      await this._dataService.post('/commands', params).subscribe((response: any) => {
        if (response.Data) {
          this.userLoginId = response.Data[0].ID_DT;
        }
      });
    }
  }

  public columnInfonhapkho: any[] = [
    {
      "Name": "MA_NL",
      "Width": 50,
      "Format": ""
    },
    {
      "Name": "TEN_NL",
      "Caption": "Tên Hàng Hóa ,Vật Tư ", 
      "Width": 70,
      "Format": ""
    },
    {
      "Name": "TEN_DVT",
      "Caption": "Đơn Vị Tính",
      "Width": 50,
      "Format": ""
    },
    {
      "Name": "LUONG_DK",
      "Caption": "Lượng Đầu Kỳ",
      "Width": 50,
      "Format": "#,##0.##;(#,##0.##);#"
    },
    {
      "Name": "TIEN_DK",
      "Caption": "Tiền Đầu Kỳ",
      "Width": 50,
      "Format": "#,##0.##;(#,##0.##);#"
    },
    {
        "Name": "LUONG_NHAP",
        "Caption": "Lượng nhập",
        "Width": 50,
        "Format": "#,##0.##;(#,##0.##);#"
      },
      {
        "Name": "TIEN_NHAP",
        "Caption": "Tiền nhập",
        "Width": 50,
        "Format": "#,##0.##;(#,##0.##);#"
      },
      {
        "Name": "LUONG_XUAT",
        "Caption": "Lượng xuất",
        "Width": 50,
        "Format": "#,##0.##;(#,##0.##);#"
      },
      {
        "Name": "TIEN_XUAT",
        "Caption": "Tiền xuất",
        "Width": 50,
        "Format": "#,##0.##;(#,##0.##);#"
      },
      {
        "Name": "LUONG_TON",
        "Caption": "Lượng tồn",
        "Width": 50,
        "Format": "#,##0.##;(#,##0.##);#"
      },

      {
        "Name": "TIEN_TON",
        "Caption": "Lượng tồn",
        "Width": 50,
        "Format": "#,##0.##;(#,##0.##);#"
      },
    
  ]
  

}