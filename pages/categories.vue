<template>
  <section class="py-10">
    <div class="container">
      <with-loader :loading="$fetchState.pending">
        <categories-navigation
          v-if="categoriesStore.categories"
          :categories="sortedCategories"
        />
        <div class="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-3 mt-8 pb-12">
          <category-item
            v-for="product in productsStore.products.results"
            :key="product.uid"
            :product="product"
          />
        </div>
        <Pagination
          v-if="productsStore.products.pagination"
          :pagination="productsStore.products.pagination"
          @update="updateProducts"
        />
      </with-loader>
    </div>
  </section>
</template>
<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api";
import Pagination from "~/components/Pagination.vue";
import CategoryItem from "~/components/CategoryItem.vue";
import { CategoryInterface } from "~/interfaces/CategoryInterface";
import { useCategoriesStore, useProductsStore } from "~/stores/main";
import WithLoader from "~/components/WithLoader.vue";

export default defineComponent({
  name: "CategoryPage",
  components: { Pagination, CategoryItem, WithLoader },
  data() {
    return {
      categoriesStore: useCategoriesStore(),
      productsStore: useProductsStore(),
    };
  },
  async fetch() {
    await this.categoriesStore.fetchCategories();
    const page = this.$route.query.p ? Number(this.$route.query.p) : undefined;
    await this.productsStore.fetchProducts({ page });
  },
  computed: {
    sortedCategories(): CategoryInterface[] {
      return [...this.categoriesStore.categories].sort((a, b) => {
        if (a.order === b.order || a.order == null || b.order == null) {
          return 0;
        }
        return a.order > b.order ? 1 : -1;
      });
    },
  },
  methods: {
    async updateProducts() {
      const page = this.$route.query.p
        ? Number(this.$route.query.p)
        : undefined;
      await this.productsStore.fetchProducts({ page });
    },
  },
});
</script>
<style scoped lang="postcss">
.product-grid {
  @apply grid grid-cols-1;
}
.product-image-item picture,
.product-image-item img {
  @apply object-contain object-center;
  max-height: 96px;
}
</style>
