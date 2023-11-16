import { createPinia, defineStore } from "pinia";

export const pinia = createPinia();

export const useSearchStore = defineStore('search', {
  state: () => ({
    searchTerm: "",
  }),

  actions: {
    updateSearchTerm(searchTerm){
      this.searchTerm = searchTerm;
    },

    resetSearchTerm(){
      this.searchTerm = "";
    },
    
  }
})