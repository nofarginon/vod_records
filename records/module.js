var records= require("./data/records.json");

exports.showAllRecords = function(){
    return {"Records on this device" : records.RecordsSeries};
}

exports.findSeriesByName = function(name){
    let foundSeries=false;
    for(let i in records.RecordsSeries){
        var ser=records.RecordsSeries[i];
        if(ser.seriesName==name){
            console.log("findSeriesByName was found");
            foundSeries=true;
            return {"your request":ser}
        }
    }
    if(!foundSeries){
        console.log("findSeriesByName not found");
        return{"error":"series not found by name"};
    }
}

exports.getSeries = function(channel,category){
    var series=[];
    let foundSeries=false;
    for(let i in records.RecordsSeries){
        var ser=records.RecordsSeries[i];
        if((ser.channel==channel)&&(ser.category==category)){
            console.log("getSeries by channel+category found");
            foundSeries=true;
            series.push(ser);
        }
    }
    if(foundSeries) return {"match series ":series}
    else{
        console.log("getSeries by channel+category not found");
        return{"error":"series not found by channel+category"};
    }
}
