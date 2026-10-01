import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './ProductList.css';
import CartItem from './CartItem';
import { addItem } from './CartSlice';

/**
 * ProductList Component:
 * Displays the product catalog categorized into distinct plant categories.
 * Renders the persistent Header with navigation, logo, and a live-updating shopping cart icon badge.
 * Toggles between the Product Listing view and the Shopping Cart view.
 */
function ProductList({ onHomeClick }) {
    // State to toggle between Product Grid and Cart view
    const [showCart, setShowCart] = useState(false);

    // Redux state & dispatch
    const cart = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();

    // Compute total items across all plants in cart (sum of quantities)
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

    // Master catalog of houseplants grouped into 5 distinct categories
    const plantsArray = [
        {
            category: "Air Purifying Plants",
            plants: [
                {
                    name: "Snake Plant",
                    image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg",
                    description: "Produces oxygen at night, improving air quality.",
                    cost: "$15"
                },
                {
                    name: "Spider Plant",
                    image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg",
                    description: "Filters formaldehyde and xylene from the air.",
                    cost: "$12"
                },
                {
                    name: "Peace Lily",
                    image: "https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lilies-4269365_1280.jpg",
                    description: "Removes mold spores and purifies the air.",
                    cost: "$18"
                },
                {
                    name: "Boston Fern",
                    image: "https://cdn.pixabay.com/photo/2020/04/30/19/52/boston-fern-5114414_1280.jpg",
                    description: "Adds humidity to the air and removes toxins.",
                    cost: "$20"
                },
                {
                    name: "Rubber Plant",
                    image: "https://cdn.pixabay.com/photo/2020/02/15/11/49/flower-4850729_1280.jpg",
                    description: "Easy to care for and effective at removing toxins.",
                    cost: "$17"
                },
                {
                    name: "Aloe Vera",
                    image: "https://cdn.pixabay.com/photo/2018/04/02/07/42/leaf-3283175_1280.jpg",
                    description: "Purifies the air and has healing properties for skin.",
                    cost: "$14"
                }
            ]
        },
        {
            category: "Aromatic Fragrant Plants",
            plants: [
                {
                    name: "Lavender",
                    image: "https://images.unsplash.com/photo-1611909023032-2d6b3134ecba?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    description: "Calming scent, widely used in aromatherapy.",
                    cost: "$20"
                },
                {
                    name: "Jasmine",
                    image: "https://images.unsplash.com/photo-1592729645009-b96d1e63d14b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    description: "Sweet fragrance, promotes peaceful relaxation.",
                    cost: "$18"
                },
                {
                    name: "Rosemary",
                    image: "https://cdn.pixabay.com/photo/2019/10/11/07/12/rosemary-4541241_1280.jpg",
                    description: "Invigorating scent, excellent for culinary seasoning.",
                    cost: "$15"
                },
                {
                    name: "Mint",
                    image: "https://cdn.pixabay.com/photo/2016/01/07/18/16/mint-1126282_1280.jpg",
                    description: "Refreshing aroma, used in cooling teas and beverages.",
                    cost: "$12"
                },
                {
                    name: "Lemon Balm",
                    image: "https://cdn.pixabay.com/photo/2019/09/16/07/41/balm-4480134_1280.jpg",
                    description: "Citrusy scent, relieves stress and aids sleep.",
                    cost: "$14"
                },
                {
                    name: "Hyacinth",
                    image: "https://cdn.pixabay.com/photo/2019/04/07/20/20/hyacinth-4110726_1280.jpg",
                    description: "Stunning flowering plant known for intense sweet perfume.",
                    cost: "$22"
                }
            ]
        },
        {
            category: "Insect Repellent Plants",
            plants: [
                {
                    name: "Oregano",
                    image: "https://cdn.pixabay.com/photo/2015/05/30/21/20/oregano-790702_1280.jpg",
                    description: "Natural compounds that help deter pests and insects.",
                    cost: "$10"
                },
                {
                    name: "Marigold",
                    image: "https://cdn.pixabay.com/photo/2022/02/22/05/45/marigold-7028063_1280.jpg",
                    description: "Natural repellent that also brings vibrant color.",
                    cost: "$8"
                },
                {
                    name: "Geraniums",
                    image: "https://cdn.pixabay.com/photo/2012/04/26/21/51/flowerpot-43270_1280.jpg",
                    description: "Pleasant scent while naturally driving away mosquitoes.",
                    cost: "$20"
                },
                {
                    name: "Basil",
                    image: "https://cdn.pixabay.com/photo/2016/07/24/20/48/tulsi-1539181_1280.jpg",
                    description: "Repels flies and mosquitoes, essential in Italian cuisine.",
                    cost: "$9"
                },
                {
                    name: "Catnip",
                    image: "https://cdn.pixabay.com/photo/2015/07/02/21/55/cat-829681_1280.jpg",
                    description: "Repels mosquitoes and brings joy to felines.",
                    cost: "$13"
                },
                {
                    name: "Citronella Grass",
                    image: "https://cdn.pixabay.com/photo/2018/04/02/07/42/leaf-3283175_1280.jpg",
                    description: "Renowned botanical base for organic insect sprays.",
                    cost: "$16"
                }
            ]
        },
        {
            category: "Medicinal Plants",
            plants: [
                {
                    name: "Echinacea",
                    image: "https://cdn.pixabay.com/photo/2014/12/05/03/53/echinacea-557477_1280.jpg",
                    description: "Boosts immune defenses and fights common ailments.",
                    cost: "$16"
                },
                {
                    name: "Peppermint",
                    image: "https://cdn.pixabay.com/photo/2017/07/12/12/23/peppermint-2496773_1280.jpg",
                    description: "Relieves digestive discomfort and tension headaches.",
                    cost: "$13"
                },
                {
                    name: "Chamomile",
                    image: "https://cdn.pixabay.com/photo/2016/08/19/19/48/flowers-1606041_1280.jpg",
                    description: "Gentle floral herb promoting restful relaxation.",
                    cost: "$15"
                },
                {
                    name: "Calendula",
                    image: "https://cdn.pixabay.com/photo/2019/07/15/18/28/flowers-4340127_1280.jpg",
                    description: "Soothes skin irritations and accelerates healing.",
                    cost: "$12"
                },
                {
                    name: "Ashwagandha",
                    image: "https://cdn.pixabay.com/photo/2018/11/15/10/32/plants-3816945_1280.jpg",
                    description: "Ancient adaptogen that reduces stress and fatigue.",
                    cost: "$24"
                },
                {
                    name: "Thyme",
                    image: "https://cdn.pixabay.com/photo/2019/10/11/07/12/rosemary-4541241_1280.jpg",
                    description: "Antimicrobial herb with soothing properties.",
                    cost: "$11"
                }
            ]
        },
        {
            category: "Low Maintenance Plants",
            plants: [
                {
                    name: "ZZ Plant",
                    image: "https://images.unsplash.com/photo-1632207691143-643e2a9a9361?q=80&w=464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    description: "Thrives in low light conditions with infrequent watering.",
                    cost: "$25"
                },
                {
                    name: "Pothos",
                    image: "https://cdn.pixabay.com/photo/2018/11/15/10/32/plants-3816945_1280.jpg",
                    description: "Extremely resilient vine that trails elegantly indoors.",
                    cost: "$10"
                },
                {
                    name: "Cast Iron Plant",
                    image: "https://cdn.pixabay.com/photo/2017/02/16/18/04/cast-iron-plant-2072008_1280.jpg",
                    description: "Hardy specimen that withstands neglect and shade.",
                    cost: "$20"
                },
                {
                    name: "Succulents",
                    image: "https://cdn.pixabay.com/photo/2016/11/21/16/05/cacti-1846147_1280.jpg",
                    description: "Drought-tolerant flora featuring captivating geometric foliage.",
                    cost: "$18"
                },
                {
                    name: "Aglaonema",
                    image: "https://cdn.pixabay.com/photo/2014/10/10/04/27/aglaonema-482915_1280.jpg",
                    description: "Requires minimal care while providing lush leaf patterns.",
                    cost: "$22"
                },
                {
                    name: "Jade Plant",
                    image: "https://cdn.pixabay.com/photo/2020/02/15/11/49/flower-4850729_1280.jpg",
                    description: "Symbol of good luck and very easy to nurture.",
                    cost: "$19"
                }
            ]
        }
    ];

    // Navbar styling definitions
    const styleObj = {
        backgroundColor: '#4CAF50',
        color: '#fff!important',
        padding: '15px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '20px',
    };

    const styleObjUl = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '1100px',
    };

    const styleA = {
        color: 'white',
        fontSize: '30px',
        textDecoration: 'none',
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        cursor: 'pointer',
    };

    /**
     * Navigates back to the Landing Page.
     */
    const handleHomeClick = (e) => {
        e.preventDefault();
        onHomeClick();
    };

    /**
     * Toggles view to the Shopping Cart Page.
     */
    const handleCartClick = (e) => {
        e.preventDefault();
        setShowCart(true);
    };

    /**
     * Navigates to the Plants product listing view.
     */
    const handlePlantsClick = (e) => {
        e.preventDefault();
        setShowCart(false);
    };

    /**
     * Resets view to product grid when continuing shopping from cart.
     */
    const handleContinueShopping = () => {
        setShowCart(false);
    };

    /**
     * Dispatches addItem action to add the selected plant to the Redux cart.
     */
    const handleAddToCart = (plant) => {
        dispatch(addItem(plant));
    };

    /**
     * Helper to verify if an item is already present in the Redux cart.
     * Used to dynamically disable the "Add to Cart" button once selected.
     */
    const isInCart = (plantName) => {
        return cart.some((item) => item.name === plantName);
    };

    return (
        <div>
            {/* Header: Displays on BOTH the Product Listing Page and Shopping Cart Page */}
            <div className="navbar" style={styleObj}>
                <div className="tag">
                    <div className="luxury">
                        <img
                            src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png"
                            alt="Paradise Nursery Logo"
                        />
                        <a href="/" onClick={(e) => handleHomeClick(e)}>
                            <div>
                                <h3 style={{ color: 'white' }}>Paradise Nursery</h3>
                                <i style={{ color: 'white' }}>Where Green Meets Serenity</i>
                            </div>
                        </a>
                    </div>
                </div>

                <div style={styleObjUl}>
                    <div>
                        <a href="#plants" onClick={(e) => handlePlantsClick(e)} style={styleA}>
                            Plants
                        </a>
                    </div>
                    <div>
                        <a
                            href="#cart"
                            onClick={(e) => handleCartClick(e)}
                            style={styleA}
                            aria-label={`Shopping cart with ${totalItems} items`}
                        >
                            {/* Value displaying total number of items in the cart */}
                            <div className="cart_quantity_count">{totalItems}</div>
                            <h1 className="cart">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 256 256"
                                    id="IconChangeColor"
                                    height="68"
                                    width="68"
                                >
                                    <rect width="156" height="156" fill="none"></rect>
                                    <circle cx="80" cy="216" r="12"></circle>
                                    <circle cx="184" cy="216" r="12"></circle>
                                    <path
                                        d="M42.3,72H221.7l-26.4,92.4A15.9,15.9,0,0,1,179.9,176H84.1a15.9,15.9,0,0,1-15.4-11.6L32.5,37.8A8,8,0,0,0,24.8,32H8"
                                        fill="none"
                                        stroke="#faf9f9"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        id="mainIconPathAttribute"
                                    ></path>
                                </svg>
                            </h1>
                        </a>
                    </div>
                </div>
            </div>

            {/* Main Content Area: Conditional Rendering between Product Listing and Shopping Cart */}
            {!showCart ? (
                <div className="product-grid">
                    {plantsArray.map((category, index) => (
                        <div key={index} style={{ width: '100%' }}>
                            {/* Plant Category Heading */}
                            <div className="plantname_heading">
                                <h1 className="plant_heading">{category.category}</h1>
                            </div>

                            {/* Grid of Plant Cards in this Category */}
                            <div className="product-list">
                                {category.plants.map((plant, plantIndex) => {
                                    const itemAdded = isInCart(plant.name);
                                    return (
                                        <div className="product-card" key={plantIndex}>
                                            <img
                                                className="product-image"
                                                src={plant.image}
                                                alt={plant.name}
                                            />
                                            <div className="product-title">{plant.name}</div>
                                            <div
                                                className="product-description"
                                                style={{
                                                    fontStyle: 'italic',
                                                    margin: '8px 0',
                                                    fontSize: '14px',
                                                    color: '#555'
                                                }}
                                            >
                                                {plant.description}
                                            </div>
                                            <div className="product-price">{plant.cost}</div>

                                            {/* Button: disabled and styled when item is added */}
                                            <button
                                                className={`product-button ${itemAdded ? 'added-to-cart' : ''}`}
                                                onClick={() => handleAddToCart(plant)}
                                                disabled={itemAdded}
                                            >
                                                {itemAdded ? 'Added to Cart' : 'Add to Cart'}
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <CartItem onContinueShopping={handleContinueShopping} />
            )}
        </div>
    );
}

export default ProductList;
