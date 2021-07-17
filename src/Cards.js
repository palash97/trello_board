import React, {useContext} from 'react';
import { TrelloContext } from './TrelloContext';

const CardsList = (props) => {
    return(
      <>
      {props.cards.length > 0 && props.cards.sort((a,b) => (parseInt(a.cid) > parseInt(b.cid)) ? 1 : -1).map((card) => {
        return(<Card card={card} key={card.cid} />);
      })}
      </>
    );
}

export default CardsList;
  
const Card = (props) => {
    const { removeCard, CardTitleUpdate, CardDiscriptionUpdate } = useContext(TrelloContext);
    const dragStart = (e) => {
      const target = e.target;
      e.dataTransfer.setData('card_id', props.card.cid);
      e.dataTransfer.setData('list_id', props.card.lid);
    };
    return(
      <div className="card" draggable onDragStart={dragStart}>
        <div className="cardHeader">
          <div className="cardTitle"><input value={props.card.ctitle} onChange={(e) => CardTitleUpdate(props.card.cid, props.card.lid, e.target.value)} placeholder={'Add title'}/></div>
          <span className="removeCard" onClick={() => removeCard(props.card.lid, props.card.cid)}>&times;</span>
        </div>
        <div className="cardDesc">
          <div className="cardDescText"><textarea value={props.card.descp} onChange={(e) => CardDiscriptionUpdate(props.card.cid, props.card.lid, e.target.value)} placeholder={'Add Discription'}/></div>
        </div>
      </div>
    )
}