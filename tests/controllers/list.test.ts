import { IList } from "../../src/models/list";
import { baseList } from "../../src/compute/base/list";
import { listController } from "../../src/controllers/list";


let list0 : IList = {
    _id: "_id",
    name: "listName",
    main: true,
    total0: 11,
    total1: 13,
    balance0: 10,
    balance1: 12,
    merged: false
};
let errorMessage : string = 'Async error message';
let errorObject : object = {
    errorMessage: errorMessage
};


test('writeList', async () => {
    let mockStatusCode = jest.fn();
    let mockResponse = {
        status : mockStatusCode.mockReturnValue({json: jest.fn()})
    }

    let mockRequest = {
        body: {
            name: list0.name,
            main: list0.main,
            balance0: list0.balance0,
            balance1: list0.balance1,
            merged: list0.merged,
            total0: list0.total0,
            total1: list0.total1
        }
    };

    let spy = jest.spyOn(baseList, "register").mockResolvedValue(
        list0
    );
    
    await listController.writeList(mockRequest, mockResponse);

    let responseBody = mockResponse.status().json.mock.calls[0][0];
    let reponseStatus = mockStatusCode.mock.calls[0][0];

    expect(responseBody).toBe(list0);
    expect(reponseStatus).toBe(201);

    spy.mockRestore();
});
test('writeList error', async () => {
    let mockStatusCode = jest.fn();
    let mockResponse = {
        status : mockStatusCode.mockReturnValue({json: jest.fn()})
    }

    let mockRequest = {
        body: {
            name: list0.name,
            main: list0.main,
            balance0: list0.balance0,
            balance1: list0.balance1,
            merged: list0.merged,
            total0: list0.total0,
            total1: list0.total1
        }
    };

    let spy = jest.spyOn(baseList, "register").mockRejectedValue(
        new Error(errorMessage)
    );
    
    await listController.writeList(mockRequest, mockResponse);

    let responseBody = mockResponse.status().json.mock.calls[0][0];
    let reponseStatus = mockStatusCode.mock.calls[0][0];

    expect(reponseStatus).toBe(500);
    expect(responseBody).toMatchObject(errorObject);

    spy.mockRestore();
});
test('writeList error list', async () => {
    let mockStatusCode = jest.fn();
    let mockResponse = {
        status : mockStatusCode.mockReturnValue({json: jest.fn()})
    }

    let mockRequest = {
        body: {
            name: list0.name,
            main: list0.main,
            balance0: list0.balance0,
            balance1: list0.balance1,
            merged: list0.merged,
            total0: list0.total0,
            total1: list0.total1
        }
    };

    let spy = jest.spyOn(baseList, "register").mockResolvedValue(null);
    
    await listController.writeList(mockRequest, mockResponse);

    let responseBody = mockResponse.status().json.mock.calls[0][0];
    let reponseStatus = mockStatusCode.mock.calls[0][0];

    expect(reponseStatus).toBe(500);
    expect(responseBody).toMatchObject({ errorMessage: "No list created" });

    spy.mockRestore();
});
