// Exercise images - using verified Unsplash URLs
const ex = (query: string) =>
  `https://images.unsplash.com/photo-${query}?w=400&h=400&fit=crop&auto=format&q=80`

export const exerciseImages: Record<string, string> = {
  bench_press: ex('1534368786749-b63e05c92ea0'), // bench press in gym
  incline_db_press: ex('1597452485669-2c7bb5fef90d'), // incline dumbbell press
  incline_db_fly: ex('1571019614242-c5c5dee9f50b'), // cable fly
  military_press: ex('1532029837206-abbe2b7620e0'), // overhead press
  overhead_tri: ex('1530822847156-5df684ec5ee1'), // triceps extension
  lateral_raise: ex('1581009146145-b5ef050c2e1e'), // lateral raises
  pullup: ex('1598971639058-fab3c3109a00'), // pull ups
  barbell_row: ex('1603287681836-b174ce5074c2'), // barbell row
  chest_row: ex('1534438327276-14e5300c3a48'), // cable row
  incline_curl: ex('1581009146145-b5ef050c2e1e'), // bicep curl
  preacher_curl: ex('1581009146145-b5ef050c2e1e'), // preacher curl
  face_pull: ex('1534368786749-b63e05c92ea0'), // cable face pull
  squat: ex('1566241142559-40e1dab266c6'), // barbell squat
  leg_press: ex('1534438327276-14e5300c3a48'), // leg press machine
  leg_extension: ex('1534438327276-14e5300c3a48'), // leg extension
  seated_leg_curl: ex('1534438327276-14e5300c3a48'), // leg curl machine
  standing_calf: ex('1571019614242-c5c5dee9f50b'), // calf raise
  hip_thrust: ex('1571019614242-c5c5dee9f50b'), // hip thrust
  pec_deck: ex('1571019614242-c5c5dee9f50b'), // chest fly
  seated_db_press: ex('1532029837206-abbe2b7620e0'), // seated overhead press
  overhead_tri_db: ex('1530822847156-5df684ec5ee1'), // overhead triceps dumbbell
  dips: ex('1598971639058-fab3c3109a00'), // chest dips
  cable_lateral: ex('1581009146145-b5ef050c2e1e'), // cable lateral raise
  close_pulldown: ex('1534438327276-14e5300c3a48'), // lat pulldown
  one_arm_row: ex('1603287681836-b174ce5074c2'), // one arm dumbbell row
  pullover: ex('1534438327276-14e5300c3a48'), // dumbbell pullover
  spider_curl: ex('1581009146145-b5ef050c2e1e'), // spider curl
  shrug: ex('1581009146145-b5ef050c2e1e'), // shrug
  rdl: ex('1517963879433-6ad2b056d712'), // romanian deadlift
  bulgarian: ex('1566241142559-40e1dab266c6'), // bulgarian split squat
  seated_calf: ex('1534438327276-14e5300c3a48'), // seated calf raise
  goblet_squat: ex('1566241142559-40e1dab266c6'), // goblet squat
  plank: ex('1566241142559-40e1dab266c6'), // plank
  hip_abduction: ex('1534438327276-14e5300c3a48'), // hip abduction machine
  glute_bridge: ex('1571019614242-c5c5dee9f50b'), // glute bridge
  step_up: ex('1534438327276-14e5300c3a48'), // step ups
  walking_lunge: ex('1566241142559-40e1dab266c6'), // lunges
  cable_kickback: ex('1534438327276-14e5300c3a48'), // cable kickback
  flat_db_press: ex('1581009146145-b5ef050c2e1e'), // flat dumbbell press
  flat_db_fly: ex('1571019614242-c5c5dee9f50b'), // dumbbell fly
  db_pullover: ex('1534438327276-14e5300c3a48'), // dumbbell pullover
  single_leg_hip: ex('1571019614242-c5c5dee9f50b'), // single leg hip thrust
  sumo_deadlift: ex('1517963879433-6ad2b056d712'), // sumo deadlift
  high_leg_press: ex('1534438327276-14e5300c3a48'), // high foot leg press
  incline_abduction: ex('1534438327276-14e5300c3a48'), // incline abduction
  triceps_pushdown: ex('1530822847156-5df684ec5ee1'), // triceps pushdown
}

// Food images - using verified Unsplash URLs
const fd = (query: string) =>
  `https://images.unsplash.com/photo-${query}?w=400&h=400&fit=crop&auto=format&q=80`

export const foodImages: Record<string, string> = {
  pancakes: fd('1567620905732-2d1ec7ab7445'), // pancakes
  avocado_toast: fd('1541519227354-08fa5d50c44d'), // avocado toast
  porridge: fd('1495214783159-3503fd1b572d'), // oatmeal bowl
  yogurt_granola: fd('1488477181946-6428a0291777'), // yogurt granola
  protein_shake: fd('1553787499-6f9133860278'), // smoothie
  scrambled_eggs: fd('1510693206972-df098062cb71'), // eggs
  chia_pudding: fd('1502741338009-cac2772e18bc'), // chia pudding
  chicken_wrap: fd('1626700051175-6818013e1d4f'), // wrap
  cottage_toast: fd('1541519227354-08fa5d50c44d'), // toast
  chicken_quinoa: fd('1532550907401-a500c9a57435'), // chicken bowl
  salmon_bowl: fd('1467003909585-2f8a72700288'), // salmon bowl
  lentils: fd('1505253716362-afaea1d3d1af'), // lentils
  chicken_rice: fd('1512058564366-18510be2db19'), // rice plate
  pasta_tuna: fd('1551183053-bf91a1d81141'), // pasta
  chickpeas: fd('1505253716362-afaea1d3d1af'), // legumes
  salmon_baked: fd('1467003909585-2f8a72700288'), // salmon
  poke_bowl: fd('1546069901-ba9599a7e63c'), // poke bowl
  beef_stir: fd('1504674900247-0877df9cc836'), // beef stir fry
  omelette: fd('1510693206972-df098062cb71'), // eggs
  pasta_salad: fd('1551183053-bf91a1d81141'), // pasta salad
  turkey_sandwich: fd('1528735602780-2552fd46c7af'), // sandwich
  curry: fd('1455619452474-d2be8b1e70cd'), // curry
  fish_steam: fd('1467003909585-2f8a72700288'), // fish
  tuna_salad: fd('1512621776951-a57141f2eefd'), // salad
  turkey_salad: fd('1512621776951-a57141f2eefd'), // salad
  pumpkin_soup: fd('1547592166897-f04e44e1b37a'), // soup
  seabass: fd('1467003909585-2f8a72700288'), // fish
  dorada: fd('1467003909585-2f8a72700288'), // fish
  escalivada: fd('1540420773420-3366772f4999'), // roasted vegetables
  gazpacho: fd('1464226184884-fa280b87c399'), // gazpacho
  ramen: fd('1569718212165-3a8278d5f624'), // ramen
  green_smooth: fd('1553787499-6f9133860278'), // green smoothie
  salmon_toast: fd('1467003909585-2f8a72700288'), // salmon toast
  nuts_choco: fd('1478145046317-39f10e56b5e9'), // nuts snack
  hummus: fd('1505253716362-afaea1d3d1af'), // hummus
  edamame: fd('1505253716362-afaea1d3d1af'), // edamame
  cottage_fruit: fd('1488477181946-6428a0291777'), // cottage cheese with fruit
  kale_chips: fd('1540420773420-3366772f4999'), // kale chips
  jamon_roll: fd('1504674900247-0877df9cc836'), // meat roll
  tofu_stir: fd('1512058564366-18510be2db19'), // tofu stir fry
  hummus_toast: fd('1541519227354-08fa5d50c44d'), // hummus on toast
  babaganoush: fd('1505253716362-afaea1d3d1af'), // baba ganoush dip
  boniato_chips: fd('1540420773420-3366772f4999'), // sweet potato chips
  falafel: fd('1505253716362-afaea1d3d1af'), // falafel plate
  gambas_ajillo: fd('1467003909585-2f8a72700288'), // garlic shrimp
  mejillones: fd('1467003909585-2f8a72700288'), // mussels
  pork_loin: fd('1504674900247-0877df9cc836'), // pork tenderloin
}
