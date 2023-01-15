<template>
  <section class="py-10">
    <div class="container">
      <categories-navigation v-if="categoriesStore.categories" :categories="sortedCategories" />
      <div class="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-3 mt-8 pb-12">
        <category-item v-for="product in productsStore.products" :key="product.uid" :product="product"/>
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api";
import { CategoryInterface } from "~/interfaces/CategoryInterface";
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
    computed: {
      sortedCategories(): CategoryInterface[] {
        return this.categoriesStore.categories.sort((a, b) => {
          if (a.order === b.order || a.order == null || b.order == null) {
            return 0;
          }

        return a.order > b.order ? 1 : -1;
        });
      }

    }

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
