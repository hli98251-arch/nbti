export const dimensions = [
  // ============================================================
  // MBTI 四维度（一级分类用）
  // ============================================================
  {
    id: 'ei',
    name: '外内维度',
    highLabel: '外向 (E)',
    lowLabel: '内向 (I)',
    description: '衡量你的能量是来自外部世界的互动，还是内心世界的独处。',
    isMbti: true,
  },
  {
    id: 'sn',
    name: '感直维度',
    highLabel: '直觉 (N)',
    lowLabel: '实感 (S)',
    description: '衡量你更关注眼前的细节事实，还是未来的可能性与模式。',
    isMbti: true,
  },
  {
    id: 'tf',
    name: '思情维度',
    highLabel: '情感 (F)',
    lowLabel: '思考 (T)',
    description: '衡量你做决定时更依赖逻辑分析，还是个人价值和情感。',
    isMbti: true,
  },
  {
    id: 'jp',
    name: '判知维度',
    highLabel: '感知 (P)',
    lowLabel: '判断 (J)',
    description: '衡量你是喜欢有计划有条理，还是偏好灵活应变随遇而安。',
    isMbti: true,
  },

  // ============================================================
  // 15 性格维度（二级微调用）
  // ============================================================
  {
    id: 'spark',
    name: '起火值',
    highLabel: '一点就着',
    lowLabel: '懒得翻脸',
    description: '衡量你在情绪、观点和社交摩擦里到底有多容易起势。',
  },
  {
    id: 'mask',
    name: '装相值',
    highLabel: '体面优先',
    lowLabel: '嘴比脑快',
    description: '衡量你是先管理形象，还是先让现场感受你的真实脾气。',
  },
  {
    id: 'chaos',
    name: '整活值',
    highLabel: '主动搞事',
    lowLabel: '按部就班',
    description: '衡量你面对无聊和秩序时，到底更想创新还是更想掀桌。',
  },
  {
    id: 'gravity',
    name: '压场值',
    highLabel: '自带气压',
    lowLabel: '存在柔和',
    description: '衡量你一进场时，是让别人收声还是让大家继续各聊各的。',
  },
  {
    id: 'filter',
    name: '嘴滤值',
    highLabel: '话到嘴边会刹车',
    lowLabel: '想到什么说什么',
    description: '衡量你在表达时到底有没有内置减震器。',
  },
  {
    id: 'orbit',
    name: '社交引力',
    highLabel: '人会围过来',
    lowLabel: '更爱单飞',
    description: '衡量你在关系里是天然聚人，还是擅长一个人安静掌控节奏。',
  },
  {
    id: 'spite',
    name: '记仇续航',
    highLabel: '旧账超长待机',
    lowLabel: '气过就散',
    description: '衡量你把不爽留在心里的时间，到底是分钟级还是季度级。',
  },
  {
    id: 'absurdity',
    name: '荒谬感',
    highLabel: '脑回路离地',
    lowLabel: '现实主义',
    description: '衡量你处理生活时更像一个策划案，还是一段即兴喜剧。',
  },
  {
    id: 'venom',
    name: '毒舌值',
    highLabel: '出口成刀',
    lowLabel: '嘴下留德',
    description: '衡量你在对话中到底是救人还是补刀。',
  },
  {
    id: 'bunker',
    name: '城墙值',
    highLabel: '防御拉满',
    lowLabel: '全身都是弱点',
    description: '衡量你面对攻击时是反击还是先缩。',
  },
  {
    id: 'speed',
    name: '上头值',
    highLabel: '先干再说',
    lowLabel: '深思熟虑',
    description: '衡量你在刺激面前是秒级反应还是小时级延迟。',
  },
  {
    id: 'pride',
    name: '自尊值',
    highLabel: '玻璃心重度',
    lowLabel: '脸皮厚过城墙',
    description: '衡量你到底有多在意别人的眼光。',
  },
  {
    id: 'trap',
    name: '陷阱值',
    highLabel: '挖坑达人',
    lowLabel: '直肠子',
    description: '衡量你说话是留后路还是直接亮底牌。',
  },
  {
    id: 'judge',
    name: '审判值',
    highLabel: '看谁都有病',
    lowLabel: '人均菩萨',
    description: '衡量你看到别人犯错时是帮忙还是审判。',
  },
  {
    id: 'leak',
    name: '泄露值',
    highLabel: '藏不住秘密',
    lowLabel: '保险箱成精',
    description: '衡量你到底是嘴巴严还是移动的情报站。',
  },
];

// 便利函数
export function getMbtiDimensions() {
  return dimensions.filter(d => d.isMbti);
}

export function getPersonalityDimensions() {
  return dimensions.filter(d => !d.isMbti);
}