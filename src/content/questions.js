// ============================================================
// NBTI 题库 v3.0 — MBTI 精度大幅提升版
// ============================================================
// 核心改进（v2→v3）：
// 1. MBTI 先导题：每维度 3 题（主干 + 校准 + 深层），全部四选一
//    - 四选项覆盖"强倾向A / 弱倾向A / 弱倾向B / 强倾向B"连续光谱
//    - 不再使用二选一分支（E人特供/I人特供），避免回声效应
// 2. 核心题隐性 MBTI 计分：20 道核心题中 10+ 道同时贡献 mbti 分数
//    - 多维交叉校验，单题失误不会翻转 MBTI 结果
// 3. MBTI 总分范围扩大至约 ±18，0分附近的模糊带更容易被检测
// 4. 自适应题保持 v2 逻辑不变
// ============================================================

export const questions = [
  // ================================================================
  // 第一幕：MBTI 四维先导（12题，每维度3题，每人必做）
  // ================================================================

  // ──────── E/I 外向/内向 ────────
  {
    id: 'mbti_ei_1',
    prompt: '（能量来源）高强度上了一周班/学，终于到了周五晚上，你的第一反应是？',
    category: 'mbti',
    options: [
      { id: 'a', text: '必须攒个局或者出门嗨一下，不然这周白过了！',
        scores: { spark: 1, orbit: 2 },
        mbti: { ei: 3 } },
      { id: 'b', text: '看看有没有小范围的饭局，人别太多就行。',
        scores: { orbit: 1 },
        mbti: { ei: 1 } },
      { id: 'c', text: '约一两个最好的朋友安静待一会儿就够了。',
        scores: { filter: 1 },
        mbti: { ei: -1 } },
      { id: 'd', text: '谢天谢地，门一锁手机一关，谁也别想找到我。',
        scores: { filter: 1, bunker: 1 },
        mbti: { ei: -3 } },
    ]
  },
  {
    id: 'mbti_ei_2',
    prompt: '（社交恢复）一场四五十人的大聚会结束后，你的状态通常是？',
    category: 'mbti',
    options: [
      { id: 'a', text: '意犹未尽，恨不得接着来下半场。',
        scores: { spark: 1, orbit: 1 },
        mbti: { ei: 3 } },
      { id: 'b', text: '累但满足，回家路上还在回味刚才的好时光。',
        scores: { orbit: 1 },
        mbti: { ei: 1 } },
      { id: 'c', text: '松了口气，感觉自己电量快见底了。',
        scores: { bunker: 1 },
        mbti: { ei: -1 } },
      { id: 'd', text: '整个人被掏空，需要独自待至少一整天才能恢复。',
        scores: { bunker: 1, filter: 1 },
        mbti: { ei: -3 } },
    ]
  },
  {
    id: 'mbti_ei_3',
    prompt: '（交流风格）在一个全是熟人的聚会里，气氛突然冷场了，你会？',
    category: 'mbti',
    options: [
      { id: 'a', text: '立刻抛梗或者找话题，我受不了一秒钟尴尬。',
        scores: { spark: 2, chaos: 1, orbit: 1 },
        mbti: { ei: 2 } },
      { id: 'b', text: '跟旁边的人小声聊个新话题，慢慢带回气氛。',
        scores: { mask: 1 },
        mbti: { ei: 1 } },
      { id: 'c', text: '等话最多的人先开口，我再适时跟进。',
        scores: { mask: 1, gravity: 1 },
        mbti: { ei: -1 } },
      { id: 'd', text: '享受这片刻安静，甚至觉得冷场也挺好。',
        scores: { filter: 1, bunker: 1 },
        mbti: { ei: -2 } },
    ]
  },

  // ──────── S/N 实感/直觉 ────────
  {
    id: 'mbti_sn_1',
    prompt: '（认知方式）别人给你画了一个长达10年的"宏伟商业蓝图"，你最先想确认什么？',
    category: 'mbti',
    options: [
      { id: 'a', text: '这东西落地要多少钱？有哪些具体阻碍？',
        scores: { judge: 1, gravity: 1 },
        mbti: { sn: -3 } },
      { id: 'b', text: '团队现有资源够不够先做一个小版本验证？',
        scores: { gravity: 1 },
        mbti: { sn: -1 } },
      { id: 'c', text: '这个方向有没有更大的想象空间？可以再扩展吗？',
        scores: { chaos: 1 },
        mbti: { sn: 1 } },
      { id: 'd', text: '这个商业模式酷不酷？有没有更颠覆性的玩法？',
        scores: { chaos: 1, absurdity: 1 },
        mbti: { sn: 3 } },
    ]
  },
  {
    id: 'mbti_sn_2',
    prompt: '（信息加工）看一部很有深意的电影后，你更在意的是？',
    category: 'mbti',
    options: [
      { id: 'a', text: '故事讲了什么，情节是否合理，演员表演功力如何。',
        scores: { judge: 1 },
        mbti: { sn: -3 } },
      { id: 'b', text: '通过细节还原导演想表达的真实意图。',
        scores: { gravity: 1 },
        mbti: { sn: -1 } },
      { id: 'c', text: '这部电影让我联想到了很多其他的事情和可能性。',
        scores: { absurdity: 1 },
        mbti: { sn: 1 } },
      { id: 'd', text: '那些隐喻和象征太有意思了，我能解读出导演自己可能都没想到的含义。',
        scores: { absurdity: 1, chaos: 1 },
        mbti: { sn: 3 } },
    ]
  },
  {
    id: 'mbti_sn_3',
    prompt: '（深夜胡思）睡不着的时候，你脑子里最常浮出的内容是？',
    category: 'mbti',
    options: [
      { id: 'a', text: '明天要做的具体事项清单，或者今天某件没处理好的事。',
        scores: { gravity: 1 },
        mbti: { sn: -2 } },
      { id: 'b', text: '回想今天跟某人的对话，复盘哪里说得不到位。',
        scores: { spite: 1 },
        mbti: { sn: -1 } },
      { id: 'c', text: '五年前说错的那句话，如果重来一次剧情会怎么发展。',
        scores: { spite: 1, trap: 1 },
        mbti: { sn: 1 } },
      { id: 'd', text: '如果丧尸突然爆发、如果我会隐身术……各种奇妙假设。',
        scores: { absurdity: 2, speed: 1 },
        mbti: { sn: 3 } },
    ]
  },

  // ──────── T/F 思考/情感 ────────
  {
    id: 'mbti_tf_1',
    prompt: '（决策方式）好朋友哭着找你抱怨工作上的委屈（领导确实有错），你会？',
    category: 'mbti',
    options: [
      { id: 'a', text: '先分析局势："别哭了，这事你也有锅，你应该这么办……"',
        scores: { venom: 1, judge: 1 },
        mbti: { tf: -3 } },
      { id: 'b', text: '先让TA发泄完，然后理性帮TA梳理下一步行动。',
        scores: { gravity: 1 },
        mbti: { tf: -1 } },
      { id: 'c', text: '先安慰情绪，等TA平静了再小心翼翼地说自己的想法。',
        scores: { mask: 1 },
        mbti: { tf: 1 } },
      { id: 'd', text: '提供情绪全额支持："太惨了！你等着我替你骂死这个老板！"',
        scores: { spark: 1, orbit: 1 },
        mbti: { tf: 3 } },
    ]
  },
  {
    id: 'mbti_tf_2',
    prompt: '（价值判断）有人用"说话太直""没有温度"来评价你，你的真实反应？',
    category: 'mbti',
    options: [
      { id: 'a', text: '事实就是事实，加个"亲"字能改变什么？',
        scores: { venom: 1, pride: 1, filter: -1 },
        mbti: { tf: -3 } },
      { id: 'b', text: '我只是效率优先，想快速解决问题而已。',
        scores: { speed: 1, gravity: 1 },
        mbti: { tf: -1 } },
      { id: 'c', text: '说不在意是假的，我会反思自己是不是确实太冲了。',
        scores: { pride: 1 },
        mbti: { tf: 1 } },
      { id: 'd', text: '感觉被误解了，我明明很在乎他们的感受。',
        scores: { pride: 1, leak: 1 },
        mbti: { tf: 3 } },
    ]
  },
  {
    id: 'mbti_tf_3',
    prompt: '（内心破防）你最容易在什么情况下受到"内心暴击"？',
    category: 'mbti',
    options: [
      { id: 'a', text: '我做出了明显正确的决定，却被无理由否定。',
        scores: { pride: 1, spark: 1 },
        mbti: { tf: -2 } },
      { id: 'b', text: '我付出了很多努力，结果却得不到应有的回报。',
        scores: { spite: 1 },
        mbti: { tf: -1 } },
      { id: 'c', text: '我的好意被熟人当成理所当然，甚至被冷漠无视。',
        scores: { spite: 1, pride: 1 },
        mbti: { tf: 2 } },
      { id: 'd', text: '对方对我说话语气稍微重了点，像是在嫌弃我。',
        scores: { bunker: 1, pride: 1, leak: 1 },
        mbti: { tf: 3 } },
    ]
  },

  // ──────── J/P 判断/感知 ────────
  {
    id: 'mbti_jp_1',
    prompt: '（生活态度）你的个人空间（比如桌面、房间）一般是什么状态？',
    category: 'mbti',
    options: [
      { id: 'a', text: '井井有条，每样东西严格按分类归位。',
        scores: { gravity: 1, judge: 1 },
        mbti: { jp: -3 } },
      { id: 'b', text: '有一定秩序，偶尔乱但我很快会收拾。',
        scores: { gravity: 1 },
        mbti: { jp: -1 } },
      { id: 'c', text: '看起来有点乱，但我能在乱麻里精准找到东西。',
        scores: { chaos: 1 },
        mbti: { jp: 1 } },
      { id: 'd', text: '薛定谔的乱。攒够一段时间集中清理一次，然后迅速回归混沌。',
        scores: { chaos: 1, absurdity: 1 },
        mbti: { jp: 3 } },
    ]
  },
  {
    id: 'mbti_jp_2',
    prompt: '（计划执行）出去旅行时，你更倾向于？',
    category: 'mbti',
    options: [
      { id: 'a', text: '提前做详细攻略，精确到每天几点去哪个景点。',
        scores: { gravity: 1, judge: 1 },
        mbti: { jp: -3 } },
      { id: 'b', text: '定好酒店和大方向，具体日程到了再灵活安排。',
        scores: { mask: 1 },
        mbti: { jp: -1 } },
      { id: 'c', text: '只订机票和第一晚住宿，剩下的随缘走。',
        scores: { chaos: 1 },
        mbti: { jp: 1 } },
      { id: 'd', text: '攻略是什么？走哪算哪，迷路了才是旅行！',
        scores: { chaos: 1, absurdity: 1, speed: 1 },
        mbti: { jp: 3 } },
    ]
  },
  {
    id: 'mbti_jp_3',
    prompt: '（截止期限）距离考试/交接的死线（DDL）只剩最后两小时，你通常是？',
    category: 'mbti',
    options: [
      { id: 'a', text: '不可能出现这种情况，我一周前就完成了。',
        scores: { gravity: 2, judge: 1 },
        mbti: { jp: -3 } },
      { id: 'b', text: '还有两小时？够了，按计划收尾。',
        scores: { gravity: 1 },
        mbti: { jp: -1 } },
      { id: 'c', text: '肾上腺素飙升，以奇迹般的速度爆发完成不可思议的工作量。',
        scores: { speed: 2, spark: 1 },
        mbti: { jp: 1 } },
      { id: 'd', text: '虽然极其焦虑，但手指就是控制不住想再刷两分钟短视频。',
        scores: { leak: 1, chaos: 1 },
        mbti: { jp: 3 } },
    ]
  },

  // ================================================================
  // 第二幕：核心性格维度题（20题，每人必做，每题4选项）
  // 约半数题目同时贡献隐性 MBTI 分数（交叉校验）
  // ================================================================

  {
    id: 'core_01',
    prompt: '朋友临时改聚会地点，你第一反应是？',
    category: 'core',
    options: [
      { id: 'a', text: '先吐槽两句，再顺手把新路线查好。',
        scores: { spark: 2, filter: -1, speed: 1 },
        mbti: { jp: 1 } },
      { id: 'b', text: '嘴上说都行，心里已经记上一笔。',
        scores: { mask: 2, spite: 2 },
        mbti: { jp: -1 } },
      { id: 'c', text: '改就改，顺便提议再玩点更离谱的。',
        scores: { chaos: 2, absurdity: 1 },
        mbti: { jp: 2 } },
      { id: 'd', text: '我先看看有没有必要出门。',
        scores: { orbit: -1, filter: 2 },
        mbti: { ei: -1 } },
    ]
  },
  {
    id: 'core_02',
    prompt: '群里有人发了一个很尬的冷笑话，你会？',
    category: 'core',
    options: [
      { id: 'a', text: '立刻接梗，把场子强行救回来。',
        scores: { orbit: 2, spark: 1, chaos: 1 },
        mbti: { ei: 1 } },
      { id: 'b', text: '已读，但在心里默默扣分。',
        scores: { judge: 2, mask: 1, spite: 1 },
        mbti: { tf: -1 } },
      { id: 'c', text: '补一刀更冷的，让现场彻底冻住。',
        scores: { venom: 2, absurdity: 1, chaos: 1 } },
      { id: 'd', text: '直接划走，不浪费情绪。',
        scores: { filter: 2, orbit: -1 },
        mbti: { ei: -1 } },
    ]
  },
  {
    id: 'core_03',
    prompt: '你最常被朋友说的一句话是？',
    category: 'core',
    options: [
      { id: 'a', text: '你怎么什么都敢说。',
        scores: { filter: -2, venom: 2, spark: 1 },
        mbti: { tf: -1 } },
      { id: 'b', text: '你是不是其实早就不爽了。',
        scores: { mask: 2, spite: 2 } },
      { id: 'c', text: '有你在就不会无聊。',
        scores: { orbit: 2, chaos: 1, spark: 1 },
        mbti: { ei: 1 } },
      { id: 'd', text: '你能不能别突然消失。',
        scores: { orbit: -2, filter: 1, bunker: 1 },
        mbti: { ei: -1 } },
    ]
  },
  {
    id: 'core_04',
    prompt: '需要你带节奏的时候，你通常？',
    category: 'core',
    options: [
      { id: 'a', text: '接手全场，顺便把规则都改了。',
        scores: { gravity: 2, spark: 1, chaos: 1 },
        mbti: { ei: 1, jp: -1 } },
      { id: 'b', text: '表面推辞一下，最后还是开始控盘。',
        scores: { mask: 1, gravity: 2, trap: 1 } },
      { id: 'c', text: '把场子搞热，但未必按原计划来。',
        scores: { chaos: 2, orbit: 1, absurdity: 1 },
        mbti: { jp: 1 } },
      { id: 'd', text: '我可以配合，但别把我推到正中间。',
        scores: { filter: 2, bunker: 1 },
        mbti: { ei: -1 } },
    ]
  },
  {
    id: 'core_05',
    prompt: '有人当面说你不靠谱，你最可能？',
    category: 'core',
    options: [
      { id: 'a', text: '先顶回去，气势上不能输。',
        scores: { spark: 2, pride: 2, speed: 1 },
        mbti: { tf: -1 } },
      { id: 'b', text: '笑一下，回头再慢慢算。',
        scores: { mask: 1, spite: 2, trap: 1 } },
      { id: 'c', text: '顺势演得更不靠谱，让对方后悔开口。',
        scores: { chaos: 2, absurdity: 2, venom: 1 },
        mbti: { sn: 1 } },
      { id: 'd', text: '懒得证明，信不信随便。',
        scores: { filter: 2, bunker: 1, pride: -1 } },
    ]
  },
  {
    id: 'core_06',
    prompt: '计划被打乱时，你更像？',
    category: 'core',
    options: [
      { id: 'a', text: '嘴上骂两句，手上已经开始重排。',
        scores: { spark: 1, speed: 2, gravity: 1 },
        mbti: { jp: -1 } },
      { id: 'b', text: '不说破，但会默默降低配合度。',
        scores: { spite: 2, mask: 2, trap: 1 } },
      { id: 'c', text: '既然都乱了，不如更彻底一点。',
        scores: { chaos: 2, absurdity: 1, speed: 1 },
        mbti: { jp: 1 } },
      { id: 'd', text: '那我先退后一步看戏。',
        scores: { filter: 1, bunker: 2, judge: 1 } },
    ]
  },
  {
    id: 'core_07',
    prompt: '在陌生局里，你的存在感通常来自？',
    category: 'core',
    options: [
      { id: 'a', text: '一句话直接让人记住我。',
        scores: { venom: 2, spark: 1, filter: -1 },
        mbti: { ei: 1 } },
      { id: 'b', text: '气场不大，但别人会自然注意我。',
        scores: { gravity: 2, mask: 1 } },
      { id: 'c', text: '我会主动制造记忆点。',
        scores: { chaos: 1, orbit: 2, absurdity: 1 },
        mbti: { ei: 1 } },
      { id: 'd', text: '我不一定抢眼，但我会看得很清楚。',
        scores: { judge: 2, filter: 1, bunker: 1 },
        mbti: { ei: -1 } },
    ]
  },
  {
    id: 'core_08',
    prompt: '你和朋友闹别扭后，通常恢复靠什么？',
    category: 'core',
    options: [
      { id: 'a', text: '把话说开，吵完就过。',
        scores: { spark: 1, filter: -1, speed: 1 },
        mbti: { tf: -1 } },
      { id: 'b', text: '对方先拿出诚意。',
        scores: { pride: 2, spite: 1, judge: 1 } },
      { id: 'c', text: '用玩笑和新节目把尴尬冲掉。',
        scores: { chaos: 1, orbit: 2, absurdity: 1 },
        mbti: { tf: 1 } },
      { id: 'd', text: '时间够久，自然就淡了。',
        scores: { filter: 2, bunker: 1, orbit: -1 } },
    ]
  },
  {
    id: 'core_09',
    prompt: '如果今天必须得罪一个人，你会？',
    category: 'core',
    options: [
      { id: 'a', text: '那就得罪得干净点。',
        scores: { venom: 2, spark: 2, filter: -1 },
        mbti: { tf: -1 } },
      { id: 'b', text: '脸上不撕，行动上划线。',
        scores: { mask: 2, trap: 2, spite: 1 } },
      { id: 'c', text: '顺手把场面变成大型节目。',
        scores: { chaos: 2, absurdity: 2 } },
      { id: 'd', text: '我先远离，不浪费这口气。',
        scores: { filter: 2, bunker: 1, orbit: -1 } },
    ]
  },
  {
    id: 'core_10',
    prompt: '最能惹你烦的是哪种人？',
    category: 'core',
    options: [
      { id: 'a', text: '说话没重点还爱占时间。',
        scores: { speed: 1, judge: 2, venom: 1 },
        mbti: { sn: -1 } },
      { id: 'b', text: '只会装无辜但从不负责。',
        scores: { spite: 2, judge: 2 },
        mbti: { tf: -1 } },
      { id: 'c', text: '把气氛搞死还以为自己很稳。',
        scores: { chaos: 1, orbit: 1, spark: 1 },
        mbti: { ei: 1 } },
      { id: 'd', text: '一天到晚都要在线陪聊。',
        scores: { orbit: -2, bunker: 1, filter: 2 },
        mbti: { ei: -1 } },
    ]
  },
  {
    id: 'core_11',
    prompt: '你做决定最常受什么影响？',
    category: 'core',
    options: [
      { id: 'a', text: '当下感觉对不对。',
        scores: { speed: 2, spark: 1, leak: 1 },
        mbti: { tf: 1 } },
      { id: 'b', text: '长远后果和关系成本。',
        scores: { trap: 2, gravity: 1, mask: 1 },
        mbti: { sn: -1 } },
      { id: 'c', text: '有没有更有趣的做法。',
        scores: { chaos: 2, absurdity: 2 },
        mbti: { sn: 1 } },
      { id: 'd', text: '会不会打扰我自己的节奏。',
        scores: { filter: 2, bunker: 1, orbit: -1 } },
    ]
  },
  {
    id: 'core_12',
    prompt: '别人夸你"情绪稳定"时，你心里想的是？',
    category: 'core',
    options: [
      { id: 'a', text: '那是因为我还没真开始。',
        scores: { spark: 1, pride: 1, venom: 1 } },
      { id: 'b', text: '谢谢，我只是不会乱给别人看。',
        scores: { mask: 2, gravity: 1, filter: 1 } },
      { id: 'c', text: '你要不要再观察久一点。',
        scores: { trap: 2, absurdity: 1 } },
      { id: 'd', text: '我稳定，是因为很多事不值得。',
        scores: { bunker: 1, filter: 2, judge: 1 } },
    ]
  },
  {
    id: 'core_13',
    prompt: '你对朋友最狠的一种好，通常是？',
    category: 'core',
    options: [
      { id: 'a', text: '直接提醒对方别丢人。',
        scores: { venom: 1, spark: 1, filter: -1 },
        mbti: { tf: -1 } },
      { id: 'b', text: '不戳破，但会默默收尾。',
        scores: { mask: 2, gravity: 1, trap: 1 },
        mbti: { tf: 1 } },
      { id: 'c', text: '一边帮，一边顺手吐槽。',
        scores: { chaos: 1, venom: 1, orbit: 1 } },
      { id: 'd', text: '让对方自己先冷静，我再回来。',
        scores: { filter: 2, bunker: 1 } },
    ]
  },
  {
    id: 'core_14',
    prompt: '如果今天全员摆烂，你大概率会？',
    category: 'core',
    options: [
      { id: 'a', text: '接管流程，至少别散架。',
        scores: { gravity: 2, spark: 1, speed: 1 },
        mbti: { jp: -1 } },
      { id: 'b', text: '选几个关键点补住就行。',
        scores: { mask: 1, trap: 1, gravity: 1 } },
      { id: 'c', text: '既然都烂了，不如烂得好看点。',
        scores: { chaos: 2, absurdity: 2 },
        mbti: { jp: 1 } },
      { id: 'd', text: '我先保住自己，不跟着一起炸。',
        scores: { bunker: 2, filter: 1 } },
    ]
  },
  {
    id: 'core_15',
    prompt: '有人背后说你坏话被你知道了，你会？',
    category: 'core',
    options: [
      { id: 'a', text: '当面问清楚，顺便给对方一次解释的机会。',
        scores: { spark: 2, gravity: 1, filter: -1 } },
      { id: 'b', text: '默默记下，以后找机会还回去。',
        scores: { spite: 2, trap: 2, mask: 1 } },
      { id: 'c', text: '无所谓，反正我也不是人民币。',
        scores: { pride: -1, chaos: 1, absurdity: 1 } },
      { id: 'd', text: '直接无视，懒得浪费情绪在这种人事上。',
        scores: { filter: 2, bunker: 1 } },
    ]
  },
  {
    id: 'core_16',
    prompt: '你翻旧账的频率更接近？',
    category: 'core',
    options: [
      { id: 'a', text: '我当场翻，不囤着。',
        scores: { spark: 2, speed: 2, filter: -1 } },
      { id: 'b', text: '平时不提，一提就是完整版。',
        scores: { spite: 2, trap: 1, mask: 1 } },
      { id: 'c', text: '看节目效果，时机对就翻。',
        scores: { chaos: 1, trap: 1, absurdity: 1 },
        mbti: { sn: 1 } },
      { id: 'd', text: '我一般不翻，顶多直接疏远。',
        scores: { bunker: 2, orbit: -1, filter: 1 } },
    ]
  },
  {
    id: 'core_17',
    prompt: '被人误解时，你更可能？',
    category: 'core',
    options: [
      { id: 'a', text: '立刻纠正，不想吃这个哑巴亏。',
        scores: { spark: 2, pride: 1, speed: 1 },
        mbti: { ei: 1 } },
      { id: 'b', text: '看值不值得解释。',
        scores: { gravity: 1, judge: 2, mask: 1 },
        mbti: { tf: -1 } },
      { id: 'c', text: '顺势演得更夸张，让误解自己长大。',
        scores: { chaos: 2, absurdity: 2, venom: 1 } },
      { id: 'd', text: '我可以不被懂，但我得安静。',
        scores: { bunker: 2, filter: 1, orbit: -1 },
        mbti: { ei: -1 } },
    ]
  },
  {
    id: 'core_18',
    prompt: '你最容易在哪种时刻突然上头？',
    category: 'core',
    options: [
      { id: 'a', text: '有人试图压我一头的时候。',
        scores: { pride: 2, spark: 2 } },
      { id: 'b', text: '有人反复踩我底线的时候。',
        scores: { spite: 2, bunker: 1, spark: 1 } },
      { id: 'c', text: '场子快死了但没人救的时候。',
        scores: { orbit: 2, chaos: 1, spark: 1 },
        mbti: { ei: 1 } },
      { id: 'd', text: '其实我大多时候选择不上头。',
        scores: { filter: 2, gravity: 1, mask: 1 } },
    ]
  },
  {
    id: 'core_19',
    prompt: '你怎么看待"社交电量"这件事？',
    category: 'core',
    options: [
      { id: 'a', text: '电量靠输出获得。',
        scores: { spark: 2, orbit: 1 },
        mbti: { ei: 1 } },
      { id: 'b', text: '要看人，不是谁都配我在线。',
        scores: { judge: 2, spite: 1, pride: 1 } },
      { id: 'c', text: '越热闹越续航。',
        scores: { orbit: 2, chaos: 1 },
        mbti: { ei: 2 } },
      { id: 'd', text: '独处才是原装充电器。',
        scores: { orbit: -2, bunker: 1, filter: 1 },
        mbti: { ei: -2 } },
    ]
  },
  {
    id: 'core_20',
    prompt: '你最希望别人怎么概括你？',
    category: 'core',
    options: [
      { id: 'a', text: '不好惹，但靠谱。',
        scores: { gravity: 2, spark: 1, venom: 1 } },
      { id: 'b', text: '有分寸，而且心里有数。',
        scores: { mask: 2, trap: 1, gravity: 1 } },
      { id: 'c', text: '离谱，但有意思。',
        scores: { chaos: 2, absurdity: 2 },
        mbti: { sn: 1 } },
      { id: 'd', text: '不用常驻，但关键时刻在。',
        scores: { bunker: 1, filter: 1, orbit: -1 } },
    ]
  },

  // ================================================================
  // 第三幕：自适应深入题（12题，根据条件触发，每人约做4题）
  // ================================================================

  // --- 高攻击性分支（spark/venom 高分触发）---
  {
    id: 'adapt_aggro_1',
    prompt: '你说话最容易踩到别人的哪个点？',
    category: 'adaptive',
    condition: { type: 'high_score', dimensions: ['spark', 'venom'], threshold: 6 },
    options: [
      { id: 'a', text: '太直接，嘴比脑子快。',
        scores: { filter: -2, venom: 2, speed: 1 } },
      { id: 'b', text: '太冷血，关心不到位。',
        scores: { judge: 2, gravity: 1 } },
      { id: 'c', text: '太自我，话题永远绕回自己。',
        scores: { pride: 2, orbit: 1 } },
      { id: 'd', text: '其实我不太踩人，只是对方太脆。',
        scores: { mask: 1, bunker: 1, pride: 1 } },
    ]
  },
  {
    id: 'adapt_aggro_2',
    prompt: '如果今天必须即兴发言，你会？',
    category: 'adaptive',
    condition: { type: 'high_score', dimensions: ['spark', 'venom'], threshold: 6 },
    options: [
      { id: 'a', text: '硬讲也能撑住。',
        scores: { gravity: 2, spark: 1 } },
      { id: 'b', text: '先组织一下，再精确输出。',
        scores: { trap: 2, mask: 1, gravity: 1 } },
      { id: 'c', text: '顺着情绪和现场一路飞。',
        scores: { chaos: 2, speed: 1, leak: 1 } },
      { id: 'd', text: '能不讲最好，真讲也只讲重点。',
        scores: { filter: 2, bunker: 1 } },
    ]
  },

  // --- 高防御性分支（bunker/mask 高分触发）---
  {
    id: 'adapt_defend_1',
    prompt: '当一个你信任的人突然开始疏远你，你的第一反应是？',
    category: 'adaptive',
    condition: { type: 'high_score', dimensions: ['bunker', 'mask'], threshold: 6 },
    options: [
      { id: 'a', text: '先想自己是不是做错了什么。',
        scores: { pride: 2, spite: 1 } },
      { id: 'b', text: '观察一段时间，确认不是自己多想。',
        scores: { mask: 2, trap: 1, judge: 1 } },
      { id: 'c', text: '直接问清楚，不想猜。',
        scores: { spark: 1, speed: 1, filter: -1 } },
      { id: 'd', text: '那就各自安好，不必勉强。',
        scores: { bunker: 2, filter: 2, orbit: -1 } },
    ]
  },
  {
    id: 'adapt_defend_2',
    prompt: '你觉得自己最该被改进的地方是？',
    category: 'adaptive',
    condition: { type: 'high_score', dimensions: ['bunker', 'mask'], threshold: 6 },
    options: [
      { id: 'a', text: '脾气太冲，容易当场爆炸。',
        scores: { spark: 2, speed: 1, filter: -1 } },
      { id: 'b', text: '太能忍，忍到最后突然爆发更吓人。',
        scores: { spite: 2, bunker: 1, mask: 1 } },
      { id: 'c', text: '太敏感，别人无心的话我能脑补出一部剧。',
        scores: { pride: 2, leak: 1, trap: 1 } },
      { id: 'd', text: '太懒，不想改，改了就不是我了。',
        scores: { filter: 1, chaos: 1, absurdity: 1 } },
    ]
  },

  // --- 高社交分支（orbit/chaos 高分触发）---
  {
    id: 'adapt_social_1',
    prompt: '朋友说"随便吃点吧"，你脑内翻译成？',
    category: 'adaptive',
    condition: { type: 'high_score', dimensions: ['orbit', 'chaos'], threshold: 5 },
    options: [
      { id: 'a', text: '行，那我来拍板。',
        scores: { gravity: 2, speed: 1 } },
      { id: 'b', text: '又来了，最后还是要我做决定。',
        scores: { spite: 1, judge: 1, mask: 1 } },
      { id: 'c', text: '那我提一个离谱点的试试。',
        scores: { chaos: 2, absurdity: 2 } },
      { id: 'd', text: '随便最好，我不想社交型点餐。',
        scores: { filter: 2, orbit: -1 } },
    ]
  },
  {
    id: 'adapt_social_2',
    prompt: '你最像哪类朋友？',
    category: 'adaptive',
    condition: { type: 'high_score', dimensions: ['orbit', 'chaos'], threshold: 5 },
    options: [
      { id: 'a', text: '冲锋型，先上再说。',
        scores: { speed: 2, spark: 2 } },
      { id: 'b', text: '稳场型，看起来温和其实很有主见。',
        scores: { gravity: 2, mask: 1, trap: 1 } },
      { id: 'c', text: '节目型，专门负责把局做活。',
        scores: { chaos: 2, orbit: 2 } },
      { id: 'd', text: '游离型，有需要时会出现。',
        scores: { bunker: 1, filter: 1, orbit: -1 } },
    ]
  },

  // --- 高记仇分支（spite/trap 高分触发）---
  {
    id: 'adapt_grudge_1',
    prompt: '你交朋友最看重什么？',
    category: 'adaptive',
    condition: { type: 'high_score', dimensions: ['spite', 'trap'], threshold: 6 },
    options: [
      { id: 'a', text: '真诚，不能当面一套背后一套。',
        scores: { judge: 1, spite: 1, pride: 1 } },
      { id: 'b', text: '有趣，无聊的人我处不下去。',
        scores: { chaos: 1, orbit: 1, absurdity: 1 } },
      { id: 'c', text: '靠谱，关键时刻能找到人。',
        scores: { gravity: 1, mask: 1, spite: 1 } },
      { id: 'd', text: '边界感，互相不越界才长久。',
        scores: { filter: 2, bunker: 1, trap: 1 } },
    ]
  },
  {
    id: 'adapt_grudge_2',
    prompt: '最适合形容你聊天状态的是？',
    category: 'adaptive',
    condition: { type: 'high_score', dimensions: ['spite', 'trap'], threshold: 6 },
    options: [
      { id: 'a', text: '高频输出，偶尔嘴刹失灵。',
        scores: { spark: 1, filter: -1, speed: 1, leak: 1 } },
      { id: 'b', text: '少说，但说了通常不轻。',
        scores: { gravity: 2, venom: 1, trap: 1 } },
      { id: 'c', text: '专门负责把普通话题聊成事故。',
        scores: { chaos: 2, absurdity: 1, venom: 1 } },
      { id: 'd', text: '看心情上线，不在线时谁都别找。',
        scores: { orbit: -1, bunker: 1, filter: 2 } },
    ]
  },

  // --- 高荒谬分支（absurdity/chaos 高分触发）---
  {
    id: 'adapt_absurd_1',
    prompt: '如果你是公司领导，你的团队氛围会是？',
    category: 'adaptive',
    condition: { type: 'high_score', dimensions: ['absurdity', 'chaos'], threshold: 6 },
    options: [
      { id: 'a', text: '狼性文化，卷死同行那种。',
        scores: { gravity: 2, spark: 1, pride: 1 } },
      { id: 'b', text: '扁平化管理，但产出必须硬。',
        scores: { judge: 2, mask: 1, trap: 1 } },
      { id: 'c', text: '轻松愉快，但ddl是死线。',
        scores: { chaos: 1, orbit: 1 } },
      { id: 'd', text: '散养模式，能者多劳就行。',
        scores: { filter: 1, absurdity: 1, bunker: 1 } },
    ]
  },
  {
    id: 'adapt_absurd_2',
    prompt: '你在感情里最容易犯的错是？',
    category: 'adaptive',
    condition: { type: 'high_score', dimensions: ['absurdity', 'chaos'], threshold: 6 },
    options: [
      { id: 'a', text: '太投入，把自己搞得很卑微。',
        scores: { leak: 2, pride: 1, orbit: 1 } },
      { id: 'b', text: '太理性，显得冷漠没有温度。',
        scores: { judge: 2, filter: 1, mask: 1 } },
      { id: 'c', text: '太作，用各种方式试探对方的底线。',
        scores: { trap: 2, chaos: 1, absurdity: 1 } },
      { id: 'd', text: '太能忍，明明不舒服还硬撑。',
        scores: { bunker: 2, mask: 1, spite: 1 } },
    ]
  },

  // --- 高骄傲分支（pride/gravity 高分触发）---
  {
    id: 'adapt_pride_1',
    prompt: '下面哪种夸奖最像在夸你？',
    category: 'adaptive',
    condition: { type: 'high_score', dimensions: ['pride', 'gravity'], threshold: 5 },
    options: [
      { id: 'a', text: '你真会来事。',
        scores: { orbit: 2, spark: 1, mask: 1 } },
      { id: 'b', text: '你其实很能扛场。',
        scores: { gravity: 2, bunker: 1, pride: 1 } },
      { id: 'c', text: '跟你在一起真有戏看。',
        scores: { chaos: 2, orbit: 1 } },
      { id: 'd', text: '你一个人也能过得挺好。',
        scores: { filter: 1, bunker: 1, orbit: -1 } },
    ]
  },
  {
    id: 'adapt_pride_2',
    prompt: '你人生最大的软肋是什么？',
    category: 'adaptive',
    condition: { type: 'high_score', dimensions: ['pride', 'gravity'], threshold: 5 },
    options: [
      { id: 'a', text: '玻璃心，被批评就容易破防。',
        scores: { pride: 2, leak: 1, bunker: 1 } },
      { id: 'b', text: '讨好型人格，很难拒绝别人。',
        scores: { mask: 2, orbit: 1, filter: -1 } },
      { id: 'c', text: '三分钟热度，做什么都半途而废。',
        scores: { speed: 1, chaos: 1, leak: 1 } },
      { id: 'd', text: '选择困难症，小事也要纠结半天。',
        scores: { trap: 1, filter: 1, bunker: 1 } },
    ]
  },

  // ================================================================
  // 第四幕：搞怪彩蛋题（4题，每人随机遇到2题）
  // ================================================================

  {
    id: 'funny_01',
    prompt: '🧟 丧尸末日来了！你在幸存者小队里的角色是？',
    category: 'funny',
    funnyGroup: 1,
    options: [
      { id: 'a', text: '指挥官——虽然嗓门最大不代表最靠谱，但大伙确实跟着我走。',
        scores: { gravity: 2, spark: 1, pride: 1 } },
      { id: 'b', text: '军师——我不冲前面，但路线和物资全是我规划的。',
        scores: { trap: 2, mask: 1, judge: 1 } },
      { id: 'c', text: '气氛组——世界都要毁灭了，再不乐呵一下来不及了。',
        scores: { chaos: 2, absurdity: 2, orbit: 1 } },
      { id: 'd', text: '独狼——你们先走，我自己探个路。',
        scores: { bunker: 2, filter: 1, orbit: -2 } },
    ]
  },
  {
    id: 'funny_02',
    prompt: '🍳 如果你是一道菜，你觉得自己是？',
    category: 'funny',
    funnyGroup: 1,
    options: [
      { id: 'a', text: '麻辣火锅——刺激、热烈、挑战性极强，吃完让人又爽又后悔。',
        scores: { spark: 2, venom: 1, chaos: 1 } },
      { id: 'b', text: '日式怀石料理——精致含蓄，每一口都是暗中较劲。',
        scores: { mask: 2, trap: 1, gravity: 1 } },
      { id: 'c', text: '疯狂星期四——你永远不知道今天会出什么整活。',
        scores: { chaos: 2, absurdity: 2, orbit: 1 } },
      { id: 'd', text: '一碗白粥——看着平常，但独处时最治愈。',
        scores: { filter: 2, bunker: 1, orbit: -1 } },
    ]
  },
  {
    id: 'funny_03',
    prompt: '🎮 如果人生是一款游戏，你给自己打的差评是？',
    category: 'funny',
    funnyGroup: 2,
    options: [
      { id: 'a', text: '"角色攻击力太高，队友经常被误伤。" ⭐⭐',
        scores: { venom: 2, spark: 1, filter: -1 } },
      { id: 'b', text: '"剧情太深沉，支线任务全是复仇。" ⭐⭐',
        scores: { spite: 2, trap: 1, mask: 1 } },
      { id: 'c', text: '"Bug太多，NPC根本跟不上主角的节奏。" ⭐⭐',
        scores: { chaos: 2, absurdity: 1, speed: 1 } },
      { id: 'd', text: '"单机模式太舒服，联机功能形同虚设。" ⭐⭐',
        scores: { orbit: -2, bunker: 2, filter: 1 } },
    ]
  },
  {
    id: 'funny_04',
    prompt: '🐱 你的猫（假设你有猫）最可能对你的评价是？',
    category: 'funny',
    funnyGroup: 2,
    options: [
      { id: 'a', text: '"这个人声音太大了，建议静音。"',
        scores: { spark: 1, filter: -1, venom: 1 } },
      { id: 'b', text: '"看着温顺但疑似在密谋什么。"',
        scores: { mask: 1, trap: 2, spite: 1 } },
      { id: 'c', text: '"经常做出匪夷所思的事，但不无聊。"',
        scores: { chaos: 2, absurdity: 1 } },
      { id: 'd', text: '"同类。我懂你需要独处。"',
        scores: { bunker: 1, filter: 1, orbit: -1 } },
    ]
  },

  // ================================================================
  // 第五幕：终极哲理反思题（3题，每人做最后2题收尾）
  // ================================================================

  {
    id: 'philo_01',
    prompt: '🌊 如果可以选择，你更愿意成为一个什么样的人？',
    category: 'philosophy',
    philoGroup: 1,
    options: [
      { id: 'a', text: '像火——走到哪里都留下痕迹，哪怕偶尔灼伤人。',
        scores: { spark: 2, venom: 1, pride: 1 } },
      { id: 'b', text: '像水——无形但无处不在，润物细无声地影响局面。',
        scores: { mask: 2, trap: 1, gravity: 1 } },
      { id: 'c', text: '像风——自由且不可预测，去过的地方都起过波澜。',
        scores: { chaos: 2, absurdity: 1, orbit: 1, speed: 1 } },
      { id: 'd', text: '像山——不动声色地存在，时间够久就能被信任。',
        scores: { bunker: 2, gravity: 1, filter: 1 } },
    ]
  },
  {
    id: 'philo_02',
    prompt: '🪞 回顾你迄今为止的人生，你最认同哪句话？',
    category: 'philosophy',
    philoGroup: 1,
    options: [
      { id: 'a', text: '"老实人吃亏"——所以我选择精明且直接。',
        scores: { spark: 1, venom: 1, pride: 1, speed: 1 } },
      { id: 'b', text: '"人心隔肚皮"——所以我学会了不全盘展示自己。',
        scores: { mask: 2, spite: 1, trap: 1 } },
      { id: 'c', text: '"认真你就输了"——所以我选择用荒诞对抗无聊。',
        scores: { chaos: 2, absurdity: 2 } },
      { id: 'd', text: '"独处是最高级的社交"——所以我坚持保护自己的边界。',
        scores: { bunker: 2, filter: 2, orbit: -1 } },
    ]
  },
  {
    id: 'philo_03',
    prompt: '🔮 如果此刻有人看穿了你所有的伪装，你会？',
    category: 'philosophy',
    philoGroup: 2,
    options: [
      { id: 'a', text: '那就摊牌吧——反正我本来也不太在乎面具。',
        scores: { spark: 1, filter: -1, leak: 2 } },
      { id: 'b', text: '微笑但不回应——被看穿不代表我要承认。',
        scores: { mask: 2, trap: 1, gravity: 1 } },
      { id: 'c', text: '反手开个玩笑把话题岔开——笑着躲过灵魂审判。',
        scores: { chaos: 1, absurdity: 1, orbit: 1 } },
      { id: 'd', text: '感到安心——终于有人不需要我解释了。',
        scores: { bunker: -1, leak: 1, pride: 1, filter: 1 } },
    ]
  },
];

// ============================================================
// 题目路由引擎 v3.0
// ============================================================

export function getQuestionById(id) {
  return questions.find(q => q.id === id);
}

export function getFirstQuestionId() {
  return questions[0].id;
}

/**
 * 构建自适应答题路径
 * @param {Object} answers - 已有答案 { questionId: optionId }
 * @returns {string[]} - 有序的题目ID列表
 */
export function buildQuestionPath(answers) {
  const path = [];
  const currentScores = calculateIntermediateScores(answers);

  // 阶段1：MBTI 先导题（v3.0: 全部顺序走，不再分支）
  const mbtiQuestions = questions.filter(q => q.category === 'mbti');
  for (const q of mbtiQuestions) {
    path.push(q.id);
  }

  // 阶段2：核心题（按顺序走）
  const coreQuestions = questions.filter(q => q.category === 'core');
  for (const q of coreQuestions) {
    path.push(q.id);
  }

  // 阶段3：自适应题（根据当前分数决定）
  const adaptiveQuestions = questions.filter(q => q.category === 'adaptive');
  let adaptiveCount = 0;
  const maxAdaptive = 4;
  for (const q of adaptiveQuestions) {
    if (adaptiveCount >= maxAdaptive) break;
    if (shouldShowAdaptive(q, currentScores)) {
      path.push(q.id);
      adaptiveCount++;
    }
  }

  // 如果自适应不够4题，补充剩余的
  if (adaptiveCount < maxAdaptive) {
    for (const q of adaptiveQuestions) {
      if (adaptiveCount >= maxAdaptive) break;
      if (!path.includes(q.id)) {
        path.push(q.id);
        adaptiveCount++;
      }
    }
  }

  // 阶段4：搞怪题（每组选1题，共2题）
  const funnyGroups = {};
  questions.filter(q => q.category === 'funny').forEach(q => {
    if (!funnyGroups[q.funnyGroup]) funnyGroups[q.funnyGroup] = [];
    funnyGroups[q.funnyGroup].push(q);
  });
  for (const groupId of Object.keys(funnyGroups)) {
    const group = funnyGroups[groupId];
    // 用答案数量做种子实现伪随机（确保同一用户路径一致）
    const seed = Object.keys(answers).length;
    const pick = group[seed % group.length];
    path.push(pick.id);
  }

  // 阶段5：哲理收尾题（每组选1题，共2题）
  const philoGroups = {};
  questions.filter(q => q.category === 'philosophy').forEach(q => {
    if (!philoGroups[q.philoGroup]) philoGroups[q.philoGroup] = [];
    philoGroups[q.philoGroup].push(q);
  });
  for (const groupId of Object.keys(philoGroups)) {
    const group = philoGroups[groupId];
    const seed = Object.keys(answers).length + 7;
    const pick = group[seed % group.length];
    path.push(pick.id);
  }

  return path;
}

/**
 * 计算中间分数（用于自适应路由）
 */
function calculateIntermediateScores(answers) {
  const scores = {};
  for (const [qId, optId] of Object.entries(answers)) {
    const q = getQuestionById(qId);
    if (!q) continue;
    const opt = q.options.find(o => o.id === optId);
    if (!opt?.scores) continue;
    for (const [dim, val] of Object.entries(opt.scores)) {
      scores[dim] = (scores[dim] || 0) + val;
    }
  }
  return scores;
}

/**
 * 判断自适应题是否应该出现
 */
function shouldShowAdaptive(question, scores) {
  if (!question.condition) return false;
  const { type, dimensions, threshold } = question.condition;
  if (type === 'high_score') {
    const total = dimensions.reduce((sum, d) => sum + (scores[d] || 0), 0);
    return total >= threshold;
  }
  return false;
}

// Legacy compatibility wrapper
export function getNextQuestionId(currentId, selectedOptionId) {
  const current = getQuestionById(currentId);
  if (!current) return null;
  const option = current.options.find(o => o.id === selectedOptionId);
  if (option?.nextId) return option.nextId;
  return null; // path-based routing handles the rest
}
