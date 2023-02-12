<template>
  <ul
    v-if="pagination"
    class="flex justify-center items-center"
  >
    <li
      v-for="n in pagination.pageCount"
      :key="n"
    >
      <template v-if="Number($route.query.p) === n">
        <button class="underline p-4 underline-offset-4" disabled>
          {{ n }}
        </button>
      </template>
      <nuxt-link
        v-else
        class="p-4"
        :to="{ path: $route.path, query: { p: n }}"
        @click.native="() => $emit('update')"
      >{{ n }}
      </nuxt-link>
    </li>
  </ul>
</template>
<script lang="ts">
import { defineComponent, PropType } from "@nuxtjs/composition-api";
import { Pagination } from "~/interfaces/base";

export default defineComponent({
  name: "Pagination",
  props: {
    pagination: {
      type: Object as PropType<Pagination>,
      default: null
    }
  },
  emits: ["update"]
});
</script>
