<template>
  <div class="">
    <p v-if="$fetchState.pending">
      Loading...
    </p>
    <div
      v-else
      class="min-h-screen container pt-8 md:pt-10"
    >
      <categories-navigation :categories="categories" />
      <section
        v-if="products.length > 0"
        class="grid grid-cols-2 gap-2 mt-8 md:grid-cols-3 md:gap-3 font-serif"
      >
        <category-item
          v-for="product in activeCategoryProducts"
          :key="product.uid"
          :product="product"
        />
      </section>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api";
import { mapState } from "pinia";
import CategoryItem from "~/components/CategoryItem.vue";
import { ProductInterface } from "~/interfaces/ProductInterface";

import { useCategoriesStore, useProductsStore } from "~/stores/main";

export default defineComponent({
  name: "CategoryPage",
  components: { CategoryItem },
  data() {
    return {
      activeId: null as string | null,
      productsStore: useProductsStore(),
      categoriesStore: useCategoriesStore()
    };
  },
  async fetch() {
    // eslint-disable-next-line no-unused-expressions
    await this.categoriesStore.getCategoryById(this.$route.params.category);
    await this.productsStore.fetchProducts();
    // FIXME
    // should fetch products by category
  },
  computed: {

    ...mapState(useCategoriesStore, ["categories"]),
    ...mapState(useCategoriesStore, {
      activeCategory: "activeCategory"
    }),
    ...mapState(useProductsStore, ["products"]),

    activeCategoryProducts(): ProductInterface[] {
      return this.products.filter(
        (product) => product.category.uid === this.activeId
      );
    }
  },
  mounted() {
    if (this.$route.params.category != null) {
      this.activeId = this.$route.params.category;
      this.categoriesStore.activeCategoryUid = this.$route.params.category;
    }
  }
});
</script>
<style lang="postcss" scoped>
 .container {
  @apply max-w-6xl px-3 mx-auto;
 }
 .spacing {
  letter-spacing: 0.035em;
 }
</style>
