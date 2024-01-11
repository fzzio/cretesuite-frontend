import styled from "styled-components";
import { Card } from "./Card";
import { useEffect, useState } from "react";
import shuffle from "lodash/shuffle";

const GameContainer = styled.main`
  margin: 0 auto;
  min-width: 400px;
  width: 70%;
  max-width: 900px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 30px;

  > * {
    flex-basis: 25%;
  }
`;

// If you have strong feelings about dogs vs cats
// feel free to change this to always return your
// preferred furry friend
const getApiUrl = () => {
  if (Math.random() > 0.5) {
    return 'https://api.thecatapi.com/'
  } else {
    return 'https://api.thedogapi.com/'
  }
}

export const Game = () => {
  const [imagesArray, setImagesArray] = useState([]);
  const [cardsChosen, setCardsChosen] = useState([]);
  const [cardsChosenIds, setCardsChosenIds] = useState([]);
  const [turns, setTurns] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  const [openCards, setOpenCards] = useState([])

  useEffect(() => {
    const fetchImages = async () => {
      const response = await fetch(`${getApiUrl()}v1/images/search?limit=8`);
      const images = await response.json();
      const cards = [...images, ...images];
      setImagesArray(shuffle(cards));
    };

    setTurns(0);
    setGameWon(false);
    fetchImages();
  }, []);

  function flipImage(image, index) {
    if (cardsChosenIds?.length === 1 && cardsChosenIds[0] === index) {
      return;
    }

    if (cardsChosen?.length < 2) {
      setCardsChosen(cardsChosen => cardsChosen?.concat(image));
      setCardsChosenIds(cardsChosenIds => cardsChosenIds?.concat(index));

      if (cardsChosen?.length === 1) {
        setTurns(turns => turns + 1);

        setTimeout(() => {
          if (cardsChosen[0] === image) {
            setOpenCards(openCards => openCards?.concat([cardsChosen[0], image]));
          }

          setCardsChosenIds([]);
          setCardsChosen([]);
        }, 1000)
      }
    }

    if (openCards.length + 2 === imagesArray.length) {
      setGameWon(true);
    }
  }

  function isCardChosen(image, index) {
    return cardsChosenIds?.includes(index) || openCards?.includes(image)
  }

  function startOver() {
    setCardsChosenIds([])
    setCardsChosen([])
    setOpenCards([])
    setTurns(0);
    setGameWon(false);
  }

  return (
    <GameContainer>
      {imagesArray?.map((image, i) => (
        <Card
          key={i}
          image={image}
          flipped={isCardChosen(image, i)}
          onCardClick={() => flipImage(image, i)}
        />
      ))}
      <div>
        <p>Turns: {turns}</p>
        {gameWon && <p>You Won!</p>}
      </div>
      <div>
        <button onClick={startOver}>Start over</button>
      </div>
    </GameContainer>
  )
}
