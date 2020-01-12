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
export const state = () => ({
  catalog: <CatalogItem[]>[],

});

export type RootState = ReturnType<typeof state>;

export const getters = {
  getCatalogItem: (state: RootState) => (id: number) =>
    state.catalog.find(i => i.id === id)
};

export const mutations = mutationTree(state, {
  SET_CATALOG(state, catalog: CatalogItem[]) {
    state.catalog = catalog;
  },
  SET_CATALOG_ITEM(state, item: CatalogItem) {
    const index = state.catalog.findIndex(i => i.id === item.id);
    if (index === -1) {
      state.catalog.push(item);
    } else {
      state.catalog[index] = item;
    }
  },
  UPDATE_CATALOGITEM(state, item: CatalogItem) {
    const index = state.catalog.findIndex(i => i.id === item.id);
    if (index >= 0) Object.assign(state.catalog[index], item);
  },
  DELETE_CATALOGITEM(state, id: number) {
    const index = state.catalog.findIndex(i => i.id === id);
    state.catalog.splice(index, 1);
  },
  APPEND_CATALOGITEM(state, item: CatalogItem) {
    state.catalog.push(item);
  }
});

export const actions = actionTree(
  { state, getters, mutations },
  {
    async fetchCatalog({ commit }) {
      const catalog = await this.$api.getCatalog();
      commit("SET_CATALOG", catalog.data);
    },
    async fetchCatalogItem({ commit }, id: number) {
      const result = await this.$api.getCatalogItem(id);
      commit("SET_CATALOG_ITEM", result.data);
    },
    async updateCatalogItem({ commit }, item: CatalogItem) {
      const updatedItem = await this.$api.updateCatalogItem(item);
      commit("UPDATE_CATALOGITEM", updatedItem.data);
    },
    async deleteCatalogItem({ commit }, id: number) {
      const result = await this.$api.deleteCatalogItem(id);
      if (result.status == 204) {
        commit("DELETE_CATALOGITEM", id);
      }
    },
    async newCatalogItem({ commit }, item: CatalogItem) {
      const result = await this.$api.newCatalogItem(item);
      if (result.status == 200) {
        commit("APPEND_CATALOGITEM", result.data);
      }
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
