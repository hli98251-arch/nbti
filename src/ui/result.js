import { navigateTo } from '../app/router.js';
import { copyTextToClipboard } from '../share/clipboard.js';
import { buildShareText } from '../share/share-text.js';

const fallbackResult = {
  code: 'WIP',
  title: '施工嘴替',
  hook: '你的人格暂时还没被算法正式骂到位。',
  confidence: '88%',
  mbtiType: '????',
  systemRemark: '系统备注：当前是基础重构阶段。',
  friendshipWarning: '友情提示：先把流程跑通，再让文案全面开火。',
  selfAwareDisclaimer: '自我提示：这不是诊断，只是娱乐测试。',
  shareSnippet: '我在 NBTI 拿到一个施工中的人格标签。',
  dimensions: [],
  summary: '结果页骨架、海报区和重测流已落位，完整人格解释会继续增强。'
};

function renderMbtiCard(result) {
  if (!result.mbtiType || result.mbtiType === '????') return '';

  const mbtiLabels = {
    E: '外向', I: '内向',
    N: '直觉', S: '实感',
    F: '情感', T: '思考',
    P: '感知', J: '判断',
  };

  const letters = result.mbtiType.split('');
  return `
    <div class="mbti-card">
      <h3>📊 MBTI 倾向</h3>
      <div class="mbti-type-display">${result.mbtiType}</div>
      <div class="mbti-breakdown">
        ${letters.map(l => `<span class="mbti-letter">${l} <small>${mbtiLabels[l] || ''}</small></span>`).join('')}
      </div>
    </div>
  `;
}

function renderDimensionsGrid(result) {
  if (!Array.isArray(result.dimensions) || result.dimensions.length === 0) {
    return '<p class="meta">维度结果将在完整评分链路中展示。</p>';
  }

  // 找到维度分的最大绝对值，用于归一化
  const allScores = result.dimensions.map(d => Math.abs(d.score));
  const maxScore = Math.max(...allScores, 1); // 至少为1防除0

  return `
    <div class="dimensions-grid">
      ${result.dimensions.map((dimension) => {
        // 用分数的绝对值占最大分的比例来表示强度
        const absScore = Math.abs(dimension.score);
        const intensity = Math.round((absScore / maxScore) * 100);
        const barWidth = Math.min(100, Math.max(5, intensity));
        const isHigh = dimension.score > 0;

        return `
          <div class="dimension-card">
            <div class="dimension-name">${dimension.name}</div>
            <div class="dimension-score">
              ${isHigh ? dimension.highLabel : dimension.lowLabel}
              <span style="color: var(--accent-strong); font-weight: 600;">(${dimension.score >= 0 ? '+' : ''}${dimension.score})</span>
            </div>
            <div class="dimension-bar">
              <div class="dimension-bar-fill ${isHigh ? 'high' : ''}" style="width: ${barWidth}%"></div>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

function renderAuthorCredit() {
  return `
    <div class="author-credit">
      <p>改版作者：<span class="author-name">hli98</span></p>
      <p class="disclaimer">本测试仅供娱乐，别拿它当诊断、面试、相亲、分手、招魂、算命或人生判决书。<br>解释难免偶尔不准，不过既然改版作者是个苦逼程序员，大家一定会原谅我的，对吧！！</p>
    </div>
  `;
}

export function renderResultShell(rootElement, appState) {
  const result = appState.result ?? fallbackResult;

  rootElement.innerHTML = `
    <main class="screen screen--result">
      <section class="poster-card" data-testid="result-poster">
        <div class="archetype-character-container">
          <img src="${import.meta.env.BASE_URL}assets/archetypes/${result.code}.jpg" alt="${result.title} 人物模型" class="archetype-character" />
        </div>
        <p class="eyebrow">NBTI 人格测试</p>
        <span class="result-type-code">${result.code}</span>
        <span class="result-type-title">${result.title}</span>
        <p class="hook">${result.hook}</p>
        <div class="confidence-badge">
          匹配度 <span class="confidence-value">${result.confidence}</span>
        </div>
      </section>
      ${renderMbtiCard(result)}
      <section class="panel-card">
        <h3>系统备注</h3>
        <p>${result.systemRemark}</p>
        <p>${result.friendshipWarning}</p>
        <p>${result.selfAwareDisclaimer}</p>
        <div class="dimensions-section">
          <h3>十五维度评分</h3>
          ${renderDimensionsGrid(result)}
        </div>
        <p style="margin-top: 24px;">${result.summary}</p>
        <div class="result-actions">
          <button class="primary-button" type="button" data-action="copy-result">复制结果文案</button>
          <button class="secondary-button" type="button" data-action="restart">重新测试</button>
          <button class="secondary-button" type="button" data-action="go-home">回到首页</button>
        </div>
        <p class="copy-status" data-testid="copy-status"></p>
      </section>
      ${renderAuthorCredit()}
    </main>
  `;

  const statusElement = rootElement.querySelector('[data-testid="copy-status"]');

  rootElement.querySelector('[data-action="copy-result"]')?.addEventListener('click', async () => {
    const shareText = buildShareText(result, window.location.href);
    const success = await copyTextToClipboard(shareText);
    if (statusElement) {
      statusElement.textContent = success ? '复制成功，快去群里整活。' : '复制失败，请手动截图分享。';
      statusElement.className = success ? 'copy-status success' : 'copy-status error';
    }
  });

  rootElement.querySelector('[data-action="restart"]')?.addEventListener('click', () => {
    appState.reset();
    navigateTo('/');
  });

  rootElement.querySelector('[data-action="go-home"]')?.addEventListener('click', () => {
    navigateTo('/');
  });
}
