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
        <img
          src="/icons/icon-arrow.svg"
          alt=""
          class="mr-2 transform rotate-180"
        >
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
        <div
          v-for="product in activeCategoryProducts"
          :key="`product-${product.id}`"
          class=""
        >
          <h3>{{ product.title }}</h3>
          <nuxt-link
            v-if="product.info.link"
            :to="`/product/${product.id}`"
          >
            click
          </nuxt-link>
        </div>
      </section>
    </div>
    <!-- {{ params }} -->
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { get } from 'lodash';
import { CategoryInterface } from '~/interfaces/CategoryInterface';
import { ProductInterface } from '~/interfaces/ProductInterface';
import { StrapiResponseInterface } from '~/interfaces/StrapiResponseInterface';

export default defineComponent({
  name: 'CategoryPage',
  data() {
    return {
      categories: [] as CategoryInterface[],
      activeId: null as string | null,
      products: [] as unknown[],
    };
  },
  async fetch() {
    const res = await this.$strapi.find('product-categories', { populate: '*', id: this.$route.params.category }) as StrapiResponseInterface<CategoryInterface>;
    this.categories = res.data.map(({ id, attributes }) => ({ id, ...attributes }));

    await this.getProductsByCategory(this.$route.params.category);
  },
  computed: {
    activeCategory(): CategoryInterface | undefined {
      return this.categories.find(({ id }) => this.$route.params.category === id?.toString());
    },
    activeCategoryProducts() {
      return this.products.filter(
        (product) => get(
          product,
          'info.product_category.data.attributes.name',
          null,
        ) === this.activeCategory?.name,
      );
    },
  },
  mounted() {
    const { category: categoryId } = this.$route.params;

    if (categoryId != null) {
      this.activeId = categoryId;
    }
  },

  methods: {
    async getProductsByCategory(categoryId: string) {
      const res = await this.$strapi.find(
        'products', {
          populate: ['info', 'additional', 'info.product_category', 'info.images'],
        },
      ) as StrapiResponseInterface<ProductInterface[]>;
      // this.product = res;

      this.products = res.data.map(({ attributes, id }) => (
        { id, ...attributes }
      ));
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
