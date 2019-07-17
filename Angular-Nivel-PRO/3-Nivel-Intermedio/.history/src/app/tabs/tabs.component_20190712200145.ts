import { Component, OnInit, ContentChild, AfterContentInit, ContentChildren, QueryList, OnDestroy } from '@angular/core';
import { TabComponent } from "app/tab/tab.component";
import { Tab } from "../tab/tab.interface";


@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit, AfterContentInit, OnDestroy {
  
  // voy acceder a mi hijo ( TabComponent )
  // ContentChild hace referencia a un unico elemento
  // Lo voy a comentar, porque de esta forma trabajo con un solo 
  // TAB y no me sirve ya que tengo un array de tabs. Para eso uso ContentChildren
  
  //@ContentChild(TabComponent) tab: TabComponent;
  
  // usamos ContentChildren, para acceder meditane el hijo todos los tabs, como es un array
  // usamos QueryLisy.
  @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;
  
  private tabClickSubscriptions: any[] = [];
  constructor() { }
  
  ngOnInit() {
  }

  // Cuando el contenido ya este inicializado 'componente Padre' puede detectar al hijo
  // Por ese tenemos que esperar que se inicialize el componente
  ngAfterContentInit(): void {
    this.tabs.forEach(tab => {
      let subcription = tab.onClick.subscribe(() => {
        console.log(`tab ${ tab.title } content clicked`);
      });
      //lo agrego en mi array de subricpicoens.
      this.tabClickSubscriptions.push( subcription );
    });
    // Accedemos al primer elemento del array
    // Para que te muestre el primer tab seleccioando.
    this.selectTab( this.tabs.f );
  }

  selectTab(tab:Tab) {
    // for (let tab of this.tabs){
    //   tab.isActive = false;
    // }
    // tab.isActive = true;

    this.tabs.forEach( item => item.isActive = false);
    tab.isActive = true;
  }
  
  ngOnDestroy(): void {
    if ( this.tabClickSubscriptions ) {
      this.tabClickSubscriptions.forEach( val => val.unsubscribe() );
    }
  }

}
