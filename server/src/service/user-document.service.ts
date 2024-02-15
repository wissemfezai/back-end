import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { LogAction } from '../domain/mongodb/enumeration/log-action';
import { LogOperation } from '../domain/mongodb/enumeration/log-operation';
import { LogType } from '../domain/mongodb/enumeration/log-type';
import { UserDocumentType } from '../domain/postgresql/enumeration/user-document-type';
import { UserDocument } from '../domain/postgresql/user-document.entity';
import { UserDocumentRepository } from '../repository/user-document.repository';
import { UserDocumentDTO } from './dto/user-document-dto.dto';
import { LogService } from './log.service';
import { MinioClientService } from './minio-client.service';

@Injectable()
export class UserDocumentService {
  entity = 'USER_DOCUMENT';
  logger = new Logger('UserDocumentService');

  constructor(
    @InjectRepository(UserDocumentRepository) private _userDocumentRepository: UserDocumentRepository,
    private _logService: LogService,
    private _minioClientService: MinioClientService
  ) { }

  /**
   * Method to find document by user id
   *
   * @param {number} userId : user id
   * @return {*}  {Promise<UserDocumentDTO>}
   * @memberof UserDocumentService
   */
  public async findByUserId(userId: number): Promise<UserDocumentDTO> {
    let userDocument = await this._userDocumentRepository.findOne({
      where: {
        user: userId,
        type: UserDocumentType.PICTURE,
        isArchived: false
      }
    });
    if (userDocument) {
      let userDocumentDto = plainToClass(UserDocumentDTO, userDocument);
      userDocumentDto.data = await this._minioClientService.getFile(userDocument.path + '/' + userDocument.fileName, userDocument.bucketName);
      return userDocumentDto
    }
    return null
  }

  /**
   * Method to create a new document user 
   *
   * @param {UserDocument} userDocument
   * @param {*} user
   * @return {*}  {Promise<UserDocument>}
   * @memberof UserDocumentService
   */
  public async create(userDocument: UserDocument, currentUser: any): Promise<UserDocument> {
    userDocument = this._logService.logOnCreate(userDocument, currentUser);
    userDocument.bucketName = "user";
    await this._minioClientService.upload(userDocument, userDocument.bucketName);
    userDocument.data = null;
    return await this._userDocumentRepository.save(userDocument);
  }

  /**
   * Method to archive document user
   *
   * @param {number} userDocumentId
   * @param {*} currentUser
   * @param {string} remoteIP
   * @return {*}  {Promise<UserDocument>}
   * @memberof UserDocumentService
   */
  public async archive(userDocumentId: number, currentUser: any, remoteIP: string): Promise<UserDocument> {
    let userDocument = await this._userDocumentRepository.findOne({
      where: {
        id: userDocumentId,
      }
    });
    if (!userDocument) {
      this._logService.saveLog(LogType.USER_DOCUMENT, LogAction.ARCHIVE, this.entity, LogOperation.NOT_FOUND, remoteIP, 'user document not found', null, null, userDocumentId, null, currentUser);
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    } else if (userDocument.isArchived == true) {
      this._logService.saveLog(LogType.USER_DOCUMENT, LogAction.ARCHIVE, this.entity, LogOperation.FAILED, remoteIP, 'user document with id: (' + userDocumentId + ') is alearady archived', null, null, userDocument.id, null, currentUser);
      throw new HttpException('User is alerady archived', HttpStatus.BAD_REQUEST);
    }
    userDocument.isArchived = true;
    userDocument.archivedDate = new Date(Date.now());
    let result = await this._update(userDocument, currentUser);
    this._logService.saveLog(LogType.USER_DOCUMENT, LogAction.ARCHIVE, this.entity, LogOperation.SUCCESS, remoteIP, "archive", null, null, userDocumentId, null, currentUser);

    return result;
  }

  /**
   * Method to update user document
   *
   * @private
   * @param {UserDocument} userDocument
   * @param {*} currentUser
   * @return {*}  {Promise<UserDocument>}
   * @memberof UserDocumentService
   */
  private async _update(userDocument: UserDocument, currentUser: any): Promise<UserDocument> {
    userDocument = this._logService.logOnUpdate(userDocument, currentUser);
    let result = await this._userDocumentRepository.save(userDocument);
    return result;
  }
}
