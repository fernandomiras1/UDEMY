import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { StepperGroupService } from '../../services/stepper-group.service';
import { SessionManagerService } from '../../services/session-manager.service';
import { ModalCollisionGroupComponent } from '../modal-collision-group/modal-collision-group.component';
import { ModalPeopleByGroupComponent } from '../modal-people-by-group/modal-people-by-group.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GrupoService } from '../../services/grupo.service';
import { GeneralService } from '../../services/general.service';
import { PlantillasService } from '../../services/plantillas.service';
import { GroupType, ToggleType } from '../../utils/common.enum';
import {
  GroupSites,
  DataGroupSite,
  RemedyList,
  RemedyUser,
  Site,
  UserSite,
  User,
  UpdateGroup,
  DeletedUsers,
  AddNewGroup, 
  SiteList,
  TecnoSelected
} from '../../models/group.model';
import { Subscription } from 'rxjs';
import * as moment from 'moment';
import { TodoItemFlatNode } from '@app/models/tree-checklist.model';

@Component({
  selector: 'app-people-by-group',
  templateUrl: './people-by-group.component.html',
  styleUrls: ['./people-by-group.component.scss']
})
export class PeopleByGroupComponent implements OnChanges, OnInit, OnDestroy {

  private allSubscriptions: Subscription[] = [];
  public groupType: typeof GroupType = GroupType;
  public toggleType: typeof ToggleType = ToggleType;
  @Input() onStepActiveGroup: string;
  @Input() typeGroup: string;
  @Input() sitesUsers: GroupSites;
  @Output() onUpdatedGroup: EventEmitter<DeletedUsers> = new EventEmitter<DeletedUsers>();
  public cloneUsersEdit: UserSite[];

  public term: string;

  public remedyUsers: RemedyUser[] = [];
  public toggleChild: number;
  public toggleParent: number;
  public toggleModalChild: number;
  public toggleModalParent = this.toggleType.OPEN;
  public checked = false;
  public remedyGroups: any[] = [];
  public remedyList: RemedyList = { people: [], sites: []};
  public modalOpen = { isOpen: false, title: null, remedyGroups: []};
  public results = [];
  public sitiosGrupoLocalidades: any [] = [];
  public sitiosAcronimosSeleccionados: any [] = [];
  public countSites = 0;
  public loadingRemedyUsers: boolean;

  public loadingRemedy: boolean;

  public searchInput: string;

  public userRemedy: User[] = [];
  public acronimos: any [] = [];
  public idEditGroup: string;

  public editGroup: DataGroupSite;
  public loadingModal: boolean;

  public peopleNotfound:boolean = false;
  public SitesTecnologiesNotFound:boolean = false;
  public SitesTecnologiesNotFoundMessage:string;

  constructor(
    public generalservice: GeneralService,
    public grupoService: GrupoService,
    public plantillaService: PlantillasService,
    public stepperGroupService: StepperGroupService,
    private matDialog: MatDialog,
  ) { }

  ngOnInit() {
    if (this.sitesUsers) {
      this.cloneUsersEdit = [...this.sitesUsers.users];
    }

    this.stepperGroupService.stepActiveGroup$.subscribe((interacted: boolean) => {
      if (interacted) {
        this.toggleParent = this.toggleType.OPEN;
      }
    });

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.typeGroup.currentValue) {
      this.getDataCreateSiteTec();
      this.reset();
    }
  }

  private getDataCreateSiteTec() {
    if (this.sitesUsers) {
      this.remedyList.people = this.sitesUsers.users;
      this.acronimos = this.sitesUsers.sites;
      this.idEditGroup = this.sitesUsers.dataGroup ? this.sitesUsers.dataGroup.id_grupo : null;
      this.editGroup = this.sitesUsers.dataGroup ? this.sitesUsers.dataGroup : null;

      if (this.isSite) {
        const acronimos = new Set(this.acronimos.map(item => item.localidad));
        acronimos.forEach(local => {
          this.remedyList.sites.push({nombre: local, acronimos: this.acronimos.filter(i => i.localidad === local)});
        });
      } else {
        this.sitesUsers.sites.forEach(site => this.remedyList.sites.push(site));
      }
    }


    this.getRemedy();
  }

  onEditGroup() {
    if (this.idEditGroup) {
      this.loadingModal = true;
      let listUserFinal = [];

      this.remedyList.people.forEach(user => {
        user.estado = 1;
      });
      listUserFinal = [...this.remedyList.people, ...this.cloneUsersEdit];
      this.setDeletedUsers(this.remedyList.people,this.cloneUsersEdit)

      const sinRepetidosUsers = this.eliminarDuplicados(listUserFinal, 'idusuario');

      let acronimos = [];
      if (this.isSite) {  
        this.remedyList.sites.forEach(remedy => {
          remedy.acronimos.forEach(acronimo => {
            acronimo.estado = 1;
            acronimos.push(acronimo);
   
          });
        });

      } else {
       
        this.remedyList.sites.forEach(acronimo => {
            acronimo.estado = 1;
            acronimos.push(acronimo);
          }
        );
        acronimos.forEach(tec => {
          tec.estado = 1;
        });
      }
 
      const updateGroup: UpdateGroup = {
        users: sinRepetidosUsers,
        sites: acronimos,
        resu: false
      };

      this.checkIfExistsAssignments(this.idEditGroup, this.editGroup['nombre_grupo'], updateGroup.users, (confirm) => {
        if (confirm.ok) {
          this.plantillaService
            .addUsersSiteTecGroup(this.idEditGroup, this.editGroup['nombre_grupo'], this.editGroup['descripcion'], updateGroup)
              .subscribe(() => {
                this.loadingModal = false;
                updateGroup.resu = true;
                location.reload();
          });
        }
      });
    }
  }

  setDeletedUsers(people, clone): void{
    
    const ids = people.map(user => user.idusuario);
    
    clone.filter(user => !ids.includes(user.idusuario)).forEach(user => {
        user['estado'] = 0;
    });
    
  }

  nextStep() {
    const sitesUsers: AddNewGroup = {
      users: this.remedyList.people,
      sites: this.listSiteRemedy(),
      valid: this.isValid
    };

    return sitesUsers;
  }

  listSiteRemedy(): Site[] {
    let siteRemedy = [];
    this.remedyList.sites.forEach(group => {
      if (this.isSite) {
        group.acronimos.forEach(acronimo => {
          if (acronimo.selected) {
            siteRemedy.push(acronimo);
          }
        });
      } else {
        if (group.selected) {
          siteRemedy.push(group);
        }
      }
    });

    return siteRemedy;
  }

  isValidBySite(): boolean {   
    return this.remedyList.people.length > 0 && 
            this.remedyList.sites.length > 0 && 
            this.remedyList.sites.filter(s => s.acronimos.length > 0).length > 0 ? true : false;
  }

  isValidByTec(): boolean {   
    return this.remedyList.people.length > 0 && this.remedyList.sites.length > 0 ? true : false;
  }

  get isValid(): boolean {   
    return this.isSite ? this.isValidBySite() : this.isValidByTec();
  }

  get isEditValid() {
    if (!this.sitesUsers) return true;
    return this.isSite ? this.isValidBySite() : this.isValidByTec(); 
  }

  eliminarDuplicados(array, comparador) {
    return array.filter((valorActual, indiceActual, arreglo) => {
      return (
        arreglo.findIndex(
          valorDelArreglo =>
            JSON.stringify(valorActual[comparador]) ===
            JSON.stringify(valorDelArreglo[comparador])
        ) === indiceActual
      );
    });
  }

  getRemedy() {
    this.loadingRemedyUsers = true;
    this.loadingRemedy = true;
    this.peopleNotfound = false;
    this.SitesTecnologiesNotFound = false;
    this.toggleParent = this.toggleType.OPEN;
    // Call RemedyUsers or getRemedyTech and create a new object
    const paramSearch = this.searchInput ? `by_name/${this.searchInput}` : '';
    this.allSubscriptions.push(this.generalservice[this.isSite ? 'getRemedyUsers' : 'getRemedyTech'](paramSearch)
      .subscribe(resp => {
        if(resp.length > 0){
          this.peopleNotfound = false;
          this.loadingRemedyUsers = false;
          this.remedyUsers = resp;
          this.sitesUsers ? this.selectUsersByEdit() : this.selectUsers();
        }
        else{
          this.loadingRemedyUsers = false;
          this.peopleNotfound = true;
        }
        
      }));

    this.allSubscriptions.push(this.generalservice[ this.isSite ? 'getRemedyGroups' : 'getTechTechnology'](paramSearch)
      .subscribe(async resp => {
        this.loadingRemedy = false;
        if (resp['success']) {
          if (this.isSite) {
            const message = resp.message;
            message.forEach(v => Object.assign(v, { selected: false }));
            const groups = await new Set(message.map( item => item.localidad ));
            this.remedyGroups = [];
            groups.forEach(g => this.remedyGroups.push({ nombre: g, acronimos: message.filter(i => i.localidad === g).map(i => i.acronimo)
            }));

            this.remedyGroups.forEach(groups => {
              groups.acronimosDetalle = [];
              groups.selected = false;
              groups.countSites = 0;
                groups.acronimos.forEach(acronimo => {
                  groups.acronimosDetalle.push({localidad:groups.nombre, name: acronimo, selected: false});
                });
            });

            if (this.remedyList.sites.length > 0) {
              this.selecAcronimos();
            }
          } else {
            this.remedyGroups = resp.message;
            this.setSelectTecno();
            if (this.sitesUsers) {
              this.remedyGroups.forEach(group => {
                if (group.tecnologia === this.sitesUsers.sites.find(s => s.tecnologia === group.tecnologia)?.tecnologia) {
                  group.selected = true;
                }
              })
            }
          }
        }
        else{
          this.loadingRemedyUsers = false;
          this.SitesTecnologiesNotFound = true;
          this.SitesTecnologiesNotFoundMessage = resp['message'];
        }
      }));
  }

  private reset(): void {
    if (!this.idEditGroup) {
      this.remedyList.people = [];
      this.remedyList.sites = [];
    }
    this.countSites = 0;
  }

  selectUsers() {
    this.remedyUsers.forEach(item => item.usuarios.forEach(e => {
      this.remedyList.people.forEach(people => {
        if (e['idusuario'] === people.idusuario && item.grupo_remedy === people.support_group_name) {
          e['selected'] = true;
        }
      });
    }));
  }

  selectUsersByEdit() {
    this.remedyUsers.forEach(item => item.usuarios.forEach(e => {
      this.remedyList.people.forEach(people => {
        if (e['idusuario'] === people.idusuario) {
          e['selected'] = true;
        }
      });
    }));
  }

  setSelectTecno() {
    this.remedyGroups.forEach((group: TecnoSelected) => {
      this.remedyList.sites.forEach((tecno: TecnoSelected) => {
        if (group.grupo_remedy === tecno.grupo_remedy && group.tecnologia === tecno.tecnologia) {
          group.selected = true;
        } else {
          group.selected = false;
        }
      });
    })
  }

  selecAcronimos() {
    const acronyms: any = this.getAcronymsByList(this.remedyList.sites);

    this.remedyGroups.forEach(groups => {
      acronyms.forEach(acronimo => {
        if (this.isSite) {
          groups.acronimosDetalle.forEach(acronimoDetalle => {
            if(acronimoDetalle.name === acronimo) {
              acronimoDetalle.selected = true;
            }
          });
        } else {
          if (groups.tecnologia === acronimo[0].tecnologia) {
            this.remedyList.sites.push(groups);
            groups.selected = true;
          }
        }
      });
    });
  }

  openToggle( i: number, value: boolean, modal: boolean) {
    if (modal) {
      value ? ( this.toggleModalParent = this.toggleModalParent !== i ? i : null ) :
        ( this.toggleModalChild = this.toggleModalChild !== i ? i : null );
    } else {
      value ? ( this.toggleParent = this.toggleParent !== i ? i : null ) :
        ( this.toggleChild = this.toggleChild !== i ? i : null);
    }
  }

  onChange(selectedPerson, checked: boolean, value: string) {
    if (checked) {
      this.checked = checked;
      this.userDuplicated(selectedPerson);
      this.remedyList[value].push(selectedPerson);
      selectedPerson.selected = true;
    } else {
      this.checked = checked;
      this.remedyList.people = this.remedyList.people
        .filter(person => person.idusuario !== selectedPerson.idusuario);
      if (!this.isSite) {
        this.remedyList.sites = this.remedyList.sites
          .filter((tecno: Site) => tecno.tecnologia !== selectedPerson.tecnologia);
        selectedPerson.selected = false;
        this.remedyGroups.forEach((site: Site) => {
          if (site.selected && site.tecnologia === selectedPerson.tecnologia) {
            site.selected = false;
          }
        })
      }
      
      this.remedyUsersAPI(this.remedyUsers, selectedPerson);
      // objeto en memoria
      this.remedyUsersAPI(this.generalservice.remedyUsersSites, selectedPerson);
    }
  }

  remedyUsersAPI(users: RemedyUser[], selectedPerson): void {
    for (const remedy of users) {
      let user = remedy.usuarios.find(user => user.idusuario === selectedPerson.idusuario);
      if (user) {
        user.selected = false;
      }
    }
  }

  onChangeTecno(site, checked: boolean) {
    site.selected = checked;
    if (checked) {
      this.remedyList.sites.push(site);
    } else {
      this.remedyList.sites = this.remedyList.sites.filter(item => item.tecnologia !== site.tecnologia);
      this.remedyGroups.forEach((site: Site) => {
        if (site.tecnologia === site.tecnologia) {
          site.selected = false;
          site.estado = 0;
        }
      }) 
    }
  }

  userDuplicated(selectedPerson) {
    // delete duplicate user selected
    for (const remedy of this.remedyUsers) {
      remedy.usuarios.forEach(user => {
        if (user.idusuario === selectedPerson.idusuario && user.selected) {
          const index = this.remedyList.people.indexOf(selectedPerson);
          this.remedyList.people.splice(index, 1);
          user.selected = false;
        }
      });
    }
  }

  isAllOrSomeSelected(items: User[], isSomeComplete = false) {
    if (items) {
      const countUsers = items.length;
      const countSelected = items.filter(user => user.selected).length;
      if (countUsers === 0 || countSelected === 0) {
        return false;
      }

      return isSomeComplete ? countUsers !== countSelected : countUsers === countSelected;
    }
  }

  onChangeAllSite( locations, checked: boolean) {
    locations.acronimosDetalle.forEach(acronimo => {
      acronimo.selected = checked;
      this.addItemBySite(locations.nombre, acronimo, checked);

    });
  }


  onChangeSite(locations, acronimoHtml, checked: boolean, chipRemove = false) {
    acronimoHtml.selected = checked;
    this.addItemBySite(locations.nombre, acronimoHtml, checked, chipRemove);
  }

  addItemBySite(groupName: string, item: Site, checked:boolean, chipRemove?: boolean) {
    const groupList: SiteList = this.remedyList.sites.find(group => group.nombre == groupName);

    if(groupList) {
      let itemPosition: number = groupList.acronimos.findIndex(acronimo => acronimo.name === item.name);

      if(itemPosition == -1 && checked){
        groupList.acronimos.push(item);
      }
      else if(itemPosition != -1 && !checked){
        groupList.acronimos.splice(itemPosition, 1);
      }

    } else if (checked) {
      this.remedyList.sites.push({nombre:groupName, acronimos:[item]});
    }
    
    // remove unseleted items from chips list 
    if (chipRemove) {
      let region = (!groupName) ? this.remedyGroups.find(item => !item.nombre) : this.remedyGroups.find(item => item.nombre === groupName);
      region.acronimosDetalle.find(acronimo => acronimo.name === item.name).selected = checked;
    }
  }

  get countTotalItemsSelected(): number {
    let total = 0;

    if(this.isSite){
      for(let group of this.remedyList.sites){
        total += group.acronimos.filter(acr => acr.selected == true).length;
      }
    }
    else{
      total = this.remedyList.sites.length;
    }
   
    return total;
  }

  getAcronymsByList(remedyList: SiteList[]): string[] {
    return remedyList.map(group => group.acronimos.map(a=> a.name))
      .reduce((acc, val) => acc.concat(val), []);
  }

  onChangeAll(object, checked: boolean, value: string) {
    object.forEach((e:any) => {
      this.userDuplicated(e);
      const element = value === 'people' ? e : e.acronimo;
      const index = this.remedyList[value].indexOf(element);

      // Validate checkboxAll interaction
      if (checked && !e.selected) {
        this.remedyList[value].push(element);
        e.selected = true;
      } else if (!checked && e.selected) {
        this.remedyList[value].splice(index, 1);
        e.selected = false;
      }
    });
  }

  onClickChipPeople(user: User) { 
    const acronyms = this.getAcronymsByList(this.remedyList.sites);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.panelClass = 'container-custom-modal';
    dialogConfig.width = '600px';
    dialogConfig.data = { user, acronyms };
    const modalDialog = this.matDialog.open(ModalPeopleByGroupComponent, dialogConfig);

    modalDialog.afterClosed().subscribe((dataItems: TodoItemFlatNode[]) => {
      if (dataItems) {
        for (const acronimos of this.remedyGroups) {
          acronimos.acronimosDetalle.forEach(site => {

            const siteNodes = dataItems.find((i: TodoItemFlatNode) => i.item === site.name);
            const siteData: Site = {
              localidad: site.localidad || null,
              name: siteNodes ? siteNodes.item : site.name,
              selected: true
            }
    
            if (site.name === siteNodes?.item) {
              site.selected = true;
              this.addItemBySite(site.localidad, siteData, site.selected);
            } else {
              site.selected = false;
              siteData.selected = false;
              this.addItemBySite(site.localidad, siteData, site.selected);
            }
          });
        }
      }
    });

  }

  openModal(name, type, owner) {
    this.modalOpen.isOpen = true;
    this.modalOpen.title = name;

    this.generalservice.getUpdateAssignment(this.isSite, type, owner).subscribe(resp => {
      if (resp.success) {
        const message = resp.message;
        message.forEach(v => Object.assign(v, { selected: false }));
        // Setting of site structure
        const groups = new Set(message.map( item => item.localidad ));
        groups.forEach(g => this.modalOpen.remedyGroups.push({ nombre: g, acronimos: message.filter( i => i.localidad === g )}));
      }
    });
  }

  get isSite(): boolean {
    return this.typeGroup === this.groupType.SITIO ? true : false;
  }

  checkIfExistsAssignments(id_group: string, group_name: string, users: any, callback: any): void {
    const deletedUsers: DeletedUsers = this.filterOnlyDeltedUsers(id_group, users);
    if ( deletedUsers.users.length > 0 ) {
      this.assignGuardsToOtherUsersIfExists(deletedUsers,id_group, group_name, callback);
    } else {
      callback({ok: true});
    }
  }

  filterOnlyDeltedUsers(id_group: string, users: any): DeletedUsers {
    return {
      date_now: moment(new Date()).format('YYYY-MM-DD HH:mm'),
      id_group,
      id_user_login: SessionManagerService.user().id_usuario,
      users: users.filter(user => user.estado === 0).map(user => {
        return {
          id_user_group: user.idusuario,
          apellido: user.apellido,
          nombre: user.nombre
        };
      })
    };
  }

  assignGuardsToOtherUsersIfExists(deletedUsers: DeletedUsers, id_group: string, group_name: string, callback: any): void {

    this.grupoService.verifyGuardAssignments(deletedUsers).subscribe(response => {
      
      const existsUsersWithGuards = response['message'];
      
      if(existsUsersWithGuards.length > 0) {
        this.loadingModal = false;
        const modal = this.AssignmentsModal(id_group, group_name, existsUsersWithGuards, deletedUsers.users);
        modal.afterClosed().subscribe((deleteConfirmed: boolean) => {
          callback({ok: deleteConfirmed});
        });

      } else {
        callback({ok: true});
      }
    });

  }

  AssignmentsModal(id_group, group_name, users, deletedUsers){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.panelClass = 'container-custom-modal';
    dialogConfig.width = '700px';
    dialogConfig.data = {
      id_group,
      group_name,
      users,
      deletedUsers
    };
    return this.matDialog.open(ModalCollisionGroupComponent, dialogConfig);
  }

  clearInputSearch(){
    this.searchInput = '';
    this.getRemedy();
  }

  ngOnDestroy(): void {
    this.generalservice.destroyMemoryAPI();
    if (this.allSubscriptions) {
      this.allSubscriptions.forEach(val => val.unsubscribe());
    }
  }

}
