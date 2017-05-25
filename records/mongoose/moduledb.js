const   consts = require(`./consts`),
        mongoose = require (`mongoose`);

mongoose.connect(consts.MLAB_KEY);
mongoose.Promise = global.Promise;

var conn  = mongoose.connection; //get default connection
var Record = require(`./record_schema.js`);

conn.on ('error', (err) => {
    console.log(`connection error: ${err}`);
    console.log(consts.MLAB_KEY);
});

conn.once('open',
    () => {
        console.log('connected');
});


module.exports = class RecordsDB {

    static showAllRecords() {
        return Record.find();
    }

    static findSeriesByName(name) {
        return Record.find({'seriesName': name});
    }

    static getSeries(channel,category) {
        return Record.find({'channel': channel,'category':category});
    }
} 

