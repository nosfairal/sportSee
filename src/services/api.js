import axios from "axios";
import dataMock from "./dataMock.json";

/* True/false for mocking data from JSON */
const isMocked = true;
console.log("Mocked data = " + isMocked);

const instance = axios.create({ baseURL: "http://localhost:3000/user" });

/**
 * Get user infos from the API
 */
export const getUserInfos = async (id) => {
	try {
		if (isMocked) {
			const user = dataMock.USER_MAIN_DATA.find(user => user.id === Number(id));

			return user || null;
		} else {
			const res = await instance.get(`/${id}`);
			return res.data;
		}
	} catch (e) {
		console.error("Error fetching user info:", e);
	}
};

/**
 * Get user performance from the API
 */
export const getUserPerformance = async (id) => {
	try {
		if (isMocked) {
			const performance = dataMock.USER_PERFORMANCE.find(perf => perf.userId === Number(id));
			return performance || null;
		} else {
			const res = await instance.get(`/${id}/performance`);
			return res.data;
		}
	} catch (e) {
		console.error("Error fetching user performance:", e);
	}
};

/**
 * Get user activity from the API
 */
export const getUserActivity = async (id) => {
	try {
		if (isMocked) {
			const activity = dataMock.USER_ACTIVITY.find(act => act.userId === Number(id));
			return activity || null;
		} else {
			const res = await instance.get(`/${id}/activity`);
			return res.data;
		}
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
			const avgSessions = dataMock.USER_AVERAGE_SESSIONS.find(sess => sess.userId === Number(id));
			return avgSessions || null;
		} else {
			const res = await instance.get(`/${id}/average-sessions`);
			return res.data;
		}
	} catch (e) {
		console.error("Error fetching user average sessions:", e);
	}
};
