var _ = require("lodash");
var fs = require('fs');

function wordCount(array) {
    return _.chain(array)
    .map(function(word) {
        return word.toLowerCase();
    })
    .reject(function(word) {
        return /^\d+/.test(word) || word.length == 1;
    })
    .reduce(function(frequencies, word) {
        frequencies[word] = (frequencies[word] || 0) + 1;
        return frequencies;
    }, {})
    .value();
}

function convert(wordMap) {
    return _(wordMap).map(function(value, key) {
            return {
                "text": key,
                "size": value
            };
        });
}

function sortByCount(wordMap) {
    return _.chain(wordMap)
        .map(function(value, key) {
            return {
                "text": key,
                "size": Math.round(value / 10)
            };
        })
        .sortBy("size")
        .reverse()
        .value();
}

fs.readFile('./seg-titles.json', 'utf8', function(err, data) {
	if (err) {
		return console.log(err);
	}
	
	var result = sortByCount(wordCount(JSON.parse(data)));
	console.log(JSON.stringify(result));
});

