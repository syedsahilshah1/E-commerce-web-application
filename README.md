# E-commerce-web-application

A modern, responsive, and premium E-Commerce Web Application Frontend built using React.js, Vite, React Router DOM, Tailwind CSS (v4), and React Icons.

## 🚀 Key Features

- **Responsive Design**: Mobile-first architecture, adjusting smoothly to Mobile, Tablet, and Desktop screens.
- **Theme Switching**: Dark and Light modes toggled from the header navbar, with persistent state saved in `localStorage`.
- **Shopping Cart**: Real-time quantity controls, size/color selectors, automatic calculations for tax, shipping, discounts, and custom checkout coupon checks.
- **Wishlist**: Save favorite items and transfer them to the shopping cart with a single click.
- **Search & Filtering**: Live search with keyword matching, price range sliders, category selections, review filters, and sorting.
- **Checkout Stepper**: Billing and shipping forms with mockup credit card validations.
- **User Authentication**: Mock registration, login validation, and profile editing, complete with avatar updates and order history tracking.
- **Banners**: Cover banner images across catalog collections and informational pages.
- **Lazy Loading**: High performance page transitions via code-splitting chunks.

---

## 🛠️ Technology Stack

- **Framework**: React.js (v19)
- **Tooling**: Vite
- **Styling**: Tailwind CSS (v4)
- **Routing**: React Router DOM (v7)
- **Icons**: React Icons (Remix Icons)

---

## 📂 Project Structure

```
src/
 ├── assets/        # Visual icons and logos
 ├── components/    # Reusable UI components (Navbar, Footer, ProductCard, FilterSidebar, etc.)
 ├── context/       # Global State Context (Cart, Wishlist, Auth, Theme, Toast)
 ├── data/          # Mock product and FAQ databases (mockData.js)
 ├── layouts/       # Site layout skeletons (MainLayout.jsx)
 ├── pages/         # 15 lazy-loaded storefront pages (Home, Shop, Cart, Profile, etc.)
 └── App.jsx        # Routing configuration and entry point
```

---

## 💻 Local Setup & Development

To run the application locally, run these commands in your shell:

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` (or the reported local URL) to view it.

3. **Build for Production**:
   ```bash
   npm run build
   ```
