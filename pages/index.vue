<template>
  <div>
    <div v-if="$fetchState.pending">
      Loading...
    </div>
    <section
      v-else
      class="hero-bg relative pb-14 md:pb-28 border-b border-grey-400"
    >
      <div class="container pt-10 md:pt-20 md:h-full">
        <div class="mb-8 md:mb-30">
          <nuxt-picture
            class="w-full hero-img"
            src="/images/hero-bg@2x.jpg"
            preload
          />
        </div>
        <div class="md:flex md:flex-col md:w-9/12 mx-auto text-center">
          <p class="lg:-mx-1 md:text-lg hero-text">
            {{ page.description }}
          </p>
          <div class="flex justify-center">
            <a
              href="#"
              class="block px-8 md:px-9 py-2 md:pb-3 mx-auto border border-black-300 mt-12 md:mt-16"
            >
              Skontaktuj się z nami
            </a>
          </div>
        </div>
      </div>
    </section>
    <new-products />
    <section-on-demand :categories="categories" />
    <section-instagram />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { get } from 'lodash';

import CategoryInterface from '~/interfaces/CategoryInterface';
import { StrapiResponseInterface } from '~/interfaces/StrapiResponseInterface';

export default defineComponent({
  name: 'IndexPage',
  data() {
    return {
      products: null as null | unknown[],
      page: null as null,
      categories: [] as CategoryInterface[],
    };
  },
  async fetch() {
    const [hero, products, categories] = [
      await this.$strapi.find('hero-section', { populate: '*' }),
      await this.$strapi.find('products', { populate: '*' }),
      await this.$strapi.find('product-categories') as unknown as StrapiResponseInterface<CategoryInterface>,
    ];

    // const foo:  = categories;
    this.products = products;
    this.page = hero.data.attributes;
    this.categories = categories.data.map(({ id, attributes }) => (
      { id, ...attributes }
    ));
  },
  fetchOnServer: false,

  computed: {
    heroImage() {
      return get(
        this.page,
        'image.data.attributes.url',
        '/images/hero-bg@2x.jpg',
      );
    },
  },
});
</script>
<style lang="scss">
* {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    box-sizing: border-box;
}
.container {
    @apply px-8 mx-auto;
    max-width: 100%;
}

.h2 {
    @apply text-lg mb-10 text-center;
    letter-spacing: 0.035em;
}

@screen lg {
    .container {
        max-width: 70.5rem;
    }
    .h2 {
        @apply text-2xl mb-10 text-center;
        letter-spacing: 0.035em;
    }
}
</style>
<style lang="scss" scoped>
.hero-img {
  max-height: 528px;
}
.hero-text {
  letter-spacing: 0.035em;
}
@screen lg {
  .hero-bg {
      width: 100%;
      min-height: 100vh;
      background-size: cover;
  }
}
</style>
