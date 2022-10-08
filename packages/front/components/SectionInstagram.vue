<template>
  <section class="pt-32 pb-52">
    <div class="container">
      <h2 class="h2">
        Bądź na bieżąco
      </h2>
      <div class="flex mt-14 justify-center">
        <p>pics go here</p>
      </div>
    </div>
  </section>
</template>
<script>

export default {
  name: 'SectionInstagram',
  // eslint-disable-next-line vue/no-unused-components
  methods: {
    isArrEven(arr) {
      if (Array.isArray(arr)) {
        return arr.length % 2 ? 0 : 1;
      }
      return null;
    },
  },
};
</script>

<style lang="scss" scoped>
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
