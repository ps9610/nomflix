import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";

const SimilarContainer = styled.div`
  width: 30%;
  margin: 0 1.5%;
  float: left;
  font-size: 9px;
`;

const Image = styled.div`
  margin-top: 15px;
  box-sizing: border-box;
  width: 100%;
  height: 300px;
  background: url(${(props) => props.bgUrl}) no-repeat 50% 50%;
  background-size: cover;
`;

const Title = styled.span`
  padding: 10px 0;
  width: 100%;
  text-align: center;
  display: block;
  font-size: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Year = styled.span`
  margin-bottom: 10px;
  font-size: 13px;
  width: 100%;
  text-align: center;
  display: block;
  color: rgba(225, 225, 225, 0.5);
`;

const Similar = ({ id, imageUrl, title, year, isMovie = false }) => (
  <Link to={isMovie ? `/movie/${id}` : `/show/${id}`} target="_blank">
    <SimilarContainer>
      <Image
        bgUrl={
          imageUrl
            ? `https://image.tmdb.org/t/p/w300${imageUrl}`
            : require("../assets/noPosterSmall.jpg").default
        }
      />
      <Title>{title}</Title>
      <Year>{year}</Year>
    </SimilarContainer>
  </Link>
);

Similar.propTypes = {
  id: PropTypes.number,
  imageUrl: PropTypes.string,
  title: PropTypes.string.isRequired,
  year: PropTypes.string,
  isMoive: PropTypes.bool,
};
export default Similar;
