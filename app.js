import {commands,transform} from './geometry.js';
const $=id=>document.getElementById(id);
let ready=false,busy=false;
const report=(message,error=false)=>{ $('status').textContent=message; $('status').className=error?'error':''; };
const display=key=>key.replaceAll('Alt','⌥').replaceAll('Shift','⇧').replaceAll('Command','⌘').replaceAll('Ctrl','⌃').replaceAll('+',' ');
for (const [i,[id,label,key]] of commands.entries()) {
 if(i<6)continue;
 const button=document.createElement('button');button.textContent=label;
 const hint=document.createElement('kbd');hint.textContent=display(key);button.append(hint);button.onclick=()=>run(id);
 $('spacing').append(button);
}
function renderKeys(mappings={}) {
 for(const [id,,key] of commands) {
  const nodes=document.querySelectorAll(`[data-shortcut="${id}"]`);
  for(const node of nodes){node.replaceChildren();for(const part of (mappings[id]||key).split('+')){const cap=document.createElement('kbd');cap.textContent=display(part);node.append(cap);}}
 }
}
renderKeys();
document.querySelectorAll('[data-align]').forEach(button=>button.onclick=()=>run(button.dataset.align));
async function guarded(fn) {
 if(!ready){report('Open this add-in inside PowerPoint to edit selected objects.',true);return;}
 if(busy)return;busy=true;
 document.querySelectorAll('button').forEach(b=>b.disabled=true);
 try{await fn();}catch(e){report(e.message||String(e),true);}finally{busy=false;document.querySelectorAll('button').forEach(b=>b.disabled=false);}
}
async function run(id){return guarded(async()=>{
 await PowerPoint.run(async context=>{
  const selected=context.presentation.getSelectedShapes();selected.load('items/id,items/left,items/top,items/width,items/height,items/rotation');
  await context.sync();
  const slideTarget=selected.items.length===1&&['left','right','center','top','middle','bottom'].includes(id);
  let page;
  if(slideTarget){if(!Office.context.requirements.isSetSupported('PowerPointApi','1.10'))throw Error('Aligning to the slide needs PowerPointApi 1.10. Update PowerPoint to use single-object alignment.');page=context.presentation.pageSetup;page.load('slideWidth,slideHeight');await context.sync();}
  if(selected.items.some(s=>Math.abs(s.rotation%360)>0.001))throw Error('This preview supports unrotated objects. Reset rotation before using these tools.');
  const before=selected.items.map(s=>({id:s.id,left:s.left,top:s.top,width:s.width,height:s.height}));
  const result=transform(id,before,{bounds:page?{left:0,top:0,right:page.slideWidth,bottom:page.slideHeight}:undefined});
  result.forEach((s,i)=>{for(const key of ['left','top','width','height'])if(s[key]!==before[i][key])selected.items[i][key]=s[key];});
  await context.sync();report(`${commands.find(c=>c[0]===id)[1]} · ${result.length} objects`);
 });
 });}
if(typeof Office!=='undefined')Office.onReady(async info=>{
 if(info.host!==Office.HostType.PowerPoint){report('Preview only — open Slide Tools in PowerPoint to use these commands.');return;}
 ready=Office.context.requirements.isSetSupported('PowerPointApi','1.5');
 for(const [id]of commands)Office.actions.associate(id,()=>run(id));
 report(ready?'Ready. Select objects on your slide.':'Update PowerPoint: this add-in needs PowerPointApi 1.5.',!ready);
 if(Office.context.requirements.isSetSupported('KeyboardShortcuts','1.1'))try{
 const saved=await Office.actions.getShortcuts();renderKeys(saved);
 }catch{/* Defaults remain visible if settings cannot be read. */}
});
