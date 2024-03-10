import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'meompt-platform-sign-up',
  imports: [RouterModule],
  template: `<section
    class="min-h-screen bg-gradient-to-tr from-meompt-light-blue to-meompt-blue flex justify-center items-center p-8"
  >
    <div class="bg-white p-6 rounded-2xl shadow-2xl text-center">
      <h2 class="mt-5 mb-6 text-2xl font-bold">Creating a Meompt account</h2>
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
            class="h-8 w-full rounded-lg border border-black px-2 text-sm mb-3"
            placeholder="e.g. Your pet’s name"
          />

          <label
            for="confirm-password"
            class="font-semibold text-base mb-1 text-left"
            >Confirm password</label
          >
          <input
            type="confirm-password"
            id="confirm-password"
            name="confirm-password"
            title="Confirm-password"
            class="h-8 w-full rounded-lg border border-black px-2 text-sm"
            placeholder="Repeat the above password."
          />

          <button
            type="submit"
            class="w-full h-8 rounded-full bg-meompt-blue text-meompt-white font-semibold my-4"
          >
            Confirm
          </button>
        </fieldset>
      </form>
      <p class="text-sm">
        Do you already have an account?
        <a [routerLink]="['login']" class="text-meompt-blue font-semibold"
          >Sign in</a
        >
      </p>
    </div>
  </section>`,
  standalone: true,
})
export class SignUpPage {}
