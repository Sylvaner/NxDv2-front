export class SingleLight {
    public name = 'Lumière simple';
    public template = {
      id: 'test-device',
      card: {},
      devices: ['test-device'],
      items: [
        { type: 'Title', props: {title: 'Lumière simple' }},
        { type: 'ToggleStateIcon', props: {label: 'My state', state: {deviceId: 'test-device', capability: 'on'}, onIcon: 'pi pi-check', offIcon: 'pi pi-times'}}
      ]
    };
    public wizardSteps = [
      {
        label: 'Lumière',
        component: 'SingleDeviceChoice'
      },
      {
        label: 'Titre',
        component: 'TextChoice'
      },
      {
        label: 'Icône',
        component: 'ToggleStateIconChoice'
      }
    ];
    public config = [
      {},
      'Ma lumière',
      {
        onIcon: '',
        offIcon: '',
        capability: {}
      }
    ];

    public getDevice() {
        return this.config[0];
    }
}