import './App.css';

import { create } from 'zustand';
import type { ReactNode } from '@lynx-js/react';
import type { ItemType } from '@fnsn/types';

import Bell from "./assets/bell.png?inline";

const itemTypeMatrix: [ItemType, string][] = [
  ['glider', 'Glider'],
  ['emote', 'Emote'],
  ['sparks_song', 'Jam track'],
  ['outfit', 'Skin'],
  ['vehicle_wheel', 'Wheels'],
  ['bundle', 'Bundle'],
  ['vehicle_booster', 'Boost'],
  ['shoes', 'Shoes'],
  ['pickaxe', 'Pickaxe'],
  ['wrap', 'Wrap'],
  ['contrail', 'Contrail'],
  ['sparks_guitar', 'Guitar'],
  ['sparks_bass', 'Bass'],
  ['sparks_microphone', 'Microphone'],
  ['vehicle_body', 'Car'],
  ['backpack', 'Backpack'],
  ['sparks_drum', 'Drum kit'],
] as const;

interface FilterState {
  filters: ItemType[];
  toggle: (by: ItemType) => void;
}

const useFilterStore = create<FilterState>((set) => ({
  filters: itemTypeMatrix.map((itemTypeVector) => itemTypeVector[0]),
  toggle: (by) =>
    set((state) => ({
      filters:
        state.filters.includes(by)
          ? state.filters.filter((filter) => filter !== by)
          : [...state.filters, by],
    })),
}));

function Badge({
  active = true,
  key,
  children,
  onClick,
}: {
  active?: boolean;
  key?: string;
  children: ReactNode;
  onClick?: () => void;
}) {
  return (
    <view
      key={key}
      className={`rounded-lg border bg-neutral-700 p-2 ${active ? 'border-white' : 'border-neutral-700'}`}
      bindtap={onClick}
    >
      <text className="text-2xl text-white">{children}</text>
    </view>
  );
}

export function App() {
  const { filters, toggle } = useFilterStore();

  return (
    <view>
      <view className="h-16 w-full flex-col justify-end flex">
        <view className="border border-b-neutral-700 flex flex-row justify-between px-2">
          <text className="text-5xl font-bold text-white">
            FNSN
          </text>
          <image src={Bell} mode='scaleToFill' className='h-8 w-8' />
        </view>
      </view>
      <view className="flex-row flex-wrap gap-2 border border-b-neutral-700 p-2 flex justify-center">
        {itemTypeMatrix.map((itemTypeVector, i) => (
          <Badge
            key={i.toString()}
            active={filters.includes(itemTypeVector[0])}
            onClick={() => toggle(itemTypeVector[0])}
          >
            {itemTypeVector[1]}
          </Badge>
        ))}
      </view>
    </view>
  );
}
