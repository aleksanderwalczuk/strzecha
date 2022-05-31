import { get } from 'lodash';
import { defineStore } from 'pinia';
import { CategoryInterface } from '~/interfaces/CategoryInterface';
import { ProductInterface } from '~/interfaces/ProductInterface';
import { StrapiResponseInterface } from '~/interfaces/StrapiResponseInterface';

export const useProductsStore = defineStore('Products', {
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
      if (Array.isArray(response.data)) {
        return response.data.map(({ id, attributes }) => (
          { id, ...attributes }
        ));
      }
      return get(response.data, 'attributes', response.data);
    },
  },
});

export const useCategoriesStore = defineStore('Categories', {
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
      if (Array.isArray(response.data)) {
        return response.data.map(({ id, attributes }) => (
          { id, ...attributes }
        ));
      }
      return get(response.data, 'attributes', response.data);
    },
  },
});

export const usePagesStore = defineStore('Pages', {
  state: () => ({
    // all these properties will have their type inferred automatically
    pages: [] as any,
  }),
  actions: {
    async fetchPages() {
      try {
        const res = await this.$nuxt.$strapi.find('hero-section', { populate: '*' });
        this.pages = [...this.pages, { ...res.data.attributes, name: 'Home' }];
      } catch (error) {
        // showTooltip(error)
        // let the form component display the error
        return error;
      }
      return true;
    },
    mapResponseData(response: StrapiResponseInterface<any>) {
      if (Array.isArray(response.data)) {
        return response.data.map(({ id, attributes }) => (
          { id, ...attributes }
        ));
      }
      return get(response.data, 'attributes', response.data);
    },
  },
});
