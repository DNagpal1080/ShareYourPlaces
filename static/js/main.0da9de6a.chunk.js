(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],[,,,,,,,,,function(e,t,a){"use strict";a.d(t,"a",(function(){return l}));var n=a(0),l=Object(n.createContext)({isLoggedIn:!1,userId:null,token:null,login:function(){},logout:function(){}})},,,,function(e,t,a){"use strict";var n=a(0),l=a.n(n);a(37);t.a=function(e){return l.a.createElement("div",{className:"".concat(e.asOverlay&&"loading-spinner__overlay")},l.a.createElement("div",{className:"lds-dual-ring"}))}},function(e,t,a){"use strict";var n=a(0),l=a.n(n),c=a(4),r=a.n(c);a(27);t.a=function(e){var t=l.a.createElement("div",{className:"backdrop",onClick:e.onClick},e.children);return r.a.createPortal(t,document.getElementById("backdrop-hook"))}},,,,,,,function(e,t,a){e.exports=a(38)},,,,,function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},,,,,,function(e,t,a){},function(e,t,a){},function(e,t,a){"use strict";a.r(t);var n,l=a(0),c=a.n(l),r=a(4),u=a.n(r),o=(a(26),a(1)),i=a(5),m=a(8),s=a(14),E=(a(28),function(e){return c.a.createElement("header",{className:"main-header"},e.children)}),d=(a(29),a(9)),f=(a(30),function(e){var t=Object(l.useContext)(d.a);return c.a.createElement("ul",{className:"nav-links"},c.a.createElement("li",null,c.a.createElement(i.c,{to:"/",exact:!0},"ALL USERS")),t.isLoggedIn&&c.a.createElement("li",null,c.a.createElement(i.c,{to:"/".concat(t.userId,"/places")},"MY PLACES")),t.isLoggedIn&&c.a.createElement("li",null,c.a.createElement(i.c,{to:"/places/new"},"ADD PLACE")),!t.isLoggedIn&&c.a.createElement("li",null,c.a.createElement(i.c,{to:"/auth"},"AUTHENTICATE")),t.isLoggedIn&&c.a.createElement("li",null,c.a.createElement("button",{onClick:t.logout},"LOGOUT")))}),g=a(40),b=(a(36),function(e){var t=c.a.createElement(g.a,{in:e.show,timeout:200,classNames:"slide-in-left",mountOnEnter:!0,unmountOnExit:!0},c.a.createElement("aside",{className:"side-drawer",onClick:e.onClick},e.children," "));return u.a.createPortal(t,document.getElementById("drawer-hook"))}),v=function(e){var t=Object(l.useState)(!1),a=Object(m.a)(t,2),n=a[0],r=a[1],u=function(e){r(!1)};return c.a.createElement(c.a.Fragment,null,n&&c.a.createElement(s.a,{onClick:u}," My Backdrop Component"),c.a.createElement(b,{show:n,onClick:u},c.a.createElement("nav",{className:"main-navigation__drawer-nav"},c.a.createElement(f,null))),c.a.createElement(E,null,c.a.createElement("button",{className:"main-navigation__menu-btn",onClick:function(e){r(!0)}},c.a.createElement("span",null),c.a.createElement("span",null),c.a.createElement("span",null)),c.a.createElement("h1",{className:"main-navigation__title"},"Your Places"),c.a.createElement("nav",{className:"main-navigation__header-nav"},c.a.createElement(f,null))))},h=function(){var e=Object(l.useState)(!1),t=Object(m.a)(e,2),a=t[0],c=t[1],r=Object(l.useState)(),u=Object(m.a)(r,2),o=u[0],i=u[1],s=Object(l.useState)(),E=Object(m.a)(s,2),d=E[0],f=E[1],g=Object(l.useCallback)((function(e,t,a){c(t),i(e);var n=a||new Date((new Date).getTime()+18e5);f(n),localStorage.setItem("userData",JSON.stringify({userId:e,token:t,expiration:n.toISOString()}))}),[]);Object(l.useEffect)((function(){var e=JSON.parse(localStorage.getItem("userData"));e&&e.token&&new Date(e.expiration)>new Date&&g(e.userId,e.token,new Date(e.expiration))}),[g]);var b=Object(l.useCallback)((function(){c(null),f(null),i(null),localStorage.removeItem("userData")}),[]);return Object(l.useEffect)((function(){if(a&&d){var e=d.getTime()-(new Date).getTime();n=setTimeout(b,e)}else clearInterval(n)}),[a,b,d]),{token:a,login:g,logout:b,userId:o}},p=a(13),k=c.a.lazy((function(){return a.e(7).then(a.bind(null,69))})),I=c.a.lazy((function(){return a.e(6).then(a.bind(null,70))})),O=c.a.lazy((function(){return a.e(4).then(a.bind(null,66))})),S=c.a.lazy((function(){return a.e(5).then(a.bind(null,67))})),C=c.a.lazy((function(){return a.e(3).then(a.bind(null,68))})),w=function(){var e,t=h(),a=t.token,n=t.login,r=t.logout,u=t.userId;return e=a?c.a.createElement(o.d,null,c.a.createElement(o.b,{path:"/ShareYourPlaces",exact:!0},c.a.createElement(k,null)),c.a.createElement(o.b,{path:"/:userId/places",exact:!0},c.a.createElement(I,null)),c.a.createElement(o.b,{path:"/places/new",exact:!0},c.a.createElement(O,null)),c.a.createElement(o.b,{path:"/places/:placeId",exact:!0},c.a.createElement(S,null)),c.a.createElement(o.a,{to:"/"})):c.a.createElement(o.d,null,c.a.createElement(o.b,{path:"/ShareYourPlaces",exact:!0},c.a.createElement(k,null)),c.a.createElement(o.b,{path:"/:userId/Places",exact:!0},c.a.createElement(I,null)),c.a.createElement(o.b,{path:"/auth",exact:!0},c.a.createElement(C,null)),c.a.createElement(o.a,{to:"/auth"})),c.a.createElement(d.a.Provider,{value:{isLoggedIn:!!a,token:a,userId:u,login:n,logout:r}},c.a.createElement(c.a.Fragment,null,c.a.createElement(i.a,{basename:"/ShareYourPlaces"},c.a.createElement(v,null),c.a.createElement("main",null,c.a.createElement(l.Suspense,{fallback:c.a.createElement("div",{className:"center"},c.a.createElement(p.a,null))},e)))))};u.a.render(c.a.createElement(w,null),document.getElementById("root"))}],[[21,1,2]]]);
//# sourceMappingURL=main.0da9de6a.chunk.js.map