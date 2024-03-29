import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    importProvidersFrom(
      provideFirebaseApp(() =>
        initializeApp({
          projectId: 'meompt-fde2e',
          appId: '1:412643978061:web:223ebd4f13ae4c97bee504',
          storageBucket: 'meompt-fde2e.appspot.com',
          apiKey: 'AIzaSyDsm2VtCnTaG2yyyBkdtgJSxaaqJhXefgY',
          authDomain: 'meompt-fde2e.firebaseapp.com',
          messagingSenderId: '412643978061',
        })
      )
    ),
    importProvidersFrom(provideFirestore(() => getFirestore())),
    importProvidersFrom(
      provideFirebaseApp(() =>
        initializeApp({
          projectId: 'meompt-fde2e',
          appId: '1:412643978061:web:223ebd4f13ae4c97bee504',
          storageBucket: 'meompt-fde2e.appspot.com',
          apiKey: 'AIzaSyDsm2VtCnTaG2yyyBkdtgJSxaaqJhXefgY',
          authDomain: 'meompt-fde2e.firebaseapp.com',
          messagingSenderId: '412643978061',
        })
      )
    ),
    importProvidersFrom(provideAuth(() => getAuth())),
  ],
};
