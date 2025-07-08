![Pollmodoro Header](/assets/github-header.png)

# Pollmodoro

Pollmodoro is a blazing-fast, open-source polling platform built with SvelteKit and CloudFlare Workers. While still in early development, you can try it out at [pollmodoro.com](https://pollmodoro.com).

---

## How it works

Pollmodoro leverages CloudFlare's edge computing infrastructure to deliver a fast, globally distributed polling platform:

### Technology Stack

#### Frontend

- **[SvelteKit](https://kit.svelte.dev/)** - Full-stack web framework with server-side rendering
- **[Svelte 5](https://svelte.dev/)** - Reactive JavaScript framework with compiled components
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript development
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn-svelte](https://shadcn-svelte.com/)** - Beautifully designed components built with Radix UI and Tailwind CSS
- **[Bits UI](https://bits-ui.com/)** - Unstyled, accessible component primitives for Svelte
- **[Lucide Svelte](https://lucide.dev/)** - Beautiful & consistent icon toolkit
- **[Vite](https://vitejs.dev/)** - Fast build tool and development server

#### Backend

- **[Cloudflare Workers](https://workers.cloudflare.com/)** - Serverless compute platform at the edge
- **[Cloudflare Durable Objects](https://developers.cloudflare.com/durable-objects/)** - Stateful objects with strong consistency
- **[tRPC](https://trpc.io/)** - End-to-end typesafe APIs
- **[Drizzle ORM](https://orm.drizzle.team/)** - TypeScript ORM with zero dependencies
- **[SQLite](https://sqlite.org/)** - Embedded database for Durable Objects
- **[Zod](https://zod.dev/)** - TypeScript-first schema validation

#### Development & Deployment

- **[Wrangler](https://developers.cloudflare.com/workers/wrangler/)** - Cloudflare's command-line tool for development and deployment
- **[ESLint](https://eslint.org/)** - JavaScript/TypeScript linting
- **[Prettier](https://prettier.io/)** - Code formatting
- **[Drizzle Kit](https://orm.drizzle.team/kit-docs/overview)** - Database migrations and introspection toolkit

#### Security

- **[Cloudflare Turnstile](https://developers.cloudflare.com/turnstile/)** - Privacy-preserving CAPTCHA alternative
- **[nanoid](https://github.com/ai/nanoid)** - URL-safe unique string ID generator

---

### Architecture Overview

1. **Request Routing**: When a user creates a poll, their browser sends a tRPC request to a CloudFlare Worker deployed at CloudFlare's global edge network.

2. **Geographic Distribution**: CloudFlare automatically routes the request to the geographically closest data center, minimizing latency and ensuring optimal performance worldwide.

3. **Durable Object Creation**: The Worker generates a unique poll ID using nanoid and creates a CloudFlare Durable Object instance with that ID as its globally unique identifier.

4. **Stateful Storage**: Each Durable Object contains:

   - **SQLite Database**: Zero-latency embedded SQLite storage for poll metadata, options, and votes
   - **Strong Consistency**: All data operations are strongly consistent and transactional
   - **In-Memory State**: Fast access to frequently used data and WebSocket connection management

5. **Real-Time Updates**: The Durable Object maintains WebSocket connections for real-time vote updates, broadcasting results to all connected clients instantly.

6. **Global Coordination**: Since each poll has a globally unique Durable Object identifier, users worldwide can vote on the same poll while maintaining data consistency and coordination.

---

### Geographic Considerations

**Location Optimization**: Each Durable Object is created in the CloudFlare data center closest to the poll creator. This design assumes that the poll creator is typically located near most potential voters, optimizing for the common use case.

**Cross-Region Trade-offs**: If voters are geographically distant from the poll creator (e.g., creator in USA, voters in Brazil), those voters will experience higher latency since all requests must travel to the Durable Object's fixed location. This is a fundamental trade-off of the single-object-per-poll architecture that ensures strong consistency.

### Key Benefits

- **Strong Consistency**: Unlike traditional distributed systems, all poll data is guaranteed to be consistent across all operations
- **Zero Infrastructure Management**: No databases, servers, or load balancers to manage
- **Horizontal Scaling**: Each poll is an independent Durable Object with up to 1,000 requests/second capacity, with unlimited polls supported across the platform
- **Global Edge Deployment**: Low latency access from anywhere in the world
- **Real-Time Capabilities**: WebSocket support for instant vote result updates

---

## How to run locally

### Prerequisites

- **Node.js** (v18 or later)
- **npm** or **yarn**
- **CloudFlare Account** (free tier works)

### Setup Steps

1. **Install dependencies**

   ```bash
   # Backend
   cd backend
   npm install

   # Frontend
   cd ../frontend
   npm install
   ```

2. **Configure Wrangler CLI**

   ```bash
   npx wrangler login
   ```

3. **Start the backend (CloudFlare Worker)**

   ```bash
   cd backend
   npm run dev
   ```

   The backend will run on `http://localhost:8787`

4. **Start the frontend (SvelteKit)**

   ```bash
   cd frontend
   npm run dev
   ```

   The frontend will run on `http://localhost:5173`
