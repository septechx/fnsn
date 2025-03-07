"use client";

import type { ItemType, ShopResponse } from "@fnsn/types";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Filter } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const itemTypeArr: Readonly<ItemType[]> = [
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

const filterMap: Record<string, Partial<Record<ItemType | "self", string>>> = {
  festival: {
    self: "Festival",
    sparks_song: "Jam track",
    sparks_guitar: "Guitar",
    sparks_bass: "Bass",
    sparks_microphone: "Microphone",
    sparks_drum: "Drum kit",
  },
  battle_royale: {
    self: "Battle royale",
    glider: "Glider",
    emote: "Emote",
    outfit: "Skin",
    wrap: "Wrap",

    shoes: "Kicks",
    pickaxe: "Pickaxe",
    contrail: "Contrail",
    backpack: "Back bling",
  },
  rocket_racing: {
    self: "Rocket racing",
    vehicle_wheel: "Wheels",
    vehicle_booster: "Nitro",
    vehicle_body: "Car",
  },
  other: {
    self: "Other",
    bundle: "Bundle",
  },
};

const itemColors: Record<ItemType, string> = {
  glider: "bg-red-500",
  emote: "bg-blue-500",
  sparks_song: "bg-cyan-500",
  outfit: "bg-orange-500",
  vehicle_wheel: "bg-yellow-500",
  bundle: "bg-purple-500",
  vehicle_booster: "bg-green-500",
  shoes: "bg-pink-500",
  pickaxe: "bg-teal-500",
  wrap: "bg-indigo-500",
  contrail: "bg-lime-500",
  sparks_guitar: "bg-rose-500",
  sparks_bass: "bg-amber-500",
  sparks_microphone: "bg-emerald-500",
  vehicle_body: "bg-fuchsia-500",
  backpack: "bg-sky-500",
  sparks_drum: "bg-violet-500",
};

function useFilters<T extends string>(factory: () => Record<T, boolean>) {
  const [filters, setFilters] = useState<Record<T, boolean>>(factory);

  useEffect(() => {
    if (localStorage.getItem("filters")) {
      setFilters(JSON.parse(localStorage.getItem("filters")!));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("filters", JSON.stringify(filters));
  }, [filters]);

  function toggleFilter(filter: T) {
    setFilters((p) => ({ ...p, [filter]: !filters[filter] }));
  }

  return {
    filters,
    toggleFilter,
  };
}

export default function Shop({ shop }: { shop: ShopResponse }) {
  const { filters, toggleFilter } = useFilters<ItemType>(
    () =>
      Object.fromEntries(
        itemTypeArr.map((itemType) => [itemType, true]),
      ) as Record<ItemType, boolean>,
  );
  const date = new Date(shop.lastUpdate.date);

  return (
    <div>
      <header className="w-full bg-primary-foreground h-16 text-4xl grid grid-cols-3 grid-rows-1 items-center p-4 font-bold">
        <div className="flex justify-start gap-2">
          <h1>FNSN</h1>
          <h2 className="text-xl">v1.0.0</h2>
        </div>
        <div className="flex justify-center">
          <h1>
            {date.getUTCFullYear()}-
            {String(date.getUTCMonth() + 1).padStart(2, "0")}-
            {String(date.getUTCDate()).padStart(2, "0")}
          </h1>
        </div>
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="cursor-pointer">
                <Filter />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel className="font-bold">
                Filters
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                {Object.values(filterMap).map((val, i) => (
                  <DropdownMenuSub key={i}>
                    <DropdownMenuSubTrigger>{val.self}</DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                      {Object.keys(val)
                        .filter((key) => key !== "self")
                        .map((key, i) => (
                          <DropdownMenuCheckboxItem
                            key={i}
                            className="cursor-pointer"
                            checked={filters[key as ItemType]}
                            onCheckedChange={() =>
                              toggleFilter(key as ItemType)
                            }
                          >
                            {val[key as keyof typeof val]}
                          </DropdownMenuCheckboxItem>
                        ))}
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <main className="flex-wrap w-full p-4 gap-2 flex justify-center">
        {shop.shop
          .filter((item) => filters[item.mainType])
          .map((item, i) => (
            <ShopItem item={item} key={i} />
          ))}
      </main>
    </div>
  );
}

function ShopItem({ item }: { item: ShopResponse["shop"][number] }) {
  return (
    <div>
      <div
        className={cn(
          "w-64 h-64 p-1 rounded-t-md relative",
          itemColors[item.mainType],
        )}
      >
        {/* eslint-disable-next-line */}
        <img
          className="rounded-md"
          alt=""
          src={item.granted[0].images.background}
        />
        <div className="absolute top-0 left-0 pl-2 pt-1 font-bold">
          {item.price.finalPrice}
        </div>
        <div className="absolute top-0 right-0 pr-2 pt-1 font-bold">
          {item.banner?.name}
        </div>
      </div>
      <div
        className={cn(
          "w-64 h-6 flex justify-center items-center font-bold rounded-b-md",
          itemColors[item.mainType],
        )}
      >
        {item.displayName.slice(0, 24)}
        {item.displayName.length > 24 && "..."}
      </div>
    </div>
  );
}
