<template>
  <nuxt-link
    v-if="product"
    :to="`/product/${product.uid}`"
    class="relative font-serif py-2 px-1 md:p-0"
  >
    <nuxt-img
      v-if="productThumbnail"
      provider="strapi"
      fit="cover"
      class="ratio w-full max-w-[400px] object-cover max-h-full md:h-full"
      :src="productThumbnail"
    />
    <div class="md:hidden">
      <p class="text-center">{{ product.title }}</p>
      <span class="block text-center">{{ product.price }}<span v-if="product.currency">{{ product.currency.symbol || 'zł' }}</span></span>
    </div>
    <div
      class="product-overlay"
      :class="inverted === false
        ? 'product-overlay-animation'
        : 'product-overlay-animation-inverted'
      "
    >
      <h3 class="mb-4 text-[18px] text-center px-4">
        {{ product.title }}
      </h3>
      <p class="text-center">
        <span class="text-[32px] leading-[48px]">{{ product.price }}</span>
        <span v-if="product.currency">{{ product.currency.symbol || 'zł' }}</span>
      </p>
    </div>
  </nuxt-link>
</template>
<script lang="ts">
import { defineComponent, PropType } from "@nuxtjs/composition-api";
import { get } from "lodash";
import { ProductInterface } from "~/interfaces/ProductInterface";

export default defineComponent({
  props: {
    product: {
      type: Object as PropType<ProductInterface>,
      required: true
    },
    inverted: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    productThumbnail(): string {
      const [firstImage] = this.product.images;
      const baseUrl = get(firstImage, "url", "");
      const mediumThumbnail = get(firstImage, "formats.medium.url", null);
      return mediumThumbnail || baseUrl;
    }
  }
});
</script>
<style lang="postcss" scoped>
.product-overlay {
  @apply absolute top-0 left-0 hidden w-full h-full flex-col justify-center items-center;
  @apply text-white bg-[#2E2B2C];
  @apply md:flex;
}
.product-overlay-animation-inverted {
  @apply transform hover:transition-all duration-[300ms] ease-out hover:opacity-0;
}
.product-overlay-animation {
  @apply transform hover:transition-all duration-[300ms] ease-out opacity-0 hover:opacity-100;
}
.ratio {
  aspect-ratio: 36/40;
}
</style>
