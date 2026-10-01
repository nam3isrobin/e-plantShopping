# Paradise Nursery — Houseplants E-Commerce Application

An interactive, responsive e-commerce web application for **Paradise Nursery** built with **React**, **Redux Toolkit**, and **Vite**.

---

## 🌿 Live Application & Repository Links

* **Live Demo URL**: [https://nam3isrobin.github.io/e-plantShopping](https://nam3isrobin.github.io/e-plantShopping)
* **GitHub Repository URL**: [https://github.com/nam3isrobin/e-plantShopping](https://nam3isrobin.github.io/e-plantShopping)

### 📦 Redux State Management Files
* **Redux Store**: [`src/store.js`](https://github.com/nam3isrobin/e-plantShopping/blob/main/src/store.js)
* **Cart Redux Slice**: [`src/CartSlice.jsx`](https://github.com/nam3isrobin/e-plantShopping/blob/main/src/CartSlice.jsx)

---

## ✨ Features & Rubric Specifications

### 1. Landing Page (5 points)
* **Background Image**: High-resolution greenhouse botanical aesthetic.
* **Company Branding**: "Paradise Nursery" with slogan *"Where Green Meets Serenity"*.
* **Company Mission**: Detailed company overview paragraph detailing indoor plant care and sustainable lifestyle impact.
* **Get Started Button**: Interactive call-to-action button that transitions smoothly into the product catalog.

### 2. Header (7 points)
* **Persistent Display**: Renders across both the Product Listing Page and the Shopping Cart Page.
* **Real-time Cart Icon Badge**: Displays dynamic total quantity counter reflecting items currently in the cart.
* **Seamless Navigation**: Direct links to return to the Landing Page (via Brand Logo) and switch between Products and Cart views.

### 3. Product Listing Page (9 points)
* **Organized Plant Categories**: Houseplants grouped into 5 distinct categories:
  * *Air Purifying Plants*
  * *Aromatic Fragrant Plants*
  * *Insect Repellent Plants*
  * *Medicinal Plants*
  * *Low Maintenance Plants*
* **Product Cards**: Displays thumbnail image, botanical name, description, and price for every plant.
* **Interactive Cart Controls**:
  * Clicking **"Add to Cart"** dispatches Redux action `addItem` and increments the header cart badge by 1.
  * The button transitions into a disabled state showing **"Added to Cart"** to prevent duplicate additions.

### 4. Shopping Cart Page (23 points)
* **Total Plant Count**: Displays the total number of plants in the cart.
* **Grand Total Calculation**: Dynamically computes and displays the total cart amount based on unit prices and quantities.
* **Itemized Cards**: Displays plant thumbnail, name, unit cost, quantity controls, and subtotal.
* **Increment (`+`) Button**: Increases item quantity by 1 and recalculates totals and header badge.
* **Decrement (`-`) Button**: Decreases item quantity by 1. If quantity reaches 1 and decrement is clicked, the item is removed from the cart.
* **Delete Button**: Removes an item completely from the cart and re-enables its "Add to Cart" button on the product page.
* **Checkout Button**: Interactive modal/alert notifying user that checkout is *"Coming Soon"*.
* **Continue Shopping Button**: Returns user directly to the product catalog to browse more plants.

---

## 🛠️ Tech Stack & Architecture

* **Frontend**: React 18
* **State Management**: Redux Toolkit (`@reduxjs/toolkit`, `react-redux`)
* **Build Tooling**: Vite 5
* **Deployment**: GitHub Pages (`gh-pages`)

---

## 🚀 Getting Started Locally

```bash
# 1. Clone repository
git clone git@github.com:nam3isrobin/e-plantShopping.git
cd e-plantShopping

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev

# 4. Build for production
npm run build

# 5. Run end-to-end verification tests
node verify_rubric.mjs
```

---

## 📄 License
This project is licensed under the MIT License.