import { Link } from "react-router-dom";
import { TDeck } from "../api/getDecks";

type TProps = {
  decks: TDeck[];
  onClick: (id: string) => {};
};

const Decks = (props: TProps) => {
  return (
    <>
      {props.decks.map((deck: TDeck) => (
        <li key={deck._id}>
          <button onClick={() => props.onClick(deck._id)}>X</button>
          <Link to={`decks/${deck._id}`}>{deck.title}</Link>
        </li>
      ))}
    </>
  );
};

export default Decks;
