import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import Customer from '../domain/postgresql/customer.entity';
import { CustomerRepository } from '../repository/customer.repository';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse , AxiosRequestConfig} from "axios";
import * as txml from 'txml';
import { XmljsUtils } from '../utils/xmljs.utils';
import { CustomerDto } from './dto/customer-dto.dto';


const relationshipNames = [];

@Injectable()
export class CustomerService {
  logger = new Logger('CustomerService');

  constructor(@InjectRepository(CustomerRepository) private customerRepository: CustomerRepository , private httpService: HttpService , private xmlUtils : XmljsUtils) {}

  async getCust(): Promise<any> {
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
  async listCustomers(): Promise<any> {
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
  async addAccount(customerDto: CustomerDto, iWholesaler: string): Promise<any> {
    const self = this;
    let resp: any;
    let config: AxiosRequestConfig = {};
    config.headers = { 'X-Requested-With': 'XMLHttpRequest', 'Content-Type': 'application/xml' };
    let bodyWebLogin = `  
      <member>
         <name>web_login</name>
             <value>
              <string>`+ customerDto.web_login + `</string>
            </value>
       </member>`;
    let bodyIRoutingGroup  = `  
       <member>
          <name>i_routing_group </name>
              <value>
               <int>`+ customerDto.i_routing_group + `</int>
             </value>
        </member>`;
    let bodyBalance = `  
      <member>
         <name>balance</name>
             <value>
              <string>`+ customerDto.balance + `</string>
            </value>
       </member>`;
    let bodyCreditLimit = `  
       <member>
          <name>credit_limit</name>
              <value>
               <string>`+ customerDto.credit_limit + `</string>
             </value>
        </member>`;
    let bodyAccountsMgmt = `  
        <member>
           <name>accounts_mgmt</name>
               <value>
                <int>`+ customerDto.accounts_mgmt + `</int>
              </value>
         </member>`;
    let bodyCustomersMgmt = `  
         <member>
            <name>customers_mgmt</name>
                <value>
                 <int>`+ customerDto.customers_mgmt + `</int>
               </value>
          </member>`;
    let bodySystemMgmt = `  
          <member>
             <name>system_mgmt</name>
                 <value>
                  <int>`+ customerDto.system_mgmt + `</int>
                </value>
           </member>`;
    let bodyAccountsMatchingRule = `  
           <member>
              <name>accounts_matching_rule</name>
                  <value>
                   <string>`+ customerDto.accounts_matching_rule + `</string>
                 </value>
            </member>`;
    let bodyCompanyName= `  
            <member>
               <name>company_name</name>
                   <value>
                    <string>`+ customerDto.company_name + `</string>
                  </value>
             </member>`;
    let bodySalutation = `  
             <member>
                <name>salutation</name>
                    <value>
                     <string>`+ customerDto.salutation + `</string>
                   </value>
              </member>`;
    let bodyFirstName = `  
              <member>
                 <name>first_name</name>
                     <value>
                      <string>`+ customerDto.first_name + `</string>
                    </value>
               </member>`;
    let bodyLastName = `  
               <member>
                  <name>last_name</name>
                      <value>
                       <string>`+ customerDto.last_name + `</string>
                     </value>
                </member>`;
    let bodyMidInit = `  
                <member>
                   <name>mid_init</name>
                       <value>
                        <string>`+ customerDto.mid_init + `</string>
                      </value>
                 </member>`;

    let bodyStreetAddr = `  
                  <member>
                     <name>street_addr</name>
                         <value>
                          <string>`+ customerDto.street_addr + `</string>
                        </value>
                   </member>`;
    let bodyState = `  
                   <member>
                      <name>state</name>
                          <value>
                           <string>`+ customerDto.state + `</string>
                         </value>
                    </member>`;
    let bodyPostalCode = `  
                    <member>
                       <name>postal_code</name>
                           <value>
                            <string>`+ customerDto.postal_code + `</string>
                          </value>
                     </member>`;
    let bodyCity = `  
                     <member>
                        <name>city</name>
                            <value>
                             <string>`+ customerDto.city + `</string>
                           </value>
                      </member>`;
    let bodyCountry = `  
                      <member>
                         <name>country</name>
                             <value>
                              <string>`+ customerDto.country + `</string>
                            </value>
                       </member>`;
    let bodyContact = `  
                       <member>
                          <name>contact</name>
                              <value>
                               <string>`+ customerDto.contact + `</string>
                             </value>
                        </member>`;
    let bodyPhone= `  
                        <member>
                           <name>phone</name>
                               <value>
                                <string>`+ customerDto.phone + `</string>
                              </value>
                         </member>`;
    let bodyFax = `  
                         <member>
                            <name>fax</name>
                                <value>
                                 <string>`+ customerDto.fax + `</string>
                               </value>
                          </member>`;
    let bodyAltPhone = `  
                          <member>
                             <name>alt_phone</name>
                                 <value>
                                  <string>`+ customerDto.alt_phone + `</string>
                                </value>
                           </member>`;
    let bodyAltContact = `  
                           <member>
                              <name>alt_contact</name>
                                  <value>
                                   <string>`+ customerDto.alt_contact + `</string>
                                 </value>
                            </member>`;
    let bodyEmail = `  
                            <member>
                               <name>email</name>
                                   <value>
                                    <string>`+ customerDto.email + `</string>
                                  </value>
                             </member>`;
    let bodyCc = `  
                             <member>
                                <name>cc</name>
                                    <value>
                                     <string>`+ customerDto.cc + `</string>
                                   </value>
                              </member>`;
                              
    let bodyBcc = `  
                             <member>
                                <name>bcc</name>
                                    <value>
                                     <string>`+ customerDto.bcc + `</string>
                                   </value>
                              </member>`;
    let bodyMailFrom = `  
                             <member>
                                <name>mail_from</name>
                                    <value>
                                     <string>`+ customerDto.mail_from + `</string>
                                   </value>
                              </member>`;
    let bodyPaymentCurrency = `  
                             <member>
                                <name>payment_currency</name>
                                    <value>
                                     <string>`+ customerDto.payment_currency + `</string>
                                   </value>
                              </member>`;
    let bodyPaymentMethod = `  
                             <member>
                                <name>payment_method</name>
                                    <value>
                                     <int>`+ customerDto.payment_method + `</int>
                                   </value>
                              </member>`;
     let bodyMinPaymentAmount = `  
                             <member>
                                <name>min_payment_amount</name>
                                    <value>
                                     <string>`+ customerDto.min_payment_amount + `</string>
                                   </value>
                              </member>`;
     let bodyApiAccess = `  
                             <member>
                                <name>api_access</name>
                                    <value>
                                     <int>`+ customerDto.api_access + `</int>
                                   </value>
                              </member>`;
                              
    let bodyApiPassword = `  
                             <member>
                                <name>api_password</name>
                                    <value>
                                     <string>`+ customerDto.api_password + `</string>
                                   </value>
                              </member>`;
    let bodyApiMgmt = `  
                             <member>
                                <name>api_mgmt</name>
                                    <value>
                                     <int>`+ customerDto.api_mgmt + `</int>
                                   </value>
                              </member>`;
     let bodyICommissionAgent = `  
                             <member>
                                <name>i_commission_agent</name>
                                    <value>
                                     <int>`+ customerDto.i_commission_agent + `</int>
                                   </value>
                              </member>`;
     let bodyCommissionSize= `  
                             <member>
                                <name>commission_size</name>
                                    <value>
                                     <string>`+ customerDto.commission_size + `</string>
                                   </value>
                              </member>`;         
     let bodyTariffsMgmt = `  
                             <member>
                                <name>tariffs_mgmt</name>
                                    <value>
                                     <int>`+ customerDto.tariffs_mgmt + `</int>
                                   </value>
                              </member>`; 
     let bodyMaxDepth = `  
                             <member>
                                <name>max_depth</name>
                                    <value>
                                     <int>`+ customerDto.max_depth + `</int>
                                   </value>
                              </member>`; 
     let bodyUsewnTariff = `  
                             <member>
                                <name>use_own_tariff</name>
                                    <value>
                                     <int>`+ customerDto.use_own_tariff + `</int>
                                   </value>
                              </member>`; 
     let bodyVouchersMgmt = `  
                             <member>
                                <name>vouchers_mgmt</name>
                                    <value>
                                     <int>`+ customerDto.vouchers_mgmt + `</int>
                                   </value>
                              </member>`;  
     let bodyDescription = `  
                             <member>
                                <name>description</name>
                                    <value>
                                     <string>`+ customerDto.description + `</string>
                                   </value>
                              </member>`;  
     let bodyIPasswordPolicy = `  
                             <member>
                                <name>i_password_policy</name>
                                    <value>
                                     <int>`+ customerDto.i_password_policy + `</int>
                                   </value>
                              </member>`;  
     let bodyCallshopEnabled = `  
                             <member>
                                <name>callshop_enabled</name>
                                    <value>
                                     <string>`+ customerDto.callshop_enabled + `</string>
                                   </value>
                              </member>`;  
     let bodyOvercommitProtection = `  
                             <member>
                                <name>overcommit_protection</name>
                                    <value>
                                     <string>`+ customerDto.overcommit_protection + `</string>
                                   </value>
                              </member>`;  
     let bodyOovercommitLimit = `  
                             <member>
                                <name>overcommit_limit</name>
                                    <value>
                                     <string>`+ customerDto.overcommit_limit + `</string>
                                   </value>
                              </member>`;  
     let bodyDidPoolEnabled = `  
                             <member>
                                <name>did_pool_enabled</name>
                                    <value>
                                     <string>`+ customerDto.did_pool_enabled + `</string>
                                   </value>
                              </member>`;  
     let bodyIvrAppsEnabled = `  
                             <member>
                                <name>ivr_apps_enabled</name>
                                    <value>
                                     <string>`+ customerDto.ivr_apps_enabled + `</string>
                                   </value>
                              </member>`;  
     let bodyAsrAcdEnabled = `  
                             <member>
                                <name>asr_acd_enabled</name>
                                    <value>
                                     <string>`+ customerDto.asr_acd_enabled + `</string>
                                   </value>
                              </member>`;  
     let bodyDebitCreditCardsEnabled = `  
                             <member>
                                <name>debit_credit_cards_enabled</name>
                                    <value>
                                     <string>`+ customerDto.debit_credit_cards_enabled + `</string>
                                   </value>
                              </member>`;  
     let bodyConferencingEnabled = `  
                             <member>
                                <name>conferencing_enabled</name>
                                    <value>
                                     <string>`+ customerDto.conferencing_enabled + `</string>
                                   </value>
                              </member>`;  
     let bodySharePaymentProcessors = `  
                             <member>
                                <name>share_payment_processors</name>
                                    <value>
                                     <string>`+ customerDto.share_payment_processors + `</string>
                                   </value>
                              </member>`;  
     let bodyDnclEnabled = `  
                             <member>
                                <name>dncl_enabled</name>
                                    <value>
                                     <string>`+ customerDto.dncl_enabled + `</string>
                                   </value>
                              </member>`;  
     let bodyITimeZone = `  
                             <member>
                                <name>i_time_zone</name>
                                    <value>
                                     <int>`+ customerDto.i_time_zone + `</int>
                                   </value>
                              </member>`;  
     let bodyILang = `  
                             <member>
                                <name>i_lang</name>
                                    <value>
                                     <string>`+ customerDto.i_lang + `</string>
                                   </value>
                              </member>`;  
     let bodyIExport_type = `  
                             <member>
                                <name>i_export_type</name>
                                    <value>
                                     <int>`+ customerDto.i_export_type + `</int>
                                   </value>
                              </member>`;  
     let bodyStartPage = `  
                             <member>
                                <name>start_page</name>
                                    <value>
                                     <int>`+ customerDto.start_page + `</int>
                                   </value>
                              </member>`;     
     let bodyCss = `  
                             <member>
                                <name>css</name>
                                    <value>
                                     <string>`+ customerDto.css + `</string>
                                   </value>
                              </member>`;
     let bodyDnsAlias = `  
                             <member>
                                <name>dns_alias</name>
                                    <value>
                                     <string>`+ customerDto.dns_alias + `</string>
                                   </value>
                              </member>`;
     let bodyMaxSessions = `  
                             <member>
                                <name>max_sessions</name>
                                    <value>
                                     <int>`+ customerDto.max_sessions + `</int>
                                   </value>
                              </member>`;
     let bodyMaxCallsPerSecond = `  
                             <member>
                                <name>max_calls_per_second</name>
                                    <value>
                                     <string>`+ customerDto.max_calls_per_second + `</string>
                                   </value>
                              </member>`;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  

    let body = `<?xml version="1.0"?>
    <methodCall>
      <methodName>createCustomer</methodName>
      <params>
        <param>
          <value>
            <struct>
              <member>
                <name>i_wholesaler</name>
                <string>`+ iWholesaler+ `</string>
            </value>
                </member>
              <member>
              <name>name</name>
          <value>
                 <string>`+ customerDto.name + `</string>
            </value>
               </member>
               <member>
               <name>web_password</name>
          <value>
    <string>`+ customerDto.web_password + `</string>
            </value>
              </member>
              <member>
              <name>i_tariff</name>
          <value>
    <int>`+ customerDto.i_tariff + `</int>
            </value>
              </member>
    `;

    if (customerDto.web_login != null) {
      body = body + bodyWebLogin
    }
    if (customerDto.i_routing_group != null) {
      body = body + bodyIRoutingGroup
    }
    if (customerDto.balance != null) {
      body = body + bodyBalance
    }
    if (customerDto.credit_limit != null) {
      body = body + bodyCreditLimit
    }
    if (customerDto.accounts_mgmt != null) {
      body = body + bodyAccountsMgmt
    }
    if (customerDto.customers_mgmt != null) {
      body = body + bodyCustomersMgmt
    }
    if (customerDto.system_mgmt != null) {
      body = body + bodySystemMgmt
    }
    if (customerDto.accounts_matching_rule != null) {
      body = body + bodyAccountsMatchingRule
    }
    if (customerDto.company_name != null) {
      body = body + bodyCompanyName
    }
    if (customerDto.salutation != null) {
      body = body + bodySalutation
    }
    if (customerDto.first_name != null) {
      body = body + bodyFirstName
    }
    if (customerDto.last_name != null) {
      body = body + bodyLastName
    }
    if (customerDto.mid_init != null) {
      body = body + bodyMidInit
    }
    if (customerDto.street_addr != null) {
      body = body + bodyStreetAddr
    }
    if (customerDto.state != null) {
      body = body + bodyState
    }
    if (customerDto.postal_code != null) {
      body = body + bodyPostalCode
    }
    if (customerDto.city != null) {
      body = body + bodyCity
    }
    if (customerDto.country != null) {
      body = body + bodyCountry
    }
    if (customerDto.contact != null) {
      body = body + bodyContact
    }
    if (customerDto.phone != null) {
      body = body + bodyPhone
    }
    if (customerDto.fax != null) {
      body = body + bodyFax
    }
    if (customerDto.alt_phone != null) {
      body = body + bodyAltPhone
    }
    if (customerDto.alt_contact != null) {
      body = body + bodyAltContact
    }
    if (customerDto.email != null) {
      body = body + bodyEmail
    }
    if (customerDto.cc != null) {
      body = body + bodyCc
    }
    if (customerDto.bcc != null) {
      body = body + bodyBcc
    }
    if (customerDto.mail_from != null) {
      body = body + bodyMailFrom
    }
    if (customerDto.payment_currency != null) {
      body = body + bodyPaymentCurrency
    }
    if (customerDto.payment_method != null) {
      body = body + bodyPaymentMethod
    }
    if (customerDto.min_payment_amount != null) {
      body = body + bodyMinPaymentAmount
    }
    if (customerDto.api_access != null) {
      body = body + bodyApiAccess
    }
    if (customerDto.api_password != null) {
      body = body + bodyApiPassword
    }
    if (customerDto.api_mgmt != null) {
      body = body + bodyApiMgmt
    }
    if (customerDto.i_commission_agent != null) {
      body = body + bodyICommissionAgent
    }
    if (customerDto.commission_size != null) {
      body = body + bodyCommissionSize
    }
    if (customerDto.tariffs_mgmt != null) {
      body = body + bodyTariffsMgmt
    }
    if (customerDto.max_depth != null) {
      body = body + bodyMaxDepth
    }
    if (customerDto.use_own_tariff != null) {
      body = body + bodyUsewnTariff
    }
    if (customerDto.vouchers_mgmt != null) {
      body = body + bodyVouchersMgmt
    }
    if (customerDto.description != null) {
      body = body + bodyDescription
    }
    if (customerDto.i_password_policy != null) {
      body = body + bodyIPasswordPolicy
    }
    if (customerDto.callshop_enabled != null) {
      body = body + bodyCallshopEnabled
    }
    if (customerDto.overcommit_protection != null) {
      body = body + bodyOvercommitProtection
    }
    if (customerDto.overcommit_limit != null) {
      body = body + bodyOovercommitLimit
    }
    if (customerDto.did_pool_enabled != null) {
      body = body + bodyDidPoolEnabled
    }
    if (customerDto.ivr_apps_enabled != null) {
      body = body + bodyIvrAppsEnabled
    }
    if (customerDto.asr_acd_enabled != null) {
      body = body + bodyAsrAcdEnabled
    }
    if (customerDto.debit_credit_cards_enabled != null) {
      body = body + bodyDebitCreditCardsEnabled
    }
    if (customerDto.conferencing_enabled != null) {
      body = body + bodyConferencingEnabled
    }
    if (customerDto.share_payment_processors != null) {
      body = body + bodySharePaymentProcessors
    }
    if (customerDto.dncl_enabled != null) {
      body = body + bodyDnclEnabled
    }
    if (customerDto.i_time_zone != null) {
      body = body + bodyITimeZone
    }
    if (customerDto.i_lang != null) {
      body = body + bodyILang
    }
    if (customerDto.i_export_type != null) {
      body = body + bodyIExport_type
    }
    if (customerDto.start_page != null) {
      body = body + bodyStartPage
    }
    if (customerDto.css != null) {
      body = body + bodyCss
    }
    if (customerDto.dns_alias != null) {
      body = body + bodyDnsAlias
    }
    if (customerDto.max_sessions != null) {
      body = body + bodyMaxSessions
    }
    if (customerDto.max_calls_per_second != null) {
      body = body + bodyMaxCallsPerSecond
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
    return await resp;


  }

  async block(iWholesaler : number , iCustomer : number): Promise<any> {
    const self = this;
    let resp: any;
    let config: AxiosRequestConfig = {};
    config.headers = { 'X-Requested-With': 'XMLHttpRequest', 'Content-Type': 'application/xml' };
    let body: string = `<?xml version="1.0"?>
    <methodCall>
        <methodName>blockCustomer</methodName>
        <params>
            <param>
                <value>
                    <struct>
                        <member>
                            <name>i_account</name>
                            <value>
                                <int>`+ iWholesaler +`</int>
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

  async unblock(iWholesaler : number , iCustomer : number): Promise<any> {
    const self = this;
    let resp: any;
    let config: AxiosRequestConfig = {};
    config.headers = { 'X-Requested-With': 'XMLHttpRequest', 'Content-Type': 'application/xml' };
    let body: string = `<?xml version="1.0"?>
    <methodCall>
        <methodName>unblockCustomer</methodName>
        <params>
            <param>
                <value>
                    <struct>
                        <member>
                            <name>i_account</name>
                            <value>
                                <int>`+ iWholesaler +`</int>
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

  async deleteCustomer(iWholesaler : number , iCustomer : number): Promise<any> {

   
    const self = this;
    let resp: any;
    let config: AxiosRequestConfig = {};
    config.headers = { 'X-Requested-With': 'XMLHttpRequest', 'Content-Type': 'application/xml' };
    let body: string = `<?xml version="1.0"?>
    <methodCall>
        <methodName>deleteCustomer</methodName>
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

  

  async findById(id: string): Promise<Customer | undefined> {
    const options = { relations: relationshipNames };
    return await this.customerRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<Customer>): Promise<Customer | undefined> {
    return await this.customerRepository.findOne(options);
  }

  async findAndCount(options: FindManyOptions<Customer>): Promise<[Customer[], number]> {
    options.relations = relationshipNames;
    return await this.customerRepository.findAndCount(options);
  }

  async save(customer: Customer): Promise<Customer | undefined> {
    return await this.customerRepository.save(customer);
  }

  async update(customer: Customer): Promise<Customer | undefined> {
    return await this.save(customer);
  }

  async delete(customer: Customer): Promise<Customer | undefined> {
    return await this.customerRepository.remove(customer);
  }
}
