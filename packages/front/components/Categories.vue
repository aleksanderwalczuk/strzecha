/* eslint-disable vuejs-accessibility/mouse-events-have-key-events */
<template>
  <section 
  v-if="activeCategories.length > 2"
  class="bg-gray-25 py-20">
    <div class="container">
      <h2 class="h2">Odkryj nasze produkty</h2>

      <div class="hidden lg:flex mt-20">
        <div class="flex flex-col justify-between md:w-1/2">
          <div class="flex flex-col items-center text-center">
            <ul>
              <li
                v-for="category in activeCategories"
                :key="category.uid"
                class="category-link"
                @mouseover="updateHoveredName(category.name)"
                @focus="updateHoveredName(category.name)"
              >
                <nuxt-link :to="`/category/${category.uid}`" class="">
                  {{ category.name }}
                </nuxt-link>
              </li>
            </ul>
          </div>
          <a href="#" class="flex text-lg mx-auto items-center">
            <span>Zobacz wszystkie</span>
            <img src="/icons/icon-arrow.svg" alt="" class="ml-2" />
          </a>
        </div>
        <div class="md:w-1/2 md:min-h-[390px]">
          <nuxt-img
            v-if="activeImage != null"
            provider="strapi"
            :alt="activeImage.alternativeText"
            :src="activeImage.url"
            class="ml-16 transition ease-in-out"
          />
        </div>
      </div>
      <!-- <div class="lg:hidden">
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
      </div> -->
    </div>
  </section>
</template>
<script lang="ts">
import { defineComponent, PropType } from "@nuxtjs/composition-api";

import { CategoryInterface } from "~/interfaces/CategoryInterface";
import { get } from "lodash";
import { StrapiImageInterface } from "~/interfaces/StrapiImageInterface";

export default defineComponent({
  name: "SectionCategories",
  props: {
    categories: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      currentImage: {
        default: null,
        x2: null,
      },
      defaultHover: true,
      hoveredCategoryName: null as CategoryInterface["name"] | null,
    };
  },
  computed: {
    activeCategories(): [] {
      return this.categories.filter(({ onHomepage }) => onHomepage === true);
    },
    activeCategoryName(): CategoryInterface["name"] | null {
      if (this.hoveredCategoryName != null) {
        return this.hoveredCategoryName;
      }

      const [firstCategory] = this.categories;

      return firstCategory.name;
    },
    activeImage(): StrapiImageInterface | null {
      const category = this.activeCategories.find(
        ({ name }) => name === this.activeCategoryName
      );
      return get(category, "image", null);
    },
  },

  methods: {
    updateHoveredName(name: CategoryInterface["name"]) {
      this.hoveredCategoryName = name;
    },
  },
});
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
