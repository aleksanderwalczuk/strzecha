<template>
  <transition name="fade">
    <div
      ref="navOpenedWrapper"
      class="hidden nav-open fixed w-full z-30 md:block"
    >
      <nav class="nav-open-wrapper relative bg-gray-50 py-20">
        <div class="nav-container">
          <button class="nav-close w-5 h-5" @click.self="close">
            <span class="sr-only"> Close </span>
          </button>
          <div ref="navOpenedContainer" class="flex items-start">
            <div class="flex flex-wrap justify-start w-1/2 lg:justify-between">
              <div
                v-for="(category, key, index) in linksWithParentCategories"
                :key="'nav-category-' + index"
                class="w-5/12"
              >
                <h3 class="text-gray-250 mb-8 capitalize">
                  {{ category.name }}
                </h3>
                <ul>
                  <li
                    v-for="{ createdAt, uid, name } in category.data"
                    :key="createdAt"
                  >
                    <nuxt-link :to="`/category/${uid}`" @click.native="close">
                      {{ name }}
                    </nuxt-link>
                  </li>
                </ul>
              </div>
              <div class="mr-auto">
                <nuxt-link class="btn flex justify-start items-center lg:whitespace-nowrap" to="/categories/"
                  ><span class="mr-2">Zobacz wszystkie</span
                  ><svg
                    width="33"
                    height="14"
                    viewBox="0 0 33 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 7L16 7L31 7"
                      stroke="#2C2022"
                      stroke-linecap="square"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M27 1.5L32 7L27 12.5"
                      stroke="#2C2022"
                      stroke-linecap="square"
                    />
                  </svg>
                </nuxt-link>
              </div>
            </div>
            <div class="category-thumbnail">
              <nuxt-img :src="image" />
            </div>
          </div>
        </div>
      </nav>
    </div>
  </transition>
</template>
<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import { mapState } from "pinia";
import { SettingsInterface } from "~/interfaces/SettingsInterface";
import { useCategoriesStore, useSettingsStore } from "~/stores/main";

export default defineComponent({
  name: "MainNavigation",
  props: {
    isVisible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      categoriesStore: useCategoriesStore(),
      settingsStore: useSettingsStore(),
      settings: null as null | SettingsInterface
    };
  },
  computed: {
    ...mapState(useCategoriesStore, ["categories"]),
    ...mapState(useCategoriesStore, ["inNavigation"]),
    ...mapState(useCategoriesStore, ["parentCategories"]),
    ...mapState(useCategoriesStore, ["linksWithParentCategories"]),
    image() {
      return this.settings?.navigation?.menu_image?.url ?? "/images/nav-cat-thumbnail-1.jpg"
    }
  },
  watch: {
    isVisible(value) {
      if (value === false) {
        this.remove();
      }
      if (value === true) {
        window.addEventListener("keydown", this.keyClose);
        window.addEventListener("click", this.closeOnOutsideClick);
      }
    },
  },
  async mounted() {
    if (this.settingsStore.settings == null) {
      await this.settingsStore.fetch();
    }
    this.settings = this.settingsStore.settings;
  },
  beforeDestroy() {
    this.remove();
  },
  methods: {
    closeOnOutsideClick(e: MouseEvent) {
      // hide navigation on click outside the container
      if (this.$refs.navOpenedWrapper == null) {
        return;
      }

      if (
        (this.$refs.navOpenedWrapper as HTMLElement).contains(
          e.target as Node
        ) &&
        (this.$refs.navOpenedContainer as HTMLElement).contains(
          e.target as Node
        )
      ) {
        this.close();
      }
    },
    close() {
      this.$emit("toggleNav");
    },
    keyClose(e: KeyboardEvent) {
      if (e.key === "Escape") {
        this.close();
      }
    },
    remove() {
      window.removeEventListener("keydown", this.keyClose);
      window.removeEventListener("click", this.closeOnOutsideClick);
    },
  },
});
</script>
<style lang="postcss" scoped>
.nav-container {
  @apply relative px-8 mx-auto;
  max-width: 57.5rem;
  min-height: calc(100vh - 175px);
}
li {
  @apply mb-6;
}
.category-thumbnail {
  @apply px-16 py-12 bg-gray-25 w-1/2 flex items-center justify-center;
}
.nav-close {
  @apply absolute right-0 -top-12;
}
.nav-close::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 0%;
  width: 100%;
  height: 1px;
  transform: rotate(45deg) translateY(-50%);
  background: #000;
}
.nav-close::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 0%;
  width: 100%;
  height: 1px;
  transform: rotate(-45deg) translateY(-50%);

  background: #000;
}
@screen md {
  .nav-close {
    right: 1rem;
  }
}
@screen lg {
  .nav-container {
    @apply px-5;
  }

  .nav-close {
    right: 0;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
