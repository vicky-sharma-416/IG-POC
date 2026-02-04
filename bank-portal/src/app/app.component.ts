import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BankComponent } from '../bank/bank.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BankComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'bank-portal';
}
