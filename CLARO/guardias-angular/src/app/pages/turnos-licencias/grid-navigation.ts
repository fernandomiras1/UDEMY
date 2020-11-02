import { SessionManagerService } from '../../services/session-manager.service';

interface NavigationInterface {
    calendar_day:{day:string,redirect:boolean},
    show_only_group_id: string,
    opened_groups:number[],
    scroll_top_position:number,
}
export default class GridNavigation {

    private gridNavigation: NavigationInterface = {
        calendar_day:{day:'',redirect:false},
        show_only_group_id: null,
        opened_groups:[],
        scroll_top_position:null,
    }

    constructor(){
        const gridNavigation = this.getFromStorage()
        if(gridNavigation == null) {
            this.setIntoStorage(this.gridNavigation)
        }
    }

    registerOpenedGroups(open:boolean, groupId:number): void {
        let gridNavigation = this.getFromStorage()
        if (open) {
          let arr = [...new Set([...gridNavigation.opened_groups,groupId])];
          gridNavigation.opened_groups = arr.sort((a, b) => a - b);
        } 
        else {
            let index = gridNavigation.opened_groups.indexOf(groupId)
            gridNavigation.opened_groups.splice(index,1)
        } 
        this.setIntoStorage(gridNavigation)
    }

    registerNavigationDay(day:string,redirect:boolean = false){
        let gridNavigation = this.getFromStorage()
        gridNavigation.calendar_day = {day,redirect};
        this.setIntoStorage(gridNavigation);
    }

    restartDay(){
        let gridNavigation = this.getFromStorage()
        gridNavigation.calendar_day.redirect = false;
        this.setIntoStorage(gridNavigation);
    }

    canRedirect(){
        let gridNavigation = this.getFromStorage()
        gridNavigation.calendar_day.redirect = true;
        this.setIntoStorage(gridNavigation);
    }

    getFromStorage(): NavigationInterface{
        let storage = SessionManagerService.getItem('gridNavigation');
        return storage ? JSON.parse(storage) : null;
    }

    setIntoStorage(gridNavigation){
        SessionManagerService.setItem('gridNavigation',JSON.stringify(gridNavigation));
    }
}