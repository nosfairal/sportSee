class User {
    constructor(data) {
        this.id = data.data.id;
        this.firstName = data.data.userInfos.firstName;
        this.lastName = data.data.userInfos.lastName;
        this.age = data.data.userInfos.age;
        this.score = data.data.score || data.data.todayScore;
        this.keyData = data.data.keyData;
    }

    getFullName() {
        return `${this.firstName} ${this.lastName}`;
    }

    getCalorieCount() {
        return this.keyData.calorieCount;
    }
}

export default User;
