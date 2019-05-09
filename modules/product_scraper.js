const fs = require("fs");
const cheerio = require("cheerio");
const axios = require("axios");

const getName = $ => {
  return $("#productTitle")
    .text()
    .trim();
};

const getCategory = $ => {
  let categories = $("#wayfinding-breadcrumbs_feature_div ul li span a")
    .map((i, category) => {
      return $(category)
        .html()
        .trim();
    })
    .get();

  // For now, get the first category
  return categories[0];
};

const getProductDimension = $ => {
  try {
    let row = $("#prodDetails table tr")
      .children()
      .filter((i, elem) => {
        return (
          $(elem)
            .text()
            .indexOf("Product Dimension") !== -1
        );
      });
    return $(row)
      .next()
      .text()
      .trim();
  } catch (err) {
    return "Not available";
  }
};

const parseRankText = text => {
  const allRanks = text
    .trim()
    .split("\n")
    .map(t => t.trim())
    .filter(Boolean);
  const rank = allRanks.length > 0 ? allRanks[0] : allRanks;
  const match = /^[\d,]+/g.exec(rank.split("#")[1]);
  return parseInt(match[0].split(",").join(""));
};

const getProductRank = $ => {
  try {
    let str = $("#SalesRank")
      .text()
      .replace(/\n|\r/g, "");
    if (str) {
      return parseRankText(str);
    } else {
      const ranks = $("#prodDetails table tr")
        .children()
        .filter((i, elem) => {
          let text = $(elem).text();
          return /(#.*)/g.exec(text);
        });
      return parseRankText($(ranks).text());
    }
  } catch (err) {
    console.error("Error GetProductRanks ", err);
    return null;
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
  const name = getName($);
  const category = getCategory($);
  const dimension = getProductDimension($);
  const rank = getProductRank($);
  const imageUrl = getProductImageUrl($);
  return {
    name,
    category,
    rank,
    dimension,
    imageUrl
  };
};

const scrape = async ASIN => {
  console.log("Scraping ", ASIN);
  const response = await axios.get(`https://www.amazon.com/dp/${ASIN}`);
  // fs.writeFileSync(`${ASIN}.html`, response.data);
  // let response = fs.readFileSync(`${ASIN}.html`);
  // let result = parse(response.data);
  // let product = { ASIN, ...parse(response) };
  let product = { ASIN, ...parse(response.data) };
  console.log("Result ", product);

  return product;
};

// scrape("B07CQ2QJF4");
// scrape("B06XWZWYVP");
// scrape("B008MH5H4M");
// scrape("B013WU0CZW");
// scrape("B002QYW8LW");

module.exports = {
  parse,
  scrape
};
