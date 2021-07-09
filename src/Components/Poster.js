import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";

const TextContainer = styled.div`
  padding: 7px 0;
  width: 100%;
  text-align: center;
  opacity: 0;
  background: transparent;
`;

const Image = styled.div`
  height: 300px;
  background: url(${(props) => props.bgUrl}) no-repeat 50% 50%;
  background-size: cover;
`;

const ImageContainer = styled.div``;

const Container = styled.div`
  position: relative;
  transition: transform 0.5s ease;
  width: 100%;
  font-size: 9px;
  &:hover {
    ${TextContainer} {
      opacity: 1;
    }
    transform: scale(1.5);
    z-index: 1;
    background: #000;
  }
`;

const Title = styled.span`
  display: block;
  font-size: 13px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Year = styled.span`
  display: block;
  margin: 7px 0;
  color: rgba(225, 225, 225, 0.5);
`;

const Rating = styled.span`
  margin: 0 5px;
  display: flex;
  justify-content: flex-end;
`;

const Poster = ({ id, imageUrl, title, rating, year, isMovie = false }) => (
  <Link to={isMovie ? `/movie/${id}` : `/show/${id}`}>
    <Container>
      <ImageContainer>
        <Image
          bgUrl={
            imageUrl
              ? `https://image.tmdb.org/t/p/w300${imageUrl}`
              : require("../assets/noPosterSmall.jpg").default
          }
        />
      </ImageContainer>
      <TextContainer>
        <Title>
          {title && title.length > 18 ? `${title.substring(0, 18)}...` : title}
        </Title>
        <Year>{year}</Year>
        <Rating>
          <span role="img" aria-label="rating">
            ⭐
          </span>{" "}
          {rating}/10
        </Rating>
      </TextContainer>
    </Container>
  </Link>
);

Poster.propTypes = {
  id: PropTypes.number.isRequired,
  imageUrl: PropTypes.string,
  title: PropTypes.string.isRequired,
  rating: PropTypes.number,
  year: PropTypes.string,
  isMoive: PropTypes.bool,
};
export default Poster;
