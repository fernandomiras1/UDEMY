import {Directive, Inject, OnInit, PLATFORM_ID, TemplateRef, ViewContainerRef} from '@angular/core';
import {isPlatformServer} from '@angular/common';

/**
 * Esta directiva aplicada en un elemento indica que queremos renderizar
 * el elemento solo si el renderizado se realiza del lado del cliente
 * (NO forma parte del Shell, que se genera del lado del servidor).
 * If the rendering happens server-side, the element is not drawn.
 */

@Directive({
    selector: '[appShellNoRender]'
})
export class AppShellNoRenderDirective implements OnInit {

    constructor(
        private viewContainer: ViewContainerRef,
        private templateRef: TemplateRef<any>,
        @Inject(PLATFORM_ID) private platformId
    ) { }

    ngOnInit() {
        if (isPlatformServer(this.platformId)) {
            this.viewContainer.clear();
        } else {
            this.viewContainer.createEmbeddedView(this.templateRef);
        }

    }

}