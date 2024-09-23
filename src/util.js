import fs from 'fs';
import puppeteer from 'puppeteer';

const jsonPath = 'json';

export const readFile = async (path, filename, extension) => {
    try {
        return await fs.promises.readFile(`${path}/${filename}.${extension}`, { encoding: 'utf8' });
    } catch (e) {
        return null;
    }
};

export const readJsonFile = async (filename) => {
    try {
        return JSON.parse(await readFile(jsonPath, filename, 'json'));
    } catch (e) {
        return null;
    }
};

export const saveFile = async (path, filename, extension, data) => {
    await fs.promises.mkdir(path, { recursive: true });
    await fs.promises.writeFile(`${path}/${filename}.${extension}`, data, e => { if (e) console.log(e); });
};

export const saveJsonFile = async (filename, jsonData) => {
    await saveFile(jsonPath, filename, 'json', JSON.stringify(jsonData, null, 4));
};

export const scraper = async () => {
    const browser = await puppeteer.launch({
        headless: 'new',
        ignoreHTTPSErrors: true,
        args: ['--ignore-certificate-errors']
    });
    const page = await browser.newPage();
    return { 'browser': browser, 'page': page };
};