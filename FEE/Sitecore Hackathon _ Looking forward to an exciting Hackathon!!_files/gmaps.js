if("object"!=typeof window.google||!window.google.maps)throw"Google Maps API is required. Please register the following JavaScript library http://maps.google.com/maps/api/js?sensor=true.";var extend_object=function(a,b){var c;if(a===b)return a;for(c in b)a[c]=b[c];return a},replace_object=function(a,b){var c;if(a===b)return a;for(c in b)void 0!=a[c]&&(a[c]=b[c]);return a},array_map=function(a,b){var f,c=Array.prototype.slice.call(arguments,2),d=[],e=a.length;if(Array.prototype.map&&a.map===Array.prototype.map)d=Array.prototype.map.call(a,function(a){return callback_params=c,callback_params.splice(0,0,a),b.apply(this,callback_params)});else for(f=0;e>f;f++)callback_params=c,callback_params.splice(0,0,a[f]),d.push(b.apply(this,callback_params));return d},array_flat=function(a){var c,b=[];for(c=0;c<a.length;c++)b=b.concat(a[c]);return b},coordsToLatLngs=function(a,b){var c=a[0],d=a[1];return b&&(c=a[1],d=a[0]),new google.maps.LatLng(c,d)},arrayToLatLng=function(a,b){var c;for(c=0;c<a.length;c++)a[c]=a[c].length>0&&"number"!=typeof a[c][0]?arrayToLatLng(a[c],b):coordsToLatLngs(a[c],b);return a},getElementById=function(a,b){var c,a=a.replace("#","");return c="jQuery"in this&&b?$("#"+a,b)[0]:document.getElementById(a)},findAbsolutePosition=function(a){var b=0,c=0;if(a.offsetParent)do b+=a.offsetLeft,c+=a.offsetTop;while(a=a.offsetParent);return[b,c]},GMaps=function(){"use strict";var b=document,c=function(a){if(!this)return new c(a);a.zoom=a.zoom||15,a.mapType=a.mapType||"roadmap";var e,d=this,f=["bounds_changed","center_changed","click","dblclick","drag","dragend","dragstart","idle","maptypeid_changed","projection_changed","resize","tilesloaded","zoom_changed"],g=["mousemove","mouseout","mouseover"],h=["el","lat","lng","mapType","width","height","markerClusterer","enableNewStyle"],i=a.el||a.div,j=a.markerClusterer,k=google.maps.MapTypeId[a.mapType.toUpperCase()],l=new google.maps.LatLng(a.lat,a.lng),m=a.zoomControl||!0,n=a.zoomControlOpt||{style:"DEFAULT",position:"TOP_LEFT"},o=n.style||"DEFAULT",p=n.position||"TOP_LEFT",q=a.panControl||!0,r=a.mapTypeControl||!0,s=a.scaleControl||!0,t=a.streetViewControl||!0,u=u||!0,v={},w={zoom:this.zoom,center:l,mapTypeId:k},x={panControl:q,zoomControl:m,zoomControlOptions:{style:google.maps.ZoomControlStyle[o],position:google.maps.ControlPosition[p]},mapTypeControl:r,scaleControl:s,streetViewControl:t,overviewMapControl:u};if(this.el="string"==typeof a.el||"string"==typeof a.div?getElementById(i,a.context):i,"undefined"==typeof this.el||null===this.el)throw"No element defined.";for(window.context_menu=window.context_menu||{},window.context_menu[d.el.id]={},this.controls=[],this.overlays=[],this.layers=[],this.singleLayers={},this.markers=[],this.polylines=[],this.routes=[],this.polygons=[],this.infoWindow=null,this.overlay_el=null,this.zoom=a.zoom,this.registered_events={},this.el.style.width=a.width||this.el.scrollWidth||this.el.offsetWidth,this.el.style.height=a.height||this.el.scrollHeight||this.el.offsetHeight,google.maps.visualRefresh=a.enableNewStyle,e=0;e<h.length;e++)delete a[h[e]];for(1!=a.disableDefaultUI&&(w=extend_object(w,x)),v=extend_object(w,a),e=0;e<f.length;e++)delete v[f[e]];for(e=0;e<g.length;e++)delete v[g[e]];this.map=new google.maps.Map(this.el,v),j&&(this.markerClusterer=j.apply(this,[this.map]));var y=function(a,b){var c="",e=window.context_menu[d.el.id][a];for(var f in e)if(e.hasOwnProperty(f)){var g=e[f];c+='<li><a id="'+a+"_"+f+'" href="#">'+g.title+"</a></li>"}if(getElementById("gmaps_context_menu")){var h=getElementById("gmaps_context_menu");h.innerHTML=c;var i=h.getElementsByTagName("a"),j=i.length;for(f=0;j>f;f++){var k=i[f],l=function(c){c.preventDefault(),e[this.id.replace(a+"_","")].action.apply(d,[b]),d.hideContextMenu()};google.maps.event.clearListeners(k,"click"),google.maps.event.addDomListenerOnce(k,"click",l,!1)}var m=findAbsolutePosition.apply(this,[d.el]),n=m[0]+b.pixel.x-15,o=m[1]+b.pixel.y-15;h.style.left=n+"px",h.style.top=o+"px",h.style.display="block"}};this.buildContextMenu=function(a,b){if("marker"===a){b.pixel={};var c=new google.maps.OverlayView;c.setMap(d.map),c.draw=function(){var d=c.getProjection(),e=b.marker.getPosition();b.pixel=d.fromLatLngToContainerPixel(e),y(a,b)}}else y(a,b)},this.setContextMenu=function(a){window.context_menu[d.el.id][a.control]={};var c,e=b.createElement("ul");for(c in a.options)if(a.options.hasOwnProperty(c)){var f=a.options[c];window.context_menu[d.el.id][a.control][f.name]={title:f.title,action:f.action}}e.id="gmaps_context_menu",e.style.display="none",e.style.position="absolute",e.style.minWidth="100px",e.style.background="white",e.style.listStyle="none",e.style.padding="8px",e.style.boxShadow="2px 2px 6px #ccc",b.body.appendChild(e);var g=getElementById("gmaps_context_menu");google.maps.event.addDomListener(g,"mouseout",function(a){a.relatedTarget&&this.contains(a.relatedTarget)||window.setTimeout(function(){g.style.display="none"},400)},!1)},this.hideContextMenu=function(){var a=getElementById("gmaps_context_menu");a&&(a.style.display="none")};for(var z=function(b,c){google.maps.event.addListener(b,c,function(b){void 0==b&&(b=this),a[c].apply(this,[b]),d.hideContextMenu()})},A=0;A<f.length;A++){var B=f[A];B in a&&z(this.map,B)}for(var A=0;A<g.length;A++){var B=g[A];B in a&&z(this.map,B)}google.maps.event.addListener(this.map,"rightclick",function(b){a.rightclick&&a.rightclick.apply(this,[b]),void 0!=window.context_menu[d.el.id].map&&d.buildContextMenu("map",b)}),this.refresh=function(){google.maps.event.trigger(this.map,"resize")},this.fitZoom=function(){var c,a=[],b=this.markers.length;for(c=0;b>c;c++)a.push(this.markers[c].getPosition());this.fitLatLngBounds(a)},this.fitLatLngBounds=function(a){for(var b=a.length,c=new google.maps.LatLngBounds,d=0;b>d;d++)c.extend(a[d]);this.map.fitBounds(c)},this.setCenter=function(a,b,c){this.map.panTo(new google.maps.LatLng(a,b)),c&&c()},this.getElement=function(){return this.el},this.zoomIn=function(a){a=a||1,this.zoom=this.map.getZoom()+a,this.map.setZoom(this.zoom)},this.zoomOut=function(a){a=a||1,this.zoom=this.map.getZoom()-a,this.map.setZoom(this.zoom)};var D,C=[];for(D in this.map)"function"!=typeof this.map[D]||this[D]||C.push(D);for(e=0;e<C.length;e++)!function(a,b,c){a[c]=function(){return b[c].apply(b,arguments)}}(this,this.map,C[e])};return c}(this);GMaps.prototype.createControl=function(a){var b=document.createElement("div");b.style.cursor="pointer",b.style.fontFamily="Arial, sans-serif",b.style.fontSize="13px",b.style.boxShadow="rgba(0, 0, 0, 0.398438) 0px 2px 4px";for(var c in a.style)b.style[c]=a.style[c];a.id&&(b.id=a.id),a.classes&&(b.className=a.classes),a.content&&(b.innerHTML=a.content);for(var d in a.events)!function(b,c){google.maps.event.addDomListener(b,c,function(){a.events[c].apply(this,[this])})}(b,d);return b.index=1,b},GMaps.prototype.addControl=function(a){var b=google.maps.ControlPosition[a.position.toUpperCase()];delete a.position;var c=this.createControl(a);return this.controls.push(c),this.map.controls[b].push(c),c},GMaps.prototype.createMarker=function(a){if(void 0==a.lat&&void 0==a.lng&&void 0==a.position)throw"No latitude or longitude defined.";var b=this,c=a.details,d=a.fences,e=a.outside,f={position:new google.maps.LatLng(a.lat,a.lng),map:null};delete a.lat,delete a.lng,delete a.fences,delete a.outside;var g=extend_object(f,a),h=new google.maps.Marker(g);if(h.fences=d,a.infoWindow){h.infoWindow=new google.maps.InfoWindow(a.infoWindow);for(var i=["closeclick","content_changed","domready","position_changed","zindex_changed"],j=0;j<i.length;j++)!function(b,c){a.infoWindow[c]&&google.maps.event.addListener(b,c,function(b){a.infoWindow[c].apply(this,[b])})}(h.infoWindow,i[j])}for(var k=["animation_changed","clickable_changed","cursor_changed","draggable_changed","flat_changed","icon_changed","position_changed","shadow_changed","shape_changed","title_changed","visible_changed","zindex_changed"],l=["dblclick","drag","dragend","dragstart","mousedown","mouseout","mouseover","mouseup"],j=0;j<k.length;j++)!function(b,c){a[c]&&google.maps.event.addListener(b,c,function(){a[c].apply(this,[this])})}(h,k[j]);for(var j=0;j<l.length;j++)!function(b,c,d){a[d]&&google.maps.event.addListener(c,d,function(c){c.pixel||(c.pixel=b.getProjection().fromLatLngToPoint(c.latLng)),a[d].apply(this,[c])})}(this.map,h,l[j]);return google.maps.event.addListener(h,"click",function(){this.details=c,a.click&&a.click.apply(this,[this]),h.infoWindow&&(b.hideInfoWindows(),h.infoWindow.open(b.map,h))}),google.maps.event.addListener(h,"rightclick",function(c){c.marker=this,a.rightclick&&a.rightclick.apply(this,[c]),void 0!=window.context_menu[b.el.id].marker&&b.buildContextMenu("marker",c)}),h.fences&&google.maps.event.addListener(h,"dragend",function(){b.checkMarkerGeofence(h,function(a,b){e(a,b)})}),h},GMaps.prototype.addMarker=function(a){var b;if(a.hasOwnProperty("gm_accessors_"))b=a;else{if(!(a.hasOwnProperty("lat")&&a.hasOwnProperty("lng")||a.position))throw"No latitude or longitude defined.";b=this.createMarker(a)}return b.setMap(this.map),this.markerClusterer&&this.markerClusterer.addMarker(b),this.markers.push(b),GMaps.fire("marker_added",b,this),b},GMaps.prototype.addMarkers=function(a){for(var c,b=0;c=a[b];b++)this.addMarker(c);return this.markers},GMaps.prototype.hideInfoWindows=function(){for(var b,a=0;b=this.markers[a];a++)b.infoWindow&&b.infoWindow.close()},GMaps.prototype.removeMarker=function(a){for(var b=0;b<this.markers.length;b++)if(this.markers[b]===a){this.markers[b].setMap(null),this.markers.splice(b,1),GMaps.fire("marker_removed",a,this);break}return a},GMaps.prototype.removeMarkers=function(a){for(var a=a||this.markers,b=0;b<this.markers.length;b++)this.markers[b]===a[b]&&this.markers[b].setMap(null);for(var c=[],b=0;b<this.markers.length;b++)null!=this.markers[b].getMap()&&c.push(this.markers[b]);this.markers=c},GMaps.prototype.drawOverlay=function(a){var b=new google.maps.OverlayView,c=!0;return b.setMap(this.map),null!=a.auto_show&&(c=a.auto_show),b.onAdd=function(){var c=document.createElement("div");c.style.borderStyle="none",c.style.borderWidth="0px",c.style.position="absolute",c.style.zIndex=100,c.innerHTML=a.content,b.el=c,a.layer||(a.layer="overlayLayer");var d=this.getPanes(),e=d[a.layer],f=["contextmenu","DOMMouseScroll","dblclick","mousedown"];e.appendChild(c);for(var g=0;g<f.length;g++)!function(a,b){google.maps.event.addDomListener(a,b,function(a){-1!=navigator.userAgent.toLowerCase().indexOf("msie")&&document.all?(a.cancelBubble=!0,a.returnValue=!1):a.stopPropagation()})}(c,f[g]);google.maps.event.trigger(this,"ready")},b.draw=function(){var d=this.getProjection(),e=d.fromLatLngToDivPixel(new google.maps.LatLng(a.lat,a.lng));a.horizontalOffset=a.horizontalOffset||0,a.verticalOffset=a.verticalOffset||0;var f=b.el,g=f.children[0],h=g.clientHeight,i=g.clientWidth;switch(a.verticalAlign){case"top":f.style.top=e.y-h+a.verticalOffset+"px";break;default:case"middle":f.style.top=e.y-h/2+a.verticalOffset+"px";break;case"bottom":f.style.top=e.y+a.verticalOffset+"px"}switch(a.horizontalAlign){case"left":f.style.left=e.x-i+a.horizontalOffset+"px";break;default:case"center":f.style.left=e.x-i/2+a.horizontalOffset+"px";break;case"right":f.style.left=e.x+a.horizontalOffset+"px"}f.style.display=c?"block":"none",c||a.show.apply(this,[f])},b.onRemove=function(){var c=b.el;a.remove?a.remove.apply(this,[c]):(b.el.parentNode.removeChild(b.el),b.el=null)},this.overlays.push(b),b},GMaps.prototype.removeOverlay=function(a){for(var b=0;b<this.overlays.length;b++)if(this.overlays[b]===a){this.overlays[b].setMap(null),this.overlays.splice(b,1);break}},GMaps.prototype.removeOverlays=function(){for(var b,a=0;b=this.overlays[a];a++)b.setMap(null);this.overlays=[]},GMaps.prototype.drawPolyline=function(a){var b=[],c=a.path;if(c.length)if(void 0===c[0][0])b=c;else for(var e,d=0;e=c[d];d++)b.push(new google.maps.LatLng(e[0],e[1]));var f={map:this.map,path:b,strokeColor:a.strokeColor,strokeOpacity:a.strokeOpacity,strokeWeight:a.strokeWeight,geodesic:a.geodesic,clickable:!0,editable:!1,visible:!0};a.hasOwnProperty("clickable")&&(f.clickable=a.clickable),a.hasOwnProperty("editable")&&(f.editable=a.editable),a.hasOwnProperty("icons")&&(f.icons=a.icons),a.hasOwnProperty("zIndex")&&(f.zIndex=a.zIndex);for(var g=new google.maps.Polyline(f),h=["click","dblclick","mousedown","mousemove","mouseout","mouseover","mouseup","rightclick"],i=0;i<h.length;i++)!function(b,c){a[c]&&google.maps.event.addListener(b,c,function(b){a[c].apply(this,[b])})}(g,h[i]);return this.polylines.push(g),GMaps.fire("polyline_added",g,this),g},GMaps.prototype.removePolyline=function(a){for(var b=0;b<this.polylines.length;b++)if(this.polylines[b]===a){this.polylines[b].setMap(null),this.polylines.splice(b,1),GMaps.fire("polyline_removed",a,this);break}},GMaps.prototype.removePolylines=function(){for(var b,a=0;b=this.polylines[a];a++)b.setMap(null);this.polylines=[]},GMaps.prototype.drawCircle=function(a){a=extend_object({map:this.map,center:new google.maps.LatLng(a.lat,a.lng)},a),delete a.lat,delete a.lng;for(var b=new google.maps.Circle(a),c=["click","dblclick","mousedown","mousemove","mouseout","mouseover","mouseup","rightclick"],d=0;d<c.length;d++)!function(b,c){a[c]&&google.maps.event.addListener(b,c,function(b){a[c].apply(this,[b])})}(b,c[d]);return this.polygons.push(b),b},GMaps.prototype.drawRectangle=function(a){a=extend_object({map:this.map},a);var b=new google.maps.LatLngBounds(new google.maps.LatLng(a.bounds[0][0],a.bounds[0][1]),new google.maps.LatLng(a.bounds[1][0],a.bounds[1][1]));a.bounds=b;for(var c=new google.maps.Rectangle(a),d=["click","dblclick","mousedown","mousemove","mouseout","mouseover","mouseup","rightclick"],e=0;e<d.length;e++)!function(b,c){a[c]&&google.maps.event.addListener(b,c,function(b){a[c].apply(this,[b])})}(c,d[e]);return this.polygons.push(c),c},GMaps.prototype.drawPolygon=function(a){var b=!1;a.hasOwnProperty("useGeoJSON")&&(b=a.useGeoJSON),delete a.useGeoJSON,a=extend_object({map:this.map},a),0==b&&(a.paths=[a.paths.slice(0)]),a.paths.length>0&&a.paths[0].length>0&&(a.paths=array_flat(array_map(a.paths,arrayToLatLng,b)));for(var c=new google.maps.Polygon(a),d=["click","dblclick","mousedown","mousemove","mouseout","mouseover","mouseup","rightclick"],e=0;e<d.length;e++)!function(b,c){a[c]&&google.maps.event.addListener(b,c,function(b){a[c].apply(this,[b])})}(c,d[e]);return this.polygons.push(c),GMaps.fire("polygon_added",c,this),c},GMaps.prototype.removePolygon=function(a){for(var b=0;b<this.polygons.length;b++)if(this.polygons[b]===a){this.polygons[b].setMap(null),this.polygons.splice(b,1),GMaps.fire("polygon_removed",a,this);break}},GMaps.prototype.removePolygons=function(){for(var b,a=0;b=this.polygons[a];a++)b.setMap(null);this.polygons=[]},GMaps.prototype.getFromFusionTables=function(a){var b=a.events;delete a.events;var c=a,d=new google.maps.FusionTablesLayer(c);for(var e in b)!function(a,c){google.maps.event.addListener(a,c,function(a){b[c].apply(this,[a])})}(d,e);return this.layers.push(d),d},GMaps.prototype.loadFromFusionTables=function(a){var b=this.getFromFusionTables(a);return b.setMap(this.map),b},GMaps.prototype.getFromKML=function(a){var b=a.url,c=a.events;delete a.url,delete a.events;var d=a,e=new google.maps.KmlLayer(b,d);for(var f in c)!function(a,b){google.maps.event.addListener(a,b,function(a){c[b].apply(this,[a])})}(e,f);return this.layers.push(e),e},GMaps.prototype.loadFromKML=function(a){var b=this.getFromKML(a);return b.setMap(this.map),b},GMaps.prototype.addLayer=function(a,b){b=b||{};var c;switch(a){case"weather":this.singleLayers.weather=c=new google.maps.weather.WeatherLayer;break;case"clouds":this.singleLayers.clouds=c=new google.maps.weather.CloudLayer;break;case"traffic":this.singleLayers.traffic=c=new google.maps.TrafficLayer;break;case"transit":this.singleLayers.transit=c=new google.maps.TransitLayer;break;case"bicycling":this.singleLayers.bicycling=c=new google.maps.BicyclingLayer;break;case"panoramio":this.singleLayers.panoramio=c=new google.maps.panoramio.PanoramioLayer,c.setTag(b.filter),delete b.filter,b.click&&google.maps.event.addListener(c,"click",function(a){b.click(a),delete b.click});break;case"places":if(this.singleLayers.places=c=new google.maps.places.PlacesService(this.map),b.search||b.nearbySearch){var d={bounds:b.bounds||null,keyword:b.keyword||null,location:b.location||null,name:b.name||null,radius:b.radius||null,rankBy:b.rankBy||null,types:b.types||null};b.search&&c.search(d,b.search),b.nearbySearch&&c.nearbySearch(d,b.nearbySearch)}if(b.textSearch){var e={bounds:b.bounds||null,location:b.location||null,query:b.query||null,radius:b.radius||null};c.textSearch(e,b.textSearch)}}return void 0!==c?("function"==typeof c.setOptions&&c.setOptions(b),"function"==typeof c.setMap&&c.setMap(this.map),c):void 0},GMaps.prototype.removeLayer=function(a){if("string"==typeof a&&void 0!==this.singleLayers[a])this.singleLayers[a].setMap(null),delete this.singleLayers[a];else for(var b=0;b<this.layers.length;b++)if(this.layers[b]===a){this.layers[b].setMap(null),this.layers.splice(b,1);break}};var travelMode,unitSystem;GMaps.prototype.getRoutes=function(a){switch(a.travelMode){case"bicycling":travelMode=google.maps.TravelMode.BICYCLING;break;case"transit":travelMode=google.maps.TravelMode.TRANSIT;break;case"driving":travelMode=google.maps.TravelMode.DRIVING;break;default:travelMode=google.maps.TravelMode.WALKING}unitSystem="imperial"===a.unitSystem?google.maps.UnitSystem.IMPERIAL:google.maps.UnitSystem.METRIC;var b={avoidHighways:!1,avoidTolls:!1,optimizeWaypoints:!1,waypoints:[]},c=extend_object(b,a);c.origin=/string/.test(typeof a.origin)?a.origin:new google.maps.LatLng(a.origin[0],a.origin[1]),c.destination=/string/.test(typeof a.destination)?a.destination:new google.maps.LatLng(a.destination[0],a.destination[1]),c.travelMode=travelMode,c.unitSystem=unitSystem,delete c.callback;var d=this,e=new google.maps.DirectionsService;e.route(c,function(b,c){if(c===google.maps.DirectionsStatus.OK)for(var e in b.routes)b.routes.hasOwnProperty(e)&&d.routes.push(b.routes[e]);a.callback&&a.callback(d.routes)})},GMaps.prototype.removeRoutes=function(){this.routes=[]},GMaps.prototype.getElevations=function(a){a=extend_object({locations:[],path:!1,samples:256},a),a.locations.length>0&&a.locations[0].length>0&&(a.locations=array_flat(array_map([a.locations],arrayToLatLng,!1)));var b=a.callback;delete a.callback;var c=new google.maps.ElevationService;if(a.path){var d={path:a.locations,samples:a.samples};c.getElevationAlongPath(d,function(a,c){b&&"function"==typeof b&&b(a,c)})}else delete a.path,delete a.samples,c.getElevationForLocations(a,function(a,c){b&&"function"==typeof b&&b(a,c)})},GMaps.prototype.cleanRoute=GMaps.prototype.removePolylines,GMaps.prototype.drawRoute=function(a){var b=this;this.getRoutes({origin:a.origin,destination:a.destination,travelMode:a.travelMode,waypoints:a.waypoints,unitSystem:a.unitSystem,callback:function(c){c.length>0&&(b.drawPolyline({path:c[c.length-1].overview_path,strokeColor:a.strokeColor,strokeOpacity:a.strokeOpacity,strokeWeight:a.strokeWeight}),a.callback&&a.callback(c[c.length-1]))}})},GMaps.prototype.travelRoute=function(a){if(a.origin&&a.destination)this.getRoutes({origin:a.origin,destination:a.destination,travelMode:a.travelMode,waypoints:a.waypoints,callback:function(b){if(b.length>0&&a.start&&a.start(b[b.length-1]),b.length>0&&a.step){var c=b[b.length-1];if(c.legs.length>0)for(var f,d=c.legs[0].steps,e=0;f=d[e];e++)f.step_number=e,a.step(f,c.legs[0].steps.length-1)}b.length>0&&a.end&&a.end(b[b.length-1])}});else if(a.route&&a.route.legs.length>0)for(var d,b=a.route.legs[0].steps,c=0;d=b[c];c++)d.step_number=c,a.step(d)},GMaps.prototype.drawSteppedRoute=function(a){var b=this;if(a.origin&&a.destination)this.getRoutes({origin:a.origin,destination:a.destination,travelMode:a.travelMode,waypoints:a.waypoints,callback:function(c){if(c.length>0&&a.start&&a.start(c[c.length-1]),c.length>0&&a.step){var d=c[c.length-1];if(d.legs.length>0)for(var g,e=d.legs[0].steps,f=0;g=e[f];f++)g.step_number=f,b.drawPolyline({path:g.path,strokeColor:a.strokeColor,strokeOpacity:a.strokeOpacity,strokeWeight:a.strokeWeight}),a.step(g,d.legs[0].steps.length-1)}c.length>0&&a.end&&a.end(c[c.length-1])}});else if(a.route&&a.route.legs.length>0)for(var e,c=a.route.legs[0].steps,d=0;e=c[d];d++)e.step_number=d,b.drawPolyline({path:e.path,strokeColor:a.strokeColor,strokeOpacity:a.strokeOpacity,strokeWeight:a.strokeWeight}),a.step(e)},GMaps.Route=function(a){this.origin=a.origin,this.destination=a.destination,this.waypoints=a.waypoints,this.map=a.map,this.route=a.route,this.step_count=0,this.steps=this.route.legs[0].steps,this.steps_length=this.steps.length,this.polyline=this.map.drawPolyline({path:new google.maps.MVCArray,strokeColor:a.strokeColor,strokeOpacity:a.strokeOpacity,strokeWeight:a.strokeWeight}).getPath()},GMaps.Route.prototype.getRoute=function(a){var b=this;this.map.getRoutes({origin:this.origin,destination:this.destination,travelMode:a.travelMode,waypoints:this.waypoints||[],callback:function(){b.route=e[0],a.callback&&a.callback.call(b)}})},GMaps.Route.prototype.back=function(){if(this.step_count>0){this.step_count--;var a=this.route.legs[0].steps[this.step_count].path;for(var b in a)a.hasOwnProperty(b)&&this.polyline.pop()}},GMaps.Route.prototype.forward=function(){if(this.step_count<this.steps_length){var a=this.route.legs[0].steps[this.step_count].path;for(var b in a)a.hasOwnProperty(b)&&this.polyline.push(a[b]);this.step_count++}},GMaps.prototype.checkGeofence=function(a,b,c){return c.containsLatLng(new google.maps.LatLng(a,b))},GMaps.prototype.checkMarkerGeofence=function(a,b){if(a.fences)for(var d,c=0;d=a.fences[c];c++){var e=a.getPosition();this.checkGeofence(e.lat(),e.lng(),d)||b(a,d)}},GMaps.prototype.toImage=function(a){var a=a||{},b={};if(b.size=a.size||[this.el.clientWidth,this.el.clientHeight],b.lat=this.getCenter().lat(),b.lng=this.getCenter().lng(),this.markers.length>0){b.markers=[];for(var c=0;c<this.markers.length;c++)b.markers.push({lat:this.markers[c].getPosition().lat(),lng:this.markers[c].getPosition().lng()})}if(this.polylines.length>0){var d=this.polylines[0];b.polyline={},b.polyline.path=google.maps.geometry.encoding.encodePath(d.getPath()),b.polyline.strokeColor=d.strokeColor,b.polyline.strokeOpacity=d.strokeOpacity,b.polyline.strokeWeight=d.strokeWeight}return GMaps.staticMapURL(b)},GMaps.staticMapURL=function(a){function t(a,b){if("#"===a[0]&&(a=a.replace("#","0x"),b)){if(b=parseFloat(b),b=Math.min(1,Math.max(b,0)),0===b)return"0x00000000";b=(255*b).toString(16),1===b.length&&(b+=b),a=a.slice(0,8)+b}return a}var c,b=[],d="http://maps.googleapis.com/maps/api/staticmap";a.url&&(d=a.url,delete a.url),d+="?";var e=a.markers;delete a.markers,!e&&a.marker&&(e=[a.marker],delete a.marker);var f=a.styles;delete a.styles;var g=a.polyline;if(delete a.polyline,a.center)b.push("center="+a.center),delete a.center;else if(a.address)b.push("center="+a.address),delete a.address;else if(a.lat)b.push(["center=",a.lat,",",a.lng].join("")),delete a.lat,delete a.lng;else if(a.visible){var h=encodeURI(a.visible.join("|"));b.push("visible="+h)}var i=a.size;i?(i.join&&(i=i.join("x")),delete a.size):i="630x300",b.push("size="+i),a.zoom||a.zoom===!1||(a.zoom=15);var j=a.hasOwnProperty("sensor")?!!a.sensor:!0;delete a.sensor,b.push("sensor="+j);for(var k in a)a.hasOwnProperty(k)&&b.push(k+"="+a[k]);if(e)for(var l,m,n=0;c=e[n];n++){l=[],c.size&&"normal"!==c.size?(l.push("size:"+c.size),delete c.size):c.icon&&(l.push("icon:"+encodeURI(c.icon)),delete c.icon),c.color&&(l.push("color:"+c.color.replace("#","0x")),delete c.color),c.label&&(l.push("label:"+c.label[0].toUpperCase()),delete c.label),m=c.address?c.address:c.lat+","+c.lng,delete c.address,delete c.lat,delete c.lng;for(var k in c)c.hasOwnProperty(k)&&l.push(k+":"+c[k]);l.length||0===n?(l.push(m),l=l.join("|"),b.push("markers="+encodeURI(l))):(l=b.pop()+encodeURI("|"+m),b.push(l))}if(f)for(var n=0;n<f.length;n++){var o=[];f[n].featureType&&"all"!=f[n].featureType&&o.push("feature:"+f[n].featureType),f[n].elementType&&"all"!=f[n].elementType&&o.push("element:"+f[n].elementType);for(var p=0;p<f[n].stylers.length;p++)for(var q in f[n].stylers[p]){var r=f[n].stylers[p][q];("hue"==q||"color"==q)&&(r="0x"+r.substring(1)),o.push(q+":"+r)}var s=o.join("|");""!=s&&b.push("style="+s)}if(g){if(c=g,g=[],c.strokeWeight&&g.push("weight:"+parseInt(c.strokeWeight,10)),c.strokeColor){var u=t(c.strokeColor,c.strokeOpacity);g.push("color:"+u)}if(c.fillColor){var v=t(c.fillColor,c.fillOpacity);g.push("fillcolor:"+v)}var w=c.path;if(w.join)for(var x,p=0;x=w[p];p++)g.push(x.join(","));else g.push("enc:"+w);g=g.join("|"),b.push("path="+encodeURI(g))}return b=b.join("&"),d+b},GMaps.prototype.addMapType=function(a,b){if(!b.hasOwnProperty("getTileUrl")||"function"!=typeof b.getTileUrl)throw"'getTileUrl' function required.";b.tileSize=b.tileSize||new google.maps.Size(256,256);var c=new google.maps.ImageMapType(b);this.map.mapTypes.set(a,c)},GMaps.prototype.addOverlayMapType=function(a){if(!a.hasOwnProperty("getTile")||"function"!=typeof a.getTile)throw"'getTile' function required.";var b=a.index;delete a.index,this.map.overlayMapTypes.insertAt(b,a)},GMaps.prototype.removeOverlayMapType=function(a){this.map.overlayMapTypes.removeAt(a)},GMaps.prototype.addStyle=function(a){var b=new google.maps.StyledMapType(a.styles,{name:a.styledMapName});this.map.mapTypes.set(a.mapTypeId,b)},GMaps.prototype.setStyle=function(a){this.map.setMapTypeId(a)},GMaps.prototype.createPanorama=function(a){return a.hasOwnProperty("lat")&&a.hasOwnProperty("lng")||(a.lat=this.getCenter().lat(),a.lng=this.getCenter().lng()),this.panorama=GMaps.createPanorama(a),this.map.setStreetView(this.panorama),this.panorama},GMaps.createPanorama=function(a){var b=getElementById(a.el,a.context);a.position=new google.maps.LatLng(a.lat,a.lng),delete a.el,delete a.context,delete a.lat,delete a.lng;for(var c=["closeclick","links_changed","pano_changed","position_changed","pov_changed","resize","visible_changed"],d=extend_object({visible:!0},a),e=0;e<c.length;e++)delete d[c[e]];for(var f=new google.maps.StreetViewPanorama(b,d),e=0;e<c.length;e++)!function(b,c){a[c]&&google.maps.event.addListener(b,c,function(){a[c].apply(this)})}(f,c[e]);return f},GMaps.prototype.on=function(a,b){return GMaps.on(a,this,b)},GMaps.prototype.off=function(a){GMaps.off(a,this)},GMaps.custom_events=["marker_added","marker_removed","polyline_added","polyline_removed","polygon_added","polygon_removed","geolocated","geolocation_failed"],GMaps.on=function(a,b,c){if(-1==GMaps.custom_events.indexOf(a))return google.maps.event.addListener(b,a,c);var d={handler:c,eventName:a};return b.registered_events[a]=b.registered_events[a]||[],b.registered_events[a].push(d),d},GMaps.off=function(a,b){-1==GMaps.custom_events.indexOf(a)?google.maps.event.clearListeners(b,a):b.registered_events[a]=[]},GMaps.fire=function(a,b,c){if(-1==GMaps.custom_events.indexOf(a))google.maps.event.trigger(b,a,Array.prototype.slice.apply(arguments).slice(2));else if(a in c.registered_events)for(var d=c.registered_events[a],e=0;e<d.length;e++)!function(a,b,c){a.apply(b,[c])}(d[e].handler,c,b)},GMaps.geolocate=function(a){var b=a.always||a.complete;navigator.geolocation?navigator.geolocation.getCurrentPosition(function(c){a.success(c),b&&b()},function(c){a.error(c),b&&b()},a.options):(a.not_supported(),b&&b())},GMaps.geocode=function(a){this.geocoder=new google.maps.Geocoder;var b=a.callback;a.hasOwnProperty("lat")&&a.hasOwnProperty("lng")&&(a.latLng=new google.maps.LatLng(a.lat,a.lng)),delete a.lat,delete a.lng,delete a.callback,this.geocoder.geocode(a,function(a,c){b(a,c)})},google.maps.Polygon.prototype.getBounds||(google.maps.Polygon.prototype.getBounds=function(){for(var d,b=new google.maps.LatLngBounds,c=this.getPaths(),e=0;e<c.getLength();e++){d=c.getAt(e);for(var f=0;f<d.getLength();f++)b.extend(d.getAt(f))}return b}),google.maps.Polygon.prototype.containsLatLng||(google.maps.Polygon.prototype.containsLatLng=function(a){var b=this.getBounds();if(null!==b&&!b.contains(a))return!1;for(var c=!1,d=this.getPaths().getLength(),e=0;d>e;e++)for(var f=this.getPaths().getAt(e),g=f.getLength(),h=g-1,i=0;g>i;i++){var j=f.getAt(i),k=f.getAt(h);(j.lng()<a.lng()&&k.lng()>=a.lng()||k.lng()<a.lng()&&j.lng()>=a.lng())&&j.lat()+(a.lng()-j.lng())/(k.lng()-j.lng())*(k.lat()-j.lat())<a.lat()&&(c=!c),h=i}return c}),google.maps.LatLngBounds.prototype.containsLatLng=function(a){return this.contains(a)},google.maps.Marker.prototype.setFences=function(a){this.fences=a},google.maps.Marker.prototype.addFence=function(a){this.fences.push(a)},google.maps.Marker.prototype.getId=function(){return this.__gm_id},Array.prototype.indexOf||(Array.prototype.indexOf=function(a){"use strict";if(null==this)throw new TypeError;var b=Object(this),c=b.length>>>0;if(0===c)return-1;var d=0;if(arguments.length>1&&(d=Number(arguments[1]),d!=d?d=0:0!=d&&1/0!=d&&d!=-1/0&&(d=(d>0||-1)*Math.floor(Math.abs(d)))),d>=c)return-1;for(var e=d>=0?d:Math.max(c-Math.abs(d),0);c>e;e++)if(e in b&&b[e]===a)return e;return-1});