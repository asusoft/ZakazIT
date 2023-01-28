const dishCategories = [
    {
        id: 1,
        name: 'Fast Food',
        icon: "https://www.citypng.com/public/uploads/small/11653329235ne77vw13spafnlhowriskdmgxggwddl7kqipk4uyzh7zjvsn4gqeedkyif1cmp6jvlxmax8nfgrpe4diquhgqlwhutw52fvpbpp2.png"
    },
    {
        id: 2,
        name: "Pizza",
        icon: "https://www.freeiconspng.com/thumbs/pizza-png/pizza-png-23.png"
    },
    {
        id: 3,
        name: "Breakfast",
        icon: "https://toppng.com/uploads/preview/big-burger-11562902444grmy1oetg2.png"
    },
    {
        id: 4,
        name: "Drink",
        icon: "https://www.pngall.com/wp-content/uploads/7/Dessert-PNG-Photo.png"
    },
    {
        id: 5,
        name: "Nuggets",
        icon: "https://www.pngall.com/wp-content/uploads/5/Summer-Cocktail-PNG.png"
    },
    {
        id: 6,
        name: "Burger",
        icon: "https://www.citypng.com/public/uploads/small/11653329235ne77vw13spafnlhowriskdmgxggwddl7kqipk4uyzh7zjvsn4gqeedkyif1cmp6jvlxmax8nfgrpe4diquhgqlwhutw52fvpbpp2.png"
    },
]

const Restaurants = [
    {
        "id": "1",
        "name": "El Cabo Coffe Bar Tres De Mayo",
        "deliveryFee": 35,
        "minDeliveryTime": 20,
        "maxDeliveryTime": 30,
        "rating": 4.5,
        "address": "Lenina Avenue 35, No 4, Visotky",
        isFavorite: true,
        "image": "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/uber-eats/restaurant1.jpeg",
        dishes: [
            {
                "id": "1",
                "name": "Cheese Tequeños",
                "description": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
                "price": 6.9,
                "image": "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/uber-eats/restaurant2.jpeg",
                categories: [1, 2],
                isFavorite: true,
                "rating": 4.5,
                sizes: [
                    {
                        "id": "1",
                        "name": "Small",
                        "price": 100
                    },
                    {
                        "id": "2",
                        "name": "Medium",
                        "price": 150
                    },
                    {
                        "id": "3",
                        "name": "Big",
                        "price": 200
                    },
                ]
            },
            {
                "id": "2",
                "name": "Hamburger La Super Cabo Burger",
                "description": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
                "price": 8.9,
                categories: [1, 3],
                isFavorite: false,
                "rating": 4.5,
                "image": "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/uber-eats/restaurant3.jpeg",
                sizes: [
                    {
                        "id": "1",
                        "name": "Small",
                        "price": 100
                    },
                    {
                        "id": "2",
                        "name": "Medium",
                        "price": 150
                    },
                    {
                        "id": "3",
                        "name": "Big",
                        "price": 200
                    },
                ]
            },
            {
                id: "3",
                categories: [6],
                isFavorite: false,
                "rating": 4.5,
                "name": "U.S.A. Burger",
                "description": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
                "price": 5.4,
                sizes: [
                    {
                        "id": "1",
                        "name": "Small",
                        "price": 100
                    },
                    {
                        "id": "2",
                        "name": "Medium",
                        "price": 150
                    },
                    {
                        "id": "3",
                        "name": "Big",
                        "price": 200
                    },
                ]
            },
            {
                id: "4",
                categories: [3, 5],
                isFavorite: true,
                "name": "Slices of Llanero Cheese",
                "description": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
                "price": 5.9,
                sizes: [
                    {
                        "id": "1",
                        "name": "Small",
                        "price": 100
                    },
                    {
                        "id": "2",
                        "name": "Medium",
                        "price": 150
                    },
                    {
                        "id": "3",
                        "name": "Big",
                        "price": 200
                    },
                ]
            },
            {
                id: "5",
                categories: [2, 3, 6],
                isFavorite: false,
                "name": "Papas Locas El Cabo",
                "description": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
                "price": 7.9,
                sizes: [
                    {
                        "id": "1",
                        "name": "Small",
                        "price": 100
                    },
                    {
                        "id": "2",
                        "name": "Medium",
                        "price": 150
                    },
                    {
                        "id": "3",
                        "name": "Big",
                        "price": 200
                    },
                ]
            }
        ]
    },
    {
        "id": "2",
        "name": "Tony Roma's - C.C. Meridiano",
        "deliveryFee": 40,
        "minDeliveryTime": 15,
        "maxDeliveryTime": 35,
        "rating": 4.7,
        isFavorite: true,
        "image": "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/uber-eats/restaurant2.jpeg",
        dishes: [
            {
                "id": "1",
                "name": "Cheese Tequeños",
                "description": "6 pieces of chese with sauce.",
                "price": 6.9,
                "image": "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/uber-eats/restaurant2.jpeg",
                categories: [1, 2],
                isFavorite: true,
                sizes: [
                    {
                        "id": "1",
                        "name": "Small",
                        "price": 100
                    },
                    {
                        "id": "2",
                        "name": "Medium",
                        "price": 150
                    },
                    {
                        "id": "3",
                        "name": "Big",
                        "price": 200
                    },
                ]
            },
            {
                "id": "2",
                "name": "Hamburger La Super Cabo Burger",
                "description": "Double meat, gouda cheese, cheddar cheese, cooked ham, bacon, egg, salad and rustic potatoes.",
                "price": 8.9,
                categories: [1, 3],
                isFavorite: false,
                "image": "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/uber-eats/restaurant3.jpeg"
            },
            {
                id: "3",
                categories: [6],
                isFavorite: false,
                "name": "U.S.A. Burger",
                "description": "Beef, gouda cheese, cheddar cheese, cooked ham, bacon, egg and salad.",
                "price": 5.4
            },
            {
                id: "4",
                categories: [3, 5],
                isFavorite: true,
                "name": "Slices of Llanero Cheese",
                "description": "Ripe plantain with cheese and palm honey.",
                "price": 5.9
            },
            {
                id: "5",
                categories: [2, 3, 6],
                isFavorite: false,
                "name": "Papas Locas El Cabo",
                "image": "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/uber-eats/restaurant2.jpeg",
                "description": "French fries with shredded chicken, gouda cheese and ham.",
                "price": 7.9
            }
        ]
    },
    {
        "id": "3",
        "name": "Brothers Barbecue",
        "deliveryFee": 30,
        "minDeliveryTime": 20,
        "maxDeliveryTime": 30,
        "rating": 4.3,
        isFavorite: false,
        "image": "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/uber-eats/restaurant3.jpeg",
        dishes: [
            {
                "id": "1",
                "name": "Cheese Tequeños",
                "description": "6 pieces of chese with sauce.",
                "price": 6.9,
                "image": "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/uber-eats/restaurant2.jpeg",
                categories: [1, 2],
                isFavorite: true,
            },
            {
                "id": "2",
                "name": "Hamburger La Super Cabo Burger",
                "description": "Double meat, gouda cheese, cheddar cheese, cooked ham, bacon, egg, salad and rustic potatoes.",
                "price": 8.9,
                categories: [1, 3],
                isFavorite: false,
                "image": "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/uber-eats/restaurant3.jpeg"
            },
            {
                id: "3",
                categories: [6],
                isFavorite: false,
                "name": "U.S.A. Burger",
                "description": "Beef, gouda cheese, cheddar cheese, cooked ham, bacon, egg and salad.",
                "price": 5.4
            },
            {
                id: "4",
                categories: [3, 5],
                isFavorite: true,
                "name": "Slices of Llanero Cheese",
                "description": "Ripe plantain with cheese and palm honey.",
                "price": 5.9
            },
            {
                id: "5",
                categories: [2, 3, 6],
                isFavorite: false,
                "name": "Papas Locas El Cabo",
                "description": "French fries with shredded chicken, gouda cheese and ham.",
                "price": 7.9
            }
        ]
    },
    {
        "id": "4",
        "name": "Hamburguesa Nostra La Salle",
        "deliveryFee": 50,
        "minDeliveryTime": 30,
        "maxDeliveryTime": 40,
        "rating": 4.5,
        isFavorite: true,
        "image": "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/uber-eats/restaurant4.jpeg",
        dishes: [
            {
                "id": "1",
                "name": "Cheese Tequeños",
                "description": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
                "price": 6.9,
                "image": "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/uber-eats/restaurant2.jpeg",
                categories: [1, 2],
                isFavorite: true,
            },
            {
                "id": "2",
                "name": "Hamburger La Super Cabo Burger",
                "description": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
                "price": 8.9,
                categories: [1, 3],
                isFavorite: false,
                "image": "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/uber-eats/restaurant3.jpeg"
            },
            {
                id: "3",
                categories: [6],
                isFavorite: false,
                "name": "U.S.A. Burger",
                "description": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
                "price": 5.4
            },
            {
                id: "4",
                categories: [3, 5],
                isFavorite: true,
                "name": "Slices of Llanero Cheese",
                "description": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
                "price": 5.9
            },
            {
                id: "5",
                categories: [2, 3, 6],
                isFavorite: false,
                "name": "Papas Locas El Cabo",
                "description": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
                "price": 7.9
            }
        ]
    }
]

const cart = [
    {
        "id": "1",
        "name": "Cheese Tequeños",
        "description": "6 pieces of chese with sauce.",
        "price": 6.9,
        "image": "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/uber-eats/restaurant2.jpeg",
        categories: [1, 2],
        isFavorite: true,
    },
    {
        "id": "2",
        "name": "Hamburger La Super Cabo Burger",
        "description": "Double meat, gouda cheese, cheddar cheese, cooked ham, bacon, egg, salad and rustic potatoes.",
        "price": 8.9,
        categories: [1, 3],
        isFavorite: false,
        "image": "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/uber-eats/restaurant3.jpeg"
    },
    {
        id: "3",
        categories: [6],
        isFavorite: false,
        "name": "U.S.A. Burger",
        "description": "Beef, gouda cheese, cheddar cheese, cooked ham, bacon, egg and salad.",
        "price": 5.4,
        "image": "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/uber-eats/restaurant3.jpeg"
    },
]

const orders = [
    {
        id: 1,
        restaurant: Restaurants[1],
        items: Restaurants[1].dishes,
        total: 30.97,
        paymentMethod: "Master Card",
        status: "Completed"
    },
    {
        id: 2,
        restaurant: Restaurants[0],
        items: Restaurants[0].dishes,
        total: 30.97,
        paymentMethod: "Visa",
        status: "In Progress"
    },
    {
        id: 3,
        restaurant: Restaurants[2],
        items: Restaurants[2].dishes,
        total: 30.97,
        paymentMethod: "Apple Pay",
        status: "Cancelled"
    },
    {
        id: 4,
        restaurant: Restaurants[3],
        items: Restaurants[3].dishes,
        total: 30.97,
        paymentMethod: "Master Card",
        status: "Completed"
    }
]


export default {
    dishCategories,
    Restaurants,
    cart,
    orders
}