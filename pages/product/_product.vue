<template>
  <div class="">
    <h1>Product Page</h1>
    {{ params }}
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'ProductPage',
  asyncData({ params }) {
    return { params };
  },
});
</script>
