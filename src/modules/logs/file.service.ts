import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as readline from 'readline';

@Injectable()
export class FileService {
  getFiles(path: string): string[] {
    return fs.readdirSync(path);
  }

  readFile(filePath: string): Promise<string> {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  async readWithPaging(path: string, pageSize: number): Promise<string[]> {
    const fileStream = fs.createReadStream(path);
    const lines: string[] = [];
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });
    let lineCount = 0;
    let currentPage = 1;
    let start = 0;
    let end = pageSize;
    for await (const line of rl) {
      lineCount++;
      if (lineCount > end) {
        currentPage++;
        start += pageSize;
        end += pageSize;
      }
      if (currentPage === 1 || lineCount > start) {
        lines.push(line);
      }
      if (lines.length === pageSize) {
        break;
      }
    }
    return lines;
  }
}
