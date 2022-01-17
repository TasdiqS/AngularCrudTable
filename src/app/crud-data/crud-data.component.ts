import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { CompanyDetailsService } from '../company-details.service';
import { DataInterface } from '../data-interface';
import * as XLSX from 'xlsx';
import readXlsxFile from 'read-excel-file';

interface Status {
  name: string;
}

@Component({
  selector: 'app-crud-data',
  templateUrl: './crud-data.component.html',
  styleUrls: ['./crud-data.component.css'],
  providers: [MessageService, ConfirmationService, ConfirmDialog],
})
export class CrudDataComponent {
  dataInterfaces!: DataInterface[];
  dataInterface!: DataInterface;
  submitted!: boolean;
  dialogBox!: boolean;
  details!: any[];
  AddData!: FormGroup;
  status: Status[];
  selectedStatus!: Status;
  e: any;

  constructor(
    private companyDetailsService: CompanyDetailsService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.status = [{ name: 'Gross Return' }, { name: 'Net Return' }];
  }

  openNew() {
    this.dataInterface = {};
    this.submitted = false;
    this.dialogBox = true;
  }
  hideDialog() {
    this.dialogBox = false;
    this.submitted = false;
  }
  saveData() {
    this.submitted = true;

    if (this.dataInterface.cname?.trim()) {
      if (this.dataInterface.id) {
        this.dataInterfaces[this.findIndexById(this.dataInterface.id)] =
          this.dataInterface;
        console.log('finding index by id');

        console.log('calling putData()');
        this.dataInterface.status = this.selectedStatus.name;
        this.companyDetailsService
          .putData(this.dataInterface.id, this.dataInterface)
          .subscribe((result) => {});
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Data Updated',
          life: 2500,
        });
      } else {
        this.dataInterface.id;
        console.log(this.selectedStatus);
        this.dataInterface.status = this.selectedStatus.name;
        this.companyDetailsService.postData(this.dataInterface);
        //  dataInterface got my data from the HTML file and is sent to the postData method from here
        this.dataInterface.id = this.createId();
        this.companyDetailsService
          .postData(this.dataInterface)
          .subscribe((result) => {
            console.log(result);
          });
        this.dialogBox = false;
        //this line refreshes table
        this.dataInterfaces.push(this.dataInterface);
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Data Added',
        });
      }
      // this.dataInterfaces = [...this.dataInterfaces];
      this.dialogBox = false;
      // this.dataInterface = {};
    }
  }
  ngOnInit() {
    this.companyDetailsService.getCompanyData().subscribe((data) => {
      console.log(data, 'data after get method');
      this.dataInterfaces = data;
    });

    this.details = [
      { field: 'id', header: 'id' },
      { field: 'cname', header: 'Company Name' },
      { field: 'pan', header: 'Pan' },
      { field: 'tan', header: 'Tan' },
      { field: 'groupCompany', header: 'Group Company' },
      { field: 'precisionId', header: 'Precision id' },
      { field: 'approver', header: 'Approver' },
      { field: 'status', header: 'Status' },
    ];
  }
  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.dataInterfaces.length; i++) {
      if (this.dataInterfaces[i].id === id) {
        index = i;
        break;
      }
    }
    return index;
  }
  createId(): string {
    let id = '';
    var chars = '0123456789';
    for (var i = 0; i < 4; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }
  deleteData(rowData: any) {
    console.log('clicked on delete');
    this.confirmationService.confirm({
      message: 'Are You sure you want to delete "' + rowData.cname + '"?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.companyDetailsService
          .deleteData(rowData.id)
          .subscribe((data) => {});
        this.dataInterfaces = this.dataInterfaces.filter(
          (val) => val.id !== rowData.id
        );
        this.dataInterface = {};
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Data Deleted',
        });
      },
    });
  }
  editData(dataInterface: DataInterface) {
    this.dataInterface = { ...dataInterface };
    this.dialogBox = true;
  }
  selectedData() {}
  excelRead(e: any) {
    console.log('clicked on upload');
    let fileReaded: any;
    fileReaded = e.target.files[0];
    let type = e.target.files[0].name.split('.').pop();

    const schema = {
      cname: {
        prop: 'cname',
        type: String,
        required: false,
      },
      pan: {
        prop: 'pan',
        type: String,
        required: false,
      },
      tan: {
        prop: 'tan',
        type: String,
        required: false,
      },
      groupCompany: {
        prop: 'groupCompany',
        type: String,
        required: false,
      },
      precisionId: {
        prop: 'precisionId',
        type: String,
        required: false,
      },
      approver: {
        prop: 'approver',
        type: String,
        required: false,
      },
      status: {
        prop: 'status',
        type: String,
        required: false,
      },
    };
    readXlsxFile(e.target.files[0], { schema }).then((data: any) => {
      console.log(data, 'before caloling service');
      console.log(this.dataInterface, 'This is data Interface before');

      if (data.rows) {
        for (let i of data.rows) {
          this.dataInterface = i;
          console.log(this.dataInterface, 'This is data Interface after');

          this.dataInterface.id = this.createId();

          this.companyDetailsService
            .postData(this.dataInterface)
            .subscribe((result) => {
              console.log('post calling and subscribing', result);
              // this.dataInterfaces.push(this.dataInterface);
            });
          // this.dataInterfaces.push(this.dataInterface);
        }
        this.ngOnInit();
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'File Data Added Successfully',
        });
      }
    });
  }
}
