const axios = require('axios');
const cheerio = require('cheerio');

const scrapeWebsite = async () => {
  try {
    const baseURL = 'https://fyptt.to';
    const totalPages = 55; // Set the number of pages you want to scrape

    const page = Math.floor(Math.random() * totalPages) + 1; // Generate a random page number

    const url = page === 1 ? baseURL : `${baseURL}/page/${page}/`;
    const response = await axios.get(url);

    // Load the HTML content into Cheerio
    const $ = cheerio.load(response.data);

    // Use Cheerio selectors to extract the desired data
    const pageData = [];
    $('.fl-post-grid-post').each((index, element) => {
      const href = $(element).find('.fl-post-grid-title a').attr('href');
      pageData.push(href);
    });

    // Randomly select one URL from the current page data
    if (pageData.length > 0) {
      const randomIndex = Math.floor(Math.random() * pageData.length);
      const randomURL = pageData[randomIndex];
      return randomURL;
    }

    return null;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};

module.exports = scrapeWebsite;
