type TProps = {
  cards: string[];
  deckId: string;
  //   onClick: (id: string) => {};
};

const Cards = (props: TProps) => {
  return (
    <>
      {props.cards.map((card: string) => (
        <li key={props.deckId}>
          {/* <button onClick={() => props.onClick(deckId)}>X</button> */}
          {card}
        </li>
      ))}
    </>
  );
};

export default Cards;
