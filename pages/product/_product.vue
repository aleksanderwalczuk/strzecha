<template>
  <div class="">
    <h1>Product Page</h1>
    {{ params }}
  </div>
</template>
<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'ProductPage',
  asyncData({ params }) {
    return { params };
  },
});
</script>
