import swal from 'sweetalert';

interface Price {
  id: number;
  group_size: string;
  price: number;
  activity: number;
}

export function calculatePrice(
  numPeople: number,
  prices: Price[],
  maxGroupSize: number,
  basePrice: number
): number {
  const matchingPrice = prices.find((price) => {
    const range = price.group_size.split('-');
    const lowerBound = parseInt(range[0], 10);
    const upperBound = parseInt(range[1], 10) || maxGroupSize;
    return numPeople >= lowerBound && numPeople <= upperBound;
  });

  if (!matchingPrice) {
    if (numPeople > maxGroupSize) {
      swal('Error', `No price found for ${numPeople} people`, 'error');
    }
    return basePrice;
  }

  return matchingPrice.price;
}
