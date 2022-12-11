<template>
  <section class="pt-20 pb-16 lg:pb-56">
    <div class="container">
      <h2 class="h2">Nowości</h2>
      <div class="hidden md:flex">
        <!-- START FETCHED CONTENT -->
        <client-only>
          <nuxt-link
            :to="`/product/${product.uid}`"
            v-for="product in products"
            :key="product.uid"
            class="product-item-link new-product-item"
          >
            <figure class="new-product-item">
              <div class="relative">
                <div class="absolute w-full h-full" />
                <nuxt-img
                  :src="product.images[0].url"
                  provider="strapi"
                  fit="cover"
                  height="400px"
                  width="360px"
                  :alt="product.images[0].alternativeText"
                  class="news-img object-cover mix-blend-multiply min-h-[25rem] mx-auto"
                />
              </div>
              <figcaption>
                <span class="flex mt-4 justify-center md:justify-start">
                  <span>{{ product.title }}</span>
                  <nuxt-img
                    src="/icons/icon-arrow.svg"
                    class="ml-2 hidden md:block"
                  />
                </span>
              </figcaption>
            </figure>
          </nuxt-link>
        </client-only>

        <!-- END FETCHED CONTENT -->
      </div>
      <div class="carousel md:hidden">
        <client-only>
          <carousel
            :per-page="1"
            :pagination-padding="4"
            :pagination-color="'gray-450'"
          >
            <slide v-for="product in products" :key="product.uid">
              <!-- START FETCHED CONTENT -->
              <nuxt-link
                :to="`/products/${product.uid}`"
                class="product-item-link new-product-item"
              >
                <!-- :class="isArrEven(arr) ? 'new-product-item-even' : 'new-product-item-odd'" -->

                <figure class="new-product-item">
                  <div class="relative">
                    <div class="absolute w-full h-full" />
                    <nuxt-img
                      :src="product.images[0].url"
                      provider="strapi"
                      :alt="product.images[0].alt"
                      class="news-img object-cover h-full mix-blend-multiply"
                    />
                  </div>
                  <figcaption>
                  <div
                      class="flex mt-4 justify-center md:justify-start"
                    >
                      <span>{{ product.title }}</span>
                      <nuxt-img
                        src="/icons/icon-arrow.svg"
                        class="ml-2 hidden md:block"
                      />
                    </div>
                  </figcaption>
                </figure>
              </nuxt-link>
              <!-- END FETCHED CONTENT -->
            </slide>
          </carousel>
        </client-only>
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api";
import { ProductInterface } from "~/interfaces/ProductInterface";
import { useProductsStore } from "~/stores/main";
import ExampleData from "../static/exampleData";

export default defineComponent({
  name: "NewProducts",
  data() {
    return {
      fetchedData: ExampleData,
      store: useProductsStore(),
      products: [] as ProductInterface[],
    };
  },
  async fetch() {
    if (this.store.products.length === 0) {
      // FIXME: should fetch only new products
      await this.store.fetchProducts();
    }
    this.products = this.store.products;
  },
  mounted() {},
  computed: {},
  methods: {
    isArrEven(arr: unknown[]): null | boolean {
      return arr.length % 2 ? Boolean(0) : Boolean(1);
    },
  },
});
</script>
<style lang="scss" scoped>
.new-product-item .relative > .absolute {
  background: rgba(198, 198, 198, 0.5);
}
.new-product-item {
  @apply max-w-xs h-96;
}
.product-item-link {
  @apply block h-full;
}
.new-product-item:nth-child(even) {
  @apply mx-6;
}
.new-product-item:nth-child(odd) {
  @apply mx-6;
}
.VueCarousel-dot {
  @apply focus:ring-0;
  height: 2px !important;
  border-radius: 0 !important;
}
.VueCarousel-dot-container {
  margin-top: 0 !important;
}
</style>
