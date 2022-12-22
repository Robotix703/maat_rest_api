import { IPrettyPurchase, IPurchase } from "../../src/models/purchase";
import { basePurchase } from "../../src/compute/base/purchase";
import { purchaseController } from "../../src/controllers/purchase";
import { computePurchase } from "../../src/compute/computePurchase";
import { IDeleteOne, IStatus } from "../../src/models/mongoose";
import { IPrettyUser } from "../../src/models/user";
import { IList } from "../../src/models/list";
import { IUpdateOne } from "../../src/models/mongoose";


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
let list0 : IList = {
    _id: "_id",
    name: "listName",
    main: true,
    total0: 10,
    total1: 11,
    balance0: 12,
    balance1: 13,
    merged: true
}
let prettyPurchase : IPrettyPurchase = {
    _id: "_id",
    title: "purchaseTitle",
    amount: 10,
    date: new Date(),
    buyTo: ["user0", "user1"],
    from: "user0",
    list: list0,
    total0: 11,
    total1: 12,
    balance0: 13,
    balance1: 14,
    user0: prettyUser0,
    user1: prettyUser1
}
let updateOne0 : IUpdateOne = {
    modifiedCount: 1,
    acknowledged: true
}
let updateOneNotUpdate : IUpdateOne = {
    modifiedCount: 0,
    acknowledged: false
}

let deleteOne0 : IDeleteOne = {
    n: 1,
    deletedCount: 1,
    ok: 1
}
let deleteNoOne : IDeleteOne = {
    n: 0,
    deletedCount: 0,
    ok: 0
}

let statusOK : IStatus = {status: "OK"};
let statusNOK : IStatus = {status: "NOK"};
let statusNotUpdated : any = { message: "Pas de modification" };
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

test('addPurchase', async () => {
    let mockStatusCode = jest.fn();
    let mockResponse = {status : mockStatusCode.mockReturnValue({json: jest.fn()})}

    let mockRequest = {
        body: {
            title: purchase0.title,
            amount: purchase0.amount,
            buyTo: purchase0.buyTo,
            from: purchase0.from,
            listId: purchase0.listId
        }
    };

    let spy = jest.spyOn(computePurchase, "add").mockResolvedValue(statusOK);
    
    await purchaseController.addPurchase(mockRequest, mockResponse);

    let responseBody = mockResponse.status().json.mock.calls[0][0];
    let reponseStatus = mockStatusCode.mock.calls[0][0];

    expect(responseBody).toBe(statusOK);
    expect(reponseStatus).toBe(200);

    spy.mockRestore();
});
test('addPurchase not OK', async () => {
    let mockStatusCode = jest.fn();
    let mockResponse = {status : mockStatusCode.mockReturnValue({json: jest.fn()})}

    let mockRequest = {
        body: {
            title: purchase0.title,
            amount: purchase0.amount,
            buyTo: purchase0.buyTo,
            from: purchase0.from,
            listId: purchase0.listId
        }
    };

    let spy = jest.spyOn(computePurchase, "add").mockResolvedValue(statusNOK);
    
    await purchaseController.addPurchase(mockRequest, mockResponse);

    let responseBody = mockResponse.status().json.mock.calls[0][0];
    let reponseStatus = mockStatusCode.mock.calls[0][0];

    expect(responseBody).toBe(statusNOK);
    expect(reponseStatus).toBe(500);

    spy.mockRestore();
});
test('addPurchase error', async () => {
    let mockStatusCode = jest.fn();
    let mockResponse = {status : mockStatusCode.mockReturnValue({json: jest.fn()})}

    let mockRequest = {
        body: {
            title: purchase0.title,
            amount: purchase0.amount,
            buyTo: purchase0.buyTo,
            from: purchase0.from,
            listId: purchase0.listId
        }
    };

    let spy = jest.spyOn(computePurchase, "add").mockRejectedValue(
        new Error(errorMessage)
    );
    
    await purchaseController.addPurchase(mockRequest, mockResponse);

    let responseBody = mockResponse.status().json.mock.calls[0][0];
    let reponseStatus = mockStatusCode.mock.calls[0][0];

    expect(responseBody).toMatchObject(errorObject);
    expect(reponseStatus).toBe(500);

    spy.mockRestore();
});

test('readPurchases', async () => {
    let mockStatusCode = jest.fn();
    let mockResponse = {status : mockStatusCode.mockReturnValue({json: jest.fn()})}

    let mockRequest = {
        query: {
            listId: purchase0.listId
        }
    };

    let spy = jest.spyOn(computePurchase, "getPurchasesByListId").mockResolvedValue([prettyPurchase]);
    
    await purchaseController.readPurchases(mockRequest, mockResponse);

    let responseBody = mockResponse.status().json.mock.calls[0][0];
    let reponseStatus = mockStatusCode.mock.calls[0][0];

    expect(responseBody).toMatchObject([prettyPurchase]);
    expect(reponseStatus).toBe(200);

    spy.mockRestore();
});
test('readPurchases empty', async () => {
    let mockStatusCode = jest.fn();
    let mockResponse = {status : mockStatusCode.mockReturnValue({json: jest.fn()})}

    let mockRequest = {
        query: {
            listId: purchase0.listId
        }
    };

    let spy = jest.spyOn(computePurchase, "getPurchasesByListId").mockResolvedValue(null);
    
    await purchaseController.readPurchases(mockRequest, mockResponse);

    let responseBody = mockResponse.status().json.mock.calls[0][0];
    let reponseStatus = mockStatusCode.mock.calls[0][0];

    expect(responseBody).toMatchObject({errorMessage: "No purchase found"});
    expect(reponseStatus).toBe(500);

    spy.mockRestore();
});
test('readPurchases error', async () => {
    let mockStatusCode = jest.fn();
    let mockResponse = {status : mockStatusCode.mockReturnValue({json: jest.fn()})}

    let mockRequest = {
        query: {
            listId: purchase0.listId
        }
    };

    let spy = jest.spyOn(computePurchase, "getPurchasesByListId").mockRejectedValue(
        new Error(errorMessage)
    );
    await purchaseController.readPurchases(mockRequest, mockResponse);

    let responseBody = mockResponse.status().json.mock.calls[0][0];
    let reponseStatus = mockStatusCode.mock.calls[0][0];

    expect(responseBody).toMatchObject(errorObject);
    expect(reponseStatus).toBe(500);

    spy.mockRestore();
});

test('readPurchase', async () => {
    let mockStatusCode = jest.fn();
    let mockResponse = {status : mockStatusCode.mockReturnValue({json: jest.fn()})}

    let mockRequest = {
        query: {
            purchaseId: purchase0._id
        }
    };

    let spy = jest.spyOn(computePurchase, "getPurchasesByPurchaseId").mockResolvedValue(prettyPurchase);
    
    await purchaseController.readPurchase(mockRequest, mockResponse);

    let responseBody = mockResponse.status().json.mock.calls[0][0];
    let reponseStatus = mockStatusCode.mock.calls[0][0];

    expect(responseBody).toMatchObject(prettyPurchase);
    expect(reponseStatus).toBe(200);

    spy.mockRestore();
});
test('readPurchase empty', async () => {
    let mockStatusCode = jest.fn();
    let mockResponse = {status : mockStatusCode.mockReturnValue({json: jest.fn()})}

    let mockRequest = {
        query: {
            purchaseId: purchase0.listId
        }
    };

    let spy = jest.spyOn(computePurchase, "getPurchasesByPurchaseId").mockResolvedValue(null);
    
    await purchaseController.readPurchase(mockRequest, mockResponse);

    let responseBody = mockResponse.status().json.mock.calls[0][0];
    let reponseStatus = mockStatusCode.mock.calls[0][0];

    expect(responseBody).toMatchObject({errorMessage: "No purchase found"});
    expect(reponseStatus).toBe(500);

    spy.mockRestore();
});
test('readPurchase error', async () => {
    let mockStatusCode = jest.fn();
    let mockResponse = {status : mockStatusCode.mockReturnValue({json: jest.fn()})}

    let mockRequest = {
        query: {
            purchaseId: purchase0.listId
        }
    };

    let spy = jest.spyOn(computePurchase, "getPurchasesByPurchaseId").mockRejectedValue(
        new Error(errorMessage)
    );
    await purchaseController.readPurchase(mockRequest, mockResponse);

    let responseBody = mockResponse.status().json.mock.calls[0][0];
    let reponseStatus = mockStatusCode.mock.calls[0][0];

    expect(responseBody).toMatchObject(errorObject);
    expect(reponseStatus).toBe(500);

    spy.mockRestore();
});

test('updatePurchase', async () => {
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
        },
        params: {
            id: purchase0._id
        }
    };

    let spy = jest.spyOn(basePurchase, "update").mockResolvedValue(updateOne0);
    
    await purchaseController.updatePurchase(mockRequest, mockResponse);

    let responseBody = mockResponse.status().json.mock.calls[0][0];
    let reponseStatus = mockStatusCode.mock.calls[0][0];

    expect(responseBody).toMatchObject(statusOK);
    expect(reponseStatus).toBe(200);

    spy.mockRestore();
});
test('updatePurchase not update', async () => {
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
        },
        params: {
            id: purchase0._id
        }
    };

    let spy = jest.spyOn(basePurchase, "update").mockResolvedValue(updateOneNotUpdate);
    
    await purchaseController.updatePurchase(mockRequest, mockResponse);

    let responseBody = mockResponse.status().json.mock.calls[0][0];
    let reponseStatus = mockStatusCode.mock.calls[0][0];

    expect(responseBody).toMatchObject(statusNotUpdated);
    expect(reponseStatus).toBe(401);

    spy.mockRestore();
});
test('updatePurchase error', async () => {
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
        },
        params: {
            id: purchase0._id
        }
    };

    let spy = jest.spyOn(basePurchase, "update").mockRejectedValue(
        new Error(errorMessage)
    );
    
    await purchaseController.updatePurchase(mockRequest, mockResponse);

    let responseBody = mockResponse.status().json.mock.calls[0][0];
    let reponseStatus = mockStatusCode.mock.calls[0][0];

    expect(responseBody).toMatchObject(errorObject);
    expect(reponseStatus).toBe(500);

    spy.mockRestore();
});

test('updatePrettyPurchase', async () => {
    let mockStatusCode = jest.fn();
    let mockResponse = {status : mockStatusCode.mockReturnValue({json: jest.fn()})}

    let mockRequest = {
        body: {
            title: purchase0.title,
            amount: purchase0.amount,
            buyTo: purchase0.buyTo,
            from: purchase0.from
        },
        params: {
            id: purchase0._id
        }
    };

    let spy = jest.spyOn(computePurchase, "updatePrettyPurchase").mockResolvedValue(updateOne0);
    
    await purchaseController.updatePrettyPurchase(mockRequest, mockResponse);

    let responseBody = mockResponse.status().json.mock.calls[0][0];
    let reponseStatus = mockStatusCode.mock.calls[0][0];

    expect(responseBody).toMatchObject(statusOK);
    expect(reponseStatus).toBe(200);

    spy.mockRestore();
});
test('updatePrettyPurchase not update', async () => {
    let mockStatusCode = jest.fn();
    let mockResponse = {status : mockStatusCode.mockReturnValue({json: jest.fn()})}

    let mockRequest = {
        body: {
            title: purchase0.title,
            amount: purchase0.amount,
            buyTo: purchase0.buyTo,
            from: purchase0.from
        },
        params: {
            id: purchase0._id
        }
    };

    let spy = jest.spyOn(computePurchase, "updatePrettyPurchase").mockResolvedValue(updateOneNotUpdate);
    
    await purchaseController.updatePrettyPurchase(mockRequest, mockResponse);

    let responseBody = mockResponse.status().json.mock.calls[0][0];
    let reponseStatus = mockStatusCode.mock.calls[0][0];

    expect(responseBody).toMatchObject(statusNotUpdated);
    expect(reponseStatus).toBe(401);

    spy.mockRestore();
});
test('updatePrettyPurchase error', async () => {
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
        },
        params: {
            id: purchase0._id
        }
    };

    let spy = jest.spyOn(computePurchase, "updatePrettyPurchase").mockRejectedValue(
        new Error(errorMessage)
    );
    
    await purchaseController.updatePrettyPurchase(mockRequest, mockResponse);

    let responseBody = mockResponse.status().json.mock.calls[0][0];
    let reponseStatus = mockStatusCode.mock.calls[0][0];

    expect(responseBody).toMatchObject(errorObject);
    expect(reponseStatus).toBe(500);

    spy.mockRestore();
});

test('deletePurchase', async () => {
    let mockStatusCode = jest.fn();
    let mockResponse = {
        status : mockStatusCode.mockReturnValue({json: jest.fn()})
    }

    let mockRequest = {
        params: {
            id: purchase0._id
        }
    };

    let spy = jest.spyOn(computePurchase, "deletePurchase").mockResolvedValue(updateOne0);
    
    await purchaseController.deletePurchase(mockRequest, mockResponse);

    let responseBody = mockResponse.status().json.mock.calls[0][0];
    let reponseStatus = mockStatusCode.mock.calls[0][0];

    expect(responseBody).toMatchObject(statusOK);
    expect(reponseStatus).toBe(200);

    spy.mockRestore();
});
test('deletePurchase no deleted', async () => {
    let mockStatusCode = jest.fn();
    let mockResponse = {
        status : mockStatusCode.mockReturnValue({json: jest.fn()})
    }

    let mockRequest = {
        params: {
            id: list0._id
        }
    };

    let spy = jest.spyOn(computePurchase, "deletePurchase").mockResolvedValue(updateOneNotUpdate);
    
    await purchaseController.deletePurchase(mockRequest, mockResponse);

    let responseBody = mockResponse.status().json.mock.calls[0][0];
    let reponseStatus = mockStatusCode.mock.calls[0][0];

    expect(responseBody).toMatchObject(statusNotUpdated);
    expect(reponseStatus).toBe(401);

    spy.mockRestore();
});
test('deletePurchase error', async () => {
    let mockStatusCode = jest.fn();
    let mockResponse = {
        status : mockStatusCode.mockReturnValue({json: jest.fn()})
    }

    let mockRequest = {
        params: {
            id: list0._id
        }
    };

    let spy = jest.spyOn(computePurchase, "deletePurchase").mockRejectedValue(
        new Error(errorMessage)
    );
    
    await purchaseController.deletePurchase(mockRequest, mockResponse);

    let responseBody = mockResponse.status().json.mock.calls[0][0];
    let reponseStatus = mockStatusCode.mock.calls[0][0];

    expect(responseBody).toMatchObject(errorObject);
    expect(reponseStatus).toBe(500);

    spy.mockRestore();
});