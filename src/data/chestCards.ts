import { GameCard } from '../types/game';

export const CHEST_CARDS: GameCard[] = [
  {
    id: 'chest_1',
    type: 'chest',
    title: {
      ku_sorani: 'هەناری هەڵەبجە و بەروبوومی پاییز 🍎',
      ku_kurmanji: 'Hinarên Helebceyê û Hilberîna Payîzê 🍎',
      en: 'Halabja Pomegranate Export Harvest 🍎'
    },
    text: {
      ku_sorani: 'بەروبوومی هەناری باخەکەت بە سەرکەوتوویی فرۆشرا. ١٠٠ دینار قازانج وەربگرە!',
      ku_kurmanji: 'Hinarên baxçeyê te bi buhayekî baş hatin firotin. 100 dînar qezenc bike!',
      en: 'Export of premium organic pomegranates was successful. Collect 100 IQD profit!'
    },
    action: 'collect',
    amount: 100,
    icon: '🍎'
  },
  {
    id: 'chest_2',
    type: 'chest',
    title: {
      ku_sorani: 'مێراتی فەرشی دەستچنی کوردی 🧶',
      ku_kurmanji: 'Mîrateya Xaliya Kurdî ya Destçêkirî 🧶',
      en: 'Inherited Kurdish Antique Rug 🧶'
    },
    text: {
      ku_sorani: 'فەرشێکی ئاوریشمی مێژوویی سنە و هەورامانت بە میرات بۆ مایەوە. ١٥٠ دینار لە مۆزەخانە وەربگرە!',
      ku_kurmanji: 'Xaliyekî hevrîşimî yê kevnar ket destê te. 150 dînar bistîne!',
      en: 'You inherited a handwoven antique silk Kurdish rug. Collect 150 IQD from the museum!'
    },
    action: 'collect',
    amount: 150,
    icon: '🧶'
  },
  {
    id: 'chest_3',
    type: 'chest',
    title: {
      ku_sorani: 'شیرینی و بەخشش بۆ شایی هاوڕێ 🎁',
      ku_kurmanji: 'Xelata Zewaca Dostan 🎁',
      en: 'Kurdish Wedding Gift 🎁'
    },
    text: {
      ku_sorani: 'بانگهێشتی شاییەکی گەورە کراویت، ٥٠ دینار بۆ شیرینی و دیاریی بووک و زاوا بدە.',
      ku_kurmanji: 'Banga daweta dozekî hate kirin, 50 dînar bo şîranî û diyarî bide.',
      en: 'Attending a grand Kurdish mountain wedding. Pay 50 IQD wedding gift.'
    },
    action: 'pay',
    amount: 50,
    icon: '🎁'
  },
  {
    id: 'chest_4',
    type: 'chest',
    title: {
      ku_sorani: 'پشکنینی پزیشکی و دەرمانی گیایی 🌿',
      ku_kurmanji: 'Dermanên Xwezayî û Dermankirin 🌿',
      en: 'Traditional Herb Wellness Check 🌿'
    },
    text: {
      ku_sorani: 'کرێی پشکنینی پزیشکی و کڕینی گیا بەهارییە بەسوودەکان: ٥٠ دینار بدە.',
      ku_kurmanji: 'Baca dermanên giyayî û bijîşkî: 50 dînar bide.',
      en: 'Wellness check and wild mountain herb remedies: Pay 50 IQD.'
    },
    action: 'pay',
    amount: 50,
    icon: '🌿'
  },
  {
    id: 'chest_5',
    type: 'chest',
    title: {
      ku_sorani: 'بەخشینی ڕۆژی لەدایکبوون 🎂',
      ku_kurmanji: 'Roja Jidayikbûnê 🎂',
      en: 'Birthday Shabash Celebration 🎂'
    },
    text: {
      ku_sorani: 'ڕۆژی لەدایکبوونتە! هەموو یاریزانێک ٢٠ دینار دیاریت پێشکەش دەکات.',
      ku_kurmanji: 'Roja te ya jidayikbûnê ye! Her lîstikvanek 20 dînar diyarî dide te.',
      en: 'It is your birthday! Collect 20 IQD gift from every player.'
    },
    action: 'collect_from_all',
    amount: 20,
    icon: '🎂'
  },
  {
    id: 'chest_6',
    type: 'chest',
    title: {
      ku_sorani: 'پاداشتی دەستپێک 🚀',
      ku_kurmanji: 'Xelata Destpêkê 🚀',
      en: 'Advance to START 🚀'
    },
    text: {
      ku_sorani: 'ڕاستەوخۆ بڕۆ بۆ دەستپێک و ٢٠٠ دینار وەربگرە!',
      ku_kurmanji: 'Rast here Destpêkê û 200 dînar bistîne!',
      en: 'Advance directly to START and collect 200 IQD!'
    },
    action: 'move_to',
    targetPosition: 0,
    icon: '🚀'
  },
  {
    id: 'chest_7',
    type: 'chest',
    title: {
      ku_sorani: 'پشکی کێڵگەی شیلات و ماسی دووکان 🐟',
      ku_kurmanji: 'Dahata Masîgiriyê li Dukanê 🐟',
      en: 'Lake Dokan Trout Farm Dividend 🐟'
    },
    text: {
      ku_sorani: 'قازانجی کێڵگەی بەخێوکردنی ماسی لە دەریاچەی دووکان: ٥٠ دینار وەربگرە.',
      ku_kurmanji: 'Qezenca masîgiriya Gola Dukanê: 50 dînar wergire.',
      en: 'Dividends from Lake Dokan fresh fish fisheries: Collect 50 IQD.'
    },
    action: 'collect',
    amount: 50,
    icon: '🐟'
  },
  {
    id: 'chest_8',
    type: 'chest',
    title: {
      ku_sorani: 'کارتێکی ڕزگاربوون لە زیندان 🗝️',
      ku_kurmanji: 'Qerta Rizgarbûnê ji Zîndanê 🗝️',
      en: 'Get Out of Jail Free 🗝️'
    },
    text: {
      ku_sorani: 'ڕزگاربوون لە زیندان بە دەستەبەری کەسایەتی ناودار! ئەم کارتە بپارێزە.',
      ku_kurmanji: 'Ev qert te ji girtîgehê rizgar dike. Biparêze bo hewcedariyê.',
      en: 'Release from jail on respected bail guarantee. Keep this card until needed.'
    },
    action: 'get_out_of_jail',
    icon: '🗝️'
  },
  {
    id: 'chest_9',
    type: 'chest',
    title: {
      ku_sorani: 'تێچووی نۆژەنکردنەوەی ژێرخان 🏗️',
      ku_kurmanji: 'Nûkirina Binesaziyê 🏗️',
      en: 'Street Assessment Repairs 🏗️'
    },
    text: {
      ku_sorani: 'پەرەپێدانی شەقامەکان: ٤٠ دینار بۆ هەر خانووێک و ١١٥ دینار بۆ هەر ڤێلایەک بدە.',
      ku_kurmanji: 'Guhertina cadeyan: Ji bo her xanîyekî 40 dînar û ji bo her vîllayekê 115 dînar bide.',
      en: 'You are assessed for street repairs: Pay 40 IQD per house and 115 IQD per hotel/villa.'
    },
    action: 'pay_repairs',
    houseCost: 40,
    hotelCost: 115,
    icon: '🏗️'
  },
  {
    id: 'chest_10',
    type: 'chest',
    title: {
      ku_sorani: 'دەستبەسەرکردن بە فەرمانی ئاسایش 🚨',
      ku_kurmanji: 'Destbiserkirina Ewlehiyê 🚨',
      en: 'Security Detention - Go to Jail 🚨'
    },
    text: {
      ku_sorani: 'ڕاستەوخۆ بڕۆ بۆ زیندان! تێپەڕ مەبە بەسەر دەستپێکدا و ٢٠٠ دینار وەرناگریت.',
      ku_kurmanji: 'Rast rast here girtîgehê! Destpêkê derbas neke.',
      en: 'Go directly to Jail! Do not pass GO, do not collect 200 IQD.'
    },
    action: 'go_to_jail',
    icon: '🚨'
  }
];
