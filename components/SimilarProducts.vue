<template>
  <section v-if="product">
    <h2>Polecane produkty</h2>

  </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api';
import { Paginated } from '~/interfaces/base';
import { ProductInterface } from '~/interfaces/ProductInterface';

export default defineComponent({
  props: {
    product: {
      type: Object as PropType<ProductInterface>,
      required: true
    },
  },
  data() {
    return {
      products: [] as ProductInterface[]
    }
  },
  async mounted() {
    // await this.$strapi.create('product', {})
    const req = await this.$nuxt.$strapi.find<Paginated<ProductInterface[]>>("products", {
      category: this.product.category.uid
    });
    this.products = req.results;
  }
});
</script>
