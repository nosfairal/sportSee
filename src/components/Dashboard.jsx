import React, { useState, useEffect } from "react";
import styled from "styled-components";
import caloriesIcon from "../assets/icon-calories.svg";
import proteinsIcon from "../assets/icon-proteins.svg";
import carbsIcon from "../assets/icon-carbs.svg";
import lipidsIcon from "../assets/icon-lipids.svg";
import { useParams } from "react-router-dom";

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
export default function Dashboard() {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const user = await getUserInfos(id);
                console.log('userInfos', getUserInfos(id));
                setData(user);
                setIsLoading(false);
            } catch (err) {
                setError(err);
                setIsLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (isLoading) {
        return <p>Chargement...</p>;
    }

    if (error) {
        return <p>Erreur lors de la récupération des données. Veuillez réessayer plus tard.</p>;
    }

    if (!data || !data.firstName || !data.keyData) {
        return <p>Données non disponibles.</p>;
    }

    const score = [
        { score: data.score || 0 },
        { score: 1 - (data.score || 0) },
    ];

    return (
        <Container>
            <Header>
                <h1>Bonjour <span>{data.firstName}</span></h1>
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
                    <KeyInfos data={data.keyData.calorieCount} unit="kCal" image={caloriesIcon} color="rgba(255, 0, 0, 0.1)" text="Calories" />
                    <KeyInfos data={data.keyData.proteinCount} unit="g" image={proteinsIcon} color="rgba(74, 184, 255, 0.1)" text="Proteines" />
                    <KeyInfos data={data.keyData.carbohydrateCount} unit="g" image={carbsIcon} color="rgba(249, 206, 35, 0.1)" text="Glucides" />
                    <KeyInfos data={data.keyData.lipidCount} unit="g" image={lipidsIcon} color="rgba(253, 81, 129, 0.1)" text="Lipides" />
                </aside>
            </ChartsContainer>
        </Container>
    );
}