<template>            
    <div v-if="closeModalInput" class="py-40 z-10 absolute top-0 right-0 bottom-0 left-0">
        <div class="container mx-auto w-11/12 md:w-2/3 max-w-lg">
            <div class="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
                <div class="flex">
                    <div>
        		    	<button @click="cardInputArea" :class="{'bg-gray-400' : cardInput, 'bg-gray-300' : !cardInput}" class=" px-4 text-white font-semibold tracking-wide cursor-pointer">Cards</button>
        		    </div>
                    <div>
        		    	<button @click="personInputArea" :class="{'bg-gray-400' : personInput, 'bg-gray-300' : !personInput}" class="px-4 text-white font-semibold tracking-wide cursor-pointer">Person</button>
        		    </div>
                </div>
                <CardsFile v-if="cardInput"/>
                <PersonFile v-if="personInput"/>
                    <button @click="closeModal" class="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600">
                    <svg  xmlns="http://www.w3.org/2000/svg"  class="icon icon-tabler icon-tabler-x" width="20" height="20" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import CardsFile from "@/components/CardsFile.vue"; 
import PersonFile from "@/components/PersonFile.vue";
import { ref } from "vue";

    const closeModalInput = ref(true);
    const cardInput = ref(true);
    const personInput = ref(false);

    const closeModal = () => {
      closeModalInput.value = !closeModalInput.value;
    }

    const cardInputArea = () => {
        if(personInput.value){
            personInput.value = false;
            cardInput.value = !cardInput.value;
        }

    }

    const personInputArea = () => {
        if(cardInput.value){
            cardInput.value = false;
            personInput.value = !personInput.value;
        }
    }

</script>