import { createElement } from 'react';
import geometry from '../../data/brandGeometry.json';
import { matrixLetterState } from './matrixLoading.mjs';
import styles from '../../../styles/SecurityPortfolio.module.css';

const extra={
  '0':{width:54,shapes:[{tag:'ellipse',attrs:{cx:27,cy:45,rx:22,ry:36,fill:'none',stroke:'currentColor',strokeWidth:8.5}}]},
  '1':{width:44,shapes:[{tag:'path',attrs:{d:'M7 22L24 7V84M8 84H40',fill:'none',stroke:'currentColor',strokeWidth:8.5,strokeLinejoin:'round'}}]},
  '/':{width:44,shapes:[{tag:'path',attrs:{d:'M5 84L39 6',fill:'none',stroke:'currentColor',strokeWidth:8.5}}]},
  '_':{width:54,shapes:[{tag:'path',attrs:{d:'M4 80H50',fill:'none',stroke:'currentColor',strokeWidth:8.5}}]},
};
function Shapes({glyph}){return glyph.shapes.map((shape,index)=>createElement(shape.tag,{...shape.attrs,key:index}));}
export default function MatrixWordmark({resolve,tick}) {
  return <svg className={styles.matrixWordmark} viewBox={geometry.viewBox} width={geometry.width} height={geometry.height} fill="currentColor" aria-hidden="true" focusable="false">
    <g className={styles.matrixNoise}>{geometry.layout.map((item,index)=>{
      const state=matrixLetterState(index,resolve,tick,item.letter);
      const glyph=geometry.glyphs[state.letter]||extra[state.letter];
      return <g key={index} className={state.locked?styles.matrixLetterResolved:styles.matrixLetterNoise} opacity={state.opacity} transform={`translate(${item.x} 0) scale(${geometry.glyphs[item.letter].width/glyph.width} 1)`}><Shapes glyph={glyph}/></g>;
    })}</g>
    <g className={styles.matrixStill}>{geometry.layout.map((item,index)=><g key={index} transform={`translate(${item.x} 0)`}><Shapes glyph={geometry.glyphs[item.letter]}/></g>)}</g>
  </svg>;
}
