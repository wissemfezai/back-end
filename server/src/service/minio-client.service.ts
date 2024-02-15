import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { MinioService } from 'nestjs-minio-client';
@Injectable()
export class MinioClientService {

  logger = new Logger('MinioClientService');

  constructor(private readonly _minioService: MinioService) {
  }

  /**
   * Method to gt file in base 64
   *
   * @param {string} pathFile : file path
   * @return {*}  {Promise<any>}
   * @memberof MinioClientService
   */
  public async getFile(pathFile: string, bucketName: string): Promise<any> {
    const readerStream = await this._minioService.client.getObject(bucketName, pathFile);
    return new Promise((resolve, reject) => {
      let data: any = "";
      readerStream.setEncoding('base64');
      readerStream.on("error", err => reject(err));
      readerStream.on("data", chunk => data += chunk);
      readerStream.on("end", () => resolve(data));
    });
  }

  /**
   * Method to upload file in base 64
   *
   * @param {*} file
   * @param {string} bucketName
   * @return {*} 
   * @memberof MinioClientService
   */
  public async upload(file: any, bucketName: string) {
    const path = file.path;
    const fileName = file.fileName;
    const fileData = file.data;
    const base64Data = new Buffer(fileData, 'base64');
    var metaData = {
      'Content-Type': file.extention,
      'ContentEncoding': 'base64',
    }
    this._minioService.client.putObject(
      bucketName,
      path + '/' + fileName,
      base64Data,
      metaData,
      function (err, res) {
        if (err) {
          console.log(err);
          throw new HttpException(
            'Error uploading file',
            HttpStatus.BAD_REQUEST,
          );
        }
      },
    );

    return true
  }

}