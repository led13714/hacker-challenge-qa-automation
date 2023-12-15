import { Page } from "@playwright/test";

export class StartPage {
  readonly heading = this.page.getByRole("heading", { name: "Hacker Challenge", exact: true });
  readonly normalChallenge = this.page.getByRole('link', { name: 'Start normal challenge mode' });
  readonly hardChallenge = this.page.getByRole('link', { name: 'Start hard challenge mode' });
  readonly url = "http://localhost:8000/";

  constructor(public readonly page: Page) {}

  async openPage() {
    await this.page.goto(this.url);
    await this.page.waitForLoadState('domcontentloaded');
  }
}
