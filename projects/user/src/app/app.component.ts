import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  lang: any = "en";
  constructor(private translate: TranslateService, private router: Router, private activatedRoute: ActivatedRoute,private toastr: ToastrService) {

    // this.activatedRoute.params.subscribe( (params : Params) => {
    //   console.log(this.translate.addLangs( params['lang']  ))
    // }); 

    this.lang = this.translate.currentLang
    this.lang = localStorage.getItem("lang")
    this.translate.use(this.lang);
    document.dir = this.lang == "ar" ? 'rtl' : 'ltr';
    this.router.navigate([''],{queryParams: {lang: this.lang}})
    this.lang == "en" ?  this.toastr.success("Now The Language is English"):this.toastr.success("اللغة الأن عربية")
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
