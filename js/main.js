$(document).ready(function() {
    console.log("ready");
    loadXML();
    loadJSON();
});

var sports = [];
var visits = [];

function loadXML() {
    $.ajax({
    type: "GET",
    url: "sportsTBI.xml",
    dataType: "xml",
    success: parseXml
    });
} //close loadXML
    
    
    function parseXml(xml) {
    var htmlXML = '';
    
    $(xml).find("Activity").each(function(index){
    //Builds left sidebar link content
    //htmlXML += '<p>' + $(this).attr("name") + '<p>';
    //htmlXML += '<ul><li>' + $(this).find("Overall").text() + '</li>';
   // htmlXML += '</ul>';

    sports.push($(this).attr("name"));
    visits.push(parseFloat($(this).find("Overall").text()));

    });
    
    sports.unshift("sport");
    visits.unshift("Visits");
    $("#sport_data1").append(htmlXML);

}

var ageBracket = [];
var males = [];
var females = [];

var pieNum1 = [];
var pieCat = [];

function loadJSON() {
    $.getJSON("youthages.json", function (youthages) {
        console.log(youthages);
        parseData(youthages);
    });

    $.getJSON("top3ed.json", function (top3ed){
        parseData2(top3ed);
        //console.log(top3ed[0]["Visits (%)"]);
    });
    
}

function parseData(youthages) {

    var html = "";

    $.each(youthages, function(index) {
        //html += '<p>' + youthages[index].ageBracket + '<p>';
        //html += '<ul><li>Males' + youthages[index].males + '</li>';
       // html += '<li>Females:' + youthages[index].females + '</li>';
        //html += '</ul>';

        males.push(parseFloat(youthages[index].males));
        females.push(parseFloat(youthages[index].females));
    });
    males.unshift("males");
    females.unshift("females");
    $("#sport_data2").append(html);
    
}

function parseData2(top3ed) {
    $.each(top3ed, function(index) {
       pieNum1.push(parseFloat(top3ed[index]["Visits (%)"]));
       
         pieCat.push(top3ed[index]["Cause"]);
        console.log(pieNum1);
    });
    //pieNum1.unshift("percent");
    
    buildCharts();
}
console.log(pieNum1);

function buildCharts() {
    console.log(males);
    var chart1 = c3.generate({
        bindto: "#sport_age_chart",
        data: {
            columns: [
                males, 
                females
            ],
        type: 'bar'
        },
        bar: {
            width: {
                ratio: 0.5
            }
        },
        axis: {
            x: {
                label: {
                    text: 'Age Group',
                    position: 'outer-center'
                },
                type: 'category',
                categories: ['<5', '5-9', '10-14', '15-17']
            },
            y: {
              label: {
                text: 'ED Visits',
                position: 'outer-middle'
              }
            }
        },
        color: {
            pattern: ['#871f78', '#b284be']
        }
    });

    console.log(sports);
    console.log(visits);

    var chart2 = c3.generate({
        bindto: "#sport_chart",
        data: {
        columns: [
            visits
        ],
        type: 'bar'
        },
        bar: {
            width: {
                ratio: 0.5
            }
        },
        axis: {
            x: {
                label: {
                    text: 'Activity',
                    position: 'outer-center'
                },
                type: 'category',
                categories: ['Football', 'Basketball', 'Playground', 'Bicycling', 'Soccer', 'Baseball','Hockey','Gymnastics','Skateboard',]
            },
            y: {
              label: {
                text: 'ED Visits',
                position: 'outer-middle'
              }
            }
        },
        color: {
            pattern: ['#871f78']
        }
    });

    var pie1 = c3.generate({
        bindto: "#pie1",
        data: {
            json: [
                pieNum1
            ],
            keys: {
                value: pieCat,
            },
            type : 'pie',
            onclick: function (d, i) { console.log("onclick", d, i); },
            onmouseover: function (d, i) { console.log("onmouseover", d, i); },
            onmouseout: function (d, i) { console.log("onmouseout", d, i); }
        }
    });

    var pie2 = c3.generate({
        bindto: "#pie2",
        data: {
            columns: [
                ['data1', 30],
                ['data2', 120],
            ],
            type : 'pie',
            onclick: function (d, i) { console.log("onclick", d, i); },
            onmouseover: function (d, i) { console.log("onmouseover", d, i); },
            onmouseout: function (d, i) { console.log("onmouseout", d, i); }
        },
        color: {
            pattern: ['#871f78', '#e1bee7']
        }
    });

$("#sport_age_chart").append(chart1);
$("#sport_chart").append(chart2);
$("#pie1").append(pie1);
$("#pie2").append(pie2);

}

$('#table1').DataTable( {
    "ajax": 'youthages2.json',
    "columns": [
        { "data": "ageBracket"},
        { "data": "males"},
        {"data": "females"}
    ]
} );
