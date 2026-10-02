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

    // Master catalog of houseplants grouped into 5 distinct categories with reliable high-res botanical photography
    const plantsArray = [
        {
            category: "Air Purifying Plants",
            plants: [
                {
                    name: "Snake Plant",
                    image: "https://images.unsplash.com/photo-1593482892290-f54927ae1bb6?q=80&w=800&auto=format&fit=crop",
                    description: "Produces oxygen at night, purifying indoor air quality.",
                    cost: "$15"
                },
                {
                    name: "Spider Plant",
                    image: "https://images.unsplash.com/photo-1572688484438-313a6e50c333?q=80&w=800&auto=format&fit=crop",
                    description: "Resilient foliage that filters formaldehyde and household toxins.",
                    cost: "$12"
                },
                {
                    name: "Peace Lily",
                    image: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=800&auto=format&fit=crop",
                    description: "Removes mold spores and blooms elegant white flowers.",
                    cost: "$18"
                },
                {
                    name: "Boston Fern",
                    image: "https://images.unsplash.com/photo-1597055181300-e3633a917c9c?q=80&w=800&auto=format&fit=crop",
                    description: "Adds gentle humidity to the room and purifies ambient air.",
                    cost: "$20"
                },
                {
                    name: "Rubber Plant",
                    image: "https://images.unsplash.com/photo-1600411833196-7c1f6b1a8b90?q=80&w=800&auto=format&fit=crop",
                    description: "Broad glossy leaves that efficiently trap dust and airborne pollutants.",
                    cost: "$17"
                },
                {
                    name: "Aloe Vera",
                    image: "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?q=80&w=800&auto=format&fit=crop",
                    description: "Natural air cleaner and renowned therapeutic skin healer.",
                    cost: "$14"
                }
            ]
        },
        {
            category: "Aromatic Fragrant Plants",
            plants: [
                {
                    name: "Lavender",
                    image: "https://images.unsplash.com/photo-1611909023032-2d6b3134ecba?q=80&w=800&auto=format&fit=crop",
                    description: "Calming botanical scent widely prized in holistic aromatherapy.",
                    cost: "$20"
                },
                {
                    name: "Jasmine",
                    image: "https://images.unsplash.com/photo-1592729645009-b96d1e63d14b?q=80&w=800&auto=format&fit=crop",
                    description: "Sweet delicate fragrance that promotes deep relaxation.",
                    cost: "$18"
                },
                {
                    name: "Rosemary",
                    image: "https://images.unsplash.com/photo-1515586000433-45406d8e6662?q=80&w=800&auto=format&fit=crop",
                    description: "Invigorating pine-like scent excellent for culinary seasoning.",
                    cost: "$15"
                },
                {
                    name: "Mint",
                    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=800&auto=format&fit=crop",
                    description: "Crisp refreshing aroma, perfect for teas and kitchen gardens.",
                    cost: "$12"
                },
                {
                    name: "Lemon Balm",
                    image: "https://images.unsplash.com/photo-1598880940080-ff9a29891b85?q=80&w=800&auto=format&fit=crop",
                    description: "Delightful citrus aroma that relieves anxiety and aids sleep.",
                    cost: "$14"
                },
                {
                    name: "Hyacinth",
                    image: "https://images.unsplash.com/photo-1520763185298-1b434c919102?q=80&w=800&auto=format&fit=crop",
                    description: "Spectacular flower clusters with a rich honeyed floral perfume.",
                    cost: "$22"
                }
            ]
        },
        {
            category: "Insect Repellent Plants",
            plants: [
                {
                    name: "Oregano",
                    image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=800&auto=format&fit=crop",
                    description: "Possesses strong natural carvacrol compounds that deter garden pests.",
                    cost: "$10"
                },
                {
                    name: "Marigold",
                    image: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?q=80&w=800&auto=format&fit=crop",
                    description: "Vibrant golden blossoms that naturally repel mosquitoes and nematodes.",
                    cost: "$8"
                },
                {
                    name: "Geraniums",
                    image: "https://images.unsplash.com/photo-1589244159943-460088ed5c92?q=80&w=800&auto=format&fit=crop",
                    description: "Classic ornamental blooms that deter flying insects with citrus notes.",
                    cost: "$20"
                },
                {
                    name: "Basil",
                    image: "https://images.unsplash.com/photo-1618375569909-3c8616cf7733?q=80&w=800&auto=format&fit=crop",
                    description: "Aromatic garden essential that naturally keeps flies and pests away.",
                    cost: "$9"
                },
                {
                    name: "Catnip",
                    image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?q=80&w=800&auto=format&fit=crop",
                    description: "Rich in nepetalactone which repels bugs ten times better than DEET.",
                    cost: "$13"
                },
                {
                    name: "Citronella Grass",
                    image: "https://images.unsplash.com/photo-1512428813834-c702c7702b78?q=80&w=800&auto=format&fit=crop",
                    description: "The gold standard natural mosquito and insect deterrent.",
                    cost: "$16"
                }
            ]
        },
        {
            category: "Medicinal Plants",
            plants: [
                {
                    name: "Echinacea",
                    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=800&auto=format&fit=crop",
                    description: "Purple coneflower famed for boosting natural immune defenses.",
                    cost: "$16"
                },
                {
                    name: "Peppermint",
                    image: "https://images.unsplash.com/photo-1628744448840-55bdb2497bd4?q=80&w=800&auto=format&fit=crop",
                    description: "Cooling menthol leaves that soothe digestion and tension.",
                    cost: "$13"
                },
                {
                    name: "Chamomile",
                    image: "https://images.unsplash.com/photo-1587593810167-a84920ea0781?q=80&w=800&auto=format&fit=crop",
                    description: "Gentle daisy-like herb known worldwide for calming nerves.",
                    cost: "$15"
                },
                {
                    name: "Calendula",
                    image: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?q=80&w=800&auto=format&fit=crop",
                    description: "Golden petals packed with skin-rejuvenating flavonoids.",
                    cost: "$12"
                },
                {
                    name: "Ashwagandha",
                    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?q=80&w=800&auto=format&fit=crop",
                    description: "Revered Ayurvedic adaptogen that builds stamina and mental focus.",
                    cost: "$24"
                },
                {
                    name: "Thyme",
                    image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=800&auto=format&fit=crop",
                    description: "Antimicrobial thymol herb ideal for respiratory comfort.",
                    cost: "$11"
                }
            ]
        },
        {
            category: "Low Maintenance Plants",
            plants: [
                {
                    name: "ZZ Plant",
                    image: "https://images.unsplash.com/photo-1632207691143-643e2a9a9361?q=80&w=800&auto=format&fit=crop",
                    description: "Thrives in low light conditions with infrequent watering.",
                    cost: "$25"
                },
                {
                    name: "Pothos",
                    image: "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?q=80&w=800&auto=format&fit=crop",
                    description: "Extremely resilient vine that trails gracefully across any room.",
                    cost: "$10"
                },
                {
                    name: "Cast Iron Plant",
                    image: "https://images.unsplash.com/photo-1600411833196-7c1f6b1a8b90?q=80&w=800&auto=format&fit=crop",
                    description: "Nearly indestructible indoor plant that tolerates deep shade.",
                    cost: "$20"
                },
                {
                    name: "Succulents",
                    image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?q=80&w=800&auto=format&fit=crop",
                    description: "Drought-hardy miniature sculptures that demand very little water.",
                    cost: "$18"
                },
                {
                    name: "Aglaonema",
                    image: "https://images.unsplash.com/photo-1593482892290-f54927ae1bb6?q=80&w=800&auto=format&fit=crop",
                    description: "Lush variegated foliage that effortlessly brightens darker corners.",
                    cost: "$22"
                },
                {
                    name: "Jade Plant",
                    image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?q=80&w=800&auto=format&fit=crop",
                    description: "Beloved good-luck succulent with plump, jewel-toned leaves.",
                    cost: "$19"
                }
            ]
        }
    ];

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
            <header className="navbar">
                <div className="tag">
                    <div className="luxury">
                        <img
                            src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=160&auto=format&fit=crop"
                            alt="Paradise Nursery Logo"
                        />
                        <a href="/" onClick={(e) => handleHomeClick(e)}>
                            <h3>Paradise Nursery</h3>
                            <i>Where Green Meets Serenity</i>
                        </a>
                    </div>
                </div>

                <nav className="nav-menu">
                    <a href="#plants" onClick={(e) => handlePlantsClick(e)} className="nav-link">
                        Plants
                    </a>
                    <a
                        href="#cart"
                        onClick={(e) => handleCartClick(e)}
                        className="nav-cart-link"
                        aria-label={`Shopping cart with ${totalItems} items`}
                    >
                        {/* Dynamic Cart Count Badge */}
                        <div className="cart_quantity_count">{totalItems}</div>
                        <div className="cart">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 256 256"
                                id="IconChangeColor"
                            >
                                <rect width="256" height="256" fill="none"></rect>
                                <circle cx="80" cy="216" r="16" fill="#ffffff"></circle>
                                <circle cx="184" cy="216" r="16" fill="#ffffff"></circle>
                                <path
                                    d="M42.3,72H221.7l-26.4,92.4A15.9,15.9,0,0,1,179.9,176H84.1a15.9,15.9,0,0,1-15.4-11.6L32.5,37.8A8,8,0,0,0,24.8,32H8"
                                    fill="none"
                                    stroke="#ffffff"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="16"
                                    id="mainIconPathAttribute"
                                ></path>
                            </svg>
                        </div>
                    </a>
                </nav>
            </header>

            {/* Main Content Area: Conditional Rendering between Product Listing and Shopping Cart */}
            {!showCart ? (
                <main className="product-grid">
                    {plantsArray.map((category, index) => (
                        <section key={index} style={{ width: '100%' }}>
                            {/* Plant Category Heading */}
                            <div className="plantname_heading">
                                <h2 className="plant_heading">{category.category}</h2>
                            </div>

                            {/* Grid of Plant Cards in this Category */}
                            <div className="product-list">
                                {category.plants.map((plant, plantIndex) => {
                                    const itemAdded = isInCart(plant.name);
                                    return (
                                        <article className="product-card" key={plantIndex}>
                                            <img
                                                className="product-image"
                                                src={plant.image}
                                                alt={plant.name}
                                                loading="lazy"
                                            />
                                            <div className="product-info">
                                                <h3 className="product-title">{plant.name}</h3>
                                                <p className="product-description">
                                                    {plant.description}
                                                </p>
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
                                        </article>
                                    );
                                })}
                            </div>
                        </section>
                    ))}
                </main>
            ) : (
                <CartItem onContinueShopping={handleContinueShopping} />
            )}
        </div>
    );
}

export default ProductList;
