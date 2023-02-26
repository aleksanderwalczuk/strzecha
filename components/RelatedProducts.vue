<template>
  <section
    v-if="products.length > 0"
    class="mt-12 mb-16"
  >
    <h2 class="font-serif text-3xl mb-8">Polecane produkty</h2>
    <section class="mt-8 md:grid-cols-3 md:gap-3 font-serif">
        <carousel>
          <slide
            v-for="item in products"
            :key="item.uid"
            class="slide"
          >
            <category-item :product="item" />
          </slide>
        </carousel>
        </section>
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api';
import { ProductInterface } from '~/interfaces/ProductInterface';
import CategoryItem from './CategoryItem.vue';

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
        };
    },
    async mounted() {
      // this should query a route to category
        const req = await this.$strapi.$http.$get<ProductInterface[]>('/product/related', { searchParams: {
          uid: this.product.category.uid,
          omit: this.product.uid
        }})
        console.log(req)
        this.products = req;
    },
    components: { CategoryItem }
});
</script>
<style>
.slide {
  @apply max-w-xs;
}
</style>
