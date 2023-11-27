<template>
  <main class="bg-white dark:bg-gray-800">
    <section class="dark:text-gray-700 body-font overflow-hidden">
      <div class="container px-5 py-24 mx-auto">
        <div class="lg:w-4/5 mx-auto flex flex-wrap">
          <img :src="`${cardData.img}`" :alt="`${cardData.name}`" class="text-gray-900 dark:text-white lg:w-[400px] w-[400px] object-cover object-center rounded border  hover:shadow-lg border-gray-200">
          <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 class="text-sm title-font text-gray-800 dark:text-gray-100 tracking-widest">CARD NAME</h2>
            <h1 class="text-gray-900 dark:text-white text-3xl title-font font-medium mb-1">{{cardData.name}}</h1>
            <p class="text-gray-800 dark:text-gray-100 leading-relaxed">Nº: {{ cardData.id }}</p>
          
            <p class="text-gray-800 dark:text-gray-100 leading-relaxed">{{ cardData.description }}</p>
            <div class="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
              <div class="flex gap-4">
                <div class="flex items-center justify-between pt-4">
                  <div class="bg-yellow-200 py-1.5 px-6 rounded-md">
                      <p class="focus:outline-none text-md text-yellow-700 font-bold">ATK: {{ cardData.atk }}</p>
                  </div>
                </div>
                <div class="flex items-center justify-between pt-4">
                  <div class="bg-yellow-200 py-1.5 px-6 rounded-md">
                      <p class="focus:outline-none text-md text-yellow-700 font-bold">DEF: {{cardData.def}}</p>
                  </div>
                </div>
              </div>
            </div>
            <h2 class="text-sm title-font pt-4 text-gray-800 dark:text-gray-100 tracking-widest">PRICE:</h2>
            <p class="flex items-center gap-1.5 font-sans text-lg font-normal leading-relaxed text-gray-800 dark:text-gray-100 antialiased">
            <img
              src="https://raw.githubusercontent.com/ThiagoRazor/ygo-vue/main/client/src/assets/star.png"
              class="h-6"
            />
            {{ cardData.price }}
          </p>
          <h2 class="text-sm title-font pt-4 text-gray-800 dark:text-gray-100 tracking-widest">PASSWORD:</h2>
            <p class="flex items-center gap-1.5 font-sans text-lg font-normal leading-relaxed text-gray-800 dark:text-gray-100 antialiased">
            {{ cardData.password }}
          </p>
          </div>
        </div>
      </div>
    </section>
</main>
</template>

<script>
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebaseConfig";
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default {
  data() {
    return {
      cardData: {
        name: "",
        atk: 0,
        def: 0,
        description: "",
        id: 0,
        img: "",
        password: 0,
        price: 0
      }
    };
  },
  async mounted() {
    const cardId = this.$route.params.id;

    const cardsCollection = collection(db, "cards");
    const cardQuery = query(cardsCollection, where("id", "==", parseInt(cardId)));

    try {
      const querySnapshot = await getDocs(cardQuery);

      if (!querySnapshot.empty) {
        const cardDetails = querySnapshot.docs[0].data();
        this.cardData = {
          name: cardDetails.name || "",
          atk: cardDetails.atk || 0,
          def: cardDetails.def || 0,
          description: cardDetails.description || "",
          id: cardDetails.id || 0,
          img: cardDetails.img || "",
          password: cardDetails.password || 0,
          price: cardDetails.price || 0
        };
      } else {
        console.log("No such card with ID:", cardId);
      }
    } catch (error) {
      console.error("Error fetching card details:", error);
    }
  }
};
</script>