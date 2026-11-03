import test from 'node:test';
import assert from 'node:assert/strict';
import {createMatrixSequence,matrixLetterState} from '../src/components/security/matrixLoading.mjs';

test('matrix intro begins at zero and resolves letters during its timed sequence',()=>{
  const sequence=createMatrixSequence({startedAt:100});
  const start=sequence.update(100,false);assert.equal(start.progress,0);assert.equal(start.resolve,0);assert.equal(start.visible,true);
  const middle=sequence.update(2200,false);assert.ok(middle.progress>0&&middle.progress<1);assert.ok(middle.resolve>middle.progress);assert.equal(middle.caption,'Hacking in progress…');
  assert.equal(matrixLetterState(0,middle.resolve,middle.tick,'P').locked,true);
  assert.equal(matrixLetterState(11,middle.resolve,middle.tick,'a').locked,false);
});
test('pending work never reaches100 even after the animation duration',()=>{
  const sequence=createMatrixSequence();
  for(const time of [0,1000,4200,7000,9900]){const frame=sequence.update(time,true);assert.equal(frame.visible,true);assert.ok(frame.progress<1);}
  const wait=sequence.update(9999,true);assert.equal(wait.progress,.95);assert.equal(wait.resolve,1);
});
test('actual readiness gates completion, then holds and exits within a bounded interval',()=>{
  const sequence=createMatrixSequence({duration:1000,hold:100,fade:100});
  sequence.update(1200,true);
  const complete=sequence.update(1500,false);assert.equal(complete.progress,1);assert.equal(complete.caption,'Access granted.');assert.equal(complete.exiting,false);
  assert.equal(sequence.update(1600,false).exiting,true);assert.equal(sequence.update(1700,false).visible,false);assert.equal(sequence.active,false);
});
test('skip immediately releases the screen even while work remains pending',()=>{
  const sequence=createMatrixSequence();sequence.update(800,true);sequence.skip();
  const skipped=sequence.update(801,true);assert.equal(skipped.visible,false);assert.equal(skipped.reason,'skip');assert.ok(skipped.progress<1);assert.equal(sequence.active,false);
});
test('timeout releases a stalled screen without falsely claiming readiness',()=>{
  const sequence=createMatrixSequence();const timeout=sequence.update(10000,true);
  assert.equal(timeout.visible,false);assert.equal(timeout.reason,'timeout');assert.equal(timeout.progress,.95);assert.notEqual(timeout.caption,'Access granted.');
});
test('reduced motion uses complete static letters while waiting and exits immediately when ready',()=>{
  const sequence=createMatrixSequence();const wait=sequence.update(0,true,true);
  assert.equal(wait.resolve,1);assert.equal(wait.visible,true);assert.equal(wait.progress,.95);
  const ready=sequence.update(50,false,true);assert.equal(ready.visible,false);assert.equal(ready.progress,1);
});
test('elapsed wall time lets backgrounded intros finish rather than replay on return',()=>{
  const sequence=createMatrixSequence();sequence.update(0,false);
  const returned=sequence.update(6000,false);assert.equal(returned.resolve,1);assert.equal(returned.progress,1);
  assert.equal(sequence.update(6500,false).visible,false);
});
test('a disposed/completed sequence cannot reopen itself',()=>{
  const sequence=createMatrixSequence({duration:100,hold:0,fade:0});sequence.update(100,false);
  assert.equal(sequence.active,false);assert.equal(sequence.update(200,true).visible,false);
});
test('final lettering is exact and noise is deterministic across SSR and client',()=>{
  const name='PaulTobiloba';
  for(let index=0;index<name.length;index++){
    const first=matrixLetterState(index,0,0,name[index]);assert.deepEqual(first,matrixLetterState(index,0,0,name[index]));assert.ok(['0','1'].includes(first.letter));
    const final=matrixLetterState(index,1,100,name[index]);assert.equal(final.letter,name[index]);assert.equal(final.opacity,1);assert.equal(final.locked,true);
  }
});

test('new pending work revokes completion during both hold and fade without hiding/reopening',()=>{
  for(const renewedAt of [4250,4590]){
    const sequence=createMatrixSequence();
    sequence.update(4200,false);assert.equal(sequence.finishing,true);
    const renewed=sequence.update(renewedAt,true);assert.equal(renewed.visible,true);assert.equal(renewed.exiting,false);assert.ok(renewed.progress<1);assert.equal(sequence.finishing,false);
    assert.equal(sequence.update(4710,true).visible,true);
    const ready=sequence.update(4800,false);assert.equal(ready.progress,1);assert.equal(ready.exiting,false);
    assert.equal(sequence.update(5240,false).visible,false);
  }
});
