import { navigateTo } from '../app/router.js';
import { copyTextToClipboard } from '../share/clipboard.js';
import { buildShareText } from '../share/share-text.js';
import { dimensions } from '../content/dimensions.js';

const fallbackResult = {
  code: 'WIP',
  title: '施工嘴替',
  hook: '你的人格暂时还没被算法正式骂到位。',
  confidence: '88%',
  systemRemark: '系统备注：当前是基础重构阶段。',
  friendshipWarning: '友情提示：先把流程跑通，再让文案全面开火。',
  selfAwareDisclaimer: '自我提示：这不是诊断，只是娱乐测试。',
  shareSnippet: '我在 NBTI 拿到一个施工中的人格标签。',
  dimensions: [],
  summary: '结果页骨架、海报区和重测流已落位，完整人格解释会继续增强。'
};

function renderDimensionsGrid(result) {
  if (!Array.isArray(result.dimensions) || result.dimensions.length === 0) {
    return '<p class="meta">维度结果将在完整评分链路中展示。</p>';
  }

  // Calculate the average expected score across 15 dimensions
  const totalAnswers = result.totalAnswers || 31;
  const expectedAverage = (totalAnswers * 4) / 15;

  return `
    <div class="dimensions-grid">
      ${result.dimensions.map((dimension) => {
        // Normalize: (Individual Score / Expected Average) * 100
        // 100% means explicitly "Average". 
        let indexRatio = Math.round((dimension.score / expectedAverage) * 100);
        // Clamp safely to max 200% requested
        indexRatio = Math.min(200, Math.max(0, indexRatio));
        
        // Ensure physical bar width doesn't overflow container: maps 0-200% range to 0-100% visual box width
        const barWidth = indexRatio / 2;
        const isHigh = indexRatio >= 100; // Above or equal to expected average

        return `
          <div class="dimension-card">
            <div class="dimension-name">${dimension.name}</div>
            <div class="dimension-score">
              ${isHigh ? dimension.highLabel : dimension.lowLabel}
              <span style="color: var(--accent-strong); font-weight: 600;">(${indexRatio}%)</span>
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
          <img src="${import.meta.env.BASE_URL}assets/archetypes/${result.code}.png" alt="${result.title} 人物模型" class="archetype-character" />
        </div>
        <p class="eyebrow">NBTI 人格测试</p>
        <span class="result-type-code">${result.code}</span>
        <span class="result-type-title">${result.title}</span>
        <p class="hook">${result.hook}</p>
        <div class="confidence-badge">
          匹配度 <span class="confidence-value">${result.confidence}</span>
        </div>
      </section>
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
