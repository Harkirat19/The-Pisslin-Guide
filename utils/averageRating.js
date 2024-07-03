export function averageRating(reviews) {
  if (reviews?.length === 0) return "No reviews yet"; // Avoid division by zero
  const total = reviews.reduce((acc, review) => {
    const rating = Number(review.rating); // Convert rating to a number
    return acc + (isNaN(rating) ? 0 : rating); // Add rating if it's a number, otherwise add 0
  }, 0);
  const average = total / reviews.length;
  return Number(average.toFixed(1)); // Round to one decimal place and convert back to number
}
