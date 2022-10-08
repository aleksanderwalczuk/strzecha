<template>
  <section class="py-10">
    <div class="container">
      <div class="flex flex-wrap">
        <nuxt-link
          class="category-link"
          to="/categories/"
        >
          Wszystko
        </nuxt-link>
        <nuxt-link
          class="category-link"
          to="/categories/furniture"
        >
          Meble
        </nuxt-link>
        <nuxt-link
          class="category-link"
          to="/categories/ceramics"
        >
          Ceramika i porcelana
        </nuxt-link>
        <nuxt-link
          class="category-link"
          to="/categories/paintings"
        >
          Malarstwo
        </nuxt-link>
        <nuxt-link
          class="category-link"
          to="/categories/graphics"
        >
          Grafika
        </nuxt-link>
        <nuxt-link
          class="category-link"
          to="/categories/sculpture"
        >
          Rzeźba
        </nuxt-link>
        <nuxt-link
          class="category-link"
          to="/categories/photography"
        >
          Fotografia
        </nuxt-link>
        <nuxt-link
          class="category-link"
          to="/categories/clocks"
        >
          Zegary
        </nuxt-link>
        <nuxt-link
          class="category-link"
          to="/categories/other"
        >
          Inne
        </nuxt-link>
      </div>
      <!-- <div v-if="true">
        <div
          v-for="product in products"
          :key="product.id"
          class="product-grid"
        >
          <div class="product-item">
             <h2>title</h2>
      </div>
      </div>
      </div> -->
      <div class="grid grid-cols-3 gap-3">
        <!-- <product-image class="h-56"> -->
        <div class="p-4">
          <nuxt-picture
            alt=""
            blur="40"
            src="/images/p-product-1@2x.png"
            class="h-56"
          />
        </div>
        <div class="p-4">
          <nuxt-picture
            alt=""
            blur="40"
            src="/images/p-product-2.png"
            class="h-56"
          />
        </div>
        <!-- class="object-contain object-center max-w-3/4" -->
        <!-- </product-image> -->
        <!-- <product-image class="h-56">
          <nuxt-picture
            alt=""
            blur="40"
            src="/images/p-product-2.png"
            class="product-image-item"
          />
        </product-image>
        <product-image class="h-56">
          <nuxt-picture
            alt=""
            blur="40"
            src="/images/category-thumb@2x.png"
            class="product-image-item"
          />
        </product-image> -->
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';

export default defineComponent({
  name: 'CategoryPage',
});
</script>
<style scoped>
.category-link {
  @apply block py-2 px-3 relative text-gray-650;
  line-height: 1.25rem;
}
.category-link::after {
  @apply absolute transform -translate-x-1/2 bg-black-300;
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 80%;
  height: 1px;
  opacity: 0;
  transition: all 300ms ease-in-out;
}
.category-link.active--exact.active, .category-link:hover {
  @apply text-black-500;
}
.category-link.active--exact.active::after, .category-link:hover::after {
  opacity: 1;
}
.product-grid {
  @apply grid grid-cols-1;
}
.product-image-item picture, .product-image-item img {
  @apply object-contain object-center;
  max-height: 96px;
}
</style>
