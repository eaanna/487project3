$(document).ready(function() {
    console.log("ready");
    loadJSON();
});


var ageGroup = [];
var males = [];
var females = [];

function loadJSON() {
    $.getJSON("youth_ages.json", function (youthages) {
        console.log(youthages);
        parseData(youthages);
    });
        
}

function parseData(youthages) {

    var html = "";

    $.each(youthages, function(index) {
        html += '<h2>' + youthages[index].ageBracket + '<h2>';
        html += '<ul><li>Males' + youthages[index].males + '</li>';
        html += '<li>Females:' + youthages[index].females + '</li>';
        html += '</ul>';

        males.push(youthages[index].males);
        females.push(youthages[index].females);
    });

    $("#sport_age_chart").append(html);
    buildCharts();
}

function buildCharts() {

    var chart1 = c3.generate({
        bindto: "#sport_age_chart",
        data: {
            url: 'youth_ages.json',
            mimeType: 'json'
        },
        bar: {
            width: {
                ratio: 0.5
            }
        }
});

$("#sport_age_chart").append(chart1);

}
