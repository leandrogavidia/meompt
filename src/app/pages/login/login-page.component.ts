import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'meompt-platform-login',
  imports: [RouterModule],
  template: `
    <section
      class="min-h-screen bg-gradient-to-br from-meompt-light-blue to-meompt-blue flex justify-center items-center p-8"
    >
      <div class="bg-white p-6 rounded-2xl shadow-2xl text-center w-full">
        <img
          src="../../assets/images/logo/weompt-logo-horizontal.png"
          alt="Weompt logo"
          title="Weompt logo"
          class="mt-0 mx-auto"
        />
        <h2 class="mt-5 mb-6 text-lg">Where the magic of prompts gain value</h2>
        <form>
          <fieldset class="flex flex-col justify-center items-start">
            <label for="email" class="font-semibold text-base mb-1 text-left"
              >Email</label
            >
            <input
              type="email"
              id="email"
              name="email"
              title="Email"
              class="h-8 w-full rounded-lg border border-black mb-3 px-2 text-sm"
              placeholder="e.g. meompt@gmail.com"
            />

            <label for="password" class="font-semibold text-base mb-1 text-left"
              >Password</label
            >
            <input
              type="password"
              id="password"
              name="password"
              title="Password"
              class="h-8 w-full rounded-lg border border-black px-2 text-sm"
              placeholder="e.g. Your pet’s name"
            />

            <button
              type="submit"
              class="w-full h-8 rounded-full bg-meompt-blue text-meompt-white font-semibold my-4"
            >
              Sign in
            </button>
          </fieldset>
        </form>
        <p class="text-sm">
          Don't have an account yet?
          <a [routerLink]="['sign-up']" class="text-meompt-blue font-semibold"
            >Sign up</a
          >
        </p>
      </div>
    </section>
  `,
  standalone: true,
})
export class LoginPage {
  private readonly _databaseService = inject(DatabaseService);

  ngOnInit() {
    this._databaseService.getUser().subscribe((users) => {
      console.log(users);
    });
  }
}
