import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import Payment from '../domain/postgresql/payment.entity';
import { PaymentRepository } from '../repository/payment.repository';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse , AxiosRequestConfig} from "axios";
import { XmljsUtils } from '../utils/xmljs.utils';
import * as txml from 'txml';
import { StringDecoder } from 'string_decoder';
import { PaymentDto } from './dto/payment-dto.dto';

const relationshipNames = [];

@Injectable()
export class PaymentService {
  logger = new Logger('PaymentService');

  constructor(@InjectRepository(PaymentRepository) private paymentRepository: PaymentRepository , private httpService: HttpService , private xmlUtils : XmljsUtils) {}

  async getpaymentInfo(iWholesaler : number , iCustomer : number , iPayment : number , iAccount : number): Promise<any> {
    const self = this;
    let resp: any;
    let config: AxiosRequestConfig = {};
    config.headers = { 'X-Requested-With': 'XMLHttpRequest', 'Content-Type': 'application/xml' };
    let body: string = `<?xml version="1.0"?>
    <methodCall>
        <methodName>getPaymentInfo</methodName>
        <params>
            <param>
                <value>
                    <struct>
                        <member>
                            <name>i_wholesaler</name>
                            <value>
                                <int>`+ iWholesaler +`</int>
                            </value>
                        </member>
                        <member>
                        <name>i_account</name>
                        <value>
                            <int>`+ iAccount +`</int>
                        </value>
                    </member>
                    <member>
                    <name>i_customer</name>
                    <value>
                        <int>`+ iCustomer +`</int>
                    </value>
                </member>
                <member>
                <name>i_payment</name>
                <value>
                    <int>`+ iPayment +`</int>
                </value>
            </member>
                    </struct>
                </value>
            </param>
        </params>
    </methodCall>`;
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

  async getPaymentsList(iWholesaler : number , iCustomer : number , iAccount : number): Promise<any> {
    const self = this;
    let resp: any;
    let config: AxiosRequestConfig = {};
    config.headers = { 'X-Requested-With': 'XMLHttpRequest', 'Content-Type': 'application/xml' };
    let body: string = `<?xml version="1.0"?>
    <methodCall>
        <methodName>getPaymentsList</methodName>
        <params>
            <param>
                <value>
                    <struct>
                        <member>
                            <name>i_wholesaler</name>
                            <value>
                                <int>`+ iWholesaler +`</int>
                            </value>
                        </member>
                        <member>
                        <name>i_account</name>
                        <value>
                            <int>`+ iAccount +`</int>
                        </value>
                    </member>
                    <member>
                    <name>i_customer</name>
                    <value>
                        <int>`+ iCustomer +`</int>
                    </value>
                </member>
                    </struct>
                </value>
            </param>
        </params>
    </methodCall>`;
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

  async accountAddFunds(amount : string , currency : string , iAccount : number): Promise<any> {
    const self = this;
    let resp: any;
    let config: AxiosRequestConfig = {};
    config.headers = { 'X-Requested-With': 'XMLHttpRequest', 'Content-Type': 'application/xml' };
    let body: string = `<?xml version="1.0"?>
    <methodCall>
        <methodName>accountAddFunds</methodName>
        <params>
            <param>
                <value>
                    <struct>
                        <member>
                            <name>i_account</name>
                            <value>
                                <int>`+ iAccount +`</int>
                            </value>
                        </member>
                        <member>
                            <name>amount</name>
                            <value>
                                <int>`+ amount +`</int>
                            </value>
                        </member>
                        <member>
                            <name>currency</name>
                            <value>
                                <int>`+ currency +`</int>
                            </value>
                        </member>
                    </struct>
                </value>
            </param>
        </params>
    </methodCall>`;
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

  async makePayment(PaymentDto: PaymentDto, iWholesaler: number): Promise<any> {
    const self = this;
    let resp: any;
    let config: AxiosRequestConfig = {};
    config.headers = { 'X-Requested-With': 'XMLHttpRequest', 'Content-Type': 'application/xml' };
    
    let bodyiDebitCreditCard  = `  
    <member>
       <name>web_login</name>
           <value>
            <string>`+ PaymentDto.i_debit_credit_card + `</string>
          </value>
     </member>`;
    
    
    
    let body: string = `<?xml version="1.0"?>
    <methodCall>
        <methodName>makePayment</methodName>
        <params>
            <param>
                <value>
                    <struct>
                        <member>
                            <name>i_wholesaler</name>
                            <value>
                                <int>`+ iWholesaler +`</int>
                            </value>
                        </member>
                        <member>
                            <name>i_account</name>
                            <value>
                                <int>`+ PaymentDto.i_account +`</int>
                            </value>
                        </member>
                        <member>
                            <name>i_customer</name>
                            <value>
                                <int>`+ PaymentDto.i_customer +`</int>
                            </value>
                        </member>
                        <member>
                            <name>amount</name>
                            <value>
                                <int>`+ PaymentDto.amount +`</int>
                            </value>
                        </member>
                        <member>
                            <name>currency</name>
                            <value>
                                <int>`+ PaymentDto.currency +`</int>
                            </value>
                        </member>
                        <member>
                            <name>payer_ip_address</name>
                            <value>
                                <int>`+ PaymentDto.payer_ip_address +`</int>
                            </value>
                        </member>`;

    if (PaymentDto.i_debit_credit_card != null) {
      body = body + bodyiDebitCreditCard
    }

    let bodyFinal = `</struct></value>
    </param>
    </params>
    </methodCall>`;

    body = body + bodyFinal;
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

  async makePaymentByCard(PaymentDto: PaymentDto, iWholesaler: number): Promise<any> {
    const self = this;
    let resp: any;
    let config: AxiosRequestConfig = {};
    config.headers = { 'X-Requested-With': 'XMLHttpRequest', 'Content-Type': 'application/xml' };
    
    let bodycvv   = `  
    <member>
       <name>cvv</name>
           <value>
            <string>`+ PaymentDto.cvv + `</string>
          </value>
     </member>`;

     let bodystreetAddr2   = `  
     <member>
        <name>street_addr2</name>
            <value>
             <string>`+ PaymentDto.street_addr2 + `</string>
           </value>
      </member>`;
    
    
    
    let body: string = `<?xml version="1.0"?>
    <methodCall>
        <methodName>makePaymentByCard</methodName>
        <params>
            <param>
                <value>
                    <struct>
                        <member>
                            <name>i_wholesaler</name>
                            <value>
                                <int>`+ iWholesaler +`</int>
                            </value>
                        </member>
                        <member>
                            <name>i_account</name>
                            <value>
                                <int>`+ PaymentDto.i_account +`</int>
                            </value>
                        </member>
                        <member>
                            <name>i_customer</name>
                            <value>
                                <int>`+ PaymentDto.i_customer +`</int>
                            </value>
                        </member>
                        <member>
                            <name>amount</name>
                            <value>
                                <string>`+ PaymentDto.amount +`</string>
                            </value>
                        </member>
                        <member>
                            <name>currency</name>
                            <value>
                                <string>`+ PaymentDto.currency +`</string>
                            </value>
                        </member>
                        <member>
                            <name>payer_ip_address</name>
                            <value>
                                <string>`+ PaymentDto.payer_ip_address +`</string>
                            </value>
                        </member>
                        <member>
                            <name>i_card_type</name>
                            <value>
                                <int>`+ PaymentDto.i_card_type +`</int>
                            </value>
                        </member>
                        <member>
                            <name>number</name>
                            <value>
                                <string>`+ PaymentDto.number +`</string>
                            </value>
                        </member>
                        <member>
                            <name>exp_mm</name>
                            <value>
                                <int>`+ PaymentDto.exp_mm +`</int>
                            </value>
                        </member>
                        <member>
                            <name>exp_yy</name>
                            <value>
                                <int>`+ PaymentDto.exp_yy +`</int>
                            </value>
                        </member>
                        <member>
                            <name>holder</name>
                            <value>
                                <string>`+ PaymentDto.holder +`</string>
                            </value>
                        </member>
                        <member>
                            <name>street_addr1</name>
                            <value>
                                <string>`+ PaymentDto.street_addr1 +`</string>
                            </value>
                        </member>
                        <member>
                            <name>state</name>
                            <value>
                                <string>`+ PaymentDto.state +`</string>
                            </value>
                        </member>
                        <member>
                            <name>postal_code</name>
                            <value>
                                <string>`+ PaymentDto.postal_code +`</string>
                            </value>
                        </member>
                        <member>
                            <name>city</name>
                            <value>
                                <string>`+ PaymentDto.city +`</string>
                            </value>
                        </member>
                        <member>
                            <name>country</name>
                            <value>
                                <string>`+ PaymentDto.country +`</string>
                            </value>
                        </member>
                        <member>
                            <name>phone</name>
                            <value>
                                <string>`+ PaymentDto.phone +`</string>
                            </value>
                        </member>`;

    if (PaymentDto.cvv != null) {
      body = body + bodycvv
    }
    if (PaymentDto.street_addr2 != null) {
      body = body + bodystreetAddr2
    }

    let bodyFinal = `</struct></value>
    </param>
    </params>
    </methodCall>`;

    body = body + bodyFinal;
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

  async getLowBalance(iCustomer : number , iAccount : number): Promise<any> {
    const self = this;
    let resp: any;
    let config: AxiosRequestConfig = {};
    config.headers = { 'X-Requested-With': 'XMLHttpRequest', 'Content-Type': 'application/xml' };
    let body: string = `<?xml version="1.0"?>
    <methodCall>
        <methodName>getLowBalance</methodName>
        <params>
            <param>
                <value>
                    <struct>
                        <member>
                            <name>i_account</name>
                            <value>
                                <int>`+ iAccount +`</int>
                            </value>
                        </member>
                        <member>
                            <name>i_customer</name>
                            <value>
                                <int>`+ iCustomer +`</int>
                            </value>
                        </member>
                    </struct>
                </value>
            </param>
        </params>
    </methodCall>`;
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

  async addDebitCreditCard(PaymentDto: PaymentDto): Promise<any> {
    const self = this;
    let resp: any;
    let config: AxiosRequestConfig = {};
    config.headers = { 'X-Requested-With': 'XMLHttpRequest', 'Content-Type': 'application/xml' };
    
    let bodycvv   = `  
    <member>
       <name>cvv</name>
           <value>
            <string>`+ PaymentDto.cvv + `</string>
          </value>
     </member>`;

     let bodystreetAddr2   = `  
     <member>
        <name>street_addr2</name>
            <value>
             <string>`+ PaymentDto.street_addr2 + `</string>
           </value>
      </member>`;
    
    
    
    let body: string = `<?xml version="1.0"?>
    <methodCall>
        <methodName>addDebitCreditCard</methodName>
        <params>
            <param>
                <value>
                    <struct>
                        <member>
                            <name>i_account</name>
                            <value>
                                <int>`+ PaymentDto.i_account +`</int>
                            </value>
                        </member>
                        <member>
                            <name>i_customer</name>
                            <value>
                                <int>`+ PaymentDto.i_customer +`</int>
                            </value>
                        </member>
                        <member>
                        <name>alias</name>
                        <value>
                            <string>`+ PaymentDto.alias +`</string>
                        </value>
                    </member>
                        <member>
                            <name>i_card_type</name>
                            <value>
                                <int>`+ PaymentDto.i_card_type +`</int>
                            </value>
                        </member>
                        <member>
                            <name>number</name>
                            <value>
                                <string>`+ PaymentDto.number +`</string>
                            </value>
                        </member>
                        <name>holder</name>
                        <value>
                            <string>`+ PaymentDto.holder +`</string>
                        </value>
                    </member>
                        <member>
                            <name>exp_mm</name>
                            <value>
                                <int>`+ PaymentDto.exp_mm +`</int>
                            </value>
                        </member>
                        <member>
                            <name>exp_yy</name>
                            <value>
                                <int>`+ PaymentDto.exp_yy +`</int>
                            </value>
                        </member>
                        <member>
                            <name>street_addr1</name>
                            <value>
                                <string>`+ PaymentDto.street_addr1 +`</string>
                            </value>
                        </member>
                        <member>
                            <name>state</name>
                            <value>
                                <string>`+ PaymentDto.state +`</string>
                            </value>
                        </member>
                        <member>
                            <name>postal_code</name>
                            <value>
                                <string>`+ PaymentDto.postal_code +`</string>
                            </value>
                        </member>
                        <member>
                            <name>city</name>
                            <value>
                                <string>`+ PaymentDto.city +`</string>
                            </value>
                        </member>
                        <member>
                            <name>country</name>
                            <value>
                                <string>`+ PaymentDto.country +`</string>
                            </value>
                        </member>
                        <member>
                            <name>phone</name>
                            <value>
                                <string>`+ PaymentDto.phone +`</string>
                            </value>
                        </member>`;

    if (PaymentDto.cvv != null) {
      body = body + bodycvv
    }
    if (PaymentDto.street_addr2 != null) {
      body = body + bodystreetAddr2
    }

    let bodyFinal = `</struct></value>
    </param>
    </params>
    </methodCall>`;

    body = body + bodyFinal;
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

  async deleteDebitCreditCard( iAccount  : number , iCustomer : number , iDebitCreditCard : number ): Promise<any> {

   
    const self = this;
    let resp: any;
    let config: AxiosRequestConfig = {};
    config.headers = { 'X-Requested-With': 'XMLHttpRequest', 'Content-Type': 'application/xml' };
    let body: string = `<?xml version="1.0"?>
    <methodCall>
        <methodName>deleteDebitCreditCard</methodName>
        <params>
            <param>
                <value>
                    <struct>
                        <member>
                            <name>i_account</name>
                            <value>
                                <int>`+ iAccount +`</int>
                            </value>
                        </member>
                        <member>
                        <name>i_customer</name>
                        <value>
                            <int>`+ iCustomer +`</int>
                        </value>
                    </member>
                    <member>
                    <name>i_debit_credit_card</name>
                    <value>
                        <int>`+ iDebitCreditCard +`</int>
                    </value>
                </member>
                    </struct>
                </value>
            </param>
        </params>
    </methodCall>`;
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

  async getDebitCreditCardInfo( iAccount  : number , iCustomer : number , iDebitCreditCard   : number ): Promise<any> {

   
    const self = this;
    let resp: any;
    let config: AxiosRequestConfig = {};
    config.headers = { 'X-Requested-With': 'XMLHttpRequest', 'Content-Type': 'application/xml' };
    let body: string = `<?xml version="1.0"?>
    <methodCall>
        <methodName>getDebitCreditCardInfo</methodName>
        <params>
            <param>
                <value>
                    <struct>
                        <member>
                            <name>i_account</name>
                            <value>
                                <int>`+ iAccount +`</int>
                            </value>
                        </member>
                        <member>
                        <name>i_customer</name>
                        <value>
                            <int>`+ iCustomer +`</int>
                        </value>
                    </member>
                    <member>
                    <name>i_debit_credit_card</name>
                    <value>
                        <int>`+ iDebitCreditCard +`</int>
                    </value>
                </member>
                    </struct>
                </value>
            </param>
        </params>
    </methodCall>`;
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

  async listDebitCreditCards( iAccount  : number , iCustomer : number , offset : number , limit : number): Promise<any> {

   
    const self = this;
    let resp: any;
    let config: AxiosRequestConfig = {};
    config.headers = { 'X-Requested-With': 'XMLHttpRequest', 'Content-Type': 'application/xml' };
    let body: string = `<?xml version="1.0"?>
    <methodCall>
        <methodName>listDebitCreditCards</methodName>
        <params>
            <param>
                <value>
                    <struct>
                        <member>
                            <name>i_account</name>
                            <value>
                                <int>`+ iAccount +`</int>
                            </value>
                        </member>
                        <member>
                            <name>i_customer</name>
                            <value>
                                <int>`+ iCustomer +`</int>
                            </value>
                        </member>
                        <member>
                            <name>offset</name>
                            <value>
                                <int>`+ offset +`</int>
                            </value>
                        </member>
                        <member>
                            <name>limit</name>
                            <value>
                                <int>`+ limit +`</int>
                            </value>
                        </member>
                    </struct>
                </value>
            </param>
        </params>
    </methodCall>`;
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
      return { methodCallJson, methodResponseJson };


    }

    dataarray = dataarray.data.value;
    let finalResponseData = []

    if (dataarray == undefined || dataarray == null) {
      const methodResponseArray = parsedXml.methodResponse;
      const methodResponseJson = self.xmlUtils.ResponseMethodParser(methodResponseArray)
      return methodResponseJson
    }

    else if (Object.keys(dataarray).length == 1) {

      const methodResponseJson = self.xmlUtils.ResponseMethodParser(dataarray);
      finalResponseData.push(methodResponseJson);

    }
    else {
      for (let i = 0; i < Object.keys(dataarray).length; i++) {

        const methodResponseJson = self.xmlUtils.ResponseMethodParser(dataarray[i]);
        finalResponseData.push(methodResponseJson);
      }
    }
    
    return { methodCallJson, finalResponseData ,}

  }

}