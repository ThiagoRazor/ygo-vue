<template>            
            <div v-if="closeModalInput" class="py-40 z-10 absolute top-0 right-0 bottom-0 left-0">
                <div role="alert" class="container mx-auto w-11/12 md:w-2/3 max-w-lg">
                    <div class="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
                        <div class="w-full flex justify-start text-gray-600 mb-3">
                            <img class="icon icon-tabler icon-tabler-wallet" width="52" height="52"
                             src="../assets/0.jpg"
                             alt="Card" />
                        </div>
                        <h1 class="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">Enter Card Details</h1>
                        <label for="name" class="text-gray-800 text-sm font-bold leading-tight tracking-normal">Card Name</label>
                        <input v-model="cardName" class="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"  />
                        <div class="flex">
                                    <div>
                                        <label class="text-gray-800 text-sm font-bold leading-tight tracking-normal">Card ID</label>
                                        <div class="relative mb-5 mt-2">
                                            <input v-model="cardId" class="text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-3/5 h-10 flex items-center pl-2 text-sm border-gray-300 rounded border"  />
                                        </div>
                                    </div>
                                    <div>
                                        <label class="text-gray-800 text-sm font-bold leading-tight tracking-normal">Card ATK</label>
                                        <div class="relative mb-5 mt-2">
                                            <input v-model="cardAtk" class="text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-3/5 h-10 flex items-center pl-2 text-sm border-gray-300 rounded border"  />
                                        </div>
                                    </div>
                                    <div>
                                        <label class="text-gray-800 text-sm font-bold leading-tight tracking-normal">Card DEF</label>
                                        <div class="relative mb-5 mt-2">
                                            <input v-model="cardDef" class="text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-3/5 h-10 flex items-center pl-2 text-sm border-gray-300 rounded border"  />
                                        </div>
                                    </div>
                        </div>
                        <div class="flex gap-2">
                                    <div>
                                        <label class="text-gray-800 text-sm font-bold leading-tight tracking-normal">Card PASSWORD</label>
                                        <div class="relative mb-5 mt-2">
                                            <input v-model="cardPass" class="text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-5/2 h-10 flex items-center pl-2 text-sm border-gray-300 rounded border" />
                                        </div>
                                    </div>
                                    <div>
                                        <label class="text-gray-800 text-sm font-bold leading-tight tracking-normal">Card PRICE</label>
                                        <div class="relative mb-5 mt-2">
                                            <input v-model="cardPrice" class="text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-5/2 h-10 flex items-center pl-2 text-sm border-gray-300 rounded border" />
                                        </div>
                                    </div>
                        </div>
                        <label class="text-gray-800 text-sm font-bold leading-tight tracking-normal">Card IMG</label>
                        <div class="relative mb-5 mt-2">
                            <input type="file" ref="cardImg" @change="handleFileChange" class="text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" />
                        </div>
                        <div class="w-3/4 flex flex-col">
                            <label class="text-gray-800 text-sm font-bold leading-tight tracking-normal">Card DESCRIPTION</label>
                            <textarea v-model="cardDescription" rows="3" class="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"></textarea>
                        </div>
                        <div class="flex items-center justify-start w-full">
                            <button @click="addNewCard" class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm">Submit</button>
                            <button @click="closeModal" class="focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-gray-400 ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm">Cancel</button>
                        </div>
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
    import { addDoc, collection } from "firebase/firestore";
    import { db } from "../firebaseConfig"
    import { ref } from "vue";
    import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";

        const closeModalInput = ref(true);
        const cardName = ref('');
        const cardAtk = ref();
        const cardDef = ref();
        const cardId = ref();
        const cardPass = ref();
        const cardPrice = ref();
        const cardImg = ref('');
        const cardDescription = ref('');
        const storage = getStorage();

        const closeModal = () => {
          closeModalInput.value = !closeModalInput.value;
        }


        const uploadImage = async (file) => {
              try {
                const storageReference = storageRef(storage, `cardImg/${file.name}`);
                await uploadBytes(storageReference, file);
                const imageUrl = await getDownloadURL(storageReference);
                console.log(imageUrl);
                return imageUrl;
              } catch (error) {
                console.error("Error uploading image: ", error);
                return null;
              }
            };

            const handleFileChange = async (event) => {
                const file = event.target.files[0];
                if (file) {
                  const imageUrl = await uploadImage(file);
                  if (imageUrl !== null) {
                    cardImg.value = imageUrl;
                  }
                }
            };


        const addNewCard = async () => {
              try {
                const imgValue = typeof cardImg.value === 'string' ? cardImg.value: '';

                const docRef = await addDoc(collection(db, 'cards'), {
                  name: cardName.value,
                  id: Number(cardId.value),
                  atk: Number(cardAtk.value),
                  def: Number(cardDef.value),
                  password: Number(cardPass.value),
                  price: Number(cardPrice.value),
                  description: cardDescription.value,
                  img: imgValue.value || "", // Ensure that img is a string or an empty string
                });
                console.log("Card added with ID: ", docRef.id);
              } catch (error) {
                console.error("Error adding card: ", error);
              }
            };



  </script>
  

