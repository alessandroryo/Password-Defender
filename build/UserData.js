export default class UserData {
    vault;
    score;
    level;
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
        this.level = 1;
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
    static changeVaultValue(value) {
        const newValue = value + UserData.getVaultValue();
        console.log(newValue);
        localStorage.setItem('vault', newValue.toString());
    }
    static getVaultValue() {
        let x = 0;
        const vault = localStorage.getItem('vault');
        x = parseFloat(vault);
        return x;
    }
    getLevel() {
        return this.level;
    }
    addLevel() {
        this.level += 1;
    }
}
//# sourceMappingURL=UserData.js.map