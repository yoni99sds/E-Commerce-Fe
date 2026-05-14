Create a full-stack e-commerce web application.

Frontend:
-   Homepage: Hero section with image slides, category navigation, featured products.
-   Category Page: Display products belonging to a selected category.
-   Product Detail Page: Show individual product information.
-   Shopping Cart: Allow users to add/remove items, view subtotal.
-   Checkout: Collect shipping address and process payment.
-   User Authentication: Registration and login.
-   Admin Dashboard: Manage products (add, edit, delete), view orders.

Backend/Database (Supabase):
-   Database Schema:
    -   'products' table (name, description, price, image_url, category_id, stock)
    -   'categories' table (name)
    -   'users' table (name, email, password_hash)
    -   'orders' table (user_id, order_date, total_amount, shipping_address, status)
    -   'order_items' table (order_id, product_id, quantity, price_at_purchase)
    -   'promo_codes' table (code, discount_type, discount_value, expiry_date, active)
-   Authentication: Implement user signup and login using Supabase Auth.
-   API Endpoints: For fetching products, categories, managing cart, placing orders, managing products (admin).
-   Payment Gateway Integration: Integrate a payment gateway (e.g., Stripe) for processing payments.
-   Promo Code Logic: Implement validation and application of promo codes during checkout.
-   Admin Functionality: Backend logic for product and order management.

Workflow:
1.  Frontend Engineer: Generate images, then build all UI components and frontend logic.
2.  Supabase Engineer: Set up database, authentication, and backend logic for product/order management, promo codes, and payment gateway.
3.  The Architect will then validate the build.