import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
  typescript: true,
})

export const PREMIUM_PRICE_ID = process.env.STRIPE_PRICE_ID!
export const PREMIUM_PRICE = parseFloat(process.env.PREMIUM_PRICE_MONTHLY || '89.90')
