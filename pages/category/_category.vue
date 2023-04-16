<template>
  <with-loader :loading="$fetchState.pending">
    <div
      class="min-h-screen container pt-8 md:pt-10"
    >
      <with-results
        :loading="$fetchState.pending"
        :products="products"
        @update="updateProducts"
      />
    </div>
  </with-loader>
</template>
<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api";
import { mapState } from "pinia";
import { ProductInterface } from "~/interfaces/ProductInterface";
import { useCategoriesStore, useProductsStore } from "~/pinia/main";
import WithLoader from "~/components/WithLoader.vue";
import WithResults from "~/components/WithResults.vue";

export default defineComponent({
  name: "CategoryPage",
  components: {
    WithLoader, WithResults,
  },
  data() {
    return {
      activeId: null as string | null,
      productsStore: useProductsStore(),
      categoriesStore: useCategoriesStore(),
    };
  },
  async fetch() {
    await this.categoriesStore.getCategoryById(this.$route.params.category);
    const page = this.$route.query.p ? Number(this.$route.query.p) : undefined;
    await this.productsStore.fetchProducts({
      page,
      category: this.$route.params.category,
    });
  },
  computed: {
    ...mapState(useCategoriesStore, ["categories"]),
    ...mapState(useCategoriesStore, {
      activeCategory: "activeCategory",
    }),
    ...mapState(useProductsStore, ["products"]),

    activeCategoryProducts(): ProductInterface[] {
      return this.products.results.filter(
        (product) => product.category.uid === this.activeId
      );
    },
  },
  mounted() {
    if (this.$route.params.category != null) {
      this.activeId = this.$route.params.category;
      this.categoriesStore.activeCategoryUid = this.$route.params.category;
    }
  },
  methods: {
    async updateProducts() {
      const page = this.$route.query.p
        ? Number(this.$route.query.p)
        : undefined;
      await this.productsStore.fetchProducts({
        page,
        category: this.$route.params.category,
      });
    },
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
