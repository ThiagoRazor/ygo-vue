<template>
<div class="container m-auto my-8">
        <div class="bg-white p-8 rounded-md w-full">
        	<div class=" flex items-center justify-between pb-6">
        		<div>
        			<h2 class="text-gray-600 font-semibold">Card List</h2>
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
        							<tr v-for="card in cards" :key="card.id">
                                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        									<p class="text-gray-900 whitespace-no-wrap">
        										{{ card.id }}
        									</p>
        								</td>
        								<td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        									<div class="flex items-center">
        										<div @click="() => updateCardImage(card.id)" ref="cardImg" class="flex-shrink-0 w-10 h-10 cursor-pointer">
        											<img class="w-full h-full object-contain rounded-full"
                                                        :src="`${card.img}`"
                                                        alt="" />
                                                </div>
        											<div class="ml-3">
        												<p class="text-gray-900 whitespace-no-wrap">
        													{{card.name}}
        												</p>
        											</div>
        										</div>
        								</td>
        								<td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        									<p class="text-gray-900 whitespace-no-wrap">{{ card.atk }}</p>
        								</td>
        								<td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        									<p class="text-gray-900 whitespace-no-wrap">
        										{{ card.def }}
        									</p>
        								</td>
        								<td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        									<p class="text-gray-900 whitespace-no-wrap">
        										{{ card.password }}
        									</p>
        								</td>
        								<td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        									<p class="text-gray-900 whitespace-no-wrap">
        										{{ card.price }}
        									</p>
        								</td>
                                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        									<p class="text-gray-900 whitespace-no-wrap">
        										{{ card.description }}
        									</p>
        								</td>
        							</tr>
        						</tbody>
        					</table>
        					<!--<div
        						class="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
        						<span class="text-xs xs:text-sm text-gray-900">
                                    Showing 1 to 4 of 50 Entries
                                </span>
        						<div class="inline-flex mt-2 xs:mt-0">
        							<button
                                        class="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-l">
                                        Prev
                                    </button>
        							&nbsp; &nbsp;
        							<button
                                        class="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-r">
                                        Next
                                    </button>
        						</div>
        					</div>
                            -->
        				</div>
        			</div>
        		</div>
        	</div>
</div>
<fileModal
	v-if="showFileInput"
/>
<inputModal
 	v-if="showModalInput"
/>

</template>


<script setup> 
  import { ref } from "vue";
  import inputModal from "@/components/InputModal.vue";
  import fileModal from "@/components/FileModal.vue";
  import { initializeApp } from "firebase/app";
  import { getAnalytics } from "firebase/analytics";
  import { firebaseConfig } from "../firebaseConfig";
  import { getFirestore, collection, query, orderBy, onSnapshot, doc, updateDoc, where, getDocs } from 'firebase/firestore';	
  import {getStorage, getDownloadURL, uploadBytes, ref as storageRef } from "firebase/storage";
  
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const db = getFirestore(app);
  const storage = getStorage();
  const cards = ref([]);
  const showModalInput = ref(false);
  const showFileInput = ref(false);

  const cardList = query(collection(db, "cards"), orderBy("id"));
  
  onSnapshot(cardList, (snapshot) => {
    cards.value = snapshot.docs.map((doc) => doc.data());
  });

  const showModal = () => {
    showModalInput.value = !showModalInput.value;
  };

  const showFile = () => {
	showFileInput.value = !showFileInput.value;
  }

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

</script>