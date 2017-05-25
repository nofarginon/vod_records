const   express=require('express'),
        bodyParser=require('body-parser'),
        app=express(),
        port=process.env.PORT || 3000;

var RecordsDB = require('./records/mongoose/moduledb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}));

app.use('/assets', express.static(`${__dirname}/public`));
app.use(express.static(__dirname + '/public'));

app.all('*',function(req,res,next){
    console.log("yes vod");
    next();
});

app.get('/',function(req,res){
    res.sendFile(`assets/`);
});

app.get('/showAllRecords',function(req,res){
    console.log("showAllRecords");
    RecordsDB.showAllRecords().then( (docs) => res.json(docs) )
                              .catch((err)  => res.json({error: 'some error'}) );
});

app.post('/findSeriesByName',function(req,res){
    console.log("findSeriesByName");
    RecordsDB.findSeriesByName(req.body.name).then( (docs) => {
        if(docs.length === 0) res.json({"error": "series not found by name"});
        else res.json(docs)
    });

});

app.post('/getSeries',function(req,res){
    console.log("getSeries");
    RecordsDB.getSeries(req.body.channel,req.body.category).then( (docs) => {
        if(docs.length === 0) res.json({"error":"series not found by channel+category"});
        else res.json(docs)
    });
});

app.listen(port , () => console.log(`server is listening on port ${port}`));