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
        class="flex items-center font-serif text-[18px] leading-[32px] spacing mt-20 mb-8"
      >
        <button @click="$router.back()">
          <img
            src="/icons/icon-arrow.svg"
            alt=""
            class="mr-2 transform rotate-180"
          >
        </button>
        <span class="capitalize">
          {{ activeCategory.parent_category }}
        </span>
        &nbsp;/&nbsp;
        <span>{{ activeCategory.name }}</span>
      </nav>
      <section
        v-if="products.length > 0"
        class="grid grid-cols-3 gap-6 font-serif"
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
import { defineComponent } from '@nuxtjs/composition-api';
import { get } from 'lodash';
import { mapState } from 'pinia';
import CategoryItem from '~/components/CategoryItem.vue';
import { ProductInterface } from '~/interfaces/ProductInterface';

import { useCategoriesStore, useProductsStore } from '~/stores/main';

export default defineComponent({
  name: 'CategoryPage',
  components: { CategoryItem },
  data() {
    return {
      activeId: null as string | null,
      productsStore: useProductsStore(),
      categoriesStore: useCategoriesStore(),
    };
  },
  async fetch() {
    await this.categoriesStore.fetchCategories();
    await this.productsStore.fetchProducts();
  },
  computed: {

    ...mapState(useCategoriesStore, ['categories']),
    ...mapState(useCategoriesStore, {
      activeCategory: 'activeSubcategory',
    }),
    ...mapState(useProductsStore, ['products']),

    activeCategoryProducts(): ProductInterface[] {
      return this.products.filter(
        (product) => get(
          product,
          'info.subcategory.name',
          null,
        ) === this.activeId,
      );
    },
  },
  mounted() {
    const { category: categoryUid } = this.$route.params;

    console.log(this.$route.params);

    this.categoriesStore.activeSubcategoryUrl = this.$route.params.category;

    if (categoryUid != null) {
      this.activeId = categoryUid;
    }
  },
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
