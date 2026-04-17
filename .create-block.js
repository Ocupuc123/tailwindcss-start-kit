/* eslint-disable no-undef */
/* eslint-disable no-console */
import path, { resolve } from 'node:path';
import url from 'node:url';
import fs from 'node:fs';

const blocksDir = resolve(path.dirname(url.fileURLToPath(import.meta.url)), 'src/components');
const blockName = process.argv[process.argv.length - 1];

fs.mkdir(`${blocksDir}`, { recursive: true }, () => {
  let error = false;
  if (fs.existsSync(`${blocksDir}/${blockName}.twig`)) {
    error = true;
    console.log('Файл шаблона уже существует');
  } else {
    fs.writeFileSync(`${blocksDir}/${blockName}.twig`,
      `<div class='${blockName}'></div>`
    );
  }
  if (error === false) {
    console.log('Блок успешно создан');
  }
});
