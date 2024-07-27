import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './component/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { ToggleButtonModule } from 'primeng/togglebutton';
import { TranslateModule, TranslateService } from '@ngx-translate/core'; // Import TranslateModule and TranslateService

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HttpClientModule,
    RouterOutlet,
    NavbarComponent,
    ToggleButtonModule,
    TranslateModule // Add TranslateModule here
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'] // Correct the array name to styleUrls
})
export class AppComponent implements OnInit {
  title = 'Trello-App';
  checked: boolean = false;

  constructor(public translate: TranslateService) {

  }
  ngOnInit(): void {
    const lang=localStorage.getItem('lang');
    if(lang){
      this.translate.setDefaultLang(lang);
    }
  }
  switchLanguage(language: string) {
    localStorage.setItem('lang',language);
    this.translate.use(language);
  }
}
