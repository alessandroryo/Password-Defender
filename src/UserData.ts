export default class UserData {
  // the players score
  private score: number;

  // is only used as a cosmetic
  private username: string;

  // Password is representing the players health
  private password: string;

  private displayedPassword: string;

  private revealedLetters: string;

  /**
   * Constructs a new UserData and sets the score to 0
   */
  constructor() {
    this.score = 0;
    this.displayedPassword = '';
    this.revealedLetters = '';
  }

  private passwordToAsterisk(count: number): string {
    this.displayedPassword = '';
    // console.log('password converting working');
    for (let index = 0; index < count; index++) {
      this.displayedPassword += '*';
    }
    console.log(this.displayedPassword);
    return this.displayedPassword;
  }

  /**
   *
   * @returns the players score
   */
  public getScore(): number {
    return this.score;
  }

  /**
   *
   * @param score sets the players sccore to the passed score
   */
  public setScore(score: number): void {
    this.score = score;
  }

  /**
   *
   * @returns the username
   */
  public getUsername(): string {
    return this.username;
  }

  /**
   *
   * @param username will be the new username of the user
   */
  public setUsername(username: string): void {
    this.username = username;
  }

  /**
   *
   * @returns the password
   */
  public getPassword(): string {
    return this.password;
  }

  /**
   *
   * @param password sets the password to the passed password and creates the displayedPassword
   */
  public setPassword(password: string): void {
    // console.log('test');
    this.password = password;
    this.passwordToAsterisk(this.password.length);
    // console.log(this.password);
    // console.log(this.displayedPassword);
  }

  /**
   *
   * @returns the displayedPassword
   */
  public getDisplayedPassword(): string {
    return this.displayedPassword;
  }

  /**
   * refreshes the displayedPassword when the player got damage
   *
   * @param revealCount is the number of letters that should be revealed from the password
   */
  public setDisplayedPassword(revealCount: number): void {
    this.displayedPassword = this.passwordToAsterisk(this.password.length - revealCount);
    // console.log(this.displayedPassword);
    for (
      let index = this.password.length - revealCount;
      index < this.password.length;
      index++
    ) {
      this.revealedLetters += this.password.charAt(index);
      // console.log(this.revealedLetters);
    }
    this.displayedPassword += this.revealedLetters;
    // console.log(this.displayedPassword);
  }
}
