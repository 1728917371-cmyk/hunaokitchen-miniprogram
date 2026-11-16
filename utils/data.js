const QUESTIONS = [
  {
    id: 1,
    part: "食材抉择篇",
    dimension: "食材相性",
    leftKey: "C",
    rightKey: "A",
    title: "深夜打开冰箱，发现只剩一盒香草冰淇淋和半罐老干妈，此时你的第一反应是：",
    options: [
      {
        key: "C",
        text: "算了，冰淇淋当甜品直接啃，老干妈留着明天拌面，甜咸不能乱套。"
      },
      {
        key: "A",
        text: "挖一勺冰淇淋，浇上一勺红油老干妈——听说这叫“冰与火之歌”，尝一口！"
      }
    ]
  },
  {
    id: 2,
    part: "食材抉择篇",
    dimension: "食材相性",
    leftKey: "C",
    rightKey: "A",
    title: "朋友送了你一盒昂贵的新鲜车厘子，你打算怎么吃？",
    options: [
      {
        key: "C",
        text: "仔细洗干净，装在果盘里一颗颗优雅地吃，原汁原味才是对水果的尊重。"
      },
      {
        key: "A",
        text: "拿去红烧排骨、裹上面糊油炸，或者扔进螺蛳粉里看看能不能解辣。"
      }
    ]
  },
  {
    id: 3,
    part: "食材抉择篇",
    dimension: "食材相性",
    leftKey: "C",
    rightKey: "A",
    title: "如果你受邀发明一款颠覆市场的“新风味薯片”，你的主打口味会是：",
    options: [
      {
        key: "C",
        text: "经典黑松露海盐味、法式焦糖洋葱味（逻辑自洽，闭眼买不出错）。"
      },
      {
        key: "A",
        text: "香菜折耳根冰美式味、皮蛋可乐爆浆味（哪怕被骂难吃，也要震撼人类）。"
      }
    ]
  },
  {
    id: 4,
    part: "食材抉择篇",
    dimension: "食材相性",
    leftKey: "C",
    rightKey: "A",
    title: "逛超市时，你最喜欢在哪个区域流连？",
    options: [
      {
        key: "C",
        text: "老实待在生鲜区挑当季蔬菜，专挑长相周正的，买回去清炒最安心。"
      },
      {
        key: "A",
        text: "直奔零食区和“黑暗料理”角落，把榴莲、辣条、芝士片全塞进购物车，准备回家组一个谁都没吃过的战队。"
      }
    ]
  },
  {
    id: 5,
    part: "烹饪工序篇",
    dimension: "制作工序",
    leftKey: "P",
    rightKey: "M",
    title: "食谱上写着“加入生抽 15ml、食盐 3g、中小火慢炖 8 分钟”，你会：",
    options: [
      {
        key: "P",
        text: "掏出电子秤、量勺和计时器，差一克或少一秒都觉得背叛了食谱。"
      },
      {
        key: "M",
        text: "凭感觉吨吨吨倒一点，手抖撒一撮盐，“差不多就得了，火候全靠天意”。"
      }
    ]
  },
  {
    id: 6,
    part: "烹饪工序篇",
    dimension: "制作工序",
    leftKey: "P",
    rightKey: "M",
    title: "在你的理想世界里，最完美的做饭工具是：",
    options: [
      {
        key: "P",
        text: "专业的温控低温慢煮棒、多功能料理机，还有一把锋利的刺身三德刀。"
      },
      {
        key: "M",
        text: "微波炉、空气炸锅或电热水壶，最好万物皆可一键暴力“轰炸”。"
      }
    ]
  },
  {
    id: 7,
    part: "烹饪工序篇",
    dimension: "制作工序",
    leftKey: "P",
    rightKey: "M",
    title: "切土豆丝时，你案板上的切片状态通常是：",
    options: [
      {
        key: "P",
        text: "粗细均匀、笔直规整，宛如工厂流水线切出来的精密工业品。"
      },
      {
        key: "M",
        text: "有的像薯条，有的像土豆块，还有的直接削成了艺术派几何体。"
      }
    ]
  },
  {
    id: 8,
    part: "烹饪工序篇",
    dimension: "制作工序",
    leftKey: "P",
    rightKey: "M",
    title: "朋友发来一道“据说很好吃”的网红菜谱，但没写克数和时间，你会：",
    options: [
      {
        key: "P",
        text: "先去搜同款菜谱的详细参数，用秤称好每样料，再按标准流程慢慢试做。"
      },
      {
        key: "M",
        text: "看两眼就凭感觉开火，油多油少全看心情，翻车了再怪菜谱写得不清不楚。"
      }
    ]
  },
  {
    id: 9,
    part: "风味哲学篇",
    dimension: "风味倾向",
    leftKey: "H",
    rightKey: "E",
    title: "点外卖或者自己做菜选辣度时，你的真实心理是：",
    options: [
      {
        key: "H",
        text: "微辣是底线，更偏爱保留食材本味、清淡回甘，吃完肠胃舒坦。"
      },
      {
        key: "E",
        text: "只要不辣到灵魂出窍就不算吃过！加变态辣、双倍麻、再来两勺芥末！"
      }
    ]
  },
  {
    id: 10,
    part: "风味哲学篇",
    dimension: "风味倾向",
    leftKey: "H",
    rightKey: "E",
    title: "做完一锅排骨汤，你尝了一口发现味道非常清淡，你会：",
    options: [
      {
        key: "H",
        text: "觉得挺好，原汁原味很滋补，撒几粒白胡椒粉提提鲜就出锅。"
      },
      {
        key: "E",
        text: "无法忍受寡淡！立刻翻出抽屉里的胡椒粉、火锅底料、蚝油、香油疯狂往里怼。"
      }
    ]
  },
  {
    id: 11,
    part: "风味哲学篇",
    dimension: "风味倾向",
    leftKey: "H",
    rightKey: "E",
    title: "面对一块刚烤好的原味法棍面包，你的涂抹习惯是：",
    options: [
      {
        key: "H",
        text: "抹薄薄一层黄油，慢慢咀嚼小麦天然发酵的麦香与微甜。"
      },
      {
        key: "E",
        text: "裹上厚厚一层重油花生酱，再撒满厚厚的白砂糖和可可粉，甜到发齁才爽。"
      }
    ]
  },
  {
    id: 12,
    part: "风味哲学篇",
    dimension: "风味倾向",
    leftKey: "H",
    rightKey: "E",
    title: "吃火锅的时候，你的蘸料碟通常长什么样？",
    options: [
      {
        key: "H",
        text: "一小碟麻酱或酱油配蒜末香菜，点到为止，吃得舒坦不上火。"
      },
      {
        key: "E",
        text: "芝麻酱、腐乳、辣椒油、香油、蚝油、白砂糖全堆满，红油都漫到碟子外沿才罢休。"
      }
    ]
  },
  {
    id: 13,
    part: "动机与仪式篇",
    dimension: "动机诉求",
    leftKey: "S",
    rightKey: "I",
    title: "一个人在家做饭吃，煮好了一锅挂面，你通常会：",
    options: [
      {
        key: "S",
        text: "直接把锅端到电脑前，就着锅子直接吃，少洗一个碗等于多活十年。"
      },
      {
        key: "I",
        text: "特意找个漂亮的日式大瓷碗盛出来，撒点葱花，甚至开一盏氛围小台灯拍照。"
      }
    ]
  },
  {
    id: 14,
    part: "动机与仪式篇",
    dimension: "动机诉求",
    leftKey: "S",
    rightKey: "I",
    title: "你给自己的拿手料理起名字时，风格通常更接近：",
    options: [
      {
        key: "S",
        text: "朴实无华：“剩菜乱炖”、“挂面打个蛋”、“糊弄对付餐”。"
      },
      {
        key: "I",
        text: "充满中二感或诗意：“深夜孤勇者量子碳水”、“熔岩火星黑椒意面”。"
      }
    ]
  },
  {
    id: 15,
    part: "动机与仪式篇",
    dimension: "动机诉求",
    leftKey: "S",
    rightKey: "I",
    title: "假设做饭的过程被录下来，你的视频最适合被剪辑成哪种类型：",
    options: [
      {
        key: "S",
        text: "《独居人类打工人生存实录：5分钟填饱肚子防饿死指南》。"
      },
      {
        key: "I",
        text: "《治愈系/发疯系沉浸式厨房Vlog：充满浪漫滤镜与仪式感的生活美学》。"
      }
    ]
  },
  {
    id: 16,
    part: "动机与仪式篇",
    dimension: "动机诉求",
    leftKey: "S",
    rightKey: "I",
    title: "周末难得有空，你更愿意为吃饭做点什么？",
    options: [
      {
        key: "S",
        text: "点一份外卖或煮一锅速冻饺子，腾出时间躺平刷手机，吃饭只是补充能量。"
      },
      {
        key: "I",
        text: "花两小时慢炖一锅高汤、烤一炉面包，再把餐桌布置成仪式感满满的一餐，拍照记录。"
      }
    ]
  }
]

const RESULTS = {
  AMES: {
    code: "AMES",
    image: "/assets/results/AMES.png",
    kitchen: "/assets/kitchen/bg01.jpg",
    name: "混沌深渊生存狂",
    enName: "The Abyss Scavenger",
    animal: "扛着干粉灭火器狂奔、满脸黑灰的浣熊厨师🦝",
    recipe: "老干妈拌香草冰淇淋配微波炉压碎吐司",
    comment: "只要味蕾没麻木，厨房就不会灭亡。你的字典里没有“火候”，只有微波炉倒计时的叮一声——能活着吃上饭，就是给这顿饭最大的尊重。",
    tags: ["灭火器VIP", "生命体征维持餐", "能吃就行", "微波炉全能神"],
    partner: "CPES",
    counter: "CPHI"
  },
  AMEI: {
    code: "AMEI",
    image: "/assets/results/AMEI.png",
    kitchen: "/assets/kitchen/bg02.jpg",
    name: "赛博狂想艺术家",
    enName: "The Cyber-Glitch Alchemist",
    animal: "戴着防毒面具、手持喷火枪的暴躁章鱼🐙",
    recipe: "可乐煮辣条搭配自制荧光蓝色雪碧果冻",
    comment: "做饭不是为了饱腹，是为了向物理定律宣战！哪怕厨房快被炸飞，最后一口也要撒上彩色糖珠，端出满屏赛博朋克。",
    tags: ["生化实验", "朋友圈特供", "发光料理", "视觉系欺诈"],
    partner: "CPEI",
    counter: "CPHS"
  },
  AMHS: {
    code: "AMHS",
    image: "/assets/results/AMHS.png",
    kitchen: "/assets/kitchen/bg03.jpg",
    name: "糊弄学佛系居士",
    enName: "The Sloth Cook",
    animal: "戴着厨师帽、眼神空洞打瞌睡的树懒",
    recipe: "电热水壶煮麦片，顺便温热一个生鸡蛋和半根火腿肠",
    comment: "少洗一个碗，胜造七级浮屠。你的做饭逻辑是：能用一口锅解决的，绝不拿出筷子；能直接端锅吃的，绝不用碗。",
    tags: ["一锅流", "终极糊弄", "少洗一个碗是一万", "能咽就行"],
    partner: "CPHS",
    counter: "CPEI"
  },
  AMHI: {
    code: "AMHI",
    image: "/assets/results/AMHI.png",
    kitchen: "/assets/kitchen/bg04.jpg",
    name: "梦幻童话缝合怪",
    enName: "The Whimsical Dreamer",
    animal: "穿着蓬蓬裙围裙、耳朵上夹着草莓的粉红垂耳兔🐰",
    recipe: "西瓜切块淋温热纯牛奶，撒上磨碎的奥利奥饼干和薄荷叶",
    comment: "只要食材看起来可爱，放在一起就一定好吃！哪怕西瓜泡牛奶，在你心里也是爱丽丝的下午茶——甜不甜不重要，萌就够了。",
    tags: ["少女心泛滥", "可爱即正义", "食材乱炖但甜美", "治愈系暗黑"],
    partner: "CPHI",
    counter: "CPES"
  },
  APES: {
    code: "APES",
    image: "/assets/results/APES.png",
    kitchen: "/assets/kitchen/bg05.jpg",
    name: "极限代谢狂魔",
    enName: "The Bio-Hacker",
    animal: "戴着护目镜、腰间挂满滴管和量杯的白鼠研究员🐭",
    recipe: "生苦瓜打成泥混合黑咖啡、蛋白粉与魔鬼辣椒粉一口闷",
    comment: "你不是在享受进食，你是在给一台碳基生物躯体灌装高能燃料。精准、高效、极度难吃，却异常自律。",
    tags: ["生化补给", "高阶自律", "无情营养摄入机", "舌苔毫无痛觉"],
    partner: "CMES",
    counter: "CMHI"
  },
  APEI: {
    code: "APEI",
    image: "/assets/results/APEI.png",
    kitchen: "/assets/kitchen/bg06.jpg",
    name: "禁忌分子炼金术士",
    enName: "The Molecular Anarchist",
    animal: "手持精密镊子、神情冷酷的狐狸博士🦊",
    recipe: "辣酱油分子爆珠，配液氮冷冻腐乳冰淇淋脆片",
    comment: "你把料理当成了高能物理实验。每一种奇怪的风味碰撞都经过你严密的化学配比，味道荒诞得令人拍案叫绝。",
    tags: ["分子料理狂", "精确到0.1克", "风味对冲", "厨艺界诺贝尔狂徒"],
    partner: "CMEI",
    counter: "CMHS"
  },
  APHS: {
    code: "APHS",
    image: "/assets/results/APHS.png",
    kitchen: "/assets/kitchen/bg07.jpg",
    name: "奇葩养生朋克",
    enName: "The Punk Herbalist",
    animal: "保温杯不离手、围裙上印着太极八卦的仙鹤道长🦢",
    recipe: "枸杞菊花茶叶蛋汤底，煮无糖魔芋丝并滴入藿香正气水",
    comment: "一边熬夜通宵，一边在电煮锅里搞精准养生。你坚信只要中草药的克数精确，再离谱的配方也能百毒不侵。",
    tags: ["朋克养生", "草本乱炖", "精确控卡", "当代脆皮青年解药"],
    partner: "CMHS",
    counter: "CMEI"
  },
  APHI: {
    code: "APHI",
    image: "/assets/results/APHI.png",
    kitchen: "/assets/kitchen/bg08.jpg",
    name: "异次元调味诗人",
    enName: "The Avant-Garde Gastronomist",
    animal: "头戴贝雷帽、手拿小提琴调料勺的变色龙画家🦎",
    recipe: "煎三文鱼配现磨黑芝麻糊，淋上百香果芥末泡沫",
    comment: "你的味蕾生长在第四维度。别人笑你搭配癫狂，你笑他人看不穿“油脂与酸甜的量子共振”。",
    tags: ["风味通感", "前卫艺术", "奇诡但和谐", "先锋派味觉"],
    partner: "CMHI",
    counter: "CMES"
  },
  CMES: {
    code: "CMES",
    image: "/assets/results/CMES.png",
    kitchen: "/assets/kitchen/bg09.jpg",
    name: "暴力重油狂怒者",
    enName: "The Sizzle Berserker",
    animal: "挥舞着两把巨大菜刀、浑身肌肉的斗牛犬🐶",
    recipe: "大火宽油爆炒剩菜，撒上一整包孜然和两勺干辣椒面",
    comment: "没有什么是一勺热油泼下去解决不了的；如果有，就再倒一勺老干妈。你的厨房排风扇永远在悲鸣。",
    tags: ["爆炒一切", "热量炸弹", "烟熏火燎", "猛男落泪锅气"],
    partner: "APES",
    counter: "APHI"
  },
  CMEI: {
    code: "CMEI",
    image: "/assets/results/CMEI.png",
    kitchen: "/assets/kitchen/bg10.jpg",
    name: "碳水狂欢派对咖",
    enName: "The Carb Overlord",
    animal: "肚皮圆滚滚、手里永远拿着奶酪棒的棕熊🐻",
    recipe: "泡面夹进芝士拉丝热压吐司，外层再裹上面包糠油炸",
    comment: "快乐的秘诀就是让碳水拥抱碳水！管他热量超不超标，芝士必须拉丝三米长，视觉冲击必须拉满！",
    tags: ["芝士瀑布", "碳水炸弹", "暴食多巴胺", "深夜放毒王"],
    partner: "APEI",
    counter: "APHS"
  },
  CMHS: {
    code: "CMHS",
    image: "/assets/results/CMHS.png",
    kitchen: "/assets/kitchen/bg11.jpg",
    name: "极简饱腹流浪汉",
    enName: "The Nomadic Forager",
    animal: "裹着破毛毯、坐在篝火边的流浪柴犬🐕",
    recipe: "白水煮挂面，起锅倒一点点生抽，直接就着生蒜瓣吃",
    comment: "人类文明进化了几千年，你依然保持着原始采集者的纯粹。只要能补充糖分和电解质，盘子都懒得舔。",
    tags: ["原生态生存", "生吃大蒜", "挂面守护者", "洗洁精绝缘体"],
    partner: "APHS",
    counter: "APEI"
  },
  CMHI: {
    code: "CMHI",
    image: "/assets/results/CMHI.png",
    kitchen: "/assets/kitchen/bg12.jpg",
    name: "乡村杂耍野生大厨",
    enName: "The Rustic Showman",
    animal: "头戴草帽、拿铁锹翻炒大铁锅的袋鼠🦘",
    recipe: "柴火大铁锅炖整只土鸡，直接把玉米饼啪啪甩在锅边",
    comment: "虽然手艺大开大合，调料放多放少全看风向，但你总能凭无与伦比的热情和野性仪式感，把全桌人都喂得心服口服。",
    tags: ["铁锅炖万物", "热情好客", "大开大合", "烟火气天花板"],
    partner: "APHI",
    counter: "APES"
  },
  CPES: {
    code: "CPES",
    image: "/assets/results/CPES.png",
    kitchen: "/assets/kitchen/bg13.jpg",
    name: "嗜辣天秤执政官",
    enName: "The Spicy Bureaucrat",
    animal: "手握电子秤、神情严肃的黑猫警长🐈‍⬛",
    recipe: "精确称量至15克的重庆特级朝天椒，炒制精准控温180°C的辣子鸡",
    comment: "你追求极致的痛觉刺激，但必须在绝对理性的框架下进行。多一粒花椒是对规则的背叛，少一滴辣椒油是对辣味的亵渎。",
    tags: ["严谨重口", "控温控秒", "死守配方", "吃辣也要工业化"],
    partner: "AMES",
    counter: "AMHI"
  },
  CPEI: {
    code: "CPEI",
    image: "/assets/results/CPEI.png",
    kitchen: "/assets/kitchen/bg14.jpg",
    name: "戏剧米其林暴君",
    enName: "The Michelin Tyrant",
    animal: "戴着三层高厨师帽、手持指挥棒的骄傲白鹅🦢",
    recipe: "用精密模具压制成完美正六边形的红烧肉，旁边用酱汁画出五线谱",
    comment: "如果一盘红烧肉不能让人在咀嚼时听到交响乐，那它就只配进垃圾桶！厨房是你的暴政帝国，摆盘必须精确到毫米。",
    tags: ["米其林强迫症", "完美主义", "摆盘暴君", "优雅与威严"],
    partner: "AMEI",
    counter: "AMHS"
  },
  CPHS: {
    code: "CPHS",
    image: "/assets/results/CPHS.png",
    kitchen: "/assets/kitchen/bg15.jpg",
    name: "洁癖实验室助理",
    enName: "The Sanitized Steward",
    animal: "戴着无尘橡胶手套、腰别喷雾消毒水的企鹅管家🐧",
    recipe: "蒸无抗生素纯鸡胸肉配切成标准1cm立方块的西兰花，只蘸少许低钠酱油",
    comment: "你做饭5分钟，清洁厨房45分钟。台面上不允许有一滴水渍，砧板必须按生熟分类编号。做饭对你而言是一场抗菌战争。",
    tags: ["厨房洁癖", "无菌级料理", "少油少盐", "洗碗机终极化身"],
    partner: "AMHS",
    counter: "AMEI"
  },
  CPHI: {
    code: "CPHI",
    image: "/assets/results/CPHI.png",
    kitchen: "/assets/kitchen/bg16.jpg",
    name: "贵族仪式守护者",
    enName: "The High-Table Aristocrat",
    animal: "胸前别着怀表、用银盘端着红茶的金毛犬绅士🦮",
    recipe: "法式黄油煎龙利鱼，搭配精密温度萃取的伯爵红茶与自制司康",
    comment: "生活可以平淡，但礼仪不可废除。哪怕是在出租屋吃一份煎鱼，也必须点上香薰蜡烛，铺好亚麻餐巾，播放德彪西。",
    tags: ["仪式感之神", "精致老钱风", "古典主义", "氛围感大师"],
    partner: "AMHI",
    counter: "AMES"
  }
}

function calcResult(answers) {
  const leftScores = {
    C: 0,
    P: 0,
    H: 0,
    S: 0
  }
  QUESTIONS.forEach((q) => {
    const answer = answers[q.id]
    if (answer === q.leftKey) {
      leftScores[q.leftKey] += 1
    }
  })
  const code =
    (leftScores.C >= 2 ? "C" : "A") +
    (leftScores.P >= 2 ? "P" : "M") +
    (leftScores.H >= 2 ? "H" : "E") +
    (leftScores.S >= 2 ? "S" : "I")
  return {
    code,
    leftScores,
    result: RESULTS[code]
  }
}

module.exports = {
  QUESTIONS,
  RESULTS,
  calcResult
}
