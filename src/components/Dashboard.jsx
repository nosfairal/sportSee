import React, { useState, useEffect } from "react";
import styled from "styled-components";
import caloriesIcon from "../assets/icon-calories.svg";
import proteinsIcon from "../assets/icon-proteins.svg";
import carbsIcon from "../assets/icon-carbs.svg";
import lipidsIcon from "../assets/icon-lipids.svg";
import PropTypes from "prop-types";

import { getUserInfos } from "../services/api";
import PerformanceChart from "./PerformanceChart";
import AverageSessionsChart from "./AverageSessionsChart";
import ScoreChart from "./ScoreChart";
import ActivityChart from "./ActivityChart";
import KeyInfos from "./KeyInfos";

const Container = styled.main`
	justify-self: center;
	margin-top: 60px;
	@media (max-width: 1025px) {
		margin-top: 25px;
		width: 90%;
	}
`;

const Header = styled.header`
	margin-bottom: 65px;
	h1 {
		font-weight: 500;
		font-size: 48px;
		span {
			color: #ff0000;
		}
	}
	p {
		font-size: 18px;
	}
	@media (max-width: 1025px) {
		margin-bottom: 30px;
	}
`;

const ChartsContainer = styled.div`
	display: flex;
	> div {
		display: flex;
		flex-direction: column;
		margin-right: 20px;
		width: 835px;
	}
	aside {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	@media (max-width: 1025px) {
		flex-direction: column;
		> div {
			margin-right: 0;
		}
		aside {
			flex-direction: row;
			flex-wrap: wrap;
			width: 835px;
		}
	}
`;

const SmallChartsContainer = styled.div`
	display: flex;
	justify-content: space-between;
`;

/**
 * Display User infos and datas
 */
export default function Dashboard({ match }) {
    const [data, setData] = useState([]);
    const [score, setScore] = useState([]);
    const { userInfos, keyData } = data;
    const id = match.params.id;
    useEffect(() => {
        const getData = async () => {
            const request = await getUserInfos(id);
            setData(request.data);
            setScore([
                { score: request.data.todayScore || request.data.score },
                {
                    score:
                        1 - request.data.todayScore || 1 - request.data.score,
                },
            ]);
        };
        getData();
    }, [id]);

    /**
     * Catch if return null
     */

    if (data.length === 0) return null;

    return (
        <Container>
            <Header>
                <h1>
                    Bonjour <span>{userInfos.firstName}</span>
                </h1>
                <p>Félicitations ! Vous avez explosé vos objectifs hier 👏</p>
            </Header>
            <ChartsContainer>
                <div>
                    <ActivityChart id={id} />
                    <SmallChartsContainer>
                        <AverageSessionsChart id={id} />
                        <PerformanceChart id={id} />
                        <ScoreChart id={id} score={score} />
                    </SmallChartsContainer>
                </div>
                <aside>
                    <KeyInfos
                        data={keyData.calorieCount}
                        unit="kCal"
                        image={caloriesIcon}
                        color="rgba(255, 0, 0, 0.1)"
                        text="Calories"
                    />
                    <KeyInfos
                        data={keyData.proteinCount}
                        unit="g"
                        image={proteinsIcon}
                        color="rgba(74, 184, 255, 0.1)"
                        text="Proteines"
                    />
                    <KeyInfos
                        data={keyData.carbohydrateCount}
                        unit="g"
                        image={carbsIcon}
                        color="rgba(249, 206, 35, 0.1)"
                        text="Glucides"
                    />
                    <KeyInfos
                        data={keyData.lipidCount}
                        unit="g"
                        image={lipidsIcon}
                        color="rgba(253, 81, 129, 0.1)"
                        text="Lipides"
                    />
                </aside>
            </ChartsContainer>
        </Container>
    );
}

/**
 * PropTypes : Object is required
 */
Dashboard.propTypes = {
    match: PropTypes.object.isRequired,
};