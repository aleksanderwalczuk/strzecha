<template>
  <div>
    <header class="relative text-black md:h-44" :style="headerHeight">
      <div
        class="fixed min-w-full defaultHeaderHeight border-b z-10 bg-gray-50"
        :style="headerHeight"
      >
        <div class="container">
          <div class="flex justify-between items-center py-4 md:py-10">
            <div class="search-container relative z-20 w-3/12">
              <form class="relative">
                <label for="search" class="cursor-pointer">
                  <img src="../static/icons/icon-search.svg" alt="">
                </label>
                <div class="absolute top-0 left-9">
                  <input
                    id="search"
                    type="text"
                    name="search"
                    class="search-input md:block"
                  >
                </div>
              </form>
            </div>
            <div
              class="floating-logo hidden md:block"
              :style="`transform: translateY(${logoHeight}px)`"
              @scroll="handleScroll"
            >
              <g-link
                to="/"
                class="nav-site-title font-title"
                @click.native="closeNav"
              >
                {{ title }}
              </g-link>
            </div>
            <div class="relative top-0 z-20 hidden md:block w-3/12">
              <nav class="flex gap-x-4 items-center justify-end">
                <g-link class="nav-link" to="/contact">
                  Kontakt
                </g-link>
                <g-link class="nav-link" to="/blog/">
                  <img src="../static/icons/icon-lang.svg" alt="">
                </g-link>
              </nav>
            </div>
            <g-link to="/" class="nav-site-title font-title md:hidden">
              <h2 class="nav-site-title font-light font-title uppercase">
                Strzecha
              </h2>
            </g-link>
            <hamburger />
          </div>
          <!-- <header-nav :nav-height="categoryNavHeight" /> -->
        </div>
      </div>
    </header>
    <header-open />
  </div>
</template>

<script>
import Hamburger from './Hamburger.vue';
// import HeaderNav from './HeaderNav.vue'
// import HeaderOpen from './HeaderOpen.vue'
// import { mutations } from './store'

export default {
  name: 'PageHeader',
  components: {
    // HeaderNav,
    // HeaderOpen,
    Hamburger,
  },
  props: {
    title: {
      type: String,
      required: false,
      default: 'Strzecha',
    },
  },
  data() {
    return {
      clientY: 0,
      headerHeight: 'height:176px',
      categoryNavHeight: 0,
      logoHeight: 0,
      isMobile: false,
    };
  },
  computed: {
    clientYAsNumber() {
      const clientYArr = Array.from(this.clientY);
      clientYArr.splice(this.clientY.length - 2);
      const clientYToNumber = parseInt(clientYArr.join(''), 10);
      return clientYToNumber;
    },
  },
  watch: {
    clientY() {
      if (!this.isMobile && process.isClient) {
        window.requestAnimationFrame(this.handleHeight);
        window.requestAnimationFrame(this.handleNavPosition);
      }
    },
  },
  mounted() {
    if (process.isClient) {
      this.handleViewportChange();
      window.addEventListener('scroll', this.handleScroll);
      window.addEventListener('resize', this.handleViewportChange);
    }
  },
  beforeDestroy() {
    if (process.isClient) {
      window.removeEventListener('scroll', this.handleScroll);
      window.removeEventListener('resize', this.handleViewportChange);
    }
  },

  methods: {
    // TODO: maybe all scroll methods should be computed props
    closeNav() {
      mutations.closeNav();
    },
    handleViewportChange() {
      if (this.windowWidth < 767) {
        this.isMobile = true;
        this.headerHeight = 'auto';
      } else {
        this.isMobile = false;
        if (this.headerHeight === 'auto') {
          this.headerHeight = 'height:176px';
        }
      }
    },
    handleScroll() {
      if (process.isClient) {
        const val = window.scrollY * -1;
        this.clientY = `${val}px`;
      }
    },

    handleHeight() {
      if (typeof this.clientY === 'string') {
        const clientYToNumber = this.clientYAsNumber;
        const navHeight = 176;
        const diff = navHeight + clientYToNumber;

        const boundary = 100;
        const negativeBoundary = boundary * -1;

        // header height
        this.headerHeight = diff > boundary ? `height:${diff}px` : this.headerHeight;
        if (diff >= boundary) {
          this.headerHeight = `height:${diff}px`;
        } else if (clientYToNumber * -1 > boundary) {
          this.headerHeight = `height: ${boundary}px`;
        }
        // logo height
        if (clientYToNumber > negativeBoundary) {
          this.logoHeight = clientYToNumber;
        } else if (clientYToNumber < negativeBoundary) {
          this.logoHeight = negativeBoundary;
        }
      }
    },
    handleNavPosition() {
      if (typeof this.clientY === 'string') {
        const clientYToNumber = this.clientYAsNumber;
        const diffCategory = 0 - clientYToNumber;
        if (diffCategory <= 70) {
          this.categoryNavHeight = diffCategory * -1;
        } else if (clientYToNumber * -1 > 70) {
          this.categoryNavHeight = -70;
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
header {
  height: 60px;
}
.container {
  @apply px-8;
}
.floating-logo {
  will-change: transform;
}
.nav-link {
  @apply text-lg;
}
.nav-md .nav-link {
  @apply px-7 block cursor-pointer;
}
.nav-link:first-child {
  @apply pl-0;
}
.nav-site-title {
  @apply text-xl uppercase;
  font-weight: 300;
  letter-spacing: 0.09em;
}

.search-input {
  @apply bg-gray-50 border-b px-1 ring-0 focus:outline-none focus-within:ring-0;
  @apply hidden;
}

.active--exact {
  /* Active Nav Link */
}
@screen md {
  .defaultHeaderHeight {
    height: 10.5rem;
  }
}
</style>
