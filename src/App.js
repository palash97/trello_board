import React, {useContext} from 'react';
import TrelloContextProvider from './TrelloContext';
import TrelloBoard from './TrelloBoard';

const App = () => {
  return(
    <>
    <TrelloContextProvider>
      <TrelloBoard />
    </TrelloContextProvider>
    </>
  );
}

export default App;