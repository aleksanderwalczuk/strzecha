<template>
  <section class="pt-20 pb-16 lg:pb-56">
    <div class="container">
      <h2 class="h2">
        Nowości
      </h2>
      <div class="hidden md:flex">
        <!-- START FETCHED CONTENT -->
        <a
          v-for="(item, index, arr) in fetchedData"
          :key="item.id"
          :href="item.link || '#'"
          :class="isArrEven(arr) ? 'new-product-item-even' : 'new-product-item-odd'"
          class="product-item-link"
        >
          <figure class="new-product-item">
            <div class="relative">
              <div class="absolute w-full h-full" />
              <nuxt-picture
                :src="item.imgLg"
                alt=""
                class="news-img object-cover h-full mix-blend-multiply"
              />
            </div>
            <figcaption>
              <a
                href="#"
                class="flex mt-4 justify-center md:justify-start"
              >
                <span>{{ item.title }}</span>
                <nuxt-img
                  src="/icons/icon-arrow.svg"
                  class="ml-2 hidden md:block"
                />
              </a>
            </figcaption>
          </figure>
        </a>
        <!-- END FETCHED CONTENT -->
      </div>
      <div class="carousel md:hidden">
        <carousel
          :per-page="1"
          :pagination-padding="4"
          :pagination-color="twColorGray"
        >
          <slide
            v-for="(item, index, arr) in fetchedData"
            :key="item.id"
          >
            <!-- START FETCHED CONTENT -->
            <a
              :href="item.link || '#'"
              :class="isArrEven(arr) ? 'new-product-item-even' : 'new-product-item-odd'"
              class="product-item-link"
            >
              <figure class="new-product-item">
                <div class="relative">
                  <div class="absolute w-full h-full" />
                  <nuxt-picture
                    :src="item.imgLg"
                    alt=""
                    class="news-img object-cover h-full mix-blend-multiply"
                  />
                </div>
                <figcaption>
                  <a
                    href="#"
                    class="flex mt-4 justify-center md:justify-start"
                  >
                    <span>{{ item.title }}</span>
                    <nuxt-img
                      src="/icons/icon-arrow.svg"
                      class="ml-2 hidden md:block"
                    />
                  </a>
                </figcaption>
              </figure>
            </a>
            <!-- END FETCHED CONTENT -->
          </slide>
        </carousel>
      </div>
    </div>
  </section>
</template>
<script>
// eslint-disable-next-line import/no-extraneous-dependencies
import resolveConfig from 'tailwindcss/resolveConfig';
import ExampleData from '~/static/exampleData';
import tailwindConfig from '~/tailwind.config';

export default {
  name: 'NewProducts',
  data() {
    return {
      fetchedData: ExampleData,
    };
  },
  computed: {
    getImages() {
      return this.fetchedData.map((el) => el.img);
    },
    twColorGray() {
      const config = resolveConfig(tailwindConfig);
      if (config) {
        return config.theme.colors.gray['450'];
      }
      return null;
    },
  },
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

.new-product-item .relative > .absolute {
  background: rgba(198, 198, 198, 0.5);
}
.product-item-link {
  @apply block h-full;
}
.new-product-item-even:nth-child(even) {
  @apply mx-6;
}
.new-product-item-odd:nth-child(odd) {
  @apply mx-6;
}
.VueCarousel-dot {
  @apply focus:ring-0;
  height: 2px !important;
  border-radius: 0 !important;
}
.VueCarousel-dot-container {
  margin-top: 0 !important;
}
</style>
