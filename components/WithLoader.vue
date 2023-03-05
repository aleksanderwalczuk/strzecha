<template>
  <div class="flex flex-col flex-1">
    <div v-if="!loaded" class="flex-1 loader-container flex justify-center items-center">
      <svg
        width="48"
        height="48"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        class="stroke-[#111]"
      >
        <path
          d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
          opacity=".25"
        />
        <circle class="spinner_7WDj" cx="12" cy="2.5" r="1.5" />
      </svg>
    </div>
    <transition v-else appear name="fade">
      <div class="flex-1">
        <slot />
      </div>
    </transition>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import { wait } from "../utils/wait";

export default defineComponent({
  props: {
    loading: {
      default: false,
    },
  },
  data() {
    return {
      loaded: false,
    };
  },
  watch: {
    async loading() {
      if (this.loading === false) {
        await this.postpone();
      }
    },
  },
  methods: {
    async postpone() {
      await wait(1000);
      this.loaded = true;
    },
  },
});
</script>
<style lang="postcss" scoped>
.spinner_7WDj {
  transform-origin: center;
  animation: spinner_PBVY 0.75s linear infinite;
}
@keyframes spinner_PBVY {
  100% {
    transform: rotate(360deg);
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
@screen lg {
  .loader-container {
    min-height: calc(100vh - 169px);
  }
}
</style>
