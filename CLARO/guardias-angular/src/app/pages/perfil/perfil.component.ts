import { SigosContact } from './../../models/sigos.model';
import { Component, OnInit, Input } from '@angular/core';
import { DataObsService } from '@app/services/data-obs.service';
import { GeneralService } from '@app/services/general.service';
import { Router } from '@angular/router';
import { Data } from '@app/providers/data/data';
import { MatDialog, MatDialogConfig, DialogPosition } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ProfileService } from '../../services/profile.service';
import { SigosLogService } from '../../services/sigos-log.service';
import { ActivatedRoute } from '@angular/router';
import CountryParser from '@app/utils/countryParser/CountryParser.util';
import { ModalProfileValidationsComponent } from './../../components/modal-profile-validations/modal-profile-validations.component';
import { titlecase } from '@app/utils/titlecase.string';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  public user; 
  public contentUsuario: Array<any>;
  public phones: Array<any>;
  public phonesCopy: Array<any>;
  public userProfile:any;
  public phone:any;
  public profileId:string;
  public sigosAside: SigosContact[] = [];
  public disableInputs:boolean = true;
  public disableSubmit:boolean;
  public loaded = false;

  isOpenMenu: Boolean = false;
  profileForm: FormGroup;

  constructor(
    private dataobsservice: DataObsService, 
    private router: Router,
    private data: Data,
    private http: HttpClient,
    private fb: FormBuilder,
    private activatedRoute:ActivatedRoute,
    private profileService:ProfileService,
    private sigosLogService:SigosLogService,
    public generalservice: GeneralService,
    public matDialog: MatDialog
  ) {

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(resu => {
      const { id } = resu;
      this.profileId = id;
      this.profileService
        .getById(this.profileId)
        .subscribe( userProfile => {
          this.loadUserInformation(userProfile)
          this.loaded = true;
      })
      
    })


    // Form
    this.profileForm = this.fb.group({
      celularcorporativo: ['', Validators.maxLength], 
      celularguardia: ['', Validators.required],
      telefonofijo: ['', Validators.required]
    })

  }

  loadUserInformation(userProfile){
      
    this.userProfile = userProfile
    const corporativo = this.splitNumber(userProfile.user.celular_corporativo.numero)
    const guardia = this.splitNumber(userProfile.user.celular_guardia.numero)
    const fijo = this.splitNumber(userProfile.user.telefono_fijo)
    this.phones = [
      {
        name: 'Celular corporativo',
        code:corporativo.code,
        number:corporativo.phone,
        showButtonForValidation:false,
        isValid:true,
        required:true,
        country: CountryParser.characteristic(corporativo.code).country,
        sigos:false
      },
      {
        name: 'Celular guardia',
        code:guardia.code,
        number:guardia.phone,
        showButtonForValidation:true,
        isValid:true,
        required:false,
        country: CountryParser.characteristic(guardia.code).country,
        sigos:false
      },
      {
        name: 'Teléfono fijo',
        code:fijo.code,
        number:fijo.phone,
        showButtonForValidation:false,
        isValid:true,
        required:false,
        country: CountryParser.characteristic(fijo.code).country,
        sigos:false
      }
    ];
    
    this.showAsideLog();
    this.phonesCopy = this.copy(this.phones)
    this.disableSubmit = this.disableSubmitButton()
  }
  
  copy(obj):Array<any> {
    return JSON.parse(JSON.stringify(obj));
  }

  menuClosed() {
    this.isOpenMenu = false;
  }

  menuOpened() {
    this.isOpenMenu = true;
  }

	logout() {
		this.router.navigateByUrl('login');
  }
  
  openModal(){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.panelClass = "container-custom-modal";
    dialogConfig.width = "400px";
    dialogConfig.data = this.sigosAside;
    
    this.matDialog.open(ModalProfileValidationsComponent, dialogConfig);
  }

  splitNumber(phoneNumber:string) {

      let split = {code:'',phone:''}

      if(phoneNumber != null) {
        split.code  = phoneNumber.split(')')[0].replace('(','')
        split.phone = phoneNumber.split(')')[1]
      }

      return split;
  }
  
  async saveChanges(){
    const data = this.extracPhones();
    this.disableSubmit = false;
    await this.sendToSigos()
    this.profileService.save(this.profileId,data).subscribe(response => {
      setTimeout(()=>{
        window.location.reload()
      },2000)
    });
  }

  extracPhones(){
    const celular_corporativo = `(${this.phones[0].code})${this.phones[0].number}`
    const celular_guardia = `(${this.phones[1].code})${this.phones[1].number}`
    const telefono_fijo = `(${this.phones[2].code})${this.phones[2].number}`

    return {
      celular_corporativo: celular_corporativo.length > 2 ? celular_corporativo : '',
      celular_guardia: celular_guardia.length > 2 ? celular_guardia : '',
      telefono_fijo: telefono_fijo.length > 2 ? telefono_fijo : '',
    }
  }

  showAsideLog() {
    this.phones.forEach(phone => {
      const data = {phone:phone.code + phone.number,quantity:1}
      this.sigosLogService.show(data).subscribe(log => {
        if(log['message'].length > 0){
          log['message'][0]['tipo'] = phone.name
          phone.sigos =  log['message'][0]['resultado'] == 'PASS' ? true: false;
          this.sigosAside.push(log['message'][0])
        }
      })
    })
  }

  phoneNumberCapture(phone) {
    this.phones[phone.index].code = phone.code
    this.phones[phone.index].number = phone.number
    this.phones[phone.index].isValid = phone.isValid
    this.phones[phone.index].country = phone.country
    this.disableSubmit = this.disableSubmitButton()
  }
  
  disableSubmitButton(){
    for(let phone of this.phones) {
      if(!phone.isValid) {
        return false;
      }
    }
    return true;
  }

  enable():void {
    this.disableInputs = !this.disableInputs; 
  }
  
  sendToSigos(){
    return new Promise((resolve)=>{
        for(let i = 0 ; i <= 1 ; i++) {

          const entered = `(${this.phones[i].code})${this.phones[i].number}`;
          const copy  = `(${this.phonesCopy[i].code})${this.phonesCopy[i].number}`;
    
          if(entered != copy && entered != '()') {
            this.sigosLogService.save({
              number_id:entered,
              user_name:`${this.userProfile.user.nombre} ${this.userProfile.user.apellido}`,
              country:this.phones[i].country
            }).subscribe(r => console.log(r))
          }
        }
        resolve()
    })
  }

  get fullName(): string
  {
    if(this.loaded) 
    {
      const name = this.userProfile['user'].apellido + ', ' + this.userProfile['user'].nombre;
      return 'Perfil de ' + titlecase(name);
    }
  }
}
