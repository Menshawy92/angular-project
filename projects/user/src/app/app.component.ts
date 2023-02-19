import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  lang: any = "en";
  constructor(private translate: TranslateService, private router: Router, private activatedRoute: ActivatedRoute) {

    // this.activatedRoute.params.subscribe( (params : Params) => {
    //   console.log(this.translate.addLangs( params['lang']  ))
    // }); 

    this.lang = this.translate.currentLang
    this.lang = localStorage.getItem("lang")
    this.translate.use(this.lang);
    document.dir = this.lang == "ar" ? 'rtl' : 'ltr';
    this.router.navigate([''],{queryParams: {lang: this.lang}})
  }
  title = 'angulartasks';

  changeLang() {
    
    this.translate.use(this.lang);
    if (this.lang == "en") {
      localStorage.setItem("lang", "ar")
    } else {
      localStorage.setItem("lang", "en")
    }
    window.location.reload()
  }
}
