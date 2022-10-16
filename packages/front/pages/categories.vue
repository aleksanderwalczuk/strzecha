<template>
  <section class="py-10">
    <div class="container">
      <div class="flex flex-wrap">
        <nuxt-link class="category-link" to="/categories/">
          Wszystko
        </nuxt-link>
        <nuxt-link
          v-for="category in categoriesStore.categories"
          :key="category.uid"
          class="category-link"
          :to="`/category/${category.uid}`"
        >
          {{ category.name }}
        </nuxt-link>
      </div>
      <div class="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-3">
        <nuxt-link
          v-for="product in productsStore.products"
          :to="`/product/${product.uid}`"
          :key="product.uid"
          class="p-2 md:p-4 h-36 md:h-56 flex justify-center"
        >
          <nuxt-img
            :alt="product.images[0].alt"
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
});
</script>
<style scoped>
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
.category-link.active--exact.active,
.category-link:hover {
  @apply text-black-500;
}
.category-link.active--exact.active::after,
.category-link:hover::after {
  opacity: 1;
}
.product-grid {
  @apply grid grid-cols-1;
}
.product-image-item picture,
.product-image-item img {
  @apply object-contain object-center;
  max-height: 96px;
}
</style>
