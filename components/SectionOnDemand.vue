<template>
  <section class="lg:mt-48 pt-16 pb-16 lg:pb-20 bg-black-500 text-white">
    <div class="container">
      <div class="flex flex-col md:flex-row items-center mb-2 lg:mb-0">
        <div class="lg:w-1/2 flex justify-center mb-10 lg:mb-0">
          <img
            src="/images/category-banner@2x.jpg"
            alt=""
          />
        </div>
        <div class="lg:ml-12 text-center lg:text-left">
          <h2 class="h2 md:text-left">
            Na zamówienie
          </h2>
          <p class="mt-6 lg:mt-4 mb-9">
            Oferujemy możliwość zamówienia unikatowych produktów na specjalne
            życzenie klienta.
          </p>
          <div class="flex justify-center">
            <router-link
              class="outline-none border border-white py-2 px-10"
              :to="{ name: 'on-demand'}"
            >
              Zobacz
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<style lang="postcss" scoped>
div h2 {
  margin-bottom: 0;
}
</style>
