<template>
  <with-loader :loading="$fetchState.pending">
    <section class="hero-bg relative pb-14 md:pb-28 border-b border-grey-400">
      <div class="container pt-10 md:pt-20 md:h-full">
        <div class="mb-8 md:mb-30 mx-auto">
          <nuxt-picture
            v-if="image != null"
            class="hero-img flex justify-center"
            :src="image.url"
            provider="strapi"
            preload
          />
        </div>
        <div class="md:flex md:flex-col md:w-9/12 mx-auto text-center">
          <p
            v-if="settings"
            class="lg:-mx-1 md:text-lg hero-text"
          >
            {{ settings.home_page.description }}
          </p>
          <div class="flex justify-center">
            <router-link
              :to="{ name: 'categories'}"
              class="block px-8 md:px-9 py-2 md:pb-3 mx-auto border border-black-300 mt-12 md:mt-16"
            >
              Zobacz ofertę
            </router-link>
          </div>
        </div>
      </div>
    </section>
    <NewProducts />
    <Categories :categories="categories" />
    <SectionOnDemand />
    <SectionInstagram />
  </with-loader>
</template>

<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api";
import { mapState } from "pinia";
import Categories from "~/components/Categories.vue";
import NewProducts from "~/components/NewProducts.vue";
import SectionInstagram from "~/components/SectionInstagram.vue";
import SectionOnDemand from "~/components/SectionOnDemand.vue";
import WithLoader from "~/components/WithLoader.vue";
import { SettingsInterface } from "~/interfaces/SettingsInterface";
import {
  useProductsStore,
  useCategoriesStore,
  useSettingsStore
} from "~/stores/main";

export default defineComponent({
  name: "IndexPage",
  components: {
    Categories,
    NewProducts,
    SectionOnDemand,
    SectionInstagram,
    WithLoader,
  },
  data() {
    return {
      settings: null as null | SettingsInterface,
      categoriesStore: useCategoriesStore(),
      productsStore: useProductsStore(),
      settingsStore: useSettingsStore(),
    };
  },
  async fetch() {
    this.settings = this.settingsStore.settings;
    await this.categoriesStore.fetchCategories();
    await this.productsStore.fetchProducts();

    if (this.settings == null) {
      await this.settingsStore.fetch();
      this.settings = this.settingsStore.settings;
    }
  },
  fetchOnServer: false,
  computed: {
    image() {
      return this.settings?.home_page.coverImage;
    },
    ...mapState(useProductsStore, ["products"]),
    ...mapState(useCategoriesStore, ["categories"]),
    ...mapState(useSettingsStore, ["pages"]),
  },
});
</script>
<style lang="postcss">
.container {
  @apply px-8 mx-auto;
  max-width: 100%;
}

.h2 {
  @apply text-lg mb-10 text-center;
  letter-spacing: 0.035em;
}

@screen lg {
  .container {
    max-width: 70.5rem;
  }
  .h2 {
    @apply text-2xl mb-10 text-center;
    letter-spacing: 0.035em;
  }
}
</style>
<style lang="postcss" scoped>
.hero-img {
  max-height: 528px;
}
.hero-text {
  letter-spacing: 0.035em;
}
@screen lg {
  .hero-bg {
    width: 100%;
    min-height: 100vh;
    background-size: cover;
  }
}
</style>
