<template>
  <transition name="fade">
    <!-- v-scroll-lock="isOpen" -->
    <div
      v-if="isOpen"
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
                    <nuxt-link to="/categories/furniture">
                      Meble
                    </nuxt-link>
                  </li>
                  <li>
                    <nuxt-link to="/categories/ceramics">
                      Ceramika i porcelana
                    </nuxt-link>
                  </li>
                  <li>
                    <nuxt-link to="/categories/ceramics">
                      Zegary
                    </nuxt-link>
                  </li>
                  <li>
                    <nuxt-link to="/categories/ceramics">
                      Srebro i platery
                    </nuxt-link>
                  </li>
                  <li>
                    <nuxt-link to="/categories/ceramics">
                      Inne
                    </nuxt-link>
                  </li>
                </ul>
                <nuxt-link
                  class="btn"
                  to="/categories/"
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
                    <nuxt-link to="/categories/paintings">
                      Malarstwo
                    </nuxt-link>
                  </li>
                  <li>
                    <nuxt-link to="/categories/paintings">
                      Grafika
                    </nuxt-link>
                  </li>
                  <li>
                    <nuxt-link to="/categories/paintings">
                      Rzeźba
                    </nuxt-link>
                  </li>
                  <li>
                    <nuxt-link to="/categories/paintings">
                      Fotografia
                    </nuxt-link>
                  </li>
                </ul>
              </div>
            </div>
            <div class="category-thumbnail">
              <g-image src="../assets/images/nav-cat-thumbnail-1.jpg" />
            </div>
          </div>
        </div>
      </nav>
    </div>
  </transition>
</template>
<script>

export default {
  name: 'HeaderOpen',
  props: {
    open: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    isOpen() {
      return this.props;
    },
  },
  created() {
    if (process.isClient) {
      window.addEventListener('keydown', this.keyClose);
    }
  },
  destroyed() {
    if (process.isClient) {
      window.removeEventListener('keydown', this.keyClose);
    }
  },
  methods: {
    close() {
      // return mutations.toggleNav();
    },
    keyClose(e) {
      if (e.key === 'Escape') {
        // closeNav();
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
