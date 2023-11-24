import { getDocs, query, where, collection } from 'firebase/firestore';

export const fetchCardDetails = async (db, cardDetails) => {

    const cardsCollection = collection(db, 'cards');
    const cardQuery = query(cardsCollection, where("id", "==", cardDetails.id))

    try{
        const cardSnapshot = await getDocs(cardQuery);

        if(!cardSnapshot.empty){
            const cardData = cardSnapshot.docs[0].data();
            return {
                img: cardData.img || "",
            };
        } else {
            console.error("Error fetching card details details for ID: ", cardDetails.id);
            return null;
        }
    } catch (error) {
        console.error("Error fetching card details: ", error);
        return null;
    }

}