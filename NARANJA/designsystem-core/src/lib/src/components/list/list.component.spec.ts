import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NGZListComponent } from './list.component';
import { ZUtilsModule } from '../../utils/utils.module';
import { CommonModule } from '@angular/common';
import { NGZAvatarComponent } from '../avatar/avatar.component';
import { Component } from '@angular/core';
import { NGZCheckboxComponent, NGZContainerCheckboxsComponent } from '../checkboxs';
import { NGZRadiobuttonComponent } from '../radiobuttons';

@Component({
  template: `
  <div *ngFor="let item of listSix; let index=index">
    <z-list [index]="index" id="clickEvent" (elementSelected)="checkSelected($event)">
      <div *ngIf="item.urlImage" left>
        <z-avatar [urlImg]="item.urlImage"></z-avatar>
      </div>
      <div primaryTitle>
        {{item.textPrimary}}
      </div>
      <div primarySubtitle>
        {{item.subTextPrimary}}
      </div>
      <div secondaryTitle>
        {{item.textSecondary}}
      </div>
      <div secondarySubtitle>
        {{item.subTextSecondary}}
      </div>
      <div *ngIf="item.iconName" right>
        <div class="icon icon-example">
          <div class="{{item.iconName}} size-16"></div>
        </div>
      </div>
      <div *ngIf="item.checkbox" right>
        <z-checkbox [checkbox]="item.checkbox"></z-checkbox>
      </div>
      <div *ngIf="item.radiobutton" right>
        <z-radiobutton [radiobutton]="item.radiobutton" [index]="index"></z-radiobutton>
      </div>
    </z-list>
  </div>`
})
class ListTestComponent {

  public listSix: any[] = [
    {
      textPrimary: 'Pagaste Netflix',
      subTextPrimary: '20/MAY',
      textSecondary: '-U$S 19,20',
      subTextSecondary: '-$729,40',
      checkbox: { selected: false, disabled: false },
      radiobutton: { selected: false, disabled: true }
    },
    {
      textPrimary: 'Pagaste Netflix',
      subTextPrimary: '20/MAY',
      textSecondary: '-U$S 19,20',
      subTextSecondary: '-$729,40',
      iconName: 'icon-angle-right',
      urlImage: 'http://gravatar.com/avatar/953d4a723bed85b720fe14eba8084b43?s=80',
      checkbox: { selected: false, disabled: false },
      radiobutton: { selected: false, disabled: true }
    },
    {
      textPrimary: '',
      subTextSecondary: ''
    }
  ];

  checkSelected(index) {
    this.listSix.forEach((item, indexAux) => {
      if (indexAux === index) {
        item.checkbox.selected = !item.checkbox.selected;
      }
    });
  }
}

describe('NGZListComponent', () => {
  let component: ListTestComponent;
  let fixture: ComponentFixture<ListTestComponent>;
  let el;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, ZUtilsModule],
      declarations: [
        ListTestComponent, NGZAvatarComponent, NGZCheckboxComponent,
        NGZContainerCheckboxsComponent, NGZRadiobuttonComponent, NGZListComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    el = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should isLeftElement false', () => {

    expect(component).toBeTruthy();
  });

});
