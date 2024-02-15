import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import Calls from '../domain/postgresql/calls.entity';
import { CallsRepository } from '../repository/calls.repository';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse , AxiosRequestConfig} from "axios";
import { XmljsUtils } from '../utils/xmljs.utils';
import * as txml from 'txml';
import { StringDecoder } from 'string_decoder';

const relationshipNames = [];

@Injectable()
export class CallsService {
  logger = new Logger('CallsService');

  constructor(@InjectRepository(CallsRepository) private callsRepository: CallsRepository , private httpService: HttpService , private xmlUtils : XmljsUtils) {}


  async getCallbackStatus(): Promise<any> {
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
  async getCallS(): Promise<any> {
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

  async addCalls(): Promise<any> {
    const self = this;
    let resp: any;
    let config: AxiosRequestConfig = {};
    config.headers = { 'X-Requested-With': 'XMLHttpRequest', 'Content-Type': 'application/xml' };
   // let body: string = '<?xml version="1.0"?> <methodCall><methodName>getAccountRates</methodName> <params><param><value><struct> <member> <name>i_account</name> <value> <int>1</int> </value> </member> </struct></value></param></params></methodCall>';
    let body = `
    <?xml version='1.0'?>
<methodResponse>
    <params>
        <param>
        <value>
            <struct>
                <member>
                    <name>customers</name>
                    <value>
                        <array><data>
                            </data></array>
                    </value>
                </member>
                <member>
                    <name>result</name>
                    <value>
                        <string>OK</string>
                    </value>
                </member>
            </struct>
        </value>
        </param>
    </params>
</methodResponse>
    `;
    
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

        dataarray = dataarray.data.value ; 
      let finalResponseData = []

      if (dataarray == undefined || dataarray == null) {
        const methodResponseArray = parsedXml.methodResponse;
        const methodResponseJson = self.xmlUtils.ResponseMethodParser(methodResponseArray)
        return methodResponseJson
      }
  
       else if (Object.keys(dataarray).length == 1){
             
            const methodResponseJson = self.xmlUtils.ResponseMethodParser(dataarray);
            finalResponseData.push(methodResponseJson);
  
           }
       else {
                for (let i = 0; i < Object.keys(dataarray).length; i++) {
       
                   const methodResponseJson = self.xmlUtils.ResponseMethodParser(dataarray[i]);
                   finalResponseData.push(methodResponseJson);
                }
           }
       return { methodCallJson, finalResponseData }
      
  } 


  async findById(id: string): Promise<Calls | undefined> {
    const options = { relations: relationshipNames };
    return await this.callsRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<Calls>): Promise<Calls | undefined> {
    return await this.callsRepository.findOne(options);
  }

  async findAndCount(options: FindManyOptions<Calls>): Promise<[Calls[], number]> {
    options.relations = relationshipNames;
    return await this.callsRepository.findAndCount(options);
  }

  async save(calls: Calls): Promise<Calls | undefined> {
    return await this.callsRepository.save(calls);
  }

  async update(calls: Calls): Promise<Calls | undefined> {
    return await this.save(calls);
  }

  async delete(calls: Calls): Promise<Calls | undefined> {
    return await this.callsRepository.remove(calls);
  }
}
