import { Database } from "../src/utils";
import { Actions } from "../types";

describe("Crud", () => {
  test(`Crud ${Actions.Get}`, async () => {
    const mock = [
      {
        id: 1,
        name: "Кава",
        type: "Напої",
        cost: "4000",
      },
    ];
    const wrongMock = [
      {
        id: 1,
        name: "Кав",
        type: "Напої",
        cost: "400",
      },
    ];
    const result = await Database.Get();
    expect(Array.isArray(result)).toBeTruthy;
    expect(result).toEqual(expect.arrayContaining(mock));
    expect(result).not.toEqual(expect.arrayContaining(wrongMock));
  });
  test(`Crud ${Actions.GetByType}`, async () => {
    const mockType = "Перша страва";
    const result = await Database.GetByType({ type: mockType });
    expect(Array.isArray(result)).toBeTruthy;
    const mock = [
      {
        id: 3,
        name: "Суп",
        type: "Перша страва",
        cost: "12000",
      },
      {
        id: 4,
        name: "Суп2",
        type: "Перша страва",
        cost: "13000",
      },
      {
        id: 5,
        name: "Суп3",
        type: "Перша страва",
        cost: "14000",
      },
      {
        id: 6,
        name: "Суп4",
        type: "Перша страва",
        cost: "15000",
      },
      {
        id: 7,
        name: "Суп5",
        type: "Перша страва",
        cost: "21000",
      },
      {
        id: 9,
        name: "Суп6",
        type: "Перша страва",
        cost: "22000",
      },
    ];
    expect(result).toEqual(expect.arrayContaining(mock));
  });
  test(`Crud ${Actions.GetTypes}`, async () => {
    const typeMock = [{type: "Напої"}, {type: "Перша страва"}];
    const result = await Database.GetTypes();
    expect(Array.isArray(result)).toBeTruthy;
    expect(result).toEqual(expect.arrayContaining(typeMock));
  });
  test(`Crud ${Actions.GetById}`, async () => {
    const id = "3";
    const result = await Database.GetById({ id: id });
    expect(Array.isArray(result)).toBeTruthy;
    const mock = [
      {
        id: 3,
        name: "Суп",
        type: "Перша страва",
        cost: "12000",
      },
    ];
    expect(result).toEqual(expect.arrayContaining(mock));
  });
  test(`Crud ${Actions.Insert}`, async () => {
    const insertMock = {
      name: "Торт",
      type: "Солодощі",
      cost: "14000",
    };
    const result = await Database.Insert(insertMock);
    expect(result.message).toContain("Insert: Success");
    expect(Number(result.id)).not.toBeNaN;
    const updateMock = {
      id: result.id,
      name: "Торт",
      type: "Солодощі",
      cost: "4000",
    };
    const resultUpdate = await Database.Insert(updateMock);
    expect(resultUpdate.message).toContain("Update: Success");
  });

  test(`Crud ${Actions.Update}`, async () => {
    const id = "2";
    const oldMock = [
      {
        id: 2,
        name: "Чай",
        type: "Напої",
        cost: "2000",
      },
    ];
    const updateMock = {
      id: "2",
      name: "Нова назва",
      type: "Новий тип",
      cost: "20000",
    };
    const updateMockResult = [
      {
        id: 2,
        name: "Нова назва",
        type: "Новий тип",
        cost: "20000",
      },
    ];
    const result = await Database.GetById({ id: id });
    expect(Array.isArray(result)).toBeTruthy;
    expect(result).toEqual(oldMock);

    const resultUpdate = await Database.Update(updateMock);
    expect(resultUpdate.message).toContain("Update: Success");

    const resultAfterUpdate = await Database.GetById({ id: id });
    expect(Array.isArray(resultAfterUpdate)).toBeTruthy;
    expect(resultAfterUpdate).toEqual(updateMockResult);
  });

  test(`Crud ${Actions.Delete}`, async () => {
    const mock = [
      {
        id: 1,
        name: "Кава",
        type: "Напої",
        cost: "4000",
      },
    ];
    const mockId = "1";
    const beforeDeleteResult = await Database.Get();
    expect(Array.isArray(beforeDeleteResult)).toBeTruthy;
    expect(beforeDeleteResult).toEqual(expect.arrayContaining(mock));

    const deleteResult = await Database.Delete({ id: mockId });
    expect(deleteResult.message).toContain(
      "Delete: Success, 1 items were affected"
    );

    const afterDeleteResult = await Database.Get();
    expect(afterDeleteResult).not.toEqual(expect.arrayContaining(mock));
  });
});
