import { Component, ElementRef, EventEmitter, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { MessageContstants } from 'src/app/core/common/message.constants';
import { FormErrors } from 'src/app/core/helpers/form.errors';
import { AuthenService } from 'src/app/core/services/authen.service';
import { DataService } from 'src/app/core/services/data.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import PSCTJSON from 'src/assets/json/PSCTForm.json';
import { map, mergeMap } from 'rxjs/operators';
import { getDate } from 'ngx-bootstrap/chronos/utils/date-getters';

@Component({
  selector: 'nhapkho',
  templateUrl: './nhapkho.component.html',
  styleUrls: ['./nhapkho.component.css']
})
export class NhapKhoComponent implements OnInit {
  title: string;
  list: any[] = [];
  itemForm: FormGroup;
  PSCTModel: FormGroup;
  errors: any = {};
  id: number = 0;
  loading = false;
  initTiny = {
    base_url: '/tinymce',
    height: 250,
    language: 'vi_VN',
    skin_url: './assets/tinymce/skins/lightgray',
    language_url: './assets/tinymce/langs/vi_VN.js',
    plugins: "autosave autolink code codesample colorpicker emoticons fullscreen hr preview table textcolor wordcount",
    toolbar: "undo redo forecolor cut copy paste fontselect styleselect bold italic link preview code alignleft aligncenter alignright alignjustify",

  }
  PSTH: any = {};
  PSCT: any[] = [];
  PSCTRemove: any[] = [];
  descriptionTask: string;
  public event: EventEmitter<any> = new EventEmitter();
  bsValue = new Date();
  extenalNhapKho: any;
  maxProgressbar: number = 0;
  progressing: number = 0;
  userLoginId: any;
  userList: any;
  khoList: any;
  tienteList: any;
  doituongList: any;
  ID_DT: number;
  PSCTColumn = PSCTJSON.PSCTForm.ColumnInfo;
  peoples: any[] = [];
  keywordPeople: string;
  toDay: Date = new Date();
  user: any;

  constructor(public bsModalRef: BsModalRef,
    private notificationService: NotificationService,
    private _authenService: AuthenService,
    private formBuilder: FormBuilder,
    private formErrors: FormErrors,
    private dataService: DataService,) {
    this.initForm();
  }

  ngOnInit(): void {
    this.user = this._authenService.getLoggedInUser();
    this.getUserIdLogin(this.user.username);
    this.getListKho();
    this.getListTT();
    this.getListDT();
    if (this.id) {
      this.getChungTu();
    }
    else {
      this.toDay.setDate
      this.toDay = this.getNowUTC();
      this.PSTH.NGAY_CT = this.toDay
    }
  }


  private getNowUTC() {
    const now = new Date();
    return new Date(now.getTime() - (now.getTimezoneOffset() * 60000));
  }
  
  async getUserIdLogin(userName) {
    if (userName) {
      let data = [];
      data.push("@UserName", userName);
      let params = { "CommandText": "uspUser___FindUserName", "CommandType": 1025, "Parameters": data }
      await this.dataService.post('/commands', params).subscribe((response: any) => {
        if (response.Data) {
          this.userLoginId = response.Data[0].Id;
        }
      });
    }
  }

  async getListKho() {
    await this.dataService.get('/Kho').subscribe((response: any) => {
      if (response) {
        this.khoList = response;
      }
    });
  }

  async getListTT() {
    await this.dataService.get('/TienTe').subscribe((response: any) => {
      if (response) {
        this.tienteList = response;
      }
    });
  }

  async getListDT() {
    await this.dataService.get('/DoiTuong?sort=TEN_DT').subscribe((response: any) => {
      if (response) {
        this.doituongList = response;
      }
    });
  }

  initForm() {
    this.itemForm = this.formBuilder.group({
      SO_CT: ['', Validators.required],
      NGAY_CT: [new Date(), Validators.required],
      CreatedOn: [new Date(), Validators.required],
      ID_TT: [''],
      MA_DT: [''],
      TY_GIA: [''],
      ID_DT: [''],
      MA_TT: [''],
      TEN_DT: [''],
      ONG_BA: [''],
      DIA_CHI: [''],
      MS_THUE: [''],
      ID_KHO: [''],
      MA_KHO: [''],
      TEN_KHO: [''],
      DIEN_GIAI: [''],
    });

    Object.keys(this.itemForm.controls).forEach(key => {
      this.errors[key] = '';
    });

    this.itemForm.valueChanges.subscribe((data) => {
      this.errors = this.formErrors.validateForm(this.itemForm, this.errors, true);
    });
  }


  triggerEvent(NhapKho: string) {
    this.event.emit({ data: NhapKho });
  }

  onSubmit(PSTH: any, PSCT: any) {
    //Xoá PSCT có trong PSCTRemove
    if (this.PSCTRemove.length > 0) {
      this.PSCTRemove.forEach(item => {
        let dataRemove = [];
        dataRemove.push(
          "@ID_PSCT", item.ID_PSCT
        )
        let paramsRemove = { "CommandText": "spDeletebit2pshanghoasub1", "CommandType": 1025, "Parameters": dataRemove }
        this.dataService.post('/commands', paramsRemove).subscribe((response: any) => {
        },
          error => this.dataService.handleError(error)
        );
      })
    }

    // Lưu Index để lấy ID_PS
    let dataIndex = [];
    dataIndex.push(
      "@ID_PS", PSTH.ID_PS,
      "@ID_BP", 0,
      "@ID_DV", 1,
      "@USER_UPD", this.userLoginId,
      "@USER_ID", this.userLoginId,
    )
    let params = { "CommandText": "spSavebit2Indexs", "CommandType": 1025, "Parameters": dataIndex }
    this.dataService.post('/commands', params).subscribe((response: any) => {
      if (response.Data[0]) {
        let dataPSTH = [];
        if (PSTH.ID_PS === undefined) {
          PSTH.CreatedOn = this.toDay,
            PSTH.CreatedBy = this.user.username
        }
        PSTH.ID_PS = response.Data[0].ID_PS

        dataPSTH.push(
          "@ID_PS", PSTH.ID_PS,
          "@SO_CT", PSTH.SO_CT,
          "@NGAY_CT", PSTH.NGAY_CT,
          "@ID_LOAI_CT", 11,
          "@ID_PS_ORDER", PSTH.ID_PS_ORDER,
          "@ID_DV", PSTH.ID_DV,
          "@ID_DT", PSTH.ID_DT,
          "@ID_SP", PSTH.ID_SP,
          "@ID_KM", PSTH.ID_KM,
          "@ID_VV", PSTH.ID_VV,
          "@ID_YTP", PSTH.ID_YTP,
          "@ID_DT2", PSTH.ID_DT2,
          "@ID_SP2", PSTH.ID_SP2,
          "@ID_DTHU", PSTH.ID_DTHU,
          "@ID_TT", PSTH.ID_TT,
          "@TY_GIA", PSTH.TY_GIA,
          "@ID_NV_BHANG", PSTH.ID_NV_BHANG,
          "@ID_KHO", PSTH.ID_KHO,
          "@ID_DV_NHAN", PSTH.ID_DV_NHAN,
          "@ID_KHO_NHAN", PSTH.ID_KHO_NHAN,
          "@ID_DT_NHAN", PSTH.ID_DT_NHAN,
          "@ID_BP", PSTH.ID_BP,
          "@ID_BP2", PSTH.ID_BP2,
          "@CACH_TINH_GIA", PSTH.CACH_TINH_GIA,
          "@ONG_BA", PSTH.ONG_BA,
          "@DIA_CHI", PSTH.DIA_CHI,
          "@MS_THUE", PSTH.MS_THUE,
          "@GHI_CHU", PSTH.GHI_CHU,
          "@DIEN_GIAI", PSTH.DIEN_GIAI,
          "@SO_LUONG", PSTH.SO_LUONG,
          "@TIEN_HD", PSTH.TIEN_HD,
          "@TIEN_HD_NT", PSTH.TIEN_HD_NT,
          "@TIEN_VON", PSTH.TIEN_VON,
          "@TIEN_VON_NT", PSTH.TIEN_VON_NT,
          "@TIEN", PSTH.TIEN,
          "@TIEN_NT", PSTH.TIEN_NT,
          "@TIEN_VAT", PSTH.TIEN_VAT,
          "@TIEN_VAT_NT", PSTH.TIEN_VAT_NT,
          "@TIEN_CP", PSTH.TIEN_CP,
          "@TIEN_CP_NT", PSTH.TIEN_CP_NT,
          "@TIEN_CK", PSTH.TIEN_CK,
          "@TIEN_CK_NT", PSTH.TIEN_CK_NT,
          "@ID_PTHUC_TT", PSTH.ID_PTHUC_TT,
          "@NGAY_TT", PSTH.NGAY_TT,
          "@LAI_SUAT", PSTH.LAI_SUAT,
          "@SO_PHIEU", PSTH.SO_PHIEU,
          "@NGAY_PHIEU", PSTH.NGAY_PHIEU,
          "@NGAY_GHANG", PSTH.NGAY_GHANG,
          "@ID_NV_GHANG", PSTH.ID_NV_GHANG,
          "@NGUOI_GHANG", PSTH.NGUOI_GHANG,
          "@DCHI_GHANG", PSTH.DCHI_GHANG,
          "@PTIEN_GHANG", PSTH.PTIEN_GHANG,
          "@DIEN_GIAI_PXK", PSTH.DIEN_GIAI_PXK,
          "@ID_LOAI_NVU", PSTH.ID_LOAI_NVU,
          "@TIEN_CKTT", PSTH.TIEN_CKTT,
          "@TIEN_CKTT_NT", PSTH.TIEN_CKTT_NT,
          "@SO_CT_GOC", PSTH.SO_CT_GOC,
          "@GIAY_GT", PSTH.GIAY_GT,
          "@NGAY_GIAY_GT", PSTH.NGAY_GIAY_GT,
          "@ID_PSHD", PSTH.ID_PSHD,
          "@SO_HDONG", PSTH.SO_HDONG,
          "@NGAY_HDONG", PSTH.NGAY_HDONG,
          "@DA_TT", PSTH.DA_TT,
          "@CO_VAT", PSTH.CO_VAT,
          "@TAO_HDON", PSTH.TAO_HDON,
          "@NHAP", true,
          "@CHOT", 0,
          "@CNSrID", PSTH.CNSrID,
          "@Attachments", PSTH.Attachments,
          "@TransStatus", PSTH.TransStatus,
          "@LinkedId", PSTH.LinkedId,
          "@ChangedOn", this.toDay,
          "@ChangedBy", this.user.username,
          "@CreatedBy", PSTH.CreatedBy,
          "@CreatedOn", PSTH.CreatedOn
        );
        //Lưu PSTH 
        params = { "CommandText": "spSavebit2PSHangHoaMain", "CommandType": 1025, "Parameters": dataPSTH }
        this.dataService.post('/commands', params).subscribe((response: any) => {
          //Lưu PSCT
          if (response.Data[0]) {
            if (this.PSCT.length > 0) {
              this.PSCT.forEach(item => {
                let dataPSCT = [];
                dataPSCT.push(
                  "@ID_PSCT", item.ID_PSCT,
                  "@CNSrID", item.CNSrID,
                  "@ID_PS", PSTH.ID_PS,
                  "@ID_PSCT_N", item.ID_PSCT_N,
                  "@ID_PSCT_ORDER", item.ID_PSCT_ORDER,
                  "@ID_KHO", item.ID_KHO,
                  "@ID_KHO_NHAN", item.ID_KHO_NHAN,
                  "@CACH_TINH_GIA", item.CACH_TINH_GIA,
                  "@ID_NL", item.ID_NL,
                  "@ID_DVT", item.ID_DVT,
                  "@ID_TTB", item.ID_TTB,
                  "@ID_KH_KHO", item.ID_KH_KHO,
                  "@SO_LUONG", item.SO_LUONG,
                  "@GIA", item.GIA,
                  "@GIA_NT", item.GIA_NT,
                  "@ID_NHOM_DVT", item.ID_NHOM_DVT,
                  "@ID_DVT_QD", item.ID_DVT_QD,
                  "@TY_LE_QD", item.TY_LE_QD,
                  "@SO_LUONG_QD", item.SO_LUONG_QD,
                  "@GIA_QD", item.GIA_QD,
                  "@GIA_QD_NT", item.GIA_QD_NT,
                  "@TY_GIA", item.TY_GIA,
                  "@TIEN_HD", item.TIEN_HD,
                  "@TIEN_HD_NT", item.TIEN_HD_NT,
                  "@TIEN", item.TIEN,
                  "@TIEN_NT", item.TIEN_NT,
                  "@ID_TK_NO", item.ID_TK_NO,
                  "@ID_TK_CO", item.ID_TK_CO,
                  "@ID_DT", item.ID_DT,
                  "@ID_SP", item.ID_SP,
                  "@ID_KM", item.ID_KM,
                  "@ID_VV", item.ID_VV,
                  "@ID_YTP", item.ID_YTP,
                  "@ID_BP", item.ID_BP,
                  "@ID_DTHU", item.ID_DTHU,
                  "@GIA2", item.GIA2,
                  "@GIA2_NT", item.GIA2_NT,
                  "@TIEN2", item.TIEN2,
                  "@TIEN2_NT", item.TIEN2_NT,
                  "@ID_TK_NO2", item.ID_TK_NO2,
                  "@ID_TK_CO2", item.ID_TK_CO2,
                  "@ID_DT2", item.ID_DT2,
                  "@ID_SP2", item.ID_SP2,
                  "@ID_KM2", item.ID_KM2,
                  "@ID_VV2", item.ID_VV2,
                  "@TIEN_CP", item.TIEN_CP,
                  "@TIEN_CP_NT", item.TIEN_CP_NT,
                  "@PTR_CK", item.PTR_CK,
                  "@TIEN_CK", item.TIEN_CK,
                  "@TIEN_CK_NT", item.TIEN_CK_NT,
                  "@TIEN_PHI", item.TIEN_PHI,
                  "@TIEN_PHI_NT", item.TIEN_PHI_NT,
                  "@PTR_XK", item.PTR_XK,
                  "@TIEN_THUE_XK", item.TIEN_THUE_XK,
                  "@TIEN_THUE_XK_NT", item.TIEN_THUE_XK_NT,
                  "@ID_NHOM_VAT", item.ID_NHOM_VAT,
                  "@PTR_VAT", item.PTR_VAT,
                  "@TIEN_VAT", item.TIEN_VAT,
                  "@ID_LO", item.ID_LO,
                  "@SO_LO", item.SO_LO,
                  "@SO_SERI", item.SO_SERI,
                  "@NOI_DUNG", item.NOI_DUNG,
                  "@GHI_CHU", item.GHI_CHU,
                  "@DIEN_GIAI", item.DIEN_GIAI,
                  "@DA_TT", item.DA_TT,
                  "@NHAP", true,
                  "@LinkedId", item.LinkedId,
                  "@SL_YEUCAU", item.SL_YEUCAU
                );
                let params = { "CommandText": "spSavebit2PSHangHoaSub1", "CommandType": 1025, "Parameters": dataPSCT }
                this.dataService.post('/commands', params).subscribe((response: any) => {
                },
                  error => this.dataService.handleError(error)
                );
              }
              );
            }
          }
        },
          error => this.dataService.handleError(error)
        )
        this.notificationService.printSuccessMessage("Lưu thành công");
        this.triggerEvent('Submit');
        this.bsModalRef.hide();
      }
    },
      error => this.dataService.handleError(error)
    );
  }

  onClose(): void {
    this.triggerEvent('Close');
    this.bsModalRef.hide();
  }

  async getChungTu() {
    let data = [];
    data.push(
      "@ID_PS", this.id);
    //Load PSTH
    let params = { "CommandText": "spLoadPSHHMain", "CommandType": 1025, "Parameters": data }
    await this.dataService.post('/commands', params).subscribe((response: any) => {
      this.PSTH = response.Data[0];
      this.fillFormData(response.Data[0]);
      this.ConverDoiTuong(this.PSTH.ID_DT)
      this.ConverKho(this.PSTH.ID_KHO)
      this.ConverTienTe(this.PSTH.ID_TT)
    });
    //Load PSCT
    params = { "CommandText": "spLoadPSCT", "CommandType": 1025, "Parameters": data }
    await this.dataService.post('/commands', params).subscribe((response: any) => {
      this.PSCT = response.Data;
    });
  }
  private fillFormData(data: any) {
    if (data) {
      Object.keys(this.itemForm.controls).forEach(key => {
        if (key === 'NGAY_CT' || key === 'CreatedOn') {
          this.itemForm.controls[key].setValue(data[key] ? new Date(data[key]) : '');
        } else {
          this.itemForm.controls[key].setValue(data[key] ? data[key] : '');
        }
      });
    }
  }

  async ConverDoiTuong(ID_DT: any) {
    if (ID_DT) {
      await this.dataService.get('/DoiTuong/' + ID_DT).subscribe((response: any) => {
        if (response) {
          this.itemForm.controls.MA_DT.setValue(response.MA_DT);
          this.itemForm.controls.TEN_DT.setValue(response.TEN_DT);
        }
      });
    }
  }

  async ConverKho(ID_KHO: any) {
    if (ID_KHO) {
      await this.dataService.get('/KHO/' + ID_KHO).subscribe((response: any) => {
        if (response) {
          this.itemForm.controls.MA_KHO.setValue(response.MA_KHO);
          this.itemForm.controls.TEN_KHO.setValue(response.TEN_KHO);
        }
      });
    }
  }
  async ConverTienTe(ID_TT: any) {
    if (ID_TT) {
      await this.dataService.get('/TIENTE/' + ID_TT).subscribe((response: any) => {
        if (response) {
          this.itemForm.controls.MA_TT.setValue(response.MA_TT);
        }
      });
    }
  }
  onCreate(): void {
    this.PSCT.push({ noQuestion: 0 });
  }
  onRemove(index: any, item: any) {
    this.PSCT.splice(index, 1);
    if (item.ID_PSCT > 0) {
      this.PSCTRemove.push(item);
    }
  }
  getTotalSL(marks) {
    return marks.reduce((acc, { SO_LUONG }) => acc += +(SO_LUONG || 0), 0);
  }
  getTotalKG(marks) {
    return marks.reduce((acc, { SL_YEUCAU }) => acc += +(SL_YEUCAU || 0), 0);
  }
}

