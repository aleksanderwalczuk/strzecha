<template>
  <nav class="hamburger-menu md:hidden w-3/12">
    <button
      v-scroll-lock="open"
      class="hamburger"
      :class="open ? 'hamburger--active' : ''"
      :aria-expanded="open ? 'true' : 'false'"
      @click="open = !open"
    >
      <span class="sr-only">Otwórz/zamknij menu</span>
      <span class="hamburger__box">
        <span class="hamburger__inner" />
      </span>
    </button>
    <div class="navigation" :class="open && 'navigation--active'">
      <div class="container h-full flex flex-col justify-between">
        <ul class="navigation__list flex-1">
          <li class="navigation__item">
            <nuxt-link to="/categories" @click.native="open = false">
              Wszystkie produkty
            </nuxt-link>
          </li>
          <li class="navigation__item">
            <nuxt-link to="/on-demand" @click.native="open = false">
              Na zamówienie
            </nuxt-link>
          </li>
          <li class="navigation__item">
            <nuxt-link to="/about" @click.native="open = false">
              O nas
            </nuxt-link>
          </li>
          <li class="navigation__item">
            <nuxt-link to="/contact" @click.native="open = false">
              Kontakt
            </nuxt-link>
          </li>
        </ul>
        <div class="flex justify-center">
          <a
            href="tel:0048601663227"
            rel="noopener noreferrer"
            class="btn border border-black-300 px-8 py-2"
          >+ 48 601 663 227
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'HamburgerMenu',
  data() {
    return {
      open: false,
    };
  },
};
</script>

<style lang="scss" scoped>
$dark: #171717;
$light: #ffffff;
$nav_height: 60px;

@mixin hamburger-line {
  @apply bg-black-500;
  width: 100%;
  height: 1px;
  position: absolute;
}

.hamburger {
  @apply flex justify-center;
  cursor: pointer;
  background-color: transparent;
  border: 0;
  margin: 0;
  margin-left: auto;
}

.hamburger,
.navigation {
  transition: transform 0.3s 0.1s ease-in-out, visibility 0s 0.4s;
}

.hamburger--active {
  /* transform: translatex(250px); */
}

.hamburger__box {
  width: 35px;
  height: 24px;
  display: inline-block;
  position: relative;
}

.hamburger__inner {
  @include hamburger-line;

  left: 0;
  top: 50%;
  transform: translateY(-50%);
  transition: background-color 0.1s 0.2s ease-in-out;
}

.hamburger__inner::before,
.hamburger__inner::after {
  @include hamburger-line;

  content: "";
  left: 0;
  transition: transform 0.2s 0.2s ease-in-out;
}

.hamburger__inner::before {
  top: -8.8px;
}

.hamburger__inner::after {
  top: 8.8px;
}

.hamburger--active .hamburger__inner {
  transform: rotate(45deg);
}

.hamburger--active .hamburger__inner::before,
.hamburger--active .hamburger__inner::after {
  opacity: 1;
}
.hamburger--active .hamburger__inner:before {
  transform: translateY(9px) rotate(0deg);
}

.hamburger--active .hamburger__inner:after {
  transform: translateY(-10px) rotate(-90deg);
}

.navigation {
  @apply bg-gray-50 w-full h-full absolute left-0 pt-16 pb-10;
  height: calc(100vh - #{$nav_height} - 1px);
  top: calc(#{$nav_height} + 1px);
  visibility: hidden;
  transform: translateX(-100vw);
}

.navigation--active {
  transform: translateX(0px);
  transition: transform 0.3s 0.1s ease-in-out, visibility 0s 0s;
  visibility: visible;
}

.navigation__item {
  @apply mb-9;
}
.navigation__item:last-child {
  @apply mb-0;
}
.navigation__item a {
  @apply block text-center text-black-500 py-2;
}

.sr-only {
  border: 0;
  clip: rect(0, 0, 0, 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
}
</style>
