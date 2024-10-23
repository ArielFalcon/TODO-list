import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { environment } from "../environments/environments";
import { getFirestore, provideFirestore } from "@angular/fire/firestore";
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { MAT_DATE_LOCALE } from '@angular/material/core';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), // Dont change ZoneJS on this project until Firebase implements zoneless or Firebase is not used
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideClientHydration(),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()), provideAnimationsAsync(),
    provideMomentDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
  ]
};
