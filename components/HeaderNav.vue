<template>
  <div class="relative">
    <nav
      class="nav-md mb-9 absolute w-full nav-category"
    >
      <button
        class="nav-link hover:text-gray-650"
        @click="$emit('toggleNav')"
      >
        Wszystkie produkty
      </button>
      <button class="nav-link hover:text-gray-650">
        Na zamówienie
      </button>
    </nav>
  </div>
</template>
<script>

export default {
  name: 'HeaderNav',
};
</script>
<style lang="scss" scoped>
.nav-md {
  @apply  hidden ;
}
.nav-category {
  will-change: transform;
}
.nav-link {
  @apply text-lg cursor-pointer;
}
.nav-md .nav-link {
  @apply mx-3 px-4 block cursor-pointer;
}

.nav-link:first-child {
  @apply ml-0;
}
@screen md {
  .nav-md {
    @apply justify-center flex
  }
}
</style>
