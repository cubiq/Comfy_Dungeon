var ma=Object.defineProperty;var ha=(e,a,t)=>a in e?ma(e,a,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[a]=t;var Be=(e,a,t)=>(ha(e,typeof a!="symbol"?a+"":a,t),t);(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))l(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&l(o)}).observe(document,{childList:!0,subtree:!0});function t(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function l(n){if(n.ep)return;n.ep=!0;const r=t(n);fetch(n.href,r)}})();function z(){}function ua(e){return e()}function ta(){return Object.create(null)}function Re(e){e.forEach(ua)}function ca(e){return typeof e=="function"}function ue(e,a){return e!=e?a==a:e!==a||e&&typeof e=="object"||typeof e=="function"}function ga(e){return Object.keys(e).length===0}function ba(e,...a){if(e==null){for(const l of a)l(void 0);return z}const t=e.subscribe(...a);return t.unsubscribe?()=>t.unsubscribe():t}function da(e,a,t){e.$$.on_destroy.push(ba(a,t))}function f(e,a){e.appendChild(a)}function D(e,a,t){e.insertBefore(a,t||null)}function G(e){e.parentNode&&e.parentNode.removeChild(e)}function fa(e,a){for(let t=0;t<e.length;t+=1)e[t]&&e[t].d(a)}function y(e){return document.createElement(e)}function he(e){return document.createTextNode(e)}function w(){return he(" ")}function He(e,a,t,l){return e.addEventListener(a,t,l),()=>e.removeEventListener(a,t,l)}function m(e,a,t){t==null?e.removeAttribute(a):e.getAttribute(a)!==t&&e.setAttribute(a,t)}function va(e){return Array.from(e.childNodes)}function Me(e,a){a=""+a,e.data!==a&&(e.data=a)}function Pe(e,a){e.value=a??""}function ya(e,a,t,l){t==null?e.style.removeProperty(a):e.style.setProperty(a,t,l?"important":"")}let Ce;function Se(e){Ce=e}function _a(){if(!Ce)throw new Error("Function called outside component initialization");return Ce}function ka(e){_a().$$.on_mount.push(e)}const pe=[],Ge=[];let me=[];const la=[],wa=Promise.resolve();let Ie=!1;function $a(){Ie||(Ie=!0,wa.then(pa))}function De(e){me.push(e)}const Ne=new Set;let de=0;function pa(){if(de!==0)return;const e=Ce;do{try{for(;de<pe.length;){const a=pe[de];de++,Se(a),Sa(a.$$)}}catch(a){throw pe.length=0,de=0,a}for(Se(null),pe.length=0,de=0;Ge.length;)Ge.pop()();for(let a=0;a<me.length;a+=1){const t=me[a];Ne.has(t)||(Ne.add(t),t())}me.length=0}while(pe.length);for(;la.length;)la.pop()();Ie=!1,Ne.clear(),Se(e)}function Sa(e){if(e.fragment!==null){e.update(),Re(e.before_update);const a=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,a),e.after_update.forEach(De)}}function Ca(e){const a=[],t=[];me.forEach(l=>e.indexOf(l)===-1?a.push(l):t.push(l)),t.forEach(l=>l()),me=a}const Ae=new Set;let Ea;function C(e,a){e&&e.i&&(Ae.delete(e),e.i(a))}function R(e,a,t,l){if(e&&e.o){if(Ae.has(e))return;Ae.add(e),Ea.c.push(()=>{Ae.delete(e),l&&(t&&e.d(1),l())}),e.o(a)}else l&&l()}function Te(e){return(e==null?void 0:e.length)!==void 0?e:Array.from(e)}function O(e){e&&e.c()}function E(e,a,t){const{fragment:l,after_update:n}=e.$$;l&&l.m(a,t),De(()=>{const r=e.$$.on_mount.map(ua).filter(ca);e.$$.on_destroy?e.$$.on_destroy.push(...r):Re(r),e.$$.on_mount=[]}),n.forEach(De)}function L(e,a){const t=e.$$;t.fragment!==null&&(Ca(t.after_update),Re(t.on_destroy),t.fragment&&t.fragment.d(a),t.on_destroy=t.fragment=null,t.ctx=[])}function La(e,a){e.$$.dirty[0]===-1&&(pe.push(e),$a(),e.$$.dirty.fill(0)),e.$$.dirty[a/31|0]|=1<<a%31}function ge(e,a,t,l,n,r,o=null,h=[-1]){const b=Ce;Se(e);const c=e.$$={fragment:null,ctx:[],props:r,update:z,not_equal:n,bound:ta(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(a.context||(b?b.$$.context:[])),callbacks:ta(),dirty:h,skip_bound:!1,root:a.target||b.$$.root};o&&o(c.root);let p=!1;if(c.ctx=t?t(e,a.props||{},(s,_,...i)=>{const v=i.length?i[0]:_;return c.ctx&&n(c.ctx[s],c.ctx[s]=v)&&(!c.skip_bound&&c.bound[s]&&c.bound[s](v),p&&La(e,s)),_}):[],c.update(),p=!0,Re(c.before_update),c.fragment=l?l(c.ctx):!1,a.target){if(a.hydrate){const s=va(a.target);c.fragment&&c.fragment.l(s),s.forEach(G)}else c.fragment&&c.fragment.c();a.intro&&C(e.$$.fragment),E(e,a.target,a.anchor),pa()}Se(b)}class be{constructor(){Be(this,"$$");Be(this,"$$set")}$destroy(){L(this,1),this.$destroy=z}$on(a,t){if(!ca(t))return z;const l=this.$$.callbacks[a]||(this.$$.callbacks[a]=[]);return l.push(t),()=>{const n=l.indexOf(t);n!==-1&&l.splice(n,1)}}$set(a){this.$$set&&!ga(a)&&(this.$$.skip_bound=!0,this.$$set(a),this.$$.skip_bound=!1)}}const Aa="4";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(Aa);function Ma(e){let a;return{c(){a=y("div"),a.innerHTML='<progress id="main-progress" class="progress" value="0" max="0"></progress> <div class="uk-text-center uk-container uk-container-expand"><form><button id="roll" class="uk-button uk-button-danger" type="button"><span id="main-spinner" uk-spinner="ratio: 0.7" style="display: none;"></span><span id="roll-icon" uk-icon="icon: bolt"></span> Roll</button><input id="main-seed" class="uk-input" type="text" placeholder="Seed" aria-label="Seed" value="0"/><label>Random <input id="is-random" class="uk-checkbox" type="checkbox" checked=""/></label></form></div> <div id="results" class="uk-child-width-expand uk-text-center" uk-grid="" uk-lightbox=""></div>',m(a,"id","content"),m(a,"class","uk-light"),m(a,"data-uk-height-viewport","expand: true")},m(t,l){D(t,a,l)},p:z,i:z,o:z,d(t){t&&G(a)}}}class Ta extends be{constructor(a){super(),ge(this,a,null,Ma,ue,{})}}const fe=[];function Ra(e,a=z){let t;const l=new Set;function n(h){if(ue(e,h)&&(e=h,t)){const b=!fe.length;for(const c of l)c[1](),fe.push(c,e);if(b){for(let c=0;c<fe.length;c+=2)fe[c][0](fe[c+1]);fe.length=0}}}function r(h){n(h(e))}function o(h,b=z){const c=[h,b];return l.add(c),l.size===1&&(t=a(n,r)||z),h(e),()=>{l.delete(c),l.size===0&&t&&(t(),t=null)}}return{set:n,update:r,subscribe:o}}const Oa={quality:{key:"quality",value:1,min:0,max:1,step:.25},batchSize:{key:"batchSize",value:1,values:[0,33,66,100],min:1,max:4,step:1},styles:{key:"styles",options:[{value:"ProteusV0.3-LCM",label:"Illustration - Fast"},{value:"ProteusV0.3",label:"Illustration - Accurate"},{value:"ProteusV0.3-LCM-Anime",label:"Anime - Fast"},{value:"ProteusV0.3-Anime",label:"Anime - Accurate"},{value:"DreamShaperXLTurboV2-Cinematic",label:"Cinematic"}],selected:"ProteusV0.3"},settings:{key:"settings",options:[{value:"fantasy",label:"Fantasy"}],selected:"fantasy"},backgrounds:{key:"backgrounds",options:[{value:"",label:"-- undefined --"},{value:"inside a cave",label:"Cave"},{value:"in the desert",label:"Desert"},{value:"inside a dungeon",label:"Dungeon"},{value:"flames in background",label:"Flames"},{value:"forest in background",label:"Forest"},{value:"on a glacier",label:"Glacier"},{value:"magical aura in background",label:"Magical aura"},{value:"mountains in background",label:"Mountains"},{value:"flat plain background",label:"Plain background"},{value:"in the study, scrolls and potions",label:"Study"},{value:"inside a temple",label:"Temple"},{value:"on the streets of an old town",label:"Town"}],selected:""},moods:{key:"moods",options:[{value:"angry evil",label:"Angry"},{value:"wise thoughtful serious mood",label:"Somber"},{value:"",label:"Neutral"},{value:"cunning smirk mood",label:"Cunning"},{value:"serene joyful dreamy",label:"Serene"},{value:"happy jovial (smiling:0.85)",label:"Happy"}],selected:""},colors:{key:"colors",options:[{value:"",label:"-- undefined --"},{value:"burgundy",label:"Burgundy"},{value:"scarlet red",label:"Scarlet"},{value:"pink",label:"Pink"},{value:"beige",label:"Beige"},{value:"brown",label:"Brown"},{value:"orange",label:"Orange"},{value:"yellow",label:"Yellow"},{value:"green",label:"Green"},{value:"emerald",label:"Emerald"},{value:"aquamarine",label:"Aquamarine"},{value:"cerulean",label:"Cerulean"},{value:"blue",label:"Blue"},{value:"purple",label:"Purple"},{value:"magenta",label:"Magenta"},{value:"white",label:"White"},{value:"gray",label:"Gray"},{value:"black",label:"Black"},{value:"bronze",label:"Bronze"},{value:"copper",label:"Copper"},{value:"silver",label:"Silver"},{value:"gold",label:"Gold"}],selected:"random"},gender:{key:"gender",value:0,min:0,max:3,step:1},age:{key:"age",value:1,min:0,max:3,step:1},bodyStructure:{key:"bodyStructure",value:1,min:0,max:3,step:1},race:{key:"race",options:[{value:"",label:"-- undefined --"},{value:"dwarf",label:"Dwarf"},{value:"elf",label:"Elf"},{value:"gnome",label:"Gnome"},{value:"half-elf",label:"Half-Elf"},{value:"half-orc",label:"Half-Orc"},{value:"halfling",label:"Halfling"},{value:"human",label:"Human"},{value:"tiefling",label:"Tiefling"}],selected:""},ethnicity:{key:"ethnicity",options:[{value:"",label:"-- undefined --"},{value:"0",label:"Completely Random"},{value:"1",label:"Africa: Eastern"},{value:"2",label:"Africa: Middle"},{value:"3",label:"Africa: Northern"},{value:"4",label:"Africa: Southern"},{value:"5",label:"Africa: Western"},{value:"6",label:"America: Central"},{value:"7",label:"America: Northern"},{value:"8",label:"America: Southern"},{value:"9",label:"Asia: Central"},{value:"10",label:"Asia: Eastern"},{value:"11",label:"Asia: South-Eastern"},{value:"12",label:"Asia: Southern"},{value:"13",label:"Asia: Western"},{value:"14",label:"Australia &amp; New Zealand"},{value:"15",label:"European: Eastern"},{value:"16",label:"European: Northern"},{value:"17",label:"European: Southern"},{value:"18",label:"European: Western"},{value:"19",label:"European: Islandic"},{value:"21",label:"Mela/Micro/Poly-nesia"}],selected:""},class:{key:"class",options:[{value:"cleric",label:"Cleric"},{value:"fighter",label:"Fighter"},{value:"mage",label:"Mage"},{value:"noble person",label:"Noble person"},{value:"Paladin",label:"Paladin"},{value:"peasant",label:"Peasant"},{value:"ranger",label:"Ranger"},{value:"shaman",label:"Shaman"},{value:"thief",label:"Thief"}],selected:""},armor:{key:"armor",options:[{value:"",label:"-- undefined --"},{value:"casual clothing",label:"Casual clothing"},{value:"elegant garments",label:"Elegant clothing"},{value:"furs clothing",label:"Furs"},{value:"a leather armor",label:"Light armor"},{value:"minimal simple clothing",label:"Minimal"},{value:"an heavy armor",label:"Heavy armor"},{value:"noble clothing",label:"Noble clothing"},{value:"rags",label:"Rags"},{value:"a robe",label:"Robe"}],selected:""},hairStyle:{key:"hairStyle",options:[{value:"",label:"-- undefined --"},{value:"bald",label:"Bald"},{value:"simple braid hairstyle",label:"Braids"},{value:"buzz haircut",label:"Buzz cut"},{value:"cornrows hairstyle",label:"Cornrows"},{value:"long {{ COLOR }}curly hair",label:"Curly Long"},{value:"short {{ COLOR }}curly hair",label:"Curly Short"},{value:"dreadlocks hairstyle",label:"Dreadlocks"},{value:"long {{ COLOR }}hair",label:"Long hair"},{value:"long {{ COLOR }}disheveled hair",label:"Long disheveled"},{value:"long {{ COLOR }}straight hair",label:"Long straight"},{value:"short mohawk hairstyle",label:"Mohawk"},{value:"pixie haircut",label:"Pixie cut"},{value:"ponytail hairstyle",label:"Ponytail"},{value:"short {{ COLOR }}hair",label:"Short hair"},{value:"short {{ COLOR }}disheveled hair",label:"Short disheveled"},{value:"short {{ COLOR }}straight hair",label:"Short straight"}],selected:""},hairColor:{key:"hairColor",options:[{value:"",label:"-- undefined --"},{value:"blond",label:"Blond"},{value:"dark blond",label:"Dark Blond"},{value:"medium brown",label:"Medium Brown"},{value:"dark brown",label:"Dark Brown"},{value:"reddish brown",label:"Reddish Brown"},{value:"red",label:"Red"},{value:"black",label:"Black"},{value:"canescent",label:"Graying"},{value:"gray",label:"Gray"},{value:"white",label:"White"}],selected:""}};function za(){const{subscribe:e,update:a}=Ra(Oa);return{subscribe:e,updateSelected:(t,l)=>{a(n=>{const r=n[t];return r.options?r.selected=l:r.value=l,n})}}}const Oe=za();function na(e,a,t){const l=e.slice();return l[8]=a[t],l[12]=t,l}function Ba(e){let a,t,l,n=e[1][0]+"",r,o,h,b=e[1][1]+"",c,p;return{c(){a=y("div"),t=y("div"),l=y("span"),r=he(n),o=w(),h=y("div"),c=he(b),p=y("span"),m(l,"uk-icon","icon: arrow-left"),m(t,"class","uk-width-1-2@s"),m(p,"uk-icon","icon: arrow-right"),m(h,"class","uk-width-1-2@s"),ya(h,"text-align","right"),m(a,"class","uk-form-label uk-text-muted"),m(a,"uk-grid","")},m(s,_){D(s,a,_),f(a,t),f(t,l),f(t,r),f(a,o),f(a,h),f(h,c),f(h,p)},p(s,_){_&2&&n!==(n=s[1][0]+"")&&Me(r,n),_&2&&b!==(b=s[1][1]+"")&&Me(c,b)},d(s){s&&G(a)}}}function Na(e){let a,t=Te(e[1]),l=[];for(let n=0;n<t.length;n+=1)l[n]=ia(na(e,t,n));return{c(){a=y("datalist");for(let n=0;n<l.length;n+=1)l[n].c();m(a,"id","batch-size-values"),m(a,"class","uk-form-label uk-text-muted")},m(n,r){D(n,a,r);for(let o=0;o<l.length;o+=1)l[o]&&l[o].m(a,null)},p(n,r){if(r&2){t=Te(n[1]);let o;for(o=0;o<t.length;o+=1){const h=na(n,t,o);l[o]?l[o].p(h,r):(l[o]=ia(h),l[o].c(),l[o].m(a,null))}for(;o<l.length;o+=1)l[o].d(1);l.length=t.length}},d(n){n&&G(a),fa(l,n)}}}function ia(e){let a,t;return{c(){a=y("option"),a.__value=t=e[8],Pe(a,a.__value),m(a,"label",String(e[12]))},m(l,n){D(l,a,n)},p(l,n){n&2&&t!==(t=l[8])&&(a.__value=t,Pe(a,a.__value))},d(l){l&&G(a)}}}function Pa(e){let a,t,l,n,r,o,h,b,c,p=e[7]&&Ba(e),s=!e[7]&&Na(e);return{c(){a=y("div"),t=y("label"),l=he(e[0]),n=w(),r=y("input"),o=w(),p&&p.c(),h=w(),s&&s.c(),m(t,"class","uk-form-label"),m(t,"for",e[2]+"-input"),m(r,"class","uk-range"),m(r,"id",e[2]+"-input"),m(r,"type","range"),r.value=e[8],m(r,"min",e[3]),m(r,"max",e[4]),m(r,"step",e[5]),m(r,"aria-label","Range"),m(a,"class","uk-width-1-2@s")},m(_,i){D(_,a,i),f(a,t),f(t,l),f(a,n),f(a,r),f(a,o),p&&p.m(a,null),f(a,h),s&&s.m(a,null),b||(c=He(r,"change",e[6]),b=!0)},p(_,[i]){i&1&&Me(l,_[0]),_[7]&&p.p(_,i),_[7]||s.p(_,i)},i:z,o:z,d(_){_&&G(a),p&&p.d(),s&&s.d(),b=!1,c()}}}function Ga(e,a,t){let{props:l}=a;const{key:n,value:r,min:o,max:h,step:b,values:c}=l;let{label:p}=a,{bottomLabels:s}=a;function _(v){Oe.updateSelected(n,v.target.value)}const i=s.length===2;return e.$$set=v=>{"props"in v&&t(9,l=v.props),"label"in v&&t(0,p=v.label),"bottomLabels"in v&&t(1,s=v.bottomLabels)},[p,s,n,o,h,b,_,i,r,l]}class we extends be{constructor(a){super(),ge(this,a,Ga,Pa,ue,{props:9,label:0,bottomLabels:1})}}function ra(e,a,t){const l=e.slice();return l[8]=a[t],l}function sa(e){let a,t=e[8].label+"",l;return{c(){a=y("option"),l=he(t),a.__value=e[8].value,Pe(a,a.__value),a.selected=e[8].value===e[3]},m(n,r){D(n,a,r),f(a,l)},p:z,d(n){n&&G(a)}}}function Ia(e){let a,t,l,n,r,o,h,b,c=Te(e[2]),p=[];for(let s=0;s<c.length;s+=1)p[s]=sa(ra(e,c,s));return{c(){a=y("div"),t=y("label"),l=he(e[0]),n=w(),r=y("div"),o=y("select");for(let s=0;s<p.length;s+=1)p[s].c();m(t,"class","uk-form-label"),m(t,"for",e[1]+"-input"),m(o,"class","uk-select"),m(o,"id",e[1]+"-input"),m(o,"aria-label","Select"),m(r,"class","uk-form-controls"),m(a,"class",e[5])},m(s,_){D(s,a,_),f(a,t),f(t,l),f(a,n),f(a,r),f(r,o);for(let i=0;i<p.length;i+=1)p[i]&&p[i].m(o,null);h||(b=He(o,"change",e[4]),h=!0)},p(s,[_]){if(_&1&&Me(l,s[0]),_&12){c=Te(s[2]);let i;for(i=0;i<c.length;i+=1){const v=ra(s,c,i);p[i]?p[i].p(v,_):(p[i]=sa(v),p[i].c(),p[i].m(o,null))}for(;i<p.length;i+=1)p[i].d(1);p.length=c.length}},i:z,o:z,d(s){s&&G(a),fa(p,s),h=!1,b()}}}function Da(e,a,t){let{props:l}=a;const{key:n,options:r,selected:o}=l;let{label:h}=a,{size:b="full-width"}=a;function c(s){Oe.updateSelected(n,s.target.value)}const p=b==="full-width"?"uk-width-1-1@s":"uk-width-1-2@s";return e.$$set=s=>{"props"in s&&t(6,l=s.props),"label"in s&&t(0,h=s.label),"size"in s&&t(7,b=s.size)},[h,n,r,o,c,p,l,b]}class W extends be{constructor(a){super(),ge(this,a,Da,Ia,ue,{props:6,label:0,size:7})}}function Ha(e){let a,t,l,n,r,o,h,b,c,p,s,_,i,v,q,J,Z,x,le,g,u,A,M,S,k,ae,H,I,B,X,Ee,$,P,N,F,re,U,se,ce,ve,V,oe,Q,ye,j,_e,ee,ke,Y,ne,K,te,ie,Le;return s=new we({props:{label:"Quality",props:e[0].quality,bottomLabels:["Speed","Accuracy"]}}),i=new we({props:{label:"Results per generation",props:e[0].batchSize,bottomLabels:e[0].batchSize.values}}),q=new W({props:{label:"Preset",props:e[0].styles}}),u=new W({props:{label:"Setting",props:e[0].settings,size:"half-width"}}),M=new W({props:{label:"Background",props:e[0].backgrounds,size:"half-width"}}),k=new W({props:{label:"Mood",props:e[0].moods,size:"half-width"}}),H=new W({props:{label:"Color",props:e[0].colors,size:"half-width"}}),P=new we({props:{label:"Gender",props:e[0].gender,bottomLabels:["Femininity","Masculinity"]}}),F=new we({props:{label:"Age",props:e[0].age,bottomLabels:["Young","Old"]}}),U=new we({props:{label:"Body Structure",props:e[0].bodyStructure,bottomLabels:["Slender","Chubby"]}}),V=new W({props:{label:"Race",props:e[0].race,size:"half-width"}}),Q=new W({props:{label:"Ethnic Bias",props:e[0].ethnicity,size:"half-width"}}),j=new W({props:{label:"Class",props:e[0].class,size:"half-width"}}),ee=new W({props:{label:"Clothing/Armor",props:e[0].armor,size:"half-width"}}),Y=new W({props:{label:"Hair Style",props:e[0].hairStyle,size:"half-width"}}),K=new W({props:{label:"Hair Color",props:e[0].hairColor,size:"half-width"}}),{c(){a=y("aside"),t=y("h4"),t.innerHTML="Comfy Dungeon<small><sup>v0.1.1</sup></small>",l=w(),n=y("div"),r=y("form"),o=y("div"),h=y("div"),b=y("a"),b.textContent="Generation params",c=w(),p=y("div"),O(s.$$.fragment),_=w(),O(i.$$.fragment),v=w(),O(q.$$.fragment),J=w(),Z=y("div"),x=y("a"),x.textContent="Scene",le=w(),g=y("div"),O(u.$$.fragment),A=w(),O(M.$$.fragment),S=w(),O(k.$$.fragment),ae=w(),O(H.$$.fragment),I=w(),B=y("div"),X=y("a"),X.textContent="Character",Ee=w(),$=y("div"),O(P.$$.fragment),N=w(),O(F.$$.fragment),re=w(),O(U.$$.fragment),se=w(),ce=y("div"),ve=w(),O(V.$$.fragment),oe=w(),O(Q.$$.fragment),ye=w(),O(j.$$.fragment),_e=w(),O(ee.$$.fragment),ke=w(),O(Y.$$.fragment),ne=w(),O(K.$$.fragment),te=w(),ie=y("div"),ie.innerHTML=`<a class="uk-accordion-title" href="">Custom</a> <div class="uk-accordion-content uk-grid-small" uk-grid=""><div class="uk-width-1-1@s"><label class="uk-form-label" for="custom-input">Custom prompt</label> <button uk-icon="icon: question" type="button"></button> <div class="uk-card uk-card-small uk-card-body uk-card-default" uk-drop="pos: right-top; mode: click;">Keep it simple. Don&#39;t be too discoursive, write the element that you&#39;d want to add. Eg: &quot;red scarf&quot; or
                &quot;silver tiara&quot;. You might need to add strength with the syntax &quot;(silver tiara:1.2)&quot;.<br/>If the element
                is generic and could be misinterpreted try to give context. Eg: instead of &quot;crown&quot; try with &quot;wearing a
                silver crown on his head&quot;.</div> <div class="uk-form-controls"><textarea name="custom-input" class="uk-textarea" id="custom-input" rows="3" placeholder="Add a custom element" aria-label="Textarea"></textarea></div></div></div>`,m(t,"class","uk-text-center uk-margin-remove-vertical text-light"),m(b,"class","uk-accordion-title"),m(b,"href",""),m(p,"class","uk-accordion-content uk-grid-small"),m(p,"uk-grid",""),m(x,"class","uk-accordion-title"),m(x,"href",""),m(g,"class","uk-accordion-content uk-grid-small"),m(g,"uk-grid",""),m(X,"class","uk-accordion-title"),m(X,"href",""),m(ce,"class","width-1-2@s"),m($,"class","uk-accordion-content uk-grid-small"),m($,"uk-grid",""),m(o,"uk-accordion","collapsible: false"),m(r,"class","uk-grid-small"),m(n,"class","left-content-box left-nav-wrap"),m(a,"id","left-col"),m(a,"class","uk-light uk-visible@m")},m(d,T){D(d,a,T),f(a,t),f(a,l),f(a,n),f(n,r),f(r,o),f(o,h),f(h,b),f(h,c),f(h,p),E(s,p,null),f(p,_),E(i,p,null),f(p,v),E(q,p,null),f(o,J),f(o,Z),f(Z,x),f(Z,le),f(Z,g),E(u,g,null),f(g,A),E(M,g,null),f(g,S),E(k,g,null),f(g,ae),E(H,g,null),f(o,I),f(o,B),f(B,X),f(B,Ee),f(B,$),E(P,$,null),f($,N),E(F,$,null),f($,re),E(U,$,null),f($,se),f($,ce),f($,ve),E(V,$,null),f($,oe),E(Q,$,null),f($,ye),E(j,$,null),f($,_e),E(ee,$,null),f($,ke),E(Y,$,null),f($,ne),E(K,$,null),f(o,te),f(o,ie),Le=!0},p(d,[T]){const qe={};T&1&&(qe.props=d[0].quality),s.$set(qe);const ze={};T&1&&(ze.props=d[0].batchSize),T&1&&(ze.bottomLabels=d[0].batchSize.values),i.$set(ze);const xe={};T&1&&(xe.props=d[0].styles),q.$set(xe);const je={};T&1&&(je.props=d[0].settings),u.$set(je);const Fe={};T&1&&(Fe.props=d[0].backgrounds),M.$set(Fe);const Ve={};T&1&&(Ve.props=d[0].moods),k.$set(Ve);const Ye={};T&1&&(Ye.props=d[0].colors),H.$set(Ye);const Ke={};T&1&&(Ke.props=d[0].gender),P.$set(Ke);const Ue={};T&1&&(Ue.props=d[0].age),F.$set(Ue);const We={};T&1&&(We.props=d[0].bodyStructure),U.$set(We);const Je={};T&1&&(Je.props=d[0].race),V.$set(Je);const Ze={};T&1&&(Ze.props=d[0].ethnicity),Q.$set(Ze);const Xe={};T&1&&(Xe.props=d[0].class),j.$set(Xe);const Qe={};T&1&&(Qe.props=d[0].armor),ee.$set(Qe);const ea={};T&1&&(ea.props=d[0].hairStyle),Y.$set(ea);const aa={};T&1&&(aa.props=d[0].hairColor),K.$set(aa)},i(d){Le||(C(s.$$.fragment,d),C(i.$$.fragment,d),C(q.$$.fragment,d),C(u.$$.fragment,d),C(M.$$.fragment,d),C(k.$$.fragment,d),C(H.$$.fragment,d),C(P.$$.fragment,d),C(F.$$.fragment,d),C(U.$$.fragment,d),C(V.$$.fragment,d),C(Q.$$.fragment,d),C(j.$$.fragment,d),C(ee.$$.fragment,d),C(Y.$$.fragment,d),C(K.$$.fragment,d),Le=!0)},o(d){R(s.$$.fragment,d),R(i.$$.fragment,d),R(q.$$.fragment,d),R(u.$$.fragment,d),R(M.$$.fragment,d),R(k.$$.fragment,d),R(H.$$.fragment,d),R(P.$$.fragment,d),R(F.$$.fragment,d),R(U.$$.fragment,d),R(V.$$.fragment,d),R(Q.$$.fragment,d),R(j.$$.fragment,d),R(ee.$$.fragment,d),R(Y.$$.fragment,d),R(K.$$.fragment,d),Le=!1},d(d){d&&G(a),L(s),L(i),L(q),L(u),L(M),L(k),L(H),L(P),L(F),L(U),L(V),L(Q),L(j),L(ee),L(Y),L(K)}}}function qa(e,a,t){let l;return da(e,Oe,n=>t(0,l=n)),[l]}class xa extends be{constructor(a){super(),ge(this,a,qa,Ha,ue,{})}}function ja(e){let a;return{c(){a=y("div"),a.innerHTML='<div class="uk-modal-dialog uk-modal-body"><h2 class="uk-modal-title">An error occurred</h2> <p id="modal-message"></p> <p class="uk-text-center"><button class="uk-button uk-button-default uk-modal-close" type="button">Close</button></p></div>',m(a,"id","app-modal"),m(a,"uk-modal","")},m(t,l){D(t,a,l)},p:z,i:z,o:z,d(t){t&&G(a)}}}class Fa extends be{constructor(a){super(),ge(this,a,null,ja,ue,{})}}const Va="{{SETTING}} {{STYLE}} closeup of a {{AGE}} {{BODY}}{{ETHNICITY}}{{RACE}} {{GENDER}} {{CLASS}}{{HAIR_COLOR}}{{HAIRSTYLE}}{{GEAR}}.{{RACE_HELPER}}{{BACKGROUND}} High quality, detailed, high resolution{{SETTING_HELPER}}.{{MOOD}}{{ATMOSPHERE}}",Ya="{{STYLE}}{{RACE}}rendering, blurry, noisy, deformed, text, {{GENDER}}scars, blood, dirty, nipples, naked, boobs, cleavage, face mask, Christmas, garden, zippers, ill, lazy eye, {{BACKGROUND}} author, signature, 3d",$e={1:["Eritrean","Djiboutian","Ethiopian","Somali","Kenyan","Ugandan","Rwandan","Burundian","Tanzanian","Malagasy","Mauritian","Seychellois"],2:["Chadian","Sudanese","Central African","Cameroonian","Gabonese","Equatorial Guinean","Sao Tomean","Angolan","Congolese","Zambian","Malawian","Mozambican","Madagascan","Comorian","Mauritian","Seychellois"],3:["Egyptian","Libyan","Tunisian","Algerian","Moroccan","Mauritanian","Sahrawi","Tuareg"],4:["Namibian","South African","Botswanan","Zimbabwean","Zambian","Malawian","Mozambican","Swazi","Lesotho","Basotho"],5:["Mauritanian","Senegalese","Malian","Nigerien","Burkinabe","Ivorian","Ghanaian","Togolese","Beninese","Nigerian","Cameroonian","Equatorial Guinean","Sao Tomean","Gabonese","Congolese"],6:["Belizean","Costa Rican","Salvadoran","Guatemalan","Honduran","Nicaraguan","Panamanian"],7:["Antiguan","Bahamian","Barbadian","Cuban","Dominican","Dominican","Grenadian","Haitian","Jamaican","Kittian and Nevisian","Lucian","Vincentian","Trinidadian and Tobagonian"],8:["Argentine","Bolivian","Brazilian","Chilean","Colombian","Ecuadorian","Guyanese","Paraguayan","Peruvian","Surinamese","Uruguayan","Venezuelan"],9:["Kazakhstani","Kyrgyzstani","Tajikistani","Turkmen","Uzbekistani"],10:["Chinese","Japanese","Korean","Mongolian","Taiwanese"],11:["Bangladeshi","Bhutanese","Indian","Maldivian","Nepalese","Pakistani","Sri Lankan"],12:["Burmese","Cambodian","Filipino","Indonesian","Laotian","Malaysian","Singaporean","Thai","Timorese","Vietnamese"],13:["Afghan","Armenian","Azerbaijani","Bahraini","Cypriot","Georgian","Iranian","Iraqi","Israeli","Jordanian","Kuwaiti","Lebanese","Omani","Palestinian","Qatari","Saudi","Syrian","Turkish","Emirati","Yemeni"],14:["Australian","Fijian","I-Kiribati","Marshallese","Micronesian","Nauruan","New Zealander","Palauan","Papua New Guinean","Samoan","Solomon Islander","Tongan","Tuvaluan","Vanuatuan"],15:["Belarusian","Bulgarian","Czech","Hungarian","Polish","Moldovan","Romanian","Russian","Slovak","Ukrainian"],16:["Estonian","Latvian","Lithuanian"],17:["Albanian","Bosnian","Croatian","Greek","Italian","Maltese","Montenegrin","North Macedonian","Portuguese","Serbian","Slovenian","Spanish"],18:["Austrian","Belgian","Dutch","French","German","Liechtensteiner","Luxembourger","Monacan","Swiss"],19:["Icelandic","Irish","Manx","British"],21:["Fijian","Papua New Guinean","Solomon Islander","Vanuatuan","Kiribati","Marshallese","Micronesian","Nauruan","Palauan","Samoan","Tongan","Tuvaluan"]};function Ka(e){return function(){e|=0,e=e+2654435769|0;var a=e^e>>>16;return a=Math.imul(a,569420461),a=a^a>>>15,a=Math.imul(a,1935289751),((a=a^a>>>15)>>>0)/4294967296}}function Ua(){return("10000000-1000-4000-8000"+-1e11).replace(/[018]/g,e=>(e^crypto.getRandomValues(new Uint8Array(1))[0]&15>>e/4).toString(16))}function Wa(e){let a,t,l,n,r,o,h,b,c,p,s,_;return a=new xa({}),h=new Ta({}),c=new Fa({}),{c(){O(a.$$.fragment),t=w(),l=y("button"),l.textContent="ROOLLLLLL",n=w(),r=y("div"),o=w(),O(h.$$.fragment),b=w(),O(c.$$.fragment),m(l,"class","absolute z-30 w-[200px] text-5xl right-0 bg-red-500"),m(r,"class","absolute bottom-0 right-0 w-[300px] h-[300px] z-30 bg-yellow-300")},m(i,v){E(a,i,v),D(i,t,v),D(i,l,v),D(i,n,v),D(i,r,v),e[2](r),D(i,o,v),E(h,i,v),D(i,b,v),E(c,i,v),p=!0,s||(_=He(l,"click",e[1]),s=!0)},p:z,i(i){p||(C(a.$$.fragment,i),C(h.$$.fragment,i),C(c.$$.fragment,i),p=!0)},o(i){R(a.$$.fragment,i),R(h.$$.fragment,i),R(c.$$.fragment,i),p=!1},d(i){i&&(G(t),G(l),G(n),G(r),G(o),G(b)),L(a,i),e[2](null),L(h,i),L(c,i),s=!1,_()}}}const oa="http://localhost:8188";function Ja(e,a,t){let l;da(e,Oe,i=>t(6,l=i));let n;const r=Ua();let o,h,b;function c(){b=new Date}async function p(i={}){const v={prompt:i,client_id:r};return await(await fetch(oa+"/prompt",{method:"POST",cache:"no-cache",headers:{"Content-Type":"application/json"},body:JSON.stringify(v)})).json()}ka(async()=>{function i(){return b?(new Date().getTime()-b)/1e3:0}async function v(){let g={basic_portrait:"/workflows/basic_portrait.json",basic_portrait_lcm:"/workflows/basic_portrait_lcm.json"};for(let u in g){let A=await fetch(g[u]);g[u]=await A.json()}return g}o=await v();async function q(){let g=await fetch(oa+"/object_info/CheckpointLoaderSimple",{method:"GET",cache:"no-cache",headers:{"Content-Type":"application/json"}});g=await g.json();let u=g.CheckpointLoaderSimple.input.required.ckpt_name[0];const A={DreamShaperXLTurboV2:/.*dreamshaper.*xl.*v2.*turbo.*\.safetensors$/gi,"ProteusV0.3":/.*proteus.*0\.3.*\.safetensors$/gi};let M={};for(let S in A)M[S]="",u.forEach(k=>{A[S].test(k)&&(M[S]=k)});return console.log(M),M}h=await q();let J=window.location.hostname+":"+window.location.port;J="localhost:8188";function Z(g=0,u=0){}const x=window.location.protocol==="https:"?"wss:":"ws:";console.log(x,J,r);const le=new WebSocket(x+"//"+J+"/ws?clientId="+r);le.addEventListener("open",g=>{console.log("Connected to the server")}),le.addEventListener("message",g=>{console.log("EVENT:",g);const u=JSON.parse(g.data);if(u.type==="progress")u.data.max,u.data.value;else if(u.type==="executed"){const A=i();if(console.log("Execution time: "+A+"s"),"images"in u.data.output){t(0,n.innerHTML="",n);const M=u.data.output.images,S=M.length>1?' class="uk-width-1-2"':"";for(let k=0;k<M.length;k++){const ae=M[k].filename,H=M[k].subfolder,I=Math.random();console.log(ae),t(0,n.innerHTML+="<div"+S+'><div><a href="http://localhost:8188/view?filename='+ae+"&type=output&subfolder="+H+"&rand="+I+'" data-type="image"><img src="http://localhost:8188/view?filename='+ae+"&type=output&subfolder="+H+"&rand="+I+'" width="1024" height="1024" alt=""></a></div></div>',n)}}}else u.type==="execution_interrupted"?console.log("Execution Interrupted"):u.type==="status"&&u.data.status.exec_info.queue_remaining>0})});async function s(){let i=structuredClone(o.basic_portrait);console.log(i);let v=14,q=14,J="dpmpp_2m",Z="exponential",x=6.5;const le=l.styles;console.log(le.options);let g=le.selected;console.log(g);let u=Va,A=Ya,M=l.settings.selected,S=String(l.bodyStructure.value),k=l.race.selected,ae="",H="",I=String(l.age.value),B=String(l.gender.value),X="",Ee=l.class.selected,$=l.armor.selected,P=l.hairStyle.selected,N=l.hairStyle.selected,F=l.backgrounds.selected,re=l.moods.selected,U=l.colors.selected,se=l.ethnicity.selected,ce="",ve="",V="",oe="",Q=!1,ye=Math.random()*1e5,j=Ka(ye);g.includes("-Cinematic")?(V="film still cinematic photo",oe="illustration, anime, cosplay, ",Q=!0):g.includes("-Anime")?(V="anime illustration",oe="photo, fanart, "):(V="illustration digital painting",oe="photo, anime, "),u=u.replace("{{STYLE}}",V),A=A.replace("{{STYLE}}",oe),M==="fantasy"&&(u=u.replace("{{SETTING}}","fantasy"),Q?u=u.replace("{{SETTING_HELPER}}",", (D&D:1.1), Lord of the rings"):u=u.replace("{{SETTING_HELPER}}",", (D&D:1.1), (Lord of the rings:0.8)")),S=="0"?S="slender ":S=="1"?(S="",(k==="halfling"||k==="gnome"||k==="dwarf")&&(S="stocky ")):S=="2"?(B=="0"||B=="1"?S="strong muscular ":S="strong ",(k==="halfling"||k==="gnome"||k==="dwarf")&&(S="stocky "+S)):S=="3"&&(S="chubby ",(k==="halfling"||k==="gnome"||k==="dwarf")&&(S="stocky "+S)),u=u.replace("{{BODY}}",S),k==="human"?H="(elf, long pointy ears:1.2), ":k==="half-elf"||k==="halfling"?ae=" pointy ears.":k==="elven"&&(H="green, beard, "),u=u.replace("{{RACE}}",k),u=u.replace("{{RACE_HELPER}}",ae),A=A.replace("{{RACE}}",H),I=="0"?I="young":I=="1"?I="30yo":I=="2"?I="45yo":I=="3"&&(I="60yo"),u=u.replace("{{AGE}}",I),B=="0"?(B="female",X="horror, "):B=="1"?(B="(masculine:1.1) female",k!=="elven"&&(X="beard, ")):B=="2"?(B="(queer:0.9) feminine male",X="zombie, beard, "):B=="3"&&(B="male"),u=u.replace("{{GENDER}}",B),A=A.replace("{{GENDER}}",X),u=u.replace("{{CLASS}}",Ee),$!==""&&($=" wearing "+$),u=u.replace("{{GEAR}}",$),N==="bald"&&(P=""),N==="simple braid hairstyle"&&(B.includes("female")?N="(simple braid hairstyle:0.7)":N="simple braid hairstyle"),P!==""&&(N.includes("{{COLOR}}")?(P=" with "+N.replace("{{COLOR}}",P+" "),N=""):P=" with "+P+" hair"),u=u.replace("{{HAIR_COLOR}}",P),N=N.replace("{{COLOR}}",""),N!==""&&(P!==""?N=" and "+N:N=" with "+N),u=u.replace("{{HAIRSTYLE}}",N),F!==""&&(F=" "+F+".",ve="flat background, "),u=u.replace("{{BACKGROUND}}",F),A=A.replace("{{BACKGROUND}}",ve);let _e=!!g.includes("-LCM"),ee=!!g.includes("Turbo");if(g=g.replace("-LCM",""),g=g.replace("-Anime",""),g=g.replace("-Cinematic",""),(_e||ee)&&(v=4,q=4),_e&&(i=structuredClone(o.basic_portrait_lcm),x=2.5,J="lcm",Z="normal"),ee&&(x=2),re!==""&&(re=" "+re,U=", "+U),u=u.replace("{{MOOD}}",re),u=u.replace("{{ATMOSPHERE}}",U),se!==""){let Y,ne,K,te;if(se==="0"){let ie=Object.keys($e);K=$e[ie[Math.floor(j()*ie.length)]],te=$e[ie[Math.floor(j()*ie.length)]]}else K=$e[se],te=$e[se];for(Y=K[Math.floor(j()*K.length)],ne=te[Math.floor(j()*te.length)];Y===ne;)ne=te[Math.floor(j()*te.length)];console.log("Ethnicity: "+Y+", "+ne),ce="("+Y+", "+ne+":0.7) "}u=u.replace("{{ETHNICITY}}",ce),g==="DreamShaperXLTurboV2"&&(J="dpmpp_sde",i[14]={inputs:{multiplier:.7,model:["1",0]},class_type:"RescaleCFG",_meta:{title:"RescaleCFG"}},i[7].inputs.model=["14",0],x=4,v=6,Z="karras"),console.log("MODEL",g),i[1].inputs.ckpt_name=h[g],i[7].inputs.sampler_name=J,i[7].inputs.scheduler=Z,i[7].inputs.seed=ye,i[7].inputs.steps=v+Math.round(l.quality.value*q),i[7].inputs.cfg=x,i[6].inputs.batch_size=l.batchSize.value,i[4].inputs.text=u,i[5].inputs.text=A,c();let ke=await p(i);i=null,"error"in ke&&console.log(ke)}function _(i){Ge[i?"unshift":"push"](()=>{n=i,t(0,n)})}return[n,s,_]}class Za extends be{constructor(a){super(),ge(this,a,Ja,Wa,ue,{})}}new Za({target:document.getElementById("app")});
