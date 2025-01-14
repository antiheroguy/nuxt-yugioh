export const MONSTER = 'Monster';
export const SPELL = 'Spell';
export const TRAP = 'Trap';
export const TOKEN = 'Token';
export const SKILL = 'Skill';

export const CARD_TYPE = [MONSTER, SPELL, TRAP, TOKEN, SKILL];

export const TYPE = {
  [MONSTER]: [
    'Effect Monster',
    'Flip Effect Monster',
    'Flip Tuner Effect Monster',
    'Gemini Monster',
    'Normal Monster',
    'Normal Tuner Monster',
    'Pendulum Effect Monster',
    'Pendulum Effect Ritual Monster',
    'Pendulum Flip Effect Monster',
    'Pendulum Normal Monster',
    'Pendulum Tuner Effect Monster',
    'Ritual Effect Monster',
    'Ritual Monster',
    'Spirit Monster',
    'Toon Monster',
    'Tuner Monster',
    'Union Effect Monster',
    'Fusion Monster',
    'Link Monster',
    'Pendulum Effect Fusion Monster',
    'Synchro Monster',
    'Synchro Pendulum Effect Monster',
    'Synchro Tuner Monster',
    'XYZ Monster',
    'XYZ Pendulum Effect Monster',
  ],
  [SPELL]: ['Spell Card'],
  [TRAP]: ['Trap Card'],
  [TOKEN]: ['Token'],
  [SKILL]: ['Skill Card'],
};

export const FRAME_TYPE = {
  [MONSTER]: [
    'normal',
    'effect',
    'ritual',
    'fusion',
    'synchro',
    'xyz',
    'link',
    'normal_pendulum',
    'effect_pendulum',
    'ritual_pendulum',
    'fusion_pendulum',
    'synchro_pendulum',
    'xyz_pendulum',
  ],
  [SPELL]: ['spell'],
  [TRAP]: ['trap'],
  [TOKEN]: ['token'],
  [SKILL]: ['skill'],
};

export const RACE = {
  [MONSTER]: [
    'Aqua',
    'Beast',
    'Beast-Warrior',
    'Creator-God',
    'Cyberse',
    'Dinosaur',
    'Divine-Beast',
    'Dragon',
    'Fairy',
    'Fiend',
    'Fish',
    'Insect',
    'Machine',
    'Plant',
    'Psychic',
    'Pyro',
    'Reptile',
    'Rock',
    'Sea Serpent',
    'Spellcaster',
    'Thunder',
    'Warrior',
    'Winged Beast',
    'Wyrm',
    'Zombie',
  ],
  [SPELL]: ['Normal', 'Field', 'Equip', 'Continuous', 'Quick-Play', 'Ritual'],
  [TRAP]: ['Normal', 'Continuous', 'Counter'],
};

export const ATTRIBUTE = [
  'dark',
  'earth',
  'fire',
  'light',
  'water',
  'wind',
  'divine',
];

export const SORT = ['atk', 'def', 'name', 'type', 'level', 'id', 'new'];

export const FORMAT = [
  'tcg',
  'goat',
  'ocg goat',
  'speed duel',
  'master duel',
  'rush duel',
  'duel links',
];

export const BANLIST = ['TCG', 'OCG', 'Goat'];

export const DATE_REGION = ['tcg', 'ocg'];

export const YES_NO_OPTIONS = [
  { text: 'Yes', value: true },
  { text: 'No', value: false },
];
