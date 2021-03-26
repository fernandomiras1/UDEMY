import { Component, OnInit, Input,Output,EventEmitter, ChangeDetectorRef } from '@angular/core';
import { GeneralService } from '@app/services/general.service';
import { environment } from '@env/environment';
import { FormGroup } from '@angular/forms';
import CountryParser from '@app/utils/countryParser/CountryParser.util';
import { SigosLogService } from '@app/services/sigos-log.service';
import { MatDialog, MatDialogConfig, DialogPosition } from '@angular/material/dialog';
import { ModalValidarTelefonoComponent } from '../modal-validar-telefono/modal-validar-telefono.component'
const URL = environment.URL;

@Component({
  selector: 'app-form-select',
  templateUrl: './form-select.component.html',
  styleUrls: ['./form-select.component.scss']
})
export class FormSelectComponent implements OnInit {

  public countries:any;
  public countryCode: string = "";
  public selected : boolean = false;
  public countryImage: string = `${URL}/images/mundi.svg`;
  public countrySelected: number;
  public showButtonForValidation: boolean = false;
  public ButtonForValidationIsLoading: boolean = false;
  public isNumberFormatCorret:boolean;

  @Input() disable:boolean;
  @Input() profileForm: FormGroup; 
  @Input() props: {index:number,code:string, number: string; model: string ; showButtonForValidation:boolean, required:boolean,sigos:boolean } 
  @Output() phoneNumberEmitter = new EventEmitter<object>()

  constructor(
    public generalservice: GeneralService,
    private ref: ChangeDetectorRef,
    private sigosLogService:SigosLogService,
    private matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.generalservice.getCountries().subscribe(resp => {
      resp.unshift({
        id_pais: 0, 
        nombre_pais: "Seleccionar",
        codigo_pais: "", 
        imagen_pais:`${URL}/images/mundi.svg`
      })
      this.countries = resp;
      this.setCodePreviouslyLoaded()
      this.showButtonForValidation = this.props.showButtonForValidation
      this.isNumberFormatCorret = this.verifyIfNumberIsValid(this.props.code,this.props.number)
      
    }, e => {
      console.log(e);
    });
  }

  optionSelected(e){
    this.selected = this.selected == e ? !this.selected : e;
  }

  codeSelected(code, countrySelected, image){
    this.countryCode = code;
    this.countrySelected = countrySelected;
    this.countryImage = image;
    this.selected = false;
    this.changed(this.props.number,true)
  }

  validatePhoneNumber(): void{
    this.ButtonForValidationIsLoading = true;
    const phone = `(${this.props.code})${this.props.number}`;

    this.sigosLogService.validate(phone).subscribe(() => {
      this.openModal(phone);
      this.ButtonForValidationIsLoading = false;
    })
  }

  openModal(message:string){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.panelClass = "container-custom-modal";
    dialogConfig.width = "340px";
    dialogConfig.data = { message };
    const modalDialog = this.matDialog.open(ModalValidarTelefonoComponent, dialogConfig);
  }

  checkCountryCode(code:string):number
  {
    if(code.length > 0) {
      for(let country of this.countries){
        if(code == country.codigo_pais){
          return country.id_pais
        }
      }; 
    }
    return 0;
  }

  setCodePreviouslyLoaded():void
  {
    const countryId = this.checkCountryCode(this.props.code);
    if(countryId > 0) {
      const country = this.getCountryById(countryId);
      this.countryImage = country.imagen_pais
      this.countryCode  = country.codigo_pais
      this.countrySelected = country.id_pais
    }

  }

  getCountryById(id:number):any 
  {
    return this.countries.find(country => country.id_pais == id);
  }

  changed(phone:string,fromDropdown = false):void {
    if(phone.length == 0 && !fromDropdown) {
      this.resetInput()
    }

    const parsedPhone = this.parsePhone(phone)
    this.isNumberFormatCorret = parsedPhone.isValid
    this.phoneNumberEmitter.emit(parsedPhone)

  }

  resetInput(){
    this.countrySelected = 0
    this.countryImage= `${URL}/images/mundi.svg`;
    this.countryCode="";
  }

  parsePhone(phone:string) {
    phone = phone ? phone.replace(/[- ]/g, "") : ''

    let isValid = false; 

    if(this.verifyIfNumberIsValid(this.countryCode,phone) ) {
      isValid = true;
    }
    return {
      index:this.props.index,
      code:phone.length > 0 ? this.countryCode : '',
      number: phone,
      country:this.codeValidationConfig(this.countryCode).country,
      isValid:isValid
    }
  }

  codeValidationConfig(countryCode:string){

    return CountryParser.characteristic(countryCode)

  }
  
  verifyIfNumberIsValid(code,num) {

    const config = this.codeValidationConfig(code)
  
    if(isNaN(Number(num))) {
      return false;
    }
    else if(num.length >= config.min && num.length <= config.max && this.countryCode.length > 0){
      return true
    }
    else if(num.length == 0 && this.countryCode.length == 0 && !this.props.required) {
      return true
    }
    else if(num.length == 0 && this.countryCode.length == 0 && this.props.required) {
      return false
    }
    return false

  }

  
}
