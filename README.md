# NBTI Static Rebuild

NBTI 是一个纯静态的娱乐型人格测试项目，目标是做成适合朋友互测、截图转发、复制结果的毒舌风格产品。匹配原始 SBTI 网站风格。

## Current Status (v3)
- 31 题答题流程已上线，支持进度条显示、回看修改、未完成禁提交
- 15 维评分与 16 人格映射已接入，提交后生成真实结果对象
- 结果页显示匹配度百分比（92% 风格）+ 十五维度评分分解
- 匹配原始 SBTI 网站 UI 风格：暗黑主题、激进文案、人格卡片
- Vitest（13 项）和 Playwright（3 项）均通过
- Project memory 已配置在 `.memory/memory.json`

## Commands
- `npm install`
- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm test`
- `npm run test:e2e`

## Architecture
- `src/app` - app bootstrapping, hash routing, state orchestration
- `src/content` - questions (31), dimensions (15), archetypes (16), content rules
- `src/domain` - schema validation and deterministic scoring
- `src/ui` - landing/quiz/result rendering
- `src/share` - share text formatter and clipboard helper
- `src/storage` - localStorage persistence
- `src/styles` - base and responsive styling

## Memory File
Project memory is stored at `.memory/memory.json`.

Memory update rules:
- 题量、维度、人格、评分链路变化必须同步更新
- 分享策略变化必须同步更新
- memory 只用于项目知识与决策记录，不作为运行时业务数据源

## Guardrails
- 不复制参考站文案、标签、素材和人格命名
- 保持娱乐毒舌风格，但禁止受保护群体攻击、诊断化语言、自伤导向
- v1 不引入后端依赖
