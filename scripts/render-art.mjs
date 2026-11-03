import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Resvg } from '@resvg/resvg-js';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const assets=path.join(root,'profile/assets/v2');
const output=path.join(root,'artifacts/render');
fs.mkdirSync(output,{recursive:true});
const type=JSON.parse(fs.readFileSync(path.join(assets,'type-paths.json'),'utf8'));
const image=(name,x,y,w,h)=>`<image href="data:image/png;base64,${fs.readFileSync(path.join(assets,name)).toString('base64')}" x="${x}" y="${y}" width="${w}" height="${h}"/>`;
function text(key,x,y,size,color,maxWidth=Infinity){
  const t=type.strings[key];
  const scale=Math.min(size/type.unitsPerEm,maxWidth/t.width);
  return `<path fill="${color}" transform="translate(${x} ${y}) scale(${scale} ${-scale})" d="${t.path}"/>`;
}
function render(name,w,h,content){
  const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${content}</svg>`;
  const result=new Resvg(svg,{font:{loadSystemFonts:false}}).render();
  fs.writeFileSync(path.join(output,`${name}.png`),result.asPng());
  fs.writeFileSync(path.join(output,`${name}.svg`),svg);
  console.log(`${name}: ${w}×${h}`);
}

render('welcome-wide',1800,720,
  '<rect width="1800" height="720" fill="#000"/>'+image('workshop-source.png',0,0,1800,720)+
  text('disciplines',72,65,25,'#a3a3a3',1656)+text('wordmark',65,205,174,'#f4f4f4',1660));

render('welcome-compact',900,730,
  '<rect width="900" height="730" fill="#000"/>'+image('workshop-source.png',0,360,900,360)+
  text('disciplines',50,56,20,'#a3a3a3',800)+text('hack',44,185,168,'#f4f4f4',804)+
  text('district',44,320,150,'#f4f4f4',804));

render('event-zero-to-demo',900,480,
  '<rect width="900" height="480" fill="#ededed"/>'+image('terminal-source.png',460,30,420,420)+
  text('zero',48,206,106,'#101010',402)+text('to-demo',48,314,90,'#101010',402));

render('event-frontierhacks',900,480,
  '<rect width="900" height="480" fill="#111"/>'+image('rover-source.png',462,25,420,420)+
  text('frontier',48,206,90,'#f4f4f4',402)+text('hacks',48,314,106,'#f4f4f4',402));
