import { createAnimation } from '@ionic/core'

export function customModalEnter (): any {

  console.log('Enter modal animation')

  const backdropAnimation = createAnimation('modalEnter_backdrop')
    .addElement(document.querySelector('ion-backdrop'))
    .fromTo('opacity', 0.01, 0.3)

  const wrapperElem = createAnimation('modalEnter_wrapperElem')
    .addElement(document.querySelector('.modal-wrapper')) as any

  wrapperElem.elements[0].style.top = '0'

  const wrapperAnimation = createAnimation('modalEnter_wrapperAnimation')
    .addElement(document.querySelector('.modal-wrapper'))
    .beforeStyles({ 'opacity': 1 })
    .fromTo('transform', `translateY(-100vh)`, 'translateY(0px)')

  const baseAnimation = createAnimation('modalEnter_base')
    .addElement(wrapperElem.elements[0])
    .duration(300)
    .easing('cubic-bezier(.36, .66, .1, 1)')
    // .beforeAddClass('show-modal')
    .addAnimation(backdropAnimation)
    .addAnimation(wrapperAnimation)
    .beforeAddWrite(() => {
      console.log('# # # # # test # # # # #')
    })

  return baseAnimation.play()

  /**
   * Error in overlays-992cb809.js
   * animation.beforeAddWrite === undefined so everything breaks
   */
}

