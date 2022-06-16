<template>
  <nuxt-link
    v-if="product.info.link"
    :to="`/product/${product.uid}`"
    class="category-item relative max-h-[400px] h-full font-serif"
  >
    <nuxt-img
      v-if="productThumbnail"
      provider="strapi"
      fit="cover"
      class="w-full max-w-[400px] object-cover max-h-full h-full"
      :src="productThumbnail"
    />
    <div
      class="product-overlay"
      :class="inverted === false
        ? 'product-overlay-animation'
        : 'product-overlay-animation-inverted'
      "
    >
      <h3 class="mb-4 text-[18px]">
        {{ product.title }}
      </h3>
      <p class="text-center">
        <span class="text-[32px] leading-[48px]">{{ product.info.price }}</span>
        <span>{{ product.info.currency }}</span>
      </p>
    </div>
  </nuxt-link>
</template>
<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api';
import { get } from 'lodash';
import { ProductInterface } from '~/interfaces/ProductInterface';
import { StrapiImageInterface } from '~/interfaces/StrapiImageInterface';
import { StrapiResponseInterface } from '~/interfaces/StrapiResponseInterface';

export default defineComponent({
  props: {
    product: {
      type: Object as PropType<ProductInterface>,
      required: true,
    },
    inverted: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    productImages(): StrapiImageInterface[] {
      return this.mapResponseToDataObject(get(this.product, 'info.images', []));
    },
    productThumbnail(): string {
      const [firstImage] = this.productImages;
      const baseUrl = get(firstImage, 'url', '');
      const mediumThumbnail = get(firstImage, 'formats.medium.url', null);
      return mediumThumbnail || baseUrl;
    },
  },
  methods: {
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
.product-overlay {
  @apply absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center;
  @apply text-white bg-[#2E2B2C];
}
.product-overlay-animation-inverted {
  @apply transform hover:transition-all duration-[300ms] ease-out hover:opacity-0;
}
.product-overlay-animation {
  @apply transform hover:transition-all duration-[300ms] ease-out opacity-0 hover:opacity-100;
}
</style>
