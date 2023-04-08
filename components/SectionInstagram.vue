<template>
  <section class="pt-32 pb-52 hidden">
    <div class="container">
      <h2 class="h2">
        Bądź na bieżąco
      </h2>
      <div class="flex mt-14 justify-center" />
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api";

export default defineComponent({
  name: "SectionInstagram",
  methods: {
    isArrEven(arr: number) {
      if (Array.isArray(arr)) {
        return arr.length % 2 ? 0 : 1;
      }
      return null;
    },
  },
});
</script>

<style lang="postcss" scoped>
.news-img {
  @apply mx-2;
  max-width: 12.875rem;
}
.news-img:first-child {
  @apply ml-0;
}
.news-img:last-child {
  @apply mr-0;
}
</style>
