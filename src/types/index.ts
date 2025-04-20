export type SearchBody = {
  fname?: string | string[];
  archetype?: string | string[];
  level?: string | string[];
  type?: string | string[];
  attribute?: string | string[];
  race?: string | string[];
};
type CardSet = {
  set_name: string;
  set_code: string;
  set_rarity: string;
  set_rarity_code: string;
  set_price: string;
};

type CardImage = {
  id: number;
  image_url: string;
  image_url_small: string;
  image_url_cropped: string;
};

type CardPrice = {
  cardmarket_price: string;
  tcgplayer_price: string;
  ebay_price: string;
  amazon_price: string;
  coolstuffinc_price: string;
};

export type MonsterCardType = {
  id: number;
  name: string;
  typeline: string[]; // e.g. ["Warrior", "Fusion", "Effect"]
  type: string;
  humanReadableCardType: string;
  frameType: string;
  desc: string;
  race: string;
  atk: number;
  def: number;
  level: number;
  attribute: string;
  archetype: string;
  ygoprodeck_url: string;
  card_sets: CardSet[];
  card_images: CardImage[];
  card_prices: CardPrice[];
};

export type SpellCardType = {
  id: number;
  name: string;
  type: "Spell Card";
  humanReadableCardType: string;
  frameType: string;
  desc: string;
  race: string;
  archetype: string;
  ygoprodeck_url: string;
  card_sets: CardSet[];
  card_images: CardImage[];
  card_prices: CardPrice[];
  attribute: null;
  atk:null
  def:null
  level:null
};


export type TrapCardType = {
  id: number;
  name: string;
  type: "Trap Card";
  humanReadableCardType: string;
  frameType: string;
  desc: string;
  race: string;
  ygoprodeck_url: string;
  card_sets: CardSet[];
  card_images: CardImage[];
  card_prices: CardPrice[];
  archetype: null;
  attribute: null;
  atk: null;
  def: null;
  level: null;
};

export type CardMetaType= {
  generated: string; // ISO date string
  current_rows: number;
  total_rows: number;
  rows_remaining: number;
  total_pages: number;
  pages_remaining: number;
  next_page: string;
  next_page_offset: number;
};

export type CardSetType = {
  set_name: string;
  set_code: string;
  set_rarity: string;
  set_rarity_code: string;
  set_price: string;
};

export type CardType = MonsterCardType | SpellCardType | TrapCardType;