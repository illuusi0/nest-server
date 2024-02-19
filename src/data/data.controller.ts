import { Body, Controller, Get, Post, Res, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { DataService } from './data.service';
import { Response } from 'express';

@Controller('data')
export class DataController {
  constructor(private readonly dataService: DataService) {}

  @Get()
  @ApiOperation({ summary: 'Get data' })
  @ApiResponse({ status: 200, description: 'Return data' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async getData(@Res() res: Response) {
    try {
      const data = await this.dataService.readData();
      res.json(data);
    } catch (e) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(e.message);
    }
  }

  @Post()
  @ApiOperation({ summary: 'Add new data' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        type: { type: 'string' },
        description: { type: 'string' },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Data successfully added' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async addData(@Body() newData: any, @Res() res: Response) {
    try {
      const now = new Date();
      const formattedDate = [
        ('0' + now.getDate()).slice(-2),
        ('0' + (now.getMonth() + 1)).slice(-2),
        now.getFullYear(),
      ].join('.');
      await this.dataService.writeData({
        ...newData,
        date: formattedDate,
        status: 'В очереди',
      });
      res.status(HttpStatus.CREATED).json({
        message: 'Data added',
        data: { ...newData, date: formattedDate },
      });
    } catch (e) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(e.message);
    }
  }
}
