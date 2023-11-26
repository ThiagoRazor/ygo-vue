<template>
  <main class="bg-white dark:bg-gray-800">
    <section class="text-gray-700 py-24  body-font overflow-hidden">
  <div class="container px-5 mx-auto">
    <div class="lg:w-4/5 mx-auto flex flex-wrap">
        <img class="object-center object-cover h-28 w-28" :src="`${duelistData.img}`" :alt="`${duelistData.name}`">
        <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 class="text-sm title-font text-gray-800 dark:text-gray-100 tracking-widest">DUELIST NAME</h2>
            <h1 class="text-gray-900 dark:text-white text-3xl title-font font-medium mb-1">{{ duelistData.name }}</h1>
        </div>
    </div>
  </div>
      <section>
        <div class="flex flex-col justify-start items-start m-auto p-auto">
            <h1 class="flex py-5 lg:px-20 md:px-10 px-5 lg:mx-40 md:mx-20 mx-5 font-bold text-4xl text-gray-900 dark:text-white">
              Duelist Deck
            </h1>
            <div class="w-[95%] flex justify-start px-12 items-center overflow-x-auto pb-10">
              <DropComponent v-for="card in deckData" :key="card.id" :card="card" class="flex flex-nowrap "/>
            </div>
        </div>
      </section>
      <section>
        <div class="flex flex-col justify-start items-start m-auto p-auto">
            <h1 class="flex py-5 lg:px-20 md:px-10 px-5 lg:mx-40 md:mx-20 mx-5 font-bold text-4xl text-gray-900 dark:text-white">
              SA-POW
            </h1>
            <div class="w-[95%] flex justify-start px-12 items-center overflow-x-auto pb-10">
              <DropComponent v-for="card in powData" :key="card.id" :card="card" class="flex flex-nowrap "/>
            </div>
        </div>
      </section>
      <section>
        <div class="flex flex-col justify-start items-start m-auto p-auto">
            <h1 class="flex py-5 lg:px-20 md:px-10 px-5 lg:mx-40 md:mx-20 mx-5 font-bold text-4xl text-gray-900 dark:text-white">
              BCD-PT
            </h1>
            <div class="w-[95%] flex justify-start px-12 items-center overflow-x-auto pb-10">
              <DropComponent v-for="card in ptData" :key="card.id" :card="card" class="flex flex-nowrap "/>
            </div>
        </div>
      </section>
      <section>
        <div class="flex flex-col justify-start items-start m-auto p-auto">
            <h1 class="flex py-5 lg:px-20 md:px-10 px-5 lg:mx-40 md:mx-20 mx-5 font-bold text-4xl text-gray-900 dark:text-white">
              SA-TEC
            </h1>
            <div class="w-[95%] flex justify-start px-12 items-center overflow-x-auto pb-10">
              <DropComponent v-for="card in tecData" :key="card.id" :card="card" class="flex flex-nowrap "/>
            </div>
        </div>
      </section>
  </section>
  </main>
</template>

<script>
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebaseConfig";
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { fetchDropRate } from "../states/fetchDropRate";
import DropComponent from "../components/DropComponent.vue";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default {
  components: {
    DropComponent
  },
  data() {
    return {
      duelistData: {
        name: "",
        id: 0,
        img: ""
      },
      deckData: [],
      powData: [],
      ptData: [],
      tecData: []
    };
  },
  async mounted() {
    const duelistId = this.$route.params.id;

    const duelistsCollection = collection(db, "person");
    const duelistQuery = query(duelistsCollection, where("id", "==", parseInt(duelistId)));

    try {
      const querySnapshot = await getDocs(duelistQuery);

      if (!querySnapshot.empty) {
        const duelistDetails = querySnapshot.docs[0].data();
        this.duelistData = {
          name: duelistDetails.name || "",
          id: duelistDetails.id || 0,
          img: duelistDetails.img || "",
        };

        console.log(typeof(this.duelistData.id));
      } 

      try {
        const deckData = await fetchDropRate(db, "deck", parseInt(this.duelistData.id));
        const powData = await fetchDropRate(db, "pow", parseInt(this.duelistData.id));
        const ptData = await fetchDropRate(db, "pt", parseInt(this.duelistData.id));
        const tecData = await fetchDropRate(db, "tec", parseInt(this.duelistData.id));
  
        this.deckData = deckData;
        this.powData = powData;
        this.ptData = ptData;
        this.tecData = tecData;
      } catch (error) {
        console.error("Error fetching card details:", error);
      }
    } catch (error) {
      console.error("Error fetching duelist details:", error);
    }
  }
};
</script>

