const form = document.getElementById('vote-form').addEventListener('submit', (e) => {
    const choice = document.querySelector('input[name=points]:checked').value;
    const name = document.getElementById('name').textContent;
    const data = {points: choice, name: name};
console.log(data);
console.log(name);
    fetch('http://localhost:3000/poll', {
        method: 'post',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));
    e.preventDefault();

});


let dataPoints = [
    {name: 'Windows', y: 0},
    {name: 'Mac', y: 0},
    {name: 'Linux', y: 0},
];

const chartContainer = document.querySelector('#chartContainer');
if(chartContainer){
    const chart = new CanvasJS.Chart('chartContainer', {
        exportEnabled: true,
        animationEnabled: true,
        legend:{
            cursor: "pointer",
            itemclick: explodePie
        },
        theme: 'theme1',
        title: {
            text: 'Os result'
        },
        data: [
            {
                type:  'pie',
                showInLegend: true,
                toolTipContent: "{name}: <strong>{y}%</strong>",
                indexLabel: "{name} - {y}%",
                dataPoints: dataPoints
            }
        ]
    });
    chart.render();

    Pusher.logToConsole = true;

    var pusher = new Pusher('132881365344c7cb8667', {
      cluster: 'eu',
      encrypted: true
    });

    var channel = pusher.subscribe('os-poll');
    channel.bind('os-vote', function(data) {
        
        dataPoints = dataPoints.map(x => {
            // console.log(x.label);
            // console.log(data.points);
            let label = x.name.toLowerCase();
            // label; 
            console.log(label);
            if(label == data.os){
                x.y += data.points;
                console.log(x.y);
                return x;
            }else{ 
                // console.log('ab');
                return x;
            }
        });
        // console.log(dataPoints);
        chart.render();
    });
}

function explodePie (e) {
	if(typeof (e.dataSeries.dataPoints[e.dataPointIndex].exploded) === "undefined" || !e.dataSeries.dataPoints[e.dataPointIndex].exploded) {
		e.dataSeries.dataPoints[e.dataPointIndex].exploded = true;
	} else {
		e.dataSeries.dataPoints[e.dataPointIndex].exploded = false;
	}
	e.chart.render();

}