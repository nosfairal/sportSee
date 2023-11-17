import axios from "axios";
import dataMock from "./dataMock.json";
import User from "../entity/User";
import UserPerformance from "../entity/UserPerformance";
import UserActivity from "../entity/UserActivity";
import UserAverageSessions from '../entity/UserAverageSessions';

/* True/false for mocking data from JSON */
export const isMocked = true;
console.log("Mocked data = " + isMocked);


const baseURL = `http://localhost:3000/user`;

const instance = axios.create({ baseURL: baseURL });

/**
 * Get user infos from the API
 */
export const getUserInfos = async (id) => {
	try {
		let userData;

		if (isMocked) {
			const mockedData = dataMock.USER_MAIN_DATA.find(user => user.id === Number(id));
			console.log("Mocked User Data:", userData);
			userData = { data: mockedData };
		} else {
			const res = await instance.get(`${id}`);
			userData = res.data;
			console.log(userData);
		}

		return userData ? new User(userData) : null;

	} catch (e) {
		alert("Erreur lors de la récupération des informations de l'utilisateur. Veuillez réessayer.");
		console.error("Error fetching user info:", e);
	}
};

/**
 * Get user performance from the API
 */
export const getUserPerformance = async (id) => {
	try {
		let performanceData;

		if (isMocked) {
			const matchedUser = dataMock.USER_PERFORMANCE.find(perf => perf.userId === Number(id));
			performanceData = matchedUser ? { data: matchedUser } : null;
		} else {
			const res = await instance.get(`/${id}/performance`);
			performanceData = res.data;
			console.log('performance', performanceData);
		}

		return performanceData ? new UserPerformance(performanceData) : null;

	} catch (e) {
		alert("Erreur lors de la récupération des performances de l'utilisateur. Veuillez réessayer.");
		console.error("Error fetching user performance:", e);
	}
}


/**
 * Get user activity from the API
 */
export const getUserActivity = async (id) => {
	try {
		let activityData;

		if (isMocked) {
			const matchUser = dataMock.USER_ACTIVITY.find(act => act.userId === Number(id));
			activityData = { data: matchUser };
		} else {
			const res = await instance.get(`/${id}/activity`);
			activityData = res.data;
		}

		return activityData ? new UserActivity(activityData) : null;

	} catch (e) {
		console.error("Error fetching user activity:", e);
	}
};

/**
 * Get user average sessions from the API
 */
export const getUserAverageSessions = async (id) => {
	try {
		if (isMocked) {
			const avgSessionsData = dataMock.USER_AVERAGE_SESSIONS.find(sess => sess.userId === Number(id));
			return avgSessionsData ? new UserAverageSessions({ data: avgSessionsData }) : null;
		} else {
			const res = await instance.get(`/${id}/average-sessions`);
			console.log('activité', res.data)
			return new UserAverageSessions(res.data);
		}
	} catch (e) {
		console.error("Error fetching user average sessions:", e);
	}
};