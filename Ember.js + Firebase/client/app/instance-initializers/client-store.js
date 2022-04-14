import { initialize } from 'zuglet/initialize';
import Store from '../store';

export default {
  name: 'client:store',
  initialize(app) {
    initialize(app, {
      store: {
        identifier: 'store',
        factory: Store,
      },
      service: {
        enabled: true,
        name: 'store',
      },
      development: {
        enabled: true,
        logging: true,
        export: 'store',
      },
    });
  },
};
