import { Component, OnInit } from '@angular/core';
import { conditionalValidator, REGEX_EMAIL } from '../../utils/conditional.validator';
import { FormBuilder, Validators, FormGroup, FormControl, FormArray } from '@angular/forms';
import { GroupType } from '../../utils/common.enum';
import { GrupoService } from '@app/services/grupo.service';
import { SubCategories, Category, CateOption } from '@app/models/group.model';

@Component({
  selector: 'app-new-group',
  templateUrl: './new-group.component.html',
  styleUrls: ['./new-group.component.scss']
})

export class NewGroupComponent implements OnInit {
  regexEmail = REGEX_EMAIL;
  public groupForm = this.fb.group({
    type: ['', Validators.required],
    isSelectType: [false],
    data: this.fb.group({
      zonegroupName: ['', Validators.required],
      categories: this.fb.array([]),
      selectType: [null],
      description: '',
      shownumberRotary: false,
      numberRotary: ['', conditionalValidator(() => this.data.get('shownumberRotary').value,
      this.validateNumberRotary,
      '')],
      numberCorpGuard: false,
      numberGuard: false,
      isGroup: false,
      nameGroup: ['', conditionalValidator(() => this.isGroup.value,Validators.required,'')],
      distributionList: ['', [
        Validators.pattern(this.regexEmail),
        conditionalValidator(() => this.isGroup.value,Validators.required,'')
        ]
      ],
      zoneGMT: ''
    })
  });

  public submitted = false;
  public selectedSitioType: string[] = [];
  public selectValue: string;
  public setCategories: Category[] = [];
  public groupType: typeof GroupType = GroupType;
  constructor(private fb: FormBuilder,
              private grupoService: GrupoService) { }

  ngOnInit(): void {
    this.getSubCategories();
    this.shownumberRotary.valueChanges.subscribe((value: boolean) => {
      this.numberRotary.updateValueAndValidity();
      if (!value) {
        this.numberRotary.setValue('');
      }
    });
    
    this.isGroup.valueChanges.subscribe(() => {
      this.nameGroup.updateValueAndValidity();
      this.distributionList.updateValueAndValidity();
    });
  }

  getSubCategories() {
    this.grupoService.getSubCategories().subscribe((resu: SubCategories) => {
      this.setCategories = resu.categories;
      this.addNewCategoriesToModel();
    });
  }

  addNewCategoriesToModel() {
    this.setCategories.forEach(cate => {
      cate.options.forEach(opt => {
        this.categories.push(
          this.fb.group({
            id: opt.id,
            checked: 0
          })
        )
      });
    });

  }

  selectTypeGroup(typeGroup: GroupType) {
    this.type.setValue(typeGroup);
    this.groupForm.get('isSelectType').setValue(true);
  }

  selectSubCateType(data: Category, option: CateOption): void {
    this.categories.value.forEach(category => {
      if(option.id === category.id) {
        const value = `${data.category[0].toUpperCase()}:${option.name.toUpperCase()}`;
        category.checked = category.checked == 0 ? 1 : 0;
        if (category.checked) {
          this.selectedSitioType.push(value);
        } else {
          this.selectedSitioType = this.selectedSitioType.filter((name: string) => name !== value);
        }
        this.selectValue = this.selectedSitioType.join(', ');
      }
    });
  }

  validateNumberRotary(input) {
    const valid = /^[\*\#][\d]{4,5}\b|^[\d]{8,13}\b/.test(input.value);
    return valid ? null : {validateRotary: true};
  }

  private validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  get validatePhones(): boolean {
    const isValid = (this.shownumberRotary.value || this.numberCorpGuard.value ||
			this.numberGuard.value) ? false : true;
    
    return !this.isGroup.value ? isValid : false; 
  }

  get groupFormValid(): boolean {
    if (this.groupForm.valid && !this.validatePhones && this.isValidSiteType) {
      return true;
    }
    this.submitted = true;
    this.validateAllFormFields(this.groupForm);
    return false;
  }

  get isValidSiteType(): boolean {
    if (this.type.value === this.groupType.SITIO) {
      return this.categories.value.find(cate => cate.checked == 1) ? true : false;
    }

    return true;
  }

  get type() {
    return this.groupForm.get('type');
  }

  get data() {
    return this.groupForm.get('data');
  }

  get categories() {
    return this.data.get('categories') as FormArray;
  }

  get zonegroupName() {
    return this.data.get('zonegroupName');
  }
 
  get shownumberRotary() {
    return this.data.get('shownumberRotary');
  }

  get numberRotary() {
    return this.data.get('numberRotary');
  }

  get numberCorpGuard() {
    return this.data.get('numberCorpGuard');
  }

  get numberGuard() {
    return this.data.get('numberGuard');
  }
  
  get isGroup() {
    return this.data.get('isGroup');
  }
  
  get nameGroup() {
    return this.data.get('nameGroup');
  }
  
  get distributionList() {
    return this.data.get('distributionList');
  }
}
