const SEAT_VALUE = {
  ECONOMY: "economy",
  BUSINESS: "business",
  PREMIUM_ECONOMY: "premium-economy",
  FIRST_CLASS: "first-class",
};

const BOOKING_STATUS = {
  BOOKED:'booked',
  CANCELLED:'cancelled',
  INITIATED:'initiated',
  PENDING:'pending',
}

const USER_ROLES = {
  CUSTOMER:'customer',
  ADMIN:'admin',
  FLIGHT_COMPANY:'flight-company',
}

module.exports = { SEAT_VALUE,BOOKING_STATUS,USER_ROLES };
