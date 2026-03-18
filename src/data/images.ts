// Exercise images - using verified Unsplash URLs
const ex = (query: string) =>
  `https://images.unsplash.com/photo-${query}?w=400&h=400&fit=crop&auto=format&q=80`

export const exerciseImages: Record<string, string> = {
  bench_press: ex('1571019614242-c5c5dee9f50b'), // gym equipment
  incline_db_press: ex('1581009146145-b5ef050c2e1e'), // person lifting
  incline_db_fly: ex('1571019614242-c5c5dee9f50b'),
  military_press: ex('1581009146145-b5ef050c2e1e'),
  overhead_tri: ex('1581009146145-b5ef050c2e1e'),
  lateral_raise: ex('1581009146145-b5ef050c2e1e'),
  pullup: ex('1598971639058-fab3c3109a00'),
  barbell_row: ex('1534438327276-14e5300c3a48'), // gym
  chest_row: ex('1534438327276-14e5300c3a48'),
  incline_curl: ex('1581009146145-b5ef050c2e1e'),
  preacher_curl: ex('1581009146145-b5ef050c2e1e'),
  face_pull: ex('1534438327276-14e5300c3a48'),
  squat: ex('1566241142559-40e1dab266c6'),
  leg_press: ex('1534438327276-14e5300c3a48'),
  leg_extension: ex('1534438327276-14e5300c3a48'),
  seated_leg_curl: ex('1534438327276-14e5300c3a48'),
  standing_calf: ex('1571019614242-c5c5dee9f50b'),
  hip_thrust: ex('1571019614242-c5c5dee9f50b'),
  pec_deck: ex('1534438327276-14e5300c3a48'),
  seated_db_press: ex('1581009146145-b5ef050c2e1e'),
  overhead_tri_db: ex('1581009146145-b5ef050c2e1e'),
  dips: ex('1571019614242-c5c5dee9f50b'),
  cable_lateral: ex('1534438327276-14e5300c3a48'),
  close_pulldown: ex('1534438327276-14e5300c3a48'),
  one_arm_row: ex('1581009146145-b5ef050c2e1e'),
  pullover: ex('1534438327276-14e5300c3a48'),
  spider_curl: ex('1581009146145-b5ef050c2e1e'),
  shrug: ex('1581009146145-b5ef050c2e1e'),
  rdl: ex('1566241142559-40e1dab266c6'),
  bulgarian: ex('1566241142559-40e1dab266c6'),
  seated_calf: ex('1534438327276-14e5300c3a48'),
  goblet_squat: ex('1566241142559-40e1dab266c6'),
  plank: ex('1571019614242-c5c5dee9f50b'),
  hip_abduction: ex('1534438327276-14e5300c3a48'),
  glute_bridge: ex('1571019614242-c5c5dee9f50b'),
  step_up: ex('1566241142559-40e1dab266c6'),
  walking_lunge: ex('1566241142559-40e1dab266c6'),
  cable_kickback: ex('1534438327276-14e5300c3a48'),
  flat_db_press: ex('1581009146145-b5ef050c2e1e'),
  flat_db_fly: ex('1571019614242-c5c5dee9f50b'),
  db_pullover: ex('1534438327276-14e5300c3a48'),
  single_leg_hip: ex('1571019614242-c5c5dee9f50b'),
  sumo_deadlift: ex('1566241142559-40e1dab266c6'),
  high_leg_press: ex('1534438327276-14e5300c3a48'),
  incline_abduction: ex('1534438327276-14e5300c3a48'),
  triceps_pushdown: ex('1581009146145-b5ef050c2e1e'),
}

// Food images - using verified Unsplash URLs
const fd = (query: string) =>
  `https://images.unsplash.com/photo-${query}?w=400&h=400&fit=crop&auto=format&q=80`

export const foodImages: Record<string, string> = {
  pancakes: fd('1567620905732-2d1ec7ab7445'), // pancakes
  avocado_toast: fd('1541519227354-08fa5d50c44d'), // avocado toast
  porridge: fd('1495214783159-3503fd1b572d'), // oatmeal bowl
  yogurt_granola: fd('1488477181946-6428a0291777'), // yogurt
  protein_shake: fd('1553787499-6f9133860278'), // smoothie
  scrambled_eggs: fd('1510693206972-df098062cb71'), // eggs
  chia_pudding: fd('1502741338009-cac2772e18bc'), // chia
  chicken_wrap: fd('1626700051175-6818013e1d4f'), // wrap
  cottage_toast: fd('1541519227354-08fa5d50c44d'), // toast
  chicken_quinoa: fd('1546069901-ba9599a7e63c'), // bowl
  salmon_bowl: fd('1546069901-ba9599a7e63c'), // poke
  lentils: fd('1505253716362-afaea1d3d1af'), // lentils
  chicken_rice: fd('1512058564366-18510be2db19'), // rice plate
  pasta_tuna: fd('1473093295043-cdd812d0e601'), // pasta
  chickpeas: fd('1505253716362-afaea1d3d1af'), // legumes
  salmon_baked: fd('1467003909585-2f8a72700288'), // salmon
  poke_bowl: fd('1546069901-ba9599a7e63c'), // poke
  beef_stir: fd('1504674900247-0877df9cc836'), // meat
  omelette: fd('1510693206972-df098062cb71'), // eggs
  pasta_salad: fd('1473093295043-cdd812d0e601'), // pasta
  turkey_sandwich: fd('1528735602780-2552fd46c7af'), // sandwich
  curry: fd('1455619452474-d2be8b1e70cd'), // curry
  fish_steam: fd('1467003909585-2f8a72700288'), // fish
  tuna_salad: fd('1512621776951-a57141f2eefd'), // salad
  turkey_salad: fd('1512621776951-a57141f2eefd'), // salad
  pumpkin_soup: fd('1476718406336-bb5a9690ee2a'), // soup
  seabass: fd('1467003909585-2f8a72700288'), // fish
  dorada: fd('1467003909585-2f8a72700288'), // fish
  escalivada: fd('1504674900247-0877df9cc836'), // vegetables
  gazpacho: fd('1464226184884-fa280b87c399'), // gazpacho
  ramen: fd('1569718212165-3a8278d5f624'), // ramen
  green_smooth: fd('1553787499-6f9133860278'), // smoothie
  salmon_toast: fd('1467003909585-2f8a72700288'), // salmon
  nuts_choco: fd('1553787499-6f9133860278'), // nuts
  hummus: fd('1505253716362-afaea1d3d1af'), // hummus
  edamame: fd('1505253716362-afaea1d3d1af'), // edamame
  cottage_fruit: fd('1488477181946-6428a0291777'), // yogurt
  kale_chips: fd('1512621776951-a57141f2eefd'), // greens
  jamon_roll: fd('1504674900247-0877df9cc836'), // meat
  tofu_stir: fd('1512058564366-18510be2db19'), // stir fry
  hummus_toast: fd('1525351484163-7529414344d8'), // hummus on toast
  babaganoush: fd('1562967916145-f0759e8f4e24'), // baba ganoush dip
  boniato_chips: fd('1574071318508-1cdbab80d002'), // sweet potato chips
  falafel: fd('1593001872117-c5d8a0600421'), // falafel plate
  gambas_ajillo: fd('1551218808455-50f76d0fa7c1'), // garlic shrimp
  mejillones: fd('1559847844370-93e4cf2e2f2a'), // mussels
  pork_loin: fd('1432139555190-5e68f2e27a35'), // pork tenderloin
}
