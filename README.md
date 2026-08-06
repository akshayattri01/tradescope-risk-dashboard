# Trader Risk Dashboard

A production-ready React 19 dashboard for monitoring trader performance, account health, drawdown usage, daily loss limits, and execution statistics. The product is styled as a modern dark FinTech SaaS interface using Vite, TypeScript, Tailwind CSS, shadcn/ui-style primitives, Framer Motion, Recharts, and Lucide React.

## Features

- Dynamic account metrics derived from local trade data
- Current balance, total P&L, win rate, profit factor, drawdown, and daily loss calculations
- Risk status engine with SAFE, APPROACHING LIMIT, and AT RISK states
- Animated counters, progress bars, cards, chart transitions, hover states, and notifications
- Equity curve, win/loss pie chart, P&L distribution, and account balance timeline
- Responsive desktop, tablet, and mobile layouts
- Collapsible desktop/mobile navigation pattern
- Trade performance insights generated from the current data set
- Recent activity, performance summary, and quick risk snapshot
- Accessible semantic structure, labels, focus states, and high-contrast colors

## Screenshots

Add screenshots from the deployed application here after publishing to Vercel.

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui-style reusable components
- Framer Motion
- Recharts
- Lucide React

## Installation

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

## Folder Structure

```text
src/
  components/
    charts/       Recharts visualizations
    dashboard/    Product-level reusable dashboard components
    ui/           shadcn/ui-style primitives
  data/           Local mock account and trade data
  hooks/          Memoized dashboard data hook
  lib/            Utilities and risk calculations
  types/          Strict TypeScript trading models
```

## Architecture

The application has no backend, authentication, database, API calls, environment variables, or external runtime dependencies beyond the frontend package dependencies. Trade data lives in `src/data/trades.ts`. All derived values are calculated through reusable utilities in `src/lib/risk.ts`, then memoized by `src/hooks/useRiskMetrics.ts` to avoid unnecessary recalculation.

## Calculation Logic

- Current balance = starting balance + total realized P&L
- Total P&L = sum of all trade P&L values
- Win rate = winning trades divided by all trades
- Profit factor = gross profit divided by absolute gross loss
- Current drawdown = peak account balance minus current account balance
- Remaining drawdown = maximum drawdown minus current drawdown
- Current day loss = absolute value of losing trades
- Remaining daily loss limit = daily loss limit minus current day loss
- Risk percentage = current drawdown divided by maximum drawdown
- Risk status = highest usage between drawdown and daily loss thresholds

## Product Decisions

The dashboard prioritizes fast scanning because a trader needs to understand account health in seconds. Top-level cards show the most important account state, the risk module explains rule usage, charts show performance trajectory, and insights translate raw numbers into operational guidance. The visual system uses a dark, high-contrast palette with restrained glass panels, clear status colors, and compact SaaS spacing.

## Extra Features

- Intelligent performance insights
- Asset-level performance summary
- Animated notification panel
- Mobile drawer navigation
- Theme toggle
- Keyboard-accessible controls and ARIA labels

## Deployment Guide

1. Push the repository to GitHub.
2. Import the repository into Vercel.
3. Use the default Vite settings.
4. Build command: `npm run build`
5. Output directory: `dist`

No environment variables or backend services are required.

## Assignment Answers

### 1. What is drawdown?

Drawdown is the decline from an account's peak balance to its current balance. It measures how much capital has been lost from the highest point reached.

### 2. Why is remaining drawdown important?

Remaining drawdown shows how much loss capacity is still available before a trader violates account rules. It helps traders reduce size, pause trading, or protect the account before breaching a maximum loss threshold.

### 3. If you had another day, what would you improve?

I would add trade import/export, configurable risk rules, scenario testing for open positions, persistent user preferences, richer filtering, and automated alerts for rule proximity.
