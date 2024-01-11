import styled, { keyframes } from "styled-components";
import { AspectRatioBox } from "./AspectRatioBox";

const flipAnimation = keyframes`
  from {
    transform: rotateY(0deg);
  }
  to {
    transform: rotateY(180deg);
  }
`;

const CardWrap = styled.div`
  padding: 10px;
  transition: transform 0.3s ease-in-out; /* Add transition for the flip effect */
  transform-style: preserve-3d;

  &:hover {
    transform: scale(1.05); /* Add scaling effect on hover */
  }

  &.flipped {
    animation: ${flipAnimation} 0.6s ease-in-out; /* Apply the flipAnimation when flipped */
  }
`;

const CardInner = styled.div`
  background: linear-gradient(to right, #4f8a8b, #418684); /* Set your default gradient color */
  height: 100%;
  width: 100%;
  transition: transform 0.3s ease-in-out; /* Add transition for the flip effect */
  transform-style: preserve-3d;

  ${CardWrap}.flipped & {
    transform: rotateY(180deg);
  }

  > img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;

type CardProps = {
  image: any;
  onCardClick: () => void;
  flipped: boolean;
}

export const Card = (props: CardProps) => {
  const { image, onCardClick, flipped } = props;

  return (
    <CardWrap onClick={onCardClick} className={`${flipped ? 'flipped' : ''}`}>
      <AspectRatioBox>
        <CardInner className={`${flipped ? 'flipped' : ''}`}>
          {flipped && <img src={props.image.url} alt="Card" />}
        </CardInner>
      </AspectRatioBox>
    </CardWrap>
  )
}
