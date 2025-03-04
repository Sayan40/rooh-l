"use strict";(()=>{var e={};e.id=719,e.ids=[719],e.modules={145:e=>{e.exports=require("next/dist/compiled/next-server/pages-api.runtime.prod.js")},5184:e=>{e.exports=require("nodemailer")},9926:e=>{e.exports=import("zod")},6249:(e,t)=>{Object.defineProperty(t,"l",{enumerable:!0,get:function(){return function e(t,n){return n in t?t[n]:"then"in t&&"function"==typeof t.then?t.then(t=>e(t,n)):"function"==typeof t&&"default"===n?t:void 0}}})},6506:(e,t,n)=>{n.a(e,async(e,r)=>{try{n.r(t),n.d(t,{config:()=>d,default:()=>l,routeModule:()=>c});var s=n(1802),a=n(7153),o=n(6249),i=n(2956),u=e([i]);i=(u.then?(await u)():u)[0];let l=(0,o.l)(i,"default"),d=(0,o.l)(i,"config"),c=new s.PagesAPIRouteModule({definition:{kind:a.x.PAGES_API,page:"/api/sendEmail",pathname:"/api/sendEmail",bundlePath:"",filename:""},userland:i});r()}catch(e){r(e)}})},2956:(e,t,n)=>{n.a(e,async(e,r)=>{try{n.r(t),n.d(t,{default:()=>u});var s=n(9926),a=n(5184),o=n.n(a),i=e([s]);let l=(s=(i.then?(await i)():i)[0]).z.object({name:s.z.string().nonempty("Пожалуйста, введите ваше имя"),phone:s.z.string().nonempty("Пожалуйста, введите ваш телефон").regex(/^\+38\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/,"Пожалуйста, введите корректный номер телефона"),email:s.z.string().nonempty("Пожалуйста, введите ваш email").email("Пожалуйста, введите корректный email")});async function u(e,t){if("POST"===e.method)try{let n=l.parse(e.body),r=o().createTransport({host:"mail.adm.tools",port:2525,secure:!1,auth:{user:process.env.EMAIL_USER,pass:process.env.EMAIL_PASS}}),s={from:process.env.EMAIL_USER,to:process.env.EMAIL_TO_USER,subject:"New Contact Form Submission",text:`Name: ${n.name}
Phone: ${n.phone}
Email: ${n.email}`};await r.sendMail(s),t.status(200).json({message:"Mail sent successfully!",data:n})}catch(e){if(e instanceof s.z.ZodError)return t.status(400).json({errors:e.errors});return console.error("Error sending email:",e),t.status(500).json({message:"Failed to send email"})}else t.status(405).json({message:"Method Not Allowed"})}r()}catch(e){r(e)}})},7153:(e,t)=>{var n;Object.defineProperty(t,"x",{enumerable:!0,get:function(){return n}}),function(e){e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE"}(n||(n={}))},1802:(e,t,n)=>{e.exports=n(145)}};var t=require("../../webpack-api-runtime.js");t.C(e);var n=t(t.s=6506);module.exports=n})();