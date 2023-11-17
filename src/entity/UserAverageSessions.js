class UserAverageSessions {
    constructor(sessionData) {
        this.userId = sessionData.userId;
        this.sessions = sessionData.data.sessions.map(session => ({
            day: session.day,
            sessionLength: session.sessionLength,
        }));
    }

    getAverageSessionLength() {
        const total = this.sessions.reduce((acc, session) => acc + session.sessionLength, 0);
        return total / this.sessions.length;
    }

    getSessionByDay(day) {
        return this.sessions.find(session => session.day === day);
    }
}

export default UserAverageSessions;
