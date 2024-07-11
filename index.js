import puppeteer from "puppeteer";
import xlsx from "xlsx";

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // Set a user agent to mimic a real browser
  // await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');

  // Increase timeout period
  await page.goto(
    "https://www.flipkart.com/search?q=laptops&otracker=search&otracker1=search&marketplace=FLIPKART&as-show=on&as=off"
  );
  await page.setViewport({ width: 1366, height: 768 });

  const title = await page.$$(".KzDlHZ");
  const titlearray = [];
  for (let titl of title) {
    const text = await page.evaluate((ele) => ele.textContent, titl);
    // console.log(text)
    titlearray.push(text);
  }

  const price = await page.$$(".Nx9bqj._4b5DiR");
  const pricearray = [];
  for (let pr of price) {
    const text = await page.evaluate((ele) => ele.textContent, pr);
    // console.log(text)
    pricearray.push(text);
  }



  const rating = await page.$$(".XQDdHH");
  const ratingarray = [];
  for (let ra of rating) {
    const text = await page.evaluate((ele) => ele.textContent, ra);
    // console.log(text)
    ratingarray.push(text);
  }

  const data = titlearray.map((title, index) => {
    return {
      title: title,
      price: pricearray[index],
      rating: ratingarray[index],
      //   seller: sellerarray[index],
    };
  });

  const wb=xlsx.utils.book_new();
  const ws=xlsx.utils.json_to_sheet(data);
  xlsx.utils.book_append_sheet(wb,ws,"Sheet1");
  xlsx.writeFile(wb,"flipkart.xlsx");
  console.log('done')

  // Your other actions here

  await browser.close();
})();
