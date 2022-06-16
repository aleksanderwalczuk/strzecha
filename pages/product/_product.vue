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
          {{ activeCategory }}
        </span>
        &nbsp;/&nbsp;
        <nuxt-link :to="`/category/${activeSubcategory.url}`">
          <span>{{ activeSubcategory.name }}</span>
        </nuxt-link>
      </nav>
      <section
        v-if="product != null"
        class="flex font-serif"
      >
        <div class="max-w-[480px] w-full max-h-[520px] h-full p-6 bg-[#f1f1f1]">
          <div class="w-full h-full flex items-center justify-center">
            <nuxt-img
              v-if="productThumbnail"
              provider="strapi"
              fit="cover"
              :src="productThumbnail"
              class="max-h-[480px]"
            />
          </div>
        </div>
        <div class="max-w-1/2 max-w-[526px] w-full xl:ml-20 mb-4">
          <h2
            class="mb-4"
          >
            {{ product.title }}
          </h2>
          <!-- those should be computed properties -->
          <p
            v-if="price"
            class="font-serif font-normal text-[40px] leading-[40px] mb-4"
          >
            <span>{{ price }}</span><span
              v-if="product.info.currency"
              class="text-[18px] leading-[32px]"
            >
              {{ product.info.currency }}
            </span>
          </p>
          <div class="flex mb-10">
            <a
              href="mailto:example@example.com"
              class="flex justify-center items-center bg-black-500 text-white py-[10px] px-14 mr-4"
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
              class="flex justify-center items-center border-black-500 border py-[10px] px-14"
            >
              <span class="text-base leading-[1] mt-[2px]">Kup na allegro</span>
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
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';

import { get } from 'lodash';
import { mapState } from 'pinia';

import { ProductInterface } from '~/interfaces/ProductInterface';
import { StrapiImageInterface } from '~/interfaces/StrapiImageInterface';
import { StrapiResponseInterface } from '~/interfaces/StrapiResponseInterface';
import { useCategoriesStore, useProductsStore } from '~/stores/main';

export default defineComponent({
  name: 'ProductPage',
  data() {
    return {
      activeId: null as string | null,
      categoriesStore: useCategoriesStore(),
      productsStore: useProductsStore(),
    };
  },
  async fetch() {
    await this.productsStore.setActiveByUid(this.$route.params.product);
  },
  computed: {
    ...mapState(useCategoriesStore, ['categories']),
    ...mapState(useCategoriesStore, ['activeSubcategory']),
    ...mapState(useCategoriesStore, ['activeCategory']),
    ...mapState(useProductsStore, { product: 'activeProduct' }),

    productImages(): StrapiImageInterface[] {
      return this.mapResponseToDataObject(get(this.product, 'info.images', []));
    },
    productThumbnail(): string {
      const [firstImage] = this.productImages;
      const baseUrl = get(firstImage, 'url', '');
      const mediumThumbnail = get(firstImage, 'formats.medium.url', null);
      return mediumThumbnail || baseUrl;
    },
    price() {
      const price = get(this.product, 'info.price', '');
      return price;
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
      const strapi = this.$strapi as any;
      const res = await strapi.findOne(
        'products',
        categoryId,
        { populate: ['info', 'additional', 'info.product_category', 'info.images'] },
      ) as StrapiResponseInterface<ProductInterface>;
      // this.product = res;
      this.product = get(res.data, 'attributes', null);
    },
    mapResponseToDataObject(response: StrapiResponseInterface<StrapiImageInterface>) {
      return response.data.map(({ id, attributes }) => ({
        id,
        ...(attributes || {}),
      }));
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
