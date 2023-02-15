import { Component, OnInit } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  lang = "en"
  constructor(private translate: TranslateService) {
   
    this.lang = this.translate.currentLang
    document.dir = this.lang == "ar"? 'rtl' : 'ltr';
  }

  ngOnInit(): void {
  }

  changeLang() {
    
    if (this.lang == "en") {
      // document.dir = "rtl"
      localStorage.setItem("lang", "ar")
    } else {
      // document.dir = "ltr"
      localStorage.setItem("lang", "en")
    }
    window.location.reload()
  }
}
