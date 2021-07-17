import React, {createContext, useState} from 'react';

export const TrelloContext = createContext();

const TrelloContextProvider = (props) => {
    const [lists, setLists] = useState(JSON.parse(sessionStorage.getItem('lists') || "[]"));
    const [cards, setCards] = useState(JSON.parse(sessionStorage.getItem('cards') || "[]"));
    const [Listcounter, setListCounter] = useState(JSON.parse(sessionStorage.getItem('cardCounter') || "0"));
    const [Cardcounter, setCardCounter] = useState(JSON.parse(sessionStorage.getItem('listCounter') || "0"));
    const addList = () => {
        const newLists = [...lists, {title: '', id: Listcounter+1, cards: []}];
        setLists(newLists);
        setListCounter(Listcounter+1);
        sessionStorage.setItem('lists', JSON.stringify(newLists));
        sessionStorage.setItem('listCounter', JSON.stringify(Listcounter+1));
    };
    const removeList = (id) => {
        setLists(lists.filter( list => list.id !== id));
        setCards(cards.filter( card => card.lid !== id));
        sessionStorage.setItem('lists', JSON.stringify(lists.filter( list => list.id !== id) || "[]"));
        sessionStorage.setItem('cards', JSON.stringify(cards.filter( card => card.lid !== id) || "[]"));
    };
    const updateListTitle = (id, title) => {
        const currentList = lists.filter(list => list.id == id);
        const newLists = [...lists.filter(list => list.id !== id), {...currentList[0], title: title}]
        setLists(newLists);
        sessionStorage.setItem('lists', JSON.stringify(newLists));
    }
    const addCard = (lid) => {
        const newCards = [...cards, {ctitle: '',descp: '', lid: lid, cid: Cardcounter+1}];
        setCards(newCards);
        setCardCounter(Cardcounter+1);
        sessionStorage.setItem('cards', JSON.stringify(newCards));
        sessionStorage.setItem('cardCounter', JSON.stringify(Cardcounter+1));
    };
    const removeCard = (id, cid) => {
        const newCards = cards.filter( card => !(card.lid == id && card.cid == cid));
        setCards(newCards);
        sessionStorage.setItem('cards', JSON.stringify(newCards || "[]"));
    };
    const dropCard = (cid, previous_lid, new_lid) => {
        let currentCard = cards.filter(card => card.lid == previous_lid && card.cid == cid);
        let new_cid = 0;
        cards.filter(card => card.lid == new_lid).forEach((card) => {if(card.cid <= new_cid){new_cid = card.cid - 1;}});
        const newCards = [...cards.filter( card => !(card.lid == previous_lid && card.cid == cid)), {...currentCard[0], lid: new_lid, cid: new_cid}];
        setCards(newCards);
        sessionStorage.setItem('cards', JSON.stringify(newCards));
    }
    const CardTitleUpdate = (cid, lid, title) => {
        const currentCard = cards.filter(card => card.cid == cid && card.lid == lid);
        const newCards = [...cards.filter(card => !(card.cid == cid && card.lid == lid)), {...currentCard[0], ctitle: title}];
        setCards(newCards);
        sessionStorage.setItem('cards', JSON.stringify(newCards));
    }
    const CardDiscriptionUpdate = (cid, lid, descp) => {
        const currentCard = cards.filter(card => card.cid == cid && card.lid == lid);
        const newCards = [...cards.filter(card => !(card.cid == cid && card.lid == lid)), {...currentCard[0], descp: descp}];
        setCards(newCards);
        sessionStorage.setItem('cards', JSON.stringify(newCards));
    }
    return(
        <TrelloContext.Provider value={{lists, cards, addList, removeList, removeCard, addCard, dropCard, updateListTitle, CardTitleUpdate, CardDiscriptionUpdate}}>
            { props.children }
        </TrelloContext.Provider>
    )
}

export default TrelloContextProvider;