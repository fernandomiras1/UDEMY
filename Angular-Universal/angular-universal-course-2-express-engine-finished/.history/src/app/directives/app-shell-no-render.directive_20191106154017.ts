import {Directive, Inject, OnInit, PLATFORM_ID, TemplateRef, ViewContainerRef} from '@angular/core';
import {isPlatformServer} from '@angular/common';

/**
 * Esta directiva aplicada en un elemento indica que queremos renderizar
 * the element only if the rendering is done client-side (NOT part of the Shell, which is generated server-side).
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