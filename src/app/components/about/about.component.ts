import { Component } from '@angular/core';
import { IonButton, IonButtons, IonTitle, IonToolbar, IonHeader } from "@ionic/angular/standalone";
import { AComponent } from "../a/a.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, AComponent, RouterLink],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
  host: { ngSkipHydration: 'true' }
})
export class AboutComponent {

}
