/* eslint-disable vuejs-accessibility/mouse-events-have-key-events */
<template>
  <section class="bg-gray-25 py-20">
    <div class="container">
      <h2 class="h2">
        Odkryj nasze produkty
      </h2>

      <div class="hidden lg:flex mt-20">
        <div class="flex flex-col justify-between md:w-1/2">
          <div class="flex flex-col items-center text-center">
            <a
              data-image="~/static/images/category-banner.jpg"
              data-imagex2="~/static/images/category-banner@2x.jpg"
              href="#"
              class="category-link"
              @mouseenter="showImage"
              @focus="showImage"
            >Rzeźba</a>
            <a
              data-image="https://via.placeholder.com/350x441"
              data-imagex2="https://via.placeholder.com/350x441"
              href="#"
              class="category-link"
              @mouseenter="showImage"
              @focus="showImage"
            >Porcelana</a>
            <a
              data-image="https://via.placeholder.com/350x441"
              data-imagex2="https://via.placeholder.com/350x441"
              href="#"
              class="category-link"
              @mouseenter="showImage"
              @focus="showImage"
            >Fotele</a>
            <a
              :data-image="exampleImg"
              :data-imagex2="exampleImg"
              href="#"
              class="category-link"
              :class="defaultHover ? 'category-link-active' : null"
              @mouseenter="showImage"
              @focus="showImage"
            >Fotografia</a>
            <a
              data-image="https://via.placeholder.com/350x441"
              data-imagex2="https://via.placeholder.com/350x441"
              href="#"
              class="category-link"
              @mouseenter="showImage"
              @focus="showImage"
            >Grafika</a>
            <a
              data-image="https://via.placeholder.com/350x441"
              data-imagex2="https://via.placeholder.com/350x441"
              href="#"
              class="category-link"
              @mouseenter="showImage"
              @focus="showImage"
            >Malarstwo</a>
          </div>
          <a
            href="#"
            class="flex text-lg mx-auto items-center"
          >
            <span>Zobacz wszystkie</span>
            <img
              src="/icons/icon-arrow.svg"
              alt=""
              class="ml-2"
            >
          </a>
        </div>
        <div class="md:w-1/2">
          <nuxt-img
            alt=""
            :src="currentImage.x2 ? currentImage.x2 : exampleImg"
            class="ml-16 transition ease-in-out"
          />
        </div>
      </div>
      <div class="lg:hidden">
        <carousel
          :per-page="1"
          :pagination-padding="4"
          :pagination-color="twColorGray"
          class="text-center"
        >
          <slide>
            <nuxt-img
              src="~/static/images/category-thumb@2x.png"
              class="category-link"
            />
            <p><a href="#">Rzeźba</a></p>
          </slide>
          <slide>
            <nuxt-img
              src="https://via.placeholder.com/350x441"
              class="category-link"
            />
            <p><a href="#">Fotele</a></p>
          </slide>
        </carousel>

        <a
          href="#"
          class="flex text-lg mx-auto justify-center mt-10 items-center"
        >
          <span>Zobacz wszystkie</span>
          <nuxt-img
            src="/icons/icon-arrow.svg"
            class="ml-2"
          />
        </a>
      </div>
    </div>
  </section>
</template>
<script>
import tailwindConfig from '~/tailwind.config';
// eslint-disable-next-line import/no-extraneous-dependencies
import resolveConfig from 'tailwindcss/resolveConfig';

export default {
  name: 'SectionCategories',
  components: {
  },
  data() {
    return {
      currentImage: {
        default: null,
        x2: null,
      },
      defaultHover: true,
      that: this,
    };
  },
  computed: {
    twColorGray() {
      const config = resolveConfig(tailwindConfig);
      if (config) {
        return config.theme.colors.gray['450'];
      }
      return null;
    },
  },
  methods: {
    // TODO:show Image should keep link active when image is shown and mouse is out
    showImage(event) {
      this.defaultHover = false;
      const img = event.target.dataset.image;
      const imgLg = event.target.dataset.imagex2;
      if (img && imgLg) {
        this.currentImage.default = img;
        this.currentImage.x2 = imgLg;
        // event.target.classList.toggle('category-link-active')
      } else if (img) {
        this.currentImage.default = img;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.category-link {
  @apply text-lg w-full object-contain text-gray-600 py-4;
  max-height: 368px;
}
.category-link:hover,
.category-link-active {
  color: #000;
}
@screen lg {
  .category-link {
    max-height: unset;
  }
}
</style>
