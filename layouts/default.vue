/* eslint-disable vue/multi-word-component-names */
<template>
  <div>
    <TheHeader />
    <!-- https://lifesaver.codes/answer/mounted-twice-when-layout-change-5703 -->
    <main>
      <Nuxt />
    </main>
    <TheFooter />
  </div>
</template>
