import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { buildSkillGroups, signalRoutes } from '../src/components/security/skillSignalMap.mjs';

const content = JSON.parse(readFileSync(new URL('../src/data/portfolioContent.json', import.meta.url)));

test('four disciplines preserve all 32 unique tools and descriptions without ratings', () => {
  const groups = buildSkillGroups(content.skills);
  assert.deepEqual(groups.map(g => [g.name, g.tools.length]), [['Cybersecurity',9],['Automation',11],['Frontend',9],['Tools & data',3]]);
  const source = new Map(Object.values(content.skills).flat().map(tool => [tool.name.toLowerCase(), tool.desc]));
  const all = groups.flatMap(g => g.tools);
  assert.equal(all.length, source.size);
  assert.equal(new Set(all.map(t => t.name.toLowerCase())).size, all.length);
  for (const tool of all) {
    assert.equal(tool.desc, source.get(tool.name.toLowerCase()));
    assert.deepEqual(Object.keys(tool).sort(), ['desc','name']);
  }
});

test('connections meet real button edges and the hub on both sides', () => {
  const bounds = {left:80,top:120,width:800,height:400};
  const hub = {left:400,top:240,width:160,height:160};
  const routes = signalRoutes(bounds, hub, [
    {name:'Azure',rect:{left:80,top:128,width:200,height:56}},
    {name:'Networking',rect:{left:680,top:440,width:200,height:64}},
  ]);
  assert.deepEqual(routes[0].start,{x:320,y:200});
  assert.deepEqual(routes[0].end,{x:200,y:36});
  assert.deepEqual(routes[1].start,{x:480,y:200});
  assert.deepEqual(routes[1].end,{x:600,y:352});
  assert.ok(routes.every(route => !/NaN|Infinity/.test(route.d)));
});

test('routes follow changed label heights and moved or resized containers', () => {
  const bounds={left:0,top:0,width:688,height:416};
  const hub={left:278,top:142,width:132,height:132};
  const tool={name:'Nintex Workflow Cloud',rect:{left:0,top:8,width:190,height:56}};
  const first=signalRoutes(bounds,hub,[tool])[0];
  const expanded=signalRoutes(bounds,hub,[{...tool,rect:{...tool.rect,height:80}}])[0];
  assert.equal(expanded.end.y-first.end.y,12);
  const translate=rect=>({...rect,left:rect.left+64,top:rect.top+100});
  assert.deepEqual(signalRoutes(translate(bounds),translate(hub),[{...tool,rect:translate(tool.rect)}])[0],first);
});

test('hidden containers have no stale or invalid paths', () => {
  assert.deepEqual(signalRoutes({left:0,top:0,width:0,height:0},{left:0,top:0,width:0,height:0},[]),[]);
});
