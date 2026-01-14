Great 👍
Below is a **GitHub-ready `README.md`** you can **copy–paste directly** for your repository.

---

# ☕ Coffee Shop E-Commerce App (React)

A modern **React-based E-Commerce application** with **Admin & User roles**, **product reviews & ratings**, **wishlist**, **cart**, **order management**, and **light/dark theme support**.

---

## 🚀 Features

### 👤 User

* Register & Login
* Browse products
* Search & filter by category
* Add to cart
* Wishlist support
* Submit product **reviews & ratings**
* Checkout & order history
* Light / Dark mode

### 🛠 Admin

* Admin-protected routes
* Add / Edit / Delete products
* View all orders
* Update order status
* View **customer reviews & ratings** (read-only)
* Dashboard with order stats & revenue

---

## 🧱 Tech Stack

* **React**
* **React Router**
* **Context API**
* **Tailwind CSS**
* **LocalStorage** (data persistence)
* **React Icons**
* **React Hot Toast**

---

## 📁 Project Structure

```
src/
├── Components/
│   ├── Navbar.jsx
│   ├── Card.jsx
│   ├── ProtectedRoute.jsx
│   ├── AdminPath.jsx
│   ├── ImageSkeleton.jsx
│   └── QuickViewModal.jsx
│
├── Context/
│   ├── UserContext.jsx
│   ├── ProductContext.jsx
│   ├── CartContext.jsx
│   ├── OrderContext.jsx
│   ├── WishlistContext.jsx
│   └── ThemeContext.jsx
│
├── Pages/
│   ├── ListPage.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── CartPage.jsx
│   ├── CardPage.jsx
│   ├── Checkout.jsx
│   ├── Orders.jsx
│   ├── Wishlist.jsx
│   ├── AddProduct.jsx
│   ├── AdminDashboard.jsx
│   └── OrderSuccess.jsx
│
├── App.jsx
└── main.jsx
```

---

## 🧠 Architecture Overview

* **Context API** handles global state (User, Product, Cart, Orders, Wishlist, Theme)
* **ProtectedRoute** → restricts logged-in users
* **AdminPath** → restricts admin-only pages
* **QuickViewModal** → product preview + reviews
* **Product reviews & ratings** stored inside product state
* **LocalStorage** used for persistence (no backend)

---

## 🔐 Role-Based Access

| Feature                 | User | Admin |
| ----------------------- | ---- | ----- |
| View products           | ✅    | ✅     |
| Add to cart             | ✅    | ❌     |
| Submit review           | ✅    | ❌     |
| View reviews            | ✅    | ✅     |
| Add/Edit/Delete product | ❌    | ✅     |
| View all orders         | ❌    | ✅     |

---

## 🌗 Theme Support

* Light Mode
* Dark Mode
* Theme stored in localStorage

---

## 🛒 Reviews & Ratings Logic

* Reviews are stored inside each product:

```js
reviews: [
  {
    user: "John",
    rating: 5,
    comment: "Great taste!",
    date: "12/01/2026"
  }
]
```

* Users can **add reviews**
* Admin can **view reviews only**
* Reviews shown in **QuickViewModal**

---


## 📸 Screens Included

* Product listing
* Quick view modal
* Cart & checkout
* Admin dashboard
* Orders management
* Reviews & ratings



## 👨‍💻 Author

Developed by **Arunima S**
💙 React | Context API | UI/UX

---

