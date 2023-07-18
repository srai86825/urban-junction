import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = sanityClient({
  projectId: "h81e0hka",
  dataset: "production",
  apiVersion: "2023-07-16",
  useCdn: true,
  // token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
  token:
    "skx0r2ACnnqcQZEDfnORDIZm2o78Qzi2cYqZqLAvnpKSAnIrKmKDPQT5D7ABgkFH1KO35MYepkmM0xIsiVWLNXH7tKgUbUl907I2yyuGlszwNfeESbYU2kGqWhqkccpv7SBtVkHGUpDvRBvIslNEUGXE8DoxJHre2ubkDwgCWwNWOnTg0xqa",
});
const builder = imageUrlBuilder(client);
export const urlFor = (src) => builder.image(src);
