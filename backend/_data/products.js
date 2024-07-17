const products = [
  {
    dolibarrId: '25',
    name: 'Product 1',
    description: 'Description for Product 1',
    price: 299.99,
    quantity: 50,
    image: '/images/product1.jpg',
    category: 'Electronics',
    reviews: [
      //   {
      //     user: mongoose.Types.ObjectId('60c72b2f9b1d8c0015fbb020'),
      //     name: 'John Doe',
      //     rating: 5,
      //     comment: 'Great product! Highly recommended.',
      //     createdAt: new Date('2024-06-15'),
      //   },
      //   {
      //     user: mongoose.Types.ObjectId('60c72b2f9b1d8c0015fbb021'),
      //     name: 'Jane Smith',
      //     rating: 4,
      //     comment: 'Very good, but could be cheaper.',
      //     createdAt: new Date('2024-06-16'),
      //   },
    ],
    rating: 4.5,
    numReviews: 2,
    countInStock: 50,
  },
  {
    name: 'Product 2',
    description: 'Description for Product 2',
    price: 499.99,
    quantity: 30,
    image: '/images/product2.jpg',
    category: 'Home Appliances',
    // reviews: [
    //   {

    //     name: 'Emily Brown',
    //     rating: 3,
    //     comment: 'Average product, nothing special.',
    //     createdAt: new Date('2024-06-17'),
    //   },
    // ],
    rating: 3,
    numReviews: 1,
    countInStock: 30,
  },
  {
    dolibarrId: '25',
    name: 'Product 3',
    description: 'Description for Product 3',
    price: 149.99,
    quantity: 20,
    image: '/images/product3.jpg',
    category: 'Books',
    reviews: [
      //   {
      //     user: mongoose.Types.ObjectId('60c72b2f9b1d8c0015fbb023'),
      //     name: 'Stoyann VELTEN',
      //     rating: 5,
      //     comment: 'An excellent read, highly recommend!',
      //     createdAt: new Date('2024-06-18'),
      //   },
    ],
    rating: 5,
    numReviews: 1,
    countInStock: 20,
  },
  // Ajoutez d'autres produits si nécessaire
]

export default products
