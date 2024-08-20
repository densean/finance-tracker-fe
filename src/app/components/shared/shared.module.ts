import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonComponent } from './button/button.component';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { CalendarComponent } from './calendar/calendar.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogModule } from 'primeng/dialog';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { FooterComponent } from './footer/footer.component';
import { CardsComponent } from './cards/cards.component';
import { CardModule } from 'primeng/card';
import { TableComponent } from './table/table.component';
import { TableModule } from 'primeng/table';
import { PanelModule } from 'primeng/panel';
import { EmptyResourcesComponent } from './empty-resources/empty-resources.component';
import { MatIconModule } from '@angular/material/icon';
import { DropdownComponent } from './dropdown/dropdown.component';
import { TextAreaComponent } from './text-area/text-area.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { ErrorModalComponent } from './modals/error-modal/error-modal.component';
import { DeleteModalComponent } from './modals/delete-modal/delete-modal.component';
import { EditModalComponent } from './modals/edit-modal/edit-modal.component';
import { SaveModalComponent } from './modals/save-modal/save-modal.component';
import { ViewModalComponent } from './modals/view-modal/view-modal.component';
import { InputWithDropdownComponent } from './input-with-dropdown/input-with-dropdown.component';
import { TabViewModule } from 'primeng/tabview';
import { ListboxModule } from 'primeng/listbox';

@NgModule({
  declarations: [
    InputComponent,
    NavbarComponent,
    ButtonComponent,
    CalendarComponent,
    BreadcrumbsComponent,
    FooterComponent,
    CardsComponent,
    TableComponent,
    EmptyResourcesComponent,
    DropdownComponent,
    TextAreaComponent,
    ErrorModalComponent,
    DeleteModalComponent,
    EditModalComponent,
    SaveModalComponent,
    ViewModalComponent,
    InputWithDropdownComponent,
  ],
  imports: [
    CommonModule,
    MenubarModule,
    InputTextModule,
    ButtonModule,
    RippleModule,
    ReactiveFormsModule,
    FormsModule,
    CalendarModule,
    BrowserModule,
    BrowserAnimationsModule,
    DialogModule,
    BreadcrumbModule,
    CardModule,
    TableModule,
    PanelModule,
    MatIconModule,
    InputTextareaModule,
    DropdownModule,
    TabViewModule,
    ListboxModule,
    // InputGroupAddonModule,
    // InputGroupModule
  ],
  exports: [
    InputComponent,
    NavbarComponent,
    ButtonComponent,
    CalendarComponent,
    BreadcrumbsComponent,
    FooterComponent,
    CardsComponent,
    TableComponent,
    EmptyResourcesComponent,
    MatIconModule,
    DropdownComponent,
    TextAreaComponent,
    ErrorModalComponent,
    DeleteModalComponent,
    EditModalComponent,
    SaveModalComponent,
    ViewModalComponent,
    InputWithDropdownComponent,
    TabViewModule,
  ],
})
export class SharedComponentsModule {}
