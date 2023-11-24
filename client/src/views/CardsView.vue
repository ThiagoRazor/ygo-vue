<template>
  <main class="bg-gray-800">
    <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 py-12">
      <div class="text-center pb-12  py-12">
            <h1 class="font-bold text-3xl md:text-4xl lg:text-5xl font-heading text-white">
                Card List          
            </h1>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <router-link :to="`/card/${card.id}`"  v-for="card in paginatedCards" :key="card.id" class="w-full bg-gray-900 rounded-lg sahdow-lg p-12 flex flex-col justify-center items-center">
                <div class="mb-8">
                    <img class="object-center object-cover h-42 w-36" :src="`${card.img}`" :alt="`${card.name}`">
                  </div>
                <div class="text-center">
                    <p class="text-xl text-white font-bold mb-2">Nº: {{card.id}}</p>
                    <p class="text-base text-gray-400 font-normal">{{card.name}}</p>
                </div>
              </router-link>
        </div>
        </section>
    </main>
    <div
        class="px-5 py-5 bg-gray-800 flex flex-col xs:flex-row items-center xs:justify-between">
        <div class="inline-flex mt-2 xs:mt-0">
        	<button 
			@click="prevPage" :disabled="currentPage === 1"
			:class="{'bg-indigo-500': currentPage === 1}"
			class="bg-indigo-600 text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-l"> 
        		Prev
        	</button>
        	&nbsp; &nbsp;
        	<button 
			@click="nextPage" :disabled="currentPage === totalPages"
			:class="{'bg-indigo-500': currentPage === totalPages}"
			class="bg-indigo-600 text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-r"> 
                Next
            </button>
        </div>
    </div>
</template>

<script>
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebaseConfig";
import { getFirestore, collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { useSearchStore } from "../stores/store";
import { onMounted, ref, watch } from "vue";
import router from "../router";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default {
  setup() {
    const cards = ref([]);
    const searchTerm = ref(useSearchStore().searchTerm);
    const currentPage = ref(1);
    const itemsPerPage = 30;
    let unsubscribe;

    const cardList = query(collection(db, "cards"), orderBy("id"));

    const totalPages = ref(1);

    const updateTotalPages = () => {
      totalPages.value = Math.ceil(cards.value.length / itemsPerPage);
    };

    const paginatedCards = ref([]);

    const updatePaginatedCards = () => {
      const startIndex = (currentPage.value - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      paginatedCards.value = cards.value.slice(startIndex, endIndex);
    };

    onMounted(async () => {
      await fetchData();
    });

    const fetchData = async () => {
      
      await new Promise((resolve) => {
        unsubscribe = onSnapshot(cardList, (snapshot) => {
          cards.value = snapshot.docs
            .map((doc) => doc.data())
            .filter((card) => {
              if (typeof searchTerm.value === "string") {
                const parsedId = parseInt(searchTerm.value, 10);
                if (!isNaN(parsedId)) {
                  currentPage.value = 1;
                  return card.id === parsedId;
                } else {
                  currentPage.value = 1;
                  return card.name.toLowerCase().includes(searchTerm.value.toLowerCase());
                }
              } else {
                return true;
              }
            });

          updateTotalPages();
          updatePaginatedCards();

          if (cards.value.length === 0) {
            router.push({ name: 'error' })
          }


          resolve();
        });

        return () => unsubscribe();
      });
    };

    watch(() => useSearchStore().searchTerm, async (newSearchTerm) => {
      searchTerm.value = newSearchTerm;
      await fetchData();
    });

    const prevPage = () => {
      if (currentPage.value > 1) {
        currentPage.value -= 1;
        updatePaginatedCards();
        window.scrollTo({
          top: 0
        })
      }
    };

    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value += 1;
        updatePaginatedCards();
        window.scrollTo({
          top: 0
        })
      }
    };

    return { paginatedCards, currentPage, totalPages, prevPage, nextPage };
  }
};
</script>