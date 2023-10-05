class UserActivity {
    constructor(activityData) {
        this.userId = activityData.userId;
        this.sessions = activityData.sessions.map(session => ({
            day: session.day,
            kilogram: session.kilogram,
            calories: session.calories,
        }));
    }

    getSessionByDay(day) {
        return this.sessions.find(session => session.day === day);
    }
}

export default UserActivity;