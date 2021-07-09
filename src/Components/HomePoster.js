import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";

const TextContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 90vh;
  background: rgba(20, 20, 20, 0.7);
  padding: 12px 0;
  width: 100%;
  font-size: 15px;
  padding: 50px 50px 0 50px;
`;

const Button = styled(Link)`
  display: inline-block;
  background: rgb(20, 20, 20);
  color: #fff;
  border: 1px solid #fff;
  opacity: 0.5;
  padding: 20px 50px;
  font-size: 20px;
  font-weight: 600;
  position: relative;
  bottom: 70px;
  margin-top: 30px;
  &:hover {
    opacity: 1;
    color: #fff;
    background: rgba(229, 9, 20, 0.4);
  }
`;

const Image = styled.div`
  width: 100vw;
  height: 90vh;
  background: url(${(props) => props.bgUrl}) no-repeat 50% 50%;
  background-size: cover;
`;

const ImageContainer = styled.div`
  position: relative;
`;

const Container = styled.div`
  position: relative;
  font-size: 9px;
`;

const Title = styled.span`
  padding-top: 8px;
  font-size: 35px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Year = styled.span`
  padding: 0 10px;
  font-size: 15px;
  margin: 7px 0;
  color: rgba(225, 225, 225, 0.5);
`;

const Rating = styled.span`
  padding-bottom: 10px;
`;

const Overview = styled.p`
  width: 40%;
  margin: 50px 0 50px 0;
  line-height: 2;
  padding-top: 8px;
  font-size: 20px;
`;

const Poster = ({
  id,
  imageUrl,
  title,
  rating,
  year,
  overview,
  isMovie = false,
}) => (
  <Container>
    <ImageContainer>
      <Image
        bgUrl={
          imageUrl
            ? `https://image.tmdb.org/t/p/original${imageUrl}`
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
        {rating} / 10
      </Rating>
      <Overview>{overview}</Overview>{" "}
      <Button to={isMovie ? `/movie/${id}` : `/show/${id}`}>
        자세히 알아보기
      </Button>
    </TextContainer>
  </Container>
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
