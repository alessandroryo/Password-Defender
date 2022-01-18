export default class UserData {
    vault;
    score;
    username;
    password;
    displayedPassword;
    revealedLetters;
    revealCount;
    constructor() {
        this.score = 0;
        this.displayedPassword = '';
        this.revealedLetters = '';
        this.revealCount = 0;
        this.vault = 0;
    }
    passwordToAsterisk(count) {
        this.displayedPassword = '';
        for (let index = 0; index < count; index++) {
            this.displayedPassword += '*';
        }
        return this.displayedPassword;
    }
    getScore() {
        return this.score;
    }
    addScore(score) {
        this.score += score;
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
        this.displayedPassword = this.passwordToAsterisk(this.password.length);
    }
    getDisplayedPassword() {
        return this.displayedPassword;
    }
    revealDisplayedPassword(revealCount) {
        this.displayedPassword = this.passwordToAsterisk(this.password.length - revealCount);
        this.revealedLetters = '';
        for (let index = this.password.length - revealCount; index < this.password.length; index++) {
            this.revealedLetters += this.password.charAt(index);
        }
        this.displayedPassword += this.revealedLetters;
    }
}
//# sourceMappingURL=UserData.js.map