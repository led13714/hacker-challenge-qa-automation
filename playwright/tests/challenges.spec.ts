import { createWorker } from "tesseract.js";
import { test, expect, type Page } from "@playwright/test";
import { StartPage } from "../pages/start-page";
import { ChallengeOne } from "../pages/challenge-one-page";
import { ChallengeTwo } from "../pages/challenge-two-page";
import { ChallengeThree } from "../pages/challenge-three-page";
import { ChallengeFour } from "../pages/challenge-four-page";
import { ChallengeFive } from "../pages/challenge-five-page";
import { ChallengeSix } from "../pages/challenge-six-page";
import { ChallengeSeven } from "../pages/challenge-seven-page";
import { ChallengeEight } from "../pages/challenge-eight-page";
import { ChallengeNine } from "../pages/challenge-nine-page";
import { ChallengeTen } from "../pages/challenge-ten-page";
import { CompletePage } from "../pages/complete-page";

let page: Page;
let startPage: StartPage;
let challengeOnePage: ChallengeOne;
let challengeTwoPage: ChallengeTwo;
let challengeThreePage: ChallengeThree;
let challengeFourPage: ChallengeFour;
let challengeFivePage: ChallengeFive;
let challengeSixPage: ChallengeSix;
let challengeSevenPage: ChallengeSeven;
let challengeEightPage: ChallengeEight;
let challengeNinePage: ChallengeNine;
let challengeTenPage: ChallengeTen;
let completePage: CompletePage;
let CHALLENGE_TEN_PASSWORD_URL = "http://localhost:8000/challenges/normal/jellyfish-password.json";

// force sequential test execution (limited to 1 worker)
test.describe.configure({ mode: 'serial' });

test.describe("Hacker challenge speedrun", () => {
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    startPage = new StartPage(page);
    challengeOnePage = new ChallengeOne(page);
    challengeTwoPage = new ChallengeTwo(page);
    challengeThreePage = new ChallengeThree(page);
    challengeFourPage = new ChallengeFour(page);
    challengeFivePage = new ChallengeFive(page);
    challengeSixPage = new ChallengeSix(page);
    challengeSevenPage = new ChallengeSeven(page);
    challengeEightPage = new ChallengeEight(page);
    challengeNinePage = new ChallengeNine(page);
    challengeTenPage = new ChallengeTen(page);
    completePage = new CompletePage(page);
  });

  test("First challenge", async () => {
    await startPage.openPage();
    await expect(startPage.heading).toBeVisible();

    await startPage.normalChallenge.click();
    await expect(challengeOnePage.heading).toBeVisible();

    // find and enter the hidden password
    let password = (await challengeOnePage.passwordInput.getAttribute("data-password")) ?? "NO PASSWORD FOUND";
    await challengeOnePage.passwordInput.fill(password);
    await challengeOnePage.submit.click();

    await expect(challengeTwoPage.heading).toBeVisible();
  });

  test("Second challenge", async () => {
    // enable and click button
    await challengeTwoPage.clickMe.evaluate((node) => node.removeAttribute("disabled"));
    await challengeTwoPage.clickMe.click();

    await expect(challengeThreePage.heading).toBeVisible();
  });

  test("Third challenge", async () => {
    // double click
    await challengeThreePage.heading.dblclick();

    await expect(challengeFourPage.heading).toBeVisible();
  });

  test("Fourth challenge", async () => {
    // show and click link
    // dificulty: locator for hidden element & removal of css class
    // solution: use pure JS!
    const element = await challengeFourPage.page.$("a.button-style-link.hidden");
    expect(element).toBeTruthy();

    // for the sake of inline compiler errors we have to check if element exists
    if (!element) {
      console.error("Hidden element not found.");
      return;
    }
    // remove css class "hidden"
    await element.evaluate((el) => {
      el.classList.remove("hidden");
    });

    await expect(challengeFourPage.visibleLink).toBeVisible(); //apparently always visible to playwright even with "hidden" class
    await challengeFourPage.visibleLink.click();

    await expect(challengeFivePage.heading).toBeVisible();
  });

  test("Fiveth challenge", async () => {
    let correctUrl: string;

    // get name of next challenge from attribute
    let nextChallenge = await challengeFivePage.textButton.getAttribute("data-next-animal");
    // update url of text button
    correctUrl = "/challenges/normal/" + nextChallenge + ".html";

    const button = await page.$("a.button-style-link");
    expect(button).toBeTruthy();

    // for the sake of inline compiler errors we have to check if element exists
    if (!button) {
      console.error("Button not found.");
      return;
    }
    // update href attribute of button
    // evaluate() is executed in browser's page context unlike playwright which is run in node.js context
    // we have to pass correctUrl into the evaluate context which becomes the last param of the evaluated lambda 'url'
    await button.evaluate((el, url) => {
      el.setAttribute("href", url);
    }, correctUrl);

    await challengeFivePage.textButton.click();

    await expect(challengeSixPage.heading).toBeVisible();
  });

  test("Sixth challenge", async () => {
    //  get password from local storage
    const localStorage = await challengeSixPage.page.evaluate(() => window.localStorage);
    const password = localStorage["password"];
    
    // enter password and submit
    await challengeSixPage.passwordInput.fill(password);
    await challengeSixPage.submit.click();
    
    await expect(challengeSevenPage.heading).toBeVisible();
  });
  
  test("Seventh challenge", async () => {
    // Get console log messages
    // https://stackoverflow.com/a/60075804
    let logMessage: any;
    challengeSevenPage.page.on("console", async (e) => {
      const args = await Promise.all(e.args().map((a) => a.jsonValue()));
      console.log(...args);
      logMessage = args;
    });

    // click submit 3 times
    await challengeSevenPage.submit.dblclick();
    await challengeSevenPage.submit.click();

    // enter password from console log and submit
    let password = logMessage[0].split(/\s+/).at(-1); //[ 'The password is pr3st0' ] -> 'pr3st0'
    await challengeSevenPage.passwordInput.fill(password);
    await challengeSevenPage.submit.click();

    await expect(challengeEightPage.heading).toBeVisible();
  });

  test("Eigth challenge", async () => {
    // remove blocker
    await challengeEightPage.blocker.evaluate((el) => {
      el.remove();
    });

    await expect(challengeEightPage.nextChallenge).toBeVisible();
    await challengeEightPage.nextChallenge.click();

    await expect(challengeNinePage.heading).toBeVisible();
  });

  test("Nineth challenge", async () => {
    const tesseractWorker = createWorker();
    await (await tesseractWorker).load();
    
    // reveal password image
    await challengeNinePage.passwordImage.evaluate((el) => {
      el.style.visibility = "visible";
    });
    await expect(challengeNinePage.passwordImage).toBeVisible();

    // take screenshot from website
    await challengeNinePage.page.screenshot({ path: "revealed_image_with_password.png" });

    // use Tesseract worker to recognize the text that is displayed on the website
    // https://github.com/tesseract-ocr/tesseract
    const {
      data: { text },
    } = await (await tesseractWorker).recognize("revealed_image_with_password.png");
    console.log("### Recognized text on website:\n", text);
    expect(text).not.toEqual("");

    // extract the password from the text
    const extractedPassword = getStatedPasswordIn(text);
    console.log("### Extracted password using OCR:\n", extractedPassword);
    expect(extractedPassword).not.toEqual("");

    // fill in password and proceed
    await challengeNinePage.passwordInput.fill(extractedPassword);
    await challengeNinePage.submit.click();

    await expect(challengeTenPage.heading).toBeVisible();
  });

  test("Tenth challenge", async ({ request }) => {
    // make api requests to get password -> 'jellyfish-password'
    const response = await request.get(CHALLENGE_TEN_PASSWORD_URL);
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    const password = responseBody["password"];

    // fill in password and proceed
    await challengeTenPage.passwordInput.fill(password);
    await challengeTenPage.submit.click();

    await expect(completePage.congratulations).toBeVisible();
  });

  test.afterAll(async () => {
    await page.close();
  });
});

function getStatedPasswordIn(text: string) {
  const regex = /the password is\s+(.+)/i;
  const match = text.match(regex);

  if (match && match[1]) {
    const wordsAfterPassword = match[1].trim().split(/\s+/);
    const resultString = wordsAfterPassword.join(" ");
    return resultString;
  }

  return "";
}
