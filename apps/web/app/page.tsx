import Shop from "@/components/shop";
import { fetchShop } from "@/lib/actions";

export default async function Home() {
  const shop = await fetchShop();

  return <Shop shop={shop} />;
}
