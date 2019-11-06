

import {Directive, Inject, OnInit, PLATFORM_ID, TemplateRef, ViewContainerRef} from '@angular/core';
import {isPlatformServer} from '@angular/common';

/**
 * Esta directiva aplicada en un elemento indica que queremos renderizar
 * el elemento solo si el renderizado se realiza del lado del servidor (parte del Shell).
 * If the rendering happens client-side, the element is not drawn.
 */


@Directive({
    selector: '[appShellRender]'
})
export class AppShellRenderDirective implements OnInit {

    constructor(
        private viewContainer: ViewContainerRef,
        private templateRef: TemplateRef<any>,
        @Inject(PLATFORM_ID) private platformId
    ) {

    }

    ngOnInit() {
        if (isPlatformServer(this.platformId)) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        }
        else {
            this.viewContainer.clear();
        }

    }

}