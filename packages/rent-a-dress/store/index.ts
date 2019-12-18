import {
  getStoreType,
  getAccessorType,
  mutationTree,
  actionTree
} from "nuxt-typed-vuex";

import { Context } from "@nuxt/types";

import { CatalogItem } from "~/oapi-client-typescript-axios";
// Import all your submodules
// import * as submodule from '~/store/submodule'

// Keep your existing vanilla Vuex code for state, getters, mutations, actions, plugins, etc.
console.log("In store/index.ts");
export const state = () => ({
  catalog: <CatalogItem[]>[],
  name: "Me"
});

export type RootState = ReturnType<typeof state>;

export const getters = {
  name: (state: RootState) => state.name
};

export const mutations = mutationTree(state, {
  SET_CATALOG(state, catalog: CatalogItem[]) {
    state.catalog = catalog;
  },
  UPDATE_CATALOGITEM(state, item: CatalogItem) {
    const index = state.catalog.findIndex(i => i.id === item.id);
    if (index >= 0) Object.assign(state.catalog[index], item);
  }
});

export const actions = actionTree(
  { state, getters, mutations },
  {
    async fetchCatalog({ commit }) {
      debugger;
      const catalog = await this.$api.getCatalog();
      commit("SET_CATALOG", catalog.data);
    }
  }
);

const store = {
  state,
  getters,
  mutations,
  actions,
  modules: {
    // The key (submodule) needs to match the Nuxt namespace (e.g. ~/store/submodule.ts)
    // submodule,
  }
};

// This compiles to nothing and only serves to return the correct type of the accessor
export const accessorType = getAccessorType(store);
