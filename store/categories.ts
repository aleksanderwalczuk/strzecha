/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-shadow */
import {
  CategoryInterface,
  ParentCategory
} from "~/interfaces/CategoryInterface";

type CategoriesModuleState = {
  categories: CategoryInterface[];
  activeCategoryUid: string | null;
  parentCategories: ParentCategory[];
};

type ParentCategoryLinkObject = Record<
  ParentCategory["uid"],
  {
    name: ParentCategory["name"];
    data: CategoryInterface[];
  }
>;
export const state = () => ({
  categories: [] as CategoryInterface[],
  activeCategoryUid: null as string | null,
  parentCategories: [] as ParentCategory[],
});

export const mutations = {
  setCategories(state: CategoriesModuleState, categories: CategoryInterface[]): void {
    state.categories = categories;
  },
  setParentCategories(
    state: CategoriesModuleState,
    categories: CategoryInterface[]
  ): void {
    state.parentCategories = categories;
  },
};

export const actions = {
  async fetch({ state, commit, dispatch }: unknown): Promise<void> {
    if (state.parentCategories.length === 0) {
      dispatch("fetchParent");
    }
    const req = await fetch(`${process.env.CMS_URL}api/categories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (req.ok) {
      commit("setCategories", await req.json());
    }
  },

  async fetchParent({ state, commit }: unknown): Promise<void> {
    const req = await fetch(`${process.env.CMS_URL}api/parent-categories`, {
      method: "GET",
    });

    if (req.ok) {
      commit("setParentCategories", await req.json());
    }
  },
};

export const getters = {
  inNavigation(state: CategoriesModuleState): CategoryInterface[] {
    return state.categories.filter(({ onHomepage }) => onHomepage);
  },
  activeCategory(state: CategoriesModuleState): CategoryInterface | null {
    const category = state.categories.find(
      ({ uid }) => uid === state.activeCategoryUid
    );

    if (category != null) {
      return category;
    }

    return null;
  },
  activeParentCategory(state: CategoriesModuleState): Pick<ParentCategory, "uid"> | null {
    const activeCategory = state.categories.find(
      ({ uid }) => uid === state.activeCategoryUid
    );

    if (activeCategory == null) {
      return null;
    }
    return activeCategory.parentCategory;
  },
  linksWithParentCategories(
    state: CategoriesModuleState
  ): ParentCategoryLinkObject {
    const parentCategories = state.parentCategories.reduce<ParentCategoryLinkObject>(
      (acc, parentCategory) => ({
        ...acc,
        [parentCategory.uid]: {
          name: parentCategory.name,
          data: [],
        },
      }),
      {}
    );

    return (Array.isArray(state.categories) ? state.categories : []).reduce(
      (acc, category) => {
        const key = category.parentCategory.uid;
        acc[key].data.push(category);
        return acc;
      },
      parentCategories
    );
  },
};
