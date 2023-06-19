import React, { Fragment } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../asset/css/custom.css";
import "../../asset/css/bootstrap.min.css";
import ProjectImage from "../../asset/image/category1.jpg";
const index = () => {
  return (
    <Fragment>
      <Container className="text-center">
        <h1 className="serviceMainTitle">RECENT PROJECTS</h1>
        <Row>
          <Col sm={12} md={6} lg={4} className="p-2">
            <Card className="projectCard">
              <Card.Img variant="top" src={ProjectImage} />
              <Card.Body>
                <Card.Title className="projectCardTitle">Card Title</Card.Title>
                <Card.Text className="projectCardDes">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
                <Button variant="primary">
                  <Link className="link-style" to="/ProjectDetails">
                    Details
                  </Link>
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={12} md={6} lg={4} className="p-2">
            <Card className="projectCard">
              <Card.Img variant="top" src={ProjectImage} />
              <Card.Body>
                <Card.Title className="projectCardTitle">Card Title</Card.Title>
                <Card.Text className="projectCardDes">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
                <Button variant="primary">
                  <Link className="link-style" to="/ProjectDetails">
                    Details
                  </Link>
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={12} md={6} lg={4} className="p-2">
            <Card className="projectCard">
              <Card.Img variant="top" src={ProjectImage} />
              <Card.Body>
                <Card.Title className="projectCardTitle">Card Title</Card.Title>
                <Card.Text className="projectCardDes">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
                <Button variant="primary">
                  <Link className="link-style" to="/ProjectDetails">
                    Details
                  </Link>
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default index;
