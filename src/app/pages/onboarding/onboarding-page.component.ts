import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { LoaderComponent } from 'src/app/components/loader.component';
import { DatabaseService } from 'src/app/services/database.service';

export interface OnboardingFormModel {
  image: string | null;
  fullname: string | null;
  description: string | null;
}

export interface OnboardingFormPayload {
  image: string | null;
  fullname: string;
  description: string | null;
}

@Component({
  selector: 'meompt-platform-onboarding',
  imports: [FormsModule, LoaderComponent],
  template: `<section
    class="min-h-screen bg-gradient-to-br from-meompt-light-blue to-meompt-blue flex justify-center items-center p-8"
  >
    @if (this.step === 0) {
    <div
      class="bg-white p-6 rounded-2xl shadow-2xl text-center w-full max-w-[360px]"
    >
      <h2 class="mb-6 text-2xl font-bold mt-0">Customize your profile!</h2>
      <form #form="ngForm" (ngSubmit)="onSubmitForm(form)">
        <fieldset class="flex flex-col justify-center items-start">
          <label for="image-profile" class="font-semibold text-xl mb-2"
            >Image</label
          >
          <label
            for="image-profile"
            class="rounded-full mx-auto shadow-md flex justify-center items-center mb-10 cursor-pointer"
          >
            @if (!this.model.image) {
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-20 h-20 opacity-30"
            >
              <path
                fill-rule="evenodd"
                d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                clip-rule="evenodd"
              />
            </svg>
            } @else {
            <img
              [src]="this.model.image"
              alt="Your image profile"
              title="Your image profile"
              class="w-20 h-20 rounded-full"
            />
            }
          </label>
          <input
            type="file"
            accept="image/png, image/jpeg"
            id="image-profile"
            name="image-profile"
            class="hidden"
            (change)="onFileChange($event)"
          />

          <div class="mb-3 w-full flex flex-col justify-center items-start">
            <label for="fullname" class="font-semibold text-base mb-2 text-left"
              >Full name</label
            >
            <input
              type="text"
              name="fullname"
              id="fullname"
              placeholder="e.g. Mary Miles Smith"
              class="h-8 w-full rounded-lg border border-black px-2 text-sm"
              title="Full name"
              required
              [(ngModel)]="model.fullname"
              #fullnameControl="ngModel"
            />

            @if (form.submitted && fullnameControl.errors) {
            <p class="text-meompt-error text-sm font-semibold mt-1">
              @if (fullnameControl.errors["required"]) { * Full name es
              requerido. }
            </p>
            }
          </div>

          <label
            for="profile-description"
            class="font-semibold text-base mb-2 text-left"
            >Profile description (Optional)</label
          >
          <textarea
            name="profile-description"
            id="profile-description"
            cols="30"
            rows="10"
            class="w-full rounded-lg border border-black p-2 text-sm resize-none"
            placeholder="e.g. Hi there, I'm Lisa and I like the fantasy topics."
            [(ngModel)]="model.description"
            #descriptionControl="ngModel"
          ></textarea>
        </fieldset>
        <div class="mt-6 flex flex-col justify-start items-center gap-3 w-full">
          <button
            class="w-full bg-black/50 rounded-full h-9 text-meompt-white font-medium text-base select-none cursor-default"
            type="button"
          >
            Previous
          </button>
          <button
            type="submit"
            class="w-full h-8 rounded-full bg-meompt-blue text-meompt-white font-semibold flex justify-center items-center gap-x-2 {{
              isSubmitting &&
                'select-none cursor-default pointer-events-none bg-meompt-blue/60 gap-x-2'
            }}"
          >
            @if (isSubmitting) {
            <meompt-platform-loader></meompt-platform-loader>
            }
            {{ isSubmitting ? 'Submitting...' : 'Confirm' }}
          </button>
        </div>
      </form>
    </div>
    } @else if (this.step === 1) {
    <div
      class="bg-white p-6 rounded-2xl shadow-2xl text-center w-full max-w-[360px]"
    >
      <h2 class="mb-6 text-2xl font-bold mt-0">Link your Solana wallet!</h2>
    </div>
    }
  </section>`,
  standalone: true,
})
export class OnboardingPage {
  readonly model: OnboardingFormModel = {
    image: null,
    fullname: null,
    description: null,
  };

  isSubmitting = false;
  step = 1;
  private readonly _dbService = inject(DatabaseService);

  toggleIsSubmitting(value: boolean) {
    this.isSubmitting = value;
  }

  onFileChange(event: any) {
    const file = event?.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64String = reader.result as string;
      this.model.image = base64String;
      console.log(base64String);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  async onSubmitForm(form: NgForm) {
    this.toggleIsSubmitting(true);
    try {
      if (form.invalid || this.model.fullname === null) {
        console.error('El formulario es invalido');
      } else {
        console.log({
          image: this.model.image,
          fullname: this.model.fullname,
          description: this.model.description,
        });
        // const response = await this._dbService.createProfile({
        //   fullname: this.model.fullname,
        //   description: this.model.description,
        //   image: this.model.image,
        // });
        // if (response.id) {
        //   console.log('+1');
        // }
      }
    } catch (e) {
      console.error(e);
    } finally {
      this.toggleIsSubmitting(false);
    }
  }
}
