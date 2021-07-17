import React, {useContext} from 'react';
import CardsList from './Cards';
import { TrelloContext } from './TrelloContext';

const ListBox = () => {
    const { lists } = useContext(TrelloContext);
    return(
      <div className="ListBox" onDragOver={e => e.preventDefault()}>
          {lists.map((list) => {
            return (<ListDetails title={list.title} id={list.id} key={list.id} />);
          })}
      </div>
    );
}

export default ListBox;
  
const ListDetails = (props) => {
    const { removeList, cards, addCard, dropCard, updateListTitle} = useContext(TrelloContext);
    const drop = (e) => {
      e.preventDefault();
      const card_id = e.dataTransfer.getData('card_id');
      const previous_list_id = e.dataTransfer.getData('list_id');
      dropCard(card_id, previous_list_id, props.id);
    }
    return(
      <div className="List" onDrop={drop}>
        <div className="ListHeader">
          <div className="listTitle"><input onChange={(e) => updateListTitle(props.id, e.target.value)} value={props.title} placeholder={'Add title'}/></div>
          <span className="removeList" onClick={() => removeList(props.id)}>&times;</span>
        </div>
        <CardsList cards={cards.filter((card) => card.lid == props.id)} />
        <div className="AddCardParent">
          <button onClick={() => addCard(props.id)}className="AddCard">Add Card</button>
        </div>
      </div>
    );
}