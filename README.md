# Media Management Platform

## Project Description
A full-stack media management system with upload, storage, and streaming capabilities built with modern web technologies.

---

## Tech Stack
- **Frontend:** React.js, TypeScript, Tailwind CSS, React Router, Lucide icons
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **External SDK Integration:** Cloudinary

---

## Setup & Run Instructions

1. **Clone the repository**
```bash
git clone https://github.com/subhash18cH/media-store.git
cd media-store
```

2. **Install dependencies**
```bash
cd frontend
npm install

cd backend 
npm install

```

3. **Create .env file in the root directory of both folders**
```bash
FRONTEND
VITE_BACK_URL=YOUR_BACKEND_URL

BACKEND
PORT=3000
FRONTEND_URL=YOUR_FRONTEND_URL
MONGO_URL=YOUR_DB_URL
JWT_SECRET=YOUR_JWT_SECRET
CLOUDINARY_CLOUD_NAME=CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY=CLOUDINARY_KEY
CLOUDINARY_API_SECRET=CLOUDINARY_SECRET
```

4. **Run the development server**
```bash
npm run dev
```
## Design Choices

**Why MongoDB?**

Flexible Schema: Perfect for evolving metadata requirements
JSON-like Documents: Natural fit for JavaScript/Node.js ecosystem
Cloud-Ready: MongoDB Atlas provides managed hosting

**Why Cloudinary?**

All-in-One Solution: Storage, CDN, and transformations in one service
Automatic Optimization: Automatic format conversion and quality optimization
Image/Video Transformations: On-the-fly resizing, cropping, and effects


Proposed Improvements
---

**Database Optimization :**
Implement indexing on frequently queried fields
Use MongoDB Atlas auto-scaling
Set up replica sets for high availability
Implement data archiving for old media


**API Performance :**
Add Redis caching layer for frequent queries
Implement request rate limiting
Use connection pooling
Add API response compression


**Load Balancing :** 
Deploy multiple backend instances
Use NGINX or AWS ALB


**Author - Subhash Chand**
