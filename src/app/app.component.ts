import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FindReplace2Component } from "./component/find-replace-2/find-replace-2.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FindReplace2Component],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'find-replace-project';
}
