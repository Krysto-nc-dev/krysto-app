const products = [
  {
    dolibarrId: '109',
    name: 'Bagues',
    description:
      'En choisissant nos bagues écologiques, vous faites plus qu’adopter un bijou élégant. Vous exprimez votre individualité et votre engagement envers la mode durable. Soyez fier de porter une bague qui allie style et responsabilité, et montrez au monde que l’élégance et l’éthique peuvent aller de pair',
    price: 200,
    quantity: 50,
    image: '/images/product1.jpg',
    category: 'Mode',
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
    name: 'Sous verres',
    dolibarrId: '119',
    description:
      'Proteger vos surfaces et la planétes avec nos sous verres en plastique recyclée',
    price: 400,
    quantity: 30,
    image: '/images/product2.jpg',
    category: 'Maison et jardin',
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
    dolibarrId: '103',
    name: 'Cache-pot ',
    description: 'cache pot en plastique recyclé',
    price: 700,
    quantity: 20,
    image: '/images/product3.jpg',
    category: 'Maison et Jardin',
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
  {
    dolibarrId: '102',
    name: 'Porte savons ',
    description: 'Porte savon en plastique recyclé',
    price: 800,
    quantity: 20,
    image: '/images/product3.jpg',
    category: 'Maison et jardin',
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
    countInStock: 0,
  },
  // Ajoutez d'autres produits si nécessaire
]

export default products
