import { GameCard } from '../types/game';

export const CHANCE_CARDS: GameCard[] = [
  {
    id: 'ch_1',
    type: 'chance',
    title: {
      ku_sorani: 'ئاهەنگی مەزنی نەورۆز 🔥',
      ku_kurmanji: 'Cežna Mezin a Newrozê 🔥',
      en: 'Grand Newroz Festival 🔥'
    },
    text: {
      ku_sorani: 'لە ئاهەنگی نەورۆزی ئاکرێ بەشداریت کرد و خەڵاتی باشترین ئاگری نەورۆزت بەدەستهێنا. ٢٠٠ دینار پاداشت وەربگرە!',
      ku_kurmanji: 'Te di Newroza Akrê de beşdarî kir û xelata agirê herî mezin wergirt. 200 dînar xelat wergire!',
      en: 'You participated in the Akre Newroz festival and won the best torchbearer award. Collect 200 IQD!'
    },
    action: 'collect',
    amount: 200,
    icon: '🔥'
  },
  {
    id: 'ch_2',
    type: 'chance',
    title: {
      ku_sorani: 'بڕۆ بۆ قەڵای هەولێر 🏰',
      ku_kurmanji: 'Here Kela Hewlêrê 🏰',
      en: 'Advance to Erbil Citadel 🏰'
    },
    text: {
      ku_sorani: 'بڕۆ بۆ قەڵای دێرینی هەولێر. ئەگەر بەسەر دەستپێکدا تێپەڕیت، ٢٠٠ دینار وەربگرە.',
      ku_kurmanji: 'Bimeşe ber bi Kela Dêrîn a Hewlêrê ve. Ger di ser destpêkê re derbas bibî 200 dînar bistîne.',
      en: 'Advance to Erbil Ancient Citadel. If you pass GO, collect 200 IQD.'
    },
    action: 'move_to',
    targetPosition: 39,
    icon: '🏰'
  },
  {
    id: 'ch_3',
    type: 'chance',
    title: {
      ku_sorani: 'خێرایی زیاد لە شەقامی ١٢٠ مەتری 🚓',
      ku_kurmanji: 'Leza Zêde li Kolana 120 Metrî 🚓',
      en: 'Speeding on 120m Highway 🚓'
    },
    text: {
      ku_sorani: 'بە هۆی تیژڕۆیی لە شەقامی ١٢٠ مەتری، سزای ٥٠ دیناری هاتوچۆ بدە.',
      ku_kurmanji: 'Ji ber leza zêde ya tirimbêlê, 50 dînar cezayê trafîkê bide.',
      en: 'Speeding violation on 120m expressway. Pay a 50 IQD traffic fine.'
    },
    action: 'pay',
    amount: 50,
    icon: '🚓'
  },
  {
    id: 'ch_4',
    type: 'chance',
    title: {
      ku_sorani: 'فڕۆکەی گەشتیاری ✈️',
      ku_kurmanji: 'Balafira Geştyarî ✈️',
      en: 'Take Flight to Airport ✈️'
    },
    text: {
      ku_sorani: 'بڕۆ بۆ فڕۆکەخانەی نێودەوڵەتیی هەولێر. ئەگەر بەسەر دەستپێکدا تێپەڕیت، ٢٠٠ دینار وەربگرە.',
      ku_kurmanji: 'Bimeşe ber bi Balafirxaneya Hewlêrê. Ger di ser destpêkê re derbas bibî 200 dînar bistîne.',
      en: 'Advance to Erbil International Airport. If you pass GO, collect 200 IQD.'
    },
    action: 'move_to',
    targetPosition: 5,
    icon: '✈️'
  },
  {
    id: 'ch_5',
    type: 'chance',
    title: {
      ku_sorani: 'نوێکردنەوەی خانووەکان 🔨',
      ku_kurmanji: 'Nûkirina Xanîyan 🔨',
      en: 'Historic Kurdish House Renovation 🔨'
    },
    text: {
      ku_sorani: 'خانووە کەلەپوورییەکانت نۆژەن دەکەیتەوە: بۆ هەر خانووێک ٢٥ دینار و بۆ هەر ڤێلایەک ١٠٠ دینار بدە.',
      ku_kurmanji: 'Nûkirina xaniyên kevnar: Ji bo her xanîyekî 25 dînar û ji bo her vîllayekê 100 dînar bide.',
      en: 'Property maintenance for traditional architecture: Pay 25 IQD per house and 100 IQD per villa.'
    },
    action: 'pay_repairs',
    houseCost: 25,
    hotelCost: 100,
    icon: '🔨'
  },
  {
    id: 'ch_6',
    type: 'chance',
    title: {
      ku_sorani: 'پشووی دەربەند و چای ماچکۆ 🫖',
      ku_kurmanji: 'Bêhnvedan û Çaya Maciko 🫖',
      en: 'Tea Time at Machko 🫖'
    },
    text: {
      ku_sorani: 'لە چایخانەی دێرینی ماچکۆ لە بناری قەڵا چایت خواردەوە. ٣ هەنگاو بگەڕێوە دواوە بۆ چێژوەرگرتن لە مێژوو.',
      ku_kurmanji: 'Li Çayxaneya dîrokî ya Maciko çay vexwar. 3 gavan vegere paşve.',
      en: 'Enjoying Kurdish tea at Machko Cafe beneath the Citadel. Move back 3 steps.'
    },
    action: 'move_steps',
    steps: -3,
    icon: '🫖'
  },
  {
    id: 'ch_7',
    type: 'chance',
    title: {
      ku_sorani: 'دەستبەسەرکردن بە فەرمانی یاسا 🚨',
      ku_kurmanji: 'Biryara Girtinê 🚨',
      en: 'Go Directly to Jail 🚨'
    },
    text: {
      ku_sorani: 'ڕاستەوخۆ بڕۆ بۆ زیندان! بەسەر دەستپێکدا تێپەڕ مەبە و ٢٠٠ دینار وەرمەگرە.',
      ku_kurmanji: 'Rast rast here girtîgehê! Di ser destpêkê re derbas nebe û 200 dînar nestîne.',
      en: 'Go directly to Jail. Do not pass GO, do not collect 200 IQD.'
    },
    action: 'go_to_jail',
    icon: '🚨'
  },
  {
    id: 'ch_8',
    type: 'chance',
    title: {
      ku_sorani: 'کارتێکی ڕزگاربوون لە زیندان 🗝️',
      ku_kurmanji: 'Qerta Rizgarbûnê ji Zîndanê 🗝️',
      en: 'Get Out of Jail Free 🗝️'
    },
    text: {
      ku_sorani: 'لێخۆشبوونی فەرمی! ئەم کارتە بپارێزە تا ئەو کاتەی پێویستت پێیەتی یان بە یاریزانێکی تر بیفرۆشە.',
      ku_kurmanji: 'Ev qert te ji girtîgehê rizgar dike. Dikarî biparêzî an bifiroşî hevalan.',
      en: 'Official pardon! Keep this card until needed or trade it with another player.'
    },
    action: 'get_out_of_jail',
    icon: '🗝️'
  },
  {
    id: 'ch_9',
    type: 'chance',
    title: {
      ku_sorani: 'فستیڤاڵی هەڵپەڕکێی کوردی 💃',
      ku_kurmanji: 'Mîhrîcana Govenda Kurdî 💃',
      en: 'Kurdish Halparke Dance Winner 💃'
    },
    text: {
      ku_sorani: 'وەک سەرچۆپیگری فستیڤاڵی نەریتی، هەموو یاریزانێک ٥٠ دینارت وەک دیاری شایی پێشکەش دەکات!',
      ku_kurmanji: 'Wek serçopîkê govenda neteweyî, her lîstikvanek 50 dînar diyarî dide te!',
      en: 'As the lead dancer (Serchopi) of the folklore festival, collect 50 IQD from each player!'
    },
    action: 'collect_from_all',
    amount: 50,
    icon: '💃'
  },
  {
    id: 'ch_10',
    type: 'chance',
    title: {
      ku_sorani: 'بڕۆ بۆ دەستپێک 🚀',
      ku_kurmanji: 'Here Destpêkê 🚀',
      en: 'Advance to START 🚀'
    },
    text: {
      ku_sorani: 'بڕۆ بۆ خانەی دەستپێک و ٢٠٠ دینار پاداشت وەربگرە!',
      ku_kurmanji: 'Bimeşe bo Destpêkê û 200 dînar xelat wergire!',
      en: 'Advance to START and collect your 200 IQD pass bonus!'
    },
    action: 'move_to',
    targetPosition: 0,
    icon: '🚀'
  }
];
