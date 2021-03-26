export interface ResponseTemip {
  success: boolean;
  message: MessageTemip;
}

export interface MessageTemip {
  name:      string;
  groupList: GroupList[];
}

export interface GroupList {
  name:       string;
  area:       string;
  peopleList: PeopleList[];
  isOpen?:     boolean;
}

export interface PeopleList {
  name:       string;
  date:       string;
  template:   string;
  email:      string;
  corporate:  string;
  mobile:     string;
  phone:      string;
  rotary:     string;
  id:         string;
  boss:       string;
  remedyList: string[];
}
