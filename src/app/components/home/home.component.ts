import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { GlobalApiService } from '../../service/global-api.service';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { IonHeader, IonToolbar, IonAvatar, IonContent, IonList, IonLabel, IonBadge, IonInfiniteScroll, IonInfiniteScrollContent, LoadingController } from "@ionic/angular/standalone";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [IonBadge, IonLabel, IonList, IonContent, IonAvatar, IonToolbar, IonHeader, IonInfiniteScroll, IonInfiniteScrollContent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  // host: {ngSkipHydration: 'true'},
})
export class HomeComponent implements OnInit {
  movies: any[] = [];
  currentPage = 1;
  imageBaseUrl = environment.images;
  loading: HTMLIonLoadingElement | undefined;
  constructor(
    private globalApiService: GlobalApiService,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.loadMovies();
  }

  async loadMovies(event?: InfiniteScrollCustomEvent) {
    this.loading = await this.loadingCtrl.create({
      message: 'Loading..',
      spinner: 'bubbles',
    });
    if (this.loading) {
      await this.loading.present();
    }

    this.globalApiService.getTopRatedMovies(this.currentPage).subscribe({
      next: (res)=>{
        if (this.loading) {
        this.loading.dismiss();
        }
        this.movies.push(...res.results);
        event?.target.complete();
        if (event) {
          event.target.disabled = res.total_pages === this.currentPage;
        }
      },
      error: (error) => {
          console.log(error);
          if (this.loading) {
          this.loading.dismiss();
          }
       }
    });

  }

  loadMore(event: InfiniteScrollCustomEvent) {
    this.currentPage++;
    this.loadMovies(event);
  }
}
