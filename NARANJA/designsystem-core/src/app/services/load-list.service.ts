import { Injectable } from '@angular/core';
import { ButtonComponent } from '../showcase/button/button.component';
import { SpinnerComponent } from '../showcase/spinner/spinner.component';
import { TextfieldComponent } from '../showcase/textfield/textfield.component';
import { IconComponent } from '../showcase/icon/icon.component';
import { ChipsComponent } from '../showcase/chips/chips.component';
import { SliderConfirmationComponent } from '../showcase/slider-confirmation/slider-confirmation.component';
import { TabsComponent } from '../showcase/tabs/tabs.component';
import { CardComponent } from '../showcase/card/card.component';
import { AvatarComponent } from '../showcase/avatar/avatar.component';
import { RadiobuttonComponent } from '../showcase/radiobutton/radiobutton.component';
import { CheckboxComponent } from '../showcase/checkbox/checkbox.component';
import { SwitchComponent } from '../showcase/switch/switch.component';
import { ListComponent } from '../showcase/list/list.component';
import { SnackbarComponent } from '../showcase/snackbar/snackbar.component';
import { TypographyComponent } from '../showcase/typography/typography.component';
import { SelectComponent } from '../showcase/select/select.component';
import { DemoFormComponent } from '../showcase/demo-form/demo-form.component';
import { SliderControlComponent } from '../showcase/slider-control/slider-control.component';
import { FeedbackPagesComponent } from '../showcase/feedback-pages/feedback-pages.component';
import { DialogComponent } from '../showcase/dialog/dialog.component';
import { AccordionComponent } from './../showcase/accordion/accordion.component';
import { MessageComponent } from '../showcase/message/message.component';

// directives
import { ClickOutsideComponent } from '../showcase/click-outside/click-outside.component';
import { BrowserComponent } from '../showcase/browser/browser.component';
import { HoverComponent } from '../showcase/hover/hover.component';
import { RippleComponent } from '../showcase/ripple/ripple.component';
import { LayoutComponent } from '../showcase/layout/layout.component';
import { TextfieldPredictiveComponent } from '../showcase/textfield-predictive/textfield-predictive.component';
import { OthersComponent } from '../showcase/others/others.component';
import { ColorsComponent } from '../showcase/colors/colors.component';
@Injectable({
  providedIn: 'root'
})
export class AngularLoadListService {
  private elements: any = [];

  constructor() {
    this.elements = this.getComponentList();
  }

  getList() {
    return this.getComponentList();
  }

  getComponentByID(id: string) {
    let cmp = null;
    for (const element of this.elements) {
      element.list.find((component) => {
        if (component.id === id) {
          cmp = component;
        }
      });
    }
    return cmp;
  }

  getComponentList() {
    return [
      {
        sectionName: 'ACERCA DE',
        list: [
          {
            title: 'Instalación',
            route: 'home'
          },
          {
            title: 'Publicaciones',
            route: 'publish'
          }
        ]
      },
      {
        sectionName: 'FOUNDATIONS',
        list: [
          {
            title: 'Colores',
            id: 'colors',
            componentClass: ColorsComponent
          },
          {
            title: 'Layout grid',
            id: 'layout',
            componentClass: LayoutComponent
          },
          {
            title: 'Iconografía',
            id: 'icons',
            componentClass: IconComponent
          },
          {
            title: 'Tipografía',
            id: 'tipografia',
            componentClass: TypographyComponent
          }
        ]
      },
      {
        sectionName: 'STYLEGUIDE',
        list: [
          {
            title: 'HTML5',
            id: 'html5',
            route: 'styleguide'
          }
        ]
      },
      {
        sectionName: 'DATA ENTRY',
        list: [
          {
            title: 'Checkbox',
            id: 'checkboxs',
            componentClass: CheckboxComponent
          },
          {
            title: 'Chips',
            id: 'chips',
            componentClass: ChipsComponent
          },
          {
            title: 'Confirmation slider',
            id: 'confirmation-slider',
            componentClass: SliderConfirmationComponent
          },
          {
            title: 'Message',
            id: 'message',
            componentClass: MessageComponent
          },
          {
            title: 'Radio button',
            id: 'radiobuttons',
            componentClass: RadiobuttonComponent
          },
          {
            title: 'Select',
            id: 'select',
            componentClass: SelectComponent
          },
          {
            title: 'Slider Control',
            id: 'slider-control',
            componentClass: SliderControlComponent
          },
          {
            title: 'Switch',
            id: 'switch',
            componentClass: SwitchComponent
          },
          {
            title: 'Textfield',
            id: 'textfield',
            componentClass: TextfieldComponent
          },
          {
            title: 'Textfield predictive',
            id: 'textfield-predictivo',
            componentClass: TextfieldPredictiveComponent
          }
        ]
      },
      {
        sectionName: 'DATA DISPLAY',
        list: [
          {
            title: 'Accordion',
            id: 'accordion',
            componentClass: AccordionComponent
          },
          {
            title: 'Avatar',
            id: 'avatar',
            componentClass: AvatarComponent
          },
          {
            title: 'Button',
            id: 'button',
            componentClass: ButtonComponent
          },
          {
            title: 'Card',
            id: 'card',
            componentClass: CardComponent
          },
          {
            title: 'Dialog',
            id: 'dialog',
            componentClass: DialogComponent
          },
          {
            title: 'List',
            id: 'list',
            componentClass: ListComponent
          },
          {
            title: 'Spinner',
            id: 'spinner',
            componentClass: SpinnerComponent
          },
          {
            title: 'Tabs',
            id: 'tabs',
            componentClass: TabsComponent
          }
        ]
      },
      {
        sectionName: 'FEEDBACK',
        list: [
          {
            title: 'Snackbar',
            id: 'snackbar',
            componentClass: SnackbarComponent
          }
        ]
      },
      {
        sectionName: 'LAYOUTS',
        list: [
          {
            title: 'Feedback pages',
            id: 'feedback',
            componentClass: FeedbackPagesComponent
          },
          {
            title: 'Forms',
            id: 'demo',
            componentClass: DemoFormComponent
          }]
      },
      {
        sectionName: 'DIRECTIVAS',
        list: [
          {
            title: 'Browser',
            id: 'browser',
            componentClass: BrowserComponent
          },
          {
            title: 'Click Outside',
            id: 'out-side',
            componentClass: ClickOutsideComponent
          },
          {
            title: 'Hover',
            id: 'hover',
            componentClass: HoverComponent
          },
          {
            title: 'Ripple',
            id: 'ripple',
            componentClass: RippleComponent
          }
        ]
      },
      {
        sectionName: 'OTHERS',
        list: [
          {
            title: 'Otras definiciones',
            id: 'otras-definiciones',
            componentClass: OthersComponent
          },
          {
            title: 'Kitchen sink',
            route: 'kitchen-sink'
          }
        ]
      }
    ];
  }
}
