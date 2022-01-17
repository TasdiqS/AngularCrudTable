import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ToolbarModule} from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {TableModule} from 'primeng/table';
import { CrudDataComponent } from './crud-data/crud-data.component';
import {DialogModule} from 'primeng/dialog';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { VirtualScrollerModule } from "primeng/virtualscroller";
import { InputTextModule } from 'primeng/inputtext';
import {ToastModule} from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CompanyDetailsService } from './company-details.service';
// import * as XLSX from 'xlsx'
import {FileUploadModule} from 'primeng/fileupload';
import { InputTextareaModule } from 'primeng/inputtextarea';



@NgModule({
  declarations: [
    AppComponent,
    CrudDataComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ToolbarModule,
    ButtonModule,
    SplitButtonModule,
    TableModule,
    DialogModule,
    HttpClientModule,
    // FormControl,
    ReactiveFormsModule,
    FormsModule,
    DialogModule,
    ConfirmDialogModule,
    DropdownModule,
    VirtualScrollerModule,
    InputTextModule,
    ToastModule,
    DialogModule,
    FileUploadModule,
    InputTextareaModule,
    InputTextModule,


    
  ],
  providers: [MessageService, ConfirmationService, CompanyDetailsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
