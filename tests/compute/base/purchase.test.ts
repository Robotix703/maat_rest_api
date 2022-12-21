import { IPrettyUser } from "../../../src/models/user";

const mockingoose = require('mockingoose');

const Purchase = require("../../../src/models/purchase").default;
const basePurchase = require("../../../src/compute/base/purchase").basePurchase;

const purchase0 : any = {
    _id: "63a2333423934b08e25a19e2",
    title: "purchaseTitle",
    amount: 10,
    date: "2022-12-20T22:12:04.331Z",
    buyTo: ["user0", "user1"],
    from: "user0",
    listId: "listId",
    total0: 11,
    total1: 12,
    balance0: 13,
    balance1: 14
}
let prettyUser0 : IPrettyUser = {
    name: "userName0",
    id: "userId0",
    number: 10
}
let prettyUser1 : IPrettyUser = {
    name: "userName1",
    id: "userId1",
    number: 20
}

test('getPurchasesByListId', async () => {
    mockingoose(Purchase).toReturn([purchase0], 'find');

    let result = await basePurchase.getPurchasesByListId(purchase0.listId);

    expect(JSON.parse(JSON.stringify(result))).toMatchObject([purchase0]);
});

test('getPurchase', async () => {
    mockingoose(Purchase).toReturn(purchase0, 'findOne');

    let result = await basePurchase.getPurchase(purchase0._id);

    expect(JSON.parse(JSON.stringify(result))).toMatchObject(purchase0);
});

test('register', async () => {
    mockingoose(Purchase).toReturn(purchase0, 'save');

    let result = await basePurchase.register(
        purchase0.title,
        purchase0.amount,
        purchase0.date,
        purchase0.buyTo,
        purchase0.from,
        purchase0.listId,
        purchase0.total0,
        purchase0.total1,
        purchase0.balance0,
        purchase0.balance1
    );

    let prettyResult = JSON.parse(JSON.stringify(result));
    expect(prettyResult.result._id.length).toBeGreaterThanOrEqual(10);
    expect(prettyResult.result.title).toBe(purchase0.title);
});

test('update', async () => {
    mockingoose(Purchase).toReturn("OK", 'updateOne');

    let result = await basePurchase.update(
        purchase0._id,
        purchase0.title,
        purchase0.amount,
        purchase0.date,
        purchase0.buyTo,
        purchase0.from,
        purchase0.listId,
        purchase0.total0,
        purchase0.total1,
        purchase0.balance0,
        purchase0.balance1
    );

    expect(JSON.parse(JSON.stringify(result))).toBe("OK");
});

test('count', async () => {
    mockingoose(Purchase).toReturn(10, 'count');

    let result = await basePurchase.count();

    expect(JSON.parse(JSON.stringify(result))).toBe(10);
});

test('deleteOne', async () => {
    mockingoose(Purchase).toReturn("OK", 'deleteOne');

    let result = await basePurchase.deleteOne(purchase0._id);

    expect(JSON.parse(JSON.stringify(result))).toBe("OK");
});