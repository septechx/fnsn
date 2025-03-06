"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Checkbox } from "./ui/checkbox";
import type { ShopResponse, ItemType } from "@fnsn/types";

const defaultFilters: Readonly<ItemType[]> = [
  "glider",
  "emote",
  "sparks_song",
  "outfit",
  "vehicle_wheel",
  "bundle",
  "vehicle_booster",
  "shoes",
  "pickaxe",
  "wrap",
  "contrail",
  "sparks_guitar",
  "sparks_bass",
  "sparks_microphone",
  "vehicle_body",
  "backpack",
  "sparks_drum",
];

export default function Shop({ shop }: { shop: ShopResponse }) {
  const [filters, setFilters] = useState(
    () =>
      Object.fromEntries(
        defaultFilters.map((filter) => [filter, true]),
      ) as Record<ItemType, boolean>,
  );
  const date = new Date(shop.lastUpdate.date);

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("filters"))
      setFilters(JSON.parse(localStorage.getItem("filters")!));
  }, []);

  useEffect(() => {
    localStorage.setItem("filters", JSON.stringify(filters));
  }, [filters]);

  return (
    <main className="flex flex-col w-full h-full">
      <div className="w-full flex justify-center mt-4">
        <h1 className="text-3xl">
          Shop from: {date.getUTCFullYear()}-
          {String(date.getUTCMonth() + 1).padStart(2, "0")}-
          {String(date.getUTCDate()).padStart(2, "0")}
        </h1>
      </div>
      <div className="flex gap-2 justify-center flex-wrap">
        {defaultFilters.map((itemType, i) => (
          <div key={i} className="flex items-center h-8 gap-2">
            <Checkbox
              className="cursor-pointer w-6 h-6"
              checked={filters[itemType]}
              onClick={() =>
                setFilters((p) => ({ ...p, [itemType]: !p[itemType] }))
              }
            />
            {itemType[0].toUpperCase() + itemType.substring(1)}
          </div>
        ))}
      </div>
      <div className="flex-wrap w-full p-4 gap-2 flex justify-center">
        {shop.shop
          .filter((item) => filters[item.mainType])
          .map((item, i) => (
            <div
              key={i}
              className={cn(
                "w-96 h-16 rounded-md items-center flex justify-center relative overflow-hidden",
                getColor(item.mainType),
              )}
            >
              <h2>{item.displayName}</h2>
              <div className="absolute top-0 left-0 pl-1">
                V
                {Math.max(
                  item.price.regularPrice,
                  item.price.finalPrice,
                  item.price.floorPrice,
                )}
              </div>
              <div className="absolute top-0 right-0 pr-1">
                {item.banner?.name}
              </div>
            </div>
          ))}
      </div>
    </main>
  );
}

function getColor(itemType: ItemType) {
  switch (itemType) {
    case "glider":
      return "bg-red-500";
    case "emote":
      return "bg-blue-500";
    case "sparks_song":
      return "bg-cyan-500";
    case "outfit":
      return "bg-orange-500";
    case "vehicle_wheel":
      return "bg-yellow-500";
    case "bundle":
      return "bg-purple-500";
    case "vehicle_booster":
      return "bg-green-500";
    case "shoes":
      return "bg-pink-500";
    case "pickaxe":
      return "bg-teal-500";
    case "wrap":
      return "bg-indigo-500";
    case "contrail":
      return "bg-lime-500";
    case "sparks_guitar":
      return "bg-rose-500";
    case "sparks_bass":
      return "bg-amber-500";
    case "sparks_microphone":
      return "bg-emerald-500";
    case "vehicle_body":
      return "bg-fuchsia-500";
    case "backpack":
      return "bg-sky-500";
    case "sparks_drum":
      return "bg-violet-500";
    default:
      return "bg-accent";
  }
}
