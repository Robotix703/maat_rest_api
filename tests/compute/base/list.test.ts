import { IList } from "../../../src/models/list";

const mockingoose = require('mockingoose');

const List = require("../../../models/list").default;
const baseList = require("../../../compute/base/list").baseList;

let list : IList = {
    _id: "63a22beaeb867d512d19520f",
    name: "nameList",
    main: true,
    total0: 10,
    total1: 11,
    balance0: 12,
    balance1: 13,
    merged: true
}

test('getAllLists', async () => {
    mockingoose(List).toReturn([list], 'find');

    let result = await baseList.getAllLists(list._id);

    expect(JSON.parse(JSON.stringify(result))).toMatchObject([list]);
});

test('getListById', async () => {
    mockingoose(List).toReturn(list, 'findOne');

    let result = await baseList.getListById(list._id);

    expect(JSON.parse(JSON.stringify(result))).toMatchObject(list);
});

test('register', async () => {
    mockingoose(List).toReturn(list, 'save');

    let result = await baseList.register(
        list.name, 
        list.main, 
        list.total0,
        list.total1,
        list.balance0,
        list.balance1, 
        list.merged
    );

    let prettyResult = JSON.parse(JSON.stringify(result));
    expect(prettyResult.list._id.length).toBeGreaterThanOrEqual(10);
    expect(prettyResult.list.name).toBe(list.name);
});

test('update', async () => {
    mockingoose(List).toReturn("OK", 'updateOne');

    let result = await baseList.update(
        list._id,
        list.name, 
        list.main, 
        list.total0,
        list.total1,
        list.balance0,
        list.balance1, 
        list.merged
    );

    expect(JSON.parse(JSON.stringify(result))).toBe("OK");
});

test('updateTotalAndBalance', async () => {
    mockingoose(List).toReturn("OK", 'updateOne');

    let result = await baseList.updateTotalAndBalance(
        list._id,
        list.total0,
        list.total1,
        list.balance0,
        list.balance1
    );

    expect(JSON.parse(JSON.stringify(result))).toBe("OK");
});

test('getMainList', async () => {
    mockingoose(List).toReturn(list, 'findOne');

    let result = await baseList.getMainList();

    expect(JSON.parse(JSON.stringify(result))).toMatchObject(list);
});

test('count', async () => {
    mockingoose(List).toReturn(10, 'count');

    let result = await baseList.count();

    expect(JSON.parse(JSON.stringify(result))).toBe(10);
});

test('deleteOne', async () => {
    mockingoose(List).toReturn("OK", 'deleteOne');

    let result = await baseList.deleteOne(list._id);

    expect(JSON.parse(JSON.stringify(result))).toBe("OK");
});