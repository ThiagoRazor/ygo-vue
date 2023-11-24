<template>
<div class="container m-auto my-8">
        <div class="p-8 rounded-md w-full">
        	<div class=" flex items-center justify-between pb-6">
        		<div class="flex gap-4">
                    <div>
        		    	<button @click="cardListArea" :class="{'bg-yellow-400' : cardList, 'bg-gray-400' : !cardList}" class=" px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">Cards</button>
        		    </div>
                    <div>
        		    	<button @click="personListArea" :class="{'bg-yellow-400' : personList, 'bg-gray-400' : !personList}" class="px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">Duelists</button>
        		    </div>
        		</div>
        		<div class="flex items-center justify-between">
						<div class="lg:ml-40 ml-10 space-x-8">
        					<button  @click="showModal" class="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">Create</button>
        				</div>
						<div class="lg:ml-40 ml-10 space-x-8">
        					<button  @click="showFile" class="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">File Upload</button>
        				</div>
        			</div>
        		</div>
        		<div>
        			<div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        				<div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
        					<CardBoard v-if="cardList"/>
							    <PersonBoard v-if="personList"/> 
        				</div>
        			</div>
        		</div>
        	</div>
</div>
<FileModal
	v-if="showFileInput"
/>
<InputModal
 	v-if="showModalInput"
/>

</template>


<script setup> 
  import { ref, watch } from "vue";
  import CardBoard from "@/components/CardBoard.vue";
  import PersonBoard from "@/components/PersonBoard.vue";
  import InputModal from "@/components/InputModal.vue";
  import FileModal from "@/components/FileModal.vue";
  
  const showModalInput = ref(false);
  const showFileInput = ref(false);
  const cardList = ref(true);
  const personList = ref(false);

    const cardListArea = () => {
        if(personList.value){
            personList.value = false;
            cardList.value = !cardList.value;
        }

    }

    const personListArea = () => {
        if(cardList.value){
            cardList.value = false;
            personList.value = !personList.value;
        }
    }


  const showModal = () => {
    showModalInput.value = !showModalInput.value;
  };

  const showFile = () => {
	showFileInput.value = !showFileInput.value;
  }


</script>