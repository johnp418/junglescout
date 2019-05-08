const fs = require("fs");
const cheerio = require("cheerio");
const puppeteer = require("puppeteer");
const axios = require("axios");

// 1st
// "#detail-bullets"
// 2nd
// #prodDetails .prodDetSectionEntry
// 3rd
// #prodDetails table tr
const getCategories = $ => {
  return $("#wayfinding-breadcrumbs_feature_div ul li span a")
    .map((i, category) => {
      return $(category)
        .html()
        .trim();
    })
    .get();
};

const getProductDimension = $ => {
  let dim = $("#prodDetails table tr").children().filter((i, elem) => {
    console.log("elem ", $(elem).text());
    const text = $(elem).text();
    return text && text.indexOf("Product Dimension")
  }).next().text();
  console.log("dim ", dim)
  // $("#prodDetails table tr").filter((i, row) => {
  //   let found = false;
  //   let ans = $(row)
  //     .children()
  //     .filter((i, elem) => {
  //       let text = $(elem).text();
  //       return text && text.indexOf("Product Dimension") !== -1;
  //     })
  //     .next()
  //     .text()
  //     .trim();
  //   // .each((j, col) => {
  //   //   if
  //   //   console.log("Col ", $(col).text());
  //   // });

  //   console.log("Answer ", ans);
  // });
  // return $("#prodDetails table tr")
  //   .filter((i, row) => {
  //     const label = $(row)
  //       .find(".label")
  //       .text();
  //     return label === "Product Dimensions";
  //   })
  //   .find(".value")
  //   .text();
};
const getProductRanks = $ => {
  try {
    let str = $("#SalesRank")
      .text()
      .replace(/\n|\r/g, "");
    let match = /(#.*)/g.exec(str)[0];
    return match
      .split("#")
      .map(str => {
        let match = /^[^\(]+/g.exec(str.trim());
        return match ? match[0] : null;
      })
      .filter(Boolean);
  } catch (err) {
    return "";
  }
};

const getProductImageUrl = $ => {
  try {
    return $("#imgTagWrapperId img")
      .attr("src")
      .trim();
  } catch (err) {
    return null;
  }
};

const parse = html => {
  const $ = cheerio.load(html);

  const categories = getCategories($);
  const dimension = getProductDimension($);
  const ranks = getProductRanks($);
  const imageUrl = getProductImageUrl($);
  // console.log("getCategories ", categories);
  // console.log("getProductDimension", dimension);
  // console.log("getProductRanks ", ranks);
  // console.log("getProductImageUrl ", imageUrl);

  const category = categories[0];
  const rank = ranks[0];
  return {
    category,
    rank,
    dimension,
    imageUrl
  };
};

// const browser = await puppeteer.launch();
// const page = await browser.newPage();
// await page.goto(`https://www.amazon.com/dp/${ASIN}`, {
//   // Waits for network to be idle so that the page injects html
//   waitUntil: "networkidle0"
// });
// const bodyHTML = await page.evaluate(() => document.body.innerHTML);
// // const result = parse(bodyHTML);

const scrape = async ASIN => {
  console.log("Scraping ", ASIN);

  // const response = await axios.get(`https://www.amazon.com/dp/${ASIN}`);
  // fs.writeFileSync(`${ASIN}.html`, response.data);
  let response = fs.readFileSync(`${ASIN}.html`);
  // let response = fs.readFileSync(`test.html`);

  // let result = parse(response.data);
  let result = parse(response);
  console.log("Result ", result);

  return result;
};

// scrape("B07CQ2QJF4");
// scrape("B06XWZWYVP");
// scrape("B008MH5H4M");
// scrape("B013WU0CZW");
scrape("B002QYW8LW");

module.exports = {
  parse,
  scrape
};
