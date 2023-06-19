import React, { Fragment } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faPlayCircle,
} from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { Link, NavLink } from "react-router-dom";
const index = () => {
  return (
    <Fragment>
      <Container fluid={true} className="text-center footerSection">
        <Row>
          <Col lg={3} md={6} sm={12} className="p-5 text-justify">
            <h1 className="serviceName">Follow Me</h1>
            <a className="socialLink" target={null} href="#">
              <FontAwesomeIcon icon={faFacebook} /> Facebook
            </a>
            <br />
            <a className="socialLink" href="#">
              <FontAwesomeIcon icon={faYoutube} /> YouTube
            </a>
          </Col>
          <Col lg={3} md={6} sm={12} className="p-5 text-justify">
            <h1 className="serviceName">Address</h1>
            <p className="serviceDescription">
              42,Block B,Road No:3,Surma Abasik,Akhalia,Sylhet
            </p>
            <p className="serviceDescription">
              {" "}
              <FontAwesomeIcon icon={faEnvelope} /> mahfuzul.com
            </p>
            <p className="serviceDescription">
              {" "}
              <FontAwesomeIcon icon={faPhone} /> +88017********
            </p>
          </Col>
          <Col lg={3} md={6} sm={12} className="p-5 text-justify">
            <h1 className="serviceName">Information</h1>
            <Link className="footerLink" to="/about">
              About Me
            </Link>
            <br />
            <Link className="footerLink" to="/contact">
              Contact Me
            </Link>
          </Col>
          <Col lg={3} md={6} sm={12} className="p-5 text-justify">
            <h1 className="serviceName">Legal</h1>
            <Link className="footerLink" to="/Refund">
              Refund Policy
            </Link>
            <br />
            <Link className="footerLink" to="/Terms">
              Terms And Condition
            </Link>
            <br />
            <Link className="footerLink" to="/Privacy">
              Privacy Policy
            </Link>
          </Col>
        </Row>
      </Container>

      <Container fluid={true} className="text-center copyrightSection">
        <a className="copyrightLink" href="#">
          mahfuz.com &copy; 2019-2020
        </a>
      </Container>
    </Fragment>
  );
};

export default index;
