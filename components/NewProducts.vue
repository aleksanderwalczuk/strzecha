<template>
  <section class="pt-20 pb-16 lg:pb-56 new-products">
    <div class="container">
      <h2 class="h2">
        Polecane
      </h2>
      <div class="hidden md:flex">
        <client-only>
          <nuxt-link
            v-for="product in trimmed"
            :key="product.uid"
            :to="`/product/${product.uid}`"
            class="product-item-link new-product-item flex-grow"
          >
            <figure class="new-product-item">
              <div class="relative">
                <div class="absolute w-full h-full" />
                <nuxt-img
                  v-if="Array.isArray(product.images)"
                  :src="product.images[0].url"
                  provider="strapi"
                  fit="cover"
                  height="400"
                  width="360"
                  :alt="product.images[0].alternativeText"
                  class="object-cover mix-blend-multiply mx-auto h-[369px] ratio"
                />
              </div>
              <figcaption>
                <span class="flex mt-4 justify-center md:justify-start">
                  <span>{{
                    truncate(product.title, { length: 30, separator: " " })
                  }}</span>
                  <img
                    src="/icons/icon-arrow.svg"
                    class="ml-2 hidden md:block"
                  />
                </span>
              </figcaption>
            </figure>
          </nuxt-link>
        </client-only>
      </div>
      <div class="carousel md:hidden">
        <client-only>
          <carousel
            :per-page="1"
            :pagination-padding="4"
            :pagination-color="'gray-450'"
          >
            <slide
              v-for="product in trimmed"
              :key="product.uid"
            >
              <nuxt-link
                :to="`/product/${product.uid}`"
                class="product-item-link new-product-item"
              >
                <figure class="new-product-item">
                  <div class="relative">
                    <div class="absolute w-full h-full" />
                    <nuxt-img
                      v-if="Array.isArray(product.images)"
                      :src="product.images[0].url"
                      provider="strapi"
                      :alt="product.images[0].alternativeText"
                      class="news-img object-cover h-full mix-blend-multiply"
                    />
                  </div>
                  <figcaption>
                    <div class="flex mt-4 justify-center md:justify-start">
                      <span>{{
                        truncate(product.title, { length: 30, separator: " " })
                      }}</span>
                      <img
                        src="/icons/icon-arrow.svg"
                        class="ml-2 hidden md:block"
                      />
                    </div>
                  </figcaption>
                </figure>
              </nuxt-link>
            </slide>
          </carousel>
        </client-only>
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api";
import { truncate } from "lodash";
import { ProductInterface } from "~/interfaces/ProductInterface";
import { useProductsStore } from "~/stores/main";

export default defineComponent({
  name: "NewProducts",
  data() {
    return {
      store: useProductsStore(),
      products: [] as ProductInterface[],
    };
  },
  async fetch() {
    if (this.store.products.results.length === 0) {
      // FIXME: should fetch only new products
      await this.store.fetchProducts();
    }
    this.products = this.store.products.results;
  },
  computed: {
    trimmed() {
      return this.products.slice(-3);
    },
  },
  methods: {
    truncate,
    isArrEven(arr: unknown[]): null | boolean {
      return arr.length % 2 ? Boolean(0) : Boolean(1);
    },
  },
});
</script>
<style lang="postcss" scoped>
.new-product-item .relative > .absolute {
  background: rgba(198, 198, 198, 0.5);
}
.new-product-item {
  /* @apply max-w-xs h-96; */
}
.product-item-link {
  @apply block;
}
.new-product-item:nth-child(even) {
  @apply mx-6;
}

.ratio {
  aspect-ratio: 36/40;
}
/* .new-product-item:first-child { */
/* @apply mr-6; */
/* } */
/* .new-product-item:last-child { */
/* @apply ml-6; */
/* } */
/* .new-product-item:nth-child(odd) { */
/* @apply mx-6; */
/* } */
</style>
<style lang="postcss">

.new-products .VueCarousel-dot {
  @apply focus:ring-0;
  height: 2px !important;
  border-radius: 0 !important;
}
.new-products .VueCarousel-dot-container {
  margin-top: 0 !important;
}

</style>
