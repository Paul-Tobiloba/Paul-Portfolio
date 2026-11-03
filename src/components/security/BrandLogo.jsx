import { createElement } from 'react';
import geometry from '../../data/brandGeometry.json';
import styles from '../../../styles/SecurityPortfolio.module.css';

function Glyph({ letter, contour = false }) {
  return geometry.glyphs[letter].shapes.map((shape,index)=>createElement(shape.tag,{
    ...shape.attrs,key:index,
    ...(contour?{className:styles.brandContour,pathLength:1}:{}),
  }));
}
export function BrandMonogram({ loading = false, className = '' }) {
  return <svg className={`${styles.brandMonogramSvg} ${loading?styles.brandLoadingInk:''} ${className}`} viewBox="0 0 156 90" width="156" height="90" fill="currentColor" aria-hidden="true" focusable="false"><g><Glyph letter="P" contour/></g><g className={styles.brandSecondLetter} transform="translate(76 0)"><Glyph letter="T" contour/></g></svg>;
}
export default function BrandLogo({ expanded = false }) {
  return <svg className={`${styles.brandSvg} ${expanded?styles.brandExpanded:''}`} viewBox={geometry.viewBox} width={geometry.width} height={geometry.height} fill="currentColor" aria-hidden="true" focusable="false" style={{'--brand-t-end':`${geometry.tExpanded}px`}}>
    <g><Glyph letter="P" contour/></g>
    <g className={`${styles.brandMovingT} ${styles.brandSecondLetter}`}><Glyph letter="T" contour/></g>
    <g className={styles.brandNameLetters}>{geometry.layout.filter(item=>item.part==='rest').map((item,index)=><g key={index} transform={`translate(${item.x} 0)`}><Glyph letter={item.letter}/></g>)}</g>
  </svg>;
}
