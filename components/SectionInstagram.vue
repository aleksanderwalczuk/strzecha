<template>
  <section class="pt-32 pb-52">
    <div class="container">
      <h2 class="h2">
        Bądź na bieżąco
      </h2>
      <div class="mt-8 font-serif ig-carousel">
        <carousel
          :per-page="2"
          :per-page-custom="[[768, 3], [1024, 4]]"
        >
          <slide
            v-for="item in withThumbnails"
            :key="item.id"
            class="slide"
          >
            <div class="video mx-3">
              <a
                :href="item.permalink"
                target="_blank"
              >
                <img
                  :src="item.media_url"
                  controls="true"
                  class="ratio"
                />
              </a>
            </div>
          </slide>
        </carousel>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api";
import { InstagramInterface } from "interfaces/InstagramInterface";

export default defineComponent({
  name: "SectionInstagram",
  data() {
    return {
      data: [] as InstagramInterface["data"],
    };
  },
  async fetch() {
    const { data } = await this.$strapi.find<InstagramInterface>("ig");
    this.data = data;
  },
  computed: {
    withThumbnails() {
      return this.data.map((item) => ({
        ...item,
        media_url: item.media_type === "VIDEO" ? item.thumbnail_url : item.media_url,
      }));
    },
  },
});
</script>

<style lang="postcss" scoped>
.ratio {
  aspect-ratio: 3/3;
  object-fit: cover
}
</style>
<style lang="postcss">
.ig-carousel .VueCarousel-inner {
  @apply justify-around;
}
.ig-carousel .VueCarousel-dot {
  @apply focus:ring-0 outline-none;
  height: 2px !important;
  border-radius: 0 !important;
}
.ig-carousel .VueCarousel-dot.VueCarousel-dot--active {
  @apply focus:outline-none;
}
.ig-carousel .VueCarousel-dot-container {
  margin-top: 0 !important;

}

</style>
