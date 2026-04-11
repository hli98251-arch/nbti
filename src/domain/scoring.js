// ============================================================
// NBTI 计分引擎 v2.0
// 两阶段人格匹配：MBTI一级分类 + 维度二级微调
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
// 阶段二：确定 MBTI 类型
// ============================================================

function determineMbtiType(mbtiScores) {
  const e_or_i = mbtiScores.ei >= 0 ? 'E' : 'I';
  const s_or_n = mbtiScores.sn >= 0 ? 'N' : 'S';
  const t_or_f = mbtiScores.tf >= 0 ? 'F' : 'T';
  const j_or_p = mbtiScores.jp >= 0 ? 'P' : 'J';
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
  const mbtiType = determineMbtiType(mbtiScores);
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
