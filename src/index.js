
      // Add AJAX requests for data
      var latinamerica = $.ajax({
        url:"https://raw.githubusercontent.com/Cadastro-Marinho/LatinAmericaData/master/LatinAmerica.geojson",
        dataType: "json",
        success: console.log("Latin America boundaries data successfully loaded."),
        error: function (xhr) {
          alert(xhr.statusText);
        }
      });
      
      var falklands = $.ajax({
        url:"https://raw.githubusercontent.com/Cadastro-Marinho/LatinAmericaData/master/malvinas.geojson",
        dataType: "json",
        success: console.log("Falklands data successfully loaded."),
        error: function (xhr) {
          alert(xhr.statusText);
        }
      });
      
      var eez = $.ajax({
        url:"https://raw.githubusercontent.com/Cadastro-Marinho/LatinAmericaData/master/EEZ.geojson",
        dataType: "json",
        success: console.log("Latin America EEZ data successfully loaded."),
        error: function (xhr) {
          alert(xhr.statusText);
        }
      });  
      
      var extensao = $.ajax({
        url:"https://raw.githubusercontent.com/Cadastro-Marinho/LatinAmericaData/master/extensao_PC/BRA_extensao_pc.geojson",
        dataType: "json",
        success: console.log("CP Extension data successfully loaded."),
        error: function (xhr) {
          alert(xhr.statusText);
        }
      });
      
      var lme = $.ajax({
        url:"https://raw.githubusercontent.com/Cadastro-Marinho/LatinAmericaData/master/LME66.geojson",
        dataType: "json",
        success: console.log("LME data successfully loaded."),
        error: function (xhr) {
          alert(xhr.statusText);
        }
      });     
      
      var fao = $.ajax({
        url:"https://raw.githubusercontent.com/Cadastro-Marinho/LatinAmericaData/master/FAO_Area.geojson",
        dataType: "json",
        success: console.log("FAO data successfully loaded."),
        error: function (xhr) {
          alert(xhr.statusText);
        }
      });
      
      var presal = $.ajax({
        url:"https://raw.githubusercontent.com/Cadastro-Marinho/BrasilData/master/ANP/presal.geojson",
        dataType: "json",
        success: console.log("PRÉ-SAL data successfully loaded."),
        error: function (xhr) {
          alert(xhr.statusText);
        }
      });
      
      var blocos_petroleo = $.ajax({
        url:"https://raw.githubusercontent.com/Cadastro-Marinho/BrasilData/master/ANP/blocos_exploratorios.geojson",
        dataType: "json",
        success: console.log("BLOCOS_EXPLORATÓRIOS data successfully loaded."),
        error: function (xhr) {
          alert(xhr.statusText);
        }
      });

      
      /* when().done() SECTION*/
      // Add the variable for each of your AJAX requests to $.when()
      $.when(latinamerica, falklands, eez, extensao, lme, fao).done(function() {
      
        // Initializes the map
        var map = L.map('map', {
            center: [-25, -75],
            attributionControl: false,
            zoomControl: false,
            zoom: 3,
            preferCanvas: false,
            fullscreenControl: true,
            fullscreenControlOptions: {
              position: 'topright'
            }
        });
        
        // Adds Esri Base Maps
        var WSM = L.tileLayer(
          'http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}.png', {
  			    maxZoom: 18,
  			    label: "World Street Map",
  			    attribution: 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
          });
          
        var Esri_WorldImagery = L.tileLayer(
          'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            maxNativeZoom: 19,
            maxZoom: 100,
            label: "Esri World Imagery",
            attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
        });
              
        var Esri_OceanBasemap = L.tileLayer(
          'https://server.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}', {
             maxZoom: 13,
             label: "Esri Ocean Basemap",
  	         attribution: 'Tiles &copy; Esri &mdash; Sources: GEBCO, NOAA, CHS, OSU, UNH, CSUMB, National Geographic, DeLorme, NAVTEQ, and Esri'
  	    });
  	    
        var Esri_NatGeoWorldMap = L.tileLayer(
          'https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}', {
            maxZoom: 16,
            label: 'Esri NatGeo World Map',
            attribution: 'Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC'
	          });
          
        // Adds Open Street Base Maps
        var OpenStreetMap_Mapnik = L.tileLayer(
          'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            label: "OpenStreetMap",
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        });
  
        var OpenTopoMap = L.tileLayer(
          'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
            maxZoom: 17,
            label: "OpenTopoMap",
            attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
        });
  
        // Adds WMS Layer (Marine Regions)
        var Ecoregions = L.tileLayer.wms(
          'http://geo.vliz.be/geoserver/Ecoregions/wms', {
            layers: 'ecoregions',
            transparency: true,
            opacity: 0.40
        });
        
        // Adds Bathymetry data
        var GEBCO = L.tileLayer.wms(
          'https://www.gebco.net/data_and_products/gebco_web_services/2019/mapserv?', {
            layers: 'GEBCO_2019_Grid'
          }
          
        );
        
        // Adds GeoJson Data
        
        var LatinAmerica = L.geoJSON(latinamerica.responseJSON, {
          style: function(feature) {
            return{
              fillOpacity: 0.25,
              color: '#f1f4c7',
              weight: 0.75
            };
          },
          onEachFeature: function( feature, layer ){
            layer.bindPopup(
              "<b>Nome: </b>" + feature.properties.LOCLNGNAM + "<br>" +
              "<b>Status: </b>" + feature.properties.STATUS + "<br>" +
              "<b>Área: </b>" + feature.properties.SQKM.toLocaleString('de-DE', { maximumFractionDigits: 2 }) + " km &#178; <br>" +
              "<b>População (2019): </b>" + feature.properties.POP_CNTRY.toLocaleString('de-DE', { maximumFractionDigits: 0 })
              );
            layer.bindTooltip(feature.properties.LOCSHRTNAM,{
              permanent: false
            });
          }
        }).addTo(map);
        
        var FALKLANDS = L.geoJSON(falklands.responseJSON, {
            style: {
              color: '#f1f4c7',
              weight: 2,
              fillOpacity: 0.25
            },
            onEachFeature: function( feature, layer ){
                           layer.bindPopup(
                             "<b>Descrição: </b>" + "Malvinas" + "<br>" +
                             "<b>Fonte: </b>" + "<a href= http://www.marineregions.org/gazetteer.php?p=details&id=47625 target='_blank'>Link.</a>" + "<br>" +
                             "<b>Área (km &#178; ): </b>" + "<br>" +
                             "<b>Obs.: </b>"
                           );
            }
          }
        ).addTo(map);
        
        function link(feature){
          return "<a href= http://www.marineregions.org/gazetteer.php?p=details&id=" + feature.properties.MRGID + " target='_blank'>Link.</a>"; 
        }
        
        function getAreaColor(feature){
          console.log(feature);
          	switch (feature.properties.POL_TYPE){
            	case '200NM' : return '#133863';
            	case 'Joint regime': return 'Gold';
              case 'Overlapping claim' : return 'Red';
              	break;
            }
        }
        
        function areaStyle(feature){
        	return {
          	fillColor: getAreaColor(feature),
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.40
          };
        }
        
        var EEZ = L.geoJSON(eez.responseJSON, {
         style: areaStyle,
          onEachFeature: function( feature, layer ){
                       layer.bindPopup(
                         "<b>Descrição: </b>" + feature.properties.GEONAME + "<br>" +
                         "<b>Tipo: </b>" + feature.properties.POL_TYPE + "<br>" +
                         "<b>Fonte: </b>" + link(feature) + "<br>" +
                         "<b>Área (km &#178; ): </b>" + feature.properties.AREA_KM2.toLocaleString('de-DE', { maximumFractionDigits: 2 }) + "<br>" 
                         );
          }
        }
        ).addTo(map);
        
        var EXTENSAO = L.geoJSON(extensao.responseJSON, {
          style: {
            color: 'LightGray',
            weight: 2,
            fillOpacity: 0.25
          },
          onEachFeature: function( feature, layer ){
                         layer.bindPopup(
                           "<b>Nome: </b>" + feature.properties.nome + "<br>" +
                           "<b>Região: </b>" +  feature.properties.regiao + "<br>" +
                           "<b>Área (km &#178; ): </b>"
                           );
          }
        }
        ).addTo(map);
      
        var LME = L.geoJSON(lme.responseJSON, {
            style: {
              color: 'Aquamarine',
              weight: 2,
              fillOpacity: 0.25
            },
            onEachFeature: function( feature, layer ){
                           layer.bindPopup(
                             "<b>Descrição: </b>" + feature.properties.LME_NAME + "<br>" +
                             "<b>Área (km &#178; ): </b>" + feature.properties.SUM_GIS_KM.toLocaleString('de-DE', { maximumFractionDigits: 2 }) 
                           );
            }
          }
        );
        
        function surface(feature){
          return feature.properties.SURFACE/1000000;
        }
        
        var FAO = L.geoJSON(fao.responseJSON, {
            style: {
              color: 'Chocolate',
              weight: 2,
              fillOpacity: 0.25
            },
            onEachFeature: function( feature, layer ){
                           layer.bindPopup(
                             "<b>Descrição: </b>" + feature.properties.NAME_ES + "<br>" +
                             "<b>Área (km &#178; ): </b>" + surface(feature).toLocaleString('de-DE', { maximumFractionDigits: 2 })+  "<br>" +
                             "<b>Oceano:  </b>" + feature.properties.OCEAN +  "<br>" +
                             "<b>Área FAO:  </b>" + feature.properties.F_AREA +  "<br>" +
                             "<b>Sub-área FAO:  </b>" + feature.properties.F_SUBAREA +  "<br>" +
                             "<b>Divisão FAO: </b>" + feature.properties.F_DIVISION
                           );
            }
          }
        );
        
        var PRESAL = L.geoJSON(presal.responseJSON, {
            style: {
              color: 'DarkSeaGreen',
              weight: 2,
              fillOpacity: 0.25
            },
            onEachFeature: function( feature, layer ){
                           layer.bindPopup(
                             "<b>Descrição: </b>" + feature.properties.NOME
                           );
            }
          }
        );
        
        function getBlocoColor(feature){
          console.log(feature);
          	switch (feature.properties.RODADA){
            	case 'Rodada 3' : return 'Orange';
            	case 'Rodada 6': return 'LightPink'
              case 'Rodada 7' : return 'LightGreen';
              case 'Rodada 9' : return 'Salmon';
              case 'Rodada 10': return 'LightSeaGreen';
              case 'Rodada 11': return 'OliveDrab';
              case 'Rodada 12': return 'DarkSlateBlue';
              case 'Rodada 13': return 'DarkOrange';
              case 'Rodada 14': return 'Orchid';
              case 'Rodada 15': return 'DarkSeaGreen';
              case 'Partilha 1': return 'Gainsboro';
              case 'Partilha 2': return 'Violet';
              case 'Partilha 3': return 'Pink';
              case 'Partilha 4': return 'Purple';
              case 'Partilha 5': return 'Aquamarine'
              	break;
            }
        }
        
        function blocoStyle(feature){
        	return {
          	fillColor: getBlocoColor(feature),
            weight: 1,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.40
          };
        }
        
        var BLOCOS_PETROLEO = L.geoJSON(blocos_petroleo.responseJSON, {
            style: blocoStyle,
            onEachFeature: function( feature, layer ){
                           layer.bindPopup(
                             "<b>Bloco: </b>" + feature.properties.NOM_BLOCO + "<br>" +
                             "<b>Bacia:  </b>" + feature.properties.NOM_BACIA +  "<br>" +
                             "<b>Área (km &#178; ): </b>" + feature.properties.AREA_TOTAL.toLocaleString('de-DE', { maximumFractionDigits: 2 })+  "<br>" +
                             "<b>Operador:  </b>" + feature.properties.OPERADOR_C +  "<br>" +
                             "<b>Rodada:  </b>" + feature.properties.RODADA +  "<br>" +
                             "<b>Data da Assinatura: </b>" + feature.properties.DAT_ASSINA +  "<br>" +
                             "<b>Número do contrato: </b>" + feature.properties.NUM_CONTRA +  "<br>" +
                             "<b>Número da descoberta: </b>" + feature.properties.NUM_DESCOB
                           );
            }
          }
        );
      
      // Add Minimap
      var miniMap = new L.Control.MiniMap(Esri_NatGeoWorldMap, {
          position: 'topright',
          toggleDisplay: true
        }
      ).addTo(map);
        
      var basemaps = [
              Esri_OceanBasemap, Esri_NatGeoWorldMap, Esri_WorldImagery, 
              OpenStreetMap_Mapnik , OpenTopoMap
              ];
            
      map.addControl(L.control.basemaps({
        basemaps: basemaps,
        tileX: 0,  // tile X coordinate
        tileY: 0,  // tile Y coordinate
        tileZ: 1   // tile zoom level
        })
      );
        
      var groupedOverlays = {
        "Limites territoriais":{
          "América Latina": LatinAmerica,
          //"Águas Internas": IW,
          //"Mar Territorial (12MN)": TS,
          //"Zona Contígua (24MN)": CZ,
          "Zona Econômica Exclusiva (200MN)": EEZ,
          "Extensão da PC": EXTENSAO
        },
        "Limites Ambientais":{
          "Ecoregions": Ecoregions,
          "Large Marine Ecosystems": LME,
          "FAO": FAO
        },
        "Batimetria": {
          "GEBCO (2019)": GEBCO
        },
        "Petróleo e Gás": {
          "Pré-Sal": PRESAL,
          "Blocos de Exploração": BLOCOS_PETROLEO
        }
        //"Ambiental": {
        //  "Unidades de Conservação": UC
        //},
      };
      
      L.control.groupedLayers(null, groupedOverlays, {
        position: 'topleft'
      }).addTo(map);
          
      L.control.mousePosition({
        position: 'bottomleft'
      }).addTo(map);
      
      L.control.betterscale({
        metric:  true,
        imperial: false,
        position: 'bottomleft'
      }).addTo(map);
      
      L.easyPrint({
        tileLayer: OpenStreetMap_Mapnik,
        title: 'Screenshot',
        position: 'topleft',
        sizeModes: ['Current', 'A4Landscape', 'A4Portrait'],
        exportOnly: true,
        hideControlContainer: false,
        hideClasses: ['leaflet-control-mouseposition', 'leaflet-control-layers',
        'leaflet-control-easyPrint', 'leaflet-control-zoom-fullscreen', 
        'basemaps']
      }).addTo(map);
      
      L.latlngGraticule({
			   showLabel: true,
			   color: '#222',
			   zoomInterval: [
			     {start: 2, end: 3, interval: 30},
			     {start: 4, end: 4, interval: 10},
			     {start: 5, end: 7, interval: 5},
			     {start: 8, end: 10, interval: 1},
			     {start: 11, end:15, interval: 0.2}
			   ]
		  }).addTo(map);        

      });
