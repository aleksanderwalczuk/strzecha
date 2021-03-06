<template>
  <div>
    <header class="relative text-black h-[3.75rem] md:h-[10.5rem]">
      <div
        class="fixed min-w-full border-b z-10 bg-gray-50"
      >
        <div class="container">
          <div class="flex justify-between items-center py-4 md:py-10">
            <div class="search-container relative z-20 w-3/12">
              <form class="relative">
                <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
                <label for="search" class="cursor-pointer">
                  <nuxt-img src="/icons/icon-search.svg" />
                </label>
                <div class="absolute top-0 left-9">
                  <input
                    id="search"
                    type="text"
                    name="search"
                    class="search-input md:block"
                  >
                </div>
              </form>
            </div>
            <div
              class="floating-logo hidden md:block"
            >
              <nuxt-link
                to="/"
                class="nav-site-title font-title"
                @click.native="isNavOpen = false"
              >
                {{ title }}
              </nuxt-link>
            </div>
            <div class="relative top-0 z-20 hidden md:block w-3/12">
              <nav class="flex gap-x-4 items-center justify-end">
                <nuxt-link class="nav-link" to="/contact">
                  Kontakt
                </nuxt-link>
                <nuxt-link class="nav-link" to="/blog/">
                  <nuxt-img src="/icons/icon-lang.svg" />
                </nuxt-link>
              </nav>
            </div>
            <nuxt-link to="/" class="nav-site-title font-title md:hidden">
              <h2 class="nav-site-title font-light font-title uppercase">
                Strzecha
              </h2>
            </nuxt-link>
            <hamburger />
          </div>
          <nav
            class="hidden md:flex justify-center mb-[1.5rem]"
          >
            <button
              class="nav-btn"
              :class="isNavOpen ? 'nav-btn-active': 'hover:text-gray-650'"
              @click="isNavOpen = !isNavOpen"
            >
              Wszystkie produkty
            </button>
            <button
              class="nav-btn hover:text-gray-650"
            >
              Na zamówienie
            </button>
          </nav>
        </div>
      </div>
    </header>
    <header-open
      v-show="isNavOpen"
      v-scroll-lock="isNavOpen"
      :is-visible="isNavOpen"
      @toggleNav="isNavOpen = !isNavOpen"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';
import { useCategoriesStore } from '~/stores/main';

export default defineComponent({
  name: 'PageHeader',
  props: {
    title: {
      type: String,
      required: false,
      default: 'Strzecha',
    },
  },
  data() {
    return {
      isNavOpen: false,
      categoriesStore: useCategoriesStore(),
    };
  },
  async fetch() {
    await this.categoriesStore.fetchCategories();
    await this.categoriesStore.fetchSubcategories();
  },
  computed: {
  },
});
</script>
<style lang="scss" scoped>

.container {
  @apply px-8;
}
.floating-logo {
  will-change: transform;
}
.nav-link {
  @apply text-lg;
}
.nav-md .nav-link {
  @apply px-7 block cursor-pointer;
}
.nav-link:first-child {
  @apply pl-0;
}
.nav-site-title {
  @apply text-xl uppercase;
  font-weight: 300;
  letter-spacing: 0.09em;
}
.nav-btn {
  @apply px-2 text-lg cursor-pointer focus:ring-transparent focus:outline-none;
}

.nav-btn-active {
  @apply underline underline-offset-8 outline-none;
}

.search-input {
  @apply bg-gray-50 border-b px-1 ring-0 focus:outline-none focus-within:ring-0;
  @apply hidden;
}

.active--exact {
  /* Active Nav Link */
}
</style>
