import test from 'node:test';
import assert from 'node:assert/strict';
import { EventEmitter } from 'node:events';
import { subscribeRouteLoading } from '../src/components/security/routeLoading.mjs';

test('real route start and completion toggle loading',()=>{
  const events=new EventEmitter(),states=[];const dispose=subscribeRouteLoading(events,value=>states.push(value));
  events.emit('routeChangeStart','/works',{shallow:false});events.emit('routeChangeComplete','/works');
  assert.deepEqual(states,[true,false]);dispose();
});
test('route failures and cancellation clear their own pending indicator',()=>{
  const events=new EventEmitter(),states=[];const dispose=subscribeRouteLoading(events,value=>states.push(value));
  events.emit('routeChangeStart','/blog');events.emit('routeChangeError',{cancelled:true},'/blog');
  assert.deepEqual(states,[true,false]);dispose();
});
test('a cancelled old route cannot finish a newer navigation',()=>{
  const events=new EventEmitter(),states=[];const dispose=subscribeRouteLoading(events,value=>states.push(value));
  events.emit('routeChangeStart','/works');events.emit('routeChangeStart','/blog');events.emit('routeChangeError',{cancelled:true},'/works');events.emit('routeChangeComplete','/works');
  assert.deepEqual(states,[true,true]);events.emit('routeChangeComplete','/blog');assert.deepEqual(states,[true,true,false]);dispose();
});
test('shallow filters do not start a page loader or clear another route',()=>{
  const events=new EventEmitter(),states=[];const dispose=subscribeRouteLoading(events,value=>states.push(value));
  events.emit('routeChangeStart','/blog?tag=web',{shallow:true});events.emit('routeChangeComplete','/blog?tag=web');assert.deepEqual(states,[]);
  events.emit('routeChangeStart','/works');events.emit('routeChangeStart','/blog?tag=web',{shallow:true});events.emit('routeChangeComplete','/blog?tag=web');assert.deepEqual(states,[true]);dispose();
});
test('disposing removes listeners and prevents later loading updates',()=>{
  const events=new EventEmitter(),states=[];const dispose=subscribeRouteLoading(events,value=>states.push(value));dispose();
  for(const name of ['routeChangeStart','routeChangeComplete','routeChangeError'])assert.equal(events.listenerCount(name),0);
  events.emit('routeChangeStart','/works');assert.deepEqual(states,[]);
});
