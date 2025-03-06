import { fetchShop } from "@/lib/actions";

export async function GET() {
  const shop = await fetchShop();

  return Response.json(shop);
}
