<template>
  <footer class="bg-black-500 text-white pt-14 pb-6">
    <div class="container">
      <div class="md:flex">
        <h2 class="mb-10">
          <nuxt-link
            to="/"
            class="nav-site-title font-title font-normal uppercase"
          >
            {{ title }}
          </nuxt-link>
        </h2>
        <div
          v-if="settings"
          class="flex-1 flex flex-row flex-wrap justify-end"
        >
          <div class="footer-item">
            <h3 class="mb-4">
              Porozmawiajmy
            </h3>
            <ul class="underline">
              <li>
                <a
                  :href="`tel:${sanitizedPhone}`"
                  rel="noopener noreferrer"
                >{{ settings.phone }}
                </a>
              </li>
              <li>
                <a
                  :href="`mailto:${settings.contact.email}`"
                  target="blank"
                  rel="noopener"
                >{{ settings.contact.email }}
                </a>
              </li>
            </ul>
          </div>
          <div class="footer-item">
            <h3 class="mb-4">
              Odwiedź nas
            </h3>
            <a
              href="https://goo.gl/maps/nXQbGRmoVL8VThyH6"
              rel="noopener"
              target="blank"
              class="block"
            >
              <ul>
                <li class="underline">{{ settings.contact.address_1 }}</li>
                <li>{{ settings.contact.address_2 }}</li>
              </ul>
            </a>
          </div>
          <div class="footer-item w-full md:w-auto">
            <h3 class="mb-4">
              Bądź na bieżąco
            </h3>
            <div class="flex">
              <div
                v-for="social in settings.socials"
                :key="social.name"
                class="flex font-title"
              >
                <a
                  :href="social.url"
                  class="social-item"
                  target="blank"
                >{{ social.label.toUpperCase() }}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p class="text-xs text-gray-550">
        Strzecha {{ updateYear }}. All rights reserved.
      </p>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api";
import { get } from "lodash";
import { SettingsInterface } from "~/interfaces/SettingsInterface";
import { useSettingsStore } from "../stores/main";

export default defineComponent({
  name: "PageFooter",
  props: {
    title: {
      type: String,
      required: false,
      default: "Strzecha",
    },
  },
  data() {
    return {
      settings: null as SettingsInterface | null,
      settingsStore: useSettingsStore(),
    };
  },
  computed: {
    sanitizedPhone() {
      let result = get(this.settings, "contact.phone", "");

      if (result === "") {
        return "";
      }

      const [firstChar, ...rest] = result;

      if (firstChar === "+") {
        result = ["00", ...rest].join("");
      }

      return result
        .split("")
        .map((char) => Number.parseInt(char, 10))
        .filter((num) => Number.isNaN(num) === false)
        .join("");
    },
    updateYear() {
      if (this.settings == null) {
        return "";
      }

      const date = new Date(this.settings.updatedAt);

      return date.getFullYear();
    },
  },
  async mounted() {
    const res = await this.settingsStore.fetch();

    if (res) {
      this.settings = res;
    }
  },
});
</script>

<style lang="postcss" scoped>
.footer-item {
  @apply mb-14;
}

.footer-item h3 {
  @apply text-gray-550;
}
.social-item {
  @apply flex justify-center items-center uppercase w-10 h-10 rounded-full border border-white;
  @apply mr-3;
}
@media screen and (min-width: 375px) and (max-width: 500px) {
  .footer-item {
    @apply w-full;
  }
}
@media screen and (min-width: 500px) {
  .footer-item:nth-child(2) {
    @apply ml-9;
  }
}
@screen md {
  .footer-item {
    @apply ml-9;
  }
  .footer-item:first-of-type {
    @apply ml-0;
  }
}
</style>
