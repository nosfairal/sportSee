class UserPerformance {
    constructor(performanceArray) {
        this.performances = performanceArray.map(data => ({
            kind: data.kind,
            value: data.value,
        }));
    }

    getPerformanceByKind(kind) {
        return this.performances.filter(performance => performance.kind === kind);
    }
}

export default UserPerformance;
