import React from "react";
import logo from "../assets/mdb-react.png";
import { MDBListGroup, MDBListGroupItem, MDBIcon, MDBBtn } from "mdbreact";
import { NavLink } from "react-router-dom";
import { useAuth } from "./../context/AuthContext";

const TopNavigation = () => {
  const { currentUser } = useAuth();
  if (currentUser == null) return <div></div>;
  return (
    <div className="sidebar-fixed position-fixed">
      <a href="#!" className="logo-wrapper waves-effect">
        <img alt="MDB React Logo" className="img-fluid" src={logo} />
      </a>

      <MDBListGroup className="list-group-flush">
        <NavLink exact={true} to="/" activeClassName="activeClass">
          <MDBListGroupItem>
            <MDBIcon icon="chart-pie" className="mr-3" />
            Dashboard
          </MDBListGroupItem>
        </NavLink>

        <NavLink to="/users" activeClassName="activeClass">
          <MDBListGroupItem>
            <MDBIcon icon="users" className="mr-3" />
            Users
          </MDBListGroupItem>
        </NavLink>
        <NavLink to="/forums" activeClassName="activeClass">
          <MDBListGroupItem>
            <MDBIcon icon="table" className="mr-3" />
            Forums
          </MDBListGroupItem>
        </NavLink>
        <NavLink to="/listing" activeClassName="activeClass">
          <MDBListGroupItem>
            <MDBIcon icon="list-ul" className="mr-3" />
            Listing
          </MDBListGroupItem>
        </NavLink>

        <NavLink to="/city" activeClassName="activeClass">
          <MDBListGroupItem>
            <MDBIcon icon="city" className="mr-3" />
            City
          </MDBListGroupItem>
        </NavLink>

        <NavLink to="/comments" activeClassName="activeClass">
          <MDBListGroupItem>
            <MDBIcon icon="comments" className="mr-3" />
            Comments
          </MDBListGroupItem>
        </NavLink>

        <NavLink to="/profile" activeClassName="activeClass">
          <MDBListGroupItem>
            <MDBIcon icon="user" className="mr-3" />
            Profile
          </MDBListGroupItem>
        </NavLink>
      </MDBListGroup>
    </div>
  );
};

export default TopNavigation;
