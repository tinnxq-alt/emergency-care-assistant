(() => {
  const D=window.EMERGENCY_DATA;if(!D)return;
  const addUnique=(arr,items)=>items.forEach(x=>{if(!arr.includes(x))arr.push(x);});
  addUnique(D.diagnosis,['症状性心动过缓','规则窄QRS心动过速','宽QRS心动过速（有脉）','房颤/房扑伴快速心室率']);
  addUnique(D.flows,['成人有脉心动过缓','成人有脉心动过速']);
  addUnique(D.records,['心律失常记录']);
})();