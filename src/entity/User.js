class User {
    constructor(data) {
        this.id = data.id;
        this.firstName = data.userInfos.firstName;
        this.lastName = data.userInfos.lastName;
        this.age = data.userInfos.age;
        this.score = data.score || data.todayScore;
        this.keyData = data.keyData;
    }

    getFullName() {
        return `${this.firstName} ${this.lastName}`;
    }

    getCalorieCount() {
        return this.keyData.calorieCount;
    }
}

export default User;
