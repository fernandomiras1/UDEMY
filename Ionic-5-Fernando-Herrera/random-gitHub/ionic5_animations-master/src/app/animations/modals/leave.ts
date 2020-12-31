import { createAnimation } from '@ionic/core'

export function customModalLeave (): any {

  console.log('Leave modal animation')

  const backdropAnimation = createAnimation('modalLeave_backdrop')
    .addElement(document.querySelector('ion-backdrop'))
    .fromTo('opacity', 0.3, 0.01)

  const wrapperElem = createAnimation('modalLeave_wrapperElem')
    .addElement(document.querySelector('.modal-wrapper')) as any //unknown as HTMLElement

  wrapperElem.elements[0].style.top = '0'

  const wrapperAnimation = createAnimation('modalLeave_wrapperAnimation')
    .addElement(document.querySelector('.modal-wrapper'))
    .beforeStyles({ 'opacity': 1 })
    .fromTo('transform', 'translateY(0px)', `translateY(-100vh)`)

  const baseAnimation = createAnimation('modalLeave_base')
    .easing('cubic-bezier(.36, .66, .1, 1)')
    .duration(300)
    .beforeAddClass('show-modal')
    .addAnimation(backdropAnimation)
    .addAnimation(wrapperAnimation)

  return baseAnimation.play()
}
