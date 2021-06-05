interface ScreenDimen {
  responsive: boolean,
  size?: {
    width: number,
    height: number,
    unit: string
  }
}

export class RenderModel {
    public name = 'Rendu';

    public wizardSteps = [
      {
        label: 'Titre',
        component: 'TextChoice'
      },
      {
        label: 'Dimensions',
        component: 'ScreenDimenChoice'
      }
    ];

    public config: [string, ScreenDimen] = [
      'Nouveau rendu',
      {
        responsive: true, size: {width: 1280, height: 780, unit: 'px'}
      }
    ];
}
