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
        v-if="product != null"
        class="flex font-serif"
      >
        <div class="max-w-1/2 flex-shrink-0">
          <img src="https://via.placeholder.com/480x578" alt="foo">
        </div>
        <div class="max-w-1/2 flex-grow xl:ml-20 mb-4">
          <h2
            class="mb-4"
          >
            {{ product.title }}
          </h2>
          <!-- those should be computed properties -->
          <p
            v-if="product.info.price"
            class="font-serif font-normal text-[40px] leading-[40px] mb-4"
          >
            {{ product.info.price }}
            &nbsp;
            <span
              v-if="product.info.currency"
              class="text-[18px] leading-[32px]"
            >
              {{ product.info.currency }}
            </span>
          </p>
          <div class="flex mb-10">
            <a
              href="mailto:example@example.com"
              class="flex justify-center items-center bg-black-500 text-white py-[10px] px-14"
            >
              <span class="mr-3">
                <!-- eslint-disable -->
                <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.28613 0.5L9.99945 8.83333L18.7128 0.5" stroke="#F9F8F8" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M18.7128 0.5H1.28613V15.5H18.7128V0.5Z" stroke="#F9F8F8" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <!-- eslint-enable -->
              </span>
              <span class="text-base leading-[1] mt-[2px]">Złóż ofertę</span>
            </a>
            <a
              v-if="product.info.link"
              :href="product.info.link"
              target="_blank"
            >
              Kup na allegro
            </a>
          </div>
          <p
            v-if="product.info.description"
            class="leading[24px]"
          >
            {{ product.info.description }}
          </p>
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
  name: 'ProductPage',
  data() {
    return {
      categories: [] as CategoryInterface[],
      activeId: null as string | null,
      product: null as any,
    };
  },
  async fetch() {
    const res = await this.$strapi.find('product-categories', { populate: '*', id: this.$route.params.product }) as StrapiResponseInterface<CategoryInterface>;
    this.categories = res.data.map(({ id, attributes }) => ({ id, ...attributes }));

    await this.getProductsByCategory(this.$route.params.product);
  },
  computed: {
    activeCategory(): CategoryInterface | undefined {
      return this.categories.find(({ id }) => this.$route.params.product === id?.toString());
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
      const res = await this.$strapi.findOne(
        'products',
        categoryId,
        { populate: ['info', 'additional', 'info.product_category', 'info.images'] },
      ) as StrapiResponseInterface<ProductInterface>;
      // this.product = res;
      this.product = get(res.data, 'attributes', null);
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
