import axios from "axios";
import dataMock from "./dataMock";

/* True/false for mocking data from JSON */
const isMocked = false;
console.log("Mocked data = " + isMocked);

const instance = axios.create({ baseURL: "http://localhost:3000/user" });

/**
 * Get user infos from the API
 */
export const getUserInfos = async (id) => {
	try {
		if (isMocked === "true") {
			if (id === 12) {
				const res = dataMock.USER_MAIN_DATA[0];
				return res.data;
			} else {
				const res = dataMock.USER_MAIN_DATA[1];
				return res.data;
			}
		} else {
			const res = await instance.get(`/${id}`);
			return res.data;
		}
	} catch (e) {
		console.log(e);
	}
};

/**
 * Get user performance from the API
 */
export const getUserPerformance = async (id) => {
	try {
		if (isMocked === "true") {
			if (id === 12) {
				const res = dataMock.USER_PERFORMANCE[0];
				return res.data;
			} else {
				const res = dataMock.USER_PERFORMANCE[1];
				return res.data;
			}
		} else {
			const res = await instance.get(`/${id}/performance`);
			return res.data;
		}
	} catch (e) {
		console.log(e);
	}
};

/**
 * Get user activity from the API
 */
export const getUserActivity = async (id) => {
	try {
		if (isMocked === "true") {
			if (id === 12) {
				const res = dataMock.USER_ACTIVITY[0];
				return res.data;
			} else {
				const res = dataMock.USER_ACTIVITY[1];
				return res.data;
			}
		} else {
			const res = await instance.get(`/${id}/activity`);
			return res.data;
		}
	} catch (e) {
		console.log(e);
	}
};

/**
 * Get user average sessions from the API
 */
export const getUserAverageSessions = async (id) => {
	try {
		if (isMocked === "true") {
			if (id === 12) {
				const res = dataMock.USER_AVERAGE_SESSIONS[0];
				return res.data;
			} else {
				const res = dataMock.USER_AVERAGE_SESSIONS[1];
				return res.data;
			}
		} else {
			const res = await instance.get(`/${id}/average-sessions`);
			return res.data;
		}
	} catch (e) {
		console.log(e);
	}
};
