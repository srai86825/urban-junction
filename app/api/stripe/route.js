import Stripe from "stripe";
import absoluteUrl from "next-absolute-url";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export const GET = (req) => {
  return new Response("You reached checkout", { status: 200 });
};

// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export const POST = async (req) => {
  const cartItems = await req.json();
  // console.log("Recieved in backend for payment", cartItems);
  // const { origin } = absoluteUrl(req);
  console.log("The request was made from: ",process.env.NEXT_PUBLIC_ORIGIN);

  const params = {
    submit_type: "pay",
    mode: "payment",
    payment_method_types: ["card"],
    billing_address_collection: "auto",
    shipping_options: [
      { shipping_rate: "shr_1NVAXNSCpFlOMtPjlcm9N9OQ" },
      { shipping_rate: "shr_1NVAVfSCpFlOMtPjl8DZevAu" },
    ],
    line_items: cartItems.map((item) => {
      const img = item?.image[0]?.asset?._ref;
      const newImg = img
        ?.replace("image-", "https://cdn.sanity.io/images/h81e0hka/production/")
        ?.replace("-webp", ".webp")
        ?.replace("-jpg", ".jpg")
        ?.replace("-jpeg", ".jpeg")
        ?.replace("-png", ".png")
        ?.replace("-svg", ".svg");

      return {
        price_data: {
          currency: "inr",
          product_data: {
            name: item.name,
            images: [newImg],
          },
          unit_amount: item.price * 100,
        },
        adjustable_quantity: { enabled: true, minimum: 1 },
        quantity: item.quantity,
      };
    }),
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_ORIGIN}/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_ORIGIN}/canceled`,
  };
  console.log(
    "Publishable at checkout: ",
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE
  );
  console.log("Key at checkout: ", process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);
  try {
    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create(params);
    // res.redirect(303, session.url);
    return new Response(JSON.stringify(session), { status: 200 });
  } catch (err) {
    // res.status(err.statusCode || 500).json(err.message);
    console.log("The paramas: ", params);
    console.log("Lead to this failure in checkout", err);
    return new Response(`Failed checkout: ${err.message}`, { status: 500 });
  }
};
