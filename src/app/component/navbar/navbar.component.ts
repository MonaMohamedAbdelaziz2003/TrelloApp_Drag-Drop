import { Component, inject, OnInit } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule,SelectButtonModule, ReactiveFormsModule ,TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})


export class NavbarComponent implements OnInit {

  mode = "pi-moon";
  mode1 = "light";
  back = "";
  lang="عربي";
  constructor(private fb:FormBuilder,public translate: TranslateService) {}


  switchLanguage() {
    localStorage.setItem('lang',this.lang);
    console.log(this.lang);
    if(this.lang=="عربي"){
      this.lang="English";
    }else {
      this.lang="عربي";
    }
  }

  ngOnInit(): void {
    const lang=localStorage.getItem('lang');
    if(lang=="عربي"){
      this.lang="English";
    }else {
      this.lang="عربي";
    }
    // Fetch mode from localStorage if it exists
    const storedMode = localStorage.getItem('mode');
    const storedMode1 = localStorage.getItem('mode1');
    const back = localStorage.getItem('back');
    if (storedMode&&storedMode1&&back ) {
      this.mode = storedMode;
      this.mode1 = storedMode1;
      this.back = back;
    }
  }

  changeMode() {
    if (this.mode === "pi-moon") {
      this.mode = "pi-sun";
      this.back = "moon";
      this.mode1 = "dark";
    } else {
      this.mode = "pi-moon";
      this.back = "sun";
      this.mode1 = "light";
    }

    // Store mode and mode1 in localStorage
    localStorage.setItem('mode', this.mode);
    localStorage.setItem('mode1', this.mode1);
    localStorage.setItem('back', this.back);

  }
}
