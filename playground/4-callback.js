/**
 * Callback pattern
 */

const geocode = (address, callback) => {
  setTimeout(() => {
    const data = {
      latitude: 0,
      longitude: 0
    };

    callback(data);
  }, 1000);
};

// geocode('Philadelphia', data => {
//   console.log(data);
// });

/**
 * Callback challenge
 * Add function
 */

const add = (a, b, callback) => {
  setTimeout(() => {
    callback(a + b);
  }, 2000);
};

add(1, 4, sum => {
  console.log(sum);
}); // returns the sum after 2 seconds
