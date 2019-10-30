import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DocumentService } from '../../../lib/src/utils/services/document/document.service';
import { WindowService } from '../../../lib/src/utils/services/window/window.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ZumoColors } from '../../../lib/src/utils/enums/colors.enum';

export const FeedbackPageType = {
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error'
};

const FeedbackPageTypeStyleMapping = new Map<string, string>();
FeedbackPageTypeStyleMapping.set(FeedbackPageType.SUCCESS, 'success');
FeedbackPageTypeStyleMapping.set(FeedbackPageType.WARNING, 'warning');
FeedbackPageTypeStyleMapping.set(FeedbackPageType.ERROR, 'error');

@Component({
  selector: 'dsn-feedback-page',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {

  title: string;
  text: string;
  textButton: string;
  icon: string;
  colorBackground: string;
  colorIcon: string;

  typeFeedbackPageClass = FeedbackPageTypeStyleMapping.get(FeedbackPageType.SUCCESS);
  idTypeRouter: string;

  constructor(
    private windowService: WindowService,
    private route: ActivatedRoute,
    private documentService: DocumentService,
    private deviceDetector: DeviceDetectorService) {
    this.route.params.subscribe((params) => {
      this.idTypeRouter = params.id;
    });
  }

  ngOnInit() {
    this.loadComponent(this.idTypeRouter);

    if (!this.deviceDetector.isMobile()) {
      this.documentService.nativeDocument.body.style.backgroundColor = '#F7F7F7';
    }
  }

  loadComponent(type: string): void {
    switch (type) {
      case FeedbackPageType.SUCCESS: {
        this.typeFeedbackPageClass = FeedbackPageTypeStyleMapping.get(FeedbackPageType.SUCCESS);
        this.title = '¡Tu préstamo fue aprobado!';
        this.text = 'Te mandamos pasos a seguir por mail a eduardogold@gmail.com. ' +
          'También podés consultar tus dudas desde el administrador de préstamos.';
        this.textButton = 'Ir al administrador';
        this.icon = 'icon-check';
        this.colorBackground = ZumoColors.Success_500;
        this.colorIcon = ZumoColors.Grayscale_100;
        break;
      }
      case FeedbackPageType.WARNING: {
        this.typeFeedbackPageClass = FeedbackPageTypeStyleMapping.get(FeedbackPageType.WARNING);
        this.title = 'Ya casi terminás';
        this.text = 'Para acreditar la recarga, apoyá tu tarjeta en la Terminal Automática SUBE más cercana.';
        this.textButton = 'Buscar una terminal';
        this.icon = 'icon-message';
        this.colorBackground = ZumoColors.Warning_500;
        this.colorIcon = ZumoColors.Grayscale_100;
        break;
      }
      case FeedbackPageType.ERROR: {
        this.typeFeedbackPageClass = FeedbackPageTypeStyleMapping.get(FeedbackPageType.ERROR);
        this.title = 'Ups! Puede fallar';
        this.text = 'Ocurrió un problema y no pudimos continuar con lo que estabas haciendo.';
        this.textButton = 'Reintentar';
        this.icon = 'icon-cross';
        this.colorBackground = ZumoColors.Error_500;
        this.colorIcon = ZumoColors.Grayscale_100;
        break;
      }
      default: {
        this.typeFeedbackPageClass = FeedbackPageTypeStyleMapping.get(FeedbackPageType.SUCCESS);
        this.title = '¡Tu préstamo fue aprobado!';
        this.text = 'Te mandamos pasos a seguir por mail a eduardogold@gmail.com. ' +
          'También podés consultar tus dudas desde el administrador de préstamos.';
        this.textButton = 'Ir al administrador';
        this.icon = 'icon-check';
        this.colorBackground = ZumoColors.Success_500;
        this.colorIcon = ZumoColors.Grayscale_100;
      }
    }
  }

  close() {
    this.windowService.nativeWindow.close();
  }
}
