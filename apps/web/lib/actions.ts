"use server";

import type { ShopResponse } from "@fnsn/types";

export async function fetchShop(): Promise<ShopResponse> {
  "use cache";
  if (!process.env.FN_API_KEY) throw new Error("No api key provided");

  const shop = await fetch(
    "https://fortniteapi.io/v2/shop?includeRenderData=false&includeHiddenTabs=false",
    {
      method: "GET",
      headers: {
        Authorization: process.env.FN_API_KEY!,
      },
    },
  ).then((r) => r.json());

  return shop;
}
