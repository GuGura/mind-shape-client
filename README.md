This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

```mermaid
sequenceDiagram
    participant U as User
    participant C as Client
    participant S as Server
    participant DB as Database
    
    autonumber
    U ->> C: Fill username
    U ->> C: Fill password
    C ->> U: Enable "Login" button
    U ->> C: Click "Login" button
    
    C ->>+ S: POST /login
        S ->>+ DB: SELECT * FROM users
            Note over S, DB : See login.py for impl. details
        DB -->>- S: result
    S -->>- C: {authenticated: true}
    C -->> U: Redirect to /home
```

```mermaid
sequenceDiagram
    participant U as User
    participant C as Client
    participant S as Server
    participant DB as Database
    
    autonumber
    U ->> C: type: "user" | "expert"
    C ->>+ S: GET /scam-case/expert-comments <br/> GET /scam-case/user-comments
        S ->>+ DB: SELECT
        DB -->>- S: result
    S -->>- C: result
    C -->> U: view data
```

```mermaid
sequenceDiagram
    participant U as User
    participant C as Client
    participant S as Server
    participant DB as Database
    
    autonumber
    U ->> C: 
    C ->>+ S: POST /portfolio 
        Note over C, S : type: sell
        S ->>+ DB: INSERT INTO portfolio
        DB -->> S: result
        S ->> DB: Insert into realized
        DB -->>- S: result 
    S -->>- C: result
    C ->> U: update data
```
```mermaid
sequenceDiagram
    participant U as User
    participant C as Client
    participant S as Server
    participant DB as Database
    
    autonumber
    U ->> C: 
    C ->>+ S: POST /delete/portfolio 
        Note over C, S : type: sell
        S ->>+ DB: Delete portfolio
        DB -->> S: result
        S ->> DB: Insert into realized
        DB -->>- S: result 
    S -->>- C: result
    C ->> U: update data
```