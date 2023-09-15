import React from 'react';
import dumbell from '../assets/icon-dumbell.svg';
import bike from '../assets/icon-bike.svg';
import meditation from '../assets/icon-meditation.svg';
import swimming from '../assets/icon-swimming.svg';
import styled from 'styled-components';

import { NavLink } from 'react-router-dom';

const Nav = styled.nav`
	position: relative;
	height: calc(100vh - 91px);
	background-color: black;
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	@media (max-width: 1025px) {
		height: 100%;
	}
`;

const LinksContainer = styled.div`
	position: absolute;
	display: flex;
	flex-direction: column;
	height: 316px;
	width: 64px;
	justify-content: space-between;
	left: 50%;
	top: 45%;
	transform: translate(-45%, -50%);
`;

const IconLink = styled(NavLink)`
	width: 64px;
	height: 64px;
	background-color: white;
	border-radius: 6px;
	display: flex;
	justify-content: center;
	align-items: center;
	img {
		width: 32px;
		height: 32px;
	}
`;

const Copyright = styled.p`
	position: absolute;
	bottom: 59px;
	left: 42%;
	color: white;
	writing-mode: vertical-rl;
	transform: rotate(180deg);
	font-weight: 500;
	font-size: 12px;
`;

export default function LeftNav() {
    return (
        <Nav>
            <LinksContainer>
                <IconLink to='#'>
                    <img src={meditation} alt='Meditation' />
                </IconLink>
                <IconLink to='#'>
                    <img src={swimming} alt='Swimming' />
                </IconLink>
                <IconLink to='#'>
                    <img src={bike} alt='Bike' />
                </IconLink>
                <IconLink to='#'>
                    <img src={dumbell} alt='Dumbell' />
                </IconLink>
            </LinksContainer>
            <Copyright>Copyright, SportSee 2020</Copyright>
        </Nav>
    );
}