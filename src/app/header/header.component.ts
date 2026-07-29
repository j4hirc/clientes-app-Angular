import { Component } from "@angular/core";
import { AppRoutingModule } from "../app-routing-module";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  imports: [AppRoutingModule],
})
export class HeaderComponent {
  
  title: string = "Aplic. con Angular";

}