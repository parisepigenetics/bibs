glimma.layout.setupGrid(d3.select(".container"), "md", [1,2]);
glimma.storage.chartData.push(glimma.transform.toRowMajor({"dim1":[-0.8672,-0.9643,-0.9846,1.006,0.8366,0.9731],"dim2":[0.2529,-0.1525,-0.1724,-1.169,0.9415,0.299],"dim3":[0.276,-0.206,-0.001504,-0.3182,-0.8529,1.103],"dim4":[1.118,-0.4901,-0.5589,0.2807,-0.03305,-0.3167],"dim5":[-0.01035,0.9097,-0.8853,-0.03103,-0.08193,0.09898],"label":["D197-D192T27r","D197-D192T28r","D197-D192T29r","D197-D192T33r","D197-D192T34r","D197-D192T35r"],"condition":["J0_WT","J0_WT","J0_WT","J10_WT","J10_WT","J10_WT"],"sizeFactor":[1.08,1.035,0.9815,0.9861,1.044,0.9946]}));
glimma.storage.chartInfo.push({"x":"dim1","y":"dim2","id":[],"ndigits":[],"signif":6,"pntsize":4,"xlab":"Dimension 1","ylab":"Dimension 2","xjitter":0,"yjitter":0,"xord":false,"yord":false,"xlog":false,"ylog":false,"xgrid":false,"ygrid":false,"xstep":false,"ystep":false,"col":"condition","cfixed":false,"anno":["label","condition","sizeFactor","dim1","dim2"],"annoLabels":[],"height":400,"width":500,"type":"scatter","title":"MDS Plot","flag":[],"info":{"groupsNames":["condition","sizeFactor"]},"hide":false,"disableClick":false,"disableHover":false,"disableZoom":false});
glimma.storage.charts.push(glimma.chart.scatterChart().height(400).width(500).size(function (d) { return 4; }).x(function (d) { return d["dim1"]; }).xlab("Dimension 1").xJitter(0).y(function (d) { return d["dim2"]; }).ylab("Dimension 2").yJitter(0).tooltip(glimma.storage.chartInfo[0].anno).title(glimma.storage.chartInfo[0].title).signif(6).col(function(d) { return d["condition"]; }));
glimma.storage.chartData.push(glimma.transform.toRowMajor({"name":[1,2,3,4,5],"eigen":[0.39,0.18,0.16,0.15,0.12]}));
glimma.storage.chartInfo.push({"names":"name","y":"eigen","ndigits":[],"signif":6,"xlab":"Dimension","ylab":"Proportion","col":[],"anno":"eigen","height":300,"width":300,"type":"bar","title":"Variance Explained","flag":[],"info":{"dims":5}});
glimma.storage.charts.push(glimma.chart.barChart().height(300).width(300).id(function (d) { return d["name"]; }).xlab("Dimension").y(function (d) { return d["eigen"]; }).ylab("Proportion").title(glimma.storage.chartInfo[1].title).signif(6));
glimma.storage.tables.push(glimma.chart.table().data(glimma.storage.chartData[0]).columns(["label","condition","sizeFactor"]));
glimma.layout.addTable(glimma.layout.bsAddRow(d3.select(".container")));
glimma.storage.linkage = [{"from":2,"to":1,"src":"none","dest":"none","flag":"mds","info":"none"},{"from":1,"to":1,"src":"click","dest":"highlightById","flag":"tablink","info":"none"}];
glimma.storage.input = [];
