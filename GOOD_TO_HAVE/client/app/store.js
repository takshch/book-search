import Store from 'zuglet/store';

const options = {
  firebase: {
    apiKey: 'AIzaSyCnDGdg4f3PNK6-x1M9fEsZkKAqhTq_Ses',
    authDomain: 'book-search-96612.firebaseapp.com',
    // databaseURL: '',
    projectId: 'book-search-96612',
    storageBucket: 'book-search-96612.appspot.com',
    messagingSenderId: '283685585364',
  },
  firestore: {
    persistenceEnabled: true,
    // experimentalAutoDetectLongPolling: true,
    // experimentalForceLongPolling: true
  },
  auth: {
    user: 'user',
  },
  // functions: {
  //   region: null
  // },
  // emulators: {
  //   host: 'localhost',
  //   auth: 9099,
  //   firestore: 8080,
  //   storage: 9199,
  //   functions: 5001
  // }
};

if (!options.firebase.projectId) {
  // eslint-disable-next-line no-console
  console.log(
    [
      '',
      '🔥',
      '',
      'No Firebase config provided.',
      'Get your Firebase project configuration from https://console.firebase.google.com/',
      'and paste it in the `app/store.js`',
      '',
      '',
    ].join('\n')
  );

  throw new Error('No firebase config provided in app/store.js');
}

export default class ClientStore extends Store {
  options = options;
}
