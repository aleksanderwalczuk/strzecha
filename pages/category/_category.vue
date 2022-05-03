<template>
  <div class="">
    <h1>Category Page</h1>
    {{ params }}
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'CategoryPage',
  asyncData({ params }) {
    return { params };
  },
});
</script>
