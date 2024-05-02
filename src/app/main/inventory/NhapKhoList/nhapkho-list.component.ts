import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { MessageContstants } from 'src/app/core/common/message.constants';
import { DataService } from 'src/app/core/services/data.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NhapKhoComponent } from '../NhapKho/nhapkho.component';

@Component({
  selector: 'app-nhapkho-list',
  templateUrl: './nhapkho-list.component.html',
  styleUrls: ['./nhapkho-list.component.css']
})
export class NhapKhoListComponent implements OnInit {

  @ViewChild('modalAddEdit', { static: false }) public modalAddEdit: ModalDirective;
  public keyword: string = "";
  public dateRange: Date[];
  public fromDate: Date = new Date();
  public toDate: Date = new Date();
  public pageNumber: number = 1;
  public pageSize: number = 20;
  public pageDisplay: number = 10;
  public totalRow: number;
  public filter: string = '';
  public nhapkhos: any[];

  bsModalRef: BsModalRef;
  
  constructor(private dataService: DataService,
    private _notificationService: NotificationService,
    private modalService: BsModalService) { }

  ngOnInit() {
    this.fromDate.setDate(1);
    this.toDate.setDate
    this.loadData();
  }

  async loadData() {
    let data = [];
    data.push(
      "@TU_NGAY", this.fromDate,
      "@DEN_NGAY", this.toDate,
      "@ID_LOAI_CT", 11,
      "@ID_KHO", 0,
      "@ID_KHO_NHAN", 0,
      "@ID_DV", 1,
      "@ID_DT", 0,
      "@ID_SP", 0,
      "@ID_KM", 0,
      "@ID_VV", 0,
      "@UserId", 0,
      "@DA_TT", 0,
      "@PageNumber", this.pageNumber,
      "@PageSize", this.pageSize,);

    let params = { "CommandText": "spChungTuHangHoaVatTuSearch_GAN_Web", "CommandType": 1025, "Parameters": data }
    await this.dataService.post('/commands/paged', params).subscribe((response: any) => {
      if (response.Data) {
        this.nhapkhos = response.Data;
        this.totalRow = response.Data[0].TotalItems
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
  // load using service
  loadnhapkho(id: any) {
    this.bsModalRef = this.modalService.show(NhapKhoComponent, { initialState: { id }, class: 'modal-lg' });

    this.bsModalRef.content.event.subscribe(res => {
      this.loadData();
    });
  }

  reloaddata() {
    this.loadData();
  }
  showCreatenhapkhoModel() {
    const id: any = 0
    this.loadnhapkho(id);
  }

  pageChanged(event: any): void {
    this.pageNumber = event.page;
    this.loadData();
  }
  onChangePageSize() {
    this.loadData();
  }

  showEditModal(id: any) {
    this.loadnhapkho(id);
    // this.modalAddEdit.show();
  }

  deleteItem(id: any) {
    this._notificationService.printConfirmationDialog(MessageContstants.CONFIRM_DELETE_MSG, () => this.deleteItemConfirm(id));
  }

  deleteItemConfirm(id: any) {
    let data = [];
        data.push("@ID_PS", id);
        let params = { "CommandText": "uspbit2PSHangHoa___DeleteHierarchy", "CommandType": 1025, "Parameters": data }
        this.dataService.post('/commands', params).subscribe((response: any) => {
          this._notificationService.printSuccessMessage(MessageContstants.DELETED_OK_MSG);
          this.loadData();
        }, error => this.dataService.handleError(error));

  }

  
  public columnInfonhapkho: any[] = [
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
