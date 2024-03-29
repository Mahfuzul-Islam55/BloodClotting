import React, { Fragment, useState } from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import "video-react/dist/video-react.css";
import { Player, BigPlayButton } from "video-react";
const Index = () => {
  const [show, setShow] = useState(false);

  const modalHandle = () => setShow(!show);

  return (
    <Fragment>
      <Container className="text-center">
        <Row>
          <Col lg={12} md={12} sm={12} className="videoCard">
            <div>
              <p className="videoTitle">How I Do</p>
              <p className="videoDes">
                First i analysis the requirement of project. According to the
                requirement i make a proper technical analysis, then i build a
                software architecture. According to the planning i start coding.
                Testing is also going on with coding. Final testing take place
                after finishing coding part. After successful implementation i
                provide 6 month free bug fixing service for corresponding
                project.
              </p>
              <p>
                <FontAwesomeIcon
                  onClick={modalHandle}
                  className="playBtn"
                  icon={faPlayCircle}
                />
              </p>
            </div>
          </Col>
        </Row>
      </Container>

      <Modal size="lg" show={show} onHide={modalHandle}>
        <Modal.Body>
          <Player>
            <source src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" />
            <BigPlayButton position="center" />
          </Player>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={modalHandle}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default Index;
