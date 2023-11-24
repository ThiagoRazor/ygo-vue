<template>
    <div class="w-full flex justify-start text-gray-600 my-10">
        <img class="icon icon-tabler icon-tabler-wallet" width="52" height="52"
         src="http://2.bp.blogspot.com/-4GnyU6GfQy4/UdZmuni1QTI/AAAAAAAACwQ/W6_v7d3u550/s155/Duel+Master+K.png"
         alt="Card" />
    </div>
    <div class="flex w-full">
        <div>
            <label class=" text-gray-800 font-lg font-bold tracking-normal leading-tight">Person ID</label>
            <input v-model="personId" class="w-[30%] mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"  /> 
        </div>
        <div>
            <label for="name"  class="text-gray-800 font-lg font-bold tracking-normal leading-tight">Person Name</label>
            <input v-model="personName" class="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"  /> 
        </div>   
    </div>
    <div  class="text-gray-800 font-lg pb-4 font-bold tracking-normal leading-tight">Category Select</div>
        <div>
            <label  class="text-gray-800 font-lg font-bold tracking-normal leading-tight">Category Name</label>
            <div class="flex mb-5 mt-2">
                <button
                   v-for="category in categories"
                   :key="category"
                   @click="selectCategory(category)"
                   :class="{ 'bg-red-700': personCat === category, 'bg-red-600': personCat !== category }"
                   class="mr-2 px-2 py-2 rounded-md text-xs text-white tracking-wide cursor-pointer"
                >
                {{ category }}
                </button>
            </div>
        </div>  
    <h1 class="text-gray-800 font-lg font-bold tracking-normal leading-tight my-4">Select a .xlsx archive</h1>
                <div class="relative mb-5 mt-2">
                    <input type="file" ref="xlsxDoc" @change="docFileUpload" class="text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"/>
                </div>                
                <div class="flex items-center justify-start w-full">
                    <button @click="addNewDuelist" class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm">Submit</button>
                </div>
</template>

<script setup> 
    import { addDoc, collection, setDoc, doc } from "firebase/firestore";
    import { db } from "../firebaseConfig"
    import { ref } from "vue";
    import { getStorage } from "firebase/storage";
    import * as XLSX from "xlsx";

            const personName = ref('');
            const personId = ref();
            const personCat = ref('');
            const storage = getStorage();
            const categories = ["deck", "pow", "pt", "tec"]

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
                try {
                    const reader = new FileReader();
                    reader.onload = async (e) => {
                    const data = new Uint8Array(e.target.result);
                    const workbook = XLSX.read(data, { type: "array"});
                    const sheetName = workbook.SheetNames[0];
                    const sheet = workbook.Sheets[sheetName];
                    const jsonData = XLSX.utils.sheet_to_json(sheet);
                    console.log(jsonData)
                    
                    for (const item of jsonData) {
                       const rate = !isNaN(item.rate) ? Number(item.rate) : 0
                       const card = item.card

                        if(item.rate !== 0 && personCat.value && item.card) {
                            const personDocRef = doc(collection(db, 'person'), personName.value)
                            const collectionBuild = collection(personDocRef, personCat.value);

                           await addDoc(collectionBuild, {
                                id: !isNaN(item.id) ? Number(item.id) : 0,
                                card,
                                rate,
                           })

                            console.log("Documento adicionado ao firestore ")
                        }

                        console.log("Cartões adicionados do Excel")
                    }
                }
                reader.readAsArrayBuffer(file);
                } catch (error){
                    console.error("Erro ao ler o arquivo Excel: ", error)
                }

            }

            const selectCategory = (category) => {
                personCat.value = category;
            }

            const addNewDuelist = async () => {
                try {
                    const personDocRef = doc(collection(db, 'person'), personName.value);

                    await setDoc(personDocRef, {
                        name: personName.value,
                        id: Number(personId.value)  || 0,
                    })


                    console.log("Person add with success!: ", personName.value);
                } catch(error) {
                    console.error("Error adding Person: ", error);
                }
            }

            
</script>