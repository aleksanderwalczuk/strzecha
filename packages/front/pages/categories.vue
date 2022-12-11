<template>
  <section class="py-10">
    <div class="container">
      <CategoriesNavigation v-if="categoriesStore.categories" :categories="categoriesStore.categories" />
      <div class="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-3 mt-8">
        <nuxt-link
          v-for="product in productsStore.products"
          :to="`/product/${product.uid}`"
          :key="product.uid"
          class="p-2 md:p-4 h-36 md:h-56 flex justify-center bg-[#F9F8F8]"
        >
          <nuxt-img
            :alt="product.images[0].alternativeText"
            provider="strapi"
            fit="cover"
            blur="40"
            :src="product.images[0].url"
            class="max-h-[9rem] object-center md:max-h-max md:h-full"
          />
        </nuxt-link>
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api";
import CategoriesNavigation from "~/components/CategoriesNavigation.vue";
import { useCategoriesStore, useProductsStore } from "~/stores/main";

export default defineComponent({
    name: "CategoryPage",
    data() {
        return {
            categoriesStore: useCategoriesStore(),
            productsStore: useProductsStore(),
        };
    },
    async fetch() {
        await this.categoriesStore.fetchCategories();
        await this.productsStore.fetchProducts();
    },
    components: { CategoriesNavigation }
});
</script>
<style scoped>
.product-grid {
  @apply grid grid-cols-1;
}
.product-image-item picture,
.product-image-item img {
  @apply object-contain object-center;
  max-height: 96px;
}
</style>
