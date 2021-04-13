import Device from '../../../services/NextDomApi';

export class SingleLight {
    public name = 'Lumière simple';

    public template = {
      id: 'test-device',
      card: {},
      devices: ['test-device'],
      items: [
        { type: 'Title', props: {title: 'Lumière simple' }},
        { type: 'ToggleStateIcon', props: {label: '', state: {deviceId: 'test-device', capability: 'on'}, onIcon: 'pi pi-check', offIcon: 'pi pi-times'}}
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

    public config: [any, string, any] = [
      {},
      'Ma lumière',
      {
        label: 'Statut',
        onIcon: '',
        offIcon: '',
        capability: {}
      }
    ];

    public getDevice() {
        return this.config[0];
    }

    public getResult() {
        return {
            id: this.config[0].id,
            card: {
                position: 'absolute',
                width: '300px',
                x: '50%',
                y: '50px'
            },
            devices: [this.config[0].id],
            items: [
                { type: 'Title', props: {title: this.config[1] }},
                { type: 'ToggleStateIcon', props: {
                    label: this.config[2].label, 
                    state: {
                        deviceId: this.config[0].id, 
                        capability: this.config[2].capability.name
                    }, 
                    onIcon: this.config[2].onIcon, 
                    offIcon: this.config[2].offIcon
                    }
                }
              ]
        }
    }
}