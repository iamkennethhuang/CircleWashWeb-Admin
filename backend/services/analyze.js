function pieChartAnalyze(data) {
    let offline = 0;
    let disabled = 0;
    let idle = 0;
    let running = 0;
    let diagnostic = 0;
    let duplicate = 0;
    let error = 0;
    let firmwareDoesntExist = 0;
    let downloadingToSatellite = 0;
    let downloadingToReader = 0;
    for(let i = 0; i < data.length; i++){
        if (data[i].Status === 0){
            offline++;
            continue;}
        if (data[i].Status === 1){
            disabled++;
            continue;}
        if (data[i].Status === 2){
            idle++;
            continue;}
        if (data[i].Status === 3){
            running++;
            continue;}
        if (data[i].Status === 4){
            diagnostic++;
            continue;}
        if (data[i].Status === 5){
            duplicate++;
            continue;}
        if (data[i].Status === 6){
            error++;
            continue;}
        if (data[i].Status === 100){
            firmwareDoesntExist++;
            continue;}
        if (data[i].Status === 101){
            downloadingToSatellite++;
            continue;}
        if (data[i].Status === 102){
            downloadingToReader++;
            continue;}}

    return [{name: 'Machine offline', count: offline},
        {name: 'Machine disabled', count: disabled},
        {name: 'Machine online but idle', count: idle},
        {name: 'Machine running', count: running},
        {name: 'Machine in diagnostic mode', count: diagnostic},
        {name: 'Duplicate machine number detected', count: duplicate},
        {name: 'Machine error', count: error},
        {name: `Requested firmware doesn't exist`, count: firmwareDoesntExist},
        {name: 'Firmware downloading to satellite', count: downloadingToSatellite},
        {name: 'Firmware downloading to reader', count: downloadingToReader}]
}

function findAllError(data){
    const message = ['Machine OK', 'Unable to communicate with machine', 'Machine leaking water', 'Machine stuck in cycle', 'Machine not filling', 'Machine not draining', 'Machine not heating', 'Machine door problem']; 
    const allError = {
        MaintError : [],
        MlvMachError : [],
    };
    for(let i = 0; i < data.length; i++){
        if(data[i].MaintError > 0){
            if(data[i].MaintError < 8){
                allError.MaintError.push({note: message[data[i].MaintError], time: data[i].StatusTime});
            }
            if(data[i].MaintError === 100){
                allError.MaintError.push({note: 'Part or all of config was rejected', time: data[i].StatusTime});
            }
            if(data[i].MaintError === 101){
                allError.MaintError.push({note: 'One or more messages timed out or were rejected', time: data[i].StatusTime});
            }
            if(data[i].MaintError === 999){
                allError.MaintError.push({note: 'Unknown machine problem', time: data[i].StatusTime});
            }
            if(data[i].MaintError === 1000){
                allError.MaintError.push({note: 'Machine code indicates error', time: data[i].StatusTime});
            }
        }
        if(data[i].MlvMachError > 0){
            if(data[i].MlvMachError < 8){
                allError.MlvMachError.push({note: message[data[i].MlvMachError], time: data[i].StatusTime});
            }
            if(data[i].MaintError === 100){
                allError.MlvMachError.push({note: 'Part or all of config was rejected', time: data[i].StatusTime});
            }
            if(data[i].MaintError === 101){
                allError.MlvMachError.push({note: 'One or more messages timed out or were rejected', time: data[i].StatusTime});
            }
            if(data[i].MaintError === 999){
                allError.MlvMachError.push({note: 'Unknown machine problem', time: data[i].StatusTime});
            }
            if(data[i].MaintError === 1000){
                allError.MlvMachError.push({note: 'Machine code indicates error', time: data[i].StatusTime});
            }
        }
    }
    return allError;
}

function lineChartAnalyze(data) {
    const dataPoints = [];
    
    for(let i = 0; i < data.length; i++){
        let c = 0;
        if(data[i].Status === 2 || data[i].Status === 3){
            c = data[i].Status;
        }
        const point = {time: data[i].StatusTime, statusCode: c};
        dataPoints.push(point);
    }
    return dataPoints;
}

module.exports = {
    pieChartAnalyze,
    findAllError,
    lineChartAnalyze
}