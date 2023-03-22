import WebTorrent from 'webtorrent';

const downIcon = String.fromCodePoint(0x2193);
const upIcon = String.fromCodePoint(0x2191);

const client = new WebTorrent();

client.add('./sintel.torrent', { path: './videos' }, (torrent) => {
    torrent.on('ready', (data) => {
        console.log(`Torrent ready: ${data}`);
    });

    torrent.on('error', (err) => {
        console.log(`Torrent error: ${err}`);
    });

    torrent.on('download', (bytes) => {
        console.clear();
        console.log(`
            ${(torrent.progress*100).toFixed(2)}%\t
            ${(torrent.downloaded/1000000).toFixed(2)} MB of ${(torrent.length/1000000).toFixed(2)} MB\t
            ${(torrent.downloadSpeed/125).toFixed(2)} Kbps${downIcon}\t
            ${(torrent.uploadSpeed/125).toFixed(2)} Kbps${upIcon}\t
            ${Math.round(torrent.timeRemaining/1000)}s left`);
    });
    
    torrent.on('done', () => {
        console.clear();
        console.log(`
            Download complete!\n
            ${(torrent.downloaded/1000000).toFixed(2)} MB downloaded\n
            ${(torrent.uploaded/1000000).toFixed(2)} MB uploaded`);
        process.exit();
    });
});

client.on('error', (err) => {
    console.log(`Client error: ${err}`);
});