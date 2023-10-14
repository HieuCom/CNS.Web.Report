import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { MessageContstants } from 'src/app/core/common/message.constants';
import { DataService } from 'src/app/core/services/data.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { BanHangComponent } from '../BanHang/banhang.component';

@Component({
  selector: 'app-banhang-list',
  templateUrl: './banhang-list.component.html',
  styleUrls: ['./banhang-list.component.css']
})
export class BanHangListComponent implements OnInit {

  @ViewChild('modalAddEdit', { static: false }) public modalAddEdit: ModalDirective;
  public keyword: string = "";
  public dateRange: Date[];
  public fromDate: Date = new Date();
  public toDate: Date = new Date();
  public serviceType: string = "";
  public transportMode: number = 0;
  public portOfLoading: number = 0;
  public portOfDischarge: number = 0;
  public pageNumber: number = 1;
  public pageSize: number = 20;
  public pageDisplay: number = 10;
  public totalRow: number;
  public filter: string = '';
  public banhangs: any[];
  public locations: any[];
  public entity: any;
  checkedAll: boolean = false;
  bsModalRef: BsModalRef;
  constructor(private dataService: DataService,
    private _notificationService: NotificationService,
    private modalService: BsModalService) { }

  tabOpenParams = {
    totalRow: 0,
    fromDate: new Date(),
    toDate: new Date(),
    pageNumber: 1,
    pageSize: 10,
    sort: "",
    direction: ""
  }

  ngOnInit() {
    this.fromDate.setDate(1);
    this.toDate.setDate
    this.loadData();
  }

  async loadData() {
    let data = [];
    data.push(
      "@TU_NGAY", this.fromDate,
      // "@TU_NGAY", '20230501',
      "@DEN_NGAY", this.toDate,
      "@ID_LOAI_CT", 21,
      "@ID_KHO", 0,
      "@ID_KHO_NHAN", 0,
      "@ID_DV", 1,
      "@ID_DT", 0,
      "@ID_SP", 0,
      "@ID_KM", 0,
      "@ID_VV", 0,
      "@UserId", 0,
      "@DA_TT", 0,
      "@PageNumber", this.tabOpenParams.pageNumber,
      "@PageSize", this.tabOpenParams.pageSize,);

    let params = { "CommandText": "spChungTuHangHoaVatTuSearch_GAN_Web", "CommandType": 1025, "Parameters": data }
    await this.dataService.post('/commands/paged', params).subscribe((response: any) => {
      if (response.Data) {
        this.banhangs = response.Data;
        this.totalRow = response.TotalItems;
        this.checkedAll = false;
      }
    });
  }

  onValueChangeDateRange(rangeDate) {
    if (rangeDate != undefined) {
      this.fromDate = rangeDate;
      this.loadData();
    }
  }
  onValueChangeDateRange2(rangeDate2) {
    if (rangeDate2 != undefined) {
      this.toDate = rangeDate2;
      this.loadData();
    }
  }
  loadbanhang(id: any) {
    this.bsModalRef = this.modalService.show(BanHangComponent, { initialState: { id }, class: 'modal-lg' });

    this.bsModalRef.content.event.subscribe(res => {
      this.loadData();
    });
  }
  reloaddata() {
    this.loadData();
  }
  showCreatebanhangModel() {
    const id: any = 0
    this.loadbanhang(id);
  }

  pageChanged(event: any): void {
    this.pageNumber = event.page;
    this.loadData();
  }
  onChangePageSize() {
    this.loadData();
  }

  showAddModal() {
    this.entity = {};
    this.modalAddEdit.show();
  }

  showEditModal(id: any) {
    this.loadbanhang(id);
    // this.modalAddEdit.show();
  }

  deleteItem(id: any) {
    this._notificationService.printConfirmationDialog(MessageContstants.CONFIRM_DELETE_MSG, () => this.deleteItemConfirm(id));
  }

  deleteItemConfirm(id: any) {
    this.dataService.delete('/banhangs/' + id).subscribe((response: Response) => {
      this._notificationService.printSuccessMessage(MessageContstants.DELETED_OK_MSG);
      this.loadData();
    });
  }

  public columnInfobanhang: any[] = [
    {
      "Name": "NGAY_CT",
      "Caption": "Ngày CT",
      "Width": 70,
      "Format": "d"
    },
    {
      "Name": "SO_CT",
      "Caption": "Số CT",
      "Format": "",
      "Width": 90
    },
    {
      "Name": "MA_DT",
      "Caption": "Mã KH",
      "Format": "",
      "Width": 90
    },
    {
      "Name": "TEN_DT",
      "Caption": "Tên khách hàng",
      "Format": "",
      "Width": 200
    },
    {
      "Name": "ONG_BA",
      "Caption": "Ông/Bà",
      "Format": "",
      "Width": 150
    },
    {
      "Name": "TIEN",
      "Caption": "Tiền hàng",
      "Width": 90,
      "Format": "#,##0.##;(#,##0.##);#"
    },
    {
      "Name": "TIEN_VAT",
      "Caption": "Tiền VAT",
      "Width": 100,
      "Format": "#,##0.##;(#,##0.##);#"
    },
    {
      "Name": "TIEN_CK",
      "Caption": "Chiết khấu",
      "Width": 90,
      "Format": "#,##0.##;(#,##0.##);#"
    },
    {
      "Name": "TONG_TIEN",
      "Caption": "Tổng tiền",
      "Width": 90,
      "Format": "#,##0.##;(#,##0.##);#"
    },
    {
      "Name": "DIEN_GIAI",
      "Caption": "Diễn giải",
      "Format": "",
      "Width": 250
    },
    {
      "Name": "NGAY_LAP",
      "Caption": "Ngày lập",
      "Width": 70,
      "Format": "d"
    },
    {
      "Name": "NGUOI_LAP",
      "Caption": "Người lập",
      "Format": "",
      "Width": 90,
    },
    {
      "Name": "NGAY_SUA",
      "Caption": "Ngày sửa",
      "Width": 70,
      "Format": "d"
    },
    {
      "Name": "NGUOI_SUA",
      "Caption": "Người sửa",
      "Format": "",
      "Width": 90
    },
  ]
}
