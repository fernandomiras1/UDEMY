import { Injectable } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { map, filter, switchMap, mapTo, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class TitleService {
    private titleSubject:Subject<string> = new Subject();
    public title$:Observable<string> = this.titleSubject.asObservable();

    constructor(
        private router:Router,
        private activatedRoute:ActivatedRoute
    ){ 
        this.init();
    }

    init(){
        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd),
            mapTo(this.activatedRoute),
            switchMap(route => route.firstChild.data),
            tap(data => console.log("DATA: ", data)),
            map(data => data.title)
        ).subscribe(title => this.titleSubject.next(title));
    }

}