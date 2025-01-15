export type Option = {
  text: string;
  value: string;
};

export type CardType = 'Monster' | 'Spell' | 'Trap'

export type CardSet = {
  set_name: string;
  set_code: string;
  set_rarity: string;
  set_rarity_code: string;
  set_price: string;
};

export type CardImage = {
  id: number;
  image_url: string;
  image_url_small: string;
  image_url_cropped: string;
};

export type CardPrice = {
  cardmarket_price: string;
  tcgplayer_price: string;
  ebay_price: string;
  amazon_price: string;
  coolstuffinc_price: string;
};

export type Card = {
  id: number;
  name: string;
  type: string;
  frameType: string;
  desc: string;
  humanReadableCardType: string;
  atk: number;
  def: number;
  level: number;
  scale?: number;
  linkval?: number;
  linkmarkers?: string[];
  race: string;
  attribute: string;
  ygoprodeck_url: string;
  typeline?: string[];
  card_sets: CardSet[];
  card_images: CardImage[];
  card_prices: CardPrice[];
};

export type CardDetail = {
  name: string;
  image: string;
  desc: string;
  type: string[];
  data: Card;
};
