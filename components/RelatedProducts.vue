<template>
  <section
    v-if="products.length > 0"
    class="mt-12 mb-16"
  >
    <h2 class="font-serif text-3xl mb-8">
      Polecane produkty
    </h2>
    <div class="mt-8 font-serif ">
      <carousel
        :per-page="2"
        :per-page-custom="[[768, 3], [1024, 4]]"
      >
        <slide
          v-for="item in products"
          :key="item.uid"
          class="slide"
        >
          <category-item
            :overlay="false"
            :product="item"
          />
        </slide>
      </carousel>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from "@nuxtjs/composition-api";
import { ProductInterface } from "~/interfaces/ProductInterface";
import CategoryItem from "./CategoryItem.vue";

export default defineComponent({
  components: { CategoryItem },
  props: {
    product: {
      type: Object as PropType<ProductInterface>,
      required: true,
    },
  },
  data() {
    return {
      products: [] as ProductInterface[],
    };
  },
  async mounted() {
    // this should query a route to category
    const req = await this.$strapi.$http.$get<ProductInterface[]>(
      "/product/related",
      {
        searchParams: {
          uid: this.product.category.uid,
          omit: this.product.uid,
        },
      }
    );
    this.products = req;
  },
});
</script>
<style lang="postcss" scoped>
.slide {
  @apply w-full max-w-xs;
}
</style>
<style lang="postcss">
.related-carousel .VueCarousel-inner {
  @apply justify-around;
}
.related-carousel .VueCarousel-dot {
  @apply focus:ring-0 outline-none;
  height: 2px !important;
  border-radius: 0 !important;
}
.related-carousel .VueCarousel-dot.VueCarousel-dot--active {
  @apply focus:outline-none;
}
.related-carousel .VueCarousel-dot-container {
  margin-top: 0 !important;

}
</style>
