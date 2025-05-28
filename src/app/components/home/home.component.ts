import { Component, Inject, makeStateKey, OnInit, PLATFORM_ID, TransferState } from '@angular/core';
import { environment } from '../../../environments/environment';
import { GlobalApiService } from '../../service/global-api.service';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { IonHeader, IonToolbar, IonAvatar, IonContent, IonList, IonLabel, IonBadge, IonInfiniteScroll, IonInfiniteScrollContent, LoadingController } from "@ionic/angular/standalone";

const dataKey = makeStateKey<any[]>("top-rated-movies")
import { isPlatformServer, isPlatformBrowser} from '@angular/common';
// This is a workaround to avoid hydration issues with Ionic components
// when using Angular Universal. It skips hydration for the Ionic components.
// This is necessary because Ionic components are not compatible with Angular's
// server-side rendering (SSR) out of the box.


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
    private loadingCtrl: LoadingController,
    @Inject(PLATFORM_ID) private platformID: Object,
    private transferState:TransferState
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

     if(isPlatformServer(this.platformID)){ //<--- this block run on server
      console.log("this block runs only on server");
      // this.httpClient.get("http://localhost:8080/data").subscribe((r:any)=>{
      //   this.bindingData=r;
      //   this.transferState.set(dataKey,r); //<--- add this line to save the state
      //   console.log("data is rendered",r);
      // })
      this.globalApiService.getTopRatedMovies(this.currentPage).subscribe({
      next: (res)=>{
        console.log("res", res);
        if (this.loading) {
        this.loading.dismiss();
        }
        this.movies.push(...res.results);
        this.transferState.set(dataKey,res.results);
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
    } else if(isPlatformBrowser(this.platformID)){ //<--- this block run on browser
      console.log("this block runs only on browser");
      // This block will run only on the browser
      const savedData = this.transferState.get(dataKey, null);
      console.log("savedData", savedData);
     if (savedData) {
        this.movies = savedData;
         if (this.loading) {
                this.loading.dismiss();
              }
              event?.target.complete();
              if (event) {
                event.target.disabled = true; // Disable further loading since we have the data
              }

        } else {
          this.globalApiService.getTopRatedMovies(this.currentPage).subscribe({
            next: (res) => {
              if (this.loading) {
                this.loading.dismiss();
              }
              this.movies.push(...res.results);
              event?.target.complete();
              if (event) {
                event.target.disabled = res.total_pages === this.currentPage;
              }
            },
            error: (err) => {
              console.error('Error fetching top rated movies on browser', err);
            }
          });
        }
    }


  }

  loadMore(event: InfiniteScrollCustomEvent) {
    this.currentPage++;
    this.loadMovies(event);
  }
}
