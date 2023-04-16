<template>
  <with-loader :loading="$fetchState.pending">
    <section class="py-10">
      <div class="container">
        <with-results
          :loading="productsStore.loading"
          :products="productsStore.products"
        />
      </div>
    </section>
  </with-loader>
</template>
<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api";
import { CategoryInterface } from "~/interfaces/CategoryInterface";
import { useCategoriesStore, useProductsStore } from "~/pinia/main";
import WithLoader from "~/components/WithLoader.vue";
import WithResults from "~/components/WithResults.vue";

export default defineComponent({
  name: "CategoryPage",
  components: { WithLoader, WithResults },
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
