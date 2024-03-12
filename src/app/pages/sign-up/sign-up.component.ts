import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LoaderComponent } from 'src/app/components/loader.component';
import { AuthService } from 'src/app/services/auth.service';

export interface SignUpFormModel {
  email: string | null;
  password: string | null;
  confirmPassword: string | null;
}

export interface SignUpFormPayload {
  email: string;
  password: string;
  confirmPassword: string;
}

@Component({
  selector: 'meompt-platform-sign-up',
  imports: [RouterModule, FormsModule, LoaderComponent],
  template: `<section
    class="min-h-screen bg-gradient-to-br from-meompt-light-blue to-meompt-blue flex justify-center items-center p-8"
  >
    <div class="bg-white p-6 rounded-2xl shadow-2xl text-center w-full">
      <h2 class="m-0 mb-6 text-2xl font-bold">Creating a Meompt account</h2>
      <form #form="ngForm" (ngSubmit)="onSubmitForm(form)">
        <fieldset
          class="flex flex-col justify-center items-start"
          [disabled]="isSubmitting"
        >
          <div class="mb-3 w-full flex flex-col justify-center items-start">
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

          <div class="mb-3 w-full flex flex-col justify-center items-start">
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
              required
              [(ngModel)]="model.password"
              #passwordControl="ngModel"
              minlength="6"
            />

            @if (form.submitted && passwordControl.errors) {
            <p class="text-meompt-error text-sm font-semibold mt-1">
              @if (passwordControl.errors["required"]) { * Contraseña es
              requerida. } @else if (passwordControl.errors["minlength"]) {*
              Contraseña debe tener al menos 6 caracteres. }
            </p>
            }
          </div>

          <div class="mb-3 w-full flex flex-col justify-center items-start">
            <label
              for="confirm-password"
              class="font-semibold text-base mb-1 text-left"
              >Confirm password</label
            >
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              title="Confirm-password"
              class="h-8 w-full rounded-lg border border-black px-2 text-sm"
              placeholder="Repeat the above password."
              required
              [(ngModel)]="model.confirmPassword"
              #confirmPasswordControl="ngModel"
            />

            @if (form.submitted) { @if(confirmPasswordControl.errors) {
            <p class="text-meompt-error text-sm font-semibold mt-1 text-left">
              @if (confirmPasswordControl.errors["required"]) { * Es necesario
              confirmar la contraseña. }
            </p>
            } @else if (passwordControl.control.value !=
            confirmPasswordControl.control.value) {
            <p class="text-meompt-error text-sm font-semibold mt-1">
              * La contraseña no coincide.
            </p>
            } }
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
            {{ isSubmitting ? 'Submitting...' : 'Confirm' }}
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
export class SignUpPage {
  readonly model: SignUpFormModel = {
    email: null,
    password: null,
    confirmPassword: null,
  };

  isSubmitting = false;

  private readonly _authService = inject(AuthService);
  private readonly _router = inject(Router);

  toggleIsSubmitting(value: boolean) {
    this.isSubmitting = value;
  }

  async onSubmitForm(form: NgForm) {
    this.toggleIsSubmitting(true);
    try {
      if (
        form.invalid ||
        this.model.email === null ||
        this.model.password === null ||
        this.model.password !== this.model.confirmPassword
      ) {
        console.error('El formulario es invalido');
      } else {
        const response = await this._authService.register({
          email: this.model.email,
          password: this.model.password,
        });
        if (response.user.uid) {
          this._router.navigate(['/onboarding']);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      this.toggleIsSubmitting(false);
    }
  }
}
