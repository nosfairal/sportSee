import React from "react";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.div`
	position: relative;
	height: 263px;
	width: 258px;
	background: #fbfbfb;
	box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.0212249);
	border-radius: 5px;
	h2 {
		position: absolute;
		top: 25px;
		left: 30px;
		font-weight: 500;
		font-size: 15px;
	}
`;

const Objective = styled.p`
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	color: rgba(0, 0, 0, 0.65);
	font-weight: 500;
	text-align: center;
	line-height: 26px;
	span {
		color: rgba(0, 0, 0, 0.8);
		font-weight: 700;
		font-size: 26px;
	}
`;

const InnerCircle = styled.div`
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	width: 57%;
	height: 57%;
	border-radius: 50%;
	background-color: white;
`;

export default function ScoreChart({ score }) {
    /**
     * Display User score
     */
    if (score.length === 0) {
        return null;
    }

    return (
        <Container>
            <h2>Score</h2>
            <InnerCircle />
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={score}
                        dataKey="score"
                        innerRadius={73}
                        outerRadius={85}
                        startAngle={90}
                    >
                        {score.map((entry, index) => {
                            if (index === 0) {
                                return (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill="#FF0000"
                                        cornerRadius={10}
                                    />
                                );
                            }
                            return (
                                <Cell
                                    key={`cell-${index}`}
                                    stroke="transparent"
                                    fill="transparent"
                                />
                            );
                        })}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
            <Objective>
                <span>{score[0].score * 100}%</span> <br /> de votre <br />
                objectif
            </Objective>
        </Container>
    );
}

/**
 * PropTypes: array is required
 */
ScoreChart.propTypes = {
    score: PropTypes.array.isRequired,
};