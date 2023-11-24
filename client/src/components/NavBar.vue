<template>
  
  <nav class="bg-white border-gray-200 dark:bg-gray-900">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <router-link to="/" class="flex items-center">
        <img src="../assets/logo.png" class="h-12 mr-3" alt="Logo" />
    </router-link>
    <div class="flex gap-4 md:order-2">
      <button type="button" @click="toggleSearchInput" class="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 mr-1" >
        <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
        </svg>
      </button>
      <!--<router-link to="/login" class="flex w-10 h-10 items-center justify-center mr-3 text-sm bg-gray-400 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
          <span class="sr-only">Open user menu</span>
          <img class="w-4 rounded-full" src="../assets/user.png" alt="user photo">
      </router-link >-->
      <div class="relative hidden md:block">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
          </svg>
          <span class="sr-only">Search icon</span>
        </div>
        <input  v-model="searchTerm" type="search" @keydown.enter="updateSearch"
         class="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search by name...">
      </div>
      <button type="button"
       @click="showCollapse"
      class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
          <span class="sr-only">Open main menu</span>
          <svg class="w-5 h-5">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
          </svg>
      </button>
    </div>
      <div class="items-center justify-between w-full md:flex md:w-auto md:order-1" id="navbar-search">
        <div class="relative mt-3 md:flex">
          <input 
          v-show="showSearchInput"
          v-model="searchTerm" type="search" @keydown.enter="updateSearch"
          class="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
          placeholder="Search by name...">
        </div>
        <ul 
        v-if="showColapseInput"
        class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
          <li>
            <router-link to="/" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700" aria-current="page">Home</router-link>
          </li>
          <li>
            <router-link to="/cards" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
              Cards
            </router-link>
          </li>
          <li>
            <router-link to="/enemies" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Opponents</router-link>
          </li>
          
        </ul>
      </div>
    </div>
  </nav>
  
  </template>
  
  <script setup> 
    import { useRouter } from "vue-router";
    import { useSearchStore } from "../stores/store";
    import { ref, watch, onMounted, onUnmounted } from "vue";
  
      
  
        const searchStore = useSearchStore();
        const router = useRouter();
        const searchTerm = searchStore.searchTerm;
        const showSearchInput = ref(false);
        const showColapseInput = ref(true);
  
        const updateSearch = (event) => {
          searchStore.updateSearchTerm(event.target.value);
          router.push("/cards")
  
        };
  
        const toggleSearchInput = () => {
          showSearchInput.value = !showSearchInput.value;

          console.log(showSearchInput.value);
        }
  
        const showCollapse = () => {
          showColapseInput.value = !showColapseInput.value;
        }

        
        const handleResize = () => {
          showColapseInput.value = window.innerWidth >= 768
            if(window.innerWidth >= 768){
              showSearchInput.value = false;
            }
        }
  
        watch(
          () => router.currentRoute.value,
          () => {
            if (router.currentRoute.value.path !== "/cards"){
              searchStore.resetSearchTerm();
            }
          }
        )


        onMounted(() => {
          handleResize();
          window.addEventListener("resize", handleResize);
        })

        onUnmounted(() => {
          window.removeEventListener("resize", handleResize);
        })
       
  
  </script>
  