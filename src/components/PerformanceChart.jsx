import React, { useState, useEffect } from "react";
import {
    RadarChart,
    PolarGrid,
    Radar,
    PolarAngleAxis,
    ResponsiveContainer,
} from "recharts";
import styled from "styled-components";
import PropTypes from "prop-types";
import dataMock from "../services/dataMock.json";

import { getUserPerformance } from "../services/api.js";

const Container = styled.div`
	height: 263px;
	width: 258px;
	background: #282d30;
	box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.0212249);
	border-radius: 5px;
`;

/**
 * Display User performances
 */

export default function PerformanceChart({ id }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const userPerformance = await getUserPerformance(id);

                if (!userPerformance || !Array.isArray(userPerformance.performances)) {
                    console.error("performanceData is not defined or not an array.");
                    return;
                }

                const formattedData = userPerformance.performances.map(item => {
                    const kindKey = item.kind.toString();
                    const matchedUser = dataMock.USER_PERFORMANCE.find(perf => perf.userId === Number(id));
                    const kindTranslations = matchedUser ? matchedUser.kind : {};
                    if (kindTranslations && kindTranslations[kindKey]) {
                        return {
                            ...item,
                            kind: kindTranslations[kindKey].charAt(0).toUpperCase() + kindTranslations[kindKey].slice(1)
                        };
                    } else {
                        console.warn(`Kind key ${kindKey} not found in request.kind`);
                        return item;
                    }
                });

                setData(formattedData);
            } catch (error) {
                console.error("Error while fetching user performance: ", error);
            }
        };

        getData();
    }, [id]);

    return (
        <Container>
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="60%" data={data}>
                    <PolarGrid />
                    <PolarAngleAxis
                        dataKey="kind"
                        stroke="white"
                        tickLine={false}
                        tick={{ fontSize: 11 }}
                    />
                    <Radar
                        dataKey="value"
                        stroke="#FF0101"
                        fill="#FF0101"
                        fillOpacity={0.7}
                    />
                </RadarChart>
            </ResponsiveContainer>
        </Container>
    );
}

/**
 * PropTypes: String is required
 */
PerformanceChart.propTypes = {
    id: PropTypes.string.isRequired,
};