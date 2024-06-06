const axios = require('axios');
const cheerio = require('cheerio');

const scrapeWebsite = async () => {
  try {
    const baseURL = 'https://fyptt.to';
    const totalPages = 55; // Total number of pages to scrape

    const page = Math.floor(Math.random() * totalPages) + 1; // Generate a random page number

    const url = page === 1 ? baseURL : `${baseURL}/page/${page}/`;
    const response = await axios.get(url);

    if (!response.data) {
      throw new Error('No data received from the website');
    }

    // Load the HTML content into Cheerio
    const $ = cheerio.load(response.data);

    // Use Cheerio selectors to extract the desired data
    const pageData = [];
    $('.fl-post-grid-post').each((index, element) => {
      const href = $(element).find('.fl-post-grid-title a').attr('href');
      if (href) {
        pageData.push(href);
      }
    });

    // Randomly select one URL from the current page data
    if (pageData.length > 0) {
      const randomIndex = Math.floor(Math.random() * pageData.length);
      const randomURL = pageData[randomIndex];
      console.log('Random video download link:', randomURL); // Print the random video download link in the console
    } else {
      console.log('No video download link found.'); // Print message if no video download link is found
    }
  } catch (error) {
    console.error('Error scraping website:', error.message);
  }
};

// Call the function to initiate scraping
scrapeWebsite();
