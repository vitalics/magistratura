import { launch, Browser, Page } from 'puppeteer';

let browser: Browser;
let page: Page;

describe("base test", () => {
    beforeAll(async () => {
        browser = await launch();
        page = await browser.newPage();
    })

    test("should open application", async () => {
        await page.goto('http://localhost:3000');

        expect(page.url()).toBe("http://localhost:3000");
    })
});