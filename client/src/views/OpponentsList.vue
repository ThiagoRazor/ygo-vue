<template>
        <div class="w-full bg-gray-800">
    <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 py-12">
        <div class="text-center py-12">
            <h1 class="font-bold text-3xl md:text-4xl lg:text-5xl font-heading text-white">
                All Opponents.   
            </h1>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <router-link v-for="duelist in duelists" :key="duelist.id" :to="`/enemy/${duelist.id}`" class="w-full bg-gray-900 rounded-lg sahdow-lg p-12 flex flex-col justify-center items-center">
                <div class="mb-8">
                    <img class="object-center object-cover h-36 w-36" :src="`${duelist.img}`" :alt="`${duelist.name}`">
                </div>
                <div class="text-center">
                    <p class="text-xl text-white font-bold mb-2">{{ duelist.name }}</p>
                </div>
            </router-link>
        </div>
    </section>
</div>
</template>

<script setup> 
  import { ref } from "vue";
  import { initializeApp } from "firebase/app";
  import { firebaseConfig } from "../firebaseConfig";
  import { getFirestore, collection, query, orderBy, onSnapshot } from 'firebase/firestore';	
  
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const duelists = ref([]);

  const duelistsList = query(collection(db, "person"), orderBy("id"));
  
  onSnapshot(duelistsList, (snapshot) => {
    duelists.value = snapshot.docs.map((doc) => doc.data());
  });


</script>