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

test('readLists', async () => {
    let mockStatusCode = jest.fn();
    let mockResponse = {
        status : mockStatusCode.mockReturnValue({json: jest.fn()})
    }

    let mockRequest = { }

    let getAllLists = jest.spyOn(baseList, "getAllLists").mockResolvedValue([list0]);
    let countSpy = jest.spyOn(baseList, "count").mockResolvedValue(1);
    
    await listController.readLists(mockRequest, mockResponse);

    let responseBody = mockResponse.status().json.mock.calls[0][0];
    let reponseStatus = mockStatusCode.mock.calls[0][0];

    expect(responseBody).toMatchObject({
        lists: [list0],
        count: 1
    });
    expect(reponseStatus).toBe(200);
    expect(countSpy).toHaveBeenCalled();

    getAllLists.mockRestore();
    countSpy.mockRestore();
});
test('readLists error list', async () => {
    let mockStatusCode = jest.fn();
    let mockResponse = {
        status : mockStatusCode.mockReturnValue({json: jest.fn()})
    }

    let mockRequest = { }

    let getAllLists = jest.spyOn(baseList, "getAllLists").mockRejectedValue(
        new Error(errorMessage)
    );
    let countSpy = jest.spyOn(baseList, "count").mockResolvedValue(1);
    
    await listController.readLists(mockRequest, mockResponse);

    let responseBody = mockResponse.status().json.mock.calls[0][0];
    let reponseStatus = mockStatusCode.mock.calls[0][0];

    expect(responseBody).toMatchObject(errorObject);
    expect(reponseStatus).toBe(500);
    expect(countSpy).toBeCalledTimes(0);

    getAllLists.mockRestore();
    countSpy.mockRestore();
});
test('readLists error list empty', async () => {
    let mockStatusCode = jest.fn();
    let mockResponse = {
        status : mockStatusCode.mockReturnValue({json: jest.fn()})
    }

    let mockRequest = { }

    let getAllLists = jest.spyOn(baseList, "getAllLists").mockResolvedValue(null);
    let countSpy = jest.spyOn(baseList, "count").mockResolvedValue(1);
    
    await listController.readLists(mockRequest, mockResponse);

    let responseBody = mockResponse.status().json.mock.calls[0][0];
    let reponseStatus = mockStatusCode.mock.calls[0][0];

    expect(responseBody).toMatchObject({ errorMessage: "List not found" });
    expect(reponseStatus).toBe(500);
    expect(countSpy).toBeCalledTimes(0);

    getAllLists.mockRestore();
    countSpy.mockRestore();
});
test('readLists error count', async () => {
    let mockStatusCode = jest.fn();
    let mockResponse = {
        status : mockStatusCode.mockReturnValue({json: jest.fn()})
    }

    let mockRequest = { }

    let getAllLists = jest.spyOn(baseList, "getAllLists").mockResolvedValue([list0]);
    let countSpy = jest.spyOn(baseList, "count").mockRejectedValue(
        new Error(errorMessage)
    );
    
    await listController.readLists(mockRequest, mockResponse);

    let responseBody = mockResponse.status().json.mock.calls[0][0];
    let reponseStatus = mockStatusCode.mock.calls[0][0];

    expect(responseBody).toMatchObject(errorObject);
    expect(reponseStatus).toBe(500);

    getAllLists.mockRestore();
    countSpy.mockRestore();
});
test('readLists error count empty', async () => {
    let mockStatusCode = jest.fn();
    let mockResponse = {
        status : mockStatusCode.mockReturnValue({json: jest.fn()})
    }

    let mockRequest = { }

    let getAllLists = jest.spyOn(baseList, "getAllLists").mockResolvedValue([list0]);
    let countSpy = jest.spyOn(baseList, "count").mockResolvedValue(null);
    
    await listController.readLists(mockRequest, mockResponse);

    let responseBody = mockResponse.status().json.mock.calls[0][0];
    let reponseStatus = mockStatusCode.mock.calls[0][0];

    expect(responseBody).toMatchObject({ errorMessage: "List count not found" });
    expect(reponseStatus).toBe(500);

    getAllLists.mockRestore();
    countSpy.mockRestore();
});