import { defineFeature, loadFeature } from "jest-cucumber";
import puppeteer from "puppeteer";

const feature = loadFeature('./features/get-products.feature');

let page: puppeteer.Page;
let browser: puppeteer.Browser;

defineFeature(feature, (test) => {
    beforeAll(async () => {
        browser = process.env.GITHUB_ACTIONS
            ? await puppeteer.launch()
            : await puppeteer.launch({ headless: false, slowMo:0 });
        page = await browser.newPage();

        await page.goto("http://localhost:3000", {
            waitUntil: "networkidle0"
        })
            .catch(() => { });
    });

    test("A user enters the webpage", ({ given, when, then }) => {
        given("Homepage", async () => {
        });

        when("I click one product", async () => {
            await page.goto("http://localhost:3000/Details?id=1");
            expect(page.url()).toContain("/Details?id=1");
            await delay(1000);
        });

        then("Product details are displayed", async () => {
            const text = await page.evaluate(() => document.body.textContent);
            expect(text).toContain("Vans Checkerboard Old Skool Stacked");
            expect(text).toContain("Color");
            expect(text).toContain("Tallas disponibles");
        });
    });

    afterAll(async () => {
        browser.close();
    });

    function delay(time: number) {
        return new Promise(function (resolve) {
            setTimeout(resolve, time);
        })
    }
})