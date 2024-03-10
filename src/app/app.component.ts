import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginPage } from './pages/login/login-page.component';

@Component({
  standalone: true,
  imports: [RouterModule, LoginPage],
  selector: 'meompt-platform-root',
  template: `
    <main>
      <router-outlet></router-outlet>
    </main>
  `,
})
export class AppComponent {}
