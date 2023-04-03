import { readFileSync, writeFileSync } from "fs";

interface Subtitle {
  font_size: number;
  font_color: string;
  background_alpha: number;
  background_color: string;
  Stroke: string;
  type: string;
  lang: string;
  version: string;
  body: SubtitleBody[];
}

interface SubtitleBody {
  from: number;
  to: number;
  sid: number;
  location: number;
  content: string;
  music: number;
}

function formatTime(totalSecond: number) {
  const second = totalSecond % 60;
  const minute = (totalSecond / 60) % 60;
  const hour = totalSecond / 3600;
  return (
    formatNumber(hour) + ":" + formatNumber(minute) + ":" + formatNumber(second)
  );
}

function formatNumber(number: number) {
  return fillZero(Math.floor(number));
}

function fillZero(number: number) {
  if (number < 10) {
    return "0" + number;
  }
  return "" + number;
}

function stringSubtitle(subtitle: Subtitle) {
  const body = subtitle.body;
  const formatted = body.reduce((prev, cur) => {
    prev.push(`[${formatTime(cur.from)}] ${cur.content}`);
    return prev;
  }, [] as string[]);
  return formatted.join("\n");
}

function main() {
  const subtitlePath = "./data.json";
  const subtitleObj = JSON.parse(
    readFileSync(subtitlePath).toString()
  ) as Subtitle;
  const subtitleStr = stringSubtitle(subtitleObj);
  const outputPath = subtitlePath + ".subtitle";
  writeFileSync(outputPath, subtitleStr);
  console.log(subtitleStr);
  console.log("字幕信息已写入文件：" + outputPath);
}

main();
