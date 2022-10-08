import { get, uniq } from 'lodash';
import { defineStore } from 'pinia';
import { CategoryInterface, MainCategoryInterface } from '~/interfaces/CategoryInterface';
import { ProductInterface } from '~/interfaces/ProductInterface';
import { StrapiResponseInterface } from '~/interfaces/StrapiResponseInterface';

function mapResponseData(response: StrapiResponseInterface<any>): any {
  if (Array.isArray(response.data)) {
    return response.data.map(({ id, attributes }) => (
      { id, ...attributes }
    ));
  }
  return get(response.data, 'attributes', response.data);
}

export const useProductsStore = defineStore('Products', {
  state: () => ({
    // all these properties will have their type inferred automatically
    products: [] as ProductInterface[],
    active: null as ProductInterface | null,
  }),

  getters: {
    activeProduct():ProductInterface | null {
      return this.active;
    },
  },
  actions: {
    async fetchProducts(): Promise<any> {
      try {
        const res = await this.$nuxt.$strapi.find('products', {
          populate: ['info', 'additional', 'info.subcategory', 'info.images'],
        }) as StrapiResponseInterface<ProductInterface[]>;
        this.products = mapResponseData(res);
      } catch (error) {
        // showTooltip(error)
        // let the form component display the error
        return error;
      }
      return true;
    },

    // TODO: put as argument categoryId: string when filters are ready
    async getProductsByCategory() {
      const res = await this.$nuxt.$strapi.find('products') as StrapiResponseInterface<ProductInterface[]>;

      return mapResponseData(res);
    },

    async getProductByUid(uid: string) {
      const res = await this.$nuxt.$strapi.find('products', {
        'filters[uid][$eq]': uid,
        populate: ['additional', 'info.subcategory', 'info.images'],
      }) as StrapiResponseInterface<ProductInterface[]>;
      const [product] = mapResponseData(res);

      return product;
    },

    async setActiveByUid(uid: string) {
      this.active = await this.getProductByUid(uid);
    },
  },
});

export const useCategoriesStore = defineStore('Categories', {
  state: () => ({
    // all these properties will have their type inferred automatically
    categories: [] as CategoryInterface[],
    subcategories: [] as CategoryInterface[],
    activeSubcategoryUrl: null as string | null,
  }),
  getters: {
    parentCategories(): CategoryInterface['parent_category'][] {
      return uniq(this.categories
        // eslint-disable-next-line camelcase
        .map(({ parent_category }) => parent_category));
    },
    inNavigation(): CategoryInterface[] {
      // eslint-disable-next-line camelcase
      return this.subcategories.filter(({ on_homepage }) => on_homepage === true);
    },
    mainCategories(): MainCategoryInterface['name'][] {
      return uniq(
        // eslint-disable-next-line camelcase
        this.categories
          .map(({ main_category }) => main_category.name),
      );
    },
    activeSubcategory(): CategoryInterface | null {
      const productsStore = useProductsStore();
      if (productsStore.activeProduct != null
        && productsStore.activeProduct.info
        && productsStore.activeProduct.info.subcategory
      ) {
        return mapResponseData(productsStore.activeProduct?.info.subcategory);
      }
      return this.subcategories.find(({ url }) => url === this.activeSubcategoryUrl) || null;
    },
    activeCategory() {
      if (this.activeSubcategory == null) {
        return null;
      }
      return this.activeSubcategory.parent_category
    },
  },
  actions: {
    async fetchCategories() {
      try {
        const res = await this.$nuxt.$strapi.find('product-categories', { populate: '*' }) as StrapiResponseInterface<CategoryInterface>;
        this.categories = res;
      } catch (error) {
        // showTooltip(error)
        // let the form component display the error
        return error;
      }
      return true;
    },

    async getCategoryById(name: string) {
      await this.$nuxt.$strapi.find('product-categories', {
        populate: ['*', 'main-category'],
        'filters[name][$eq]': name,
      }) as StrapiResponseInterface<CategoryInterface>;
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
  },
});
