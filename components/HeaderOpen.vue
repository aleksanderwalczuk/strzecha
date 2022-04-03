<template>
  <transition name="fade">
    <div
      class="hidden nav-open fixed w-full z-30 md:block"
    >
      <nav class="nav-open-wrapper relative bg-gray-50 py-20">
        <div class="nav-container">
          <button
            class="nav-close w-5 h-5"
            @click="close"
          >
            <div class="sr-only">
              Close
            </div>
          </button>
          <div class="flex items-start">
            <div class="flex justify-between w-1/2">
              <div class="w-4/12">
                <h3 class="text-gray-250 mb-8">
                  Wyposażenie wnętrza
                </h3>
                <ul>
                  <li>
                    <nuxt-link
                      to="/category/furniture"
                      @click.native="close"
                    >
                      Meble
                    </nuxt-link>
                  </li>
                  <li>
                    <nuxt-link to="/category/ceramics">
                      Ceramika i porcelana
                    </nuxt-link>
                  </li>
                  <li>
                    <nuxt-link to="/category/ceramics">
                      Zegary
                    </nuxt-link>
                  </li>
                  <li>
                    <nuxt-link to="/category/ceramics">
                      Srebro i platery
                    </nuxt-link>
                  </li>
                  <li>
                    <nuxt-link to="/category/ceramics">
                      Inne
                    </nuxt-link>
                  </li>
                </ul>
                <nuxt-link
                  class="btn"
                  to="/category/"
                >
                  Zobacz wszystkie
                </nuxt-link>
              </div>
              <div class="w-6/12">
                <h3 class="text-gray-250 mb-8">
                  Sztuka
                </h3>
                <ul>
                  <li>
                    <nuxt-link to="/category/paintings">
                      Malarstwo
                    </nuxt-link>
                  </li>
                  <li>
                    <nuxt-link to="/category/paintings">
                      Grafika
                    </nuxt-link>
                  </li>
                  <li>
                    <nuxt-link to="/category/paintings">
                      Rzeźba
                    </nuxt-link>
                  </li>
                  <li>
                    <nuxt-link to="/category/paintings">
                      Fotografia
                    </nuxt-link>
                  </li>
                </ul>
              </div>
            </div>
            <div class="category-thumbnail">
              <nuxt-img src="/images/nav-cat-thumbnail-1.jpg" />
            </div>
          </div>
        </div>
      </nav>
    </div>
  </transition>
</template>
<script>

export default {
  name: 'MainNavigation',
  mounted() {
    window.addEventListener('keydown', this.keyClose);
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.keyClose);
  },
  methods: {
    close() {
      this.$emit('toggleNav');
    },
    keyClose(e) {
      if (e.key === 'Escape') {
        this.close();
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.nav-container {
  @apply relative px-8 mx-auto;
  max-width: 57.5rem;
  min-height: calc(100vh - 175px);
}
li {
  @apply mb-6;
}
.category-thumbnail {
  @apply px-16 py-12 bg-gray-25 w-1/2 flex items-center justify-center;
}
.nav-close {
  @apply absolute right-0 -top-12;
}
.nav-close::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0%;
  width: 100%;
  height: 1px;
  transform: rotate(45deg) translateY(-50%);
  background: #000;
}
.nav-close::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 0%;
  width: 100%;
  height: 1px;
  transform: rotate(-45deg) translateY(-50%);

  background: #000;
}
@screen lg {
  .nav-container {
    @apply px-5;
  }
}
</style>
