import React, { Fragment } from "react";
import { Col, Container, Row } from "react-bootstrap";
import graphicsLogo from "../../asset/image/graphics.svg";
import webLogo from "../../asset/image/web.svg";
import mobileLogo from "../../asset/image/mobile.svg";
const Service = () => {
  return (
    <Fragment>
      <Container className="text-center">
        <h1 className="serviceMainTitle">MY SERVICES</h1>
        <Row>
          <Col lg={4} md={6} sm={12}>
            <div className="serviceCard text-center">
              <img src={webLogo} alt="" />
              <h2 className="serviceName">Web Development</h2>
              <p className="serviceDescription">
                I design and develop static and dynamic web sites as per your
                requirements as we believe, “web is world’s next home”.
              </p>
            </div>
          </Col>

          <Col lg={4} md={6} sm={12}>
            <div className="serviceCard text-center ">
              <img src={mobileLogo} alt="" />
              <h2 className="serviceName">Mobile Development</h2>
              <p className="serviceDescription">
                I build native and cross platfrom mobile app for your business
                and instiution as per as your requirements.
              </p>
            </div>
          </Col>

          <Col lg={4} md={6} sm={12}>
            <div className="serviceCard text-center">
              <img src={graphicsLogo} alt="" />
              <h2 className="serviceName">Graphics Design</h2>
              <p className="serviceDescription">
                I desing modern user interface and other graphical components
                for your business and instiution.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Service;
