import React, { useEffect, useState } from "react";
import {
    ResponsiveContainer,
    LineChart,
    XAxis,
    Tooltip,
    Line,
    YAxis,
} from "recharts";
import styled from "styled-components";
import PropTypes from "prop-types";

import { getUserAverageSessions } from "../services/api";
import AverageSessionsChartTooltip from "./AverageSessionsChartTooltip";

const Container = styled.div`
	position: relative;
	width: 258px;
	height: 263px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	background: #ff0000;
	box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.0212249);
	border-radius: 5px;
`;

const Title = styled.h2`
	position: absolute;
	font-weight: 500;
	font-size: 15px;
	padding: 29px 34px 0 34px;
	color: rgba(255, 255, 255, 0.5);
`;

export default function AverageSessionsChart({ id }) {
    /**
     * Display user average sessions
     */
    const [data, setData] = useState([]);

    useEffect(() => {
        const dayMapping = {
            1: "L",
            2: "M",
            3: "M",
            4: "J",
            5: "V",
            6: "S",
            7: "D"
        };

        const getData = async () => {
            const request = await getUserAverageSessions(id);
            const formatedData = request.sessions.map(session => ({
                ...session,
                day: dayMapping[session.day] || session.day
            }));

            setData(formatedData);
        };

        getData();
    }, [id]);

    /**
     * Data for the domains
     */
    const lengthArray = data.map((el) => el.sessionLength);
    const minY = Math.min(...lengthArray) / 1.6;
    const maxY = Math.max(...lengthArray) * 1.6;

    return (
        <Container>
            <Title>Durée moyenne des sessions</Title>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <XAxis
                        axisLine={false}
                        tickLine={false}
                        dataKey="day"
                        stroke="rgba(255, 255, 255, 0.5)"
                        tick={{ fontSize: 12 }}
                        minTickGap={3}
                        padding={{ left: 10, right: 10 }}
                    />
                    <YAxis hide={true} domain={[minY, maxY]} />
                    <Line
                        dataKey="sessionLength"
                        type="monotone"
                        stroke="rgba(255, 255, 255, 0.5)"
                        strokeWidth={2}
                        dot={false}
                        activeDot={{
                            stroke: "rgba(255, 255, 255, 0.5)",
                            strokeWidth: 10,
                            r: 5,
                        }}
                    />
                    <Tooltip
                        content={<AverageSessionsChartTooltip />}
                        cursor={{
                            stroke: "rgba(0, 0, 0, 0.1)",
                            strokeWidth: 50,
                            height: "1000px",
                        }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </Container>
    );
}

/**
 * PropTypes: String is required
 */
AverageSessionsChart.propTypes = {
    id: PropTypes.string.isRequired,
};