import { defineStore } from 'pinia';
import { CategoryInterface } from '~/interfaces/CategoryInterface';
import { ProductInterface } from '~/interfaces/ProductInterface';
import { StrapiResponseInterface } from '~/interfaces/StrapiResponseInterface';

export const useProductsStore = defineStore('products', {
  state: () => ({
    // all these properties will have their type inferred automatically
    counter: 0,
    name: 'Eduardo',
    isAdmin: true,
    products: [] as ProductInterface[],
  }),
  actions: {
    async fetchProducts(): Promise<any> {
      try {
        const res = await this.$nuxt.$strapi.find('products', { populate: '*' });
        this.products = this.mapResponseData(res);
      } catch (error) {
        // showTooltip(error)
        // let the form component display the error
        return error;
      }
      return true;
    },
    mapResponseData(response: StrapiResponseInterface<any>) {
      return response.data.map(({ id, attributes }) => (
        { id, ...attributes }
      ));
    },
  },
});

export const useCategoriesStore = defineStore('categories', {
  state: () => ({
    // all these properties will have their type inferred automatically
    counter: 0,
    name: 'Eduardo',
    isAdmin: true,
    categories: [] as CategoryInterface[],
  }),
  actions: {
    async fetchCategories() {
      try {
        const res = await this.$nuxt.$strapi.find('product-categories', { populate: '*' }) as StrapiResponseInterface<CategoryInterface>;
        this.categories = this.mapResponseData(res);
      } catch (error) {
        // showTooltip(error)
        // let the form component display the error
        return error;
      }
      return true;
    },
    mapResponseData(response: StrapiResponseInterface<any>) {
      return response.data.map(({ id, attributes }) => (
        { id, ...attributes }
      ));
    },
  },
});
