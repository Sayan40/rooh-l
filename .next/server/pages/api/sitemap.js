"use strict";(()=>{var e={};e.id=290,e.ids=[290],e.modules={145:e=>{e.exports=require("next/dist/compiled/next-server/pages-api.runtime.prod.js")},6249:(e,r)=>{Object.defineProperty(r,"l",{enumerable:!0,get:function(){return function e(r,t){return t in r?r[t]:"then"in r&&"function"==typeof r.then?r.then(r=>e(r,t)):"function"==typeof r&&"default"===t?r:void 0}}})},3927:(e,r,t)=>{t.r(r),t.d(r,{config:()=>p,default:()=>u,routeModule:()=>c});var i={};t.r(i),t.d(i,{default:()=>l});var n=t(1802),a=t(7153),o=t(6249);function l(e,r){let t=`<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${[{url:"/",changefreq:"monthly",priority:1},{url:"/franchise",changefreq:"monthly",priority:.8},{url:"/privacy-policy",changefreq:"yearly",priority:.5},{url:"/terms-of-service",changefreq:"yearly",priority:.5},{url:"/rental-agreement",changefreq:"yearly",priority:.5},{url:"/payment-policy",changefreq:"yearly",priority:.5}].map(e=>`
      <url>
        <loc>https://rooh.com.ua${e.url}</loc>
        <changefreq>${e.changefreq}</changefreq>
        <priority>${e.priority}</priority>
      </url>`).join("")}
  </urlset>`;r.setHeader("Content-Type","application/xml"),r.status(200).send(t)}let u=(0,o.l)(i,"default"),p=(0,o.l)(i,"config"),c=new n.PagesAPIRouteModule({definition:{kind:a.x.PAGES_API,page:"/api/sitemap",pathname:"/api/sitemap",bundlePath:"",filename:""},userland:i})},7153:(e,r)=>{var t;Object.defineProperty(r,"x",{enumerable:!0,get:function(){return t}}),function(e){e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE"}(t||(t={}))},1802:(e,r,t)=>{e.exports=t(145)}};var r=require("../../webpack-api-runtime.js");r.C(e);var t=r(r.s=3927);module.exports=t})();