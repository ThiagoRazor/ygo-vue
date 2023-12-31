<template>
    <table class="min-w-full leading-normal">
    	<thead>
    		<tr>
                <th
    				class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
    				ID
    			</th>
    			<th
    				class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
    				Card
    			</th>
    			<th
    				class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
    				ATK
    			</th>
    			<th
    				class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
    				DEF
    			</th>
    			<th
    				class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
    				PASSWORD
    			</th>
    			<th
    				class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
    				PRICE
    			</th>
                <th
    				class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
    				DESCRIPTION
    			</th>
    		</tr>
    	</thead>
    	<tbody>
    		<tr v-for="(card, index) in paginatedCards" :key="card.id" class="bg-white hover:bg-gray-300">
                <td class="px-5 py-5 border-b border-gray-200 text-sm">
    				<p class="text-gray-900 whitespace-no-wrap">
    					{{ card.id }}
    				</p>
    			</td>
    			<td class="px-5 py-5 border-b border-gray-200 text-sm">
    				<div class="flex items-center">
    					<div @click="() => updateCardImage(card.id)" ref="cardImg" class="flex-shrink-0 w-10 h-10 cursor-pointer">
    						<img class="w-full h-full object-contain rounded-full"
                                :src="`${card.img}`"
                                :alt="`${card.name}`" />
                        </div>
    						<div class="ml-3">
    							<p class="text-gray-900 whitespace-no-wrap">
    								{{card.name}}
    							</p>
    						</div>
    					</div>
    			</td>
    			<td class="px-5 py-5 border-b border-gray-200 text-sm">
    				<p class="text-gray-900 whitespace-no-wrap">{{ card.atk }}</p>
    			</td>
    			<td class="px-5 py-5 border-b border-gray-200 text-sm">
    				<p class="text-gray-900 whitespace-no-wrap">
    					{{ card.def }}
    				</p>
    			</td>
    			<td class="px-5 py-5 border-b border-gray-200 text-sm">
    				<p class="text-gray-900 whitespace-no-wrap">
    					{{ card.password }}
    				</p>
    			</td>
    			<td class="px-5 py-5 border-b border-gray-200 text-sm">
    				<p class="text-gray-900 whitespace-no-wrap">
    					{{ card.price }}
    				</p>
    			</td>
                <td class="px-5 py-5 border-b border-gray-200 text-sm">
    				<p class="text-gray-900 whitespace-no-wrap">
    					{{ card.description }}
    				</p>
    			</td>
    		</tr>
    	</tbody>
    </table>
	<div
        class="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
        <div class="inline-flex mt-2 xs:mt-0">
        	<button 
			@click="prevPage" :disabled="currentPage === 1"
			:class="{'bg-indigo-500': currentPage === 1}"
			class="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-l"> 
        		Prev
        	</button>
        	&nbsp; &nbsp;
        	<button 
			@click="nextPage" :disabled="currentPage === totalPages"
			:class="{'bg-indigo-500': currentPage === totalPages}"
			class="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-r"> 
                Next
            </button>
        </div>
    </div>
</template>

<script setup> 
  import { ref, onMounted, watch } from "vue";
  import { initializeApp } from "firebase/app";
  import { firebaseConfig } from "../firebaseConfig";
  import { getFirestore, collection, query, orderBy, onSnapshot, doc, updateDoc, where, getDocs } from 'firebase/firestore';	
  import {  getStorage, getDownloadURL, uploadBytes, ref as storageRef } from "firebase/storage";
  
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const storage = getStorage();
  const cards = ref([]);
  const currentPage = ref(1);
  const itemsPerPage = 50;

  const cardList = query(collection(db, "cards"), orderBy("id"));
  
  onSnapshot(cardList, (snapshot) => {
    cards.value = snapshot.docs.map((doc) => doc.data());
  });

  const totalPages = ref(1);

  const updateTotalPages = () => {
	totalPages.value = Math.ceil(cards.value.length / itemsPerPage);
  }

  watch(cards, updateTotalPages);

  const paginatedCards = ref([]);

  const updatePaginatedCards = () => {
	const startIndex = (currentPage.value - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	paginatedCards.value = cards.value.slice(startIndex, endIndex);
  }

  watch([currentPage, cards], () => {
	updatePaginatedCards();
  });

  const uploadImage = async (file) => {
	try {
		const storageReference = storageRef(storage, `cardImg/${file.name}`);

		await uploadBytes(storageReference, file);
		const imageUrl = await getDownloadURL(storageReference);
		return imageUrl;
	} catch (error) {
		console.error("Error uploading image: ", error);
		return null;
	}
  }

  const updateCardImage = async (cardId) => {
    try {
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = 'image/*';

      const file = await new Promise((resolve) => {
        fileInput.addEventListener('change', () => resolve(fileInput.files[0]), { once: true });
        fileInput.click();
      });

      if (file) {
        const imageUrl = await uploadImage(file);

        if (imageUrl !== null) {
          try {
            const cardsCollection = collection(db, 'cards');
            const queryCard = query(cardsCollection, where('id', '==', cardId));

            const [cardDoc] = (await getDocs(queryCard)).docs;

            if (cardDoc) {
              const cardDocRef = doc(db, 'cards', cardDoc.id);
              await updateDoc(cardDocRef, { img: imageUrl });
            } else {
              console.error('Card not found for the given id:', cardId);
            }
          } catch (updateError) {
            console.error('Error updating card image:', updateError);
          }
        }
      }
    } catch (error) {
      console.error('Error updating card image:', error);
    }
  };

  const prevPage = () => {
	if (currentPage.value > 1){
		currentPage.value -= 1;
	}
  };

  const nextPage = () => {
	if (currentPage.value < totalPages.value){
		currentPage.value += 1;
	}
  }

  onMounted(() => {
	updateTotalPages();
	updatePaginatedCards();
  })

</script>