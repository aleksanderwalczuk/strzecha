<template>
  <div
    v-if="settings"
    class="flex flex-wrap justify-center md:mb-8"
  >
    <nuxt-link
      class="category-link"
      to="/categories/"
    >
      Wszystko
    </nuxt-link>
    <nuxt-link
      v-for="category in filtered"
      :key="category.uid"
      class="category-link"
      :to="`/category/${category.uid}`"
    >
      {{ category.name }}
    </nuxt-link>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from "@nuxtjs/composition-api";
import { CategoryInterface } from "~/interfaces/CategoryInterface";
import { SettingsInterface } from "~/interfaces/SettingsInterface";
import { useSettingsStore } from "~/stores/main";

export default defineComponent({
  name: "CategoriesNavigation",
  props: {
    categories: {
      type: Array as PropType<CategoryInterface[]>,
      default: () => [],
    },
  },
  data() {
    return {
      settings: null as null | SettingsInterface,
      settingsStore: useSettingsStore(),
    };
  },
  async fetch() {
    if (this.settingsStore.settings == null) {
      const response = await this.settingsStore.fetch();

      if (response != null) {
        this.settings = response;
      }
    }
  },
  computed: {
    filtered() {
      if (this.settings) {
        if (this.settings.navigation.show_empty_categories === false) {
          this.categories.filter((category) => category);
        }
      }

      return this.categories;
    },
  },
  mounted() {
    if (this.settingsStore.settings) {
      this.settings = this.settingsStore.settings;
    }
  },
});
</script>

<style scoped lang="postcss">
.category-link {
  @apply block py-2 px-3 relative text-gray-650;
  line-height: 1.25rem;
}
.category-link::after {
  @apply absolute transform -translate-x-1/2 bg-black-300;
  content: "";
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 80%;
  height: 1px;
  opacity: 0;
  transition: all 300ms ease-in-out;
}
.category-link.nuxt-link-exact-active.nuxt-link-active,
.category-link:hover {
  @apply text-black-500;
}
.category-link.nuxt-link-exact-active.nuxt-link-active::after {
  opacity: 1;
}
</style>
