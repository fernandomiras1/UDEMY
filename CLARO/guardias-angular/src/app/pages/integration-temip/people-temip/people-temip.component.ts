import { Component, Input, OnInit } from '@angular/core';
import { PeopleList } from '@app/models/temip.model';

@Component({
  selector: 'app-people-temip',
  templateUrl: './people-temip.component.html',
  styleUrls: ['./people-temip.component.scss']
})
export class PeopleTemipComponent implements OnInit {

  @Input() people: PeopleList;
  
  optionsContact = [
    { name: 'CORPORATIVO', value: 'corporate'},
    { name: 'GUARDIA', value: 'mobile'},
    { name: 'FIJO', value: 'phone'},
    { name: 'ROTATIVA', value: 'rotary'},
  ]

  constructor() { }

  ngOnInit(): void {
  }

  openSkype(email: string): void {
    let link = 'im:' + `<sip:${email}>`;
    window.location.href = link;
  }

  getLinkByTeams(email: string) {
    return `https://teams.microsoft.com/l/chat/0/0?users=${email}`;
  }

}
