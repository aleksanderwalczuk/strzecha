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

<style lang="postcss">
* {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  box-sizing: border-box;
}
</style>
