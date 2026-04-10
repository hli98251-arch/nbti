export function buildShareText(result, currentUrl) {
  const safeResult = result ?? {};
  const code = safeResult.code ?? 'WIP';
  const title = safeResult.title ?? '施工嘴替';
  const hook = safeResult.hook ?? '我刚做完 NBTI。';
  const confidence = safeResult.confidence ?? '88%';

  return `NBTI 结果：${code} / ${title}\n${hook}\n匹配标记：${confidence}\n${currentUrl}`;
}
