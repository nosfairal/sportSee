import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import styled from "styled-components";
import {
    ResponsiveContainer,
    BarChart,
    Tooltip,
    XAxis,
    YAxis,
    Bar,
    CartesianGrid,
} from "recharts";
// import PropTypes from "prop-types";

import { getUserActivity } from "../services/api";
import ActivityChartTooltip from "./ActivityChartTooltip";

const Container = styled.div`
	margin-bottom: 25px;
	height: 320px;
	border-radius: 5px;
	background-color: #fbfbfb;
	box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.0212249);
	padding: 25px;
`;

const Header = styled.header`
	display: flex;
	justify-content: space-between;
	h2 {
		font-weight: 500;
		font-size: 15px;
		color: #20253a;
	}
`;

const Text = styled.p`
	font-weight: 500;
	font-size: 14px;
	color: #74798c;
	margin-left: 10px;
`;

const Dot = styled.div`
	height: 8px;
	width: 8px;
	border-radius: 50%;
	background-color: ${(props) => props.color};
	align-self: center;
	margin-left: 30px;
`;

const Legend = styled.div`
	display: flex;
	.units {
		display: flex;
	}
`;

export default function ActivityChart() {
    /**
     * Display User activity
     */
    const [data, setData] = useState([]);
    const { id } = useParams();
    useEffect(() => {
        const getData = async () => {
            try {
                const activityInstance = await getUserActivity(id);

                if (!activityInstance || !Array.isArray(activityInstance.sessions)) {
                    console.error("Activity data is not defined or not an array.");
                    return;
                }

                setData(activityInstance.sessions);
            } catch (error) {
                console.error("Error while fetching user activity: ", error);
            }
        };

        getData();
    }, [id]);

    /**
     * Data for the domains
     */
    const kgArray = data.map((el) => el.kilogram);
    const minYKg = Math.min(...kgArray) - 1;
    const maxYKg = Math.max(...kgArray) + 1;

    const calArray = data.map((el) => el.calories);
    const minYCal = Math.min(...calArray) - 20;
    const maxYCal = Math.max(...calArray) + 20;

    return (
        <Container>
            <Header>
                <h2>Activité quotidienne</h2>
                <Legend>
                    <div className="units">
                        <Dot color="#282D30" />
                        <Text>Poids (kg)</Text>
                    </div>
                    <div className="units">
                        <Dot color="#E60000" />
                        <Text>Calories brûlées (kCal)</Text>
                    </div>
                </Legend>
            </Header>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    margin={{
                        top: 50,
                    }}
                    data={data}
                    barGap={8}
                    barCategoryGap={1}
                >
                    <CartesianGrid vertical={false} strokeDasharray="2 2" />
                    <Tooltip content={<ActivityChartTooltip />} />
                    <XAxis dataKey="day" axisLine={false} tickLine={false} />
                    <YAxis
                        yAxisId="kg"
                        dataKey="kilogram"
                        orientation="right"
                        domain={[minYKg, maxYKg]}
                        tickCount={4}
                        axisLine={false}
                        tickLine={false}
                    />
                    <YAxis
                        yAxisId="cal"
                        dataKey="calories"
                        hide={true}
                        domain={[minYCal, maxYCal]}
                    />
                    <Bar
                        yAxisId="kg"
                        dataKey="kilogram"
                        fill="#282D30"
                        barSize={7}
                        radius={[50, 50, 0, 0]}
                    />
                    <Bar
                        yAxisId="cal"
                        dataKey="calories"
                        fill="#E60000"
                        barSize={7}
                        radius={[50, 50, 0, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </Container>
    );
}

/**
 * PropTypes: String is required
 */
// ActivityChart.propTypes = {
//     id: PropTypes.string.isRequired,
// };