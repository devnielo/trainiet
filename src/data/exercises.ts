import type { Day } from './types'

// Phase 6 - PPL (from original script)
export const pplDays: Day[] = [
  {
    id: 'push_a',
    label: 'Push A',
    subtitle: 'Fuerza + Estiramiento',
    muscles: 'Pecho - Hombro - Triceps',
    totalSets: 19,
    estimatedMinutes: [55, 65],
    category: 'push',
    dayLetter: 'Lunes',
    exercises: [
      { id: 'push_a_0', name: 'Press banca plano', imageKey: 'bench_press', isStretch: false, rationale: 'Compuesto principal', sets: '4x6-8', rir: '2-3', rest: '3m', instructions: 'Tumbado, agarre algo mas ancho que hombros. Escapulas retraidas. Baja al esternon codos ~45. Pausa y empuja.' },
      { id: 'push_a_1', name: 'Press inclinado 30 DB', imageKey: 'incline_db_press', isStretch: false, rationale: 'Pectoral superior', sets: '3x8-10', rir: '2', rest: '2m', instructions: 'Banco 30. Baja mancuernas al pecho, codos ~45. Empuja juntando ligeramente arriba.' },
      { id: 'push_a_2', name: 'Aperturas inclinadas DB', imageKey: 'incline_db_fly', isStretch: true, rationale: 'Pectoral max. estiramiento', sets: '3x12-15', rir: '1-2', rest: '90s', instructions: 'Banco 30, codos ligeramente flexionados fijos. Abre en arco buscando estiramiento profundo. Contrae pecho al cerrar.' },
      { id: 'push_a_3', name: 'Press militar de pie', imageKey: 'military_press', isStretch: false, rationale: 'Deltoides ant. y medial', sets: '3x8-10', rir: '2', rest: '2m', instructions: 'De pie, barra en claviculas. Core y gluteos apretados. Empuja vertical, cabeza atras para dejar paso.' },
      { id: 'push_a_4', name: 'Extension triceps overhead', imageKey: 'overhead_tri', isStretch: true, rationale: 'Cabeza larga -- Maeo 2023', sets: '3x10-12', rir: '1-2', rest: '90s', instructions: 'Espaldas a polea con cuerda. Codos al frente, deja que el peso estire triceps. Extiende hasta bloquear.' },
      { id: 'push_a_5', name: 'Elevaciones laterales DB', imageKey: 'lateral_raise', isStretch: false, rationale: 'Deltoides medial', sets: '3x15-20', rir: '1', rest: '60s', instructions: 'Mancuernas a lados. Eleva lateralmente liderando con codos hasta paralelo. Baja 2-3s sin impulso.' },
    ],
  },
  {
    id: 'pull_a',
    label: 'Pull A',
    subtitle: 'Fuerza + Estiramiento',
    muscles: 'Espalda - Biceps - Trapecio',
    totalSets: 19,
    estimatedMinutes: [55, 65],
    category: 'pull',
    dayLetter: 'Martes',
    exercises: [
      { id: 'pull_a_0', name: 'Dominadas / Jalon pecho', imageKey: 'pullup', isStretch: false, rationale: 'Dorsal -- patron vertical', sets: '4x6-8', rir: '2-3', rest: '3m', instructions: 'Agarre prono, retrae escapulas, codos abajo y atras. Barbilla sobre barra. Baja controlado.' },
      { id: 'pull_a_1', name: 'Remo con barra', imageKey: 'barbell_row', isStretch: false, rationale: 'Espalda media -- horizontal', sets: '3x8-10', rir: '2', rest: '2.5m', instructions: 'Torso ~45, espalda neutra. Tira hacia abdomen, escapulas juntas. Baja sin perder posicion.' },
      { id: 'pull_a_2', name: 'Remo maquina pectoral', imageKey: 'chest_row', isStretch: false, rationale: 'Dorsal sin fatiga lumbar', sets: '3x10-12', rir: '1-2', rest: '90s', instructions: 'Pecho contra almohadilla. Tira codos junto al cuerpo, aprieta escapulas 1s. Vuelve controlado.' },
      { id: 'pull_a_3', name: 'Curl inclinado 45-60', imageKey: 'incline_curl', isStretch: true, rationale: 'Biceps max. estiramiento -- Kobayashi 2024', sets: '3x10-12', rir: '1-2', rest: '90s', instructions: 'Brazos colgando perpendiculares. Flexiona sin adelantar codos. Excentrica 3s. Estiramiento completo abajo.' },
      { id: 'pull_a_4', name: 'Curl predicador EZ', imageKey: 'preacher_curl', isStretch: false, rationale: 'Biceps distal -- Kassiano 2025', sets: '3x10-12', rir: '1-2', rest: '90s', instructions: 'Brazos sobre almohadilla. Flexiona sin hiperextender. Excentrica controlada crucial.' },
      { id: 'pull_a_5', name: 'Face pulls polea', imageKey: 'face_pull', isStretch: false, rationale: 'Deltoides post. + rotadores', sets: '3x15-20', rir: '1', rest: '60s', instructions: 'Polea a la cara, tira separando extremos, codos altos, rotacion externa. Manten 1s.' },
    ],
  },
  {
    id: 'legs_a',
    label: 'Piernas A',
    subtitle: 'Cuadriceps dominante',
    muscles: 'Cuadriceps - Isquio - Gemelo - Gluteo',
    totalSets: 20,
    estimatedMinutes: [65, 75],
    category: 'legs',
    dayLetter: 'Miercoles',
    exercises: [
      { id: 'legs_a_0', name: 'Sentadilla barra alta', imageKey: 'squat', isStretch: false, rationale: 'Vastos + gluteo -- Burke 2024', sets: '4x6-8', rir: '2-3', rest: '3m', instructions: 'Pies anchura hombros, puntas fuera. Core, baja profundidad completa. Empuja suelo.' },
      { id: 'legs_a_1', name: 'Prensa piernas pies bajos', imageKey: 'leg_press', isStretch: false, rationale: 'Vastos -- Burke 2024', sets: '3x10-12', rir: '2', rest: '2.5m', instructions: 'Espalda firme, pies parte baja plataforma. Baja ~90+. Empuja sin bloquear rodillas.' },
      { id: 'legs_a_2', name: 'Extension de pierna', imageKey: 'leg_extension', isStretch: false, rationale: 'Recto femoral -- Burke 2024', sets: '3x12-15', rir: '1', rest: '90s', instructions: 'Rodillas alineadas con eje. Extiende completo, aprieta 1s. Baja controlado.' },
      { id: 'legs_a_3', name: 'Curl pierna sentado', imageKey: 'seated_leg_curl', isStretch: true, rationale: 'Isquios estiramiento -- Maeo 2021', sets: '3x10-12', rir: '1-2', rest: '90s', instructions: 'Desde piernas extendidas, tira talones a gluteos. Sentado estira mas isquios. Excentrica 3s.' },
      { id: 'legs_a_4', name: 'Gemelo de pie', imageKey: 'standing_calf', isStretch: true, rationale: 'Gastrocnemio -- Kinoshita 2023', sets: '4x10-15', rir: '1', rest: '90s', instructions: 'Puntas en borde. Baja talones al maximo 2s. Sube contrayendo al maximo 1s. Rango completo.' },
      { id: 'legs_a_5', name: 'Hip thrust barra', imageKey: 'hip_thrust', isStretch: false, rationale: 'Gluteo en acortamiento', sets: '3x10-12', rir: '2', rest: '2m', instructions: 'Espalda en banco, barra en caderas. Empuja caderas al techo apretando gluteos. Barbilla recogida.' },
    ],
  },
  {
    id: 'push_b',
    label: 'Push B',
    subtitle: 'Volumen + Estiramiento',
    muscles: 'Pecho - Hombro - Triceps',
    totalSets: 19,
    estimatedMinutes: [55, 65],
    category: 'push',
    dayLetter: 'Jueves',
    exercises: [
      { id: 'push_b_0', name: 'Press inclinado 30 barra', imageKey: 'incline_db_press', isStretch: false, rationale: 'Pectoral sup. como lider', sets: '4x8-10', rir: '2', rest: '2.5m', instructions: 'Banco 30, escapulas retraidas. Baja a parte alta pecho. Empuja vertical. Codos ~45.' },
      { id: 'push_b_1', name: 'Pec deck / aperturas maquina', imageKey: 'pec_deck', isStretch: true, rationale: 'Tension constante en estiramiento', sets: '3x12-15', rir: '1', rest: '90s', instructions: 'Espalda apoyada. Junta brazos contrayendo. Vuelve 3s buscando maximo estiramiento.' },
      { id: 'push_b_2', name: 'Press hombro DB sentado', imageKey: 'seated_db_press', isStretch: false, rationale: 'Deltoides -- variacion dia A', sets: '3x10-12', rir: '2', rest: '2m', instructions: 'Banco 90. Empuja vertical hasta juntar. Baja hasta codos 90+. Core apretado.' },
      { id: 'push_b_3', name: 'Extension triceps DB 2 manos', imageKey: 'overhead_tri_db', isStretch: true, rationale: 'Cabeza larga -- clave crecimiento', sets: '3x10-12', rir: '1-2', rest: '90s', instructions: 'DB con ambas manos sobre cabeza. Codos al techo. Baja detras sintiendo estiramiento. Extiende.' },
      { id: 'push_b_4', name: 'Fondos paralelas (lastre)', imageKey: 'dips', isStretch: true, rationale: 'Pectoral inf. + triceps', sets: '3x8-12', rir: '2', rest: '2m', instructions: 'Inclina torso ~15. Baja hombros a nivel codos. Empuja hasta extension. >12 reps: anade lastre.' },
      { id: 'push_b_5', name: 'Laterales en polea', imageKey: 'cable_lateral', isStretch: false, rationale: 'Deltoides -- curva distinta', sets: '3x15-20', rir: '1', rest: '60s', instructions: 'Polea baja, mano contraria cruzando. Eleva lateral. Tension constante todo rango.' },
    ],
  },
  {
    id: 'pull_b',
    label: 'Pull B',
    subtitle: 'Volumen + Estiramiento',
    muscles: 'Espalda - Biceps - Trapecio',
    totalSets: 18,
    estimatedMinutes: [50, 60],
    category: 'pull',
    dayLetter: 'Viernes',
    exercises: [
      { id: 'pull_b_0', name: 'Jalon neutro cerrado', imageKey: 'close_pulldown', isStretch: false, rationale: 'Dorsal -- variacion agarre', sets: '3x8-10', rir: '2', rest: '2.5m', instructions: 'Agarre neutro. Tira a pecho, escapulas abajo. Reduce estres hombros.' },
      { id: 'pull_b_1', name: 'Remo DB una mano', imageKey: 'one_arm_row', isStretch: false, rationale: 'Espalda + ROM amplio', sets: '3x10-12', rir: '2', rest: '90s', instructions: 'Rodilla en banco, espalda plana. Tira a cadera, codo arriba. Baja buscando estiramiento.' },
      { id: 'pull_b_2', name: 'Pullover en polea', imageKey: 'pullover', isStretch: true, rationale: 'Dorsal max. estiramiento', sets: '3x12-15', rir: '1-2', rest: '90s', instructions: 'Brazos casi rectos. Tira en arco hasta muslos. Vuelve sintiendo estiramiento arriba.' },
      { id: 'pull_b_3', name: 'Curl inclinado 45-60', imageKey: 'incline_curl', isStretch: true, rationale: 'Mejor ej. biceps -- se repite', sets: '3x10-12', rir: '1-2', rest: '90s', instructions: 'Igual dia A. 2x/semana por mejor evidencia de hipertrofia biceps.' },
      { id: 'pull_b_4', name: 'Spider curl', imageKey: 'spider_curl', isStretch: false, rationale: 'Cabeza corta -- complemento', sets: '3x12-15', rir: '1', rest: '90s', instructions: 'Pecho en parte alta banco inclinado. Maxima tension en contraccion -- complemento al inclinado.' },
      { id: 'pull_b_5', name: 'Encogimientos barra', imageKey: 'shrug', isStretch: false, rationale: 'Trapecio superior', sets: '3x12-15', rir: '1-2', rest: '60s', instructions: 'De pie, eleva hombros a orejas. Aprieta 1-2s. Baja con control. Sin circulos.' },
    ],
  },
  {
    id: 'legs_b',
    label: 'Piernas B',
    subtitle: 'Isquio/Gluteo dominante',
    muscles: 'Isquio - Gluteo - Cuadriceps - Gemelo',
    totalSets: 19,
    estimatedMinutes: [60, 70],
    category: 'legs',
    dayLetter: 'Sabado',
    exercises: [
      { id: 'legs_b_0', name: 'Peso muerto rumano', imageKey: 'rdl', isStretch: true, rationale: 'Isquios + gluteo estiramiento', sets: '4x8-10', rir: '2-3', rest: '3m', instructions: 'Rodillas flex. fijo. Caderas atras como bisagra. Barra pegada. Baja hasta estiramiento profundo.' },
      { id: 'legs_b_1', name: 'Curl pierna sentado', imageKey: 'seated_leg_curl', isStretch: true, rationale: '2a frecuencia -- Maeo 2021', sets: '3x10-12', rir: '1-2', rest: '90s', instructions: 'Igual dia A. Excentrica 3s. Estiramiento sentado es la clave.' },
      { id: 'legs_b_2', name: 'Bulgara con DB', imageKey: 'bulgarian', isStretch: false, rationale: 'Cuadriceps + gluteo unilateral', sets: '3x10-12', rir: '2', rest: '2m', instructions: 'Empeine en banco. DB en manos. Baja muslo paralelo. Torso erguido.' },
      { id: 'legs_b_3', name: 'Extension pierna', imageKey: 'leg_extension', isStretch: false, rationale: 'Recto femoral 2a freq. -- Burke 2024', sets: '3x12-15', rir: '1', rest: '90s', instructions: 'Segunda frecuencia. Recto femoral solo responde bien a este ejercicio.' },
      { id: 'legs_b_4', name: 'Gemelo sentado', imageKey: 'seated_calf', isStretch: false, rationale: 'Soleo -- complemento', sets: '3x15-20', rir: '1', rest: '60s', instructions: 'Rodillas flex. desactivan gastrocnemio. Aisla soleo que da volumen.' },
      { id: 'legs_b_5', name: 'Gemelo pie parciales', imageKey: 'standing_calf', isStretch: true, rationale: 'Parciales estirados -- Wolf 2025', sets: '3x10-12', rir: '1', rest: '90s', instructions: 'Solo mitad inferior del rango. Mantiene gastrocnemio en zona estirada. Menos peso.' },
    ],
  },
]

// ═══════════════════════════════════════════════════════════════
// Eva — Full Body 3x (Phase 1-2)
// Higher glute/leg volume (Wernbom 2007, Fonseca 2014)
// Shorter rest periods 60-90s (Judge & Burke 2010)
// Higher frequency tolerable (Vikmoen 2020)
// ═══════════════════════════════════════════════════════════════

export const evaFullBody3x: Day[] = [
  {
    id: 'eva_fb_a',
    label: 'Full Body A',
    subtitle: 'Gluteo + Push',
    muscles: 'Gluteo - Pierna - Pecho - Hombro - Core',
    totalSets: 19,
    estimatedMinutes: [45, 55],
    category: 'fullbody',
    dayLetter: 'Lunes',
    exercises: [
      { id: 'eva_fb_a_0', name: 'Hip thrust', imageKey: 'hip_thrust', isStretch: false, rationale: 'Compuesto principal gluteo -- Contreras 2015, gluteo max activacion', sets: '4x8-10', rir: '2', rest: '90s', instructions: 'Espalda en banco, barra en caderas con pad. Pies anchura caderas. Empuja caderas al techo apretando gluteos arriba 2s. Barbilla recogida.' },
      { id: 'eva_fb_a_1', name: 'Sentadilla goblet', imageKey: 'goblet_squat', isStretch: false, rationale: 'Patron sentadilla seguro -- Burke 2024, vastos + gluteo', sets: '3x10-12', rir: '2', rest: '90s', instructions: 'DB o KB a nivel pecho. Pies algo mas que anchura hombros. Baja profundo manteniendo torso erguido. Empuja suelo.' },
      { id: 'eva_fb_a_2', name: 'Press mancuernas inclinado', imageKey: 'incline_db_press', isStretch: false, rationale: 'Pectoral superior -- Schoenfeld 2016', sets: '3x10-12', rir: '2', rest: '90s', instructions: 'Banco 30. Baja mancuernas al pecho, codos ~45. Empuja juntando ligeramente arriba.' },
      { id: 'eva_fb_a_3', name: 'Elevaciones laterales', imageKey: 'lateral_raise', isStretch: false, rationale: 'Deltoides medial -- estetica hombros', sets: '3x15-20', rir: '1', rest: '60s', instructions: 'Mancuernas a lados. Eleva lateralmente liderando con codos hasta paralelo. Baja 2-3s sin impulso.' },
      { id: 'eva_fb_a_4', name: 'Plancha + bird dog', imageKey: 'plank', isStretch: false, rationale: 'Core estabilidad -- McGill, fundacion para compuestos', sets: '3x30s+8reps', rir: '-', rest: '60s', instructions: 'Plancha 30s con core apretado. Sin pausa, bird dog alterno 8 reps/lado controladas.' },
      { id: 'eva_fb_a_5', name: 'Abductora en maquina', imageKey: 'hip_abduction', isStretch: false, rationale: 'Gluteo med. aislamiento -- Vikmoen 2020, volumen extra gluteo', sets: '3x15-20', rir: '1', rest: '60s', instructions: 'Sentada, espalda recta. Abre piernas contra resistencia. Aprieta gluteos arriba 1s. Vuelve controlado.' },
    ],
  },
  {
    id: 'eva_fb_b',
    label: 'Full Body B',
    subtitle: 'Posterior + Pull',
    muscles: 'Isquio - Gluteo - Espalda - Biceps',
    totalSets: 18,
    estimatedMinutes: [40, 50],
    category: 'fullbody',
    dayLetter: 'Miercoles',
    exercises: [
      { id: 'eva_fb_b_0', name: 'Peso muerto rumano', imageKey: 'rdl', isStretch: true, rationale: 'Isquios + gluteo en estiramiento -- Maeo 2021', sets: '3x8-10', rir: '2', rest: '90s', instructions: 'Rodillas flex. fijo. Caderas atras como bisagra. Mancuernas pegadas. Baja hasta estiramiento profundo isquios.' },
      { id: 'eva_fb_b_1', name: 'Remo con mancuerna', imageKey: 'one_arm_row', isStretch: false, rationale: 'Espalda media -- ROM amplio unilateral', sets: '3x10-12', rir: '2', rest: '90s', instructions: 'Rodilla en banco, espalda plana. Tira a cadera, codo arriba. Baja buscando estiramiento.' },
      { id: 'eva_fb_b_2', name: 'Puente de gluteo elevado', imageKey: 'glute_bridge', isStretch: false, rationale: 'Gluteo aislamiento -- Contreras 2015, segundo patron gluteo semanal', sets: '3x12-15', rir: '1-2', rest: '60s', instructions: 'Pies elevados en banco. Empuja caderas al techo contrayendo gluteos. Pausa 2s arriba. Baja controlado.' },
      { id: 'eva_fb_b_3', name: 'Jalon al pecho', imageKey: 'close_pulldown', isStretch: false, rationale: 'Dorsal -- patron vertical, base espalda', sets: '3x10-12', rir: '2', rest: '90s', instructions: 'Agarre medio, tira a pecho retrayendo escapulas. Codos abajo y atras. Vuelve controlado.' },
      { id: 'eva_fb_b_4', name: 'Curl biceps mancuerna', imageKey: 'incline_curl', isStretch: false, rationale: 'Biceps -- volumen brazo basico', sets: '3x12-15', rir: '1', rest: '60s', instructions: 'De pie, mancuernas a lados. Flexiona sin mover codos. Excentrica 2-3s. Extension completa abajo.' },
      { id: 'eva_fb_b_5', name: 'Step ups con mancuerna', imageKey: 'step_up', isStretch: false, rationale: 'Gluteo + cuad unilateral -- Fonseca 2014, volumen pierna extra', sets: '3x10-12/pierna', rir: '2', rest: '60s', instructions: 'Banco o cajon. Sube empujando con pierna de arriba, no impulsar con la de abajo. Baja controlado.' },
    ],
  },
  {
    id: 'eva_fb_c',
    label: 'Full Body C',
    subtitle: 'Cuad + Brazos',
    muscles: 'Cuadriceps - Gluteo - Hombro - Triceps - Isquio',
    totalSets: 18,
    estimatedMinutes: [40, 50],
    category: 'fullbody',
    dayLetter: 'Viernes',
    exercises: [
      { id: 'eva_fb_c_0', name: 'Prensa de piernas', imageKey: 'leg_press', isStretch: false, rationale: 'Cuadriceps sin carga axial -- Burke 2024', sets: '3x10-12', rir: '2', rest: '90s', instructions: 'Espalda firme, pies medio-bajos en plataforma. Baja ~90+ grados. Empuja sin bloquear rodillas.' },
      { id: 'eva_fb_c_1', name: 'Zancadas caminando', imageKey: 'walking_lunge', isStretch: false, rationale: 'Gluteo + cuad funcional -- Fonseca 2014', sets: '3x12/pierna', rir: '2', rest: '60s', instructions: 'Paso largo adelante. Rodilla trasera casi toca suelo. Empuja con pierna delantera para siguiente paso.' },
      { id: 'eva_fb_c_2', name: 'Press militar sentada', imageKey: 'seated_db_press', isStretch: false, rationale: 'Deltoides anterior y medial -- Schoenfeld 2016', sets: '3x10-12', rir: '2', rest: '90s', instructions: 'Banco 90. Mancuernas a nivel orejas. Empuja vertical. Baja controlado hasta codos 90+.' },
      { id: 'eva_fb_c_3', name: 'Extension triceps polea', imageKey: 'triceps_pushdown', isStretch: false, rationale: 'Triceps aislamiento basico', sets: '3x12-15', rir: '1', rest: '60s', instructions: 'Polea alta, barra o cuerda. Codos pegados al cuerpo. Extiende hasta bloquear. Vuelve controlado.' },
      { id: 'eva_fb_c_4', name: 'Curl femoral sentada', imageKey: 'seated_leg_curl', isStretch: true, rationale: 'Isquios en estiramiento -- Maeo 2021, stretch-mediated hypertrophy', sets: '3x10-12', rir: '1-2', rest: '90s', instructions: 'Desde piernas extendidas, tira talones a gluteos. Sentado estira mas isquios. Excentrica 3s.' },
      { id: 'eva_fb_c_5', name: 'Patada de gluteo en polea', imageKey: 'cable_kickback', isStretch: false, rationale: 'Gluteo aislamiento final -- Wernbom 2007, volumen gluteo semanal 15-20 sets', sets: '3x15/pierna', rir: '1', rest: '60s', instructions: 'Tobillera en polea baja. Inclina torso ligeramente. Extiende cadera atras apretando gluteo. Sin arquear lumbar.' },
    ],
  },
]

// ═══════════════════════════════════════════════════════════════
// Eva — Upper/Lower 4x (Phase 3-4)
// ═══════════════════════════════════════════════════════════════

export const evaUpperLower4x: Day[] = [
  {
    id: 'eva_ul_a',
    label: 'Lower A',
    subtitle: 'Gluteo dominante',
    muscles: 'Gluteo - Isquio - Abductor - Cuadriceps',
    totalSets: 19,
    estimatedMinutes: [50, 60],
    category: 'lower',
    dayLetter: 'Lunes',
    exercises: [
      { id: 'eva_ul_a_0', name: 'Hip thrust', imageKey: 'hip_thrust', isStretch: false, rationale: 'Gluteo max en acortamiento -- Contreras 2015', sets: '4x8-10', rir: '2', rest: '90s', instructions: 'Espalda en banco, barra con pad en caderas. Empuja caderas al techo apretando gluteos 2s. Barbilla recogida.' },
      { id: 'eva_ul_a_1', name: 'Sentadilla bulgara', imageKey: 'bulgarian', isStretch: false, rationale: 'Gluteo + cuad unilateral -- Schoenfeld 2015', sets: '3x10-12/pierna', rir: '2', rest: '90s', instructions: 'Empeine en banco. DB en manos. Baja muslo paralelo. Torso ligeramente inclinado para enfatizar gluteo.' },
      { id: 'eva_ul_a_2', name: 'Curl femoral sentada', imageKey: 'seated_leg_curl', isStretch: true, rationale: 'Isquios stretch-mediated -- Maeo 2021', sets: '3x10-12', rir: '1-2', rest: '90s', instructions: 'Desde piernas extendidas, tira talones a gluteos. Excentrica 3s. Estiramiento completo es clave.' },
      { id: 'eva_ul_a_3', name: 'Abductora en maquina', imageKey: 'hip_abduction', isStretch: false, rationale: 'Gluteo med. aislamiento -- volumen extra gluteo', sets: '3x15-20', rir: '1', rest: '60s', instructions: 'Sentada, espalda recta. Abre piernas contra resistencia. Aprieta gluteos 1s arriba.' },
      { id: 'eva_ul_a_4', name: 'Peso muerto sumo', imageKey: 'sumo_deadlift', isStretch: false, rationale: 'Cadena posterior + aductores -- patron bisagra pesado', sets: '3x8-10', rir: '2', rest: '90s', instructions: 'Pies anchos, puntas fuera. Agarra barra entre piernas. Caderas atras, pecho alto. Empuja suelo.' },
      { id: 'eva_ul_a_5', name: 'Elevacion de pelvis 1 pierna', imageKey: 'single_leg_hip', isStretch: false, rationale: 'Gluteo unilateral -- correccion asimetrias', sets: '3x12/pierna', rir: '1', rest: '60s', instructions: 'Tumbada, una pierna extendida. Empuja caderas arriba con pierna apoyada. Aprieta gluteo 2s.' },
    ],
  },
  {
    id: 'eva_ul_b',
    label: 'Upper A',
    subtitle: 'Push + Pull',
    muscles: 'Pecho - Espalda - Hombro',
    totalSets: 18,
    estimatedMinutes: [45, 55],
    category: 'upper',
    dayLetter: 'Martes',
    exercises: [
      { id: 'eva_ul_b_0', name: 'Press mancuernas plano', imageKey: 'flat_db_press', isStretch: false, rationale: 'Pectoral principal -- Schoenfeld 2016', sets: '3x8-10', rir: '2', rest: '90s', instructions: 'Tumbada, mancuernas a nivel pecho. Escapulas retraidas. Empuja vertical juntando arriba.' },
      { id: 'eva_ul_b_1', name: 'Remo con barra', imageKey: 'barbell_row', isStretch: false, rationale: 'Espalda media compuesto -- horizontal pull', sets: '3x8-10', rir: '2', rest: '90s', instructions: 'Torso ~45, espalda neutra. Tira hacia abdomen, escapulas juntas. Baja sin perder posicion.' },
      { id: 'eva_ul_b_2', name: 'Aperturas inclinadas DB', imageKey: 'incline_db_fly', isStretch: true, rationale: 'Pectoral max. estiramiento -- Maeo 2023', sets: '3x12-15', rir: '1-2', rest: '60s', instructions: 'Banco 30, codos ligeramente flexionados. Abre en arco buscando estiramiento profundo. Contrae al cerrar.' },
      { id: 'eva_ul_b_3', name: 'Jalon al pecho', imageKey: 'close_pulldown', isStretch: false, rationale: 'Dorsal vertical -- Schoenfeld 2015', sets: '3x10-12', rir: '2', rest: '90s', instructions: 'Agarre medio, tira a pecho retrayendo escapulas. Codos abajo y atras.' },
      { id: 'eva_ul_b_4', name: 'Elevaciones laterales', imageKey: 'lateral_raise', isStretch: false, rationale: 'Deltoides medial -- estetica hombros', sets: '3x15-20', rir: '1', rest: '60s', instructions: 'Mancuernas a lados. Eleva lateralmente liderando con codos hasta paralelo. Baja 2-3s.' },
      { id: 'eva_ul_b_5', name: 'Face pulls', imageKey: 'face_pull', isStretch: false, rationale: 'Deltoides post. + salud hombro', sets: '3x15-20', rir: '1', rest: '60s', instructions: 'Polea a la cara, tira separando extremos, codos altos, rotacion externa. Manten 1s.' },
    ],
  },
  {
    id: 'eva_ul_c',
    label: 'Lower B',
    subtitle: 'Cuad dominante',
    muscles: 'Cuadriceps - Gluteo - Gemelo - Abductor',
    totalSets: 19,
    estimatedMinutes: [50, 60],
    category: 'lower',
    dayLetter: 'Jueves',
    exercises: [
      { id: 'eva_ul_c_0', name: 'Prensa piernas alta', imageKey: 'high_leg_press', isStretch: false, rationale: 'Cuadriceps enfasis -- Burke 2024', sets: '4x10-12', rir: '2', rest: '90s', instructions: 'Pies parte alta plataforma. Espalda firme. Baja ~90+. Empuja sin bloquear rodillas.' },
      { id: 'eva_ul_c_1', name: 'Zancadas caminando', imageKey: 'walking_lunge', isStretch: false, rationale: 'Gluteo + cuad funcional -- Fonseca 2014', sets: '3x12/pierna', rir: '2', rest: '60s', instructions: 'Paso largo adelante. Rodilla trasera casi toca suelo. Empuja con pierna delantera.' },
      { id: 'eva_ul_c_2', name: 'Extension pierna', imageKey: 'leg_extension', isStretch: false, rationale: 'Recto femoral aislamiento -- Burke 2024', sets: '3x12-15', rir: '1', rest: '90s', instructions: 'Rodillas alineadas con eje. Extiende completo, aprieta 1s. Baja controlado.' },
      { id: 'eva_ul_c_3', name: 'Patada gluteo polea', imageKey: 'cable_kickback', isStretch: false, rationale: 'Gluteo aislamiento -- volumen extra semanal', sets: '3x15/pierna', rir: '1', rest: '60s', instructions: 'Tobillera en polea baja. Extiende cadera atras apretando gluteo. Sin arquear lumbar.' },
      { id: 'eva_ul_c_4', name: 'Gemelo sentado', imageKey: 'seated_calf', isStretch: false, rationale: 'Soleo -- complemento tren inferior', sets: '3x15-20', rir: '1', rest: '60s', instructions: 'Rodillas flex. desactivan gastrocnemio. Aisla soleo. Rango completo.' },
      { id: 'eva_ul_c_5', name: 'Abductora inclinada', imageKey: 'incline_abduction', isStretch: false, rationale: 'Gluteo med. variacion inclinada -- volumen gluteo total 15-20 sets/semana', sets: '3x15-20', rir: '1', rest: '60s', instructions: 'Inclinada hacia adelante en maquina abductora. Mayor activacion gluteo med. Abre controlado.' },
    ],
  },
  {
    id: 'eva_ul_d',
    label: 'Upper B',
    subtitle: 'Volumen',
    muscles: 'Hombro - Espalda - Pecho - Biceps - Triceps',
    totalSets: 18,
    estimatedMinutes: [45, 55],
    category: 'upper',
    dayLetter: 'Viernes',
    exercises: [
      { id: 'eva_ul_d_0', name: 'Press militar sentada', imageKey: 'seated_db_press', isStretch: false, rationale: 'Deltoides principal -- Schoenfeld 2016', sets: '3x8-10', rir: '2', rest: '90s', instructions: 'Banco 90. Mancuernas a nivel orejas. Empuja vertical. Baja controlado.' },
      { id: 'eva_ul_d_1', name: 'Remo mancuerna 1 brazo', imageKey: 'one_arm_row', isStretch: false, rationale: 'Espalda unilateral -- ROM amplio', sets: '3x10-12', rir: '2', rest: '90s', instructions: 'Rodilla en banco, espalda plana. Tira a cadera, codo arriba. Baja buscando estiramiento.' },
      { id: 'eva_ul_d_2', name: 'Aperturas planas DB', imageKey: 'flat_db_fly', isStretch: true, rationale: 'Pectoral estiramiento -- Maeo 2023', sets: '3x12-15', rir: '1', rest: '60s', instructions: 'Tumbada, codos ligeramente flex. Abre en arco buscando estiramiento. Contrae pecho al cerrar.' },
      { id: 'eva_ul_d_3', name: 'Pullover DB', imageKey: 'db_pullover', isStretch: true, rationale: 'Dorsal estiramiento -- Maeo 2023, stretch-mediated', sets: '3x12-15', rir: '1-2', rest: '90s', instructions: 'Cruzada en banco. DB con ambas manos sobre pecho. Baja atras en arco sintiendo estiramiento. Vuelve contrayendo dorsal.' },
      { id: 'eva_ul_d_4', name: 'Curl biceps inclinado', imageKey: 'incline_curl', isStretch: true, rationale: 'Biceps max. estiramiento -- Kobayashi 2024', sets: '3x12-15', rir: '1', rest: '60s', instructions: 'Banco 45-60, brazos colgando. Flexiona sin adelantar codos. Excentrica 3s.' },
      { id: 'eva_ul_d_5', name: 'Extension triceps overhead', imageKey: 'overhead_tri', isStretch: true, rationale: 'Cabeza larga triceps -- Maeo 2023', sets: '3x12-15', rir: '1', rest: '60s', instructions: 'Polea con cuerda, espaldas. Codos al frente, deja que peso estire triceps. Extiende hasta bloquear.' },
    ],
  },
]

// Eva — Map phase -> days
export const evaProgramDays: Record<string, Day[]> = {
  eva_phase_1: evaFullBody3x,
  eva_phase_2: evaFullBody3x,
  eva_phase_3: evaUpperLower4x,
  eva_phase_4: evaUpperLower4x,
  eva_phase_5: pplDays,
  eva_phase_6: pplDays,
}

// Map phase -> days
export const programDays: Record<string, Day[]> = {
  phase_6: pplDays,
  // For now, phases 1-5 will use phase_6 as placeholder
  // TODO: Add specific programs for each phase
  phase_1: pplDays,
  phase_2: pplDays,
  phase_3: pplDays,
  phase_4: pplDays,
  phase_5: pplDays,
}
