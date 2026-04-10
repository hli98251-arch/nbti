import { navigateTo } from '../app/router.js';

export function renderLanding(rootElement, appState) {
  rootElement.innerHTML = `
    <main class="screen screen--landing">
      <section class="hero-card">
        <div class="landing-character-container">
          <img src="/assets/archetypes/VENM.png" alt="毒舌人物模型" class="landing-character" />
        </div>
        <p class="eyebrow">NBTI / 朋友互测专用</p>
        <h1>SBTI已经过时，<span style="white-space:nowrap">NBTI来了。</span></h1>
        <p class="subtitle">颠覆传统MBTI，毒舌人格新物种。<br>测完直接发群，别当真，别玻璃心。</p>
        <div class="button-row">
          <button class="primary-button" type="button" data-action="start-quiz">开始测狠话</button>
          <button class="secondary-button" type="button" data-action="resume-quiz">继续上次嘴硬</button>
        </div>
        <div class="author-credit" style="margin-top: 40px; padding: 16px;">
          <p>改版作者：<span class="author-name">hli98</span></p>
          <p style="font-size: 0.8rem; opacity: 0.7;">本测试仅供娱乐，别拿它当诊断、面试、相亲、分手、招魂、算命或人生判决书。</p>
          <p style="font-size: 0.8rem; opacity: 0.7;">本改版由 hli98 重构制作。由于作者是个一直被Bug折磨的苦逼人，所以平等地在此嘲弄了各位，在此抱歉！！</p>
        </div>
      </section>
    </main>
  `;

  const startButton = rootElement.querySelector('[data-action="start-quiz"]');
  const resumeButton = rootElement.querySelector('[data-action="resume-quiz"]');

  startButton?.addEventListener('click', () => {
    appState.reset();
    navigateTo('/quiz');
  });

  resumeButton?.addEventListener('click', () => {
    navigateTo('/quiz');
  });
}
