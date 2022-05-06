import Customer from "../../src/car-rental-bug-fixing/Customer";
import Rental from "../../src/car-rental-bug-fixing/Rental";

const { describe, test, expect } = global;

describe("CRS-002", function () {
  test("If cars 1 and 2, the result must be 6800", async function () {
    const name = "chris";
    const totalFees = 6800;
    const duration = 40;
    const customerRental = new Rental([{ id: 1 }, { id: 2 }], duration);
    const customer = new Customer(name);
    customer.addRental(customerRental);
    const total = await customer.getTotalFees();
    expect(total).toBe(`Customer ${name}'s total fees is ${totalFees}`);
  });
});
