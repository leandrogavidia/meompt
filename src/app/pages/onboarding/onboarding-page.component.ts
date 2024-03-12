import { Component } from '@angular/core';

@Component({
  selector: 'meompt-platform-onboarding',
  template: `<section
    class="min-h-screen bg-gradient-to-br from-meompt-light-blue to-meompt-blue flex justify-center items-center p-8"
  >
    <div class="bg-white p-6 rounded-2xl shadow-2xl text-center w-full">
      <h2 class="mb-6 text-2xl font-bold mt-0">Profile info</h2>
      <form>
        <fieldset class="flex flex-col justify-center items-start">
          <label for="image-profile" class="font-semibold text-xl mb-2"
            >Image</label
          >
          <label
            for="image-profile"
            class="rounded-full mx-auto shadow-md flex justify-center items-center mb-10"
          >
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
          </label>
          <input
            type="file"
            accept="image/png, image/jpeg"
            id="image-profile"
            name="image-profile"
            class="hidden"
          />

          <label for="fullname" class="font-semibold text-base mb-2 text-left"
            >Full name</label
          >
          <input
            type="text"
            name="fullname"
            id="fullname"
            placeholder="e.g. Mary Miles Smith"
            class="h-8 w-full rounded-lg border border-black mb-3 px-2 text-sm"
            title="Full name"
            required
          />

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
          ></textarea>
        </fieldset>
      </form>

      <div class="mt-6 flex flex-col justify-start items-center gap-3 w-full">
        <button
          class="w-full bg-black/50 rounded-full h-9 text-meompt-white font-medium text-base select-none cursor-default"
        >
          Previous
        </button>
        <button
          class="w-full bg-meompt-blue rounded-full h-9 text-meompt-white font-medium text-base"
        >
          Next
        </button>
      </div>
    </div>
  </section>`,
  standalone: true,
})
export class OnboardingPage {}
