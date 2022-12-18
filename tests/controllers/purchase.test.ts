import { IPurchase } from "../../src/models/purchase";
import { basePurchase } from "../../src/compute/base/purchase";
import { purchaseController } from "../../src/controllers/purchase";


let purchase0 : IPurchase = {
    _id: "_id",
    title: "purchaseTitle",
    amount: 10,
    date: new Date(),
    buyTo: ["user0", "user1"],
    from: "user0",
    listId: "listId",
    total0: 11,
    total1: 12,
    balance0: 13,
    balance1: 14
}

let errorMessage : string = 'Async error message';
let errorObject : object = {
    errorMessage: errorMessage
};

test('writePurchase', async () => {
    let mockStatusCode = jest.fn();
    let mockResponse = {status : mockStatusCode.mockReturnValue({json: jest.fn()})}

    let mockRequest = {
        body: {
            title: purchase0.title,
            amount: purchase0.amount,
            date: purchase0.date,
            buyTo: purchase0.buyTo,
            from: purchase0.from,
            listId: purchase0.listId,
            total0: purchase0.total0,
            total1: purchase0.total1,
            balance0: purchase0.balance0,
            balance1: purchase0.balance1
        }
    };

    let spy = jest.spyOn(basePurchase, "register").mockResolvedValue(purchase0);
    
    await purchaseController.writePurchase(mockRequest, mockResponse);

    let responseBody = mockResponse.status().json.mock.calls[0][0];
    let reponseStatus = mockStatusCode.mock.calls[0][0];

    expect(responseBody).toBe(purchase0);
    expect(reponseStatus).toBe(201);

    spy.mockRestore();
});
test('writePurchase empty', async () => {
    let mockStatusCode = jest.fn();
    let mockResponse = {status : mockStatusCode.mockReturnValue({json: jest.fn()})}

    let mockRequest = {
        body: {
            title: purchase0.title,
            amount: purchase0.amount,
            date: purchase0.date,
            buyTo: purchase0.buyTo,
            from: purchase0.from,
            listId: purchase0.listId,
            total0: purchase0.total0,
            total1: purchase0.total1,
            balance0: purchase0.balance0,
            balance1: purchase0.balance1
        }
    };

    let spy = jest.spyOn(basePurchase, "register").mockResolvedValue(null);
    
    await purchaseController.writePurchase(mockRequest, mockResponse);

    let responseBody = mockResponse.status().json.mock.calls[0][0];
    let reponseStatus = mockStatusCode.mock.calls[0][0];

    expect(responseBody).toMatchObject({errorMessage: "No purchase found"});
    expect(reponseStatus).toBe(500);

    spy.mockRestore();
});
test('writePurchase error', async () => {
    let mockStatusCode = jest.fn();
    let mockResponse = {status : mockStatusCode.mockReturnValue({json: jest.fn()})}

    let mockRequest = {
        body: {
            title: purchase0.title,
            amount: purchase0.amount,
            date: purchase0.date,
            buyTo: purchase0.buyTo,
            from: purchase0.from,
            listId: purchase0.listId,
            total0: purchase0.total0,
            total1: purchase0.total1,
            balance0: purchase0.balance0,
            balance1: purchase0.balance1
        }
    };

    let spy = jest.spyOn(basePurchase, "register").mockRejectedValue(
        new Error(errorMessage)
    );
    
    await purchaseController.writePurchase(mockRequest, mockResponse);

    let responseBody = mockResponse.status().json.mock.calls[0][0];
    let reponseStatus = mockStatusCode.mock.calls[0][0];

    expect(responseBody).toMatchObject(errorObject);
    expect(reponseStatus).toBe(500);

    spy.mockRestore();
});