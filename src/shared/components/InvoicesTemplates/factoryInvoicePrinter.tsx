import BasicInvoiceTemplate from "./BasicInvoiceTemplate";
import MediumInvoiceTemplate from "./MediumInvoiceTemplate";
import SimpleInvoiceTemplate from "./SimpleInvoiceTemplate";
import { useSelector } from "react-redux";

const FactoryInvoicePrinter = ({
  ref,
}: {
  ref: React.MutableRefObject<any>,
}) => {
  const selectedOption = useSelector(
    (state: any) => state?.template.selectedOption
  );

  switch (selectedOption) {
    case "basicInput":
      return <BasicInvoiceTemplate ref={ref} />;
    case "mediumInput":
      return <MediumInvoiceTemplate ref={ref} />;
    case "printerInput":
      return <SimpleInvoiceTemplate ref={ref} />;
    default:
      return <SimpleInvoiceTemplate ref={ref} />;
  }
};

export default FactoryInvoicePrinter;
