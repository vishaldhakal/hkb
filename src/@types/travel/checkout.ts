// ----------------------------------------------------------------------

export type CheckoutFormValuesProps = {
  personalInformation: {
    firstName: string;
    lastName: string;
    fullAddress: string;
    emailAddress: string;
    contactNumber: string;
  };
  additionalInformation: {
    departureDate: string | Date | number | null;
    arrivalDate: string | Date | number | null;
    message: string;
  };
  emergencyContactInformation: {
    firstName: string;
    lastName: string;
    fullAddress: string;
    emailAddress: string;
    contactNumber: string;
    relationship: string;
  };
};
