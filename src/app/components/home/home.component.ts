import { Component, inject, makeStateKey, OnInit, StateKey, TransferState } from '@angular/core';
import { IonHeader, IonToolbar, IonContent, IonList, IonLabel, IonTitle, IonItem, IonBadge, IonAccordion, IonAccordionGroup, IonButton, IonButtons } from "@ionic/angular/standalone";
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, tap, throwError } from 'rxjs';
import { AsyncPipe, DecimalPipe } from '@angular/common';
import { API_BASE_PATH } from '../../app.config';
import { RouterLink } from '@angular/router';
// This is a workaround to avoid hydration issues with Ionic components
// when using Angular Universal. It skips hydration for the Ionic components.
// This is necessary because Ionic components are not compatible with Angular's
// server-side rendering (SSR) out of the box.


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [IonButtons, IonButton, IonAccordionGroup, IonAccordion, IonBadge, IonItem, IonTitle, IonLabel, IonList, IonToolbar, IonHeader, AsyncPipe, DecimalPipe, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  host: {ngSkipHydration: 'true'}
})
export class HomeComponent implements OnInit {

  private httpClient = inject(HttpClient);
  private transferState = inject(TransferState);
  private apiBasePath = inject(API_BASE_PATH);
  // State keys
  private allSectors: StateKey<any> = makeStateKey<string>(`sectors`);
  // Data
  sectorData$!: Observable<Array<any>>;

  ngOnInit(): void {
    this.sectorData$ = this.getSectors();
  }

  getSectors() {
    if (this.transferState.hasKey(this.allSectors)) {
      console.log("Getting from state")
      return of(this.transferState.get(this.allSectors, null!) as Array<any>);
    }
    console.log("getting from api")
    return this.httpClient.get<Array<any>>(`${this.apiBasePath}/SectorDashboardApi/GetAllSectorsWithRespectiveIndustriesAndMcap`).pipe(
      catchError((e) => throwError(e)),
      tap((data) => this.transferState.set(this.allSectors, data)),
    );
  }
}
