<template>
  <div class="">
    <p v-if="$fetchState.pending">
      Loading...
    </p>
    <div
      v-else
      class="min-h-screen container"
    >
      <nav
        v-if="activeCategory != null"
        class="flex items-center font-serif text-[18px] leading-[32px] spacing mt-8 sm:mt-20 mb-8"
      >
        <button @click="$router.back()">
          <img
            src="/icons/icon-arrow.svg"
            alt=""
            class="mr-2 transform rotate-180"
          >
        </button>
        <span class="capitalize">
          {{ activeCategory.parentCategory.uid }}
        </span>
        &nbsp;/&nbsp;
        <nuxt-link :to="`/category/${activeCategory.uid}`">
          <span>{{ activeCategory.name }}</span>
        </nuxt-link>
      </nav>
      <section
        v-if="product != null"
        class="flex font-serif flex-col md:flex-row"
      >
        <div class="max-w-[480px] w-full max-h-[520px] h-full">
          <div class="w-full h-full flex items-center justify-center">
            <carousel
              :per-page="1"
              :pagination-padding="4"
              class="text-center cursor-grab active:cursor-grabbing bg-[#f1f1f1]"
            >
              <slide
                v-for="image in productImages"
                :key="image.name"
                class="flex items-center"
              >
                <nuxt-img
                  v-if="image"
                  provider="strapi"
                  fit="cover"
                  :src="image.url"
                  :width="image.width"
                  :height="image.height"
                  class="max-h-[480px] mx-auto"
                />
              </slide>
            </carousel>
          </div>
        </div>
        <div class="max-w-1/2 max-w-[526px] w-full xl:ml-20 mb-4">
          <h2
            class="text-lg tracking-wide my-4 md:mt-0"
          >
            {{ product.title }}
          </h2>
          <!-- those should be computed properties -->
          <p
            v-if="product.price"
            class="font-serif font-normal text-[40px] leading-[40px] mb-4"
          >
            <span>{{ product.price }}</span>
            <span
              v-if="product.currency"
              class="text-[18px] leading-[32px]"
            >
              {{ product.currency.symbol }}
            </span>
          </p>
          <div class="flex mb-10">
            <a
              href="mailto:example@example.com"
              class="flex justify-center items-center bg-black-500 text-white py-[10px] px-14 mr-4"
            >
              <span class="mr-3">
                <!-- eslint-disable -->
                <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.28613 0.5L9.99945 8.83333L18.7128 0.5" stroke="#F9F8F8" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M18.7128 0.5H1.28613V15.5H18.7128V0.5Z" stroke="#F9F8F8" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <!-- eslint-enable -->
              </span>
              <span class="text-base leading-[1] mt-[2px]">Złóż ofertę</span>
            </a>
            <div
              v-for="provider in product.providers"
              :key="provider.name"
            >
              <a
                :href="provider.url"
                class="flex justify-center items-center bg-black-500 text-white py-[10px] px-14 mr-4"
                target="_blank"
              >
                {{ provider.label || provider.name }}
              </a>
            </div>
            <!-- <a
              v-if="product.info.link"
              :href="product.info.link"
              target="_blank"
              class="flex justify-center items-center border-black-500 border py-[10px] px-14"
            >
              <span class="text-base leading-[1] mt-[2px]">Kup na allegro</span>
            </a> -->
          </div>
          <p
            v-if="product.description"
            class="leading[24px]"
          >
            {{ product.description }}
          </p>
        </div>
      </section>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api";
import { get } from "lodash";
import { mapState } from "pinia";
import { ParentCategory } from "~/interfaces/CategoryInterface";
import { StrapiImageInterface } from "~/interfaces/StrapiImageInterface";
import { useCategoriesStore, useProductsStore } from "~/stores/main";

export default defineComponent({
  name: "ProductPage",
  data() {
    return {
      activeId: null as string | null,
      categoriesStore: useCategoriesStore(),
      productsStore: useProductsStore()
    };
  },
  async fetch() {
    await this.productsStore.setActiveByUid(this.$route.params.product);
    await this.productsStore.fetchProducts();
    await this.categoriesStore.fetchCategories();
  },
  computed: {
    ...mapState(useCategoriesStore, ["categories"]),
    ...mapState(useCategoriesStore, ["activeCategory"]),
    ...mapState(useProductsStore, { product: "activeProduct" }),

    activeParentCategory(): ParentCategory | undefined | null {
      if (this.activeCategory == null || this.categoriesStore.parentCategories == null) {
        return null;
      }

      return this.categoriesStore.parentCategories.find(({ uid }) => uid === this.activeCategory?.parentCategory.uid);
    },
    productImages(): StrapiImageInterface[] {
      return get(this.product, "images", []);
    }
  },
});
</script>
<style lang="postcss">
.VueCarousel-dot {
  @apply !bg-gray-450 !w-5 !px-2;
  border-radius: unset !important;
  height: 2px !important;
}

.VueCarousel-dot.VueCarousel-dot--active {
  @apply !bg-gray-800;
}
</style>
<style lang="postcss" scoped>
.container {
  @apply max-w-6xl px-3 mx-auto;
}
.spacing {
  letter-spacing: 0.035em;
}
</style>
