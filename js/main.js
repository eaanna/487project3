$(document).ready(function() {
    console.log("ready");
});

function loadData() {
    $.getJSON("data/youth_ages.json");
    console.log('json loaded');
    buildCharts();
}


function buildCharts() {

var chart1 = c3.generate({
    bindto: "#sport_chart",
    data: {
        url: 'data/sportsTBI.csv',
        type: 'bar'
    }
});

var chart2 = c3.generate({
    bindto: "#sport_age_chart",
    data: {
        url: 'data/youth_ages.json',
        mimeType: 'json'
    }
});

}