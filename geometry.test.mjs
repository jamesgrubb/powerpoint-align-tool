import {test} from 'node:test';
import assert from 'node:assert/strict';
import {transform} from './geometry.js';
const shapes=[{id:'a',left:10,top:20,width:20,height:10},{id:'b',left:80,top:90,width:40,height:30},{id:'c',left:180,top:160,width:30,height:20}];
test('all six alignments converge at the intended edge or center',()=>{
 for(const [action,value,measure]of [['left',10,s=>s.left],['right',210,s=>s.left+s.width],['center',110,s=>s.left+s.width/2],['top',20,s=>s.top],['bottom',180,s=>s.top+s.height],['middle',100,s=>s.top+s.height/2]])for(const s of transform(action,shapes))assert.equal(measure(s),value);
});
test('distribution preserves outer objects and equalizes gaps for unequal sizes',()=>{
 for(const [action,p,d]of [['distributeX','left','width'],['distributeY','top','height']]){
 const r=transform(action,shapes);assert.equal(r[0][p],shapes[0][p]);assert.equal(r[2][p],shapes[2][p]);assert.equal(r[1][p]-r[0][p]-r[0][d],r[2][p]-r[1][p]-r[1][d]);}
});
test('single shape slide centering uses actual dimensions',()=>{const [s]=transform('center',[shapes[0]],{bounds:{left:0,top:0,right:960,bottom:540}});assert.equal(s.left,470);});
test('single object aligns to every slide edge and center',()=>{
 const bounds={left:0,top:0,right:960,bottom:540};
 for(const [action,property,value] of [['left','left',0],['right','left',940],['top','top',0],['bottom','top',530],['center','left',470],['middle','top',265]]){
  const [result]=transform(action,[shapes[0]],{bounds});
  assert.equal(result[property],value);
  assert.equal(result.width,20);assert.equal(result.height,10);
 }
});
test('invalid selections fail before edits',()=>{assert.throws(()=>transform('swap',shapes));assert.throws(()=>transform('left',[]));assert.throws(()=>transform('left',[shapes[0]]));assert.throws(()=>transform('width',shapes));assert.throws(()=>transform('distributeX',shapes.slice(0,2)));});
