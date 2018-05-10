const form = document.getElementById('vote-form').addEventListener('submit', (e) => {
    const choice = document.querySelector('input[name=os]:checked').value;
    
    const data = {os: choice};

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
    {label: 'Windows', y: 0},
    {label: 'Mac', y: 0},
    {label: 'Linux', y: 0},
];

const chartContainer = document.querySelector('#chartContainer');
if(chartContainer){
    const chart = new CanvasJS.Chart('chartContainer', {
        animationEnabled: true,
        theme: 'theme1',
        title: {
            text: 'Os result'
        },
        data: [
            {
                type:  'column',
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
            let label = x.label.toLowerCase();
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