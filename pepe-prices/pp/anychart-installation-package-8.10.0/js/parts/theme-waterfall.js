if(!_.theme_waterfall){_.theme_waterfall=1;(function($){$.ra($.fa.anychart.themes.defaultTheme,{waterfall:{dataMode:"diff",connectorStroke:"#697474",defaultSeriesType:"waterfall",defaultSeriesSettings:{waterfall:{normal:{fill:"#96a6a6",stroke:"#697474",risingFill:"#64b5f6",fallingFill:"#ef6c00",risingStroke:"#467fac",fallingStroke:"#a74c00",risingHatchFill:!1,fallingHatchFill:!1,labels:{enabled:!0,format:function(){return $.VM(this.isTotal?this.absolute:this.diff)}}},hovered:{risingFill:$.aN,fallingFill:$.aN,risingStroke:$.iN,fallingStroke:$.iN,risingHatchFill:null,
fallingHatchFill:null},selected:{risingFill:"#333 0.85",fallingFill:"#333 0.85",risingStroke:"#333 0.85",fallingStroke:"#333 0.85",risingHatchFill:null,fallingHatchFill:null},tooltip:{format:function(){return this.isTotal?"Absolute: "+$.VM(this.absolute):"Absolute: "+$.VM(this.absolute)+"\nDifference: "+$.VM(this.diff)}}}},legend:{enabled:!0,itemsSourceMode:"categories"},scales:[{type:"ordinal"},{type:"linear",softMinimum:0,stackDirection:"reverse"}],stackLabels:{anchor:"auto",enabled:!1,format:"{%total}",
position:"auto"},connectors:{stroke:"#697474",labels:{format:"{%stack}",position:"auto",anchor:"auto"}},arrow:{connector:{stroke:"#697474"},label:{fontSize:"12px",position:"center",anchor:"center-top"}}}});}).call(this,$)}
