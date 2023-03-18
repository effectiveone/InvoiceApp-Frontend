import { render } from "@testing-library/react";
import ContrahentGrid from "./ContrahentGrid";

test("renders component correctly", () => {
  const contractor = {
    _id: "1",
    companyName: "ABC Company",
    legalForm: "Limited Liability Company",
    nip: "123-456-78-90",
    regon: "123456789",
    street: "Main Street",
    city: "New York",
    zipCode: "12345",
  };
  render(<ContrahentGrid contractor={contractor} />);
});
