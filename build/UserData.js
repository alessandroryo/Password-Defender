export default class UserData {
    score;
    username;
    password;
    displayedPassword;
    constructor() {
        this.score = 0;
    }
    passwordToAsterisk() {
        for (let index = 0; index < this.password.length; index++) {
            this.displayedPassword += '*';
        }
    }
    getScore() {
        return this.score;
    }
    setScore(score) {
        this.score = score;
    }
    getPassword() {
        return this.password;
    }
    setPassword(password) {
        this.password = password;
        this.passwordToAsterisk();
    }
    getDisplayedPassword() {
        return this.displayedPassword;
    }
    setDisplayedPassword(displayedPassword) {
        this.displayedPassword = displayedPassword;
    }
}
//# sourceMappingURL=UserData.js.map