let { defineSupportCode } = require('cucumber');
defineSupportCode(function ({ Before, After }) {
    Before(async function () {
        await this.driver.manage().window().maximize();
    })
    After(async function () {
        await this.driver.quit();
    })
})