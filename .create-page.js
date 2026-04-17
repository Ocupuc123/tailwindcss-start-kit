/* eslint-disable no-console */
/* eslint-disable no-undef */
import path, { resolve } from 'node:path';
import url from 'node:url';
import fs from 'node:fs';

const pagesDir = resolve(path.dirname(url.fileURLToPath(import.meta.url)), 'src/pages');
const pageName = process.argv[process.argv.length - 1];

if (!pageName) {
  console.error('Error: Page name is required');
  console.log('Usage: npm run page <page-name>');
  process.exit(1);
}

try {
  fs.mkdirSync(pagesDir, { recursive: true });

  const pagePath = `${pagesDir}/${pageName}.twig`;

  if (fs.existsSync(pagePath)) {
    console.log('Template file already exists');
  } else {
    fs.writeFileSync(
      pagePath,
      `{% extends '@layouts/main.twig' %}

{% block title %}
  ${pageName}
{% endblock %}

{% block content %}
  <main>

  </main>
{% endblock %}`
    );
    console.log('Page created successfully');
  }
} catch (error) {
  console.error('Error creating page:', error.message);
  process.exit(1);
}
