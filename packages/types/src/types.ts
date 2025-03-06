export type ShopResponse = {
  result: true;
  fullShop: true;
  lastUpdate: {
    uid: string;
    date: string;
  };
  currentRotation: string;
  nextRotation: string;
  carousel: string;
  specialOfferVideo: string;
  customBackground: string;
  shop: [
    {
      mainId: string;
      displayName: string;
      displayDescription: string;
      displayType: string;
      mainType: ItemType;
      offerId: string;
      devName: string;
      offerDates: {
        out: string;
        in: string;
      };
      colors: {
        textBackgroundColor: string;
        color3: string;
        color2: string;
        color1: string;
      };
      displayAssets: [
        {
          displayAsset: string;
          materialInstance: string;
          url: string;
          flipbook: string;
          background_texture: string;
          background: string;
          full_background: string;
        },
      ];
      firstReleaseDate: string;
      previousReleaseDate: string;
      giftAllowed: true;
      buyAllowed: true;
      price: {
        floorPrice: number;
        finalPrice: number;
        regularPrice: number;
      };
      rarity: {
        id: string;
        name: string;
      };
      series: string;
      banner: {
        intensity: string;
        name: string;
        id: string;
      };
      offerTag: string;
      granted: [
        {
          id: string;
          type: {
            name: string;
            id: string;
          };
          name: string;
          description: string;
          rarity: {
            id: string;
            name: string;
          };
          series: string;
          price: 0;
          added: {
            version: string;
            date: string;
          };
          builtInEmote: string;
          copyrightedAudio: boolean;
          upcoming: boolean;
          reactive: boolean;
          releaseDate: string;
          lastAppearance: string;
          interest: 0;
          images: {
            full_background: string;
            icon_background: string;
            background: string;
            featured: string;
            icon: string;
          };
          video: string;
          audio: string;
          gameplayTags: string[];
          apiTags: string[];
          searchTags: string[];
          battlepass: string;
          set: string;
          introduction: string;
          displayAssets: [
            {
              displayAsset: string;
              materialInstance: string;
              url: string;
              flipbook: string;
              background_texture: string;
              background: string;
              full_background: string;
            },
          ];
          shopHistory: string[];
          styles: [
            {
              name: string;
              channel: string;
              channelName: string;
              tag: string;
              isDefault: boolean;
              startUnlocked: boolean;
              hideIfNotOwned: boolean;
              image: string;
            },
          ];
          grants: string[];
          grantedBy: string[];
        },
      ];
    },
  ];
};

export type ItemType =
  | "glider"
  | "emote"
  | "sparks_song"
  | "outfit"
  | "vehicle_wheel"
  | "bundle"
  | "vehicle_booster"
  | "shoes"
  | "pickaxe"
  | "wrap"
  | "contrail"
  | "sparks_guitar"
  | "sparks_bass"
  | "sparks_microphone"
  | "vehicle_body"
  | "backpack"
  | "sparks_drum";
