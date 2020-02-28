const Quakecoin2 = artifacts.require('Quakecoin2.sol');

var Web3 = require("web3");
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
var Web3Utils = require('web3-utils');
contract('Quakecoin2 Contract', async (accounts) => {

    it('Should correctly initialize constructor values of Quakecoin2 Token Contract', async () => {

        this.tokenhold = await Quakecoin2.new();

    });

    it('Should check Owner of Token contract', async () => {

        let Owner = await this.tokenhold.contractOwner.call();
        assert.equal(Owner, accounts[0]);

    });

    it('Should check Symbol of Token contract', async () => {

        let symbol = await this.tokenhold.symbol.call();
        assert.equal(symbol, 'QUAKE2');
    });

    it('Should check name of Token contract ', async () => {

        let name = await this.tokenhold.name.call();
        assert.equal(name, 'Quakecoin2');
    });

    it('Should check decimal of Token contract', async () => {

        let decimal = await this.tokenhold.decimals.call();
        assert.equal(decimal.toNumber(), 18);
    });

    it('Should check totalSupply of Token contract', async () => {

        let totalSupply = await this.tokenhold.totalSupply.call();
        assert.equal(totalSupply, 0);
    });

    it('Should check migration Active or not of Token contract', async () => {

        let migrationActive = await this.tokenhold.migrationActive.call();
        assert.equal(migrationActive, true);
    });

    it('Should check balance of owner before minting ', async () => {

        let balanceOf = await this.tokenhold.balanceOf(accounts[0]);
        assert.equal(balanceOf.toNumber(), 0);
    });

    it('Should check Full unit staked  of owner before minting ', async () => {

        let fullUnitsStaked = await this.tokenhold.fullUnitsStaked(accounts[0]);
        assert.equal(fullUnitsStaked.toNumber(), 0);
    });

    it('Should check isStaked of owner before minting', async () => {

        let isStaking = await this.tokenhold.isStaking(accounts[0]);
        assert.equal(isStaking, false);
    });

    it('Should check full unit of 1 token before minting', async () => {
        let value = 1 * 10 ** 18;
        let isStaking = await this.tokenhold.toFullUnits(Web3Utils.toHex(value));
        assert.equal(isStaking.toNumber(), 1);
    });

    it('Should check Unpaid Rewards owner address before minting', async () => {

        let viewUnpaidRewards = await this.tokenhold.viewUnpaidRewards(accounts[0]);
        assert.equal(viewUnpaidRewards.toNumber(), 0);
    });

    it('Should check whitelist from when not whitelisted', async () => {

        let whitelistFrom = await this.tokenhold.whitelistFrom(accounts[0]);
        assert.equal(whitelistFrom, false);
    });

    it('Should check whitelist to when not whitelisted', async () => {

        let whitelistTo = await this.tokenhold.whitelistTo(accounts[0]);
        assert.equal(whitelistTo, false);
    });

    it('Should check totalSupply of Token contract before migrating token', async () => {

        let totalSupply = await this.tokenhold.totalSupply.call();
        assert.equal(totalSupply, 0);
    });

    it('Should Not be able to migrate tokens to accounts[1] by Non owner', async () => {
        let value = 10 * 10 ** 18;
        try {
            await this.tokenhold.migrateBalance(accounts[1], Web3Utils.toHex(value), { from: accounts[1] });
        } catch (error) {
            var error_ = 'Returned error: VM Exception while processing transaction: revert only owner -- Reason given: only owner.';
            assert.equal(error.message, error_, 'Reverted ');
        }
    });

    it('Should check balance of accounts[1] before minting ', async () => {

        let balanceOf = await this.tokenhold.balanceOf(accounts[1]);
        assert.equal(balanceOf.toNumber(), 0);

    });

    it('Should be able to migrate tokens to accounts[1] by owner only', async () => {
        let value = 10 * 10 ** 18;
        await this.tokenhold.migrateBalance(accounts[1], Web3Utils.toHex(value), { from: accounts[0] });

    });

    it('Should check totalSupply of Token contract after migrating token', async () => {

        let totalSupply = await this.tokenhold.totalSupply.call();
        assert.equal(totalSupply / 10 ** 18, 10);

    });

    it('Should check balance of accounts[1] after minting ', async () => {

        let balanceOf = await this.tokenhold.balanceOf(accounts[1]);
        assert.equal(balanceOf / 10 ** 18, 10);

    });

    it('Should check balance of accounts[1] before minting Multiple', async () => {

        let balanceOf = await this.tokenhold.balanceOf(accounts[1]);
        assert.equal(balanceOf / 10 ** 18, 10);

    });

    it('Should check balance of accounts[2] before minting Multiple', async () => {

        let balanceOf = await this.tokenhold.balanceOf(accounts[2]);
        assert.equal(balanceOf, 0);

    });

    it('Should Not be able to migrate tokens to accounts[1] by Non owner', async () => {
        let value = 10 * 10 ** 18;
        try {
            await this.tokenhold.multiMigrateBalance([accounts[1], accounts[2]], [Web3Utils.toHex(value), Web3Utils.toHex(value)], { from: accounts[1] });
        } catch (error) {
            var error_ = 'Returned error: VM Exception while processing transaction: revert only owner -- Reason given: only owner.';
            assert.equal(error.message, error_, 'Reverted ');
        }
    });

    it('Should be able to multiple migrate tokens to accounts[1], accounts[2] by owner only', async () => {

        let value = 10 * 10 ** 18;
        await this.tokenhold.multiMigrateBalance([accounts[1], accounts[2]], [Web3Utils.toHex(value), Web3Utils.toHex(value)], { from: accounts[0] });

    });

    it('Should check totalSupply of Token contract after multi migrating token', async () => {

        let totalSupply = await this.tokenhold.totalSupply.call();
        assert.equal(totalSupply / 10 ** 18, 30);

    });

    it('Should check balance of accounts[1] after minting ', async () => {

        let balanceOf = await this.tokenhold.balanceOf(accounts[1]);
        assert.equal(balanceOf / 10 ** 18, 20);

    });

    it('Should check balance of accounts[2] after minting ', async () => {

        let balanceOf = await this.tokenhold.balanceOf(accounts[2]);
        assert.equal(balanceOf / 10 ** 18, 10);

    });

    it("Should Not be able to transfer ownership of token Contract by non owner account", async () => {

        try { await this.tokenhold.transferOwnership(accounts[9], { from: accounts[1] }); } catch (error) {
            var error_ = 'Returned error: VM Exception while processing transaction: revert';
            assert.equal(error.message, error_, 'Reverted ');
        }

    });

    it('Should check Owner of Token contract before transffering ownership', async () => {

        let contractOwner = await this.tokenhold.contractOwner.call();
        assert.equal(contractOwner, accounts[0]);

    });

    it("Should be able to transfer ownership of token Contract ", async () => {

        await this.tokenhold.transferOwnership(accounts[9], { from: accounts[0] });
    });

    it('Should check Owner of Token contract after transfering ownership', async () => {

        let contractOwner = await this.tokenhold.contractOwner.call();
        assert.equal(contractOwner, accounts[9]);

    });

    it("should check allownace when not approved address to spend specific token ", async () => {

        let allowance = await this.tokenhold.allowance.call(accounts[1], accounts[3]);
        assert.equal(allowance, 0, "allowance is wrong when approve");

    });

    it("should Approve address to spend specific token ", async () => {

        let value = 5 * 10 ** 18;
        this.tokenhold.approve(accounts[3], Web3Utils.toHex(value), { from: accounts[1] });

    });

    it("should check allownace when approved address to spend specific token ", async () => {

        let allowance = await this.tokenhold.allowance.call(accounts[1], accounts[3]);
        assert.equal(allowance / 10 ** 18, 5, "allowance is wrong when approve");

    });

    it("should increase Approval ", async () => {

        let allowanceBefore = await this.tokenhold.allowance.call(accounts[1], accounts[3]);
        assert.equal(allowanceBefore / 10 ** 18, 5, "allowance is wrong when approve");
        let value = 10 * 10 ** 18;
        this.tokenhold.increaseAllowance(accounts[3], Web3Utils.toHex(value), { from: accounts[1] });

    });

    it("should check allownace when allowance is increased approved address to spend specific token ", async () => {

        let allowance = await this.tokenhold.allowance.call(accounts[1], accounts[3]);
        assert.equal(allowance / 10 ** 18, 15, "allowance is wrong when approve");

    });

    it("should decrease Approval ", async () => {

        let value = 10 * 10 ** 18;
        this.tokenhold.decreaseAllowance(accounts[3], Web3Utils.toHex(value), { from: accounts[1] });

    });

    it("should check allownace when allowance is decreased approved address to spend specific token ", async () => {

        let allowance = await this.tokenhold.allowance.call(accounts[1], accounts[3]);
        assert.equal(allowance / 10 ** 18, 5, "allowance is wrong when approve");

    });

    it('Should check whitelist to when not whitelisted before whitelisting', async () => {

        let whitelistTo = await this.tokenhold.whitelistTo(accounts[1]);
        assert.equal(whitelistTo, false);

    });

    it("should set whitelist to by Non owner", async () => {

        try {
            await this.tokenhold.setWhitelistedTo(accounts[1], true, { from: accounts[0] });
        } catch (error) {
            var error_ = 'Returned error: VM Exception while processing transaction: revert only owner -- Reason given: only owner.';
            assert.equal(error.message, error_, 'Reverted ');
        }
    });

    //accounts [1] whitelist to

    it("should set whitelist to by owner only", async () => {

        await this.tokenhold.setWhitelistedTo(accounts[1], true, { from: accounts[9] });

    });

    it('Should check whitelist to when not whitelisted after whitelisting', async () => {

        let whitelistTo = await this.tokenhold.whitelistTo(accounts[1]);
        assert.equal(whitelistTo, true);

    });

    it('Should check whitelist from when not whitelisted before whitelisting', async () => {

        let whitelistTo = await this.tokenhold.whitelistFrom(accounts[2]);
        assert.equal(whitelistTo, false);

    });

    it("should set whitelist from by Non owner", async () => {

        try {
            await this.tokenhold.setWhitelistedFrom(accounts[2], true, { from: accounts[0] });
        } catch (error) {
            var error_ = 'Returned error: VM Exception while processing transaction: revert only owner -- Reason given: only owner.';
            assert.equal(error.message, error_, 'Reverted ');
        }
    });

    //accounts [2] whitelistfrom

    it("should set whitelist from by owner only", async () => {

        await this.tokenhold.setWhitelistedFrom(accounts[2], true, { from: accounts[9] });

    });

    it('Should check whitelist from when not whitelisted after whitelisting', async () => {

        let whitelistTo = await this.tokenhold.whitelistFrom(accounts[2]);
        assert.equal(whitelistTo, true);

    });

    it('Should Not be able to migrate tokens to zero address by owner only ( Test case failed)', async () => {
        let address = 0x0000000000000000000000000000000000000000;
        let value = 1 * 10 ** 18;
        //await this.tokenhold.migrateBalance(address(0), Web3Utils.toHex(value), { from: accounts[9] });

    });

    it('Should check balance of accounts[2] before burning ', async () => {

        let balanceOf = await this.tokenhold.balanceOf(accounts[2]);
        assert.equal(balanceOf / 10 ** 18, 10);

    });

    it('Should be able to burn tokens ', async () => {
        value = 1 * 10 ** 18;
        await this.tokenhold.burn(Web3Utils.toHex(value), { from: accounts[2] });

    });

    it('Should check balance of accounts[2] After burning ', async () => {

        let balanceOf = await this.tokenhold.balanceOf(accounts[2]);
        assert.equal(balanceOf / 10 ** 18, 9);

    });

    it("should check allownace before burning allowed tokens", async () => {

        let allowance = await this.tokenhold.allowance.call(accounts[1], accounts[3]);
        assert.equal(allowance / 10 ** 18, 5, "allowance is wrong when approve");

    });

    it('Should check balance of accounts[1] before burning ', async () => {

        let balanceOf = await this.tokenhold.balanceOf(accounts[1]);
        assert.equal(balanceOf / 10 ** 18, 20);

    });

    it('Should Not be able to burn tokens that are not allowed to transfer ', async () => {

        value = 1 * 10 ** 18;

        try {
            await this.tokenhold.burnFrom(accounts[1], Web3Utils.toHex(value), { from: accounts[2] });
        } catch (error) {
            var error_ = 'Returned error: VM Exception while processing transaction: revert';
            assert.equal(error.message, error_, 'Reverted ');
        }
    });

    it('Should be able to burn tokens that are allowed to transfer ', async () => {

        value = 1 * 10 ** 18;
        await this.tokenhold.burnFrom(accounts[1], Web3Utils.toHex(value), { from: accounts[3] });

    });

    it("should check allownace After burning allowed tokens", async () => {

        let allowance = await this.tokenhold.allowance.call(accounts[1], accounts[3]);
        assert.equal(allowance / 10 ** 18, 4, "allowance is wrong when approve");

    });

    it('Should check balance of accounts[1] After burning ', async () => {

        let balanceOf = await this.tokenhold.balanceOf(accounts[1]);
        assert.equal(balanceOf / 10 ** 18, 19);

    });

    it('Should check migration Active or not of Token contract before ending', async () => {

        let migrationActive = await this.tokenhold.migrationActive.call();
        assert.equal(migrationActive, true);
    });

    it('Should End Migration', async () => {

        await this.tokenhold.endMigration({ from: accounts[9] });

    });

    it('Should check migration Active or not of Token contract before ending', async () => {

        let migrationActive = await this.tokenhold.migrationActive.call();
        assert.equal(migrationActive, false);
    });

    it('Should Not be able to end Migration when already ended(failed)', async () => {

        await this.tokenhold.endMigration({ from: accounts[9] });

    });

    it('Should check isStaked or not', async () => {

        let isStaking = await this.tokenhold.isStaking(accounts[1]);
        assert.equal(isStaking, false);
    });

    it('Should be able to enable stacking', async () => {

        await this.tokenhold.enableStaking({ from: accounts[1] });

    });

    it('Should check isStaked or not', async () => {

        let isStaking = await this.tokenhold.isStaking(accounts[1]);
        assert.equal(isStaking, true);
    });

    it('Should be able to enable stacking by owner for accounts[2]', async () => {

        await this.tokenhold.enableStakingFor(accounts[2], { from: accounts[9] });

    });

    it('Should check isStaked or not', async () => {

        let isStaking = await this.tokenhold.isStaking(accounts[2]);
        assert.equal(isStaking, true);
    });

    it('Should be able to disable stacking by owner for accounts[2]', async () => {

        await this.tokenhold.disableStakingFor(accounts[2], { from: accounts[9] });

    });

    it('Should be able to transfer tokens', async () => {
        value = 1 * 10 ** 18;
        await this.tokenhold.transfer(accounts[4], Web3Utils.toHex(value), { from: accounts[1] });

    });

    it('Should check balance of accounts[4] After', async () => {

        let balanceOf = await this.tokenhold.balanceOf(accounts[4]);
        assert.equal(balanceOf / 10 ** 18, 0.94);

    });

    it('Should check balance of accounts[1] After', async () => {

        let balanceOf = await this.tokenhold.balanceOf(accounts[1]);
        assert.equal(balanceOf / 10 ** 18, 18);

    });

    it('Should check balance of accounts[2] After', async () => {

        let balanceOf = await this.tokenhold.balanceOf(accounts[2]);
        assert.equal(balanceOf / 10 ** 18, 9);

    });

})

