"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[6089],{24775:(t,e,o)=>{o.d(e,{mp:()=>h,QS:()=>f});var n=o(32735),i=o(60216),r=o.n(i);function a(){return(a=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var o=arguments[e];for(var n in o)Object.prototype.hasOwnProperty.call(o,n)&&(t[n]=o[n])}return t}).apply(this,arguments)}var s={preventDefaultTouchmoveEvent:!1,delta:10,rotationAngle:0,trackMouse:!1,trackTouch:!0},p={xy:[0,0],swiping:!1,eventData:void 0,start:void 0},u="mousemove",l="mouseup";function d(t,e){if(0===e)return t;var o=Math.PI/180*e;return[t[0]*Math.cos(o)+t[1]*Math.sin(o),t[1]*Math.cos(o)-t[0]*Math.sin(o)]}function c(t,e){var o=function(e){e.touches&&e.touches.length>1||t((function(t,o){o.trackMouse&&(document.addEventListener(u,n),document.addEventListener(l,s));var i=e.touches?e.touches[0]:e,r=d([i.clientX,i.clientY],o.rotationAngle);return a({},t,p,{eventData:{initial:[].concat(r),first:!0},xy:r,start:e.timeStamp||0})}))},n=function(e){t((function(t,o){if(!t.xy[0]||!t.xy[1]||e.touches&&e.touches.length>1)return t;var n=e.touches?e.touches[0]:e,i=d([n.clientX,n.clientY],o.rotationAngle),r=i[0],s=i[1],p=t.xy[0]-r,u=t.xy[1]-s,l=Math.abs(p),c=Math.abs(u),v=(e.timeStamp||0)-t.start,f=Math.sqrt(l*l+c*c)/(v||1);if(l<o.delta&&c<o.delta&&!t.swiping)return t;var h=function(t,e,o,n){return t>e?o>0?"Left":"Right":n>0?"Up":"Down"}(l,c,p,u),g=a({},t.eventData,{event:e,absX:l,absY:c,deltaX:p,deltaY:u,velocity:f,dir:h});o.onSwiping&&o.onSwiping(g);var w=!1;return(o.onSwiping||o.onSwiped||o["onSwiped"+h])&&(w=!0),w&&o.preventDefaultTouchmoveEvent&&o.trackTouch&&e.cancelable&&e.preventDefault(),a({},t,{eventData:a({},g,{first:!1}),swiping:!0})}))},i=function(e){t((function(t,o){var n;return t.swiping&&(n=a({},t.eventData,{event:e}),o.onSwiped&&o.onSwiped(n),o["onSwiped"+n.dir]&&o["onSwiped"+n.dir](n)),a({},t,p,{eventData:n})}))},r=function(){document.removeEventListener(u,n),document.removeEventListener(l,s)},s=function(t){r(),i(t)},c=function(t){if(t&&t.addEventListener){var e=[["touchstart",o],["touchmove",n],["touchend",i]];return e.forEach((function(e){var o=e[0],n=e[1];return t.addEventListener(o,n)})),function(){return e.forEach((function(e){var o=e[0],n=e[1];return t.removeEventListener(o,n)}))}}},v={ref:function(e){null!==e&&t((function(t,o){if(t.el===e)return t;var n={};return t.el&&t.el!==e&&t.cleanUpTouch&&(t.cleanUpTouch(),n.cleanUpTouch=null),o.trackTouch&&e&&(n.cleanUpTouch=c(e)),a({},t,{el:e},n)}))}};return e.trackMouse&&(v.onMouseDown=o),[v,c]}function v(t,e,o){var n={};return!e.trackTouch&&t.cleanUpTouch?(t.cleanUpTouch(),n.cleanUpTouch=null):e.trackTouch&&!t.cleanUpTouch&&t.el&&(n.cleanUpTouch=o(t.el)),a({},t,n)}function f(t){var e=t.trackMouse,o=n.useRef(a({},p,{type:"hook"})),i=n.useRef();i.current=a({},s,t);var r=n.useMemo((function(){return c((function(t){return o.current=t(o.current,i.current)}),{trackMouse:e})}),[e]),u=r[0],l=r[1];return o.current=v(o.current,i.current,l),u}var h=function(t){var e,o;function i(e){var o;return(o=t.call(this,e)||this)._set=function(t){o.transientState=t(o.transientState,o.props)},o.transientState=a({},p,{type:"class"}),o}return o=t,(e=i).prototype=Object.create(o.prototype),e.prototype.constructor=e,e.__proto__=o,i.prototype.render=function(){var t=this.props,e=t.className,o=t.style,i=t.nodeName,r=void 0===i?"div":i,s=t.innerRef,p=t.children,u=t.trackMouse,l=c(this._set,{trackMouse:u}),d=l[0],f=l[1];this.transientState=v(this.transientState,this.props,f);var h=s?function(t){return s(t),d.ref(t)}:d.ref;return n.createElement(r,a({},d,{className:e,style:o,ref:h}),p)},i}(n.PureComponent);h.propTypes={onSwiped:r().func,onSwiping:r().func,onSwipedUp:r().func,onSwipedRight:r().func,onSwipedDown:r().func,onSwipedLeft:r().func,delta:r().number,preventDefaultTouchmoveEvent:r().bool,nodeName:r().string,trackMouse:r().bool,trackTouch:r().bool,innerRef:r().func,rotationAngle:r().number},h.defaultProps=s},83284:function(t,e,o){var n=this&&this.__assign||function(){return(n=Object.assign||function(t){for(var e,o=1,n=arguments.length;o<n;o++)for(var i in e=arguments[o])Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i]);return t}).apply(this,arguments)},i=this&&this.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var o in t)Object.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e.default=t,e};Object.defineProperty(e,"__esModule",{value:!0});var r=i(o(32735)),a=o(68169);e.ArrowContainer=function(t){var e=t.position,o=t.children,i=t.style,s=t.arrowColor,p=void 0===s?a.Constants.DEFAULT_ARROW_COLOR:s,u=t.arrowSize,l=void 0===u?10:u,d=t.arrowStyle,c=t.popoverRect,v=t.targetRect;return r.createElement("div",{style:n({paddingLeft:"right"===e?l:0,paddingTop:"bottom"===e?l:0,paddingBottom:"top"===e?l:0,paddingRight:"left"===e?l:0},i)},r.createElement("div",{style:n(n({position:"absolute"},function(){var t=2*l,o=v.top-c.top+v.height/2-t/2,n=v.left-c.left+v.width/2-t/2;switch(n=(n=n<0?0:n)+t>c.width?c.width-t:n,o=(o=o<0?0:o)+t>c.height?c.height-t:o,e){case"right":return{borderTop:l+"px solid transparent",borderBottom:l+"px solid transparent",borderRight:l+"px solid "+p,left:0,top:o};case"left":return{borderTop:l+"px solid transparent",borderBottom:l+"px solid transparent",borderLeft:l+"px solid "+p,right:0,top:o};case"bottom":return{borderLeft:l+"px solid transparent",borderRight:l+"px solid transparent",borderBottom:l+"px solid "+p,top:0,left:n};case"top":default:return{borderLeft:l+"px solid transparent",borderRight:l+"px solid transparent",borderTop:l+"px solid "+p,bottom:0,left:n}}}()),d)}),o)}},17261:function(t,e,o){var n,i=this&&this.__extends||(n=function(t,e){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)e.hasOwnProperty(o)&&(t[o]=e[o])})(t,e)},function(t,e){function o(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(o.prototype=e.prototype,new o)}),r=this&&this.__spreadArrays||function(){for(var t=0,e=0,o=arguments.length;e<o;e++)t+=arguments[e].length;var n=Array(t),i=0;for(e=0;e<o;e++)for(var r=arguments[e],a=0,s=r.length;a<s;a++,i++)n[i]=r[a];return n},a=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var s=a(o(32735)),p=o(83284);e.ArrowContainer=p.ArrowContainer;var u=o(79297),l=o(68169),d=["top","right","left","bottom"],c=function(t){function e(e){var o=t.call(this,e)||this;return o.targetRef=s.default.createRef(),o.targetRect=void 0,o.targetPositionIntervalHandler=void 0,o.popoverDiv=void 0,o.positionOrder=void 0,o.willUnmount=!1,o.willMount=!1,o.onClick=function(t){var e=o.props,n=e.onClickOutside,i=e.isOpen;o.willUnmount||o.willMount||o.popoverDiv.contains(t.target)||o.targetRef.current.contains(t.target)||!n||!i||n(t)},o.onResize=function(){o.renderPopover()},o.state={popoverInfo:void 0,isTransitioningToClosed:!1,internalisOpen:!1},o.willUnmount=!1,o.willMount=!0,o}return i(e,t),e.getDerivedStateFromProps=function(t,e){var o=e.internalisOpen,n=e.isTransitioningToClosed,i=t.isOpen;return!0!==o||!1!==i||n?null:{internalisOpen:!1,isTransitioningToClosed:!0}},e.prototype.componentDidMount=function(){var t=this;window.setTimeout((function(){return t.willMount=!1}));var e=this.props,o=e.position,n=e.isOpen;this.positionOrder=this.getPositionPriorityOrder(o),this.updatePopover(n)},e.prototype.componentDidUpdate=function(t){var e=t.isOpen,o=t.align,n=t.position,i=t.transitionDuration,r=t.padding,a=t.windowBorderPadding,s=this.props,p=s.isOpen,u=s.position,l=s.transitionDuration,d=s.align,c=s.contentDestination,v=s.padding,f=s.windowBorderPadding;this.positionOrder=this.getPositionPriorityOrder(u);var h=t.contentDestination!==c;(e!==p||o!==d||n!==u||r!==v||a!==f||h)&&this.updatePopover(p),i!==l&&(this.popoverDiv.style.transition="opacity "+l+"s")},e.prototype.componentWillUnmount=function(){this.willUnmount=!0,window.clearTimeout(this.removePopoverTimeout),window.clearInterval(this.targetPositionIntervalHandler),window.removeEventListener("resize",this.onResize),window.removeEventListener("click",this.onClick),this.removePopover()},e.prototype.getNudgedPopoverPosition=function(t){var e=t.top,o=t.left,n=t.width,i=t.height,r=this.props.windowBorderPadding;return{top:e=(e=e<r?r:e)+i>window.innerHeight-r?window.innerHeight-r-i:e,left:o=(o=o<r?r:o)+n>window.innerWidth-r?window.innerWidth-r-n:o}},e.prototype.getPositionPriorityOrder=function(t){if(t&&"string"!=typeof t){if(l.Constants.DEFAULT_POSITIONS.every((function(e){return void 0!==t.find((function(t){return t===e}))})))return l.arrayUnique(t);var e=l.Constants.DEFAULT_POSITIONS.filter((function(e){return void 0===t.find((function(t){return t===e}))}));return l.arrayUnique(r(t,e))}if(t&&"string"==typeof t){e=l.Constants.DEFAULT_POSITIONS.filter((function(e){return e!==t}));return l.arrayUnique(r([t],e))}return d},e.prototype.getLocationForPosition=function(t,e,o){var n,i,r=this.props,a=r.padding,s=r.align,p=e.left+e.width/2,u=e.top+e.height/2;switch(t){case"top":n=e.top-o.height-a,i=p-o.width/2,"start"===s&&(i=e.left),"end"===s&&(i=e.right-o.width);break;case"left":n=u-o.height/2,i=e.left-a-o.width,"start"===s&&(n=e.top),"end"===s&&(n=e.bottom-o.height);break;case"bottom":n=e.bottom+a,i=p-o.width/2,"start"===s&&(i=e.left),"end"===s&&(i=e.right-o.width);break;case"right":n=u-o.height/2,i=e.right+a,"start"===s&&(n=e.top),"end"===s&&(n=e.bottom-o.height)}return{top:n,left:i}},e.prototype.createContainer=function(){var t=this.props,e=t.containerStyle,o=t.containerClassName,n=window.document.createElement("div");return n.style.overflow="hidden",e&&Object.keys(e).forEach((function(t){return n.style[t]=e[t]})),n.className=o,n.style.position="absolute",n.style.top="0",n.style.left="0",n},e.prototype.updatePopover=function(t){if(t&&this.targetRef){if(!this.popoverDiv||!this.popoverDiv.parentNode){var e=this.props.transitionDuration;this.popoverDiv=this.createContainer(),this.popoverDiv.style.opacity="0",this.popoverDiv.style.transition="opacity "+e+"s"}window.addEventListener("resize",this.onResize),window.addEventListener("click",this.onClick),this.renderPopover()}else this.removePopover()},e.prototype.startTargetPositionListener=function(t){var e=this;this.targetPositionIntervalHandler||(this.targetPositionIntervalHandler=window.setInterval((function(){var t=e.targetRef.current.getBoundingClientRect();l.targetPositionHasChanged(e.targetRect,t)&&e.renderPopover(),e.targetRect=t}),t))},e.prototype.removePopover=function(){var t=this,e=this.props,o=e.transitionDuration,n=e.isOpen;this.popoverDiv&&(this.popoverDiv.style.opacity="0");var i=function(){!t.willUnmount&&n&&t.popoverDiv.parentNode||(window.clearInterval(t.targetPositionIntervalHandler),window.removeEventListener("resize",t.onResize),window.removeEventListener("click",t.onClick),t.targetPositionIntervalHandler=void 0,t.setState({isTransitioningToClosed:!1}))};this.willUnmount?i():this.removePopoverTimeout=window.setTimeout(i,1e3*(o||l.Constants.FADE_TRANSITION))},e.prototype.renderPopover=function(t){var e=this;void 0===t&&(t=0),t>=this.positionOrder.length||this.renderWithPosition({position:this.positionOrder[t],targetRect:this.targetRef.current.getBoundingClientRect()},(function(o,n){var i,r=e.props,a=r.disableReposition,s=r.contentLocation,p=r.contentDestination;if(o&&!a&&"object"!=typeof s)e.renderPopover(t+1);else{var u=e.props,l=u.contentLocation,d=u.align,c=e.getNudgedPopoverPosition(n),v=c.top,f=c.left,h=n.top,g=n.left,w=e.positionOrder[t],y=a?{top:h,left:g}:{top:v,left:f},m=y.top,T=y.left;if(l){var P=e.targetRef.current.getBoundingClientRect(),D=e.popoverDiv.getBoundingClientRect();m=(i="function"==typeof l?l({targetRect:P,popoverRect:D,position:w,align:d,nudgedLeft:f,nudgedTop:v}):l).top,T=i.left,e.popoverDiv.style.left=T.toFixed()+"px",e.popoverDiv.style.top=m.toFixed()+"px"}else{var R=0,C=0;if(p){var O=p.getBoundingClientRect();R=-O.top,C=-O.left}var _=m+window.pageYOffset,E=T+window.pageXOffset+R,b=_+C;e.popoverDiv.style.left=E.toFixed()+"px",e.popoverDiv.style.top=b.toFixed()+"px"}e.popoverDiv.style.width=void 0,e.popoverDiv.style.height=void 0,e.renderWithPosition({position:w,nudgedTop:v-n.top,nudgedLeft:f-n.left,targetRect:e.targetRef.current.getBoundingClientRect(),popoverRect:e.popoverDiv.getBoundingClientRect()},(function(){e.startTargetPositionListener(10),"1"===e.popoverDiv.style.opacity||e.state.isTransitioningToClosed||(e.popoverDiv.style.opacity="1")}))}}))},e.prototype.renderPopoverContent=function(){var t,e=this.props,o=e.content,n=e.isOpen,i=e.contentDestination,r=this.state,a=r.popoverInfo,p=r.isTransitioningToClosed;if((n||p)&&this.popoverDiv&&a){return s.default.createElement(u.PopoverPortal,{element:this.popoverDiv,container:i||window.document.body},(t=a,"function"==typeof o?o(t):o))}return null},e.prototype.renderChildContent=function(){var t=this.props.children;return"function"==typeof t?t(this.targetRef):s.default.cloneElement(t,{ref:this.targetRef})},e.prototype.renderWithPosition=function(t,e){var o=this,n=t.position,i=t.nudgedLeft,r=void 0===i?0:i,a=t.nudgedTop,s=void 0===a?0:a,p=t.targetRect,u=void 0===p?l.Constants.EMPTY_CLIENT_RECT:p,d=t.popoverRect,c=void 0===d?l.Constants.EMPTY_CLIENT_RECT:d,v=this.props,f=v.windowBorderPadding,h=v.align,g={position:n,nudgedLeft:r,nudgedTop:s,targetRect:u,popoverRect:c,align:h};l.popoverInfosAreEqual(this.state.popoverInfo,g)||(window.clearTimeout(this.removePopoverTimeout),this.setState({popoverInfo:g,isTransitioningToClosed:!1,internalisOpen:!0},(function(){if(!o.willUnmount){u=o.targetRef.current.getBoundingClientRect(),c=o.popoverDiv.getBoundingClientRect();var t=o.getLocationForPosition(n,u,c),i=t.top,r=t.left;e("top"===n&&i<f||"left"===n&&r<f||"right"===n&&r+c.width>window.innerWidth-f||"bottom"===n&&i+c.height>window.innerHeight-f,{width:c.width,height:c.height,top:i,left:r})}})))},e.prototype.render=function(){return s.default.createElement(s.default.Fragment,null,this.renderChildContent(),this.renderPopoverContent())},e.defaultProps={padding:l.Constants.DEFAULT_PADDING,windowBorderPadding:l.Constants.DEFAULT_WINDOW_PADDING,position:d,align:"center",containerClassName:l.Constants.POPOVER_CONTAINER_CLASS_NAME,transitionDuration:l.Constants.FADE_TRANSITION},e}(s.default.Component);e.default=c},79297:(t,e,o)=>{Object.defineProperty(e,"__esModule",{value:!0});var n=o(32735),i=o(12788);e.PopoverPortal=function(t){var e=t.container,o=t.element,r=t.children;return n.useLayoutEffect((function(){return e.appendChild(o),function(){return e.removeChild(o)}}),[e]),i.createPortal(r,o)}},68169:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.Constants={POPOVER_CONTAINER_CLASS_NAME:"react-tiny-popover-container",DEFAULT_PADDING:6,DEFAULT_WINDOW_PADDING:6,FADE_TRANSITION:.35,DEFAULT_ARROW_COLOR:"black",DEFAULT_POSITIONS:["top","left","right","bottom"],EMPTY_CLIENT_RECT:{top:0,left:0,bottom:0,height:0,right:0,width:0}},e.arrayUnique=function(t){return t.filter((function(t,e,o){return o.indexOf(t)===e}))},e.rectsAreEqual=function(t,e){return t===e||(null==t?void 0:t.bottom)===(null==e?void 0:e.bottom)&&(null==t?void 0:t.height)===(null==e?void 0:e.height)&&(null==t?void 0:t.left)===(null==e?void 0:e.left)&&(null==t?void 0:t.right)===(null==e?void 0:e.right)&&(null==t?void 0:t.top)===(null==e?void 0:e.top)&&(null==t?void 0:t.width)===(null==e?void 0:e.width)},e.popoverInfosAreEqual=function(t,o){return t===o||(null==t?void 0:t.align)===(null==o?void 0:o.align)&&(null==t?void 0:t.nudgedLeft)===(null==o?void 0:o.nudgedLeft)&&(null==t?void 0:t.nudgedTop)===(null==o?void 0:o.nudgedTop)&&e.rectsAreEqual(null==t?void 0:t.popoverRect,null==o?void 0:o.popoverRect)&&e.rectsAreEqual(null==t?void 0:t.targetRect,null==o?void 0:o.targetRect)&&(null==t?void 0:t.position)===(null==o?void 0:o.position)},e.targetPositionHasChanged=function(t,e){return void 0===t||t.left!==e.left||t.top!==e.top||t.width!==e.width||t.height!==e.height}}}]);