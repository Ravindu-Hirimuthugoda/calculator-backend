const subtraction = require("../subtraction");

test("check subtraction is correct", async () => {
  const res = await subtraction.handler(
    { body: JSON.stringify({ num1: 20, num2: 10 }) },
    null
  );
  expect(res.statusCode).toBe(200);
  expect(JSON.parse(res.body).result).toBe(10);
});
