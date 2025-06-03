import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { AfterViewInit, Component, ElementRef, inject, PLATFORM_ID, ViewChild } from '@angular/core';

@Component({
  selector: 'app-platform-check',
  standalone: true,
  imports: [],
  templateUrl: './platform-check.component.html',
  styleUrl: './platform-check.component.scss',
  providers: []
})
export class PlatformCheckComponent implements AfterViewInit {
  @ViewChild('clientRendering') clientRenderingEl!: ElementRef;
  @ViewChild('serverRendering') serverRenderingEl!: ElementRef;

  private platformId = inject(PLATFORM_ID);
  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.clientRenderingEl.nativeElement.innerText = "This element is rendered on Client side";
    } else if (isPlatformServer(this.platformId)) {
      this.serverRenderingEl.nativeElement.innerText = "This element is rendered on server";
    }
  }
}
