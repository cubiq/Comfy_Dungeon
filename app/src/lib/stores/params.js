import { writable } from "svelte/store";

/** @type {Params} */
const params = {
  quality: {
    key: 'quality',
    value: 1,
    min: 0.0,
    max: 1.0,
    step: 0.25,
  },
  batchSize: {
    key: 'batchSize',
    value: 1,
    values: [0, 33, 66, 100],
    min: 1,
    max: 4,
    step: 1,
  },
  styles: {
    key: 'styles',
    options: [
      { value: "ProteusV0.3-LCM", label: "Illustration - Fast" },
      { value: "ProteusV0.3", label: "Illustration - Accurate" },
      { value: "ProteusV0.3-LCM-Anime", label: "Anime - Fast" },
      { value: "ProteusV0.3-Anime", label: "Anime - Accurate" },
      { value: "DreamShaperXLTurboV2-Cinematic", label: "Cinematic" },
    ],
    selected: "ProteusV0.3",
  },
  settings: {
    key: 'settings',
    options: [{ value: "fantasy", label: "Fantasy" }],
    selected: "fantasy",
  },
  backgrounds: {
    key: 'backgrounds',
    options: [
      { value: "", label: "-- undefined --" },
      { value: "inside a cave", label: "Cave" },
      { value: "in the desert", label: "Desert" },
      { value: "inside a dungeon", label: "Dungeon" },
      { value: "flames in background", label: "Flames" },
      { value: "forest in background", label: "Forest" },
      { value: "on a glacier", label: "Glacier" },
      { value: "magical aura in background", label: "Magical aura" },
      { value: "mountains in background", label: "Mountains" },
      { value: "flat plain background", label: "Plain background" },
      { value: "in the study, scrolls and potions", label: "Study" },
      { value: "inside a temple", label: "Temple" },
      { value: "on the streets of an old town", label: "Town" },
    ],
    selected: "",
  },
  moods: {
    key: 'moods',
    options: [
      { value: "angry evil", label: "Angry" },
      { value: "wise thoughtful serious mood", label: "Somber" },
      { value: "", label: "Neutral" },
      { value: "cunning smirk mood", label: "Cunning" },
      { value: "serene joyful dreamy", label: "Serene" },
      { value: "happy jovial (smiling:0.85)", label: "Happy" },
    ],
    selected: "",
  },
  colors: {
    key: 'colors',
    options: [
      { value: "", label: "-- undefined --" },
      { value: "burgundy", label: "Burgundy" },
      { value: "scarlet red", label: "Scarlet" },
      { value: "pink", label: "Pink" },
      { value: "beige", label: "Beige" },
      { value: "brown", label: "Brown" },
      { value: "orange", label: "Orange" },
      { value: "yellow", label: "Yellow" },
      { value: "green", label: "Green" },
      { value: "emerald", label: "Emerald" },
      { value: "aquamarine", label: "Aquamarine" },
      { value: "cerulean", label: "Cerulean" },
      { value: "blue", label: "Blue" },
      { value: "purple", label: "Purple" },
      { value: "magenta", label: "Magenta" },
      { value: "white", label: "White" },
      { value: "gray", label: "Gray" },
      { value: "black", label: "Black" },
      { value: "bronze", label: "Bronze" },
      { value: "copper", label: "Copper" },
      { value: "silver", label: "Silver" },
      { value: "gold", label: "Gold" },
    ],
    selected: "random",
  },
  gender: {
    key: 'gender',
    value: 0,
    min: 0,
    max: 3,
    step: 1,
  },
  age: {
    key: 'age',
    value: 1,
    min: 0,
    max: 3,
    step: 1,
  },
  bodyStructure: {
    key: 'bodyStructure',
    value: 1,
    min: 0,
    max: 3,
    step: 1,
  },
  race: {
    key: 'race',
    options: [
      { value: "", label: "-- undefined --" },
      { value: "dwarf", label: "Dwarf" },
      { value: "elf", label: "Elf" },
      { value: "gnome", label: "Gnome" },
      { value: "half-elf", label: "Half-Elf" },
      { value: "half-orc", label: "Half-Orc" },
      { value: "halfling", label: "Halfling" },
      { value: "human", label: "Human" },
      { value: "tiefling", label: "Tiefling" },
    ],
    selected: "",
  },
  ethnicity: {
    key: 'ethnicity',
    options: [
      { value: "", label: "-- undefined --" },
      { value: "0", label: "Completely Random" },
      { value: "1", label: "Africa: Eastern" },
      { value: "2", label: "Africa: Middle" },
      { value: "3", label: "Africa: Northern" },
      { value: "4", label: "Africa: Southern" },
      { value: "5", label: "Africa: Western" },
      { value: "6", label: "America: Central" },
      { value: "7", label: "America: Northern" },
      { value: "8", label: "America: Southern" },
      { value: "9", label: "Asia: Central" },
      { value: "10", label: "Asia: Eastern" },
      { value: "11", label: "Asia: South-Eastern" },
      { value: "12", label: "Asia: Southern" },
      { value: "13", label: "Asia: Western" },
      { value: "14", label: "Australia &amp; New Zealand" },
      { value: "15", label: "European: Eastern" },
      { value: "16", label: "European: Northern" },
      { value: "17", label: "European: Southern" },
      { value: "18", label: "European: Western" },
      { value: "19", label: "European: Islandic" },
      { value: "21", label: "Mela/Micro/Poly-nesia" },
    ],
    selected: "",
  },
  class: {
    key: 'class',
    options: [
      { value: "cleric", label: "Cleric" },
      { value: "fighter", label: "Fighter" },
      { value: "mage", label: "Mage" },
      { value: "noble person", label: "Noble person" },
      { value: "Paladin", label: "Paladin" },
      { value: "peasant", label: "Peasant" },
      { value: "ranger", label: "Ranger" },
      { value: "shaman", label: "Shaman" },
      { value: "thief", label: "Thief" },
    ],
    selected: "",
  },
  armor: {
    key: 'armor',
    options: [
      { value: "", label: "-- undefined --" },
      { value: "casual clothing", label: "Casual clothing" },
      { value: "elegant garments", label: "Elegant clothing" },
      { value: "furs clothing", label: "Furs" },
      { value: "a leather armor", label: "Light armor" },
      { value: "minimal simple clothing", label: "Minimal" },
      { value: "an heavy armor", label: "Heavy armor" },
      { value: "noble clothing", label: "Noble clothing" },
      { value: "rags", label: "Rags" },
      { value: "a robe", label: "Robe" },
    ],
    selected: "",
  },
  hairStyle: {
    key: 'hairStyle',
    options: [
      { value: "", label: "-- undefined --" },
      { value: "bald", label: "Bald" },
      { value: "simple braid hairstyle", label: "Braids" },
      { value: "buzz haircut", label: "Buzz cut" },
      { value: "cornrows hairstyle", label: "Cornrows" },
      { value: "long {{COLOR}}curly hair", label: "Curly Long" },
      { value: "short {{COLOR}}curly hair", label: "Curly Short" },
      { value: "dreadlocks hairstyle", label: "Dreadlocks" },
      { value: "long {{COLOR}}hair", label: "Long hair" },
      { value: "long {{COLOR}}disheveled hair", label: "Long disheveled" },
      { value: "long {{COLOR}}straight hair", label: "Long straight" },
      { value: "short mohawk hairstyle", label: "Mohawk" },
      { value: "pixie haircut", label: "Pixie cut" },
      { value: "ponytail hairstyle", label: "Ponytail" },
      { value: "short {{COLOR}}hair", label: "Short hair" },
      { value: "short {{COLOR}}disheveled hair", label: "Short disheveled" },
      { value: "short {{COLOR}}straight hair", label: "Short straight" },
    ],
    selected: "",
  },
  hairColor: {
    key: 'hairColor',
    options: [
      { value: "", label: "-- undefined --" },
      { value: "blond", label: "Blond" },
      { value: "dark blond", label: "Dark Blond" },
      { value: "medium brown", label: "Medium Brown" },
      { value: "dark brown", label: "Dark Brown" },
      { value: "reddish brown", label: "Reddish Brown" },
      { value: "red", label: "Red" },
      { value: "black", label: "Black" },
      { value: "canescent", label: "Graying" },
      { value: "gray", label: "Gray" },
      { value: "white", label: "White" },
    ],
    selected: "",
  },
};

function paramsStore() {
  const { subscribe, update } = writable(params);

  

  return { subscribe, updateSelected: (key, value) => {
    update((params) => {
      const param = params[key];
      if (param.options) {
        param.selected = value;
      } else {
        param.value = value;
      }
      return params;
    });
  }};
}

export default paramsStore();
