import{a as Cs,h as J,n as rt}from"./noise-B5YP1XTR.js";/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const wl="170",pp=0,eh=1,mp=2,Zf=1,gp=2,Yn=3,Si=0,Ke=1,we=2,_i=0,bs=1,fn=2,nh=3,ih=4,vp=5,Fi=100,Mp=101,_p=102,xp=103,yp=104,Sp=200,wp=201,bp=202,Tp=203,Sc=204,wc=205,Ep=206,Ap=207,Rp=208,Cp=209,Pp=210,Lp=211,Dp=212,Ip=213,Up=214,bc=0,Tc=1,Ec=2,Ps=3,Ac=4,Rc=5,Cc=6,Pc=7,bl=0,Np=1,Fp=2,xi=0,zp=1,Op=2,Bp=3,kp=4,Hp=5,Gp=6,Vp=7,Kf=300,Ls=301,Ds=302,Lc=303,Dc=304,$r=306,Ic=1e3,Oi=1001,Uc=1002,ze=1003,Wp=1004,Do=1005,Ln=1006,pa=1007,Bi=1008,ei=1009,jf=1010,$f=1011,vo=1012,Tl=1013,Wi=1014,Dn=1015,bo=1016,El=1017,Al=1018,Is=1020,Jf=35902,Qf=1021,td=1022,yn=1023,ed=1024,nd=1025,Ts=1026,Us=1027,Rl=1028,Cl=1029,id=1030,Pl=1031,Ll=1033,Pr=33776,Lr=33777,Dr=33778,Ir=33779,Nc=35840,Fc=35841,zc=35842,Oc=35843,Bc=36196,kc=37492,Hc=37496,Gc=37808,Vc=37809,Wc=37810,Xc=37811,qc=37812,Yc=37813,Zc=37814,Kc=37815,jc=37816,$c=37817,Jc=37818,Qc=37819,tl=37820,el=37821,Ur=36492,nl=36494,il=36495,sd=36283,sl=36284,ol=36285,rl=36286,Xp=3200,qp=3201,od=0,Yp=1,gi="",ln="srgb",Bs="srgb-linear",Jr="linear",pe="srgb",Ji=7680,sh=519,Zp=512,Kp=513,jp=514,rd=515,$p=516,Jp=517,Qp=518,t0=519,oh=35044,rh="300 es",jn=2e3,Br=2001;class ks{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const s=this._listeners[t];if(s!==void 0){const o=s.indexOf(e);o!==-1&&s.splice(o,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let o=0,r=s.length;o<r;o++)s[o].call(this,t);t.target=null}}}const Oe=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let ah=1234567;const fo=Math.PI/180,Mo=180/Math.PI;function Hs(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Oe[i&255]+Oe[i>>8&255]+Oe[i>>16&255]+Oe[i>>24&255]+"-"+Oe[t&255]+Oe[t>>8&255]+"-"+Oe[t>>16&15|64]+Oe[t>>24&255]+"-"+Oe[e&63|128]+Oe[e>>8&255]+"-"+Oe[e>>16&255]+Oe[e>>24&255]+Oe[n&255]+Oe[n>>8&255]+Oe[n>>16&255]+Oe[n>>24&255]).toLowerCase()}function Ye(i,t,e){return Math.max(t,Math.min(e,i))}function Dl(i,t){return(i%t+t)%t}function e0(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function n0(i,t,e){return i!==t?(e-i)/(t-i):0}function po(i,t,e){return(1-e)*i+e*t}function i0(i,t,e,n){return po(i,t,1-Math.exp(-e*n))}function s0(i,t=1){return t-Math.abs(Dl(i,t*2)-t)}function o0(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function r0(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function a0(i,t){return i+Math.floor(Math.random()*(t-i+1))}function c0(i,t){return i+Math.random()*(t-i)}function l0(i){return i*(.5-Math.random())}function h0(i){i!==void 0&&(ah=i);let t=ah+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function u0(i){return i*fo}function f0(i){return i*Mo}function d0(i){return(i&i-1)===0&&i!==0}function p0(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function m0(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function g0(i,t,e,n,s){const o=Math.cos,r=Math.sin,a=o(e/2),c=r(e/2),l=o((t+n)/2),h=r((t+n)/2),f=o((t-n)/2),d=r((t-n)/2),p=o((n-t)/2),m=r((n-t)/2);switch(s){case"XYX":i.set(a*h,c*f,c*d,a*l);break;case"YZY":i.set(c*d,a*h,c*f,a*l);break;case"ZXZ":i.set(c*f,c*d,a*h,a*l);break;case"XZX":i.set(a*h,c*m,c*p,a*l);break;case"YXY":i.set(c*p,a*h,c*m,a*l);break;case"ZYZ":i.set(c*m,c*p,a*h,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function _s(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Xe(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const _n={DEG2RAD:fo,RAD2DEG:Mo,generateUUID:Hs,clamp:Ye,euclideanModulo:Dl,mapLinear:e0,inverseLerp:n0,lerp:po,damp:i0,pingpong:s0,smoothstep:o0,smootherstep:r0,randInt:a0,randFloat:c0,randFloatSpread:l0,seededRandom:h0,degToRad:u0,radToDeg:f0,isPowerOfTwo:d0,ceilPowerOfTwo:p0,floorPowerOfTwo:m0,setQuaternionFromProperEuler:g0,normalize:Xe,denormalize:_s};class Kt{constructor(t=0,e=0){Kt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Ye(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),o=this.x-t.x,r=this.y-t.y;return this.x=o*n-r*s+t.x,this.y=o*s+r*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Xt{constructor(t,e,n,s,o,r,a,c,l){Xt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,o,r,a,c,l)}set(t,e,n,s,o,r,a,c,l){const h=this.elements;return h[0]=t,h[1]=s,h[2]=a,h[3]=e,h[4]=o,h[5]=c,h[6]=n,h[7]=r,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,o=this.elements,r=n[0],a=n[3],c=n[6],l=n[1],h=n[4],f=n[7],d=n[2],p=n[5],m=n[8],v=s[0],g=s[3],u=s[6],x=s[1],_=s[4],M=s[7],E=s[2],b=s[5],w=s[8];return o[0]=r*v+a*x+c*E,o[3]=r*g+a*_+c*b,o[6]=r*u+a*M+c*w,o[1]=l*v+h*x+f*E,o[4]=l*g+h*_+f*b,o[7]=l*u+h*M+f*w,o[2]=d*v+p*x+m*E,o[5]=d*g+p*_+m*b,o[8]=d*u+p*M+m*w,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],o=t[3],r=t[4],a=t[5],c=t[6],l=t[7],h=t[8];return e*r*h-e*a*l-n*o*h+n*a*c+s*o*l-s*r*c}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],o=t[3],r=t[4],a=t[5],c=t[6],l=t[7],h=t[8],f=h*r-a*l,d=a*c-h*o,p=l*o-r*c,m=e*f+n*d+s*p;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/m;return t[0]=f*v,t[1]=(s*l-h*n)*v,t[2]=(a*n-s*r)*v,t[3]=d*v,t[4]=(h*e-s*c)*v,t[5]=(s*o-a*e)*v,t[6]=p*v,t[7]=(n*c-l*e)*v,t[8]=(r*e-n*o)*v,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,o,r,a){const c=Math.cos(o),l=Math.sin(o);return this.set(n*c,n*l,-n*(c*r+l*a)+r+t,-s*l,s*c,-s*(-l*r+c*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(ma.makeScale(t,e)),this}rotate(t){return this.premultiply(ma.makeRotation(-t)),this}translate(t,e){return this.premultiply(ma.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const ma=new Xt;function ad(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function kr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function v0(){const i=kr("canvas");return i.style.display="block",i}const ch={};function ro(i){i in ch||(ch[i]=!0,console.warn(i))}function M0(i,t,e){return new Promise(function(n,s){function o(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(o,e);break;default:n()}}setTimeout(o,e)})}function _0(i){const t=i.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function x0(i){const t=i.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const $t={enabled:!0,workingColorSpace:Bs,spaces:{},convert:function(i,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===pe&&(i.r=Qn(i.r),i.g=Qn(i.g),i.b=Qn(i.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(i.applyMatrix3(this.spaces[t].toXYZ),i.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===pe&&(i.r=Es(i.r),i.g=Es(i.g),i.b=Es(i.b))),i},fromWorkingColorSpace:function(i,t){return this.convert(i,this.workingColorSpace,t)},toWorkingColorSpace:function(i,t){return this.convert(i,t,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===gi?Jr:this.spaces[i].transfer},getLuminanceCoefficients:function(i,t=this.workingColorSpace){return i.fromArray(this.spaces[t].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,t,e){return i.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}};function Qn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Es(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}const lh=[.64,.33,.3,.6,.15,.06],hh=[.2126,.7152,.0722],uh=[.3127,.329],fh=new Xt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),dh=new Xt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);$t.define({[Bs]:{primaries:lh,whitePoint:uh,transfer:Jr,toXYZ:fh,fromXYZ:dh,luminanceCoefficients:hh,workingColorSpaceConfig:{unpackColorSpace:ln},outputColorSpaceConfig:{drawingBufferColorSpace:ln}},[ln]:{primaries:lh,whitePoint:uh,transfer:pe,toXYZ:fh,fromXYZ:dh,luminanceCoefficients:hh,outputColorSpaceConfig:{drawingBufferColorSpace:ln}}});let Qi;class y0{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Qi===void 0&&(Qi=kr("canvas")),Qi.width=t.width,Qi.height=t.height;const n=Qi.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=Qi}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=kr("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),o=s.data;for(let r=0;r<o.length;r++)o[r]=Qn(o[r]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Qn(e[n]/255)*255):e[n]=Qn(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let S0=0;class cd{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:S0++}),this.uuid=Hs(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let o;if(Array.isArray(s)){o=[];for(let r=0,a=s.length;r<a;r++)s[r].isDataTexture?o.push(ga(s[r].image)):o.push(ga(s[r]))}else o=ga(s);n.url=o}return e||(t.images[this.uuid]=n),n}}function ga(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?y0.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let w0=0;class je extends ks{constructor(t=je.DEFAULT_IMAGE,e=je.DEFAULT_MAPPING,n=Oi,s=Oi,o=Ln,r=Bi,a=yn,c=ei,l=je.DEFAULT_ANISOTROPY,h=gi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:w0++}),this.uuid=Hs(),this.name="",this.source=new cd(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=o,this.minFilter=r,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new Kt(0,0),this.repeat=new Kt(1,1),this.center=new Kt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Xt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Kf)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Ic:t.x=t.x-Math.floor(t.x);break;case Oi:t.x=t.x<0?0:1;break;case Uc:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Ic:t.y=t.y-Math.floor(t.y);break;case Oi:t.y=t.y<0?0:1;break;case Uc:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}je.DEFAULT_IMAGE=null;je.DEFAULT_MAPPING=Kf;je.DEFAULT_ANISOTROPY=1;class Jt{constructor(t=0,e=0,n=0,s=1){Jt.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,o=this.w,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s+r[12]*o,this.y=r[1]*e+r[5]*n+r[9]*s+r[13]*o,this.z=r[2]*e+r[6]*n+r[10]*s+r[14]*o,this.w=r[3]*e+r[7]*n+r[11]*s+r[15]*o,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,o;const c=t.elements,l=c[0],h=c[4],f=c[8],d=c[1],p=c[5],m=c[9],v=c[2],g=c[6],u=c[10];if(Math.abs(h-d)<.01&&Math.abs(f-v)<.01&&Math.abs(m-g)<.01){if(Math.abs(h+d)<.1&&Math.abs(f+v)<.1&&Math.abs(m+g)<.1&&Math.abs(l+p+u-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const _=(l+1)/2,M=(p+1)/2,E=(u+1)/2,b=(h+d)/4,w=(f+v)/4,T=(m+g)/4;return _>M&&_>E?_<.01?(n=0,s=.707106781,o=.707106781):(n=Math.sqrt(_),s=b/n,o=w/n):M>E?M<.01?(n=.707106781,s=0,o=.707106781):(s=Math.sqrt(M),n=b/s,o=T/s):E<.01?(n=.707106781,s=.707106781,o=0):(o=Math.sqrt(E),n=w/o,s=T/o),this.set(n,s,o,e),this}let x=Math.sqrt((g-m)*(g-m)+(f-v)*(f-v)+(d-h)*(d-h));return Math.abs(x)<.001&&(x=1),this.x=(g-m)/x,this.y=(f-v)/x,this.z=(d-h)/x,this.w=Math.acos((l+p+u-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class b0 extends ks{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new Jt(0,0,t,e),this.scissorTest=!1,this.viewport=new Jt(0,0,t,e);const s={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ln,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const o=new je(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);o.flipY=!1,o.generateMipmaps=n.generateMipmaps,o.internalFormat=n.internalFormat,this.textures=[];const r=n.count;for(let a=0;a<r;a++)this.textures[a]=o.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,o=this.textures.length;s<o;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,s=t.textures.length;n<s;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new cd(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ni extends b0{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class ld extends je{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=ze,this.minFilter=ze,this.wrapR=Oi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class T0 extends je{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=ze,this.minFilter=ze,this.wrapR=Oi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ge{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,o,r,a){let c=n[s+0],l=n[s+1],h=n[s+2],f=n[s+3];const d=o[r+0],p=o[r+1],m=o[r+2],v=o[r+3];if(a===0){t[e+0]=c,t[e+1]=l,t[e+2]=h,t[e+3]=f;return}if(a===1){t[e+0]=d,t[e+1]=p,t[e+2]=m,t[e+3]=v;return}if(f!==v||c!==d||l!==p||h!==m){let g=1-a;const u=c*d+l*p+h*m+f*v,x=u>=0?1:-1,_=1-u*u;if(_>Number.EPSILON){const E=Math.sqrt(_),b=Math.atan2(E,u*x);g=Math.sin(g*b)/E,a=Math.sin(a*b)/E}const M=a*x;if(c=c*g+d*M,l=l*g+p*M,h=h*g+m*M,f=f*g+v*M,g===1-a){const E=1/Math.sqrt(c*c+l*l+h*h+f*f);c*=E,l*=E,h*=E,f*=E}}t[e]=c,t[e+1]=l,t[e+2]=h,t[e+3]=f}static multiplyQuaternionsFlat(t,e,n,s,o,r){const a=n[s],c=n[s+1],l=n[s+2],h=n[s+3],f=o[r],d=o[r+1],p=o[r+2],m=o[r+3];return t[e]=a*m+h*f+c*p-l*d,t[e+1]=c*m+h*d+l*f-a*p,t[e+2]=l*m+h*p+a*d-c*f,t[e+3]=h*m-a*f-c*d-l*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,o=t._z,r=t._order,a=Math.cos,c=Math.sin,l=a(n/2),h=a(s/2),f=a(o/2),d=c(n/2),p=c(s/2),m=c(o/2);switch(r){case"XYZ":this._x=d*h*f+l*p*m,this._y=l*p*f-d*h*m,this._z=l*h*m+d*p*f,this._w=l*h*f-d*p*m;break;case"YXZ":this._x=d*h*f+l*p*m,this._y=l*p*f-d*h*m,this._z=l*h*m-d*p*f,this._w=l*h*f+d*p*m;break;case"ZXY":this._x=d*h*f-l*p*m,this._y=l*p*f+d*h*m,this._z=l*h*m+d*p*f,this._w=l*h*f-d*p*m;break;case"ZYX":this._x=d*h*f-l*p*m,this._y=l*p*f+d*h*m,this._z=l*h*m-d*p*f,this._w=l*h*f+d*p*m;break;case"YZX":this._x=d*h*f+l*p*m,this._y=l*p*f+d*h*m,this._z=l*h*m-d*p*f,this._w=l*h*f-d*p*m;break;case"XZY":this._x=d*h*f-l*p*m,this._y=l*p*f-d*h*m,this._z=l*h*m+d*p*f,this._w=l*h*f+d*p*m;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+r)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],o=e[8],r=e[1],a=e[5],c=e[9],l=e[2],h=e[6],f=e[10],d=n+a+f;if(d>0){const p=.5/Math.sqrt(d+1);this._w=.25/p,this._x=(h-c)*p,this._y=(o-l)*p,this._z=(r-s)*p}else if(n>a&&n>f){const p=2*Math.sqrt(1+n-a-f);this._w=(h-c)/p,this._x=.25*p,this._y=(s+r)/p,this._z=(o+l)/p}else if(a>f){const p=2*Math.sqrt(1+a-n-f);this._w=(o-l)/p,this._x=(s+r)/p,this._y=.25*p,this._z=(c+h)/p}else{const p=2*Math.sqrt(1+f-n-a);this._w=(r-s)/p,this._x=(o+l)/p,this._y=(c+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Ye(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,o=t._z,r=t._w,a=e._x,c=e._y,l=e._z,h=e._w;return this._x=n*h+r*a+s*l-o*c,this._y=s*h+r*c+o*a-n*l,this._z=o*h+r*l+n*c-s*a,this._w=r*h-n*a-s*c-o*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,s=this._y,o=this._z,r=this._w;let a=r*t._w+n*t._x+s*t._y+o*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=r,this._x=n,this._y=s,this._z=o,this;const c=1-a*a;if(c<=Number.EPSILON){const p=1-e;return this._w=p*r+e*this._w,this._x=p*n+e*this._x,this._y=p*s+e*this._y,this._z=p*o+e*this._z,this.normalize(),this}const l=Math.sqrt(c),h=Math.atan2(l,a),f=Math.sin((1-e)*h)/l,d=Math.sin(e*h)/l;return this._w=r*f+this._w*d,this._x=n*f+this._x*d,this._y=s*f+this._y*d,this._z=o*f+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),o=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),o*Math.sin(e),o*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class F{constructor(t=0,e=0,n=0){F.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(ph.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(ph.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,o=t.elements;return this.x=o[0]*e+o[3]*n+o[6]*s,this.y=o[1]*e+o[4]*n+o[7]*s,this.z=o[2]*e+o[5]*n+o[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,o=t.elements,r=1/(o[3]*e+o[7]*n+o[11]*s+o[15]);return this.x=(o[0]*e+o[4]*n+o[8]*s+o[12])*r,this.y=(o[1]*e+o[5]*n+o[9]*s+o[13])*r,this.z=(o[2]*e+o[6]*n+o[10]*s+o[14])*r,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,o=t.x,r=t.y,a=t.z,c=t.w,l=2*(r*s-a*n),h=2*(a*e-o*s),f=2*(o*n-r*e);return this.x=e+c*l+r*f-a*h,this.y=n+c*h+a*l-o*f,this.z=s+c*f+o*h-r*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s,this.y=o[1]*e+o[5]*n+o[9]*s,this.z=o[2]*e+o[6]*n+o[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,o=t.z,r=e.x,a=e.y,c=e.z;return this.x=s*c-o*a,this.y=o*r-n*c,this.z=n*a-s*r,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return va.copy(this).projectOnVector(t),this.sub(va)}reflect(t){return this.sub(va.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Ye(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const va=new F,ph=new Ge;class Zi{constructor(t=new F(1/0,1/0,1/0),e=new F(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(mn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(mn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=mn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const o=n.getAttribute("position");if(e===!0&&o!==void 0&&t.isInstancedMesh!==!0)for(let r=0,a=o.count;r<a;r++)t.isMesh===!0?t.getVertexPosition(r,mn):mn.fromBufferAttribute(o,r),mn.applyMatrix4(t.matrixWorld),this.expandByPoint(mn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Io.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Io.copy(n.boundingBox)),Io.applyMatrix4(t.matrixWorld),this.union(Io)}const s=t.children;for(let o=0,r=s.length;o<r;o++)this.expandByObject(s[o],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,mn),mn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(qs),Uo.subVectors(this.max,qs),ts.subVectors(t.a,qs),es.subVectors(t.b,qs),ns.subVectors(t.c,qs),ai.subVectors(es,ts),ci.subVectors(ns,es),bi.subVectors(ts,ns);let e=[0,-ai.z,ai.y,0,-ci.z,ci.y,0,-bi.z,bi.y,ai.z,0,-ai.x,ci.z,0,-ci.x,bi.z,0,-bi.x,-ai.y,ai.x,0,-ci.y,ci.x,0,-bi.y,bi.x,0];return!Ma(e,ts,es,ns,Uo)||(e=[1,0,0,0,1,0,0,0,1],!Ma(e,ts,es,ns,Uo))?!1:(No.crossVectors(ai,ci),e=[No.x,No.y,No.z],Ma(e,ts,es,ns,Uo))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,mn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(mn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(On[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),On[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),On[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),On[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),On[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),On[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),On[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),On[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(On),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const On=[new F,new F,new F,new F,new F,new F,new F,new F],mn=new F,Io=new Zi,ts=new F,es=new F,ns=new F,ai=new F,ci=new F,bi=new F,qs=new F,Uo=new F,No=new F,Ti=new F;function Ma(i,t,e,n,s){for(let o=0,r=i.length-3;o<=r;o+=3){Ti.fromArray(i,o);const a=s.x*Math.abs(Ti.x)+s.y*Math.abs(Ti.y)+s.z*Math.abs(Ti.z),c=t.dot(Ti),l=e.dot(Ti),h=n.dot(Ti);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}const E0=new Zi,Ys=new F,_a=new F;class Ki{constructor(t=new F,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):E0.setFromPoints(t).getCenter(n);let s=0;for(let o=0,r=t.length;o<r;o++)s=Math.max(s,n.distanceToSquared(t[o]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Ys.subVectors(t,this.center);const e=Ys.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(Ys,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(_a.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Ys.copy(t.center).add(_a)),this.expandByPoint(Ys.copy(t.center).sub(_a))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Bn=new F,xa=new F,Fo=new F,li=new F,ya=new F,zo=new F,Sa=new F;class Il{constructor(t=new F,e=new F(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Bn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Bn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Bn.copy(this.origin).addScaledVector(this.direction,e),Bn.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){xa.copy(t).add(e).multiplyScalar(.5),Fo.copy(e).sub(t).normalize(),li.copy(this.origin).sub(xa);const o=t.distanceTo(e)*.5,r=-this.direction.dot(Fo),a=li.dot(this.direction),c=-li.dot(Fo),l=li.lengthSq(),h=Math.abs(1-r*r);let f,d,p,m;if(h>0)if(f=r*c-a,d=r*a-c,m=o*h,f>=0)if(d>=-m)if(d<=m){const v=1/h;f*=v,d*=v,p=f*(f+r*d+2*a)+d*(r*f+d+2*c)+l}else d=o,f=Math.max(0,-(r*d+a)),p=-f*f+d*(d+2*c)+l;else d=-o,f=Math.max(0,-(r*d+a)),p=-f*f+d*(d+2*c)+l;else d<=-m?(f=Math.max(0,-(-r*o+a)),d=f>0?-o:Math.min(Math.max(-o,-c),o),p=-f*f+d*(d+2*c)+l):d<=m?(f=0,d=Math.min(Math.max(-o,-c),o),p=d*(d+2*c)+l):(f=Math.max(0,-(r*o+a)),d=f>0?o:Math.min(Math.max(-o,-c),o),p=-f*f+d*(d+2*c)+l);else d=r>0?-o:o,f=Math.max(0,-(r*d+a)),p=-f*f+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,f),s&&s.copy(xa).addScaledVector(Fo,d),p}intersectSphere(t,e){Bn.subVectors(t.center,this.origin);const n=Bn.dot(this.direction),s=Bn.dot(Bn)-n*n,o=t.radius*t.radius;if(s>o)return null;const r=Math.sqrt(o-s),a=n-r,c=n+r;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,o,r,a,c;const l=1/this.direction.x,h=1/this.direction.y,f=1/this.direction.z,d=this.origin;return l>=0?(n=(t.min.x-d.x)*l,s=(t.max.x-d.x)*l):(n=(t.max.x-d.x)*l,s=(t.min.x-d.x)*l),h>=0?(o=(t.min.y-d.y)*h,r=(t.max.y-d.y)*h):(o=(t.max.y-d.y)*h,r=(t.min.y-d.y)*h),n>r||o>s||((o>n||isNaN(n))&&(n=o),(r<s||isNaN(s))&&(s=r),f>=0?(a=(t.min.z-d.z)*f,c=(t.max.z-d.z)*f):(a=(t.max.z-d.z)*f,c=(t.min.z-d.z)*f),n>c||a>s)||((a>n||n!==n)&&(n=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,Bn)!==null}intersectTriangle(t,e,n,s,o){ya.subVectors(e,t),zo.subVectors(n,t),Sa.crossVectors(ya,zo);let r=this.direction.dot(Sa),a;if(r>0){if(s)return null;a=1}else if(r<0)a=-1,r=-r;else return null;li.subVectors(this.origin,t);const c=a*this.direction.dot(zo.crossVectors(li,zo));if(c<0)return null;const l=a*this.direction.dot(ya.cross(li));if(l<0||c+l>r)return null;const h=-a*li.dot(Sa);return h<0?null:this.at(h/r,o)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ne{constructor(t,e,n,s,o,r,a,c,l,h,f,d,p,m,v,g){ne.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,o,r,a,c,l,h,f,d,p,m,v,g)}set(t,e,n,s,o,r,a,c,l,h,f,d,p,m,v,g){const u=this.elements;return u[0]=t,u[4]=e,u[8]=n,u[12]=s,u[1]=o,u[5]=r,u[9]=a,u[13]=c,u[2]=l,u[6]=h,u[10]=f,u[14]=d,u[3]=p,u[7]=m,u[11]=v,u[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ne().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,s=1/is.setFromMatrixColumn(t,0).length(),o=1/is.setFromMatrixColumn(t,1).length(),r=1/is.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*o,e[5]=n[5]*o,e[6]=n[6]*o,e[7]=0,e[8]=n[8]*r,e[9]=n[9]*r,e[10]=n[10]*r,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,o=t.z,r=Math.cos(n),a=Math.sin(n),c=Math.cos(s),l=Math.sin(s),h=Math.cos(o),f=Math.sin(o);if(t.order==="XYZ"){const d=r*h,p=r*f,m=a*h,v=a*f;e[0]=c*h,e[4]=-c*f,e[8]=l,e[1]=p+m*l,e[5]=d-v*l,e[9]=-a*c,e[2]=v-d*l,e[6]=m+p*l,e[10]=r*c}else if(t.order==="YXZ"){const d=c*h,p=c*f,m=l*h,v=l*f;e[0]=d+v*a,e[4]=m*a-p,e[8]=r*l,e[1]=r*f,e[5]=r*h,e[9]=-a,e[2]=p*a-m,e[6]=v+d*a,e[10]=r*c}else if(t.order==="ZXY"){const d=c*h,p=c*f,m=l*h,v=l*f;e[0]=d-v*a,e[4]=-r*f,e[8]=m+p*a,e[1]=p+m*a,e[5]=r*h,e[9]=v-d*a,e[2]=-r*l,e[6]=a,e[10]=r*c}else if(t.order==="ZYX"){const d=r*h,p=r*f,m=a*h,v=a*f;e[0]=c*h,e[4]=m*l-p,e[8]=d*l+v,e[1]=c*f,e[5]=v*l+d,e[9]=p*l-m,e[2]=-l,e[6]=a*c,e[10]=r*c}else if(t.order==="YZX"){const d=r*c,p=r*l,m=a*c,v=a*l;e[0]=c*h,e[4]=v-d*f,e[8]=m*f+p,e[1]=f,e[5]=r*h,e[9]=-a*h,e[2]=-l*h,e[6]=p*f+m,e[10]=d-v*f}else if(t.order==="XZY"){const d=r*c,p=r*l,m=a*c,v=a*l;e[0]=c*h,e[4]=-f,e[8]=l*h,e[1]=d*f+v,e[5]=r*h,e[9]=p*f-m,e[2]=m*f-p,e[6]=a*h,e[10]=v*f+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(A0,t,R0)}lookAt(t,e,n){const s=this.elements;return nn.subVectors(t,e),nn.lengthSq()===0&&(nn.z=1),nn.normalize(),hi.crossVectors(n,nn),hi.lengthSq()===0&&(Math.abs(n.z)===1?nn.x+=1e-4:nn.z+=1e-4,nn.normalize(),hi.crossVectors(n,nn)),hi.normalize(),Oo.crossVectors(nn,hi),s[0]=hi.x,s[4]=Oo.x,s[8]=nn.x,s[1]=hi.y,s[5]=Oo.y,s[9]=nn.y,s[2]=hi.z,s[6]=Oo.z,s[10]=nn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,o=this.elements,r=n[0],a=n[4],c=n[8],l=n[12],h=n[1],f=n[5],d=n[9],p=n[13],m=n[2],v=n[6],g=n[10],u=n[14],x=n[3],_=n[7],M=n[11],E=n[15],b=s[0],w=s[4],T=s[8],y=s[12],S=s[1],A=s[5],R=s[9],P=s[13],U=s[2],I=s[6],N=s[10],G=s[14],z=s[3],V=s[7],Y=s[11],j=s[15];return o[0]=r*b+a*S+c*U+l*z,o[4]=r*w+a*A+c*I+l*V,o[8]=r*T+a*R+c*N+l*Y,o[12]=r*y+a*P+c*G+l*j,o[1]=h*b+f*S+d*U+p*z,o[5]=h*w+f*A+d*I+p*V,o[9]=h*T+f*R+d*N+p*Y,o[13]=h*y+f*P+d*G+p*j,o[2]=m*b+v*S+g*U+u*z,o[6]=m*w+v*A+g*I+u*V,o[10]=m*T+v*R+g*N+u*Y,o[14]=m*y+v*P+g*G+u*j,o[3]=x*b+_*S+M*U+E*z,o[7]=x*w+_*A+M*I+E*V,o[11]=x*T+_*R+M*N+E*Y,o[15]=x*y+_*P+M*G+E*j,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],o=t[12],r=t[1],a=t[5],c=t[9],l=t[13],h=t[2],f=t[6],d=t[10],p=t[14],m=t[3],v=t[7],g=t[11],u=t[15];return m*(+o*c*f-s*l*f-o*a*d+n*l*d+s*a*p-n*c*p)+v*(+e*c*p-e*l*d+o*r*d-s*r*p+s*l*h-o*c*h)+g*(+e*l*f-e*a*p-o*r*f+n*r*p+o*a*h-n*l*h)+u*(-s*a*h-e*c*f+e*a*d+s*r*f-n*r*d+n*c*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],o=t[3],r=t[4],a=t[5],c=t[6],l=t[7],h=t[8],f=t[9],d=t[10],p=t[11],m=t[12],v=t[13],g=t[14],u=t[15],x=f*g*l-v*d*l+v*c*p-a*g*p-f*c*u+a*d*u,_=m*d*l-h*g*l-m*c*p+r*g*p+h*c*u-r*d*u,M=h*v*l-m*f*l+m*a*p-r*v*p-h*a*u+r*f*u,E=m*f*c-h*v*c-m*a*d+r*v*d+h*a*g-r*f*g,b=e*x+n*_+s*M+o*E;if(b===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const w=1/b;return t[0]=x*w,t[1]=(v*d*o-f*g*o-v*s*p+n*g*p+f*s*u-n*d*u)*w,t[2]=(a*g*o-v*c*o+v*s*l-n*g*l-a*s*u+n*c*u)*w,t[3]=(f*c*o-a*d*o-f*s*l+n*d*l+a*s*p-n*c*p)*w,t[4]=_*w,t[5]=(h*g*o-m*d*o+m*s*p-e*g*p-h*s*u+e*d*u)*w,t[6]=(m*c*o-r*g*o-m*s*l+e*g*l+r*s*u-e*c*u)*w,t[7]=(r*d*o-h*c*o+h*s*l-e*d*l-r*s*p+e*c*p)*w,t[8]=M*w,t[9]=(m*f*o-h*v*o-m*n*p+e*v*p+h*n*u-e*f*u)*w,t[10]=(r*v*o-m*a*o+m*n*l-e*v*l-r*n*u+e*a*u)*w,t[11]=(h*a*o-r*f*o-h*n*l+e*f*l+r*n*p-e*a*p)*w,t[12]=E*w,t[13]=(h*v*s-m*f*s+m*n*d-e*v*d-h*n*g+e*f*g)*w,t[14]=(m*a*s-r*v*s-m*n*c+e*v*c+r*n*g-e*a*g)*w,t[15]=(r*f*s-h*a*s+h*n*c-e*f*c-r*n*d+e*a*d)*w,this}scale(t){const e=this.elements,n=t.x,s=t.y,o=t.z;return e[0]*=n,e[4]*=s,e[8]*=o,e[1]*=n,e[5]*=s,e[9]*=o,e[2]*=n,e[6]*=s,e[10]*=o,e[3]*=n,e[7]*=s,e[11]*=o,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),o=1-n,r=t.x,a=t.y,c=t.z,l=o*r,h=o*a;return this.set(l*r+n,l*a-s*c,l*c+s*a,0,l*a+s*c,h*a+n,h*c-s*r,0,l*c-s*a,h*c+s*r,o*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,o,r){return this.set(1,n,o,0,t,1,r,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,o=e._x,r=e._y,a=e._z,c=e._w,l=o+o,h=r+r,f=a+a,d=o*l,p=o*h,m=o*f,v=r*h,g=r*f,u=a*f,x=c*l,_=c*h,M=c*f,E=n.x,b=n.y,w=n.z;return s[0]=(1-(v+u))*E,s[1]=(p+M)*E,s[2]=(m-_)*E,s[3]=0,s[4]=(p-M)*b,s[5]=(1-(d+u))*b,s[6]=(g+x)*b,s[7]=0,s[8]=(m+_)*w,s[9]=(g-x)*w,s[10]=(1-(d+v))*w,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;let o=is.set(s[0],s[1],s[2]).length();const r=is.set(s[4],s[5],s[6]).length(),a=is.set(s[8],s[9],s[10]).length();this.determinant()<0&&(o=-o),t.x=s[12],t.y=s[13],t.z=s[14],gn.copy(this);const l=1/o,h=1/r,f=1/a;return gn.elements[0]*=l,gn.elements[1]*=l,gn.elements[2]*=l,gn.elements[4]*=h,gn.elements[5]*=h,gn.elements[6]*=h,gn.elements[8]*=f,gn.elements[9]*=f,gn.elements[10]*=f,e.setFromRotationMatrix(gn),n.x=o,n.y=r,n.z=a,this}makePerspective(t,e,n,s,o,r,a=jn){const c=this.elements,l=2*o/(e-t),h=2*o/(n-s),f=(e+t)/(e-t),d=(n+s)/(n-s);let p,m;if(a===jn)p=-(r+o)/(r-o),m=-2*r*o/(r-o);else if(a===Br)p=-r/(r-o),m=-r*o/(r-o);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=f,c[12]=0,c[1]=0,c[5]=h,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,s,o,r,a=jn){const c=this.elements,l=1/(e-t),h=1/(n-s),f=1/(r-o),d=(e+t)*l,p=(n+s)*h;let m,v;if(a===jn)m=(r+o)*f,v=-2*f;else if(a===Br)m=o*f,v=-1*f;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-d,c[1]=0,c[5]=2*h,c[9]=0,c[13]=-p,c[2]=0,c[6]=0,c[10]=v,c[14]=-m,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const is=new F,gn=new ne,A0=new F(0,0,0),R0=new F(1,1,1),hi=new F,Oo=new F,nn=new F,mh=new ne,gh=new Ge;class Fn{constructor(t=0,e=0,n=0,s=Fn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,o=s[0],r=s[4],a=s[8],c=s[1],l=s[5],h=s[9],f=s[2],d=s[6],p=s[10];switch(e){case"XYZ":this._y=Math.asin(Ye(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-r,o)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Ye(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-f,o),this._z=0);break;case"ZXY":this._x=Math.asin(Ye(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-f,p),this._z=Math.atan2(-r,l)):(this._y=0,this._z=Math.atan2(c,o));break;case"ZYX":this._y=Math.asin(-Ye(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(d,p),this._z=Math.atan2(c,o)):(this._x=0,this._z=Math.atan2(-r,l));break;case"YZX":this._z=Math.asin(Ye(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-f,o)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-Ye(r,-1,1)),Math.abs(r)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(a,o)):(this._x=Math.atan2(-h,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return mh.makeRotationFromQuaternion(t),this.setFromRotationMatrix(mh,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return gh.setFromEuler(this),this.setFromQuaternion(gh,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Fn.DEFAULT_ORDER="XYZ";class hd{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let C0=0;const vh=new F,ss=new Ge,kn=new ne,Bo=new F,Zs=new F,P0=new F,L0=new Ge,Mh=new F(1,0,0),_h=new F(0,1,0),xh=new F(0,0,1),yh={type:"added"},D0={type:"removed"},os={type:"childadded",child:null},wa={type:"childremoved",child:null};class Ae extends ks{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:C0++}),this.uuid=Hs(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ae.DEFAULT_UP.clone();const t=new F,e=new Fn,n=new Ge,s=new F(1,1,1);function o(){n.setFromEuler(e,!1)}function r(){e.setFromQuaternion(n,void 0,!1)}e._onChange(o),n._onChange(r),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ne},normalMatrix:{value:new Xt}}),this.matrix=new ne,this.matrixWorld=new ne,this.matrixAutoUpdate=Ae.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Ae.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new hd,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return ss.setFromAxisAngle(t,e),this.quaternion.multiply(ss),this}rotateOnWorldAxis(t,e){return ss.setFromAxisAngle(t,e),this.quaternion.premultiply(ss),this}rotateX(t){return this.rotateOnAxis(Mh,t)}rotateY(t){return this.rotateOnAxis(_h,t)}rotateZ(t){return this.rotateOnAxis(xh,t)}translateOnAxis(t,e){return vh.copy(t).applyQuaternion(this.quaternion),this.position.add(vh.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Mh,t)}translateY(t){return this.translateOnAxis(_h,t)}translateZ(t){return this.translateOnAxis(xh,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(kn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Bo.copy(t):Bo.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Zs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?kn.lookAt(Zs,Bo,this.up):kn.lookAt(Bo,Zs,this.up),this.quaternion.setFromRotationMatrix(kn),s&&(kn.extractRotation(s.matrixWorld),ss.setFromRotationMatrix(kn),this.quaternion.premultiply(ss.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(yh),os.child=t,this.dispatchEvent(os),os.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(D0),wa.child=t,this.dispatchEvent(wa),wa.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),kn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),kn.multiply(t.parent.matrixWorld)),t.applyMatrix4(kn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(yh),os.child=t,this.dispatchEvent(os),os.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const r=this.children[n].getObjectByProperty(t,e);if(r!==void 0)return r}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let o=0,r=s.length;o<r;o++)s[o].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Zs,t,P0),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Zs,L0,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let o=0,r=s.length;o<r;o++)s[o].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function o(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=o(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const f=c[l];o(t.shapes,f)}else o(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(o(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(o(t.materials,this.material[c]));s.material=a}else s.material=o(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];s.animations.push(o(t.animations,c))}}if(e){const a=r(t.geometries),c=r(t.materials),l=r(t.textures),h=r(t.images),f=r(t.shapes),d=r(t.skeletons),p=r(t.animations),m=r(t.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),f.length>0&&(n.shapes=f),d.length>0&&(n.skeletons=d),p.length>0&&(n.animations=p),m.length>0&&(n.nodes=m)}return n.object=s,n;function r(a){const c=[];for(const l in a){const h=a[l];delete h.metadata,c.push(h)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}}Ae.DEFAULT_UP=new F(0,1,0);Ae.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ae.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const vn=new F,Hn=new F,ba=new F,Gn=new F,rs=new F,as=new F,Sh=new F,Ta=new F,Ea=new F,Aa=new F,Ra=new Jt,Ca=new Jt,Pa=new Jt;class xn{constructor(t=new F,e=new F,n=new F){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),vn.subVectors(t,e),s.cross(vn);const o=s.lengthSq();return o>0?s.multiplyScalar(1/Math.sqrt(o)):s.set(0,0,0)}static getBarycoord(t,e,n,s,o){vn.subVectors(s,e),Hn.subVectors(n,e),ba.subVectors(t,e);const r=vn.dot(vn),a=vn.dot(Hn),c=vn.dot(ba),l=Hn.dot(Hn),h=Hn.dot(ba),f=r*l-a*a;if(f===0)return o.set(0,0,0),null;const d=1/f,p=(l*c-a*h)*d,m=(r*h-a*c)*d;return o.set(1-p-m,m,p)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,Gn)===null?!1:Gn.x>=0&&Gn.y>=0&&Gn.x+Gn.y<=1}static getInterpolation(t,e,n,s,o,r,a,c){return this.getBarycoord(t,e,n,s,Gn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(o,Gn.x),c.addScaledVector(r,Gn.y),c.addScaledVector(a,Gn.z),c)}static getInterpolatedAttribute(t,e,n,s,o,r){return Ra.setScalar(0),Ca.setScalar(0),Pa.setScalar(0),Ra.fromBufferAttribute(t,e),Ca.fromBufferAttribute(t,n),Pa.fromBufferAttribute(t,s),r.setScalar(0),r.addScaledVector(Ra,o.x),r.addScaledVector(Ca,o.y),r.addScaledVector(Pa,o.z),r}static isFrontFacing(t,e,n,s){return vn.subVectors(n,e),Hn.subVectors(t,e),vn.cross(Hn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return vn.subVectors(this.c,this.b),Hn.subVectors(this.a,this.b),vn.cross(Hn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return xn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return xn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,o){return xn.getInterpolation(t,this.a,this.b,this.c,e,n,s,o)}containsPoint(t){return xn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return xn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,o=this.c;let r,a;rs.subVectors(s,n),as.subVectors(o,n),Ta.subVectors(t,n);const c=rs.dot(Ta),l=as.dot(Ta);if(c<=0&&l<=0)return e.copy(n);Ea.subVectors(t,s);const h=rs.dot(Ea),f=as.dot(Ea);if(h>=0&&f<=h)return e.copy(s);const d=c*f-h*l;if(d<=0&&c>=0&&h<=0)return r=c/(c-h),e.copy(n).addScaledVector(rs,r);Aa.subVectors(t,o);const p=rs.dot(Aa),m=as.dot(Aa);if(m>=0&&p<=m)return e.copy(o);const v=p*l-c*m;if(v<=0&&l>=0&&m<=0)return a=l/(l-m),e.copy(n).addScaledVector(as,a);const g=h*m-p*f;if(g<=0&&f-h>=0&&p-m>=0)return Sh.subVectors(o,s),a=(f-h)/(f-h+(p-m)),e.copy(s).addScaledVector(Sh,a);const u=1/(g+v+d);return r=v*u,a=d*u,e.copy(n).addScaledVector(rs,r).addScaledVector(as,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const ud={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ui={h:0,s:0,l:0},ko={h:0,s:0,l:0};function La(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class Q{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=ln){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,$t.toWorkingColorSpace(this,e),this}setRGB(t,e,n,s=$t.workingColorSpace){return this.r=t,this.g=e,this.b=n,$t.toWorkingColorSpace(this,s),this}setHSL(t,e,n,s=$t.workingColorSpace){if(t=Dl(t,1),e=Ye(e,0,1),n=Ye(n,0,1),e===0)this.r=this.g=this.b=n;else{const o=n<=.5?n*(1+e):n+e-n*e,r=2*n-o;this.r=La(r,o,t+1/3),this.g=La(r,o,t),this.b=La(r,o,t-1/3)}return $t.toWorkingColorSpace(this,s),this}setStyle(t,e=ln){function n(o){o!==void 0&&parseFloat(o)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let o;const r=s[1],a=s[2];switch(r){case"rgb":case"rgba":if(o=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(o[4]),this.setRGB(Math.min(255,parseInt(o[1],10))/255,Math.min(255,parseInt(o[2],10))/255,Math.min(255,parseInt(o[3],10))/255,e);if(o=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(o[4]),this.setRGB(Math.min(100,parseInt(o[1],10))/100,Math.min(100,parseInt(o[2],10))/100,Math.min(100,parseInt(o[3],10))/100,e);break;case"hsl":case"hsla":if(o=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(o[4]),this.setHSL(parseFloat(o[1])/360,parseFloat(o[2])/100,parseFloat(o[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const o=s[1],r=o.length;if(r===3)return this.setRGB(parseInt(o.charAt(0),16)/15,parseInt(o.charAt(1),16)/15,parseInt(o.charAt(2),16)/15,e);if(r===6)return this.setHex(parseInt(o,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=ln){const n=ud[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Qn(t.r),this.g=Qn(t.g),this.b=Qn(t.b),this}copyLinearToSRGB(t){return this.r=Es(t.r),this.g=Es(t.g),this.b=Es(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=ln){return $t.fromWorkingColorSpace(Be.copy(this),t),Math.round(Ye(Be.r*255,0,255))*65536+Math.round(Ye(Be.g*255,0,255))*256+Math.round(Ye(Be.b*255,0,255))}getHexString(t=ln){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=$t.workingColorSpace){$t.fromWorkingColorSpace(Be.copy(this),e);const n=Be.r,s=Be.g,o=Be.b,r=Math.max(n,s,o),a=Math.min(n,s,o);let c,l;const h=(a+r)/2;if(a===r)c=0,l=0;else{const f=r-a;switch(l=h<=.5?f/(r+a):f/(2-r-a),r){case n:c=(s-o)/f+(s<o?6:0);break;case s:c=(o-n)/f+2;break;case o:c=(n-s)/f+4;break}c/=6}return t.h=c,t.s=l,t.l=h,t}getRGB(t,e=$t.workingColorSpace){return $t.fromWorkingColorSpace(Be.copy(this),e),t.r=Be.r,t.g=Be.g,t.b=Be.b,t}getStyle(t=ln){$t.fromWorkingColorSpace(Be.copy(this),t);const e=Be.r,n=Be.g,s=Be.b;return t!==ln?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(ui),this.setHSL(ui.h+t,ui.s+e,ui.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(ui),t.getHSL(ko);const n=po(ui.h,ko.h,e),s=po(ui.s,ko.s,e),o=po(ui.l,ko.l,e);return this.setHSL(n,s,o),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,o=t.elements;return this.r=o[0]*e+o[3]*n+o[6]*s,this.g=o[1]*e+o[4]*n+o[7]*s,this.b=o[2]*e+o[5]*n+o[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Be=new Q;Q.NAMES=ud;let I0=0;class ji extends ks{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:I0++}),this.uuid=Hs(),this.name="",this.blending=bs,this.side=Si,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Sc,this.blendDst=wc,this.blendEquation=Fi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Q(0,0,0),this.blendAlpha=0,this.depthFunc=Ps,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=sh,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ji,this.stencilZFail=Ji,this.stencilZPass=Ji,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==bs&&(n.blending=this.blending),this.side!==Si&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Sc&&(n.blendSrc=this.blendSrc),this.blendDst!==wc&&(n.blendDst=this.blendDst),this.blendEquation!==Fi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Ps&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==sh&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ji&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Ji&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Ji&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(o){const r=[];for(const a in o){const c=o[a];delete c.metadata,r.push(c)}return r}if(e){const o=s(t.textures),r=s(t.images);o.length>0&&(n.textures=o),r.length>0&&(n.images=r)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let o=0;o!==s;++o)n[o]=e[o].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Ze extends ji{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new Q(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Fn,this.combine=bl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Ee=new F,Ho=new Kt;class Pt{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=oh,this.updateRanges=[],this.gpuType=Dn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,o=this.itemSize;s<o;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Ho.fromBufferAttribute(this,e),Ho.applyMatrix3(t),this.setXY(e,Ho.x,Ho.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Ee.fromBufferAttribute(this,e),Ee.applyMatrix3(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Ee.fromBufferAttribute(this,e),Ee.applyMatrix4(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ee.fromBufferAttribute(this,e),Ee.applyNormalMatrix(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ee.fromBufferAttribute(this,e),Ee.transformDirection(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=_s(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Xe(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=_s(e,this.array)),e}setX(t,e){return this.normalized&&(e=Xe(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=_s(e,this.array)),e}setY(t,e){return this.normalized&&(e=Xe(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=_s(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Xe(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=_s(e,this.array)),e}setW(t,e){return this.normalized&&(e=Xe(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Xe(e,this.array),n=Xe(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=Xe(e,this.array),n=Xe(n,this.array),s=Xe(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,o){return t*=this.itemSize,this.normalized&&(e=Xe(e,this.array),n=Xe(n,this.array),s=Xe(s,this.array),o=Xe(o,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=o,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==oh&&(t.usage=this.usage),t}}class fd extends Pt{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class dd extends Pt{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class kt extends Pt{constructor(t,e,n){super(new Float32Array(t),e,n)}}let U0=0;const an=new ne,Da=new Ae,cs=new F,sn=new Zi,Ks=new Zi,De=new F;class Gt extends ks{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:U0++}),this.uuid=Hs(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(ad(t)?dd:fd)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const o=new Xt().getNormalMatrix(t);n.applyNormalMatrix(o),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return an.makeRotationFromQuaternion(t),this.applyMatrix4(an),this}rotateX(t){return an.makeRotationX(t),this.applyMatrix4(an),this}rotateY(t){return an.makeRotationY(t),this.applyMatrix4(an),this}rotateZ(t){return an.makeRotationZ(t),this.applyMatrix4(an),this}translate(t,e,n){return an.makeTranslation(t,e,n),this.applyMatrix4(an),this}scale(t,e,n){return an.makeScale(t,e,n),this.applyMatrix4(an),this}lookAt(t){return Da.lookAt(t),Da.updateMatrix(),this.applyMatrix4(Da.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(cs).negate(),this.translate(cs.x,cs.y,cs.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let s=0,o=t.length;s<o;s++){const r=t[s];n.push(r.x,r.y,r.z||0)}this.setAttribute("position",new kt(n,3))}else{for(let n=0,s=e.count;n<s;n++){const o=t[n];e.setXYZ(n,o.x,o.y,o.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Zi);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new F(-1/0,-1/0,-1/0),new F(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const o=e[n];sn.setFromBufferAttribute(o),this.morphTargetsRelative?(De.addVectors(this.boundingBox.min,sn.min),this.boundingBox.expandByPoint(De),De.addVectors(this.boundingBox.max,sn.max),this.boundingBox.expandByPoint(De)):(this.boundingBox.expandByPoint(sn.min),this.boundingBox.expandByPoint(sn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ki);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new F,1/0);return}if(t){const n=this.boundingSphere.center;if(sn.setFromBufferAttribute(t),e)for(let o=0,r=e.length;o<r;o++){const a=e[o];Ks.setFromBufferAttribute(a),this.morphTargetsRelative?(De.addVectors(sn.min,Ks.min),sn.expandByPoint(De),De.addVectors(sn.max,Ks.max),sn.expandByPoint(De)):(sn.expandByPoint(Ks.min),sn.expandByPoint(Ks.max))}sn.getCenter(n);let s=0;for(let o=0,r=t.count;o<r;o++)De.fromBufferAttribute(t,o),s=Math.max(s,n.distanceToSquared(De));if(e)for(let o=0,r=e.length;o<r;o++){const a=e[o],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)De.fromBufferAttribute(a,l),c&&(cs.fromBufferAttribute(t,l),De.add(cs)),s=Math.max(s,n.distanceToSquared(De))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,o=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Pt(new Float32Array(4*n.count),4));const r=this.getAttribute("tangent"),a=[],c=[];for(let T=0;T<n.count;T++)a[T]=new F,c[T]=new F;const l=new F,h=new F,f=new F,d=new Kt,p=new Kt,m=new Kt,v=new F,g=new F;function u(T,y,S){l.fromBufferAttribute(n,T),h.fromBufferAttribute(n,y),f.fromBufferAttribute(n,S),d.fromBufferAttribute(o,T),p.fromBufferAttribute(o,y),m.fromBufferAttribute(o,S),h.sub(l),f.sub(l),p.sub(d),m.sub(d);const A=1/(p.x*m.y-m.x*p.y);isFinite(A)&&(v.copy(h).multiplyScalar(m.y).addScaledVector(f,-p.y).multiplyScalar(A),g.copy(f).multiplyScalar(p.x).addScaledVector(h,-m.x).multiplyScalar(A),a[T].add(v),a[y].add(v),a[S].add(v),c[T].add(g),c[y].add(g),c[S].add(g))}let x=this.groups;x.length===0&&(x=[{start:0,count:t.count}]);for(let T=0,y=x.length;T<y;++T){const S=x[T],A=S.start,R=S.count;for(let P=A,U=A+R;P<U;P+=3)u(t.getX(P+0),t.getX(P+1),t.getX(P+2))}const _=new F,M=new F,E=new F,b=new F;function w(T){E.fromBufferAttribute(s,T),b.copy(E);const y=a[T];_.copy(y),_.sub(E.multiplyScalar(E.dot(y))).normalize(),M.crossVectors(b,y);const A=M.dot(c[T])<0?-1:1;r.setXYZW(T,_.x,_.y,_.z,A)}for(let T=0,y=x.length;T<y;++T){const S=x[T],A=S.start,R=S.count;for(let P=A,U=A+R;P<U;P+=3)w(t.getX(P+0)),w(t.getX(P+1)),w(t.getX(P+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Pt(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,p=n.count;d<p;d++)n.setXYZ(d,0,0,0);const s=new F,o=new F,r=new F,a=new F,c=new F,l=new F,h=new F,f=new F;if(t)for(let d=0,p=t.count;d<p;d+=3){const m=t.getX(d+0),v=t.getX(d+1),g=t.getX(d+2);s.fromBufferAttribute(e,m),o.fromBufferAttribute(e,v),r.fromBufferAttribute(e,g),h.subVectors(r,o),f.subVectors(s,o),h.cross(f),a.fromBufferAttribute(n,m),c.fromBufferAttribute(n,v),l.fromBufferAttribute(n,g),a.add(h),c.add(h),l.add(h),n.setXYZ(m,a.x,a.y,a.z),n.setXYZ(v,c.x,c.y,c.z),n.setXYZ(g,l.x,l.y,l.z)}else for(let d=0,p=e.count;d<p;d+=3)s.fromBufferAttribute(e,d+0),o.fromBufferAttribute(e,d+1),r.fromBufferAttribute(e,d+2),h.subVectors(r,o),f.subVectors(s,o),h.cross(f),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)De.fromBufferAttribute(t,e),De.normalize(),t.setXYZ(e,De.x,De.y,De.z)}toNonIndexed(){function t(a,c){const l=a.array,h=a.itemSize,f=a.normalized,d=new l.constructor(c.length*h);let p=0,m=0;for(let v=0,g=c.length;v<g;v++){a.isInterleavedBufferAttribute?p=c[v]*a.data.stride+a.offset:p=c[v]*h;for(let u=0;u<h;u++)d[m++]=l[p++]}return new Pt(d,h,f)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Gt,n=this.index.array,s=this.attributes;for(const a in s){const c=s[a],l=t(c,n);e.setAttribute(a,l)}const o=this.morphAttributes;for(const a in o){const c=[],l=o[a];for(let h=0,f=l.length;h<f;h++){const d=l[h],p=t(d,n);c.push(p)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;const r=this.groups;for(let a=0,c=r.length;a<c;a++){const l=r[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const c in n){const l=n[c];t.data.attributes[c]=l.toJSON(t.data)}const s={};let o=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let f=0,d=l.length;f<d;f++){const p=l[f];h.push(p.toJSON(t.data))}h.length>0&&(s[c]=h,o=!0)}o&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const r=this.groups;r.length>0&&(t.data.groups=JSON.parse(JSON.stringify(r)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const s=t.attributes;for(const l in s){const h=s[l];this.setAttribute(l,h.clone(e))}const o=t.morphAttributes;for(const l in o){const h=[],f=o[l];for(let d=0,p=f.length;d<p;d++)h.push(f[d].clone(e));this.morphAttributes[l]=h}this.morphTargetsRelative=t.morphTargetsRelative;const r=t.groups;for(let l=0,h=r.length;l<h;l++){const f=r[l];this.addGroup(f.start,f.count,f.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const wh=new ne,Ei=new Il,Go=new Ki,bh=new F,Vo=new F,Wo=new F,Xo=new F,Ia=new F,qo=new F,Th=new F,Yo=new F;class dt extends Ae{constructor(t=new Gt,e=new Ze){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,r=s.length;o<r;o++){const a=s[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=o}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,o=n.morphAttributes.position,r=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const a=this.morphTargetInfluences;if(o&&a){qo.set(0,0,0);for(let c=0,l=o.length;c<l;c++){const h=a[c],f=o[c];h!==0&&(Ia.fromBufferAttribute(f,t),r?qo.addScaledVector(Ia,h):qo.addScaledVector(Ia.sub(e),h))}e.add(qo)}return e}raycast(t,e){const n=this.geometry,s=this.material,o=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Go.copy(n.boundingSphere),Go.applyMatrix4(o),Ei.copy(t.ray).recast(t.near),!(Go.containsPoint(Ei.origin)===!1&&(Ei.intersectSphere(Go,bh)===null||Ei.origin.distanceToSquared(bh)>(t.far-t.near)**2))&&(wh.copy(o).invert(),Ei.copy(t.ray).applyMatrix4(wh),!(n.boundingBox!==null&&Ei.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Ei)))}_computeIntersections(t,e,n){let s;const o=this.geometry,r=this.material,a=o.index,c=o.attributes.position,l=o.attributes.uv,h=o.attributes.uv1,f=o.attributes.normal,d=o.groups,p=o.drawRange;if(a!==null)if(Array.isArray(r))for(let m=0,v=d.length;m<v;m++){const g=d[m],u=r[g.materialIndex],x=Math.max(g.start,p.start),_=Math.min(a.count,Math.min(g.start+g.count,p.start+p.count));for(let M=x,E=_;M<E;M+=3){const b=a.getX(M),w=a.getX(M+1),T=a.getX(M+2);s=Zo(this,u,t,n,l,h,f,b,w,T),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{const m=Math.max(0,p.start),v=Math.min(a.count,p.start+p.count);for(let g=m,u=v;g<u;g+=3){const x=a.getX(g),_=a.getX(g+1),M=a.getX(g+2);s=Zo(this,r,t,n,l,h,f,x,_,M),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(r))for(let m=0,v=d.length;m<v;m++){const g=d[m],u=r[g.materialIndex],x=Math.max(g.start,p.start),_=Math.min(c.count,Math.min(g.start+g.count,p.start+p.count));for(let M=x,E=_;M<E;M+=3){const b=M,w=M+1,T=M+2;s=Zo(this,u,t,n,l,h,f,b,w,T),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{const m=Math.max(0,p.start),v=Math.min(c.count,p.start+p.count);for(let g=m,u=v;g<u;g+=3){const x=g,_=g+1,M=g+2;s=Zo(this,r,t,n,l,h,f,x,_,M),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}}}function N0(i,t,e,n,s,o,r,a){let c;if(t.side===Ke?c=n.intersectTriangle(r,o,s,!0,a):c=n.intersectTriangle(s,o,r,t.side===Si,a),c===null)return null;Yo.copy(a),Yo.applyMatrix4(i.matrixWorld);const l=e.ray.origin.distanceTo(Yo);return l<e.near||l>e.far?null:{distance:l,point:Yo.clone(),object:i}}function Zo(i,t,e,n,s,o,r,a,c,l){i.getVertexPosition(a,Vo),i.getVertexPosition(c,Wo),i.getVertexPosition(l,Xo);const h=N0(i,t,e,n,Vo,Wo,Xo,Th);if(h){const f=new F;xn.getBarycoord(Th,Vo,Wo,Xo,f),s&&(h.uv=xn.getInterpolatedAttribute(s,a,c,l,f,new Kt)),o&&(h.uv1=xn.getInterpolatedAttribute(o,a,c,l,f,new Kt)),r&&(h.normal=xn.getInterpolatedAttribute(r,a,c,l,f,new F),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const d={a,b:c,c:l,normal:new F,materialIndex:0};xn.getNormal(Vo,Wo,Xo,d.normal),h.face=d,h.barycoord=f}return h}class Te extends Gt{constructor(t=1,e=1,n=1,s=1,o=1,r=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:o,depthSegments:r};const a=this;s=Math.floor(s),o=Math.floor(o),r=Math.floor(r);const c=[],l=[],h=[],f=[];let d=0,p=0;m("z","y","x",-1,-1,n,e,t,r,o,0),m("z","y","x",1,-1,n,e,-t,r,o,1),m("x","z","y",1,1,t,n,e,s,r,2),m("x","z","y",1,-1,t,n,-e,s,r,3),m("x","y","z",1,-1,t,e,n,s,o,4),m("x","y","z",-1,-1,t,e,-n,s,o,5),this.setIndex(c),this.setAttribute("position",new kt(l,3)),this.setAttribute("normal",new kt(h,3)),this.setAttribute("uv",new kt(f,2));function m(v,g,u,x,_,M,E,b,w,T,y){const S=M/w,A=E/T,R=M/2,P=E/2,U=b/2,I=w+1,N=T+1;let G=0,z=0;const V=new F;for(let Y=0;Y<N;Y++){const j=Y*A-P;for(let ot=0;ot<I;ot++){const wt=ot*S-R;V[v]=wt*x,V[g]=j*_,V[u]=U,l.push(V.x,V.y,V.z),V[v]=0,V[g]=0,V[u]=b>0?1:-1,h.push(V.x,V.y,V.z),f.push(ot/w),f.push(1-Y/T),G+=1}}for(let Y=0;Y<T;Y++)for(let j=0;j<w;j++){const ot=d+j+I*Y,wt=d+j+I*(Y+1),W=d+(j+1)+I*(Y+1),et=d+(j+1)+I*Y;c.push(ot,wt,et),c.push(wt,W,et),z+=6}a.addGroup(p,z,y),p+=z,d+=G}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Te(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Ns(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function qe(i){const t={};for(let e=0;e<i.length;e++){const n=Ns(i[e]);for(const s in n)t[s]=n[s]}return t}function F0(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function pd(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:$t.workingColorSpace}const z0={clone:Ns,merge:qe};var O0=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,B0=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class me extends ji{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=O0,this.fragmentShader=B0,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Ns(t.uniforms),this.uniformsGroups=F0(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const r=this.uniforms[s].value;r&&r.isTexture?e.uniforms[s]={type:"t",value:r.toJSON(t).uuid}:r&&r.isColor?e.uniforms[s]={type:"c",value:r.getHex()}:r&&r.isVector2?e.uniforms[s]={type:"v2",value:r.toArray()}:r&&r.isVector3?e.uniforms[s]={type:"v3",value:r.toArray()}:r&&r.isVector4?e.uniforms[s]={type:"v4",value:r.toArray()}:r&&r.isMatrix3?e.uniforms[s]={type:"m3",value:r.toArray()}:r&&r.isMatrix4?e.uniforms[s]={type:"m4",value:r.toArray()}:e.uniforms[s]={value:r}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class md extends Ae{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ne,this.projectionMatrix=new ne,this.projectionMatrixInverse=new ne,this.coordinateSystem=jn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const fi=new F,Eh=new Kt,Ah=new Kt;class Je extends md{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Mo*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(fo*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Mo*2*Math.atan(Math.tan(fo*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){fi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(fi.x,fi.y).multiplyScalar(-t/fi.z),fi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(fi.x,fi.y).multiplyScalar(-t/fi.z)}getViewSize(t,e){return this.getViewBounds(t,Eh,Ah),e.subVectors(Ah,Eh)}setViewOffset(t,e,n,s,o,r){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=o,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(fo*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,o=-.5*s;const r=this.view;if(this.view!==null&&this.view.enabled){const c=r.fullWidth,l=r.fullHeight;o+=r.offsetX*s/c,e-=r.offsetY*n/l,s*=r.width/c,n*=r.height/l}const a=this.filmOffset;a!==0&&(o+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(o,o+s,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const ls=-90,hs=1;class k0 extends Ae{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Je(ls,hs,t,e);s.layers=this.layers,this.add(s);const o=new Je(ls,hs,t,e);o.layers=this.layers,this.add(o);const r=new Je(ls,hs,t,e);r.layers=this.layers,this.add(r);const a=new Je(ls,hs,t,e);a.layers=this.layers,this.add(a);const c=new Je(ls,hs,t,e);c.layers=this.layers,this.add(c);const l=new Je(ls,hs,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,o,r,a,c]=e;for(const l of e)this.remove(l);if(t===jn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),o.up.set(0,0,-1),o.lookAt(0,1,0),r.up.set(0,0,1),r.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===Br)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),o.up.set(0,0,1),o.lookAt(0,1,0),r.up.set(0,0,-1),r.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[o,r,a,c,l,h]=this.children,f=t.getRenderTarget(),d=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),m=t.xr.enabled;t.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,o),t.setRenderTarget(n,1,s),t.render(e,r),t.setRenderTarget(n,2,s),t.render(e,a),t.setRenderTarget(n,3,s),t.render(e,c),t.setRenderTarget(n,4,s),t.render(e,l),n.texture.generateMipmaps=v,t.setRenderTarget(n,5,s),t.render(e,h),t.setRenderTarget(f,d,p),t.xr.enabled=m,n.texture.needsPMREMUpdate=!0}}class gd extends je{constructor(t,e,n,s,o,r,a,c,l,h){t=t!==void 0?t:[],e=e!==void 0?e:Ls,super(t,e,n,s,o,r,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class H0 extends ni{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new gd(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:Ln}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Te(5,5,5),o=new me({name:"CubemapFromEquirect",uniforms:Ns(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ke,blending:_i});o.uniforms.tEquirect.value=e;const r=new dt(s,o),a=e.minFilter;return e.minFilter===Bi&&(e.minFilter=Ln),new k0(1,10,this).update(t,r),e.minFilter=a,r.geometry.dispose(),r.material.dispose(),this}clear(t,e,n,s){const o=t.getRenderTarget();for(let r=0;r<6;r++)t.setRenderTarget(this,r),t.clear(e,n,s);t.setRenderTarget(o)}}const Ua=new F,G0=new F,V0=new Xt;class Ii{constructor(t=new F(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=Ua.subVectors(n,e).cross(G0.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(Ua),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const o=-(t.start.dot(this.normal)+this.constant)/s;return o<0||o>1?null:e.copy(t.start).addScaledVector(n,o)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||V0.getNormalMatrix(t),s=this.coplanarPoint(Ua).applyMatrix4(t),o=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(o),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Ai=new Ki,Ko=new F;class Ul{constructor(t=new Ii,e=new Ii,n=new Ii,s=new Ii,o=new Ii,r=new Ii){this.planes=[t,e,n,s,o,r]}set(t,e,n,s,o,r){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(o),a[5].copy(r),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=jn){const n=this.planes,s=t.elements,o=s[0],r=s[1],a=s[2],c=s[3],l=s[4],h=s[5],f=s[6],d=s[7],p=s[8],m=s[9],v=s[10],g=s[11],u=s[12],x=s[13],_=s[14],M=s[15];if(n[0].setComponents(c-o,d-l,g-p,M-u).normalize(),n[1].setComponents(c+o,d+l,g+p,M+u).normalize(),n[2].setComponents(c+r,d+h,g+m,M+x).normalize(),n[3].setComponents(c-r,d-h,g-m,M-x).normalize(),n[4].setComponents(c-a,d-f,g-v,M-_).normalize(),e===jn)n[5].setComponents(c+a,d+f,g+v,M+_).normalize();else if(e===Br)n[5].setComponents(a,f,v,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Ai.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Ai.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Ai)}intersectsSprite(t){return Ai.center.set(0,0,0),Ai.radius=.7071067811865476,Ai.applyMatrix4(t.matrixWorld),this.intersectsSphere(Ai)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let o=0;o<6;o++)if(e[o].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(Ko.x=s.normal.x>0?t.max.x:t.min.x,Ko.y=s.normal.y>0?t.max.y:t.min.y,Ko.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Ko)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function vd(){let i=null,t=!1,e=null,n=null;function s(o,r){e(o,r),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(o){e=o},setContext:function(o){i=o}}}function W0(i){const t=new WeakMap;function e(a,c){const l=a.array,h=a.usage,f=l.byteLength,d=i.createBuffer();i.bindBuffer(c,d),i.bufferData(c,l,h),a.onUploadCallback();let p;if(l instanceof Float32Array)p=i.FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?p=i.HALF_FLOAT:p=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)p=i.SHORT;else if(l instanceof Uint32Array)p=i.UNSIGNED_INT;else if(l instanceof Int32Array)p=i.INT;else if(l instanceof Int8Array)p=i.BYTE;else if(l instanceof Uint8Array)p=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)p=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:d,type:p,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:f}}function n(a,c,l){const h=c.array,f=c.updateRanges;if(i.bindBuffer(l,a),f.length===0)i.bufferSubData(l,0,h);else{f.sort((p,m)=>p.start-m.start);let d=0;for(let p=1;p<f.length;p++){const m=f[d],v=f[p];v.start<=m.start+m.count+1?m.count=Math.max(m.count,v.start+v.count-m.start):(++d,f[d]=v)}f.length=d+1;for(let p=0,m=f.length;p<m;p++){const v=f[p];i.bufferSubData(l,v.start*h.BYTES_PER_ELEMENT,h,v.start,v.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function o(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=t.get(a);c&&(i.deleteBuffer(c.buffer),t.delete(a))}function r(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const l=t.get(a);if(l===void 0)t.set(a,e(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:s,remove:o,update:r}}class Qe extends Gt{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const o=t/2,r=e/2,a=Math.floor(n),c=Math.floor(s),l=a+1,h=c+1,f=t/a,d=e/c,p=[],m=[],v=[],g=[];for(let u=0;u<h;u++){const x=u*d-r;for(let _=0;_<l;_++){const M=_*f-o;m.push(M,-x,0),v.push(0,0,1),g.push(_/a),g.push(1-u/c)}}for(let u=0;u<c;u++)for(let x=0;x<a;x++){const _=x+l*u,M=x+l*(u+1),E=x+1+l*(u+1),b=x+1+l*u;p.push(_,M,b),p.push(M,E,b)}this.setIndex(p),this.setAttribute("position",new kt(m,3)),this.setAttribute("normal",new kt(v,3)),this.setAttribute("uv",new kt(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Qe(t.width,t.height,t.widthSegments,t.heightSegments)}}var X0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,q0=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Y0=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Z0=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,K0=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,j0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,$0=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,J0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Q0=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,tm=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,em=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,nm=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,im=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,sm=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,om=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,rm=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,am=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,cm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,lm=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,hm=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,um=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,fm=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,dm=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,pm=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,mm=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,gm=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,vm=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Mm=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,_m=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,xm=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,ym="gl_FragColor = linearToOutputTexel( gl_FragColor );",Sm=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,wm=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,bm=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Tm=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Em=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Am=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Rm=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Cm=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Pm=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Lm=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Dm=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Im=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Um=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Nm=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Fm=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,zm=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Om=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Bm=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,km=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Hm=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Gm=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Vm=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Wm=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Xm=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,qm=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Ym=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Zm=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Km=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,jm=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,$m=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Jm=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Qm=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,tg=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,eg=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,ng=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,ig=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,sg=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,og=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,rg=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,ag=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,cg=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,lg=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,hg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ug=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,fg=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,dg=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,pg=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,mg=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,gg=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,vg=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Mg=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,_g=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,xg=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,yg=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Sg=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,wg=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,bg=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Tg=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Eg=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Ag=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Rg=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Cg=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Pg=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Lg=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Dg=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Ig=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Ug=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Ng=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Fg=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,zg=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Og=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Bg=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,kg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Hg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Gg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Vg=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Wg=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Xg=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,qg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Yg=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Zg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Kg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,jg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,$g=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Jg=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Qg=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,t1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,e1=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,n1=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,i1=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,s1=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,o1=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,r1=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,a1=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,c1=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,l1=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,h1=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,u1=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,f1=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,d1=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,p1=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,m1=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,g1=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,v1=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,M1=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,_1=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,x1=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,y1=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,S1=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,w1=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Bt={alphahash_fragment:X0,alphahash_pars_fragment:q0,alphamap_fragment:Y0,alphamap_pars_fragment:Z0,alphatest_fragment:K0,alphatest_pars_fragment:j0,aomap_fragment:$0,aomap_pars_fragment:J0,batching_pars_vertex:Q0,batching_vertex:tm,begin_vertex:em,beginnormal_vertex:nm,bsdfs:im,iridescence_fragment:sm,bumpmap_pars_fragment:om,clipping_planes_fragment:rm,clipping_planes_pars_fragment:am,clipping_planes_pars_vertex:cm,clipping_planes_vertex:lm,color_fragment:hm,color_pars_fragment:um,color_pars_vertex:fm,color_vertex:dm,common:pm,cube_uv_reflection_fragment:mm,defaultnormal_vertex:gm,displacementmap_pars_vertex:vm,displacementmap_vertex:Mm,emissivemap_fragment:_m,emissivemap_pars_fragment:xm,colorspace_fragment:ym,colorspace_pars_fragment:Sm,envmap_fragment:wm,envmap_common_pars_fragment:bm,envmap_pars_fragment:Tm,envmap_pars_vertex:Em,envmap_physical_pars_fragment:zm,envmap_vertex:Am,fog_vertex:Rm,fog_pars_vertex:Cm,fog_fragment:Pm,fog_pars_fragment:Lm,gradientmap_pars_fragment:Dm,lightmap_pars_fragment:Im,lights_lambert_fragment:Um,lights_lambert_pars_fragment:Nm,lights_pars_begin:Fm,lights_toon_fragment:Om,lights_toon_pars_fragment:Bm,lights_phong_fragment:km,lights_phong_pars_fragment:Hm,lights_physical_fragment:Gm,lights_physical_pars_fragment:Vm,lights_fragment_begin:Wm,lights_fragment_maps:Xm,lights_fragment_end:qm,logdepthbuf_fragment:Ym,logdepthbuf_pars_fragment:Zm,logdepthbuf_pars_vertex:Km,logdepthbuf_vertex:jm,map_fragment:$m,map_pars_fragment:Jm,map_particle_fragment:Qm,map_particle_pars_fragment:tg,metalnessmap_fragment:eg,metalnessmap_pars_fragment:ng,morphinstance_vertex:ig,morphcolor_vertex:sg,morphnormal_vertex:og,morphtarget_pars_vertex:rg,morphtarget_vertex:ag,normal_fragment_begin:cg,normal_fragment_maps:lg,normal_pars_fragment:hg,normal_pars_vertex:ug,normal_vertex:fg,normalmap_pars_fragment:dg,clearcoat_normal_fragment_begin:pg,clearcoat_normal_fragment_maps:mg,clearcoat_pars_fragment:gg,iridescence_pars_fragment:vg,opaque_fragment:Mg,packing:_g,premultiplied_alpha_fragment:xg,project_vertex:yg,dithering_fragment:Sg,dithering_pars_fragment:wg,roughnessmap_fragment:bg,roughnessmap_pars_fragment:Tg,shadowmap_pars_fragment:Eg,shadowmap_pars_vertex:Ag,shadowmap_vertex:Rg,shadowmask_pars_fragment:Cg,skinbase_vertex:Pg,skinning_pars_vertex:Lg,skinning_vertex:Dg,skinnormal_vertex:Ig,specularmap_fragment:Ug,specularmap_pars_fragment:Ng,tonemapping_fragment:Fg,tonemapping_pars_fragment:zg,transmission_fragment:Og,transmission_pars_fragment:Bg,uv_pars_fragment:kg,uv_pars_vertex:Hg,uv_vertex:Gg,worldpos_vertex:Vg,background_vert:Wg,background_frag:Xg,backgroundCube_vert:qg,backgroundCube_frag:Yg,cube_vert:Zg,cube_frag:Kg,depth_vert:jg,depth_frag:$g,distanceRGBA_vert:Jg,distanceRGBA_frag:Qg,equirect_vert:t1,equirect_frag:e1,linedashed_vert:n1,linedashed_frag:i1,meshbasic_vert:s1,meshbasic_frag:o1,meshlambert_vert:r1,meshlambert_frag:a1,meshmatcap_vert:c1,meshmatcap_frag:l1,meshnormal_vert:h1,meshnormal_frag:u1,meshphong_vert:f1,meshphong_frag:d1,meshphysical_vert:p1,meshphysical_frag:m1,meshtoon_vert:g1,meshtoon_frag:v1,points_vert:M1,points_frag:_1,shadow_vert:x1,shadow_frag:y1,sprite_vert:S1,sprite_frag:w1},gt={common:{diffuse:{value:new Q(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Xt},alphaMap:{value:null},alphaMapTransform:{value:new Xt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Xt}},envmap:{envMap:{value:null},envMapRotation:{value:new Xt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Xt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Xt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Xt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Xt},normalScale:{value:new Kt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Xt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Xt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Xt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Xt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Q(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Q(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Xt},alphaTest:{value:0},uvTransform:{value:new Xt}},sprite:{diffuse:{value:new Q(16777215)},opacity:{value:1},center:{value:new Kt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Xt},alphaMap:{value:null},alphaMapTransform:{value:new Xt},alphaTest:{value:0}}},Pn={basic:{uniforms:qe([gt.common,gt.specularmap,gt.envmap,gt.aomap,gt.lightmap,gt.fog]),vertexShader:Bt.meshbasic_vert,fragmentShader:Bt.meshbasic_frag},lambert:{uniforms:qe([gt.common,gt.specularmap,gt.envmap,gt.aomap,gt.lightmap,gt.emissivemap,gt.bumpmap,gt.normalmap,gt.displacementmap,gt.fog,gt.lights,{emissive:{value:new Q(0)}}]),vertexShader:Bt.meshlambert_vert,fragmentShader:Bt.meshlambert_frag},phong:{uniforms:qe([gt.common,gt.specularmap,gt.envmap,gt.aomap,gt.lightmap,gt.emissivemap,gt.bumpmap,gt.normalmap,gt.displacementmap,gt.fog,gt.lights,{emissive:{value:new Q(0)},specular:{value:new Q(1118481)},shininess:{value:30}}]),vertexShader:Bt.meshphong_vert,fragmentShader:Bt.meshphong_frag},standard:{uniforms:qe([gt.common,gt.envmap,gt.aomap,gt.lightmap,gt.emissivemap,gt.bumpmap,gt.normalmap,gt.displacementmap,gt.roughnessmap,gt.metalnessmap,gt.fog,gt.lights,{emissive:{value:new Q(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Bt.meshphysical_vert,fragmentShader:Bt.meshphysical_frag},toon:{uniforms:qe([gt.common,gt.aomap,gt.lightmap,gt.emissivemap,gt.bumpmap,gt.normalmap,gt.displacementmap,gt.gradientmap,gt.fog,gt.lights,{emissive:{value:new Q(0)}}]),vertexShader:Bt.meshtoon_vert,fragmentShader:Bt.meshtoon_frag},matcap:{uniforms:qe([gt.common,gt.bumpmap,gt.normalmap,gt.displacementmap,gt.fog,{matcap:{value:null}}]),vertexShader:Bt.meshmatcap_vert,fragmentShader:Bt.meshmatcap_frag},points:{uniforms:qe([gt.points,gt.fog]),vertexShader:Bt.points_vert,fragmentShader:Bt.points_frag},dashed:{uniforms:qe([gt.common,gt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Bt.linedashed_vert,fragmentShader:Bt.linedashed_frag},depth:{uniforms:qe([gt.common,gt.displacementmap]),vertexShader:Bt.depth_vert,fragmentShader:Bt.depth_frag},normal:{uniforms:qe([gt.common,gt.bumpmap,gt.normalmap,gt.displacementmap,{opacity:{value:1}}]),vertexShader:Bt.meshnormal_vert,fragmentShader:Bt.meshnormal_frag},sprite:{uniforms:qe([gt.sprite,gt.fog]),vertexShader:Bt.sprite_vert,fragmentShader:Bt.sprite_frag},background:{uniforms:{uvTransform:{value:new Xt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Bt.background_vert,fragmentShader:Bt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Xt}},vertexShader:Bt.backgroundCube_vert,fragmentShader:Bt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Bt.cube_vert,fragmentShader:Bt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Bt.equirect_vert,fragmentShader:Bt.equirect_frag},distanceRGBA:{uniforms:qe([gt.common,gt.displacementmap,{referencePosition:{value:new F},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Bt.distanceRGBA_vert,fragmentShader:Bt.distanceRGBA_frag},shadow:{uniforms:qe([gt.lights,gt.fog,{color:{value:new Q(0)},opacity:{value:1}}]),vertexShader:Bt.shadow_vert,fragmentShader:Bt.shadow_frag}};Pn.physical={uniforms:qe([Pn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Xt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Xt},clearcoatNormalScale:{value:new Kt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Xt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Xt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Xt},sheen:{value:0},sheenColor:{value:new Q(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Xt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Xt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Xt},transmissionSamplerSize:{value:new Kt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Xt},attenuationDistance:{value:0},attenuationColor:{value:new Q(0)},specularColor:{value:new Q(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Xt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Xt},anisotropyVector:{value:new Kt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Xt}}]),vertexShader:Bt.meshphysical_vert,fragmentShader:Bt.meshphysical_frag};const jo={r:0,b:0,g:0},Ri=new Fn,b1=new ne;function T1(i,t,e,n,s,o,r){const a=new Q(0);let c=o===!0?0:1,l,h,f=null,d=0,p=null;function m(x){let _=x.isScene===!0?x.background:null;return _&&_.isTexture&&(_=(x.backgroundBlurriness>0?e:t).get(_)),_}function v(x){let _=!1;const M=m(x);M===null?u(a,c):M&&M.isColor&&(u(M,1),_=!0);const E=i.xr.getEnvironmentBlendMode();E==="additive"?n.buffers.color.setClear(0,0,0,1,r):E==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,r),(i.autoClear||_)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function g(x,_){const M=m(_);M&&(M.isCubeTexture||M.mapping===$r)?(h===void 0&&(h=new dt(new Te(1,1,1),new me({name:"BackgroundCubeMaterial",uniforms:Ns(Pn.backgroundCube.uniforms),vertexShader:Pn.backgroundCube.vertexShader,fragmentShader:Pn.backgroundCube.fragmentShader,side:Ke,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(E,b,w){this.matrixWorld.copyPosition(w.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),Ri.copy(_.backgroundRotation),Ri.x*=-1,Ri.y*=-1,Ri.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(Ri.y*=-1,Ri.z*=-1),h.material.uniforms.envMap.value=M,h.material.uniforms.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=_.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(b1.makeRotationFromEuler(Ri)),h.material.toneMapped=$t.getTransfer(M.colorSpace)!==pe,(f!==M||d!==M.version||p!==i.toneMapping)&&(h.material.needsUpdate=!0,f=M,d=M.version,p=i.toneMapping),h.layers.enableAll(),x.unshift(h,h.geometry,h.material,0,0,null)):M&&M.isTexture&&(l===void 0&&(l=new dt(new Qe(2,2),new me({name:"BackgroundMaterial",uniforms:Ns(Pn.background.uniforms),vertexShader:Pn.background.vertexShader,fragmentShader:Pn.background.fragmentShader,side:Si,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=M,l.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,l.material.toneMapped=$t.getTransfer(M.colorSpace)!==pe,M.matrixAutoUpdate===!0&&M.updateMatrix(),l.material.uniforms.uvTransform.value.copy(M.matrix),(f!==M||d!==M.version||p!==i.toneMapping)&&(l.material.needsUpdate=!0,f=M,d=M.version,p=i.toneMapping),l.layers.enableAll(),x.unshift(l,l.geometry,l.material,0,0,null))}function u(x,_){x.getRGB(jo,pd(i)),n.buffers.color.setClear(jo.r,jo.g,jo.b,_,r)}return{getClearColor:function(){return a},setClearColor:function(x,_=1){a.set(x),c=_,u(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(x){c=x,u(a,c)},render:v,addToRenderList:g}}function E1(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=d(null);let o=s,r=!1;function a(S,A,R,P,U){let I=!1;const N=f(P,R,A);o!==N&&(o=N,l(o.object)),I=p(S,P,R,U),I&&m(S,P,R,U),U!==null&&t.update(U,i.ELEMENT_ARRAY_BUFFER),(I||r)&&(r=!1,M(S,A,R,P),U!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(U).buffer))}function c(){return i.createVertexArray()}function l(S){return i.bindVertexArray(S)}function h(S){return i.deleteVertexArray(S)}function f(S,A,R){const P=R.wireframe===!0;let U=n[S.id];U===void 0&&(U={},n[S.id]=U);let I=U[A.id];I===void 0&&(I={},U[A.id]=I);let N=I[P];return N===void 0&&(N=d(c()),I[P]=N),N}function d(S){const A=[],R=[],P=[];for(let U=0;U<e;U++)A[U]=0,R[U]=0,P[U]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:A,enabledAttributes:R,attributeDivisors:P,object:S,attributes:{},index:null}}function p(S,A,R,P){const U=o.attributes,I=A.attributes;let N=0;const G=R.getAttributes();for(const z in G)if(G[z].location>=0){const Y=U[z];let j=I[z];if(j===void 0&&(z==="instanceMatrix"&&S.instanceMatrix&&(j=S.instanceMatrix),z==="instanceColor"&&S.instanceColor&&(j=S.instanceColor)),Y===void 0||Y.attribute!==j||j&&Y.data!==j.data)return!0;N++}return o.attributesNum!==N||o.index!==P}function m(S,A,R,P){const U={},I=A.attributes;let N=0;const G=R.getAttributes();for(const z in G)if(G[z].location>=0){let Y=I[z];Y===void 0&&(z==="instanceMatrix"&&S.instanceMatrix&&(Y=S.instanceMatrix),z==="instanceColor"&&S.instanceColor&&(Y=S.instanceColor));const j={};j.attribute=Y,Y&&Y.data&&(j.data=Y.data),U[z]=j,N++}o.attributes=U,o.attributesNum=N,o.index=P}function v(){const S=o.newAttributes;for(let A=0,R=S.length;A<R;A++)S[A]=0}function g(S){u(S,0)}function u(S,A){const R=o.newAttributes,P=o.enabledAttributes,U=o.attributeDivisors;R[S]=1,P[S]===0&&(i.enableVertexAttribArray(S),P[S]=1),U[S]!==A&&(i.vertexAttribDivisor(S,A),U[S]=A)}function x(){const S=o.newAttributes,A=o.enabledAttributes;for(let R=0,P=A.length;R<P;R++)A[R]!==S[R]&&(i.disableVertexAttribArray(R),A[R]=0)}function _(S,A,R,P,U,I,N){N===!0?i.vertexAttribIPointer(S,A,R,U,I):i.vertexAttribPointer(S,A,R,P,U,I)}function M(S,A,R,P){v();const U=P.attributes,I=R.getAttributes(),N=A.defaultAttributeValues;for(const G in I){const z=I[G];if(z.location>=0){let V=U[G];if(V===void 0&&(G==="instanceMatrix"&&S.instanceMatrix&&(V=S.instanceMatrix),G==="instanceColor"&&S.instanceColor&&(V=S.instanceColor)),V!==void 0){const Y=V.normalized,j=V.itemSize,ot=t.get(V);if(ot===void 0)continue;const wt=ot.buffer,W=ot.type,et=ot.bytesPerElement,tt=W===i.INT||W===i.UNSIGNED_INT||V.gpuType===Tl;if(V.isInterleavedBufferAttribute){const st=V.data,pt=st.stride,Tt=V.offset;if(st.isInstancedInterleavedBuffer){for(let Ut=0;Ut<z.locationSize;Ut++)u(z.location+Ut,st.meshPerAttribute);S.isInstancedMesh!==!0&&P._maxInstanceCount===void 0&&(P._maxInstanceCount=st.meshPerAttribute*st.count)}else for(let Ut=0;Ut<z.locationSize;Ut++)g(z.location+Ut);i.bindBuffer(i.ARRAY_BUFFER,wt);for(let Ut=0;Ut<z.locationSize;Ut++)_(z.location+Ut,j/z.locationSize,W,Y,pt*et,(Tt+j/z.locationSize*Ut)*et,tt)}else{if(V.isInstancedBufferAttribute){for(let st=0;st<z.locationSize;st++)u(z.location+st,V.meshPerAttribute);S.isInstancedMesh!==!0&&P._maxInstanceCount===void 0&&(P._maxInstanceCount=V.meshPerAttribute*V.count)}else for(let st=0;st<z.locationSize;st++)g(z.location+st);i.bindBuffer(i.ARRAY_BUFFER,wt);for(let st=0;st<z.locationSize;st++)_(z.location+st,j/z.locationSize,W,Y,j*et,j/z.locationSize*st*et,tt)}}else if(N!==void 0){const Y=N[G];if(Y!==void 0)switch(Y.length){case 2:i.vertexAttrib2fv(z.location,Y);break;case 3:i.vertexAttrib3fv(z.location,Y);break;case 4:i.vertexAttrib4fv(z.location,Y);break;default:i.vertexAttrib1fv(z.location,Y)}}}}x()}function E(){T();for(const S in n){const A=n[S];for(const R in A){const P=A[R];for(const U in P)h(P[U].object),delete P[U];delete A[R]}delete n[S]}}function b(S){if(n[S.id]===void 0)return;const A=n[S.id];for(const R in A){const P=A[R];for(const U in P)h(P[U].object),delete P[U];delete A[R]}delete n[S.id]}function w(S){for(const A in n){const R=n[A];if(R[S.id]===void 0)continue;const P=R[S.id];for(const U in P)h(P[U].object),delete P[U];delete R[S.id]}}function T(){y(),r=!0,o!==s&&(o=s,l(o.object))}function y(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:T,resetDefaultState:y,dispose:E,releaseStatesOfGeometry:b,releaseStatesOfProgram:w,initAttributes:v,enableAttribute:g,disableUnusedAttributes:x}}function A1(i,t,e){let n;function s(l){n=l}function o(l,h){i.drawArrays(n,l,h),e.update(h,n,1)}function r(l,h,f){f!==0&&(i.drawArraysInstanced(n,l,h,f),e.update(h,n,f))}function a(l,h,f){if(f===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,h,0,f);let p=0;for(let m=0;m<f;m++)p+=h[m];e.update(p,n,1)}function c(l,h,f,d){if(f===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let m=0;m<l.length;m++)r(l[m],h[m],d[m]);else{p.multiDrawArraysInstancedWEBGL(n,l,0,h,0,d,0,f);let m=0;for(let v=0;v<f;v++)m+=h[v]*d[v];e.update(m,n,1)}}this.setMode=s,this.render=o,this.renderInstances=r,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function R1(i,t,e,n){let s;function o(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const w=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function r(w){return!(w!==yn&&n.convert(w)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(w){const T=w===bo&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(w!==ei&&n.convert(w)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&w!==Dn&&!T)}function c(w){if(w==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const f=e.logarithmicDepthBuffer===!0,d=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),p=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),m=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),u=i.getParameter(i.MAX_VERTEX_ATTRIBS),x=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),_=i.getParameter(i.MAX_VARYING_VECTORS),M=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),E=m>0,b=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:o,getMaxPrecision:c,textureFormatReadable:r,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:f,reverseDepthBuffer:d,maxTextures:p,maxVertexTextures:m,maxTextureSize:v,maxCubemapSize:g,maxAttributes:u,maxVertexUniforms:x,maxVaryings:_,maxFragmentUniforms:M,vertexTextures:E,maxSamples:b}}function C1(i){const t=this;let e=null,n=0,s=!1,o=!1;const r=new Ii,a=new Xt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(f,d){const p=f.length!==0||d||n!==0||s;return s=d,n=f.length,p},this.beginShadows=function(){o=!0,h(null)},this.endShadows=function(){o=!1},this.setGlobalState=function(f,d){e=h(f,d,0)},this.setState=function(f,d,p){const m=f.clippingPlanes,v=f.clipIntersection,g=f.clipShadows,u=i.get(f);if(!s||m===null||m.length===0||o&&!g)o?h(null):l();else{const x=o?0:n,_=x*4;let M=u.clippingState||null;c.value=M,M=h(m,d,_,p);for(let E=0;E!==_;++E)M[E]=e[E];u.clippingState=M,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=x}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(f,d,p,m){const v=f!==null?f.length:0;let g=null;if(v!==0){if(g=c.value,m!==!0||g===null){const u=p+v*4,x=d.matrixWorldInverse;a.getNormalMatrix(x),(g===null||g.length<u)&&(g=new Float32Array(u));for(let _=0,M=p;_!==v;++_,M+=4)r.copy(f[_]).applyMatrix4(x,a),r.normal.toArray(g,M),g[M+3]=r.constant}c.value=g,c.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,g}}function P1(i){let t=new WeakMap;function e(r,a){return a===Lc?r.mapping=Ls:a===Dc&&(r.mapping=Ds),r}function n(r){if(r&&r.isTexture){const a=r.mapping;if(a===Lc||a===Dc)if(t.has(r)){const c=t.get(r).texture;return e(c,r.mapping)}else{const c=r.image;if(c&&c.height>0){const l=new H0(c.height);return l.fromEquirectangularTexture(i,r),t.set(r,l),r.addEventListener("dispose",s),e(l.texture,r.mapping)}else return null}}return r}function s(r){const a=r.target;a.removeEventListener("dispose",s);const c=t.get(a);c!==void 0&&(t.delete(a),c.dispose())}function o(){t=new WeakMap}return{get:n,dispose:o}}class Qr extends md{constructor(t=-1,e=1,n=1,s=-1,o=.1,r=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=o,this.far=r,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,o,r){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=o,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let o=n-t,r=n+t,a=s+e,c=s-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;o+=l*this.view.offsetX,r=o+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(o,r,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const ys=4,Rh=[.125,.215,.35,.446,.526,.582],zi=20,Na=new Qr,Ch=new Q;let Fa=null,za=0,Oa=0,Ba=!1;const Ui=(1+Math.sqrt(5))/2,us=1/Ui,Ph=[new F(-Ui,us,0),new F(Ui,us,0),new F(-us,0,Ui),new F(us,0,Ui),new F(0,Ui,-us),new F(0,Ui,us),new F(-1,1,-1),new F(1,1,-1),new F(-1,1,1),new F(1,1,1)];class Lh{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100){Fa=this._renderer.getRenderTarget(),za=this._renderer.getActiveCubeFace(),Oa=this._renderer.getActiveMipmapLevel(),Ba=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const o=this._allocateTargets();return o.depthBuffer=!0,this._sceneToCubeUV(t,n,s,o),e>0&&this._blur(o,0,0,e),this._applyPMREM(o),this._cleanup(o),o}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Uh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ih(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Fa,za,Oa),this._renderer.xr.enabled=Ba,t.scissorTest=!1,$o(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Ls||t.mapping===Ds?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Fa=this._renderer.getRenderTarget(),za=this._renderer.getActiveCubeFace(),Oa=this._renderer.getActiveMipmapLevel(),Ba=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Ln,minFilter:Ln,generateMipmaps:!1,type:bo,format:yn,colorSpace:Bs,depthBuffer:!1},s=Dh(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Dh(t,e,n);const{_lodMax:o}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=L1(o)),this._blurMaterial=D1(o,t,e)}return s}_compileMaterial(t){const e=new dt(this._lodPlanes[0],t);this._renderer.compile(e,Na)}_sceneToCubeUV(t,e,n,s){const a=new Je(90,1,e,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],h=this._renderer,f=h.autoClear,d=h.toneMapping;h.getClearColor(Ch),h.toneMapping=xi,h.autoClear=!1;const p=new Ze({name:"PMREM.Background",side:Ke,depthWrite:!1,depthTest:!1}),m=new dt(new Te,p);let v=!1;const g=t.background;g?g.isColor&&(p.color.copy(g),t.background=null,v=!0):(p.color.copy(Ch),v=!0);for(let u=0;u<6;u++){const x=u%3;x===0?(a.up.set(0,c[u],0),a.lookAt(l[u],0,0)):x===1?(a.up.set(0,0,c[u]),a.lookAt(0,l[u],0)):(a.up.set(0,c[u],0),a.lookAt(0,0,l[u]));const _=this._cubeSize;$o(s,x*_,u>2?_:0,_,_),h.setRenderTarget(s),v&&h.render(m,a),h.render(t,a)}m.geometry.dispose(),m.material.dispose(),h.toneMapping=d,h.autoClear=f,t.background=g}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===Ls||t.mapping===Ds;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Uh()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ih());const o=s?this._cubemapMaterial:this._equirectMaterial,r=new dt(this._lodPlanes[0],o),a=o.uniforms;a.envMap.value=t;const c=this._cubeSize;$o(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(r,Na)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let o=1;o<s;o++){const r=Math.sqrt(this._sigmas[o]*this._sigmas[o]-this._sigmas[o-1]*this._sigmas[o-1]),a=Ph[(s-o-1)%Ph.length];this._blur(t,o-1,o,r,a)}e.autoClear=n}_blur(t,e,n,s,o){const r=this._pingPongRenderTarget;this._halfBlur(t,r,e,n,s,"latitudinal",o),this._halfBlur(r,t,n,n,s,"longitudinal",o)}_halfBlur(t,e,n,s,o,r,a){const c=this._renderer,l=this._blurMaterial;r!=="latitudinal"&&r!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,f=new dt(this._lodPlanes[s],l),d=l.uniforms,p=this._sizeLods[n]-1,m=isFinite(o)?Math.PI/(2*p):2*Math.PI/(2*zi-1),v=o/m,g=isFinite(o)?1+Math.floor(h*v):zi;g>zi&&console.warn(`sigmaRadians, ${o}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${zi}`);const u=[];let x=0;for(let w=0;w<zi;++w){const T=w/v,y=Math.exp(-T*T/2);u.push(y),w===0?x+=y:w<g&&(x+=2*y)}for(let w=0;w<u.length;w++)u[w]=u[w]/x;d.envMap.value=t.texture,d.samples.value=g,d.weights.value=u,d.latitudinal.value=r==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:_}=this;d.dTheta.value=m,d.mipInt.value=_-n;const M=this._sizeLods[s],E=3*M*(s>_-ys?s-_+ys:0),b=4*(this._cubeSize-M);$o(e,E,b,3*M,2*M),c.setRenderTarget(e),c.render(f,Na)}}function L1(i){const t=[],e=[],n=[];let s=i;const o=i-ys+1+Rh.length;for(let r=0;r<o;r++){const a=Math.pow(2,s);e.push(a);let c=1/a;r>i-ys?c=Rh[r-i+ys-1]:r===0&&(c=0),n.push(c);const l=1/(a-2),h=-l,f=1+l,d=[h,h,f,h,f,f,h,h,f,f,h,f],p=6,m=6,v=3,g=2,u=1,x=new Float32Array(v*m*p),_=new Float32Array(g*m*p),M=new Float32Array(u*m*p);for(let b=0;b<p;b++){const w=b%3*2/3-1,T=b>2?0:-1,y=[w,T,0,w+2/3,T,0,w+2/3,T+1,0,w,T,0,w+2/3,T+1,0,w,T+1,0];x.set(y,v*m*b),_.set(d,g*m*b);const S=[b,b,b,b,b,b];M.set(S,u*m*b)}const E=new Gt;E.setAttribute("position",new Pt(x,v)),E.setAttribute("uv",new Pt(_,g)),E.setAttribute("faceIndex",new Pt(M,u)),t.push(E),s>ys&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Dh(i,t,e){const n=new ni(i,t,e);return n.texture.mapping=$r,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function $o(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function D1(i,t,e){const n=new Float32Array(zi),s=new F(0,1,0);return new me({name:"SphericalGaussianBlur",defines:{n:zi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Nl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:_i,depthTest:!1,depthWrite:!1})}function Ih(){return new me({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Nl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:_i,depthTest:!1,depthWrite:!1})}function Uh(){return new me({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Nl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:_i,depthTest:!1,depthWrite:!1})}function Nl(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function I1(i){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const c=a.mapping,l=c===Lc||c===Dc,h=c===Ls||c===Ds;if(l||h){let f=t.get(a);const d=f!==void 0?f.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return e===null&&(e=new Lh(i)),f=l?e.fromEquirectangular(a,f):e.fromCubemap(a,f),f.texture.pmremVersion=a.pmremVersion,t.set(a,f),f.texture;if(f!==void 0)return f.texture;{const p=a.image;return l&&p&&p.height>0||h&&p&&s(p)?(e===null&&(e=new Lh(i)),f=l?e.fromEquirectangular(a):e.fromCubemap(a),f.texture.pmremVersion=a.pmremVersion,t.set(a,f),a.addEventListener("dispose",o),f.texture):null}}}return a}function s(a){let c=0;const l=6;for(let h=0;h<l;h++)a[h]!==void 0&&c++;return c===l}function o(a){const c=a.target;c.removeEventListener("dispose",o);const l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function r(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:r}}function U1(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&ro("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function N1(i,t,e,n){const s={},o=new WeakMap;function r(f){const d=f.target;d.index!==null&&t.remove(d.index);for(const m in d.attributes)t.remove(d.attributes[m]);for(const m in d.morphAttributes){const v=d.morphAttributes[m];for(let g=0,u=v.length;g<u;g++)t.remove(v[g])}d.removeEventListener("dispose",r),delete s[d.id];const p=o.get(d);p&&(t.remove(p),o.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function a(f,d){return s[d.id]===!0||(d.addEventListener("dispose",r),s[d.id]=!0,e.memory.geometries++),d}function c(f){const d=f.attributes;for(const m in d)t.update(d[m],i.ARRAY_BUFFER);const p=f.morphAttributes;for(const m in p){const v=p[m];for(let g=0,u=v.length;g<u;g++)t.update(v[g],i.ARRAY_BUFFER)}}function l(f){const d=[],p=f.index,m=f.attributes.position;let v=0;if(p!==null){const x=p.array;v=p.version;for(let _=0,M=x.length;_<M;_+=3){const E=x[_+0],b=x[_+1],w=x[_+2];d.push(E,b,b,w,w,E)}}else if(m!==void 0){const x=m.array;v=m.version;for(let _=0,M=x.length/3-1;_<M;_+=3){const E=_+0,b=_+1,w=_+2;d.push(E,b,b,w,w,E)}}else return;const g=new(ad(d)?dd:fd)(d,1);g.version=v;const u=o.get(f);u&&t.remove(u),o.set(f,g)}function h(f){const d=o.get(f);if(d){const p=f.index;p!==null&&d.version<p.version&&l(f)}else l(f);return o.get(f)}return{get:a,update:c,getWireframeAttribute:h}}function F1(i,t,e){let n;function s(d){n=d}let o,r;function a(d){o=d.type,r=d.bytesPerElement}function c(d,p){i.drawElements(n,p,o,d*r),e.update(p,n,1)}function l(d,p,m){m!==0&&(i.drawElementsInstanced(n,p,o,d*r,m),e.update(p,n,m))}function h(d,p,m){if(m===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,p,0,o,d,0,m);let g=0;for(let u=0;u<m;u++)g+=p[u];e.update(g,n,1)}function f(d,p,m,v){if(m===0)return;const g=t.get("WEBGL_multi_draw");if(g===null)for(let u=0;u<d.length;u++)l(d[u]/r,p[u],v[u]);else{g.multiDrawElementsInstancedWEBGL(n,p,0,o,d,0,v,0,m);let u=0;for(let x=0;x<m;x++)u+=p[x]*v[x];e.update(u,n,1)}}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=f}function z1(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(o,r,a){switch(e.calls++,r){case i.TRIANGLES:e.triangles+=a*(o/3);break;case i.LINES:e.lines+=a*(o/2);break;case i.LINE_STRIP:e.lines+=a*(o-1);break;case i.LINE_LOOP:e.lines+=a*o;break;case i.POINTS:e.points+=a*o;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",r);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function O1(i,t,e){const n=new WeakMap,s=new Jt;function o(r,a,c){const l=r.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,f=h!==void 0?h.length:0;let d=n.get(a);if(d===void 0||d.count!==f){let y=function(){w.dispose(),n.delete(a),a.removeEventListener("dispose",y)};d!==void 0&&d.texture.dispose();const p=a.morphAttributes.position!==void 0,m=a.morphAttributes.normal!==void 0,v=a.morphAttributes.color!==void 0,g=a.morphAttributes.position||[],u=a.morphAttributes.normal||[],x=a.morphAttributes.color||[];let _=0;p===!0&&(_=1),m===!0&&(_=2),v===!0&&(_=3);let M=a.attributes.position.count*_,E=1;M>t.maxTextureSize&&(E=Math.ceil(M/t.maxTextureSize),M=t.maxTextureSize);const b=new Float32Array(M*E*4*f),w=new ld(b,M,E,f);w.type=Dn,w.needsUpdate=!0;const T=_*4;for(let S=0;S<f;S++){const A=g[S],R=u[S],P=x[S],U=M*E*4*S;for(let I=0;I<A.count;I++){const N=I*T;p===!0&&(s.fromBufferAttribute(A,I),b[U+N+0]=s.x,b[U+N+1]=s.y,b[U+N+2]=s.z,b[U+N+3]=0),m===!0&&(s.fromBufferAttribute(R,I),b[U+N+4]=s.x,b[U+N+5]=s.y,b[U+N+6]=s.z,b[U+N+7]=0),v===!0&&(s.fromBufferAttribute(P,I),b[U+N+8]=s.x,b[U+N+9]=s.y,b[U+N+10]=s.z,b[U+N+11]=P.itemSize===4?s.w:1)}}d={count:f,texture:w,size:new Kt(M,E)},n.set(a,d),a.addEventListener("dispose",y)}if(r.isInstancedMesh===!0&&r.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",r.morphTexture,e);else{let p=0;for(let v=0;v<l.length;v++)p+=l[v];const m=a.morphTargetsRelative?1:1-p;c.getUniforms().setValue(i,"morphTargetBaseInfluence",m),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",d.texture,e),c.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:o}}function B1(i,t,e,n){let s=new WeakMap;function o(c){const l=n.render.frame,h=c.geometry,f=t.get(c,h);if(s.get(f)!==l&&(t.update(f),s.set(f,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),s.get(c)!==l&&(e.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){const d=c.skeleton;s.get(d)!==l&&(d.update(),s.set(d,l))}return f}function r(){s=new WeakMap}function a(c){const l=c.target;l.removeEventListener("dispose",a),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:o,dispose:r}}class Md extends je{constructor(t,e,n,s,o,r,a,c,l,h=Ts){if(h!==Ts&&h!==Us)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Ts&&(n=Wi),n===void 0&&h===Us&&(n=Is),super(null,s,o,r,a,c,h,n,l),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:ze,this.minFilter=c!==void 0?c:ze,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const _d=new je,Nh=new Md(1,1),xd=new ld,yd=new T0,Sd=new gd,Fh=[],zh=[],Oh=new Float32Array(16),Bh=new Float32Array(9),kh=new Float32Array(4);function Gs(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let o=Fh[s];if(o===void 0&&(o=new Float32Array(s),Fh[s]=o),t!==0){n.toArray(o,0);for(let r=1,a=0;r!==t;++r)a+=e,i[r].toArray(o,a)}return o}function Ce(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Pe(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function ta(i,t){let e=zh[t];e===void 0&&(e=new Int32Array(t),zh[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function k1(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function H1(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ce(e,t))return;i.uniform2fv(this.addr,t),Pe(e,t)}}function G1(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ce(e,t))return;i.uniform3fv(this.addr,t),Pe(e,t)}}function V1(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ce(e,t))return;i.uniform4fv(this.addr,t),Pe(e,t)}}function W1(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ce(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Pe(e,t)}else{if(Ce(e,n))return;kh.set(n),i.uniformMatrix2fv(this.addr,!1,kh),Pe(e,n)}}function X1(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ce(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Pe(e,t)}else{if(Ce(e,n))return;Bh.set(n),i.uniformMatrix3fv(this.addr,!1,Bh),Pe(e,n)}}function q1(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ce(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Pe(e,t)}else{if(Ce(e,n))return;Oh.set(n),i.uniformMatrix4fv(this.addr,!1,Oh),Pe(e,n)}}function Y1(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function Z1(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ce(e,t))return;i.uniform2iv(this.addr,t),Pe(e,t)}}function K1(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ce(e,t))return;i.uniform3iv(this.addr,t),Pe(e,t)}}function j1(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ce(e,t))return;i.uniform4iv(this.addr,t),Pe(e,t)}}function $1(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function J1(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ce(e,t))return;i.uniform2uiv(this.addr,t),Pe(e,t)}}function Q1(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ce(e,t))return;i.uniform3uiv(this.addr,t),Pe(e,t)}}function tv(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ce(e,t))return;i.uniform4uiv(this.addr,t),Pe(e,t)}}function ev(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let o;this.type===i.SAMPLER_2D_SHADOW?(Nh.compareFunction=rd,o=Nh):o=_d,e.setTexture2D(t||o,s)}function nv(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||yd,s)}function iv(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||Sd,s)}function sv(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||xd,s)}function ov(i){switch(i){case 5126:return k1;case 35664:return H1;case 35665:return G1;case 35666:return V1;case 35674:return W1;case 35675:return X1;case 35676:return q1;case 5124:case 35670:return Y1;case 35667:case 35671:return Z1;case 35668:case 35672:return K1;case 35669:case 35673:return j1;case 5125:return $1;case 36294:return J1;case 36295:return Q1;case 36296:return tv;case 35678:case 36198:case 36298:case 36306:case 35682:return ev;case 35679:case 36299:case 36307:return nv;case 35680:case 36300:case 36308:case 36293:return iv;case 36289:case 36303:case 36311:case 36292:return sv}}function rv(i,t){i.uniform1fv(this.addr,t)}function av(i,t){const e=Gs(t,this.size,2);i.uniform2fv(this.addr,e)}function cv(i,t){const e=Gs(t,this.size,3);i.uniform3fv(this.addr,e)}function lv(i,t){const e=Gs(t,this.size,4);i.uniform4fv(this.addr,e)}function hv(i,t){const e=Gs(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function uv(i,t){const e=Gs(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function fv(i,t){const e=Gs(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function dv(i,t){i.uniform1iv(this.addr,t)}function pv(i,t){i.uniform2iv(this.addr,t)}function mv(i,t){i.uniform3iv(this.addr,t)}function gv(i,t){i.uniform4iv(this.addr,t)}function vv(i,t){i.uniform1uiv(this.addr,t)}function Mv(i,t){i.uniform2uiv(this.addr,t)}function _v(i,t){i.uniform3uiv(this.addr,t)}function xv(i,t){i.uniform4uiv(this.addr,t)}function yv(i,t,e){const n=this.cache,s=t.length,o=ta(e,s);Ce(n,o)||(i.uniform1iv(this.addr,o),Pe(n,o));for(let r=0;r!==s;++r)e.setTexture2D(t[r]||_d,o[r])}function Sv(i,t,e){const n=this.cache,s=t.length,o=ta(e,s);Ce(n,o)||(i.uniform1iv(this.addr,o),Pe(n,o));for(let r=0;r!==s;++r)e.setTexture3D(t[r]||yd,o[r])}function wv(i,t,e){const n=this.cache,s=t.length,o=ta(e,s);Ce(n,o)||(i.uniform1iv(this.addr,o),Pe(n,o));for(let r=0;r!==s;++r)e.setTextureCube(t[r]||Sd,o[r])}function bv(i,t,e){const n=this.cache,s=t.length,o=ta(e,s);Ce(n,o)||(i.uniform1iv(this.addr,o),Pe(n,o));for(let r=0;r!==s;++r)e.setTexture2DArray(t[r]||xd,o[r])}function Tv(i){switch(i){case 5126:return rv;case 35664:return av;case 35665:return cv;case 35666:return lv;case 35674:return hv;case 35675:return uv;case 35676:return fv;case 5124:case 35670:return dv;case 35667:case 35671:return pv;case 35668:case 35672:return mv;case 35669:case 35673:return gv;case 5125:return vv;case 36294:return Mv;case 36295:return _v;case 36296:return xv;case 35678:case 36198:case 36298:case 36306:case 35682:return yv;case 35679:case 36299:case 36307:return Sv;case 35680:case 36300:case 36308:case 36293:return wv;case 36289:case 36303:case 36311:case 36292:return bv}}class Ev{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=ov(e.type)}}class Av{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Tv(e.type)}}class Rv{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let o=0,r=s.length;o!==r;++o){const a=s[o];a.setValue(t,e[a.id],n)}}}const ka=/(\w+)(\])?(\[|\.)?/g;function Hh(i,t){i.seq.push(t),i.map[t.id]=t}function Cv(i,t,e){const n=i.name,s=n.length;for(ka.lastIndex=0;;){const o=ka.exec(n),r=ka.lastIndex;let a=o[1];const c=o[2]==="]",l=o[3];if(c&&(a=a|0),l===void 0||l==="["&&r+2===s){Hh(e,l===void 0?new Ev(a,i,t):new Av(a,i,t));break}else{let f=e.map[a];f===void 0&&(f=new Rv(a),Hh(e,f)),e=f}}}class Nr{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const o=t.getActiveUniform(e,s),r=t.getUniformLocation(e,o.name);Cv(o,r,this)}}setValue(t,e,n,s){const o=this.map[e];o!==void 0&&o.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let o=0,r=e.length;o!==r;++o){const a=e[o],c=n[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,o=t.length;s!==o;++s){const r=t[s];r.id in e&&n.push(r)}return n}}function Gh(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const Pv=37297;let Lv=0;function Dv(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),o=Math.min(t+6,e.length);for(let r=s;r<o;r++){const a=r+1;n.push(`${a===t?">":" "} ${a}: ${e[r]}`)}return n.join(`
`)}const Vh=new Xt;function Iv(i){$t._getMatrix(Vh,$t.workingColorSpace,i);const t=`mat3( ${Vh.elements.map(e=>e.toFixed(4))} )`;switch($t.getTransfer(i)){case Jr:return[t,"LinearTransferOETF"];case pe:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function Wh(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),s=i.getShaderInfoLog(t).trim();if(n&&s==="")return"";const o=/ERROR: 0:(\d+)/.exec(s);if(o){const r=parseInt(o[1]);return e.toUpperCase()+`

`+s+`

`+Dv(i.getShaderSource(t),r)}else return s}function Uv(i,t){const e=Iv(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function Nv(i,t){let e;switch(t){case zp:e="Linear";break;case Op:e="Reinhard";break;case Bp:e="Cineon";break;case kp:e="ACESFilmic";break;case Gp:e="AgX";break;case Vp:e="Neutral";break;case Hp:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Jo=new F;function Fv(){$t.getLuminanceCoefficients(Jo);const i=Jo.x.toFixed(4),t=Jo.y.toFixed(4),e=Jo.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function zv(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ao).join(`
`)}function Ov(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Bv(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const o=i.getActiveAttrib(t,s),r=o.name;let a=1;o.type===i.FLOAT_MAT2&&(a=2),o.type===i.FLOAT_MAT3&&(a=3),o.type===i.FLOAT_MAT4&&(a=4),e[r]={type:o.type,location:i.getAttribLocation(t,r),locationSize:a}}return e}function ao(i){return i!==""}function Xh(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function qh(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const kv=/^[ \t]*#include +<([\w\d./]+)>/gm;function al(i){return i.replace(kv,Gv)}const Hv=new Map;function Gv(i,t){let e=Bt[t];if(e===void 0){const n=Hv.get(t);if(n!==void 0)e=Bt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return al(e)}const Vv=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Yh(i){return i.replace(Vv,Wv)}function Wv(i,t,e,n){let s="";for(let o=parseInt(t);o<parseInt(e);o++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+o+" ]").replace(/UNROLLED_LOOP_INDEX/g,o);return s}function Zh(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function Xv(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Zf?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===gp?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Yn&&(t="SHADOWMAP_TYPE_VSM"),t}function qv(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Ls:case Ds:t="ENVMAP_TYPE_CUBE";break;case $r:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Yv(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Ds:t="ENVMAP_MODE_REFRACTION";break}return t}function Zv(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case bl:t="ENVMAP_BLENDING_MULTIPLY";break;case Np:t="ENVMAP_BLENDING_MIX";break;case Fp:t="ENVMAP_BLENDING_ADD";break}return t}function Kv(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function jv(i,t,e,n){const s=i.getContext(),o=e.defines;let r=e.vertexShader,a=e.fragmentShader;const c=Xv(e),l=qv(e),h=Yv(e),f=Zv(e),d=Kv(e),p=zv(e),m=Ov(o),v=s.createProgram();let g,u,x=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(ao).join(`
`),g.length>0&&(g+=`
`),u=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(ao).join(`
`),u.length>0&&(u+=`
`)):(g=[Zh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ao).join(`
`),u=[Zh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+h:"",e.envMap?"#define "+f:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==xi?"#define TONE_MAPPING":"",e.toneMapping!==xi?Bt.tonemapping_pars_fragment:"",e.toneMapping!==xi?Nv("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Bt.colorspace_pars_fragment,Uv("linearToOutputTexel",e.outputColorSpace),Fv(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(ao).join(`
`)),r=al(r),r=Xh(r,e),r=qh(r,e),a=al(a),a=Xh(a,e),a=qh(a,e),r=Yh(r),a=Yh(a),e.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,g=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,u=["#define varying in",e.glslVersion===rh?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===rh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+u);const _=x+g+r,M=x+u+a,E=Gh(s,s.VERTEX_SHADER,_),b=Gh(s,s.FRAGMENT_SHADER,M);s.attachShader(v,E),s.attachShader(v,b),e.index0AttributeName!==void 0?s.bindAttribLocation(v,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function w(A){if(i.debug.checkShaderErrors){const R=s.getProgramInfoLog(v).trim(),P=s.getShaderInfoLog(E).trim(),U=s.getShaderInfoLog(b).trim();let I=!0,N=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(I=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,v,E,b);else{const G=Wh(s,E,"vertex"),z=Wh(s,b,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+A.name+`
Material Type: `+A.type+`

Program Info Log: `+R+`
`+G+`
`+z)}else R!==""?console.warn("THREE.WebGLProgram: Program Info Log:",R):(P===""||U==="")&&(N=!1);N&&(A.diagnostics={runnable:I,programLog:R,vertexShader:{log:P,prefix:g},fragmentShader:{log:U,prefix:u}})}s.deleteShader(E),s.deleteShader(b),T=new Nr(s,v),y=Bv(s,v)}let T;this.getUniforms=function(){return T===void 0&&w(this),T};let y;this.getAttributes=function(){return y===void 0&&w(this),y};let S=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return S===!1&&(S=s.getProgramParameter(v,Pv)),S},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Lv++,this.cacheKey=t,this.usedTimes=1,this.program=v,this.vertexShader=E,this.fragmentShader=b,this}let $v=0;class Jv{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),o=this._getShaderStage(n),r=this._getShaderCacheForMaterial(t);return r.has(s)===!1&&(r.add(s),s.usedTimes++),r.has(o)===!1&&(r.add(o),o.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new Qv(t),e.set(t,n)),n}}class Qv{constructor(t){this.id=$v++,this.code=t,this.usedTimes=0}}function tM(i,t,e,n,s,o,r){const a=new hd,c=new Jv,l=new Set,h=[],f=s.logarithmicDepthBuffer,d=s.vertexTextures;let p=s.precision;const m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(y){return l.add(y),y===0?"uv":`uv${y}`}function g(y,S,A,R,P){const U=R.fog,I=P.geometry,N=y.isMeshStandardMaterial?R.environment:null,G=(y.isMeshStandardMaterial?e:t).get(y.envMap||N),z=G&&G.mapping===$r?G.image.height:null,V=m[y.type];y.precision!==null&&(p=s.getMaxPrecision(y.precision),p!==y.precision&&console.warn("THREE.WebGLProgram.getParameters:",y.precision,"not supported, using",p,"instead."));const Y=I.morphAttributes.position||I.morphAttributes.normal||I.morphAttributes.color,j=Y!==void 0?Y.length:0;let ot=0;I.morphAttributes.position!==void 0&&(ot=1),I.morphAttributes.normal!==void 0&&(ot=2),I.morphAttributes.color!==void 0&&(ot=3);let wt,W,et,tt;if(V){const Qt=Pn[V];wt=Qt.vertexShader,W=Qt.fragmentShader}else wt=y.vertexShader,W=y.fragmentShader,c.update(y),et=c.getVertexShaderID(y),tt=c.getFragmentShaderID(y);const st=i.getRenderTarget(),pt=i.state.buffers.depth.getReversed(),Tt=P.isInstancedMesh===!0,Ut=P.isBatchedMesh===!0,ie=!!y.map,qt=!!y.matcap,ue=!!G,B=!!y.aoMap,Le=!!y.lightMap,Yt=!!y.bumpMap,jt=!!y.normalMap,It=!!y.displacementMap,fe=!!y.emissiveMap,Lt=!!y.metalnessMap,D=!!y.roughnessMap,C=y.anisotropy>0,X=y.clearcoat>0,it=y.dispersion>0,at=y.iridescence>0,q=y.sheen>0,ut=y.transmission>0,lt=C&&!!y.anisotropyMap,ft=X&&!!y.clearcoatMap,Nt=X&&!!y.clearcoatNormalMap,ct=X&&!!y.clearcoatRoughnessMap,Mt=at&&!!y.iridescenceMap,Dt=at&&!!y.iridescenceThicknessMap,bt=q&&!!y.sheenColorMap,mt=q&&!!y.sheenRoughnessMap,Vt=!!y.specularMap,zt=!!y.specularColorMap,se=!!y.specularIntensityMap,O=ut&&!!y.transmissionMap,vt=ut&&!!y.thicknessMap,$=!!y.gradientMap,nt=!!y.alphaMap,_t=y.alphaTest>0,xt=!!y.alphaHash,Ot=!!y.extensions;let ge=xi;y.toneMapped&&(st===null||st.isXRRenderTarget===!0)&&(ge=i.toneMapping);const be={shaderID:V,shaderType:y.type,shaderName:y.name,vertexShader:wt,fragmentShader:W,defines:y.defines,customVertexShaderID:et,customFragmentShaderID:tt,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:p,batching:Ut,batchingColor:Ut&&P._colorsTexture!==null,instancing:Tt,instancingColor:Tt&&P.instanceColor!==null,instancingMorph:Tt&&P.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:st===null?i.outputColorSpace:st.isXRRenderTarget===!0?st.texture.colorSpace:Bs,alphaToCoverage:!!y.alphaToCoverage,map:ie,matcap:qt,envMap:ue,envMapMode:ue&&G.mapping,envMapCubeUVHeight:z,aoMap:B,lightMap:Le,bumpMap:Yt,normalMap:jt,displacementMap:d&&It,emissiveMap:fe,normalMapObjectSpace:jt&&y.normalMapType===Yp,normalMapTangentSpace:jt&&y.normalMapType===od,metalnessMap:Lt,roughnessMap:D,anisotropy:C,anisotropyMap:lt,clearcoat:X,clearcoatMap:ft,clearcoatNormalMap:Nt,clearcoatRoughnessMap:ct,dispersion:it,iridescence:at,iridescenceMap:Mt,iridescenceThicknessMap:Dt,sheen:q,sheenColorMap:bt,sheenRoughnessMap:mt,specularMap:Vt,specularColorMap:zt,specularIntensityMap:se,transmission:ut,transmissionMap:O,thicknessMap:vt,gradientMap:$,opaque:y.transparent===!1&&y.blending===bs&&y.alphaToCoverage===!1,alphaMap:nt,alphaTest:_t,alphaHash:xt,combine:y.combine,mapUv:ie&&v(y.map.channel),aoMapUv:B&&v(y.aoMap.channel),lightMapUv:Le&&v(y.lightMap.channel),bumpMapUv:Yt&&v(y.bumpMap.channel),normalMapUv:jt&&v(y.normalMap.channel),displacementMapUv:It&&v(y.displacementMap.channel),emissiveMapUv:fe&&v(y.emissiveMap.channel),metalnessMapUv:Lt&&v(y.metalnessMap.channel),roughnessMapUv:D&&v(y.roughnessMap.channel),anisotropyMapUv:lt&&v(y.anisotropyMap.channel),clearcoatMapUv:ft&&v(y.clearcoatMap.channel),clearcoatNormalMapUv:Nt&&v(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ct&&v(y.clearcoatRoughnessMap.channel),iridescenceMapUv:Mt&&v(y.iridescenceMap.channel),iridescenceThicknessMapUv:Dt&&v(y.iridescenceThicknessMap.channel),sheenColorMapUv:bt&&v(y.sheenColorMap.channel),sheenRoughnessMapUv:mt&&v(y.sheenRoughnessMap.channel),specularMapUv:Vt&&v(y.specularMap.channel),specularColorMapUv:zt&&v(y.specularColorMap.channel),specularIntensityMapUv:se&&v(y.specularIntensityMap.channel),transmissionMapUv:O&&v(y.transmissionMap.channel),thicknessMapUv:vt&&v(y.thicknessMap.channel),alphaMapUv:nt&&v(y.alphaMap.channel),vertexTangents:!!I.attributes.tangent&&(jt||C),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!I.attributes.color&&I.attributes.color.itemSize===4,pointsUvs:P.isPoints===!0&&!!I.attributes.uv&&(ie||nt),fog:!!U,useFog:y.fog===!0,fogExp2:!!U&&U.isFogExp2,flatShading:y.flatShading===!0,sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:f,reverseDepthBuffer:pt,skinning:P.isSkinnedMesh===!0,morphTargets:I.morphAttributes.position!==void 0,morphNormals:I.morphAttributes.normal!==void 0,morphColors:I.morphAttributes.color!==void 0,morphTargetsCount:j,morphTextureStride:ot,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:y.dithering,shadowMapEnabled:i.shadowMap.enabled&&A.length>0,shadowMapType:i.shadowMap.type,toneMapping:ge,decodeVideoTexture:ie&&y.map.isVideoTexture===!0&&$t.getTransfer(y.map.colorSpace)===pe,decodeVideoTextureEmissive:fe&&y.emissiveMap.isVideoTexture===!0&&$t.getTransfer(y.emissiveMap.colorSpace)===pe,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===we,flipSided:y.side===Ke,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:Ot&&y.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ot&&y.extensions.multiDraw===!0||Ut)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return be.vertexUv1s=l.has(1),be.vertexUv2s=l.has(2),be.vertexUv3s=l.has(3),l.clear(),be}function u(y){const S=[];if(y.shaderID?S.push(y.shaderID):(S.push(y.customVertexShaderID),S.push(y.customFragmentShaderID)),y.defines!==void 0)for(const A in y.defines)S.push(A),S.push(y.defines[A]);return y.isRawShaderMaterial===!1&&(x(S,y),_(S,y),S.push(i.outputColorSpace)),S.push(y.customProgramCacheKey),S.join()}function x(y,S){y.push(S.precision),y.push(S.outputColorSpace),y.push(S.envMapMode),y.push(S.envMapCubeUVHeight),y.push(S.mapUv),y.push(S.alphaMapUv),y.push(S.lightMapUv),y.push(S.aoMapUv),y.push(S.bumpMapUv),y.push(S.normalMapUv),y.push(S.displacementMapUv),y.push(S.emissiveMapUv),y.push(S.metalnessMapUv),y.push(S.roughnessMapUv),y.push(S.anisotropyMapUv),y.push(S.clearcoatMapUv),y.push(S.clearcoatNormalMapUv),y.push(S.clearcoatRoughnessMapUv),y.push(S.iridescenceMapUv),y.push(S.iridescenceThicknessMapUv),y.push(S.sheenColorMapUv),y.push(S.sheenRoughnessMapUv),y.push(S.specularMapUv),y.push(S.specularColorMapUv),y.push(S.specularIntensityMapUv),y.push(S.transmissionMapUv),y.push(S.thicknessMapUv),y.push(S.combine),y.push(S.fogExp2),y.push(S.sizeAttenuation),y.push(S.morphTargetsCount),y.push(S.morphAttributeCount),y.push(S.numDirLights),y.push(S.numPointLights),y.push(S.numSpotLights),y.push(S.numSpotLightMaps),y.push(S.numHemiLights),y.push(S.numRectAreaLights),y.push(S.numDirLightShadows),y.push(S.numPointLightShadows),y.push(S.numSpotLightShadows),y.push(S.numSpotLightShadowsWithMaps),y.push(S.numLightProbes),y.push(S.shadowMapType),y.push(S.toneMapping),y.push(S.numClippingPlanes),y.push(S.numClipIntersection),y.push(S.depthPacking)}function _(y,S){a.disableAll(),S.supportsVertexTextures&&a.enable(0),S.instancing&&a.enable(1),S.instancingColor&&a.enable(2),S.instancingMorph&&a.enable(3),S.matcap&&a.enable(4),S.envMap&&a.enable(5),S.normalMapObjectSpace&&a.enable(6),S.normalMapTangentSpace&&a.enable(7),S.clearcoat&&a.enable(8),S.iridescence&&a.enable(9),S.alphaTest&&a.enable(10),S.vertexColors&&a.enable(11),S.vertexAlphas&&a.enable(12),S.vertexUv1s&&a.enable(13),S.vertexUv2s&&a.enable(14),S.vertexUv3s&&a.enable(15),S.vertexTangents&&a.enable(16),S.anisotropy&&a.enable(17),S.alphaHash&&a.enable(18),S.batching&&a.enable(19),S.dispersion&&a.enable(20),S.batchingColor&&a.enable(21),y.push(a.mask),a.disableAll(),S.fog&&a.enable(0),S.useFog&&a.enable(1),S.flatShading&&a.enable(2),S.logarithmicDepthBuffer&&a.enable(3),S.reverseDepthBuffer&&a.enable(4),S.skinning&&a.enable(5),S.morphTargets&&a.enable(6),S.morphNormals&&a.enable(7),S.morphColors&&a.enable(8),S.premultipliedAlpha&&a.enable(9),S.shadowMapEnabled&&a.enable(10),S.doubleSided&&a.enable(11),S.flipSided&&a.enable(12),S.useDepthPacking&&a.enable(13),S.dithering&&a.enable(14),S.transmission&&a.enable(15),S.sheen&&a.enable(16),S.opaque&&a.enable(17),S.pointsUvs&&a.enable(18),S.decodeVideoTexture&&a.enable(19),S.decodeVideoTextureEmissive&&a.enable(20),S.alphaToCoverage&&a.enable(21),y.push(a.mask)}function M(y){const S=m[y.type];let A;if(S){const R=Pn[S];A=z0.clone(R.uniforms)}else A=y.uniforms;return A}function E(y,S){let A;for(let R=0,P=h.length;R<P;R++){const U=h[R];if(U.cacheKey===S){A=U,++A.usedTimes;break}}return A===void 0&&(A=new jv(i,S,y,o),h.push(A)),A}function b(y){if(--y.usedTimes===0){const S=h.indexOf(y);h[S]=h[h.length-1],h.pop(),y.destroy()}}function w(y){c.remove(y)}function T(){c.dispose()}return{getParameters:g,getProgramCacheKey:u,getUniforms:M,acquireProgram:E,releaseProgram:b,releaseShaderCache:w,programs:h,dispose:T}}function eM(){let i=new WeakMap;function t(r){return i.has(r)}function e(r){let a=i.get(r);return a===void 0&&(a={},i.set(r,a)),a}function n(r){i.delete(r)}function s(r,a,c){i.get(r)[a]=c}function o(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:o}}function nM(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function Kh(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function jh(){const i=[];let t=0;const e=[],n=[],s=[];function o(){t=0,e.length=0,n.length=0,s.length=0}function r(f,d,p,m,v,g){let u=i[t];return u===void 0?(u={id:f.id,object:f,geometry:d,material:p,groupOrder:m,renderOrder:f.renderOrder,z:v,group:g},i[t]=u):(u.id=f.id,u.object=f,u.geometry=d,u.material=p,u.groupOrder=m,u.renderOrder=f.renderOrder,u.z=v,u.group=g),t++,u}function a(f,d,p,m,v,g){const u=r(f,d,p,m,v,g);p.transmission>0?n.push(u):p.transparent===!0?s.push(u):e.push(u)}function c(f,d,p,m,v,g){const u=r(f,d,p,m,v,g);p.transmission>0?n.unshift(u):p.transparent===!0?s.unshift(u):e.unshift(u)}function l(f,d){e.length>1&&e.sort(f||nM),n.length>1&&n.sort(d||Kh),s.length>1&&s.sort(d||Kh)}function h(){for(let f=t,d=i.length;f<d;f++){const p=i[f];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:n,transparent:s,init:o,push:a,unshift:c,finish:h,sort:l}}function iM(){let i=new WeakMap;function t(n,s){const o=i.get(n);let r;return o===void 0?(r=new jh,i.set(n,[r])):s>=o.length?(r=new jh,o.push(r)):r=o[s],r}function e(){i=new WeakMap}return{get:t,dispose:e}}function sM(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new F,color:new Q};break;case"SpotLight":e={position:new F,direction:new F,color:new Q,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new F,color:new Q,distance:0,decay:0};break;case"HemisphereLight":e={direction:new F,skyColor:new Q,groundColor:new Q};break;case"RectAreaLight":e={color:new Q,position:new F,halfWidth:new F,halfHeight:new F};break}return i[t.id]=e,e}}}function oM(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Kt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Kt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Kt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let rM=0;function aM(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function cM(i){const t=new sM,e=oM(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new F);const s=new F,o=new ne,r=new ne;function a(l){let h=0,f=0,d=0;for(let y=0;y<9;y++)n.probe[y].set(0,0,0);let p=0,m=0,v=0,g=0,u=0,x=0,_=0,M=0,E=0,b=0,w=0;l.sort(aM);for(let y=0,S=l.length;y<S;y++){const A=l[y],R=A.color,P=A.intensity,U=A.distance,I=A.shadow&&A.shadow.map?A.shadow.map.texture:null;if(A.isAmbientLight)h+=R.r*P,f+=R.g*P,d+=R.b*P;else if(A.isLightProbe){for(let N=0;N<9;N++)n.probe[N].addScaledVector(A.sh.coefficients[N],P);w++}else if(A.isDirectionalLight){const N=t.get(A);if(N.color.copy(A.color).multiplyScalar(A.intensity),A.castShadow){const G=A.shadow,z=e.get(A);z.shadowIntensity=G.intensity,z.shadowBias=G.bias,z.shadowNormalBias=G.normalBias,z.shadowRadius=G.radius,z.shadowMapSize=G.mapSize,n.directionalShadow[p]=z,n.directionalShadowMap[p]=I,n.directionalShadowMatrix[p]=A.shadow.matrix,x++}n.directional[p]=N,p++}else if(A.isSpotLight){const N=t.get(A);N.position.setFromMatrixPosition(A.matrixWorld),N.color.copy(R).multiplyScalar(P),N.distance=U,N.coneCos=Math.cos(A.angle),N.penumbraCos=Math.cos(A.angle*(1-A.penumbra)),N.decay=A.decay,n.spot[v]=N;const G=A.shadow;if(A.map&&(n.spotLightMap[E]=A.map,E++,G.updateMatrices(A),A.castShadow&&b++),n.spotLightMatrix[v]=G.matrix,A.castShadow){const z=e.get(A);z.shadowIntensity=G.intensity,z.shadowBias=G.bias,z.shadowNormalBias=G.normalBias,z.shadowRadius=G.radius,z.shadowMapSize=G.mapSize,n.spotShadow[v]=z,n.spotShadowMap[v]=I,M++}v++}else if(A.isRectAreaLight){const N=t.get(A);N.color.copy(R).multiplyScalar(P),N.halfWidth.set(A.width*.5,0,0),N.halfHeight.set(0,A.height*.5,0),n.rectArea[g]=N,g++}else if(A.isPointLight){const N=t.get(A);if(N.color.copy(A.color).multiplyScalar(A.intensity),N.distance=A.distance,N.decay=A.decay,A.castShadow){const G=A.shadow,z=e.get(A);z.shadowIntensity=G.intensity,z.shadowBias=G.bias,z.shadowNormalBias=G.normalBias,z.shadowRadius=G.radius,z.shadowMapSize=G.mapSize,z.shadowCameraNear=G.camera.near,z.shadowCameraFar=G.camera.far,n.pointShadow[m]=z,n.pointShadowMap[m]=I,n.pointShadowMatrix[m]=A.shadow.matrix,_++}n.point[m]=N,m++}else if(A.isHemisphereLight){const N=t.get(A);N.skyColor.copy(A.color).multiplyScalar(P),N.groundColor.copy(A.groundColor).multiplyScalar(P),n.hemi[u]=N,u++}}g>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=gt.LTC_FLOAT_1,n.rectAreaLTC2=gt.LTC_FLOAT_2):(n.rectAreaLTC1=gt.LTC_HALF_1,n.rectAreaLTC2=gt.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=f,n.ambient[2]=d;const T=n.hash;(T.directionalLength!==p||T.pointLength!==m||T.spotLength!==v||T.rectAreaLength!==g||T.hemiLength!==u||T.numDirectionalShadows!==x||T.numPointShadows!==_||T.numSpotShadows!==M||T.numSpotMaps!==E||T.numLightProbes!==w)&&(n.directional.length=p,n.spot.length=v,n.rectArea.length=g,n.point.length=m,n.hemi.length=u,n.directionalShadow.length=x,n.directionalShadowMap.length=x,n.pointShadow.length=_,n.pointShadowMap.length=_,n.spotShadow.length=M,n.spotShadowMap.length=M,n.directionalShadowMatrix.length=x,n.pointShadowMatrix.length=_,n.spotLightMatrix.length=M+E-b,n.spotLightMap.length=E,n.numSpotLightShadowsWithMaps=b,n.numLightProbes=w,T.directionalLength=p,T.pointLength=m,T.spotLength=v,T.rectAreaLength=g,T.hemiLength=u,T.numDirectionalShadows=x,T.numPointShadows=_,T.numSpotShadows=M,T.numSpotMaps=E,T.numLightProbes=w,n.version=rM++)}function c(l,h){let f=0,d=0,p=0,m=0,v=0;const g=h.matrixWorldInverse;for(let u=0,x=l.length;u<x;u++){const _=l[u];if(_.isDirectionalLight){const M=n.directional[f];M.direction.setFromMatrixPosition(_.matrixWorld),s.setFromMatrixPosition(_.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(g),f++}else if(_.isSpotLight){const M=n.spot[p];M.position.setFromMatrixPosition(_.matrixWorld),M.position.applyMatrix4(g),M.direction.setFromMatrixPosition(_.matrixWorld),s.setFromMatrixPosition(_.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(g),p++}else if(_.isRectAreaLight){const M=n.rectArea[m];M.position.setFromMatrixPosition(_.matrixWorld),M.position.applyMatrix4(g),r.identity(),o.copy(_.matrixWorld),o.premultiply(g),r.extractRotation(o),M.halfWidth.set(_.width*.5,0,0),M.halfHeight.set(0,_.height*.5,0),M.halfWidth.applyMatrix4(r),M.halfHeight.applyMatrix4(r),m++}else if(_.isPointLight){const M=n.point[d];M.position.setFromMatrixPosition(_.matrixWorld),M.position.applyMatrix4(g),d++}else if(_.isHemisphereLight){const M=n.hemi[v];M.direction.setFromMatrixPosition(_.matrixWorld),M.direction.transformDirection(g),v++}}}return{setup:a,setupView:c,state:n}}function $h(i){const t=new cM(i),e=[],n=[];function s(h){l.camera=h,e.length=0,n.length=0}function o(h){e.push(h)}function r(h){n.push(h)}function a(){t.setup(e)}function c(h){t.setupView(e,h)}const l={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:a,setupLightsView:c,pushLight:o,pushShadow:r}}function lM(i){let t=new WeakMap;function e(s,o=0){const r=t.get(s);let a;return r===void 0?(a=new $h(i),t.set(s,[a])):o>=r.length?(a=new $h(i),r.push(a)):a=r[o],a}function n(){t=new WeakMap}return{get:e,dispose:n}}class hM extends ji{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=Xp,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class uM extends ji{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const fM=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,dM=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function pM(i,t,e){let n=new Ul;const s=new Kt,o=new Kt,r=new Jt,a=new hM({depthPacking:qp}),c=new uM,l={},h=e.maxTextureSize,f={[Si]:Ke,[Ke]:Si,[we]:we},d=new me({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Kt},radius:{value:4}},vertexShader:fM,fragmentShader:dM}),p=d.clone();p.defines.HORIZONTAL_PASS=1;const m=new Gt;m.setAttribute("position",new Pt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new dt(m,d),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Zf;let u=this.type;this.render=function(b,w,T){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||b.length===0)return;const y=i.getRenderTarget(),S=i.getActiveCubeFace(),A=i.getActiveMipmapLevel(),R=i.state;R.setBlending(_i),R.buffers.color.setClear(1,1,1,1),R.buffers.depth.setTest(!0),R.setScissorTest(!1);const P=u!==Yn&&this.type===Yn,U=u===Yn&&this.type!==Yn;for(let I=0,N=b.length;I<N;I++){const G=b[I],z=G.shadow;if(z===void 0){console.warn("THREE.WebGLShadowMap:",G,"has no shadow.");continue}if(z.autoUpdate===!1&&z.needsUpdate===!1)continue;s.copy(z.mapSize);const V=z.getFrameExtents();if(s.multiply(V),o.copy(z.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(o.x=Math.floor(h/V.x),s.x=o.x*V.x,z.mapSize.x=o.x),s.y>h&&(o.y=Math.floor(h/V.y),s.y=o.y*V.y,z.mapSize.y=o.y)),z.map===null||P===!0||U===!0){const j=this.type!==Yn?{minFilter:ze,magFilter:ze}:{};z.map!==null&&z.map.dispose(),z.map=new ni(s.x,s.y,j),z.map.texture.name=G.name+".shadowMap",z.camera.updateProjectionMatrix()}i.setRenderTarget(z.map),i.clear();const Y=z.getViewportCount();for(let j=0;j<Y;j++){const ot=z.getViewport(j);r.set(o.x*ot.x,o.y*ot.y,o.x*ot.z,o.y*ot.w),R.viewport(r),z.updateMatrices(G,j),n=z.getFrustum(),M(w,T,z.camera,G,this.type)}z.isPointLightShadow!==!0&&this.type===Yn&&x(z,T),z.needsUpdate=!1}u=this.type,g.needsUpdate=!1,i.setRenderTarget(y,S,A)};function x(b,w){const T=t.update(v);d.defines.VSM_SAMPLES!==b.blurSamples&&(d.defines.VSM_SAMPLES=b.blurSamples,p.defines.VSM_SAMPLES=b.blurSamples,d.needsUpdate=!0,p.needsUpdate=!0),b.mapPass===null&&(b.mapPass=new ni(s.x,s.y)),d.uniforms.shadow_pass.value=b.map.texture,d.uniforms.resolution.value=b.mapSize,d.uniforms.radius.value=b.radius,i.setRenderTarget(b.mapPass),i.clear(),i.renderBufferDirect(w,null,T,d,v,null),p.uniforms.shadow_pass.value=b.mapPass.texture,p.uniforms.resolution.value=b.mapSize,p.uniforms.radius.value=b.radius,i.setRenderTarget(b.map),i.clear(),i.renderBufferDirect(w,null,T,p,v,null)}function _(b,w,T,y){let S=null;const A=T.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(A!==void 0)S=A;else if(S=T.isPointLight===!0?c:a,i.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0){const R=S.uuid,P=w.uuid;let U=l[R];U===void 0&&(U={},l[R]=U);let I=U[P];I===void 0&&(I=S.clone(),U[P]=I,w.addEventListener("dispose",E)),S=I}if(S.visible=w.visible,S.wireframe=w.wireframe,y===Yn?S.side=w.shadowSide!==null?w.shadowSide:w.side:S.side=w.shadowSide!==null?w.shadowSide:f[w.side],S.alphaMap=w.alphaMap,S.alphaTest=w.alphaTest,S.map=w.map,S.clipShadows=w.clipShadows,S.clippingPlanes=w.clippingPlanes,S.clipIntersection=w.clipIntersection,S.displacementMap=w.displacementMap,S.displacementScale=w.displacementScale,S.displacementBias=w.displacementBias,S.wireframeLinewidth=w.wireframeLinewidth,S.linewidth=w.linewidth,T.isPointLight===!0&&S.isMeshDistanceMaterial===!0){const R=i.properties.get(S);R.light=T}return S}function M(b,w,T,y,S){if(b.visible===!1)return;if(b.layers.test(w.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&S===Yn)&&(!b.frustumCulled||n.intersectsObject(b))){b.modelViewMatrix.multiplyMatrices(T.matrixWorldInverse,b.matrixWorld);const P=t.update(b),U=b.material;if(Array.isArray(U)){const I=P.groups;for(let N=0,G=I.length;N<G;N++){const z=I[N],V=U[z.materialIndex];if(V&&V.visible){const Y=_(b,V,y,S);b.onBeforeShadow(i,b,w,T,P,Y,z),i.renderBufferDirect(T,null,P,Y,b,z),b.onAfterShadow(i,b,w,T,P,Y,z)}}}else if(U.visible){const I=_(b,U,y,S);b.onBeforeShadow(i,b,w,T,P,I,null),i.renderBufferDirect(T,null,P,I,b,null),b.onAfterShadow(i,b,w,T,P,I,null)}}const R=b.children;for(let P=0,U=R.length;P<U;P++)M(R[P],w,T,y,S)}function E(b){b.target.removeEventListener("dispose",E);for(const T in l){const y=l[T],S=b.target.uuid;S in y&&(y[S].dispose(),delete y[S])}}}const mM={[bc]:Tc,[Ec]:Cc,[Ac]:Pc,[Ps]:Rc,[Tc]:bc,[Cc]:Ec,[Pc]:Ac,[Rc]:Ps};function gM(i,t){function e(){let O=!1;const vt=new Jt;let $=null;const nt=new Jt(0,0,0,0);return{setMask:function(_t){$!==_t&&!O&&(i.colorMask(_t,_t,_t,_t),$=_t)},setLocked:function(_t){O=_t},setClear:function(_t,xt,Ot,ge,be){be===!0&&(_t*=ge,xt*=ge,Ot*=ge),vt.set(_t,xt,Ot,ge),nt.equals(vt)===!1&&(i.clearColor(_t,xt,Ot,ge),nt.copy(vt))},reset:function(){O=!1,$=null,nt.set(-1,0,0,0)}}}function n(){let O=!1,vt=!1,$=null,nt=null,_t=null;return{setReversed:function(xt){if(vt!==xt){const Ot=t.get("EXT_clip_control");vt?Ot.clipControlEXT(Ot.LOWER_LEFT_EXT,Ot.ZERO_TO_ONE_EXT):Ot.clipControlEXT(Ot.LOWER_LEFT_EXT,Ot.NEGATIVE_ONE_TO_ONE_EXT);const ge=_t;_t=null,this.setClear(ge)}vt=xt},getReversed:function(){return vt},setTest:function(xt){xt?st(i.DEPTH_TEST):pt(i.DEPTH_TEST)},setMask:function(xt){$!==xt&&!O&&(i.depthMask(xt),$=xt)},setFunc:function(xt){if(vt&&(xt=mM[xt]),nt!==xt){switch(xt){case bc:i.depthFunc(i.NEVER);break;case Tc:i.depthFunc(i.ALWAYS);break;case Ec:i.depthFunc(i.LESS);break;case Ps:i.depthFunc(i.LEQUAL);break;case Ac:i.depthFunc(i.EQUAL);break;case Rc:i.depthFunc(i.GEQUAL);break;case Cc:i.depthFunc(i.GREATER);break;case Pc:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}nt=xt}},setLocked:function(xt){O=xt},setClear:function(xt){_t!==xt&&(vt&&(xt=1-xt),i.clearDepth(xt),_t=xt)},reset:function(){O=!1,$=null,nt=null,_t=null,vt=!1}}}function s(){let O=!1,vt=null,$=null,nt=null,_t=null,xt=null,Ot=null,ge=null,be=null;return{setTest:function(Qt){O||(Qt?st(i.STENCIL_TEST):pt(i.STENCIL_TEST))},setMask:function(Qt){vt!==Qt&&!O&&(i.stencilMask(Qt),vt=Qt)},setFunc:function(Qt,Fe,dn){($!==Qt||nt!==Fe||_t!==dn)&&(i.stencilFunc(Qt,Fe,dn),$=Qt,nt=Fe,_t=dn)},setOp:function(Qt,Fe,dn){(xt!==Qt||Ot!==Fe||ge!==dn)&&(i.stencilOp(Qt,Fe,dn),xt=Qt,Ot=Fe,ge=dn)},setLocked:function(Qt){O=Qt},setClear:function(Qt){be!==Qt&&(i.clearStencil(Qt),be=Qt)},reset:function(){O=!1,vt=null,$=null,nt=null,_t=null,xt=null,Ot=null,ge=null,be=null}}}const o=new e,r=new n,a=new s,c=new WeakMap,l=new WeakMap;let h={},f={},d=new WeakMap,p=[],m=null,v=!1,g=null,u=null,x=null,_=null,M=null,E=null,b=null,w=new Q(0,0,0),T=0,y=!1,S=null,A=null,R=null,P=null,U=null;const I=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let N=!1,G=0;const z=i.getParameter(i.VERSION);z.indexOf("WebGL")!==-1?(G=parseFloat(/^WebGL (\d)/.exec(z)[1]),N=G>=1):z.indexOf("OpenGL ES")!==-1&&(G=parseFloat(/^OpenGL ES (\d)/.exec(z)[1]),N=G>=2);let V=null,Y={};const j=i.getParameter(i.SCISSOR_BOX),ot=i.getParameter(i.VIEWPORT),wt=new Jt().fromArray(j),W=new Jt().fromArray(ot);function et(O,vt,$,nt){const _t=new Uint8Array(4),xt=i.createTexture();i.bindTexture(O,xt),i.texParameteri(O,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(O,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ot=0;Ot<$;Ot++)O===i.TEXTURE_3D||O===i.TEXTURE_2D_ARRAY?i.texImage3D(vt,0,i.RGBA,1,1,nt,0,i.RGBA,i.UNSIGNED_BYTE,_t):i.texImage2D(vt+Ot,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,_t);return xt}const tt={};tt[i.TEXTURE_2D]=et(i.TEXTURE_2D,i.TEXTURE_2D,1),tt[i.TEXTURE_CUBE_MAP]=et(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),tt[i.TEXTURE_2D_ARRAY]=et(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),tt[i.TEXTURE_3D]=et(i.TEXTURE_3D,i.TEXTURE_3D,1,1),o.setClear(0,0,0,1),r.setClear(1),a.setClear(0),st(i.DEPTH_TEST),r.setFunc(Ps),Yt(!1),jt(eh),st(i.CULL_FACE),B(_i);function st(O){h[O]!==!0&&(i.enable(O),h[O]=!0)}function pt(O){h[O]!==!1&&(i.disable(O),h[O]=!1)}function Tt(O,vt){return f[O]!==vt?(i.bindFramebuffer(O,vt),f[O]=vt,O===i.DRAW_FRAMEBUFFER&&(f[i.FRAMEBUFFER]=vt),O===i.FRAMEBUFFER&&(f[i.DRAW_FRAMEBUFFER]=vt),!0):!1}function Ut(O,vt){let $=p,nt=!1;if(O){$=d.get(vt),$===void 0&&($=[],d.set(vt,$));const _t=O.textures;if($.length!==_t.length||$[0]!==i.COLOR_ATTACHMENT0){for(let xt=0,Ot=_t.length;xt<Ot;xt++)$[xt]=i.COLOR_ATTACHMENT0+xt;$.length=_t.length,nt=!0}}else $[0]!==i.BACK&&($[0]=i.BACK,nt=!0);nt&&i.drawBuffers($)}function ie(O){return m!==O?(i.useProgram(O),m=O,!0):!1}const qt={[Fi]:i.FUNC_ADD,[Mp]:i.FUNC_SUBTRACT,[_p]:i.FUNC_REVERSE_SUBTRACT};qt[xp]=i.MIN,qt[yp]=i.MAX;const ue={[Sp]:i.ZERO,[wp]:i.ONE,[bp]:i.SRC_COLOR,[Sc]:i.SRC_ALPHA,[Pp]:i.SRC_ALPHA_SATURATE,[Rp]:i.DST_COLOR,[Ep]:i.DST_ALPHA,[Tp]:i.ONE_MINUS_SRC_COLOR,[wc]:i.ONE_MINUS_SRC_ALPHA,[Cp]:i.ONE_MINUS_DST_COLOR,[Ap]:i.ONE_MINUS_DST_ALPHA,[Lp]:i.CONSTANT_COLOR,[Dp]:i.ONE_MINUS_CONSTANT_COLOR,[Ip]:i.CONSTANT_ALPHA,[Up]:i.ONE_MINUS_CONSTANT_ALPHA};function B(O,vt,$,nt,_t,xt,Ot,ge,be,Qt){if(O===_i){v===!0&&(pt(i.BLEND),v=!1);return}if(v===!1&&(st(i.BLEND),v=!0),O!==vp){if(O!==g||Qt!==y){if((u!==Fi||M!==Fi)&&(i.blendEquation(i.FUNC_ADD),u=Fi,M=Fi),Qt)switch(O){case bs:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case fn:i.blendFunc(i.ONE,i.ONE);break;case nh:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case ih:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",O);break}else switch(O){case bs:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case fn:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case nh:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case ih:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",O);break}x=null,_=null,E=null,b=null,w.set(0,0,0),T=0,g=O,y=Qt}return}_t=_t||vt,xt=xt||$,Ot=Ot||nt,(vt!==u||_t!==M)&&(i.blendEquationSeparate(qt[vt],qt[_t]),u=vt,M=_t),($!==x||nt!==_||xt!==E||Ot!==b)&&(i.blendFuncSeparate(ue[$],ue[nt],ue[xt],ue[Ot]),x=$,_=nt,E=xt,b=Ot),(ge.equals(w)===!1||be!==T)&&(i.blendColor(ge.r,ge.g,ge.b,be),w.copy(ge),T=be),g=O,y=!1}function Le(O,vt){O.side===we?pt(i.CULL_FACE):st(i.CULL_FACE);let $=O.side===Ke;vt&&($=!$),Yt($),O.blending===bs&&O.transparent===!1?B(_i):B(O.blending,O.blendEquation,O.blendSrc,O.blendDst,O.blendEquationAlpha,O.blendSrcAlpha,O.blendDstAlpha,O.blendColor,O.blendAlpha,O.premultipliedAlpha),r.setFunc(O.depthFunc),r.setTest(O.depthTest),r.setMask(O.depthWrite),o.setMask(O.colorWrite);const nt=O.stencilWrite;a.setTest(nt),nt&&(a.setMask(O.stencilWriteMask),a.setFunc(O.stencilFunc,O.stencilRef,O.stencilFuncMask),a.setOp(O.stencilFail,O.stencilZFail,O.stencilZPass)),fe(O.polygonOffset,O.polygonOffsetFactor,O.polygonOffsetUnits),O.alphaToCoverage===!0?st(i.SAMPLE_ALPHA_TO_COVERAGE):pt(i.SAMPLE_ALPHA_TO_COVERAGE)}function Yt(O){S!==O&&(O?i.frontFace(i.CW):i.frontFace(i.CCW),S=O)}function jt(O){O!==pp?(st(i.CULL_FACE),O!==A&&(O===eh?i.cullFace(i.BACK):O===mp?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):pt(i.CULL_FACE),A=O}function It(O){O!==R&&(N&&i.lineWidth(O),R=O)}function fe(O,vt,$){O?(st(i.POLYGON_OFFSET_FILL),(P!==vt||U!==$)&&(i.polygonOffset(vt,$),P=vt,U=$)):pt(i.POLYGON_OFFSET_FILL)}function Lt(O){O?st(i.SCISSOR_TEST):pt(i.SCISSOR_TEST)}function D(O){O===void 0&&(O=i.TEXTURE0+I-1),V!==O&&(i.activeTexture(O),V=O)}function C(O,vt,$){$===void 0&&(V===null?$=i.TEXTURE0+I-1:$=V);let nt=Y[$];nt===void 0&&(nt={type:void 0,texture:void 0},Y[$]=nt),(nt.type!==O||nt.texture!==vt)&&(V!==$&&(i.activeTexture($),V=$),i.bindTexture(O,vt||tt[O]),nt.type=O,nt.texture=vt)}function X(){const O=Y[V];O!==void 0&&O.type!==void 0&&(i.bindTexture(O.type,null),O.type=void 0,O.texture=void 0)}function it(){try{i.compressedTexImage2D.apply(i,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function at(){try{i.compressedTexImage3D.apply(i,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function q(){try{i.texSubImage2D.apply(i,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function ut(){try{i.texSubImage3D.apply(i,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function lt(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function ft(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Nt(){try{i.texStorage2D.apply(i,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function ct(){try{i.texStorage3D.apply(i,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Mt(){try{i.texImage2D.apply(i,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Dt(){try{i.texImage3D.apply(i,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function bt(O){wt.equals(O)===!1&&(i.scissor(O.x,O.y,O.z,O.w),wt.copy(O))}function mt(O){W.equals(O)===!1&&(i.viewport(O.x,O.y,O.z,O.w),W.copy(O))}function Vt(O,vt){let $=l.get(vt);$===void 0&&($=new WeakMap,l.set(vt,$));let nt=$.get(O);nt===void 0&&(nt=i.getUniformBlockIndex(vt,O.name),$.set(O,nt))}function zt(O,vt){const nt=l.get(vt).get(O);c.get(vt)!==nt&&(i.uniformBlockBinding(vt,nt,O.__bindingPointIndex),c.set(vt,nt))}function se(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),r.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},V=null,Y={},f={},d=new WeakMap,p=[],m=null,v=!1,g=null,u=null,x=null,_=null,M=null,E=null,b=null,w=new Q(0,0,0),T=0,y=!1,S=null,A=null,R=null,P=null,U=null,wt.set(0,0,i.canvas.width,i.canvas.height),W.set(0,0,i.canvas.width,i.canvas.height),o.reset(),r.reset(),a.reset()}return{buffers:{color:o,depth:r,stencil:a},enable:st,disable:pt,bindFramebuffer:Tt,drawBuffers:Ut,useProgram:ie,setBlending:B,setMaterial:Le,setFlipSided:Yt,setCullFace:jt,setLineWidth:It,setPolygonOffset:fe,setScissorTest:Lt,activeTexture:D,bindTexture:C,unbindTexture:X,compressedTexImage2D:it,compressedTexImage3D:at,texImage2D:Mt,texImage3D:Dt,updateUBOMapping:Vt,uniformBlockBinding:zt,texStorage2D:Nt,texStorage3D:ct,texSubImage2D:q,texSubImage3D:ut,compressedTexSubImage2D:lt,compressedTexSubImage3D:ft,scissor:bt,viewport:mt,reset:se}}function Jh(i,t,e,n){const s=vM(n);switch(e){case Qf:return i*t;case ed:return i*t;case nd:return i*t*2;case Rl:return i*t/s.components*s.byteLength;case Cl:return i*t/s.components*s.byteLength;case id:return i*t*2/s.components*s.byteLength;case Pl:return i*t*2/s.components*s.byteLength;case td:return i*t*3/s.components*s.byteLength;case yn:return i*t*4/s.components*s.byteLength;case Ll:return i*t*4/s.components*s.byteLength;case Pr:case Lr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Dr:case Ir:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Fc:case Oc:return Math.max(i,16)*Math.max(t,8)/4;case Nc:case zc:return Math.max(i,8)*Math.max(t,8)/2;case Bc:case kc:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Hc:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Gc:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Vc:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case Wc:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case Xc:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case qc:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case Yc:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case Zc:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case Kc:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case jc:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case $c:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case Jc:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case Qc:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case tl:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case el:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case Ur:case nl:case il:return Math.ceil(i/4)*Math.ceil(t/4)*16;case sd:case sl:return Math.ceil(i/4)*Math.ceil(t/4)*8;case ol:case rl:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function vM(i){switch(i){case ei:case jf:return{byteLength:1,components:1};case vo:case $f:case bo:return{byteLength:2,components:1};case El:case Al:return{byteLength:2,components:4};case Wi:case Tl:case Dn:return{byteLength:4,components:1};case Jf:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function MM(i,t,e,n,s,o,r){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Kt,h=new WeakMap;let f;const d=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(D,C){return p?new OffscreenCanvas(D,C):kr("canvas")}function v(D,C,X){let it=1;const at=Lt(D);if((at.width>X||at.height>X)&&(it=X/Math.max(at.width,at.height)),it<1)if(typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&D instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&D instanceof ImageBitmap||typeof VideoFrame<"u"&&D instanceof VideoFrame){const q=Math.floor(it*at.width),ut=Math.floor(it*at.height);f===void 0&&(f=m(q,ut));const lt=C?m(q,ut):f;return lt.width=q,lt.height=ut,lt.getContext("2d").drawImage(D,0,0,q,ut),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+at.width+"x"+at.height+") to ("+q+"x"+ut+")."),lt}else return"data"in D&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+at.width+"x"+at.height+")."),D;return D}function g(D){return D.generateMipmaps}function u(D){i.generateMipmap(D)}function x(D){return D.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:D.isWebGL3DRenderTarget?i.TEXTURE_3D:D.isWebGLArrayRenderTarget||D.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function _(D,C,X,it,at=!1){if(D!==null){if(i[D]!==void 0)return i[D];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+D+"'")}let q=C;if(C===i.RED&&(X===i.FLOAT&&(q=i.R32F),X===i.HALF_FLOAT&&(q=i.R16F),X===i.UNSIGNED_BYTE&&(q=i.R8)),C===i.RED_INTEGER&&(X===i.UNSIGNED_BYTE&&(q=i.R8UI),X===i.UNSIGNED_SHORT&&(q=i.R16UI),X===i.UNSIGNED_INT&&(q=i.R32UI),X===i.BYTE&&(q=i.R8I),X===i.SHORT&&(q=i.R16I),X===i.INT&&(q=i.R32I)),C===i.RG&&(X===i.FLOAT&&(q=i.RG32F),X===i.HALF_FLOAT&&(q=i.RG16F),X===i.UNSIGNED_BYTE&&(q=i.RG8)),C===i.RG_INTEGER&&(X===i.UNSIGNED_BYTE&&(q=i.RG8UI),X===i.UNSIGNED_SHORT&&(q=i.RG16UI),X===i.UNSIGNED_INT&&(q=i.RG32UI),X===i.BYTE&&(q=i.RG8I),X===i.SHORT&&(q=i.RG16I),X===i.INT&&(q=i.RG32I)),C===i.RGB_INTEGER&&(X===i.UNSIGNED_BYTE&&(q=i.RGB8UI),X===i.UNSIGNED_SHORT&&(q=i.RGB16UI),X===i.UNSIGNED_INT&&(q=i.RGB32UI),X===i.BYTE&&(q=i.RGB8I),X===i.SHORT&&(q=i.RGB16I),X===i.INT&&(q=i.RGB32I)),C===i.RGBA_INTEGER&&(X===i.UNSIGNED_BYTE&&(q=i.RGBA8UI),X===i.UNSIGNED_SHORT&&(q=i.RGBA16UI),X===i.UNSIGNED_INT&&(q=i.RGBA32UI),X===i.BYTE&&(q=i.RGBA8I),X===i.SHORT&&(q=i.RGBA16I),X===i.INT&&(q=i.RGBA32I)),C===i.RGB&&X===i.UNSIGNED_INT_5_9_9_9_REV&&(q=i.RGB9_E5),C===i.RGBA){const ut=at?Jr:$t.getTransfer(it);X===i.FLOAT&&(q=i.RGBA32F),X===i.HALF_FLOAT&&(q=i.RGBA16F),X===i.UNSIGNED_BYTE&&(q=ut===pe?i.SRGB8_ALPHA8:i.RGBA8),X===i.UNSIGNED_SHORT_4_4_4_4&&(q=i.RGBA4),X===i.UNSIGNED_SHORT_5_5_5_1&&(q=i.RGB5_A1)}return(q===i.R16F||q===i.R32F||q===i.RG16F||q===i.RG32F||q===i.RGBA16F||q===i.RGBA32F)&&t.get("EXT_color_buffer_float"),q}function M(D,C){let X;return D?C===null||C===Wi||C===Is?X=i.DEPTH24_STENCIL8:C===Dn?X=i.DEPTH32F_STENCIL8:C===vo&&(X=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):C===null||C===Wi||C===Is?X=i.DEPTH_COMPONENT24:C===Dn?X=i.DEPTH_COMPONENT32F:C===vo&&(X=i.DEPTH_COMPONENT16),X}function E(D,C){return g(D)===!0||D.isFramebufferTexture&&D.minFilter!==ze&&D.minFilter!==Ln?Math.log2(Math.max(C.width,C.height))+1:D.mipmaps!==void 0&&D.mipmaps.length>0?D.mipmaps.length:D.isCompressedTexture&&Array.isArray(D.image)?C.mipmaps.length:1}function b(D){const C=D.target;C.removeEventListener("dispose",b),T(C),C.isVideoTexture&&h.delete(C)}function w(D){const C=D.target;C.removeEventListener("dispose",w),S(C)}function T(D){const C=n.get(D);if(C.__webglInit===void 0)return;const X=D.source,it=d.get(X);if(it){const at=it[C.__cacheKey];at.usedTimes--,at.usedTimes===0&&y(D),Object.keys(it).length===0&&d.delete(X)}n.remove(D)}function y(D){const C=n.get(D);i.deleteTexture(C.__webglTexture);const X=D.source,it=d.get(X);delete it[C.__cacheKey],r.memory.textures--}function S(D){const C=n.get(D);if(D.depthTexture&&(D.depthTexture.dispose(),n.remove(D.depthTexture)),D.isWebGLCubeRenderTarget)for(let it=0;it<6;it++){if(Array.isArray(C.__webglFramebuffer[it]))for(let at=0;at<C.__webglFramebuffer[it].length;at++)i.deleteFramebuffer(C.__webglFramebuffer[it][at]);else i.deleteFramebuffer(C.__webglFramebuffer[it]);C.__webglDepthbuffer&&i.deleteRenderbuffer(C.__webglDepthbuffer[it])}else{if(Array.isArray(C.__webglFramebuffer))for(let it=0;it<C.__webglFramebuffer.length;it++)i.deleteFramebuffer(C.__webglFramebuffer[it]);else i.deleteFramebuffer(C.__webglFramebuffer);if(C.__webglDepthbuffer&&i.deleteRenderbuffer(C.__webglDepthbuffer),C.__webglMultisampledFramebuffer&&i.deleteFramebuffer(C.__webglMultisampledFramebuffer),C.__webglColorRenderbuffer)for(let it=0;it<C.__webglColorRenderbuffer.length;it++)C.__webglColorRenderbuffer[it]&&i.deleteRenderbuffer(C.__webglColorRenderbuffer[it]);C.__webglDepthRenderbuffer&&i.deleteRenderbuffer(C.__webglDepthRenderbuffer)}const X=D.textures;for(let it=0,at=X.length;it<at;it++){const q=n.get(X[it]);q.__webglTexture&&(i.deleteTexture(q.__webglTexture),r.memory.textures--),n.remove(X[it])}n.remove(D)}let A=0;function R(){A=0}function P(){const D=A;return D>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+D+" texture units while this GPU supports only "+s.maxTextures),A+=1,D}function U(D){const C=[];return C.push(D.wrapS),C.push(D.wrapT),C.push(D.wrapR||0),C.push(D.magFilter),C.push(D.minFilter),C.push(D.anisotropy),C.push(D.internalFormat),C.push(D.format),C.push(D.type),C.push(D.generateMipmaps),C.push(D.premultiplyAlpha),C.push(D.flipY),C.push(D.unpackAlignment),C.push(D.colorSpace),C.join()}function I(D,C){const X=n.get(D);if(D.isVideoTexture&&It(D),D.isRenderTargetTexture===!1&&D.version>0&&X.__version!==D.version){const it=D.image;if(it===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(it.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{W(X,D,C);return}}e.bindTexture(i.TEXTURE_2D,X.__webglTexture,i.TEXTURE0+C)}function N(D,C){const X=n.get(D);if(D.version>0&&X.__version!==D.version){W(X,D,C);return}e.bindTexture(i.TEXTURE_2D_ARRAY,X.__webglTexture,i.TEXTURE0+C)}function G(D,C){const X=n.get(D);if(D.version>0&&X.__version!==D.version){W(X,D,C);return}e.bindTexture(i.TEXTURE_3D,X.__webglTexture,i.TEXTURE0+C)}function z(D,C){const X=n.get(D);if(D.version>0&&X.__version!==D.version){et(X,D,C);return}e.bindTexture(i.TEXTURE_CUBE_MAP,X.__webglTexture,i.TEXTURE0+C)}const V={[Ic]:i.REPEAT,[Oi]:i.CLAMP_TO_EDGE,[Uc]:i.MIRRORED_REPEAT},Y={[ze]:i.NEAREST,[Wp]:i.NEAREST_MIPMAP_NEAREST,[Do]:i.NEAREST_MIPMAP_LINEAR,[Ln]:i.LINEAR,[pa]:i.LINEAR_MIPMAP_NEAREST,[Bi]:i.LINEAR_MIPMAP_LINEAR},j={[Zp]:i.NEVER,[t0]:i.ALWAYS,[Kp]:i.LESS,[rd]:i.LEQUAL,[jp]:i.EQUAL,[Qp]:i.GEQUAL,[$p]:i.GREATER,[Jp]:i.NOTEQUAL};function ot(D,C){if(C.type===Dn&&t.has("OES_texture_float_linear")===!1&&(C.magFilter===Ln||C.magFilter===pa||C.magFilter===Do||C.magFilter===Bi||C.minFilter===Ln||C.minFilter===pa||C.minFilter===Do||C.minFilter===Bi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(D,i.TEXTURE_WRAP_S,V[C.wrapS]),i.texParameteri(D,i.TEXTURE_WRAP_T,V[C.wrapT]),(D===i.TEXTURE_3D||D===i.TEXTURE_2D_ARRAY)&&i.texParameteri(D,i.TEXTURE_WRAP_R,V[C.wrapR]),i.texParameteri(D,i.TEXTURE_MAG_FILTER,Y[C.magFilter]),i.texParameteri(D,i.TEXTURE_MIN_FILTER,Y[C.minFilter]),C.compareFunction&&(i.texParameteri(D,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(D,i.TEXTURE_COMPARE_FUNC,j[C.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(C.magFilter===ze||C.minFilter!==Do&&C.minFilter!==Bi||C.type===Dn&&t.has("OES_texture_float_linear")===!1)return;if(C.anisotropy>1||n.get(C).__currentAnisotropy){const X=t.get("EXT_texture_filter_anisotropic");i.texParameterf(D,X.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(C.anisotropy,s.getMaxAnisotropy())),n.get(C).__currentAnisotropy=C.anisotropy}}}function wt(D,C){let X=!1;D.__webglInit===void 0&&(D.__webglInit=!0,C.addEventListener("dispose",b));const it=C.source;let at=d.get(it);at===void 0&&(at={},d.set(it,at));const q=U(C);if(q!==D.__cacheKey){at[q]===void 0&&(at[q]={texture:i.createTexture(),usedTimes:0},r.memory.textures++,X=!0),at[q].usedTimes++;const ut=at[D.__cacheKey];ut!==void 0&&(at[D.__cacheKey].usedTimes--,ut.usedTimes===0&&y(C)),D.__cacheKey=q,D.__webglTexture=at[q].texture}return X}function W(D,C,X){let it=i.TEXTURE_2D;(C.isDataArrayTexture||C.isCompressedArrayTexture)&&(it=i.TEXTURE_2D_ARRAY),C.isData3DTexture&&(it=i.TEXTURE_3D);const at=wt(D,C),q=C.source;e.bindTexture(it,D.__webglTexture,i.TEXTURE0+X);const ut=n.get(q);if(q.version!==ut.__version||at===!0){e.activeTexture(i.TEXTURE0+X);const lt=$t.getPrimaries($t.workingColorSpace),ft=C.colorSpace===gi?null:$t.getPrimaries(C.colorSpace),Nt=C.colorSpace===gi||lt===ft?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,C.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,C.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,C.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Nt);let ct=v(C.image,!1,s.maxTextureSize);ct=fe(C,ct);const Mt=o.convert(C.format,C.colorSpace),Dt=o.convert(C.type);let bt=_(C.internalFormat,Mt,Dt,C.colorSpace,C.isVideoTexture);ot(it,C);let mt;const Vt=C.mipmaps,zt=C.isVideoTexture!==!0,se=ut.__version===void 0||at===!0,O=q.dataReady,vt=E(C,ct);if(C.isDepthTexture)bt=M(C.format===Us,C.type),se&&(zt?e.texStorage2D(i.TEXTURE_2D,1,bt,ct.width,ct.height):e.texImage2D(i.TEXTURE_2D,0,bt,ct.width,ct.height,0,Mt,Dt,null));else if(C.isDataTexture)if(Vt.length>0){zt&&se&&e.texStorage2D(i.TEXTURE_2D,vt,bt,Vt[0].width,Vt[0].height);for(let $=0,nt=Vt.length;$<nt;$++)mt=Vt[$],zt?O&&e.texSubImage2D(i.TEXTURE_2D,$,0,0,mt.width,mt.height,Mt,Dt,mt.data):e.texImage2D(i.TEXTURE_2D,$,bt,mt.width,mt.height,0,Mt,Dt,mt.data);C.generateMipmaps=!1}else zt?(se&&e.texStorage2D(i.TEXTURE_2D,vt,bt,ct.width,ct.height),O&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,ct.width,ct.height,Mt,Dt,ct.data)):e.texImage2D(i.TEXTURE_2D,0,bt,ct.width,ct.height,0,Mt,Dt,ct.data);else if(C.isCompressedTexture)if(C.isCompressedArrayTexture){zt&&se&&e.texStorage3D(i.TEXTURE_2D_ARRAY,vt,bt,Vt[0].width,Vt[0].height,ct.depth);for(let $=0,nt=Vt.length;$<nt;$++)if(mt=Vt[$],C.format!==yn)if(Mt!==null)if(zt){if(O)if(C.layerUpdates.size>0){const _t=Jh(mt.width,mt.height,C.format,C.type);for(const xt of C.layerUpdates){const Ot=mt.data.subarray(xt*_t/mt.data.BYTES_PER_ELEMENT,(xt+1)*_t/mt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,$,0,0,xt,mt.width,mt.height,1,Mt,Ot)}C.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,$,0,0,0,mt.width,mt.height,ct.depth,Mt,mt.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,$,bt,mt.width,mt.height,ct.depth,0,mt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else zt?O&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,$,0,0,0,mt.width,mt.height,ct.depth,Mt,Dt,mt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,$,bt,mt.width,mt.height,ct.depth,0,Mt,Dt,mt.data)}else{zt&&se&&e.texStorage2D(i.TEXTURE_2D,vt,bt,Vt[0].width,Vt[0].height);for(let $=0,nt=Vt.length;$<nt;$++)mt=Vt[$],C.format!==yn?Mt!==null?zt?O&&e.compressedTexSubImage2D(i.TEXTURE_2D,$,0,0,mt.width,mt.height,Mt,mt.data):e.compressedTexImage2D(i.TEXTURE_2D,$,bt,mt.width,mt.height,0,mt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):zt?O&&e.texSubImage2D(i.TEXTURE_2D,$,0,0,mt.width,mt.height,Mt,Dt,mt.data):e.texImage2D(i.TEXTURE_2D,$,bt,mt.width,mt.height,0,Mt,Dt,mt.data)}else if(C.isDataArrayTexture)if(zt){if(se&&e.texStorage3D(i.TEXTURE_2D_ARRAY,vt,bt,ct.width,ct.height,ct.depth),O)if(C.layerUpdates.size>0){const $=Jh(ct.width,ct.height,C.format,C.type);for(const nt of C.layerUpdates){const _t=ct.data.subarray(nt*$/ct.data.BYTES_PER_ELEMENT,(nt+1)*$/ct.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,nt,ct.width,ct.height,1,Mt,Dt,_t)}C.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ct.width,ct.height,ct.depth,Mt,Dt,ct.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,bt,ct.width,ct.height,ct.depth,0,Mt,Dt,ct.data);else if(C.isData3DTexture)zt?(se&&e.texStorage3D(i.TEXTURE_3D,vt,bt,ct.width,ct.height,ct.depth),O&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ct.width,ct.height,ct.depth,Mt,Dt,ct.data)):e.texImage3D(i.TEXTURE_3D,0,bt,ct.width,ct.height,ct.depth,0,Mt,Dt,ct.data);else if(C.isFramebufferTexture){if(se)if(zt)e.texStorage2D(i.TEXTURE_2D,vt,bt,ct.width,ct.height);else{let $=ct.width,nt=ct.height;for(let _t=0;_t<vt;_t++)e.texImage2D(i.TEXTURE_2D,_t,bt,$,nt,0,Mt,Dt,null),$>>=1,nt>>=1}}else if(Vt.length>0){if(zt&&se){const $=Lt(Vt[0]);e.texStorage2D(i.TEXTURE_2D,vt,bt,$.width,$.height)}for(let $=0,nt=Vt.length;$<nt;$++)mt=Vt[$],zt?O&&e.texSubImage2D(i.TEXTURE_2D,$,0,0,Mt,Dt,mt):e.texImage2D(i.TEXTURE_2D,$,bt,Mt,Dt,mt);C.generateMipmaps=!1}else if(zt){if(se){const $=Lt(ct);e.texStorage2D(i.TEXTURE_2D,vt,bt,$.width,$.height)}O&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,Mt,Dt,ct)}else e.texImage2D(i.TEXTURE_2D,0,bt,Mt,Dt,ct);g(C)&&u(it),ut.__version=q.version,C.onUpdate&&C.onUpdate(C)}D.__version=C.version}function et(D,C,X){if(C.image.length!==6)return;const it=wt(D,C),at=C.source;e.bindTexture(i.TEXTURE_CUBE_MAP,D.__webglTexture,i.TEXTURE0+X);const q=n.get(at);if(at.version!==q.__version||it===!0){e.activeTexture(i.TEXTURE0+X);const ut=$t.getPrimaries($t.workingColorSpace),lt=C.colorSpace===gi?null:$t.getPrimaries(C.colorSpace),ft=C.colorSpace===gi||ut===lt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,C.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,C.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,C.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ft);const Nt=C.isCompressedTexture||C.image[0].isCompressedTexture,ct=C.image[0]&&C.image[0].isDataTexture,Mt=[];for(let nt=0;nt<6;nt++)!Nt&&!ct?Mt[nt]=v(C.image[nt],!0,s.maxCubemapSize):Mt[nt]=ct?C.image[nt].image:C.image[nt],Mt[nt]=fe(C,Mt[nt]);const Dt=Mt[0],bt=o.convert(C.format,C.colorSpace),mt=o.convert(C.type),Vt=_(C.internalFormat,bt,mt,C.colorSpace),zt=C.isVideoTexture!==!0,se=q.__version===void 0||it===!0,O=at.dataReady;let vt=E(C,Dt);ot(i.TEXTURE_CUBE_MAP,C);let $;if(Nt){zt&&se&&e.texStorage2D(i.TEXTURE_CUBE_MAP,vt,Vt,Dt.width,Dt.height);for(let nt=0;nt<6;nt++){$=Mt[nt].mipmaps;for(let _t=0;_t<$.length;_t++){const xt=$[_t];C.format!==yn?bt!==null?zt?O&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,_t,0,0,xt.width,xt.height,bt,xt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,_t,Vt,xt.width,xt.height,0,xt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):zt?O&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,_t,0,0,xt.width,xt.height,bt,mt,xt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,_t,Vt,xt.width,xt.height,0,bt,mt,xt.data)}}}else{if($=C.mipmaps,zt&&se){$.length>0&&vt++;const nt=Lt(Mt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,vt,Vt,nt.width,nt.height)}for(let nt=0;nt<6;nt++)if(ct){zt?O&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,0,0,Mt[nt].width,Mt[nt].height,bt,mt,Mt[nt].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,Vt,Mt[nt].width,Mt[nt].height,0,bt,mt,Mt[nt].data);for(let _t=0;_t<$.length;_t++){const Ot=$[_t].image[nt].image;zt?O&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,_t+1,0,0,Ot.width,Ot.height,bt,mt,Ot.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,_t+1,Vt,Ot.width,Ot.height,0,bt,mt,Ot.data)}}else{zt?O&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,0,0,bt,mt,Mt[nt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,Vt,bt,mt,Mt[nt]);for(let _t=0;_t<$.length;_t++){const xt=$[_t];zt?O&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,_t+1,0,0,bt,mt,xt.image[nt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,_t+1,Vt,bt,mt,xt.image[nt])}}}g(C)&&u(i.TEXTURE_CUBE_MAP),q.__version=at.version,C.onUpdate&&C.onUpdate(C)}D.__version=C.version}function tt(D,C,X,it,at,q){const ut=o.convert(X.format,X.colorSpace),lt=o.convert(X.type),ft=_(X.internalFormat,ut,lt,X.colorSpace),Nt=n.get(C),ct=n.get(X);if(ct.__renderTarget=C,!Nt.__hasExternalTextures){const Mt=Math.max(1,C.width>>q),Dt=Math.max(1,C.height>>q);at===i.TEXTURE_3D||at===i.TEXTURE_2D_ARRAY?e.texImage3D(at,q,ft,Mt,Dt,C.depth,0,ut,lt,null):e.texImage2D(at,q,ft,Mt,Dt,0,ut,lt,null)}e.bindFramebuffer(i.FRAMEBUFFER,D),jt(C)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,it,at,ct.__webglTexture,0,Yt(C)):(at===i.TEXTURE_2D||at>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&at<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,it,at,ct.__webglTexture,q),e.bindFramebuffer(i.FRAMEBUFFER,null)}function st(D,C,X){if(i.bindRenderbuffer(i.RENDERBUFFER,D),C.depthBuffer){const it=C.depthTexture,at=it&&it.isDepthTexture?it.type:null,q=M(C.stencilBuffer,at),ut=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,lt=Yt(C);jt(C)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,lt,q,C.width,C.height):X?i.renderbufferStorageMultisample(i.RENDERBUFFER,lt,q,C.width,C.height):i.renderbufferStorage(i.RENDERBUFFER,q,C.width,C.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,ut,i.RENDERBUFFER,D)}else{const it=C.textures;for(let at=0;at<it.length;at++){const q=it[at],ut=o.convert(q.format,q.colorSpace),lt=o.convert(q.type),ft=_(q.internalFormat,ut,lt,q.colorSpace),Nt=Yt(C);X&&jt(C)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Nt,ft,C.width,C.height):jt(C)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Nt,ft,C.width,C.height):i.renderbufferStorage(i.RENDERBUFFER,ft,C.width,C.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function pt(D,C){if(C&&C.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,D),!(C.depthTexture&&C.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const it=n.get(C.depthTexture);it.__renderTarget=C,(!it.__webglTexture||C.depthTexture.image.width!==C.width||C.depthTexture.image.height!==C.height)&&(C.depthTexture.image.width=C.width,C.depthTexture.image.height=C.height,C.depthTexture.needsUpdate=!0),I(C.depthTexture,0);const at=it.__webglTexture,q=Yt(C);if(C.depthTexture.format===Ts)jt(C)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,at,0,q):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,at,0);else if(C.depthTexture.format===Us)jt(C)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,at,0,q):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,at,0);else throw new Error("Unknown depthTexture format")}function Tt(D){const C=n.get(D),X=D.isWebGLCubeRenderTarget===!0;if(C.__boundDepthTexture!==D.depthTexture){const it=D.depthTexture;if(C.__depthDisposeCallback&&C.__depthDisposeCallback(),it){const at=()=>{delete C.__boundDepthTexture,delete C.__depthDisposeCallback,it.removeEventListener("dispose",at)};it.addEventListener("dispose",at),C.__depthDisposeCallback=at}C.__boundDepthTexture=it}if(D.depthTexture&&!C.__autoAllocateDepthBuffer){if(X)throw new Error("target.depthTexture not supported in Cube render targets");pt(C.__webglFramebuffer,D)}else if(X){C.__webglDepthbuffer=[];for(let it=0;it<6;it++)if(e.bindFramebuffer(i.FRAMEBUFFER,C.__webglFramebuffer[it]),C.__webglDepthbuffer[it]===void 0)C.__webglDepthbuffer[it]=i.createRenderbuffer(),st(C.__webglDepthbuffer[it],D,!1);else{const at=D.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,q=C.__webglDepthbuffer[it];i.bindRenderbuffer(i.RENDERBUFFER,q),i.framebufferRenderbuffer(i.FRAMEBUFFER,at,i.RENDERBUFFER,q)}}else if(e.bindFramebuffer(i.FRAMEBUFFER,C.__webglFramebuffer),C.__webglDepthbuffer===void 0)C.__webglDepthbuffer=i.createRenderbuffer(),st(C.__webglDepthbuffer,D,!1);else{const it=D.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,at=C.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,at),i.framebufferRenderbuffer(i.FRAMEBUFFER,it,i.RENDERBUFFER,at)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function Ut(D,C,X){const it=n.get(D);C!==void 0&&tt(it.__webglFramebuffer,D,D.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),X!==void 0&&Tt(D)}function ie(D){const C=D.texture,X=n.get(D),it=n.get(C);D.addEventListener("dispose",w);const at=D.textures,q=D.isWebGLCubeRenderTarget===!0,ut=at.length>1;if(ut||(it.__webglTexture===void 0&&(it.__webglTexture=i.createTexture()),it.__version=C.version,r.memory.textures++),q){X.__webglFramebuffer=[];for(let lt=0;lt<6;lt++)if(C.mipmaps&&C.mipmaps.length>0){X.__webglFramebuffer[lt]=[];for(let ft=0;ft<C.mipmaps.length;ft++)X.__webglFramebuffer[lt][ft]=i.createFramebuffer()}else X.__webglFramebuffer[lt]=i.createFramebuffer()}else{if(C.mipmaps&&C.mipmaps.length>0){X.__webglFramebuffer=[];for(let lt=0;lt<C.mipmaps.length;lt++)X.__webglFramebuffer[lt]=i.createFramebuffer()}else X.__webglFramebuffer=i.createFramebuffer();if(ut)for(let lt=0,ft=at.length;lt<ft;lt++){const Nt=n.get(at[lt]);Nt.__webglTexture===void 0&&(Nt.__webglTexture=i.createTexture(),r.memory.textures++)}if(D.samples>0&&jt(D)===!1){X.__webglMultisampledFramebuffer=i.createFramebuffer(),X.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,X.__webglMultisampledFramebuffer);for(let lt=0;lt<at.length;lt++){const ft=at[lt];X.__webglColorRenderbuffer[lt]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,X.__webglColorRenderbuffer[lt]);const Nt=o.convert(ft.format,ft.colorSpace),ct=o.convert(ft.type),Mt=_(ft.internalFormat,Nt,ct,ft.colorSpace,D.isXRRenderTarget===!0),Dt=Yt(D);i.renderbufferStorageMultisample(i.RENDERBUFFER,Dt,Mt,D.width,D.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+lt,i.RENDERBUFFER,X.__webglColorRenderbuffer[lt])}i.bindRenderbuffer(i.RENDERBUFFER,null),D.depthBuffer&&(X.__webglDepthRenderbuffer=i.createRenderbuffer(),st(X.__webglDepthRenderbuffer,D,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(q){e.bindTexture(i.TEXTURE_CUBE_MAP,it.__webglTexture),ot(i.TEXTURE_CUBE_MAP,C);for(let lt=0;lt<6;lt++)if(C.mipmaps&&C.mipmaps.length>0)for(let ft=0;ft<C.mipmaps.length;ft++)tt(X.__webglFramebuffer[lt][ft],D,C,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+lt,ft);else tt(X.__webglFramebuffer[lt],D,C,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+lt,0);g(C)&&u(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(ut){for(let lt=0,ft=at.length;lt<ft;lt++){const Nt=at[lt],ct=n.get(Nt);e.bindTexture(i.TEXTURE_2D,ct.__webglTexture),ot(i.TEXTURE_2D,Nt),tt(X.__webglFramebuffer,D,Nt,i.COLOR_ATTACHMENT0+lt,i.TEXTURE_2D,0),g(Nt)&&u(i.TEXTURE_2D)}e.unbindTexture()}else{let lt=i.TEXTURE_2D;if((D.isWebGL3DRenderTarget||D.isWebGLArrayRenderTarget)&&(lt=D.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(lt,it.__webglTexture),ot(lt,C),C.mipmaps&&C.mipmaps.length>0)for(let ft=0;ft<C.mipmaps.length;ft++)tt(X.__webglFramebuffer[ft],D,C,i.COLOR_ATTACHMENT0,lt,ft);else tt(X.__webglFramebuffer,D,C,i.COLOR_ATTACHMENT0,lt,0);g(C)&&u(lt),e.unbindTexture()}D.depthBuffer&&Tt(D)}function qt(D){const C=D.textures;for(let X=0,it=C.length;X<it;X++){const at=C[X];if(g(at)){const q=x(D),ut=n.get(at).__webglTexture;e.bindTexture(q,ut),u(q),e.unbindTexture()}}}const ue=[],B=[];function Le(D){if(D.samples>0){if(jt(D)===!1){const C=D.textures,X=D.width,it=D.height;let at=i.COLOR_BUFFER_BIT;const q=D.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ut=n.get(D),lt=C.length>1;if(lt)for(let ft=0;ft<C.length;ft++)e.bindFramebuffer(i.FRAMEBUFFER,ut.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ft,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,ut.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ft,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,ut.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,ut.__webglFramebuffer);for(let ft=0;ft<C.length;ft++){if(D.resolveDepthBuffer&&(D.depthBuffer&&(at|=i.DEPTH_BUFFER_BIT),D.stencilBuffer&&D.resolveStencilBuffer&&(at|=i.STENCIL_BUFFER_BIT)),lt){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,ut.__webglColorRenderbuffer[ft]);const Nt=n.get(C[ft]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Nt,0)}i.blitFramebuffer(0,0,X,it,0,0,X,it,at,i.NEAREST),c===!0&&(ue.length=0,B.length=0,ue.push(i.COLOR_ATTACHMENT0+ft),D.depthBuffer&&D.resolveDepthBuffer===!1&&(ue.push(q),B.push(q),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,B)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,ue))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),lt)for(let ft=0;ft<C.length;ft++){e.bindFramebuffer(i.FRAMEBUFFER,ut.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ft,i.RENDERBUFFER,ut.__webglColorRenderbuffer[ft]);const Nt=n.get(C[ft]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,ut.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ft,i.TEXTURE_2D,Nt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,ut.__webglMultisampledFramebuffer)}else if(D.depthBuffer&&D.resolveDepthBuffer===!1&&c){const C=D.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[C])}}}function Yt(D){return Math.min(s.maxSamples,D.samples)}function jt(D){const C=n.get(D);return D.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&C.__useRenderToTexture!==!1}function It(D){const C=r.render.frame;h.get(D)!==C&&(h.set(D,C),D.update())}function fe(D,C){const X=D.colorSpace,it=D.format,at=D.type;return D.isCompressedTexture===!0||D.isVideoTexture===!0||X!==Bs&&X!==gi&&($t.getTransfer(X)===pe?(it!==yn||at!==ei)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",X)),C}function Lt(D){return typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement?(l.width=D.naturalWidth||D.width,l.height=D.naturalHeight||D.height):typeof VideoFrame<"u"&&D instanceof VideoFrame?(l.width=D.displayWidth,l.height=D.displayHeight):(l.width=D.width,l.height=D.height),l}this.allocateTextureUnit=P,this.resetTextureUnits=R,this.setTexture2D=I,this.setTexture2DArray=N,this.setTexture3D=G,this.setTextureCube=z,this.rebindTextures=Ut,this.setupRenderTarget=ie,this.updateRenderTargetMipmap=qt,this.updateMultisampleRenderTarget=Le,this.setupDepthRenderbuffer=Tt,this.setupFrameBufferTexture=tt,this.useMultisampledRTT=jt}function _M(i,t){function e(n,s=gi){let o;const r=$t.getTransfer(s);if(n===ei)return i.UNSIGNED_BYTE;if(n===El)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Al)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Jf)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===jf)return i.BYTE;if(n===$f)return i.SHORT;if(n===vo)return i.UNSIGNED_SHORT;if(n===Tl)return i.INT;if(n===Wi)return i.UNSIGNED_INT;if(n===Dn)return i.FLOAT;if(n===bo)return i.HALF_FLOAT;if(n===Qf)return i.ALPHA;if(n===td)return i.RGB;if(n===yn)return i.RGBA;if(n===ed)return i.LUMINANCE;if(n===nd)return i.LUMINANCE_ALPHA;if(n===Ts)return i.DEPTH_COMPONENT;if(n===Us)return i.DEPTH_STENCIL;if(n===Rl)return i.RED;if(n===Cl)return i.RED_INTEGER;if(n===id)return i.RG;if(n===Pl)return i.RG_INTEGER;if(n===Ll)return i.RGBA_INTEGER;if(n===Pr||n===Lr||n===Dr||n===Ir)if(r===pe)if(o=t.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(n===Pr)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Lr)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Dr)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Ir)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=t.get("WEBGL_compressed_texture_s3tc"),o!==null){if(n===Pr)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Lr)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Dr)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Ir)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Nc||n===Fc||n===zc||n===Oc)if(o=t.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(n===Nc)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Fc)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===zc)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Oc)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Bc||n===kc||n===Hc)if(o=t.get("WEBGL_compressed_texture_etc"),o!==null){if(n===Bc||n===kc)return r===pe?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(n===Hc)return r===pe?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Gc||n===Vc||n===Wc||n===Xc||n===qc||n===Yc||n===Zc||n===Kc||n===jc||n===$c||n===Jc||n===Qc||n===tl||n===el)if(o=t.get("WEBGL_compressed_texture_astc"),o!==null){if(n===Gc)return r===pe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Vc)return r===pe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Wc)return r===pe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Xc)return r===pe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===qc)return r===pe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Yc)return r===pe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Zc)return r===pe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Kc)return r===pe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===jc)return r===pe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===$c)return r===pe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Jc)return r===pe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Qc)return r===pe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===tl)return r===pe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===el)return r===pe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Ur||n===nl||n===il)if(o=t.get("EXT_texture_compression_bptc"),o!==null){if(n===Ur)return r===pe?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===nl)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===il)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===sd||n===sl||n===ol||n===rl)if(o=t.get("EXT_texture_compression_rgtc"),o!==null){if(n===Ur)return o.COMPRESSED_RED_RGTC1_EXT;if(n===sl)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===ol)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===rl)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Is?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}class xM extends Je{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class ee extends Ae{constructor(){super(),this.isGroup=!0,this.type="Group"}}const yM={type:"move"};class Ha{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ee,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ee,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new F,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new F),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ee,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new F,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new F),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,o=null,r=null;const a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){r=!0;for(const v of t.hand.values()){const g=e.getJointPose(v,n),u=this._getHandJoint(l,v);g!==null&&(u.matrix.fromArray(g.transform.matrix),u.matrix.decompose(u.position,u.rotation,u.scale),u.matrixWorldNeedsUpdate=!0,u.jointRadius=g.radius),u.visible=g!==null}const h=l.joints["index-finger-tip"],f=l.joints["thumb-tip"],d=h.position.distanceTo(f.position),p=.02,m=.005;l.inputState.pinching&&d>p+m?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&d<=p-m&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(o=e.getPose(t.gripSpace,n),o!==null&&(c.matrix.fromArray(o.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,o.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(o.linearVelocity)):c.hasLinearVelocity=!1,o.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(o.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&o!==null&&(s=o),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(yM)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=o!==null),l!==null&&(l.visible=r!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new ee;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const SM=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,wM=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class bM{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const s=new je,o=t.properties.get(s);o.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new me({vertexShader:SM,fragmentShader:wM,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new dt(new Qe(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class TM extends ks{constructor(t,e){super();const n=this;let s=null,o=1,r=null,a="local-floor",c=1,l=null,h=null,f=null,d=null,p=null,m=null;const v=new bM,g=e.getContextAttributes();let u=null,x=null;const _=[],M=[],E=new Kt;let b=null;const w=new Je;w.viewport=new Jt;const T=new Je;T.viewport=new Jt;const y=[w,T],S=new xM;let A=null,R=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(W){let et=_[W];return et===void 0&&(et=new Ha,_[W]=et),et.getTargetRaySpace()},this.getControllerGrip=function(W){let et=_[W];return et===void 0&&(et=new Ha,_[W]=et),et.getGripSpace()},this.getHand=function(W){let et=_[W];return et===void 0&&(et=new Ha,_[W]=et),et.getHandSpace()};function P(W){const et=M.indexOf(W.inputSource);if(et===-1)return;const tt=_[et];tt!==void 0&&(tt.update(W.inputSource,W.frame,l||r),tt.dispatchEvent({type:W.type,data:W.inputSource}))}function U(){s.removeEventListener("select",P),s.removeEventListener("selectstart",P),s.removeEventListener("selectend",P),s.removeEventListener("squeeze",P),s.removeEventListener("squeezestart",P),s.removeEventListener("squeezeend",P),s.removeEventListener("end",U),s.removeEventListener("inputsourceschange",I);for(let W=0;W<_.length;W++){const et=M[W];et!==null&&(M[W]=null,_[W].disconnect(et))}A=null,R=null,v.reset(),t.setRenderTarget(u),p=null,d=null,f=null,s=null,x=null,wt.stop(),n.isPresenting=!1,t.setPixelRatio(b),t.setSize(E.width,E.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(W){o=W,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(W){a=W,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||r},this.setReferenceSpace=function(W){l=W},this.getBaseLayer=function(){return d!==null?d:p},this.getBinding=function(){return f},this.getFrame=function(){return m},this.getSession=function(){return s},this.setSession=async function(W){if(s=W,s!==null){if(u=t.getRenderTarget(),s.addEventListener("select",P),s.addEventListener("selectstart",P),s.addEventListener("selectend",P),s.addEventListener("squeeze",P),s.addEventListener("squeezestart",P),s.addEventListener("squeezeend",P),s.addEventListener("end",U),s.addEventListener("inputsourceschange",I),g.xrCompatible!==!0&&await e.makeXRCompatible(),b=t.getPixelRatio(),t.getSize(E),s.renderState.layers===void 0){const et={antialias:g.antialias,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:o};p=new XRWebGLLayer(s,e,et),s.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),x=new ni(p.framebufferWidth,p.framebufferHeight,{format:yn,type:ei,colorSpace:t.outputColorSpace,stencilBuffer:g.stencil})}else{let et=null,tt=null,st=null;g.depth&&(st=g.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,et=g.stencil?Us:Ts,tt=g.stencil?Is:Wi);const pt={colorFormat:e.RGBA8,depthFormat:st,scaleFactor:o};f=new XRWebGLBinding(s,e),d=f.createProjectionLayer(pt),s.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),x=new ni(d.textureWidth,d.textureHeight,{format:yn,type:ei,depthTexture:new Md(d.textureWidth,d.textureHeight,tt,void 0,void 0,void 0,void 0,void 0,void 0,et),stencilBuffer:g.stencil,colorSpace:t.outputColorSpace,samples:g.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(c),l=null,r=await s.requestReferenceSpace(a),wt.setContext(s),wt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function I(W){for(let et=0;et<W.removed.length;et++){const tt=W.removed[et],st=M.indexOf(tt);st>=0&&(M[st]=null,_[st].disconnect(tt))}for(let et=0;et<W.added.length;et++){const tt=W.added[et];let st=M.indexOf(tt);if(st===-1){for(let Tt=0;Tt<_.length;Tt++)if(Tt>=M.length){M.push(tt),st=Tt;break}else if(M[Tt]===null){M[Tt]=tt,st=Tt;break}if(st===-1)break}const pt=_[st];pt&&pt.connect(tt)}}const N=new F,G=new F;function z(W,et,tt){N.setFromMatrixPosition(et.matrixWorld),G.setFromMatrixPosition(tt.matrixWorld);const st=N.distanceTo(G),pt=et.projectionMatrix.elements,Tt=tt.projectionMatrix.elements,Ut=pt[14]/(pt[10]-1),ie=pt[14]/(pt[10]+1),qt=(pt[9]+1)/pt[5],ue=(pt[9]-1)/pt[5],B=(pt[8]-1)/pt[0],Le=(Tt[8]+1)/Tt[0],Yt=Ut*B,jt=Ut*Le,It=st/(-B+Le),fe=It*-B;if(et.matrixWorld.decompose(W.position,W.quaternion,W.scale),W.translateX(fe),W.translateZ(It),W.matrixWorld.compose(W.position,W.quaternion,W.scale),W.matrixWorldInverse.copy(W.matrixWorld).invert(),pt[10]===-1)W.projectionMatrix.copy(et.projectionMatrix),W.projectionMatrixInverse.copy(et.projectionMatrixInverse);else{const Lt=Ut+It,D=ie+It,C=Yt-fe,X=jt+(st-fe),it=qt*ie/D*Lt,at=ue*ie/D*Lt;W.projectionMatrix.makePerspective(C,X,it,at,Lt,D),W.projectionMatrixInverse.copy(W.projectionMatrix).invert()}}function V(W,et){et===null?W.matrixWorld.copy(W.matrix):W.matrixWorld.multiplyMatrices(et.matrixWorld,W.matrix),W.matrixWorldInverse.copy(W.matrixWorld).invert()}this.updateCamera=function(W){if(s===null)return;let et=W.near,tt=W.far;v.texture!==null&&(v.depthNear>0&&(et=v.depthNear),v.depthFar>0&&(tt=v.depthFar)),S.near=T.near=w.near=et,S.far=T.far=w.far=tt,(A!==S.near||R!==S.far)&&(s.updateRenderState({depthNear:S.near,depthFar:S.far}),A=S.near,R=S.far),w.layers.mask=W.layers.mask|2,T.layers.mask=W.layers.mask|4,S.layers.mask=w.layers.mask|T.layers.mask;const st=W.parent,pt=S.cameras;V(S,st);for(let Tt=0;Tt<pt.length;Tt++)V(pt[Tt],st);pt.length===2?z(S,w,T):S.projectionMatrix.copy(w.projectionMatrix),Y(W,S,st)};function Y(W,et,tt){tt===null?W.matrix.copy(et.matrixWorld):(W.matrix.copy(tt.matrixWorld),W.matrix.invert(),W.matrix.multiply(et.matrixWorld)),W.matrix.decompose(W.position,W.quaternion,W.scale),W.updateMatrixWorld(!0),W.projectionMatrix.copy(et.projectionMatrix),W.projectionMatrixInverse.copy(et.projectionMatrixInverse),W.isPerspectiveCamera&&(W.fov=Mo*2*Math.atan(1/W.projectionMatrix.elements[5]),W.zoom=1)}this.getCamera=function(){return S},this.getFoveation=function(){if(!(d===null&&p===null))return c},this.setFoveation=function(W){c=W,d!==null&&(d.fixedFoveation=W),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=W)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(S)};let j=null;function ot(W,et){if(h=et.getViewerPose(l||r),m=et,h!==null){const tt=h.views;p!==null&&(t.setRenderTargetFramebuffer(x,p.framebuffer),t.setRenderTarget(x));let st=!1;tt.length!==S.cameras.length&&(S.cameras.length=0,st=!0);for(let Tt=0;Tt<tt.length;Tt++){const Ut=tt[Tt];let ie=null;if(p!==null)ie=p.getViewport(Ut);else{const ue=f.getViewSubImage(d,Ut);ie=ue.viewport,Tt===0&&(t.setRenderTargetTextures(x,ue.colorTexture,d.ignoreDepthValues?void 0:ue.depthStencilTexture),t.setRenderTarget(x))}let qt=y[Tt];qt===void 0&&(qt=new Je,qt.layers.enable(Tt),qt.viewport=new Jt,y[Tt]=qt),qt.matrix.fromArray(Ut.transform.matrix),qt.matrix.decompose(qt.position,qt.quaternion,qt.scale),qt.projectionMatrix.fromArray(Ut.projectionMatrix),qt.projectionMatrixInverse.copy(qt.projectionMatrix).invert(),qt.viewport.set(ie.x,ie.y,ie.width,ie.height),Tt===0&&(S.matrix.copy(qt.matrix),S.matrix.decompose(S.position,S.quaternion,S.scale)),st===!0&&S.cameras.push(qt)}const pt=s.enabledFeatures;if(pt&&pt.includes("depth-sensing")){const Tt=f.getDepthInformation(tt[0]);Tt&&Tt.isValid&&Tt.texture&&v.init(t,Tt,s.renderState)}}for(let tt=0;tt<_.length;tt++){const st=M[tt],pt=_[tt];st!==null&&pt!==void 0&&pt.update(st,et,l||r)}j&&j(W,et),et.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:et}),m=null}const wt=new vd;wt.setAnimationLoop(ot),this.setAnimationLoop=function(W){j=W},this.dispose=function(){}}}const Ci=new Fn,EM=new ne;function AM(i,t){function e(g,u){g.matrixAutoUpdate===!0&&g.updateMatrix(),u.value.copy(g.matrix)}function n(g,u){u.color.getRGB(g.fogColor.value,pd(i)),u.isFog?(g.fogNear.value=u.near,g.fogFar.value=u.far):u.isFogExp2&&(g.fogDensity.value=u.density)}function s(g,u,x,_,M){u.isMeshBasicMaterial||u.isMeshLambertMaterial?o(g,u):u.isMeshToonMaterial?(o(g,u),f(g,u)):u.isMeshPhongMaterial?(o(g,u),h(g,u)):u.isMeshStandardMaterial?(o(g,u),d(g,u),u.isMeshPhysicalMaterial&&p(g,u,M)):u.isMeshMatcapMaterial?(o(g,u),m(g,u)):u.isMeshDepthMaterial?o(g,u):u.isMeshDistanceMaterial?(o(g,u),v(g,u)):u.isMeshNormalMaterial?o(g,u):u.isLineBasicMaterial?(r(g,u),u.isLineDashedMaterial&&a(g,u)):u.isPointsMaterial?c(g,u,x,_):u.isSpriteMaterial?l(g,u):u.isShadowMaterial?(g.color.value.copy(u.color),g.opacity.value=u.opacity):u.isShaderMaterial&&(u.uniformsNeedUpdate=!1)}function o(g,u){g.opacity.value=u.opacity,u.color&&g.diffuse.value.copy(u.color),u.emissive&&g.emissive.value.copy(u.emissive).multiplyScalar(u.emissiveIntensity),u.map&&(g.map.value=u.map,e(u.map,g.mapTransform)),u.alphaMap&&(g.alphaMap.value=u.alphaMap,e(u.alphaMap,g.alphaMapTransform)),u.bumpMap&&(g.bumpMap.value=u.bumpMap,e(u.bumpMap,g.bumpMapTransform),g.bumpScale.value=u.bumpScale,u.side===Ke&&(g.bumpScale.value*=-1)),u.normalMap&&(g.normalMap.value=u.normalMap,e(u.normalMap,g.normalMapTransform),g.normalScale.value.copy(u.normalScale),u.side===Ke&&g.normalScale.value.negate()),u.displacementMap&&(g.displacementMap.value=u.displacementMap,e(u.displacementMap,g.displacementMapTransform),g.displacementScale.value=u.displacementScale,g.displacementBias.value=u.displacementBias),u.emissiveMap&&(g.emissiveMap.value=u.emissiveMap,e(u.emissiveMap,g.emissiveMapTransform)),u.specularMap&&(g.specularMap.value=u.specularMap,e(u.specularMap,g.specularMapTransform)),u.alphaTest>0&&(g.alphaTest.value=u.alphaTest);const x=t.get(u),_=x.envMap,M=x.envMapRotation;_&&(g.envMap.value=_,Ci.copy(M),Ci.x*=-1,Ci.y*=-1,Ci.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&(Ci.y*=-1,Ci.z*=-1),g.envMapRotation.value.setFromMatrix4(EM.makeRotationFromEuler(Ci)),g.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=u.reflectivity,g.ior.value=u.ior,g.refractionRatio.value=u.refractionRatio),u.lightMap&&(g.lightMap.value=u.lightMap,g.lightMapIntensity.value=u.lightMapIntensity,e(u.lightMap,g.lightMapTransform)),u.aoMap&&(g.aoMap.value=u.aoMap,g.aoMapIntensity.value=u.aoMapIntensity,e(u.aoMap,g.aoMapTransform))}function r(g,u){g.diffuse.value.copy(u.color),g.opacity.value=u.opacity,u.map&&(g.map.value=u.map,e(u.map,g.mapTransform))}function a(g,u){g.dashSize.value=u.dashSize,g.totalSize.value=u.dashSize+u.gapSize,g.scale.value=u.scale}function c(g,u,x,_){g.diffuse.value.copy(u.color),g.opacity.value=u.opacity,g.size.value=u.size*x,g.scale.value=_*.5,u.map&&(g.map.value=u.map,e(u.map,g.uvTransform)),u.alphaMap&&(g.alphaMap.value=u.alphaMap,e(u.alphaMap,g.alphaMapTransform)),u.alphaTest>0&&(g.alphaTest.value=u.alphaTest)}function l(g,u){g.diffuse.value.copy(u.color),g.opacity.value=u.opacity,g.rotation.value=u.rotation,u.map&&(g.map.value=u.map,e(u.map,g.mapTransform)),u.alphaMap&&(g.alphaMap.value=u.alphaMap,e(u.alphaMap,g.alphaMapTransform)),u.alphaTest>0&&(g.alphaTest.value=u.alphaTest)}function h(g,u){g.specular.value.copy(u.specular),g.shininess.value=Math.max(u.shininess,1e-4)}function f(g,u){u.gradientMap&&(g.gradientMap.value=u.gradientMap)}function d(g,u){g.metalness.value=u.metalness,u.metalnessMap&&(g.metalnessMap.value=u.metalnessMap,e(u.metalnessMap,g.metalnessMapTransform)),g.roughness.value=u.roughness,u.roughnessMap&&(g.roughnessMap.value=u.roughnessMap,e(u.roughnessMap,g.roughnessMapTransform)),u.envMap&&(g.envMapIntensity.value=u.envMapIntensity)}function p(g,u,x){g.ior.value=u.ior,u.sheen>0&&(g.sheenColor.value.copy(u.sheenColor).multiplyScalar(u.sheen),g.sheenRoughness.value=u.sheenRoughness,u.sheenColorMap&&(g.sheenColorMap.value=u.sheenColorMap,e(u.sheenColorMap,g.sheenColorMapTransform)),u.sheenRoughnessMap&&(g.sheenRoughnessMap.value=u.sheenRoughnessMap,e(u.sheenRoughnessMap,g.sheenRoughnessMapTransform))),u.clearcoat>0&&(g.clearcoat.value=u.clearcoat,g.clearcoatRoughness.value=u.clearcoatRoughness,u.clearcoatMap&&(g.clearcoatMap.value=u.clearcoatMap,e(u.clearcoatMap,g.clearcoatMapTransform)),u.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=u.clearcoatRoughnessMap,e(u.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),u.clearcoatNormalMap&&(g.clearcoatNormalMap.value=u.clearcoatNormalMap,e(u.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(u.clearcoatNormalScale),u.side===Ke&&g.clearcoatNormalScale.value.negate())),u.dispersion>0&&(g.dispersion.value=u.dispersion),u.iridescence>0&&(g.iridescence.value=u.iridescence,g.iridescenceIOR.value=u.iridescenceIOR,g.iridescenceThicknessMinimum.value=u.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=u.iridescenceThicknessRange[1],u.iridescenceMap&&(g.iridescenceMap.value=u.iridescenceMap,e(u.iridescenceMap,g.iridescenceMapTransform)),u.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=u.iridescenceThicknessMap,e(u.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),u.transmission>0&&(g.transmission.value=u.transmission,g.transmissionSamplerMap.value=x.texture,g.transmissionSamplerSize.value.set(x.width,x.height),u.transmissionMap&&(g.transmissionMap.value=u.transmissionMap,e(u.transmissionMap,g.transmissionMapTransform)),g.thickness.value=u.thickness,u.thicknessMap&&(g.thicknessMap.value=u.thicknessMap,e(u.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=u.attenuationDistance,g.attenuationColor.value.copy(u.attenuationColor)),u.anisotropy>0&&(g.anisotropyVector.value.set(u.anisotropy*Math.cos(u.anisotropyRotation),u.anisotropy*Math.sin(u.anisotropyRotation)),u.anisotropyMap&&(g.anisotropyMap.value=u.anisotropyMap,e(u.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=u.specularIntensity,g.specularColor.value.copy(u.specularColor),u.specularColorMap&&(g.specularColorMap.value=u.specularColorMap,e(u.specularColorMap,g.specularColorMapTransform)),u.specularIntensityMap&&(g.specularIntensityMap.value=u.specularIntensityMap,e(u.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,u){u.matcap&&(g.matcap.value=u.matcap)}function v(g,u){const x=t.get(u).light;g.referencePosition.value.setFromMatrixPosition(x.matrixWorld),g.nearDistance.value=x.shadow.camera.near,g.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function RM(i,t,e,n){let s={},o={},r=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(x,_){const M=_.program;n.uniformBlockBinding(x,M)}function l(x,_){let M=s[x.id];M===void 0&&(m(x),M=h(x),s[x.id]=M,x.addEventListener("dispose",g));const E=_.program;n.updateUBOMapping(x,E);const b=t.render.frame;o[x.id]!==b&&(d(x),o[x.id]=b)}function h(x){const _=f();x.__bindingPointIndex=_;const M=i.createBuffer(),E=x.__size,b=x.usage;return i.bindBuffer(i.UNIFORM_BUFFER,M),i.bufferData(i.UNIFORM_BUFFER,E,b),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,_,M),M}function f(){for(let x=0;x<a;x++)if(r.indexOf(x)===-1)return r.push(x),x;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(x){const _=s[x.id],M=x.uniforms,E=x.__cache;i.bindBuffer(i.UNIFORM_BUFFER,_);for(let b=0,w=M.length;b<w;b++){const T=Array.isArray(M[b])?M[b]:[M[b]];for(let y=0,S=T.length;y<S;y++){const A=T[y];if(p(A,b,y,E)===!0){const R=A.__offset,P=Array.isArray(A.value)?A.value:[A.value];let U=0;for(let I=0;I<P.length;I++){const N=P[I],G=v(N);typeof N=="number"||typeof N=="boolean"?(A.__data[0]=N,i.bufferSubData(i.UNIFORM_BUFFER,R+U,A.__data)):N.isMatrix3?(A.__data[0]=N.elements[0],A.__data[1]=N.elements[1],A.__data[2]=N.elements[2],A.__data[3]=0,A.__data[4]=N.elements[3],A.__data[5]=N.elements[4],A.__data[6]=N.elements[5],A.__data[7]=0,A.__data[8]=N.elements[6],A.__data[9]=N.elements[7],A.__data[10]=N.elements[8],A.__data[11]=0):(N.toArray(A.__data,U),U+=G.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,R,A.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(x,_,M,E){const b=x.value,w=_+"_"+M;if(E[w]===void 0)return typeof b=="number"||typeof b=="boolean"?E[w]=b:E[w]=b.clone(),!0;{const T=E[w];if(typeof b=="number"||typeof b=="boolean"){if(T!==b)return E[w]=b,!0}else if(T.equals(b)===!1)return T.copy(b),!0}return!1}function m(x){const _=x.uniforms;let M=0;const E=16;for(let w=0,T=_.length;w<T;w++){const y=Array.isArray(_[w])?_[w]:[_[w]];for(let S=0,A=y.length;S<A;S++){const R=y[S],P=Array.isArray(R.value)?R.value:[R.value];for(let U=0,I=P.length;U<I;U++){const N=P[U],G=v(N),z=M%E,V=z%G.boundary,Y=z+V;M+=V,Y!==0&&E-Y<G.storage&&(M+=E-Y),R.__data=new Float32Array(G.storage/Float32Array.BYTES_PER_ELEMENT),R.__offset=M,M+=G.storage}}}const b=M%E;return b>0&&(M+=E-b),x.__size=M,x.__cache={},this}function v(x){const _={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(_.boundary=4,_.storage=4):x.isVector2?(_.boundary=8,_.storage=8):x.isVector3||x.isColor?(_.boundary=16,_.storage=12):x.isVector4?(_.boundary=16,_.storage=16):x.isMatrix3?(_.boundary=48,_.storage=48):x.isMatrix4?(_.boundary=64,_.storage=64):x.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",x),_}function g(x){const _=x.target;_.removeEventListener("dispose",g);const M=r.indexOf(_.__bindingPointIndex);r.splice(M,1),i.deleteBuffer(s[_.id]),delete s[_.id],delete o[_.id]}function u(){for(const x in s)i.deleteBuffer(s[x]);r=[],s={},o={}}return{bind:c,update:l,dispose:u}}class CM{constructor(t={}){const{canvas:e=v0(),context:n=null,depth:s=!0,stencil:o=!1,alpha:r=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:f=!1,reverseDepthBuffer:d=!1}=t;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=r;const m=new Uint32Array(4),v=new Int32Array(4);let g=null,u=null;const x=[],_=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=ln,this.toneMapping=xi,this.toneMappingExposure=1;const M=this;let E=!1,b=0,w=0,T=null,y=-1,S=null;const A=new Jt,R=new Jt;let P=null;const U=new Q(0);let I=0,N=e.width,G=e.height,z=1,V=null,Y=null;const j=new Jt(0,0,N,G),ot=new Jt(0,0,N,G);let wt=!1;const W=new Ul;let et=!1,tt=!1;const st=new ne,pt=new ne,Tt=new F,Ut=new Jt,ie={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let qt=!1;function ue(){return T===null?z:1}let B=n;function Le(L,k){return e.getContext(L,k)}try{const L={alpha:!0,depth:s,stencil:o,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:f};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${wl}`),e.addEventListener("webglcontextlost",nt,!1),e.addEventListener("webglcontextrestored",_t,!1),e.addEventListener("webglcontextcreationerror",xt,!1),B===null){const k="webgl2";if(B=Le(k,L),B===null)throw Le(k)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(L){throw console.error("THREE.WebGLRenderer: "+L.message),L}let Yt,jt,It,fe,Lt,D,C,X,it,at,q,ut,lt,ft,Nt,ct,Mt,Dt,bt,mt,Vt,zt,se,O;function vt(){Yt=new U1(B),Yt.init(),zt=new _M(B,Yt),jt=new R1(B,Yt,t,zt),It=new gM(B,Yt),jt.reverseDepthBuffer&&d&&It.buffers.depth.setReversed(!0),fe=new z1(B),Lt=new eM,D=new MM(B,Yt,It,Lt,jt,zt,fe),C=new P1(M),X=new I1(M),it=new W0(B),se=new E1(B,it),at=new N1(B,it,fe,se),q=new B1(B,at,it,fe),bt=new O1(B,jt,D),ct=new C1(Lt),ut=new tM(M,C,X,Yt,jt,se,ct),lt=new AM(M,Lt),ft=new iM,Nt=new lM(Yt),Dt=new T1(M,C,X,It,q,p,c),Mt=new pM(M,q,jt),O=new RM(B,fe,jt,It),mt=new A1(B,Yt,fe),Vt=new F1(B,Yt,fe),fe.programs=ut.programs,M.capabilities=jt,M.extensions=Yt,M.properties=Lt,M.renderLists=ft,M.shadowMap=Mt,M.state=It,M.info=fe}vt();const $=new TM(M,B);this.xr=$,this.getContext=function(){return B},this.getContextAttributes=function(){return B.getContextAttributes()},this.forceContextLoss=function(){const L=Yt.get("WEBGL_lose_context");L&&L.loseContext()},this.forceContextRestore=function(){const L=Yt.get("WEBGL_lose_context");L&&L.restoreContext()},this.getPixelRatio=function(){return z},this.setPixelRatio=function(L){L!==void 0&&(z=L,this.setSize(N,G,!1))},this.getSize=function(L){return L.set(N,G)},this.setSize=function(L,k,Z=!0){if($.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}N=L,G=k,e.width=Math.floor(L*z),e.height=Math.floor(k*z),Z===!0&&(e.style.width=L+"px",e.style.height=k+"px"),this.setViewport(0,0,L,k)},this.getDrawingBufferSize=function(L){return L.set(N*z,G*z).floor()},this.setDrawingBufferSize=function(L,k,Z){N=L,G=k,z=Z,e.width=Math.floor(L*Z),e.height=Math.floor(k*Z),this.setViewport(0,0,L,k)},this.getCurrentViewport=function(L){return L.copy(A)},this.getViewport=function(L){return L.copy(j)},this.setViewport=function(L,k,Z,K){L.isVector4?j.set(L.x,L.y,L.z,L.w):j.set(L,k,Z,K),It.viewport(A.copy(j).multiplyScalar(z).round())},this.getScissor=function(L){return L.copy(ot)},this.setScissor=function(L,k,Z,K){L.isVector4?ot.set(L.x,L.y,L.z,L.w):ot.set(L,k,Z,K),It.scissor(R.copy(ot).multiplyScalar(z).round())},this.getScissorTest=function(){return wt},this.setScissorTest=function(L){It.setScissorTest(wt=L)},this.setOpaqueSort=function(L){V=L},this.setTransparentSort=function(L){Y=L},this.getClearColor=function(L){return L.copy(Dt.getClearColor())},this.setClearColor=function(){Dt.setClearColor.apply(Dt,arguments)},this.getClearAlpha=function(){return Dt.getClearAlpha()},this.setClearAlpha=function(){Dt.setClearAlpha.apply(Dt,arguments)},this.clear=function(L=!0,k=!0,Z=!0){let K=0;if(L){let H=!1;if(T!==null){const ht=T.texture.format;H=ht===Ll||ht===Pl||ht===Cl}if(H){const ht=T.texture.type,yt=ht===ei||ht===Wi||ht===vo||ht===Is||ht===El||ht===Al,Et=Dt.getClearColor(),At=Dt.getClearAlpha(),Ht=Et.r,Wt=Et.g,Rt=Et.b;yt?(m[0]=Ht,m[1]=Wt,m[2]=Rt,m[3]=At,B.clearBufferuiv(B.COLOR,0,m)):(v[0]=Ht,v[1]=Wt,v[2]=Rt,v[3]=At,B.clearBufferiv(B.COLOR,0,v))}else K|=B.COLOR_BUFFER_BIT}k&&(K|=B.DEPTH_BUFFER_BIT),Z&&(K|=B.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),B.clear(K)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",nt,!1),e.removeEventListener("webglcontextrestored",_t,!1),e.removeEventListener("webglcontextcreationerror",xt,!1),ft.dispose(),Nt.dispose(),Lt.dispose(),C.dispose(),X.dispose(),q.dispose(),se.dispose(),O.dispose(),ut.dispose(),$.dispose(),$.removeEventListener("sessionstart",Co),$.removeEventListener("sessionend",Zl),wi.stop()};function nt(L){L.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),E=!0}function _t(){console.log("THREE.WebGLRenderer: Context Restored."),E=!1;const L=fe.autoReset,k=Mt.enabled,Z=Mt.autoUpdate,K=Mt.needsUpdate,H=Mt.type;vt(),fe.autoReset=L,Mt.enabled=k,Mt.autoUpdate=Z,Mt.needsUpdate=K,Mt.type=H}function xt(L){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",L.statusMessage)}function Ot(L){const k=L.target;k.removeEventListener("dispose",Ot),ge(k)}function ge(L){be(L),Lt.remove(L)}function be(L){const k=Lt.get(L).programs;k!==void 0&&(k.forEach(function(Z){ut.releaseProgram(Z)}),L.isShaderMaterial&&ut.releaseShaderCache(L))}this.renderBufferDirect=function(L,k,Z,K,H,ht){k===null&&(k=ie);const yt=H.isMesh&&H.matrixWorld.determinant()<0,Et=up(L,k,Z,K,H);It.setMaterial(K,yt);let At=Z.index,Ht=1;if(K.wireframe===!0){if(At=at.getWireframeAttribute(Z),At===void 0)return;Ht=2}const Wt=Z.drawRange,Rt=Z.attributes.position;let te=Wt.start*Ht,Me=(Wt.start+Wt.count)*Ht;ht!==null&&(te=Math.max(te,ht.start*Ht),Me=Math.min(Me,(ht.start+ht.count)*Ht)),At!==null?(te=Math.max(te,0),Me=Math.min(Me,At.count)):Rt!=null&&(te=Math.max(te,0),Me=Math.min(Me,Rt.count));const _e=Me-te;if(_e<0||_e===1/0)return;se.setup(H,K,Et,Z,At);let $e,ae=mt;if(At!==null&&($e=it.get(At),ae=Vt,ae.setIndex($e)),H.isMesh)K.wireframe===!0?(It.setLineWidth(K.wireframeLinewidth*ue()),ae.setMode(B.LINES)):ae.setMode(B.TRIANGLES);else if(H.isLine){let Ct=K.linewidth;Ct===void 0&&(Ct=1),It.setLineWidth(Ct*ue()),H.isLineSegments?ae.setMode(B.LINES):H.isLineLoop?ae.setMode(B.LINE_LOOP):ae.setMode(B.LINE_STRIP)}else H.isPoints?ae.setMode(B.POINTS):H.isSprite&&ae.setMode(B.TRIANGLES);if(H.isBatchedMesh)if(H._multiDrawInstances!==null)ae.renderMultiDrawInstances(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount,H._multiDrawInstances);else if(Yt.get("WEBGL_multi_draw"))ae.renderMultiDraw(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount);else{const Ct=H._multiDrawStarts,zn=H._multiDrawCounts,ce=H._multiDrawCount,pn=At?it.get(At).bytesPerElement:1,$i=Lt.get(K).currentProgram.getUniforms();for(let en=0;en<ce;en++)$i.setValue(B,"_gl_DrawID",en),ae.render(Ct[en]/pn,zn[en])}else if(H.isInstancedMesh)ae.renderInstances(te,_e,H.count);else if(Z.isInstancedBufferGeometry){const Ct=Z._maxInstanceCount!==void 0?Z._maxInstanceCount:1/0,zn=Math.min(Z.instanceCount,Ct);ae.renderInstances(te,_e,zn)}else ae.render(te,_e)};function Qt(L,k,Z){L.transparent===!0&&L.side===we&&L.forceSinglePass===!1?(L.side=Ke,L.needsUpdate=!0,Lo(L,k,Z),L.side=Si,L.needsUpdate=!0,Lo(L,k,Z),L.side=we):Lo(L,k,Z)}this.compile=function(L,k,Z=null){Z===null&&(Z=L),u=Nt.get(Z),u.init(k),_.push(u),Z.traverseVisible(function(H){H.isLight&&H.layers.test(k.layers)&&(u.pushLight(H),H.castShadow&&u.pushShadow(H))}),L!==Z&&L.traverseVisible(function(H){H.isLight&&H.layers.test(k.layers)&&(u.pushLight(H),H.castShadow&&u.pushShadow(H))}),u.setupLights();const K=new Set;return L.traverse(function(H){if(!(H.isMesh||H.isPoints||H.isLine||H.isSprite))return;const ht=H.material;if(ht)if(Array.isArray(ht))for(let yt=0;yt<ht.length;yt++){const Et=ht[yt];Qt(Et,Z,H),K.add(Et)}else Qt(ht,Z,H),K.add(ht)}),_.pop(),u=null,K},this.compileAsync=function(L,k,Z=null){const K=this.compile(L,k,Z);return new Promise(H=>{function ht(){if(K.forEach(function(yt){Lt.get(yt).currentProgram.isReady()&&K.delete(yt)}),K.size===0){H(L);return}setTimeout(ht,10)}Yt.get("KHR_parallel_shader_compile")!==null?ht():setTimeout(ht,10)})};let Fe=null;function dn(L){Fe&&Fe(L)}function Co(){wi.stop()}function Zl(){wi.start()}const wi=new vd;wi.setAnimationLoop(dn),typeof self<"u"&&wi.setContext(self),this.setAnimationLoop=function(L){Fe=L,$.setAnimationLoop(L),L===null?wi.stop():wi.start()},$.addEventListener("sessionstart",Co),$.addEventListener("sessionend",Zl),this.render=function(L,k){if(k!==void 0&&k.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(E===!0)return;if(L.matrixWorldAutoUpdate===!0&&L.updateMatrixWorld(),k.parent===null&&k.matrixWorldAutoUpdate===!0&&k.updateMatrixWorld(),$.enabled===!0&&$.isPresenting===!0&&($.cameraAutoUpdate===!0&&$.updateCamera(k),k=$.getCamera()),L.isScene===!0&&L.onBeforeRender(M,L,k,T),u=Nt.get(L,_.length),u.init(k),_.push(u),pt.multiplyMatrices(k.projectionMatrix,k.matrixWorldInverse),W.setFromProjectionMatrix(pt),tt=this.localClippingEnabled,et=ct.init(this.clippingPlanes,tt),g=ft.get(L,x.length),g.init(),x.push(g),$.enabled===!0&&$.isPresenting===!0){const ht=M.xr.getDepthSensingMesh();ht!==null&&da(ht,k,-1/0,M.sortObjects)}da(L,k,0,M.sortObjects),g.finish(),M.sortObjects===!0&&g.sort(V,Y),qt=$.enabled===!1||$.isPresenting===!1||$.hasDepthSensing()===!1,qt&&Dt.addToRenderList(g,L),this.info.render.frame++,et===!0&&ct.beginShadows();const Z=u.state.shadowsArray;Mt.render(Z,L,k),et===!0&&ct.endShadows(),this.info.autoReset===!0&&this.info.reset();const K=g.opaque,H=g.transmissive;if(u.setupLights(),k.isArrayCamera){const ht=k.cameras;if(H.length>0)for(let yt=0,Et=ht.length;yt<Et;yt++){const At=ht[yt];jl(K,H,L,At)}qt&&Dt.render(L);for(let yt=0,Et=ht.length;yt<Et;yt++){const At=ht[yt];Kl(g,L,At,At.viewport)}}else H.length>0&&jl(K,H,L,k),qt&&Dt.render(L),Kl(g,L,k);T!==null&&(D.updateMultisampleRenderTarget(T),D.updateRenderTargetMipmap(T)),L.isScene===!0&&L.onAfterRender(M,L,k),se.resetDefaultState(),y=-1,S=null,_.pop(),_.length>0?(u=_[_.length-1],et===!0&&ct.setGlobalState(M.clippingPlanes,u.state.camera)):u=null,x.pop(),x.length>0?g=x[x.length-1]:g=null};function da(L,k,Z,K){if(L.visible===!1)return;if(L.layers.test(k.layers)){if(L.isGroup)Z=L.renderOrder;else if(L.isLOD)L.autoUpdate===!0&&L.update(k);else if(L.isLight)u.pushLight(L),L.castShadow&&u.pushShadow(L);else if(L.isSprite){if(!L.frustumCulled||W.intersectsSprite(L)){K&&Ut.setFromMatrixPosition(L.matrixWorld).applyMatrix4(pt);const yt=q.update(L),Et=L.material;Et.visible&&g.push(L,yt,Et,Z,Ut.z,null)}}else if((L.isMesh||L.isLine||L.isPoints)&&(!L.frustumCulled||W.intersectsObject(L))){const yt=q.update(L),Et=L.material;if(K&&(L.boundingSphere!==void 0?(L.boundingSphere===null&&L.computeBoundingSphere(),Ut.copy(L.boundingSphere.center)):(yt.boundingSphere===null&&yt.computeBoundingSphere(),Ut.copy(yt.boundingSphere.center)),Ut.applyMatrix4(L.matrixWorld).applyMatrix4(pt)),Array.isArray(Et)){const At=yt.groups;for(let Ht=0,Wt=At.length;Ht<Wt;Ht++){const Rt=At[Ht],te=Et[Rt.materialIndex];te&&te.visible&&g.push(L,yt,te,Z,Ut.z,Rt)}}else Et.visible&&g.push(L,yt,Et,Z,Ut.z,null)}}const ht=L.children;for(let yt=0,Et=ht.length;yt<Et;yt++)da(ht[yt],k,Z,K)}function Kl(L,k,Z,K){const H=L.opaque,ht=L.transmissive,yt=L.transparent;u.setupLightsView(Z),et===!0&&ct.setGlobalState(M.clippingPlanes,Z),K&&It.viewport(A.copy(K)),H.length>0&&Po(H,k,Z),ht.length>0&&Po(ht,k,Z),yt.length>0&&Po(yt,k,Z),It.buffers.depth.setTest(!0),It.buffers.depth.setMask(!0),It.buffers.color.setMask(!0),It.setPolygonOffset(!1)}function jl(L,k,Z,K){if((Z.isScene===!0?Z.overrideMaterial:null)!==null)return;u.state.transmissionRenderTarget[K.id]===void 0&&(u.state.transmissionRenderTarget[K.id]=new ni(1,1,{generateMipmaps:!0,type:Yt.has("EXT_color_buffer_half_float")||Yt.has("EXT_color_buffer_float")?bo:ei,minFilter:Bi,samples:4,stencilBuffer:o,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:$t.workingColorSpace}));const ht=u.state.transmissionRenderTarget[K.id],yt=K.viewport||A;ht.setSize(yt.z,yt.w);const Et=M.getRenderTarget();M.setRenderTarget(ht),M.getClearColor(U),I=M.getClearAlpha(),I<1&&M.setClearColor(16777215,.5),M.clear(),qt&&Dt.render(Z);const At=M.toneMapping;M.toneMapping=xi;const Ht=K.viewport;if(K.viewport!==void 0&&(K.viewport=void 0),u.setupLightsView(K),et===!0&&ct.setGlobalState(M.clippingPlanes,K),Po(L,Z,K),D.updateMultisampleRenderTarget(ht),D.updateRenderTargetMipmap(ht),Yt.has("WEBGL_multisampled_render_to_texture")===!1){let Wt=!1;for(let Rt=0,te=k.length;Rt<te;Rt++){const Me=k[Rt],_e=Me.object,$e=Me.geometry,ae=Me.material,Ct=Me.group;if(ae.side===we&&_e.layers.test(K.layers)){const zn=ae.side;ae.side=Ke,ae.needsUpdate=!0,$l(_e,Z,K,$e,ae,Ct),ae.side=zn,ae.needsUpdate=!0,Wt=!0}}Wt===!0&&(D.updateMultisampleRenderTarget(ht),D.updateRenderTargetMipmap(ht))}M.setRenderTarget(Et),M.setClearColor(U,I),Ht!==void 0&&(K.viewport=Ht),M.toneMapping=At}function Po(L,k,Z){const K=k.isScene===!0?k.overrideMaterial:null;for(let H=0,ht=L.length;H<ht;H++){const yt=L[H],Et=yt.object,At=yt.geometry,Ht=K===null?yt.material:K,Wt=yt.group;Et.layers.test(Z.layers)&&$l(Et,k,Z,At,Ht,Wt)}}function $l(L,k,Z,K,H,ht){L.onBeforeRender(M,k,Z,K,H,ht),L.modelViewMatrix.multiplyMatrices(Z.matrixWorldInverse,L.matrixWorld),L.normalMatrix.getNormalMatrix(L.modelViewMatrix),H.onBeforeRender(M,k,Z,K,L,ht),H.transparent===!0&&H.side===we&&H.forceSinglePass===!1?(H.side=Ke,H.needsUpdate=!0,M.renderBufferDirect(Z,k,K,H,L,ht),H.side=Si,H.needsUpdate=!0,M.renderBufferDirect(Z,k,K,H,L,ht),H.side=we):M.renderBufferDirect(Z,k,K,H,L,ht),L.onAfterRender(M,k,Z,K,H,ht)}function Lo(L,k,Z){k.isScene!==!0&&(k=ie);const K=Lt.get(L),H=u.state.lights,ht=u.state.shadowsArray,yt=H.state.version,Et=ut.getParameters(L,H.state,ht,k,Z),At=ut.getProgramCacheKey(Et);let Ht=K.programs;K.environment=L.isMeshStandardMaterial?k.environment:null,K.fog=k.fog,K.envMap=(L.isMeshStandardMaterial?X:C).get(L.envMap||K.environment),K.envMapRotation=K.environment!==null&&L.envMap===null?k.environmentRotation:L.envMapRotation,Ht===void 0&&(L.addEventListener("dispose",Ot),Ht=new Map,K.programs=Ht);let Wt=Ht.get(At);if(Wt!==void 0){if(K.currentProgram===Wt&&K.lightsStateVersion===yt)return Ql(L,Et),Wt}else Et.uniforms=ut.getUniforms(L),L.onBeforeCompile(Et,M),Wt=ut.acquireProgram(Et,At),Ht.set(At,Wt),K.uniforms=Et.uniforms;const Rt=K.uniforms;return(!L.isShaderMaterial&&!L.isRawShaderMaterial||L.clipping===!0)&&(Rt.clippingPlanes=ct.uniform),Ql(L,Et),K.needsLights=dp(L),K.lightsStateVersion=yt,K.needsLights&&(Rt.ambientLightColor.value=H.state.ambient,Rt.lightProbe.value=H.state.probe,Rt.directionalLights.value=H.state.directional,Rt.directionalLightShadows.value=H.state.directionalShadow,Rt.spotLights.value=H.state.spot,Rt.spotLightShadows.value=H.state.spotShadow,Rt.rectAreaLights.value=H.state.rectArea,Rt.ltc_1.value=H.state.rectAreaLTC1,Rt.ltc_2.value=H.state.rectAreaLTC2,Rt.pointLights.value=H.state.point,Rt.pointLightShadows.value=H.state.pointShadow,Rt.hemisphereLights.value=H.state.hemi,Rt.directionalShadowMap.value=H.state.directionalShadowMap,Rt.directionalShadowMatrix.value=H.state.directionalShadowMatrix,Rt.spotShadowMap.value=H.state.spotShadowMap,Rt.spotLightMatrix.value=H.state.spotLightMatrix,Rt.spotLightMap.value=H.state.spotLightMap,Rt.pointShadowMap.value=H.state.pointShadowMap,Rt.pointShadowMatrix.value=H.state.pointShadowMatrix),K.currentProgram=Wt,K.uniformsList=null,Wt}function Jl(L){if(L.uniformsList===null){const k=L.currentProgram.getUniforms();L.uniformsList=Nr.seqWithValue(k.seq,L.uniforms)}return L.uniformsList}function Ql(L,k){const Z=Lt.get(L);Z.outputColorSpace=k.outputColorSpace,Z.batching=k.batching,Z.batchingColor=k.batchingColor,Z.instancing=k.instancing,Z.instancingColor=k.instancingColor,Z.instancingMorph=k.instancingMorph,Z.skinning=k.skinning,Z.morphTargets=k.morphTargets,Z.morphNormals=k.morphNormals,Z.morphColors=k.morphColors,Z.morphTargetsCount=k.morphTargetsCount,Z.numClippingPlanes=k.numClippingPlanes,Z.numIntersection=k.numClipIntersection,Z.vertexAlphas=k.vertexAlphas,Z.vertexTangents=k.vertexTangents,Z.toneMapping=k.toneMapping}function up(L,k,Z,K,H){k.isScene!==!0&&(k=ie),D.resetTextureUnits();const ht=k.fog,yt=K.isMeshStandardMaterial?k.environment:null,Et=T===null?M.outputColorSpace:T.isXRRenderTarget===!0?T.texture.colorSpace:Bs,At=(K.isMeshStandardMaterial?X:C).get(K.envMap||yt),Ht=K.vertexColors===!0&&!!Z.attributes.color&&Z.attributes.color.itemSize===4,Wt=!!Z.attributes.tangent&&(!!K.normalMap||K.anisotropy>0),Rt=!!Z.morphAttributes.position,te=!!Z.morphAttributes.normal,Me=!!Z.morphAttributes.color;let _e=xi;K.toneMapped&&(T===null||T.isXRRenderTarget===!0)&&(_e=M.toneMapping);const $e=Z.morphAttributes.position||Z.morphAttributes.normal||Z.morphAttributes.color,ae=$e!==void 0?$e.length:0,Ct=Lt.get(K),zn=u.state.lights;if(et===!0&&(tt===!0||L!==S)){const rn=L===S&&K.id===y;ct.setState(K,L,rn)}let ce=!1;K.version===Ct.__version?(Ct.needsLights&&Ct.lightsStateVersion!==zn.state.version||Ct.outputColorSpace!==Et||H.isBatchedMesh&&Ct.batching===!1||!H.isBatchedMesh&&Ct.batching===!0||H.isBatchedMesh&&Ct.batchingColor===!0&&H.colorTexture===null||H.isBatchedMesh&&Ct.batchingColor===!1&&H.colorTexture!==null||H.isInstancedMesh&&Ct.instancing===!1||!H.isInstancedMesh&&Ct.instancing===!0||H.isSkinnedMesh&&Ct.skinning===!1||!H.isSkinnedMesh&&Ct.skinning===!0||H.isInstancedMesh&&Ct.instancingColor===!0&&H.instanceColor===null||H.isInstancedMesh&&Ct.instancingColor===!1&&H.instanceColor!==null||H.isInstancedMesh&&Ct.instancingMorph===!0&&H.morphTexture===null||H.isInstancedMesh&&Ct.instancingMorph===!1&&H.morphTexture!==null||Ct.envMap!==At||K.fog===!0&&Ct.fog!==ht||Ct.numClippingPlanes!==void 0&&(Ct.numClippingPlanes!==ct.numPlanes||Ct.numIntersection!==ct.numIntersection)||Ct.vertexAlphas!==Ht||Ct.vertexTangents!==Wt||Ct.morphTargets!==Rt||Ct.morphNormals!==te||Ct.morphColors!==Me||Ct.toneMapping!==_e||Ct.morphTargetsCount!==ae)&&(ce=!0):(ce=!0,Ct.__version=K.version);let pn=Ct.currentProgram;ce===!0&&(pn=Lo(K,k,H));let $i=!1,en=!1,Ws=!1;const xe=pn.getUniforms(),bn=Ct.uniforms;if(It.useProgram(pn.program)&&($i=!0,en=!0,Ws=!0),K.id!==y&&(y=K.id,en=!0),$i||S!==L){It.buffers.depth.getReversed()?(st.copy(L.projectionMatrix),_0(st),x0(st),xe.setValue(B,"projectionMatrix",st)):xe.setValue(B,"projectionMatrix",L.projectionMatrix),xe.setValue(B,"viewMatrix",L.matrixWorldInverse);const oi=xe.map.cameraPosition;oi!==void 0&&oi.setValue(B,Tt.setFromMatrixPosition(L.matrixWorld)),jt.logarithmicDepthBuffer&&xe.setValue(B,"logDepthBufFC",2/(Math.log(L.far+1)/Math.LN2)),(K.isMeshPhongMaterial||K.isMeshToonMaterial||K.isMeshLambertMaterial||K.isMeshBasicMaterial||K.isMeshStandardMaterial||K.isShaderMaterial)&&xe.setValue(B,"isOrthographic",L.isOrthographicCamera===!0),S!==L&&(S=L,en=!0,Ws=!0)}if(H.isSkinnedMesh){xe.setOptional(B,H,"bindMatrix"),xe.setOptional(B,H,"bindMatrixInverse");const rn=H.skeleton;rn&&(rn.boneTexture===null&&rn.computeBoneTexture(),xe.setValue(B,"boneTexture",rn.boneTexture,D))}H.isBatchedMesh&&(xe.setOptional(B,H,"batchingTexture"),xe.setValue(B,"batchingTexture",H._matricesTexture,D),xe.setOptional(B,H,"batchingIdTexture"),xe.setValue(B,"batchingIdTexture",H._indirectTexture,D),xe.setOptional(B,H,"batchingColorTexture"),H._colorsTexture!==null&&xe.setValue(B,"batchingColorTexture",H._colorsTexture,D));const Xs=Z.morphAttributes;if((Xs.position!==void 0||Xs.normal!==void 0||Xs.color!==void 0)&&bt.update(H,Z,pn),(en||Ct.receiveShadow!==H.receiveShadow)&&(Ct.receiveShadow=H.receiveShadow,xe.setValue(B,"receiveShadow",H.receiveShadow)),K.isMeshGouraudMaterial&&K.envMap!==null&&(bn.envMap.value=At,bn.flipEnvMap.value=At.isCubeTexture&&At.isRenderTargetTexture===!1?-1:1),K.isMeshStandardMaterial&&K.envMap===null&&k.environment!==null&&(bn.envMapIntensity.value=k.environmentIntensity),en&&(xe.setValue(B,"toneMappingExposure",M.toneMappingExposure),Ct.needsLights&&fp(bn,Ws),ht&&K.fog===!0&&lt.refreshFogUniforms(bn,ht),lt.refreshMaterialUniforms(bn,K,z,G,u.state.transmissionRenderTarget[L.id]),Nr.upload(B,Jl(Ct),bn,D)),K.isShaderMaterial&&K.uniformsNeedUpdate===!0&&(Nr.upload(B,Jl(Ct),bn,D),K.uniformsNeedUpdate=!1),K.isSpriteMaterial&&xe.setValue(B,"center",H.center),xe.setValue(B,"modelViewMatrix",H.modelViewMatrix),xe.setValue(B,"normalMatrix",H.normalMatrix),xe.setValue(B,"modelMatrix",H.matrixWorld),K.isShaderMaterial||K.isRawShaderMaterial){const rn=K.uniformsGroups;for(let oi=0,ri=rn.length;oi<ri;oi++){const th=rn[oi];O.update(th,pn),O.bind(th,pn)}}return pn}function fp(L,k){L.ambientLightColor.needsUpdate=k,L.lightProbe.needsUpdate=k,L.directionalLights.needsUpdate=k,L.directionalLightShadows.needsUpdate=k,L.pointLights.needsUpdate=k,L.pointLightShadows.needsUpdate=k,L.spotLights.needsUpdate=k,L.spotLightShadows.needsUpdate=k,L.rectAreaLights.needsUpdate=k,L.hemisphereLights.needsUpdate=k}function dp(L){return L.isMeshLambertMaterial||L.isMeshToonMaterial||L.isMeshPhongMaterial||L.isMeshStandardMaterial||L.isShadowMaterial||L.isShaderMaterial&&L.lights===!0}this.getActiveCubeFace=function(){return b},this.getActiveMipmapLevel=function(){return w},this.getRenderTarget=function(){return T},this.setRenderTargetTextures=function(L,k,Z){Lt.get(L.texture).__webglTexture=k,Lt.get(L.depthTexture).__webglTexture=Z;const K=Lt.get(L);K.__hasExternalTextures=!0,K.__autoAllocateDepthBuffer=Z===void 0,K.__autoAllocateDepthBuffer||Yt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),K.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(L,k){const Z=Lt.get(L);Z.__webglFramebuffer=k,Z.__useDefaultFramebuffer=k===void 0},this.setRenderTarget=function(L,k=0,Z=0){T=L,b=k,w=Z;let K=!0,H=null,ht=!1,yt=!1;if(L){const At=Lt.get(L);if(At.__useDefaultFramebuffer!==void 0)It.bindFramebuffer(B.FRAMEBUFFER,null),K=!1;else if(At.__webglFramebuffer===void 0)D.setupRenderTarget(L);else if(At.__hasExternalTextures)D.rebindTextures(L,Lt.get(L.texture).__webglTexture,Lt.get(L.depthTexture).__webglTexture);else if(L.depthBuffer){const Rt=L.depthTexture;if(At.__boundDepthTexture!==Rt){if(Rt!==null&&Lt.has(Rt)&&(L.width!==Rt.image.width||L.height!==Rt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");D.setupDepthRenderbuffer(L)}}const Ht=L.texture;(Ht.isData3DTexture||Ht.isDataArrayTexture||Ht.isCompressedArrayTexture)&&(yt=!0);const Wt=Lt.get(L).__webglFramebuffer;L.isWebGLCubeRenderTarget?(Array.isArray(Wt[k])?H=Wt[k][Z]:H=Wt[k],ht=!0):L.samples>0&&D.useMultisampledRTT(L)===!1?H=Lt.get(L).__webglMultisampledFramebuffer:Array.isArray(Wt)?H=Wt[Z]:H=Wt,A.copy(L.viewport),R.copy(L.scissor),P=L.scissorTest}else A.copy(j).multiplyScalar(z).floor(),R.copy(ot).multiplyScalar(z).floor(),P=wt;if(It.bindFramebuffer(B.FRAMEBUFFER,H)&&K&&It.drawBuffers(L,H),It.viewport(A),It.scissor(R),It.setScissorTest(P),ht){const At=Lt.get(L.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_CUBE_MAP_POSITIVE_X+k,At.__webglTexture,Z)}else if(yt){const At=Lt.get(L.texture),Ht=k||0;B.framebufferTextureLayer(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,At.__webglTexture,Z||0,Ht)}y=-1},this.readRenderTargetPixels=function(L,k,Z,K,H,ht,yt){if(!(L&&L.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Et=Lt.get(L).__webglFramebuffer;if(L.isWebGLCubeRenderTarget&&yt!==void 0&&(Et=Et[yt]),Et){It.bindFramebuffer(B.FRAMEBUFFER,Et);try{const At=L.texture,Ht=At.format,Wt=At.type;if(!jt.textureFormatReadable(Ht)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!jt.textureTypeReadable(Wt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}k>=0&&k<=L.width-K&&Z>=0&&Z<=L.height-H&&B.readPixels(k,Z,K,H,zt.convert(Ht),zt.convert(Wt),ht)}finally{const At=T!==null?Lt.get(T).__webglFramebuffer:null;It.bindFramebuffer(B.FRAMEBUFFER,At)}}},this.readRenderTargetPixelsAsync=async function(L,k,Z,K,H,ht,yt){if(!(L&&L.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Et=Lt.get(L).__webglFramebuffer;if(L.isWebGLCubeRenderTarget&&yt!==void 0&&(Et=Et[yt]),Et){const At=L.texture,Ht=At.format,Wt=At.type;if(!jt.textureFormatReadable(Ht))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!jt.textureTypeReadable(Wt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(k>=0&&k<=L.width-K&&Z>=0&&Z<=L.height-H){It.bindFramebuffer(B.FRAMEBUFFER,Et);const Rt=B.createBuffer();B.bindBuffer(B.PIXEL_PACK_BUFFER,Rt),B.bufferData(B.PIXEL_PACK_BUFFER,ht.byteLength,B.STREAM_READ),B.readPixels(k,Z,K,H,zt.convert(Ht),zt.convert(Wt),0);const te=T!==null?Lt.get(T).__webglFramebuffer:null;It.bindFramebuffer(B.FRAMEBUFFER,te);const Me=B.fenceSync(B.SYNC_GPU_COMMANDS_COMPLETE,0);return B.flush(),await M0(B,Me,4),B.bindBuffer(B.PIXEL_PACK_BUFFER,Rt),B.getBufferSubData(B.PIXEL_PACK_BUFFER,0,ht),B.deleteBuffer(Rt),B.deleteSync(Me),ht}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(L,k=null,Z=0){L.isTexture!==!0&&(ro("WebGLRenderer: copyFramebufferToTexture function signature has changed."),k=arguments[0]||null,L=arguments[1]);const K=Math.pow(2,-Z),H=Math.floor(L.image.width*K),ht=Math.floor(L.image.height*K),yt=k!==null?k.x:0,Et=k!==null?k.y:0;D.setTexture2D(L,0),B.copyTexSubImage2D(B.TEXTURE_2D,Z,0,0,yt,Et,H,ht),It.unbindTexture()},this.copyTextureToTexture=function(L,k,Z=null,K=null,H=0){L.isTexture!==!0&&(ro("WebGLRenderer: copyTextureToTexture function signature has changed."),K=arguments[0]||null,L=arguments[1],k=arguments[2],H=arguments[3]||0,Z=null);let ht,yt,Et,At,Ht,Wt,Rt,te,Me;const _e=L.isCompressedTexture?L.mipmaps[H]:L.image;Z!==null?(ht=Z.max.x-Z.min.x,yt=Z.max.y-Z.min.y,Et=Z.isBox3?Z.max.z-Z.min.z:1,At=Z.min.x,Ht=Z.min.y,Wt=Z.isBox3?Z.min.z:0):(ht=_e.width,yt=_e.height,Et=_e.depth||1,At=0,Ht=0,Wt=0),K!==null?(Rt=K.x,te=K.y,Me=K.z):(Rt=0,te=0,Me=0);const $e=zt.convert(k.format),ae=zt.convert(k.type);let Ct;k.isData3DTexture?(D.setTexture3D(k,0),Ct=B.TEXTURE_3D):k.isDataArrayTexture||k.isCompressedArrayTexture?(D.setTexture2DArray(k,0),Ct=B.TEXTURE_2D_ARRAY):(D.setTexture2D(k,0),Ct=B.TEXTURE_2D),B.pixelStorei(B.UNPACK_FLIP_Y_WEBGL,k.flipY),B.pixelStorei(B.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),B.pixelStorei(B.UNPACK_ALIGNMENT,k.unpackAlignment);const zn=B.getParameter(B.UNPACK_ROW_LENGTH),ce=B.getParameter(B.UNPACK_IMAGE_HEIGHT),pn=B.getParameter(B.UNPACK_SKIP_PIXELS),$i=B.getParameter(B.UNPACK_SKIP_ROWS),en=B.getParameter(B.UNPACK_SKIP_IMAGES);B.pixelStorei(B.UNPACK_ROW_LENGTH,_e.width),B.pixelStorei(B.UNPACK_IMAGE_HEIGHT,_e.height),B.pixelStorei(B.UNPACK_SKIP_PIXELS,At),B.pixelStorei(B.UNPACK_SKIP_ROWS,Ht),B.pixelStorei(B.UNPACK_SKIP_IMAGES,Wt);const Ws=L.isDataArrayTexture||L.isData3DTexture,xe=k.isDataArrayTexture||k.isData3DTexture;if(L.isRenderTargetTexture||L.isDepthTexture){const bn=Lt.get(L),Xs=Lt.get(k),rn=Lt.get(bn.__renderTarget),oi=Lt.get(Xs.__renderTarget);It.bindFramebuffer(B.READ_FRAMEBUFFER,rn.__webglFramebuffer),It.bindFramebuffer(B.DRAW_FRAMEBUFFER,oi.__webglFramebuffer);for(let ri=0;ri<Et;ri++)Ws&&B.framebufferTextureLayer(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,Lt.get(L).__webglTexture,H,Wt+ri),L.isDepthTexture?(xe&&B.framebufferTextureLayer(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,Lt.get(k).__webglTexture,H,Me+ri),B.blitFramebuffer(At,Ht,ht,yt,Rt,te,ht,yt,B.DEPTH_BUFFER_BIT,B.NEAREST)):xe?B.copyTexSubImage3D(Ct,H,Rt,te,Me+ri,At,Ht,ht,yt):B.copyTexSubImage2D(Ct,H,Rt,te,Me+ri,At,Ht,ht,yt);It.bindFramebuffer(B.READ_FRAMEBUFFER,null),It.bindFramebuffer(B.DRAW_FRAMEBUFFER,null)}else xe?L.isDataTexture||L.isData3DTexture?B.texSubImage3D(Ct,H,Rt,te,Me,ht,yt,Et,$e,ae,_e.data):k.isCompressedArrayTexture?B.compressedTexSubImage3D(Ct,H,Rt,te,Me,ht,yt,Et,$e,_e.data):B.texSubImage3D(Ct,H,Rt,te,Me,ht,yt,Et,$e,ae,_e):L.isDataTexture?B.texSubImage2D(B.TEXTURE_2D,H,Rt,te,ht,yt,$e,ae,_e.data):L.isCompressedTexture?B.compressedTexSubImage2D(B.TEXTURE_2D,H,Rt,te,_e.width,_e.height,$e,_e.data):B.texSubImage2D(B.TEXTURE_2D,H,Rt,te,ht,yt,$e,ae,_e);B.pixelStorei(B.UNPACK_ROW_LENGTH,zn),B.pixelStorei(B.UNPACK_IMAGE_HEIGHT,ce),B.pixelStorei(B.UNPACK_SKIP_PIXELS,pn),B.pixelStorei(B.UNPACK_SKIP_ROWS,$i),B.pixelStorei(B.UNPACK_SKIP_IMAGES,en),H===0&&k.generateMipmaps&&B.generateMipmap(Ct),It.unbindTexture()},this.copyTextureToTexture3D=function(L,k,Z=null,K=null,H=0){return L.isTexture!==!0&&(ro("WebGLRenderer: copyTextureToTexture3D function signature has changed."),Z=arguments[0]||null,K=arguments[1]||null,L=arguments[2],k=arguments[3],H=arguments[4]||0),ro('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(L,k,Z,K,H)},this.initRenderTarget=function(L){Lt.get(L).__webglFramebuffer===void 0&&D.setupRenderTarget(L)},this.initTexture=function(L){L.isCubeTexture?D.setTextureCube(L,0):L.isData3DTexture?D.setTexture3D(L,0):L.isDataArrayTexture||L.isCompressedArrayTexture?D.setTexture2DArray(L,0):D.setTexture2D(L,0),It.unbindTexture()},this.resetState=function(){b=0,w=0,T=null,It.reset(),se.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return jn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=$t._getDrawingBufferColorSpace(t),e.unpackColorSpace=$t._getUnpackColorSpace()}}class Fl{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new Q(t),this.near=e,this.far=n}clone(){return new Fl(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Hr extends Ae{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Fn,this.environmentIntensity=1,this.environmentRotation=new Fn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class PM extends je{constructor(t=null,e=1,n=1,s,o,r,a,c,l=ze,h=ze,f,d){super(null,r,a,c,l,h,s,o,f,d),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Qh extends Pt{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const fs=new ne,tu=new ne,Qo=[],eu=new Zi,LM=new ne,js=new dt,$s=new Ki;class Ni extends dt{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Qh(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,LM)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Zi),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,fs),eu.copy(t.boundingBox).applyMatrix4(fs),this.boundingBox.union(eu)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Ki),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,fs),$s.copy(t.boundingSphere).applyMatrix4(fs),this.boundingSphere.union($s)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,o=n.length+1,r=t*o+1;for(let a=0;a<n.length;a++)n[a]=s[r+a]}raycast(t,e){const n=this.matrixWorld,s=this.count;if(js.geometry=this.geometry,js.material=this.material,js.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),$s.copy(this.boundingSphere),$s.applyMatrix4(n),t.ray.intersectsSphere($s)!==!1))for(let o=0;o<s;o++){this.getMatrixAt(o,fs),tu.multiplyMatrices(n,fs),js.matrixWorld=tu,js.raycast(t,Qo);for(let r=0,a=Qo.length;r<a;r++){const c=Qo[r];c.instanceId=o,c.object=this,e.push(c)}Qo.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new Qh(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new PM(new Float32Array(s*this.count),s,this.count,Rl,Dn));const o=this.morphTexture.source.data.data;let r=0;for(let l=0;l<n.length;l++)r+=n[l];const a=this.geometry.morphTargetsRelative?1:1-r,c=s*t;o[c]=a,o.set(n,c+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class ea extends ji{static get type(){return"LineBasicMaterial"}constructor(t){super(),this.isLineBasicMaterial=!0,this.color=new Q(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const Gr=new F,Vr=new F,nu=new ne,Js=new Il,tr=new Ki,Ga=new F,iu=new F;class DM extends Ae{constructor(t=new Gt,e=new ea){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let s=1,o=e.count;s<o;s++)Gr.fromBufferAttribute(e,s-1),Vr.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=Gr.distanceTo(Vr);t.setAttribute("lineDistance",new kt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,o=t.params.Line.threshold,r=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),tr.copy(n.boundingSphere),tr.applyMatrix4(s),tr.radius+=o,t.ray.intersectsSphere(tr)===!1)return;nu.copy(s).invert(),Js.copy(t.ray).applyMatrix4(nu);const a=o/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){const p=Math.max(0,r.start),m=Math.min(h.count,r.start+r.count);for(let v=p,g=m-1;v<g;v+=l){const u=h.getX(v),x=h.getX(v+1),_=er(this,t,Js,c,u,x);_&&e.push(_)}if(this.isLineLoop){const v=h.getX(m-1),g=h.getX(p),u=er(this,t,Js,c,v,g);u&&e.push(u)}}else{const p=Math.max(0,r.start),m=Math.min(d.count,r.start+r.count);for(let v=p,g=m-1;v<g;v+=l){const u=er(this,t,Js,c,v,v+1);u&&e.push(u)}if(this.isLineLoop){const v=er(this,t,Js,c,m-1,p);v&&e.push(v)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,r=s.length;o<r;o++){const a=s[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=o}}}}}function er(i,t,e,n,s,o){const r=i.geometry.attributes.position;if(Gr.fromBufferAttribute(r,s),Vr.fromBufferAttribute(r,o),e.distanceSqToSegment(Gr,Vr,Ga,iu)>n)return;Ga.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(Ga);if(!(c<t.near||c>t.far))return{distance:c,point:iu.clone().applyMatrix4(i.matrixWorld),index:s,face:null,faceIndex:null,barycoord:null,object:i}}const su=new F,ou=new F;class zl extends DM{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let s=0,o=e.count;s<o;s+=2)su.fromBufferAttribute(e,s),ou.fromBufferAttribute(e,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+su.distanceTo(ou);t.setAttribute("lineDistance",new kt(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class na extends ji{static get type(){return"PointsMaterial"}constructor(t){super(),this.isPointsMaterial=!0,this.color=new Q(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const ru=new ne,cl=new Il,nr=new Ki,ir=new F;class ii extends Ae{constructor(t=new Gt,e=new na){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,o=t.params.Points.threshold,r=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),nr.copy(n.boundingSphere),nr.applyMatrix4(s),nr.radius+=o,t.ray.intersectsSphere(nr)===!1)return;ru.copy(s).invert(),cl.copy(t.ray).applyMatrix4(ru);const a=o/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=n.index,f=n.attributes.position;if(l!==null){const d=Math.max(0,r.start),p=Math.min(l.count,r.start+r.count);for(let m=d,v=p;m<v;m++){const g=l.getX(m);ir.fromBufferAttribute(f,g),au(ir,g,c,s,t,e,this)}}else{const d=Math.max(0,r.start),p=Math.min(f.count,r.start+r.count);for(let m=d,v=p;m<v;m++)ir.fromBufferAttribute(f,m),au(ir,m,c,s,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,r=s.length;o<r;o++){const a=s[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=o}}}}}function au(i,t,e,n,s,o,r){const a=cl.distanceSqToPoint(i);if(a<e){const c=new F;cl.closestPointToPoint(i,c),c.applyMatrix4(n);const l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;o.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:t,face:null,faceIndex:null,barycoord:null,object:r})}}class ia extends Gt{constructor(t=1,e=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:s},e=Math.max(3,e);const o=[],r=[],a=[],c=[],l=new F,h=new Kt;r.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let f=0,d=3;f<=e;f++,d+=3){const p=n+f/e*s;l.x=t*Math.cos(p),l.y=t*Math.sin(p),r.push(l.x,l.y,l.z),a.push(0,0,1),h.x=(r[d]/t+1)/2,h.y=(r[d+1]/t+1)/2,c.push(h.x,h.y)}for(let f=1;f<=e;f++)o.push(f,f+1,0);this.setIndex(o),this.setAttribute("position",new kt(r,3)),this.setAttribute("normal",new kt(a,3)),this.setAttribute("uv",new kt(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ia(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class He extends Gt{constructor(t=1,e=1,n=1,s=32,o=1,r=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:o,openEnded:r,thetaStart:a,thetaLength:c};const l=this;s=Math.floor(s),o=Math.floor(o);const h=[],f=[],d=[],p=[];let m=0;const v=[],g=n/2;let u=0;x(),r===!1&&(t>0&&_(!0),e>0&&_(!1)),this.setIndex(h),this.setAttribute("position",new kt(f,3)),this.setAttribute("normal",new kt(d,3)),this.setAttribute("uv",new kt(p,2));function x(){const M=new F,E=new F;let b=0;const w=(e-t)/n;for(let T=0;T<=o;T++){const y=[],S=T/o,A=S*(e-t)+t;for(let R=0;R<=s;R++){const P=R/s,U=P*c+a,I=Math.sin(U),N=Math.cos(U);E.x=A*I,E.y=-S*n+g,E.z=A*N,f.push(E.x,E.y,E.z),M.set(I,w,N).normalize(),d.push(M.x,M.y,M.z),p.push(P,1-S),y.push(m++)}v.push(y)}for(let T=0;T<s;T++)for(let y=0;y<o;y++){const S=v[y][T],A=v[y+1][T],R=v[y+1][T+1],P=v[y][T+1];(t>0||y!==0)&&(h.push(S,A,P),b+=3),(e>0||y!==o-1)&&(h.push(A,R,P),b+=3)}l.addGroup(u,b,0),u+=b}function _(M){const E=m,b=new Kt,w=new F;let T=0;const y=M===!0?t:e,S=M===!0?1:-1;for(let R=1;R<=s;R++)f.push(0,g*S,0),d.push(0,S,0),p.push(.5,.5),m++;const A=m;for(let R=0;R<=s;R++){const U=R/s*c+a,I=Math.cos(U),N=Math.sin(U);w.x=y*N,w.y=g*S,w.z=y*I,f.push(w.x,w.y,w.z),d.push(0,S,0),b.x=I*.5+.5,b.y=N*.5*S+.5,p.push(b.x,b.y),m++}for(let R=0;R<s;R++){const P=E+R,U=A+R;M===!0?h.push(U,U+1,P):h.push(U+1,U,P),T+=3}l.addGroup(u,T,M===!0?1:2),u+=T}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new He(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Kn extends He{constructor(t=1,e=1,n=32,s=1,o=!1,r=0,a=Math.PI*2){super(0,t,e,n,s,o,r,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:o,thetaStart:r,thetaLength:a}}static fromJSON(t){return new Kn(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class sa extends Gt{constructor(t=[],e=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:s};const o=[],r=[];a(s),l(n),h(),this.setAttribute("position",new kt(o,3)),this.setAttribute("normal",new kt(o.slice(),3)),this.setAttribute("uv",new kt(r,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(x){const _=new F,M=new F,E=new F;for(let b=0;b<e.length;b+=3)p(e[b+0],_),p(e[b+1],M),p(e[b+2],E),c(_,M,E,x)}function c(x,_,M,E){const b=E+1,w=[];for(let T=0;T<=b;T++){w[T]=[];const y=x.clone().lerp(M,T/b),S=_.clone().lerp(M,T/b),A=b-T;for(let R=0;R<=A;R++)R===0&&T===b?w[T][R]=y:w[T][R]=y.clone().lerp(S,R/A)}for(let T=0;T<b;T++)for(let y=0;y<2*(b-T)-1;y++){const S=Math.floor(y/2);y%2===0?(d(w[T][S+1]),d(w[T+1][S]),d(w[T][S])):(d(w[T][S+1]),d(w[T+1][S+1]),d(w[T+1][S]))}}function l(x){const _=new F;for(let M=0;M<o.length;M+=3)_.x=o[M+0],_.y=o[M+1],_.z=o[M+2],_.normalize().multiplyScalar(x),o[M+0]=_.x,o[M+1]=_.y,o[M+2]=_.z}function h(){const x=new F;for(let _=0;_<o.length;_+=3){x.x=o[_+0],x.y=o[_+1],x.z=o[_+2];const M=g(x)/2/Math.PI+.5,E=u(x)/Math.PI+.5;r.push(M,1-E)}m(),f()}function f(){for(let x=0;x<r.length;x+=6){const _=r[x+0],M=r[x+2],E=r[x+4],b=Math.max(_,M,E),w=Math.min(_,M,E);b>.9&&w<.1&&(_<.2&&(r[x+0]+=1),M<.2&&(r[x+2]+=1),E<.2&&(r[x+4]+=1))}}function d(x){o.push(x.x,x.y,x.z)}function p(x,_){const M=x*3;_.x=t[M+0],_.y=t[M+1],_.z=t[M+2]}function m(){const x=new F,_=new F,M=new F,E=new F,b=new Kt,w=new Kt,T=new Kt;for(let y=0,S=0;y<o.length;y+=9,S+=6){x.set(o[y+0],o[y+1],o[y+2]),_.set(o[y+3],o[y+4],o[y+5]),M.set(o[y+6],o[y+7],o[y+8]),b.set(r[S+0],r[S+1]),w.set(r[S+2],r[S+3]),T.set(r[S+4],r[S+5]),E.copy(x).add(_).add(M).divideScalar(3);const A=g(E);v(b,S+0,x,A),v(w,S+2,_,A),v(T,S+4,M,A)}}function v(x,_,M,E){E<0&&x.x===1&&(r[_]=x.x-1),M.x===0&&M.z===0&&(r[_]=E/2/Math.PI+.5)}function g(x){return Math.atan2(x.z,-x.x)}function u(x){return Math.atan2(-x.y,Math.sqrt(x.x*x.x+x.z*x.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new sa(t.vertices,t.indices,t.radius,t.details)}}class Wr extends sa{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,s=1/n,o=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-s,-n,0,-s,n,0,s,-n,0,s,n,-s,-n,0,-s,n,0,s,-n,0,s,n,0,-n,0,-s,n,0,-s,-n,0,s,n,0,s],r=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(o,r,t,e),this.type="DodecahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Wr(t.radius,t.detail)}}class Un extends sa{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],o=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,o,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Un(t.radius,t.detail)}}class oa extends Gt{constructor(t=1,e=32,n=16,s=0,o=Math.PI*2,r=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:o,thetaStart:r,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const c=Math.min(r+a,Math.PI);let l=0;const h=[],f=new F,d=new F,p=[],m=[],v=[],g=[];for(let u=0;u<=n;u++){const x=[],_=u/n;let M=0;u===0&&r===0?M=.5/e:u===n&&c===Math.PI&&(M=-.5/e);for(let E=0;E<=e;E++){const b=E/e;f.x=-t*Math.cos(s+b*o)*Math.sin(r+_*a),f.y=t*Math.cos(r+_*a),f.z=t*Math.sin(s+b*o)*Math.sin(r+_*a),m.push(f.x,f.y,f.z),d.copy(f).normalize(),v.push(d.x,d.y,d.z),g.push(b+M,1-_),x.push(l++)}h.push(x)}for(let u=0;u<n;u++)for(let x=0;x<e;x++){const _=h[u][x+1],M=h[u][x],E=h[u+1][x],b=h[u+1][x+1];(u!==0||r>0)&&p.push(_,M,b),(u!==n-1||c<Math.PI)&&p.push(M,E,b)}this.setIndex(p),this.setAttribute("position",new kt(m,3)),this.setAttribute("normal",new kt(v,3)),this.setAttribute("uv",new kt(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new oa(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Ue extends ji{static get type(){return"MeshLambertMaterial"}constructor(t){super(),this.isMeshLambertMaterial=!0,this.color=new Q(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Q(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=od,this.normalScale=new Kt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Fn,this.combine=bl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class ra extends Ae{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Q(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class IM extends ra{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Ae.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Q(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const Va=new ne,cu=new F,lu=new F;class wd{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Kt(512,512),this.map=null,this.mapPass=null,this.matrix=new ne,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ul,this._frameExtents=new Kt(1,1),this._viewportCount=1,this._viewports=[new Jt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;cu.setFromMatrixPosition(t.matrixWorld),e.position.copy(cu),lu.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(lu),e.updateMatrixWorld(),Va.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Va),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Va)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const hu=new ne,Qs=new F,Wa=new F;class UM extends wd{constructor(){super(new Je(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Kt(4,2),this._viewportCount=6,this._viewports=[new Jt(2,1,1,1),new Jt(0,1,1,1),new Jt(3,1,1,1),new Jt(1,1,1,1),new Jt(3,0,1,1),new Jt(1,0,1,1)],this._cubeDirections=[new F(1,0,0),new F(-1,0,0),new F(0,0,1),new F(0,0,-1),new F(0,1,0),new F(0,-1,0)],this._cubeUps=[new F(0,1,0),new F(0,1,0),new F(0,1,0),new F(0,1,0),new F(0,0,1),new F(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,s=this.matrix,o=t.distance||n.far;o!==n.far&&(n.far=o,n.updateProjectionMatrix()),Qs.setFromMatrixPosition(t.matrixWorld),n.position.copy(Qs),Wa.copy(n.position),Wa.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(Wa),n.updateMatrixWorld(),s.makeTranslation(-Qs.x,-Qs.y,-Qs.z),hu.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(hu)}}class yi extends ra{constructor(t,e,n=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new UM}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class NM extends wd{constructor(){super(new Qr(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class FM extends ra{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ae.DEFAULT_UP),this.updateMatrix(),this.target=new Ae,this.shadow=new NM}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class zM extends ra{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:wl}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=wl);class OM{constructor(){this.keys=new Set,this.confirmFlag=!1,window.addEventListener("keydown",t=>{t.repeat||(this.keys.add(t.code),(t.code==="Space"||t.code==="Enter"||t.code==="NumpadEnter")&&(this.confirmFlag=!0),["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(t.code)&&t.preventDefault())}),window.addEventListener("keyup",t=>this.keys.delete(t.code)),window.addEventListener("blur",()=>this.keys.clear()),window.addEventListener("pointerdown",()=>{this.confirmFlag=!0})}takeConfirm(){return this.confirmFlag?(this.confirmFlag=!1,!0):!1}down(t){return this.keys.has(t)}get steer(){let t=0;return(this.down("KeyA")||this.down("ArrowLeft"))&&(t+=1),(this.down("KeyD")||this.down("ArrowRight"))&&(t-=1),t}get pitch(){let t=0;return(this.down("KeyW")||this.down("ArrowUp"))&&(t+=1),(this.down("KeyS")||this.down("ArrowDown"))&&(t-=1),t}get jumpHeld(){return this.down("Space")}get airBrakeSide(){return this.down("KeyQ")?-1:this.down("KeyE")?1:0}get tuckHeld(){return this.down("ShiftLeft")||this.down("ShiftRight")}get resetHeld(){return this.down("KeyR")}get brake(){let t=0;return this.down("KeyQ")&&(t+=1),this.down("KeyE")&&(t-=1),t}}const uu=`
varying vec2 vUv;
void main() {
  vUv = position.xy * 0.5 + 0.5;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`,BM=`
uniform sampler2D tDiffuse;
uniform vec2 uSunUV;    // солнце в координатах экрана
uniform float uSunAmt;  // 0 — солнце вне кадра/за спиной
uniform float uSpeed;   // 0..1 — сила радиального смаза
varying vec2 vUv;

float luma(vec3 c) { return dot(c, vec3(0.3, 0.6, 0.1)); }

void main() {
  vec2 rad = vUv - vec2(0.5);
  float r2 = dot(rad, rad);

  // --- ХРОМАТИЧЕСКАЯ АБЕРРАЦИЯ. Каналы расходятся ТОЛЬКО к краям кадра
  // (в центре смещение нулевое) — так ведёт себя дешёвая оптика, и так эффект
  // не мешает смотреть туда, куда едешь. На скорости расходятся сильнее.
  // 0.006 подобрано по РАСХОЖДЕНИЮ КАНАЛОВ В ПИКСЕЛЯХ: при 0.022 края
  // расходились на четыре пикселя буфера (двенадцать экранных) — это уже не
  // оптика, а брак печати. Здесь предел около полутора пикселей буфера.
  float ca = (0.9 + uSpeed * 1.6) * r2 * 0.006;
  vec3 base;
  base.r = texture2D(tDiffuse, vUv + rad * ca).r;
  base.g = texture2D(tDiffuse, vUv).g;
  base.b = texture2D(tDiffuse, vUv - rad * ca).b;

  // --- РАДИАЛЬНЫЙ СМАЗ ОТ ЦЕНТРА. Скорость в игре не имеет потолка, но на
  // экране 250 км/ч почти неотличимы от 120: кадр одинаково резкий. Смаз
  // растёт от центра к краям — в середине картинка остаётся читаемой.
  if (uSpeed > 0.01) {
    vec2 d = vUv - vec2(0.5);
    vec3 acc = base;
    for (int i = 1; i <= 6; i++) {
      float t = float(i) / 6.0;
      acc += texture2D(tDiffuse, vUv - d * t * 0.055 * uSpeed).rgb;
    }
    // На полной силе 0.095 кадр на 176 км/ч превращался в кашу: препятствие
    // впереди уже не прочитать, а именно на такой скорости оно и опасно.
    base = mix(base, acc / 7.0, min(1.0, uSpeed * 0.75));
  }

  // --- БЛУМ. Квантование в 15 бит съедает мягкое свечение, а на закате оно
  // и есть половина картинки. Берём яркое сверх порога восемью широкими
  // отсчётами — на таком разрешении этого достаточно для ореола.
  // Порог 0.72 — это 97-й процентиль замеренной яркости кадра: при 0.55 за
  // него уходила пятая часть экрана и блум просто задирал весь снег.
  vec3 bl = vec3(0.0);
  for (int i = 0; i < 8; i++) {
    float a = float(i) * 0.7854;
    vec2 o = vec2(cos(a), sin(a)) * 0.012;
    bl += max(texture2D(tDiffuse, vUv + o).rgb - 0.72, 0.0);
  }
  base += bl * 0.34;

  // --- СОЛНЕЧНЫЕ ЛУЧИ. Идём отсчётами К СОЛНЦУ и копим яркое: там, где путь
  // перекрыт гребнем или деревом, копить нечего — оттого лучи и рисуются
  // сами, без всякой геометрии.
  if (uSunAmt > 0.001) {
    // марш ограничен по длине: солнце часто выше кадра, и без ограничения
    // отсчёты сразу улетают за край, где текстура зажимается в кромку —
    // получалась ровная засветка вместо лучей.
    vec2 toSun = uSunUV - vUv;
    float dist = max(length(toSun), 1e-4);
    vec2 dir = toSun / dist * min(dist, 0.42) / 14.0;
    vec2 uv = vUv;
    float w = 1.0;
    vec3 rays = vec3(0.0);
    for (int i = 0; i < 14; i++) {
      uv += dir;
      vec3 s = texture2D(tDiffuse, uv).rgb;
      rays += max(s - 0.72, 0.0) * w;
      w *= 0.86;
    }
    // ближе к солнцу — плотнее; на краю кадра лучи не должны забивать мир
    float fall = 1.0 - min(1.0, length(vUv - uSunUV) * 0.9);
    base += rays * (0.11 * uSunAmt * (0.35 + 0.65 * fall));
  }

  // --- ВИНЬЕТКА. Кладётся ПОСЛЕДНЕЙ и до квантования: если затемнять уже
  // квантованный кадр, по углам вылезают ступеньки. Буфер линейный, поэтому
  // на экране (после гаммы) падение мягче, чем выглядит в числах.
  base *= mix(1.0, 1.0 - r2 * 1.15, 0.55);

  gl_FragColor = vec4(base, 1.0);
}
`,kM=`
uniform sampler2D tDiffuse;
uniform vec2 uRes;
varying vec2 vUv;

float bayer2(vec2 a) {
  a = floor(a);
  return fract(a.x / 2.0 + a.y * a.y * 0.75);
}

void main() {
  vec2 pix = floor(vUv * uRes);
  vec3 c = texture2D(tDiffuse, vUv).rgb;
  c = pow(max(c, 0.0), vec3(0.4545));
  float d = (bayer2(0.5 * pix) * 0.25 + bayer2(pix)) - 0.5;
  c += d * (1.0 / 24.0);
  c = floor(c * 31.0 + 0.5) / 31.0;
  gl_FragColor = vec4(c, 1.0);
}
`;class HM{constructor(t,e=3){this.renderer=t,this.pixelScale=e,this.fxScene=new Hr,this.postScene=new Hr,this.postCam=new Qr(-1,1,1,-1,0,1),this.lowWidth=1,this.lowHeight=1,this.rt=new ni(1,1,{minFilter:ze,magFilter:ze,depthBuffer:!0}),this.rtFx=new ni(1,1,{minFilter:ze,magFilter:ze,depthBuffer:!1}),this.fxMat=new me({vertexShader:uu,fragmentShader:BM,uniforms:{tDiffuse:{value:this.rt.texture},uSunUV:{value:new Kt(.5,.8)},uSunAmt:{value:0},uSpeed:{value:0}},depthTest:!1,depthWrite:!1}),this.material=new me({vertexShader:uu,fragmentShader:kM,uniforms:{tDiffuse:{value:this.rtFx.texture},uRes:{value:new Kt(1,1)}},depthTest:!1,depthWrite:!1});const n=new Gt;n.setAttribute("position",new Pt(new Float32Array([-1,-1,0,3,-1,0,-1,3,0]),3)),this.postScene.add(new dt(n,this.material)),this.fxScene.add(new dt(n,this.fxMat)),this.setSize(window.innerWidth,window.innerHeight)}setSize(t,e){this.renderer.setSize(t,e);const n=Math.max(1,Math.floor(t/this.pixelScale)),s=Math.max(1,Math.floor(e/this.pixelScale));this.lowWidth=n,this.lowHeight=s,this.rt.setSize(n,s),this.rtFx.setSize(n,s),this.material.uniforms.uRes.value.set(n,s)}setEffects(t,e,n,s){this.fxMat.uniforms.uSunUV.value.set(t,e),this.fxMat.uniforms.uSunAmt.value=n,this.fxMat.uniforms.uSpeed.value=s}render(t,e,n,s){this.renderer.setRenderTarget(this.rt),this.renderer.render(t,e),this.renderer.setRenderTarget(this.rtFx),this.renderer.render(this.fxScene,this.postCam),n&&s&&(this.renderer.autoClear=!1,this.renderer.render(n,s),this.renderer.autoClear=!0),this.renderer.setRenderTarget(null),this.renderer.render(this.postScene,this.postCam)}}const Ne={skyZenith:new Q(4934302),skyHorizon:new Q(15782588),sun:new Q(16767392),fog:new Q(13027286),snow:new Q(14673653),pine:new Q(2574143),hemiSky:new Q(12767218),hemiGround:new Q(11846374)},ki=new F(.35,.14,.85).normalize(),GM=new Q(12175080),VM=300,WM=3700,XM=`
varying vec3 vDir;
void main() {
  vDir = position;
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * mv;
}
`,qM=`
uniform vec3 uZenith;
uniform vec3 uHorizon;
uniform vec3 uSunColor;
uniform vec3 uSunDir;
uniform vec3 uFog;
uniform float uTime;
varying vec3 vDir;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float vnoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += a * vnoise(p);
    p *= 2.07;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec3 dir = normalize(vDir);
  float t = clamp(dir.y * 1.4 + 0.12, 0.0, 1.0);
  vec3 col = mix(uHorizon, uZenith, pow(t, 0.75));
  float s = max(dot(dir, uSunDir), 0.0);
  col += uSunColor * pow(s, 48.0) * 0.9;   // диск-глоу
  col += uSunColor * pow(s, 3.0) * 0.38;   // широкий закатный ореол у солнца

  // ОБЛАКА. Плоский слой на условной высоте: направление взгляда проецируется
  // на него как dir.xz / dir.y, поэтому у горизонта клочья сами собой
  // сплющиваются в длинные полосы, а над головой раскрываются — перспектива
  // получается бесплатно, без единого полигона.
  //
  // Слой живёт ТОЛЬКО выше горизонта и гаснет к нему плавно: мир собран из
  // трёх слоёв, и любая заметная граница у линии горизонта читается как
  // «геометрию не дорисовали» — этой ошибкой уже переболели.
  if (dir.y > 0.012) {
    vec2 p = dir.xz / dir.y;
    vec2 drift = vec2(uTime * 0.0022, uTime * 0.0009);
    float n = fbm(p * 0.55 + drift);
    // Второй, более редкий слой выше и медленнее: одна плотность на всё небо
    // выглядит как обои, два разных масштаба — как погода.
    float n2 = fbm(p * 0.17 - drift * 0.6 + 31.7);
    float cov = smoothstep(0.46, 0.76, n * 0.66 + n2 * 0.56);
    // у горизонта слой уходит в дымку, у зенита редеет
    // Полоса неба над склоном узкая — камера смотрит вниз по горе, и на
    // экран попадает от силы четверть купола. Поэтому облака обязаны
    // начинаться почти от самого горизонта, иначе их просто не видно.
    float band = smoothstep(0.012, 0.06, dir.y) * (1.0 - smoothstep(0.5, 1.0, dir.y) * 0.4);
    cov *= band;

    // Свет: кромка, обращённая к солнцу, горит, тело клочка остаётся
    // холодным. Разницу берём из того же шума со сдвигом к солнцу — дёшево
    // и читается именно как объём, а не как плоская заливка.
    vec2 toSun = normalize(uSunDir.xz + vec2(1e-4)) * 0.35;
    float lit = clamp((n - fbm((p + toSun) * 0.55 + drift)) * 6.0 + 0.35, 0.0, 1.0);
    vec3 shade = mix(uFog * 0.86, uHorizon, 0.35);
    vec3 cloud = mix(shade, uSunColor, lit * (0.35 + 0.55 * pow(s, 1.5)));
    col = mix(col, cloud, cov * 0.92);
  }

  // Ниже горизонта небо — ровно цвет тумана: щели между слоями мира
  // (чанки / дальний план / задник) показывают именно купол, и только
  // точное совпадение с туманом делает их неотличимыми от дымки.
  float below = clamp(-dir.y * 9.0 + 0.25, 0.0, 1.0);
  col = mix(col, uFog, below);
  gl_FragColor = vec4(col, 1.0);
}
`;function YM(){const i=new me({vertexShader:XM,fragmentShader:qM,uniforms:{uZenith:{value:Ne.skyZenith},uHorizon:{value:Ne.skyHorizon},uSunColor:{value:Ne.sun},uSunDir:{value:ki},uFog:{value:Ne.fog},uTime:{value:0}},side:Ke,depthWrite:!1,depthTest:!1,fog:!1}),t=new dt(new oa(420,24,12),i);return t.frustumCulled=!1,t.renderOrder=-3,{mesh:t,update(e){i.uniforms.uTime.value+=e}}}const St=48;function _o(i){return Math.sin(i*.0018+Cs(0))*430+Math.sin(i*.0044+1.7+Cs(1))*195}function ZM(i){return Math.cos(i*.0018+Cs(0))*430*.0018+Math.cos(i*.0044+1.7+Cs(1))*195*.0044}function oe(i,t){return i+_o(t)}function ye(i,t){return i-_o(t)}function on(i,t,e){const n=Math.max(0,Math.min(1,(i-t)/(e-t)));return n*n*(3-2*n)}function bd(i){return i<Gi-120||i>Gi+1300?1:.58+.42*on(i,Gi+120,Gi+1300)}const Ve={slope:i=>.42+.58*on(i,40,1400),shape:i=>.8+.2*on(i,150,1400),ribs:i=>.42+.58*on(i,150,1400),bumps:i=>.45+.55*on(i,250,1400),rocky:i=>on(i,500,1700),kicker:i=>on(i,300,900),rail:i=>on(i,450,1500),tree:i=>on(i,380,1500),rock:i=>on(i,560,1800),hazard:i=>on(i,700,2100),powder:i=>on(i,200,900),ice:i=>on(i,650,2e3)},Hi=7e3,Fr=600,co=3,In=[{trees:[0,0,0,0,0,0,0,0,0,0,1,.35,.35],snowOnTrees:!1,forest:.4,villages:0,surfaces:["ASH","CINDER","OBSIDIAN","BASALT"],gripPerKind:[1,1,8.5,1],scrubPerKind:[1,1,4,1],rough:1.3,drag:1.35,grip:.78,accel:.9},{trees:[1,1,1,1,1,0,0,0,0,0,.35,0,0],snowOnTrees:!0,forest:1,villages:1,surfaces:["PACKED","POWDER","ICE","DIRT"],rough:1,drag:1,grip:1,accel:1},{trees:[0,0,0,0,.25,.2,0,0,0,0,.5,1,1],snowOnTrees:!0,forest:.22,villages:.15,surfaces:["FIRN","SCREE","ICE","ROCK"],rough:1.5,drag:1.12,grip:.9,accel:.97}];function KM(i){const{a:t,b:e,t:n}=To(i);return In[(n>.5?e:t)%In.length]}const fu=new Map;function jM(i){const{a:t,b:e,t:n}=To(i),s=Math.round(n*8)/8,o=t+":"+e+":"+s,r=fu.get(o);if(r)return r;const a=In[t%In.length],c=In[e%In.length],l=v=>{const g=v.reduce((u,x)=>u+x,0)||1;return v.map(u=>u/g)},h=l(a.trees),f=l(c.trees),d=[];let p=0;for(let v=0;v<h.length;v++)p+=h[v]+(f[v]-h[v])*s,d.push(p);const m=d.map(v=>v/Math.max(1e-6,p));return fu.set(o,m),m}function vi(i,t){const{a:e,b:n,t:s}=To(i),o=In[e%In.length],r=In[n%In.length],a=s*s*(3-2*s);return t(o)+(t(r)-t(o))*a}function $M(i){return vi(i,t=>t.forest)}function JM(i){return vi(i,t=>t.villages)}function QM(i){return vi(i,t=>t.rough)}function Se(i){return t_(i,0)}const du=[1,0,2];function To(i){const t=Math.floor(i/Hi),e=(t%co+co)%co,n=du[e],s=du[(e+1)%co],o=i-t*Hi;return o>Hi-Fr?{a:n,b:s,t:(o-(Hi-Fr))/Fr}:{a:n,b:n,t:0}}const Gi=Hi-Fr,Ol=Hi*2;function t_(i,t){const{a:e,b:n,t:s}=To(i);let o=0;return e===t&&(o+=1-s),n===t&&(o+=s),o}const Xi=0,Eo=1,Vs=2,Ao=3,ll=[{kind:Xi,drag:.85,grip:1.25,scrub:1,accel:1,name:"PACKED"},{kind:Eo,drag:2.8,grip:1.8,scrub:1.6,accel:.75,name:"POWDER"},{kind:Vs,drag:.55,grip:.16,scrub:.25,accel:1.15,name:"ICE"},{kind:Ao,drag:2.4,grip:.9,scrub:1.3,accel:.75,name:"DIRT"}];function e_(i,t=0){return KM(t).surfaces[i]??(ll[i]??ll[0]).name}function n_(i,t){const e=i+rt(i*.006+3.1,t*.006-7.7)*30,n=t+rt(i*.006-11.4,t*.006+2.3)*30;return rt(e*.0042+71.3,n*.0055-24.8)*.6+rt(e*.011-15.2,n*.013+9.4)*.27+rt(e*.027+41.8,n*.031-3.6)*.13}function Bl(i,t){const e=i+rt(i*.02+5.5,t*.02+1.9)*12,n=t+rt(i*.02-9.1,t*.02+6.4)*12,s=rt(e*.013+8.9,n*.016+44.1)*.72+rt(e*.035-4.2,n*.04+17.6)*.28,o=Ve.ice(t);if(s>.5+(1-o)*.9&&Math.abs(i-re(t))>tn+6)return Ao;const r=n_(i,t)+kl(i,t)*.22;return r>.214+(1-Ve.powder(t))*1?Eo:r<-.141-(1-o)*1.2?Vs:Xi}const pu=new Map;function Td(i,t){const e=ll[Bl(i,t)],n=vi(t,f=>f.drag),s=vi(t,f=>f.grip)*vi(t,f=>f.gripPerKind?.[e.kind]??1),o=vi(t,f=>f.accel),r=vi(t,f=>f.scrubPerKind?.[e.kind]??1);if(n===1&&s===1&&o===1&&r===1)return e;const a=Math.round(n*20),c=e.kind+":"+a+":"+Math.round(s*20)+":"+Math.round(r*20),l=pu.get(c);if(l)return l;const h={kind:e.kind,drag:e.drag*n,grip:e.grip*s,scrub:e.scrub*r,accel:e.accel*o,name:e.name};return pu.set(c,h),h}const tn=19,mu=9,sr=4.2,Xr=[[190,.0011,2.1],[72,.0062,0],[34,.0165,1.3],[14,.032,4.1]];function re(i){let t=0;for(let e=0;e<Xr.length;e++){const[n,s,o]=Xr[e];t+=Math.sin(i*s+o+Cs(2+e))*n}return t}function i_(i){let t=0;for(let e=0;e<Xr.length;e++){const[n,s,o]=Xr[e];t-=Math.sin(i*s+o+Cs(2+e))*n*s*s}return t}function Ed(i,t){const e=i-re(t),n=Math.abs(e);if(n>tn+mu)return{t:0,dx:e,bank:0};const s=1-Math.max(0,(n-tn)/mu),o=s*s*(3-2*s);let r=-52*i_(t)*e;return r>sr&&(r=sr),r<-sr&&(r=-sr),{t:o,dx:e,bank:Math.max(0,r)}}const qr=480,Ad=360,Yr=11,xo=26;function Rd(i,t){const e=J(i*29,41)>.5?1:-1,n=58+J(i*13,7)*75,s=Math.sin(t*.03+i*1.7)*15+Math.sin(t*.012+i*3.1)*22,o=xo+tn+8;let r=e*n+s;return Math.abs(r)<o&&(r=Math.sign(r||e)*o),re(t)+r}function s_(i,t){let e=0;const n=Math.floor(t/qr);for(let s=n-1;s<=n;s++){if(s<1||J(s*313+5,77)<.12)continue;const o=s*qr+40+J(s*11,3)*60,r=(t-o)/Ad;if(r<0||r>1)continue;const a=Math.min(1,Math.min(r,1-r)/.14),c=a*a*(3-2*a),l=Math.abs(i-Rd(s,t));if(l>xo)continue;const h=Math.max(0,Math.min(1,(l-Yr)/(xo-Yr))),f=1-h*h*(3-2*h);e-=(14+J(s*17,23)*10)*c*f*Ve.hazard(t)}return e}function kl(i,t){const e=Math.floor(t/qr);let n=0;for(let s=e-1;s<=e;s++){if(s<1||J(s*313+5,77)<.12)continue;const o=s*qr+40+J(s*11,3)*60,r=(t-o)/Ad;if(r<0||r>1)continue;const a=Math.abs(i-Rd(s,t));if(a>xo+4)continue;const c=Math.max(0,Math.min(1,(a-Yr)/(xo-Yr)));n=Math.max(n,1-c*c*(3-2*c))}return n*Ve.hazard(t)}const Xa=260,gu=220;function hl(i,t){let e=0;const n=Math.floor(t/Xa),s=Math.floor(i/gu);for(let o=n-3;o<=n;o++)if(!(o<1))for(let r=s-1;r<=s+1;r++){if(J(r*91+7,o*57+13)<.3)continue;const a=o*Xa+40+J(r*31+o,5)*(Xa-80)+rt(i*.03,o*3.1)*4,c=3+11*(rt(i*.02+7.7,o*13.7)*.5+.5),l=(t-a)/c;if(l<=0)continue;const h=(r+.5)*gu+(J(r*13,o*3)-.5)*60,f=40+J(r*7,o*11)*140;if(Math.abs(re(a)-h)<f+tn+14)continue;const d=Math.abs(i-h);if(d>f)continue;const p=Math.min(1,l),m=Math.min(1,(f-d)/30),v=J(r*17+o*5,3),g=(5+v*v*35)*(.75+.5*(rt(i*.01,o*3.7)*.5+.5)),u=p*p*(3-2*p),x=(rt(i*.05,o*9.1)*.5+.5)*.18,_=u-x*Math.sin(u*Math.PI),M=Math.max(0,Math.min(1,(t-a-330)/320)),E=M*M*(3-2*M);e-=g*_*(1-E)*(m*m*(3-2*m))}return Math.max(e,-30)*Ve.hazard(t)}const qa=300,vu=260;function o_(i,t){let e=0;const n=Math.floor(t/qa),s=Math.floor(i/vu);for(let o=n-1;o<=n;o++)if(!(o<1))for(let r=s-1;r<=s+1;r++){if(J(r*53+21,o*37+8)<.65)continue;const a=60+J(r*3,o*19)*90,c=o*qa+J(r*29,o*7)*(qa-a-20),l=rt(i*.035+3.1,o*7.7)*3,h=t-c-l;if(h<0||h>a+2.5)continue;const f=(r+.5)*vu+(J(r*11,o*23)-.5)*70,d=40+J(r*41,o*13)*60,p=Math.abs(i-f);if(p>d)continue;const m=1.5+J(r*19,o*31)*1,v=m*(.8+.4*(rt(i*.02,o*5.3)*.5+.5)),g=6+m*2.5;let u;if(h<g){const _=h/g;u=_*_*(3-2*_)}else h>a?u=1-(h-a)/2.5:u=1;const x=Math.min(1,(d-p)/25);e+=v*u*(x*x*(3-2*x))*Ve.hazard(t)}return e}const qi={BODY_HW:2.3,BODY_HD:1.8,ROOF_HW:2.7,ROOF_HD:2.05,ROOF_H:1.5,ROOF_OVER:1.16},de={CHALET:0,TALL:1,BARN:2,HOTEL:3,SHOP:4,CHAPEL:5};function Cd(i){const t=qi;return{hw:t.ROOF_HW*t.ROOF_OVER*i.wide*i.scale,hd:t.ROOF_HD*t.ROOF_OVER*i.deep*i.scale,eave:i.bodyH*i.scale,ridge:(i.bodyH+t.ROOF_H*i.roofPitch)*i.scale}}function r_(i,t){const e=ye(i,t),n=Nn(e,t);if(!n)return null;let s=null;for(const o of n.houses){const r=e-o.x,a=t-o.z;if(r*r+a*a>400)continue;const c=Math.cos(o.rot),l=Math.sin(o.rot),h=r*c-a*l,f=r*l+a*c,d=Cd(o);if(Math.abs(h)>d.hw||Math.abs(f)>d.hd)continue;if(!hn)return null;const p=hn(o.x,o.z)-.15,m=p+d.eave+(d.ridge-d.eave)*(1-Math.abs(h)/d.hw);(!s||m>s.y)&&(s={y:m,eave:p+d.eave,ridge:p+d.ridge})}return s}const ul=240,Pd=380,or=new Map;function a_(i,t){const e=i+","+t,n=or.get(e);if(n!==void 0)return n;const s=i*977+t*131,o=t*Pd+40+J(s+11,9)*120,r=(i+.5)*ul+(J(s+1,3)-.5)*(ul*.4),a=JM(o),c=1-(1-.62)*a;if(t<1||a<.08||J(s,97)<c||o<900)return or.set(e,null),null;const l=(I,N)=>{let G=(J(s+13,5)-.5)*1.5;const z=[{x:I,z:N}],V=[],Y=[],j=[];let ot=0;const wt=11+Math.floor(J(s+3,17)*5.99);for(let W=0;W<wt;W++){G+=(J(s+19+W*7,W*3+1)-.5)*.3,G>.85&&(G=.85),G<-.85&&(G=-.85);const et=26+J(s+23+W,W*11+4)*16,tt=Math.sin(G),st=Math.cos(G),pt=z[z.length-1];z.push({x:pt.x+tt*et,z:pt.z+st*et}),V.push(tt),Y.push(st),j.push(et),ot+=et}return{rp:z,dX:V,dZ:Y,sl:j,tl:ot}},h=[[0,0],[0,-70],[0,70],[-60,0],[60,0],[-60,-70],[60,70],[0,-140]];let f=null;for(const[I,N]of h){const G=o+N;if(G<300)continue;const z=l(r+I,G);let V=!0;for(let Y=0;Y<z.sl.length&&V;Y++)for(const j of[0,.5]){const ot=z.rp[Y].x+z.dX[Y]*z.sl[Y]*j,wt=z.rp[Y].z+z.dZ[Y]*z.sl[Y]*j;if(hl(ot,wt)-hl(ot,wt+10)>3.5||Math.abs(ot-re(wt))<tn+26){V=!1;break}}if(V){f=z;break}}if(!f)return or.set(e,null),null;const d=f.rp,p=f.dX,m=f.dZ,v=f.sl,g=f.tl,u=[];let x=12+J(s,31)*8,_=J(s,41)>.5?1:-1,M=0;const E=1+Math.floor(J(s+101,13)*3),b=5+Math.floor(J(s+103,17)*6);for(;x<g-12;){let I=0,N=0;for(;I<v.length-1&&x>N+v[I];)N+=v[I],I++;const G=(x-N)/v[I],z=d[I].x+p[I]*v[I]*G,V=d[I].z+m[I]*v[I]*G,Y=m[I],j=-p[I];if(J(s+37+M,7)>.12){const wt=J(s+97+M,29)>.62?19+J(s+43+M,13)*8:8.5+J(s+43+M,13)*4.5,W=z+Y*wt*_,et=V+j*wt*_;let tt=de.CHALET;const st=J(s+71+M,83);M===E?tt=de.HOTEL:M===b?tt=de.CHAPEL:st>.82?tt=de.SHOP:st>.55?tt=de.TALL:st>.34&&(tt=de.BARN);const pt=.85+J(s+53+M,23)*.45,Tt=.85+J(s+59+M,29)*.35,Ut=.85+J(s+79+M,11)*.75,ie=pt*(tt===de.HOTEL?2.1:tt===de.SHOP?1.5:tt===de.BARN?1.2:tt===de.TALL?.8:tt===de.CHAPEL?.75:1),qt=Tt*(tt===de.HOTEL?1.35:tt===de.BARN?1.15:tt===de.CHAPEL?1.3:tt===de.SHOP?1.05:1),ue=2.4*Ut*(tt===de.HOTEL?1.75:tt===de.TALL?1.12:tt===de.BARN?.75:tt===de.SHOP?.85:tt===de.CHAPEL?1.2:1),B=(tt===de.BARN?.5:tt===de.CHAPEL?1.5:tt===de.HOTEL?.7:.8)+J(s+89+M,7)*.4,Le=.85+J(s+47+M,19)*.4,Yt=Math.max(5.5,qi.ROOF_HW*qi.ROOF_OVER*ie*Le+1.5);u.push({wide:ie,deep:qt,bodyH:ue,roofPitch:B,x:W,z:et,rot:Math.atan2(-Y*_,-j*_)+(J(s+M,53)-.5)*.75+(J(s+M*3,91)>.72?Math.PI/2:0),scale:Le,wMul:pt,dMul:Tt,style:Math.floor(J(s+61+M,37)*2.99),kind:tt,hMul:Ut,chimney:J(s+83+M,17)>.35&&tt!==de.CHAPEL,padR:Yt})}_=-_,x+=9+J(s+67+M,43)*9,M++}const w=[];let T=8,y=1;for(;T<g-4;){let I=0,N=0;for(;I<v.length-1&&T>N+v[I];)N+=v[I],I++;const G=(T-N)/v[I];w.push({x:d[I].x+p[I]*v[I]*G+m[I]*4.3*y,z:d[I].z+m[I]*v[I]*G-p[I]*4.3*y}),y=-y,T+=19+J(s+71,Math.round(T))*6}let S=1/0,A=-1/0,R=1/0,P=-1/0;for(const I of d)S=Math.min(S,I.x),A=Math.max(A,I.x),R=Math.min(R,I.z),P=Math.max(P,I.z);for(const I of u)S=Math.min(S,I.x),A=Math.max(A,I.x),R=Math.min(R,I.z),P=Math.max(P,I.z);const U={key:e,pts:d,segDirX:p,segDirZ:m,segLen:v,totalLen:g,houses:u,lamps:w,minX:S-26,maxX:A+26,minZ:R-26,maxZ:P+26};return or.set(e,U),U}function Nn(i,t){const e=Math.floor(t/Pd),n=Math.floor(i/ul);for(let s=e-1;s<=e;s++)for(let o=n-1;o<=n+1;o++){const r=a_(o,s);if(r&&t>=r.minZ&&t<=r.maxZ&&i>=r.minX&&i<=r.maxX)return r}return null}function yo(i,t,e){let n=1/0,s=0,o=0;for(let r=0;r<i.segLen.length;r++){const a=i.pts[r],c=t-a.x,l=e-a.z,h=Math.max(0,Math.min(i.segLen[r],c*i.segDirX[r]+l*i.segDirZ[r])),f=c-i.segDirX[r]*h,d=l-i.segDirZ[r]*h,p=f*f+d*d;p<n&&(n=p,s=r,o=h/i.segLen[r])}return{d2:n,seg:s,t:o}}let hn=null;function c_(i){hn=i}const Ft={SPRUCE:0,PINE:1,LARCH:2,BIRCH:3,SNAG:4,BUSH:5},aa=[Ft.SPRUCE,Ft.SPRUCE,Ft.SPRUCE,Ft.SPRUCE,Ft.SPRUCE,Ft.PINE,Ft.PINE,Ft.LARCH,Ft.BIRCH,Ft.BIRCH,Ft.SNAG,Ft.BUSH,Ft.BUSH];function l_(i,t){const e=jM(t);for(let n=0;n<e.length;n++)if(i<=e[n])return n;return e.length-1}function h_(i){const t=aa[i]??Ft.SPRUCE;return t===Ft.BUSH?.45:t===Ft.SNAG?.65:t===Ft.BIRCH?.8:1}function u_(i,t){const e=aa[i]??Ft.SPRUCE;return e===Ft.BUSH?.7+t*.5:e===Ft.BIRCH?.9+t*.8:.75+t*.95}const f_=.72;function d_(i,t){if(!hn)return 0;const e=2.5,n=(hn(i+e,t)-hn(i-e,t))/(2*e),s=(hn(i,t+e)-hn(i,t-e))/(2*e);return Math.hypot(n,s)}const p_=900;function Fs(i,t){return i*i+t*t<p_}const Hl=6,fl=St*Hl,Ss=24;let Ld=[0,1,2,3].map(()=>new Array(Ss).fill(.3)),Dd=[.3,.3,.3,.3];function m_(i,t,e){const n=-(i.rot??0),s=t*Math.cos(n)-e*Math.sin(n),o=t*Math.sin(n)+e*Math.cos(n),r=i.zMul??1,a=Math.atan2(o/r,s);return .55*(i.scale??1)*Math.hypot(Math.cos(a),Math.sin(a)*r)}function g_(i){Ld=i,Dd=i.map(t=>Math.max(...t))}function v_(i,t,e){const n=Ld[i.variant??0];if(!n)return i.r;const s=-(i.rot??0),o=t*Math.cos(s)-e*Math.sin(s),r=t*Math.sin(s)+e*Math.cos(s),a=i.zMul??1,c=Math.atan2(r/a,o),l=(c+Math.PI)/(2*Math.PI)*Ss-.5+Ss,h=Math.floor(l)%Ss,f=l-Math.floor(l),d=n[h],p=n[(h+1)%Ss],m=(d+(p-d)*f)*1.01,v=Math.cos(c),g=Math.sin(c)*a;return i.scale*m*Math.hypot(v,g)}const rr=new Map;function ca(i){const t=rr.get(i);if(t!==void 0)return t;const e=i*Hl;let n=null;if(J(e*733+3,11)>.29){const s=e*St+(J(e*17+5,9)-.5)*St*.8,o=J(e*29,31)>.5?1:-1,r=(70+Math.pow(J(e*53,59),1.6)*85)*(1+J(e*61,67)),a=Math.floor(J(e*71,79)*3.99),c=r*(Dd[a]??.3)*.92,l=tn+12+c+J(e*41,37)*70,h=re(s)+o*l,f=!So(h,s).some(d=>Zr(d,h,s)<(c+25)*(c+25));!Fs(h,s)&&!Nn(h,s)&&f&&(n={x:h,z:s,r:c,scale:r,mound:J(e*107,13)>.45,snowTop:J(e*113,17)>.55,rot:J(e*127,19)*Math.PI*2,zMul:.85+J(e*131,23)*.3,variant:a,hMul:.55+J(e*83,89)*.5,tint:.86+J(e*97,101)*.28})}return rr.set(i,n),rr.size>256&&rr.clear(),n}const Id=15,Mu=St*Id,Vi=20,Ud=[{cx:-.36,prof:new Array(Vi).fill(.11)},{cx:.36,prof:new Array(Vi).fill(.11)}];let dl=[Ud];function M_(i){dl=i}function la(i){return dl[i]??dl[0]??Ud}function Nd(i){return Math.max(...i.prof)}function _u(i){return Math.max(i.prof[0],i.prof[Vi/2])}function __(i,t){const[e,n]=la(t);return(n.cx-_u(n)-(e.cx+_u(e)))*i}function x_(i,t,e){const n=-(i.rot??0),s=t*Math.cos(n)-e*Math.sin(n),o=t*Math.sin(n)+e*Math.cos(n),r=Math.hypot(s,o)||1,a=i.r,c=(i.zMul??1)*a,l=Math.abs(s/r),h=Math.abs(o/r),f=l>1e-6?a/l:1/0,d=h>1e-6?c/h:1/0;return Math.min(f,d)}function y_(i,t,e){const n=la(i.variant??0),s=n[i.leg??0]??n[0],r=(Math.atan2(e,t)+Math.PI)/(2*Math.PI)*Vi-.5+Vi,a=Math.floor(r)%Vi,c=r-Math.floor(r),l=s.prof[a],h=s.prof[(a+1)%Vi];return(l+(h-l)*c)*1.01*i.scale}const ar=new Map;function Fd(i){const t=ar.get(i);if(t!==void 0)return t;const e=i*Id;let n=null;if(J(e*911+7,23)>.45){const s=e*St+(J(e*19+11,29)-.5)*St*.7,o=Math.floor(J(e*59,61)*2.99),r=190+Math.pow(J(e*37,41),1.3)*140,a=(tn+16)*2,c=__(r,o),l=c<a?r*a/Math.max(1,c):r,h=re(s),f=la(o),d=Math.max(...f.map(u=>Math.abs(u.cx)))*l,p=Math.max(...f.map(Nd))*l,m=![h-d,h+d].some(u=>So(u,s).some(x=>Zr(x,u,s)<(p+20)*(p+20))),v=[-1,0,1].some(u=>{const x=ca(Math.round(s/(St*6))+u);return x?[h-d,h,h+d].some(_=>Math.hypot(x.x-_,x.z-s)<x.r+p+25):!1}),g=hn?[h-d,h+d].some(u=>{const x=hn(u,s),_=hn(u-p-25,s),M=hn(u+p+25,s);return _-x>3.5&&M-x>3.5}):!1;s>250&&!Fs(h,s)&&!Nn(h,s)&&m&&!v&&!g&&(n={x:h,z:s,span:l,height:l*(.52+J(e*43,47)*.22),variant:o,tint:.88+J(e*67,71)*.24})}return ar.set(i,n),ar.size>256&&ar.clear(),n}function S_(i){return la(i.variant).map(t=>({x:i.x+t.cx*i.span,r:Nd(t)*i.span}))}function w_(i,t){const e=Math.floor(t/fl);let n=0;for(let s=e-1;s<=e+1;s++){const o=ca(s);if(!o||!o.mound)continue;const r=Math.hypot(i-o.x,t-o.z),a=o.r*2.2;if(r>a)continue;const c=1-r/a;n+=o.scale*.34*Math.pow(c*c*(3-2*c),1.5)}return n}const cr=new Map;function xu(i,t){const e=rt(i*.003+40.1,t*.003-17.6)*.5+.5,n=$M(t);return e<.42?0:e<.55?.12*n:e<.68?.35*n:.85*n}function ha(i,t){const e=i+","+t,n=cr.get(e);if(n)return n;const s=[],o=i*St,r=t*St,a=Nn(o,r),c=o-St/2,l=o+St/2,h=r-St/2,f=r+St/2;if(a){for(const w of a.houses)if(w.x>=c&&w.x<l&&w.z>=h&&w.z<f){const T=qi.BODY_HW*w.wide*w.scale,y=qi.BODY_HD*w.deep*w.scale;s.push({x:w.x,z:w.z,scale:w.scale,r:T,zMul:y/T,kind:"house",rot:w.rot})}for(const w of a.lamps)w.x>=c&&w.x<l&&w.z>=h&&w.z<f&&s.push({x:w.x,z:w.z,scale:1,r:.3,kind:"lamp"})}let d=null;{const w=ca(Math.round(t/Hl));w&&Math.round(w.x/St)===i&&Math.round(w.z/St)===t&&(d=w,s.push({x:w.x,z:w.z,scale:w.scale,r:w.r,kind:"crag",variant:w.variant,hMul:w.hMul,tint:w.tint,rot:w.rot,zMul:w.zMul}))}for(let w=-1;w<=1;w++){const T=Fd(Math.round(t/15)+w);T&&Math.round(T.z/St)===t&&S_(T).forEach((y,S)=>{Math.round(y.x/St)===i&&s.push({x:y.x,z:T.z,scale:T.span,r:y.r,kind:"arch",variant:T.variant,leg:S})})}const p=1+Math.floor(J(i*41+3,t*67+9)*3),m=[],v=[],g=[];for(let w=0;w<p;w++){const T=o+(J(i*71+w*13,t*37+w)-.5)*St,y=r+(J(i*59+w,t*83+w*7)-.5)*St;J(i*199+w*17,t*181+w)>xu(T,y)*Ve.tree(y)||(m.push(T),v.push(y),g.push(4.5+J(i*97+w*3,t*43+w)*7.5))}const u=9+Math.floor(J(i*7+1,t*13+5)*16);for(let w=0;w<u;w++){let T,y;const S=m.length===0||J(i*149+w*11,t*113+w*5)>.88;if(S)T=o+(J(i*31+w,t*17)-.5)*St,y=r+(J(i*19,t*23+w)-.5)*St;else{const P=w%m.length,U=g[P]*Math.sqrt(J(i*29+w*3,t*61+w)),I=J(i*53+w,t*47+w*9)*Math.PI*2;T=m[P]+Math.cos(I)*U,y=v[P]+Math.sin(I)*U}if(Fs(T,y)||S&&J(i*101+w*3,t*53+w)>xu(T,y)*.5*Ve.tree(y)||pl(T,y)>.05||kl(T,y)>.3||Bl(T,y)===Vs||d_(T,y)>f_)continue;if(d){const P=T-d.x,U=y-d.z,I=d.r*1.15;if(P*P+U*U<I*I)continue}if(So(T,y).some(P=>Zr(P,T,y)<2.5*2.5)||Math.abs(T-re(y))<tn+3||a&&(yo(a,T,y).d2<169||a.houses.some(P=>(P.x-T)**2+(P.z-y)**2<64)))continue;const A=.8+J(w*3+i,w*5+t)*.9,R=l_(J(i*211+w*7,t*149+w),y);s.push({x:T,z:y,scale:A,r:(.4*A+.15)*h_(R),kind:"tree",variant:R,hMul:u_(R,J(i*173+w,t*197+w*3)),tint:.7+J(i*131+w*5,t*179+w)*.75})}const x=Ve.rock(r),_=J(i*3+11,t*29+2)>1-.08*x,M=_?3+Math.floor(J(i*5+7,t*11+3)*4):Math.floor(J(i*3+11,t*29+2)*1.25*x),E=o+(J(i*23+5,t*91+1)-.5)*St,b=r+(J(i*87+2,t*19+6)-.5)*St;for(let w=0;w<M;w++){let T,y;if(_){const R=9*Math.sqrt(J(i*13+w*5,t*7+w)),P=J(i*17+w,t*31+w*3)*Math.PI*2;T=E+Math.cos(P)*R,y=b+Math.sin(P)*R}else T=o+(J(i*13+w*5,t*7+w)-.5)*St,y=r+(J(i*17+w,t*31+w*3)-.5)*St;if(Fs(T,y)||pl(T,y)>.05||So(T,y).some(R=>Zr(R,T,y)<2.5*2.5)||Math.abs(T-re(y))<tn+2)continue;const S=w===0&&_?.85+J(i*7+w*3,t*5+w)*.15:J(i*7+w*3,t*5+w),A=.85+Math.pow(S,3.2)*3.2;s.push({x:T,z:y,scale:A,r:.62*A,kind:"rock",rot:J(i*91+w*7,t*83+w*3)*Math.PI*2,zMul:.85+J(i*113+w*5,t*97+w*11)*.35,topY:A*(.45+J(i*41+w,t*29+w*5)*.7)*.54,variant:Math.floor(J(i*61+w*9,t*73+w)*3.99),hMul:.45+J(i*41+w,t*29+w*5)*.7,tint:.78+J(i*137+w*3,t*151+w)*.5})}for(const w of s)w.x=oe(w.x,w.z);return cr.set(e,s),cr.size>512&&cr.clear(),s}const mo=260,As=340,b_=130,to=new Map;function zd(i,t){const e=i+","+t,n=to.get(e);if(n!==void 0)return n;const s=()=>(to.set(e,null),null),o=(t+.5)*As+(J(t*11,5)-.5)*(As-160),r=re(o)+(J(t*29,17)-.5)*2*b_;if(Math.floor(r/mo)!==i)return s();const a=Ve.rail(o);if(a<=0||Se(o)>.15||J(t*23+4,9)<1-.82*a||Fs(r,o))return s();const c=J(t*31,7)>.5?1:-1;let l=[];const h=46+J(t*37,11)*62,f=16+Math.floor(J(t*29,31)*10.99),d=17+J(t*3,19)*12,p=J(t*13,3)*Math.PI*2;for(let _=0;_<=f;_++){const M=o+_*d,E=h+Math.sin(_*.5+p)*15+Math.sin(_*.17+1.1)*9;l.push({x:re(M)+c*E,z:M})}for(let _=0;_<3;_++){const M=[l[0]];for(let E=0;E<l.length-1;E++){const b=l[E],w=l[E+1];M.push({x:b.x*.75+w.x*.25,z:b.z*.75+w.z*.25}),M.push({x:b.x*.25+w.x*.75,z:b.z*.25+w.z*.75})}M.push(l[l.length-1]),l=M}for(let _=0;_<l.length;_+=4){if(Math.abs(l[_].x-re(l[_].z))<tn+8)return s();const M=Nn(l[_].x,l[_].z);if(M&&(yo(M,l[_].x,l[_].z).d2<256||M.houses.some(E=>(E.x-l[_].x)**2+(E.z-l[_].z)**2<144)))return s()}const m=[],v=[],g=[];let u=0;for(let _=0;_<l.length-1;_++){const M=l[_+1].x-l[_].x,E=l[_+1].z-l[_].z,b=Math.hypot(M,E);m.push(M/b),v.push(E/b),g.push(b),u+=b}const x={key:i+","+t,pts:l,segDirX:m,segDirZ:v,segLen:g,totalLen:u,ledge:J(i*41,t*37)>.5};return to.set(e,x),to.size>512&&to.clear(),x}function So(i,t){const e=Math.floor(i/mo),n=Math.floor(t/As),s=[];for(let o=-1;o<=1;o++)for(let r=-1;r<=1;r++){const a=zd(e+o,n+r);a&&s.push(a)}return s}const lr=new Map;function Od(i){const t=lr.get(i.key);if(t)return t;const e=i.pts.map(c=>({x:oe(c.x,c.z),z:c.z})),n=[],s=[],o=[];let r=0;for(let c=0;c<e.length-1;c++){const l=e[c+1].x-e[c].x,h=e[c+1].z-e[c].z,f=Math.hypot(l,h);n.push(l/f),s.push(h/f),o.push(f),r+=f}const a={...i,key:i.key+"|w",pts:e,segDirX:n,segDirZ:s,segLen:o,totalLen:r};return lr.set(i.key,a),lr.size>256&&lr.clear(),a}function yu(i,t){return So(ye(i,t),t).map(Od)}function T_(i,t){const e=i*St-St/2-2,n=e+St+4,s=t*St-St/2-2,o=s+St+4,r=[],a=Math.ceil(400/mo)+1,c=Math.ceil(400/As)+1;for(let l=Math.floor(e/mo)-a;l<=Math.floor(n/mo)+1;l++)for(let h=Math.floor(s/As)-c;h<=Math.floor(o/As)+1;h++){const f=zd(l,h);f&&f.pts.some(d=>d.x>=e&&d.x<n&&d.z>=s&&d.z<o)&&r.push(Od(f))}return r}function Zr(i,t,e){let n=1/0;for(let s=0;s<i.segLen.length;s++){const o=i.pts[s],r=t-o.x,a=e-o.z,c=Math.max(0,Math.min(i.segLen[s],r*i.segDirX[s]+a*i.segDirZ[s])),l=r-i.segDirX[s]*c,h=a-i.segDirZ[s]*c,f=l*l+h*h;f<n&&(n=f)}return n}const zs=80,Os=110;function Gl(i,t){const e=(i+.5)*zs+(J(i,t*3)-.5)*(zs-38),n=(t+.5)*Os+(J(i*7,t)-.5)*(Os-72),s=Ve.kicker(n);if(s<=0||J(i*5+3,t*11+7)<1-.45*s)return null;const o=8+J(i*3+1,t*13+2)*18,r=3+J(i*9+4,t*17+6)*6,a=Math.min(5,o*(.18+J(i*21+8,t*7+9)*.14));return Fs(e,n)||Nn(e,n)?null:{x:e,z:n,len:o,halfW:r,h:a}}function pl(i,t){const e=Math.floor(i/zs),n=Math.floor(t/Os),s=Gl(e,n);if(!s)return 0;const o=i-s.x,r=t-s.z;if(r<-s.len||o<-s.halfW||o>s.halfW)return 0;const a=Math.max(0,1-o/s.halfW*(o/s.halfW));if(r>=0)return r>=1.6?0:s.h*a*(1-r/1.6);const c=(r+s.len)/s.len;return s.h*c*c*c*c*a}function Su(i,t){const e=Gl(Math.floor(i/zs),Math.floor(t/Os));if(!e)return null;const n=t-e.z,s=i-e.x;return n<-e.len||n>=0||s<-e.halfW||s>e.halfW?null:e}function E_(i,t){const e=i*St-St/2,n=e+St,s=t*St-St/2,o=s+St,r=[];for(let a=Math.floor(e/zs);a<=Math.floor(n/zs);a++)for(let c=Math.floor(s/Os);c<=Math.floor(o/Os);c++){const l=Gl(a,c);l&&l.x>=e&&l.x<n&&l.z>=s&&l.z<o&&r.push(l)}return r}function ua(i,t=!1){const e=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),o={},r={},a=i[0].morphTargetsRelative,c=new Gt;let l=0;for(let h=0;h<i.length;++h){const f=i[h];let d=0;if(e!==(f.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const p in f.attributes){if(!n.has(p))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+p+'" attribute exists among all geometries, or in none of them.'),null;o[p]===void 0&&(o[p]=[]),o[p].push(f.attributes[p]),d++}if(d!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(a!==f.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const p in f.morphAttributes){if(!s.has(p))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;r[p]===void 0&&(r[p]=[]),r[p].push(f.morphAttributes[p])}if(t){let p;if(e)p=f.index.count;else if(f.attributes.position!==void 0)p=f.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,p,h),l+=p}}if(e){let h=0;const f=[];for(let d=0;d<i.length;++d){const p=i[d].index;for(let m=0;m<p.count;++m)f.push(p.getX(m)+h);h+=i[d].attributes.position.count}c.setIndex(f)}for(const h in o){const f=wu(o[h]);if(!f)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;c.setAttribute(h,f)}for(const h in r){const f=r[h][0].length;if(f===0)break;c.morphAttributes=c.morphAttributes||{},c.morphAttributes[h]=[];for(let d=0;d<f;++d){const p=[];for(let v=0;v<r[h].length;++v)p.push(r[h][v][d]);const m=wu(p);if(!m)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;c.morphAttributes[h].push(m)}}return c}function wu(i){let t,e,n,s=-1,o=0;for(let l=0;l<i.length;++l){const h=i[l];if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;o+=h.count*e}const r=new t(o),a=new Pt(r,e,n);let c=0;for(let l=0;l<i.length;++l){const h=i[l];if(h.isInterleavedBufferAttribute){const f=c/e;for(let d=0,p=h.count;d<p;d++)for(let m=0;m<e;m++){const v=h.getComponent(d,m);a.setComponent(d+f,m,v)}}else r.set(h.array,c);c+=h.count*e}return s!==void 0&&(a.gpuType=s),a}const A_=new Q(6511974),R_=new Q(10985384),C_=new Q(14673653);function P_(i,t,e){const n=1/Math.hypot(t/i.hrx,e/i.hry),s=rt(t*2.1+i.ph,e*2.1-i.ph)*.15+rt(t*5.3-i.ph,e*5.3+i.ph)*.06;return n*(1+s)}function bu(i,t){const e=new Un(1,t).toNonIndexed(),n=e.attributes.position,s=i*7.31+1.7;for(let o=0;o<n.count;o++){const r=n.getX(o),a=n.getY(o),c=n.getZ(o),l=Math.hypot(r,a,c)||1,h=r/l,f=a/l,d=c/l,m=1+(rt(h*1.7+s,d*1.7-f*1.3+s)*.34+rt(h*4.3-s,d*4.3+f*3.1)*.17+rt(h*9.1+f*7.7,d*9.1-s)*.08);n.setXYZ(o,h*m,f*m,d*m)}return e}function Bd(i){const t=(u,x)=>J(i*97+u,x),e={hx:(t(1,3)-.5)*.13,hy:.52+t(5,7)*.05,hrx:.54+t(9,11)*.06,hry:.58+t(13,17)*.08,ph:i*13.7+2.5},n=[],s=26,o=-.5,r=Math.PI+.5;for(let u=0;u<=s;u++){const x=u/s,_=o+(r-o)*x,M=Math.cos(_),E=Math.sin(_),b=Math.max(0,Math.sin(Math.min(Math.PI,Math.max(0,_)))),w=1+.75*Math.pow(1-b,1.5),T=.85+t(u*13+41,3)*.5,y=(.075+t(29,31)*.028)*w*T,S=P_(e,M,E)+y*.95,A=e.hx+M*S+(t(u*7+5,9)-.5)*y*.5,R=e.hy+E*S+(t(u*11+3,13)-.5)*y*.5,P=bu(i*31+u,u%3===0?2:1);P.scale(y*(.85+t(u*17+1,19)*.5),y*(.85+t(u*19+7,23)*.5),y*(1.25+t(u*23+9,29)*.7)),P.rotateY(t(u*29+11,31)*Math.PI*2),P.rotateZ((t(u*31+13,37)-.5)*1.1),P.rotateX((t(u*37+17,41)-.5)*.8),P.translate(A,R,(t(u*41+19,43)-.5)*y*.6),n.push(P)}for(const u of[-1,1])for(let x=0;x<2;x++){const _=.13+t(u*53+x*3,47)*.07,M=bu(i*71+u*5+x,1);M.scale(_*1.25,_*(.8+x*.2),_*1.5),M.rotateY(t(u*59+x,53)*Math.PI*2),M.rotateZ((t(u*61+x,59)-.5)*.7),M.translate(e.hx+u*(e.hrx+.13+x*.05),-.05-x*.16,(t(u*67+x,61)-.5)*_*.7),n.push(M)}const a=ua(n);for(const u of n)u.dispose();const c=a;c.computeBoundingBox();const l=c.boundingBox,h=Math.max(.001,l.max.x-l.min.x),f=Math.max(.001,l.max.y-l.min.y),d=c.attributes.position;for(let u=0;u<d.count;u++)d.setXYZ(u,(d.getX(u)-(l.min.x+l.max.x)/2)/h,(d.getY(u)-l.min.y)/f,d.getZ(u)/h);c.computeVertexNormals(),c.userData.groundY=(0-l.min.y)/f;const p=c.attributes.position,m=c.attributes.normal,v=new Float32Array(p.count*3),g=new Q;for(let u=0;u<p.count;u+=3){let x=0,_=0;for(let w=0;w<3;w++)x+=m.getY(u+w)/3,_+=p.getY(u+w)/3;const M=Math.max(0,Math.min(1,_));g.copy(A_).lerp(R_,M*M*(3-2*M));const E=Math.max(0,Math.min(1,(x-.7)/.24));g.lerp(C_,E*E*(.15+.55*M));const b=.9+J(Math.round(p.getX(u)*83),Math.round(p.getZ(u)*91)+u)*.2;for(let w=0;w<3;w++)v[(u+w)*3]=g.r*b,v[(u+w)*3+1]=g.g*b,v[(u+w)*3+2]=g.b*b}return c.setAttribute("color",new Pt(v,3)),c}const di=20;function L_(i){const t=i.attributes.position,e=i.userData.groundY??0,n=s=>{const o=[];let r=1e9,a=-1e9;for(let h=0;h<t.count;h+=3){const f=(t.getY(h)+t.getY(h+1)+t.getY(h+2))/3;if(f<e-.01||f>e+.09)continue;const d=(t.getX(h)+t.getX(h+1)+t.getX(h+2))/3;if(Math.sign(d)!==s)continue;const p=[];for(let m=0;m<3;m++){const v=t.getX(h+m);p.push(v,t.getZ(h+m)),v<r&&(r=v),v>a&&(a=v)}o.push(p)}const c=o.length?(r+a)/2:s*.36,l=new Array(di).fill(0);for(let h=0;h<di;h++){const f=(h+.5)/di*Math.PI*2-Math.PI,d=Math.cos(f),p=Math.sin(f);let m=0;for(const v of o)for(let g=0;g<3;g++){const u=v[g*2]-c,x=v[g*2+1],_=v[(g+1)%3*2]-c-u,M=v[(g+1)%3*2+1]-x,E=d*M-p*_;if(Math.abs(E)<1e-9)continue;const b=(u*M-x*_)/E;if(b<=m)continue;const w=Math.abs(_)>Math.abs(M)?(b*d-u)/_:(b*p-x)/M;w>=0&&w<=1&&(m=b)}l[h]=m}for(let h=0;h<di;h++){let f=0;for(let d=0;d<di;d++){if(l[d]>0)continue;const p=l[(d+di-1)%di],m=l[(d+1)%di];p>0||m>0?l[d]=Math.max(p,m):f++}if(f===0)break}return{cx:c,prof:l}};return[n(-1),n(1)]}let kd=0;function D_(i){kd=i}function Tu(){return kd}const wn=300,hr=new Map;function si(i){const t=hr.get(i);if(t!==void 0)return t;let e=null;if(rt(i*3.7+11.3,5.5)>-.75){const n=i*wn+(rt(i*5.1,2.2)*.5+.5)*wn*.4,s=rt(i*7.3,8.8)>0?1:-1;e={k:i,z:n,u:0,reach:700+(rt(i*4.4,6.6)*.5+.5)*700,coneR:420+(rt(i*8.1,3.1)*.5+.5)*420,coneH:380+(rt(i*9.7,5.9)*.5+.5)*340,ph:i*13.9},e.u=re(n)+s*(e.coneR+e.coneH*1.5+240+(rt(i*2.9,4.4)*.5+.5)*420)}return hr.set(i,e),hr.size>256&&hr.clear(),e}const eo=new Map,Eu=120,Hd=620,I_=26,Ya=150,ur=new Map;function Ro(i){const t=ur.get(i.k);if(t)return t;const e=[],n=re(i.z),s=i.u>n?-1:1,o=i.u+s*i.coneR*.85,r=Math.max(1,Math.floor(i.reach/Eu));for(let a=0;a<r;a++){const c=(a+1)/r,l=i.z+i.coneR*.25+a*Eu;if(l<Hd||Se(l)<.85||Se(l+80)<.85)continue;const h=c*c*(3-2*c);let f=o+(re(l)-o)*h*.95+rt(l*.006+i.ph,4.4)*55;const d=24+(rt(l*.01-i.ph,8.8)*.5+.5)*14,p=re(l),m=tn*.95+d*1.6,v=f-p;Math.abs(v)<m&&(f=p+(v>=0?m:-m)),e.push({u:f,z:l,r:d})}return ur.set(i.k,e),ur.size>512&&ur.clear(),e}const fr=new Map;function Vl(i){const t=fr.get(i.k);if(t)return t;const e=Ro(i).map((n,s)=>{if(rt(s*9.1+i.ph*2,6.3)<-.05)return null;const o=11+(rt(s*5.5+i.ph,3.3)*.5+.5)*7,r=n.r*.55,a=rt(s*3.7+i.ph,1.1)*.45;return{u:n.u+Math.sin(a)*r,z:n.z+Math.cos(a)*r,r:o,depth:42+(rt(s*7.7+i.ph,9.1)*.5+.5)*34}});return fr.set(i.k,e),fr.size>512&&fr.clear(),e}const ml=128,dr=new Map;function U_(i){const t=dr.get(i.k);if(t)return t;const e=new Map,n=(s,o)=>{const r=Math.floor((s.z-o)/ml),a=Math.floor((s.z+o)/ml);for(let c=r;c<=a;c++){const l=e.get(c);l?l.push(s):e.set(c,[s])}};for(const s of Ro(i))n({u:s.u,z:s.z,r:s.r*1.7,depth:I_,well:!1},s.r*1.7);for(const s of Vl(i))s&&n({u:s.u,z:s.z,r:s.r*1.15,depth:s.depth,well:!0},s.r*1.15);return dr.set(i.k,e),dr.size>512&&dr.clear(),e}function N_(i,t){const e=Math.floor(t/wn),n=Math.floor(t/ml);let s=0;for(let o=e-3;o<=e+1;o++){const r=si(o);if(!r||t<r.z-200||t>r.z+r.reach+200)continue;const a=U_(r).get(n);if(a)for(const c of a){const l=i-c.u,h=t-c.z;if(l>c.r||l<-c.r||h>c.r||h<-c.r)continue;const f=Math.sqrt(l*l+h*h);if(!(f>c.r))if(c.well){const d=1-f/c.r,p=Math.min(1,d/.09);s-=c.depth*(p*p*(3-2*p))}else{const d=1-f/c.r,p=d*d*(3-2*d);if(s-=c.depth*p*p,h>0){const m=c.r/1.7*1.15,v=Math.max(0,1-Math.abs(d-.24)/.26),g=Math.min(1,h/(c.r*.5)),u=Math.abs(i-re(t)),x=Math.max(0,Math.min(1,1-(u-tn)/26));s+=m*v*v*g*(1-x)}}}}return s}function F_(i,t,e){const n=eo.get(i.k);if(n)return n;const s=[],o=Ro(i),r=Vl(i);for(let a=0;a<o.length;a++){const c=o[a],l=r[a],h=c.r*1.25;let f=c.u,d=c.z;{let M=1/0,E=c.u,b=c.z;for(let w=0;w<8;w++){const T=w/8*Math.PI*2;for(let y=0;y<=h;y+=h/3){const S=c.u+Math.cos(T)*y,A=c.z+Math.sin(T)*y,R=t(e(S,A),A);R<M&&(M=R,E=S,b=A)}}f=c.u+(E-c.u)*.7,d=c.z+(b-c.z)*.7}let p=1/0;for(let M=0;M<20;M++){const E=M/20*Math.PI*2,b=Math.cos(E),w=Math.sin(E);let T=-1/0;for(let y=6;y<=Ya;y+=7){const S=f+b*y,A=d+w*y,R=t(e(S,A),A);if(R>T)T=R;else if(R<T-4)break}T<p&&(p=T)}let m=1/0;for(let M=0;M<16;M++){const E=M/16*Math.PI*2;for(const b of[.12,.34,.55,.74,.9]){const w=f+Math.cos(E)*h*b,T=d+Math.sin(E)*h*b;if(l&&Math.hypot(w-l.u,T-l.z)<l.r*1.4)continue;const y=t(e(w,T),T);y<m&&(m=y)}}isFinite(m)||(m=t(e(f,d),d));const v=p-2.4,g=v-m;if(g<1.2)continue;const u=[];for(let M=0;M<16;M++){const E=M/16*Math.PI*2;let b=Ya;for(let w=4;w<=Ya;w+=5){const T=f+Math.cos(E)*w,y=d+Math.sin(E)*w;if(t(e(T,y),y)>v){b=w-1.5;break}}u.push(b)}u.sort((M,E)=>M-E);const x=u[Math.floor(u.length/2)];if(x<6)continue;let _=0;for(let M=0;M<12;M++){const E=M/12*Math.PI*2,b=f+Math.cos(E)*x*1.3,w=d+Math.sin(E)*x*1.3;_+=Math.max(0,t(e(b,w),w)-v)}_/=12,s.push({u:f,z:d,y:v,r:x,depth:g,wall:_})}for(const a of r){if(!a)continue;const c=t(e(a.u,a.z),a.z);let l=1/0;for(let f=0;f<12;f++){const d=f/12*Math.PI*2,p=a.u+Math.cos(d)*a.r*.8,m=a.z+Math.sin(d)*a.r*.8,v=t(e(p,m),m);v<l&&(l=v)}const h=Math.min(l-.3,c+5);h-c<.8||s.push({u:a.u,z:a.z,y:h,r:a.r*.85,depth:h-c})}if(eo.set(i.k,s),eo.size>512){let a=256;for(const c of eo.keys()){if(a--<=0)break;eo.delete(c)}}return s}function Rs(i,t,e,n=400){const s=Math.floor(i/wn),o=[],r=Math.ceil(n/wn)+2;for(let a=s-r;a<=s+1;a++){const c=si(a);if(c)for(const l of F_(c,t,e))Math.abs(l.z-i)<n&&o.push(l)}return o}const no=new Map;function z_(i){const t=Ro(i);if(!t.length)return[];const e=re(i.z),n=i.u>e?-1:1,s=[{u:i.u+n*i.coneR*.8,z:i.z+i.coneR*.22}];for(const r of t)s.push({u:r.u,z:r.z});const o=s[s.length-1];return s.push({u:o.u+(re(o.z+160)-o.u)*.3,z:o.z+160}),s.filter(r=>r.z>=Hd-60)}const Za=11;function Wl(i,t,e){const n=no.get(i.k);if(n)return n;const s=z_(i),o=[];if(s.length<2)return no.set(i.k,o),o;const r=[];for(let S=0;S<s.length-1;S++){const A=s[S],R=s[S+1],P=Math.max(1,Math.round((R.z-A.z)/Za));for(let U=0;U<P;U++){const I=U/P;r.push({u:A.u+(R.u-A.u)*I,z:A.z+(R.z-A.z)*I})}}r.push(s[s.length-1]);const a=[];for(let S=0;S<r.length;S++){let A=0,R=0;for(let P=-3;P<=3;P++){const U=S+P;U<0||U>=r.length||(A+=r[U].u,R++)}a.push({u:A/R,z:r[S].z})}const c=[],l=[];for(let S=0;S<a.length;S++){const A=a[S],R=7+(rt(A.z*.013-i.ph,6.6)*.5+.5)*9,P=S>0?A.z-a[S-1].z:1,U=S>0?-(A.u-a[S-1].u):0,I=Math.hypot(P,U)||1;let N=-1/0;for(const G of[-.55,-.25,0,.25,.55]){const z=A.u+P/I*G*R,V=A.z+U/I*G*R;N=Math.max(N,t(e(z,V),V))}c.push(N+.7),l.push(t(e(A.u,A.z),A.z))}const h=5,f=new Array(a.length),d=new Array(a.length).fill(!1);for(let S=0;S<2;S++){let A=-1/0;for(let R=a.length-1;R>=0;R--){if(d[R]){A=-1/0,f[R]=c[R];continue}A=Math.max(c[R],A),f[R]=A}for(let R=0;R<a.length;R++)f[R]-l[R]>h&&(d[R]=!0)}const p=(S,A)=>rt(i.k*12.9+S*3.77+A,A*5.3+1.7)*.5+.5,m=[];{let S=0,A=0;for(;S<1&&A<24;){const R=.09+p(A,2.2)*.18;m.push({c:S+R*.5,len:R,amp:.62+p(A,7.1)**1.3*1.6}),S+=R*(.55+p(A,9.4)*.5),A++}}const v=S=>{let A=0;for(const R of m){const P=(S-R.c)/(R.len*.62);A=Math.max(A,R.amp*Math.exp(-P*P))}return A},g=.68+p(0,15.5)*.32,u=.95+p(0,3.3)*.95,x=Math.max(1,a.length-1),_=1+Math.floor(p(0,41.3)*2.6),M=[];for(let S=0;S<_;S++)M.push({c:.2+p(S,47.9)*.6,half:.09+p(S,53.1)*.13,mul:2.2+p(S,59.7)*2.2});const E=S=>{let A=1;for(const R of M){const P=Math.abs(S-R.c)/R.half;if(P>=1)continue;const U=1-P*P;A=Math.max(A,1+(R.mul-1)*U*U)}return A},b=S=>{const A=S/x;if(A>g)return 0;const R=a[S],P=.72+(rt(R.z*.22+i.ph*7,4.4)*.5+.5)*.62;return(10+p(S,1.9)*6)*v(A)*P*u*E(A)},w=(S,A,R,P,U,I)=>{const N=t(e(S,A),A),G=Math.max(.8,R-N),z=ot=>{const wt=.68+(rt(A*.18+ot*21.3+i.ph*5,8.8)*.5+.5)*.75,W=P*wt;let et=W;for(const tt of[.45,.72,1]){const st=W*tt;if(t(e(S+U*ot*st,A+I*ot*st),A+I*ot*st)>R-.15){et=W*Math.max(.12,tt-.27);break}}return Math.max(.8,et)},V=z(-1),Y=z(1),j=Math.max(2.5,Math.min(9,G*2.2));o.push({u:S,z:A,y:R,w:(V+Y)*.5,wl:V,wr:Y,al:j,ar:j,t:G})},T=(S=0,A=0)=>{o.push({u:S,z:A,y:0,w:0,wl:0,wr:0,al:0,ar:0,t:-1})};for(let S=0;S<a.length;S++){const A=a[S],R=b(S);if(d[S]||R<1.2||Se(A.z)<.85){T(A.u,A.z);continue}const P=a[Math.max(0,S-1)],U=a[Math.min(a.length-1,S+1)],I=U.u-P.u,N=U.z-P.z,G=Math.hypot(I,N)||1;w(A.u,A.z,f[S],R,N/G,-I/G)}const y=2+Math.floor(p(0,21.7)*3.9);for(let S=0;S<y;S++){const A=.12+p(S,31.1)*(g-.2),R=Math.max(1,Math.min(a.length-2,Math.round(A*x)));if(d[R]||b(R)<1.5)continue;const P=p(S,44.3)>.5?1:-1,U=3+Math.floor(p(S,55.9)*6),I=a[R],N=a[R-1],G=a[R+1],z=G.u-N.u,V=G.z-N.z,Y=Math.hypot(z,V)||1;let j=(30+p(S,66.7)*35)*(Math.PI/180)*P,ot=I.u,wt=I.z,W=f[R];const et=b(R)*(.45+p(S,77.3)*.4);T(I.u,I.z);for(let tt=0;tt<U;tt++){const st=Math.cos(j),pt=Math.sin(j),Tt=z/Y*st-V/Y*pt,Ut=z/Y*pt+V/Y*st;if(ot+=Tt*Za,wt+=Ut*Za,Se(wt)<.85)break;const ie=t(e(ot,wt),wt);if(W=Math.min(W-.25,ie+1.3),W<ie-1)break;const qt=1-tt/U;w(ot,wt,W,Math.max(1.2,et*(.35+qt*.75)),Ut,-Tt),j*=.72}T(ot,wt)}for(let S=0;S<o.length;S++){if(o[S].t<0)continue;let A=0;for(;S-A-1>=0&&o[S-A-1].t>0&&A<3;)A++;let R=0;for(;S+R+1<o.length&&o[S+R+1].t>0&&R<3;)R++;const P=Math.min(1,Math.min(A,R)/3+.15);P<1&&(o[S].wl*=P,o[S].wr*=P,o[S].t*=.35+P*.65)}return no.set(i.k,o),no.size>512&&no.clear(),o}function Gd(i,t,e){let n=0,s=0,o=0;const r=.55+(rt(i*.026+4.1,t*.026)*.5+.5)*1.05,a=.82+(rt(i*.13-7.7,t*.13)*.5+.5)*.4,c=r*a;for(const l of e){const h=t-l.z;if(h>60||h<-60)continue;const f=i-l.u,d=(f<0?l.wl+l.al*.5:l.wr+l.ar*.5)*c+1.5;if(f>d||f<-d)continue;const p=Math.sqrt(f*f+h*h);if(p>d)continue;const m=1-p/d,v=m*m*(3-2*m);n+=v*l.y,s+=v*l.t,o+=v}return o<=1e-4?{y:0,th:0,cover:0}:{y:n/o,th:s/o,cover:Math.min(1,o)}}function Vd(i,t,e,n){const s=Gd(i,t,n);if(s.cover<=.02)return null;const o=Math.min(Math.max(0,s.y-e),s.th)*s.cover;return o>.02?e+o:null}const pr=new Map;function Xl(i,t,e){const n=pr.get(i.k);if(n)return n;const s=Wl(i,t,e).filter(o=>o.t>0);return pr.set(i.k,s),pr.size>512&&pr.clear(),s}function O_(i,t,e,n){const s=e(n(i,t),t),o=Math.floor(t/wn);let r=null;for(let a=o-3;a<=o+1;a++){const c=si(a);if(!c||t<c.z-100||t>c.z+c.reach+300)continue;const l=Xl(c,e,n);if(l.length<2)continue;const h=Vd(i,t,s,l);h!==null&&(r===null||h>r)&&(r=h)}return r}function B_(i,t,e,n){const s=e(n(i,t),t);let o=null;const r=Math.floor(t/wn);for(let a=r-3;a<=r+1;a++){const c=si(a);if(!c||t<c.z-100||t>c.z+c.reach+300)continue;const l=Xl(c,e,n);if(l.length<2)continue;const h=Vd(i,t,s,l);h!==null&&(o===null||h>o)&&(o=h)}for(const a of Rs(t,e,n)){const c=i-a.u,l=t-a.z;if(c*c+l*l>a.r*a.r)continue;const h=a.y-s;h>0&&h<=a.depth+1.5&&(o===null||a.y>o)&&(o=a.y)}return o}function Ka(i,t,e,n){const s=O_(i,t,e,n);if(s!==null)return s;for(const o of Rs(t,e,n)){const r=i-o.u,a=t-o.z;if(r*r+a*a>o.r*o.r)continue;const c=e(n(i,t),t),l=o.y-c;if(l>0&&l<=o.depth+1.5)return o.y}return null}function k_(i,t,e,n){let s=0;const o=Math.floor(t/wn);for(let r=o-3;r<=o+1;r++){const a=si(r);if(!a)continue;const c=H_(a,e,n);for(let l=-1;l<=1;l++){const h=c.get(Math.floor(t/Wd)+l);if(h)for(const f of h){const d=i-f.u,p=t-f.z,m=d<0?f.wl+f.al:f.wr+f.ar,v=m+26,g=d*d+p*p;if(g>v*v)continue;const u=Math.sqrt(g),x=1-Math.max(0,u-m)/26;x>s&&(s=x)}}for(const l of Ro(a)){const h=l.r*1.25;if(Math.abs(l.z-t)>h+34)continue;const f=Math.hypot(i-l.u,t-l.z);if(f>h+34)continue;const d=1-Math.max(0,f-h)/34;d>s&&(s=d)}for(const l of Vl(a)){if(!l)continue;const h=l.r*1.15;if(Math.abs(l.z-t)>h+30)continue;const f=Math.hypot(i-l.u,t-l.z);if(f>h+30)continue;const d=1-Math.max(0,f-h)/30;d>s&&(s=d)}}return s>1?1:s}const Wd=40,mr=new Map;function H_(i,t,e){const n=mr.get(i.k);if(n)return n;const s=new Map;for(const o of Wl(i,t,e)){if(o.t<0)continue;const r=Math.floor(o.z/Wd),a=s.get(r);a?a.push(o):s.set(r,[o])}return mr.set(i.k,s),mr.size>512&&mr.clear(),s}function Au(i,t,e,n){let s=0;for(const o of Rs(t,e,n)){if(Math.hypot(i-o.u,t-o.z)>o.r*1.5)continue;const c=e(n(i,t),t)-o.y;if(c<-.5||c>6)continue;const l=1-Math.max(0,c)/6;l>s&&(s=l)}return s}const Mi=120,go=1.5,Ru=1.15,ql=5.6,gr=new Map;function Xd(i,t){const e=i*100003+t,n=gr.get(e);if(n!==void 0)return n;let s=null;return rt(i*7.7+3.1,t*5.3-8.8)>=.15&&(s={u:(i+.5)*Mi+rt(i*3.3,t*9.1)*.5*Mi*.7,z:(t+.5)*Mi+rt(i*11.7,t*2.9)*.5*Mi*.7,r:9+(rt(i*13.1,t*6.6)*.5+.5)*6,phase:(rt(i*17.3,t*4.2)*.5+.5)*ql}),gr.set(e,s),gr.size>4096&&gr.clear(),s}function qd(i,t){const e=Math.floor(i/Mi),n=Math.floor(t/Mi),s=[];for(let o=e-1;o<=e+1;o++)for(let r=n-1;r<=n+1;r++){const a=Xd(o,r);a&&s.push(a)}return s}function Yd(i,t){const e=(t+i.phase)%ql;if(e<go||e>go+Ru)return 0;const n=(e-go)/Ru;return Math.sin(Math.PI*n)**.6}function G_(i,t){const e=(t+i.phase)%ql;return e>go?0:(e/go)**1.6}function V_(i,t){let e=0;const n=Math.floor(i/Mi),s=Math.floor(t/Mi);for(let o=n-1;o<=n+1;o++)for(let r=s-1;r<=s+1;r++){const a=Xd(o,r);if(!a)continue;const c=Math.hypot(i-a.u,t-a.z)/(a.r*1.7);c<1&&(e=Math.max(e,1-c))}return e}function W_(i){return 1-Math.pow(1-i,2)}const Kr=[],wo=[];function Zd(){return Kr}function Kd(){return wo}function X_(i,t,e,n,s,o,r,a=!1){Kr.length>120||Kr.push({x:i,y:t,z:e,vx:0,vy:0,vz:0,alive:!0,sx:i,sy:t,sz:e,tx:n,ty:o,tz:s,hitY:o,arc:Math.min(240,40+Math.hypot(n-i,s-e)*.07),dur:r,t:0,eta:r,r:1+Math.pow(Math.random(),2.4)*4.6,seed:Math.random()*100,aimed:a})}function q_(i,t,e){for(const n of Kr){if(!n.alive)continue;const s=n.x-i,o=n.y-(t+.9),r=n.z-e,a=n.r+2.6;if(s*s+o*o+r*r<a*a)return jd(n,1.4),!0}return!1}function Y_(i,t){for(const e of wo){const n=e.x-i,s=e.z-t;if(n*n+s*s<e.r*4.6*(e.r*4.6))return!0}return!1}function jd(i,t=1){i.alive=!1,wo.length<24&&wo.push({x:i.x,y:i.y,z:i.z,r:i.r*t,aimed:i.aimed})}const Z_=`
uniform float uTime;
varying vec2 vWorld;
varying float vHot;
attribute float aHot;
float wh(vec2 p){return fract(sin(dot(floor(p),vec2(127.1,311.7)))*43758.5453);}
float wn(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.0-2.0*f);
  return mix(mix(wh(i),wh(i+vec2(1,0)),f.x),mix(wh(i+vec2(0,1)),wh(i+vec2(1,1)),f.x),f.y);}
void main() {
  vec4 wp = modelMatrix * vec4(position, 1.0);
  // ★ ПО РАСПЛАВУ ИДЁТ ВОЛНА. Плоское зеркало читается стеклом; у жидкости
  // поверхность дышит. Волна мелкая (десятки сантиметров) и медленная, идёт
  // вниз по склону — физика считает поверхность аналитически и её не видит.
  float w1 = wn(wp.xz * 0.06 + vec2(0.0, -uTime * 0.35));
  float w2 = wn(wp.xz * 0.19 + vec2(0.0, -uTime * 0.75));
  wp.y += ((w1 - 0.5) * 0.34 + (w2 - 0.5) * 0.16) * vHot;
  vWorld = wp.xz;
  vHot = aHot;
  gl_Position = projectionMatrix * viewMatrix * wp;
}
`,K_=`
precision highp float;
uniform float uTime;
uniform vec3 uFogColor;
uniform float uFogNear;
uniform float uFogFar;
// ★ ФОРМА ЯЗЫКА СЧИТАЕТСЯ ЗДЕСЬ, А НЕ БЕРЁТСЯ ИЗ СЕТКИ.
// Раньше принадлежность к потоку интерполировалась между узлами сетки, и
// любая кромка получалась ломаной из отрезков — жидкость так выглядеть не
// может. Теперь в шейдер передана сама осевая линия (мировой X и полуширина
// на каждые несколько метров по Z), и граница считается на каждый пиксель:
// она гладкая и кривая независимо от того, какой крупности геометрия.
varying vec2 vWorld;
varying float vHot;

float hash(vec2 p) {
  p = floor(p);
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1, 0)), f.x),
             mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), f.x), f.y);
}
float fbm(vec2 p) {
  return noise(p) * 0.6 + noise(p * 2.3 + 5.0) * 0.28 + noise(p * 5.1 - 3.0) * 0.12;
}

void main() {
  // ФОРМА ПЯТНА ЗАДАНА ГЕОМЕТРИЕЙ: урез идёт по горизонтали рельефа, то есть
  // по контуру чаши — он гладкий и кривой по построению, дорисовывать нечего.
  float edge = smoothstep(0.0, 0.14, vHot);
  if (edge <= 0.01) discard;
  float vHotP = vHot;

  // ★ КОРКА — ЭТО ПЛИТЫ, А НЕ ВОЛНЫ. Шум fbm по своей природе даёт плавные
  // полосы, и расплав выглядел нарисованным волнами. Настоящая корка
  // разбита на ПЛИТЫ, между которыми светятся щели, поэтому здесь ячеистый
  // шум: точки-центры плит на решётке, а трещина — там, где расстояния до
  // двух ближайших центров сравниваются.
  float slow = uTime * 7.0;
  float fast = uTime * 20.0;
  // поперёк потока координата сжата: плиты вытянуты вдоль склона
  vec2 base = vec2(vWorld.x * 0.13, (vWorld.y + slow) * 0.045);
  // лёгкое искажение, чтобы решётка не читалась решёткой
  vec2 w = vec2(fbm(base * 0.6 + 3.0), fbm(base * 0.6 - 7.0)) - 0.5;
  vec2 p = base + w * 0.9;

  vec2 ip = floor(p);
  vec2 fp = fract(p);
  float d1 = 8.0;
  float d2 = 8.0;
  for (int j = -1; j <= 1; j++) {
    for (int i = -1; i <= 1; i++) {
      vec2 g = vec2(float(i), float(j));
      vec2 o = vec2(hash(ip + g + 0.5), hash(ip + g + 17.3));
      float dist = length(g + o - fp);
      if (dist < d1) { d2 = d1; d1 = dist; }
      else if (dist < d2) { d2 = dist; }
    }
  }
  // щель тем ярче, чем ближе точка к границе двух плит
  float seam = 1.0 - smoothstep(0.0, 0.16, d2 - d1);

  // вторая, более мелкая и БЫСТРАЯ сеть — по ней и виден ход потока
  vec2 p2 = vec2(vWorld.x * 0.4, (vWorld.y + fast) * 0.14);
  vec2 ip2 = floor(p2);
  vec2 fp2 = fract(p2);
  float e1 = 8.0;
  float e2 = 8.0;
  for (int j = -1; j <= 1; j++) {
    for (int i = -1; i <= 1; i++) {
      vec2 g = vec2(float(i), float(j));
      vec2 o = vec2(hash(ip2 + g + 5.1), hash(ip2 + g + 91.7));
      float dist = length(g + o - fp2);
      if (dist < e1) { e2 = e1; e1 = dist; }
      else if (dist < e2) { e2 = dist; }
    }
  }
  float fine = (1.0 - smoothstep(0.0, 0.22, e2 - e1)) * 0.5;

  // ★ РАСПЛАВ — ЭТО УЗКАЯ ЖИЛА В ЧЁРНОМ ПОЛЕ, А НЕ ОРАНЖЕВОЕ ПОЛОТНО.
  // На снимках потока девять десятых площади занимает почти чёрная корка, и
  // светится только узкий канал по стрежню да тонкая сеть щелей между плитами.
  // Прежняя версия жгла всё полотно — от этого и «слоп»: яркость без формы.
  // Ядро: раскалённый канал по середине языка, с рваным краем от щелей.
  // ★ БУЛЬКАНЬЕ. Расплав не стоит ровно: по нему всходят и лопаются пузыри.
  // Редкие ячейки вспыхивают каждая по своей фазе — центр разгорается и гаснет.
  vec2 bp = vWorld * 0.055;
  vec2 bi = floor(bp);
  vec2 bf = fract(bp) - 0.5;
  float bph = hash(bi) * 6.283;
  float pulse = max(0.0, sin(uTime * 1.6 + bph));
  float bub = pulse * pulse * smoothstep(0.40, 0.04, length(bf)) * vHotP;

  float core = smoothstep(0.55, 0.96, vHotP + seam * 0.12 - fine * 0.05 + bub * 0.5);
  // Щели: тонкие и ТУСКЛЫЕ, тёмно-красные — они не должны спорить с ядром.
  float cracks = max(seam * 0.5, fine) * (0.25 + 0.35 * vHotP);

  vec3 crust = vec3(0.035, 0.026, 0.03) * (0.6 + 0.8 * fbm(p * 3.0));
  vec3 emberDull = vec3(0.5, 0.045, 0.012);
  vec3 emberHot = vec3(1.6, 0.22, 0.02);
  vec3 flowMid = vec3(3.0, 0.75, 0.06);
  vec3 flowWhite = vec3(4.6, 2.6, 0.7);

  float d = length(vWorld - cameraPosition.xz);
  // ★ ВДАЛИ РАСПЛАВ НЕ БЕЛЕЕТ. На дистанции лента сжимается до нескольких
  // пикселей, в них остаётся только самое яркое ядро, и bloom растирает его в
  // белые кляксы — лава читалась снегом. Поэтому добела светится лишь ближний
  // расплав, дальний остаётся насыщенно-оранжевым.
  float far = smoothstep(110.0, 420.0, d);
  vec3 hotTop = mix(flowWhite, flowMid * 1.15, far);

  vec3 col = crust;
  // сначала тлеющие щели по корке
  col = mix(col, emberDull, smoothstep(0.05, 0.4, cracks));
  col = mix(col, emberHot, smoothstep(0.35, 0.8, cracks));
  // затем сам канал — он и есть яркое пятно кадра
  col = mix(col, flowMid, smoothstep(0.0, 0.55, core));
  col = mix(col, hotTop, smoothstep(0.55, 1.0, core));
  col *= mix(1.0, 0.78, far);

  float f = clamp((d - uFogNear) / (uFogFar - uFogNear), 0.0, 1.0);
  // в дымку уходит тёплой: расплав подсвечивает пепел над собой
  vec3 fogged = uFogColor * vec3(1.6, 1.1, 0.85);
  gl_FragColor = vec4(mix(col, fogged, f * 0.9), edge);
}
`;function j_(){return new me({vertexShader:Z_,fragmentShader:K_,uniforms:{uTime:{value:0},uFogColor:{value:new Q(2759708)},uFogNear:{value:300},uFogFar:{value:2100}},fog:!1,transparent:!0,depthWrite:!0,side:we})}class Mn{constructor(){this.group=new ee,this.built=new Map,this.active=null,this.pos=new Float32Array(Mn.N*3),this.vel=new Float32Array(Mn.N*3),this.age=new Float32Array(Mn.N),this.life=new Float32Array(Mn.N),this.size=new Float32Array(Mn.N),this.col=new Float32Array(Mn.N*3),this.geo=new Gt,this.light=new yi(16742954,0,2600,1.4),this.coneMat=new Ue({vertexColors:!0,flatShading:!0}),this.craterMat=new Ze({color:new Q(2.6,.6,.06)}),this.steamGeo=new Gt,this.steamPts=null,this.stPos=new Float32Array(900*3),this.stCol=new Float32Array(900*3),this.bombTimer=0;const t=Mn.N;this.lpos=new Float32Array(t*6),this.lcol=new Float32Array(t*6),this.geo.setAttribute("position",new Pt(this.lpos,3)),this.geo.setAttribute("color",new Pt(this.lcol,3));for(let e=0;e<t;e++)this.age[e]=1e9;this.line=new zl(this.geo,new ea({vertexColors:!0,transparent:!0,depthWrite:!1,fog:!1})),this.line.frustumCulled=!1,this.group.add(this.line),this.group.add(this.light)}static{this.N=2600}build(t,e,n,s,o){const r=s??44,a=o??13,c=n(t.u,t.z),l=e(c,t.z),h=t.coneR*.13,f=[],d=[],p=new Q(2366754),m=new Q(5919064),v=new Q(9055e3),g=new Q(3,.7,.08),u=new Q,x=(R,P)=>{const U=t.coneR*Math.pow(1-R,.62)+h*R,I=rt(Math.cos(P)*6.5+t.ph,Math.sin(P)*6.5)*.5+.5,N=rt(Math.cos(P)*2.1-t.ph,Math.sin(P)*2.1)*.5+.5;return U*(.86+N*.24)*(1-I*.09*(1-R))},_=(R,P)=>{const U=t.coneH*Math.pow(R,1.12),I=rt(Math.cos(P)*3.3+t.ph*2,Math.sin(P)*3.3)*.5+.5;return U*(.96+I*.08)};let M=l;for(let R=0;R<48;R++){const P=R/48*Math.PI*2;for(const U of[.55,.8,1]){const I=x(0,P)*U,N=t.u+Math.cos(P)*I,G=t.z+Math.sin(P)*I,z=e(n(N,G),G);z<M&&(M=z)}}const E=M-l-Math.max(60,t.coneR*.45),b=(t.coneH-E)/t.coneH,w=(R,P)=>{const U=x(R,P);return[Math.cos(P)*U,E+_(R,P)*b-12,Math.sin(P)*U]};for(let R=0;R<a;R++){const P=R/a,U=(R+1)/a;for(let I=0;I<r;I++){const N=I/r*Math.PI*2,G=(I+1)/r*Math.PI*2,z=w(P,N),V=w(P,G),Y=w(U,N),j=w(U,G);f.push(...z,...V,...j),f.push(...z,...j,...Y);const ot=(P+U)/2,wt=rt(ot*9+t.ph,Math.cos(N)*1.5)*.5+.5;u.copy(p).lerp(m,wt*.55*(.35+ot*.65)),ot>.86&&u.lerp(v,(ot-.86)/.14);const W=1-Math.abs(rt(Math.cos(N)*14+t.ph*3,Math.sin(N)*14)),et=Math.max(0,(W-.965)/.035)*Math.pow(ot,2.2);et>.01&&u.lerp(g,Math.min(1,et));for(let tt=0;tt<6;tt++)d.push(u.r,u.g,u.b)}}for(let R=0;R<r;R++){const P=R/r*Math.PI*2,U=(R+1)/r*Math.PI*2,I=w(0,P),N=w(0,U);f.push(I[0],I[1],I[2],N[0],N[1],N[2],N[0],-140,N[2]),f.push(I[0],I[1],I[2],N[0],-140,N[2],I[0],-140,I[2]);for(let G=0;G<6;G++)d.push(p.r,p.g,p.b)}const T=new Gt;T.setAttribute("position",new kt(f,3)),T.setAttribute("color",new kt(d,3)),T.computeVertexNormals();const y=new ee;y.add(new dt(T,this.coneMat));const S=new ia(h*.8,20);S.rotateX(-Math.PI/2);const A=new dt(S,this.craterMat);return A.position.y=t.coneH*.93-12,y.add(A),y.position.set(c,l,t.z),this.group.add(y),y}update(t,e,n,s,o){const r=o(t)>.01;if(this.line.visible=r,this.light.visible=r,!r){for(const[m,v]of this.built)this.group.remove(v),this.built.delete(m);return}const a=Math.floor(t/wn);for(let m=a-2;m<=a+9;m++){const v=si(m);if(!(!v||this.built.has(m))){this.built.set(m,this.build(v,n,s));break}}for(const[m,v]of this.built)m>=a-2&&m<=a+9||(this.group.remove(v),this.built.delete(m));let c=null;for(let m=a-1;m<=a+3;m++){const v=si(m);v&&(!c||Math.abs(v.z-t)<Math.abs(c.z-t))&&(c=v)}if(this.active=c,!c)return;const l=s(c.u,c.z),h=n(l,c.z)+c.coneH*.93;this.light.position.set(l,h+c.coneH*.1,c.z),this.light.intensity=12+Math.sin(performance.now()*.0016)*4;const f=Mn.N,d=9.8,p=n(l,c.z)-30;for(let m=0;m<f;m++){this.age[m]+=e;const v=this.age[m]>.4&&this.pos[m*3+1]<p;if(this.age[m]>=this.life[m]||v){const b=Math.random()*Math.PI*2,w=Math.acos(1-Math.random()*.62),T=55+Math.random()*95,y=Math.sin(w)*T;this.pos[m*3]=l+(Math.random()-.5)*c.coneR*.22,this.pos[m*3+1]=h+Math.random()*12,this.pos[m*3+2]=c.z+(Math.random()-.5)*c.coneR*.22,this.vel[m*3]=Math.cos(b)*y,this.vel[m*3+1]=Math.cos(w)*T,this.vel[m*3+2]=Math.sin(b)*y,this.age[m]=0,this.life[m]=6+Math.random()*9,this.lpos[m*6+3]=this.pos[m*3],this.lpos[m*6+4]=this.pos[m*3+1],this.lpos[m*6+5]=this.pos[m*3+2];continue}this.vel[m*3+1]-=d*e;const g=1-Math.min(.9,.35*e*(this.age[m]/this.life[m])*3);this.vel[m*3]*=g,this.vel[m*3+2]*=g,this.pos[m*3]+=this.vel[m*3]*e,this.pos[m*3+1]+=this.vel[m*3+1]*e,this.pos[m*3+2]+=this.vel[m*3+2]*e;const u=this.age[m]/this.life[m];let x,_,M;if(u<.12)x=4.2,_=3.4,M=1.8;else if(u<.3){const b=(u-.12)/.18;x=4.2-b*1,_=3.4-b*1.9,M=1.8-b*1.5}else if(u<.62){const b=(u-.3)/.32;x=3.2-b*2.3,_=1.5-b*1.25,M=.3-b*.22}else{const b=Math.min(1,(u-.62)/.38);x=.9-b*.62,_=.25+b*.03,M=.08+b*.2}this.col[m*3]=x,this.col[m*3+1]=_,this.col[m*3+2]=M,this.size[m]=u<.3?3.4-u*4:Math.max(.2,2.2-u*2);const E=u>.75?Math.max(0,1-(u-.75)/.25):1;this.col[m*3]*=E,this.col[m*3+1]*=E,this.col[m*3+2]*=E}for(let m=0;m<f;m++){const v=this.vel[m*3],g=this.vel[m*3+1],u=this.vel[m*3+2],x=.075,_=this.pos[m*3],M=this.pos[m*3+1],E=this.pos[m*3+2];this.lpos[m*6]=_,this.lpos[m*6+1]=M,this.lpos[m*6+2]=E,this.lpos[m*6+3]=_-v*x,this.lpos[m*6+4]=M-g*x,this.lpos[m*6+5]=E-u*x;const b=this.col[m*3],w=this.col[m*3+1],T=this.col[m*3+2];this.lcol[m*6]=b,this.lcol[m*6+1]=w,this.lcol[m*6+2]=T,this.lcol[m*6+3]=b*.35,this.lcol[m*6+4]=w*.3,this.lcol[m*6+5]=T*.3}this.geo.attributes.position.needsUpdate=!0,this.geo.attributes.color.needsUpdate=!0}static{this.ST=900}updateSteam(t,e,n,s,o,r){if(this.steamPts||(this.steamGeo.setAttribute("position",new Pt(this.stPos,3)),this.steamGeo.setAttribute("color",new Pt(this.stCol,3)),this.steamPts=new ii(this.steamGeo,new na({vertexColors:!0,size:2.6,sizeAttenuation:!0,transparent:!0,opacity:.75,depthWrite:!1})),this.steamPts.frustumCulled=!1,this.group.add(this.steamPts)),this.steamPts.visible=r,!r)return;const a=Mn.ST;let c=0;const l=[];for(let h=-1;h<=3;h++)for(const f of qd(e,t+h*110))l.some(d=>d.u===f.u&&d.z===f.z)||l.push(f);for(const h of l){const f=Yd(h,n),d=G_(h,n),p=o(h.u,h.z),m=s(p,h.z);if(f<=.02){if(d>.05){const g=Math.min(14,2+Math.floor(d*12)),u=.4+d*1.6;for(let x=0;x<g&&c<a;x++){const _=Math.random()*Math.PI*2,M=h.r*(.1+Math.random()*.35);this.stPos[c*3]=p+Math.cos(_)*M,this.stPos[c*3+1]=m+.4+Math.random()*(1.2+d*3.5)+Math.sin(n*22+x)*u*.3,this.stPos[c*3+2]=h.z+Math.sin(_)*M;const E=.5+d*.45;this.stCol[c*3]=E,this.stCol[c*3+1]=E*.95,this.stCol[c*3+2]=E*.9,c++}}continue}const v=Math.min(60,Math.floor(26*f));for(let g=0;g<v&&c<a;g++){const u=g/Math.max(1,v-1),x=h.r*(.18+u*.75)*(.5+Math.random()*.6),_=Math.random()*Math.PI*2;this.stPos[c*3]=p+Math.cos(_)*x,this.stPos[c*3+1]=m+u*(7+f*16),this.stPos[c*3+2]=h.z+Math.sin(_)*x;const M=1.1-u*.45;this.stCol[c*3]=M,this.stCol[c*3+1]=M*.97,this.stCol[c*3+2]=M*.95,c++}}for(let h=c;h<a;h++)this.stPos[h*3+1]=-1e6;this.steamGeo.attributes.position.needsUpdate=!0,this.steamGeo.attributes.color.needsUpdate=!0}get vent(){return this.active}updateBombs(t,e,n,s,o,r,a,c){wo.length=0;const l=Zd();if(!a){l.length=0;return}const h=this.active;h&&.35+.65*(Math.sin(c*.7+h.ph*6.283)*.5+.5),this.bombTimer-=n;for(const f of l){if(!f.alive)continue;const d=f.x,p=f.y,m=f.z;f.t+=n,f.eta=Math.max(0,f.dur-f.t);const v=Math.min(1,f.t/f.dur),g=W_(v);f.x=f.sx+(f.tx-f.sx)*g,f.z=f.sz+(f.tz-f.sz)*g,f.y=f.sy+(f.ty-f.sy)*g+Math.sin(Math.PI*g)*f.arc,f.vx=(f.x-d)/Math.max(1e-4,n),f.vy=(f.y-p)/Math.max(1e-4,n),f.vz=(f.z-m)/Math.max(1e-4,n),(v>=1||f.y<=s(f.x,f.z))&&jd(f)}for(let f=l.length-1;f>=0;f--)l[f].alive||l.splice(f,1)}}const Cu=new dt;let gl=null;function $_(i){gl=i}class he{constructor(){this.group=new ee,this.material=j_(),this.built=new Map,this.lastZ=1e9,this.spPos=new Float32Array(he.SP*3),this.spVel=new Float32Array(he.SP*3),this.spAge=new Float32Array(he.SP),this.spLife=new Float32Array(he.SP),this.spCol=new Float32Array(he.SP*3),this.spGeo=new Gt,this.spPts=null,this.spSize=new Float32Array(he.SP),this.pitLight=new yi(16734738,0,1100,1.5),this.lavaLights=[new yi(16738846,0,260,1.7),new yi(16738846,0,260,1.7)],this.glowBuf=new Float32Array(he.GLOW_N*4),this.plumeGeo=new Gt,this.plumePts=null,this.plP=new Float32Array(he.PLUME*3),this.plV=new Float32Array(he.PLUME*3),this.plAge=new Float32Array(he.PLUME),this.plLife=new Float32Array(he.PLUME),this.plCol=new Float32Array(he.PLUME*3),this.plSize=new Float32Array(he.PLUME),this.plNext=0,this.plAcc=0,this.sparkNodes=[],this.emGeo=new Gt,this.emLine=null,this.emP=new Float32Array(he.EMB*3),this.emV=new Float32Array(he.EMB*3),this.emAge=new Float32Array(he.EMB),this.emLife=new Float32Array(he.EMB),this.emVert=new Float32Array(he.EMB*6),this.emSpots=[],this.emScan=0,this.emCol=new Float32Array(he.EMB*6)}static{this.SP=1600}static{this.GLOW_N=10}static{this.EMB=900}emberBurst(t,e,n,s,o,r){for(let a=0;a<r;a++){let c=-1;for(let v=0;v<he.EMB;v++)if(this.emLife[v]<0){c=v;break}if(c<0)return;this.emP[c*3]=t+(Math.random()-.5)*.5,this.emP[c*3+1]=e+.05+Math.random()*.2,this.emP[c*3+2]=n+(Math.random()-.5)*.5;const l=.2+Math.random()*.34,h=(Math.random()-.5)*(Math.PI/3),f=Math.cos(h),d=Math.sin(h),p=(-s*f+o*d)*l,m=(-s*d-o*f)*l;this.emV[c*3]=p+(Math.random()-.5)*1.8,this.emV[c*3+1]=1.4+Math.random()*3.6,this.emV[c*3+2]=m+(Math.random()-.5)*1.8,this.emAge[c]=0,this.emLife[c]=.35+Math.random()*.6}}static{this.PLUME=760}updatePlumes(t,e,n,s,o){if(!this.plumePts){this.plumeGeo.setAttribute("position",new Pt(this.plP,3)),this.plumeGeo.setAttribute("color",new Pt(this.plCol,3)),this.plumeGeo.setAttribute("size",new Pt(this.plSize,1)),this.plumePts=new ii(this.plumeGeo,new me({vertexShader:`
            attribute float size;
            varying vec3 vCol;
            void main() {
              vCol = color;
              vec4 mv = modelViewMatrix * vec4(position, 1.0);
              gl_PointSize = size * 300.0 / max(1.0, -mv.z);
              gl_Position = projectionMatrix * mv;
            }
          `,fragmentShader:`
            varying vec3 vCol;
            void main() {
              vec2 p = gl_PointCoord * 2.0 - 1.0;
              float r = length(p);
              if (r > 1.0) discard;
              // ★ ОСТЫВШИЙ ЧАД ПЛОТНЕЕ ГОРЯЧЕГО. Верх столба — тёмный дым, и
              // именно он читается на фоне светлого неба; слишком прозрачным
              // его было не видно с трёхсот метров.
              gl_FragColor = vec4(vCol, pow(max(0.0, 1.0 - r), 1.6) * 0.72);
            }
          `,vertexColors:!0,transparent:!0,depthWrite:!1})),this.plumePts.frustumCulled=!1;for(let a=0;a<he.PLUME;a++)this.plLife[a]=-1;this.group.add(this.plumePts)}const r=s.filter(a=>a.depth>8&&a.z>n+160&&a.z<n+1300);if(r.length)for(this.plAcc+=t*30;this.plAcc>=1;){this.plAcc-=1;const a=r[Math.random()*r.length|0],c=this.plNext%he.PLUME;this.plNext++;const l=Math.random()*Math.PI*2,h=Math.sqrt(Math.random())*a.r*.55;this.plP[c*3]=o(a.u,a.z)+Math.cos(l)*h,this.plP[c*3+1]=a.y+2,this.plP[c*3+2]=a.z+Math.sin(l)*h,this.plV[c*3]=(Math.random()-.5)*3,this.plV[c*3+1]=5+Math.random()*4+a.depth*.22,this.plV[c*3+2]=(Math.random()-.5)*3,this.plAge[c]=0,this.plLife[c]=5.5+Math.random()*3.5,this.plSize[c]=4+Math.random()*6}for(let a=0;a<he.PLUME;a++){if(this.plLife[a]<0)continue;if(Math.abs(this.plP[a*3+2]-n)<130){this.plLife[a]=-1,this.plP[a*3+1]=-1e6;continue}this.plAge[a]+=t;const c=this.plAge[a]/this.plLife[a];if(c>=1){this.plLife[a]=-1,this.plP[a*3+1]=-1e6;continue}this.plV[a*3+1]*=1-t*.22,this.plP[a*3]+=this.plV[a*3]*t,this.plP[a*3+1]+=this.plV[a*3+1]*t,this.plP[a*3+2]+=this.plV[a*3+2]*t;const l=Math.max(0,1-c*2.6);this.plCol[a*3]=.3+l*2.4,this.plCol[a*3+1]=.19+l*.7,this.plCol[a*3+2]=.18+l*.12,this.plSize[a]+=t*5.5}this.plumeGeo.attributes.position.needsUpdate=!0,this.plumeGeo.attributes.color.needsUpdate=!0,this.plumeGeo.attributes.size.needsUpdate=!0}updateEmbers(t,e,n,s){if(!this.emLine){this.emGeo.setAttribute("position",new Pt(this.emVert,3)),this.emGeo.setAttribute("color",new Pt(this.emCol,3)),this.emLine=new zl(this.emGeo,new ea({vertexColors:!0,transparent:!0,depthWrite:!1})),this.emLine.frustumCulled=!1,this.group.add(this.emLine);for(let c=0;c<he.EMB;c++)this.emLife[c]=-1}const o=he.EMB;if(this.emScan-=t,this.emScan<=0){this.emScan=.4,this.emSpots.length=0;for(let c=0;c<13;c++)for(let l=0;l<13;l++){const h=e-45+c*7.5+(Math.random()-.5)*6,f=n-25+l*8+(Math.random()-.5)*6;gl&&gl(h,f)>.3&&this.emSpots.push(h,f)}}const r=this.emSpots.length/2,a=r?Math.min(6,1+(Math.random()*r*.5|0)):0;for(let c=0;c<a;c++){const l=Math.random()*r|0,h=this.emSpots[l*2]+(Math.random()-.5)*2.5,f=this.emSpots[l*2+1]+(Math.random()-.5)*2.5;let d=-1;for(let p=0;p<o;p++)if(this.emLife[p]<0){d=p;break}if(d<0)break;this.emP[d*3]=h,this.emP[d*3+1]=s(h,f)+.1,this.emP[d*3+2]=f,this.emV[d*3]=(Math.random()-.5)*1.2,this.emV[d*3+1]=1.6+Math.random()*3.4,this.emV[d*3+2]=(Math.random()-.5)*1.2,this.emAge[d]=0,this.emLife[d]=.7+Math.random()*1.3}for(let c=0;c<o;c++){const l=c*6;if(this.emLife[c]<0){this.emVert[l+1]=-1e6,this.emVert[l+4]=-1e6;continue}if(this.emAge[c]+=t,this.emAge[c]>this.emLife[c]){this.emLife[c]=-1;continue}this.emV[c*3+1]+=1.2*t,this.emV[c*3]*=1-t*1.4,this.emV[c*3+2]*=1-t*1.4,this.emP[c*3]+=this.emV[c*3]*t,this.emP[c*3+1]+=this.emV[c*3+1]*t,this.emP[c*3+2]+=this.emV[c*3+2]*t;const h=1-this.emAge[c]/this.emLife[c],f=.055;this.emVert[l]=this.emP[c*3],this.emVert[l+1]=this.emP[c*3+1],this.emVert[l+2]=this.emP[c*3+2],this.emVert[l+3]=this.emP[c*3]-this.emV[c*3]*f,this.emVert[l+4]=this.emP[c*3+1]-this.emV[c*3+1]*f,this.emVert[l+5]=this.emP[c*3+2]-this.emV[c*3+2]*f;const d=2.6*h;this.emCol[l]=d,this.emCol[l+1]=.75*h*h,this.emCol[l+2]=.18*h*h*h,this.emCol[l+3]=d*.4,this.emCol[l+4]=.3*h*h,this.emCol[l+5]=.06*h*h*h}this.emGeo.attributes.position.needsUpdate=!0,this.emGeo.attributes.color.needsUpdate=!0}get glowData(){return this.glowBuf}updateSparks(t,e,n){if(!this.spPts){this.spGeo.setAttribute("position",new Pt(this.spPos,3)),this.spGeo.setAttribute("color",new Pt(this.spCol,3)),this.spGeo.setAttribute("size",new Pt(this.spSize,1)),this.spPts=new ii(this.spGeo,new me({vertexShader:`
            attribute float size;
            varying vec3 vCol;
            void main() {
              vCol = color;
              vec4 mv = modelViewMatrix * vec4(position, 1.0);
              // ★ НИЖНИЙ ПОРОГ В ПИКСЕЛЯХ. Честный перспективный размер уводит
              // искру в доли пикселя уже на паре сотен метров, и рой над дальней
              // лавой исчезает — а именно он и должен быть виден издалека. Меньше
              // полутора пикселей не даём: вдали это россыпь светлячков.
              gl_PointSize = max(1.6, size * 300.0 / max(1.0, -mv.z));
              gl_Position = projectionMatrix * mv;
            }
          `,fragmentShader:`
            varying vec3 vCol;
            void main() {
              vec2 p = gl_PointCoord * 2.0 - 1.0;
              float r = dot(p, p);
              if (r > 1.0) discard;
              // ядро плотное, к краю сходит мягко
              gl_FragColor = vec4(vCol, (1.0 - r) * 0.9 + (1.0 - r) * (1.0 - r) * 0.6);
            }
          `,vertexColors:!0,transparent:!0,depthWrite:!1,blending:fn})),this.spPts.frustumCulled=!1,this.group.add(this.spPts),this.group.add(this.pitLight);for(let o=0;o<he.SP;o++)this.spLife[o]=-1}const s=he.SP;for(let o=0;o<s;o++){if(this.spLife[o]>0){if(this.spAge[o]+=t,this.spAge[o]>this.spLife[o]){this.spLife[o]=-1,this.spPos[o*3+1]=-1e6;continue}this.spVel[o*3+1]-=12*t,this.spPos[o*3]+=this.spVel[o*3]*t,this.spPos[o*3+1]+=this.spVel[o*3+1]*t,this.spPos[o*3+2]+=this.spVel[o*3+2]*t;const d=1-this.spAge[o]/this.spLife[o];this.spCol[o*3]=3.2*d,this.spCol[o*3+1]=1.1*d*d,this.spCol[o*3+2]=.25*d*d*d;continue}if(Math.random()>.75)continue;let r=0,a=0,c=0,l=0;if(this.sparkNodes.length&&(e.length===0||Math.random()<.6)){const d=this.sparkNodes[Math.random()*this.sparkNodes.length|0],p=Math.random()*Math.PI*2,m=Math.sqrt(Math.random())*Math.min(d.wl,d.wr)*.8;r=d.u+Math.cos(p)*m,a=d.z+Math.sin(p)*m,c=d.y+.25}else if(e.length){const d=e[Math.random()*e.length|0],p=Math.random()*Math.PI*2,m=Math.sqrt(Math.random())*d.r*.85;r=d.u+Math.cos(p)*m,a=d.z+Math.sin(p)*m,c=d.y+.3,l=d.wall??0}else continue;this.spPos[o*3]=n(r,a),this.spPos[o*3+1]=c,this.spPos[o*3+2]=a;const h=l+12,f=Math.sqrt(24*Math.max(6,h))*(.7+Math.random()*.55);this.spVel[o*3]=(Math.random()-.5)*5,this.spVel[o*3+1]=f,this.spVel[o*3+2]=(Math.random()-.5)*5,this.spAge[o]=0,this.spLife[o]=Math.max(.5,f/12)*(.9+Math.random()*.9),this.spSize[o]=.45+Math.pow(Math.random(),2.2)*1.05}this.spGeo.attributes.position.needsUpdate=!0,this.spGeo.attributes.color.needsUpdate=!0,this.spGeo.attributes.size.needsUpdate=!0}update(t,e,n,s,o,r,a){if(this.material.uniforms.uTime.value=n,a(e)<=.01){for(const[m,v]of this.built)this.group.remove(v),v.geometry.dispose(),this.built.delete(m);return}this.sparkNodes.length=0;{const m=Math.floor(e/wn);for(let v=m-3;v<=m+1;v++){const g=si(v);if(g)for(const u of Xl(g,r,o))u.z>e-80&&u.z<e+700&&u.t>.6&&this.sparkNodes.push(u)}}const c=Rs(e+300,r,o,620);this.updateSparks(1/60,c,o),this.updateEmbers(1/60,t,e,r),this.updatePlumes(1/60,t,e,Rs(e+500,r,o,900),o),this.glowBuf.fill(0);{const m=[];for(const g of c){const u=o(g.u,g.z);m.push({x:u,z:g.z,r:Math.max(26,g.r*1.6),s:1,d:Math.hypot(u-t,g.z-e)})}for(const g of this.sparkNodes){const u=o(g.u,g.z);m.push({x:u,z:g.z,r:34,s:.5*g.t,d:Math.hypot(u-t,g.z-e)})}m.sort((g,u)=>g.d-u.d);const v=Math.min(he.GLOW_N,m.length);for(let g=0;g<v;g++){const u=m[g];this.glowBuf[g*4]=u.x,this.glowBuf[g*4+1]=u.z,this.glowBuf[g*4+2]=u.r,this.glowBuf[g*4+3]=u.s}for(let g=0;g<2;g++){const u=m[g];u&&u.d<220?(this.lavaLights[g].position.set(u.x,r(u.x,u.z)+6,u.z),this.lavaLights[g].intensity=22*u.s*Math.max(0,1-u.d/220)):this.lavaLights[g].intensity=0}}let l=null;for(const m of c)(!l||m.depth>l.depth)&&(l=m);l&&l.depth>10?(this.pitLight.position.set(o(l.u,l.z),l.y+12,l.z),this.pitLight.intensity=26,this.pitLight.distance=1100):this.pitLight.intensity=0;const h=new Set,f=[];for(const m of Rs(e+500,r,o,900)){const v=Math.round(m.u)+","+Math.round(m.z);h.add(v),!this.built.has(v)&&f.push({key:v,d:Math.abs(m.z-e),make:()=>this.buildLake(m,r,o)})}const d=Math.floor((e+200)/wn);for(let m=d-3;m<=d+1;m++){const v=si(m);if(!v)continue;const g=Wl(v,r,o);for(let u=0;u<g.length;u+=8){const x=g.slice(u,Math.min(g.length,u+9));if(x.length<2)continue;let _=1/0,M=-1/0;for(const b of x)b.t<0||(b.z<_&&(_=b.z),b.z>M&&(M=b.z));if(_===1/0||M<e-260||_>e+900)continue;const E="f"+v.k+":"+u;h.add(E),!this.built.has(E)&&f.push({key:E,d:Math.abs((_+M)*.5-e),make:()=>this.buildFlow(x,r,o)})}}f.sort((m,v)=>m.d-v.d);const p=performance.now();for(const m of f){const v=m.make();if(v?(this.built.set(m.key,v),this.group.add(v)):this.built.set(m.key,Cu),performance.now()-p>2.5)break}for(const[m,v]of this.built)h.has(m)||(v!==Cu&&(this.group.remove(v),v.geometry.dispose()),this.built.delete(m))}buildFlow(t,e,n){const s=t.filter(w=>w.t>0);if(s.length<2)return null;let o=1/0,r=-1/0,a=1/0,c=-1/0;for(const w of s){const T=Math.max(w.wl+w.al,w.wr+w.ar)+5;w.u-T<o&&(o=w.u-T),w.u+T>r&&(r=w.u+T),w.z-T<a&&(a=w.z-T),w.z+T>c&&(c=w.z+T)}const l=2.2,h=Math.min(96,Math.ceil((r-o)/l)),f=Math.min(96,Math.ceil((c-a)/l)),d=2,p=Math.ceil(h/d)+1,m=Math.ceil(f/d)+1,v=new Float32Array(p*m);for(let w=0;w<m;w++){const T=a+w*d*l;for(let y=0;y<p;y++){const S=o+y*d*l;v[w*p+y]=e(n(S,T),T)}}const g=(w,T)=>{const y=w/d,S=T/d,A=Math.min(p-2,Math.floor(y)),R=Math.min(m-2,Math.floor(S)),P=y-A,U=S-R,I=v[R*p+A],N=v[R*p+A+1],G=v[(R+1)*p+A],z=v[(R+1)*p+A+1];return I+(N-I)*P+(G+(z-G)*P-(I+(N-I)*P))*U},u=(w,T)=>{const y=o+w*l,S=a+T*l,A=g(w,T),R=Gd(y,S,s),P=Math.min(Math.max(0,R.y-A),R.th)*R.cover,U=R.cover>.02&&P>.05;return{x:n(y,S),y:A+P,z:S,wet:U,d:U?Math.min(1,P/Math.max(1,R.th)):0}},x=[],_=[];let M=[];for(let w=0;w<=f;w++){const T=[];for(let y=0;y<=h;y++)T.push(u(y,w));if(w>0)for(let y=0;y<h;y++){const S=M[y],A=M[y+1],R=T[y+1],P=T[y];!S.wet&&!A.wet&&!R.wet&&!P.wet||(x.push(S.x,S.y,S.z,A.x,A.y,A.z,R.x,R.y,R.z),_.push(S.d,A.d,R.d),x.push(S.x,S.y,S.z,R.x,R.y,R.z,P.x,P.y,P.z),_.push(S.d,R.d,P.d))}M=T}if(x.length===0)return null;const E=new Gt;E.setAttribute("position",new kt(x,3)),E.setAttribute("aHot",new kt(_,1));const b=new dt(E,this.material);return b.frustumCulled=!0,b}buildLake(t,e,n){const o=Math.ceil(t.r*2/4),r=1,a=Math.ceil(o/r)+1,c=new Float32Array(a*a);for(let u=0;u<a;u++){const x=t.z-t.r+u*r*4;for(let _=0;_<a;_++){const M=t.u-t.r+_*r*4;c[u*a+_]=e(n(M,x),x)}}const l=(u,x)=>{const _=Math.min(a-1.001,u/r),M=Math.min(a-1.001,x/r),E=Math.floor(_),b=Math.floor(M),w=_-E,T=M-b,y=c[b*a+E],S=c[b*a+E+1],A=c[(b+1)*a+E],R=c[(b+1)*a+E+1],P=y+(S-y)*w;return P+(A+(R-A)*w-P)*T},h=[],f=[],d=(u,x)=>{const _=t.u-t.r+u*4,M=t.z-t.r+x*4,E=n(_,M),b=l(u,x),w=(_-t.u)**2+(M-t.z)**2<=t.r*t.r,T=t.y-b,y=w&&T>0&&T<=t.depth+1.5;return{x:E,z:M,y:y?t.y:Math.min(t.y,b+.15),g:b,wet:y,inC:w,deep:T>t.depth+1.5,d:y?.88+.12*Math.min(1,T/Math.max(1,t.depth)):0}},p=[];for(let u=0;u<=o;u++){const x=[];for(let _=0;_<=o;_++)x.push(d(_,u));p.push(x)}const m=(u,x)=>{const _=t.y-u.g,M=t.y-x.g;let E=_/(_-M);return isFinite(E)||(E=.5),E=Math.max(.18,Math.min(.82,E)),{x:u.x+(x.x-u.x)*E,z:u.z+(x.z-u.z)*E,y:t.y,g:t.y,wet:!0,d:u.d,inC:!0,deep:!1}};for(let u=1;u<=o;u++)for(let x=0;x<o;x++){const _=[p[u-1][x],p[u-1][x+1],p[u][x+1],p[u][x]];let M=0;for(const b of _)b.wet&&M++;if(M<=1)continue;let E;if(M===4)E=_;else{if(_.some(b=>!b.inC||b.deep))continue;E=[];for(let b=0;b<4;b++){const w=_[b],T=_[(b+1)%4];w.wet&&E.push(w),w.wet!==T.wet&&E.push(m(w,T))}}if(!(E.length<3))for(let b=1;b+1<E.length;b++){const w=E[0],T=E[b],y=E[b+1];h.push(w.x,w.y,w.z,T.x,T.y,T.z,y.x,y.y,y.z),f.push(w.d,T.d,y.d)}}if(h.length===0)return null;const v=new Gt;v.setAttribute("position",new kt(h,3)),v.setAttribute("aHot",new kt(f,1));const g=new dt(v,this.material);return g.frustumCulled=!0,g}}const $n=10,J_=34,Q_=.55,tx=6.5,Sn=new Float32Array($n*4),vl=new Float32Array($n);let Pu=0;function ex(){return Sn}function nx(i,t,e){const n=Pu%$n;Pu++,Sn[n*4]=i,Sn[n*4+1]=t,Sn[n*4+2]=e,Sn[n*4+3]=1,vl[n]=0}function ix(i){for(let t=0;t<$n;t++){if(Sn[t*4+3]<=0)continue;vl[t]+=i;const e=1-vl[t]/J_;Sn[t*4+3]=e>0?Math.min(1,e*1.8):0}}function sx(i,t){let e=0;for(let n=0;n<$n;n++){const s=Sn[n*4+3];if(s<=.002)continue;const o=Sn[n*4+2],r=i-Sn[n*4],a=t-Sn[n*4+1],c=(r*r+a*a)/(o*o);if(c>=1)continue;const l=1-c;e+=Math.min(tx,o*Q_)*s*l*l}return e}const un=24,$d=.25,jr=5.5,Jd=2.2,Ml=2.9,Qd=1.4,Lu=un*$d,Jn=new Float32Array(un*4),ti=new Float32Array(un*4);let Du=0;function ox(){return Jn}function rx(){return ti}function ax(i,t,e,n){const s=Du%un;Du++,Jn[s*4]=i,Jn[s*4+1]=t,Jn[s*4+2]=e,Jn[s*4+3]=n,ti[s*4]=0,ti[s*4+1]=1}function cx(i){for(let t=0;t<un;t++){if(ti[t*4+1]<=0)continue;const n=(ti[t*4]+=i)-Lu*.7;ti[t*4+1]=n<=0?1:Math.max(0,1-n/(Lu*.3))}}function tp(i,t,e){const n=Jn[i*4],s=Jn[i*4+1];let o=Jn[i*4+2]-n,r=Jn[i*4+3]-s;const a=o*o+r*r;let c=0;a>1e-4&&(c=((t-n)*o+(e-s)*r)/a,c=c<0?0:c>1?1:c);const l=t-n-o*c,h=e-s-r*c,f=Math.sqrt(l*l+h*h);if(f>=jr)return 0;const d=1-f/jr;return d*d}function lx(i,t){let e=0;for(let n=0;n<un;n++){const s=ti[n*4+1];if(s<=.002)continue;const o=tp(n,i,t),r=Jd*o*s;r>e&&(e=r)}return e}function hx(i,t){let e=0;for(let n=0;n<un;n++){const s=ti[n*4+1];if(s<=.002)continue;const o=tp(n,i,t);if(o<=0)continue;const r=ti[n*4],c=(r<=Ml?1:Math.max(0,1-(r-Ml)/Qd))*o*s;c>e&&(e=c)}return e}const ux=.58,fx=.12,dx=.009,px=1.7,mx=.05,gx=.023,vx=4.2,ds=8,lo=-2e3,pi=[0];let Iu=lo;function Uu(i){const t=ZM(i);return(ux+fx*Math.sin(i*dx+px)+mx*Math.sin(i*gx+vx))*Math.sqrt(1+t*t)*Ve.slope(i)*bd(i)}function Mx(i){if(i>Iu){const n=Math.ceil((i+400-lo)/ds)+1;for(let s=pi.length;s<=n;s++){const o=lo+(s-1)*ds,r=o+ds;pi[s]=pi[s-1]+(Uu(o)+Uu(r))/2*ds}Iu=lo+(pi.length-1)*ds}const t=(i-lo)/ds,e=Math.max(0,Math.min(pi.length-2,Math.floor(t)));return pi[e]+(pi[e+1]-pi[e])*(t-e)}function _x(i,t){const e=rt(i*.0042-33.1,t*.0026+17.7)*.5+.5,n=Math.max(0,Math.min(1,(e-.6)/.16));return n*n*(3-2*n)}function xx(i,t){const e=rt(i*.0025+11.3,t*.004)*.5+.5,n=Math.max(0,Math.min(1,(e-.45)/.14));return n*n*(3-2*n)}function _l(i,t){const e=Ed(i,t),n=1-e.t;let s=-Mx(t);const o=Ve.shape(t);s+=rt(i*.0011+21.4,t*45e-5-5.2)*95*o,s+=rt(i*.003-8.7,t*.0012+12.9)*30*o;const r=i-re(t),a=Math.abs(r),l=150+((r>0?rt(t*.0058+91.2,5.1):rt(t*.0052-44.7,9.3))*.5+.5)*230,h=Math.max(0,a-l);if(h>0){const x=.55+(rt(i*.0038-4.2,t*.0021+18.5)*.5+.5)*.8,_=rt(i*.011+33.4,t*.0055-7.1)*.5+.5;s+=Math.min(430,h*h*8e-4)*x*(.7+.55*_)}const f=Ve.ribs(t);s+=rt(i*.014+44.1,t*.0016-7.8)*7.5*n*f,s+=rt(i*.028-19.6,t*.0035+2.4)*3.2*n*f;const d=kl(i,t),p=1-.72*e.t*Se(t),m=xx(i,t)*n*(1-d*.7)*Ve.bumps(t)*QM(t)*p;s+=rt(i*.012+3.7,t*.012)*5*(.3+.7*m)*(.35+.65*n),s+=rt(i*.05,t*.05+9.1)*2*m,s+=rt(i*.18,t*.18)*.45*m;const v=Se(t);v>.001&&(s+=N_(i,t)*v);const g=Se(t);if(g>.001){const x=1-.85*e.t,_=bd(t);s+=rt(i*.042+7.3,t*.042-2.9)*.32*g*x*_,s+=rt(i*.17-4.1,t*.17+6.6)*.05*g*x*_}if(v>.001){const x=1-.8*e.t,_=v*x,M=rt(i*.0026-17.9,t*9e-4+4.4),E=Math.abs(M);s+=(E*E*2.4-.6)*3.2*_,s+=Math.abs(rt(i*.004+8.1,t*.022-3.3))*.38*_}const u=_x(i,t)*n*Ve.rocky(t);return u>0&&(s+=rt(i*.075+31.2,t*.06-14.5)*5.5*u,s+=rt(i*.16-6.3,t*.15+22.8)*2.2*u),s+=w_(i,t),s+=s_(i,t),s+=hl(i,t)*(1-d),s+=o_(i,t)*(1-e.t*.85),s-=1.1*e.t,s+=e.bank*e.t,s+=pl(i,t),s}function ja(i){const t=Math.max(0,Math.min(1,i));return t*t*(3-2*t)}const Nu=new Map;function yx(i){const t=Nu.get(i.key);if(t)return t;const e=i.pts.map(r=>_l(r.x,r.z)),n=e.slice();for(let r=0;r<3;r++){for(let a=1;a<n.length-1;a++)n[a]=(n[a-1]+n[a]+n[a+1])/3;for(let a=0;a<n.length;a++)n[a]=Math.max(e[a]-2,Math.min(e[a]+2,n[a]))}const s=i.houses.map(r=>{let a=0,c=0;for(const[l,h]of[[0,0],[4,0],[-4,0],[0,4],[0,-4]])a+=_l(r.x+l,r.z+h),c++;return a/c}),o={road:n,pads:s};return Nu.set(i.key,o),o}function Zt(i,t){const e=ye(i,t);return mi(e,t)}c_((i,t)=>mi(i,t));$_((i,t)=>Or(i,t,np));function Yi(i){return i.index?i.toNonIndexed():i}function Sx(i,t,e,n){const s=i.attributes.position,o=[];for(let a=0;a<s.count;a+=3){const c=(s.getY(a)+s.getY(a+1)+s.getY(a+2))/3;c<t||c>e||o.push([s.getX(a),s.getZ(a),s.getX(a+1),s.getZ(a+1),s.getX(a+2),s.getZ(a+2)])}const r=new Array(n).fill(0);for(let a=0;a<n;a++){const c=(a+.5)/n*Math.PI*2-Math.PI,l=Math.cos(c),h=Math.sin(c);let f=0;for(const d of o)for(let p=0;p<3;p++){const m=d[p*2],v=d[p*2+1],g=d[(p+1)%3*2]-m,u=d[(p+1)%3*2+1]-v,x=l*u-h*g;if(Math.abs(x)<1e-9)continue;const _=(m*u-v*g)/x;if(_<=f)continue;const M=Math.abs(g)>Math.abs(u)?(_*l-m)/g:(_*h-v)/u;M>=0&&M<=1&&(f=_)}r[a]=f}for(let a=0;a<n;a++){let c=0;for(let l=0;l<n;l++){if(r[l]>0)continue;const h=r[(l+n-1)%n],f=r[(l+1)%n];h>0||f>0?r[l]=Math.max(h,f):c++}if(c===0)break}return r}g_([0,1,2,3].map(i=>{const t=ep(i),e=Sx(t,.34,.45,Ss);return t.dispose(),e}));M_([0,1,2].map(i=>{const t=Bd(i),e=L_(t);return t.dispose(),e}));function mi(i,t){const e=i,n=_l(e,t),s=Nn(e,t);if(!s)return n;const o=yx(s);let r=0,a=0;const c=yo(s,e,t),l=Math.sqrt(c.d2);if(l<24){const p=1-ja((l-5)/19),m=o.road[c.seg]+(o.road[c.seg+1]-o.road[c.seg])*c.t;r+=p,a+=p*m}for(let p=0;p<s.houses.length;p++){const m=s.houses[p],v=(m.x-e)*(m.x-e)+(m.z-t)*(m.z-t);if(v>169)continue;const g=1-ja((Math.sqrt(v)-m.padR)/6);r+=g,a+=g*o.pads[p]}const h=Math.min(1,r);let d=r<=.001?n:n*(1-h)+a/r*h;for(let p=0;p<s.houses.length;p++){const m=s.houses[p],v=e-m.x,g=t-m.z;if(g>0||v*v+g*g>324)continue;const u=Cd(m),x=Math.cos(m.rot),_=Math.sin(m.rot),M=v*x-g*_,E=v*_+g*x,b=u.hw*.6,w=Math.max(0,Math.abs(M)-b),T=Math.max(0,Math.abs(E)-u.hd),y=Math.hypot(w,T);if(y>Fu)continue;const S=o.pads[p]-.15+Math.max(0,u.eave-.55);if(d>=S)continue;const A=1-y/Fu,R=A*A*(3-2*A)*ja(-g/2.5);d+=(S-d)*R}return d}function $a(i,t,e){return e.x=(Zt(i+.6,t)-Zt(i-.6,t))/(2*.6),e.y=(Zt(i,t+.6)-Zt(i,t-.6))/(2*.6),e}function xl(i,t,e){const s=(Zt(i+.6,t)-Zt(i-.6,t))/1.2,o=(Zt(i,t+.6)-Zt(i,t-.6))/(2*.6);return e.set(-s,1,-o).normalize()}const vr=new Map;function zr(i){const t=vr.get(i.key);if(t)return t;const e=i.pts.map(h=>Zt(h.x,h.z)),n=e.length,s=e.slice();for(let h=0;h<50;h++){const f=s.slice();for(let d=1;d<n-1;d++)s[d]=(f[d-1]+f[d]*1.1+f[d+1])/3.1}const o=e.map((h,f)=>h-s[f]+Mr),r=8,a=o.map((h,f)=>{let d=-1/0;for(let p=Math.max(0,f-r);p<=Math.min(n-1,f+r);p++)o[p]>d&&(d=o[p]);return d});for(let h=0;h<14;h++){const f=a.slice();for(let d=1;d<n-1;d++)a[d]=(f[d-1]+f[d]*1.1+f[d+1])/3.1}const c=e.map((h,f)=>Math.min(h+wx,Math.max(h+Mr,s[f]+a[f]))),l=Math.max(3,Math.floor(n*.12));for(let h=0;h<l;h++){const f=h/l,d=f*f*(3-2*f);c[h]=(e[h]+.1)*(1-d)+c[h]*d}for(let h=1;h<n;h++)c[h]=Math.min(c[h],c[h-1]+.02*i.segLen[h-1]),c[h]<e[h]+Mr&&(c[h]=e[h]+Mr);return vr.set(i.key,c),vr.size>256&&vr.clear(),c}const wx=6,Mr=.4,bx=new Q(10327201),ps=new Q(11845336),_r=new Q,Ja=new Q(11047278),Qa=new Q(8366287),ms=new Q(15922943),xr=40,Fu=5,zu=3,Tx=4;function Ex(i){let t=i*2654435761>>>0;return()=>(t=Math.imul(t,1664525)+1013904223>>>0,t/4294967296)}const Ax=new F(0,1,0),Ou=new Ge,tc=new Q(15265531),Rx=new Q(2.6,.85,.22);function ec(i,t,e){const n=Se(i),s=t,o=t*1.01,r=t*1.06;if(n<.01)return e.setRGB(s,o,r);const a=t*.5,c=t*.36,l=t*.33;return e.setRGB(s+(a-s)*n,o+(c-o)*n,r+(l-r)*n)}const Cx=new Q(1.5,.12,.035);function Px(i){const t=Ex(i*7919+13),e=[],n=[],s=(E,b)=>{e.push(E),n.push(b)},o=(E,b,w,T,y)=>{Ou.setFromUnitVectors(Ax,b),E.applyQuaternion(Ou),E.translate(w,T,y)},r=aa[i]??Ft.SPRUCE,a=i%3===0||r===Ft.BUSH,c=new F;if(r===Ft.BUSH){const E=.9+t()*.7,b=.31+t()*.07,w=5+Math.floor(t()*4);for(let T=0;T<w;T++){const y=T/w*Math.PI*2+t()*.5,S=E*(.4+t()*.4),A=new Un(S,0);if(A.scale(1,.55+t()*.3,1),A.translate(Math.cos(y)*E*.45,S*.5,Math.sin(y)*E*.45),s(A,new Q().setHSL(b,.28+t()*.16,.13+t()*.06)),a&&t()>.4){const R=new Un(S*.72,0);R.scale(1,.4,1),R.translate(Math.cos(y)*E*.45,S*.95,Math.sin(y)*E*.45),s(R,tc)}}return yr(e,n)}if(r===Ft.SNAG){const E=3.4+t()*3,b=new Q().setHSL(.09,.06,.42+t()*.12),w=new He(.07,.17,E,6);w.translate(0,E/2,0),w.rotateZ((t()-.5)*.12),s(w,b);const T=3+Math.floor(t()*4);for(let y=0;y<T;y++){const S=E*(.35+t()*.55),A=t()*Math.PI*2,R=.4+t()*.7;c.set(Math.cos(A)*.85,.25+t()*.35,Math.sin(A)*.85).normalize();const P=new He(.02,.06,R,4);P.translate(0,R/2,0),o(P,c,0,S,0),s(P,b)}return yr(e,n)}if(r===Ft.BIRCH){const E=5+t()*3.5,b=new Q().setHSL(.11,.05,.78+t()*.1),w=new Q().setHSL(.08,.08,.22),T=new He(.06,.13,E,6);T.translate(0,E/2,0),s(T,b);for(let A=0;A<4;A++){const R=E*(.15+t()*.6),P=new Te(.15,.06+t()*.05,.15);P.translate(0,R,0),s(P,w)}const y=t()>.45?.11+t()*.04:.24+t()*.06,S=6+Math.floor(t()*4);for(let A=0;A<S;A++){const R=A/S,P=E*(.55+R*.45)+(t()-.5)*.4,U=t()*Math.PI*2,I=(1.1-R*.55)*(.6+t()*.6),N=(.9-R*.5)*(.3+t()*.7),G=new Un(I,0);G.scale(1,.75+t()*.3,1),G.translate(Math.cos(U)*N,P,Math.sin(U)*N),s(G,new Q().setHSL(y,.42+t()*.2,.3+t()*.14)),c.set(Math.cos(U),.55,Math.sin(U)).normalize();const z=new He(.012,.03,N+.3,3);z.translate(0,(N+.3)/2,0),o(z,c,0,P-.35,0),s(z,b)}return yr(e,n)}const l=r===Ft.PINE?6.5+t()*4.5:r===Ft.LARCH?5.5+t()*3.5:4.8+t()*4.6,h=(r===Ft.PINE?.14:.09)+t()*.07,f=r===Ft.PINE?4+Math.floor(t()*2):r===Ft.LARCH?7+Math.floor(t()*3):9+Math.floor(t()*4),d=4+Math.floor(t()*2),p=(r===Ft.PINE?1.5:1)+t()*.9,m=r===Ft.PINE?.58:r===Ft.LARCH?.4:.32,v=r===Ft.PINE?new Q().setHSL(.045+t()*.02,.42,.3+t()*.08):new Q().setHSL(.08+t()*.03,.35,.2+t()*.08),g=r===Ft.LARCH?.1+t()*.035:r===Ft.PINE?.22+t()*.06:.28+t()*.14,u=r===Ft.LARCH?.5+t()*.18:.3+t()*.25,x=r===Ft.LARCH?.34+t()*.1:r===Ft.PINE?.19+t()*.07:.15+t()*.07,_=new He(h*.45,h*1.7,l,6);_.translate(0,l/2,0),s(_,v);const M=new Kn(h*2.6,h*5,5);M.translate(0,h*2.5,0),s(M,v);for(let E=0;E<f;E++){const b=E/(f-1),w=l*(m+b*(.94-m)),T=r===Ft.PINE?.75+.45*Math.sin(b*Math.PI):1.5-1.05*b,y=p*T*(.85+t()*.3),S=r===Ft.PINE?-.1-t()*.15:r===Ft.LARCH?.05+b*.15+t()*.1:.26+b*.4+t()*.1,A=d+E%2,R=t()*Math.PI*2,P=new Q().setHSL(g,u,x*(.85+b*.55));for(let U=0;U<A;U++){const I=R+U/A*Math.PI*2+(t()-.5)*.25,N=Math.cos(S);c.set(Math.cos(I)*N,-Math.sin(S),Math.sin(I)*N).normalize();const G=new He(.018,.05,y,3);G.translate(0,y/2,0),o(G,c,0,w,0),s(G,v);const z=y*(r===Ft.LARCH?1.2:1.5),V=new Kn(y*(r===Ft.LARCH?.26:.42),z,5);if(V.translate(0,z*.5,0),o(V,c,c.x*y*.25,w+c.y*y*.25,c.z*y*.25),s(V,P),a&&b>.25&&r!==Ft.LARCH){const Y=y*.3,j=new Kn(Y,Y*.75,5);j.scale(1,1,.8),j.translate(c.x*y*.55,w+c.y*y*.55+y*.16,c.z*y*.55),s(j,tc)}}}if(r===Ft.SPRUCE){const E=2+Math.floor(t()*3),b=new Q().setHSL(.06,.3,.16);for(let w=0;w<E;w++){const T=t()*Math.PI*2,y=l*(.72+t()*.18),S=p*(.25+t()*.3),A=new Kn(.07,.26,4);A.rotateX(Math.PI),A.translate(Math.cos(T)*S,y,Math.sin(T)*S),s(A,b)}}if(r!==Ft.PINE){const E=l*.22,b=new Kn(p*.3,E,5);if(b.translate(0,l*.9+E*.4,0),s(b,new Q().setHSL(g,u,x*1.5)),a&&r!==Ft.LARCH){const w=E*.5,T=new Kn(p*.19,w,5);T.translate(0,l*.9+E*.75,0),s(T,tc)}}return yr(e,n)}function yr(i,t){const e=i.map((n,s)=>{const o=Yi(n),r=t[s],a=o.attributes.position.count,c=new Float32Array(a*3);for(let l=0;l<a;l++)c[l*3]=r.r,c[l*3+1]=r.g,c[l*3+2]=r.b;return o.setAttribute("color",new Pt(c,3)),o});return ua(e)}function Lx(i){const t=i===0?new Wr(.7):i===1?new Un(.72):i===2?new Wr(.78,0):new Un(.8,0),e=Yi(t),n=e.attributes.position;for(let s=0;s<n.count;s++){const o=n.getX(s),r=n.getY(s),a=n.getZ(s),c=1+(J(Math.round(o*97)+i*31,Math.round(a*89)+Math.round(r*71))-.5)*.55;n.setXYZ(s,o*c,r*c*(i===2?.55:1),a*c)}return i===3&&e.scale(1.35,.8,.7),e.computeVertexNormals(),e}function ep(i){const t=[],e=3+i%2;for(let p=0;p<e;p++){const m=J(i*91+p*17,p*37+3),v=J(i*53+p*29,p*13+7),g=Yi(new Un(.55+m*.4,p===0?2:1)),u=g.attributes.position,x=i*13.7+p*5.3;for(let _=0;_<u.count;_++){const M=u.getX(_),E=u.getY(_),b=u.getZ(_),w=Math.hypot(M,E,b)||1,T=M/w,y=E/w,S=b/w,A=rt(T*1.7+x,S*1.7-y*1.3+x)*.34+rt(T*4.3-x,S*4.3+y*3.1)*.17+rt(T*9.1+y*7.7,S*9.1-x)*.08,R=w*(1+A);u.setXYZ(_,T*R,y*R*(1.35+v*.7),S*R*(.8+m*.4))}g.rotateY(m*Math.PI*2),g.rotateZ((v-.5)*.9),g.rotateX((m-.5)*.75),g.translate((m-.5)*.75,p*.42+v*.2,(v-.5)*.7),t.push(g)}const n=Yi(ua(t));n.computeBoundingBox();const s=n.boundingBox,o=Math.max(.001,s.max.y-s.min.y);n.translate(-(s.min.x+s.max.x)/2,-s.min.y,-(s.min.z+s.max.z)/2),n.scale(1/o,1/o,1/o),n.computeVertexNormals();const r=n.attributes.position,a=n.attributes.normal,c=new Float32Array(r.count*3),l=new Q(6511974),h=new Q(10985384),f=new Q(14673653),d=new Q;for(let p=0;p<r.count;p+=3){let m=0,v=0;for(let _=0;_<3;_++)m+=a.getY(p+_)/3,v+=r.getY(p+_)/3;const g=Math.max(0,Math.min(1,v));d.copy(l).lerp(h,g*g*(3-2*g));const u=Math.max(0,Math.min(1,(m-.78)/.18));d.lerp(f,u*u*(.2+.45*g));const x=.9+J(Math.round(r.getX(p)*71),Math.round(r.getZ(p)*83)+p)*.22;for(let _=0;_<3;_++)c[(p+_)*3]=d.r*x,c[(p+_)*3+1]=d.g*x,c[(p+_)*3+2]=d.b*x}return n.setAttribute("color",new Pt(c,3)),n}function Dx(i){const t=i.attributes.position,e=i.attributes.normal,n=[];for(let o=0;o<t.count;o+=3){let r=0,a=0;for(let c=0;c<3;c++)r+=e.getY(o+c)/3,a+=t.getY(o+c)/3;if(!(r<.64||a<.52))for(let c=0;c<3;c++)n.push(t.getX(o+c)+e.getX(o+c)*.004,t.getY(o+c)+e.getY(o+c)*.004,t.getZ(o+c)+e.getZ(o+c)*.004)}if(n.length<9)return null;const s=new Gt;return s.setAttribute("position",new kt(n,3)),s.computeVertexNormals(),s}function Ix(){const i=new Te(.08,1.4,.08);i.translate(0,.7,0);const t=new Te(.45,.3,.05);return t.translate(.22,1.15,0),Yi(ua([i,t]))}function Bu(){const n=[-2.7,0,-2.05,-2.7,0,2.05,0,1.5,2.05,-2.7,0,-2.05,0,1.5,2.05,0,1.5,-2.05,2.7,0,-2.05,0,1.5,-2.05,0,1.5,2.05,2.7,0,-2.05,0,1.5,2.05,2.7,0,2.05,-2.7,0,-2.05,0,1.5,-2.05,2.7,0,-2.05,-2.7,0,2.05,2.7,0,2.05,0,1.5,2.05],s=new Gt;return s.setAttribute("position",new kt(n,3)),s.computeVertexNormals(),s}function yl(i,t,e,n,s,o=!1){const r=Ne.snow,a=bx,c=1-n,l=o?.5:rt(t*.35+17.2,e*.055)*.5+.5,h=o?.17:Math.max(0,rt(t*.12-8.4,e*.12+3.9))*.34,f=o?.6:.42,d=o?.2:.26,m=Math.max(0,Math.min(o?.5:.86,(c-f-l*.2)/d-h)),v=m*m*(3-2*m),g=o?0:rt(t*.02,s*.075)*.19,u=a.r*(1+g),x=a.g*(1+g*.9),_=a.b*(1+g*.7);let M=r.r+(u-r.r)*v,E=r.g+(x-r.g)*v,b=r.b+(_-r.b)*v;const w=o?.45:1,T=(rt(t*.23+61.7,e*.23)*.07+rt(t*.075-12.4,e*.075)*.055)*w;M*=1+T,E*=1+T,b*=1+T*.85;const y=o?Xi:Bl(t,e);if(y===Vs){M=M*.45+Qa.r*.55,E=E*.45+Qa.g*.55,b=b*.45+Qa.b*.55;const U=rt(t*.5+3.3,e*.5)>.72?.22:0;M+=U,E+=U,b+=U}else if(y===Eo)M=M*.72+.28,E=E*.72+.28,b=b*.72+.28;else if(y===Ao){M=M*.38+Ja.r*.62,E=E*.38+Ja.g*.62,b=b*.38+Ja.b*.62;const U=rt(t*.42-9.1,e*.42)*.14;M+=U,E+=U*.9,b+=U*.7}let S=0,A=0;const R=Se(e);if(R>.01){const U=(st,pt,Tt)=>{const Ut=Math.max(0,Math.min(1,(Tt-st)/(pt-st)));return Ut*Ut*(3-2*Ut)},I=rt(t*.017+31.7,e*.017)*.5+.5,N=U(.46,.54,I),G=o?.5:rt(t*.55,e*.06+11.3)*.5+.5,z=o?.5:rt(t*1.15-4.2,e*1.15)*.5+.5;let V=.075+(.34-.075)*N,Y=.063+(.31-.063)*N,j=.07+(.3-.07)*N;const ot=.84+G*.32,wt=.86+z*.28;if(V*=ot*wt,Y*=ot*wt,j*=ot*wt*.97,N>.01){const st=o?0:rt(t*.085+5.5,e*.011-3.1),pt=o?0:Math.max(0,rt(t*.02-12.4,e*.0065+7.7)*.5+.5-.58)/.42,Tt=(1+st*.22)*(1-pt*.55);V*=1+(Tt-1)*N,Y*=1+(Tt-1)*N,j*=1+(Tt-1)*N*1.08}const W=U(.34,.62,c);V+=(.085-V)*W,Y+=(.052-Y)*W,j+=(.042-j)*W;const et=o?0:V_(t,e);if(et>.01){const st=Math.max(0,1-Math.abs(et-.45)/.45),pt=Math.max(0,(et-.72)/.28);V+=(.62-V)*st*.7,Y+=(.55-Y)*st*.7,j+=(.24-j)*st*.7,V*=1-pt*.6,Y*=1-pt*.6,j*=1-pt*.55}const tt=o?0:k_(t,e,Zt,oe);if(tt>.01){const st=tt*tt;V+=(.46-V)*st,Y+=(.085-Y)*st*.95,j+=(.055-j)*st*.95,A=st*.35}S=R,M+=(V-M)*R,E+=(Y-E)*R,b+=(j-b)*R}const P=Ed(t,e).t;if(P>0){const U=ms.r+(.2-ms.r)*R,I=ms.g+(.185-ms.g)*R,N=ms.b+(.175-ms.b)*R,G=P*(.75-R*.1);M+=(U-M)*G,E+=(I-E)*G,b+=(N-b)*G}i.r=M,i.g=E,i.b=b,i.glow=S,i.hot=A}function ws(i,t){const e=Math.sin(Math.floor(i)*127.1+Math.floor(t)*311.7)*43758.5453;return e-Math.floor(e)}function cn(i,t){const e=Math.floor(i),n=Math.floor(t);let s=i-e,o=t-n;s=s*s*(3-2*s),o=o*o*(3-2*o);const r=ws(e,n),a=ws(e+1,n),c=ws(e,n+1),l=ws(e+1,n+1),h=r+(a-r)*s;return h+(c+(l-c)*s-h)*o}function Zn(i,t,e){const n=Math.max(0,Math.min(1,(e-i)/(t-i)));return n*n*(3-2*n)}let np=0;function Or(i,t,e=0){const n=(cn(i*.021+e*.16,t*.021+3)-.5)*9,s=(cn(i*.019+11,t*.019+e*.13)-.5)*9,o=(cn(i*.055+e*.34,t*.055)-.5)*11,r=(cn(i*.048+5,t*.048-e*.29)-.5)*11,a=i+n,c=t+s,l=i+o,h=t+r,f=cn(i*.009,t*.009),d=cn(i*.006+7,t*.006+7),p=.115*(.55+.8*Math.sin(e*1.15+f*9)*.5+.4),m=.4+(.145-.4)*d,v=a*m,g=c*m,u=Math.floor(v),x=Math.floor(g),_=v-u,M=g-x;let E=8,b=8;for(let I=-1;I<=1;I++)for(let N=-1;N<=1;N++){const G=ws(u+N+.5,x+I+.5),z=ws(u+N+17.3,x+I+17.3),V=Math.hypot(N+G-_,I+z-M);V<E?(b=E,E=V):V<b&&(b=V)}const w=1-Zn(0,Math.max(.02,p),b-E),T=1-Math.abs(cn(l*.16,h*.16)*2-1),y=1-Math.abs(cn(l*.47+11,h*.47+11)*2-1),S=Zn(.94,1,T)*Zn(.66,1,y),A=1-Math.abs(cn(a*1.9+3,c*1.9+3)*2-1),R=Zn(.84,1,A)*.6;let P=Math.max(Math.max(w*Zn(.62,.34,f),S),R*Zn(.58,.82,f));P*=Zn(.12,.3,cn(i*.015+21,t*.015+21));const U=Zn(.62,.92,cn(i*.02+31,t*.02+31));return P*P*U}function Ux(i,t){return Zn(.62,.92,cn(i*.02+31,t*.02+31))}const ku=`
vec3 lasAt(vec4 a, vec2 p) {
  vec2 u = a.zw - a.xy;
  float l2 = max(1e-4, dot(u, u));
  float h = clamp(dot(p - a.xy, u) / l2, 0.0, 1.0);
  vec2 d = p - a.xy - u * h;
  float len = length(d);
  if (len >= LAS_R) return vec3(0.0);
  float k = 1.0 - len / LAS_R;
  return vec3(k * k, len > 1e-4 ? d / len : vec2(0.0));
}
`,nc=10;class Yl{constructor(){this.group=new ee,this.matUniforms=null,this.chunks=new Map,this.cragField=new ee,this.cragBuilt=new Map,this.archBuilt=new Map,this.snowMat=(()=>{const t=new Ue({color:16777215,flatShading:!0,vertexColors:!0});return t.onBeforeCompile=e=>{e.uniforms.uGlowCol={value:Rx},e.uniforms.uHazCol={value:Cx},e.uniforms.uTime={value:0},e.uniforms.uSpot={value:new Jt(0,0,1,0)},e.uniforms.uCrater={value:Array.from({length:$n},()=>new Jt(0,0,1,0))},e.uniforms.uMarks={value:0},e.uniforms.uCrN={value:0},e.uniforms.uLaserA={value:Array.from({length:un},()=>new Jt(0,0,0,0))},e.uniforms.uLaserB={value:Array.from({length:un},()=>new Jt(0,0,0,0))},e.uniforms.uSpotCol={value:new Q(1.7,.45,.08)},e.uniforms.uSpotDir={value:new F(0,1,0)},e.uniforms.uGlow={value:Array.from({length:nc},()=>new Jt(0,0,1,0))},this.matUniforms=e.uniforms,e.vertexShader=e.vertexShader.replace("#include <common>",`#include <common>
#define CRATERS_N ${$n}
#define MARKS_N ${un}
#define LAS_DEPTH ${Jd.toFixed(3)}
#define LAS_R ${jr.toFixed(3)}
attribute float aGlow;
attribute float aHazard;
varying float vGlow;
varying float vHaz;
varying vec3 vWPos;
uniform vec4 uCrater[CRATERS_N];
uniform vec4 uLaserA[MARKS_N];
uniform vec4 uLaserB[MARKS_N];
uniform float uMarks;
uniform float uCrN;
${ku}`).replace("#include <beginnormal_vertex>",`#include <beginnormal_vertex>
// ★ У ЯМЫ ДОЛЖНЫ БЫТЬ СКЛОНЫ, А НЕ ТОЛЬКО ГЛУБИНА. Вершины опускались, а
// нормали оставались от РОВНОГО склона — свет ложился так, будто ничего не
// произошло, и воронка читалась подкрашенным пятном. Отсюда и ощущение, что
// «геометрия старая»: доска в яме, а поверхность освещена по-старому.
// Чаша задана формулой, поэтому уклон берём аналитически, а не пересчётом
// нормалей: dip = A·(1−d²)² ⇒ ∇dip = −4A(1−d²)·(p−c)/r².
{
  vec3 cwp = (modelMatrix * vec4(position, 1.0)).xyz;
  vec2 s = vec2(objectNormal.x, objectNormal.z) / max(0.15, objectNormal.y);
  bool touched = false;
  if (uCrN > 0.5) for (int ci = 0; ci < CRATERS_N; ci++) {
    float cw = uCrater[ci].w;
    if (cw <= 0.002) continue;
    float cr = uCrater[ci].z;
    vec2 rel = cwp.xz - uCrater[ci].xy;
    float cd = length(rel) / cr;
    if (cd >= 1.0) continue;
    float amp = min(6.5, cr * 0.55) * cw;
    s -= 4.0 * amp * (1.0 - cd * cd) * rel / (cr * cr);
    touched = true;
  }
  // ★ У БОРОЗДЫ ТОЖЕ ЕСТЬ СТЕНКИ. Тот же довод, что и у воронки: без наклона
  // нормалей рез читается полосой краски. Уклон аналитический:
  // dip = D·f·(1 − d/R)² ⇒ ∇dip = −2·D·f·(1 − d/R)/R · (единичный вектор от оси).
  if (uMarks > 0.5) for (int li = 0; li < MARKS_N; li++) {
    float f = uLaserB[li].y;
    if (f <= 0.002) continue;
    vec3 ls = lasAt(uLaserA[li], cwp.xz);
    if (ls.x <= 0.001) continue;
    s += -2.0 * LAS_DEPTH * f * sqrt(ls.x) / LAS_R * ls.yz;
    touched = true;
  }
  if (touched) objectNormal = normalize(vec3(s.x, 1.0, s.y));
}`).replace("#include <begin_vertex>",`#include <begin_vertex>
vGlow = aGlow;
vHaz = aHazard;
vWPos = (modelMatrix * vec4(position, 1.0)).xyz;
// ★ ВОРОНКА ПРОДАВЛИВАЕТ САМУ ГЕОМЕТРИЮ. Одного пятна в пикселях мало: удар
// должен оставлять форму. Пересобирать чанки нельзя (высота задаётся формулой,
// по ней же считаются столкновения), но вершины можно сдвинуть прямо здесь —
// это бесплатно и работает на всех чанках сразу, потому что смещение считается
// от МИРОВОЙ точки, а значит на стыках сходится само.
// Чаша неглубокая: рельеф под доской остаётся прежним, и расхождения не видно.
if (uCrN > 0.5) for (int ci = 0; ci < CRATERS_N; ci++) {
  float cw = uCrater[ci].w;
  if (cw <= 0.002) continue;
  float cr = uCrater[ci].z;
  float cd = length(vWPos.xz - uCrater[ci].xy) / cr;
  if (cd >= 1.0) continue;
  // гладкая чаша: у кромки касательная горизонтальна, изломов нет
  float k = 1.0 - cd * cd;
  float dip = min(6.5, cr * 0.55) * cw * k * k;
  transformed.y -= dip;
  vWPos.y -= dip;
}
// борозда от луча: берём максимум по звеньям, иначе на их стыках вылезает
// двойная яма — ступенька поперёк реза
float lasDip = 0.0;
if (uMarks > 0.5) for (int li = 0; li < MARKS_N; li++) {
  float f = uLaserB[li].y;
  if (f <= 0.002) continue;
  vec3 ls = lasAt(uLaserA[li], vWPos.xz);
  lasDip = max(lasDip, LAS_DEPTH * ls.x * f);
}
transformed.y -= lasDip;
vWPos.y -= lasDip;`),e.fragmentShader=e.fragmentShader.replace("#include <common>",`#include <common>
#define CRATERS_N ${$n}
#define GLOWS_N ${nc}
#define MARKS_N ${un}
#define LAS_R ${jr.toFixed(3)}
#define LAS_MOLTEN ${Ml.toFixed(3)}
#define LAS_COOL ${Qd.toFixed(3)}
uniform vec4 uLaserA[MARKS_N];
uniform vec4 uLaserB[MARKS_N];
uniform float uMarks;
uniform float uCrN;
uniform vec3 uGlowCol;
uniform vec3 uHazCol;
uniform float uTime;
uniform vec4 uSpot;     // xz — центр, z — радиус, w — яркость
uniform vec3 uSpotCol;
uniform vec3 uSpotDir;   // от земли к оку
uniform vec4 uGlow[GLOWS_N];   // xz — очаг, z — радиус, w — сила
uniform vec4 uCrater[CRATERS_N];  // xz — центр, z — радиус, w — свежесть 0..1
${ku}
varying float vGlow;
varying float vHaz;
varying vec3 vWPos;
float thash(vec2 p){return fract(sin(dot(floor(p),vec2(127.1,311.7)))*43758.5453);}
float tnoise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.0-2.0*f);
  return mix(mix(thash(i),thash(i+vec2(1,0)),f.x),mix(thash(i+vec2(0,1)),thash(i+vec2(1,1)),f.x),f.y);}`).replace("#include <dithering_fragment>",`#include <dithering_fragment>
{
  // ★ УЗОР ПРОЕЦИРУЕТСЯ СВЕРХУ, ПОЭТОМУ НА СТЕНАХ ЕГО НЕТ. Вся сетка трещин
  // считается от мировых XZ — то есть накладывается на склон как вид сверху.
  // На пологом это верно, а на стенке ущелья та же проекция растягивает
  // ячейки в длинные полосы, и вместо корки выходит паутина поперёк обрыва:
  // видно её было в любом биоме и ни к какой геометрии она не относилась.
  // Гасим по крутизне: круче ~70° рисунка нет вовсе.
  float vv = vGlow * clamp((abs(normalize(normal).y) - 0.35) / 0.35, 0.0, 1.0);
  if (vv > 0.004) {
    vec2 w = vWPos.xz;
    // зерно клинкера
    float grit = tnoise(w * 1.7) * 0.6 + tnoise(w * 5.3) * 0.4;
    gl_FragColor.rgb *= 1.0 + (grit - 0.5) * 0.34 * vv;

    // ★ ТРЕЩИНЫ БЫВАЮТ РАЗНЫЕ. Одна формула давала один и тот же рисунок по
    // всему биому — параллельные полоски. У остывшей лавы соседствуют три
    // разных узора, и какой где — решает крупная маска региона:
    //  • ПЛИТЫ. Расплав стынет столбчатой отдельностью: многоугольные плиты
    //    со швами между ними (ячейки Ворonoi).
    //  • ВЕТВЯЩИЕСЯ РАЗЛОМЫ. Длинные извилистые щели поперёк корки.
    //  • КРАКЕЛЮР. Мелкая частая сетка на тонкой корке.
    float reg = tnoise(w * 0.009);
    float sizeN = tnoise(w * 0.006 + 7.0);

    // ★ КОРКА ХОДИТ. Одной пульсации цвета мало: рисунок при этом стоит
    // намертво, и видно, что это подсветка картинки, а не живая корка.
    // Поэтому сам домен узора ведётся медленным шумом от времени: плиты
    // подрагивают и чуть смещаются, разломы извиваются. Амплитуда нарочно
    // мала (около метра) и частота низкая — иначе рисунок не коробится, а
    // ползёт по склону текстурой, что ещё хуже.
    // ★ ХОД ЗАМЕТНЫЙ. Сдвиг в метр при периоде в полминуты глаз не ловит
    // вовсе — рисунок выглядел неподвижным. Амплитуда поднята в разы, но
    // частота коробления оставлена НИЗКОЙ: тогда сеть именно ходит и
    // перестраивается на месте, а не едет по склону текстурой.
    vec2 warpA = vec2(
      tnoise(w * 0.021 + vec2(uTime * 0.16, 3.0)),
      tnoise(w * 0.019 + vec2(11.0, uTime * 0.13))
    ) - 0.5;
    vec2 wp = w + warpA * 9.0;                 // домен плит: ход до ~4.5 м
    // разломы тоньше, им дозволено извиваться заметнее и быстрее
    vec2 warpB = vec2(
      tnoise(w * 0.055 + vec2(uTime * 0.34, 0.0)),
      tnoise(w * 0.048 + vec2(5.0, -uTime * 0.29))
    ) - 0.5;
    vec2 wr = w + warpB * 11.0;
    // шов дышит: щель то приоткрывается, то смыкается
    float seamW = 0.115 * (0.55 + 0.8 * sin(uTime * 1.15 + reg * 9.0) * 0.5 + 0.4);

    // плиты: размер ячейки сам по себе меняется по склону
    // ★ РИСУНОК МЕЛЬЧЕ. При ячейке в 6–18 м плиты читались крупным узором,
    // и глаз ловил в нём повторяющийся мотив. У корки отдельность мельче:
    // 2.5–7 м, то есть на уровне фактуры, а не орнамента.
    float cs = mix(0.4, 0.145, sizeN);
    vec2 pc = wp * cs;
    vec2 ip = floor(pc), fp = fract(pc);
    float d1 = 8.0, d2 = 8.0;
    for (int j = -1; j <= 1; j++) {
      for (int i = -1; i <= 1; i++) {
        vec2 g = vec2(float(i), float(j));
        vec2 o = vec2(thash(ip + g + 0.5), thash(ip + g + 17.3));
        float dd = length(g + o - fp);
        if (dd < d1) { d2 = d1; d1 = dd; } else if (dd < d2) { d2 = dd; }
      }
    }
    float plate = 1.0 - smoothstep(0.0, seamW, d2 - d1);

    // ветвящиеся разломы
    float r1 = 1.0 - abs(tnoise(wr * 0.16) * 2.0 - 1.0);
    float r2 = 1.0 - abs(tnoise(wr * 0.47 + 11.0) * 2.0 - 1.0);
    float rift = smoothstep(0.94, 1.0, r1) * smoothstep(0.66, 1.0, r2);

    // мелкий кракелюр
    float f1 = 1.0 - abs(tnoise(wp * 1.9 + 3.0) * 2.0 - 1.0);
    float craze = smoothstep(0.84, 1.0, f1) * 0.6;

    float wPlate = smoothstep(0.62, 0.34, reg);
    float wCraze = smoothstep(0.58, 0.82, reg);
    float cr = max(max(plate * wPlate, rift), craze * wCraze);
    // и участки гладкого пепла, где не трескается вовсе
    // Доля площади под узором замерена портом этих же формул в JS:
    // плиты 3.5%, разломы 0.7%, кракелюр 2.4% — суммарно 8% поверхности под
    // трещинами и 2% со светящимся швом. Это деталь, а не покрытие.
    cr *= smoothstep(0.12, 0.30, tnoise(w * 0.015 + 21.0));

    // ★ ЖАР — НЕ ВЕЗДЕ. Светиться должны немногие швы: остальные давно остыли
    // и просто тёмные. Иначе весь склон в оранжевой паутине.
    // ★ ГОРЯЧИХ ШВОВ МАЛО. Замер покрытия: под трещинами 11% площади — само
    // по себе немного, но пепел почти чёрный, и любая добавка света читается
    // ярко. При маске 0.45…0.84 тлела почти половина сети, и склон выглядел
    // затянутым светящейся паутиной. Жар остаётся в редких местах.
    float hot = smoothstep(0.62, 0.92, tnoise(w * 0.02 + 31.0));
    // ★ ТРЕЩИНА ЖИВАЯ. Ровное свечение читается нарисованным; в настоящей
    // щели жар ходит: по ней проходят волны, ядро светлее краёв, и изредка
    // вспыхивает уголёк.
    //  • волна — медленный шум, ползущий вниз по склону;
    //  • дыхание — своя фаза у каждого участка сети;
    //  • ядро — самая середина щели белее, кромка тёмно-багровая;
    //  • угольки — редкие точки, вспыхивающие и гаснущие.
    // Волна идёт по сети заметно: жар то накатывает, то отступает почти в
    // ноль. Слабая модуляция (0.45…1.55) в кадре не читалась вовсе — вся
    // разница пропадала за блумом.
    float wave = tnoise(w * 0.05 + vec2(0.0, -uTime * 0.55)) * 0.65
               + tnoise(w * 0.17 + vec2(0.0, -uTime * 1.15)) * 0.35;
    wave = smoothstep(0.25, 0.85, wave);
    float breath = 0.45 + 0.55 * sin(uTime * 2.3 + tnoise(w * 0.03) * 12.0);
    // ★ ДВИЖЕНИЕ ЕСТЬ, ЯРКОСТИ НЕТ. Подняв размах волны, я заодно поднял и
    // средний уровень — склон превратился в сплошную светящуюся паутину.
    // Волна должна ГАСИТЬ и РАЗЖИГАТЬ уже имеющееся свечение, а не добавлять
    // своё: множитель гуляет около единицы, а не растёт.
    // Светится не всякая трещина, а самое ядро горячих: куб по глубине шва и
    // квадрат по маске жара оставляют лишь стержни сети. Постоянного уровня
    // нет вовсе — без волны и дыхания свечение гаснет почти в ноль.
    float heat = cr * cr * cr * hot * hot * (0.02 + breath * 0.3 + wave * 0.9);
    float core = smoothstep(0.55, 0.95, cr);
    vec3 hotCol = mix(uGlowCol, vec3(3.2, 1.9, 0.9), core * 0.55);
    // ★ УГОЛЬКОВ НА ЗЕМЛЕ НЕТ. Вспыхивающие точки по всей поверхности читались
    // жёлтой рябью, а не жаром: они сидели на каждой трещине разом и мельтешили
    // по всему кадру. Жар остался в самих швах — он и так дышит.
    gl_FragColor.rgb *= 1.0 - cr * 0.6 * vv;
    gl_FragColor.rgb += hotCol * heat * 1.6 * vv;

    // пузырьковые оспины: поверхность вспученная, а не гладкая
    float ves = smoothstep(0.74, 0.95, tnoise(w * 4.4 + 5.0));
    gl_FragColor.rgb *= 1.0 - ves * 0.22 * vv;
    // прокалённая земля у опасного места тлеет — видно и в тени
    if (vHaz > 0.004) {
      float emb = tnoise(w * 0.6 + 13.0) * 0.6 + tnoise(w * 2.2) * 0.4;
      float pulse = 0.8 + 0.2 * sin(uTime * 1.1 + emb * 9.0);
      gl_FragColor.rgb += uHazCol * vHaz * (0.10 + emb * 0.3) * pulse;
    }
  }
  // воронки от снарядов
  if (uCrN > 0.5) for (int ci = 0; ci < CRATERS_N; ci++) {
    float cw = uCrater[ci].w;
    if (cw <= 0.002) continue;
    float cr = uCrater[ci].z;
    float cd = length(vWPos.xz - uCrater[ci].xy) / cr;
    if (cd > 1.25) continue;
    // чаша: к центру темнее и глаже; вал по кромке светлее породы
    float bowl = 1.0 - smoothstep(0.0, 0.95, cd);
    float lip = smoothstep(0.82, 0.98, cd) * (1.0 - smoothstep(0.98, 1.22, cd));
    // ★ СЛЕД, А НЕ ДЫРА. Первый вариант затемнял чашу вдвое и жёг её угольями:
    // на замере десяток воронок менял 38% кадра, и склон превращался в
    // решето. Отметина должна читаться следом удара, а не новым биомом.
    gl_FragColor.rgb *= 1.0 - bowl * 0.3 * cw;
    gl_FragColor.rgb *= 1.0 + lip * 0.28 * cw;
    // свежая воронка ещё дышит жаром по трещинам дна
    float ember = tnoise(vWPos.xz * 1.4 + 3.0);
    gl_FragColor.rgb += vec3(1.4, 0.36, 0.05) * bowl * cw * cw * 0.4
      * smoothstep(0.7, 0.98, ember) * (0.5 + 0.5 * sin(uTime * 2.0 + ember * 8.0));
  }
  // ★ РЕЗ ЛУЧА: СНАЧАЛА РАСПЛАВ, ПОТОМ ЧЁРНОЕ СТЕКЛО. Возраст точки борозды
  // однозначно задан её глубиной по склону — луч прошёл здесь ровно в момент
  // (z − z0)/vz. Поэтому остывание видно КАК ГРАДИЕНТ вдоль полосы: у рабочего
  // конца бело-жёлтый расплав, у дальнего — тёмный базальт. Игрок по этому
  // градиенту и читает, где полосу можно пересечь.
  float lw = 0.0, lm = 0.0, lk = 0.0;
  if (uMarks > 0.5) for (int li = 0; li < MARKS_N; li++) {
    float f = uLaserB[li].y;
    if (f <= 0.002) continue;
    vec3 ls = lasAt(uLaserA[li], vWPos.xz);
    if (ls.x <= 0.001) continue;
    float age = uLaserB[li].x;
    float m = age <= LAS_MOLTEN ? 1.0 : max(0.0, 1.0 - (age - LAS_MOLTEN) / LAS_COOL);
    float w = ls.x * f;
    if (w > lw) { lw = w; lk = ls.x; }
    lm = max(lm, m * w);
  }
  if (lw > 0.001) {
    gl_FragColor.rgb = mix(gl_FragColor.rgb, vec3(0.05, 0.038, 0.042), lw * 0.92);
    // к оси борозды расплав белее — там он глубже и не успел схватиться
    vec3 hot = mix(vec3(1.6, 0.3, 0.03), vec3(3.2, 1.7, 0.55), lk * lk);
    gl_FragColor.rgb += hot * lm      * (0.72 + 0.28 * sin(uTime * 5.0 + vWPos.z * 0.4));
  }

  // ★ СВЕТ ОТ ЛАВЫ. Каждый очаг светит по закону обратного квадрата (смягчённо,
  // чтобы вблизи не выжигало) и по закону косинуса — грань, отвёрнутая от
  // расплава, остаётся тёмной. Это и делает склон читаемым: у лавы светло,
  // вдали от неё по-прежнему темень.
  {
    vec3 nrm = normalize(normal);
    vec3 lit = vec3(0.0);
    for (int gi = 0; gi < GLOWS_N; gi++) {
      float gs = uGlow[gi].w;
      if (gs <= 0.002) continue;
      vec3 d = vec3(uGlow[gi].x - vWPos.x, 6.0, uGlow[gi].y - vWPos.z);
      float dist = length(d);
      float att = gs / (1.0 + (dist * dist) / (uGlow[gi].z * uGlow[gi].z));
      lit += vec3(1.0, 0.34, 0.08) * att * (0.25 + 0.75 * max(0.0, dot(nrm, d / dist)));
    }
    // ★ ПОТОЛОК ОБЯЗАТЕЛЕН. Десять очагов складываются, и без предела сцена
    // превращается в оранжевый лист — проверено. Подсветка должна помогать
    // читать склон, а не заменять собой освещение.
    gl_FragColor.rgb += min(lit * 0.22, vec3(0.34, 0.13, 0.05));
  }

  // луч Ока: мягкое пятно поверх всего, включая тень и туман
  if (uSpot.w > 0.001) {
    float sd = length(vWPos.xz - uSpot.xy) / uSpot.z;
    // ★ ПЯТНО РОВНОЕ, А ГАСНЕТ ТОЛЬКО КРАЙ. Спад от самого центра давал яркую
    // точку и почти ничего вокруг — свет получался неразличимым. У прожектора
    // освещённое место равномерное, размывается лишь кромка.
    // ★ КРОМКА КОРОЧЕ. Плавный спад через полрадиуса не давал понять, где место
    // засветки кончается; обводить кольцом нельзя — читается нарисованным. Ядро
    // шире, переход быстрее: граница есть, а линии нет.
    float f = 1.0 - smoothstep(0.62, 1.0, sd);
    // свет живой: медленное дыхание не даёт пятну слиться с фоном
    f *= 0.9 + 0.1 * sin(uTime * 2.1);
    // ★ СВЕТ ПАДАЕТ ПОД УГЛОМ, А НЕ ПРОСТО КРАСИТ ЗЕМЛЮ. Ровная заливка не
    // учитывала наклон граней: склон, отвёрнутый от башни, светился так же
    // ярко, как обращённый к ней, — оттого пятно и читалось наклейкой. Закон
    // косинуса, но не до полной тени: иначе теневые бока бугров чернеют дырами.
    f *= 0.25 + 0.75 * max(0.0, dot(normalize(normal), uSpotDir));
    // ★ У ПЯТНА ДОЛЖЕН БЫТЬ КРАЙ. Изнутри круг в семьдесят метров занимает
    // весь кадр, и одна заливка читается не прожектором, а перекраской склона.
    // Светлый обод даёт границу: её видно, даже когда стоишь в центре, и по
    // ней понятно, куда луч уходит.
    // ★ СВЕТ ПОДСВЕЧИВАЕТ, А НЕ ПЕРЕКРАШИВАЕТ. Прибавка постоянного оранжевого
    // забивала собственный цвет земли: под пятном пепел, обсидиан и клинкер
    // становились одинаково рыжими. Умножение сохраняет породу и меняет только
    // яркость — как и ведёт себя настоящий свет.
    // ★ ОБВОДКИ НЕТ. Светлый обод по краю читался нарисованным кольцом, а не
    // светом; у пятна прожектора край просто размытый.
    gl_FragColor.rgb *= 1.0 + uSpot.w * f * 3.0;
    // ★ ЯДРО СВЕТА БЕЛЕЕ КАЙМЫ. Один и тот же оранжевый по всей площади давал
    // грязный ржавый налёт; у сильного источника середина выбелена, а тёплый
    // оттенок остаётся по краю — так это и читается светом, а не краской.
    vec3 sc = mix(uSpotCol, vec3(1.25, 1.05, 0.8), f * f);
    gl_FragColor.rgb += sc * uSpot.w * f * 0.16;
  }
}`)},t})(),this.pineMat=new Ue({color:Ne.pine,flatShading:!0,vertexColors:!0}),this.rockMat=new Ue({color:9081512,flatShading:!0}),this.flagMat=new Ue({color:16742972,flatShading:!0}),this.railMat=new Ue({color:2830399,flatShading:!0}),this.pineGeos=aa.map((t,e)=>Px(e)),this.rockGeos=[0,1,2,3].map(t=>Lx(t)),this.cragGeos=[0,1,2,3].map(t=>ep(t)),this.cragMat=new Ue({color:16777215,flatShading:!0,vertexColors:!0}),this.cragSnowGeos=this.cragGeos.map(t=>Dx(t)),this.archGeos=[0,1,2].map(t=>Bd(t)),this.cragSnowMat=new Ue({color:14673653,flatShading:!0}),this.flagGeo=Ix(),this.houseMats=[7037556,8153686,6057853].map(t=>new Ue({color:t,flatShading:!0})),this.roofMats=[4275030,5914680,3559516].map(t=>new Ue({color:t,flatShading:!0,side:we})),this.windowMat=new Ze({color:16762995}),this.lampGlowMat=new Ze({color:16767392}),this.houseGeo=new Te(4.6,2.4,3.6),this.roofGeo=Bu(),this.windowGeo=new Qe(.7,.9),this.snowCapGeo=Bu(),this.roofSnowMat=new Ue({color:15331067,flatShading:!0,side:we}),this.chimneyGeo=new Te(.42,1,.42),this.balconyGeo=new Te(4.9,.12,1.15),this.railGeo=new Te(4.9,.5,.1),this.doorGeo=new Qe(.75,1.35),this.doorMat=new Ue({color:4864556,flatShading:!0}),this.woodMat=new Ue({color:7033916,flatShading:!0}),this.poleGeo=new He(.09,.09,2.4,4),this.poleTopGeo=new Te(.42,.42,.42),this.poleLeftMat=new Ze({color:3108816}),this.poleRightMat=new Ze({color:14171196}),this.signGeo=new Te(2.2,.5,.12),this.signMat=new Ze({color:16765066}),this.awningGeo=new Te(4.4,.1,1.5),this.awningMat=new Ue({color:9194047,flatShading:!0}),this.shopWinGeo=new Qe(2.4,1.1),this.belfryGeo=new Te(.9,1.1,.9),this.spireGeo=new Kn(.75,1.6,4),this.lampPoleGeo=new He(.06,.09,3.1,5),this.lampGlowGeo=new oa(.24,8,6),this.sharedGeos=new Set([...this.pineGeos,...this.rockGeos,...this.cragGeos,...this.cragSnowGeos.filter(Boolean),...this.archGeos,this.flagGeo,this.houseGeo,this.roofGeo,this.windowGeo,this.signGeo,this.awningGeo,this.shopWinGeo,this.belfryGeo,this.spireGeo,this.lampPoleGeo,this.lampGlowGeo,this.poleGeo,this.poleTopGeo]),this.firstBuild=!0,this.cragFieldAdded=(this.group.add(this.cragField),!0),this.queue=[],this.queued=new Set,this.job=null}setTime(t){np=t,this.matUniforms&&(this.matUniforms.uTime.value=t)}setCraters(t){if(!this.matUniforms)return;const e=this.matUniforms.uCrater.value;let n=0;for(let s=0;s<$n;s++)e[s].set(t[s*4],t[s*4+1],Math.max(.5,t[s*4+2]),t[s*4+3]),t[s*4+3]>.002&&n++;this.matUniforms.uCrN.value=n}setLaser(t,e){if(!this.matUniforms)return;const n=this.matUniforms.uLaserA.value,s=this.matUniforms.uLaserB.value;let o=0;for(let r=0;r<un;r++)n[r].set(t[r*4],t[r*4+1],t[r*4+2],t[r*4+3]),s[r].set(e[r*4],e[r*4+1],0,0),e[r*4+1]>.002&&o++;this.matUniforms.uMarks.value=o}setSpot(t,e,n,s){this.matUniforms&&this.matUniforms.uSpot.value.set(t,e,n,s)}setGlows(t){if(!this.matUniforms)return;const e=this.matUniforms.uGlow.value;for(let n=0;n<nc;n++)e[n].set(t[n*4],t[n*4+1],Math.max(1,t[n*4+2]),t[n*4+3])}setSpotDir(t,e,n){this.matUniforms&&this.matUniforms.uSpotDir.value.set(t,e,n).normalize()}get snowMaterial(){return this.snowMat}get pineMaterial(){return this.pineMat}update(t,e){this.updateCrags(e);const n=Math.round(ye(t,e)/St),s=Math.round(e/St),o=new Set,r=[];for(let a=-1;a<=Tx;a++)for(let c=-zu;c<=zu;c++){const l=n+c,h=s+a,f=l+","+h;o.add(f),this.chunks.has(f)||r.push([l,h,c*c+a*a])}if(r.sort((a,c)=>a[2]-c[2]),this.firstBuild){for(const[a,c]of r)this.buildChunk(a,c);this.firstBuild=!1}else{for(const[a,c]of r){const l=a+","+c;this.queued.has(l)||(this.queued.add(l),this.queue.push([a,c]))}this.stepBuild(o)}for(const[a,c]of this.chunks)o.has(a)||(this.disposeChunk(c),this.chunks.delete(a))}static{this.BUILD_MS=3}stepBuild(t){const e=performance.now();for(;performance.now()-e<Yl.BUILD_MS;){if(!this.job){let n;for(;n=this.queue.shift();){const s=n[0]+","+n[1];if(t.has(s)&&!this.chunks.has(s))break;this.queued.delete(s),n=void 0}if(!n)return;this.job={cx:n[0],cz:n[1],stage:0,i:0,geo:null,flat:null,colors:null,glows:null,hots:null,group:null}}this.stepJob()&&(this.job=null)}}stepJob(){const t=this.job,e=t.cx*St,n=t.cz*St,s=oe(e,n),o=260;if(t.stage===0){const c=new Qe(St,St,xr,xr);return c.rotateX(-Math.PI/2),t.geo=c,t.stage=1,t.i=0,!1}if(t.stage===1){const c=t.geo.attributes.position,l=Math.min(c.count,t.i+o);for(let h=t.i;h<l;h++){const f=e+c.getX(h),d=n+c.getZ(h);c.setY(h,mi(f,d)),c.setX(h,oe(f,d)-s)}return t.i=l,l>=c.count&&(t.stage=2,t.i=0),!1}if(t.stage===2){const c=Yi(t.geo);return t.geo.dispose(),t.geo=null,c.computeVertexNormals(),t.flat=c,t.colors=new Float32Array(c.attributes.normal.count*3),t.glows=new Float32Array(c.attributes.normal.count),t.hots=new Float32Array(c.attributes.normal.count),t.stage=3,t.i=0,!1}if(t.stage===3){const c=t.flat,l=c.attributes.normal,h=c.attributes.position,f=t.colors,d=t.glows,p=t.hots,m=Nn(e,n),v={r:0,g:0,b:0,glow:0,hot:0},g=Math.min(l.count,t.i+o);for(let u=t.i;u<g;u++){const x=n+h.getZ(u),_=ye(s+h.getX(u),x);yl(v,_,x,l.getY(u),h.getY(u));let M=v.r,E=v.g,b=v.b;if(m){const T=yo(m,_,x);if(T.d2<49){const y=1-Math.max(0,Math.min(1,(Math.sqrt(T.d2)-3.2)/3.5));M+=(ps.r-M)*y,E+=(ps.g-E)*y,b+=(ps.b-b)*y}}const w=Au(_,x,Zt,oe);if(w>.01){const T=w*.85;M+=(.055-M)*T,E+=(.042-E)*T,b+=(.05-b)*T}f[u*3]=M,f[u*3+1]=E,f[u*3+2]=b,d[u]=v.glow??0,p[u]=v.hot??0,p[u]=v.hot??0}return t.i=g,g>=l.count&&(t.stage=4),!1}const r=t.flat;r.setAttribute("color",new Pt(t.colors,3)),r.setAttribute("aGlow",new Pt(t.glows,1)),r.setAttribute("aHazard",new Pt(t.hots,1));const a=new ee;return a.add(new dt(r,this.snowMat)),this.finishChunk(t.cx,t.cz,a,e,n,s),this.queued.delete(t.cx+","+t.cz),!0}buildChunk(t,e){const n=t*St,s=e*St,o=oe(n,s),r=new ee,a=new Qe(St,St,xr,xr);a.rotateX(-Math.PI/2);const c=a.attributes.position;for(let u=0;u<c.count;u++){const x=n+c.getX(u),_=s+c.getZ(u);c.setY(u,mi(x,_)),c.setX(u,oe(x,_)-o)}const l=Yi(a);a.dispose(),l.computeVertexNormals();const h=l.attributes.normal,f=l.attributes.position,d=new Float32Array(h.count*3),p=new Float32Array(h.count),m=new Float32Array(h.count),v=Nn(n,s),g={r:0,g:0,b:0,glow:0,hot:0};for(let u=0;u<h.count;u++){const x=s+f.getZ(u),_=ye(o+f.getX(u),x);yl(g,_,x,h.getY(u),f.getY(u));let M=g.r,E=g.g,b=g.b;if(v){const T=yo(v,_,x);if(T.d2<49){const y=1-Math.max(0,Math.min(1,(Math.sqrt(T.d2)-3.2)/3.5));M+=(ps.r-M)*y,E+=(ps.g-E)*y,b+=(ps.b-b)*y}}const w=Au(_,x,Zt,oe);if(w>.01){const T=w*.85;M+=(.055-M)*T,E+=(.042-E)*T,b+=(.05-b)*T}d[u*3]=M,d[u*3+1]=E,d[u*3+2]=b,p[u]=g.glow??0}l.setAttribute("color",new Pt(d,3)),l.setAttribute("aGlow",new Pt(p,1)),l.setAttribute("aHazard",new Pt(m,1)),r.add(new dt(l,this.snowMat)),this.finishChunk(t,e,r,n,s,o)}finishChunk(t,e,n,s,o,r){const a=ha(t,e),c=a.filter(g=>g.kind==="tree"),l=a.filter(g=>g.kind==="rock"),h=new ne,f=new Ge,d=new F(0,1,0),p=new F,m=new F;for(let g=0;g<this.pineGeos.length;g++){const u=c.filter(_=>(_.variant??0)===g);if(u.length===0)continue;const x=new Ni(this.pineGeos[g],this.pineMat,u.length);u.forEach((_,M)=>{f.setFromAxisAngle(d,ic(_.x,_.z)*Math.PI*2),p.set(_.scale,_.scale*(_.hMul??1),_.scale),m.set(_.x-r,Zt(_.x,_.z)+.05,_.z-o),h.compose(m,f,p),x.setMatrixAt(M,h);const E=_.tint??1;x.setColorAt(M,_r.setRGB(E*.92,E,E*.86))}),x.instanceMatrix.needsUpdate=!0,x.instanceColor&&(x.instanceColor.needsUpdate=!0),n.add(x)}for(let g=0;g<this.rockGeos.length;g++){const u=l.filter(_=>(_.variant??0)===g);if(u.length===0)continue;const x=new Ni(this.rockGeos[g],this.rockMat,u.length);u.forEach((_,M)=>{f.setFromAxisAngle(d,_.rot??0);const E=_.hMul??.7;p.set(_.scale,_.scale*E,_.scale*(_.zMul??1)),m.set(_.x-r,Zt(_.x,_.z)-_.scale*E*.22,_.z-o),h.compose(m,f,p),x.setMatrixAt(M,h),x.setColorAt(M,ec(_.z,_.tint??1,_r))}),x.instanceMatrix.needsUpdate=!0,x.instanceColor&&(x.instanceColor.needsUpdate=!0),n.add(x)}const v=Nn(s,o);if(v){const g=s-St/2,u=s+St/2,x=o-St/2,_=o+St/2;for(const M of v.houses){if(!(M.x>=g&&M.x<u&&M.z>=x&&M.z<_))continue;const E=mi(M.x,M.z)-.15,b=new ee,w=M.kind,T=M.bodyH,y=M.wide,S=M.deep,A=new dt(this.houseGeo,this.houseMats[M.style]);A.position.y=T/2,A.scale.set(y,T/2.4,S),b.add(A);const R=M.roofPitch,P=y*1.16,U=S*1.16,I=new dt(this.roofGeo,this.roofMats[M.style]);I.position.y=T,I.scale.set(P,R,U),b.add(I);const N=new dt(this.snowCapGeo,this.roofSnowMat);if(N.position.y=T+.13,N.scale.set(P*1.05,R*1.01,U*1.04),b.add(N),M.chimney){const V=new dt(this.chimneyGeo,this.houseMats[(M.style+1)%3]);V.position.set((ic(M.z,M.x)-.5)*2.4*y,T+R*.9,(ic(M.x*3,M.z)-.5)*1.2*S),b.add(V)}if(w===de.HOTEL){for(const Y of[.42,.72]){const j=new dt(this.balconyGeo,this.woodMat);j.position.set(0,T*Y,1.85*S),j.scale.set(y,1,1),b.add(j);const ot=new dt(this.railGeo,this.woodMat);ot.position.set(0,T*Y+.3,1.85*S+.5),ot.scale.set(y,1,1),b.add(ot)}const V=new dt(this.signGeo,this.signMat);V.position.set(0,T*.9,1.82*S+.1),b.add(V);for(let Y=0;Y<3;Y++)for(let j=-1.5;j<=1.5;j++){const ot=new dt(this.windowGeo,this.windowMat);ot.position.set(j*1.15*y,T*(.25+Y*.26),1.81*S+.02),b.add(ot)}}else if(w===de.SHOP){const V=new dt(this.awningGeo,this.awningMat);V.position.set(0,T*.72,1.81*S+.7),V.rotation.x=.22,V.scale.set(y,1,1),b.add(V);const Y=new dt(this.shopWinGeo,this.windowMat);Y.position.set(.3*y,T*.42,1.81*S+.02),Y.scale.set(y,1,1),b.add(Y);const j=new dt(this.signGeo,this.signMat);j.position.set(0,T*.86,1.82*S+.06),b.add(j)}else if(w===de.CHAPEL){const V=new dt(this.belfryGeo,this.houseMats[M.style]);V.position.set(0,T+qi.ROOF_H*R*.9,-1.3*S),b.add(V);const Y=new dt(this.spireGeo,this.roofMats[M.style]);Y.position.set(0,T+qi.ROOF_H*R*.9+1.3,-1.3*S),b.add(Y)}if(w===de.CHALET){const V=1.85*S,Y=new dt(this.balconyGeo,this.woodMat);Y.position.set(0,T*.62,V),Y.scale.set(y,1,1),b.add(Y);const j=new dt(this.railGeo,this.woodMat);j.position.set(0,T*.62+.3,V+.5),j.scale.set(y,1,1),b.add(j)}const G=new dt(this.doorGeo,this.doorMat);G.position.set(-1.4*y,.68,1.81*S+.03),b.add(G);const z=1.81*S;for(const[V,Y,j]of[[.35*y,z+.02,0],[1.4*y,z+.02,0],[.5*y,-z-.02,Math.PI]]){const ot=new dt(this.windowGeo,this.windowMat);ot.position.set(V,T*.55,Y),ot.rotation.y=j,b.add(ot)}b.position.set(oe(M.x,M.z)-r,E,M.z-o),b.rotation.y=M.rot,b.scale.setScalar(M.scale),n.add(b)}for(const M of v.lamps){if(!(M.x>=g&&M.x<u&&M.z>=x&&M.z<_))continue;const E=mi(M.x,M.z),b=oe(M.x,M.z)-r,w=new dt(this.lampPoleGeo,this.railMat);w.position.set(b,E+1.55,M.z-o),n.add(w);const T=new dt(this.lampGlowGeo,this.lampGlowMat);T.position.set(b,E+3.15,M.z-o),n.add(T)}}for(const g of T_(t,e)){const u=zr(g);for(let x=0;x<g.segLen.length;x++){const _=g.pts[x],M=g.pts[x+1],E=(_.z+M.z)/2,b=ye((_.x+M.x)/2,E);if(b<s-St/2||b>=s+St/2||E<o-St/2||E>=o+St/2)continue;const w=u[x],T=u[x+1],y=T-w,S=g.segLen[x],A=Math.sqrt(S*S+y*y)+.4,R=new F(M.x-_.x,y,M.z-_.z).normalize(),P=new F().crossVectors(d,R).normalize(),U=new F().crossVectors(R,P).normalize();h.makeBasis(P,U,R);const I=new F((_.x+M.x)/2-r,(w+T)/2,(_.z+M.z)/2-o),N=new dt(new Te(.45,.18,A),this.railMat);N.position.copy(I).addScaledVector(U,-.09),N.quaternion.setFromRotationMatrix(h),n.add(N);const G=new dt(new Te(.5,.06,A),this.flagMat);if(G.position.copy(I).addScaledVector(U,.03),G.quaternion.setFromRotationMatrix(h),n.add(G),g.ledge){const z=new dt(new Te(.8,1.1,A),this.rockMat);z.position.copy(I).addScaledVector(U,-.72),z.quaternion.setFromRotationMatrix(h),n.add(z)}else{const z=Math.max(1,Math.floor(S/7));for(let V=0;V<z;V++){const Y=(V+.5)/z,j=_.x+(M.x-_.x)*Y,ot=_.z+(M.z-_.z)*Y,wt=w+y*Y,W=Zt(j,ot),et=Math.max(.2,wt-W),tt=new dt(new Te(.16,et,.16),this.railMat);tt.position.set(j-r,W+et/2,ot-o),n.add(tt)}}}}if(Se(o)<.5){const u=Math.ceil((o-St/2)/9)*9;for(let x=u;x<o+St/2;x+=9){const _=re(x);for(const M of[-1,1]){const E=_+M*tn;if(E<s-St/2||E>=s+St/2)continue;const b=M<0?this.poleLeftMat:this.poleRightMat,w=mi(E,x),T=oe(E,x)-r,y=new dt(this.poleGeo,b);y.position.set(T,w+1.2,x-o),n.add(y);const S=new dt(this.poleTopGeo,b);S.position.set(T,w+2.5,x-o),n.add(S)}}}for(const g of E_(t,e)){const u=.8+g.h*.14;for(const x of[-1,1]){const _=g.x+x*(g.halfW+.7),M=g.z-.5,E=new dt(this.flagGeo,this.flagMat);E.position.set(oe(_,M)-r,mi(_,M),M-o),E.scale.set(x*u,u,u),n.add(E)}}n.position.set(r,0,o),this.group.add(n),this.chunks.set(t+","+e,n)}updateCrags(t){this.updateArches(t,2600,700);const s=Math.floor((t-700)/fl),o=Math.ceil((t+2600)/fl);for(let r=s;r<=o;r++){if(this.cragBuilt.has(r))continue;const a=ca(r);if(a){this.cragBuilt.set(r,this.buildCrag(a));break}}for(const[r,a]of this.cragBuilt)r>=s&&r<=o||(this.cragField.remove(a),a.traverse(c=>{c instanceof dt&&!this.sharedGeos.has(c.geometry)&&c.geometry.dispose()}),this.cragBuilt.delete(r))}updateArches(t,e,n){const s=Math.floor((t-n)/Mu),o=Math.ceil((t+e)/Mu);for(let r=s;r<=o;r++){if(this.archBuilt.has(r))continue;const a=Fd(r);if(a){this.archBuilt.set(r,this.buildArch(a));break}}for(const[r,a]of this.archBuilt)r>=s&&r<=o||(this.cragField.remove(a),a instanceof Ni&&a.dispose(),this.archBuilt.delete(r))}buildArch(t){const e=t.x+_o(t.z),n=t.span*.5,s=this.archGeos[t.variant],o=s.userData.groundY??0,r=Math.min(Zt(e-n,t.z),Zt(e+n,t.z),Zt(e,t.z))-(o+.03)*t.height,a=new Ni(s,this.cragMat,1),c=new ne;return c.compose(new F(0,0,0),new Ge,new F(t.span,t.height,t.span)),a.setMatrixAt(0,c),a.setColorAt(0,ec(t.z,t.tint,_r)),a.instanceMatrix.needsUpdate=!0,a.instanceColor&&(a.instanceColor.needsUpdate=!0),a.position.set(e,r,t.z),this.cragField.add(a),a}buildCrag(t){const e=new ee,n=t.x+_o(t.z),s=t.mound?.42:.56,o=Zt(n,t.z)-t.scale*t.hMul*s,r=new Ni(this.cragGeos[t.variant],this.cragMat,1),a=new ne,c=new Ge().setFromAxisAngle(new F(0,1,0),t.rot),l=new F(t.scale,t.scale*t.hMul,t.scale*t.zMul);a.compose(new F(0,0,0),c,l),r.setMatrixAt(0,a),r.setColorAt(0,ec(t.z,t.tint,_r)),r.instanceMatrix.needsUpdate=!0,r.instanceColor&&(r.instanceColor.needsUpdate=!0),e.add(r);const h=this.cragSnowGeos[t.variant];if(t.snowTop&&h&&Se(t.z)<.25){const f=new Ni(h,this.cragSnowMat,1);f.setMatrixAt(0,a),f.instanceMatrix.needsUpdate=!0,e.add(f)}return e.position.set(n,o,t.z),this.cragField.add(e),e}disposeChunk(t){this.group.remove(t),t.traverse(e=>{e instanceof dt&&!this.sharedGeos.has(e.geometry)&&e.geometry.dispose()})}}function ic(i,t){const e=Math.sin(i*12.9898+t*78.233)*43758.5453;return e-Math.floor(e)}const Sl=48,xs=26,Hu=Sl*xs,Nx=12e3,Fx=2500,zx=2600,Ox=1500,Bx=2e3,kx=3400,Hx=2600,sc={dist:2600,hMul:1.3,phase:137.5},Gx=[{h:1,out:0},{h:.87,out:.08},{h:.72,out:.19},{h:.56,out:.32},{h:.4,out:.45},{h:.26,out:.58},{h:.13,out:.7}],oc=900,Vx=new Q(15659773),Wx=new Q(9078424),Xx=new Q(16761754),qx=`
varying vec3 vCol;
varying float vDist;
attribute vec3 color;
void main() {
  vCol = color;
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  vDist = -mv.z;
  gl_Position = projectionMatrix * mv;
}
`,Yx=`
uniform vec3 uHaze;
uniform vec3 uTint;
uniform float uNear;
uniform float uFar;
varying vec3 vCol;
varying float vDist;
void main() {
  float h = clamp((vDist - uNear) / (uFar - uNear), 0.0, 1.0);
  // Потолок дымки 0.62, а не единица: полностью растворённая вершина — это
  // просто пятно тумана, а весь смысл главной горы в том, что она ВИДНА.
  // На закате снег дальней стены светлее неба, а не бледнее его.
  // тон биома ложится на СВОЙ цвет вершины, но не на дымку: иначе дальний
  // хребет разойдётся по тону с туманом сцены и вырежется из картинки
  gl_FragColor = vec4(mix(vCol * uTint, uHaze, h * 0.62), 1.0);
}
`,Zx=`
attribute float aA;
varying float vA;
varying float vDist;
void main() {
  vA = aA;
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  vDist = -mv.z;
  gl_Position = projectionMatrix * mv;
}
`,Kx=`
uniform vec3 uCol;
uniform float uNear;
uniform float uFar;
varying float vA;
varying float vDist;
void main() {
  float h = clamp((vDist - uNear) / (uFar - uNear), 0.0, 1.0);
  gl_FragColor = vec4(uCol, vA * (1.0 - h * 0.55));
}
`;class jx{constructor(){this.group=new ee,this.mat=new me({vertexShader:qx,fragmentShader:Yx,uniforms:{uHaze:{value:Ne.fog},uTint:{value:new Q(16777215)},uNear:{value:900},uFar:{value:9e3}},fog:!1,side:we}),this.plumeMat=new me({vertexShader:Zx,fragmentShader:Kx,uniforms:{uCol:{value:new Q(16643052)},uNear:{value:900},uFar:{value:9e3}},transparent:!0,depthWrite:!1,side:we,fog:!1}),this.live=new Map}get material(){return this.mat}update(t){const e=Math.floor((t-Fx)/Hu),n=Math.floor((t+Nx)/Hu);for(let s=e;s<=n;s++)for(const o of[-1,1])for(const r of[0]){const a=o+":"+s+":"+r;if(this.live.has(a))continue;const c=this.build(o,s,r);this.live.set(a,c),this.group.add(c)}for(const[s,o]of this.live){const r=Number(s.split(":")[1]);if(!(r>=e&&r<=n)){this.group.remove(o),o.geometry.dispose();for(const a of o.children)a instanceof dt&&a.geometry.dispose();this.live.delete(s)}}}crest(t,e,n=0){const s=(t>0?0:53.7)+(n?sc.phase:0),o=u=>1-Math.abs(u),r=o(rt(e*22e-5+s,3.1)),a=o(rt(e*.00105+s,8.7)),c=o(rt(e*.0026+s,15.3)),l=o(rt(e*.0045+s,27.4)),h=Math.pow(r*.5+a*.31+c*.13+l*.06,1.35),f=rt(e*16e-5+s+61.3,47.1)*.5+.5,d=Math.max(0,Math.min(1,(f-.52)/.26)),p=d*d*(3-2*d),m=(kx+Hx*h)*(.22+.78*p)*(n?sc.hMul:1),v=zx+Ox*(rt(e*35e-5-s,21.9)*.5+.5)+(1-p)*2600+(n?sc.dist:0),g=_o(e)+t*Math.max(Bx+oc,v);return{x:g,y:Zt(g,e)-900,h:m,dist:v,summit:h}}build(t,e,n){const s=[],o=[],r=new Q,a=new F,c=new F,l=new F,h=(u,x,_,M)=>{s.push(u.x,u.y,u.z);const E=Math.max(0,Math.min(1,(u.t-.16)/.26)),b=Math.max(0,Math.min(1,(_-.52)/.3));let w=E*E*(3-2*E)*(1-b*b*(3-2*b)*.9);w*=1-u.rib*.3;const T=Math.max(0,Math.min(1,(u.t-.76)/.2));w*=1-T*T*(3-2*T)*.5,r.copy(Wx).lerp(Vx,w),r.multiplyScalar(.62+x*.62),r.lerp(Xx,Math.max(0,x)*M*.5),o.push(r.r,r.g,r.b)},f=(u,x,_)=>{a.set(x.x-u.x,x.y-u.y,x.z-u.z),c.set(_.x-u.x,_.y-u.y,_.z-u.z),l.crossVectors(a,c).normalize(),l.y<0&&l.negate();const M=Math.max(0,l.dot(ki)),E=1-l.y;h(u,M,E,u.t),h(x,M,E,x.t),h(_,M,E,_.t)},d=[],p=[];for(let u=0;u<=xs;u++){const x=(e*xs+u)*Sl,_=this.crest(t,x,n);p.push(_);const M=rt(x*.0125+t*7.3+n*19,41.2)*.5+.5,E=rt(x*.0036-t*3.1+n*5,63.8)*.5+.5,b=Math.pow(M*.62+E*.38,1.25),w=[];for(const T of Gx){const y=oc*T.out*(.55+b*.9);w.push({x:_.x-t*y,y:_.y+_.h*T.h,z:x,t:T.h,rib:b})}w.push({x:_.x-t*oc,y:_.y-_.h*.5,z:x,t:0,rib:b}),d.push(w)}for(let u=0;u<xs;u++){const x=d[u],_=d[u+1];for(let M=0;M<x.length-1;M++)f(x[M],_[M],_[M+1]),f(x[M],_[M+1],x[M+1])}const m=new Gt;m.setAttribute("position",new kt(s,3)),m.setAttribute("color",new kt(o,3));const v=new dt(m,this.mat);v.renderOrder=-1.9,v.frustumCulled=!1;let g=0;for(let u=1;u<=xs;u++)p[u].summit>p[g].summit&&(g=u);if(p[g].summit>.5){const u=p[g],x=(e*xs+g)*Sl,_=this.buildPlume(d[g][0],u.h,x);v.add(_)}return v}buildPlume(t,e,n){const s=rt(n*.003,5.5)>0?1:-1,o=rt(n*.004,9.1)*.7,r=Math.hypot(o,1),a=o/r,c=s/r,l=1500+(rt(n*.002,13.7)*.5+.5)*1900,h=9,f=[],d=[],p=(g,u)=>[t.x+a*l*g,t.y+e*.05*Math.sin(g*2.4)-e*.16*g*g+u,t.z+c*l*g];for(let g=0;g<h;g++){const u=g/h,x=(g+1)/h,_=e*(.035+u*.16),M=e*(.035+x*.16),E=Math.pow(1-u,1.4)*.5,b=Math.pow(1-x,1.4)*.5,[w,T,y]=p(u,_),[S,A,R]=p(u,-_*.35),[P,U,I]=p(x,M),[N,G,z]=p(x,-M*.35);f.push(S,A,R,N,G,z,P,U,I),d.push(E,b,b),f.push(S,A,R,P,U,I,w,T,y),d.push(E,b,E*.5)}const m=new Gt;m.setAttribute("position",new kt(f,3)),m.setAttribute("aA",new kt(d,1));const v=new dt(m,this.plumeMat);return v.renderOrder=-1.85,v.frustumCulled=!1,v}}function fa(i,t){return sx(i,t)+lx(i,t)}const ip=[];function ve(i){const t=new Ue({color:i,flatShading:!0});return ip.push({m:t,base:new Q(i)}),t}const $x=new Q(1.9,.22,.06),Gu=new Q(0,0,0);function Pi(i,t,e,n,s=0,o=0,r=0){const a=new dt(new Te(i,t,e),n);return a.position.set(s,o,r),a}function gs(i,t,e,n,s,o,r=0,a=0,c=0,l=0){const h=s/2,f=[[-i/2,-h,-t/2],[i/2,-h,-t/2],[i/2,-h,t/2],[-i/2,-h,t/2],[-e/2,h,-n/2+l],[e/2,h,-n/2+l],[e/2,h,n/2+l],[-e/2,h,n/2+l]],d=[[0,1,2],[0,2,3],[4,6,5],[4,7,6],[0,4,5],[0,5,1],[1,5,6],[1,6,2],[2,6,7],[2,7,3],[3,7,4],[3,4,0]],p=[];for(const g of d)for(const u of g)p.push(f[u][0],f[u][1],f[u][2]);const m=new Gt;m.setAttribute("position",new kt(p,3)),m.computeVertexNormals();const v=new dt(m,o);return v.position.set(r,a,c),v}function We(i,t,e,n,s,o=0,r=0,a=0,c=1){const l=new He(t,i,e,n,1);l.scale(1,1,c);const h=new dt(l,s);return h.position.set(o,r,a),h}const Jx=16747579,Qx=14248484,Vu=2764880,ty=1975104,Sr=15250574,ey=2829107,ny=16731482,iy=1908784,sy=2303535,Wu=1778736,oy=8377576,Xu=3490472,ry=5134924,qu=13617076,Tn=.26,En=.24,io=.62,ay=.12,rc=.3,Yu=.8,cy=.9,ly=.85,Zu=.55,hy=.2,Ku=.7;class uy{constructor(){this.root=new ee,this.lean=new ee,this.hips=new ee,this.torso=new ee,this.thighF=new ee,this.thighB=new ee,this.shinF=new ee,this.shinB=new ee,this.armFrontUpper=new ee,this.armFrontLower=new ee,this.armBackUpper=new ee,this.armBackLower=new ee,this.crouchSm=0,this.head=new ee,this.lookSm=0,this.lean.add(this.buildBoard());const t=ve(Vu),e=ve(ty),n=ve(ey),s=[{thigh:this.thighF,shin:this.shinF,z:.3},{thigh:this.thighB,shin:this.shinB,z:-.3}];this.hips.add(We(.175,.165,.14,8,ve(Vu),0,io-.05,0,.78));for(const f of s)f.thigh.rotation.y=f.z>0?.22:-.12,f.thigh.position.set(0,io,f.z*rc),f.thigh.add(We(.115,.092,Tn,6,t,0,-Tn/2,0,1.1)),f.shin.position.set(0,-Tn,0),f.shin.add(We(.09,.075,En,6,e,0,-En/2,0,1.05)),f.shin.add(gs(.185,.28,.16,.2,.13,n,0,-En-.05,.02,-.03)),f.shin.add(gs(.17,.1,.15,.08,.16,n,0,-En+.03,-.1,-.02)),f.thigh.add(f.shin),this.hips.add(f.thigh);this.lean.add(this.hips);const o=ve(Jx),r=ve(Qx);this.torso.position.y=io,this.torso.rotation.y=Yu,this.torso.rotation.order="ZXY",this.torso.add(We(.18,.16,.16,8,r,0,.06,0,.72)),this.torso.add(We(.16,.225,.28,8,o,0,.28,0,.66)),this.torso.add(We(.225,.15,.12,8,o,0,.48,0,.7)),this.torso.add(We(.1,.088,.1,8,r,0,.56,0,.92)),this.torso.add(gs(.28,.13,.24,.11,.28,ve(ry),0,.32,-.19)),this.torso.add(Pi(.06,.26,.05,ve(qu),-.09,.34,-.14)),this.torso.add(Pi(.22,.045,.045,ve(qu),0,.25,-.32));const a=this.head;a.position.y=.64,a.add(We(.098,.115,.14,8,ve(Sr),0,.05,0,1)),a.add(We(.115,.108,.11,8,ve(Sr),0,.17,0,1)),a.add(We(.121,.121,.075,8,ve(Wu),0,.155,0,1));const c=new dt(new He(.128,.126,.085,7,1,!0,-1.05,2.1),ve(oy));c.position.y=.155,a.add(c);const l=(f,d,p)=>{const m=new dt(new He(d,d,p,7,1,!0,-1.1,2.2),ve(Wu));return m.position.y=f,m};a.add(l(.203,.131,.028)),a.add(l(.108,.129,.028)),a.add(gs(.055,.05,.038,.05,.055,ve(Sr),0,.098,.108)),a.add(gs(.115,.055,.085,.05,.05,ve(Sr),0,.038,.075)),a.add(We(.124,.108,.1,8,ve(Xu),0,.25,0,1)),a.add(We(.133,.133,.05,8,ve(2765698),0,.24,0,1)),a.add(We(.074,.028,.07,8,ve(Xu),0,.32,0,1)),this.torso.add(a);const h=[{up:this.armFrontUpper,low:this.armFrontLower,side:-1},{up:this.armBackUpper,low:this.armBackLower,side:1}];for(const f of h)f.up.position.set(f.side*.26,.43,0),f.up.add(We(.082,.068,.26,6,o,0,-.13,0,1.05)),f.low.position.set(0,-.26,0),f.low.add(We(.066,.055,.24,6,r,0,-.12,0,1.05)),f.low.add(gs(.11,.13,.09,.11,.12,ve(2237998),0,-.29,.01)),f.up.add(f.low),this.torso.add(f.up);this.lean.add(this.torso),this.root.add(this.lean)}setHeat(t){const e=Math.max(0,Math.min(1,t)),n=e*e;for(const s of ip)s.m.color.copy(s.base).lerp($x,n*.85),Gu.setRGB(1.5*n*n,.25*n*n,.05*n*n),s.m.emissive.copy(Gu)}buildBoard(){const t=new ee,e=ve(ny),n=ve(iy);ve(14673653);const s=ve(sy),o=[[0,-.81],[.105,-.74],[.145,-.52],[.15,-.2],[.128,.06],[.15,.32],[.145,.56],[.105,.75],[0,.81]],r=(a,c,l)=>{const h=[],f=(m,v,g)=>{h.push(m[0],m[1],m[2],v[0],v[1],v[2],g[0],g[1],g[2])},d=m=>Math.max(0,(Math.abs(m)-.42)/.39)**2*.11;for(let m=0;m<o.length-1;m++){const[v,g]=o[m],[u,x]=o[m+1],_=d(g),M=d(x),E=[-v,a+_,g],b=[v,a+_,g],w=[-u,a+M,x],T=[u,a+M,x],y=[-v,c+_,g],S=[v,c+_,g],A=[-u,c+M,x],R=[u,c+M,x];f(E,b,T),f(E,T,w),f(y,R,S),f(y,A,R),f(b,S,R),f(b,R,T),f(E,A,y),f(E,w,A)}const p=new Gt;return p.setAttribute("position",new kt(h,3)),p.computeVertexNormals(),new dt(p,l)};t.add(r(.072,.05,e)),t.add(r(.05,.036,n));for(const a of[.3,-.3])t.add(Pi(.26,.03,.24,s,0,.085,a)),t.add(Pi(.24,.16,.04,s,0,.16,a-.12)),t.add(Pi(.22,.035,.05,ve(3817293),0,.14,a+.06)),t.add(Pi(.2,.03,.05,ve(3817293),0,.1,a-.02));return t.add(Pi(.12,.02,.1,ve(3356479),0,.09,0)),t}pose(t,e){let n=-t.steer*.45;const s=t.airborne||t.tumble?0:t.crouch;let o=s*.12,r=0,a=0,c=0;t.airborne&&(o=-.15,n*=.5,a=.45+.55*t.grabT,c=t.grabT,r=-.12-.18*t.grabT,o+=(t.brakeSide??0)>0?-.42*t.grabT:.5*t.grabT),t.tumble&&(o=-1.5,n=.3,r=-.25);const l=t.switchRide?-1:1;n*=l,t.tumble||(o*=l);const h=j=>1-Math.exp(-j*e);this.lean.rotation.z+=(n-this.lean.rotation.z)*h(11),this.lean.rotation.x+=(o-this.lean.rotation.x)*h(9),this.lean.position.y+=(r-this.lean.position.y)*h(16),this.crouchSm+=(s-this.crouchSm)*h(14);const f=this.crouchSm,d=io-f*.28;this.hips.position.y=d-io,this.torso.position.y=d,this.torso.position.z=t.grabT*.28*l*((t.brakeSide??0)>0?-.8:1);const p=j=>Math.max(-1,Math.min(1,j)),m=(j,ot,wt)=>{const W=ot-j,et=ay-d,tt=Math.min(Math.hypot(W,et),Tn+En-.004),st=Math.atan2(W,-et),pt=Math.acos(p((Tn*Tn+tt*tt-En*En)/(2*Tn*tt))),Tt=Math.PI-Math.acos(p((Tn*Tn+En*En-tt*tt)/(2*Tn*En)));return[-(st+pt)-wt,Tt+wt]},[v,g]=m(.3*rc,.3,a*.8),[u,x]=m(-.3*rc,-.3,a*.4);this.thighF.rotation.x=v,this.shinF.rotation.x=g,this.thighB.rotation.x=u,this.shinB.rotation.x=x,this.torso.rotation.x=(f*.3+a*.25)*(t.tumble?1:l)+t.grabT*1.55*l;const _=(t.tumble?0:t.steer)*l,M=Yu*(1-.92*t.grabT)+(t.switchRide?cy:0)+t.spin*ly,E=Math.max(-Ku,Math.min(Ku,-t.bank*Zu));this.torso.rotation.z+=(-_*.26+E-this.torso.rotation.z)*h(8),this.torso.rotation.y+=(M+_*.2-this.torso.rotation.y)*h(8);const b=M+_*.2,w=t.switchRide?Math.PI+.25*l:t.lookYaw*.85+.25*l,T=t.tumble?0:Math.max(-1,Math.min(1,w-b));this.lookSm+=(T-this.lookSm)*h(7),this.head.rotation.y=this.lookSm,this.head.rotation.z=_*.12+E*(hy/Zu),this.head.rotation.x=-t.crouch*.15+(t.airborne?.1:0);const y=Math.sin(t.time*5.2)*.09*t.speedN,S=Math.sin(t.time*3.7+1.9)*.07*t.speedN,A=(t.brakeSide??0)>0,R=A?0:c,P=A?c:0,U=-.35-R*.63+_*.55+y*(1-R),I=-.25-R*1.25-Math.abs(_)*.25+S*(1-R),N=Math.abs(t.spin)*(1-c)*.85,G=(-.35-R*.18)*l-_*.3*(1-R)-N;this.armFrontUpper.rotation.x+=(U-this.armFrontUpper.rotation.x)*h(12),this.armFrontLower.rotation.x+=(I-this.armFrontLower.rotation.x)*h(12),this.armFrontUpper.rotation.z+=(G-this.armFrontUpper.rotation.z)*h(12);const z=.3+a*.4-_*.5-y+Math.abs(t.spin)*.35+P*1.15,V=-.4-Math.abs(_)*.3-S-P*.95,Y=(.4+Math.abs(_)*.35+a*.3+P*.22)*l+N;this.armBackUpper.rotation.x+=(z-this.armBackUpper.rotation.x)*h(12),this.armBackLower.rotation.x+=(V-this.armBackLower.rotation.x)*h(12),this.armBackUpper.rotation.z+=(Y-this.armBackUpper.rotation.z)*h(12)}}const fy=14,dy=48,py=44,my=60;function gy(i){return(i-Math.round(i))*360}function vy(i,t){const e=Math.min(1,Math.abs(i)/my),n=t-fy,s=Math.min(1,Math.abs(n)/(n>=0?dy:py));return(1-e*e)*(1-s*s)}function My(i){return i>=.93?{mult:2,label:"PERFECT"}:i>=.82?{mult:1.5,label:"SOLID"}:{mult:1,label:""}}function _y(i){const t=Math.abs(i)%180;return Math.min(t,180-t)}function xy(i){const t=Math.abs(i)%1;return Math.min(t,1-t)*360}function sp(i){const t=Math.abs(i),e=Math.round(t/180)*180,n=_y(i)<=45?e:Math.floor(t/180)*180;return Math.sign(i)*n}function yy(i){const t=Math.abs(sp(i));return t<180?null:(i>0?"FS ":"BS ")+t}function op(i){const t=Math.round(Math.abs(i));if(t<1)return null;const e=i>0?"BACKFLIP":"FRONTFLIP";return t===1?e:t===2?"DOUBLE "+e:t+"× "+e}function ju(i){const t=[],e=op(i.flipTurns),n=yy(i.spinDeg);return e&&t.push(e),n&&t.push(n),i.grabTime>.15&&t.push("INDY"),t.join(" + ")}function Sy(i,t,e){const n=[],s=Math.floor(Math.abs(t)+.3);if(s>=1){const r={flipTurns:Math.sign(t)*s},a=op(r.flipTurns);a&&n.push(a)}const o=Math.floor(Math.abs(i)/180)*180;return o>=180&&n.push((i>0?"FS ":"BS ")+o),e>.15&&n.push("INDY"),n.join(" + ")}function wy(i){const t=Math.abs(sp(i.spinDeg)),e=Math.round(Math.abs(i.flipTurns));let n=t*1+e*450+i.grabTime*350+i.airTime*60;return t===0&&e===0&&i.grabTime<=.15&&(n=0),Math.round(n/10)*10}function Ie(i,t){return Zt(i,t)-fa(i,t)}const by=2.5,Ty=.35,Ey=3.5,Ay=.03,Ry=.003,Cy=.0014,$u=17,Ju=33,Py=2.8,Ly=.45,Dy=.85,ac=8,Iy=[5,10,16],Uy=.25,cc=.8,Ny=23,Fy=.95,Qu=20,lc=55,hc=4,so=16,zy=.65,Oy=.28,By=48,ky=.62,Hy=1.14,Gy=.62,Vy=.5,tf=1.35,ef=4,Wy=1.15,nf=.85,Xy=3,sf=33,qy=50,of=3.6,Yy=13.6,rf=7,Zy=7.5,af=14,cf=10,Ky=.55,lf=.18,hf=.35,jy=.72,$y=.15,Jy=100,Qy=4.5,tS=3.7,eS=8.5,uf=.72,nS=1.2,iS=.9,sS=13,ff=1.35,vs=.9,uc=.5,oS=1.1,df=2.4,rS=3.2,aS=15,cS=.85,lS=.9,pf=2.2,hS=5.5,uS=.18,fS=.55,dS=18,pS=6.5,mS=2,mf=.4,gf=15,gS=2.2,vS=4.6;class MS{constructor(){this.rig=new uy,this.pos=new F(0,Ie(0,0),0),this.velH=new F(0,0,so),this.vy=0,this.heading=0,this.grounded=!0,this.airTime=0,this.quat=new Ge,this.carve=0,this.speed=so,this.surfaceKind=0,this.charge=0,this.gripSm=1.25,this.skid=0,this.switchRide=!1,this.poseTime=0,this.alignT=0,this.sideGripSm=1,this.trickYaw=0,this.trickFlip=0,this.grabTime=0,this.tumbleT=0,this.spinVel=0,this.flipVel=0,this.prevPos=this.pos.clone(),this.prevQuat=new Ge,this.prevTrickYaw=0,this.prevTrickFlip=0,this.landing=null,this.prevResetHeld=!1,this.airBrake=0,this.wobbleT=0,this.brakeSide=0,this.stuckT=0,this.wasReset=!1,this.railTilt=0,this.railTiltVel=0,this.railSide=1,this.lastSteer=0,this.steerSmooth=0,this.grabbing=!1,this.groundVy=0,this.landCooldown=0,this.launchedOffKicker=!1,this.crashed=!1,this.grazed=!1,this.hitCooldown=0,this.meltT=0,this.heat=0,this.lavaLift=0,this.crackHot=0,this.justMelted=!1,this.onRoof=!1,this.grinding=!1,this.grindTime=0,this.grindRail=null,this.grindArc=0,this.grindVel=0,this.railCooldown=0,this.grindEnded=null,this.prevJumpHeld=!1,this.targetQuat=new Ge,this.normal=new F(0,1,0),this.tmpP=new F,this.grad=new Kt,this.tmpF=new F,this.tmpR=new F,this.tmpM=new ne,this.worldUp=new F(0,1,0),this.qYaw=new Ge,this.qFlip=new Ge,this.axisY=new F(0,1,0),this.axisX=new F(1,0,0)}get headingDir(){return this.tmpF.set(Math.sin(this.heading),0,Math.cos(this.heading))}get tumbling(){return this.tumbleT>0}get steerAmount(){return this.steerSmooth}update(t,e){const n=e.resetHeld&&!this.prevResetHeld;if(this.prevResetHeld=e.resetHeld,n&&!this.grinding&&this.resetToPiste(),this.justMelted=!1,this.meltT>0){this.meltT=Math.max(0,this.meltT-t),this.velH.multiplyScalar(.82),this.speed*=.82,this.pos.y-=1.4*t,this.meltT===0&&this.respawnFromLava(),this.prevPos.copy(this.pos),this.prevQuat.copy(this.quat);return}{const m=ye(this.pos.x,this.pos.z),v=Ie(this.pos.x,this.pos.z);if(this.pos.y-v<3.5)for(const g of qd(m,this.pos.z)){const u=Yd(g,Tu());if(u<=.05)continue;const x=m-g.u,_=this.pos.z-g.z;if(!(x*x+_*_>g.r*g.r)){this.grounded=!1,this.vy=Math.max(this.vy,9+u*9),this.airTime=0;break}}}this.tumbleT<=0&&(q_(this.pos.x,this.pos.y,this.pos.z)||Y_(this.pos.x,this.pos.z))&&(this.velH.multiplyScalar(.25),this.tumbleT=vs,this.crashed=!0,this.trickYaw=0,this.trickFlip=0,this.spinVel=0,this.flipVel=0,this.airTime=0);{const m=ye(this.pos.x,this.pos.z),v=Ka(m,this.pos.z,Zt,oe);if(v!==null&&this.pos.y<v+1.1){const u=Math.max(0,Math.min(1,(v-this.pos.y)/1.6));if(this.heat+=t/df*(1+u*(rS-1)),this.speed>9){const x=1-Math.min(.4,t*.28);this.velH.multiplyScalar(x),this.speed*=x}}else{let u=0;if(this.grounded&&this.pos.y-Ie(this.pos.x,this.pos.z)<1.2){const E=Se(this.pos.z);if(E>.05){const b=Math.max(.001,this.speed),w=this.velH.x/b*.75,T=this.velH.z/b*.75,y=Tu(),S=Math.max(Or(this.pos.x,this.pos.z,y),Math.max(Or(this.pos.x+w,this.pos.z+T,y),Or(this.pos.x-w,this.pos.z-T,y))),A=Ux(this.pos.x,this.pos.z);u=Math.max(S,A*A*.45)*E}}const x=this.pos.y-Ie(this.pos.x,this.pos.z),_=Math.max(0,1-Math.max(0,x-1.5)/4),M=_>0?hx(this.pos.x,this.pos.z)*_:0;this.crackHot=Math.max(u,M),M>.05?this.heat=Math.min(1,this.heat+t/cS*Math.min(1,M*1.7)):u>.06?this.heat=Math.min(1,this.heat+t/(df*4)*Math.min(1,u*2.2)):this.heat=Math.max(0,this.heat-t/aS)}this.heat>=1&&(this.heat=0,this.meltT=oS,this.justMelted=!0,this.crashed=!0,this.grinding=!1,this.grindRail=null,this.trickYaw=0,this.trickFlip=0,this.spinVel=0,this.flipVel=0,this.airTime=0)}this.prevPos.copy(this.pos),this.prevQuat.copy(this.quat),this.prevTrickYaw=this.trickYaw,this.prevTrickFlip=this.trickFlip,this.tumbleT>0&&(this.tumbleT=Math.max(0,this.tumbleT-t)),this.railCooldown>0&&(this.railCooldown=Math.max(0,this.railCooldown-t)),this.landCooldown>0&&(this.landCooldown=Math.max(0,this.landCooldown-t));const s=e.jumpHeld&&!this.prevJumpHeld;this.prevJumpHeld=e.jumpHeld;const o=this.tumbleT>0?0:1;this.wobbleT>0&&(this.wobbleT=Math.max(0,this.wobbleT-t));const r=Math.min(1,this.wobbleT/.6),a=e.steer*o*(1-r*.55);this.steerSmooth+=(a-this.steerSmooth)*(1-Math.exp(-6.5*t));const c=this.steerSmooth;this.lastSteer=c;const l=new F(Math.sin(this.heading),0,Math.cos(this.heading));if(this.grinding)this.updateGrind(t,l,s,e.steer*o);else if(this.grounded){if(this.velH.lengthSq()>4){const A=Math.atan2(this.velH.x,this.velH.z);let R=this.heading-A;R=Math.atan2(Math.sin(R),Math.cos(R));const P=Math.cos(R);P<-.25?this.switchRide=!0:P>.25&&(this.switchRide=!1)}const m=c,v=Math.min(1,this.speed/lc),g=by*(1-(1-Ty)*v);this.heading+=m*g*t,l.set(Math.sin(this.heading),0,Math.cos(this.heading));const u=Td(ye(this.pos.x,this.pos.z),this.pos.z);this.surfaceKind=u.kind,$a(this.pos.x,this.pos.z,this.grad);const x=o>0&&e.tuckHeld?1:0,_=o>0?e.brake:0,M=_!==0?1:0,E=$u*u.accel*(1+(Hy-1)*x);if(this.velH.x+=-this.grad.x*E*t,this.velH.z+=-this.grad.y*E*t,this.speed<ac||this.stuckT>cc){let A=!1;for(let R=0;R<8&&!A;R++){const P=R/8*Math.PI*2,U=Math.cos(P),I=Math.sin(P);let N=0,G=0;for(const V of Iy){const Y=Ie(this.pos.x+U*V,this.pos.z+I*V)-this.pos.y;Y>N&&(N=Y),G=Y}const z=Uy+this.speed*this.speed/(2*$u);N<z&&G<-.4&&(A=!0)}this.stuckT=A?0:this.stuckT+t}else this.stuckT=0;if(o>0&&this.stuckT>cc){const A=Ny*Math.min(1,(ac-this.speed)/2);this.velH.x+=Math.sin(this.heading)*A*t,this.velH.z+=Math.cos(this.heading)*A*t}const b=Math.hypot(this.grad.x,this.grad.y),w=Fy*u.grip*(1+Math.abs(c)*.55),T=Math.max(0,b-w);if(T>0){const A=Math.max(.001,b);this.velH.x+=-this.grad.x/A*T*Qu*t,this.velH.z+=-this.grad.y/A*T*Qu*t}const y=1/(1+T*5),S=this.velH.length();if(S>.01){const A=Math.atan2(this.velH.x,this.velH.z);let R=this.heading-A;if(R=Math.atan2(Math.sin(R),Math.cos(R)),M>0){const W=Math.abs(R)>Math.PI/2?Math.sign(R)*Math.PI:0,et=_,tt=c*et>0?Math.min(1,Math.abs(c)):0;let pt=W+et*(tf+tt*(Math.PI-tf))-R;pt=Math.atan2(Math.sin(pt),Math.cos(pt)),tt>0&&Math.abs(pt)>Math.PI-.2&&(pt=et*Math.abs(pt));const Tt=Math.max(-ef*t,Math.min(ef*t,pt));this.heading+=Tt,R+=Tt}let P=R;const U=Math.abs(P)>Math.PI/2?Math.sign(P)*Math.PI:0;if(P-=U,M>0)this.alignT=0;else if(c===0){this.alignT=Math.min(nf,this.alignT+t);const W=this.alignT/nf,et=W*W*(3-2*W),tt=Wy*et*(1+Xy*Math.abs(Math.sin(P))),st=Math.max(-tt*t,Math.min(tt*t,-P));this.heading+=st,P+=st}else this.alignT=0;l.set(Math.sin(this.heading),0,Math.cos(this.heading)),this.gripSm+=(u.grip-this.gripSm)*(1-Math.exp(-2.6*t));const I=Math.abs(Math.sin(P)),N=1-.92*Math.min(1,Math.max(0,(I-.7)/.28));this.sideGripSm=N<this.sideGripSm?N:this.sideGripSm+(N-this.sideGripSm)*(1-Math.exp(-2.2*t));const G=this.sideGripSm,z=this.gripSm*G*(M>0?.08:1),V=Math.min(Ey*z,By*z/Math.max(S,6))*y*t,Y=Math.max(-V,Math.min(V,P));this.carve=Math.abs(P)*S;const j=I;this.skid=j;let ot=S*(1-Ay*u.scrub*Math.abs(Y));ot-=Vy*j*ot*t,M>0&&(ot-=Gy*M*(.45+.55*j)*ot*t),ot<hc&&(ot+=(hc-ot)*.8*t),this.tumbleT>0&&ot>7&&(ot=7),ot*=Math.exp(-.045*(.5+.5*u.drag)*t),ot-=Ry*(x>0?ky:1)*ot*ot*t,ot<0&&(ot=0);const wt=A+Y;this.velH.set(Math.sin(wt)*ot,0,Math.cos(wt)*ot)}o>0&&(e.jumpHeld?this.charge=Math.min(1,this.charge+t/zy):this.charge>0&&(this.vy=of+(Yy-of)*this.charge,this.charge=0,this.grounded=!1,this.airTime=0,this.trickYaw=0,this.trickFlip=0,this.prevTrickYaw=0,this.prevTrickFlip=0,this.spinVel=0,this.flipVel=0,this.grabTime=0))}else{this.carve=0;const m=this.launchedOffKicker?1.7:1,v=Math.max(0,this.airTime-m)*2.6,g=(this.vy<-8?1.5:1)+v,u=-Math.max(45,this.speed*1.25);this.vy=Math.max(this.vy-Ju*g*t,u),this.airTime+=t,this.charge>0&&(this.charge=Math.max(0,this.charge-t/Oy));const x=this.velH.length();x>.01&&this.velH.multiplyScalar(Math.max(0,1-Cy*x*t));const _=c*rf,M=e.pitch*o*Zy,E=_!==0?af:cf,b=M!==0?af:cf;this.spinVel+=(_-this.spinVel)*(1-Math.exp(-E*t)),this.flipVel+=(M-this.flipVel)*(1-Math.exp(-b*t)),this.trickYaw+=this.spinVel*t,this.trickFlip+=this.flipVel*t;const w=o>0?e.airBrakeSide:0;if(this.grabbing=w!==0,this.grabbing&&(this.grabTime+=t),this.brakeSide=w,this.airBrake+=((w!==0?1:0)-this.airBrake)*(1-Math.exp(-6*t)),this.airBrake>.01){const T=Math.max(0,1-iS*this.airBrake*t);this.velH.multiplyScalar(T),this.vy-=sS*this.airBrake*t}}if((this.grounded||this.grinding)&&(this.airBrake+=(0-this.airBrake)*(1-Math.exp(-12*t))),!this.grinding){const m=this.grounded?Su(ye(this.pos.x,this.pos.z),this.pos.z):null;this.pos.x+=this.velH.x*t,this.pos.z+=this.velH.z*t;const v=r_(this.pos.x,this.pos.z),g=!!v&&this.pos.y>v.eave-lS;this.onRoof=g;let u=g?Math.max(Ie(this.pos.x,this.pos.z),v.y):Ie(this.pos.x,this.pos.z);{const E=ye(this.pos.x,this.pos.z),b=B_(E,this.pos.z,Zt,oe),w=Ie(this.pos.x,this.pos.z),T=b===null?0:Math.max(0,b-w),y=T-this.lavaLift;if(Math.abs(y)>2.5)this.lavaLift=T;else{const A=(y>0?1.8:9)*t;this.lavaLift+=Math.max(-A,Math.min(A,y))}this.lavaLift>.02&&(u=Math.max(u,w+this.lavaLift))}const x=this.lavaLift>.02?this.lavaLift:0,_=(E,b)=>Ie(E,b)+x;if(this.grounded&&m&&this.pos.z>m.z&&!Su(ye(this.pos.x,this.pos.z),this.pos.z))this.grounded=!1,this.airTime=0,this.launchedOffKicker=!0,this.vy=3.2+m.h*1.9,this.pos.y=Ie(this.pos.x,this.pos.z)+this.vy*t;else if(this.grounded){const E=Math.max(1,this.speed),b=this.velH.x/E,w=this.velH.z/E,T=1.8,y=_(this.pos.x-b*T,this.pos.z-w*T),S=(u-y)/T*E,A=Ju*Py;let R=!1;for(const P of[.15,.4,.9,1.8,3,4.5]){const U=P/E,I=u+S*U-.5*A*U*U,N=_(this.pos.x+b*P,this.pos.z+w*P);if(N>=I)break;if(N<I-Ly){R=!0;break}}R&&this.landCooldown<=0?(this.grounded=!1,this.airTime=0,this.vy=Math.max(-25,Math.min(11,S)),this.pos.y=u+Math.max(0,this.vy*t)):(this.pos.y=u,this.groundVy=(u-this.prevPos.y)/t)}else this.pos.y+=this.vy*t,this.pos.y<=u&&(this.pos.y=u,this.land(l));const M=this.stuckT>cc;if(this.grounded&&this.tumbleT<=0&&!M){const E=Math.hypot(this.pos.x-this.prevPos.x,this.pos.z-this.prevPos.z);if(E>.01&&(u-_(this.prevPos.x,this.prevPos.z))/E>Dy){$a(this.pos.x,this.pos.z,this.grad);const w=Math.hypot(this.grad.x,this.grad.y);if(w>.001){const T=-this.grad.x/w,y=-this.grad.y/w;this.pos.x=this.prevPos.x,this.pos.z=this.prevPos.z;const S=this.velH.x*T+this.velH.z*y;S<0&&(this.velH.x-=S*T,this.velH.z-=S*y,-S>this.speed*.88&&this.speed>19&&this.hitCooldown<=0?(this.hitCooldown=uc,this.velH.multiplyScalar(.5),this.tumbleT=vs,this.crashed=!0):(this.velH.multiplyScalar(.96),this.wobbleT=Math.max(this.wobbleT,.25))),this.pos.y=Ie(this.pos.x,this.pos.z)}}}if(this.hitCooldown>0&&(this.hitCooldown=Math.max(0,this.hitCooldown-t)),this.tumbleT<=0&&this.pos.y-u<1.4){const E=Math.round(ye(this.pos.x,this.pos.z)/St),b=Math.round(this.pos.z/St);t:for(let w=-1;w<=1;w++)for(let T=-1;T<=1;T++)for(const y of ha(E+w,b+T)){const S=this.pos.x-y.x,A=this.pos.z-y.z;if(y.kind==="house"&&this.onRoof)continue;if(y.topY!==void 0){const P=Ie(y.x,y.z)+y.topY;if(this.pos.y>P-.12)continue}const R=(y.kind==="crag"?v_(y,S,A):y.kind==="rock"?m_(y,S,A):y.kind==="arch"?y_(y,S,A):y.kind==="house"?x_(y,S,A):y.r)+.35;if(S*S+A*A<R*R){const P=Math.sqrt(S*S+A*A)||.01,U=S/P,I=A/P;this.pos.x=y.x+U*R,this.pos.z=y.z+I*R;const N=this.velH.x*U+this.velH.z*I;if(N<0){const z=-I,V=U,Y=this.velH.x*z+this.velH.z*V>=0?1:-1;this.velH.x-=N*U,this.velH.z-=N*I;const j=(y.kind==="rock"?.95:.55)*-N;this.velH.x+=z*Y*j,this.velH.z+=V*Y*j}if(this.hitCooldown>0)break t;const G=y.kind!=="rock"&&-N>this.speed*.55&&this.speed>ac;if(this.hitCooldown=uc,y.kind==="rock"){const z=Math.min(1,-N/Math.max(1,this.speed));this.velH.multiplyScalar(1-.06-.12*z);const V=this.velH.x*I-this.velH.z*U>0?1:-1;this.heading+=V*(.16+.5*z),this.wobbleT=Math.max(this.wobbleT,.35+.5*z),this.grazed=!0;break t}G?(this.velH.multiplyScalar(.2),this.tumbleT=vs,this.crashed=!0,this.trickYaw=0,this.trickFlip=0,this.spinVel=0,this.flipVel=0,this.grabTime=0,this.airTime=0):(this.velH.multiplyScalar(.85),this.grazed=!0);break t}}}this.railCooldown<=0&&this.tumbleT<=0&&(this.grounded||this.vy<3.5)&&this.trySnapRail(),this.tumbleT<=0&&this.collideRailSide()}if(this.speed=this.velH.length(),this.grinding){const m=this.grindRail,v=m?m.segDirX[0]:1,g=m?m.segDirZ[0]:0,u=Math.sin(this.railTilt),x=Math.cos(this.railTilt);this.normal.set(g*u,x,-v*u).normalize()}else this.grounded?xl(this.pos.x,this.pos.z,this.normal):this.normal.lerp(this.worldUp,1-Math.exp(-2*t)).normalize();const h=this.normal,f=this.tmpF.copy(l).addScaledVector(h,-l.dot(h)).normalize(),d=this.tmpR.crossVectors(h,f).normalize();this.tmpM.makeBasis(d,h,f),this.targetQuat.setFromRotationMatrix(this.tmpM);const p=this.grounded?14:5;this.quat.slerp(this.targetQuat,1-Math.exp(-p*t))}land(t){this.grounded=!0,this.groundVy=this.vy,this.landCooldown=.05,this.launchedOffKicker=!1,this.vy=0,this.grabbing=!1;const e=_n.radToDeg(this.trickYaw);if(this.trickYaw!==0){const n=this.heading+this.trickYaw;this.heading=Math.atan2(Math.sin(n),Math.cos(n)),t.set(Math.sin(this.heading),0,Math.cos(this.heading)),this.qYaw.setFromAxisAngle(this.axisY,this.trickYaw),this.quat.multiply(this.qYaw),this.prevQuat.multiply(this.qYaw)}if(this.airTime>.2){const n=this.trickFlip/(Math.PI*2),s=xy(n),o=this.tmpF.copy(t);this.velH.dot(o)<0&&o.multiplyScalar(-1);let r=this.velH.dot(o);const a=this.tmpR.copy(this.velH).addScaledVector(o,-r),c=this.speed>1?Math.min(1,a.length()/this.speed):0,l=_n.radToDeg(Math.asin(Math.min(1,c)))+_n.radToDeg(ff)*this.airBrake;this.tmpP.copy(o).addScaledVector(this.normal,-o.dot(this.normal)).normalize();const h=_n.radToDeg(Math.asin(Math.max(-1,Math.min(1,this.tmpP.y))));$a(this.pos.x,this.pos.z,this.grad);const f=Math.max(1,this.speed),d=_n.radToDeg(Math.atan(-(this.grad.x*this.velH.x+this.grad.y*this.velH.z)/f)),p=this.velH.dot(t)<0?-1:1,m=h+gy(n)*p+d,v=vy(l,m),u=1-(hf+(1-hf)*Math.max(0,Math.min(1,(this.speed-sf)/(qy-sf))))*(1-v);xl(this.pos.x,this.pos.z,this.normal);const x=this.normal.y<Ky;let _="clean";s>Jy?_="crash":x?_="sketchy":u<$y?_="crash":u<jy&&(_="sketchy");const M=Math.abs(e)>=150||Math.abs(n)>=.6||this.grabTime>.15;x&&_!=="crash"?(r*=lf,this.gripSm=Math.min(this.gripSm,.3)):_==="clean"&&M?r+=Qy:_==="crash"&&(r=Math.min(r,hc*1.3),this.tumbleT=vs),c>.55?(r*=1-.5*c,this.gripSm=Math.min(this.gripSm,.22)):_==="sketchy"&&(r*=.75);const E=x?lf:c>.55?.6:.5;this.velH.copy(a.multiplyScalar(E)).addScaledVector(o,r),this.landing={quality:_,spinDeg:e,flipTurns:n,grabTime:this.grabTime,airTime:this.airTime,score:u,geom:v,yawErr:l,noseDeg:m}}this.trickYaw=0,this.trickFlip=0,this.prevTrickYaw=0,this.prevTrickFlip=0,this.spinVel=0,this.flipVel=0,this.grabTime=0,this.airTime=0}respawnFromLava(){this.resetToPiste()}safeAt(t,e){if(Ka(t,e,Zt,oe)!==null)return!1;const n=Ie(oe(t,e),e);let s=0;for(let a=0;a<8;a++){const c=a/8*Math.PI*2,l=t+Math.cos(c)*16,h=e+Math.sin(c)*16;Ie(oe(l,h),h)>n+3&&s++}if(s>=5)return!1;const o=Ie(oe(t-22,e),e),r=Ie(oe(t+22,e),e);if(o>n+7&&r>n+7)return!1;for(let a=20;a<=140;a+=20)if(Ka(t,e+a,Zt,oe)!==null)return!1;return!0}warpTo(t){const e=oe(re(t),t);this.pos.set(e,Ie(e,t)+.4,t),this.prevPos.copy(this.pos),this.velH.set(0,0,this.speed||so),this.vy=0,this.grounded=!0,this.grinding=!1,this.grindRail=null,this.wasReset=!0}resetToPiste(){const t=this.pos.z;let e=t-45,n=re(e);t:for(let o=45;o<=260;o+=35){const r=t-o;for(let a=0;a<=90;a+=18)for(const c of a===0?[0]:[1,-1]){const l=re(r)+c*a;if(this.safeAt(l,r)){e=r,n=l;break t}}}const s=oe(n,e);this.pos.set(s,Ie(s,e)+.2,e),this.heading=0,this.velH.set(0,0,so),this.speed=so,this.vy=0,this.grounded=!0,this.grinding=!1,this.grindRail=null,this.tumbleT=0,this.charge=0,this.trickYaw=0,this.trickFlip=0,this.prevTrickYaw=0,this.prevTrickFlip=0,this.spinVel=0,this.flipVel=0,this.airTime=0,this.railTilt=0,this.railTiltVel=0,this.railCooldown=mf,this.prevPos.copy(this.pos),this.wasReset=!0}get grindDuration(){return this.grinding?this.grindTime:0}get railBalance(){return this.railTilt/uf}consumeLanding(){const t=this.landing;return this.landing=null,t}consumeCrash(){const t=this.crashed;return this.crashed=!1,t}consumeGraze(){const t=this.grazed;return this.grazed=!1,t}consumeGrind(){const t=this.grindEnded;return this.grindEnded=null,t}updateGrind(t,e,n,s){const o=this.grindRail,r=zr(o);let a=0,c=0;for(;a<o.segLen.length-1&&this.grindArc>c+o.segLen[a];)c+=o.segLen[a],a++;const l=(r[a]-r[a+1])/o.segLen[a];this.grindVel+=dS*(l-.15)*t,this.grindVel*=Math.exp(-.06*t),this.grindArc+=this.grindVel*t,this.grindTime+=t,this.carve=0;const h=this.grindVel>=0?1:-1,f=Math.atan2(o.segDirX[a]*h,o.segDirZ[a]*h);this.heading=f+Math.PI/2*this.railSide,e.set(Math.sin(this.heading),0,Math.cos(this.heading)),this.velH.set(o.segDirX[a]*this.grindVel,0,o.segDirZ[a]*this.grindVel);const d=Math.sin(this.grindTime*2.7+this.railSide)*.6+Math.sin(this.grindTime*4.9+1.3)*.4;if(this.railTiltVel+=(tS*Math.sin(this.railTilt)-eS*s+nS*d)*t,this.railTiltVel*=Math.exp(-1.5*t),this.railTilt+=this.railTiltVel*t,Math.abs(this.railTilt)>uf){this.grinding=!1,this.grindRail=null,this.grounded=!1,this.railCooldown=gS,this.airTime=0;const v=this.railTilt>=0?1:-1,g=o.segDirZ[a]*h,u=-o.segDirX[a]*h;this.velH.x+=g*gf*v,this.velH.z+=u*gf*v,this.speed=this.velH.length(),this.vy=vS,this.tumbleT=vs,this.crashed=!0,this.heading=f,this.railTilt=0,this.railTiltVel=0,this.grindEnded=null;return}if(n||this.grindArc<=0||this.grindArc>=o.totalLen){this.grinding=!1,this.grindRail=null,this.grounded=!1,this.railCooldown=mf,this.airTime=0,this.vy=n?pS:mS,this.heading=f,e.set(Math.sin(this.heading),0,Math.cos(this.heading)),this.railTilt=0,this.railTiltVel=0,this.grindEnded={duration:this.grindTime};return}const p=(this.grindArc-c)/o.segLen[a],m=o.pts[a];this.pos.set(m.x+o.segDirX[a]*o.segLen[a]*p,r[a]+(r[a+1]-r[a])*p+.05,m.z+o.segDirZ[a]*o.segLen[a]*p)}collideRailSide(){for(const t of yu(this.pos.x,this.pos.z)){const e=zr(t);for(let n=0;n<t.segLen.length;n++){const s=t.pts[n],o=this.pos.x-s.x,r=this.pos.z-s.z,a=o*t.segDirX[n]+r*t.segDirZ[n];if(a<0||a>t.segLen[n])continue;const c=o-t.segDirX[n]*a,l=r-t.segDirZ[n]*a,h=c*c+l*l;if(h>.55*.55)continue;const f=a/t.segLen[n],d=e[n]+(e[n+1]-e[n])*f;if(!(this.pos.y>d+.1)&&!(!this.grounded&&this.pos.y>=d-.3)&&!(!t.ledge&&this.pos.y<d-1.15)){this.railWallHit(c,l,h,s.x+t.segDirX[n]*a,s.z+t.segDirZ[n]*a);return}}for(let n=0;n<t.pts.length;n++){const s=this.pos.x-t.pts[n].x,o=this.pos.z-t.pts[n].z,r=s*s+o*o;if(!(r>.55*.55)&&!(this.pos.y>e[n]+.1)&&!(!this.grounded&&this.pos.y>=e[n]-.3)&&!(!t.ledge&&this.pos.y<e[n]-1.15)){this.railWallHit(s,o,r,t.pts[n].x,t.pts[n].z);return}}}}railWallHit(t,e,n,s,o){const r=Math.sqrt(n)||.01,a=t/r,c=e/r;this.pos.x=s+a*.55,this.pos.z=o+c*.55;const l=this.velH.x*a+this.velH.z*c;l<0&&(this.velH.x-=l*a,this.velH.z-=l*c),this.hitCooldown<=0&&(this.hitCooldown=uc,-l>this.speed*.6?(this.velH.multiplyScalar(.2),this.tumbleT=vs,this.crashed=!0):(this.velH.multiplyScalar(.85),this.grazed=!0))}trySnapRail(){for(const t of yu(this.pos.x,this.pos.z)){const e=zr(t);let n=0;for(let s=0;s<t.segLen.length;s++){const o=t.pts[s],r=this.pos.x-o.x,a=this.pos.z-o.z,c=r*t.segDirX[s]+a*t.segDirZ[s];if(c<0||c>t.segLen[s]){n+=t.segLen[s];continue}const l=r-t.segDirX[s]*c,h=a-t.segDirZ[s]*c,f=(n+c)/t.totalLen,d=1-Math.min(1,f/uS),p=pf+(hS-pf)*d*d;if(l*l+h*h>p*p){n+=t.segLen[s];continue}const m=Math.hypot(this.velH.x,this.velH.z);if(m>1){const E=(this.velH.x*t.segDirX[s]+this.velH.z*t.segDirZ[s])/m;if(Math.abs(E)<fS){n+=t.segLen[s];continue}}const v=c/t.segLen[s],g=e[s]+(e[s+1]-e[s])*v,u=this.grounded?1.8:.25,x=this.grounded?1.8:1.3;if(this.pos.y<g-u||this.pos.y>g+x){n+=t.segLen[s];continue}let _=this.velH.x*t.segDirX[s]+this.velH.z*t.segDirZ[s];Math.abs(_)<6&&(_=6*(_>=0?1:-1)),this.grinding=!0,this.grindRail=t,this.grindArc=n+c,this.grindVel=_,this.grindTime=0,this.vy=0;const M=this.velH.x*t.segDirZ[s]-this.velH.z*t.segDirX[s];this.railSide=M>=0?1:-1,this.railTilt=(J(this.pos.x,this.pos.z)-.5)*.16,this.railTiltVel=0,this.trickYaw=0,this.trickFlip=0,this.prevTrickYaw=0,this.prevTrickFlip=0,this.spinVel=0,this.flipVel=0,this.grabTime=0,this.grabbing=!1,this.airTime=0;return}}}syncVisual(t,e){this.rig.root.position.lerpVectors(this.prevPos,this.pos,t),this.rig.root.position.y+=this.grinding?.06:.16,this.rig.root.quaternion.slerpQuaternions(this.prevQuat,this.quat,t);const n=_n.lerp(this.prevTrickYaw,this.trickYaw,t)+this.airBrake*ff*(this.brakeSide<0?1:-1),s=_n.lerp(this.prevTrickFlip,this.trickFlip,t);(n!==0||s!==0)&&(this.qYaw.setFromAxisAngle(this.axisY,n),this.qFlip.setFromAxisAngle(this.axisX,-s),this.rig.root.quaternion.multiply(this.qYaw).multiply(this.qFlip));const o=this.grounded?Math.min(this.speed/lc,1)*.4:0;let r=0;if(this.velH.lengthSq()>4){let l=Math.atan2(this.velH.x,this.velH.z)-this.heading;l=Math.atan2(Math.sin(l),Math.cos(l)),Math.abs(l)>Math.PI/2&&(l-=Math.sign(l)*Math.PI),r=l}this.tmpP.set(1,0,0).applyQuaternion(this.rig.root.quaternion);let a=Math.asin(Math.max(-1,Math.min(1,this.tmpP.y)));if(this.grinding&&(a=-this.railTilt*1.5),this.wobbleT>0){const c=Math.min(1,this.wobbleT/.6);a+=Math.sin(this.poseTime*17)*.34*c}this.poseTime+=e,this.rig.pose({steer:this.lastSteer,crouch:this.grinding?.5:Math.max(o,this.charge),airborne:!this.grounded&&!this.grinding,grab:this.grabbing,grabT:this.airBrake,brakeSide:this.brakeSide,spin:Math.max(-1,Math.min(1,this.spinVel/rf)),tumble:this.tumbleT>0,lookYaw:r,speedN:Math.min(1,this.speed/lc),time:this.poseTime,switchRide:this.switchRide,bank:a},e)}}function vf(i,t){return Zt(i,t)-fa(i,t)}const Mf=70,_S=9,xS=5.1,yS=.3,_f=4.2,fc=13,SS=.45,wS=.42,bS=1.5,TS=.09,xf=2.2,ES=1.6,AS=4,RS=7.5,CS=38,PS=.0095,yf=14;class LS{constructor(t){this.followDir=new F(0,0,1),this.lookTarget=new F,this.desired=new F,this.tmp=new F,this.right=new F,this.pitch=.4,this.carveAmt=0,this.airAmt=0,this.punch=0,this.punchV=0,this.shake=0,this.bobT=0,this.rumbleT=0,this.roll=0,this.camera=new Je(Mf,t,.2,3e4),this.camera.position.set(0,Zt(0,-8)+4,-8)}impact(t,e=!1){this.punchV-=t*9,e&&(this.shake=Math.max(this.shake,t))}update(t,e){const n=t.headingDir;if(this.tmp.copy(n),t.velH.lengthSq()>4){const A=Math.atan2(t.velH.x,t.velH.z),R=Math.atan2(n.x,n.z);let P=R-A;P=Math.atan2(Math.sin(P),Math.cos(P));let U=R;if(Math.abs(P)>Math.PI/2){const G=Math.sign(P)*Math.PI;U=R-G,P-=G}const I=Math.min(1,Math.max(0,(Math.abs(P)-.44)/.79)),N=U-P*I;this.tmp.set(Math.sin(N),0,Math.cos(N))}const s=this.tmp,o=Math.atan2(this.followDir.x,this.followDir.z);let a=Math.atan2(s.x,s.z)-o;a=Math.atan2(Math.sin(a),Math.cos(a));const c=1-Math.exp(-4*e),l=AS*e,h=Math.max(-l,Math.min(l,a*c)),f=o+h;this.followDir.set(Math.sin(f),0,Math.cos(f));const d=t.rig.root.position,p=Math.min(t.speed/55,1),m=!t.grounded&&!t.grinding;this.airAmt+=((m?1:0)-this.airAmt)*(1-Math.exp(-3.5*e));const v=t.grounded?t.steerAmount:0;this.carveAmt+=(v-this.carveAmt)*(1-Math.exp(-4*e)),this.punchV+=(-this.punch*90-this.punchV*13)*e,this.punch+=this.punchV*e,this.shake*=Math.exp(-6*e),this.bobT+=e*RS*(.4+p);const g=xS-yS*p+this.airAmt*ES,u=Math.min(t.speed/yf,g*.5),x=g-u;if(this.right.set(this.followDir.z,0,-this.followDir.x),this.desired.copy(d).addScaledVector(this.followDir,-x).addScaledVector(this.right,this.carveAmt*bS).add(this.tmp.set(0,_f+this.airAmt*xf+this.punch,0)),t.grounded&&!t.grinding){this.desired.y+=Math.sin(this.bobT)*.06*p;const A=Math.max(0,t.speed-CS)*PS;if(A>0){this.rumbleT+=e*(26+t.speed*.5);const R=Math.sin(this.rumbleT)*.6+Math.sin(this.rumbleT*2.37+1.3)*.4,P=Math.sin(this.rumbleT*1.71+4.2)*.7+(Math.random()-.5)*.3;this.desired.x+=R*A,this.desired.y+=P*A*.7}}if(this.shake>.01){const A=this.shake*.5;this.desired.x+=(Math.random()-.5)*A,this.desired.y+=(Math.random()-.5)*A,this.desired.z+=(Math.random()-.5)*A}const _=vf(this.desired.x,this.desired.z)+1.3;this.desired.y<_&&(this.desired.y=_),this.camera.position.lerp(this.desired,1-Math.exp(-yf*e));const M=d.x+this.followDir.x*fc,E=d.z+this.followDir.z*fc,b=Math.max(0,d.y-vf(M,E)),w=Math.atan(b/fc),T=_f+this.airAmt*xf,y=Math.atan2(T,g)-wS+SS*w;this.pitch+=(y-this.pitch)*(1-Math.exp(-5*e)),this.lookTarget.copy(this.camera.position).addScaledVector(this.followDir,Math.cos(this.pitch)*40).add(this.tmp.set(0,-Math.sin(this.pitch)*40,0)),this.camera.lookAt(this.lookTarget),this.roll+=(-this.carveAmt*TS-this.roll)*(1-Math.exp(-5*e)),this.camera.rotateZ(this.roll);const S=Mf+_S*p+this.airAmt*2;this.camera.fov+=(S-this.camera.fov)*(1-Math.exp(-3*e)),this.camera.updateProjectionMatrix()}}const wr=900;class DS{constructor(){this.positions=new Float32Array(wr*3),this.velocities=new Float32Array(wr*3),this.life=new Float32Array(wr),this.count=0,this.geo=new Gt,this.emitAcc=0,this.geo.setAttribute("position",new Pt(this.positions,3)),this.geo.setDrawRange(0,0);const t=new na({color:16777215,size:.11,transparent:!0,opacity:.6,depthWrite:!1});this.mat=t,this.points=new ii(this.geo,t),this.points.frustumCulled=!1}setTint(t,e){this.mat.color.copy(t),this.mat.opacity=e}emit(t,e,n,s){for(this.emitAcc+=n*s;this.emitAcc>=1;)this.emitAcc-=1,this.spawn(t,e)}burst(t,e,n){for(let s=0;s<n;s++)this.spawn(t,e)}spawn(t,e){if(this.count>=wr)return;const n=this.count++;this.positions[n*3]=t.x+(Math.random()-.5)*.5,this.positions[n*3+1]=t.y+Math.random()*.15,this.positions[n*3+2]=t.z+(Math.random()-.5)*.5,this.velocities[n*3]=e.x*.08+(Math.random()-.5)*3.5,this.velocities[n*3+1]=.5+Math.random()*1.1,this.velocities[n*3+2]=e.z*.08+(Math.random()-.5)*3.5,this.life[n]=.2+Math.random()*.3}update(t){for(let e=0;e<this.count;e++){if(this.life[e]-=t,this.life[e]<=0){const n=--this.count;this.positions.copyWithin(e*3,n*3,n*3+3),this.velocities.copyWithin(e*3,n*3,n*3+3),this.life[e]=this.life[n],e--;continue}this.velocities[e*3+1]-=14*t,this.positions[e*3]+=this.velocities[e*3]*t,this.positions[e*3+1]+=this.velocities[e*3+1]*t,this.positions[e*3+2]+=this.velocities[e*3+2]*t}this.geo.setDrawRange(0,this.count),this.geo.attributes.position.needsUpdate=!0}}const br=1100,Vn=new F(64,32,64);class IS{constructor(t){this.positions=new Float32Array(br*3),this.drift=new Float32Array(br),this.geo=new Gt;for(let n=0;n<br;n++)this.positions[n*3]=t.x+(Math.random()-.5)*Vn.x,this.positions[n*3+1]=t.y+(Math.random()-.5)*Vn.y,this.positions[n*3+2]=t.z+(Math.random()-.5)*Vn.z,this.drift[n]=1.5+Math.random()*2.5;this.geo.setAttribute("position",new Pt(this.positions,3));const e=new na({color:16777215,size:.075,transparent:!0,opacity:.55,depthWrite:!1});this.mat=e,this.points=new ii(this.geo,e),this.points.frustumCulled=!1}update(t,e){for(let n=0;n<br;n++){let s=this.positions[n*3],o=this.positions[n*3+1]-this.drift[n]*t,r=this.positions[n*3+2];s+=Math.sin(o*.5+n)*t*.8,s-=Math.round((s-e.x)/Vn.x)*Vn.x,o-=Math.round((o-e.y)/Vn.y)*Vn.y,r-=Math.round((r-e.z)/Vn.z)*Vn.z,this.positions[n*3]=s,this.positions[n*3+1]=o,this.positions[n*3+2]=r}this.geo.attributes.position.needsUpdate=!0}}const Tr=900,Sf=.55,rp=[-.5,-.26,0,.26,.5],ho=rp.length,Er=ho-1,wf={[Xi]:{width:.5,lip:0,depth:.01,edge:new Q(3814190),center:new Q(2367260)},[Eo]:{width:.62,lip:0,depth:.015,edge:new Q(4536881),center:new Q(2761501)},[Vs]:null,[Ao]:null},bf={[Xi]:{width:1,lip:.06,depth:.03,edge:new Q(15396858),center:new Q(11450578)},[Eo]:{width:1.5,lip:.2,depth:.12,edge:new Q(16777215),center:new Q(12831978)},[Vs]:{width:.55,lip:0,depth:0,edge:new Q(14214902),center:new Q(11060958)},[Ao]:{width:1.15,lip:.05,depth:.05,edge:new Q(9074272),center:new Q(6048826)}};class US{constructor(){this.rows=[],this.geo=new Gt,this.positions=new Float32Array(Tr*Er*6*3),this.normals=new Float32Array(Tr*Er*6*3),this.colors=new Float32Array(Tr*Er*6*3),this.lastX=0,this.lastZ=0,this.hadContact=!1,this.a=new F,this.b=new F,this.n=new F,this.geo.setAttribute("position",new Pt(this.positions,3)),this.geo.setAttribute("normal",new Pt(this.normals,3)),this.geo.setAttribute("color",new Pt(this.colors,3)),this.geo.setDrawRange(0,0);const t=new Ue({vertexColors:!0,side:we,polygonOffset:!0,polygonOffsetFactor:-2});this.mesh=new dt(this.geo,t),this.mesh.frustumCulled=!1}update(t,e,n,s,o,r=0,a=Xi,c=0,l=0,h=0){if(!o){this.hadContact=!1;return}if(h>.3){this.hadContact=!1;return}if(l>.5&&wf[a]===null){this.hadContact=!1;return}const f=t-this.lastX,d=e-this.lastZ;if(this.hadContact&&f*f+d*d<Sf*Sf)return;this.lastX=t,this.lastZ=e;const p=(l>.5?wf[a]:null)??bf[a]??bf[Xi],m=1+c*.5,v=p.width*m*(1+r*.35+(Math.random()-.5)*.16),g=(Math.random()-.5)*.09,u=1-.6*c,x=p.lip*u*(.75+r*.7+Math.random()*.3),_=p.lip*u*(.75+r*.7+Math.random()*.3),E=p.lip===0&&p.depth===0?[0,0,0,0,0]:[p.lip*.2,x,-p.depth*(1+c*.8)+Math.random()*.02,_,p.lip*.2],b=s,w=-n,T=new Float32Array(ho),y=new Float32Array(ho),S=new Float32Array(ho);for(let A=0;A<ho;A++){const R=rp[A]*v+g,P=t+b*R,U=e+w*R;T[A]=P,S[A]=U,y[A]=Zt(P,U)-fa(P,U)+E[A]}this.rows.push({px:T,py:y,pz:S,gap:!this.hadContact,shade:.93+Math.random()*.11,edge:p.edge,center:p.center}),this.hadContact=!0,this.rows.length>Tr&&this.rows.shift(),this.rebuild()}rebuild(){let t=0;for(let e=1;e<this.rows.length;e++){const n=this.rows[e];if(n.gap)continue;const s=this.rows[e-1];for(let o=0;o<Er;o++)t=this.tri(t,s,o,n,o,n,o+1),t=this.tri(t,s,o,n,o+1,s,o+1)}this.geo.setDrawRange(0,t/3),this.geo.attributes.position.needsUpdate=!0,this.geo.attributes.normal.needsUpdate=!0,this.geo.attributes.color.needsUpdate=!0}tri(t,e,n,s,o,r,a){const c=this.positions,l=this.normals,h=this.colors;this.a.set(s.px[o]-e.px[n],s.py[o]-e.py[n],s.pz[o]-e.pz[n]),this.b.set(r.px[a]-e.px[n],r.py[a]-e.py[n],r.pz[a]-e.pz[n]),this.n.crossVectors(this.a,this.b).normalize(),this.n.y<0&&this.n.negate();const f=[e,s,r],d=[n,o,a];for(let p=0;p<3;p++){const m=f[p],v=d[p];c[t]=m.px[v],c[t+1]=m.py[v],c[t+2]=m.pz[v],l[t]=this.n.x,l[t+1]=this.n.y,l[t+2]=this.n.z;const g=v===2?m.center:m.edge;h[t]=g.r*m.shade,h[t+1]=g.g*m.shade,h[t+2]=g.b*m.shade,t+=3}return t}}const Wn=1800,dc=130;class NS{constructor(){this.light=new yi(16742954,0,90,1.6),this.pos=new Float32Array(Wn*3),this.vel=new Float32Array(Wn*3),this.age=new Float32Array(Wn),this.life=new Float32Array(Wn),this.col=new Float32Array(Wn*3),this.psize=new Float32Array(Wn),this.geo=new Gt,this.trees=[],this.scanT=0,this.emitAcc=0,this.geo.setAttribute("position",new Pt(this.pos,3)),this.geo.setAttribute("color",new Pt(this.col,3)),this.geo.setAttribute("size",new Pt(this.psize,1)),this.points=new ii(this.geo,new me({vertexShader:`
          attribute float size;
          varying vec3 vCol;
          void main() {
            vCol = color;
            vec4 mv = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = max(1.4, size * 300.0 / max(1.0, -mv.z));
            gl_Position = projectionMatrix * mv;
          }
        `,fragmentShader:`
          varying vec3 vCol;
          void main() {
            vec2 p = gl_PointCoord * 2.0 - 1.0;
            float r = dot(p, p);
            if (r > 1.0) discard;
            gl_FragColor = vec4(vCol, (1.0 - r) * (1.0 - r) * 0.9);
          }
        `,vertexColors:!0,transparent:!0,depthWrite:!1,blending:fn})),this.points.frustumCulled=!1;for(let t=0;t<Wn;t++)this.life[t]=-1}update(t,e,n){const s=Se(e);if(this.points.visible=s>.05,!this.points.visible){this.light.intensity=0;return}if(this.scanT-=n,this.scanT<=0){this.scanT=.5,this.trees.length=0;const a=Math.round(ye(t,e)/St),c=Math.round(e/St),l=dc*dc;for(let h=-2;h<=3&&this.trees.length<24;h++)for(let f=-2;f<=2&&this.trees.length<24;f++)for(const d of ha(a+f,c+h)){if(d.kind!=="tree")continue;const p=d.x-t,m=d.z-e;if(p*p+m*m>l||J(Math.round(d.x*7.3),Math.round(d.z*5.9))>.34)continue;const v=d.scale*3.4*(d.hMul??1);if(this.trees.push({x:d.x,z:d.z,y:Zt(d.x,d.z),h:v}),this.trees.length>=24)break}}let o=null,r=1/0;for(const a of this.trees){const c=(a.x-t)**2+(a.z-e)**2;c<r&&(r=c,o=a)}if(o?(this.light.position.set(o.x,o.y+o.h*.5,o.z),this.light.intensity=26*Math.max(0,1-Math.sqrt(r)/dc)):this.light.intensity=0,this.trees.length)for(this.emitAcc+=n*90*Math.min(6,this.trees.length);this.emitAcc>=1;){this.emitAcc-=1;const a=this.trees[Math.random()*this.trees.length|0];let c=-1;for(let d=0;d<Wn;d++)if(this.life[d]<0){c=d;break}if(c<0)break;const l=Math.random()**.6,h=.5*(1-l*.65),f=Math.random()*Math.PI*2;this.pos[c*3]=a.x+Math.cos(f)*h,this.pos[c*3+1]=a.y+.3+l*a.h*.85,this.pos[c*3+2]=a.z+Math.sin(f)*h,this.vel[c*3]=(Math.random()-.5)*.7,this.vel[c*3+1]=1.6+Math.random()*2.4,this.vel[c*3+2]=(Math.random()-.5)*.7,this.age[c]=0,this.life[c]=.35+Math.random()*.6,this.psize[c]=.22+Math.pow(Math.random(),2.2)*.6}for(let a=0;a<Wn;a++){if(this.life[a]<0){this.pos[a*3+1]=-1e6;continue}if(this.age[a]+=n,this.age[a]>this.life[a]){this.life[a]=-1;continue}this.vel[a*3+1]+=2.6*n,this.vel[a*3]*=1-n*1.6,this.vel[a*3+2]*=1-n*1.6,this.pos[a*3]+=this.vel[a*3]*n,this.pos[a*3+1]+=this.vel[a*3+1]*n,this.pos[a*3+2]+=this.vel[a*3+2]*n;const c=1-this.age[a]/this.life[a],l=c*c;this.col[a*3]=2.9*l+.12,this.col[a*3+1]=1.5*l*c+.1,this.col[a*3+2]=.3*l*l+.09}this.geo.attributes.position.needsUpdate=!0,this.geo.attributes.color.needsUpdate=!0,this.geo.attributes.size.needsUpdate=!0}}const Xn=1400,Li=48,Ar=8,An=20,Tf=4.6,FS=`
varying vec3 vCol;
void main() {
  vec2 p = gl_PointCoord * 2.0 - 1.0;
  float r = length(p);
  if (r > 1.0) discard;
  // белое ядро → оранжевая корона → рваный край
  float core = pow(max(0.0, 1.0 - r), 2.2);
  float halo = pow(max(0.0, 1.0 - r), 0.6);
  vec3 c = vCol * halo + vec3(1.6, 1.2, 0.7) * core;
  gl_FragColor = vec4(c, min(1.0, halo * 1.4));
}
`;class zS{constructor(){this.group=new ee,this.light=new yi(16742944,0,160,1.7),this.pos=new Float32Array(Xn*3),this.vel=new Float32Array(Xn*3),this.col=new Float32Array(Xn*3),this.size=new Float32Array(Xn),this.age=new Float32Array(Xn),this.life=new Float32Array(Xn),this.next=0,this.geo=new Gt,this.headGeo=new Gt,this.headPos=new Float32Array(Li*3),this.headCol=new Float32Array(Li*3),this.headSize=new Float32Array(Li),this.rockDummy=new Ae,this.markGeo=new Gt,this.markPos=new Float32Array(Ar*An*2*3),this.markCol=new Float32Array(Ar*An*2*3),this.ringX=new Float32Array(An),this.ringY=new Float32Array(An),this.ringZ=new Float32Array(An),this.flash=0,this.emit=0,this.live=0,this.incoming=[],this.whistled=new WeakSet,this.blasts=[],this.geo.setAttribute("position",new Pt(this.pos,3)),this.geo.setAttribute("color",new Pt(this.col,3)),this.geo.setAttribute("size",new Pt(this.size,1)),this.pts=new ii(this.geo,new me({vertexShader:`
          attribute float size;
          varying vec3 vCol;
          void main() {
            vCol = color;
            vec4 mv = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = size * 320.0 / max(1.0, -mv.z);
            gl_Position = projectionMatrix * mv;
          }
        `,fragmentShader:`
          varying vec3 vCol;
          void main() {
            vec2 p = gl_PointCoord * 2.0 - 1.0;
            float r = length(p);
            if (r > 1.0) discard;
            gl_FragColor = vec4(vCol, pow(max(0.0, 1.0 - r), 1.6));
          }
        `,vertexColors:!0,transparent:!0,depthWrite:!1,blending:fn})),this.pts.frustumCulled=!1,this.group.add(this.pts),this.headGeo.setAttribute("position",new Pt(this.headPos,3)),this.headGeo.setAttribute("color",new Pt(this.headCol,3)),this.headGeo.setAttribute("size",new Pt(this.headSize,1)),this.heads=new ii(this.headGeo,new me({vertexShader:`
          attribute float size;
          varying vec3 vCol;
          void main() {
            vCol = color;
            vec4 mv = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = size * 420.0 / max(1.0, -mv.z);
            gl_Position = projectionMatrix * mv;
          }
        `,fragmentShader:FS,vertexColors:!0,transparent:!0,depthWrite:!1,blending:fn})),this.heads.frustumCulled=!1,this.group.add(this.heads);const t=new Un(1,0),e=t.attributes.position;for(let n=0;n<e.count;n++){const s=.62+Math.sin(n*12.9898)*43758.5453%1*.5;e.setXYZ(n,e.getX(n)*s,e.getY(n)*s,e.getZ(n)*s)}t.computeVertexNormals(),this.rocks=new Ni(t,new Ue({color:2366496,emissive:new Q(.55,.13,.02),flatShading:!0}),Li),this.rocks.frustumCulled=!1,this.rocks.count=0,this.group.add(this.rocks),this.markGeo.setAttribute("position",new Pt(this.markPos,3)),this.markGeo.setAttribute("color",new Pt(this.markCol,3)),this.marks=new zl(this.markGeo,new ea({vertexColors:!0,transparent:!0,opacity:.9,depthWrite:!1,blending:fn})),this.marks.frustumCulled=!1,this.group.add(this.marks);for(let n=0;n<Xn;n++)this.life[n]=-1}get craterData(){return ex()}spawn(t,e,n,s,o,r,a,c,l){const h=this.next%Xn;this.next++,this.pos[h*3]=t,this.pos[h*3+1]=e,this.pos[h*3+2]=n,this.vel[h*3]=s,this.vel[h*3+1]=o,this.vel[h*3+2]=r,this.size[h]=a,this.age[h]=0,this.life[h]=c,this.col[h*3]=l,this.col[h*3+1]=l*.45,this.col[h*3+2]=l*.12}update(t,e,n,s){const o=Zd();this.live=0,this.incoming.length=0,this.blasts.length=0;for(const v of o)if(v.alive&&(this.live++,v.eta<1.5&&!this.whistled.has(v))){this.whistled.add(v);const g=Math.hypot(v.tx-e,v.tz-n);g<130&&this.incoming.push({dist:g,size:v.r,x:v.tx,z:v.tz})}this.group.visible=o.length>0||this.flash>0||this.next>0,this.emit+=t*60;const r=Math.max(1,Math.floor(this.emit/Math.max(1,o.length)));this.emit>=1&&(this.emit=0);for(const v of o)if(v.alive)for(let g=0;g<r;g++){const u=g/r;this.spawn(v.x-v.vx*t*u,v.y-v.vy*t*u,v.z-v.vz*t*u,(Math.random()-.5)*2.2,(Math.random()-.5)*2.2+1.2,(Math.random()-.5)*2.2,v.r*(.5+Math.random()*.5),.35+Math.random()*.45,2.6+Math.random()*1.2)}for(const v of Kd()){const g=26+Math.round(v.r*12);for(let x=0;x<g;x++){const _=Math.random()*Math.PI*2,M=.25+Math.random()*.95,E=6+Math.random()*16*v.r;this.spawn(v.x,v.y+.4,v.z,Math.cos(_)*E*(1-M*.6),E*M,Math.sin(_)*E*(1-M*.6),v.r*(.4+Math.random()*.7),.7+Math.random()*1.1,3+Math.random()*1.4)}for(let x=0;x<14;x++){const _=Math.random()*Math.PI*2,M=9+Math.random()*12*v.r;this.spawn(v.x,v.y+.2,v.z,Math.cos(_)*M,1.5+Math.random()*2,Math.sin(_)*M,v.r*1.2,.9+Math.random()*.8,1.1)}nx(v.x,v.z,v.r*Tf*.8),this.light.position.set(v.x,v.y+4,v.z),this.flash=1;const u=Math.hypot(v.x-e,v.z-n);this.blasts.push({power:v.r*.4*Math.max(0,1-u/260),x:v.x,z:v.z,dist:u})}ix(t),this.flash=Math.max(0,this.flash-t*2.6),this.light.intensity=this.flash*this.flash*320;for(let v=0;v<Xn;v++){if(this.life[v]<0)continue;this.age[v]+=t;const g=this.age[v]/this.life[v];if(g>=1){this.life[v]=-1,this.pos[v*3+1]=-1e6;continue}const u=1-t*1.9;this.vel[v*3]*=u,this.vel[v*3+1]=this.vel[v*3+1]*u-7*t,this.vel[v*3+2]*=u,this.pos[v*3]+=this.vel[v*3]*t,this.pos[v*3+1]+=this.vel[v*3+1]*t,this.pos[v*3+2]+=this.vel[v*3+2]*t;const x=1-g,_=x*x;this.col[v*3]=3.2*_+.12,this.col[v*3+1]=1.5*_*x+.09,this.col[v*3+2]=.35*_*_+.08,this.size[v]*=1-t*.55}this.blasts.length>3&&(this.blasts.sort((v,g)=>g.power-v.power),this.blasts.length=3),this.geo.attributes.position.needsUpdate=!0,this.geo.attributes.color.needsUpdate=!0,this.geo.attributes.size.needsUpdate=!0;let a=0;for(const v of o){if(!v.alive||a>=Li)continue;this.headPos[a*3]=v.x,this.headPos[a*3+1]=v.y,this.headPos[a*3+2]=v.z;const g=.85+.15*Math.sin(v.seed*7+v.eta*11);this.headCol[a*3]=3.4*g,this.headCol[a*3+1]=1.25*g,this.headCol[a*3+2]=.28*g,this.headSize[a]=v.r*1.9,a++}for(let v=a;v<Li;v++)this.headPos[v*3+1]=-1e6,this.headSize[v]=0;let c=0;for(const v of o){if(!v.alive||c>=Li)continue;const g=this.rockDummy;g.position.set(v.x,v.y,v.z),g.rotation.set(v.t*(1.6+v.seed*.03),v.t*(2.1+v.seed*.02),v.seed),g.scale.setScalar(v.r*.85),g.updateMatrix(),this.rocks.setMatrixAt(c,g.matrix),c++}this.rocks.count=c,this.rocks.instanceMatrix.needsUpdate=!0,this.headGeo.attributes.position.needsUpdate=!0,this.headGeo.attributes.color.needsUpdate=!0,this.headGeo.attributes.size.needsUpdate=!0;const l=o.filter(v=>v.alive&&Math.hypot(v.tx-e,v.tz-n)<190).sort((v,g)=>Math.hypot(v.tx-e,v.tz-n)-Math.hypot(g.tx-e,g.tz-n)).slice(0,Ar);let h=0;const f=this.ringX,d=this.ringY,p=this.ringZ;for(const v of l){const g=Math.max(0,Math.min(1,v.eta/3.4)),u=v.r*Tf,x=1-g,_=Math.min(1,x/.5),M=1.9+_*.5,E=1.45*(1-_)+.12,b=.16*(1-_)+.04,w=x>.66?Math.sin(v.t*26)>0?1.35:.12:1;for(let T=0;T<An;T++){const y=T/An*Math.PI*2,S=v.tx+Math.cos(y)*u,A=v.tz+Math.sin(y)*u;f[T]=S,d[T]=s(S,A)+.5,p[T]=A}for(let T=0;T<An;T++){const y=(T+1)%An;for(const S of[T,y])this.markPos[h*3]=f[S],this.markPos[h*3+1]=d[S],this.markPos[h*3+2]=p[S],this.markCol[h*3]=M*w,this.markCol[h*3+1]=E*w,this.markCol[h*3+2]=b*w,h++}}const m=Ar*An*2;for(let v=h;v<m;v++)this.markPos[v*3+1]=-1e6;this.markGeo.setDrawRange(0,h),this.markGeo.attributes.position.needsUpdate=!0,this.markGeo.attributes.color.needsUpdate=!0}}const Rn=900,OS=420,BS=42;class kS{constructor(){this.geo=new Gt,this.pos=new Float32Array(Rn*3),this.col=new Float32Array(Rn*3),this.size=new Float32Array(Rn),this.vel=new Float32Array(Rn*3),this.life=new Float32Array(Rn),this.full=new Float32Array(Rn),this.next=0,this.acc=0,this.prev=new F,this.hasPrev=!1;for(let t=0;t<Rn;t++)this.life[t]=-1;this.geo.setAttribute("position",new Pt(this.pos,3)),this.geo.setAttribute("color",new Pt(this.col,3)),this.geo.setAttribute("size",new Pt(this.size,1)),this.points=new ii(this.geo,new me({vertexShader:`
          attribute float size;
          varying vec3 vCol;
          void main() {
            vCol = color;
            vec4 mv = modelViewMatrix * vec4(position, 1.0);
            // нижний порог в пикселях: иначе дальние искры уходят в доли
            // пикселя и рой пропадает как раз тогда, когда он и нужен
            gl_PointSize = clamp(size * 300.0 / max(1.0, -mv.z), 1.3, 22.0);
            gl_Position = projectionMatrix * mv;
          }
        `,fragmentShader:`
          varying vec3 vCol;
          void main() {
            vec2 p = gl_PointCoord * 2.0 - 1.0;
            float r = dot(p, p);
            if (r > 1.0) discard;
            gl_FragColor = vec4(vCol, (1.0 - r) * 0.85 + pow(1.0 - r, 3.0) * 0.7);
          }
        `,vertexColors:!0,transparent:!0,depthWrite:!1,blending:fn})),this.points.frustumCulled=!1}update(t,e,n){if(e){const o=n.x-this.prev.x,r=n.z-this.prev.z,a=Math.hypot(o,r),c=this.hasPrev&&a>.01?o/a:0,l=this.hasPrev&&a>.01?r/a:0,h=Math.min(34,a/Math.max(1e-4,t));this.acc+=OS*t;const f=Math.min(Rn,Math.floor(this.acc));this.acc-=f;for(let d=0;d<f;d++){const p=this.next%Rn;this.next++;const m=Math.random()*Math.PI*2,v=Math.random()*1.6;this.pos[p*3]=n.x+Math.cos(m)*v,this.pos[p*3+1]=n.y+.2,this.pos[p*3+2]=n.z+Math.sin(m)*v;const g=Math.random()<.35,u=g?9+Math.random()*16:5+Math.random()*11,x=Math.random()*Math.PI*2,_=g?.35:1;this.vel[p*3]=c*h*.5+Math.cos(x)*u*_,this.vel[p*3+1]=g?u*1.5:3+Math.random()*9,this.vel[p*3+2]=l*h*.5+Math.sin(x)*u*_;const M=g?.5+Math.random()*.9:.25+Math.random()*.5;this.life[p]=M,this.full[p]=M,this.size[p]=.35+Math.random()*.75}this.prev.copy(n),this.hasPrev=!0}else this.hasPrev=!1,this.acc=0;let s=0;for(let o=0;o<Rn;o++){if(this.life[o]<0)continue;if(this.life[o]-=t,this.life[o]<=0){this.life[o]=-1,this.size[o]=0;continue}s++,this.vel[o*3+1]-=BS*t,this.pos[o*3]+=this.vel[o*3]*t,this.pos[o*3+1]+=this.vel[o*3+1]*t,this.pos[o*3+2]+=this.vel[o*3+2]*t;const r=this.life[o]/Math.max(.001,this.full[o]),a=r*r;this.col[o*3]=2.6*(.45+a*.55),this.col[o*3+1]=.35+a*a*1.5,this.col[o*3+2]=.06+a*a*a*1.1}s===0&&!e||(this.geo.attributes.position.needsUpdate=!0,this.geo.attributes.color.needsUpdate=!0,this.geo.attributes.size.needsUpdate=!0)}}const ap=Hi*co,HS=Ol+800,GS=620,Re=46,VS=10,Ef=21,oo=.6,WS=1.6,Af=.12,Rf=.5,XS=.9,qS=.85,pc=70,YS=12,ZS=28,KS=1.2,jS=13,Cf=7,cp=18,lp=5.6,$S=5,JS=55,mc=2,QS=30,Pf=26,tw=3.6,gc=2.4,ew=38,nw=cp/3,iw=3.4,sw=30,ow=14,rw=7,aw=.07;function Lf(i){const t=rt(i*4.7+3.3,21.1)*.5+.5,e=rt(i*6.1-1.7,13.9)*.5+.5,n=i*ap+HS+e*300;return{k:i,x:oe(re(n),n),z:n,h:GS*(.85+t*.45)}}function cw(i){if(i.topY!==void 0)return i.topY;switch(i.kind){case"crag":return i.scale*(i.hMul??1)*.45;case"arch":return i.scale*1.6;case"house":return i.scale*1.4;default:return i.r}}function hp(i){const t=Math.floor(i/ap),e=Lf(t);return e.z>i-900?e:Lf(t+1)}const lw=`
uniform float uTime;
uniform float uLock;   // 0..1 — насколько игрок на оси взгляда
uniform float uBrow;   // 0..1 — брови встают в ярость
uniform float uRed;    // 0..1 — око наливается красным
uniform float uHaze;
uniform vec3 uHazeCol;
varying vec2 vUv;

float h1(vec2 p){return fract(sin(dot(floor(p),vec2(127.1,311.7)))*43758.5453);}
float n1(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.0-2.0*f);
  return mix(mix(h1(i),h1(i+vec2(1,0)),f.x),mix(h1(i+vec2(0,1)),h1(i+vec2(1,1)),f.x),f.y);}

void main() {
  vec2 p = vUv * 2.0 - 1.0;
  // МИНДАЛЬ: пересечение двух дуг, а не эллипс — у эллипса нет уголков, и
  // он читается монеткой, а не глазом.
  float lid = 1.0 - abs(p.x);
  // ★ НАШЁЛ — РАСПАХИВАЕТСЯ. В покое веки прикрыты, и око читается щелью;
  // взяв игрока, оно раскрывается почти круглым. Вместе с ростом самого квада
  // (см. update) это и есть «уставилось прямо на тебя».
  float open = mix(0.34, 0.68, uLock) * lid * lid;
  float body = 1.0 - smoothstep(open * 0.82, open, abs(p.y));

  // ★ БРОВИ ГОВОРЯТ, ВИДЯТ ЛИ ТЕБЯ. Зрачок и размер меняются плавно, и на
  // дистанции разницу не поймать; наклон бровей читается мгновенно и
  // однозначно: горизонтальные — око шарит вслепую, сведённые к переносице —
  // смотрит именно на тебя.
  float bx = abs(p.x);
  // ★ БРОВЬ НЕ ВРАЩАЕТСЯ, ОНА ОПУСКАЕТСЯ. Наклон читался мимикой лица, а нужен
  // нависающий карниз: в покое брусок стоит горизонтально высоко над веком,
  // при захвате — так же горизонтально, но придвинут вплотную к оку. Разница
  // видна силуэтом даже там, где сам зрачок в несколько пикселей.
  // ★ БРОВЬ ДЕРЖИТСЯ В ПРОСВЕТЕ МЕЖДУ РОГАМИ. Квад ока при захвате прибавляет
  // половину размера, а обрамление — нет (оно камень, см. update): всё, что
  // задано в долях квада, при этом уезжает НАРУЖУ. Брусок на 0.58 уходил ровно
  // под шеврон и пропадал — тёмное на тёмном. С 0.36 даже на полном раскрытии
  // его внешний край остаётся внутри рогов.
  // Ниже века тоже опускаться нельзя: там рисуется радужка, а не камень.
  // ★ У ЯРОСТИ СВОЯ ПОСТАНОВКА БРОВЕЙ. Обычный захват — брусок горизонтально,
  // просто ниже; перед резом бровь ВСТАЁТ КОСО: наружный конец вверх, внутренний
  // вниз, так что по верху они расходятся, а по низу почти сходятся. Это
  // единственный сигнал, который читается на километрах дали раньше, чем
  // появится сам луч, — и по нему игрок понимает, что пора выбирать линию.
  float by = mix(0.88, 0.6, uLock) - uBrow * 0.06;
  vec2 q0 = vec2(bx - 0.36, p.y - by);
  float rot = uBrow * 0.62;              // до ~35°
  vec2 q = vec2(q0.x * cos(rot) + q0.y * sin(rot), -q0.x * sin(rot) + q0.y * cos(rot));
  float brow = (1.0 - smoothstep(0.06, 0.14, abs(q.y)))
    * (1.0 - smoothstep(0.2, 0.28, abs(q.x)));

  if (body <= 0.001 && brow <= 0.01) discard;
  if (body <= 0.001) {
    // ★ БРОВЬ ЖИВЁТ СИЛУЭТОМ. «При злости чуть тлеет» на деле поднимало её
    // цвет до (0.33, 0.10, 0.05) — почти в тон закатному небу за башней, и в
    // ярости брусок переставал читаться совсем (замер по столбцу: в покое
    // провал 190 против фона 300, в ярости провала нет вовсе). Тление
    // оставляем едва заметным, чёрный контур важнее.
    vec3 bc = vec3(0.05, 0.035, 0.04) + vec3(0.5, 0.11, 0.02) * uLock * 0.09;
    gl_FragColor = vec4(mix(bc, uHazeCol, uHaze), brow);
    return;
  }

  // радужка: тянутые к центру волокна, всё это медленно кипит
  float ang = atan(p.y * 2.4, p.x);
  float rad = length(vec2(p.x, p.y * 2.4));
  float fib = n1(vec2(ang * 5.0, rad * 6.0 - uTime * 0.5));
  float iris = smoothstep(1.05, 0.15, rad) * (0.55 + fib * 0.75);

  // зрачок — вертикальная щель; чем прямее смотришь, тем он у́же
  float pw = mix(0.30, 0.12, uLock) * (1.0 - uRed * 0.45);
  float pupil = 1.0 - smoothstep(pw * 0.6, pw, abs(p.x) + abs(p.y) * 0.22);

  vec3 col = mix(vec3(1.7, 0.42, 0.05), vec3(3.4, 1.6, 0.35), iris * iris);
  // ★ НАЛИВАЕТСЯ КРАСНЫМ. Жёлто-оранжевая радужка уходит в чистый красный тем
  // сильнее, чем ближе рез: цвет меняется медленно и потому читается как
  // накопление, а не как вспышка.
  col = mix(col, vec3(4.6, 0.16, 0.04) * (0.55 + iris * 0.9), uRed * 0.92);
  col = mix(col, vec3(0.02, 0.01, 0.01), pupil);
  // кайма век: почти чёрная, чтобы миндаль читался формой
  col *= smoothstep(0.0, 0.22, body);
  // языки пламени по краю
  float flame = n1(vec2(ang * 3.0 + uTime * 0.8, rad * 4.0)) * smoothstep(0.6, 1.0, rad);
  col += vec3(1.4, 0.45, 0.08) * flame * 0.6;
  // дыхание
  col *= 0.85 + 0.15 * sin(uTime * 1.7) + uLock * 0.35;
  gl_FragColor = vec4(mix(col, uHazeCol, uHaze), body);
}
`;class hw{constructor(){this.group=new ee,this.light=new yi(16734744,0,260,1.4),this.built=-1,this.groundY=0,this.tower=null,this.quad=null,this.frame=null,this.mat=new me({uniforms:{uTime:{value:0},uLock:{value:0},uBrow:{value:0},uRed:{value:0},uHaze:{value:.3},uHazeCol:{value:new Q(6112318)}},vertexShader:`
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,fragmentShader:lw,transparent:!0,depthWrite:!1}),this.towerMat=new Ze({vertexColors:!0,fog:!1}),this.frameMat=new Ze({vertexColors:!0,fog:!1,side:we}),this.glowMat=new me({uniforms:{uLock:{value:0},uTime:{value:0},uCol:{value:new Q(1.9,.5,.1)}},vertexShader:`
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,fragmentShader:`
      uniform float uLock;
      uniform float uTime;
      uniform vec3 uCol;
      varying vec2 vUv;
      void main() {
        vec2 p = vUv * 2.0 - 1.0;
        float r = length(p);
        if (r > 1.0) discard;
        // мягкое ядро
        float core = pow(max(0.0, 1.0 - r), 3.4);
        // лучики: четыре длинных и восемь коротких, чуть дышат
        float a = atan(p.y, p.x);
        float spikes = pow(abs(cos(a * 2.0)), 14.0) * 0.7
                     + pow(abs(cos(a * 4.0 + 0.4)), 22.0) * 0.3;
        float ray = spikes * pow(max(0.0, 1.0 - r), 1.1);
        float k = (0.35 + uLock * 0.9) * (0.9 + 0.1 * sin(uTime * 2.3));
        gl_FragColor = vec4(uCol, (core * 0.85 + ray * 0.5) * k);
      }
    `,transparent:!0,depthWrite:!1,blending:fn}),this.glow=null,this.gatherMat=new me({uniforms:{uT:{value:0},uK:{value:0}},vertexShader:`
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,fragmentShader:`
      uniform float uT;
      uniform float uK;
      varying vec2 vUv;
      void main() {
        if (uK <= 0.002) discard;
        vec2 p = vUv * 2.0 - 1.0;
        float r = length(p);
        if (r > 1.0) discard;
        float a = atan(p.y, p.x) / 6.28318 + 0.5;
        const float N = 16.0;
        float idx = floor(a * N);
        // у каждой спицы своя фаза — иначе они идут строем и читаются кольцом
        float seed = fract(sin(idx * 127.1) * 43758.5453);
        float ph = fract(uT * 0.85 + seed);
        float head = 1.0 - ph;                     // голова штриха бежит к центру
        float streak = smoothstep(0.15, 0.0, abs(r - head));
        // угловая узость: спица, а не сектор
        streak *= smoothstep(0.36, 0.06, abs(fract(a * N) - 0.5));
        // у центра ярче: заряд «впитывается»
        streak *= (0.3 + 1.1 * (1.0 - head)) * smoothstep(0.0, 0.16, r);
        gl_FragColor = vec4(vec3(3.4, 0.34, 0.1) * streak, streak * uK * 0.85);
      }
    `,transparent:!0,depthWrite:!1,blending:fn}),this.gather=null,this.beam=null,this.beamMat=new me({uniforms:{uOp:{value:.14},uCol:{value:new Q(1.7,.42,.07)},uR0:{value:10},uR1:{value:25}},vertexShader:`
      uniform float uR0;
      uniform float uR1;
      varying vec3 vN;
      varying vec3 vV;
      varying float vT;
      void main() {
        vT = uv.y;              // 0 у глаза, 1 у земли
        vec3 p = position;
        p.xz *= mix(uR0, uR1, vT);
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        vN = normalMatrix * normal;
        vV = -mv.xyz;
        gl_Position = projectionMatrix * mv;
      }
    `,fragmentShader:`
      uniform float uOp;
      uniform vec3 uCol;
      varying vec3 vN;
      varying vec3 vV;
      varying float vT;
      void main() {
        // ★ ИЗНУТРИ ЛУЧ ТОЖЕ ВИДЕН. С отсечением по знаку (max(0, dot)) грани,
        // повёрнутые от камеры, не давали ничего — а когда прожектор наведён
        // на тебя, камера оказывается ВНУТРИ столба, и он пропадал целиком
        // ровно в тот момент, когда важнее всего. Берём модуль: снаружи это
        // силуэт трубы, изнутри — тёплая взвесь вокруг.
        float face = abs(dot(normalize(vN), normalize(vV)));
        // ★ У ГЛАЗА ТРУБА ВИДНА ПОЧТИ ВДОЛЬ ОСИ — И ГАШЕНИЕ ПО НОРМАЛИ ЕЁ УБИВАЛО.
        // Стенки там стоят к взгляду ребром, dot(нормаль, взгляд) → 0, и весь
        // исток луча становился полностью прозрачным: из ока не выходило ничего.
        // Между тем физически всё наоборот — глядя ВДОЛЬ луча, свет проходишь
        // насквозь и видеть должен больше. Поэтому у плотности есть базовая
        // доля, не зависящая от ракурса, а силуэтная лишь добавляется.
        float shape = (pow(face, 1.15) * 0.75 + pow(face, 4.0) * 0.45) / 1.2;
        // ★ ИЗНУТРИ — ТОЛЬКО ЛЁГКАЯ ВЗВЕСЬ. На полную силу дальняя стенка трубы
        // накрывает полкадра вместе с небом, и вместо столба выходит общая
        // тёплая муть.
        float a = uOp * (0.3 + 0.7 * shape) * (gl_FrontFacing ? 1.0 : 0.24);
        // у земли гаснет только самый кончик — иначе край читается как срез
        a *= 1.0 - smoothstep(0.97, 1.0, vT);
        // у самого ока луч не начинается ступенькой — первые проценты длины
        // разгораются, зато сразу за ними идёт самая широкая часть факела
        a *= smoothstep(0.0, 0.02, vT);
        gl_FragColor = vec4(uCol * (0.7 + vT * 0.6), a);
      }
    `,transparent:!0,depthWrite:!1,blending:fn,side:we}),this.laserMat=new me({uniforms:{uT:{value:0},uAng:{value:.013},uOp:{value:1}},vertexShader:`
      uniform float uAng;
      varying vec3 vN;
      varying vec3 vV;
      varying float vT;
      void main() {
        vT = uv.y;
        // дальность до ОСИ луча в этой точке — по ней и считается толщина
        vec4 axis = modelViewMatrix * vec4(0.0, position.y, 0.0, 1.0);
        vec3 p = position;
        p.xz *= length(axis.xyz) * uAng;
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        vN = normalMatrix * normal;
        vV = -mv.xyz;
        gl_Position = projectionMatrix * mv;
      }
    `,fragmentShader:`
      uniform float uT;
      uniform float uOp;
      varying vec3 vN;
      varying vec3 vV;
      varying float vT;
      void main() {
        float face = abs(dot(normalize(vN), normalize(vV)));
        // ★ КРАЙ ЖЁСТКИЙ. Мягкое затухание к силуэту — это признак объёма, то
        // есть светящейся взвеси. У лазера край режущий, а внутри ровное тело.
        float body = smoothstep(0.0, 0.22, face);
        float core = pow(face, 9.0);        // тонкая добела раскалённая жила
        vec3 col = mix(vec3(0.92, 0.05, 0.06), vec3(1.0, 0.94, 0.9), core);
        // ровный луч, лишь чуть пульсирующий — мерцание тоже читается пламенем
        float pulse = 0.95 + 0.05 * sin(uT * 38.0 + vT * 9.0);
        gl_FragColor = vec4(col * pulse, min(1.0, uOp * body * pulse));
      }
    `,transparent:!0,depthWrite:!1,side:we}),this.laser=null,this.glowMat2=new me({uniforms:{uT:{value:0},uAng:{value:.036}},vertexShader:`
      uniform float uAng;
      varying vec3 vN;
      varying vec3 vV;
      varying float vT;
      void main() {
        vT = uv.y;
        vec4 axis = modelViewMatrix * vec4(0.0, position.y, 0.0, 1.0);
        vec3 p = position;
        p.xz *= length(axis.xyz) * uAng;
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        vN = normalMatrix * normal;
        vV = -mv.xyz;
        gl_Position = projectionMatrix * mv;
      }
    `,fragmentShader:`
      uniform float uT;
      varying vec3 vN;
      varying vec3 vV;
      varying float vT;
      void main() {
        float face = abs(dot(normalize(vN), normalize(vV)));
        float k = pow(face, 2.6);
        gl_FragColor = vec4(vec3(2.0, 0.14, 0.05) * k, k * 0.34);
      }
    `,transparent:!0,depthWrite:!1,blending:fn,side:we}),this.laserGlow=null,this.cutLight=new yi(16726544,0,200,1.5),this.onSpot=null,this.onSpotDir=null,this.lock=0,this.aimU=0,this.holdT=0,this.acq=0,this.trail=[],this.trailAt=0,this.heldCaught=!1,this.searchU=0,this.rest=0,this.commitU=0,this.commitT=0,this.caught=!1,this.fireT=0,this.lastPz=0,this.lastPx=0,this.vDown=26,this.vSide=0,this.biasZ=0,this.biasU=0,this.rage=0,this.phase=0,this.phaseT=0,this.charges=0,this.sinceCut=0,this.sweepX=0,this.moveKind=0,this.moveOrder=[0,1,2],this.moveT=0,this.movePhase=0,this.stabU=0,this.cutU=0,this.cutZ=0,this.cutClip=1,this.cutY=0,this.stampT=0,this.markX=0,this.markZ=0,this.markLands=!0,this.doomT=-1,this.cine=-1,this.quiet=!1,this.cut=new F,this.chargeAmt=0,this.cutting=!1,this.tmpQ=new Ge,this.up=new F(0,1,0),this.dir=new F,this.chunkKeys=new Set,this.chunkList=[],this.towerBaseX=0,this.towerBaseY=0,this.towerBaseZ=0,this.quadBaseY=0,this.stump=null}buildTower(t){const s=[],o=[],r=new Q(1709340),a=new Q(3287603),c=new Q,l=(f,d)=>{const p=rt(Math.cos(d)*3.1+t.k,Math.sin(d)*3.1+f*5)*.5+.5,m=1+Math.cos(d*6)*.09+Math.cos(d*3+.7)*.05,v=1+Math.cos(f*Math.PI*14)*.055,g=f>.86?1+Math.cos(d*8)*.22*((f-.86)/.14):1,u=(26+46*Math.pow(1-f,2))*(.78+p*.44)*m*v*g;return[Math.cos(d)*u,t.h*Math.pow(f,1.05)-40,Math.sin(d)*u]};for(let f=0;f<12;f++){const d=f/12,p=(f+1)/12;for(let m=0;m<9;m++){const v=m/9*Math.PI*2,g=(m+1)/9*Math.PI*2,u=l(d,v),x=l(d,g),_=l(p,v),M=l(p,g);s.push(...u,...x,...M,...u,...M,..._),c.copy(r).lerp(a,Math.max(0,Math.cos(v))*.6+d*.25);for(let E=0;E<6;E++)o.push(c.r,c.g,c.b)}}const h=new Gt;return h.setAttribute("position",new kt(s,3)),h.setAttribute("color",new kt(o,3)),new dt(h,this.towerMat)}buildFrame(){const t=[],e=[],n=new Q(2366500),s=new Q(8008466),o=new Q;for(const c of[-1,1]){const l=[[c*Re*.05,-Re*.98],[c*Re*.7,-Re*.52],[c*Re*1.45,Re*.1],[c*Re*.86,Re*1]],h=[Re*.14,Re*.2,Re*.26,Re*.09];for(let f=0;f+1<l.length;f++){const[d,p]=l[f],[m,v]=l[f+1],g=m-d,u=v-p,x=Math.hypot(g,u)||1,_=-u/x,M=g/x,E=h[f],b=h[f+1];t.push(d-_*E,p-M*E,0,d+_*E,p+M*E,0,m+_*b,v+M*b,0,d-_*E,p-M*E,0,m+_*b,v+M*b,0,m-_*b,v-M*b,0);for(const[w]of[[d],[d],[m],[d],[m],[m]]){const T=1-Math.min(1,Math.abs(w)/(Re*1.45));o.copy(n).lerp(s,T*T*.85),e.push(o.r,o.g,o.b)}}}const r=new Gt;r.setAttribute("position",new kt(t,3)),r.setAttribute("color",new kt(e,3));const a=new dt(r,this.frameMat);return a.frustumCulled=!1,a}destroy(){this.doomT<0&&(this.doomT=0)}get doom(){return this.doomT}get eyePos(){return this.quad?this.quad.position:null}hitDist(t,e,n,s,o,r,a){const c=s-t,l=r-n,h=Math.hypot(c,l);if(h<1)return-1;const f=c/h,d=l/h,p=Math.min(h,300),m=this.chunkKeys,v=this.chunkList;m.clear(),v.length=0;for(let u=0;u<=p+24;u+=24){const x=t+f*u,_=n+d*u,M=Math.round(ye(x,_)/St),E=Math.round(_/St);for(let b=-1;b<=1;b++)for(let w=-1;w<=1;w++){const T=(M+b)*1000003+(E+w);m.has(T)||(m.add(T),v.push(M+b,E+w))}}let g=-1;for(let u=0;u<v.length;u+=2)for(const x of ha(v[u],v[u+1])){if(x.kind==="tree"||x.kind==="lamp")continue;const _=x.r??0,M=x.x-t,E=x.z-n,b=M*f+E*d;if(b<8||b>p||b<=g)continue;const w=M*d-E*f;if(w*w>_*_)continue;const T=cw(x);T<1.6||a(x.x,x.z)+T<e+(o-e)*(b/h)||(g=b)}return g}groundHit(t,e,n,s,o){const r=l=>{const h=t.x+(e-t.x)*l,f=t.z+(s-t.z)*l;return t.y+(n-t.y)*l-o(h,f)};let c=.04;for(let l=1;l<=20;l++){const h=.04+.96*l/20;if(r(h)<=0){let d=c,p=h;for(let m=0;m<8;m++){const v=(d+p)/2;r(v)>0?d=v:p=v}return d}c=h}return 1}terrainBlocked(t,e,n,s,o,r,a){const c=s-t,l=r-n,h=Math.hypot(c,l);if(h<1)return!1;const f=c/h,d=l/h,p=Math.min(h,420);for(let m=14;m<p;m+=13){const v=t+f*m,g=n+d*m,u=e+(o-e)*(m/h);if(a(v,g)>u+.6)return!0}return!1}applyDoom(t,e){const n=this.doomT+=t;if(!this.tower||!this.quad)return;const s=Math.max(0,1-n/.55);this.quad.scale.multiplyScalar(s),this.mat.uniforms.uLock.value=s,this.glow&&this.glow.scale.multiplyScalar(s*s),this.gather&&(this.gather.visible=!1),this.laser&&(this.laser.visible=!1),this.laserGlow&&(this.laserGlow.visible=!1),this.beam&&(this.beam.visible=!1),this.cutLight.intensity=0,this.light.intensity=0,this.phase=0;const o=Math.min(1,n/1.1),r=Math.max(0,Math.min(1,(n-.7)/2.6)),a=r*r*1.5,c=Math.max(1,(this.quadBaseY-this.groundY)*.82);if(this.tower.position.y=this.towerBaseY-o*26*e,this.tower.rotation.z=-a,this.tower.position.x=this.towerBaseX-Math.sin(a)*c*.5,this.tower.position.z=this.towerBaseZ+(1-Math.cos(a))*c*.16,this.stump){this.stump.visible=r>.02,this.stump.position.set(this.towerBaseX,this.towerBaseY,this.towerBaseZ);const h=this.tower.scale;this.stump.scale.set(h.x,h.y*.78*(1-r*.22),h.z)}const l=Math.max(0,Math.min(1,(n-(lp-2.4))/2.4));this.towerMat.opacity=1-l,this.towerMat.transparent=l>.001,this.frame&&(this.frame.visible=n<1.1),l>=1&&(this.group.visible=!1)}update(t,e,n,s,o,r,a){const c=Se(n)>.3||this.cine>=0;if(this.group.visible=c,this.caught=!1,!c){this.light.intensity=0,this.cutLight.intensity=0,this.laser&&(this.laser.visible=!1),this.laserGlow&&(this.laserGlow.visible=!1),this.phase=0,this.lock=0;return}const l=hp(n);if(this.cine<0&&l.z-n>Ol-Gi+2500){this.group.visible=!1,this.light.intensity=0,this.cutLight.intensity=0,this.phase=0,this.lock=0;return}if(l.k!==this.built){this.tower&&this.group.remove(this.tower),this.quad&&this.group.remove(this.quad),this.frame&&this.group.remove(this.frame),this.glow&&this.group.remove(this.glow),this.gather&&this.group.remove(this.gather),this.beam&&this.group.remove(this.beam),this.laser&&this.group.remove(this.laser),this.laserGlow&&this.group.remove(this.laserGlow);const q=r(l.x,l.z),ut=this.buildTower(l);ut.position.set(l.x,q,l.z),this.group.add(ut),this.tower=ut;const lt=this.buildFrame();this.group.add(lt),this.frame=lt;const ft=new dt(new Qe(Re*2,Re*1.35),this.mat);ft.position.set(l.x,q+l.h-40,l.z),ft.frustumCulled=!1,this.groundY=q;const Nt=new dt(new Qe(Re*9,Re*9),this.gatherMat);Nt.frustumCulled=!1,Nt.renderOrder=-3,this.group.add(Nt),this.gather=Nt;const ct=new dt(new Qe(Re*4.2,Re*4.2),this.glowMat);ct.frustumCulled=!1,ct.renderOrder=-1,this.group.add(ct),this.glow=ct,this.group.add(ft),this.quad=ft;const Mt=new dt(new He(1,1,1,16,1,!0),this.beamMat);Mt.frustumCulled=!1,this.group.add(Mt),this.beam=Mt;const Dt=new He(1,1,1,14,1,!0),bt=new dt(Dt,this.glowMat2);bt.frustumCulled=!1,bt.visible=!1,bt.renderOrder=-2,this.group.add(bt),this.laserGlow=bt;const mt=new dt(Dt,this.laserMat);mt.frustumCulled=!1,mt.visible=!1,this.group.add(mt),this.laser=mt,this.light.position.copy(ft.position),this.towerBaseX=l.x,this.towerBaseY=q,this.towerBaseZ=l.z,this.quadBaseY=ft.position.y,this.stump&&this.group.remove(this.stump);const Vt=new dt(ut.geometry,this.towerMat);Vt.visible=!1,Vt.frustumCulled=!1,this.group.add(Vt),this.stump=Vt,this.charges=rt(l.k*7.7+1.3,5.1)>0?6:5,this.phase=0,this.phaseT=0,this.sinceCut=0,this.aimU=105,this.holdT=0,this.acq=0,this.rest=0,this.searchU=0,this.commitT=0,this.biasZ=0,this.biasU=0,this.rage=0,this.lock=0,this.heldCaught=!1,this.built=l.k}if(!this.quad||!this.beam||!this.tower)return;if(this.doomT>=0){this.applyDoom(o,Math.max(1,Math.hypot(t-l.x,n-l.z)/1500));return}this.quadBaseY=this.quad.position.y;const h=Math.hypot(t-l.x,n-l.z),f=Math.max(l.h,Math.min(14e3,e+Math.max(240,h*aw)-this.groundY)),d=this.cine>=0?Math.max(.001,this.cine):1,p=f/l.h*d;this.tower.scale.set(1+(f/l.h-1)*.5,p,1+(f/l.h-1)*.5),this.quad.position.y=this.groundY+(l.h-40)*p;const m=this.quad.position,v=n+6,g=ye(t,n)-re(v),u=Math.max(2,Math.round(Rf/o));this.trail.length!==u&&(this.trail=new Array(u).fill(g)),this.trail[this.trailAt%u]=g,this.trailAt++;const x=this.trail[this.trailAt%u],_=ZS*o;this.searchU+=Math.max(-_,Math.min(_,g-this.searchU));const M=this.holdT<=0,E=(g-x)/Rf,b=Math.max(-pc,Math.min(pc,E*XS));this.commitT-=o,(this.commitT<=0||M)&&(this.commitT=qS,this.commitU=g+b);const w=M?this.searchU+Math.cos(s/VS*Math.PI*2)*95:this.commitU+(this.heldCaught?0:Math.sin(s*5.1)*14),T=(M?90:YS)*o;this.aimU+=Math.max(-T,Math.min(T,w-this.aimU));const y=oe(re(v)+this.aimU,v),S=r(y,v),A=Math.hypot(t-y,n-v)<Ef,R=A&&(this.hitDist(t,e,n,m.x,m.y,m.z,r)>=0||this.terrainBlocked(t,e+1.6,n,m.x,m.y,m.z,r));this.caught=A&&!R,this.heldCaught=this.caught,this.rest=Math.max(0,this.rest-o),this.acq=Math.max(0,Math.min(Af*1.5,this.acq+(this.caught&&this.rest<=0?o:-o*.5)));const P=this.holdT>0;if(this.acq>=Af?this.holdT=WS:this.holdT=Math.max(0,this.holdT-o),P&&this.holdT<=0&&(this.rest=KS),this.lock=Math.max(0,Math.min(1.6,this.lock+(this.caught?o:-o*1.4))),this.lastPz!==0&&Math.abs(n-this.lastPz)>40){const q=ye(t,n);this.sweepX=q,this.stabU=q,this.markX=t,this.markZ=n,this.stampT=0,this.searchU=q-re(n),this.trail.length=0}if(this.lastPz!==0&&o>0){const q=(n-this.lastPz)/o;q>0&&q<90&&(this.vDown+=(q-this.vDown)*Math.min(1,o*3));const ut=(t-this.lastPx)/o;Math.abs(ut)<90&&(this.vSide+=(ut-this.vSide)*Math.min(1,o*3))}this.lastPz=n,this.lastPx=t;for(const q of Kd()){if(!q.aimed)continue;const ut=Math.max(-30,Math.min(30,n-q.z)),lt=Math.max(-30,Math.min(30,g-(ye(q.x,q.z)-re(q.z))));this.biasZ=Math.max(-45,Math.min(45,this.biasZ+ut*.3)),this.biasU=Math.max(-45,Math.min(45,this.biasU+lt*.3))}const U=Math.max(0,Math.min(1,(this.vDown-5)/16));this.rage=Math.max(0,Math.min(1,this.rage+(this.lock>oo&&U>.35?o/ow:-o/rw)));const I=this.rage*U;if(this.sinceCut+=o,this.quiet&&(this.phase=0,this.phaseT=0,this.fireT=Math.max(this.fireT,1)),!this.quiet&&this.phase===0)this.charges>0&&this.sinceCut>JS&&this.lock>oo&&U>.5&&this.rage>.12&&(this.charges--,this.phase=1,this.phaseT=0);else if(!this.quiet)if(this.phaseT+=o,this.phase===1&&this.phaseT>=Cf){this.phase=2,this.phaseT=0,this.sweepX=ye(t,n),this.stabU=this.sweepX,this.cutU=this.sweepX,this.cutZ=n+mc*this.vDown,this.cutClip=1,this.cutY=r(t,n),this.moveOrder=[0,1,2];for(let q=2;q>0;q--){const ut=Math.floor(Math.random()*(q+1)),lt=this.moveOrder[q];this.moveOrder[q]=this.moveOrder[ut],this.moveOrder[ut]=lt}this.moveKind=this.moveOrder[0],this.moveT=0,this.movePhase=Math.random()*Math.PI*2,this.stampT=0,this.markX=t,this.markZ=n+mc*this.vDown,this.markLands=!0}else this.phase===2?this.phaseT>=cp&&(this.phase=3,this.phaseT=0,this.sinceCut=0):this.phase===3&&this.phaseT>=$S&&(this.phase=0,this.phaseT=0);const N=this.phase===2,G=this.phaseT/Cf,z=(q,ut)=>Math.max(0,Math.min(1,(G-q)/(ut-q))),V=this.phase===2?1:0,Y=this.phase===3?Math.max(0,1-this.phaseT/1.4):0,j=(q,ut)=>this.phase===1?z(q,ut):this.phase===2?V:Y,ot=j(0,.18),wt=j(.2,.34),W=this.phase===1?Math.min(1,z(.3,.55)*.72+z(.86,1)*.28):this.phase===2?1:Y,et=j(.4,.62),tt=this.phase===1?z(.6,.8)*(1-z(.82,.86)):0,st=this.phase===1?z(.86,1):0,pt=this.phase===1?z(.86,1):this.phase===2?1:this.phase===3?Math.max(0,1-this.phaseT/1.1):0;if(this.fireT-=o,!N&&!this.quiet&&this.lock>oo&&U>.2&&this.fireT<=0){this.fireT=(.95-I*.6)*(.85+Math.random()*.3);const q=1+(I>.3?1:0)+(I>.62?1:0)+(I>.88?1:0);for(let ut=0;ut<q;ut++){const lt=ut===0,ft=lt?2.4+Math.random()*.5:5.2+Math.random()*1.8,Nt=n+this.vDown*ft+this.biasZ+(Math.random()-.5)*(lt?3.5:14),ct=lt?.4:.9,Mt=lt?16:pc,Dt=Math.max(-Mt,Math.min(Mt,E*ft*ct)),bt=ut===0?0:ut===1?-1:1,mt=Math.sign(E)||1,Vt=jS*ft*(bt===mt?.62:.42),zt=g+Dt+this.biasU+bt*Vt+(Math.random()-.5)*(lt?3:11),se=oe(re(Nt)+zt,Nt);X_(m.x,m.y-10,m.z,se,Nt,r(se,Nt),ft,lt)}}const Tt=this.hitDist(y,S,v,m.x,m.y,m.z,r),Ut=Math.hypot(y-m.x,v-m.z),ie=Tt<0?1:Math.max(.05,1-Math.min(1,Tt/Math.max(1,Ut))),qt=this.groundHit(m,y,S,v,r),ue=Math.min(ie,qt),B=m.x+(y-m.x)*ue,Le=m.y+(S-m.y)*ue,Yt=m.z+(v-m.z)*ue;this.dir.set(B-m.x,Le-m.y,Yt-m.z);const jt=this.dir.length();this.dir.normalize();const It=jt;this.beam.position.set((m.x+B)/2,(m.y+Le)/2,(m.z+Yt)/2),this.tmpQ.setFromUnitVectors(this.up,this.dir),this.beam.quaternion.copy(this.tmpQ),this.beam.scale.set(1,It,1),this.beamMat.uniforms.uR0.value=Math.max(16,Ut*.02),this.beamMat.uniforms.uR1.value=9*ue;const fe=ue>.985,Lt=this.phase===2,D=this.phase!==0||this.quiet;if(this.cutting=Lt,this.chargeAmt=Math.max(ot,Math.max(W,Math.max(tt,st))),this.beam.visible=!D,this.beamMat.uniforms.uOp.value=.26+this.lock*.16,this.onSpotDir&&this.onSpotDir(m.x-y,m.y-S,m.z-v),this.onSpot){const q=D?0:fe?.4+this.lock*.24+(this.caught?.1:0):0;this.onSpot(y,v,Ef,q)}if(this.laser)if(this.laser.visible=Lt,this.laserGlow&&(this.laserGlow.visible=Lt),Lt){this.moveT+=o;const q=Math.min(2,Math.floor(this.phaseT/nw));this.moveOrder[q]!==this.moveKind&&(this.moveKind=this.moveOrder[q],this.moveT=0,this.movePhase=Math.random()*Math.PI*2);const ut=ye(t,n),lt=sw*o;this.sweepX+=Math.max(-lt,Math.min(lt,ut-this.sweepX));const ft=Math.max(38,this.vDown*mc);let Nt,ct;if(this.moveKind===0)Nt=this.sweepX+QS*Math.sin(this.moveT*Math.PI*2/iw+this.movePhase),ct=n+ft;else if(this.moveKind===1){const Fe=this.moveT*Math.PI*2/tw+this.movePhase;Nt=this.sweepX+Pf*Math.cos(Fe),ct=n+ft*1.05+Pf*Math.sin(Fe)}else{const Fe=this.moveT%gc/gc,dn=Math.floor(this.moveT/gc)%2===0?1:-1,Co=Fe<.4?ut+E*.55:this.sweepX+dn*ew;this.stabU+=(Co-this.stabU)*Math.min(1,o*6),Nt=this.stabU,ct=n+ft*(Fe<.4?.9:1.35)}const Mt=1-Math.exp(-4*o);this.cutU+=(Nt-this.cutU)*Mt,this.cutZ+=(ct-this.cutZ)*Mt;const Dt=this.cutU,bt=this.cutZ,mt=oe(Dt,bt),Vt=r(mt,bt);this.cutY+=(Vt-this.cutY)*(1-Math.exp(-9*o));const zt=this.cutY,se=Math.hypot(mt-m.x,bt-m.z),O=this.hitDist(mt,zt,bt,m.x,m.y,m.z,r),vt=O<0?1:Math.max(.05,1-Math.min(1,O/Math.max(1,se))),$=this.groundHit(m,mt,zt,bt,r),nt=Math.min(vt,$);this.cutClip+=(nt-this.cutClip)*(1-Math.exp(-14*o));const _t=this.cutClip,xt=nt>.985,Ot=m.x+(mt-m.x)*_t,ge=m.y+(zt-m.y)*_t,be=m.z+(bt-m.z)*_t;this.cut.set(Ot,ge,be),this.stampT+=o,this.stampT>=$d&&(this.stampT=0,xt&&this.markLands&&ax(this.markX,this.markZ,mt,bt),this.markX=mt,this.markZ=bt,this.markLands=xt),this.dir.set(Ot-m.x,ge-m.y,be-m.z);const Qt=this.dir.length();this.dir.normalize(),this.laser.position.set((m.x+Ot)/2,(m.y+ge)/2,(m.z+be)/2),this.tmpQ.setFromUnitVectors(this.up,this.dir),this.laser.quaternion.copy(this.tmpQ),this.laser.scale.set(1,Qt,1),this.laserGlow&&(this.laserGlow.position.copy(this.laser.position),this.laserGlow.quaternion.copy(this.tmpQ),this.laserGlow.scale.set(1,Qt,1)),this.laserMat.uniforms.uT.value=s,this.glowMat2.uniforms.uT.value=s,this.cutLight.position.set(Ot,ge+7,be),this.cutLight.intensity=340}else this.cutLight.intensity=0;this.quad.lookAt(t,e+2,n);const C=Math.hypot(t-m.x,n-m.z),X=Math.max(1,C/1500),it=this.mat.uniforms.uLock.value,at=X*(1+it*.5+et*1.5);if(this.quad.scale.setScalar(at),this.frame&&(this.frame.position.copy(m),this.frame.quaternion.copy(this.quad.quaternion),this.frame.scale.setScalar(X*(1+pt*.45))),this.gather&&(this.gather.visible=tt>.002,this.gather.position.copy(m),this.gather.quaternion.copy(this.quad.quaternion),this.gather.scale.setScalar(at*.62),this.gatherMat.uniforms.uT.value=s,this.gatherMat.uniforms.uK.value=tt),this.glow&&(this.glow.position.copy(m),this.glow.quaternion.copy(this.quad.quaternion),this.glow.scale.setScalar(X*(.62+this.lock*.28+et*1.4)),this.glowMat.uniforms.uLock.value=Math.min(1,this.lock/oo+W),this.glowMat.uniforms.uTime.value=s,this.glowMat.uniforms.uCol.value.setRGB(1.9+W*1.6,.5-W*.36,.1-W*.07)),ot>.01){const q=ot*3.4*X*(this.phase===1?1:.4),ut=(Math.random()-.5)*q,lt=(Math.random()-.5)*q;this.quad.position.x=l.x+ut,this.quad.position.y+=lt,this.quad.position.z=l.z+(Math.random()-.5)*q,this.glow&&this.glow.position.copy(this.quad.position)}else this.quad.position.x!==l.x&&(this.quad.position.x=l.x,this.quad.position.z=l.z);this.mat.uniforms.uTime.value=s,this.mat.uniforms.uBrow.value=wt,this.mat.uniforms.uRed.value=W,this.mat.uniforms.uLock.value=Math.max(Math.min(1,this.lock/oo),Math.max(W,pt)),this.mat.uniforms.uHaze.value=Math.min(.34,Math.max(0,(C-1200)/6e3)),this.mat.uniforms.uHazeCol.value.copy(a),this.light.position.set(y,S+26,v),this.light.intensity=!D&&fe?48*(.6+this.lock*.9):0,this.doomT>=0&&this.applyDoom(o,X)}}var uo=(i=>(i[i.Menu=0]="Menu",i[i.IntroRide=1]="IntroRide",i[i.Snow=2]="Snow",i[i.IntroTower=3]="IntroTower",i[i.Volcano=4]="Volcano",i[i.Approach=5]="Approach",i[i.Doom=6]="Doom",i[i.Win=7]="Win",i))(uo||{});const uw=['"WHAT A WONDERFUL DAY.','THIS IS GOING TO BE A GREAT RIDE!"'],fw=['"OH NO...','YOU HAVE PASSED AFTER ALL."'],dw=['"I AM THE GREAT EYE.',"TODAY IS NOT YOUR DAY.",'YOU SHALL NOT PASS!"'],pw=["WASD / ARROWS  -  STEER, TRICKS IN THE AIR","SPACE  -  JUMP","Q / E  -  LEFT / RIGHT BRAKE","R  -  RESPAWN"],vc=3.2,Df=3,Mc=2.2,If=2,Rr=[" ","PRESS SPACE TO CONTINUE"],Uf=1.8,mw=lp;function _c(i){const t=Math.max(0,Math.min(1,i));return t*t*(3-2*t)}class gw{constructor(){this.stage=0,this.t=0,this.wantDoom=!1,this.towerRise=-1,this.camToTower=0,this.weatherZ=0,this.towerZ=0,this.wantWarp=0,this.leaveT=-1,this.saidT=-1}get frozen(){return this.stage===0||this.stage===1||this.stage===3||this.stage===6||this.stage===7}get playing(){return this.stage===2||this.stage===4||this.stage===5}update(t,e,n,s){this.t+=t;const o=a=>{this.stage=a,this.t=0,this.leaveT=-1,this.saidT=-1},r=e;switch(this.stage){case 0:return e&&this.t>.3&&o(1),{title:"SNOWHELL",lines:[" ",...pw,...Rr],dim:.82};case 1:return r&&o(2),{title:"",lines:[...uw,...Rr],dim:.45};case 2:return n>Gi-260&&o(3),null;case 3:{const a=this.t,c=Math.min(1,a/vc);this.weatherZ=n+(Gi+700-n)*c*c,this.towerRise=Math.max(0,Math.min(1,(a-vc*.55)/Df));const l=vc+Df;if(!(a>=l+Mc))this.camToTower=a<l?0:_c((a-l)/Mc);else if(this.leaveT<0)this.camToTower=1,e&&(this.leaveT=a);else if(this.camToTower=1-_c((a-this.leaveT)/If),a>this.leaveT+If)return this.towerRise=-1,this.camToTower=0,o(4),null;const f=a>l+Mc*.75&&this.leaveT<0;return{title:"",lines:f?[...dw,...Rr]:[],dim:f?.28:0}}case 4:return this.weatherZ=Math.max(this.weatherZ,n),this.towerRise=1,n>Ol&&(this.towerZ=hp(n).z,o(5)),null;case 5:return this.towerRise=1,n>this.towerZ-420&&o(6),null;case 6:{this.towerRise=1,this.camToTower=_c(Math.min(1,this.t/Uf));const a=this.t>=Uf;return this.saidT<0?(a&&e&&(this.saidT=this.t,this.wantDoom=!0),a?{title:"",lines:[...fw,...Rr],dim:.3}:null):(this.t>this.saidT+mw&&o(7),null)}default:return{title:"YOU WIN",lines:[" ","THE EYE IS BROKEN."," ","SCORE  "+s," ","PRESS SPACE TO RESTART"],dim:.72}}}}const le=i=>new Q(i),Cr=[{name:"ash-volcano",skyZenith:le(2826550),skyHorizon:le(9654319),sun:le(12610106),fog:le(6112318),snowTint:le(7301236),distTint:le(8877688),airColor:le(1709080),airOpacity:.5,pine:le(4866880),hemiSky:le(6971510),hemiGround:le(13662786),sunDir:new F(.62,.18,.75).normalize(),sunIntensity:1.35,hemiIntensity:1.5,fogNear:260,fogFar:4600,backdropSnow:0},{name:"alpine-sunset",skyZenith:le(4934302),skyHorizon:le(15782588),sun:le(16767392),fog:le(13027286),snowTint:le(16777215),distTint:le(16777215),airColor:le(16777215),airOpacity:.55,pine:le(16777215),hemiSky:le(12767218),hemiGround:le(14542328),sunDir:new F(.5,.34,.8).normalize(),sunIntensity:2.3,hemiIntensity:.8,fogNear:300,fogFar:3700},{name:"high-desert",skyZenith:le(3356764),skyHorizon:le(11118254),sun:le(15262424),fog:le(10132132),snowTint:le(12434626),distTint:le(11973819),airColor:le(14343140),airOpacity:.4,pine:le(10133666),hemiSky:le(11055820),hemiGround:le(12106950),sunDir:new F(.55,.3,.78).normalize(),sunIntensity:1.5,hemiIntensity:.8,fogNear:240,fogFar:3e3}];class vw{constructor(t,e,n,s,o,r,a,c,l){this.fog=t,this.sun=e,this.hemi=n,this.snowMat=s,this.pineMat=o,this.farMat=r,this.backdropMat=a,this.peakMat=c,this.airMat=l}update(t){const{a:e,b:n,t:s}=To(t),o=Cr[e%Cr.length],r=Cr[n%Cr.length],a=s*s*(3-2*s),c=(h,f)=>h+(f-h)*a;Ne.skyZenith.lerpColors(o.skyZenith,r.skyZenith,a),Ne.skyHorizon.lerpColors(o.skyHorizon,r.skyHorizon,a),Ne.sun.lerpColors(o.sun,r.sun,a),ki.lerpVectors(o.sunDir,r.sunDir,a).normalize(),this.sun.color.copy(Ne.sun),this.sun.intensity=c(o.sunIntensity,r.sunIntensity),this.hemi.color.lerpColors(o.hemiSky,r.hemiSky,a),this.hemi.groundColor.lerpColors(o.hemiGround,r.hemiGround,a),this.hemi.intensity=c(o.hemiIntensity,r.hemiIntensity),this.fog.color.lerpColors(o.fog,r.fog,a),this.fog.near=c(o.fogNear,r.fogNear),this.fog.far=c(o.fogFar,r.fogFar),this.snowMat.color.lerpColors(o.snowTint,r.snowTint,a),this.pineMat.color.lerpColors(o.pine,r.pine,a),this.farMat.color.lerpColors(o.snowTint,r.snowTint,a);const l=this.backdropMat.uniforms;l.uTint.value.lerpColors(o.distTint,r.distTint,a),l.uHaze.value.copy(this.fog.color),l.uSnow.value=c(o.backdropSnow??1,r.backdropSnow??1),l.uRock.value.lerpColors(o.distTint,r.distTint,a),this.peakMat.uniforms.uTint.value.lerpColors(o.distTint,r.distTint,a),this.airMat.color.lerpColors(o.airColor,r.airColor,a),this.airMat.opacity=c(o.airOpacity,r.airOpacity)}}const Nf=[{dist:4200,amp:900,jag:.85,haze:.42,segs:256},{dist:6200,amp:1500,jag:.75,haze:.62,segs:192},{dist:9e3,amp:2400,jag:.6,haze:.8,segs:144}];function Mw(i){return i/(8*Math.PI)}const _w=new Q(4867671),xw=new Q(16761754),Ff=Ne.fog.clone(),yw=new Q(14542066),zf=.69,Of=.72;function Sw(i,t,e,n,s){const o=(l,h)=>{const f=rt(i*l+h+n,t*l-h*.7-n);return 1-Math.abs(f)};let r=o(s*.24,4.7)*.5;r+=o(s*.55,-11.2)*.31*r*2,r+=o(s,21.4)*.19,r=Math.max(0,Math.min(1,r));const a=rt(i*1.7-55.3+n,t*1.7+12.9-n)*.5+.5,c=Math.pow(Math.max(0,a-.62)/.38,1.5)*1.5;return 1-e+e*(r*2.3+c)}class ww{constructor(){this.group=new ee;const t=Ne.fog.clone(),e=[];for(let a=Nf.length-1;a>=0;a--)e.push(this.buildRidge(Nf[a],a,t));const n=e[0],s=e.length===1?n:bw(e),o=new me({uniforms:{uHaze:{value:Ne.fog.clone()},uTint:{value:new Q(16777215)},uSnow:{value:1},uRock:{value:new Q(4867671)}},vertexShader:`
        attribute float aHaze;
        attribute float aSnow;
        varying vec3 vCol;
        varying float vHaze;
        varying float vSnow;
        void main() {
          vCol = color;
          vHaze = aHaze;
          vSnow = aSnow;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,fragmentShader:`
        uniform vec3 uHaze;
        uniform vec3 uTint;
        uniform vec3 uRock;
        uniform float uSnow;
        varying vec3 vCol;
        varying float vHaze;
        varying float vSnow;
        void main() {
          // снег снимается там, где биом бесснежный: в вулкане кулисы должны
          // быть тёмной породой, а не белыми шапками
          vec3 base = mix(vCol, uRock * (0.6 + 0.7 * length(vCol) * 0.5), vSnow * (1.0 - uSnow));
          // и сходятся кулисы РОВНО к текущему цвету тумана, иначе на общей
          // границе с затуманенной землёй видна полоса
          gl_FragColor = vec4(mix(base * uTint, uHaze, vHaze), 1.0);
        }
      `,vertexColors:!0,fog:!1,depthTest:!1,depthWrite:!1,side:we}),r=new dt(s,o);r.frustumCulled=!1,r.renderOrder=-2,this.material=o,this.group.add(r)}buildRidge(t,e,n){const s=[],o=[],r=new Q,a=new Q,c=t.segs,l=Mw(c),h=[],f=[],d=[],p=[],m=[];for(let _=0;_<=c;_++){const M=_%c/c*Math.PI*2,E=Math.cos(M),b=Math.sin(M),w=rt(E*1.4+e*7,b*1.4-e*3)*.5+.5,T=rt(E*l*.5+e*11,b*l*.5-e*5)*.5+.5,y=t.dist*(.82+w*.34+T*.14),S=E*y,A=b*y,R=-.58*A;h.push(S),f.push(A),d.push(R+t.amp*Sw(E,b,t.jag,e*31.7,l)),p.push(R-t.amp*2.2);const P=rt(E*2.6+e*13.1,b*2.6-e*5.7)*.5+.5;m.push(Math.min(d[_],R+t.amp*(.2+P*.34)))}const v=[],g=[],u=(_,M,E,b,w,T,y,S,A=0,R=0,P,U)=>{const I=S??y,N=P??A,G=U??R,z=[[h[_],M,f[_],y,A,R],[h[b],w,f[b],y,A,R],[h[b],T,f[b],I,N,G],[h[_],M,f[_],y,A,R],[h[b],T,f[b],I,N,G],[h[_],E,f[_],I,N,G]];for(const V of z)s.push(V[0],V[1],V[2]),o.push(V[3].r,V[3].g,V[3].b),v.push(V[4]),g.push(V[5])};for(let _=0;_<c;_++){const M=_+1,E=h[M]-h[_],b=f[M]-f[_],w=Math.hypot(E,b)||1,T=b/w,y=-E/w,S=.74+.36*Math.max(0,T*zf+y*Of),A=.97+J(_,e*17+3)*.06,R=S*A,P=1+(R-1)*.45*(1-t.haze*.5),U=-.58*f[_],I=-.58*f[M],N=m[_],G=m[M],z=Math.max(0,T*zf+y*Of),V=Math.pow(z,1.6)*(.34+e*.16);r.copy(yw).multiplyScalar(R).lerp(xw,V).multiplyScalar(P),u(_,d[_],N,M,d[M],G,r,void 0,t.haze,1),a.copy(_w).multiplyScalar(.5+R*.47).multiplyScalar(P);const Y=Math.max(N-t.amp*.5,U-t.amp*.1),j=Math.max(G-t.amp*.5,I-t.amp*.1);u(_,N,Y,M,G,j,r,a,t.haze,1,t.haze*.9,0);const ot=U-t.amp*.12,wt=I-t.amp*.12;u(_,Y,Math.min(Y,ot),M,j,Math.min(j,wt),a,Ff,t.haze*.9,0,1,0),u(_,Math.min(Y,ot),p[_],M,Math.min(j,wt),p[M],Ff,void 0,1,0,1,0)}const x=new Gt;return x.setAttribute("position",new kt(s,3)),x.setAttribute("color",new kt(o,3)),x.setAttribute("aHaze",new kt(v,1)),x.setAttribute("aSnow",new kt(g,1)),x}update(t,e,n){this.group.position.set(t,e,n)}}function bw(i){let t=0;for(const r of i)t+=r.attributes.position.count;const e=new Float32Array(t*3),n=new Float32Array(t*3);let s=0;for(const r of i)e.set(r.attributes.position.array,s),n.set(r.attributes.color.array,s),s+=r.attributes.position.count*3,r.dispose();const o=new Gt;return o.setAttribute("position",new Pt(e,3)),o.setAttribute("color",new Pt(n,3)),o}function Tw(){Bt.fog_pars_vertex=`
#ifdef USE_FOG
  varying float vFogDepth;
  varying vec2 vCloudXZ;
#endif
`,Bt.fog_vertex=`
#ifdef USE_FOG
  vFogDepth = - mvPosition.z;
  // мировые XZ для теней облаков (см. fog_fragment). transformed здесь уже
  // в области видимости, а modelMatrix — встроенный uniform
  vCloudXZ = (modelMatrix * vec4(transformed, 1.0)).xz;
#endif
`,Bt.fog_pars_fragment=`
#ifdef USE_FOG
  uniform vec3 fogColor;
  varying float vFogDepth;
  varying vec2 vCloudXZ;

  float cshHash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }
  float cshNoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(cshHash(i), cshHash(i + vec2(1.0, 0.0)), u.x),
      mix(cshHash(i + vec2(0.0, 1.0)), cshHash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }
  #ifdef FOG_EXP2
    uniform float fogDensity;
  #else
    uniform float fogNear;
    uniform float fogFar;
  #endif
#endif
`,Bt.fog_fragment=`
#ifdef USE_FOG
  // Показатель 1.8 отжимает дымку из СЕРЕДИНЫ дистанции. Замер локального
  // контраста (сред. |разница| соседних пикселей) показал: при 68% дымки на
  // 900 м дальняя полоса имела контраст 1.6 против 3.7 у ближней земли —
  // рельеф там есть, но выглядит гладкой заливкой, то есть «непрорисовкой».
  // Полное растворение — только у края отрисовки (fogFar < радиуса
  // дальнего плана 1440 м, см. farfield.ts).
  // ТЕНИ ОБЛАКОВ. Огромное снежное поле — это заливка, на которой глазу не
  // за что зацепиться; на реальных горных снимках его лепят как раз пятна
  // облачной тени. Считаем их ЗДЕСЬ, в общем чанке тумана: так они разом
  // ложатся на все слои мира (чанки, дальний план, деревья, камни) и не
  // расходятся швами — ровно по той же причине, по какой здесь живёт туман.
  //
  // Времени в шейдере нет намеренно: пятна стоят в МИРОВЫХ координатах, а
  // игрок несётся сквозь мир на сотне километров в час — они и так плывут
  // через кадр. Лишний uniform пришлось бы обновлять на каждом материале
  // отдельно (three клонирует uniforms), а выглядело бы это так же.
  vec2 cp = vCloudXZ * 0.0046;
  float csh = cshNoise(cp) * 0.62 + cshNoise(cp * 2.7 + 11.3) * 0.38;
  float cshK = smoothstep(0.40, 0.70, csh);
  // тень холоднее, а не просто темнее: у снега в тени синий подсвет неба
  gl_FragColor.rgb *= vec3(1.0 - cshK * 0.26, 1.0 - cshK * 0.23, 1.0 - cshK * 0.16);

  // РЕДКИЕ СОЛНЕЧНЫЕ ИСКРЫ. Наст — это миллионы ледяных граней, и раз в
  // несколько метров одна из них ловит солнце ровно в глаз. Эффект держится
  // на РЕДКОСТИ: сплошная блёстка читается как шум на текстуре, а одиночная
  // вспышка — как настоящий снег.
  //
  // Мерцание берём из vFogDepth, а не из времени: для точки, стоящей в мире,
  // расстояние до камеры меняется на каждом кадре, пока игрок едет, — то есть
  // угол «взгляд-грань» и правда гуляет, и вспышка гаснет и зажигается сама.
  // Заодно это снова обходит проблему с uniform времени на каждом материале.
  // ПОЛОСА, А НЕ «ВСЁ БЛИЖЕ N». Снизу отрезаем не просто так: сам райдер
  // висит в пяти метрах от камеры и ЕДЕТ сквозь мировые ячейки искр, то есть
  // получал бы случайное мерцание прямо по куртке. Ниже 11 м искр нет вовсе.
  float sparkNear = smoothstep(11.0, 19.0, vFogDepth)
    * (1.0 - smoothstep(22.0, 60.0, vFogDepth));
  if (sparkNear > 0.0) {
    float sHash = cshHash(floor(vCloudXZ * 5.5));
    // Искры только на СНЕГУ: хвоя и порода темнее, и блёстки на них выглядят
    // как грязь на линзе. Порог по яркости самого фрагмента — самый дешёвый
    // способ отличить снег от всего остального прямо здесь.
    float lum = dot(gl_FragColor.rgb, vec3(0.3, 0.6, 0.1));
    float tw = 0.5 + 0.5 * sin(sHash * 437.0 + vFogDepth * 2.3);
    // ВНИМАНИЕ: цель кадра ЛИНЕЙНАЯ (гамму накладывает ретро-проход), поэтому
    // яркость снега здесь всего 0.25–0.40, а не 0.8, как кажется на экране.
    // Порог, взятый «по картинке», гасил искры полностью — замер гистограммы
    // светимости кадра показал максимум 219/255 при снеге около 60–100.
    float spark = step(0.995, sHash) * pow(tw, 5.0)
      * sparkNear * smoothstep(0.12, 0.28, lum);
    gl_FragColor.rgb += vec3(0.75, 0.68, 0.5) * spark;
  }

  float fogFactor = pow(smoothstep(fogNear, fogFar, vFogDepth), 1.5);
  gl_FragColor.rgb = mix(gl_FragColor.rgb, fogColor, fogFactor);
#endif
`}function Ew(i=220,t=124){Bt.project_vertex=`
vec4 mvPosition = vec4( transformed, 1.0 );

#ifdef USE_INSTANCING
  mvPosition = instanceMatrix * mvPosition;
#endif

mvPosition = modelViewMatrix * mvPosition;

gl_Position = projectionMatrix * mvPosition;

if ( gl_Position.w > 1.001 ) {
  vec2 snapGrid = vec2( ${i.toFixed(1)}, ${t.toFixed(1)} );
  vec2 ndc = gl_Position.xy / gl_Position.w;
  gl_Position.xy = floor( ndc * snapGrid + 0.5 ) / snapGrid * gl_Position.w;
}
`}const ke=240,Bf=20,Di=6,qn=960,Aw=15,Ms=5,Rw=20;class Cw{constructor(){this.group=new ee,this.blocks=new Map,this.mat=new Ue({vertexColors:!0,flatShading:!0,polygonOffset:!0,polygonOffsetFactor:4,polygonOffsetUnits:4}),this.coarse=new Map,this.center=null,this.centerX=1e9,this.centerZ=1e9,this.centerJob=null}update(t,e){this.updateCenter(t,e);const n=Math.round(t/ke),s=Math.round(e/ke),o=new Set,r=[];for(let c=-Di;c<=Di;c++)for(let l=-Di;l<=Di;l++){const h=(n+l)*ke-ke/2,f=(s+c)*ke-ke/2,d=ke*3/2;if(h>=this.centerX-d&&h+ke<=this.centerX+d&&f>=this.centerZ-d&&f+ke<=this.centerZ+d||l*l+c*c>Di*Di)continue;const p=n+l+","+(s+c);o.add(p),this.blocks.has(p)||r.push([n+l,s+c,l*l+c*c])}r.sort((c,l)=>c[2]-l[2]);const a=performance.now();for(let c=0;c<r.length&&!(c>0&&performance.now()-a>2);c++){const[l,h]=r[c],f=this.build(l,h);this.blocks.set(l+","+h,f),this.group.add(f)}for(const[c,l]of this.blocks)o.has(c)||(this.group.remove(l),l.geometry.dispose(),this.blocks.delete(c));this.updateCoarse(t,e)}updateCoarse(t,e){const n=Math.round(t/qn),s=Math.round(e/qn),o=new Set,r=[];for(let c=-Ms;c<=Ms;c++)for(let l=-Ms;l<=Ms;l++){const h=qn*Math.SQRT2/2;if(Math.hypot(l,c)*qn+h<=Di*ke||l*l+c*c>Ms*Ms)continue;const f=n+l+","+(s+c);o.add(f),this.coarse.has(f)||r.push([n+l,s+c,l*l+c*c])}r.sort((c,l)=>c[2]-l[2]);const a=performance.now();for(let c=0;c<r.length&&!(c>0&&performance.now()-a>2);c++){const[l,h]=r[c],f=this.buildGrid(l*qn-qn/2,h*qn-qn/2,qn,Aw,()=>Rw);this.coarse.set(l+","+h,f),this.group.add(f)}for(const[c,l]of this.coarse)o.has(c)||(this.group.remove(l),l.geometry.dispose(),this.coarse.delete(c))}updateCenter(t,e){const n=Math.round(t/40)*40,s=Math.round(e/40)*40;if(this.centerJob){this.stepCenter();return}n===this.centerX&&s===this.centerZ||(this.centerJob={cx:n,cz:s,heights:[],i:0},this.stepCenter())}stepCenter(){const t=this.centerJob,e=ke*3,n=Bf*2,s=n+1,o=e/n,r=t.cx-e/2,a=t.cz-e/2,c=t.cx,l=t.cz,h=p=>p<130?3+(1-p/130)*12:p<230?.3+(1-(p-130)/100)*2.7:.3,f=Math.min(s*s,t.i+420);for(let p=t.i;p<f;p++){const m=p%s,v=p/s|0,g=r+m*o,u=a+v*o;t.heights.push(Zt(g,u)-h(Math.hypot(g-c,u-l)))}if(t.i=f,f<s*s)return;this.centerX=t.cx,this.centerZ=t.cz;const d=this.gridFromHeights(r,a,e,n,t.heights);this.centerJob=null,this.center&&(this.group.remove(this.center),this.center.geometry.dispose()),this.center=d,this.group.add(d)}build(t,e){return this.buildGrid(t*ke-ke/2,e*ke-ke/2,ke,Bf,()=>0)}buildGrid(t,e,n,s,o){const r=n/s,a=s+1,c=t+n/2,l=e+n/2,h=[];for(let f=0;f<a;f++)for(let d=0;d<a;d++){const p=t+d*r,m=e+f*r;h.push(Zt(p,m)-o(Math.hypot(p-c,m-l)))}return this.gridFromHeights(t,e,n,s,h)}gridFromHeights(t,e,n,s,o){const r=n/s,a=s+1,c=[];for(let v=0;v<s;v++)for(let g=0;g<s;g++){const u=g*r,x=u+r,_=v*r,M=_+r,E=o[v*a+g],b=o[v*a+g+1],w=o[(v+1)*a+g+1],T=o[(v+1)*a+g];c.push(u,E,_,x,w,M,x,b,_),c.push(u,E,_,u,T,M,x,w,M)}const l=new Gt;l.setAttribute("position",new kt(c,3)),l.computeVertexNormals();const h=l.attributes.normal,f=l.attributes.position,d=new Float32Array(f.count*3),p={r:0,g:0,b:0};for(let v=0;v<f.count;v+=3){const g=e+f.getZ(v),u=ye(t+f.getX(v),g);yl(p,u,g,h.getY(v),f.getY(v),!0);for(let x=0;x<3;x++)d[(v+x)*3]=p.r,d[(v+x)*3+1]=p.g,d[(v+x)*3+2]=p.b}l.setAttribute("color",new Pt(d,3));const m=new dt(l,this.mat);return m.position.set(t,0,e),m}get material(){return this.mat}}const Pw={" ":[0,0,0,0,0,0,0],"!":[4,4,4,4,4,0,4],"(":[2,4,8,8,8,4,2],")":[8,4,2,2,2,4,8],"+":[0,4,4,31,4,4,0],",":[0,0,0,0,0,4,8],"-":[0,0,0,31,0,0,0],".":[0,0,0,0,0,6,6],"/":[1,1,2,4,8,16,16],"%":[25,26,2,4,8,11,19],":":[0,4,0,0,0,4,0],"×":[0,17,10,4,10,17,0],"·":[0,0,0,4,0,0,0],"←":[0,4,8,31,8,4,0],"→":[0,4,2,31,2,4,0],"↑":[4,14,21,4,4,4,4],"↓":[4,4,4,4,21,14,4],0:[14,17,19,21,25,17,14],1:[4,12,4,4,4,4,14],2:[14,17,1,2,4,8,31],3:[31,2,4,2,1,17,14],4:[2,6,10,18,31,2,2],5:[31,16,30,1,1,17,14],6:[6,8,16,30,17,17,14],7:[31,1,2,4,8,8,8],8:[14,17,17,14,17,17,14],9:[14,17,17,15,1,2,12],A:[14,17,17,31,17,17,17],B:[30,17,17,30,17,17,30],C:[14,17,16,16,16,17,14],D:[28,18,17,17,17,18,28],E:[31,16,16,30,16,16,31],F:[31,16,16,30,16,16,16],G:[14,17,16,23,17,17,15],H:[17,17,17,31,17,17,17],I:[14,4,4,4,4,4,14],J:[7,2,2,2,2,18,12],K:[17,18,20,24,20,18,17],L:[16,16,16,16,16,16,31],M:[17,27,21,21,17,17,17],N:[17,17,25,21,19,17,17],O:[14,17,17,17,17,17,14],P:[30,17,17,30,16,16,16],Q:[14,17,17,17,21,18,13],R:[30,17,17,30,20,18,17],S:[15,16,16,14,1,1,30],T:[31,4,4,4,4,4,4],U:[17,17,17,17,17,17,14],V:[17,17,17,17,17,10,4],W:[17,17,17,21,21,21,10],X:[17,17,10,4,10,17,17],Y:[17,17,10,4,4,4,4],Z:[31,1,2,4,8,16,31]},kf=5,Hf=7,Lw=6,xc=9;function Dw(i,t=!1){const e=i.toUpperCase().replace(/—/g,"-").split(`
`),n=[];let s=0;e.forEach((a,c)=>{const l=c*xc;let h=0;for(const f of a){const d=Pw[f];if(d)for(let p=0;p<Hf;p++){const m=d[p];if(m){for(let v=0;v<kf;v++)if(m&1<<kf-1-v){const g=h+v,u=l+p;n.push(g,-u,0,g+1,-u,0,g+1,-(u+1),0,g,-u,0,g+1,-(u+1),0,g,-(u+1),0)}}}h+=Lw}s=Math.max(s,Math.max(0,h-1))});const o=new Gt;o.setAttribute("position",new kt(n,3));const r=e.length*xc-(xc-Hf);return t&&o.translate(-s/2,r/2,0),{geo:o,width:s,height:r}}class Cn{constructor(t,e,n,s,o=1,r=!1){this.align=e,this.centeredGeo=r,this.text="",this.width=0,this.x=0,this.y=0,this.baseScale=n,this.mat=new Ze({color:s,transparent:!0,opacity:o,depthTest:!1,depthWrite:!1,side:we}),this.mesh=new dt(new Gt,this.mat),this.mesh.scale.set(n,n,1),this.mesh.renderOrder=10,t.add(this.mesh)}setText(t){if(t===this.text)return;this.text=t,this.mesh.geometry.dispose();const e=Dw(t,this.centeredGeo);this.mesh.geometry=e.geo,this.width=e.width,this.place()}setPos(t,e){this.x=t,this.y=e,this.place()}setColor(t){this.mat.color.setHex(t)}setOpacity(t){this.mat.opacity=t}setScale(t){this.baseScale=t,this.mesh.scale.set(t,t,1),this.place()}setVisible(t){this.mesh.visible=t}get visible(){return this.mesh.visible}get scaledWidth(){return this.width*this.baseScale}setPop(t){this.mesh.scale.set(this.baseScale*t,this.baseScale*t,1)}get current(){return this.text}place(){if(this.centeredGeo){this.mesh.position.set(this.x,-this.y,0);return}const t=this.width*this.baseScale,e=this.align==="left"?0:this.align==="center"?t/2:t;this.mesh.position.set(this.x-e,-this.y,0)}}const Gf=96,Vf=70,yc=.35;class Iw{constructor(){this.scene=new Hr,this.camera=new Qr(0,1,0,-1,-10,10),this.frames=new Float32Array(1200),this.frameN=0,this.sorted=new Float32Array(1200),this.fpsT=0,this.heatT=0,this.ovOn=!1,this.gameplayOn=!0,this.w=1,this.h=1,this.landingTimer=0,this.popT=0,this.lastLive="",this.speed=new Cn(this.scene,"left",2,16777215),this.score=new Cn(this.scene,"right",2,16777215),this.combo=new Cn(this.scene,"right",2,16765578),this.trick=new Cn(this.scene,"center",2,16777215,1,!0),this.perf=new Cn(this.scene,"right",1,16777215,.6),this.seed=new Cn(this.scene,"left",1,16777215,.45),this.surface=new Cn(this.scene,"left",1,16777215,.7),this.surfProps=[0,1,2].map(()=>new Cn(this.scene,"left",1,16777215,.5)),this.score.setText("0"),this.perf.setText("-- FPS"),this.ovMat=new Ze({color:328714,transparent:!0,opacity:0,depthTest:!1,depthWrite:!1}),this.ovDim=new dt(new Qe(1,1),this.ovMat),this.ovDim.renderOrder=9,this.ovDim.visible=!1,this.scene.add(this.ovDim),this.ovTitle=new Cn(this.scene,"center",3,16777215),this.ovTitle.setVisible(!1),this.ovLines=[0,1,2,3,4,5,6].map(()=>{const n=new Cn(this.scene,"center",1,16777215);return n.setVisible(!1),n});const t=new Qe(1,1),e=n=>new Ze({color:16777215,transparent:!0,opacity:n,depthTest:!1,depthWrite:!1,side:we});this.balBg=new dt(t,e(.22)),this.balMat=e(.95),this.balMark=new dt(t,this.balMat),this.balBg.visible=!1,this.balMark.visible=!1,this.scene.add(this.balBg,this.balMark),this.heatBg=new dt(t,new Ze({color:1315354,transparent:!0,opacity:.72,depthTest:!1,depthWrite:!1})),this.heatMat=new me({uniforms:{uFill:{value:0},uBlink:{value:1}},vertexShader:`
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,fragmentShader:`
        uniform float uFill;
        uniform float uBlink;
        varying vec2 vUv;
        void main() {
          if (vUv.x > uFill) discard;
          vec3 green = vec3(0.22, 0.78, 0.34);
          vec3 amber = vec3(0.98, 0.66, 0.13);
          vec3 red   = vec3(0.92, 0.16, 0.12);
          float t = clamp(vUv.x, 0.0, 1.0);
          vec3 c = t < 0.5
            ? mix(green, amber, smoothstep(0.0, 0.5, t))
            : mix(amber, red, smoothstep(0.5, 1.0, t));
          gl_FragColor = vec4(c, 0.95 * uBlink);
        }
      `,transparent:!0,depthTest:!1,depthWrite:!1}),this.heatFill=new dt(t,this.heatMat),this.heatBg.visible=!1,this.heatFill.visible=!1,this.scene.add(this.heatBg,this.heatFill),this.chargeBg=new dt(t,e(.25)),this.chargeFill=new dt(t,e(.9)),this.chargeBg.visible=!1,this.chargeFill.visible=!1,this.scene.add(this.chargeBg,this.chargeFill)}setOverlay(t,e,n){this.ovOn=!0,this.ovDim.visible=n>.001,this.ovMat.opacity=n,this.ovTitle.setVisible(!!t),this.ovTitle.setText(t||" ");for(let s=0;s<this.ovLines.length;s++){const o=e[s];this.ovLines[s].setVisible(!!o),o&&this.ovLines[s].setText(o)}this.placeOverlay()}hideOverlay(){if(this.ovOn){this.ovOn=!1,this.ovDim.visible=!1,this.ovTitle.setVisible(!1);for(const t of this.ovLines)t.setVisible(!1)}}setGameplayVisible(t){this.gameplayOn=t,this.speed.setVisible(t),this.score.setVisible(t),this.combo.setVisible(t),this.surface.setVisible(t);for(const e of this.surfProps)e.setVisible(t);this.trick.setVisible(t),t||(this.heatBg.visible=!1,this.heatFill.visible=!1,this.chargeBg.visible=!1,this.chargeFill.visible=!1,this.balBg.visible=!1,this.balMark.visible=!1)}placeOverlay(){const t=this.w,e=this.h;this.ovDim.scale.set(t*2,e*2,1),this.ovDim.position.set(t/2,-e/2,0);const n=t<300?2:3;this.ovTitle.setScale(n);const s=this.ovLines.filter(l=>l.visible).length,o=11,r=this.ovTitle.visible?n*7+10:0,a=r+s*o;let c=e/2-a/2;this.ovTitle.visible&&(this.ovTitle.setPos(t/2,c),c+=r);for(const l of this.ovLines)l.visible&&(l.setPos(t/2,c),c+=o)}layout(t,e){this.w=t,this.h=e,this.camera.right=t,this.camera.bottom=-e,this.camera.updateProjectionMatrix();const n=t<300?1:2;this.speed.setScale(n),this.score.setScale(n),this.combo.setScale(n),this.trick.setScale(t<300?1:2),this.speed.setPos(8,8),this.score.setPos(t-8,8),this.combo.setPos(t-8,12+n*8),this.trick.setPos(t/2,e*.82),this.perf.setPos(t-8,e-11),this.seed.setPos(8,e-11),this.surface.setPos(8,12+n*8);for(let r=0;r<this.surfProps.length;r++)this.surfProps[r].setPos(8,21+n*8+r*9);this.placeOverlay(),this.chargeBg.scale.set(62,5,1),this.chargeBg.position.set(t/2,-(e-30),0),this.chargeFill.scale.set(.001,3,1),this.chargeFill.position.set(t/2-30,-(e-30),0);const s=-(e*.09);this.heatBg.scale.set(Gf+2,7,1),this.heatBg.position.set(t/2,s,0),this.heatFill.scale.set(Gf,5,1),this.heatFill.position.set(t/2,s,0);const o=-(e*.66);this.balBg.scale.set(Vf+2,5,1),this.balBg.position.set(t/2,o,0),this.balMark.scale.set(5,9,1),this.balMark.position.set(t/2,o,0)}setSurface(t,e,n){if(!this.gameplayOn){this.surface.setVisible(!1);for(const o of this.surfProps)o.setVisible(!1);return}if(this.surface.setVisible(!0),this.surface.setColor(e),this.surface.setText(t),!n){for(const o of this.surfProps)o.setVisible(!1);return}const s=[`ACC   ${n.accel.toFixed(2)}`,`GRIP  ${n.grip.toFixed(2)}`,`DRAG  ${n.drag.toFixed(2)}`];for(let o=0;o<this.surfProps.length;o++)this.surfProps[o].setVisible(!0),this.surfProps[o].setColor(e),this.surfProps[o].setText(s[o])}setFrame(t){const e=Math.min(500,t*1e3);if(this.frames[this.frameN%this.frames.length]=e,this.frameN++,this.fpsT-=t,this.fpsT>0)return;this.fpsT=.3;const n=Math.min(this.frameN,this.frames.length);if(n<4)return;let s=0;for(let c=0;c<n;c++){const l=this.frames[c];this.sorted[c]=l,s+=l}const o=this.sorted.subarray(0,n);o.sort();const r=c=>Math.round(1e3/Math.max(.1,o[Math.min(n-1,Math.floor(n*c))])),a=Math.round(1e3/Math.max(.1,s/n));this.perf.setText(`${a} FPS  1% ${r(.99)}  0.1% ${r(.999)}  ${(s/n).toFixed(1)} MS`)}setSeed(t){this.seed.setText("SEED "+t)}setSpeed(t){this.speed.setText(t+" KM/H")}setScore(t){this.score.setText(String(t))}setCombo(t){this.combo.setText(t>1?"×"+t:"")}setBalance(t,e){if(this.balBg.visible=t&&this.gameplayOn,this.balMark.visible=t&&this.gameplayOn,!t)return;const n=Math.max(-1,Math.min(1,e));this.balMark.position.x=this.w/2+n*(Vf/2),this.balMark.position.y=-(this.h*.66);const s=Math.abs(n),o=Math.max(0,Math.min(1,(s-.25)/.55));this.balMat.color.setRGB(.25+.75*o,.95-.75*o*o,.35*(1-o)),this.balMat.opacity=.75+.25*o}setHeat(t,e=0){this.heatT+=e;const n=t>.02;if(this.heatBg.visible=n&&this.gameplayOn,this.heatFill.visible=n&&this.gameplayOn,!n)return;const s=Math.min(1,t);this.heatMat.uniforms.uFill.value=s,this.heatMat.uniforms.uBlink.value=s>.75?.55+.45*Math.sin(this.heatT*18):1}setCharge(t){const e=t>0&&this.gameplayOn;this.chargeBg.visible=e,this.chargeFill.visible=e,e&&(this.chargeFill.scale.x=Math.max(60*t,.001),this.chargeFill.position.x=this.w/2-30+30*t)}airTrick(t){this.landingTimer>0||t!==this.lastLive&&(this.lastLive=t,this.trick.setColor(16777215),this.trick.setOpacity(.8),this.trick.setPop(.7),this.trick.setText(t))}notice(t,e=16777215){this.lastLive="",this.trick.setColor(e),this.trick.setOpacity(1),this.trick.setText(t),this.popT=yc,this.landingTimer=1}landing(t,e,n,s,o=""){this.lastLive="";let r,a=16777215;if(s==="crash")r="WIPEOUT!",a=16734810;else if(s==="sketchy")r="SKETCHY!"+(t?" "+t:""),a=16765514;else if(e>0){const c=Number.isInteger(n)?String(n):n.toFixed(1);r=(o?o+" ":"")+t+" +"+e+(n>1?" ×"+c:""),o==="PERFECT"&&(a=9236660)}else return;this.trick.setColor(a),this.trick.setOpacity(1),this.trick.setText(r),this.popT=yc,this.landingTimer=1.2}update(t){if(this.popT>0){this.popT=Math.max(0,this.popT-t);const e=1-this.popT/yc,n=e<.6?.6+(1.15-.6)*(e/.6):1.15-.15*((e-.6)/.4);this.trick.setPop(n)}this.landingTimer>0&&(this.landingTimer-=t,this.landingTimer<=0&&this.trick.setText(""))}}const Wf=[[1,1,.5],[.75,.45,.4],[1.25,1.9,1.4],[1.15,1.25,2.2]],Xf=[[1.15,.78,.85],[1.25,.66,.75],[1,1,1.5],[1.1,.85,1.7]],Uw=44;class Nw{constructor(){this.muted=!1,this.wasCutting=!1;const t=()=>{this.ensure(),this.ctx?.resume()};window.addEventListener("keydown",t),window.addEventListener("pointerdown",t),window.addEventListener("keydown",e=>{e.code==="KeyM"&&!e.repeat&&this.toggleMute()})}toggleMute(){this.muted=!this.muted,this.ctx&&this.master&&this.master.gain.setTargetAtTime(this.muted?0:.5,this.ctx.currentTime,.05)}ensure(){if(this.ctx)return;const t=new AudioContext;this.ctx=t,this.master=t.createGain(),this.master.gain.value=this.muted?0:.5,this.master.connect(t.destination);const e=t.createBuffer(1,t.sampleRate*2,t.sampleRate),n=e.getChannelData(0);for(let w=0;w<n.length;w++)n[w]=Math.random()*2-1;this.noiseBuf=e;const s=t.createBuffer(1,t.sampleRate*2,t.sampleRate),o=s.getChannelData(0);let r=0;for(let w=0;w<o.length;w++){const T=Math.random()*2-1;r=(r+.02*T)/1.02,o[w]=r*3.5}const a=t.createBuffer(1,t.sampleRate*2,t.sampleRate),c=a.getChannelData(0);let l=0,h=0,f=0,d=0,p=0,m=0;for(let w=0;w<c.length;w++){const T=Math.random()*2-1;l=.99886*l+T*.0555179,h=.99332*h+T*.0750759,f=.969*f+T*.153852,d=.8665*d+T*.3104856,p=.55*p+T*.5329522,m=-.7616*m-T*.016898,c[w]=(l+h+f+d+p+m+T*.5362)*.11}const v=(w,T,y,S)=>{const A=t.createBufferSource();A.buffer=w,A.loop=!0;const R=t.createBiquadFilter();R.type=T,R.frequency.value=y,R.Q.value=S;const P=t.createGain();return P.gain.value=0,A.connect(R),R.connect(P),P.connect(this.master),A.start(),{filter:R,gain:P}};this.carve=v(a,"bandpass",1600,.5),this.wind=v(s,"bandpass",450,.6),this.grind=v(e,"bandpass",2400,2),this.sizzle=v(e,"bandpass",3800,3.2),this.rumble=v(s,"lowpass",140,.7);const g=new Float32Array(1024);for(let w=0;w<g.length;w++){const T=w/(g.length-1)*2-1;g[w]=Math.tanh(T*2.6)}this.satCurve=g;const u=t.createStereoPanner?t.createStereoPanner():null;u&&u.connect(this.master),this.beamPan=u??void 0;const x=u??this.master,_=(w,T,y,S)=>{const A=t.createBufferSource();A.buffer=w,A.loop=!0;const R=t.createBiquadFilter();R.type=T,R.frequency.value=y,R.Q.value=S;const P=t.createGain();return P.gain.value=0,A.connect(R),R.connect(P),P.connect(x),A.start(),{filter:R,gain:P}};this.beamLow=_(s,"lowpass",190,1.1),this.beamMid=_(e,"bandpass",560,1.6),this.beamHiss=_(e,"bandpass",1900,1.2);const M=t.createOscillator();M.type="sawtooth",M.frequency.value=70;const E=t.createBiquadFilter();E.type="bandpass",E.frequency.value=900,E.Q.value=4;const b=t.createGain();b.gain.value=0,M.connect(E),E.connect(b),b.connect(this.master),M.start(),this.chargeOsc=M,this.chargeFil=E,this.chargeGain=b,this.whistle=v(e,"bandpass",900,6)}eyeBeam(t,e,n,s){const o=this.ctx;if(!o||!this.beamLow||!this.beamMid||!this.beamHiss||!this.chargeGain)return;const r=o.currentTime,a=Math.max(0,1-s/420),c=e?0:t*t;this.chargeGain.gain.setTargetAtTime(c*.11,r,.09),this.chargeOsc&&this.chargeOsc.frequency.setTargetAtTime(64+c*210,r,.14),this.chargeFil&&this.chargeFil.frequency.setTargetAtTime(500+c*2100,r,.14);const l=e?1:0;this.beamLow.gain.gain.setTargetAtTime(l*.2,r,.05),this.beamLow.filter.frequency.setTargetAtTime(140+a*160,r,.2),this.beamMid.gain.gain.setTargetAtTime(l*.26*(.45+a*.55),r,.05),this.beamMid.filter.frequency.setTargetAtTime(430+a*260,r,.2),this.beamHiss.gain.gain.setTargetAtTime(l*.15*(.2+a*.8),r,.06),this.beamHiss.filter.frequency.setTargetAtTime(1500+a*900,r,.2),this.beamPan&&this.beamPan.pan.setTargetAtTime(Math.max(-1,Math.min(1,n)),r,.08),e&&!this.wasCutting&&(this.sweepNoise(240,3200,.16,.22),this.sweepNoise(1800,180,.5,.14)),this.wasCutting=e}update(t){const e=this.ctx;if(!e||!this.carve||!this.wind||!this.grind)return;const n=e.currentTime,s=Math.min(1,t.speed/Uw),o=Wf[t.surface]??Wf[0],r=Xf[t.surface]??Xf[0],a=Math.max(0,Math.min(1,t.volc??0)),c=[o[0]+(r[0]-o[0])*a,o[1]+(r[1]-o[1])*a,o[2]+(r[2]-o[2])*a],l=t.muted===!0,h=t.grounded&&!t.grinding&&!l?Math.min(.5,(s*.26+Math.min(.14,t.carve*.012))*c[0]):0;this.carve.gain.gain.setTargetAtTime(h,n,h===0?.03:.08),this.carve.filter.frequency.setTargetAtTime((1100+s*1500)*c[1],n,.1),this.carve.filter.Q.setTargetAtTime(c[2],n,.15);const f=l?0:Math.min(.4,s*s*s*(t.airborne?.6:.22));this.wind.gain.gain.setTargetAtTime(f,n,.15),this.wind.filter.frequency.setTargetAtTime(380+s*340,n,.15),this.grind.gain.gain.setTargetAtTime(t.grinding&&!l?.4:0,n,.03),this.grind.filter.frequency.setTargetAtTime(2e3+s*1500,n,.05)}landing(t){this.ready()&&(this.thump(70,40,.16,.5*t+.15),this.noiseBurst(320,.15,.35*t+.1))}jump(t){this.ready()&&this.sweepNoise(300,1100,.22,.16+t*.12)}crash(){this.ready()&&(this.thump(80,28,.32,.6),this.noiseBurst(220,.3,.45))}clean(t){if(!this.ready())return;const e=620*Math.pow(1.06,Math.min(t,9));this.pluck(e,0),this.pluck(e*1.335,.07)}sketchy(){if(!this.ready())return;const t=this.ctx,e=t.createOscillator();e.type="square";const n=t.createGain(),s=t.currentTime;e.frequency.setValueAtTime(140,s),e.frequency.exponentialRampToValueAtTime(85,s+.22),n.gain.setValueAtTime(.16,s),n.gain.exponentialRampToValueAtTime(.001,s+.25),e.connect(n),n.connect(this.master),e.start(s),e.stop(s+.26)}grindStart(){this.ready()&&this.noiseBurst(3200,.07,.3)}sparks(t){const e=this.ctx;if(!e||!this.sizzle)return;const n=e.currentTime,s=Math.max(0,Math.min(1,t));this.sizzle.gain.gain.setTargetAtTime(s*.13,n,s>0?.05:.12),this.sizzle.filter.frequency.setTargetAtTime(3400+s*2600,n,.1)}shells(t){const e=this.ctx;if(!e||!this.rumble)return;const n=e.currentTime,s=Math.min(1,t/12);this.rumble.gain.gain.setTargetAtTime(s*.05,n,.3),this.rumble.filter.frequency.setTargetAtTime(90+s*70,n,.4)}incoming(t,e,n=0){if(!this.ready())return;const s=this.ctx,o=s.currentTime,r=Math.max(0,1-t/130);if(r<=.02)return;const a=Math.min(1,e/4),c=1150-a*520,l=s.createOscillator();l.type="triangle",l.frequency.setValueAtTime(c,o),l.frequency.exponentialRampToValueAtTime(c*.34,o+1.15);const h=s.createGain();h.gain.setValueAtTime(1e-4,o),h.gain.exponentialRampToValueAtTime(.05*r*(.6+a*.7),o+.55),h.gain.exponentialRampToValueAtTime(1e-4,o+1.2),l.connect(h),h.connect(this.place(n)),l.start(o),l.stop(o+1.25),this.sweepNoise(2600-a*900,700,1,.05*r)}blast(t,e=0,n=0){if(!this.ready()||!this.noiseBuf||!this.satCurve)return;const s=this.ctx,o=s.currentTime+n/340,r=Math.max(.15,Math.min(1,t)),a=.85+Math.random()*.3,c=this.place(e),l=Math.min(1,n/260),h=s.createBiquadFilter();h.type="lowpass",h.frequency.value=15e3-l*l*13200,h.Q.value=.4,h.connect(c);const f=s.createWaveShaper();f.curve=this.satCurve,f.oversample="2x",f.connect(h);const d=(p,m,v,g,u,x,_={})=>{const M=s.createBufferSource();M.buffer=this.noiseBuf;const E=s.createBiquadFilter();E.type=p,E.Q.value=_.q??.5,E.frequency.setValueAtTime(m,o+x),E.frequency.exponentialRampToValueAtTime(Math.max(24,v),o+x+g);const b=s.createGain(),w=_.atk??.005;b.gain.setValueAtTime(1e-4,o+x),b.gain.exponentialRampToValueAtTime(u,o+x+w),b.gain.exponentialRampToValueAtTime(1e-4,o+x+g),M.connect(E),E.connect(b),b.connect(_.grit?f:h),M.start(o+x,Math.random()),M.stop(o+x+g+.05)};d("highpass",4200,1800,.045*a,.55*r,0),d("lowpass",900*a,130,.26*a+r*.12,1*r,.003,{grit:!0}),d("lowpass",72,32,.9+r*.5,.7*r,.012),d("bandpass",320,110,1.9*a+r*.8,.34*r,.02,{atk:.14,q:.7})}place(t){const e=this.ctx;if(!e.createStereoPanner)return this.master;const n=e.createStereoPanner();return n.pan.value=Math.max(-1,Math.min(1,t)),n.connect(this.master),n}ready(){return!!this.ctx&&this.ctx.state==="running"}thump(t,e,n,s){const o=this.ctx,r=o.currentTime,a=o.createOscillator();a.type="sine",a.frequency.setValueAtTime(t,r),a.frequency.exponentialRampToValueAtTime(e,r+n);const c=o.createGain();c.gain.setValueAtTime(s,r),c.gain.exponentialRampToValueAtTime(.001,r+n),a.connect(c),c.connect(this.master),a.start(r),a.stop(r+n+.02)}noiseBurst(t,e,n){const s=this.ctx;if(!this.noiseBuf)return;const o=s.currentTime,r=s.createBufferSource();r.buffer=this.noiseBuf;const a=s.createBiquadFilter();a.type="lowpass",a.frequency.value=t;const c=s.createGain();c.gain.setValueAtTime(n,o),c.gain.exponentialRampToValueAtTime(.001,o+e),r.connect(a),a.connect(c),c.connect(this.master),r.start(o,Math.random()),r.stop(o+e+.02)}sweepNoise(t,e,n,s){const o=this.ctx;if(!this.noiseBuf)return;const r=o.currentTime,a=o.createBufferSource();a.buffer=this.noiseBuf;const c=o.createBiquadFilter();c.type="bandpass",c.Q.value=1.2,c.frequency.setValueAtTime(t,r),c.frequency.exponentialRampToValueAtTime(e,r+n);const l=o.createGain();l.gain.setValueAtTime(s,r),l.gain.exponentialRampToValueAtTime(.001,r+n),a.connect(c),c.connect(l),l.connect(this.master),a.start(r,Math.random()),a.stop(r+n+.02)}pluck(t,e){const n=this.ctx,s=n.currentTime+e,o=n.createOscillator();o.type="triangle",o.frequency.value=t;const r=n.createGain();r.gain.setValueAtTime(1e-4,s),r.gain.exponentialRampToValueAtTime(.22,s+.01),r.gain.exponentialRampToValueAtTime(.001,s+.35),o.connect(r),r.connect(this.master),o.start(s),o.stop(s+.4)}}function qf(i){return Math.max(50,Math.round(i*300/10)*10)}const Fw=[14673653,16777215,9422576,12755577,16751178],Yf=new Q(1,1,1);class Ow{constructor(){this.input=new OM,this.player=new MS,this.terrain=new Yl,this.scene=new Hr,this.sky=YM(),this.peaks=new jx,this.backdrop=new ww,this.farField=new Cw,this.spray=new DS,this.treeFire=new NS,this.eye=new hw,this.lava=new he,this.volcanoes=new Mn,this.fireballs=new zS,this.worldTime=0,this.trail=new US,this.cutSparks=new kS,this.hud=new Iw,this.sound=new Nw,this.sprayOrigin=new F,this.sunProj=new F,this.camFwd=new F,this.shadowNormal=new F(0,1,0),this.worldUp=new F(0,1,0),this.hudTimer=0,this.emberAcc=0,this.wasGrounded=!0,this.wasGrinding=!1,this.demo=new gw,this.totalScore=0,this.comboMult=1,this.cineAim=new Je,this.cineLook=new F,this.cineQuat=new Ge,this.cineHold=0,this.warmed=!1,Tw(),Ew(),this.renderer=new CM({antialias:!1,powerPreference:"high-performance"}),this.renderer.setPixelRatio(1),document.body.appendChild(this.renderer.domElement),this.scene.fog=new Fl(Ne.fog,VM,WM),this.scene.add(this.sky.mesh),this.scene.add(this.peaks.group),this.scene.add(this.backdrop.group),this.scene.add(this.farField.group);const t=new IM(Ne.hemiSky,Ne.hemiGround,.68);this.scene.add(new zM(GM,.32)),this.scene.add(t),this.sun=new FM(Ne.sun,2),this.sun.position.copy(ki).multiplyScalar(100),this.scene.add(this.sun),this.scene.add(this.terrain.group),this.scene.add(this.lava.group);for(const n of this.lava.lavaLights)this.scene.add(n);this.scene.add(this.volcanoes.group),this.scene.add(this.fireballs.group),this.scene.add(this.fireballs.light),this.scene.add(this.player.rig.root),this.scene.add(this.spray.points),this.scene.add(this.treeFire.points),this.scene.add(this.eye.group),this.scene.add(this.eye.light),this.scene.add(this.eye.cutLight),this.scene.add(this.cutSparks.points),this.eye.onSpot=(n,s,o,r)=>this.terrain.setSpot(n,s,o,r),this.eye.onSpotDir=(n,s,o)=>this.terrain.setSpotDir(n,s,o),this.scene.add(this.treeFire.light),this.scene.add(this.trail.mesh);const e=new ia(.5,10);e.rotateX(-Math.PI/2),this.shadow=new dt(e,new Ze({color:1842732,transparent:!0,opacity:.3,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-3})),this.scene.add(this.shadow),this.followCam=new LS(window.innerWidth/window.innerHeight),this.retro=new HM(this.renderer,3),this.hud.layout(this.retro.lowWidth,this.retro.lowHeight),this.snowfall=new IS(this.followCam.camera.position),this.scene.add(this.snowfall.points),this.biomes=new vw(this.scene.fog,this.sun,t,this.terrain.snowMaterial,this.terrain.pineMaterial,this.farField.material,this.backdrop.material,this.peaks.material,this.snowfall.mat),window.addEventListener("resize",()=>this.resize())}applyCinematic(t){const e=this.demo.camToTower,n=this.followCam.camera;if(e<=.001){this.cineHold=0;return}const s=this.eye.eyePos;if(!s)return;const o=this.demo.stage===uo.Doom,r=o?34:11;n.fov=n.fov+(r-n.fov)*e,n.updateProjectionMatrix(),this.cineLook.copy(s),o&&(this.cineLook.y=s.y-110),this.cineAim.position.copy(n.position),this.cineAim.lookAt(this.cineLook),this.cineAim.updateMatrixWorld(),n.quaternion.slerp(this.cineAim.quaternion,e);const a=1-Math.exp(-5*t);this.cineHold===0?(this.cineQuat.copy(n.quaternion),this.cineHold=1):(this.cineQuat.slerp(n.quaternion,a),n.quaternion.copy(this.cineQuat)),n.updateMatrixWorld()}update(t){this.demo.frozen||this.player.update(t,this.input)}render(t,e){const n=this.player;n.syncVisual(e,t),this.terrain.setTime(this.worldTime),this.terrain.update(n.pos.x,n.pos.z),this.warmed||(this.warmed=!0,this.renderer.compile(this.scene,this.followCam.camera)),this.biomes.update(this.demo.stage===uo.IntroTower||this.demo.stage===uo.Volcano?Math.max(this.demo.weatherZ,n.pos.z):n.pos.z),this.eye.cine=this.demo.towerRise,this.eye.quiet=this.demo.frozen,this.followCam.update(n,t),this.applyCinematic(t);const s=this.followCam.camera.position;this.sky.mesh.position.copy(s),this.sky.update(t),this.worldTime+=t,D_(this.worldTime);const o=this.lava.material.uniforms;o.uFogColor.value=this.scene.fog.color,o.uFogNear.value=this.scene.fog.near,o.uFogFar.value=this.scene.fog.far,this.lava.update(n.pos.x,n.pos.z,this.worldTime,ye,oe,Zt,Se),this.volcanoes.update(n.pos.z,t,Zt,oe,Se),this.volcanoes.updateSteam(n.pos.z,ye(n.pos.x,n.pos.z),this.worldTime,Zt,oe,Se(n.pos.z)>.5),this.volcanoes.updateBombs(n.pos.x,n.pos.z,t,Zt,oe,re,Se(n.pos.z)>.3,this.worldTime),this.fireballs.update(t,n.pos.x,n.pos.z,Zt),this.terrain.setCraters(this.fireballs.craterData),cx(t),this.terrain.setLaser(ox(),rx()),this.terrain.setGlows(this.lava.glowData),this.sound.shells(this.fireballs.live);const r=(p,m)=>{const v=p-n.pos.x,g=m-n.pos.z,u=Math.hypot(v,g)||1,x=-this.camFwd.z,_=this.camFwd.x;return Math.max(-1,Math.min(1,(v*x+g*_)/u*.9))};for(const p of this.fireballs.incoming)this.sound.incoming(p.dist,p.size,r(p.x,p.z));for(const p of this.fireballs.blasts)p.power>0&&this.sound.blast(p.power,r(p.x,p.z),p.dist);{const p=this.input.takeConfirm(),m=this.demo.update(t,p,n.pos.z,this.totalScore);this.demo.wantWarp&&(this.player.warpTo(this.demo.wantWarp),this.demo.wantWarp=0),this.demo.wantDoom&&(this.demo.wantDoom=!1,this.eye.destroy()),m?this.hud.setOverlay(m.title,m.lines,m.dim):this.hud.hideOverlay(),this.hud.setGameplayVisible(this.demo.playing),this.demo.stage===uo.Win&&p&&this.demo.t>1&&location.reload()}this.cutSparks.update(t,this.eye.cutting,this.eye.cut);{const p=this.eye.cut;this.sound.eyeBeam(this.eye.chargeAmt,this.eye.cutting,r(p.x,p.z),Math.hypot(p.x-n.pos.x,p.z-n.pos.z))}this.backdrop.update(s.x,Zt(n.pos.x,n.pos.z),s.z),this.farField.update(n.pos.x,n.pos.z),this.peaks.update(n.pos.z),this.sun.position.copy(n.pos).addScaledVector(ki,100),this.sun.target.position.copy(n.pos),this.sun.target.updateMatrixWorld();const a=n.rig.root.position,c=Math.max(.001,n.speed);if(this.trail.update(n.pos.x,n.pos.z,n.velH.x/c,n.velH.z/c,n.grounded&&n.speed>3,Math.min(1,n.carve/18),n.surfaceKind,n.skid,Se(n.pos.z),n.crackHot),this.sound.sparks(n.grounded&&n.speed>6?Math.min(1,n.crackHot*1.6)*Math.min(1,n.speed/16):0),n.grounded&&n.crackHot>.12&&n.speed>6)for(this.emberAcc+=t*(34+n.speed*9)*n.crackHot;this.emberAcc>=1;)this.emberAcc-=1,this.lava.emberBurst(a.x,a.y,a.z,n.velH.x,n.velH.z,2);{const p=Se(n.pos.z);Yf.setRGB(1-p*.72,1-p*.75,1-p*.78),this.spray.setTint(Yf,.6-p*.18)}const l=Zt(n.pos.x,n.pos.z)-fa(n.pos.x,n.pos.z),h=Math.max(0,a.y-l);this.shadow.position.set(a.x,l+.07,a.z),xl(n.pos.x,n.pos.z,this.shadowNormal),this.shadow.quaternion.setFromUnitVectors(this.worldUp,this.shadowNormal),this.shadow.scale.setScalar(1+h*.05),this.shadow.material.opacity=Math.max(.12,.3-h*.012),this.sound.update({speed:n.speed,grounded:n.grounded,grinding:n.grinding,airborne:!n.grounded&&!n.grinding,carve:n.carve,charge:n.charge,surface:n.surfaceKind,volc:Se(n.pos.z),muted:this.demo.frozen}),this.wasGrounded&&!n.grounded&&!n.grinding&&n.vy>2&&this.sound.jump(Math.min(1,n.vy/12)),n.grinding&&!this.wasGrinding&&this.sound.grindStart(),this.wasGrounded=n.grounded,this.wasGrinding=n.grinding,n.consumeCrash()?(this.comboMult=1,this.hud.setCombo(1),this.hud.landing("",0,1,"crash"),this.spray.burst(a,n.velH,45),this.sound.crash(),this.followCam.impact(1,!0)):n.consumeGraze()&&(this.comboMult=1,this.hud.setCombo(1),this.spray.burst(a,n.velH,18),this.sound.landing(.3)),n.wasReset&&(n.wasReset=!1,this.comboMult=1,this.hud.setCombo(1),this.hud.notice("RESET",10473727));const f=n.consumeLanding();if(f){this.spray.burst(a,n.velH,f.quality==="crash"?60:30);const p=Math.min(1,f.airTime/1.5);this.sound.landing(p),this.followCam.impact(.35+p*.65,f.quality==="crash");const m=wy(f),v=My(f.geom);if(f.quality==="clean"&&m>0){const g=this.comboMult*v.mult;this.totalScore+=Math.round(m*g),this.hud.landing(ju(f),m,g,"clean",v.label),this.sound.clean(this.comboMult),this.comboMult=Math.min(this.comboMult+1,9)}else f.quality!=="clean"&&(this.comboMult=1,this.hud.landing(ju(f),0,1,f.quality),f.quality==="sketchy"?this.sound.sketchy():this.sound.crash());this.hud.setScore(this.totalScore),this.hud.setCombo(this.comboMult)}const d=n.consumeGrind();if(d&&d.duration>.25){const p=qf(d.duration);this.totalScore+=p*this.comboMult,this.hud.landing("GRIND",p,this.comboMult,"clean"),this.sound.clean(this.comboMult),this.comboMult=Math.min(this.comboMult+1,9),this.hud.setScore(this.totalScore),this.hud.setCombo(this.comboMult)}if(n.grinding){const p=qf(n.grindDuration)*this.comboMult;this.hud.airTrick("GRIND "+p)}else if(n.grounded)this.hud.airTrick("");else{const p=_n.radToDeg(n.trickYaw);this.hud.airTrick(Sy(p,n.trickFlip/(Math.PI*2),n.grabTime))}if(this.spray.update(t),this.treeFire.update(n.pos.x,n.pos.z,t),this.eye.update(n.pos.x,n.pos.y,n.pos.z,this.worldTime,t,Zt,this.scene.fog.color),this.snowfall.update(t,s),this.hud.update(t),this.hud.setFrame(t),this.hud.setCharge(n.charge),this.hud.setHeat(n.heat,t),n.rig.setHeat(n.heat),this.hud.setBalance(n.grinding,n.railBalance),this.hudTimer-=t,this.hudTimer<=0){this.hudTimer=.1,this.hud.setSpeed(Math.round(n.speed*3.6));const p=Td(ye(n.pos.x,n.pos.z),n.pos.z);this.hud.setSurface(n.grinding?"RAIL":e_(n.surfaceKind,n.pos.z),Fw[n.grinding?4:n.surfaceKind],n.grinding?null:p)}this.updateEffects(s,n.speed),this.retro.render(this.scene,this.followCam.camera,this.hud.scene,this.hud.camera)}updateEffects(t,e){const n=this.followCam.camera;this.sunProj.copy(t).addScaledVector(ki,1e3).project(n),n.getWorldDirection(this.camFwd);const s=_n.smoothstep(this.camFwd.dot(ki),.15,.6),o=Math.max(Math.abs(this.sunProj.x),Math.abs(this.sunProj.y)),r=this.sunProj.z<1?1-_n.smoothstep(o,1,2.2):0,a=_n.clamp((e-28)/22,0,1);this.retro.setEffects(this.sunProj.x*.5+.5,this.sunProj.y*.5+.5,s*r,a)}resize(){this.retro.setSize(window.innerWidth,window.innerHeight),this.hud.layout(this.retro.lowWidth,this.retro.lowHeight),this.followCam.camera.aspect=window.innerWidth/window.innerHeight,this.followCam.camera.updateProjectionMatrix()}}export{Ow as Game};
