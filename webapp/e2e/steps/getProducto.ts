import { defineFeature, loadFeature } from "jest-cucumber";
import puppeteer from "puppeteer";

const feature = loadFeature("./features/getProducto.feature");

let page: puppeteer.Page;
let browser: puppeteer.Browser;

defineFeature(feature, (test) => {
    beforeAll(async () => {
        browser = process.env.GITHUB_ACTIONS
            ? await puppeteer.launch()
            : await puppeteer.launch({ headless: true });
        page = await browser.newPage();

        await page
            .goto("http://localhost:3000", {
                waitUntil: "networkidle0",
            })
            .catch(() => { });

        // await delay(1000);
    });

    test('User enters webpage', async ({ given, when, then }) => {
        given("Homepage", async () => {

        });

        when("Click product", async () => {
            await page.goto("http://localhost:3000/Details?id=1", {waitUntil:"networkidle0"});
            expect(page.url()).toContain("/Details?id=1");

            // await delay(1000);
        });

        then("Details from product", async () => {
            const texto = await page.evaluate(() => document.body.textContent);

            expect(texto).toContain("Vans Checkerboard Old Skool Stacked");
            expect(texto).toContain("Zapatillas");
            expect(texto).toContain("100");
        });
    });

    afterAll(async () => {
        browser.close()
    });
});