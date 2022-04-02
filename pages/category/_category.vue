<template>
  <div class="">
    <h1>Category Page</h1>
    {{ params }}
  </div>
</template>
<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'CategoryPage',
  asyncData({ params }) {
    return { params };
  },
});
</script>
