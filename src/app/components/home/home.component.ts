import { Component, inject, makeStateKey, OnInit, StateKey, TransferState } from '@angular/core';
import { IonHeader, IonToolbar, IonContent, IonList, IonLabel, IonTitle, IonItem, IonBadge, IonAccordion, IonAccordionGroup } from "@ionic/angular/standalone";
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { AsyncPipe, DecimalPipe } from '@angular/common';
import { API_BASE_PATH } from '../../app.config';
// This is a workaround to avoid hydration issues with Ionic components
// when using Angular Universal. It skips hydration for the Ionic components.
// This is necessary because Ionic components are not compatible with Angular's
// server-side rendering (SSR) out of the box.


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [IonAccordionGroup, IonAccordion, IonBadge, IonItem, IonTitle, IonLabel, IonList, IonContent, IonToolbar, IonHeader, AsyncPipe, DecimalPipe],
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
      return of(this.transferState.get(this.allSectors, null!) as Array<any>);
    }
    return this.httpClient.get<Array<any>>(`${this.apiBasePath}/SectorDashboardApi/GetAllSectorsWithRespectiveIndustriesAndMcap`).pipe(
      tap((data) => this.transferState.set(this.allSectors, data))
    );
  }
}
