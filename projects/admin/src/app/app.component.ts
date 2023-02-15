import { Component } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
import {TranslateService} from "@ngx-translate/core";
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  lang:any;
  constructor(private translate: TranslateService,private toastr: ToastrService) {
    // translate.setDefaultLang('en');
 
    this.lang = localStorage.getItem("lang")
    console.log("this.lang",this.lang)
    this.translate.use(this.lang);
  }
  title = 'angulartasks';

  a(){
    this.toastr.success("Hello")
  }
}
