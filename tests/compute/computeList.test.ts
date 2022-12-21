import { IList } from "../../src/models/list";
import { IPrettyUser } from "../../src/models/user";

const computeList = require("../../src/compute/computeList").computeList;
const baseUser = require("../../src/compute/base/user").baseUser;
const baseList = require("../../src/compute/base/list").baseList;

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

test('getPrettyListById', async () => {
    jest.spyOn(baseUser, "getPrettyUsers").mockImplementationOnce(() => {return [prettyUser0, prettyUser1]});
    jest.spyOn(baseList, "getListById").mockImplementationOnce(() => {return list});
    
    let result = await computeList.getPrettyListById(list._id);

    expect(result).toMatchObject({
        _id: list._id,
        name: list.name,
        main: list.main,
        user0: prettyUser0,
        user1: prettyUser1,
        total0: list.total0,
        total1: list.total1,
        balance0: list.balance0,
        balance1: list.balance1,
        merged: list.merged
    });
});