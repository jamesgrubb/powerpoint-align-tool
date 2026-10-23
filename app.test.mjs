import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import {commands,transform} from './geometry.js';
const source=readFileSync(new URL('./app.js',import.meta.url),'utf8').replace("import {commands,transform} from './geometry.js';",'');
async function host({items,mac=false,mappings={},supports=()=>true,failSync=false}={}) {
 const shapes=items||[{id:'a',left:10,top:20,width:20,height:10,rotation:0},{id:'b',left:80,top:90,width:40,height:30,rotation:0}];
 const status={textContent:'',className:''},actions={},caps={};let onReady,runs=0,syncs=0;
 const buttons=commands.map(([id])=>({dataset:{align:id},disabled:false}));
 const makeNode=()=>({children:[],textContent:'',title:'',replaceChildren(){this.children=[];this.textContent='';},append(x){this.children.push(x);}});
 commands.forEach(([id])=>caps[id]=makeNode());
 const document={getElementById:()=>status,createElement:makeNode,querySelectorAll:selector=>selector==='button'||selector==='[data-align]'?buttons:[caps[selector.match(/data-shortcut="([^"]+)"/)[1]]]};
 const Office={onReady:cb=>onReady=cb,PlatformType:{Mac:'Mac'},HostType:{PowerPoint:'PowerPoint'},context:{platform:mac?'Mac':'PC',requirements:{isSetSupported:supports}},actions:{associate:(id,fn)=>actions[id]=fn,getShortcuts:async()=>mappings}};
 const context={presentation:{getSelectedShapes:()=>({items:shapes,load(){}}),pageSetup:{slideWidth:960,slideHeight:540,load(){}}},async sync(){syncs++;if(failSync)throw Error('Host sync failed');}};
 vm.runInNewContext(source,{document,navigator:{platform:''},Office,PowerPoint:{run:async fn=>{runs++;return fn(context);}},commands,transform});
 await onReady({host:'PowerPoint'});
 return {actions,shapes,status,buttons,caps,get runs(){return runs;},get syncs(){return syncs;}};
}
test('all manifest shortcuts dispatch on first call without panel interaction',async()=>{
 const definition=JSON.parse(readFileSync(new URL('./shortcuts.json',import.meta.url),'utf8'));
 assert.deepEqual(definition.actions.map(a=>a.id).sort(),commands.map(c=>c[0]).sort());
 for(const [id,,key]of commands){assert.equal(definition.shortcuts.find(s=>s.action===id).key.default,key);const h=await host({items:[{id:'a',left:10,top:20,width:20,height:10,rotation:0},{id:'b',left:80,top:90,width:40,height:30,rotation:0},{id:'c',left:180,top:160,width:30,height:20,rotation:0}]});await h.actions[id]();assert.equal(h.runs,1);assert.match(h.status.textContent,/3 objects/);assert.ok(h.buttons.every(b=>!b.disabled));}
});
test('single-object shortcut uses real slide dimensions on first press',async()=>{const h=await host({items:[{id:'a',left:100,top:100,width:20,height:10,rotation:0}]});await h.actions.center();assert.equal(h.shapes[0].left,470);assert.equal(h.syncs,3);});
test('host failure reports error and restores buttons',async()=>{const h=await host({failSync:true});await h.actions.left();assert.equal(h.status.textContent,'Host sync failed');assert.equal(h.status.className,'error');assert.ok(h.buttons.every(b=>!b.disabled));});
test('unsupported slide API rejects before object positions change',async()=>{const items=[{id:'a',left:100,top:100,width:20,height:10,rotation:0}];const h=await host({items,supports:(name,version)=>version!=='1.10'});await h.actions.left();assert.equal(items[0].left,100);assert.match(h.status.textContent,/1.10/);});
test('invalid and rotated selections produce no partial changes',async()=>{for(const items of [[],[{id:'a',left:10,top:20,width:20,height:10,rotation:0},{id:'b',left:80,top:90,width:40,height:30,rotation:5}]]){const before=JSON.stringify(items);const h=await host({items});await h.actions.left();assert.equal(JSON.stringify(items),before);assert.equal(h.status.className,'error');}});
test('Office conflict is shown as unassigned rather than an active default',async()=>{const h=await host({mappings:{left:null,center:'Ctrl+Shift+H'}});assert.equal(h.caps.left.textContent,'Not assigned');assert.deepEqual(h.caps.center.children.map(n=>n.textContent),['Ctrl','Shift','H']);});
test('Mac keycaps use Option and Shift symbols',async()=>{const h=await host({mac:true});assert.deepEqual(h.caps.distributeX.children.map(n=>n.textContent),['⌥','⇧','H']);});
test('button and shortcut invoke the same alignment',async()=>{const h=await host();await h.buttons[0].onclick();assert.equal(h.shapes[1].left,10);assert.equal(h.runs,1);});
