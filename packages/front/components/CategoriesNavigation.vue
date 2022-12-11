<template>
  <div class="flex flex-wrap md:mb-8">
    <nuxt-link class="category-link" to="/categories/">
      Wszystko
    </nuxt-link>
    <nuxt-link
      v-for="category in categories"
      :key="category.uid"
      class="category-link"
      :to="`/category/${category.uid}`"
    >
      {{ category.name }}
    </nuxt-link>
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';

export default defineComponent({
  name:"CategoriesNavigation",
  props: {
    categories: {
      default: [],
    }
  }
})
</script>

<style scoped lang="postcss">
.category-link {
  @apply block py-2 px-3 relative text-gray-650;
  line-height: 1.25rem;
}
.category-link::after {
  @apply absolute transform -translate-x-1/2 bg-black-300;
  content: "";
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 80%;
  height: 1px;
  opacity: 0;
  transition: all 300ms ease-in-out;
}
.category-link.nuxt-link-exact-active.nuxt-link-active,
.category-link:hover {
  @apply text-black-500;
}
.category-link.nuxt-link-exact-active.nuxt-link-active::after {
  opacity: 1;
}
</style>
