import { defineStore } from 'pinia';
import { CategoryInterface, ParentCategory } from '~/interfaces/CategoryInterface';
import { ProductInterface } from '~/interfaces/ProductInterface';

type ParentCategoryLinkObject = Record<ParentCategory['uid'], {
  name: ParentCategory['name'],
  data: CategoryInterface[]
}>;

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
        const res = await this.$nuxt.$strapi.find('products') as ProductInterface[];
        this.products = res;
      } catch (error) {
        // showTooltip(error)
        // let the form component display the error
        return error;
      }
      return true;
    },

    // TODO: put as argument categoryId: string when filters are ready
    async getProductsByCategory(categoryUid: string) {
      const res = await this.$nuxt.$strapi.find('products', {
        category: categoryUid
      }) as ProductInterface[];

      res;
    },

    async getProductByUid(uid: string) {
      const res = await this.$nuxt.$strapi.findOne('products', uid) as ProductInterface;
      return res;
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
    activeSubcategoryUrl: null as string | null,
    parentCategories: [] as ParentCategory[]
  }),
  getters: {
    inNavigation(): CategoryInterface[] {
      // eslint-disable-next-line camelcase
      return this.categories.filter(({ onHomepage }) => onHomepage === true);
    },
    activeCategory(): CategoryInterface | null {
      return this.categories.find(({ uid }) => uid === this.activeSubcategoryUrl) || null;
    },
    activeParentCategory: (state) => {
      const activeCategory = state.categories.find(({ uid }) => uid === state.activeSubcategoryUrl) || null;

      if (activeCategory == null) {
        return null;
      }
      return activeCategory.parentCategory;
    },
    linksWithParentCategories(): ParentCategoryLinkObject {
      const parentCategories = this.parentCategories
      .reduce((acc, parentCategory) => ({
      ...acc, 
      [parentCategory.uid]: {
         name: parentCategory.name, 
         data: [],
        }
      }), {} as ParentCategoryLinkObject)

      return this.categories.reduce((acc, category) => {
        const key = category.parentCategory.uid;
        acc[key].data.push(category);
        return acc;
      }, parentCategories);
    }
  },
  actions: {
    async fetchCategories() {
      try {
        if(this.parentCategories.length === 0) {
          await this.fetchParentCategories();
        }
        const res = await this.$nuxt.$strapi.find('categories') as CategoryInterface[];
        this.categories = res;
      } catch (error) {
        // showTooltip(error)
        // let the form component display the error
        return error;
      }
      return true;
    },
    async fetchParentCategories() {
      try {
        const res = await this.$nuxt.$strapi.find('parent-categories') as CategoryInterface[];
        this.parentCategories = res;
      } catch (error) {
        // showTooltip(error)
        // let the form component display the error
        return error;
      }
      return true;
    },

    async getCategoryById(name: string) {
      await this.$nuxt.$strapi.find('categories', name) as CategoryInterface;
    },
  },
});

export const usePagesStore = defineStore('Pages', {
  state: () => ({
    // all these properties will have their type inferred automatically
    pages: [] as any,
  }),
  actions: {
    async fetchHomePage() {
      try {
        const res = await this.$nuxt.$strapi.find('home-page');
        return res;
      } catch (error) {
        // showTooltip(error)
        // let the form component display the error
        return error;
      }
    },
  },
});
