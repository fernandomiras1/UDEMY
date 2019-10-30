import { Component } from '@angular/core';
import { ZumoColors } from '../../../lib/src/utils/enums/colors.enum';

enum Accesibility {
  Full = 'AAA',
  Medium = 'AA'
}

@Component({
  selector: 'dsn-colors',
  templateUrl: './colors.component.html',
  styleUrls: ['./colors.component.scss']
})
export class ColorsComponent {
  description = `La paleta de colores digitales de Naranja es compartida por todos sus productos.
  La misma debe ser consistente y expresar los principios y valores de la empresa.`;

  primaryColors = [
    { text: '$color-brand-200', color: ZumoColors.Brand_200, textColor: ZumoColors.Grayscale_800, accesibility: Accesibility.Full },
    { text: '$color-brand-300', color: ZumoColors.Brand_300, textColor: ZumoColors.Grayscale_800, accesibility: Accesibility.Full },
    { text: '$color-brand-400', color: ZumoColors.Brand_400, textColor: ZumoColors.Grayscale_800, accesibility: Accesibility.Medium },
    { text: '$color-brand-500', color: ZumoColors.Brand_500, textColor: ZumoColors.Grayscale_100, accesibility: Accesibility.Medium },
    { text: '$color-brand-600', color: ZumoColors.Brand_600, textColor: ZumoColors.Grayscale_100, accesibility: Accesibility.Medium },
    { text: '$color-brand-700', color: ZumoColors.Brand_700, textColor: ZumoColors.Grayscale_100, accesibility: Accesibility.Full },
    { text: '$color-brand-800', color: ZumoColors.Brand_800, textColor: ZumoColors.Grayscale_100, accesibility: Accesibility.Full }
  ];

  grayscaleColors = [
    { text: '$color-grayscale-100', color: ZumoColors.Grayscale_100, textColor: ZumoColors.Grayscale_800, accesibility: Accesibility.Full },
    { text: '$color-grayscale-200', color: ZumoColors.Grayscale_200, textColor: ZumoColors.Grayscale_800, accesibility: Accesibility.Full },
    { text: '$color-grayscale-300', color: ZumoColors.Grayscale_300, textColor: ZumoColors.Grayscale_800, accesibility: Accesibility.Full },
    { text: '$color-grayscale-400', color: ZumoColors.Grayscale_400,
      textColor: ZumoColors.Grayscale_800, accesibility: Accesibility.Medium },
    { text: '$color-grayscale-500', color: ZumoColors.Grayscale_500,
      textColor: ZumoColors.Grayscale_100, accesibility: Accesibility.Medium },
    { text: '$color-grayscale-600', color: ZumoColors.Grayscale_600,
      textColor: ZumoColors.Grayscale_100, accesibility: Accesibility.Medium },
    { text: '$color-grayscale-700', color: ZumoColors.Grayscale_700, textColor: ZumoColors.Grayscale_100, accesibility: Accesibility.Full },
    { text: '$color-grayscale-800', color: ZumoColors.Grayscale_800, textColor: ZumoColors.Grayscale_100, accesibility: Accesibility.Full },
    { text: '$color-grayscale-900', color: ZumoColors.Grayscale_900, textColor: ZumoColors.Grayscale_100, accesibility: Accesibility.Full }
  ];

  errorColors = [
    { text: '$color-error-200', color: ZumoColors.Error_200, textColor: ZumoColors.Grayscale_800, accesibility: Accesibility.Full },
    { text: '$color-error-300', color: ZumoColors.Error_300, textColor: ZumoColors.Grayscale_800, accesibility: Accesibility.Full },
    { text: '$color-error-400', color: ZumoColors.Error_400, textColor: ZumoColors.Grayscale_800, accesibility: Accesibility.Medium },
    { text: '$color-error-500', color: ZumoColors.Error_500, textColor: ZumoColors.Grayscale_100, accesibility: Accesibility.Medium },
    { text: '$color-error-600', color: ZumoColors.Error_600, textColor: ZumoColors.Grayscale_100, accesibility: Accesibility.Medium },
    { text: '$color-error-700', color: ZumoColors.Error_700, textColor: ZumoColors.Grayscale_100, accesibility: Accesibility.Full },
    { text: '$color-error-800', color: ZumoColors.Error_800, textColor: ZumoColors.Grayscale_100, accesibility: Accesibility.Full }
  ];

  warningColors = [
    { text: '$color-warning-200', color: ZumoColors.Warning_200, textColor: ZumoColors.Grayscale_800, accesibility: Accesibility.Full },
    { text: '$color-warning-300', color: ZumoColors.Warning_300, textColor: ZumoColors.Grayscale_800, accesibility: Accesibility.Full },
    { text: '$color-warning-400', color: ZumoColors.Warning_400, textColor: ZumoColors.Grayscale_800, accesibility: Accesibility.Full },
    { text: '$color-warning-500', color: ZumoColors.Warning_500, textColor: ZumoColors.Grayscale_800, accesibility: Accesibility.Full },
    { text: '$color-warning-600', color: ZumoColors.Warning_600, textColor: ZumoColors.Grayscale_100, accesibility: Accesibility.Medium },
    { text: '$color-warning-700', color: ZumoColors.Warning_700, textColor: ZumoColors.Grayscale_100, accesibility: Accesibility.Full },
    { text: '$color-warning-800', color: ZumoColors.Warning_800, textColor: ZumoColors.Grayscale_100, accesibility: Accesibility.Full }
  ];

  successColors = [
    { text: '$color-success-200', color: ZumoColors.Success_200, textColor: ZumoColors.Grayscale_800, accesibility: Accesibility.Full },
    { text: '$color-success-300', color: ZumoColors.Success_300, textColor: ZumoColors.Grayscale_800, accesibility: Accesibility.Full },
    { text: '$color-success-400', color: ZumoColors.Success_400, textColor: ZumoColors.Grayscale_800, accesibility: Accesibility.Full },
    { text: '$color-success-500', color: ZumoColors.Success_500, textColor: ZumoColors.Grayscale_800, accesibility: Accesibility.Medium },
    { text: '$color-success-600', color: ZumoColors.Success_600, textColor: ZumoColors.Grayscale_100, accesibility: Accesibility.Medium },
    { text: '$color-success-700', color: ZumoColors.Success_700, textColor: ZumoColors.Grayscale_100, accesibility: Accesibility.Full },
    { text: '$color-success-800', color: ZumoColors.Success_800, textColor: ZumoColors.Grayscale_100, accesibility: Accesibility.Full }
  ];

  infoColors = [
    { text: '$color-info-200', color: ZumoColors.Info_200, textColor: ZumoColors.Grayscale_800, accesibility: Accesibility.Full },
    { text: '$color-info-300', color: ZumoColors.Info_300, textColor: ZumoColors.Grayscale_800, accesibility: Accesibility.Full },
    { text: '$color-info-400', color: ZumoColors.Info_400, textColor: ZumoColors.Grayscale_800, accesibility: Accesibility.Medium },
    { text: '$color-info-500', color: ZumoColors.Info_500, textColor: ZumoColors.Grayscale_100, accesibility: Accesibility.Medium },
    { text: '$color-info-600', color: ZumoColors.Info_600, textColor: ZumoColors.Grayscale_100, accesibility: Accesibility.Full },
    { text: '$color-info-700', color: ZumoColors.Info_700, textColor: ZumoColors.Grayscale_100, accesibility: Accesibility.Full },
    { text: '$color-info-800', color: ZumoColors.Info_800, textColor: ZumoColors.Grayscale_100, accesibility: Accesibility.Full }
  ];

  link = 'https://brandbook.naranja.com/document/248804#/foundations/colores';

}
