import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import Cdr from '../domain/postgresql/cdr.entity';
import { CdrRepository } from '../repository/cdr.repository';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse , AxiosRequestConfig} from "axios";
import * as txml from 'txml';
import { XmljsUtils } from '../utils/xmljs.utils';

const relationshipNames = [];

@Injectable()
export class CdrService {
  logger = new Logger('CdrService');

  constructor(@InjectRepository(CdrRepository) private cdrRepository: CdrRepository , private httpService: HttpService , private xmlUtils : XmljsUtils) {}

  async getCustomerCDRs(): Promise<any>{
    const self = this;
    let resp: any;
    let config: AxiosRequestConfig = {};
    config.headers = { 'X-Requested-With': 'XMLHttpRequest', 'Content-Type': 'application/xml' };
    let body: string = '<?xml version="1.0"?> <methodCall><methodName>listAllCalls</methodName> <params><param><value><struct> <member> <name>i_customer</name> <value> <int>1</int> </value> </member> </struct></value></param></params></methodCall>';
    await this.httpService.post<any>(
      'https://sippy.yooth-it.com/xmlapi/xmlapi',
      body,
      config
    ).toPromise().then(
      (data) => {
        resp = data.data;
      }
    )
    return await this._parseXml(resp);
  
    
  }

  async getAccountCDRs(): Promise<any> {
    const self = this;
    let resp: any;
    let config: AxiosRequestConfig = {};
    config.headers = { 'X-Requested-With': 'XMLHttpRequest', 'Content-Type': 'application/xml' };
    let body: string = '<?xml version="1.0"?> <methodCall><methodName>listAllCalls</methodName> <params><param><value><struct> <member> <name>i_customer</name> <value> <int>1</int> </value> </member> </struct></value></param></params></methodCall>';
    await this.httpService.post<any>(
      'https://sippy.yooth-it.com/xmlapi/xmlapi',
      body,
      config
    ).toPromise().then(
      (data) => {
        resp = data.data;
      }
    )
    return await this._parseXml(resp);
  
    

  }

  async getCDRSDP(): Promise<any> {
    const self = this;
    let resp: any;
    let config: AxiosRequestConfig = {};
    config.headers = { 'X-Requested-With': 'XMLHttpRequest', 'Content-Type': 'application/xml' };
    let body: string = '<?xml version="1.0"?> <methodCall><methodName>listAllCalls</methodName> <params><param><value><struct> <member> <name>i_customer</name> <value> <int>1</int> </value> </member> </struct></value></param></params></methodCall>';
    await this.httpService.post<any>(
      'https://sippy.yooth-it.com/xmlapi/xmlapi',
      body,
      config
    ).toPromise().then(
      (data) => {
        resp = data.data;
      }
    )
    return await this._parseXml(resp);
    

  }

  private async _parseXml(xmlString): Promise<any> {

    let self = this
    const parsedXml: any = txml.parse(xmlString.toString(), { simplify: true, keepComments: false, });
    const methodCallArray = parsedXml.methodCall;
    const methodCallJson = self.xmlUtils.methodCallParser(methodCallArray);

    let dataarray = self.xmlUtils.getWithTagName(parsedXml.methodResponse.params, 'data');
    if (dataarray == null) {
      const methodResponseArray = parsedXml.methodResponse;
      const methodResponseJson = self.xmlUtils.ResponseMethodParser(methodResponseArray);
      return { methodCallJson, methodResponseJson}; 


    }
    else {
      dataarray = dataarray.data.value ; 
    let finalResponseData = []
    for (let i = 0; i < dataarray.length; i++) {
      const methodResponseJson = self.xmlUtils.ResponseMethodParser(dataarray[i]);
      finalResponseData.push(methodResponseJson)
    }

    return { methodCallJson, finalResponseData }
  }
  } 
  


  async findById(id: string): Promise<Cdr | undefined> {
    const options = { relations: relationshipNames };
    return await this.cdrRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<Cdr>): Promise<Cdr | undefined> {
    return await this.cdrRepository.findOne(options);
  }

  async findAndCount(options: FindManyOptions<Cdr>): Promise<[Cdr[], number]> {
    options.relations = relationshipNames;
    return await this.cdrRepository.findAndCount(options);
  }

  async save(cdr: Cdr): Promise<Cdr | undefined> {
    return await this.cdrRepository.save(cdr);
  }

  async update(cdr: Cdr): Promise<Cdr | undefined> {
    return await this.save(cdr);
  }

  async delete(cdr: Cdr): Promise<Cdr | undefined> {
    return await this.cdrRepository.remove(cdr);
  }
}
