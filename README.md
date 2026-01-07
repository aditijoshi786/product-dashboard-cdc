# Product Management Dashboard

This project is a **Product Management Dashboard** built using **Next.js** that allows multiple admins to manage products . The application includes **admin authentication**, **role-based access control**, **product CRUD operations**, **secure image handling**, and **real-time data synchronization using MongoDB Atlas**.

---

## Project Description

The dashboard provides a secure, server-rendered interface where admins can:

- Add, edit, and delete products  
- Upload and manage product images  
- Track stock availability  
- Visualize inventory data using interactive charts  
- Manage other admins based on role permissions  
- Access the dashboard only through a protected admin login system  

The application leverages **server-side rendering (SSR)** for faster page loads and improved reliability, while client-side data fetching ensures real-time UI updates.

---

## Key Features

### Product Management
- Full Product CRUD operations (Create, Read, Update, Delete)
- Strong input validation for name, price, and stock using **Zod**
- Secure product image upload using **Cloudinary**
- Automatic deletion of images from Cloudinary when products are deleted
- Stock status indicator (Low Stock / In Stock)

### Dashboard & Analytics
- Product table with real-time updates using **SWR**
- Stock Distribution chart per product
- Total Inventory Value per Product (price × stock)
- Charts automatically refresh when product data changes

### Admin Authentication & Management
- Admin login system with protected routes
- Multiple admins supported
- Role-based access control:
  - **Admin**: can manage products and onboard new admins 
  - **Supreme Admin**: can manage products, add admins, and delete other admins
- Admin data and roles stored securely in **MongoDB Atlas**
- Admin management features are hidden from unauthenticated users

---

## Admin Login (Dummy Credentials)

**Supreme Admin**
- Username: `admin`
- Password: `admin123`

**Admin**
- Username: `admin56`
- Password: `pinkfeathers`

> These credentials are provided for demonstration purposes only.

---

## Tech Stack

- **Next.js** (Pages Router, Server-Side Rendering)
- **React**
- **MongoDB Atlas & Mongoose**
- **SWR** (real-time data fetching)
- **Recharts** (data visualization)
- **Cloudinary** (image storage and management)
- **Zod** (form and API validation)
- **JavaScript, CSS**

---

## How Authentication Works

- Admin logs in using valid credentials.
- Login state and admin role are stored in the browser.
- Protected pages verify authentication before rendering.
- Unauthorized users are redirected to the login page.
- Admin role determines permitted actions (e.g., deleting admins).
- Logout clears authentication state and redirects to login.

---

## Running the Project Locally

1. Install dependencies:
   
   ```bash
   npm install
2. Create a .env.local file in the root directory and add the required environment variables:

   ```bash
   MONGODB_URI=mongodb+srv://aditijoshi554_db_user:oYcv6A8JFqtAb2oU@cluster0.4kximc1.mongodb.net/?appName=Cluster0
   CLOUDINARY_CLOUD_NAME=dihkitdvs
   CLOUDINARY_API_KEY=195428195314241
   CLOUDINARY_API_SECRET=Qgot0qj_HD4uhZRzAf-cJ5ykeFY

4. Start the development server:

   ```bash
   npm run dev

5. Open the aplication in browser:

   ```bash
   http://localhost:3000

## Demo Video Link 
  
   https://drive.google.com/file/d/1nKVUIa4myTU7fpG-eB-PY7m3LQCKEjal/view?usp=sharing
   
   
