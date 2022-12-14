type TProps = {
  cards: string[];
  deckId: string;
  onClick: (id: string, index: number) => {};
};

const Cards = (props: TProps) => {
  return (
    <>
      {props.cards.map((card: string, index) => (
        <li className="card" key={props.deckId}>
          <button onClick={() => props.onClick(props.deckId, index)}>X</button>
          {card}
        </li>
      ))}
    </>
  );
};

export default Cards;
