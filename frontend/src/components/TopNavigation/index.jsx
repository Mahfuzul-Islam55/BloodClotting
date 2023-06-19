import React, { useEffect, useState, Fragment } from "react";
import whiteLogo from "../../asset/image/navlogo.svg";
import blueLogo from "../../asset/image/navlogoScroll.svg";
import { Nav, Navbar } from "react-bootstrap";
import "../../asset/css/custom.css";
import "../../asset/css/bootstrap.min.css";
import { NavLink } from "react-router-dom";

const Top = () => {
  const [navItem, setNavItem] = useState({
    navBarTitle: "navTitle",
    navBarLogo: [whiteLogo],
    navVariant: "dark",
    navBarBack: "navBackground",
    navBarItem: "navItem",
    pageTitle: "Open Health AI",
  });

  const onScroll = () => {
    if (window.scrollY > 100) {
      setNavItem({
        navVariant: "light",
        navBarTitle: "navTitleScroll",
        navBarLogo: [blueLogo],
        navBarBack: "navBackgroundScroll",
        navBarItem: "navItemScroll",
      });
    } else if (window.scrollY < 100) {
      setNavItem({
        navVariant: "dark",
        navBarTitle: "navTitle",
        navBarLogo: [whiteLogo],
        navBarBack: "navBackground",
        navBarItem: "navItem",
      });
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", onScroll);
  }, []);
  return (
    <Fragment>
      <title>{navItem.pageTitle}</title>
      <Navbar
        variant={navItem.navVariant}
        className={navItem.navBarBack}
        fixed="top"
        collapseOnSelect
        expand="lg"
      >
        <Navbar.Brand>
          <NavLink className={navItem.navBarTitle} to="/">
            <img src={navItem.navBarLogo} alt="" />
            Mahfuzul Islam
          </NavLink>{" "}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto"></Nav>
          <Nav>
            <Nav.Link>
              {" "}
              <NavLink
                exact
                activeStyle={{ color: "#00a8ee" }}
                className={navItem.navBarItem}
                to="/"
              >
                HOME
              </NavLink>
            </Nav.Link>
            <Nav.Link>
              {" "}
              <NavLink
                exact
                activeStyle={{ color: "#00a8ee" }}
                className={navItem.navBarItem}
                to="/service"
              >
                SERVICES
              </NavLink>
            </Nav.Link>
            <Nav.Link>
              {" "}
              <NavLink
                exact
                activeStyle={{ color: "#00a8ee" }}
                className={navItem.navBarItem}
                to="/course"
              >
                COURSES
              </NavLink>
            </Nav.Link>
            <Nav.Link>
              {" "}
              <NavLink
                exact
                activeStyle={{ color: "#00a8ee" }}
                className={navItem.navBarItem}
                to="/portfolio"
              >
                PORTFOLIO
              </NavLink>
            </Nav.Link>
            <Nav.Link>
              {" "}
              <NavLink
                exact
                activeStyle={{ color: "#00a8ee" }}
                className={navItem.navBarItem}
                to="/contact"
              >
                CONTACT
              </NavLink>
            </Nav.Link>
            <Nav.Link>
              {" "}
              <NavLink
                exact
                activeStyle={{ color: "#00a8ee" }}
                className={navItem.navBarItem}
                to="/about"
              >
                ABOUT
              </NavLink>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Fragment>
  );
};

export default Top;
