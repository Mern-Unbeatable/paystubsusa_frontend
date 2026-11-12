import { loadStripe } from "@stripe/stripe-js";
import { ENV_CONFIG } from "../../../../config/env";

/** Null when no publishable key is configured; Stripe.js loads once per page. */
export const stripePromise = ENV_CONFIG.stripePublishableKey ? loadStripe(ENV_CONFIG.stripePublishableKey) : null;
