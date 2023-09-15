import React from "react";
import logo from "../assets/logo.svg";
import styled from "styled-components";

import { NavLink } from "react-router-dom";

const CustomHeader = styled.header`
	display: flex;
	width: 100%;
	height: 91px;
	background-color: black;
	padding: 0 87px 0 29px;
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	img {
		width: 178px;
		margin-right: 150px;
		@media (max-width: 1025px) {
			margin-right: 70px;
		}
	}
`;

const Nav = styled.nav`
	width: 80%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	a {
		color: white;
		font-weight: 500;
		font-size: 24px;
	}
`;

export default function Header() {
    return (
        <CustomHeader className="page-header">
            <img src={logo} alt="Logo SportSee" />
            <Nav>
                <NavLink to="#">Accueil</NavLink>
                <NavLink to="#">Profil</NavLink>
                <NavLink to="#">Réglages</NavLink>
                <NavLink to="#">Communauté</NavLink>
            </Nav>
        </CustomHeader>
    );
}