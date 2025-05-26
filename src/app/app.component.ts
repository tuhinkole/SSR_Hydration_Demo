import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from "./components/home/home.component";
import { AboutComponent } from "./components/about/about.component";
import { IonRouterOutlet } from '@ionic/angular/standalone';
import { AComponent as AComponentA} from "./components/a/a.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HomeComponent, AboutComponent, IonRouterOutlet, RouterOutlet, AComponentA],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Angular_Ionic';
}
