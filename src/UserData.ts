export default class UserData {
  // the players score
  private score: number;

  // is only used as a cosmetic
  private username: string;

  // Password is representing the players health
  private password: string;

  private displayedPassword: string;

  /**
   * Constructs a new UserData and sets the score to 0
   */
  constructor() {
    this.score = 0;
  }

  private passwordToAsterisk(): void {
    for (let index = 0; index < this.password.length; index++) {
      // console.log('password converting working');
      this.displayedPassword += '*';
    }
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
    this.password = password;
    this.passwordToAsterisk();
  }

  /**
   *
   * @returns the displayedPassword
   */
  public getDisplayedPassword(): string {
    return this.displayedPassword;
  }

  /**
   * TODO Logic to determine new password;
   *
   * @param displayedPassword sets the displayedPassword to the passed string
   */
  public setDisplayedPassword(displayedPassword: string): void {
    this.displayedPassword = displayedPassword;
  }

  
}
