// - EasyPieChart
(function($){$.easyPieChart=function(el,options){var addScaleLine,animateLine,drawLine,easeInOutQuad,rAF,renderBackground,renderScale,renderTrack,_this=this;this.el=el;this.$el=$(el);this.$el.data("easyPieChart",this);this.init=function(){var percent,scaleBy;_this.options=$.extend({},$.easyPieChart.defaultOptions,options);percent=parseInt(_this.$el.data('percent'),10);_this.percentage=0;_this.canvas=$("<canvas width='"+_this.options.size+"' height='"+_this.options.size+"'></canvas>").get(0);_this.$el.append(_this.canvas);if(typeof G_vmlCanvasManager!=="undefined"&&G_vmlCanvasManager!==null){G_vmlCanvasManager.initElement(_this.canvas)}_this.ctx=_this.canvas.getContext('2d');if(window.devicePixelRatio>1){scaleBy=window.devicePixelRatio;$(_this.canvas).css({width:_this.options.size,height:_this.options.size});_this.canvas.width*=scaleBy;_this.canvas.height*=scaleBy;_this.ctx.scale(scaleBy,scaleBy)}_this.ctx.translate(_this.options.size/2,_this.options.size/2);_this.ctx.rotate(_this.options.rotate*Math.PI/180);_this.$el.addClass('easyPieChart');_this.$el.css({width:_this.options.size,height:_this.options.size,lineHeight:""+_this.options.size+"px"});_this.update(percent);return _this};this.update=function(percent){percent=parseFloat(percent)||0;if(_this.options.animate===false){drawLine(percent)}else{animateLine(_this.percentage,percent)}return _this};renderScale=function(){var i,_i,_results;_this.ctx.fillStyle=_this.options.scaleColor;_this.ctx.lineWidth=1;_results=[];for(i=_i=0;_i<=24;i=++_i){_results.push(addScaleLine(i))}return _results};addScaleLine=function(i){var offset;offset=i%6===0?0:_this.options.size*0.017;_this.ctx.save();_this.ctx.rotate(i*Math.PI/12);_this.ctx.fillRect(_this.options.size/2-offset,0,-_this.options.size*0.05+offset,1);_this.ctx.restore()};renderTrack=function(){var offset;offset=_this.options.size/2-_this.options.lineWidth/2;if(_this.options.scaleColor!==false){offset-=_this.options.size*0.08}_this.ctx.beginPath();_this.ctx.arc(0,0,offset,0,Math.PI*2,true);_this.ctx.closePath();_this.ctx.strokeStyle=_this.options.trackColor;_this.ctx.lineWidth=_this.options.lineWidth;_this.ctx.stroke()};renderBackground=function(){if(_this.options.scaleColor!==false){renderScale()}if(_this.options.trackColor!==false){renderTrack()}};drawLine=function(percent){var offset;renderBackground();_this.ctx.strokeStyle=$.isFunction(_this.options.barColor)?_this.options.barColor(percent):_this.options.barColor;_this.ctx.lineCap=_this.options.lineCap;_this.ctx.lineWidth=_this.options.lineWidth;offset=_this.options.size/2-_this.options.lineWidth/2;if(_this.options.scaleColor!==false){offset-=_this.options.size*0.08}_this.ctx.save();_this.ctx.rotate(-Math.PI/2);_this.ctx.beginPath();_this.ctx.arc(0,0,offset,0,Math.PI*2*percent/100,false);_this.ctx.stroke();_this.ctx.restore()};rAF=(function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(callback){return window.setTimeout(callback,1000/60)}})();animateLine=function(from,to){var anim,startTime;_this.options.onStart.call(_this);_this.percentage=to;Date.now||(Date.now=function(){return+(new Date)});startTime=Date.now();anim=function(){var currentValue,process;process=Date.now()-startTime;if(process<_this.options.animate){rAF(anim)}_this.ctx.clearRect(-_this.options.size/2,-_this.options.size/2,_this.options.size,_this.options.size);renderBackground.call(_this);currentValue=[easeInOutQuad(process,from,to-from,_this.options.animate)];_this.options.onStep.call(_this,currentValue);drawLine.call(_this,currentValue);if(process>=_this.options.animate){return _this.options.onStop.call(_this,currentValue,to)}};rAF(anim)};easeInOutQuad=function(t,b,c,d){var easeIn,easing;easeIn=function(t){return Math.pow(t,2)};easing=function(t){if(t<1){return easeIn(t)}else{return 2-easeIn((t/2)*-2+2)}};t/=d/2;return c/2*easing(t)+b};return this.init()};$.easyPieChart.defaultOptions={barColor:'#ef1e25',trackColor:'#f2f2f2',scaleColor:'#dfe0e0',lineCap:'round',rotate:0,size:110,lineWidth:3,animate:false,onStart:$.noop,onStop:$.noop,onStep:$.noop};$.fn.easyPieChart=function(options){return $.each(this,function(i,el){var $el,instanceOptions;$el=$(el);if(!$el.data('easyPieChart')){instanceOptions=$.extend({},options,$el.data());return $el.data('easyPieChart',new $.easyPieChart(el,instanceOptions))}})};return void 0})(jQuery); 

// - From To
(!function(t){"function"==typeof define&&define.amd?define(["jquery"],t):t("object"==typeof exports?require("jquery"):jQuery)}(function(t){var e=function(o,i){this.$element=t(o),this.options=t.extend({},e.DEFAULTS,this.dataOptions(),i),this.init()};e.DEFAULTS={from:0,to:0,speed:1e3,refreshInterval:100,decimals:0,formatter:function(t,e){return t.toFixed(e.decimals)},onUpdate:null,onComplete:null},e.prototype.init=function(){this.value=this.options.from,this.loops=Math.ceil(this.options.speed/this.options.refreshInterval),this.loopCount=0,this.increment=(this.options.to-this.options.from)/this.loops},e.prototype.dataOptions=function(){var t={from:this.$element.data("from"),to:this.$element.data("to"),speed:this.$element.data("speed"),refreshInterval:this.$element.data("refresh-interval"),decimals:this.$element.data("decimals")},e=Object.keys(t);for(var o in e){var i=e[o];void 0===t[i]&&delete t[i]}return t},e.prototype.update=function(){this.value+=this.increment,this.loopCount++,this.render(),"function"==typeof this.options.onUpdate&&this.options.onUpdate.call(this.$element,this.value),this.loopCount>=this.loops&&(clearInterval(this.interval),this.value=this.options.to,"function"==typeof this.options.onComplete&&this.options.onComplete.call(this.$element,this.value))},e.prototype.render=function(){var t=this.options.formatter.call(this.$element,this.value,this.options);this.$element.text(t)},e.prototype.restart=function(){this.stop(),this.init(),this.start()},e.prototype.start=function(){this.stop(),this.render(),this.interval=setInterval(this.update.bind(this),this.options.refreshInterval)},e.prototype.stop=function(){this.interval&&clearInterval(this.interval)},e.prototype.toggle=function(){this.interval?this.stop():this.start()},t.fn.countTo=function(o){return this.each(function(){var i=t(this),n=i.data("countTo"),s=!n||"object"==typeof o,r="object"==typeof o?o:{},a="string"==typeof o?o:"start";s&&(n&&n.stop(),i.data("countTo",n=new e(this,r))),n[a].call(n)})}}));

// - Waipoint
(function(){!function(){"use strict";function t(o){if(!o)throw new Error("No options passed to Waypoint constructor");if(!o.element)throw new Error("No element option passed to Waypoint constructor");if(!o.handler)throw new Error("No handler option passed to Waypoint constructor");this.key="waypoint-"+e,this.options=t.Adapter.extend({},t.defaults,o),this.element=this.options.element,this.adapter=new t.Adapter(this.element),this.callback=o.handler,this.axis=this.options.horizontal?"horizontal":"vertical",this.enabled=this.options.enabled,this.triggerPoint=null,this.group=t.Group.findOrCreate({name:this.options.group,axis:this.axis}),this.context=t.Context.findOrCreateByElement(this.options.context),t.offsetAliases[this.options.offset]&&(this.options.offset=t.offsetAliases[this.options.offset]),this.group.add(this),this.context.add(this),i[this.key]=this,e+=1}var e=0,i={};t.prototype.queueTrigger=function(t){this.group.queueTrigger(this,t)},t.prototype.trigger=function(t){this.enabled&&this.callback&&this.callback.apply(this,t)},t.prototype.destroy=function(){this.context.remove(this),this.group.remove(this),delete i[this.key]},t.prototype.disable=function(){return this.enabled=!1,this},t.prototype.enable=function(){return this.context.refresh(),this.enabled=!0,this},t.prototype.next=function(){return this.group.next(this)},t.prototype.previous=function(){return this.group.previous(this)},t.invokeAll=function(t){var e=[];for(var o in i)e.push(i[o]);for(var n=0,r=e.length;r>n;n++)e[n][t]()},t.destroyAll=function(){t.invokeAll("destroy")},t.disableAll=function(){t.invokeAll("disable")},t.enableAll=function(){t.Context.refreshAll();for(var e in i)i[e].enabled=!0;return this},t.refreshAll=function(){t.Context.refreshAll()},t.viewportHeight=function(){return window.innerHeight||document.documentElement.clientHeight},t.viewportWidth=function(){return document.documentElement.clientWidth},t.adapters=[],t.defaults={context:window,continuous:!0,enabled:!0,group:"default",horizontal:!1,offset:0},t.offsetAliases={"bottom-in-view":function(){return this.context.innerHeight()-this.adapter.outerHeight()},"right-in-view":function(){return this.context.innerWidth()-this.adapter.outerWidth()}},window.Waypoint=t}(),function(){"use strict";function t(t){window.setTimeout(t,1e3/60)}function e(t){this.element=t,this.Adapter=n.Adapter,this.adapter=new this.Adapter(t),this.key="waypoint-context-"+i,this.didScroll=!1,this.didResize=!1,this.oldScroll={x:this.adapter.scrollLeft(),y:this.adapter.scrollTop()},this.waypoints={vertical:{},horizontal:{}},t.waypointContextKey=this.key,o[t.waypointContextKey]=this,i+=1,n.windowContext||(n.windowContext=!0,n.windowContext=new e(window)),this.createThrottledScrollHandler(),this.createThrottledResizeHandler()}var i=0,o={},n=window.Waypoint,r=window.onload;e.prototype.add=function(t){var e=t.options.horizontal?"horizontal":"vertical";this.waypoints[e][t.key]=t,this.refresh()},e.prototype.checkEmpty=function(){var t=this.Adapter.isEmptyObject(this.waypoints.horizontal),e=this.Adapter.isEmptyObject(this.waypoints.vertical),i=this.element==this.element.window;t&&e&&!i&&(this.adapter.off(".waypoints"),delete o[this.key])},e.prototype.createThrottledResizeHandler=function(){function t(){e.handleResize(),e.didResize=!1}var e=this;this.adapter.on("resize.waypoints",function(){e.didResize||(e.didResize=!0,n.requestAnimationFrame(t))})},e.prototype.createThrottledScrollHandler=function(){function t(){e.handleScroll(),e.didScroll=!1}var e=this;this.adapter.on("scroll.waypoints",function(){(!e.didScroll||n.isTouch)&&(e.didScroll=!0,n.requestAnimationFrame(t))})},e.prototype.handleResize=function(){n.Context.refreshAll()},e.prototype.handleScroll=function(){var t={},e={horizontal:{newScroll:this.adapter.scrollLeft(),oldScroll:this.oldScroll.x,forward:"right",backward:"left"},vertical:{newScroll:this.adapter.scrollTop(),oldScroll:this.oldScroll.y,forward:"down",backward:"up"}};for(var i in e){var o=e[i],n=o.newScroll>o.oldScroll,r=n?o.forward:o.backward;for(var s in this.waypoints[i]){var a=this.waypoints[i][s];if(null!==a.triggerPoint){var l=o.oldScroll<a.triggerPoint,h=o.newScroll>=a.triggerPoint,p=l&&h,u=!l&&!h;(p||u)&&(a.queueTrigger(r),t[a.group.id]=a.group)}}}for(var c in t)t[c].flushTriggers();this.oldScroll={x:e.horizontal.newScroll,y:e.vertical.newScroll}},e.prototype.innerHeight=function(){return this.element==this.element.window?n.viewportHeight():this.adapter.innerHeight()},e.prototype.remove=function(t){delete this.waypoints[t.axis][t.key],this.checkEmpty()},e.prototype.innerWidth=function(){return this.element==this.element.window?n.viewportWidth():this.adapter.innerWidth()},e.prototype.destroy=function(){var t=[];for(var e in this.waypoints)for(var i in this.waypoints[e])t.push(this.waypoints[e][i]);for(var o=0,n=t.length;n>o;o++)t[o].destroy()},e.prototype.refresh=function(){var t,e=this.element==this.element.window,i=e?void 0:this.adapter.offset(),o={};this.handleScroll(),t={horizontal:{contextOffset:e?0:i.left,contextScroll:e?0:this.oldScroll.x,contextDimension:this.innerWidth(),oldScroll:this.oldScroll.x,forward:"right",backward:"left",offsetProp:"left"},vertical:{contextOffset:e?0:i.top,contextScroll:e?0:this.oldScroll.y,contextDimension:this.innerHeight(),oldScroll:this.oldScroll.y,forward:"down",backward:"up",offsetProp:"top"}};for(var r in t){var s=t[r];for(var a in this.waypoints[r]){var l,h,p,u,c,d=this.waypoints[r][a],f=d.options.offset,w=d.triggerPoint,y=0,g=null==w;d.element!==d.element.window&&(y=d.adapter.offset()[s.offsetProp]),"function"==typeof f?f=f.apply(d):"string"==typeof f&&(f=parseFloat(f),d.options.offset.indexOf("%")>-1&&(f=Math.ceil(s.contextDimension*f/100))),l=s.contextScroll-s.contextOffset,d.triggerPoint=Math.floor(y+l-f),h=w<s.oldScroll,p=d.triggerPoint>=s.oldScroll,u=h&&p,c=!h&&!p,!g&&u?(d.queueTrigger(s.backward),o[d.group.id]=d.group):!g&&c?(d.queueTrigger(s.forward),o[d.group.id]=d.group):g&&s.oldScroll>=d.triggerPoint&&(d.queueTrigger(s.forward),o[d.group.id]=d.group)}}return n.requestAnimationFrame(function(){for(var t in o)o[t].flushTriggers()}),this},e.findOrCreateByElement=function(t){return e.findByElement(t)||new e(t)},e.refreshAll=function(){for(var t in o)o[t].refresh()},e.findByElement=function(t){return o[t.waypointContextKey]},window.onload=function(){r&&r(),e.refreshAll()},n.requestAnimationFrame=function(e){var i=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||t;i.call(window,e)},n.Context=e}(),function(){"use strict";function t(t,e){return t.triggerPoint-e.triggerPoint}function e(t,e){return e.triggerPoint-t.triggerPoint}function i(t){this.name=t.name,this.axis=t.axis,this.id=this.name+"-"+this.axis,this.waypoints=[],this.clearTriggerQueues(),o[this.axis][this.name]=this}var o={vertical:{},horizontal:{}},n=window.Waypoint;i.prototype.add=function(t){this.waypoints.push(t)},i.prototype.clearTriggerQueues=function(){this.triggerQueues={up:[],down:[],left:[],right:[]}},i.prototype.flushTriggers=function(){for(var i in this.triggerQueues){var o=this.triggerQueues[i],n="up"===i||"left"===i;o.sort(n?e:t);for(var r=0,s=o.length;s>r;r+=1){var a=o[r];(a.options.continuous||r===o.length-1)&&a.trigger([i])}}this.clearTriggerQueues()},i.prototype.next=function(e){this.waypoints.sort(t);var i=n.Adapter.inArray(e,this.waypoints),o=i===this.waypoints.length-1;return o?null:this.waypoints[i+1]},i.prototype.previous=function(e){this.waypoints.sort(t);var i=n.Adapter.inArray(e,this.waypoints);return i?this.waypoints[i-1]:null},i.prototype.queueTrigger=function(t,e){this.triggerQueues[e].push(t)},i.prototype.remove=function(t){var e=n.Adapter.inArray(t,this.waypoints);e>-1&&this.waypoints.splice(e,1)},i.prototype.first=function(){return this.waypoints[0]},i.prototype.last=function(){return this.waypoints[this.waypoints.length-1]},i.findOrCreate=function(t){return o[t.axis][t.name]||new i(t)},n.Group=i}(),function(){"use strict";function t(t){this.$element=e(t)}var e=window.jQuery,i=window.Waypoint;e.each(["innerHeight","innerWidth","off","offset","on","outerHeight","outerWidth","scrollLeft","scrollTop"],function(e,i){t.prototype[i]=function(){var t=Array.prototype.slice.call(arguments);return this.$element[i].apply(this.$element,t)}}),e.each(["extend","inArray","isEmptyObject"],function(i,o){t[o]=e[o]}),i.adapters.push({name:"jquery",Adapter:t}),i.Adapter=t}(),function(){"use strict";function t(t){return function(){var i=[],o=arguments[0];return t.isFunction(arguments[0])&&(o=t.extend({},arguments[1]),o.handler=arguments[0]),this.each(function(){var n=t.extend({},o,{element:this});"string"==typeof n.context&&(n.context=t(this).closest(n.context)[0]),i.push(new e(n))}),i}}var e=window.Waypoint;window.jQuery&&(window.jQuery.fn.waypoint=t(window.jQuery)),window.Zepto&&(window.Zepto.fn.waypoint=t(window.Zepto))}();})();


jQuery.fn.isInViewport = function(h) {
    var elH      = jQuery(this).outerHeight(),
        scrolled = jQuery(window).scrollTop(),
        viewed   = scrolled + jQuery(window).height(),
        elTop    = jQuery(this).offset().top,
        elBottom = elTop + elH,
        h        = (typeof(h) != 'undefined' && h.length) ? h : 0.4;

    return (elTop + elH * h) <= viewed && (elBottom - elH * h) >= scrolled;
};

jQuery.fn.randomDelay = function(children,maxDelay,minDelay) {
	jQuery(this).find(children).each(function(){

	    var item = jQuery(this);
	    var randomDelay = Math.round(( Math.random() * ( maxDelay - minDelay ) + minDelay ));

	    item.css('animation-delay',randomDelay+'ms');

	});
}

jQuery.fn.sequentialDelay = function(children,delayGap) {
	jQuery(this).find(children).each(function(index){

	    var item = jQuery(this);
	    var sequentialDelay = delayGap*index;

	    item.css('animation-delay',sequentialDelay+'ms');

	});
}

jQuery.fn.animateIfInViewport = function(children) {

	var element = jQuery(this);

	if (children) {
		element.find(children).each(function(){
	        var child = jQuery(this);
	        if(child.isInViewport()){
	            child
	            .addClass(child.data('animation'))
	            .addClass('animated');
	        }
	    });
	} else {
		if(element.isInViewport()){
	        element
	        .addClass(element.data('animation'))
	        .addClass('animated');
	    }
	}
}

;(function($){

	"use strict";

	/* #row-title
	-----------------*/

		$('#row-title')
		.animateIfInViewport('.col');

	/* .section-title
	-----------------*/

		$('.section-title').each(function(){
			$(this).animateIfInViewport();
		});

	/* .row-fadeInUp
	-----------------*/

		$('.row-fadeInUp').each(function(){
			$(this).sequentialDelay('.col',100);
		});
		

		$('.row-fadeInUp').each(function(){
			$(this).animateIfInViewport('.col');
		});

	/* .row-fadeInRight
	-----------------*/

		$('.row-fadeInRight').each(function(){
			$(this).sequentialDelay('.col',100);
		});
		

		$('.row-fadeInRight').each(function(){
			$(this).animateIfInViewport('.col');
		});

	/* .row-bounceIn
	-----------------*/

		$('.row-bounceIn').each(function(){
			$(this).randomDelay('.col',500,200);
		});
		

		$('.row-bounceIn').each(function(){
			$(this).animateIfInViewport('.col');
		});

	/* .row-fadeIn
	-----------------*/

		$('.row-fadeIn').each(function(){
			$(this).sequentialDelay('.col',50);
		});
		

		$('.row-fadeIn').each(function(){
			$(this).animateIfInViewport('.col');
		});

	/* .row-flipInY
	-----------------*/

		$('.row-flipInY').each(function(){
			$(this).randomDelay('.col',500,200);
		});
		

		$('.row-flipInY').each(function(){
			$(this).animateIfInViewport('.col');
		});
		

	/* #row-jackInTheBox
	-----------------*/

		$('#row-LeftRight')
		.animateIfInViewport('.col');


	/* INFOGRAPHICS
	-----------------*/

		/* counters
		-----------------*/

			$('.et-counter').each(function(){

				var $this   = $(this);
				var $thisTo = $this.data('to');

				$(this).waypoint({
	                handler: function(direction) {

	                	var element = $(this.element);

	                    element.addClass('active');
			    		element.find('.counter').countTo({
						    from: 0,
						    to: $thisTo,
						    speed: 2000,
						    refreshInterval: 30
						});

	                    this.destroy();
	                },
	                offset: '75%',
	            });

			});

		/* counters
		-----------------*/

			$('.et-progress').each(function(){

				var $this 	   = $(this);
				var bar   	   = $this.find('.bar');
				var percentage = bar.data('percentage');
				var percent    = $this.find('.percent');

				$(this).waypoint({
	                handler: function(direction) {

	                    bar.addClass('visible')
						.animate({width: percentage+'%'}, 2000);

						percent.addClass('visible')
						.countTo({
						    from: 0,
						    to: percentage,
						    speed: 2000,
						    refreshInterval: 30
						});

	                    this.destroy();
	                },
	                offset: '75%',
	            });

			});

		/* circle counters
		-----------------*/

			$('.et-circle-progress').each(function(){

				var $this 	   = $(this);
				var bar   	   = $this.data('bar');
				var track      = $this.data('track');
				var percentage = $this.data('percent');
				var percent    = $this.find('.percent');
				var size       = 200;

				if ($this.hasClass('size-medium')) {size = 240;}
				if ($this.hasClass('size-large'))  {size = 300;}

				$this.waypoint({
	                handler: function(direction) {

	                    $(this.element).addClass('visible');

						$(this.element).easyPieChart({
							barColor: bar,
							trackColor: (typeof track == "undefined") ? "#eeeeee" : track,
							lineCap:'square',
							lineWidth:16,
							size:size,
							animate:'1500',
							scaleColor: false
						});

						percent.countTo({
						    from: 0,
						    to: percentage,
						    speed: 2000,
						    refreshInterval: 30
						});

	                    this.destroy();
	                },
	                offset: 'bottom-in-view',
	            });

			});

	/* scroll
	-----------------*/

		$(window).scroll(function(){

			$('#row-title').animateIfInViewport('.col');

			$('.row-fadeInUp').animateIfInViewport('.col');

			$('.row-fadeInRight').animateIfInViewport('.col');

			$('.row-bounceIn').animateIfInViewport('.col');

			$('.row-fadeIn').animateIfInViewport('.col');

			$('.row-flipInY').animateIfInViewport('.col');

			$('#row-LeftRight').animateIfInViewport('.col');

			$('.section-title').each(function(){
				$(this).animateIfInViewport();
			});
		});

})(jQuery);