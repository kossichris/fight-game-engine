import Customer from "../../src/car-rental-bug-fixing/Customer";
import Rental from "../../src/car-rental-bug-fixing/Rental";

const { describe, test, expect } = global;

describe("CRS-002", function () {
  test("If car 1, Fees for Rental Number 1 is 2800", async function () {
    const name = "chris";
    const duration = 40;
    const customerRental = new Rental([{ id: 1 }], duration);
    const customer = new Customer(name);
    customer.addRental(customerRental);
    const detailed = await customer.getDetailedFees();
    expect(JSON.stringify(detailed)).toBe(
      JSON.stringify(["Fees for Rental Number 1 is 2800"])
    );
  });
});
