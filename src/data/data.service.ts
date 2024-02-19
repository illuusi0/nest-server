import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';

@Injectable()
export class DataService {
  private readonly DATA_FILE = './data.json';

  async readData() {
    try {
      const data = await fs.readFile(this.DATA_FILE, 'utf8');
      return JSON.parse(data);
    } catch (err) {
      throw new Error('Error reading data file');
    }
  }

  async writeData(newData: any) {
    const existingData = await this.readData();
    existingData.push(newData);
    await fs.writeFile(this.DATA_FILE, JSON.stringify(existingData, null, 2));
  }
}
