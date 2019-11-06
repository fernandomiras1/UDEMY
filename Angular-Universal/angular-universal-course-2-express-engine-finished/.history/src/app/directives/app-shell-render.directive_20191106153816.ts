

import {Directive, Inject, OnInit, PLATFORM_ID, TemplateRef, ViewContainerRef} from '@angular/core';
import {isPlatformServer} from '@angular/common';

/**
 * Esta directiva aplicada en un elemento indica que queremos renderizar
 * the element only if the rendering is done server-side (part of the Shell).
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