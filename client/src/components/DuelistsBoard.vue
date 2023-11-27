<template>
    <div class='flex items-center justify-start py-4'>
      <div class="flex flex-wrap gap-2">
        <router-link
          v-for="duelist in duelists"
          :key="duelist.id"
          :to="`/enemy/${duelist.id}`"
          class="transform cursor-pointer place-items-center transition-all hover:scale-105 hover:border-blue-gray-100 hover:bg-blue-gray-50 hover:bg-opacity-25"
        >
          <img class="h-20" :src="duelist.imageUrl"/>
        </router-link>
      </div>
    </div>
  </template>
  
  <script>
  import { initializeApp } from '@firebase/app';
  import { firebaseConfig } from "../firebaseConfig";
  import { getFirestore, collection, getDocs } from 'firebase/firestore';
  
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  
  export default {
    props: {
      id: {
        type: Number,
        required: true,
      }
    },
    data() {
      return {
        duelists: []
      };
    },
    mounted() {
      this.fetchDuelistData();
    },
    methods: {
      async fetchDuelistData() {
        const personCollectionRef = collection(db, 'person');
  
        try {
          const personQuerySnapshot = await getDocs(personCollectionRef);
  
          for (const personDoc of personQuerySnapshot.docs) {
            const personData = personDoc.data();
  
            // Itera sobre cada subColeção
            for (const subCollection of ['pow', 'pt', 'tec']) {
              const subCollectionRef = collection(personDoc.ref, subCollection);
              const subCollectionSnapshot = await getDocs(subCollectionRef);
  
              // Verifica se o documento com o ID fornecido está na subColeção
              for (const subDoc of subCollectionSnapshot.docs) {
                if (subDoc.data().id === this.id) {
                  this.duelists.push({
                    id: personData.id,
                    imageUrl: personData.img
                  });
                  // Interrompe a iteração se já encontrou uma correspondência
                  break;
                }
              }
  
              // Se já encontrou uma correspondência, interrompe a iteração sobre as subColeções
              if (this.duelists.length > 0) {
                break;
              }
            }
          }
  
          this.duelists.sort((a, b) => a.id - b.id)
          console.log(this.duelists)
        } catch (error) {
          console.error(error);
        }
      }
    }
  }
</script>
