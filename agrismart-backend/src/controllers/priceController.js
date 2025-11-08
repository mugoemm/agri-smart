// Example static price data for common crops
const priceData = [
  { crop: "Maize", unit: "kg", averagePrice: 50, location: "Nairobi" },
  { crop: "Beans", unit: "kg", averagePrice: 120, location: "Nairobi" },
  { crop: "Tomatoes", unit: "kg", averagePrice: 80, location: "Nairobi" },
  { crop: "Potatoes", unit: "kg", averagePrice: 60, location: "Nakuru" },
  { crop: "Onions", unit: "kg", averagePrice: 70, location: "Eldoret" }
];

export const getPriceInsights = (req, res) => {
  res.json(priceData);
};
