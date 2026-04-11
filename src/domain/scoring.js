// ============================================================
// NBTI 计分引擎 v3.0
// 两阶段人格匹配：MBTI一级分类 + 维度二级微调
// v3.0 改进：MBTI 模糊带检测 + 性格维度辅助判定 + 置信度优化
// ============================================================

import { archetypes } from '../content/archetypes.js';
import { dimensions, getPersonalityDimensions } from '../content/dimensions.js';
import { getQuestionById } from '../content/questions.js';

// ============================================================
// 阶段一：按题目选项的独立标注计分
// ============================================================

function scoreAnswers(answers) {
  const personalityScores = {};
  const mbtiScores = { ei: 0, sn: 0, tf: 0, jp: 0 };

  // 初始化所有维度为 0
  for (const dim of dimensions) {
    if (!dim.isMbti) {
      personalityScores[dim.id] = 0;
    }
  }

  for (const [questionId, optionId] of Object.entries(answers)) {
    const question = getQuestionById(questionId);
    if (!question) continue;

    const option = question.options.find(o => o.id === optionId);
    if (!option) continue;

    // 累加性格维度分
    if (option.scores) {
      for (const [dimId, weight] of Object.entries(option.scores)) {
        if (dimId in personalityScores) {
          personalityScores[dimId] += weight;
        }
      }
    }

    // 累加 MBTI 维度分
    if (option.mbti) {
      for (const [dimId, weight] of Object.entries(option.mbti)) {
        if (dimId in mbtiScores) {
          mbtiScores[dimId] += weight;
        }
      }
    }
  }

  return { personalityScores, mbtiScores };
}

// ============================================================
// 阶段二：确定 MBTI 类型（v3.0 增强版）
// ============================================================

/**
 * v3.0: 当 MBTI 某维度分数落在 "模糊带"（-2 到 +2）时，
 * 结合性格维度分数做辅助判断，减少随机翻转。
 */
function determineMbtiType(mbtiScores, personalityScores) {
  const FUZZY_THRESHOLD = 2; // 模糊带阈值

  // E/I 辅助判断：orbit（社交引力）正值偏E，负值偏I
  let eiScore = mbtiScores.ei;
  if (Math.abs(eiScore) <= FUZZY_THRESHOLD) {
    const orbitHint = (personalityScores.orbit ?? 0) * 0.3;
    eiScore += orbitHint;
  }

  // S/N 辅助判断：absurdity（荒谬感）正值偏N，chaos也稍偏N
  let snScore = mbtiScores.sn;
  if (Math.abs(snScore) <= FUZZY_THRESHOLD) {
    const absurdityHint = (personalityScores.absurdity ?? 0) * 0.25;
    snScore += absurdityHint;
  }

  // T/F 辅助判断：venom（毒舌值）正值偏T
  let tfScore = mbtiScores.tf;
  if (Math.abs(tfScore) <= FUZZY_THRESHOLD) {
    const venomHint = (personalityScores.venom ?? 0) * -0.2; // venom高偏T(负)
    tfScore += venomHint;
  }

  // J/P 辅助判断：chaos（整活值）正值偏P，gravity偏J
  let jpScore = mbtiScores.jp;
  if (Math.abs(jpScore) <= FUZZY_THRESHOLD) {
    const chaosHint = (personalityScores.chaos ?? 0) * 0.2;
    const gravityHint = (personalityScores.gravity ?? 0) * -0.2;
    jpScore += chaosHint + gravityHint;
  }

  const e_or_i = eiScore >= 0 ? 'E' : 'I';
  const s_or_n = snScore >= 0 ? 'N' : 'S';
  const t_or_f = tfScore >= 0 ? 'F' : 'T';
  const j_or_p = jpScore >= 0 ? 'P' : 'J';
  return `${e_or_i}${s_or_n}${t_or_f}${j_or_p}`;
}

// ============================================================
// 阶段三：两阶段人格匹配
// ============================================================

function buildArchetypeCandidate(archetype, personalityScores, mbtiType) {
  const [primaryBias, secondaryBias] = archetype.dimensionBias;
  const primaryScore = personalityScores[primaryBias] ?? 0;
  const secondaryScore = personalityScores[secondaryBias] ?? 0;

  // MBTI 亲和度加成：如果用户的 MBTI 类型在该人格的亲和列表中
  let mbtiBonus = 0;
  if (archetype.mbtiAffinity && archetype.mbtiAffinity.includes(mbtiType)) {
    mbtiBonus = 3; // 显著但不压倒性的加成
  }

  return {
    archetype,
    dimensionTotal: primaryScore + secondaryScore,
    total: primaryScore + secondaryScore + mbtiBonus,
    primaryScore,
    secondaryScore,
    mbtiBonus,
  };
}

function selectArchetype(personalityScores, mbtiType) {
  const candidates = archetypes.map(archetype =>
    buildArchetypeCandidate(archetype, personalityScores, mbtiType)
  );

  // 排序策略：
  // 1. total（含 MBTI 加成）降序
  // 2. dimensionTotal（纯维度分）降序
  // 3. primaryScore 降序
  // 4. 字母序兜底
  candidates.sort((a, b) => {
    if (b.total !== a.total) return b.total - a.total;
    if (b.dimensionTotal !== a.dimensionTotal) return b.dimensionTotal - a.dimensionTotal;
    if (b.primaryScore !== a.primaryScore) return b.primaryScore - a.primaryScore;
    return a.archetype.id.localeCompare(b.archetype.id);
  });

  return {
    top: candidates[0],
    second: candidates[1] ?? candidates[0],
    allCandidates: candidates,
  };
}

// ============================================================
// 置信度与维度面板
// ============================================================

function buildConfidence(topScore, secondScore) {
  const spread = Math.max(0, topScore - secondScore);
  const value = Math.min(99, 68 + spread * 3);
  return `${value}%`;
}

function buildDimensionBreakdown(personalityScores) {
  const personalityDims = getPersonalityDimensions();
  return personalityDims.map(dimension => ({
    id: dimension.id,
    name: dimension.name,
    score: personalityScores[dimension.id] ?? 0,
    highLabel: dimension.highLabel,
    lowLabel: dimension.lowLabel,
  }));
}

function buildMbtiBreakdown(mbtiScores) {
  return {
    ei: mbtiScores.ei,
    sn: mbtiScores.sn,
    tf: mbtiScores.tf,
    jp: mbtiScores.jp,
  };
}

// ============================================================
// 主入口
// ============================================================

export function buildResultFromAnswers(answers) {
  if (Object.keys(answers).length < 10) {
    throw new Error('请完成至少10道题再提交。');
  }

  const { personalityScores, mbtiScores } = scoreAnswers(answers);
  // v3.0: 传入性格分做 MBTI 模糊带辅助判定
  const mbtiType = determineMbtiType(mbtiScores, personalityScores);
  const selected = selectArchetype(personalityScores, mbtiType);
  const confidence = buildConfidence(selected.top.total, selected.second.total);

  return {
    code: selected.top.archetype.code,
    title: selected.top.archetype.title,
    hook: selected.top.archetype.hook,
    confidence,
    mbtiType,
    mbtiScores: buildMbtiBreakdown(mbtiScores),
    systemRemark: selected.top.archetype.systemRemark,
    friendshipWarning: selected.top.archetype.friendshipWarning,
    selfAwareDisclaimer: selected.top.archetype.selfAwareDisclaimer,
    shareSnippet: selected.top.archetype.shareSnippet,
    dimensions: buildDimensionBreakdown(personalityScores),
    totalAnswers: Object.keys(answers).length,
    summary: `你的 MBTI 倾向为 ${mbtiType}，核心人格标签 ${selected.top.archetype.code}。当前分维结果已生成，可直接分享。`,
  };
}
