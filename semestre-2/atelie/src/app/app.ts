import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Home} from "./pages/home/home";
import {Sidebar} from "./shared/sidebar/sidebar";
import {Footer} from "./shared/footer/footer";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';

@Component({
  imports: [
    RouterOutlet,
    Home,
    Sidebar,
    Footer,
    MatSlideToggle,
    MatSidenavModule,
    MatButtonModule,
  ],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('atelie');
}

