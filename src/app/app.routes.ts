import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import("./components/home/home.component").then((m) => m.HomeComponent)
    }, {
        path: 'platform-check',
        loadComponent: () => import("./components/platform-check/platform-check.component").then((m) => m.PlatformCheckComponent)
    }, {
        path: 'about',
        loadComponent: () => import("./components/about/about.component").then((m) => m.AboutComponent),
    }
];
