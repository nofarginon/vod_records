const   express=require('express'),
        bodyParser=require('body-parser'),
        app=express(),
        port=process.env.PORT || 3000;

var series_records=require('./records/module.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}));

app.use('/assets', express.static(`${__dirname}/public`));
app.use(express.static(__dirname + '/public'));

app.all('*',function(req,res,next){
    console.log("yes vod");
    req.next();
});

app.get('/',function(req,res){
    res.sendFile(`assets/`);
});

app.get('/showAllRecords',function(req,res){
    console.log("showAllRecords");
    res.status(200).json(series_records.showAllRecords());
});

app.post('/findSeriesByName',function(req,res){
    console.log("findSeriesByName");
    res.status(200).json(series_records.findSeriesByName(req.body.name));
});

app.post('/getSeries',function(req,res){
    console.log("getSeries");
    res.status(200).json(series_records.getSeries(req.body.channel,req.body.category));
});

app.listen(port);
console.log(`server is listening on port ${port}`);