(() => {
  const D=window.EMERGENCY_DATA;if(!D)return;
  const pushUnique=(arr,...items)=>items.forEach(x=>{if(!arr.includes(x))arr.push(x);});
  pushUnique(D.diagnosis,'社区获得性肺炎（成人）','急性肾损伤','急性肾盂肾炎');
  pushUnique(D.flows,'肺炎严重度与转诊流程','AKI快速评估流程');
  pushUnique(D.records,'肺炎记录','AKI记录','急性肾盂肾炎记录');
})();
