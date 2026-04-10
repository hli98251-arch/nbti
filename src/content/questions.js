export const questions = [
  // --- MBTI 科学化且带毒舌风的分支先导题 ---
  
  // 1. E/I 测试路口
  {
    id: 'mbti_q1',
    prompt: '（能量来源）高强度上了一周班/学，终于到了周五晚上，你的第一反应是？',
    options: [
      { id: 'a', text: '必须攒个局或者出门嗨一下，不然这周白过了。', nextId: 'mbti_q1_e' },
      { id: 'b', text: '谢天谢地，门一锁手机一关，谁也别想找到我。', nextId: 'mbti_q1_i' },
    ]
  },
  {
    id: 'mbti_q1_e',
    prompt: '（E人特供）在一个全是熟人的局里，如果气氛突然冷下来了，你会？',
    options: [
      { id: 'a', text: '立刻开始抛梗或者找话题，我受不了一点尴尬。', nextId: 'mbti_q2' },
      { id: 'b', text: '看旁边平时话最多的人，等他先开口，我再跟进。', nextId: 'mbti_q2' },
    ]
  },
  {
    id: 'mbti_q1_i',
    prompt: '（I人特供）当你不得不参加一个充满陌生人的聚会时，你的内心戏是？',
    options: [
      { id: 'a', text: '面带微笑充当背景板，随时准备抛出借口开溜。', nextId: 'mbti_q2' },
      { id: 'b', text: '强行披上社交马甲应付，回家后立刻陷入“社交瘫痪”。', nextId: 'mbti_q2' },
    ]
  },
  
  // 2. S/N 测试路口
  {
    id: 'mbti_q2',
    prompt: '（认知方式）别人给你画了一个长达10年的“宏伟商业蓝图”，你最先想确认什么？',
    options: [
      { id: 'a', text: '这东西落地要多少钱？有哪些具体阻碍？', nextId: 'mbti_q2_s' },
      { id: 'b', text: '这个商业模式酷不酷？有没有更有趣的玩法？', nextId: 'mbti_q2_n' },
    ]
  },
  {
    id: 'mbti_q2_s',
    prompt: '（S人特供）面对整天吹嘘自己眼界多高但连个PPT都做不好的人，你会？',
    options: [
      { id: 'a', text: '直接问他：“所以你要怎么做？步骤列一下？”。', nextId: 'mbti_q3' },
      { id: 'b', text: '表面点头称是，心里已经把他拉入“不靠谱”黑名单。', nextId: 'mbti_q3' },
    ]
  },
  {
    id: 'mbti_q2_n',
    prompt: '（N人特供）深夜睡不着时，你脑子里最容易浮出什么画面？',
    options: [
      { id: 'a', text: '如果丧尸突然爆发，我家里的菜刀能撑几天。', nextId: 'mbti_q3' },
      { id: 'b', text: '五年前说错的那句话，如果重来一次剧情会怎么发展。', nextId: 'mbti_q3' },
    ]
  },

  // 3. T/F 测试路口
  {
    id: 'mbti_q3',
    prompt: '（决策方式）好朋友哭着找你抱怨工作上的委屈是领导的错，你会？',
    options: [
      { id: 'a', text: '分析局势：“别哭了，这事你也有锅，你应该这么办……”', nextId: 'mbti_q3_t' },
      { id: 'b', text: '提供情绪价值：“太惨了！你等我骂死这个傻逼老板！”', nextId: 'mbti_q3_f' },
    ]
  },
  {
    id: 'mbti_q3_t',
    prompt: '（T人特供）经常有人说你“说话太直”、“没有温度”，你的真实想法是：',
    options: [
      { id: 'a', text: '事实就是事实啊，我加个“亲”字就能掩盖你出错的事实吗？', nextId: 'mbti_q4' },
      { id: 'b', text: '我只是懒得说客套话，不代表我没有同情心。', nextId: 'mbti_q4' },
    ]
  },
  {
    id: 'mbti_q3_f',
    prompt: '（F人特供）你最容易在什么情况下受到内心暴击？',
    options: [
      { id: 'a', text: '我的好意被熟人当成理所当然，甚至被冷漠无视。', nextId: 'mbti_q4' },
      { id: 'b', text: '对方指责我时，语气稍微重了一点，像是在嫌弃我。', nextId: 'mbti_q4' },
    ]
  },

  // 4. J/P 测试路口
  {
    id: 'mbti_q4',
    prompt: '（生活态度）你的个人空间（比如桌面、房间）一般是什么状态？',
    options: [
      { id: 'a', text: '井井有条，就算乱我也严格知道每样东西到底丢在哪。', nextId: 'mbti_q4_j' },
      { id: 'b', text: '薛定谔的乱。外人不理解，但我能在乱麻里精准找到指甲刀。', nextId: 'mbti_q4_p' },
    ]
  },
  {
    id: 'mbti_q4_j',
    prompt: '（J人特供）最让你控制欲报警的场面是？',
    options: [
      { id: 'a', text: '别人跟我约好了时间地点，最后一刻因为极度无语的理由放鸽子。', nextId: 'q01' },
      { id: 'b', text: '我计划好了一整套流程，结果有人偏要自作主张给我“微调”乱掉。', nextId: 'q01' },
    ]
  },
  {
    id: 'mbti_q4_p',
    prompt: '（P人特供）距离交接/考试死线（DDL）只剩最后两小时，你会：',
    options: [
      { id: 'a', text: '虽然极其焦虑，但手指就是控制不住想再刷两分钟短视频。', nextId: 'q01' },
      { id: 'b', text: '肾上腺素飙升，以奇迹般的速度爆发完成了不可思议的工作量。', nextId: 'q01' },
    ]
  },

  // --- 原有的毒舌题库（衔接） ---
  {
    id: 'q01',
    prompt: '朋友临时改聚会地点，你第一反应是？',
    options: [
      { id: 'a', text: '先吐槽两句，再顺手把新路线查好。' },
      { id: 'b', text: '嘴上说都行，心里已经记上一笔。' },
      { id: 'c', text: '改就改，顺便提议再玩点更离谱的。' },
      { id: 'd', text: '我先看看有没有必要出门。' }
    ]
  },
  {
    id: 'q02',
    prompt: '群里有人发了一个很尬的冷笑话，你会？',
    options: [
      { id: 'a', text: '立刻接梗，把场子强行救回来。' },
      { id: 'b', text: '已读，但在心里默默扣分。' },
      { id: 'c', text: '补一刀更冷的，让现场彻底冻住。' },
      { id: 'd', text: '直接划走，不浪费情绪。' }
    ]
  },
  {
    id: 'q03',
    prompt: '你最常被朋友说的一句话是？',
    options: [
      { id: 'a', text: '你怎么什么都敢说。' },
      { id: 'b', text: '你是不是其实早就不爽了。' },
      { id: 'c', text: '有你在就不会无聊。' },
      { id: 'd', text: '你能不能别突然消失。' }
    ]
  },
  {
    id: 'q04',
    prompt: '需要你带节奏的时候，你通常？',
    options: [
      { id: 'a', text: '接手全场，顺便把规则都改了。' },
      { id: 'b', text: '表面推辞一下，最后还是开始控盘。' },
      { id: 'c', text: '把场子搞热，但未必按原计划来。' },
      { id: 'd', text: '我可以配合，但别把我推到正中间。' }
    ]
  },
  {
    id: 'q05',
    prompt: '有人当面说你不靠谱，你最可能？',
    options: [
      { id: 'a', text: '先顶回去，气势上不能输。' },
      { id: 'b', text: '笑一下，回头再慢慢算。' },
      { id: 'c', text: '顺势演得更不靠谱，让对方后悔开口。' },
      { id: 'd', text: '懒得证明，信不信随便。' }
    ]
  },
  {
    id: 'q06',
    prompt: '最适合形容你聊天状态的是？',
    options: [
      { id: 'a', text: '高频输出，偶尔嘴刹失灵。' },
      { id: 'b', text: '少说，但说了通常不轻。' },
      { id: 'c', text: '专门负责把普通话题聊成事故。' },
      { id: 'd', text: '看心情上线，不在线时谁都别找。' }
    ]
  },
  {
    id: 'q07',
    prompt: '计划被打乱时，你更像？',
    options: [
      { id: 'a', text: '嘴上骂两句，手上已经开始重排。' },
      { id: 'b', text: '不说破，但会默默降低配合度。' },
      { id: 'c', text: '既然都乱了，不如更彻底一点。' },
      { id: 'd', text: '那我先退后一步看戏。' }
    ]
  },
  {
    id: 'q08',
    prompt: '在陌生局里，你的存在感通常来自？',
    options: [
      { id: 'a', text: '一句话直接让人记住我。' },
      { id: 'b', text: '气场不大，但别人会自然注意我。' },
      { id: 'c', text: '我会主动制造记忆点。' },
      { id: 'd', text: '我不一定抢眼，但我会看得很清楚。' }
    ]
  },
  {
    id: 'q09',
    prompt: '你和朋友闹别扭后，通常恢复靠什么？',
    options: [
      { id: 'a', text: '把话说开，吵完就过。' },
      { id: 'b', text: '对方先拿出诚意。' },
      { id: 'c', text: '用玩笑和新节目把尴尬冲掉。' },
      { id: 'd', text: '时间够久，自然就淡了。' }
    ]
  },
  {
    id: 'q10',
    prompt: '下面哪种夸奖最像在夸你？',
    options: [
      { id: 'a', text: '你真会来事。' },
      { id: 'b', text: '你其实很能扛场。' },
      { id: 'c', text: '跟你在一起真有戏看。' },
      { id: 'd', text: '你一个人也能过得挺好。' }
    ]
  },
  {
    id: 'q11',
    prompt: '如果今天必须得罪一个人，你会？',
    options: [
      { id: 'a', text: '那就得罪得干净点。' },
      { id: 'b', text: '脸上不撕，行动上划线。' },
      { id: 'c', text: '顺手把场面变成大型节目。' },
      { id: 'd', text: '我先远离，不浪费这口气。' }
    ]
  },
  {
    id: 'q12',
    prompt: '最能惹你烦的是哪种人？',
    options: [
      { id: 'a', text: '说话没重点还爱占时间。' },
      { id: 'b', text: '只会装无辜但从不负责。' },
      { id: 'c', text: '把气氛搞死还以为自己很稳。' },
      { id: 'd', text: '一天到晚都要在线陪聊。' }
    ]
  },
  {
    id: 'q13',
    prompt: '你翻旧账的频率更接近？',
    options: [
      { id: 'a', text: '我当场翻，不囤着。' },
      { id: 'b', text: '平时不提，一提就是完整版。' },
      { id: 'c', text: '看节目效果，时机对就翻。' },
      { id: 'd', text: '我一般不翻，顶多直接疏远。' }
    ]
  },
  {
    id: 'q14',
    prompt: '你做决定最常受什么影响？',
    options: [
      { id: 'a', text: '当下感觉对不对。' },
      { id: 'b', text: '长远后果和关系成本。' },
      { id: 'c', text: '有没有更有趣的做法。' },
      { id: 'd', text: '会不会打扰我自己的节奏。' }
    ]
  },
  {
    id: 'q15',
    prompt: '你最像哪类朋友？',
    options: [
      { id: 'a', text: '冲锋型，先上再说。' },
      { id: 'b', text: '稳场型，看起来温和其实很有主见。' },
      { id: 'c', text: '节目型，专门负责把局做活。' },
      { id: 'd', text: '游离型，有需要时会出现。' }
    ]
  },
  {
    id: 'q16',
    prompt: '朋友说“随便吃点吧”，你脑内翻译成？',
    options: [
      { id: 'a', text: '行，那我来拍板。' },
      { id: 'b', text: '又来了，最后还是要我做决定。' },
      { id: 'c', text: '那我提一个离谱点的试试。' },
      { id: 'd', text: '随便最好，我不想社交型点餐。' }
    ]
  },
  {
    id: 'q17',
    prompt: '被人误解时，你更可能？',
    options: [
      { id: 'a', text: '立刻纠正，不想吃这个哑巴亏。' },
      { id: 'b', text: '看值不值得解释。' },
      { id: 'c', text: '顺势演得更夸张，让误解自己长大。' },
      { id: 'd', text: '我可以不被懂，但我得安静。' }
    ]
  },
  {
    id: 'q18',
    prompt: '如果今天必须即兴发言，你会？',
    options: [
      { id: 'a', text: '硬讲也能撑住。' },
      { id: 'b', text: '先组织一下，再精确输出。' },
      { id: 'c', text: '顺着情绪和现场一路飞。' },
      { id: 'd', text: '能不讲最好，真讲也只讲重点。' }
    ]
  },
  {
    id: 'q19',
    prompt: '你最容易在哪种时刻突然上头？',
    options: [
      { id: 'a', text: '有人试图压我一头的时候。' },
      { id: 'b', text: '有人反复踩我底线的时候。' },
      { id: 'c', text: '场子快死了但没人救的时候。' },
      { id: 'd', text: '其实我大多时候选择不上头。' }
    ]
  },
  {
    id: 'q20',
    prompt: '你怎么看待“社交电量”这件事？',
    options: [
      { id: 'a', text: '电量靠输出获得。' },
      { id: 'b', text: '要看人，不是谁都配我在线。' },
      { id: 'c', text: '越热闹越续航。' },
      { id: 'd', text: '独处才是原装充电器。' }
    ]
  },
  {
    id: 'q21',
    prompt: '别人夸你“情绪稳定”时，你心里想的是？',
    options: [
      { id: 'a', text: '那是因为我还没真开始。' },
      { id: 'b', text: '谢谢，我只是不会乱给别人看。' },
      { id: 'c', text: '你要不要再观察久一点。' },
      { id: 'd', text: '我稳定，是因为很多事不值得。' }
    ]
  },
  {
    id: 'q22',
    prompt: '你对朋友最狠的一种好，通常是？',
    options: [
      { id: 'a', text: '直接提醒对方别丢人。' },
      { id: 'b', text: '不戳破，但会默默收尾。' },
      { id: 'c', text: '一边帮，一边顺手吐槽。' },
      { id: 'd', text: '让对方自己先冷静，我再回来。' }
    ]
  },
  {
    id: 'q23',
    prompt: '如果今天全员摆烂，你大概率会？',
    options: [
      { id: 'a', text: '接管流程，至少别散架。' },
      { id: 'b', text: '选几个关键点补住就行。' },
      { id: 'c', text: '既然都烂了，不如烂得好看点。' },
      { id: 'd', text: '我先保住自己，不跟着一起炸。' }
    ]
  },
  {
    id: 'q24',
    prompt: '你最希望别人怎么概括你？',
    options: [
      { id: 'a', text: '不好惹，但靠谱。' },
      { id: 'b', text: '有分寸，而且心里有数。' },
      { id: 'c', text: '离谱，但有意思。' },
      { id: 'd', text: '不用常驻，但关键时刻在。' }
    ]
  },
  {
    id: 'q25',
    prompt: '有人背后说你坏话被你知道了，你会？',
    options: [
      { id: 'a', text: '当面问清楚，顺便给对方一次解释的机会。' },
      { id: 'b', text: '默默记下，以后找机会还回去。' },
      { id: 'c', text: '无所谓，反正我也不是人民币。' },
      { id: 'd', text: '直接无视，懒得浪费情绪在这种人事上。' }
    ]
  },
  {
    id: 'q26',
    prompt: '你说话最容易踩到别人的哪个点？',
    options: [
      { id: 'a', text: '太直接，嘴比脑子快。' },
      { id: 'b', text: '太记仇，翻旧账一级棒。' },
      { id: 'c', text: '太冷血，关心不到位。' },
      { id: 'd', text: '太自我，话题永远绕回自己。' }
    ]
  },
  {
    id: 'q27',
    prompt: '你觉得自己最该被改进的地方是？',
    options: [
      { id: 'a', text: '脾气太冲，容易当场爆炸。' },
      { id: 'b', text: '太能忍，忍到最后突然爆发更吓人。' },
      { id: 'c', text: '太敏感，别人无心的话我能脑补出一部剧。' },
      { id: 'd', text: '太懒，不想改，改了就不是我了。' }
    ]
  },
  {
    id: 'q28',
    prompt: '你交朋友最看重什么？',
    options: [
      { id: 'a', text: '真诚，不能当面一套背后一套。' },
      { id: 'b', text: '有趣，无聊的人我处不下去。' },
      { id: 'c', text: '靠谱，关键时刻能找到人。' },
      { id: 'd', text: '边界感，互相不越界才长久。' }
    ]
  },
  {
    id: 'q29',
    prompt: '如果你是公司领导，你的团队氛围会是？',
    options: [
      { id: 'a', text: '狼性文化，卷死同行那种。' },
      { id: 'b', text: '扁平化管理，但产出必须硬。' },
      { id: 'c', text: '轻松愉快，但ddl是死线。' },
      { id: 'd', text: '散养模式，能者多劳就行。' }
    ]
  },
  {
    id: 'q30',
    prompt: '你在感情里最容易犯的错是？',
    options: [
      { id: 'a', text: '太投入，把自己搞得很卑微。' },
      { id: 'b', text: '太理性，显得冷漠没有温度。' },
      { id: 'c', text: '太作，用各种方式试探对方的底线。' },
      { id: 'd', text: '太能忍，明明不舒服还硬撑。' }
    ]
  },
  {
    id: 'q31',
    prompt: '你人生最大的软肋是什么？',
    options: [
      { id: 'a', text: '玻璃心，被批评就容易破防。' },
      { id: 'b', text: '讨好型人格，很难拒绝别人。' },
      { id: 'c', text: '三分钟热度，做什么都半途而废。' },
      { id: 'd', text: '选择困难症，小事也要纠结半天。' }
    ]
  }
];

export function getQuestionById(id) {
  return questions.find(q => q.id === id);
}

export function getFirstQuestionId() {
  return questions[0].id;
}

export function getNextQuestionId(currentId, selectedOptionId) {
  const current = getQuestionById(currentId);
  if (!current) return null;
  
  const option = current.options.find(o => o.id === selectedOptionId);
  if (option && option.nextId) {
    return option.nextId;
  }
  
  // Backwards compatibility/default fallback logic:
  // If no specific branch is specified, go to the next question in the array sequentially
  // Provided it itself isn't a branching target that should be skipped!
  const idx = questions.findIndex(q => q.id === currentId);
  if (idx !== -1 && idx < questions.length - 1) {
    let nextIdx = idx + 1;
    // Skip any questions that act as branch targets to prevent linear parsing from hitting them improperly
    // Here we know that strictly old questions are named "qXX" like "q01", "q02". 
    // And new MBTI questions are at the top and manage their own flow towards 'q01'.
    while (nextIdx < questions.length) {
      const candidateId = questions[nextIdx].id;
      // If we are currently in 'qXX' space, strictly grab the next 'qXX' space question
      if (currentId.startsWith('q') && candidateId.startsWith('q')) {
        return candidateId;
      }
      nextIdx++;
    }
  }
  
  return null; // End of test
}
