import { isPlatformBrowser, isPlatformServer } from "@angular/common";
import { AfterContentChecked, AfterContentInit, afterNextRender, afterRender, AfterViewChecked, AfterViewInit, Component, DoCheck, ElementRef, inject, OnChanges, OnDestroy, OnInit, PLATFORM_ID, Renderer2, SimpleChanges, ViewChild } from "@angular/core";
import { RouterLink } from "@angular/router";
import { IonButton } from "@ionic/angular/standalone";

@Component({
    selector: 'app-life-cycle-hook',
    templateUrl: './life-cycle-hook.component.html',
    styleUrls: ["./life-cycle-hook.component.scss"],
    standalone: true,
    imports:[IonButton, RouterLink]
})
export class LifeCycleHookComponent implements
    OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {

    @ViewChild('extends', { read: ElementRef }) extends!: ElementRef;
    private renderer = inject(Renderer2);
    private platformId = inject(PLATFORM_ID);

    constructor() {
        if (this.extends) {
            const child = this.renderer.createElement('p');
            if (isPlatformBrowser(this.platformId)) {
                const text = this.renderer.createText("(Browser) Constructor");
                this.renderer.appendChild(child, text);
                this.renderer.appendChild(this.extends?.nativeElement, child);
            } else if (isPlatformServer(this.platformId)) {
                const text = this.renderer.createText("(Server) Constructor");
                this.renderer.appendChild(child, text);
                this.renderer.appendChild(this.extends?.nativeElement, child);
            }
        } else {
            console.log("Constructor")
        }

        afterNextRender({
            earlyRead: () => {
                const child = this.renderer.createElement('p');
                if (isPlatformBrowser(this.platformId)) {
                    const text = this.renderer.createText("(Browser) afterNextRender: Early read");
                    this.renderer.appendChild(child, text);
                    this.renderer.appendChild(this.extends?.nativeElement, child);
                } else if (isPlatformServer(this.platformId)) {
                    const text = this.renderer.createText("(Server) afterNextRender: Early read");
                    this.renderer.appendChild(child, text);
                    this.renderer.appendChild(this.extends?.nativeElement, child);
                }
            },
            mixedReadWrite: () => {
                const child = this.renderer.createElement('p');
                if (isPlatformBrowser(this.platformId)) {
                    const text = this.renderer.createText("(Browser) afterNextRender: Mixed read write");
                    this.renderer.appendChild(child, text);
                    this.renderer.appendChild(this.extends?.nativeElement, child);
                } else if (isPlatformServer(this.platformId)) {
                    const text = this.renderer.createText("(Server) afterNextRender: Mixed read write");
                    this.renderer.appendChild(child, text);
                    this.renderer.appendChild(this.extends?.nativeElement, child);
                }
            },
            read: () => {
                const child = this.renderer.createElement('p');
                if (isPlatformBrowser(this.platformId)) {
                    const text = this.renderer.createText("(Browser) afterNextRender: Read");
                    this.renderer.appendChild(child, text);
                    this.renderer.appendChild(this.extends?.nativeElement, child);
                } else if (isPlatformServer(this.platformId)) {
                    const text = this.renderer.createText("(Server) afterNextRender: Read");
                    this.renderer.appendChild(child, text);
                    this.renderer.appendChild(this.extends?.nativeElement, child);
                }
            },
            write: () => {
                const child = this.renderer.createElement('p');
                if (isPlatformBrowser(this.platformId)) {
                    const text = this.renderer.createText("(Browser) afterNextRender: Write");
                    this.renderer.appendChild(child, text);
                    this.renderer.appendChild(this.extends?.nativeElement, child);
                } else if (isPlatformServer(this.platformId)) {
                    const text = this.renderer.createText("(Server) afterNextRender: Write");
                    this.renderer.appendChild(child, text);
                    this.renderer.appendChild(this.extends?.nativeElement, child);
                }
            }
        });

        afterRender({
            earlyRead: () => {
                const child = this.renderer.createElement('p');
                if (isPlatformBrowser(this.platformId)) {
                    const text = this.renderer.createText("(Browser) afterRender: Early read");
                    this.renderer.appendChild(child, text);
                    this.renderer.appendChild(this.extends?.nativeElement, child);
                } else if (isPlatformServer(this.platformId)) {
                    const text = this.renderer.createText("(Server) afterRender: Early read");
                    this.renderer.appendChild(child, text);
                    this.renderer.appendChild(this.extends?.nativeElement, child);
                }
            },
            mixedReadWrite: () => {
                const child = this.renderer.createElement('p');
                if (isPlatformBrowser(this.platformId)) {
                    const text = this.renderer.createText("(Browser) afterRender: Mixed read write");
                    this.renderer.appendChild(child, text);
                    this.renderer.appendChild(this.extends?.nativeElement, child);
                } else if (isPlatformServer(this.platformId)) {
                    const text = this.renderer.createText("(Server) afterRender: Mixed read write");
                    this.renderer.appendChild(child, text);
                    this.renderer.appendChild(this.extends?.nativeElement, child);
                }
            },
            read: () => {
                const child = this.renderer.createElement('p');
                if (isPlatformBrowser(this.platformId)) {
                    const text = this.renderer.createText("(Browser) afterRender: Read");
                    this.renderer.appendChild(child, text);
                    this.renderer.appendChild(this.extends?.nativeElement, child);
                } else if (isPlatformServer(this.platformId)) {
                    const text = this.renderer.createText("(Server) afterRender: Read");
                    this.renderer.appendChild(child, text);
                    this.renderer.appendChild(this.extends?.nativeElement, child);
                }
            },
            write: () => {
                const child = this.renderer.createElement('p');
                if (isPlatformBrowser(this.platformId)) {
                    const text = this.renderer.createText("(Browser) afterRender: Write");
                    this.renderer.appendChild(child, text);
                    this.renderer.appendChild(this.extends?.nativeElement, child);
                } else if (isPlatformServer(this.platformId)) {
                    const text = this.renderer.createText("(Server) afterRender: Write");
                    this.renderer.appendChild(child, text);
                    this.renderer.appendChild(this.extends?.nativeElement, child);
                }
            }
        })
    }

    ngOnInit() {
        if (this.extends) {
            const child = this.renderer.createElement('p');
            if (isPlatformBrowser(this.platformId)) {
                const text = this.renderer.createText("(Browser) NgOnInit");
                this.renderer.appendChild(child, text);
                this.renderer.appendChild(this.extends?.nativeElement, child);
            } else if (isPlatformServer(this.platformId)) {
                const text = this.renderer.createText("(Server) NgOnInit");
                this.renderer.appendChild(child, text);
                this.renderer.appendChild(this.extends?.nativeElement, child);
            }
        } else {
            console.log("ngOnInit");
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.extends) {
            const child = this.renderer.createElement('p');
            if (isPlatformBrowser(this.platformId)) {
                const text = this.renderer.createText("(Browser) NgOnChanges");
                this.renderer.appendChild(child, text);
                this.renderer.appendChild(this.extends?.nativeElement, child);
            } else if (isPlatformServer(this.platformId)) {
                const text = this.renderer.createText("(Server) NgOnChanges");
                this.renderer.appendChild(child, text);
                this.renderer.appendChild(this.extends?.nativeElement, child);
            }
        } else {
            console.log("ngOnChanges")
        }
    }

    ngDoCheck(): void {
        if (this.extends) {
            const child = this.renderer.createElement('p');
            if (isPlatformBrowser(this.platformId)) {
                const text = this.renderer.createText("(Browser) NgDoCheck");
                this.renderer.appendChild(child, text);
                this.renderer.appendChild(this.extends?.nativeElement, child);
            } else if (isPlatformServer(this.platformId)) {
                const text = this.renderer.createText("(Server) NgDoCheck");
                this.renderer.appendChild(child, text);
                this.renderer.appendChild(this.extends?.nativeElement, child);
            }
        } else {
            console.log("ngDoCheck")
        }
    }

    ngAfterContentInit(): void {
        if (this.extends) {
            const child = this.renderer.createElement('p');
            if (isPlatformBrowser(this.platformId)) {
                const text = this.renderer.createText("(Browser) NgAfterContentInit");
                this.renderer.appendChild(child, text);
                this.renderer.appendChild(this.extends?.nativeElement, child);
            } else if (isPlatformServer(this.platformId)) {
                const text = this.renderer.createText("(Server) NgAfterContentInit");
                this.renderer.appendChild(child, text);
                this.renderer.appendChild(this.extends?.nativeElement, child);
            }
        } else {
            console.log("ngAfterContentInit")
        }
    }

    ngAfterContentChecked(): void {
        if (this.extends) {
            const child = this.renderer.createElement('p');
            if (isPlatformBrowser(this.platformId)) {
                const text = this.renderer.createText("(Browser) NgAfterContentChecked");
                this.renderer.appendChild(child, text);
                this.renderer.appendChild(this.extends?.nativeElement, child);
            } else if (isPlatformServer(this.platformId)) {
                const text = this.renderer.createText("(Server) NgAfterContentChecked");
                this.renderer.appendChild(child, text);
                this.renderer.appendChild(this.extends?.nativeElement, child);
            }
        } else {
            console.log("ngAfterContentChecked")
        }
    }

    ngAfterViewInit() {
        if (this.extends) {
            const child = this.renderer.createElement('p');
            if (isPlatformBrowser(this.platformId)) {
                const text = this.renderer.createText("(Browser) NgAfterViewInit");
                this.renderer.appendChild(child, text);
                this.renderer.appendChild(this.extends?.nativeElement, child);
            } else if (isPlatformServer(this.platformId)) {
                const text = this.renderer.createText("(Server) NgAfterViewInit");
                this.renderer.appendChild(child, text);
                this.renderer.appendChild(this.extends?.nativeElement, child);
            }
        } else {
            console.log("ngAfterViewInit");
        }
    }

    ngAfterViewChecked() {
        if (this.extends) {
            const child = this.renderer.createElement('p');
            if (isPlatformBrowser(this.platformId)) {
                const text = this.renderer.createText("(Browser) NgAfterViewChecked");
                this.renderer.appendChild(child, text);
                this.renderer.appendChild(this.extends?.nativeElement, child);
            } else if (isPlatformServer(this.platformId)) {
                const text = this.renderer.createText("(Server) NgAfterViewChecked");
                this.renderer.appendChild(child, text);
                this.renderer.appendChild(this.extends?.nativeElement, child);
            }
        } else {
            console.log("ngAfterViewChecked")
        }
    }

    ngOnDestroy() {
        if (this.extends) {
            const child = this.renderer.createElement('p');
            if (isPlatformBrowser(this.platformId)) {
                const text = this.renderer.createText("(Browser) NgOnDestroy");
                this.renderer.appendChild(child, text);
                this.renderer.appendChild(this.extends?.nativeElement, child);
            } else if (isPlatformServer(this.platformId)) {
                const text = this.renderer.createText("(Server) NgOnDestroy");
                this.renderer.appendChild(child, text);
                this.renderer.appendChild(this.extends?.nativeElement, child);
            }
        } else {
            console.log("ngOnDestroy")
        }
    }
}