// const path = require('path');
// const fs = require('fs');
import fs from "fs";
import path from "path";

const audioFolderPath = './music/default';

fs.readdir(audioFolderPath, (err, files) => {
    if (err) {
        console.error('Ошибка чтения папки:', err);
        return;
    }
    const tracksData = [];

    files.forEach(file => {
        if (file.endsWith('.mp3')) {
            const trackName = path.parse(file).name;
			const trackArtist = trackName.split(' - ')[0];
			const trackTitle = trackName.split(' - ')[1];
            const trackPath = path.join(audioFolderPath, file).replace(/\\/g, '/');
            tracksData.push(
			{
				Name: trackName,
				data: {
					path: trackPath,
					artist: trackArtist,
					title: trackTitle,     
				}
			});
        }
    });

    const jsonData = JSON.stringify(tracksData, null, 4);
    const outputFilePath = path.join(audioFolderPath, 'tracks_data.json');

    fs.writeFile(outputFilePath, jsonData, err => {
        if (err) {
            console.error('Ошибка записи JSON-файла:', err);
            return;
        }
        console.log('Данные успешно записаны в', outputFilePath);
    });
});

// Переводим json в объект и экспортируем 
// const music_data = fs.readFileSync('./music/default/tracks_data.json');
// export const music_data_obj = JSON.parse(music_data);
// music_data_obj.forEach(element => {
// 	console.log(element.trackName);
// });
