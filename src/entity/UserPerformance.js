class UserPerformance {
    constructor(performanceObj) {
        if (performanceObj && performanceObj.data && Array.isArray(performanceObj.data.data)) {
            const performanceData = performanceObj.data;
            this.userId = performanceData.userId;
            this.kindMapping = performanceData.kind;

            this.performances = performanceData.data.map(perf => ({
                kind: this.kindMapping[perf.kind],
                value: perf.value,
            }));
        } else {
            this.userId = null;
            this.performances = [];
        }
    }

    getPerformanceByKind(textKind) {
        return this.performances.filter(performance => performance.kind === textKind);
    }
}


export default UserPerformance;
