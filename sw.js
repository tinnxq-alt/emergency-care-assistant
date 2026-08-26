const CACHE='emergency-care-assistant-v020-integrated-2';
const ASSETS=['./','./index.html','./emergency.html','./flows.html','./drugs.html','./todo.html','./styles.css','./enhancements.css','./clinical.css','./clinical-decorators.css','./editable.css','./navigation.css','./utilities.css','./flows.css','./crash-cart-manager.css','./data.js','./data-batch8.js','./data-batch9.js','./flow-data.js','./crash-cart-data.js','./clinical-data.js','./clinical-batch2.js','./clinical-batch3.js','./clinical-batch4.js','./clinical-batch5.js','./clinical-batch6.js','./clinical-batch7.js','./clinical-batch8.js','./clinical-batch9.js','./clinical-audit-v015.js','./clinical-audit-v016.js','./crash-cart-audit-v017.js','./clinical-audit-v018.js','./clinical-audit-v019.js','./app.js','./pages.js','./flows.js','./sw-register.js','./crash-cart-manager.js','./ward-pharmacy-bridge.js','./enhancements.js','./clinical.js','./clinical-batch2-ui.js','./clinical-batch3-ui.js','./clinical-batch4-ui.js','./clinical-batch5-ui.js','./clinical-batch6-ui.js','./clinical-batch7-ui.js','./clinical-batch8-ui.js','./clinical-batch9-ui.js','./clinical-decorators.js','./editable.js','./generic-editable.js','./manifest.webmanifest','./icon.svg'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)));self.skipWaiting();});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)))));self.clients.claim();});
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  if(event.request.mode==='navigate'){
    event.respondWith(fetch(event.request).catch(()=>caches.match(event.request).then(hit=>hit||caches.match('./index.html'))));
    return;
  }
  event.respondWith(caches.match(event.request).then(hit=>hit||fetch(event.request).then(response=>{
    if(response.ok&&response.type==='basic'){
      const copy=response.clone();
      event.waitUntil(caches.open(CACHE).then(cache=>cache.put(event.request,copy)));
    }
    return response;
  })));
});
