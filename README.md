# 🛍️ ShopMart E-Commerce Application

A modern, full-featured e-commerce web application built with Next.js 16, TypeScript, and NextAuth. This application provides a seamless shopping experience with features like product browsing, cart management, wishlist, user authentication, and order processing.

![Next.js](https://img.shields.io/badge/Next.js-16.0.10-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.1-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38bdf8?style=flat-square&logo=tailwind-css)

## ✨ Features

### 🛒 Shopping Experience

- **Product Catalog**: Browse through a wide range of products with detailed information
- **Category Browsing**: Explore products by categories and brands
- **Advanced Search**: Search for products with real-time results
- **Product Details**: View comprehensive product information with image galleries
- **Shopping Cart**: Add, remove, and manage items in your cart with quantity controls
- **Wishlist**: Save favorite products for later

### 👤 User Management

- **Authentication**: Secure login and registration with NextAuth
- **Session Management**: Persistent sessions with httpOnly cookies
- **User Profile**: Manage personal information and view order history
- **Password Management**: Change password and forgot password functionality
- **Protected Routes**: Secure pages requiring authentication

### 💳 Checkout & Orders

- **Address Management**: Add and manage multiple shipping addresses
- **Order Processing**: Complete checkout with shipping address selection
- **Order History**: View all past orders with detailed information
- **Secure Payments**: Integration-ready payment processing

### 🎨 UI/UX

- **Responsive Design**: Fully responsive layout for all devices
- **Dark/Light Mode**: Theme switching with next-themes
- **Modern UI Components**: Built with Radix UI and shadcn/ui
- **Smooth Animations**: Enhanced user experience with Tailwind animations
- **Loading States**: Skeleton loaders and loading indicators
- **Toast Notifications**: User feedback with Sonner
- **Accessible**: ARIA labels and semantic HTML

### 🔒 Security

- **XSS Protection**: DOMPurify integration for sanitizing user input
- **Secure Authentication**: JWT-based authentication with httpOnly cookies
- **Form Validation**: Zod schema validation with React Hook Form
- **Protected API Routes**: Server-side authentication checks

## 🚀 Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd e-commerceapp
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:

   ```env
   AUTH_SECRET=your-auth-secret-here
   NEXTAUTH_URL=http://localhost:3000
   ```

   Generate a secure `AUTH_SECRET`:

   ```bash
   npx auth secret
   ```

4. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
e-commerceapp/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── (auth)/              # Auth route group (login, signup)
│   │   ├── Actions/             # Server actions
│   │   │   ├── auth.actions.ts
│   │   │   ├── cart.actions.ts
│   │   │   ├── product.actions.ts
│   │   │   ├── wishlist.actions.ts
│   │   │   ├── order.actions.ts
│   │   │   └── ...
│   │   ├── api/                 # API routes
│   │   │   └── auth/            # NextAuth configuration
│   │   ├── about/               # About page
│   │   ├── brands/              # Brands listing
│   │   ├── cart/                # Shopping cart
│   │   ├── categories/          # Categories listing
│   │   ├── contact/             # Contact page
│   │   ├── products/            # Products listing & details
│   │   ├── profile/             # User profile
│   │   ├── wishlist/            # Wishlist page
│   │   ├── allorders/           # Order history
│   │   ├── layout.tsx           # Root layout
│   │   ├── page.tsx             # Home page
│   │   └── globals.css          # Global styles
│   ├── components/              # React components
│   │   ├── ui/                  # shadcn/ui components
│   │   ├── auth/                # Authentication components
│   │   ├── cart/                # Cart components
│   │   ├── checkout/            # Checkout components
│   │   ├── product/             # Product components
│   │   ├── profile/             # Profile components
│   │   ├── wishlist/            # Wishlist components
│   │   ├── Nav/                 # Navigation
│   │   └── footer/              # Footer
│   ├── store/                   # Redux store
│   │   ├── cartSlice.ts
│   │   ├── wishlistSlice.ts
│   │   └── store.ts
│   ├── types/                   # TypeScript type definitions
│   ├── schema/                  # Zod validation schemas
│   ├── Services/                # API service layer
│   ├── providers/               # React context providers
│   └── proxy.ts                 # API proxy configuration
├── components/                   # Additional components
│   └── ui/                      # UI component library
├── lib/                         # Utility functions
├── public/                      # Static assets
├── .env.local                   # Environment variables
├── next.config.ts               # Next.js configuration
├── tailwind.config.ts           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
└── package.json                 # Dependencies
```

## 🛠️ Tech Stack

### Core

- **[Next.js 16](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[TailwindCSS 4](https://tailwindcss.com/)** - Utility-first CSS

### State Management

- **[Redux Toolkit](https://redux-toolkit.js.org/)** - State management for cart and wishlist
- **[React Redux](https://react-redux.js.org/)** - React bindings for Redux

### Authentication

- **[NextAuth.js](https://next-auth.js.org/)** - Authentication for Next.js
- **[JWT Decode](https://github.com/auth0/jwt-decode)** - JWT token decoding

### UI Components

- **[Radix UI](https://www.radix-ui.com/)** - Unstyled, accessible components
- **[shadcn/ui](https://ui.shadcn.com/)** - Re-usable component library
- **[Lucide React](https://lucide.dev/)** - Icon library
- **[Embla Carousel](https://www.embla-carousel.com/)** - Carousel component

### Forms & Validation

- **[React Hook Form](https://react-hook-form.com/)** - Form management
- **[Zod](https://zod.dev/)** - Schema validation
- **[@hookform/resolvers](https://github.com/react-hook-form/resolvers)** - Validation resolvers

### Utilities

- **[next-themes](https://github.com/pacocoursey/next-themes)** - Theme management
- **[Sonner](https://sonner.emilkowal.ski/)** - Toast notifications
- **[DOMPurify](https://github.com/cure53/DOMPurify)** - XSS sanitization
- **[clsx](https://github.com/lukeed/clsx)** & **[tailwind-merge](https://github.com/dcastil/tailwind-merge)** - Class name utilities

## 📦 Available Scripts

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
```

## 🎨 Design System

The application uses a custom design system built on top of TailwindCSS with:

- **Color Palette**: Customizable theme with primary, secondary, and accent colors
- **Typography**: Responsive font sizes and weights
- **Spacing**: Consistent spacing scale
- **Components**: Reusable UI components with variants
- **Dark Mode**: Full dark mode support with smooth transitions
- **Animations**: Smooth transitions and micro-interactions

## 🔐 Authentication Flow

1. **Registration**: Users create an account with email and password
2. **Login**: Secure login with NextAuth and JWT tokens
3. **Session Management**: Persistent sessions with httpOnly cookies
4. **Protected Routes**: Middleware-based route protection
5. **Password Reset**: Forgot password flow with email verification

## 🛒 Shopping Flow

1. **Browse Products**: View products by category or search
2. **Product Details**: View detailed product information
3. **Add to Cart**: Add items to shopping cart
4. **Cart Management**: Update quantities or remove items
5. **Checkout**: Select shipping address and complete order
6. **Order Confirmation**: View order details and history

## 🌐 API Integration

The application integrates with the Route E-Commerce API:

- Base URL: `https://ecommerce.routemisr.com/api/v1`
- Endpoints: Products, Categories, Brands, Cart, Wishlist, Orders, Users

## 🚧 Future Enhancements

- [ ] Payment gateway integration (Stripe/PayPal)
- [ ] Product reviews and ratings
- [ ] Advanced filtering and sorting
- [ ] Email notifications
- [ ] Admin dashboard
- [ ] Multi-language support
- [ ] Product recommendations
- [ ] Social media integration

## 📄 License

This project is private and proprietary.

## 👨‍💻 Developer

Developed by **Hamza**

## 🤝 Contributing

This is a private project. Contributions are not currently accepted.

## 📞 Support

For support or questions, please contact the development team.

---

**Built with ❤️ using Next.js and modern web technologies**
