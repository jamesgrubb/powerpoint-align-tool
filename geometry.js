export const commands = [
 ['left','Align left','Alt+A'],['center','Align horizontal centers','Alt+H'],['right','Align right','Alt+D'],
 ['top','Align top','Alt+W'],['middle','Align vertical centers','Alt+V'],['bottom','Align bottom','Alt+S'],
 ['distributeX','Distribute horizontal gaps','Alt+Shift+H'],['distributeY','Distribute vertical gaps','Alt+Shift+V'],
];
export function transform(action, shapes, {bounds} = {}) {
 if (!commands.some(c => c[0] === action)) throw Error('Unknown command.');
 if (!shapes.length) throw Error('Select objects on one slide first.');
 for (const s of shapes) if (!['left','top','width','height'].every(k => Number.isFinite(s[k])) || s.width < 0 || s.height < 0) throw Error('Invalid object dimensions.');
 const result = shapes.map(s => ({...s}));
 if (action.startsWith('distribute')) {
  if (result.length < 3) throw Error('Select at least three objects to distribute.');
  const p = action === 'distributeX' ? 'left' : 'top', d = p === 'left' ? 'width' : 'height';
  const sorted = [...result].sort((a,b) => a[p]-b[p]);
  const first = sorted[0], last = sorted.at(-1);
  const gap = (last[p]+last[d]-first[p]-sorted.reduce((sum,s)=>sum+s[d],0))/(sorted.length-1);
  if (gap < 0) throw Error('Objects need more room for equal non-overlapping gaps. Spread the outer objects apart.');
  let cursor=first[p]; for (const s of sorted) { s[p]=cursor; cursor+=s[d]+gap; }
 } else {
  if (!bounds && shapes.length < 2) throw Error('Select at least two objects, or choose Slide as the target.');
  const b = bounds || {left:Math.min(...shapes.map(s=>s.left)),top:Math.min(...shapes.map(s=>s.top)),right:Math.max(...shapes.map(s=>s.left+s.width)),bottom:Math.max(...shapes.map(s=>s.top+s.height))};
  if (!['left','top','right','bottom'].every(k=>Number.isFinite(b[k]))) throw Error('Invalid alignment bounds.');
  for (const s of result) {
   if(action==='left') s.left=b.left;
   if(action==='right') s.left=b.right-s.width;
   if(action==='center') s.left=(b.left+b.right-s.width)/2;
   if(action==='top') s.top=b.top;
   if(action==='bottom') s.top=b.bottom-s.height;
   if(action==='middle') s.top=(b.top+b.bottom-s.height)/2;
  }
 }
 return result;
}
