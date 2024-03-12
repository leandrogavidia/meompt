import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoaderComponent } from 'src/app/components/loader.component';
import { AuthService } from 'src/app/services/auth.service';

export interface LoginFormModel {
  email: string | null;
  password: string | null;
}

export interface LoginFormPayload {
  email: string;
  password: string;
}

@Component({
  selector: 'meompt-platform-login',
  imports: [RouterModule, FormsModule, LoaderComponent],
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
        <form #form="ngForm" (ngSubmit)="onSubmitForm(form)">
          <fieldset
            class="flex flex-col justify-center items-start"
            [disabled]="isSubmitting"
          >
            <div class="w-full flex flex-col justify-center items-start mb-3">
              <label for="email" class="font-semibold text-base mb-1 text-left"
                >Email</label
              >
              <input
                type="email"
                id="email"
                name="email"
                title="Email"
                class="h-8 w-full rounded-lg border border-black px-2 text-sm"
                placeholder="e.g. meompt@gmail.com"
                required
                [(ngModel)]="model.email"
                #emailControl="ngModel"
              />

              @if (form.submitted && emailControl.errors) {
              <p class="text-meompt-error text-sm font-semibold mt-1">
                @if (emailControl.errors["required"]) { * Email es requerido. }
              </p>
              }
            </div>

            <div class="w-full flex flex-col justify-center items-start">
              <label
                for="password"
                class="font-semibold text-base mb-1 text-left"
                >Password</label
              >
              <input
                type="password"
                id="password"
                name="password"
                title="Password"
                class="h-8 w-full rounded-lg border border-black px-2 text-sm"
                placeholder="e.g. Your pet’s name"
                required
                [(ngModel)]="model.password"
                #passwordControl="ngModel"
              />

              @if (form.submitted && passwordControl.errors) {
              <p class="text-meompt-error text-sm font-semibold mt-1">
                @if (passwordControl.errors["required"]) { * Contraseña es
                requerida. }
              </p>
              }
            </div>

            <button
              type="submit"
              class="w-full h-8 rounded-full bg-meompt-blue text-meompt-white font-semibold my-4 flex justify-center items-center gap-x-2 {{
                isSubmitting &&
                  'select-none cursor-default bg-meompt-blue/60 gap-x-2'
              }}"
            >
              @if (isSubmitting) {
              <meompt-platform-loader></meompt-platform-loader>
              }
              {{ isSubmitting ? 'Submitting...' : 'Sign in' }}
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
  readonly model: LoginFormModel = {
    email: null,
    password: null,
  };

  isSubmitting = false;

  private readonly _authService = inject(AuthService);

  toggleIsSubmitting(value: boolean) {
    this.isSubmitting = value;
  }

  async onSubmitForm(form: NgForm) {
    this.toggleIsSubmitting(true);
    try {
      if (
        form.invalid ||
        this.model.email === null ||
        this.model.password === null
      ) {
        console.error('El formulario es invalido');
      } else {
        const response = await this._authService.login({
          email: this.model.email,
          password: this.model.password,
        });
        console.log(response);
      }
    } catch (e) {
      console.error(e);
    } finally {
      this.toggleIsSubmitting(false);
    }
  }
}
