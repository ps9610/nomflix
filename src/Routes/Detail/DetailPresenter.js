import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import Loader from "Components/Loader";
import Message from "Components/Message";
import YouTube from "react-youtube";
import { Link } from "react-router-dom";
import Similar from "Components/Similar";

const Container = styled.div`
  margin-top: 10px; //height: calc(166vh - 50px);
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
`;

const SimilarWrap = styled.div`
  margin-top: 20px;
  font-size: 18px;
  height: 80vh;
  overflow: scroll;
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(229, 9, 20, 0.4);
    border-radius: 6px;
  }
`;

const Backdrop = styled.div`
  width: 100vw;
  height: 100vh;
  background: url(${(props) => props.bgImage}) no-repeat center center;
  background-size: cover;
  z-index: 0;
  opacity: 0.2;
`;

const YouTubes = styled(YouTube)`
  display: block;
  width: 100vw;
  height: 100vh;
`;

const opts = {
  playerVars: {
    autoplay: 1,
    mute: 1,
    loop: 1,
  },
};

const Content = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 1;
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  padding: 50px;
`;

const Data = styled.div`
  width: 60%;
  button {
    border: 0;
    font-size: 15px;
    font-weight: bold;
    text-align: left;
  }
`;

const Title = styled.h1`
  font-size: 35px;
  margin: 30px 0 50px 0;
`;

const ItemLeft = styled.div`
  width: 60%;
  float: left;
`;

const ItemRight = styled.div`
  margin-left: 3%;
  width: 37%;
  float: right;
`;

const Item1 = styled.span`
  font-size: 16px;
  line-height: 1.4;
  button {
    border: 0;
    transition: all 0.3s linear;
    &:hover {
      background-color: #010101;
      color: #e50914;
    }
  }
`;

const Item2 = styled.span`
  display: block;
  font-size: 16px;
  margin: 10px 0;
  line-height: 1.4;
`;

const Divider = styled.span`
  margin: 0 3px;
`;

const Overview = styled.p`
  margin: 10px 0;
  font-size: 20px;
  line-height: 2;
`;

const DetailPresenter = ({ result, keywords, similar, error, loading }) =>
  loading ? (
    <>
      <Helmet>
        <title>로딩 중 | Nomfilx</title>
      </Helmet>
      <Loader />
    </>
  ) : error ? (
    <Message />
  ) : (
    <Container>
      <Helmet>
        <title>
          {result.original_title ? result.original_title : result.original_name}
          {"  "}| Nomfilx
        </title>
      </Helmet>
      <YouTubes
        opts={opts}
        videoId={
          result.videos.results &&
          result.videos.results.map((video) => video.key).shift()
        }
      />
      <Backdrop
        bgImage={
          result.backdrop_path
            ? `https://image.tmdb.org/t/p/original${result.backdrop_path}`
            : require("../../assets/noBgOriginal.png").default
        }
      />
      <Content>
        <Data>
          <Title>{result.title ? result.title : result.name}</Title>
          <ItemLeft>
            <Item1>
              {(result.release_date && result.release_date.substring(0, 4)) ||
                (result.last_air_date && result.last_air_date.substring(0, 4))}
            </Item1>
            <Divider>{"  "}</Divider>
            <Item1>
              {(result.runtime && `${result.runtime}분`) ||
                (result.number_of_seasons &&
                  `시즌 ${result.number_of_seasons}개`)}
            </Item1>
            <Divider>{"  "}</Divider>
            <Item1>
              {result.production_countries &&
                result.production_countries.map((country, index) =>
                  index === 0 ? country.name : `${""}`
                )}
            </Item1>
            <Divider>{"  "}</Divider>
            <Item1>
              {result.imdb_id ? (
                <button>
                  <a
                    href={`https://www.imdb.com/title/${result.imdb_id}`}
                    target="_blank"
                  >
                    IMDB
                  </a>
                </button>
              ) : (
                <button>
                  <Link to="/tv">IMDB❌</Link>
                </button>
              )}
            </Item1>
            <Overview>
              {result.overview
                ? result.overview
                : "🚫상세정보를 준비중입니다🚫"}
            </Overview>
          </ItemLeft>
          <ItemRight>
            <Item2>
              장르 :{"  "}
              {keywords.length > 0
                ? result.genres &&
                  result.genres.map((genre, index) =>
                    index === result.genres.length - 1
                      ? genre.name
                      : `${genre.name}, `
                  )
                : "🚫준비중🚫"}
            </Item2>
            <Item2>
              키워드 : {"  "}
              {keywords.length > 0
                ? keywords.map((keyword, index) =>
                    index === keywords.length - 1
                      ? keyword.name
                      : `${keyword.name.length < 10 ? keyword.name + ", " : ""}`
                  )
                : "🚫준비중🚫"}
            </Item2>
            <Item2>
              제작사 : {"  "}
              {result.production_companies &&
                result.production_companies.map((company, index) =>
                  index === result.production_companies.length - 1
                    ? company.name
                    : `${company.name.legnth < 10 ? company.name + "," : ""} `
                )}
            </Item2>
          </ItemRight>
        </Data>
        <SimilarWrap>
          <Title>비슷한 콘텐츠</Title>
          {similar.length > 0
            ? similar.map((similars) => (
                <Similar
                  key={similars.id}
                  id={similars.id}
                  isMovie={similars.title ? true : false}
                  title={similars.title ? similars.title : similars.name}
                  imageUrl={similars.poster_path}
                  year={
                    (similars.release_date &&
                      similars.release_date.substring(0, 4)) ||
                    (similars.first_air_date &&
                      similars.first_air_date.substring(0, 4))
                  }
                />
              ))
            : `🚫콘텐츠를 준비중입니다🚫`}
        </SimilarWrap>
      </Content>
    </Container>
  );

DetailPresenter.propTypes = {
  result: PropTypes.object,
  keywords: PropTypes.array,
  similar: PropTypes.array,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
};

export default DetailPresenter;
