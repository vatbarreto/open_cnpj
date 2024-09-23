// import { createWriteStream } from "fs";
// import { Readable } from "stream";
import { saveFile, scraper } from './src/util.js';
// import { spawn } from 'child_process';

const _scraper = await scraper();
await _scraper.page.goto('https://dadosabertos.rfb.gov.br/CNPJ/dados_abertos_cnpj/2024-09/', { waitUntil: 'domcontentloaded' });
const urls = await _scraper.page.$$eval(
    'body > table > tbody > tr > td:nth-child(2) > a',
    aList => aList.map(a => a.href).filter(url => url.slice(-3) === 'zip')
);
await saveFile('./', 'urls', 'txt', urls.join('\n'));
await _scraper.page.close();
await _scraper.browser.close();


// const f = await fetch('https://dadosabertos.rfb.gov.br/CNPJ/dados_abertos_cnpj/2024-09/Empresas0.zip');
// if (f.ok && f.body) {
//     const writer = createWriteStream('teste.zip');
//     Readable.fromWeb(f.body).pipe(writer);
// }