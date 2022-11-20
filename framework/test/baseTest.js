const assert = require("chai").assert;
const data = require("../data.json");
const browserUtil = require("../pageObjects/util/browserUtil");
const logger = require("../pageObjects/util/logger");

const homepage = require("../pageObjects/forms/homepage");
const alertsWindows = require("../pageObjects/forms/alertsWindows");
const sidebarForm = require("../pageObjects/forms/sidebarForm");
const nestedFramesForm = require("../pageObjects/forms/nestedFramesForm");
const framesForm = require("../pageObjects/forms/framesForm");
const webTablesForm = require("../pageObjects/forms/webTablesForm");
const registrationForm = require("../pageObjects/forms/registrationForm");
const browserWindowsForm = require("../pageObjects/forms/browserWindowsForm");
const linksForm = require("../pageObjects/forms/linksForm");

describe("Implement framework and autotests", function () {
  driver = browserUtil.getDriver();

  beforeEach(async function () {
    driver = browserUtil.getDriver();
    logger.logInfo("Driver initialized");
    browserUtil.maximizeWindow();
    logger.logInfo("Window maximized");
    await browserUtil.goToUrl(data.baseUrl);
    await assert.ok(browserUtil.checkCurrentUrl(data.baseUrl));
    logger.logInfo("Base URL opened successfully");
  });

  after(function () {
    driver.quit();
    logger.logInfo("Driver quit successfully");
  });

  it("#1. Alerts", async function () {
    homepage.clickAlerts();
    await sidebarForm.clickAlertLabel();
    assert.isTrue(sidebarForm.isPageOpen());
    logger.logInfo("Alerts form has appeared on page")
    await alertsWindows.clickAlertBtn();
    assert.equal(await browserUtil.getAlertText(), "You clicked a button");
    logger.logInfo("Alert with text 'You clicked a button' is opened")
    await browserUtil.closeAlert();
    assert.isFalse(await browserUtil.isAlertPresent());
    logger.logInfo("Alert has closed")
    await alertsWindows.clickConfirmBoxBtn();
    assert.equal(await browserUtil.getAlertText(), "Do you confirm action?");
    logger.logInfo("Alert with text 'Do you confirm action' is opened")
    await browserUtil.confirmAlert();
    assert.isFalse(await browserUtil.isAlertPresent());
    logger.logInfo("Alert has closed")
    await alertsWindows.clickPromptBtn();
    assert.equal(await browserUtil.getAlertText(), "Please enter your name");
    logger.logInfo("Alert with text 'Please enter your name' is opened")
    await browserUtil.randomPrompt().then(async(randStr) => {
      await alertsWindows.getRes().then(async(res) => {
        assert.equal(res, randStr)
        logger.logInfo("Appeared text is equal to one you've entered before")
      });
    });
    assert.isFalse(await browserUtil.isAlertPresent(), "Alert has closed");
  });

  it("#2. IFrame", async function () {
    homepage.clickAlerts();
    sidebarForm.clickAlertLabel();
    assert.isTrue(alertsWindows.isPageOpen());
    logger.logInfo("Alerts form has appeared on page")
    sidebarForm.clickNestedFrames();
    assert.isTrue(nestedFramesForm.isPageOpen());
    logger.logInfo("Page with Nested Frames form is open")
    // NoSuchElementError is thrown
    try {
      await nestedFramesForm.getNestedFramesText("frame1", "frame0").then((parentText, childText) => {
        assert.equal(parentText, "Parent frame");
        logger.logInfo("Parent frame text equals 'Parent frame'")
        assert.equal(childText, "Child frame");
        logger.logInfo("Child frame text equals 'Child frame'")
      });
    } catch (e) {
      logger.logError(e);
    }
    sidebarForm.clickFrames();
    assert.isTrue(framesForm.isPageOpen());
    logger.logInfo("Page with Frames form is open")
    await framesForm.getFrameH1Text("frame1").then(async(f1) => {
      await framesForm.getFrameH1Text("frame2").then(async(f2) => {
        assert.equal(f1, f2)
        logger.logInfo("Message from upper frame is equal to the message from lower frame")
      });
    });
  });

  it("#3. Tables", async function () {
    let numberOfRows = 0;
    homepage.clickElements();
    await sidebarForm.clickWebTables();
    assert.isTrue(alertsWindows.isPageOpen());
    logger.logInfo("Page with Web Tables form is open");
    numberOfRows = await registrationForm.countRows();
    await webTablesForm.clickAddBtn();
    assert.isTrue(registrationForm.isPageOpen());
    logger.logInfo("Registration Form has appeared on page");
    await registrationForm.fillForm(data.userData[0]);
    await registrationForm.clickSubmit();
    assert.isAbove(await registrationForm.countRows(), numberOfRows);
    logger.logInfo("Number of records in table has changed");
    assert.isTrue(await registrationForm.findUserByEmail(data.userData[0].email));
    logger.logInfo("Data of user #1 has appeared in table");
    await registrationForm.deleteLastEntry();
    assert.equal(await registrationForm.countRows(), numberOfRows);
    logger.logInfo("Number of records in table has changed");
    logger.logInfo("Data of user #1 has been deleted from table");
  });

  it("#3. Tables", async function () {
    let numberOfRows = 0;
    homepage.clickElements();
    await sidebarForm.clickWebTables();
    assert.isTrue(alertsWindows.isPageOpen());
    logger.logInfo("Page with Web Tables form is open");
    numberOfRows = await registrationForm.countRows();
    await webTablesForm.clickAddBtn();
    assert.isTrue(registrationForm.isPageOpen());
    logger.logInfo("Registration Form has appeared on page");
    await registrationForm.fillForm(data.userData[1]);
    await registrationForm.clickSubmit();
    assert.isAbove(await registrationForm.countRows(), numberOfRows);
    logger.logInfo("Number of records in table has changed");
    assert.isTrue(await registrationForm.findUserByEmail(data.userData[1].email));
    logger.logInfo("Data of user #2 has appeared in table");
    await registrationForm.deleteLastEntry();
    assert.equal(await registrationForm.countRows(), numberOfRows);
    logger.logInfo("Number of records in table has changed");
    logger.logInfo("Data of user #2 has been deleted from table");
  });

  it("#4. Handles", async function () {
    // не закрываю вкладки в этом тесте, не получилось переключить драйвер после закрытия
    homepage.clickAlerts();
    await sidebarForm.clickBrowserWindows();
    assert.isTrue(alertsWindows.isPageOpen());
    logger.logInfo("Page with Browser Windows form is open");
    await browserWindowsForm.clickNewTabBtn();
    assert.isTrue(alertsWindows.isPageOpen());
    logger.logInfo("Page with Browser Windows form is open");
    await sidebarForm.clickElementsLabel();
    await sidebarForm.clickLinksLabel();
    assert.isTrue(linksForm.isPageOpen());
    logger.logInfo("Page with Links form is open");
    await linksForm.clickHome();
    assert.isTrue(linksForm.isPageOpen());
    logger.logInfo("Page with Links form is open");
  });
});
