# 🏢 Office Management - Micro Frontend (MFE) Application

The **Office Management** system is a modular Angular-based project built with **Module Federation** architecture.  
It allows independent feature modules (Company, Employee, Role) to be developed, deployed, and scaled separately while being integrated into a single shell application.

---

## 🚀 Features

- **Dashboard Overview** – quick stats on companies, employees, and roles  
- **Companies Module** – manage organizations  
- **Employees Module** – manage employee records  
- **Authentication** – user login/logout  
- **Micro Frontend Status** – live check of which MFEs are loaded  

---

## 🏗️ Architecture

- **Shell App** – acts as the host container
- **Remote MFEs**:
  - `company` → handles company-related features
  - `employee` → manages employees
  - `role` → handles roles & permissions
- Communication between apps is handled via **Module Federation**.

![Dashboard Screenshot](./docs/dashboard.png)

---

## 🛠️ Tech Stack

- **Frontend Framework**: Angular  
- **Module Federation**: Webpack 5  
- **Styling**: SCSS, Bootstrap/Tailwind (custom)  
- **State Management**: Angular services / (optional NgRx if extended)  
- **Backend**: (Pluggable, can connect to Node.js/Express + MongoDB API)  

---

## ⚡ Getting Started

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/office-frontend-mfe.git
cd office-frontend-mfe
