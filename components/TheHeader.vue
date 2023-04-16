<template>
  <div>
    <header class="relative text-black h-[3.75rem] md:h-[10.5rem]">
      <div class="fixed min-w-full border-b z-10 bg-gray-50">
        <div class="container">
          <div class="flex justify-between items-center py-4 md:py-10">
            <div class="search-container relative z-20 w-3/12">
              <form
                ref="searchWrapper"
                class="relative"
              >
                <label
                  for="searchbox"
                  class="cursor-pointer"
                >
                  <img
                    src="/icons/icon-search.svg"
                    alt=""
                  />
                </label>
                <div class="absolute top-0 left-9 flex">
                  <input
                    id="searchbox"
                    v-model="searchOpen"
                    type="checkbox"
                    name="searchbox"
                    class="hidden"
                  />
                  <input
                    id="search"
                    type="text"
                    name="search"
                    class="search-input"
                    :class="{
                      'hidden': !searchOpen
                    }"
                    @input="($event) => setSearch($event.target)"
                  />
                  <button
                    v-if="searchOpen"
                    class="border-black-300 md:hidden"
                    @click="clearSearch"
                  >
                    Wyczyść
                    <span class="sr-only">Wyczyść wyszukiwanie</span>
                  </button>
                </div>
              </form>
            </div>
            <div
              class="floating-logo hidden md:block"
              :class="{
                'max-[420px]:hidden': searchOpen
              }"
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
                <a
                  class="nav-link"
                  :href="`mailto:${email}`"
                >
                  Kontakt
                </a>
                <a
                  class="nav-link"
                  :href="`mailto:${email}`"
                >
                  <img
                    src="/icons/icon-lang.svg"
                    alt=""
                  />
                </a>
              </nav>
            </div>
            <nuxt-link
              to="/"
              class="nav-site-title font-title md:hidden"
              :class="{
                'hidden': searchOpen
              }"
            >
              <h2 class="nav-site-title font-light font-title uppercase">
                Strzecha
              </h2>
            </nuxt-link>

            <hamburger v-if="!searchOpen" />
          </div>
          <nav class="hidden md:flex justify-center mb-[1.5rem]">
            <button
              class="nav-btn"
              :class="isNavOpen ? 'nav-btn-active' : 'hover:text-gray-650'"
              @click="isNavOpen = !isNavOpen"
            >
              Wszystkie produkty
            </button>
            <button class="nav-btn hover:text-gray-650">
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
import { defineComponent, ref } from "@nuxtjs/composition-api";
import { debounce, get } from "lodash";
import { useCategoriesStore, useProductsStore, useSettingsStore } from "~/stores/main";

export default defineComponent({
  name: "PageHeader",
  props: {
    title: {
      type: String,
      required: false,
      default: "Strzecha",
    },
  },
  setup() {
    const productsStore = useProductsStore();
    const search = ref("");
    const searchOpen = ref(false);
    const loading = ref(false);

    const setSearch = debounce((eventTarget: EventTarget | null) => {
      if (eventTarget != null) {
        search.value = (eventTarget as HTMLInputElement).value;
      }
    }, 250);

    return {
      productsStore,
      searchOpen,
      search,
      setSearch,
      loading,
    };
  },
  data() {
    return {
      isNavOpen: false,
      categoriesStore: useCategoriesStore(),
      settingsStore: useSettingsStore(),
    };
  },
  async fetch() {
    await this.categoriesStore.fetchCategories();
  },
  computed: {
    email() {
      return get(this.settingsStore.settings, "contact.email", "");
    },
  },
  watch: {
    search: {
      async handler() {
        if (this.search == null) {
          return;
        }

        this.productsStore.query = this.search;
      },
    },
    searchOpen: {
      handler(value) {
        if (value === false) {
          this.remove();
        }
        if (value === true) {
          window.addEventListener("keydown", this.keyClose);
          window.addEventListener("click", this.closeOnOutsideClick);
        }
      },
    },
  },
  methods: {
    remove() {
      window.removeEventListener("keydown", this.keyClose);
      window.removeEventListener("click", this.closeOnOutsideClick);
    },
    keyClose(e: KeyboardEvent) {
      if (e.key === "Escape") {
        this.searchOpen = false;
      }
    },
    closeOnOutsideClick(e: MouseEvent) {
      // hide navigation on click outside the container
      if (this.$refs.searchWrapper == null) {
        return;
      }

      if (
        (this.$refs.searchWrapper as HTMLElement).contains(
          e.target as Node
        ) === false

      ) {
        this.searchOpen = false;
      }
    },
    clearSearch() {
      this.productsStore.query = "";
      this.searchOpen = false;
    },
  },
});
</script>
<style lang="postcss" scoped>
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
  @apply md:block;
}

.active--exact {
  /* Active Nav Link */
}
</style>
