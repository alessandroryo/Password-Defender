export default class UserData {
    score;
    username;
    password;
    displayedPassword;
    revealedLetters;
    constructor() {
        this.score = 0;
        this.displayedPassword = '';
        this.revealedLetters = '';
    }
    passwordToAsterisk(count) {
        this.displayedPassword = '';
        for (let index = 0; index < count; index++) {
            this.displayedPassword += '*';
        }
        console.log(this.displayedPassword);
        return this.displayedPassword;
    }
    getScore() {
        return this.score;
    }
    setScore(score) {
        this.score = score;
    }
    getUsername() {
        return this.username;
    }
    setUsername(username) {
        this.username = username;
    }
    getPassword() {
        return this.password;
    }
    setPassword(password) {
        this.password = password;
        console.log(this.password);
        this.passwordToAsterisk(this.password.length);
    }
    getDisplayedPassword() {
        return this.displayedPassword;
    }
    setDisplayedPassword(revealCount) {
        this.displayedPassword = this.passwordToAsterisk(this.password.length - revealCount);
        for (let index = this.password.length - revealCount; index < this.password.length; index++) {
            this.revealedLetters += this.password.charAt(index);
        }
        this.displayedPassword += this.revealedLetters;
    }
}
//# sourceMappingURL=UserData.js.map