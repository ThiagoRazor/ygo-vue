<template>            
    <div v-if="closeModalInput" class="py-40 z-10 absolute top-0 right-0 bottom-0 left-0">
        <div role="alert" class="container mx-auto w-11/12 md:w-2/3 max-w-lg">
            <div class="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
                <div class="w-full flex justify-start text-gray-600 mb-3">
                    <img class="icon icon-tabler icon-tabler-wallet" width="52" height="52"
                     src="../assets/0.jpg"
                     alt="" />
                </div>
                <h1 class="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">Select a .xlsx archive</h1>
                <div class="relative mb-5 mt-2">
                    <input type="file" ref="xlsxDoc" @change="docFileUpload" class="text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" />
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
import * as XLSX from "xlsx";

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

const docFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file){
        const extension = file.name.split('.').pop().toLowerCase();

        if (extension === 'xlsx') {
            await readExcelFile(file);
            console.log("Arquivo submetido")
        } else {
            console.error("Por favor, selecione um arquivo .xlsx");
        }
    }
}

const readExcelFile = async (file) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array"});
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet);

        for (const item of jsonData) {
            // Verificar se os valores são números antes de converter
            const atk = !isNaN(item.atk) ? Number(item.atk) : 0;
            const def = !isNaN(item.def) ? Number(item.def) : 0;
            const password = !isNaN(item.password) ? Number(item.password) : 0;
            const price = !isNaN(item.price) ? Number(item.price) : 0;

            await addDoc(collection(db, "cards"), {
                name: item.name,
                id: !isNaN(item.id) ? Number(item.id) : 0,
                atk,
                def,
                password,
                price,
                description: item.description || "",
                img: "",
            })
        }

        console.log("Cartões adicionados do Excel")
    }

    reader.readAsArrayBuffer(file);
}

const addNewCard = async () => {
    try {
        const docRef = await addDoc(collection(db, 'cards'), {
          name: cardName.value,
          id: !isNaN(cardId.value) ? Number(cardId.value) : 0,
          atk: !isNaN(cardAtk.value) ? Number(cardAtk.value) : 0,
          def: !isNaN(cardDef.value) ? Number(cardDef.value) : 0,
          password: !isNaN(cardPass.value) ? Number(cardPass.value) : 0,
          price: !isNaN(cardPrice.value) ? Number(cardPrice.value) : 0,
          description: cardDescription.value || "",
          img: cardImg.value || "",
        });
        console.log("Card added with ID: ", docRef.id);
    } catch (error) {
        console.error("Error adding card: ", error);
    }
};

</script>