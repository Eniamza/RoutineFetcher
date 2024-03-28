const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch({
        headless: false, // Remove this to run headless
         slowMo: 25}); // Remove this to disable slowMo Mode, Which will execute the actions instantly, without any typing Delay
    const page = await browser.newPage();
  
    // Navigating to USIS Login Page
    await page.goto('http://usis.bracu.ac.bd/academia/');

    // Typing in the username and password, Basically in this step we pass a CSS Selector or HTML ID for each field
    // And tell Puppeteer to type in the username and password

    await page.type('#username', ''); //USIS EMAIL*******
    await page.type('#password', ''); //USIS PASSWORD********

    // Clicking the login button, Here, we also pass a CSS Selector or HTML ID for the login button
    // And then instruct Puppeteer to click it
    // In this case, the login button has an ID of "ctl00_leftColumn_ctl00_btnLogin"

    await page.click('#ctl00_leftColumn_ctl00_btnLogin');

    //After the login , we wait for the page to load the class schedule
    //Because this is fetched Dynamically with an API Call and populated after the login. 

    await page.waitForSelector('#student-class-schedule-dashboard-div', { // This is the div that stores the class schedule
        visible: true, // This means until the div is visible, we wait.
      });

    // Then we look for the div that stores the class schedule and extract the innerHTML of that div. 
    //This will give us the class schedule in HTML format

    const classSchedule = await page.evaluate(() => {
        return document.querySelector('#student-class-schedule-dashboard-div').innerHTML;
      
    });

    // We then save the class schedule to a file with .html extension

    fs.writeFileSync('classSchedule.html', classSchedule);


    //After a successful fetch and Dump, we close the browser using puppeteer's close method

    await browser.close();


  

  
    // await browser.close();
  })();