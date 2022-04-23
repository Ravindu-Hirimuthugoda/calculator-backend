const multiplication = require("../multiplication");

test("check multiplication is correct", async () => {
  const res = await multiplication.handler(
    { body: JSON.stringify({ num1: 10, num2: 20 }) },
    null
  );
  expect(res.statusCode).toBe(200);
  expect(JSON.parse(res.body).result).toBe(200);
});
