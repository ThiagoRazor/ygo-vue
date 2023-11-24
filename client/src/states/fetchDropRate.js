import { getDocs, collection, query, where, orderBy } from 'firebase/firestore';
import { fetchCardDetails } from './fetchCardDetails';

export const fetchDropRate = async (db, category, duelistId) => {

    const personCollection = collection(db, 'person');
    const personQuery = query(personCollection, where("id", "==", duelistId));

    const querySnapshot = await getDocs(personQuery);

    const result = [];

    // Utilize map em vez de forEach
    const promises = querySnapshot.docs.map(async (doc) => {
        const nestedCollectionRef = collection(doc.ref, category);
        const nestedCollectionSnapshot = await getDocs(nestedCollectionRef);

        // Mapeie os resultados da coleção aninhada para obter as URLs corretas
        const nestedResults = await Promise.all(nestedCollectionSnapshot.docs.map(async (nestedDoc) => {
            const card = nestedDoc.data().card;
            const id = nestedDoc.data().id;
            const rate = ((nestedDoc.data().rate * 100) / 2048);

            // Chame fetchCardDetails para obter os detalhes do card, incluindo a URL
            const cardDetails = await fetchCardDetails(db, { id: id });
            
            return { card, id, rate, img: cardDetails ? cardDetails.img : "https://raw.githubusercontent.com/ThiagoRazor/ygo-vue/main/client/src/assets/894a29efbd3fee51e8e2e538b2144cf3.jpg" };
        }));

        // Adicione os resultados da coleção aninhada ao resultado principal
        result.push(...nestedResults);
    });

    // Aguarde todas as Promises serem resolvidas
    await Promise.all(promises);

    // Retorne o resultado
    return result;
}
