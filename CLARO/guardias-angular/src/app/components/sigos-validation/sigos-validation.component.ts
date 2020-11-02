import { SigosContact } from './../../models/sigos.model';
import { Component, OnInit, Input } from '@angular/core';
import { environment } from "../../../environments/environment";

@Component({
  selector: 'app-sigos-validation',
  templateUrl: './sigos-validation.component.html',
  styleUrls: ['./sigos-validation.component.scss']
})
export class SigosValidationComponent implements OnInit {

  @Input() sigos: SigosContact[] = [];
  constructor() { 
    
  }

  ngOnInit(): void {
  }

  sigosStatusMessage(status):string {
    if (status == null || status == "") {
      return '<b class="text-muted">En proceso de Validación.</b>';
    }
    
    if(status == 'FAIL') {
      return '<b class="txt-color-claro">No validado.</b>'
    }

    if(status == 'PASS'){
      return '<b class="text-aqua">Validado.</b>'
    }

  }

  downloadXLS() {
     
    let id = new Date().getTime();
    let form:any = document.createElement('form');
    form.id = id;
    form.method = 'post';
    form.action = environment.URL + '/api/sigos/export';
    form.target = '_blank';

    this.sigos.forEach(item => {

      let field:any = document.createElement('input');
      field.type = 'hidden';
      field.name = 'number_ids[]';
      field.value = item.numberid;
      form.appendChild(field);

    })

    document.body.appendChild(form);
    form.submit();
    setTimeout(() => { document.getElementById(id.toString()).remove() },2000)
    
  }

}
