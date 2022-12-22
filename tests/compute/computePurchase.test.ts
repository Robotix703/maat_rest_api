import { IList } from "../../src/models/list";
import { IUpdateOne } from "../../src/models/mongoose";
import { ISendPurchaseData } from "../../src/models/purchase";
import { IPrettyUser } from "../../src/models/user";

const computePurchase = require("../../src/compute/computePurchase").computePurchase;
const baseUser = require("../../src/compute/base/user").baseUser;
const baseList = require("../../src/compute/base/list").baseList;
const basePurchase = require("../../src/compute/base/purchase").basePurchase;

let prettyUser0 : IPrettyUser = {
    name: "userName0",
    id: "userId0",
    number: 0
}
let prettyUser1 : IPrettyUser = {
    name: "userName1",
    id: "userId1",
    number: 1
}

const list : IList = {
    _id: "63a22beaeb867d512d19520f",
    name: "nameList",
    main: true,
    total0: 10,
    total1: 11,
    balance0: 12,
    balance1: 13,
    merged: true
}
const listCopy : IList = {
    _id: "63a22beaeb867d512d19520f",
    name: "nameList",
    main: true,
    total0: 10,
    total1: 11,
    balance0: 12,
    balance1: 13,
    merged: true
}

const sendPurchaseData1to0 : ISendPurchaseData = {
    title: "purchaseTitle",
    amount: 10,
    buyTo: [prettyUser0.id],
    from: prettyUser1.id,
    listId: list._id
}
const sendPurchaseData0to1 : ISendPurchaseData = {
    title: "purchaseTitle",
    amount: 10,
    buyTo: [prettyUser1.id],
    from: prettyUser0.id,
    listId: list._id
}
const sendPurchaseData0to01 : ISendPurchaseData = {
    title: "purchaseTitle",
    amount: 10,
    buyTo: [prettyUser0.id, prettyUser1.id],
    from: prettyUser0.id,
    listId: list._id
}
const sendPurchaseData1to01 : ISendPurchaseData = {
    title: "purchaseTitle",
    amount: 10,
    buyTo: [prettyUser0.id, prettyUser1.id],
    from: prettyUser1.id,
    listId: list._id
}
const sendPurchaseData1to1 : ISendPurchaseData = {
    title: "purchaseTitle",
    amount: 10,
    buyTo: [prettyUser1.id],
    from: prettyUser1.id,
    listId: list._id
}

const purchase1to0 : any = {
    _id: '',
    title: "purchaseTitle",
    amount: 10,
    date: "2022-12-21T22:01:45.411Z",
    buyTo: ["userName0"],
    from: "userName1",
    listId: list._id,
    total0: 0,
    total1: 10,
    balance0: -10,
    balance1: 10
}
const prettyPurchase : any = {
    _id: '',
    title: "purchaseTitle",
    amount: 10,
    date: "2022-12-21T22:01:45.411Z",
    buyTo: ["userName1"],
    from: "userName0",
    user0: prettyUser0,
    user1: prettyUser1,
    total0: 10,
    total1: 0,
    balance0: 10,
    balance1: -10
}
const purchase0to1 : any = {
    _id: '',
    title: "purchaseTitle",
    amount: 10,
    date: "2022-12-21T22:01:45.411Z",
    buyTo: ["userName1"],
    from: "userName0",
    listId: list._id,
    total0: 10,
    total1: 0,
    balance0: 10,
    balance1: -10
}
const purchase0to01 : any = {
    _id: '',
    title: "purchaseTitle",
    amount: 10,
    date: "2022-12-21T22:01:45.411Z",
    buyTo: ["userName0", "userName1"],
    from: "userName0",
    listId: list._id,
    total0: 10,
    total1: 0,
    balance0: 5,
    balance1: -5
}
const updateOne : IUpdateOne = {
    modifiedCount: 1,
    acknowledged: true
}

test('UserNameToUserId', async () => {
    let result = await computePurchase.UserNameToUserId(prettyUser0.name, [prettyUser0, prettyUser1]);

    expect(result).toBe(prettyUser0.id);
});

test('UserIdToUserName', async () => {
    let result = await computePurchase.UserIdToUserName(prettyUser0.id, [prettyUser0, prettyUser1]);

    expect(result).toBe(prettyUser0.name);
});

test('attribute user0', async () => {
    let result = await computePurchase.attribute(prettyUser0.name, [prettyUser0, prettyUser1], 10);

    expect(result).toMatchObject({total0: 10, total1: 0});
});
test('attribute user1', async () => {
    let result = await computePurchase.attribute(prettyUser1.name, [prettyUser0, prettyUser1], 10);

    expect(result).toMatchObject({total0: 0, total1: 10});
});

test('divide to user0 by user0', async () => {
    let result = await computePurchase.divide([prettyUser0.name], prettyUser0.name, 10, [prettyUser0, prettyUser1]);

    expect(result).toBe(null);
});
test('divide to user0 by user1', async () => {
    let result = await computePurchase.divide([prettyUser0.name], prettyUser1.name, 10, [prettyUser0, prettyUser1]);

    expect(result).toMatchObject({balance0: -10, balance1: 10});
});
test('divide to (user0, user1) by user1', async () => {
    let result = await computePurchase.divide([prettyUser0.name, prettyUser1.name], prettyUser1.name, 10, [prettyUser0, prettyUser1]);

    expect(result).toMatchObject({balance0: -5, balance1: 5});
});
test('divide to (user0, user1) by user0', async () => {
    let result = await computePurchase.divide([prettyUser0.name, prettyUser1.name], prettyUser0.name, 10, [prettyUser0, prettyUser1]);

    expect(result).toMatchObject({balance0: 5, balance1: -5});
});

test('computePurchase 1 to 0', async () => {
    jest.spyOn(baseUser, "getPrettyUsers").mockImplementationOnce(() => {return [prettyUser0, prettyUser1]});

    const result = await computePurchase.computePurchase(sendPurchaseData1to0);

    expect(result._id).toBe('');
    expect(result.title).toBe(sendPurchaseData1to0.title);
    expect(result.amount).toBe(sendPurchaseData1to0.amount);
    expect(result.buyTo).toMatchObject([prettyUser0.name]);
    expect(result.from).toBe(prettyUser1.name);
    expect(result.listId).toBe(sendPurchaseData1to0.listId);
    expect(result.total0).toBe(0);
    expect(result.total1).toBe(sendPurchaseData1to0.amount);
    expect(result.balance0).toBe(-sendPurchaseData1to0.amount);
    expect(result.balance1).toBe(sendPurchaseData1to0.amount);
});
test('computePurchase 0 to 1', async () => {
    jest.spyOn(baseUser, "getPrettyUsers").mockImplementationOnce(() => {return [prettyUser0, prettyUser1]});

    const result = await computePurchase.computePurchase(sendPurchaseData0to1);

    expect(result._id).toBe('');
    expect(result.title).toBe(sendPurchaseData0to1.title);
    expect(result.amount).toBe(sendPurchaseData0to1.amount);
    expect(result.buyTo).toMatchObject([prettyUser1.name]);
    expect(result.from).toBe(prettyUser0.name);
    expect(result.listId).toBe(sendPurchaseData0to1.listId);
    expect(result.total0).toBe(sendPurchaseData0to1.amount);
    expect(result.total1).toBe(0);
    expect(result.balance0).toBe(sendPurchaseData0to1.amount);
    expect(result.balance1).toBe(-sendPurchaseData0to1.amount);
});
test('computePurchase 0 to 0 & 1', async () => {
    jest.spyOn(baseUser, "getPrettyUsers").mockImplementationOnce(() => {return [prettyUser0, prettyUser1]});

    const result = await computePurchase.computePurchase(sendPurchaseData0to01);

    expect(result._id).toBe('');
    expect(result.title).toBe(sendPurchaseData0to01.title);
    expect(result.amount).toBe(sendPurchaseData0to01.amount);
    expect(result.buyTo).toMatchObject([prettyUser0.name, prettyUser1.name]);
    expect(result.from).toBe(prettyUser0.name);
    expect(result.listId).toBe(sendPurchaseData0to01.listId);
    expect(result.total0).toBe(sendPurchaseData0to01.amount);
    expect(result.total1).toBe(0);
    expect(result.balance0).toBe(sendPurchaseData0to01.amount / 2);
    expect(result.balance1).toBe(-sendPurchaseData0to01.amount / 2);
});
test('computePurchase 1 to 0 & 1', async () => {
    jest.spyOn(baseUser, "getPrettyUsers").mockImplementationOnce(() => {return [prettyUser0, prettyUser1]});

    const result = await computePurchase.computePurchase(sendPurchaseData1to01);

    expect(result._id).toBe('');
    expect(result.title).toBe(sendPurchaseData1to01.title);
    expect(result.amount).toBe(sendPurchaseData1to01.amount);
    expect(result.buyTo).toMatchObject([prettyUser0.name, prettyUser1.name]);
    expect(result.from).toBe(prettyUser1.name);
    expect(result.listId).toBe(sendPurchaseData1to01.listId);
    expect(result.total0).toBe(0);
    expect(result.total1).toBe(sendPurchaseData1to01.amount);
    expect(result.balance0).toBe(-sendPurchaseData1to01.amount / 2);
    expect(result.balance1).toBe(sendPurchaseData1to01.amount / 2);
});
test('computePurchase 1 to 1', async () => {
    jest.spyOn(baseUser, "getPrettyUsers").mockImplementationOnce(() => {return [prettyUser0, prettyUser1]});

    const result = await computePurchase.computePurchase(sendPurchaseData1to1)
    .catch((error : Error) => {
        expect(error.message).toBe("From is buyTo");
    })
});

test('add 1 to 0', async () => {
    jest.spyOn(baseUser, "getPrettyUsers").mockImplementationOnce(() => {return [prettyUser0, prettyUser1]});
    jest.spyOn(baseList, "getListById").mockImplementationOnce(() => {return {...list}});
    let registerMock = jest.spyOn(basePurchase, "register").mockResolvedValue(purchase1to0);
    let updateMock = jest.spyOn(baseList, "updateTotalAndBalance").mockResolvedValue(updateOne);

    const result = await computePurchase.add(sendPurchaseData1to0);
    expect(result).toMatchObject({status: "OK"});

    const registerArgs = registerMock.mock.calls[0];
    expect(registerArgs[0]).toBe(sendPurchaseData1to0.title);
    expect(registerArgs[1]).toBe(sendPurchaseData1to0.amount);
    expect(registerArgs[3]).toMatchObject([prettyUser0.name]);
    expect(registerArgs[4]).toBe(prettyUser1.name);
    expect(registerArgs[5]).toBe(sendPurchaseData1to0.listId);
    expect(registerArgs[6]).toBe(0);
    expect(registerArgs[7]).toBe(sendPurchaseData1to0.amount);
    expect(registerArgs[8]).toBe(-sendPurchaseData1to0.amount);
    expect(registerArgs[9]).toBe(sendPurchaseData1to0.amount);

    const updateResult = updateMock.mock.calls[0];
    expect(updateResult[0]).toBe(sendPurchaseData1to0.listId);
    expect(updateResult[1]).toBe(listCopy.total0);
    expect(updateResult[2]).toBe(listCopy.total1 + purchase1to0.total1);
    expect(updateResult[3]).toBe(listCopy.balance0 + purchase1to0.balance0);
    expect(updateResult[4]).toBe(listCopy.balance1 + purchase1to0.balance1);

    registerMock.mockRestore();
    updateMock.mockRestore();
});
test('add 0 to 1', async () => {
    jest.spyOn(baseUser, "getPrettyUsers").mockImplementationOnce(() => {return [prettyUser0, prettyUser1]});
    jest.spyOn(baseList, "getListById").mockImplementationOnce(() => {return {...list}});
    let registerMock = jest.spyOn(basePurchase, "register").mockResolvedValue(purchase0to1);
    let updateMock = jest.spyOn(baseList, "updateTotalAndBalance").mockResolvedValue(updateOne);

    const result = await computePurchase.add(sendPurchaseData0to1);
    expect(result).toMatchObject({status: "OK"});

    const registerArgs = registerMock.mock.calls[0];
    expect(registerArgs[0]).toBe(sendPurchaseData0to1.title);
    expect(registerArgs[1]).toBe(sendPurchaseData0to1.amount);
    expect(registerArgs[3]).toMatchObject([prettyUser1.name]);
    expect(registerArgs[4]).toBe(prettyUser0.name);
    expect(registerArgs[5]).toBe(sendPurchaseData0to1.listId);
    expect(registerArgs[6]).toBe(sendPurchaseData0to1.amount);
    expect(registerArgs[7]).toBe(0);
    expect(registerArgs[8]).toBe(sendPurchaseData0to1.amount);
    expect(registerArgs[9]).toBe(-sendPurchaseData0to1.amount);

    const updateResult = updateMock.mock.calls[0];
    expect(updateResult[0]).toBe(sendPurchaseData0to1.listId);
    expect(updateResult[1]).toBe(listCopy.total0 + purchase0to1.total0);
    expect(updateResult[2]).toBe(listCopy.total1 + purchase0to1.total1);
    expect(updateResult[3]).toBe(listCopy.balance0 + purchase0to1.balance0);
    expect(updateResult[4]).toBe(listCopy.balance1 + purchase0to1.balance1);

    registerMock.mockRestore();
    updateMock.mockRestore();
});
test('add 0 to 01', async () => {
    jest.spyOn(baseUser, "getPrettyUsers").mockImplementationOnce(() => {return [prettyUser0, prettyUser1]});
    jest.spyOn(baseList, "getListById").mockImplementationOnce(() => {return {...list}});
    let registerMock = jest.spyOn(basePurchase, "register").mockResolvedValue(purchase0to01);
    let updateMock = jest.spyOn(baseList, "updateTotalAndBalance").mockResolvedValue(updateOne);

    const result = await computePurchase.add(sendPurchaseData0to01);
    expect(result).toMatchObject({status: "OK"});

    const registerArgs = registerMock.mock.calls[0];
    expect(registerArgs[0]).toBe(sendPurchaseData0to01.title);
    expect(registerArgs[1]).toBe(sendPurchaseData0to01.amount);
    expect(registerArgs[3]).toMatchObject([prettyUser0.name, prettyUser1.name]);
    expect(registerArgs[4]).toBe(prettyUser0.name);
    expect(registerArgs[5]).toBe(sendPurchaseData0to01.listId);
    expect(registerArgs[6]).toBe(sendPurchaseData0to01.amount);
    expect(registerArgs[7]).toBe(0);
    expect(registerArgs[8]).toBe(sendPurchaseData0to01.amount / 2);
    expect(registerArgs[9]).toBe(-sendPurchaseData0to01.amount / 2);

    const updateResult = updateMock.mock.calls[0];
    expect(updateResult[0]).toBe(sendPurchaseData0to01.listId);
    expect(updateResult[1]).toBe(listCopy.total0 + purchase0to01.total0);
    expect(updateResult[2]).toBe(listCopy.total1 + purchase0to01.total1);
    expect(updateResult[3]).toBe(listCopy.balance0 + purchase0to01.balance0);
    expect(updateResult[4]).toBe(listCopy.balance1 + purchase0to01.balance1);

    registerMock.mockRestore();
    updateMock.mockRestore();
});

test('getPurchasesByListId', async () => {
    jest.spyOn(basePurchase, "getPurchasesByListId").mockResolvedValue([purchase0to1]);
    jest.spyOn(baseList, "getListById").mockResolvedValue(list);
    jest.spyOn(baseUser, "getPrettyUsers").mockResolvedValue([prettyUser0, prettyUser1]);
   
    const result = await computePurchase.getPurchasesByListId(list._id);
    expect(result).toMatchObject([prettyPurchase]);
});

test('getPurchasesByPurchaseId', async () => {
    jest.spyOn(basePurchase, "getPurchase").mockResolvedValue(purchase0to1._id);
    jest.spyOn(baseList, "getListById").mockResolvedValue(list);
    jest.spyOn(baseUser, "getPrettyUsers").mockResolvedValue([prettyUser0, prettyUser1]);
   
    const result = await computePurchase.getPurchasesByListId(list._id);
    expect(result).toMatchObject([prettyPurchase]);
});