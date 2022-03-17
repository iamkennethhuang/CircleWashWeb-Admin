const ReportFile = require('../models/reportFile');

async function monitorSupport(socket) {
    const reportFileEventEmitter = ReportFile.watch();
    reportFileEventEmitter.on('change', (data) => {
        socket.emit('fileUpdated', data);
    })
}

module.exports = {
    monitorSupport
};