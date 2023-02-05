import { defineStore } from "pinia";
import { CategoryInterface, ParentCategory } from "~/interfaces/CategoryInterface";
import { ProductInterface } from "~/interfaces/ProductInterface";
import { Paginated } from "~/interfaces/base";

type ParentCategoryLinkObject = Record<ParentCategory["uid"], {
  name: ParentCategory["name"]
  data: CategoryInterface[]
}>;

export const useCategoriesStore = defineStore("Categories", {
  state: () => ({
    // all these properties will have their type inferred automatically
    categories: [] as CategoryInterface[],
    activeCategoryUid: null as string | null,
    parentCategories: [] as ParentCategory[]
  }),
  getters: {
    inNavigation(): CategoryInterface[] {
      // eslint-disable-next-line camelcase
      return this.categories.filter(({ onHomepage }) => onHomepage);
    },
    activeCategory(): CategoryInterface | null {
      const category = this.categories.find(({ uid }) => uid === this.activeCategoryUid);

      if (category != null) {
        return category;
      }

      return null;
    },
    activeParentCategory: (state) => {
      const activeCategory = state.categories.find(({ uid }) => uid === state.activeCategoryUid);

      if (activeCategory == null) {
        return null;
      }
      return activeCategory.parentCategory;
    },
    linksWithParentCategories(): ParentCategoryLinkObject {
      const parentCategories = this.parentCategories
        .reduce<ParentCategoryLinkObject>((acc, parentCategory) => ({
        ...acc,
        [parentCategory.uid]: {
          name: parentCategory.name,
          data: []
        }
      }), {});

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
        if (this.parentCategories.length === 0) {
          await this.fetchParentCategories();
        }
        this.categories = await this.$nuxt.$strapi.find("categories");
      } catch (error) {
        // showTooltip(error)
        // let the form component display the error
        return error;
      }
      return true;
    },
    async fetchParentCategories() {
      try {
        this.parentCategories = await this.$nuxt.$strapi.find("parent-categories");
      } catch (error) {
        // showTooltip(error)
        // let the form component display the error
        return error;
      }
      return true;
    },

    async getCategoryById(name: string) {
      await this.$nuxt.$strapi.find("categories", name);
    }
  }
});

export const useProductsStore = defineStore("Products", {
  state: () => ({
    // all these properties will have their type inferred automatically
    products: [] as ProductInterface[],
    active: null as ProductInterface | null,
    categories: useCategoriesStore()
  }),

  getters: {
    activeProduct(): ProductInterface | null {
      return this.active;
    }
  },
  actions: {
    async fetchProducts(): Promise<ProductInterface[] | unknown> {
      try {
        this.products = await this.$nuxt.$strapi.find("products");
      } catch (error) {
        // showTooltip(error)
        // let the form component display the error
        return error;
      }
      return true;
    },

    // TODO: put as argument categoryId: string when filters are ready
    async getProductsByCategory(categoryUid: string): Promise<Paginated<ProductInterface>> {
      return this.$nuxt.$strapi.find<Paginated<ProductInterface>>("products", {
        category: categoryUid
      });
    },

    async getProductByUid(uid: string) {
      return this.$nuxt.$strapi.findOne<ProductInterface>("products", uid);
    },

    async setActiveByUid(uid: string) {
      const req = await this.getProductByUid(uid);

      if (req != null) {
        this.active = req;
        this.categories.activeCategoryUid = this.active?.category.uid;
      }
    },
    async testFetch() {
      const res = await this.$nuxt.$strapi.find<ProductInterface>("products", { query: "q=Andy Warhol" });
      console.log("Success, ", res);
    }
  }
});

export const usePagesStore = defineStore("Pages", {
  state: () => ({
    // all these properties will have their type inferred automatically
    pages: []
  }),
  actions: {
    async fetchHomePage() {
      try {
        return this.$nuxt.$strapi.find("home-page");
      } catch (error) {
        // showTooltip(error)
        // let the form component display the error
        return error;
      }
    }
  }
});
