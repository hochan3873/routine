/* 루틴북 서비스 워커 — 휴식 끝 알림을 잠금화면·다른 앱 위에 띄우는 용도만. 캐시는 하지 않는다 */
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil((async () => {
    const all = await self.clients.matchAll({ type:'window', includeUncontrolled:true });
    for(const c of all){ if('focus' in c) return c.focus(); }
    if(self.clients.openWindow) return self.clients.openWindow('./');
  })());
});
