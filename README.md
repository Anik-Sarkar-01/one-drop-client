# 🩸 One Drop - Blood Donation Application

**Live Site URL:** [https://onedrop-85b65.web.app/](https://onedrop-85b65.web.app/)  
**Admin Credentials:**  
- **Username (Email):** sarkaranik29@gmail.com  
- **Password:** Password@1  

---

## 🔑 Key Features

✅ **Role-Based Access Control**  
- Admin: Full access to all system functionality including content and user management.  
- Donor: Can view, create, and manage their own blood donation requests.  
- Volunteer: Can view and update status of all donation requests and contribute blog content.

✅ **Authentication & Profile Management**  
- Email-password based login/registration.  
- Avatar upload via imgbb.  
- Profile editing functionality. 

✅ **Secure Donation Request System**  
- Create, view, update, and delete blood donation requests.  
- Filter donation requests based on status.  
- Automatic status transitions (e.g. `pending → inprogress → done/canceled`).  

✅ **Dashboard Experience**  
- Role-specific dashboards with welcome messages.  
- Fully responsive with sidebar navigation.

✅ **Content Management System**
- Role Specific blog management.  
- Rich text editor for blog creation (using Jodit).  

✅ **Search donor Pages**  
- Search donor with filters (blood group, district, upazila).  

✅ **Smooth UX & Alerts**  
- SweetAlerts/Toasts for all CRUD operations, login, logout, and signup.  (using SweetAlert2 and react hot toast)

✅ **Donation Workflow**  
- Request details page with donate modal.  
- Status is updated to “inprogress” once a user confirms donation.  
- Donors can mark donation as “done” or “canceled.”

✅ **Tech Stack & Libraries**  
- **Frontend:** React.js, React Router, TailwindCSS, DaisyUI, TanStack Query, Axios, React Hook From, Jodit React
- **Notification:** SweetAlert2, React Hot Toast 
- **Backend:** Node.js, Express.js
- **Database:**mongodb, imgbb API for image hosting
- **Security:** Environment variables to hide Firebase and MongoDB credentials  

---


