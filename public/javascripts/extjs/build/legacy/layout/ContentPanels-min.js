/*
 * Ext JS Library 2.0.2
 * Copyright(c) 2006-2008, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://extjs.com/license
 */


Ext.ContentPanel=function(el,config,content){if(el.autoCreate){config=el;el=Ext.id();}
this.el=Ext.get(el);if(!this.el&&config&&config.autoCreate){if(typeof config.autoCreate=="object"){if(!config.autoCreate.id){config.autoCreate.id=config.id||el;}
this.el=Ext.DomHelper.append(document.body,config.autoCreate,true);}else{this.el=Ext.DomHelper.append(document.body,{tag:"div",cls:"x-layout-inactive-content",id:config.id||el},true);}}
this.closable=false;this.loaded=false;this.active=false;if(typeof config=="string"){this.title=config;}else{Ext.apply(this,config);}
if(this.resizeEl){this.resizeEl=Ext.get(this.resizeEl,true);}else{this.resizeEl=this.el;}
this.addEvents({"activate":true,"deactivate":true,"resize":true});if(this.autoScroll){this.resizeEl.setStyle("overflow","auto");}
content=content||this.content;if(content){this.setContent(content);}
if(config&&config.url){this.setUrl(this.url,this.params,this.loadOnce);}
Ext.ContentPanel.superclass.constructor.call(this);};Ext.extend(Ext.ContentPanel,Ext.util.Observable,{tabTip:'',setRegion:function(region){this.region=region;if(region){this.el.replaceClass("x-layout-inactive-content","x-layout-active-content");}else{this.el.replaceClass("x-layout-active-content","x-layout-inactive-content");}},getToolbar:function(){return this.toolbar;},setActiveState:function(active){this.active=active;if(!active){this.fireEvent("deactivate",this);}else{this.fireEvent("activate",this);}},setContent:function(content,loadScripts){this.el.update(content,loadScripts);},ignoreResize:function(w,h){if(this.lastSize&&this.lastSize.width==w&&this.lastSize.height==h){return true;}else{this.lastSize={width:w,height:h};return false;}},getUpdater:function(){return this.el.getUpdater();},load:function(){this.el.load.apply(this.el,arguments);return this;},setUrl:function(url,params,loadOnce){if(this.refreshDelegate){this.removeListener("activate",this.refreshDelegate);}
this.refreshDelegate=this._handleRefresh.createDelegate(this,[url,params,loadOnce]);this.on("activate",this.refreshDelegate);return this.el.getUpdater();},_handleRefresh:function(url,params,loadOnce){if(!loadOnce||!this.loaded){var updater=this.el.getUpdater();updater.update(url,params,this._setLoaded.createDelegate(this));}},_setLoaded:function(){this.loaded=true;},getId:function(){return this.el.id;},getEl:function(){return this.el;},adjustForComponents:function(width,height){if(this.resizeEl!=this.el){width-=this.el.getFrameWidth('lr');height-=this.el.getFrameWidth('tb');}
if(this.toolbar){var te=this.toolbar.getEl();height-=te.getHeight();te.setWidth(width);}
if(this.adjustments){width+=this.adjustments[0];height+=this.adjustments[1];}
return{"width":width,"height":height};},setSize:function(width,height){if(this.fitToFrame&&!this.ignoreResize(width,height)){if(this.fitContainer&&this.resizeEl!=this.el){this.el.setSize(width,height);}
var size=this.adjustForComponents(width,height);this.resizeEl.setSize(this.autoWidth?"auto":size.width,this.autoHeight?"auto":size.height);this.fireEvent('resize',this,size.width,size.height);}},getTitle:function(){return this.title;},setTitle:function(title){this.title=title;if(this.region){this.region.updatePanelTitle(this,title);}},isClosable:function(){return this.closable;},beforeSlide:function(){this.el.clip();this.resizeEl.clip();},afterSlide:function(){this.el.unclip();this.resizeEl.unclip();},refresh:function(){if(this.refreshDelegate){this.loaded=false;this.refreshDelegate();}},destroy:function(){this.el.removeAllListeners();var tempEl=document.createElement("span");tempEl.appendChild(this.el.dom);tempEl.innerHTML="";this.el.remove();this.el=null;}});Ext.ContentPanel.prototype.getUpdateManager=Ext.ContentPanel.prototype.getUpdater;Ext.GridPanel=function(grid,config){this.wrapper=Ext.DomHelper.append(document.body,{tag:"div",cls:"x-layout-grid-wrapper x-layout-inactive-content"},true);this.wrapper.dom.appendChild(grid.getGridEl().dom);Ext.GridPanel.superclass.constructor.call(this,this.wrapper,config);if(this.toolbar){this.toolbar.el.insertBefore(this.wrapper.dom.firstChild);}
grid.monitorWindowResize=false;grid.autoHeight=false;grid.autoWidth=false;this.grid=grid;this.grid.getGridEl().replaceClass("x-layout-inactive-content","x-layout-component-panel");};Ext.extend(Ext.GridPanel,Ext.ContentPanel,{getId:function(){return this.grid.id;},getGrid:function(){return this.grid;},setSize:function(width,height){if(!this.ignoreResize(width,height)){var grid=this.grid;var size=this.adjustForComponents(width,height);grid.getGridEl().setSize(size.width,size.height);grid.autoSize();}},beforeSlide:function(){this.grid.getView().scroller.clip();},afterSlide:function(){this.grid.getView().scroller.unclip();},destroy:function(){this.grid.destroy();delete this.grid;Ext.GridPanel.superclass.destroy.call(this);}});Ext.NestedLayoutPanel=function(layout,config){Ext.NestedLayoutPanel.superclass.constructor.call(this,layout.getEl(),config);layout.monitorWindowResize=false;this.layout=layout;this.layout.getEl().addClass("x-layout-nested-layout");};Ext.extend(Ext.NestedLayoutPanel,Ext.ContentPanel,{setSize:function(width,height){if(!this.ignoreResize(width,height)){var size=this.adjustForComponents(width,height);var el=this.layout.getEl();el.setSize(size.width,size.height);var touch=el.dom.offsetWidth;this.layout.layout();if(Ext.isIE&&!this.initialized){this.initialized=true;this.layout.layout();}}},getLayout:function(){return this.layout;}});Ext.ScrollPanel=function(el,config,content){config=config||{};config.fitToFrame=true;Ext.ScrollPanel.superclass.constructor.call(this,el,config,content);this.el.dom.style.overflow="hidden";var wrap=this.el.wrap({cls:"x-scroller x-layout-inactive-content"});this.el.removeClass("x-layout-inactive-content");this.el.on("mousewheel",this.onWheel,this);var up=wrap.createChild({cls:"x-scroller-up",html:"&#160;"},this.el.dom);var down=wrap.createChild({cls:"x-scroller-down",html:"&#160;"});up.unselectable();down.unselectable();up.on("click",this.scrollUp,this);down.on("click",this.scrollDown,this);up.addClassOnOver("x-scroller-btn-over");down.addClassOnOver("x-scroller-btn-over");up.addClassOnClick("x-scroller-btn-click");down.addClassOnClick("x-scroller-btn-click");this.adjustments=[0,-(up.getHeight()+down.getHeight())];this.resizeEl=this.el;this.el=wrap;this.up=up;this.down=down;};Ext.extend(Ext.ScrollPanel,Ext.ContentPanel,{increment:100,wheelIncrement:5,scrollUp:function(){this.resizeEl.scroll("up",this.increment,{callback:this.afterScroll,scope:this});},scrollDown:function(){this.resizeEl.scroll("down",this.increment,{callback:this.afterScroll,scope:this});},afterScroll:function(){var el=this.resizeEl;var t=el.dom.scrollTop,h=el.dom.scrollHeight,ch=el.dom.clientHeight;this.up[t==0?"addClass":"removeClass"]("x-scroller-btn-disabled");this.down[h-t<=ch?"addClass":"removeClass"]("x-scroller-btn-disabled");},setSize:function(){Ext.ScrollPanel.superclass.setSize.apply(this,arguments);this.afterScroll();},onWheel:function(e){var d=e.getWheelDelta();this.resizeEl.dom.scrollTop-=(d*this.wheelIncrement);this.afterScroll();e.stopEvent();},setContent:function(content,loadScripts){this.resizeEl.update(content,loadScripts);}});