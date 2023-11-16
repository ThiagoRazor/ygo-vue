<template>
    <section>

        <div class="flex items-center justify-center flex-wrap">
            <div  v-for="card in cards" :key="card.id" class=" md:w-1/3 xl:w-1/4 flex justify-center items-center py-6">
                <router-link class="w-3/5" :to="`/card/${card.id}`">
                    <img :src="`${card.img}`" class="text-white hover:grow hover:shadow-lg">
                    <div class="flex items-center justify-between pt-4">
                                <div class="bg-yellow-200 py-1.5 px-6 rounded-md">
                                    <p tabindex="0" class="focus:outline-none text-md text-yellow-700 font-bold">Nº: {{card.id}}</p>
                                </div>
                    </div>
                    <div class="pt-3 flex items-center justify-between">
                        <p class="font-bold text-white">{{card.name}}</p>
                    </div>
                </router-link>
            </div>
        </div>

        </section>
</template>

<script>
  import { initializeApp } from "firebase/app";
  import { getAnalytics } from "firebase/analytics";
  import { firebaseConfig } from "../firebaseConfig";
  import { getFirestore, collection, query, orderBy, onSnapshot } from 'firebase/firestore';
  import { useSearchStore } from "../stores/store";
  import { onMounted, ref, watch } from "vue";

  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const db = getFirestore(app);

  export default {
    setup() {
      const cards = ref([]);
      const searchTerm = ref(useSearchStore().searchTerm);
      let unsubscribe;

      const cardList = query(collection(db, "cards"), orderBy("id"));

      onMounted(async () => {
        await new Promise((resolve) => {
          unsubscribe = onSnapshot(cardList, (snapshot) => {
            cards.value = snapshot.docs
              .map((doc) => doc.data())
              .filter((card) => {
                if (typeof searchTerm.value === "string") {
                  const parsedId = parseInt(searchTerm.value, 10);
                  if (!isNaN(parsedId)) {
                    return card.id === parsedId;
                  } else {
                    return card.name.toLowerCase().includes(searchTerm.value.toLowerCase());
                  }
                } else {
                  return true;
                }
              });
            console.log(searchTerm.value);
            resolve();
          });

          // Cleanup the listener when the component is unmounted
          return () => unsubscribe();
        });
      });

      // Watch for changes in the search term
      watch(() => useSearchStore().searchTerm, async (newSearchTerm) => {
        // Update the captured value when the search term changes
        searchTerm.value = newSearchTerm;

        // Update the cards based on the new search term
        await new Promise((resolve) => {
          unsubscribe = onSnapshot(cardList, (snapshot) => {
            cards.value = snapshot.docs
              .map((doc) => doc.data())
              .filter((card) => {
                if (typeof searchTerm.value === "string") {
                  const parsedId = parseInt(searchTerm.value, 10);
                  if (!isNaN(parsedId)) {
                    return card.id === parsedId;
                  } else {
                    return card.name.toLowerCase().includes(searchTerm.value.toLowerCase());
                  }
                } else {
                  return true;
                }
              });
            console.log(searchTerm.value);
            resolve();
          });

          return () => unsubscribe();
        });
      });

      return { cards, searchTerm };
    }
  }
</script>
