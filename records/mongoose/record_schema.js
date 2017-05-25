var     mongoose = require (`mongoose`),
        schema = mongoose.Schema,
        recordSchema = new schema({
            id: {type: Number, index: 1, required: true},
            seriesName: String,
            season: [Number],
            channel:Number,
            category:String
    },{collection:`RecordsSeries`});

var Record = mongoose.model(`record`, recordSchema);

module.exports = Record;
