import { ApplicationConfig, InjectionToken, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';


import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { environment } from '../environments/environment';

export const API_BASE_PATH = new InjectionToken<string>('API Base path');

export const appConfig: ApplicationConfig = {
  providers: [
    provideIonicAngular(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
    {provide: API_BASE_PATH, useValue: environment.baseUrl}
  ]
};

