importScripts('version.js');
const V='compeval-v'+APP_VERSION,F=['nouveautes.js','nouveautes.json','./','index.html','version.js','eps-core.js','manifest.webmanifest','icons/icon-192.png','icons/icon-512.png','icons/logo-CompEval.png'];
const T=2500; // réseau trop lent → copie hors ligne
const net=r=>new Promise((ok,ko)=>{const t=setTimeout(()=>ko(new Error('timeout')),T);fetch(r,{cache:'no-cache'}).then(x=>{clearTimeout(t);ok(x)},e=>{clearTimeout(t);ko(e)})});
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>Promise.all(F.map(u=>fetch(u,{cache:'reload'}).then(r=>r.ok&&c.put(u,r)).catch(()=>{})))));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x.startsWith('compeval')&&x!==V).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener('fetch',e=>{const q=e.request;if(q.method!=='GET')return;
 e.respondWith(net(q).then(r=>{if(r.ok){const c=r.clone();caches.open(V).then(x=>x.put(q,c))}return r})
  .catch(()=>caches.match(q,{ignoreSearch:true}).then(h=>h||(q.mode==='navigate'?caches.match('index.html').then(x=>x||caches.match('./')):undefined)||Response.error())))});
