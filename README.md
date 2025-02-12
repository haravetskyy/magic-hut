# Magic Hut <img src="./public/magic-hut-beige.svg" alt="Logo" width="30" style="vertical-align: middle;" align="right">

An authentication service for [Harbor Task](https://github.com/haravetskyy/harbor-task).

---

Here are instructions on how to use the code from this project to implement authentication in your own project.

## **Prerequisites**

Ensure you have the following installed:

- **Node.js** (v18 or later)
- **pnpm**
- **Docker** and **Docker Compose**

Also ensure you have set up the following things:
- **Arcjet** key
- **better-auth** secret
- **SendGrid** API key
- **Email address** with *SMTP*

## **Getting Started**

### **1. Clone the Repository**

```bash
git clone https://github.com/haravetskyy/harbor-task.git
cd harbor-task
```

---

### **2. Configure Environment Variables**

The project requires environment variables to function properly. To assist you, `.env.example` file is provided in the `root` directory.

These file serves as template, listing all necessary variables. You need to copy it to its respective `.env` files and fill it with valid data specific to your setup.

---

### **3. Install Dependencies**

Install all required Node.js packages :

```bash
pnpm install
```

---

### **4. Run All Essential Scripts**

You need to execute these scripts to ensure everything works correctly.

#### **4.1. Start the Development Database**

```bash
pnpm db:dev:up
```

This script initializes and starts the development database.

#### **4.2. Apply Prisma Migrations**

```bash
pnpm prisma:dev:deploy
```

This command applies the Prisma migrations to the database.

#### **4.3. Generate Prisma Client**

```bash
pnpm prisma:generate
```

This script generates the Prisma client based on the Prisma schema.

---

### **5. Start the Application**

```bash
pnpm dev
```

Open [http://localhost:1050](http://localhost:1050) with your browser to see the result.
