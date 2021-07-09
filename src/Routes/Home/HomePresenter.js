import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import Loader from "Components/Loader";
import Message from "Components/Message";
import HomePoster from "Components/HomePoster";
import Slider from "react-slick";
import "../../../src/slick.css";
import "../../../src/slick-theme.css";

const Container = styled.div``;

const MoviePresenter = ({ settings, trend, error, loading }) => (
  <>
    <Helmet>
      <title>홈 | Nomflix</title>
    </Helmet>
    {loading ? (
      <Loader />
    ) : (
      <Container>
        {trend && trend.length > 0 && (
          <Slider {...settings}>
            {trend.map((trend) => (
              <HomePoster
                key={trend.id}
                id={trend.id}
                title={trend.title ? trend.title : trend.name}
                imageUrl={trend.backdrop_path}
                rating={trend.vote_average}
                overview={trend.overview ? trend.overview : "🚫준비중입니다🚫"}
                year={trend.release_date && trend.release_date.substring(0, 4)}
                isMovie={trend.title ? true : false}
              />
            ))}
          </Slider>
        )}
        {error && <Message color="#fff" text={error} />}
      </Container>
    )}
  </>
);

MoviePresenter.propTypes = {
  trend: PropTypes.array,
  settings: PropTypes.object,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
};

export default MoviePresenter;
