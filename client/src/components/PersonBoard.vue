<template>
    <table class="min-w-full leading-normal">
        <thead>
        	<tr>
        		<th
        			class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
        			DUELIST
        		</th>
        	</tr>
        </thead>
        <tbody>
        	<tr v-for="duelist in duelists" :key="duelist.id" class="bg-white hover:bg-gray-300">
        		<td class="px-5 py-5 border-b border-gray-200 text-sm">
        			<div class="flex items-center">
        				    <div @click="() => updateDuelistImage(duelist.id)" ref="cardImg" class="flex-shrink-0 w-10 h-10 cursor-pointer">
        					    <img class="w-full h-full object-contain rounded-full"
                                    :src="`${duelist.img}`"
                                    :alt="`${duelist.name}`" />
                            </div>
        					<div class="ml-3">
        						<p class="text-gray-900 whitespace-no-wrap">
        							{{duelist.name}}
        						</p>
        					</div>
        				</div>
        		</td>
        	</tr>
        </tbody>
    </table>
</template>

<script setup> 
  import { ref } from "vue";
  import { initializeApp } from "firebase/app";
  import { firebaseConfig } from "../firebaseConfig";
  import { getFirestore, collection, query, orderBy, onSnapshot, doc, updateDoc, where, getDocs } from 'firebase/firestore';	
  import { getStorage, getDownloadURL, uploadBytes, ref as storageRef } from "firebase/storage";
  
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const storage = getStorage();
  const duelists = ref([]);

  const duelistList = query(collection(db, "person"), orderBy("id"));
  
  onSnapshot(duelistList, (snapshot) => {
    duelists.value = snapshot.docs.map((doc) => doc.data());
  });

  const uploadImage = async (file) => {
	try {
		const storageReference = storageRef(storage, `duelist/${file.name}`);

		await uploadBytes(storageReference, file);
		const imageUrl = await getDownloadURL(storageReference);
		return imageUrl;
	} catch (error) {
		console.error("Error uploading image: ", error);
		return null;
	}
  }

  const updateDuelistImage = async (duelistId) => {
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
            const duelistsCollection = collection(db, 'person');
            const queryDuelist = query(duelistsCollection, where('id', '==', duelistId));

            const [duelistDoc] = (await getDocs(queryDuelist)).docs;

            if (duelistDoc) {
              const duelistDocRef = doc(db, 'person', duelistDoc.id);
              await updateDoc(duelistDocRef, { img: imageUrl });
            } else {
              console.error('Card not found for the given id:', duelistId);
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