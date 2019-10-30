import { animate, AnimationMetadata, style, transition, trigger } from '@angular/animations';

export function collapseExpand(
  transitionIn = '250ms cubic-bezier(0.445, 0.05, 0.55, 0.95)',
  transitionOut = '250ms ease-in-out'
): AnimationMetadata {
  return trigger('collapseExpand', [
    transition(':enter', [
      style({ height: 0, opacity: 0, overflow: 'hidden', }),
      animate(transitionIn, style({ height: '*', opacity: 1, }))
    ]),
    transition(':leave', [
      style({ height: '*', opacity: 1, overflow: 'hidden', }),
      animate(transitionOut, style({ height: 0, opacity: 0, }))
    ])
  ]);
}
