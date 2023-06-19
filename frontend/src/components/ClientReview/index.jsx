import React, { Fragment } from "react";

import Slider from "react-slick";
import { Col, Container, Row } from "react-bootstrap";
import ProjectImage from "../../asset/image/category1.jpg";
const index = () => {
  var settings = {
    autoplaySpeed: 3000,
    autoplay: true,
    dots: true,
    infinite: true,
    speed: 3000,
    vertical: true,
    verticalSwiping: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Fragment>
      <Container className="text-center">
        <h1 className="serviceMainTitle">CLIENT SAYS</h1>
        <Slider {...settings}>
          <div>
            <Row className="text-center justify-content-center">
              <Col lg={6} md={6} sm={12}>
                <img className="circleImg" src={ProjectImage} alt="" />
                <h1 className="serviceName">Web Development</h1>
                <p className="serviceDescription">
                  I analys the requirement of project. According to the
                  requirement i make a proper technical analysis, then i build a
                  software architecture. According to the planning i start
                  coding
                </p>
              </Col>
            </Row>
          </div>

          <div>
            <Row className="text-center justify-content-center">
              <Col lg={6} md={6} sm={12}>
                <img className="circleImg" src={ProjectImage} alt="" />
                <h1 className="serviceName">Web Development</h1>
                <p className="serviceDescription">
                  I analys the requirement of project. According to the
                  requirement i make a proper technical analysis, then i build a
                  software architecture. According to the planning i start
                  coding
                </p>
              </Col>
            </Row>
          </div>

          <div>
            <Row className="text-center justify-content-center">
              <Col lg={6} md={6} sm={12}>
                <img className="circleImg" src={ProjectImage} alt="" />
                <h1 className="serviceName">Web Development</h1>
                <p className="serviceDescription">
                  I analys the requirement of project. According to the
                  requirement i make a proper technical analysis, then i build a
                  software architecture. According to the planning i start
                  coding
                </p>
              </Col>
            </Row>
          </div>
        </Slider>
      </Container>
    </Fragment>
  );
};

export default index;
