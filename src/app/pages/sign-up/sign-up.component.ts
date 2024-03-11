import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoaderComponent } from 'src/app/components/loader.component';
import { DatabaseService } from 'src/app/services/database.service';

export interface SignUpFormModel {
  email: string | null;
  password: string | null;
}

export interface SignUpFormPayload {
  email: string;
  password: string;
}

@Component({
  selector: 'meompt-platform-sign-up',
  imports: [RouterModule, FormsModule, LoaderComponent],
  template: `<section
    class="min-h-screen bg-gradient-to-tr from-meompt-light-blue to-meompt-blue flex justify-center items-center p-8"
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
            required
            [(ngModel)]="model.password"
            #passwordControl="ngModel"
          />

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
          />

          @if (form.submitted && passwordControl.errors) {
          <p class="text-meompt-error text-sm font-semibold mt-1">
            @if (passwordControl.errors["required"]) { * Contraseña es
            requerida. }
          </p>
          }

          <button
            type="submit"
            [class]="
              'w-full h-8 rounded-full bg-meompt-blue text-meompt-white font-semibold my-4 flex justify-center items-center gap-x-2' +
              (isSubmitting
                ? 'select-none cursor-default bg-gray-400 gap-x-2'
                : '')
            "
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
  };

  isSubmitting = false;

  private readonly _databaseService = inject(DatabaseService);

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
        console.log(this.model);
        const response = await this._databaseService.registerUser({
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
