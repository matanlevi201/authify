# Authify
🚀 *Want to see it in action?* Head over to [**authify-8yww.onrender.com**](https://authify-8yww.onrender.com/)

> Built a full-featured authentication system with email and social OAuth2 (e.g., Google) sign-up. Implemented two-factor authentication, password reset via email, and robust dependency injection using inversion of control. Backend is thoroughly tested with unit and integration tests. Integrated a full **CI/CD pipeline** using GitHub Actions and deployed seamlessly on [Render.com](http://render.com/).
> 

![authify-stack](https://github.com/user-attachments/assets/4dea6c60-6cd6-4fcc-8c65-b2c8169ee3f4)

### 🚀 Tech Stack

- **Node.js** – Backend runtime for building scalable and high-performance server-side applications.
- **React** – Frontend library for building interactive and component-based user interfaces.
- **PostgreSQL** – Robust and reliable relational database for storing and managing structured data.
- **Jest** – JavaScript testing framework for writing unit and integration tests with high coverage.
- **Tailwind CSS** – Utility-first CSS framework for building responsive and modern UI designs quickly.

### ✅ Best Practice Summary:

| Task | Location |
| --- | --- |
| Access token storage | Frontend (memory) |
| Refresh token storage | HTTP-only cookie (browser) |
| Detect token expiry | Frontend |
| Attempt refresh | Frontend |
| Validate & issue new tokens | Backend |

### Vulnerability: (ssl)

```jsx
    const pool = new Pool({
      connectionString: env.DATABASE_URL,
      idleTimeoutMillis: 5000,
      max: 5,
      ssl: { // for Render's self-signed cert, only for educational and skill showcase purposes
        rejectUnauthorized: false, 
      },
    });
```

### 🔐 When is it safe to use?

| Environment | Self-Signed OK? |
| --- | --- |
| Local dev | ✅ Yes |
| Skill showcase | ✅ Yes |
| Production live | ❌ No (use CA-issued certs) |
