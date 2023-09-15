import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.div`
	border-radius: 5px;
	background-color: #fbfbfb;
	width: 258px;
	padding: 32px;
	display: flex;
	@media (max-width: 1025px) {
		padding: 16px;
		margin: 15px 0;
	}
`;

const IconContainer = styled.div`
	height: 60px;
	width: 60px;
	border-radius: 6px;
	background-color: ${(props) => props.color};
	display: flex;
	align-items: center;
	justify-content: center;
	margin-right: 24px;
`;

const TextContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	h3 {
		font-size: 20px;
		color: #282d30;
	}
	p {
		font-weight: 500;
		font-size: 14px;
		color: #74798c;
	}
`;

/**
 * Display user personal infos in page
 */
export default function KeyInfos({ data, unit, image, color, alt, text }) {
    return (
        <Container>
            <IconContainer color={color}>
                <img src={image} alt={alt} />
            </IconContainer>
            <TextContainer>
                <h3>
                    {data}
                    {unit}
                </h3>
                <p>{text}</p>
            </TextContainer>
        </Container>
    );
}

KeyInfos.propTypes = {
    data: PropTypes.number.isRequired,
    unit: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    alt: PropTypes.string,
    text: PropTypes.string.isRequired,
};