import { Component } from '@angular/core';
import { IonCard, IonCardHeader, IonCardContent, IonCardTitle } from "@ionic/angular/standalone";

@Component({
  selector: 'app-a',
  standalone: true,
  imports: [IonCardTitle, IonCardContent, IonCardHeader, IonCard, ],
  templateUrl: './a.component.html',
  styleUrl: './a.component.scss'
})
export class AComponent {
  a = "Hi"
}
