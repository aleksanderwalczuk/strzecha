<template>
  <div class="flex flex-col flex-1">
    <div
      v-if="loading"
      class="flex-1 loader-container flex justify-center items-center"
    >
      <svg
        width="48"
        height="48"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        class="stroke-[#111]"
      >
        <path
          d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
          opacity=".25"
        />
        <circle
          class="spinner_7WDj"
          cx="12"
          cy="2.5"
          r="1.5"
        />
      </svg>
    </div>
    <transition
      v-else
      appear
      name="fade"
    >
      <div class="flex-1">
        <categories-navigation :categories="castedCategories" />
        <section
          v-if="products.results.length > 0"
          class="grid grid-cols-1 gap-2 mt-8 md:grid-cols-3 md:gap-3 font-serif pb-16"
        >
          <category-item
            v-for="product in activeProducts"
            :key="product.uid"
            :product="product"
          />
        </section>
        <pagination
          :pagination="products.pagination"
          @update="() => $emit('update')"
        />
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "@nuxtjs/composition-api";
import { mapState } from "pinia";
import { Paginated } from "~/interfaces/base";
import { ProductInterface } from "~/interfaces/ProductInterface";
import { useCategoriesStore, useProductsStore } from "~/pinia/main";
import { CategoryInterface } from "~/interfaces/CategoryInterface";
import CategoriesNavigation from "./CategoriesNavigation.vue";
import CategoryItem from "./CategoryItem.vue";
import Pagination from "./Pagination.vue";

export default defineComponent({
  components: { CategoriesNavigation, CategoryItem, Pagination },
  props: {
    products: {
      type: Object as PropType<Paginated<ProductInterface[]>>,
      required: true,
    },
    loading: {
      type: Boolean,
    },
  },
  emits: ["update"],
  data() {
    return {
      productsStore: useProductsStore(),
    };
  },

  computed: {
    ...mapState(useCategoriesStore, ["categories"]),
    ...mapState(useProductsStore, ["query"]),
    castedCategories() {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return this.categories as CategoryInterface[];
    },
    activeProducts(): ProductInterface[] {
      if (this.products == null) {
        return [];
      }

      if (this.query.length > 0) {
        return this.productsStore.searchedProducts.results;
      }

      if (this.$route.params.category) {
        return this.products.results.filter(
          (product) => product.category.uid === this.$route.params.category
        );
      }

      return this.products.results;
    },
  },

  watch: {
    query(val) {
      this.productsStore.searchProducts(val);
    },
  },
});
</script>
