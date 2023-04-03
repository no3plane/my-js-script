const fs = require('fs')
const path = require('path')

const ENV = 'x'

/**
 * 遍历文件夹获取子文件夹列表
 * @param {string} folderPath 文件夹路径
 * @returns 路径文件夹中的子文件夹列表
 */
function walkDir(folderPath) {
    return fs.readdirSync(folderPath)
        .map(fileName => {
            return path.join(folderPath, fileName)
        })
        .filter(fileName => {
            return fs.lstatSync(fileName).isDirectory()
        })
}

function getEpisodeData(path) {
    const fileString = fs.readFileSync(path, 'utf8');
    const data = JSON.parse(fileString);
    return data;
}

function specialChar(path) {
    return path.replace(/[\/\\:*?<>|]/g, '_');
}

function log(foo) {
    if (ENV == 'dev') {
        console.log(foo);
    }
}

var downloadPath = '.';

for (const sectionPath of walkDir(downloadPath)) {
    let sectionTitle = null;

    let episodePaths = walkDir(sectionPath);
    if (episodePaths.length < 1) {
        log(`分集目录竟然为空：${sectionPath}`);
        contiune;
    }

    for (const episodePath of episodePaths) {
        // 解析entry.json文件，获取视频数据
        let episodeInfo = getEpisodeData(path.join(episodePath, 'entry.json'));
        let episodeTitle = episodeInfo.page_data.download_subtitle;
        sectionTitle = episodeInfo.title;

        // 进入存放媒体文件的文件夹
        let mediaPaths = walkDir(episodePath);
        if (mediaPaths.length !== 1) {
            log(`第二级文件夹下应该只有一个目录吧，第二级文件夹位置：${episodePath}`);
            contiune;
        }
        let mediaPath = mediaPaths[0];
        let audioPath = path.join(mediaPath, 'audio.m4s');
        let videoPath = path.join(mediaPath, 'video.m4s');

        let mediaFileName = specialChar(episodePaths.length > 1 ? episodeTitle : sectionTitle);

        if (fs.existsSync(audioPath)) {
            fs.renameSync(audioPath, path.join(mediaPath, mediaFileName) + '.m4a');
            fs.renameSync(videoPath, path.join(mediaPath, mediaFileName) + '.m4v');
            log(`${audioPath} ------> ${path.join(mediaPath, mediaFileName) + '.m4a'}`);
            log(`${videoPath} ------> ${path.join(mediaPath, mediaFileName) + '.m4v'}`);
        }

        if (fs.existsSync(audioPath) === false || fs.existsSync(videoPath) === false) {
            log(`找不到媒体文件：${mediaPath}`);
        }

        fs.renameSync(episodePath, path.join(sectionPath, mediaFileName));
        log(`${episodePath} ------> ${path.join(sectionPath, mediaFileName)}`);
    }

    fs.renameSync(sectionPath, path.join(downloadPath, specialChar(sectionTitle)))
    log(`${sectionPath} ------> ${path.join(downloadPath, specialChar(sectionTitle))}`);
}

log('finish');