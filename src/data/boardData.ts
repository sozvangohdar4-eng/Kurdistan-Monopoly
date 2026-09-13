import { BoardTile, PlayerToken, PropertyGroup } from '../types/game';

export const PLAYER_TOKENS: PlayerToken[] = [
  {
    id: 'lion',
    name: {
      ku_sorani: 'شێری زاگرۆس',
      ku_kurmanji: 'Şêrê Zagrosê',
      en: 'Zagros Lion'
    },
    emoji: '🦁',
    color: '#f59e0b',
    bgColor: 'bg-amber-500',
    borderCol: 'border-amber-400'
  },
  {
    id: 'eagle',
    name: {
      ku_sorani: 'هەڵۆی بەرزەفڕ',
      ku_kurmanji: 'Heloyê Berzefir',
      en: 'Golden Eagle'
    },
    emoji: '🦅',
    color: '#3b82f6',
    bgColor: 'bg-blue-500',
    borderCol: 'border-blue-400'
  },
  {
    id: 'samovar',
    name: {
      ku_sorani: 'سەماوەری چایخانە',
      ku_kurmanji: 'Semawerê Çayxanê',
      en: 'Kurdish Tea Samovar'
    },
    emoji: '🫖',
    color: '#10b981',
    bgColor: 'bg-emerald-500',
    borderCol: 'border-emerald-400'
  },
  {
    id: 'citadel',
    name: {
      ku_sorani: 'قەڵای دێرین',
      ku_kurmanji: 'Kela Dêrîn',
      en: 'Ancient Citadel'
    },
    emoji: '🏰',
    color: '#8b5cf6',
    bgColor: 'bg-purple-500',
    borderCol: 'border-purple-400'
  },
  {
    id: 'saz',
    name: {
      ku_sorani: 'سازی فۆلکلۆر',
      ku_kurmanji: 'Saza Folklorî',
      en: 'Kurdish Saz'
    },
    emoji: '🪕',
    color: '#ec4899',
    bgColor: 'bg-pink-500',
    borderCol: 'border-pink-400'
  },
  {
    id: 'klash',
    name: {
      ku_sorani: 'کڵاشی هەورامی',
      ku_kurmanji: 'Klaşa Hewramî',
      en: 'Hawrami Klash'
    },
    emoji: '🥾',
    color: '#06b6d4',
    bgColor: 'bg-cyan-500',
    borderCol: 'border-cyan-400'
  },
  {
    id: 'sun',
    name: {
      ku_sorani: 'خۆری ٢١ تیشک',
      ku_kurmanji: 'Roja 21 Tîrêjî',
      en: 'Newroz Sun'
    },
    emoji: '☀️',
    color: '#eab308',
    bgColor: 'bg-yellow-500',
    borderCol: 'border-yellow-400'
  }
];

export const BOARD_TILES: BoardTile[] = [
  {
    id: 0,
    name: {
      ku_sorani: 'دەستپێک (بڕۆ)',
      ku_kurmanji: 'Destpêk (Here)',
      en: 'START (GO)'
    },
    type: 'start',
    description: {
      ku_sorani: 'هەموو جارێک بەسەریدا تێپەڕیت یان لێی نیشتیتەوە ٢٠٠ دیناری پاداشت وەردەگریت!',
      ku_kurmanji: 'Her cara tu lê derbas bibî 200 dînar xelat werdigirî!',
      en: 'Collect 200 IQD salary whenever you pass or land here!'
    },
    icon: '🚀'
  },
  {
    id: 1,
    name: {
      ku_sorani: 'خەبات و کەڵەک',
      ku_kurmanji: 'Xebat û Kelek',
      en: 'Khabat & Kalak'
    },
    city: {
      ku_sorani: 'هەولێر',
      ku_kurmanji: 'Hewlêr',
      en: 'Erbil'
    },
    type: 'property',
    group: 'brown',
    price: 60,
    rent: [2, 10, 30, 90, 160, 250],
    houseCost: 50,
    mortgageValue: 30,
    description: {
      ku_sorani: 'شارۆچکەیەکی مێژوویی سەر ڕێگای سەرەکی و ڕووباری زێی گەورە.',
      ku_kurmanji: 'Bajarokekî dîrokî li ser Çemê Zêyê Mezin.',
      en: 'Historic town situated alongside the Great Zab river.'
    }
  },
  {
    id: 2,
    name: {
      ku_sorani: 'خەزێنەی گشتی',
      ku_kurmanji: 'Xezîneya Giştî',
      en: 'Community Chest'
    },
    type: 'chest',
    description: {
      ku_sorani: 'کارتێکی خەزێنەی نیشتمانی هەڵبگرە و بەختی خۆت تاقی بکەرەوە!',
      ku_kurmanji: 'Qertekî ji Xezîneya Giştî bikişîne!',
      en: 'Draw a Community Chest card to receive rewards or tasks!'
    },
    icon: '📦'
  },
  {
    id: 3,
    name: {
      ku_sorani: 'کەرکووک - بازاڕی قەیسەری',
      ku_kurmanji: 'Kerkûk - Bazara Qeyserî',
      en: 'Kirkuk - Grand Bazaar'
    },
    city: {
      ku_sorani: 'کەرکووک',
      ku_kurmanji: 'Kerkûk',
      en: 'Kirkuk'
    },
    type: 'property',
    group: 'brown',
    price: 60,
    rent: [4, 20, 60, 180, 320, 450],
    houseCost: 50,
    mortgageValue: 30,
    description: {
      ku_sorani: 'بازاڕی قەیسەریی دێرینی کەرکووک پڕ لە زێڕ و کەلەپووری کوردی.',
      ku_kurmanji: 'Bazara dîrokî ya Kerkûkê tijî zêr û çand.',
      en: 'Historic covered bazaar in Kirkuk renowned for gold and crafts.'
    }
  },
  {
    id: 4,
    name: {
      ku_sorani: 'باجی داهات',
      ku_kurmanji: 'Baca Dahatê',
      en: 'Income Tax'
    },
    type: 'tax',
    taxAmount: 200,
    description: {
      ku_sorani: 'باجی گەشەپێدانی شارەوانی بدە: ٢٠٠ دینار دەچێتە خەزێنەی گشتی.',
      ku_kurmanji: 'Baca dahatê: 200 dînar bidin xezîneyê.',
      en: 'Municipal development tax: pay 200 IQD.'
    },
    icon: '💸'
  },
  {
    id: 5,
    name: {
      ku_sorani: 'فڕۆکەخانەی هەولێر (EIA)',
      ku_kurmanji: 'Balafirxaneya Hewlêrê',
      en: 'Erbil Int Airport'
    },
    city: {
      ku_sorani: 'هەولێر',
      ku_kurmanji: 'Hewlêr',
      en: 'Erbil'
    },
    type: 'railroad',
    group: 'transport',
    price: 200,
    rent: [25, 50, 100, 200],
    mortgageValue: 100,
    description: {
      ku_sorani: 'دەروازەی ئاسمانی نێودەوڵەتیی پایتەختی هەرێمی کوردستان بە یەکێک لە درێژترین باندەکانی فڕین لە جیهاندا.',
      ku_kurmanji: 'Dergehê asmanî yê Hewlêrê bi firehtirîn pîstên firînê.',
      en: 'One of the longest runways in the world connecting Kurdistan to the globe.'
    },
    icon: '✈️'
  },
  {
    id: 6,
    name: {
      ku_sorani: 'زاخۆ - پردی دەلال',
      ku_kurmanji: 'Zaxo - Pira Delal',
      en: 'Zakho - Delal Bridge'
    },
    city: {
      ku_sorani: 'زاخۆ',
      ku_kurmanji: 'Zaxo',
      en: 'Zakho'
    },
    type: 'property',
    group: 'light_blue',
    price: 100,
    rent: [6, 30, 90, 270, 400, 550],
    houseCost: 50,
    mortgageValue: 50,
    description: {
      ku_sorani: 'پردە بەردینە دێرین و شکۆدارەکەی سەر ڕووباری خابوور.',
      ku_kurmanji: 'Pira kevirî ya kevnar li ser Çemê Xabûrê.',
      en: 'Ancient Roman-era stone bridge over the Khabur River.'
    }
  },
  {
    id: 7,
    name: {
      ku_sorani: 'بەختی خۆت',
      ku_kurmanji: 'Bextê Te',
      en: 'Chance'
    },
    type: 'chance',
    description: {
      ku_sorani: 'کارتێکی بەختی خۆت هەڵبگرە و چارەنووست تاقی بکەرەوە!',
      ku_kurmanji: 'Qertekî bextê bikêşe!',
      en: 'Draw a Chance card to discover unexpected Kurdish events!'
    },
    icon: '❓'
  },
  {
    id: 8,
    name: {
      ku_sorani: 'ئامێدی - قەڵای سەربەرز',
      ku_kurmanji: 'Amêdî - Kela Bilind',
      en: 'Amedi Fortress'
    },
    city: {
      ku_sorani: 'دهۆک',
      ku_kurmanji: 'Duhok',
      en: 'Duhok'
    },
    type: 'property',
    group: 'light_blue',
    price: 100,
    rent: [6, 30, 90, 270, 400, 550],
    houseCost: 50,
    mortgageValue: 50,
    image: '/images/amedi_fortress.jpg',
    description: {
      ku_sorani: 'شاری سەر لووتکەی شاخ لەسەر بەرزایی ١٤٠٠ مەتر کە بە دەروازەی زەبەلاح و مێژووی پاشایەتی بەهدینان ناسراوە.',
      ku_kurmanji: 'Bajarê li ser tûtka çiyê û paytexta mîrektiya Badînan.',
      en: 'Iconic ancient mountaintop fortress town perched atop a high plateau.'
    }
  },
  {
    id: 9,
    name: {
      ku_sorani: 'دهۆک - گەلیی شێرانە',
      ku_kurmanji: 'Duhok - Geliyê Şêranê',
      en: 'Duhok - Geli Sherana'
    },
    city: {
      ku_sorani: 'دهۆک',
      ku_kurmanji: 'Duhok',
      en: 'Duhok'
    },
    type: 'property',
    group: 'light_blue',
    price: 120,
    rent: [8, 40, 100, 300, 450, 600],
    houseCost: 50,
    mortgageValue: 60,
    description: {
      ku_sorani: 'سەیرانگایەکی جوان بە ئاوی شینی فیرۆزەیی و سروشتی دڵڕفێنی بادینان.',
      ku_kurmanji: 'Cihê geştûguzarê bi ava şîn û newalên bedew ên Badînanê.',
      en: 'Famous turquoise mountain gorge and picnic resort in Duhok.'
    }
  },
  {
    id: 10,
    name: {
      ku_sorani: 'زیندان / سەردانکەر',
      ku_kurmanji: 'Zîndan / Serdan',
      en: 'Jail / Just Visiting'
    },
    type: 'jail',
    description: {
      ku_sorani: 'تەنها سەردانی هاوڕێیەکت دەکەیت یان دەستبەسەریت!',
      ku_kurmanji: 'Tenê serdan an girtîgeh.',
      en: 'Just visiting friends or locked up by the police!'
    },
    icon: '🔒'
  },
  {
    id: 11,
    name: {
      ku_sorani: 'کۆیە - قەڵای قەشڵە',
      ku_kurmanji: 'Koye - Kela Qeşle',
      en: 'Koya - Qashla Fort'
    },
    city: {
      ku_sorani: 'کۆیە',
      ku_kurmanji: 'Koye',
      en: 'Koya'
    },
    type: 'property',
    group: 'pink',
    price: 140,
    rent: [10, 50, 150, 450, 625, 750],
    houseCost: 100,
    mortgageValue: 70,
    description: {
      ku_sorani: 'شارە دێرینەکەی مەلای گەورە و قەڵای بەناوبانگی قەشڵە.',
      ku_kurmanji: 'Bajarê huner, helbest û kela dîrokî ya Qeşleyê.',
      en: 'Historic intellectual capital with the majestic Ottoman Qashla fort.'
    }
  },
  {
    id: 12,
    name: {
      ku_sorani: 'وێستگەی کارەبای کۆرمۆر',
      ku_kurmanji: 'Stasyona Karebaya Kormorê',
      en: 'Kormor Power Grid'
    },
    city: {
      ku_sorani: 'کوردستان',
      ku_kurmanji: 'Kurdistan',
      en: 'Kurdistan'
    },
    type: 'utility',
    group: 'utility',
    price: 150,
    rent: [4, 10], // Rent multiplier based on dice
    mortgageValue: 75,
    description: {
      ku_sorani: 'سەرچاوەی سەرەکیی گازی سروشتی و کارەبای کوردستان. باج بەپێی ژمارەی زار دیاری دەکرێت.',
      ku_kurmanji: 'Çavkaniya gaza xwezayî û karebaya Kurdistanê.',
      en: 'Vital energy power plant supplying natural gas and power across Kurdistan.'
    },
    icon: '⚡'
  },
  {
    id: 13,
    name: {
      ku_sorani: 'ڕواندز - گەلیی عەلی بەگ',
      ku_kurmanji: 'Rawanduz - Geliyê Elî Beg',
      en: 'Rawanduz - Gali Ali Bag'
    },
    city: {
      ku_sorani: 'ڕواندز',
      ku_kurmanji: 'Rawanduz',
      en: 'Rawanduz'
    },
    type: 'property',
    group: 'pink',
    price: 140,
    rent: [10, 50, 150, 450, 625, 750],
    houseCost: 100,
    mortgageValue: 70,
    description: {
      ku_sorani: 'گەورەترین و بەناوبانگترین تاڤگەی کوردستان لە نێوان چیا بەرزەکانی کۆڕەک و برادۆست.',
      ku_kurmanji: 'Şelala herî navdar a Kurdistanê li navbera çiyayên bilind.',
      en: 'Breathtaking canyon and iconic waterfall depicted on the 5000 IQD banknote.'
    }
  },
  {
    id: 14,
    name: {
      ku_sorani: 'شەقڵاوە - چیاکانی سەفین',
      ku_kurmanji: 'Şeqlawe - Çiyayê Sefîn',
      en: 'Shaqlawa - Safeen Resort'
    },
    city: {
      ku_sorani: 'شەقڵاوە',
      ku_kurmanji: 'Şeqlawe',
      en: 'Shaqlawa'
    },
    type: 'property',
    group: 'pink',
    price: 160,
    rent: [12, 60, 180, 500, 700, 900],
    houseCost: 100,
    mortgageValue: 80,
    description: {
      ku_sorani: 'بووکی هاوینەهەوارەکانی کوردستان لە بناری شاخی سەفین بە گوێز و باخچە سەوزەکانی.',
      ku_kurmanji: 'Bûka havîngehên Kurdistanê li quntara Çiyayê Sefînê.',
      en: 'Famous mountain resort town known for sweets, walnuts, and cool breezes.'
    }
  },
  {
    id: 15,
    name: {
      ku_sorani: 'فڕۆکەخانەی سلێمانی (ISU)',
      ku_kurmanji: 'Balafirxaneya Silêmaniyê',
      en: 'Sulaymaniyah Int Airport'
    },
    city: {
      ku_sorani: 'سلێمانی',
      ku_kurmanji: 'Silêmanî',
      en: 'Sulaymaniyah'
    },
    type: 'railroad',
    group: 'transport',
    price: 200,
    rent: [25, 50, 100, 200],
    mortgageValue: 100,
    description: {
      ku_sorani: 'فڕۆکەخانەی نێودەوڵەتی لە پایتەختی ڕۆشنبیریی کوردستان.',
      ku_kurmanji: 'Balafirxaneya nûjen a paytexta rewşenbîrî ya Kurdistanê.',
      en: 'Sulaymaniyah International Airport connecting cultural travelers.'
    },
    icon: '✈️'
  },
  {
    id: 16,
    name: {
      ku_sorani: 'هەڵەبجە - ئەحمەدئاوا',
      ku_kurmanji: 'Helebce - Ehmedawa',
      en: 'Halabja - Ahmad Awa'
    },
    city: {
      ku_sorani: 'هەڵەبجە',
      ku_kurmanji: 'Helebce',
      en: 'Halabja'
    },
    type: 'property',
    group: 'orange',
    price: 180,
    rent: [14, 70, 200, 550, 750, 950],
    houseCost: 100,
    mortgageValue: 90,
    description: {
      ku_sorani: 'هەڵەبجەی شەهید و تاڤگەی جوان و باخە هەنارە بەتامەکانی.',
      ku_kurmanji: 'Bajarê Helebceyê bi şelala Ehmedawa û baxçeyên hinarên şêrîn.',
      en: 'Historic province famous for lush orchards, pomegranates, and roaring cascades.'
    }
  },
  {
    id: 17,
    name: {
      ku_sorani: 'خەزێنەی گشتی',
      ku_kurmanji: 'Xezîneya Giştî',
      en: 'Community Chest'
    },
    type: 'chest',
    description: {
      ku_sorani: 'کارتێکی خەزێنەی نیشتمانی هەڵبگرە!',
      ku_kurmanji: 'Qertekî ji Xezîneya Giştî bikişîne!',
      en: 'Draw a Community Chest card!'
    },
    icon: '📦'
  },
  {
    id: 18,
    name: {
      ku_sorani: 'تەوێڵە و بیارە - هەورامان',
      ku_kurmanji: 'Tewêla û Biyare - Hewraman',
      en: 'Tawela & Byara - Hawraman'
    },
    city: {
      ku_sorani: 'هەورامان',
      ku_kurmanji: 'Hewraman',
      en: 'Hawraman'
    },
    type: 'property',
    group: 'orange',
    price: 180,
    rent: [14, 70, 200, 550, 750, 950],
    houseCost: 100,
    mortgageValue: 90,
    description: {
      ku_sorani: 'کەلەپووری جیهانیی یونسکۆ، خانووی قادرمەیی، کڵاش و دارگوێزی دێرین.',
      ku_kurmanji: 'Mîrateya cîhanî ya UNESCO bi xaniyên kevirî û daran.',
      en: 'UNESCO World Heritage terraced stone villages and cultural cradle.'
    }
  },
  {
    id: 19,
    name: {
      ku_sorani: 'دەشتی شارەزوور',
      ku_kurmanji: 'Deşta Şarezûrê',
      en: 'Sharazoor Plains'
    },
    city: {
      ku_sorani: 'شارەزوور',
      ku_kurmanji: 'Şarezûr',
      en: 'Sharazur'
    },
    type: 'property',
    group: 'orange',
    price: 200,
    rent: [16, 80, 220, 600, 800, 1000],
    houseCost: 100,
    mortgageValue: 100,
    description: {
      ku_sorani: 'پیتۆڵترین و سەوزترین دەشتی کشتوکاڵی کوردستان و شوێنی مێژووی دێرین.',
      ku_kurmanji: 'Deşta herî berhemdar û kesk a Kurdistanê.',
      en: 'Fertile historic valley known as the breadbasket of the Zagros region.'
    }
  },
  {
    id: 20,
    name: {
      ku_sorani: 'سەیرانی بەهارە (پشوو)',
      ku_kurmanji: 'Seyrana Biharê (Bêhnvedan)',
      en: 'Spring Seyran (Picnic)'
    },
    type: 'seyran',
    description: {
      ku_sorani: 'سەیرانی نەورۆز لە ناو گوڵە نێرگز و چای سەماوەر! پاشەکەوتی باجەکان ببەرەوە!',
      ku_kurmanji: 'Seyran û şahiya Newrozê di nav kulîlkan de! Xelata mezin qezenc bike!',
      en: 'Kurdish Spring Picnic (Seyran)! Collect the jackpot pool and spin for tea rewards!'
    },
    icon: '🌸'
  },
  {
    id: 21,
    name: {
      ku_sorani: 'ڕانیە - دەربەندی ڕانیە',
      ku_kurmanji: 'Ranya - Derbendê Ranyayê',
      en: 'Ranya - Gate of Uprising'
    },
    city: {
      ku_sorani: 'ڕانیە',
      ku_kurmanji: 'Ranya',
      en: 'Ranya'
    },
    type: 'property',
    group: 'red',
    price: 220,
    rent: [18, 90, 250, 700, 875, 1050],
    houseCost: 150,
    mortgageValue: 110,
    description: {
      ku_sorani: 'دەروازەی ڕاپەڕینە شکۆدارەکەی ساڵی ١٩٩١ و دەربەندی دڵڕفێن.',
      ku_kurmanji: 'Dergehê Serhildana sala 1991ê û cihekî geştyarî.',
      en: 'Cradle of the 1991 Kurdish Uprising and scenic Darband gorge.'
    }
  },
  {
    id: 22,
    name: {
      ku_sorani: 'بەختی خۆت',
      ku_kurmanji: 'Bextê Te',
      en: 'Chance'
    },
    type: 'chance',
    description: {
      ku_sorani: 'کارتێکی بەختی خۆت هەڵبگرە!',
      ku_kurmanji: 'Qertekî bextê bikêşe!',
      en: 'Draw a Chance card!'
    },
    icon: '❓'
  },
  {
    id: 23,
    name: {
      ku_sorani: 'قەڵادزێ - دۆڵی پشدەر',
      ku_kurmanji: 'Qeladizê - Geliyê Pişderê',
      en: 'Qaladze - Pshdar Valley'
    },
    city: {
      ku_sorani: 'قەڵادزێ',
      ku_kurmanji: 'Qeladizê',
      en: 'Qaladze'
    },
    type: 'property',
    group: 'red',
    price: 220,
    rent: [18, 90, 250, 700, 875, 1050],
    houseCost: 150,
    mortgageValue: 110,
    description: {
      ku_sorani: 'شاری خۆڕاگری و زانکۆی پشدەر بە باخچەی میوە و چیا سەرکەشەکان.',
      ku_kurmanji: 'Bajarê xweragiriya Pshderê û sirûşta çiyayî.',
      en: 'Resilient city surrounded by soaring mountains and fruit groves.'
    }
  },
  {
    id: 24,
    name: {
      ku_sorani: 'دووکان - بەنداو و هاوینەهەوار',
      ku_kurmanji: 'Dukan - Bendav û Havîngeh',
      en: 'Dokan - Lake & Resort'
    },
    city: {
      ku_sorani: 'دووکان',
      ku_kurmanji: 'Dukan',
      en: 'Dokan'
    },
    type: 'property',
    group: 'red',
    price: 240,
    rent: [20, 100, 300, 750, 925, 1100],
    houseCost: 150,
    mortgageValue: 120,
    description: {
      ku_sorani: 'دەریاچە گەورەکەی دووکان، یەختی گەشتیاری، ماسی بەتام و چێژبەخش.',
      ku_kurmanji: 'Gola mezin a Dukanê, keştî û xwarinên masiyan.',
      en: 'Spectacular mountain lake reservoir, boating hub, and recreational paradise.'
    }
  },
  {
    id: 25,
    name: {
      ku_sorani: 'تەلیفڕیکی گۆیژە و چاڤی لاند',
      ku_kurmanji: 'Teleferîka Goyjeyê',
      en: 'Goyzha Mountain Cable Car'
    },
    city: {
      ku_sorani: 'سلێمانی',
      ku_kurmanji: 'Silêmanî',
      en: 'Sulaymaniyah'
    },
    type: 'railroad',
    group: 'transport',
    price: 200,
    rent: [25, 50, 100, 200],
    mortgageValue: 100,
    description: {
      ku_sorani: 'تەلیفڕیکی بەرزاییەکانی چیای گۆیژە بە دیمەنی شەوانی سەرسوڕهێنەری شار.',
      ku_kurmanji: 'Teleferîka ber bi lûtkeya Goyjeyê bi dîtina hemû bajêr.',
      en: 'Scenic cable car gliding over Sulaymaniyah offering panoramic skyline views.'
    },
    icon: '🚡'
  },
  {
    id: 26,
    name: {
      ku_sorani: 'سلێمانی - سەرچنار',
      ku_kurmanji: 'Silêmanî - Serçinar',
      en: 'Sulaymaniyah - Sarchinar'
    },
    city: {
      ku_sorani: 'سلێمانی',
      ku_kurmanji: 'Silêmanî',
      en: 'Sulaymaniyah'
    },
    type: 'property',
    group: 'yellow',
    price: 260,
    rent: [22, 110, 330, 800, 975, 1150],
    houseCost: 150,
    mortgageValue: 130,
    description: {
      ku_sorani: 'سەرچاوەی ئاوی کانیاو و چنارە بەرزەکانی سلێمانی.',
      ku_kurmanji: 'Kaniyên şîrîn û daran li taxa dîrokî ya Serçinarê.',
      en: 'Famous urban oasis known for freshwater springs and towering plane trees.'
    }
  },
  {
    id: 27,
    name: {
      ku_sorani: 'سلێمانی - شەقامی سەهۆڵەکە',
      ku_kurmanji: 'Silêmanî - Kolana Sehôlekê',
      en: 'Sulaymaniyah - Saholaka'
    },
    city: {
      ku_sorani: 'سلێمانی',
      ku_kurmanji: 'Silêmanî',
      en: 'Sulaymaniyah'
    },
    type: 'property',
    group: 'yellow',
    price: 260,
    rent: [22, 110, 330, 800, 975, 1150],
    houseCost: 150,
    mortgageValue: 130,
    description: {
      ku_sorani: 'دڵی زیندووی شەوانی سلێمانی، چای قەزوان، خواردنی شەقام و قسەوباسی گەرم.',
      ku_kurmanji: 'Dilê şevên Silêmaniyê, çaya qezwanê û xwarinên kolanê.',
      en: 'The beating heart of Kurdish night life, wild pistachio tea, and vibrant cafes.'
    }
  },
  {
    id: 28,
    name: {
      ku_sorani: 'کۆمپانیای ئاوی کانی و زێی گەورە',
      ku_kurmanji: 'Av û Kanîyên Kurdistanê',
      en: 'Zab Clean Water Utility'
    },
    city: {
      ku_sorani: 'کوردستان',
      ku_kurmanji: 'Kurdistan',
      en: 'Kurdistan'
    },
    type: 'utility',
    group: 'utility',
    price: 150,
    rent: [4, 10],
    mortgageValue: 75,
    description: {
      ku_sorani: 'تۆڕی دابەشکردنی ئاوی سازگار و کانیاوەکانی کوردستان.',
      ku_kurmanji: 'Torên avên kaniyên sirûştî yên Kurdistanê.',
      en: 'Regional natural mountain spring water distribution network.'
    },
    icon: '💧'
  },
  {
    id: 29,
    name: {
      ku_sorani: 'سلێمانی - چیای گۆیژە',
      ku_kurmanji: 'Silêmanî - Çiyayê Goyje',
      en: 'Sulaymaniyah - Mount Goyzha'
    },
    city: {
      ku_sorani: 'سلێمانی',
      ku_kurmanji: 'Silêmanî',
      en: 'Sulaymaniyah'
    },
    type: 'property',
    group: 'yellow',
    price: 280,
    rent: [24, 120, 360, 850, 1025, 1200],
    houseCost: 150,
    mortgageValue: 140,
    image: '/images/sulaymaniyah_goyzha.jpg',
    description: {
      ku_sorani: 'لووتکەی شاعیران، باڵندەی چاڤی لاند و ڕووناکییەکانی شاری هەڵمەت و قوربانی.',
      ku_kurmanji: 'Lûtkeya helbestvanan li ser bajarê rewşenbîran.',
      en: 'Majestic mountain looking down upon the city of poets and cultural masters.'
    }
  },
  {
    id: 30,
    name: {
      ku_sorani: 'بڕۆ بۆ زیندان!',
      ku_kurmanji: 'Here Zîndanê!',
      en: 'Go to Jail!'
    },
    type: 'go_to_jail',
    description: {
      ku_sorani: 'بەپەلە دەستبەسەر دەکرێیت و دەچیتە ژووری زیندان بێ ئەوەی بەسەر دەستپێکدا تێپەڕیت!',
      ku_kurmanji: 'Rast rast here girtîgehê!',
      en: 'Go directly to jail without collecting your pass GO bonus!'
    },
    icon: '🚨'
  },
  {
    id: 31,
    name: {
      ku_sorani: 'هەولێر - پارکی سامی عەبدولڕەحمان',
      ku_kurmanji: 'Hewlêr - Parka Samî Abdulrehman',
      en: 'Erbil - Sami Abdulrahman Park'
    },
    city: {
      ku_sorani: 'هەولێر',
      ku_kurmanji: 'Hewlêr',
      en: 'Erbil'
    },
    type: 'property',
    group: 'green',
    price: 300,
    rent: [26, 130, 390, 900, 1100, 1275],
    houseCost: 200,
    mortgageValue: 150,
    description: {
      ku_sorani: 'گەورەترین پارکی سەوزایی لە ڕۆژهەڵاتی ناوەڕاست بە دەریاچە، پیشانگای کتێب و وەرزش.',
      ku_kurmanji: 'Parka herî mezin a kesk bi gol û pêşangehên pirtûkan.',
      en: 'One of the largest green urban parks in the Middle East with lakes and gardens.'
    }
  },
  {
    id: 32,
    name: {
      ku_sorani: 'هەولێر - بازاڕی قەیسەری و نیشتمان',
      ku_kurmanji: 'Hewlêr - Bazara Qeyserî',
      en: 'Erbil - Qaysari Grand Souq'
    },
    city: {
      ku_sorani: 'هەولێر',
      ku_kurmanji: 'Hewlêr',
      en: 'Erbil'
    },
    type: 'property',
    group: 'green',
    price: 300,
    rent: [26, 130, 390, 900, 1100, 1275],
    houseCost: 200,
    mortgageValue: 150,
    description: {
      ku_sorani: 'بازاڕی سەر داڵانە مێژووییەکانی پایتەخت، زێڕینگەری، قوماشی کوردی و چایخانەی ماچکۆ.',
      ku_kurmanji: 'Bazara dîrokî ya qisûran bi qumaş û çayxaneya Maciko.',
      en: 'Labyrinthine historical market bustling with spice traders and the famous Machko tea house.'
    }
  },
  {
    id: 33,
    name: {
      ku_sorani: 'خەزێنەی گشتی',
      ku_kurmanji: 'Xezîneya Giştî',
      en: 'Community Chest'
    },
    type: 'chest',
    description: {
      ku_sorani: 'کارتێکی خەزێنەی نیشتمانی هەڵبگرە!',
      ku_kurmanji: 'Qertekî ji Xezîneya Giştî bikişîne!',
      en: 'Draw a Community Chest card!'
    },
    icon: '📦'
  },
  {
    id: 34,
    name: {
      ku_sorani: 'هەولێر - گوندە ئینگلیزی و باڵەخانەکانی ١٠٠ مەتری',
      ku_kurmanji: 'Hewlêr - Kolana 100 Metrî',
      en: 'Erbil - 100m Commercial Plaza'
    },
    city: {
      ku_sorani: 'هەولێر',
      ku_kurmanji: 'Hewlêr',
      en: 'Erbil'
    },
    type: 'property',
    group: 'green',
    price: 320,
    rent: [28, 150, 450, 1000, 1200, 1400],
    houseCost: 200,
    mortgageValue: 160,
    description: {
      ku_sorani: 'ناوەندی بازرگانی مۆدێرن، مۆڵە پێشکەوتووەکان و کۆشکە بەرزەکانی هەولێری نوێ.',
      ku_kurmanji: 'Navenda nûjen a bazirganî û bircên bilind ên Hewlêrê.',
      en: 'Modern commercial hub, luxury towers, and prime financial developments.'
    }
  },
  {
    id: 35,
    name: {
      ku_sorani: 'هێڵی تەکسی و پاسی شارەکانی کوردستان',
      ku_kurmanji: 'Taksî û Otobusên Kurdistanê',
      en: 'Kurdistan Intercity Transit'
    },
    city: {
      ku_sorani: 'کوردستان',
      ku_kurmanji: 'Kurdistan',
      en: 'Kurdistan'
    },
    type: 'railroad',
    group: 'transport',
    price: 200,
    rent: [25, 50, 100, 200],
    mortgageValue: 100,
    description: {
      ku_sorani: 'تۆڕی گواستنەوەی نێوان شارەکانی هەولێر، سلێمانی، دهۆک، کەرکووک و هەڵەبجە.',
      ku_kurmanji: 'Torên veguhastina di navbera bajarên Kurdistanê de.',
      en: 'Intercity transport network connecting all Kurdish governorates.'
    },
    icon: '🚖'
  },
  {
    id: 36,
    name: {
      ku_sorani: 'بەختی خۆت',
      ku_kurmanji: 'Bextê Te',
      en: 'Chance'
    },
    type: 'chance',
    description: {
      ku_sorani: 'کارتێکی بەختی خۆت هەڵبگرە!',
      ku_kurmanji: 'Qertekî bextê bikêşe!',
      en: 'Draw a Chance card!'
    },
    icon: '❓'
  },
  {
    id: 37,
    name: {
      ku_sorani: 'دیاربەکر (ئامەد) - پردی دەردەری',
      ku_kurmanji: 'Amed - Pira Dehderî',
      en: 'Diyarbakir (Amed) - Ten-Eyed Bridge'
    },
    city: {
      ku_sorani: 'ئامەد',
      ku_kurmanji: 'Amed',
      en: 'Amed'
    },
    type: 'property',
    group: 'dark_blue',
    price: 350,
    rent: [35, 175, 500, 1100, 1300, 1500],
    houseCost: 200,
    mortgageValue: 175,
    description: {
      ku_sorani: 'شاری شوورە دێرینە بازاڵتییەکان و پردە مێژووییەکەی سەر ڕووباری دیجلە.',
      ku_kurmanji: 'Sûrên dîrokî yên bazaltî û Pira Dehderî li ser Çemê Dîcleyê.',
      en: 'Ancient basalt walled city and iconic historic bridge spanning the Tigris river.'
    }
  },
  {
    id: 38,
    name: {
      ku_sorani: 'باجی زێڕ و شتومەکی دەوڵەمەندی',
      ku_kurmanji: 'Baca Zêr û Malên Giranbaha',
      en: 'Luxury Gold Tax'
    },
    type: 'tax',
    taxAmount: 100,
    description: {
      ku_sorani: 'باجی کڕینی زێڕ و ملوانکەی کوردی بدە: ١٠٠ دینار دەچێتە خەزێنەی گشتی.',
      ku_kurmanji: 'Baca zêrên kurdî: 100 dînar bidin xezîneyê.',
      en: 'Luxury gold and jewelry tax: pay 100 IQD.'
    },
    icon: '👑'
  },
  {
    id: 39,
    name: {
      ku_sorani: 'هەولێر - قەڵای دێرینی هەولێر',
      ku_kurmanji: 'Hewlêr - Kela Dêrîn a Hewlêrê',
      en: 'Erbil Ancient Citadel'
    },
    city: {
      ku_sorani: 'هەولێر',
      ku_kurmanji: 'Hewlêr',
      en: 'Erbil'
    },
    type: 'property',
    group: 'dark_blue',
    price: 400,
    rent: [50, 200, 600, 1400, 1700, 2000],
    houseCost: 200,
    mortgageValue: 200,
    image: '/images/erbil_citadel.jpg',
    description: {
      ku_sorani: 'کۆنترین شوێنی نیشتەجێبوونی بەردەوام لە مێژووی مرۆڤایەتیدا، تاجی سەر پایتەختی کوردستان!',
      ku_kurmanji: 'Kevintirîn cihê jiyanê yê berdewam di dîroka mirovahiyê de, taca Kurdistanê!',
      en: 'Oldest continuously inhabited fortress settlement in human history and the crown jewel of Kurdistan!'
    }
  }
];

export const GROUP_COLORS: Record<PropertyGroup, { bg: string; border: string; text: string; headerBg: string }> = {
  brown: {
    bg: 'bg-amber-900',
    border: 'border-amber-700',
    text: 'text-amber-200',
    headerBg: '#78350f'
  },
  light_blue: {
    bg: 'bg-sky-500',
    border: 'border-sky-400',
    text: 'text-sky-100',
    headerBg: '#0284c7'
  },
  pink: {
    bg: 'bg-pink-600',
    border: 'border-pink-400',
    text: 'text-pink-100',
    headerBg: '#db2777'
  },
  orange: {
    bg: 'bg-orange-500',
    border: 'border-orange-400',
    text: 'text-orange-100',
    headerBg: '#ea580c'
  },
  red: {
    bg: 'bg-red-600',
    border: 'border-red-400',
    text: 'text-red-100',
    headerBg: '#dc2626'
  },
  yellow: {
    bg: 'bg-amber-400',
    border: 'border-amber-300',
    text: 'text-slate-900',
    headerBg: '#eab308'
  },
  green: {
    bg: 'bg-emerald-600',
    border: 'border-emerald-400',
    text: 'text-emerald-100',
    headerBg: '#059669'
  },
  dark_blue: {
    bg: 'bg-indigo-700',
    border: 'border-indigo-400',
    text: 'text-indigo-100',
    headerBg: '#4338ca'
  },
  transport: {
    bg: 'bg-slate-700',
    border: 'border-slate-500',
    text: 'text-slate-200',
    headerBg: '#334155'
  },
  utility: {
    bg: 'bg-teal-700',
    border: 'border-teal-500',
    text: 'text-teal-200',
    headerBg: '#0f766e'
  }
};

export const GROUP_MEMBERS: Record<PropertyGroup, number[]> = {
  brown: [1, 3],
  light_blue: [6, 8, 9],
  pink: [11, 13, 14],
  orange: [16, 18, 19],
  red: [21, 23, 24],
  yellow: [26, 27, 29],
  green: [31, 32, 34],
  dark_blue: [37, 39],
  transport: [5, 15, 25, 35],
  utility: [12, 28]
};
