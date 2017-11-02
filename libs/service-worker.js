// Copyright 2016 Google Inc.
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//      http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

var dataCacheName = 'EricssonEvents_v1';
var cacheName = 'Events_v-1';
var filesToCache = [
  '/',
  '/events.html',
  '/js/app.js',
  '/css/styles.css',
  '/images/s1.png',
  '/images/s2.png',
  '/images/ericIcon.png',
  '/images/search.png',
  '/images/arrow.png',
  '/images/btn.png',
  '/images/close.png',  
  '/images/plus.png',
  '/images/s3.png'
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName && key !== dataCacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  /*
   * Fixes a corner case in which the app wasn't returning the latest data.
   * You can reproduce the corner case by commenting out the line below and
   * then doing the following steps: 1) load app for first time so that the
   * initial New York City data is shown 2) press the refresh button on the
   * app 3) go offline 4) reload the app. You expect to see the newer NYC
   * data, but you actually see the initial data. This happens because the
   * service worker is not yet activated. The code below essentially lets
   * you activate the service worker faster.
   */
  return self.clients.claim();
});

self.addEventListener('fetch', function (event) {
    console.log('Handling fetch event for', event.request.url);

    event.respondWith(            
        caches.match(event.request).then(function (response) {
            if (response) {
                console.log('Found response in cache:', response);

                return response;
            }

            console.log('No response found in cache. About to fetch from network...');

            return fetch(event.request).then(function (response) {
                console.log('Response from network is:', response);

                return response;
            }).catch(function (error) {                    
                console.error('Fetching failed:', error);

                return caches.match(OFFLINE_URL);
            });
        })
    );
});
// self.addEventListener('fetch', function(e) {
//   console.log('[Service Worker] Fetch', e.request.url);
//   var dataUrl = 'https://query.yahooapis.com/v1/public/yql';
//   if (e.request.url.indexOf(dataUrl) > -1) {
//     /*
//      * When the request URL contains dataUrl, the app is asking for fresh
//      * weather data. In this case, the service worker always goes to the
//      * network and then caches the response. This is called the "Cache then
//      * network" strategy:
//      * https://jakearchibald.com/2014/offline-cookbook/#cache-then-network
//      */
//     e.respondWith(
//       caches.open(dataCacheName).then(function(cache) {
//         return fetch(e.request).then(function(response){
//           cache.put(e.request.url, response.clone());
//           return response;
//         });
//       })
//     );
//   } else {
//     /*
//      * The app is asking for app shell files. In this scenario the app uses the
//      * "Cache, falling back to the network" offline strategy:
//      * https://jakearchibald.com/2014/offline-cookbook/#cache-falling-back-to-network
//      */
//     e.respondWith(
//       caches.match(e.request).then(function(response) {
//         return response || fetch(e.request);
//       })
//     );
//   }
// });

// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', function() {
//     navigator.serviceWorker.register('/sw.js').then(function(registration) {
//       // Registration was successful
//       console.log('ServiceWorker registration successful with scope: ', registration.scope);
//     }, function(err) {
//       // registration failed :(
//       console.log('ServiceWorker registration failed: ', err);
//     });
//   });
// }
