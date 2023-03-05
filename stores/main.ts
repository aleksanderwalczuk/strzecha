import { defineStore } from "pinia";
import {
  CategoryInterface,
  ParentCategory,
} from "~/interfaces/CategoryInterface";
import { ProductInterface } from "~/interfaces/ProductInterface";
import { PageInterface } from "~/interfaces/PageInterface";
import { Paginated } from "~/interfaces/base";
import { SettingsInterface } from "~/interfaces/SettingsInterface";

type ParentCategoryLinkObject = Record<
  ParentCategory["uid"],
  {
    name: ParentCategory["name"];
    data: CategoryInterface[];
  }
>;

export const useCategoriesStore = defineStore("Categories", {
  state: () => ({
    // all these properties will have their type inferred automatically
    categories: [] as CategoryInterface[],
    activeCategoryUid: null as string | null,
    parentCategories: [] as ParentCategory[],
  }),
  getters: {
    inNavigation(): CategoryInterface[] {
      // eslint-disable-next-line camelcase
      return this.categories.filter(({ onHomepage }) => onHomepage);
    },
    activeCategory(): CategoryInterface | null {
      const category = this.categories.find(
        ({ uid }) => uid === this.activeCategoryUid
      );

      if (category != null) {
        return category;
      }

      return null;
    },
    activeParentCategory: (state) => {
      const activeCategory = state.categories.find(
        ({ uid }) => uid === state.activeCategoryUid
      );

      if (activeCategory == null) {
        return null;
      }
      return activeCategory.parentCategory;
    },
    linksWithParentCategories(): ParentCategoryLinkObject {
      const parentCategories =
        this.parentCategories.reduce<ParentCategoryLinkObject>(
          (acc, parentCategory) => ({
            ...acc,
            [parentCategory.uid]: {
              name: parentCategory.name,
              data: [],
            },
          }),
          {}
        );

      return this.categories.reduce((acc, category) => {
        const key = category.parentCategory.uid;
        acc[key].data.push(category);
        return acc;
      }, parentCategories);
    },
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
        this.parentCategories = await this.$nuxt.$strapi.find(
          "parent-categories"
        );
      } catch (error) {
        // showTooltip(error)
        // let the form component display the error
        return error;
      }
      return true;
    },

    async getCategoryById(name: string) {
      await this.$nuxt.$strapi.find("categories", name);
    },
  },
});

export const useProductsStore = defineStore("Products", {
  state: () => ({
    // all these properties will have their type inferred automatically
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    products: {
      results: [],
    } as Paginated<ProductInterface[]>,
    active: null as ProductInterface | null,
    categories: useCategoriesStore(),
  }),

  getters: {
    activeProduct(): ProductInterface | null {
      return this.active;
    },
  },
  actions: {
    async fetchProducts(args?: {
      page?: number;
      category?: CategoryInterface["uid"];
    }): Promise<Paginated<ProductInterface[]> | unknown> {
      try {
        this.products = await this.$nuxt.$strapi.find<
          Paginated<ProductInterface[]>
        >(
          "products",
          args != null
            ? {
                ...(args.category != null ? { category: args.category } : {}),
                ...(args.page != null ? { page: args.page } : {}),
              }
            : undefined
        );
      } catch (error) {
        // showTooltip(error)
        // let the form component display the error
        return error;
      }
      return true;
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
  },
});

export const usePagesStore = defineStore("Pages", {
  state: () => ({
    // all these properties will have their type inferred automatically
    pages: [],
    settings: null as SettingsInterface | null,
  }),
  actions: {
    async fetchHomePage(): Promise<PageInterface> {
      try {
        return this.$nuxt.$strapi.find<PageInterface>("home-page");
      } catch (error) {
        // showTooltip(error)
        // let the form component display the error
        throw error;
      }
    }
  }
});
