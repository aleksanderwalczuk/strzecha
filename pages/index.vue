<template>
  <section class="hero-bg relative pb-14 md:pb-28 border-b border-grey-400">
    <div class="container pt-10 md:pt-20 md:h-full">
      <div class="mb-8 md:mb-30">
        <g-image
          class="w-full hero-img"
          src="../static/images/hero-bg@2x.jpg"
        />
      </div>
      <div class="md:flex md:flex-col md:w-9/12 mx-auto text-center">
        <p class="lg:-mx-1 md:text-lg hero-text">
          Od 1993 roku nieprzerwanie kontynuujemy naszą pasję do sztuki i
          rzemiosła. Starannie dobieramy asortyment, kierując się twórczym
          podejściem do koloru, kształtu i jakości towaru, by oszczędzić czas
          miłośników sztuki w poszukiwaniu unikalnych przedmiotów.
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
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'IndexPage',
});
</script>
