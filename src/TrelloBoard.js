import React, {useContext, useState} from 'react';
import ListBox from './ListBox';
import { TrelloContext } from './TrelloContext';

const TrelloBoard = () => {
    return(
      <>
      <div className="mainHeader">
        <div className="HeaderTitle">Trello Board</div> 
        <AddListButton />
      </div>
        <ListBox />
      </>
    );
}

export default TrelloBoard;
  
const AddListButton = (props) => {
    const { addList } = useContext(TrelloContext);
    return ( <button className="addListButton" onClick={() => addList()}>Add list</button> );
}