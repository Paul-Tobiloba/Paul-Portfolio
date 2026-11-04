import { useEffect, useId, useRef, useState } from 'react';
import { LuArrowUpRight, LuBraces, LuDatabase, LuShieldCheck, LuWorkflow } from 'react-icons/lu';
import content from '../../data/portfolioContent.json';
import SkillMark from './SkillMark';
import { buildSkillGroups, signalRoutes } from './skillSignalMap.mjs';
import styles from '../../../styles/SkillSignalMap.module.css';

const groups = buildSkillGroups(content.skills);
const groupIcons = {
  cybersecurity: LuShieldCheck,
  automation: LuWorkflow,
  frontend: LuBraces,
  others: LuDatabase,
};

export default function SkillSignalMap() {
  const [category, setCategory] = useState('cybersecurity');
  const [selectedName, setSelectedName] = useState('Microsoft Sentinel');
  const [hovered, setHovered] = useState(null);
  const [focused, setFocused] = useState(null);
  const [pulse, setPulse] = useState(null);
  const [graph, setGraph] = useState({ category: '', width: 1, height: 1, routes: [] });
  const network = useRef(null);
  const hub = useRef(null);
  const nodes = useRef(new Map());
  const pulseId = useRef(0);
  const detailId = useId();
  const group = groups.find(item => item.id === category);
  const selected = group.tools.find(tool => tool.name === selectedName) || group.tools[0];
  const activeName = hovered || focused || selected.name;
  const split = Math.ceil(group.tools.length / 2);
  const Icon = groupIcons[category];
  const routes = graph.category === category ? graph.routes : [];
  const pulsingRoute = pulse?.category === category ? routes.find(route => route.name === pulse.name) : null;

  useEffect(() => {
    const element = network.current;
    const center = hub.current;
    const registry = nodes.current;
    let disposed = false;
    let frame = 0;
    function measure() {
      frame = 0;
      if (disposed) return;
      const bounds = element.getBoundingClientRect();
      const connected = getComputedStyle(element).getPropertyValue('--map-connected').trim() === '1';
      const next = {
        category,
        width: Math.max(1, bounds.width),
        height: Math.max(1, bounds.height),
        routes: connected ? signalRoutes(bounds, center.getBoundingClientRect(), group.tools.flatMap(tool => {
          const node = registry.get(tool.name);
          return node ? [{ name: tool.name, rect: node.getBoundingClientRect() }] : [];
        })) : [],
      };
      setGraph(previous => JSON.stringify(previous) === JSON.stringify(next) ? previous : next);
    }
    function schedule() {
      if (!disposed && !frame) frame = requestAnimationFrame(measure);
    }
    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(schedule);
    observer?.observe(element);
    observer?.observe(center);
    group.tools.forEach(tool => {
      const node = registry.get(tool.name);
      if (node) observer?.observe(node);
    });
    window.addEventListener('resize', schedule);
    document.fonts?.ready.then(schedule, () => {});
    schedule();
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer?.disconnect();
      window.removeEventListener('resize', schedule);
    };
  }, [category, group]);

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    function changed() { setPulse(null); }
    motion.addEventListener('change', changed);
    return () => motion.removeEventListener('change', changed);
  }, []);

  function chooseGroup(next) {
    if (next.id === category) return;
    setCategory(next.id);
    setSelectedName(next.tools[0].name);
    setHovered(null);
    setFocused(null);
    setPulse(null);
  }

  function chooseTool(tool) {
    setSelectedName(tool.name);
    setPulse(window.matchMedia('(prefers-reduced-motion: reduce)').matches ? null : {
      id: ++pulseId.current, category, name: tool.name,
    });
  }

  function toolButton(tool) {
    return <button
      key={tool.name}
      type="button"
      ref={node => { if (node) nodes.current.set(tool.name, node); else nodes.current.delete(tool.name); }}
      className={styles.tool}
      aria-pressed={selected.name === tool.name}
      aria-controls={detailId}
      onMouseEnter={() => setHovered(tool.name)}
      onMouseLeave={() => setHovered(null)}
      onFocus={() => setFocused(tool.name)}
      onBlur={() => setFocused(null)}
      onClick={() => chooseTool(tool)}
    ><span className={styles.toolLabel}><SkillMark name={tool.name}/><span>{tool.name}</span></span><LuArrowUpRight aria-hidden="true"/></button>;
  }

  return <div className={styles.signalMap}>
    <div className={styles.disciplines} role="group" aria-label="Skill disciplines">
      {groups.map(item => <button key={item.id} type="button" aria-pressed={category === item.id} onClick={() => chooseGroup(item)}>{item.name}</button>)}
    </div>
    <div ref={network} className={styles.network} role="group" aria-label={`${group.name} tools`}>
      <svg className={styles.connections} viewBox={`0 0 ${graph.width} ${graph.height}`} preserveAspectRatio="none" aria-hidden="true" focusable="false">
        {routes.map(route => <path key={route.name} d={route.d} className={activeName === route.name ? styles.activeRoute : styles.route}/>)}
        {pulsingRoute && <path key={pulse.id} d={pulsingRoute.d} pathLength="1" className={styles.signal} onAnimationEnd={() => setPulse(current => current?.id === pulse.id ? null : current)}/>}
      </svg>
      <div className={styles.toolColumn}>{group.tools.slice(0, split).map(toolButton)}</div>
      <div ref={hub} className={styles.hub}><Icon aria-hidden="true"/><span className={styles.hubTitle}>{group.name}</span><span className={styles.hubCount}>{group.tools.length} tools</span></div>
      <div className={styles.toolColumn}>{group.tools.slice(split).map(toolButton)}</div>
    </div>
    <div id={detailId} className={styles.detail} role="status" aria-live="polite" aria-atomic="true">
      <div className={styles.detailIdentity}><SkillMark name={selected.name}/><div><h3>{selected.name}</h3><p className={styles.detailCategory}>{group.name}</p></div></div><p className={styles.description}>{selected.desc}</p>
    </div>
    <noscript><div className={styles.fallback}><h3>All skills &amp; tools</h3>{groups.map(item => <section key={item.id}><h4>{item.name}</h4><ul>{item.tools.map(tool => <li key={tool.name}><strong>{tool.name}</strong>: {tool.desc}</li>)}</ul></section>)}</div></noscript>
  </div>;
}
