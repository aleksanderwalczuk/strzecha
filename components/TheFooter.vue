<template>
  <footer class="bg-black-500 text-white pt-14 pb-6">
    <div class="container">
      <h2 class="mb-10">
        <nuxt-link
          to="/"
          class="nav-site-title font-title font-normal uppercase"
        >
          {{ title }}
        </nuxt-link>
      </h2>
      <div class="flex flex-row flex-wrap">
        <div class="footer-item">
          <h3 class="mb-4">
            Porozmawiajmy
          </h3>
          <ul class="underline">
            <li>
              <a
                href="tel:0048601663227"
                rel="noopener noreferrer"
              >+ 48 601 663 227
              </a>
            </li>
            <li>
              <a
                href="mailto:strzecha@gmail.com"
                target="blank"
                rel="noopener"
              >strzecha@gmail.com
              </a>
            </li>
          </ul>
        </div>
        <div class="footer-item">
          <h3 class="mb-4">
            Odwiedź nas
          </h3>
          <a
            href="https://goo.gl/maps/nXQbGRmoVL8VThyH6"
            rel="noopener"
            target="blank"
            class="block"
          >
            <ul>
              <li class="underline">Wzgórze Mickiewicza</li>
              <li>Gdańsk</li>
            </ul>
          </a>
        </div>
        <div class="footer-item w-full md:w-auto">
          <h3 class="mb-4">
            Bądź na bieżąco
          </h3>
          <div class="flex">
            <div class="flex font-title">
              <a
                href="https://www.facebook.com/strzechagdansk"
                class="social-item"
                target="blank"
              >fb
              </a>
            </div>
            <div class="flex font-title">
              <a
                href="https://www.instagram.com/strzechapl/"
                class="social-item"
                target="blank"
              >ig
              </a>
            </div>
          </div>
        </div>
      </div>
      <p class="text-xs text-gray-550">
        Strzecha 2021. All rights reserved.
      </p>
    </div>
  </footer>
</template>

<script>
export default {
  name: "PageFooter",
  props: {
    title: {
      type: String,
      required: false,
      default: "Strzecha"
    }
  }
};
</script>

<style lang="scss" scoped>
.footer-item {
  @apply mb-14;
}

.footer-item h3 {
  @apply text-gray-550;
}
.social-item {
  @apply flex justify-center items-center uppercase w-10 h-10 rounded-full border border-white;
  @apply mr-3;
}
@media screen and (min-width: 375px) and (max-width: 500px) {
  .footer-item {
    @apply w-full;
  }
}
@media screen and (min-width: 500px) {
  .footer-item:nth-child(2) {
    @apply ml-9;
  }
}
@screen md {
  .footer-item {
    @apply ml-9;
  }
  .footer-item:first-of-type {
    @apply ml-0;
  }
}
</style>
