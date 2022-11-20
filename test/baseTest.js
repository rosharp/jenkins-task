const assert = require("chai").assert;
const data = require("../data.json");
const config = require("../config.json");
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

describe("Implement framework and autotests", function() {
  beforeEach(async function() {
    logger.logInfo("Initialize driver");
    driver = await browserUtil.getDriver();
    browserUtil.maximizeWindow();
    await browserUtil.goToUrl(config.baseUrl);
    assert.equal(await browserUtil.getCurrentUrl(), config.baseUrl);
  });

  afterEach(function() {
    browserUtil.clearDriver();
  });

  after(function() {
    driver.quit();
  })

  it("#1. Alerts", async function() {
    const randomString = (Math.random() + 1).toString(36).substring(7);

    homepage.clickAlerts();
    await sidebarForm.clickAlertLabel();
    assert.isTrue(await sidebarForm.isPageOpen());
    logger.logInfo("Alerts form has appeared on page");
    await alertsWindows.clickAlertBtn();
    assert.equal(await browserUtil.getAlertText(), "You clicked a button");
    logger.logInfo("Alert with text 'You clicked a button' is opened");
    await browserUtil.closeAlert();
    assert.isFalse(await browserUtil.isAlertPresent());
    logger.logInfo("Alert has closed");
    await alertsWindows.clickConfirmBoxBtn();
    assert.equal(await browserUtil.getAlertText(), "Do you confirm action?");
    logger.logInfo("Alert with text 'Do you confirm action' is opened");
    await browserUtil.confirmAlert();
    assert.isFalse(await browserUtil.isAlertPresent());
    logger.logInfo("Alert has closed");
    await alertsWindows.clickPromptBtn();
    assert.equal(await browserUtil.getAlertText(), "Please enter your name");
    logger.logInfo("Alert with text 'Please enter your name' is opened");
    await browserUtil.prompt(randomString);
    assert.equal(await alertsWindows.getRes(), randomString);
    await alertsWindows.getRes();
    logger.logInfo("Appeared text is equal to one you've entered before");
    assert.isFalse(await browserUtil.isAlertPresent(), "Alert has closed");
  });

  it("#2. IFrame", async function() {
    homepage.clickAlerts();
    sidebarForm.clickNestedFrames();
    assert.isTrue(await nestedFramesForm.isPageOpen());
    logger.logInfo("Page with Nested Frames form is open");
    await browserUtil.switchToFrame("frame1");
    const parentText = await nestedFramesForm.getFrameText();
    assert.equal(parentText, "Parent frame");
    await nestedFramesForm.switchToChild();
    const childText = await nestedFramesForm.getFrameText();
    assert.equal(childText, "Child Iframe");
    await browserUtil.switchToDefaultContent();
    sidebarForm.clickFrames();
    assert.isTrue(await framesForm.isPageOpen());
    logger.logInfo("Page with Frames form is open");
    assert.equal(await framesForm.getFrameH1Text("frame1"), await framesForm.getFrameH1Text("frame2"));
    logger.logInfo("Message from upper frame is equal to the message from lower frame");
  });

  data.userData.forEach(user => {
    it("#3. Tables", async function() {
      let numberOfRows = 0;
      homepage.clickElements();
      await sidebarForm.clickWebTables();
      assert.isTrue(await alertsWindows.isPageOpen());
      logger.logInfo("Page with Web Tables form is open");
      numberOfRows = await registrationForm.getCountRows();
      await webTablesForm.clickAddBtn();
      assert.isTrue(await registrationForm.isPageOpen());
      logger.logInfo("Registration Form has appeared on page");
      await registrationForm.fillForm(user);
      await registrationForm.clickSubmit();
      assert.isAbove(await registrationForm.getCountRows(), numberOfRows);
      logger.logInfo("Number of records in table has changed");
      assert.isTrue(await registrationForm.findUserByEmail(user.email));
      logger.logInfo(`Data of user # has appeared in table`);
      await registrationForm.deleteLastEntry();
      assert.equal(await registrationForm.getCountRows(), numberOfRows);
      logger.logInfo("Number of records in table has changed");
      logger.logInfo(`Data of user # has been deleted from table`);
    });
  });

  it("#4. Handles", async function() {
    homepage.clickAlerts();
    await sidebarForm.clickBrowserWindows();
    assert.isTrue(await alertsWindows.isPageOpen());
    logger.logInfo("Page with Browser Windows form is open");
    await browserWindowsForm.clickNewTabBtn();
    await browserUtil.switchToNewTabAndClose();
    assert.isTrue(await alertsWindows.isPageOpen());
    logger.logInfo("Page with Browser Windows form is open");
    await sidebarForm.clickElementsLabel();
    await sidebarForm.clickLinksLabel();
    assert.isTrue(await linksForm.isPageOpen());
    logger.logInfo("Page with Links form is open");
    await linksForm.clickHome();
    browserUtil.openNewTabAndSwitch();
    assert.isTrue(await linksForm.isPageOpen());
    logger.logInfo("Page with Links form is open");
  });
});

