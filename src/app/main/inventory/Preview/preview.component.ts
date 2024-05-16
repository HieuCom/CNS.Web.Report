import { Component, ElementRef, EventEmitter, OnInit, TemplateRef, ViewChild, ɵɵinjectPipeChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MessageContstants } from 'src/app/core/common/message.constants';
import { FormErrors } from 'src/app/core/helpers/form.errors';
import { AuthenService } from 'src/app/core/services/authen.service';
import { ColuminfoService } from 'src/app/core/services/columinfo.service';
import { DataService } from 'src/app/core/services/data.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-printNKC',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {
  public fromDate: string ='';
  public toDate: string = '';
  public chungtus: any[];
  public pageNumber: number = 1;
  public pageSize: number = 20;
  public pageDisplay: number = 10;
  public totalRow: number;
  public userLoginId: number;
  
  public nametable :string ;
  
  public stringheadtable:string =`
  <tr>
            <th colspan="2" style="text-align: center;" class="large-column">
              CHỨNG TỪ
            </th>
       
            <th rowspan="2" class="small-column">
              DIỄN GIẢI
            </th>
            <th rowspan="2" class="small-column">
              TK DƯ
            </th>
            <th colspan="2" style="text-align: center;" class="large-column">
              PHÁT SINH
            </th>
          </tr>
      
          <tr>
            <th>SỐ CT</th>
            <th>NGÀY CT</th>
            <th>NỢ</th>
            <th>CÓ</th>
           
        </tr>
  
  `;
  public headHtml: SafeHtml;
  public rowHtml: SafeHtml;


   

  constructor(private _dataService: DataService,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private columnInfoService: ColuminfoService,
    private _authenService: AuthenService) {
      this.headHtml = this.sanitizer.bypassSecurityTrustHtml(this.stringheadtable);

     
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
    this.chungtus.sort((a, b) => (a.SO_CT > b.SO_CT) ? 1 : ((b.SO_CT > a.SO_CT) ? -1 : 0));
    //this.loadData();

  }

  
  getTotal(chungtus, groupName, field) {
    return chungtus
      .filter(chungtu => chungtu.SO_CT === groupName)
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
      "Name": "SO_CT",
      "Width": 50,
      "Format": ""
    },
    {
      "Name": "NGAY_CT",
      "Caption": "Tên Hàng Hóa ,Vật Tư ", 
      "Width": 70,
      "Format": "d"
    },
    {
      "Name": "DIEN_GIAI",
      "Caption": "Đơn Vị Tính",
      "Width": 50,
      "Format": ""
    },
    {
      "Name": "MA_TK",
      "Caption": "Lượng Đầu Kỳ",
      "Width": 50,
      "Format": ""
    },
    {
      "Name": "PS_NO",
      "Caption": "Phát sinh nợ",
      "Width": 50,
      "Format": "#,##0.##;(#,##0.##);#"
    },
    {
      "Name": "PS_CO",
      "Caption": "Phát sinh có",
      "Width": 50,
      "Format": "#,##0.##;(#,##0.##);#"
    },
      
    
  ]

 
  

}