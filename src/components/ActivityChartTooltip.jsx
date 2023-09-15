import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const CustomTooltip = styled.div`
	height: 72px;
	width: 49px;
	background-color: #e60000;
	font-weight: 500;
	font-size: 10px;
	color: white;
	display: flex;
	justify-content: space-between;
	flex-direction: column;
	padding: 10px 0;
	align-items: center;
`;

export default function ActivityChartTooltip({ active, payload }) {
    if (active) {
        return (
            <CustomTooltip>
                <p>{payload[0].value}kg</p>
                <p>{payload[1].value}kCal</p>
            </CustomTooltip>
        );
    }
    return null;
}

/**
 * PropTypes: boolean and array are required
 */
ActivityChartTooltip.propTypes = {
    active: PropTypes.bool,
    payload: PropTypes.array,
};