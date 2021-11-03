import { Database } from "../src/utils";
import { Actions } from "../types";

describe("Crud", () => {
  test(`Crud ${Actions.Get}`, async () => {
    const mock = [{ 
        id: 1,
        name: "Кава",
        type: "Напої",
        cost: "4000" 
    }];
    const wrongMock = [{ 
        id: 1, 
        name: "Кав", 
        type: "Напої", 
        cost: "400" 
    }];
    const result = await Database.Get();
    expect(Array.isArray(result)).toBeTruthy;
    expect(result).toEqual(expect.arrayContaining(mock));
    expect(result).not.toEqual(expect.arrayContaining(wrongMock));
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

});
