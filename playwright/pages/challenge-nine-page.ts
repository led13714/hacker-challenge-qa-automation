import { Page } from "@playwright/test";

export class ChallengeNine {
  readonly heading = this.page.getByRole("heading", { name: "Challenge #9: The styles are hiding our password!" });
  readonly url = "http://localhost:8000/challenges/normal/iguana.html";
  readonly passwordInput = this.page.getByPlaceholder("Enter password");
  readonly submit = this.page.getByRole("button", { name: "Submit" });
  readonly passwordImage = this.page.locator('div.password-img');

  constructor(public readonly page: Page) {}

  async openPage() {
    await this.page.goto(this.url);
    await this.page.waitForLoadState("domcontentloaded");
  }
}
