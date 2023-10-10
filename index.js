#!/usr/bin/env node

import CachedFetch from "@11ty/eleventy-fetch";

const argv = process.argv.slice(2);
const breaches = [];

for (const name of argv) {
  try {
    const data = await CachedFetch(`https://haveibeenpwned.com/api/v3/breach/${name}`, { type: "json", duration: "1d" });
    breaches.push(data);
  } catch (err) {
    console.error(err.message);
    process.exitCode = 1;
  }
}

console.log(JSON.stringify(breaches, null, 2));
