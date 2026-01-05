# Product Management Dashboard

This project is a **Product Management Dashboard** built using **Next.js** that allows multiple admins to manage products and monitor inventory. The application includes **admin authentication**, **role-based access**, **product-CRUD operations** and **real-time data storage using MongoDB Atlas**.

---

## Project Description

The dashboard provides a secure interface where admins can:

- Add, edit, and delete products  
- Upload product images  
- Track stock availability  
- Visualize inventory data using charts  
- Manage other admins based on role permissions  
- Access to the dashboard is restricted using an admin login system.

---

## Key Features

### Product Management
- Product CRUD operations (Create, Read, Update, Delete)
- Input validation for name, price, and stock
- Product image upload using Cloudinary
- Stock status indicator (Low Stock / In Stock)

### Dashboard & Analytics
- Product table with live updates
- Stock Distribution chart
- Total Inventory Value per Product chart
- Charts update automatically when data changes

### Admin Authentication & Management
- Admin login system with protected routes
- Multiple admins supported
- Role-based access control:
  - **Admin**: can manage products and onboard new admins
  - **Supreme Admin**: can add admins,manage products and delete other admins
- Admin data stored in MongoDB Atlas

---

## Admin Login (Dummy Credentials)
 
  **supreme admin**-:
   - Username: admin
   - Password: admin123
  **admin**-:
   - Username:admin56
   - Password:pinkfeather

---

## Tech Stack

- Next.js (Pages Router)
- React
- MongoDB Atlas & Mongoose
- SWR
- Recharts
- Cloudinary
- Zod
- JavaScript, CSS

---

## How Authentication Works

- Admin logs in using credentials.
- Login state and role are stored in the browser.
- Protected pages verify authentication before rendering.
- Unauthorized users are redirected to the login page.
- Role determines allowed actions (e.g., deleting admins).

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
   
   
