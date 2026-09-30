export const riskRank=r=>r==='Critical'?3:r==='Warning'?2:1;
export const riskIcon=r=>r==='Critical'?'●':r==='Warning'?'▲':'✓';
export const fmt=n=>new Intl.NumberFormat('en-IN').format(Math.round(n));
export const worstRisk=p=>p.medicines.reduce((r,m)=>riskRank(m.risk)>riskRank(r)?m.risk:r,'Normal');
export function healthScore(p){const med=p.medicines.reduce((a,m)=>a+(m.risk==='Normal'?1:m.risk==='Warning'?.7:.35),0)/p.medicines.length,staff=(p.staff.doctorsPresent+p.staff.nursesPresent)/(p.staff.doctorsTotal+p.staff.nursesTotal),bed=1-p.beds.occupied/p.beds.total;return Math.round((med*.5+staff*.25+bed*.25)*100)}
export function medicineStats(phcs){const all=phcs.flatMap(p=>p.medicines);return {availability:all.length?Math.round(all.filter(m=>m.risk==='Normal').length/all.length*100):0}}
export function reasonForRisk(r,f){if(r==='Critical')return `Demand is trending above baseline, with ${f.daysToStockout} days of cover against a ${f.leadTimeDays}-day supplier lead time.`;if(r==='Warning')return `Projected cover is inside the lead-time buffer. Demand and footfall are elevated in this simulation.`;return `Current stock provides a buffer beyond supplier lead time under the simulated demand trend.`}
