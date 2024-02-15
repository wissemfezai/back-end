import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { AccountsRepository } from '../repository/accounts.repository';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse , AxiosRequestConfig} from "axios";
import { XmljsUtils } from '../utils/xmljs.utils';
import * as txml from 'txml';
import { AccountsDto } from './dto/accounts-dto.dto';
import Accounts from '../domain/postgresql/accounts.entity';


const relationshipNames = [];

@Injectable()
export class AccountsService {
  logger = new Logger('AccountsService');

  constructor(@InjectRepository(AccountsRepository) private accountsRepository: AccountsRepository , private httpService: HttpService , private xmlUtils : XmljsUtils) {}


  async listAccounts(): Promise<any> {
    const self = this;
    let resp: any;
    let config: AxiosRequestConfig = {};
    config.headers = { 'X-Requested-With': 'XMLHttpRequest', 'Content-Type': 'application/xml' };
    let body: string = '<?xml version="1.0"?> <methodCall><methodName>listAccounts</methodName> <params><param><value><struct> <member> <name>i_customer</name> <value> <int>1</int> </value> </member> </struct></value></param></params></methodCall>';
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
  async getAccountInfo(): Promise<any> {
    const self = this;
    let resp: any;
    let config: AxiosRequestConfig = {};
    config.headers = { 'X-Requested-With': 'XMLHttpRequest', 'Content-Type': 'application/xml' };
    let body: string = '<?xml version="1.0"?> <methodCall><methodName>getAccountInfo</methodName> <params><param><value><struct> <member> <name>i_account</name> <value> <int>1</int> </value> </member> </struct></value></param></params></methodCall>';
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

  async getRegistrationStatus(): Promise<any> {
    const self = this;
    let resp: any;
    let config: AxiosRequestConfig = {};
    config.headers = { 'X-Requested-With': 'XMLHttpRequest', 'Content-Type': 'application/xml' };
    let body: string = '<?xml version="1.0"?> <methodCall><methodName>getRegistrationStatus</methodName> <params><param><value><struct> <member> <name>i_account</name> <value> <int>1</int> </value> </member> </struct></value></param></params></methodCall>';
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

  async getAccountMinutePlans(): Promise<any> {
    const self = this;
    let resp: any;
    let config: AxiosRequestConfig = {};
    config.headers = { 'X-Requested-With': 'XMLHttpRequest', 'Content-Type': 'application/xml' };
    let body: string = '<?xml version="1.0"?> <methodCall><methodName>getAccountMinutePlans</methodName> <params><param><value><struct> <member> <name>i_account</name> <value> <int>1</int> </value> </member> </struct></value></param></params></methodCall>';
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

  async getAccountRates(): Promise<any> {
    const self = this;
    let resp: any;
    let config: AxiosRequestConfig = {};
    config.headers = { 'X-Requested-With': 'XMLHttpRequest', 'Content-Type': 'application/xml' };
    let body: string = '<?xml version="1.0"?> <methodCall><methodName>getAccountRates</methodName> <params><param><value><struct> <member> <name>i_account</name> <value> <int>1</int> </value> </member> </struct></value></param></params></methodCall>';
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

  async addAccount(accountsDto: AccountsDto, idCustomer: string): Promise<any> {
    const self = this;
    let resp: any;
    let config: AxiosRequestConfig = {};
    config.headers = { 'X-Requested-With': 'XMLHttpRequest', 'Content-Type': 'application/xml' };
    let bodyIAccountClass = `  
      <member>
         <name>i_account_class</name>
             <value>
              <string>`+ accountsDto.i_account_class + `</string>
            </value>
       </member>`;
    let bodyVmTimeout = `  
       <member>
          <name>vm_timeout</name>
              <value>
               <string>`+ accountsDto.vm_timeout + `</string>
             </value>
        </member>`;
    let bodyVmCheckNumber = `  
      <member>
         <name>vm_check_number</name>
             <value>
              <string>`+ accountsDto.vm_check_number + `</string>
            </value>
       </member>`;
    let bodyICommissionAgent = `  
       <member>
          <name>i_commission_agent</name>
              <value>
               <string>`+ accountsDto.i_commission_agent + `</string>
             </value>
        </member>`;
    let bodyCommissionSize = `  
        <member>
           <name>commission_size</name>
               <value>
                <string>`+ accountsDto.commission_size + `</string>
              </value>
         </member>`;
    let bodyBatchTag = `  
         <member>
            <name>batch_tag</name>
                <value>
                 <string>`+ accountsDto.batchTag + `</string>
               </value>
          </member>`;
    let bodyIProvisioning = `  
          <member>
             <name>i_provisioning</name>
                 <value>
                  <string>`+ accountsDto.i_provisioning + `</string>
                </value>
           </member>`;
    let bodyInvoicingEnabled = `  
           <member>
              <name>invoicing_enabled</name>
                  <value>
                   <string>`+ accountsDto.invoicing_enabled + `</string>
                 </value>
            </member>`;
    let bodyIInvoiceTemplate = `  
            <member>
               <name>i_invoice_template</name>
                   <value>
                    <string>`+ accountsDto.i_invoice_template + `</string>
                  </value>
             </member>`;
    let bodyICallerNameType = `  
             <member>
                <name>i_caller_name_type</name>
                    <value>
                     <string>`+ accountsDto.i_caller_name_type + `</string>
                   </value>
              </member>`;
    let bodyCallerName = `  
              <member>
                 <name>caller_name</name>
                     <value>
                      <string>`+ accountsDto.caller_name + `</string>
                    </value>
               </member>`;
    let bodyFollowmeEnabled = `  
               <member>
                  <name>followme_enabled</name>
                      <value>
                       <string>`+ accountsDto.followme_enabled + `</string>
                     </value>
                </member>`;
    let bodyVmDialinAccess = `  
                <member>
                   <name>vm_dialin_access</name>
                       <value>
                        <string>`+ accountsDto.vm_dialin_access + `</string>
                      </value>
                 </member>`;
    let bodyHideOwnCli = `  
                 <member>
                    <name>hide_own_cli</name>
                        <value>
                         <string>`+ accountsDto.hide_own_cli + `</string>
                       </value>
                  </member>`;
    let bodyBlockIncomingAnonymous = `  
                  <member>
                     <name>block_incoming_anonymous</name>
                         <value>
                          <string>`+ accountsDto.block_incoming_anonymous + `</string>
                        </value>
                   </member>`;
    let bodyDndEnabled = `  
                   <member>
                      <name>dnd_enabled</name>
                          <value>
                           <string>`+ accountsDto.dnd_enabled + `</string>
                         </value>
                    </member>`;
    let bodyDescription = `  
                    <member>
                       <name>description</name>
                           <value>
                            <string>`+ accountsDto.description + `</string>
                          </value>
                     </member>`;
    let bodyPassPAssertedId = `  
                     <member>
                        <name>pass_p_asserted_id</name>
                            <value>
                             <string>`+ accountsDto.pass_p_asserted_id + `</string>
                           </value>
                      </member>`;
    let bodyPAssrtIdTranslationRule = `  
                      <member>
                         <name>p_assrt_id_translation_rule</name>
                             <value>
                              <string>`+ accountsDto.p_assrt_id_translation_rule + `</string>
                            </value>
                       </member>`;
    let bodyDnclLookup = `  
                       <member>
                          <name>dncl_lookup</name>
                              <value>
                               <string>`+ accountsDto.dncl_lookup + `</string>
                             </value>
                        </member>`;
    let bodyGenerateRingbacktone = `  
                        <member>
                           <name>generate_ringbacktone</name>
                               <value>
                                <string>`+ accountsDto.generate_ringbacktone + `</string>
                              </value>
                         </member>`;
    let bodyAllowFreeOnnetCalls = `  
                         <member>
                            <name>allow_free_onnet_calls</name>
                                <value>
                                 <string>`+ accountsDto.allow_free_onnet_calls + `</string>
                               </value>
                          </member>`;
    let bodyStartPage = `  
                          <member>
                             <name>start_page</name>
                                 <value>
                                  <string>`+ accountsDto.start_page + `</string>
                                </value>
                           </member>`;
    let bodyTrustPrivacyHdrs = `  
                           <member>
                              <name>trust_privacy_hdrs</name>
                                  <value>
                                   <string>`+ accountsDto.trust_privacy_hdrs + `</string>
                                 </value>
                            </member>`;
    let bodyLanAccess = `  
                            <member>
                               <name>lan_access</name>
                                   <value>
                                    <string>`+ accountsDto.lan_access + `</string>
                                  </value>
                             </member>`;
    let bodyMaxCallsPerSecond = `  
                             <member>
                                <name>max_calls_per_second</name>
                                    <value>
                                     <string>`+ accountsDto.max_calls_per_second + `</string>
                                   </value>
                              </member>`;
    let body = `<?xml version="1.0"?>
    <methodCall>
      <methodName>createAccount</methodName>
      <params>
        <param>
          <value>
            <struct>
              <member>
                <name>i_customer</name>
                <string>`+ idCustomer + `</string>
            </value>
                </member>
              <member>
              <name>username</name>
          <value>
                 <string>`+ accountsDto.username + `</string>
            </value>
               </member>
               <member>
               <name>web_password</name>
          <value>
    <string>`+ accountsDto.web_password + `</string>
            </value>
              </member>
              <member>
              <name>authname</name>
          <value>
    <string>`+ accountsDto.authname + `</string>
            </value>
              </member>
              <member>
              <name>voip_password</name>
          <value>
    <string>`+ accountsDto.voip_password + `</string>
    </value>
              </member>
              <member>
              <name>i_tariff</name>
    <value>
    <int>`+ accountsDto.i_tariff + `</int>
    </value>
                  </member>
                  <member>
              <name>i_time_zone</name>
    <value>
    <int>`+ accountsDto.i_time_zone + `</int>
    </value>
                  </member>
                  <member>
              <name>i_lang</name>
    <value>
    <string>`+ accountsDto.i_lang + `</string>
    </value>
                  </member>
                  <member>
              <name>balance</name>
    <value>
    <double>`+ accountsDto.balance + `</double>
    </value>
                  </member>
                  <member>
              <name>credit_limit</name>
    <value>
    <double>`+ accountsDto.credit_limit + `</double>
    </value>
                  </member>
                  <member>
               <name>blocked</name>
    <value>
    <int>`+ accountsDto.blocked + `</int>
    </value>
                  </member>
                  <member>
              <name>max_sessions</name>
    <value>
    <int>`+ accountsDto.max_sessions + `</int>
    </value>
                  </member>
                  <member>
              <name>max_credit_time</name>
    <value>
    <int>`+ accountsDto.max_credit_time + `</int>
    </value>
                  </member>
                  <member>
              <name>translation_rule</name>
    <value>
    <string>`+ accountsDto.translation_rule + `</string>
    </value>
                  </member>
                  <member>
              <name>cli_translation_rule</name>
    <value>
    <string>`+ accountsDto.cli_translation_rule + `</string>
    </value>
                  </member>
                  <member>
              <name>cpe_number</name>
    <value>
    <string>`+ accountsDto.cpe_number + `</string>
    </value>
                  </member>
                  <member>
              <name>i_export_type</name>
    <value>
    <int>`+ accountsDto.i_export_type + `</int>
    </value>
                  </member>
                  <member>
              <name>reg_allowed</name>
    <value>
    <int>`+ accountsDto.reg_allowed + `</int>
    </value>
                  </member>
                  <member>
              <name>trust_cli</name>
    <value>
    <int>`+ accountsDto.trust_cli + `</int>
    </value>
                  </member>
                  <member>
              <name>disallow_loops</name>
    <value>
    <int>`+ accountsDto.disallow_loops + `</int>
    </value>
                  </member>
                  <member>
              <name>vm_password</name>
    <value>
    <string>`+ accountsDto.vm_password + `</string>
    </value>
                  </member>
                  <member>
              <name>vm_enabled</name>
    <value>
    <int>`+ accountsDto.vm_enabled + `</int>
    </value>
                  </member>
                  <member>
              <name>vm_notify_emails</name>
    <value>
    <string>`+ accountsDto.vm_notify_emails + `</string>
    </value>
                  </member>
                  <member>
              <name>vm_forward_emails</name>
    <value>
    <string>`+ accountsDto.vm_forward_emails + `</string>
    </value>
                  </member>
                  <member>
              <name>vm_del_after_fwd</name>
    <value>
    <int>`+ accountsDto.vm_del_after_fwd + `</int>
    </value>
                  </member>
                  <member>
              <name>company_name</name>
    <value>
    <string>`+ accountsDto.company_name + `</string>
    </value>
                  </member>
                  <member>
              <name>salutation</name>
    <value>
    <string>`+ accountsDto.salutation + `</string>
    </value>
                  </member>
                  <member>
              <name>first_name</name>
    <value>
    <string>`+ accountsDto.first_name + `</string>
    </value>
                  </member>
                  <member>
              <name>mid_init</name>
    <value>
    <string>`+ accountsDto.mid_init + `</string>
    </value>
                  </member>
                  <member>
              <name>last_name</name>
    <value>
    <string>`+ accountsDto.last_name + `</string>
    </value>
                  </member>
                  <member>
              <name>street_addr</name>
    <value>
    <string>`+ accountsDto.street_addr + `</string>
    </value>
                  </member>
                  <member>
              <name>state</name>
    <value>
    <string>`+ accountsDto.state + `</string>
    </value>
                  </member>
                  <member>
              <name>postal_code</name>
    <value>
    <string>`+ accountsDto.postal_code + `</string>
    </value>
                  </member>
                  <member>
              <name>city</name>
    <value>
    <string>`+ accountsDto.city + `</string>
    </value>
                  </member>
                  <member>
              <name>country</name>
    <value>
    <string>`+ accountsDto.country + `</string>
    </value>
                  </member>
                  <member>
              <name>contact</name>
    <value>
    <string>`+ accountsDto.contact + `</string>
    </value>
                  </member>
                  <member>
              <name>phone</name>
    <value>
    <string>`+ accountsDto.phone + `</string>
    </value>
                  </member>
                  <member>
              <name>fax</name>
    <value>
    <string>`+ accountsDto.fax + `</string>
    </value>
                  </member>
                  <member>
              <name>alt_phone</name>
    <value>
    <string>`+ accountsDto.alt_phone + `</string>
    </value>
                  </member>
                  <member>
              <name>alt_contact</name>
    <value>
    <string>`+ accountsDto.alt_contact + `</string>
    </value>
                  </member>
                  <member>
              <name>email</name>
    <value>
    <string>`+ accountsDto.email + `</string>
    </value>
                  </member>
                  <member>
              <name>cc</name>
    <value>
    <string>`+ accountsDto.cc + `</string>
    </value>
                  </member>
                  <member>
              <name>bcc</name>
    <value>
    <string>`+ accountsDto.bcc + `</string>
    </value>
                  </member>
                  <member>
              <name>payment_currency</name>
    <value>
    <string>`+ accountsDto.payment_currency + `</string>
    </value>
                  </member>
                  <member>
              <name>payment_method</name>
    <value>
    <int>`+ accountsDto.payment_method + `</int>
    </value>
                  </member>
                  <member>
              <name>on_payment_action</name>
    <value>
    <int>`+ accountsDto.on_payment_action + `</int>
    </value>
                  </member>
                  <member>
              <name>min_payment_amount</name>
    <value>
    <double>`+ accountsDto.min_payment_amount + `</double>
    </value>
                  </member>
                  <member>
              <name>lifetime</name>
    <value>
    <int>`+ accountsDto.lifetime + `</int>
    </value>
                  </member>
                  <member>
              <name>preferred_codec</name>
    <value>
    <int>`+ accountsDto.preferred_codec + `</int>
    </value>
                  </member>
                  <member>
              <name>use_preferred_codec_only</name>
    <value>
    <int>`+ accountsDto.use_preferred_codec_only + `</int>
    </value>
                  </member>
                  <member>
              <name>welcome_call_ivr</name>
    <value>
    <int>`+ accountsDto.welcome_call_ivr + `</int>
    </value>
                  </member>
    `;

    if (accountsDto.i_account_class != null) {
      body = body + bodyIAccountClass
    }
    if (accountsDto.vm_timeout != null) {
      body = body + bodyVmTimeout
    }
    if (accountsDto.vm_check_number != null) {
      body = body + bodyVmCheckNumber
    }
    if (accountsDto.i_commission_agent != null) {
      body = body + bodyICommissionAgent
    }
    if (accountsDto.lan_access != null) {
      body = body + bodyLanAccess
    }
    if (accountsDto.batchTag != null) {
      body = body + bodyBatchTag
    }
    if (accountsDto.i_provisioning != null) {
      body = body + bodyIProvisioning
    }
    if (accountsDto.invoicing_enabled != null) {
      body = body + bodyInvoicingEnabled
    }
    if (accountsDto.i_invoice_template != null) {
      body = body + bodyIInvoiceTemplate
    }
    if (accountsDto.i_caller_name_type != null) {
      body = body + bodyICallerNameType
    }
    if (accountsDto.caller_name != null) {
      body = body + bodyCallerName
    }
    if (accountsDto.followme_enabled != null) {
      body = body + bodyFollowmeEnabled
    }
    if (accountsDto.vm_dialin_access != null) {
      body = body + bodyVmDialinAccess
    }
    if (accountsDto.hide_own_cli != null) {
      body = body + bodyHideOwnCli
    }
    if (accountsDto.block_incoming_anonymous != null) {
      body = body + bodyBlockIncomingAnonymous
    }
    if (accountsDto.dnd_enabled != null) {
      body = body + bodyDndEnabled
    }
    if (accountsDto.description != null) {
      body = body + bodyDescription
    }
    if (accountsDto.pass_p_asserted_id != null) {
      body = body + bodyPassPAssertedId
    }
    if (accountsDto.dncl_lookup != null) {
      body = body + bodyDnclLookup
    }
    if (accountsDto.generate_ringbacktone != null) {
      body = body + bodyGenerateRingbacktone
    }
    if (accountsDto.allow_free_onnet_calls != null) {
      body = body + bodyAllowFreeOnnetCalls
    }
    if (accountsDto.start_page != null) {
      body = body + bodyStartPage
    }
    if (accountsDto.trust_privacy_hdrs != null) {
      body = body + bodyTrustPrivacyHdrs
    }
    if (accountsDto.max_calls_per_second != null) {
      body = body + bodyMaxCallsPerSecond
    }
    if (accountsDto.p_assrt_id_translation_rule != null) {
      body = body + bodyPAssrtIdTranslationRule
    }
    if (accountsDto.commission_size != null) {
      body = body + bodyCommissionSize
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
  async create(accounts: Accounts): Promise<Accounts | undefined> {
    return await this.accountsRepository.save(accounts);
  }

  async delete(idAccount : number): Promise<any> {

   
    const self = this;
    let resp: any;
    let config: AxiosRequestConfig = {};
    config.headers = { 'X-Requested-With': 'XMLHttpRequest', 'Content-Type': 'application/xml' };
    let body: string = `<?xml version="1.0"?>
    <methodCall>
        <methodName>deleteAccount</methodName>
        <params>
            <param>
                <value>
                    <struct>
                        <member>
                            <name>i_account</name>
                            <value>
                                <int>`+ idAccount +`</int>
                            </value>
                        </member>
                        <member>
                        <name>i_customer</name>
                        <value>
                            <int>`+ idAccount +`</int>
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

  async update(idAccount : number , accountsDto: AccountsDto): Promise<any> {
    const self = this;
    let resp: any;
    let config: AxiosRequestConfig = {};
    config.headers = { 'X-Requested-With': 'XMLHttpRequest', 'Content-Type': 'application/xml' };
    let body: string = `<?xml version="1.0"?>
<methodCall>
    <methodName>createAccount</methodName>
    <params>
        <param>
            <value>
                <struct>
                    <member>
                        <name>i_customer</name>
                        <string>1</string>
            </value>
            </member>
            <member>
                <name>i_account</name>
                <string>`+ idAccount + `</string>
                </value>
            </member>
            <member>
                <name>username</name>
                <value>
                    <string>`+ accountsDto.username + `</string>
                </value>
            </member>
            <member>
                <name>web_password</name>
                <value>
                    <string>`+ accountsDto.web_password + `</string>
                </value>
            </member>
            <member>
                <name>authname</name>
                <value>
                    <string>`+ accountsDto.authname + `</string>
                </value>
            </member>
            <member>
                <name>voip_password</name>
                <value>
                    <string>`+ accountsDto.voip_password + `</string>
                </value>
            </member>
            <member>
                <name>i_tariff</name>
                <value>
                    <int>`+ accountsDto.i_tariff + `</int>
                </value>
            </member>
            <member>
                <name>i_time_zone</name>
                <value>
                    <int>`+ accountsDto.i_time_zone + `</int>
                </value>
            </member>
            <member>
                <name>i_lang</name>
                <value>
                    <string>`+ accountsDto.i_lang + `</string>
                </value>
            </member>
            <member>
                <name>balance</name>
                <value>
                    <double>`+ accountsDto.balance + `</double>
                </value>
            </member>
            <member>
                <name>credit_limit</name>
                <value>
                    <double>`+ accountsDto.credit_limit + `</double>
                </value>
            </member>
            <member>
                <name>blocked</name>
                <value>
                    <int>`+ accountsDto.blocked + `</int>
                </value>
            </member>
            <member>
                <name>max_sessions</name>
                <value>
                    <int>`+ accountsDto.max_sessions + `</int>
                </value>
            </member>
            <member>
                <name>max_credit_time</name>
                <value>
                    <int>`+ accountsDto.max_credit_time + `</int>
                </value>
            </member>
            <member>
                <name>translation_rule</name>
                <value>
                    <string>`+ accountsDto.translation_rule + `</string>
                </value>
            </member>
            <member>
                <name>cli_translation_rule</name>
                <value>
                    <string>`+ accountsDto.cli_translation_rule + `</string>
                </value>
            </member>
            <member>
                <name>cpe_number</name>
                <value>
                    <string>`+ accountsDto.cpe_number + `</string>
                </value>
            </member>
            <member>
                <name>i_export_type</name>
                <value>
                    <int>`+ accountsDto.i_export_type + `</int>
                </value>
            </member>
            <member>
                <name>reg_allowed</name>
                <value>
                    <int>`+ accountsDto.reg_allowed + `</int>
                </value>
            </member>
            <member>
                <name>trust_cli</name>
                <value>
                    <int>`+ accountsDto.trust_cli + `</int>
                </value>
            </member>
            <member>
                <name>disallow_loops</name>
                <value>
                    <int>`+ accountsDto.disallow_loops + `</int>
                </value>
            </member>
            <member>
                <name>vm_password</name>
                <value>
                    <string>`+ accountsDto.vm_password + `</string>
                </value>
            </member>
            <member>
                <name>vm_enabled</name>
                <value>
                    <int>`+ accountsDto.vm_enabled + `</int>
                </value>
            </member>
            <member>
                <name>vm_notify_emails</name>
                <value>
                    <string>`+ accountsDto.vm_notify_emails + `</string>
                </value>
            </member>
            <member>
                <name>vm_forward_emails</name>
                <value>
                    <string>`+ accountsDto.vm_forward_emails + `</string>
                </value>
            </member>
            <member>
                <name>vm_del_after_fwd</name>
                <value>
                    <int>`+ accountsDto.vm_del_after_fwd + `</int>
                </value>
            </member>
            <member>
                <name>company_name</name>
                <value>
                    <string>`+ accountsDto.company_name + `</string>
                </value>
            </member>
            <member>
                <name>salutation</name>
                <value>
                    <string>`+ accountsDto.salutation + `</string>
                </value>
            </member>
            <member>
                <name>first_name</name>
                <value>
                    <string>`+ accountsDto.first_name + `</string>
                </value>
            </member>
            <member>
                <name>mid_init</name>
                <value>
                    <string>`+ accountsDto.mid_init + `</string>
                </value>
            </member>
            <member>
                <name>last_name</name>
                <value>
                    <string>`+ accountsDto.last_name + `</string>
                </value>
            </member>
            <member>
                <name>street_addr</name>
                <value>
                    <string>`+ accountsDto.street_addr + `</string>
                </value>
            </member>
            <member>
                <name>state</name>
                <value>
                    <string>`+ accountsDto.state + `</string>
                </value>
            </member>
            <member>
                <name>postal_code</name>
                <value>
                    <string>`+ accountsDto.postal_code + `</string>
                </value>
            </member>
            <member>
                <name>city</name>
                <value>
                    <string>`+ accountsDto.city + `</string>
                </value>
            </member>
            <member>
                <name>country</name>
                <value>
                    <string>`+ accountsDto.country + `</string>
                </value>
            </member>
            <member>
                <name>contact</name>
                <value>
                    <string>`+ accountsDto.contact + `</string>
                </value>
            </member>
            <member>
                <name>phone</name>
                <value>
                    <string>`+ accountsDto.phone + `</string>
                </value>
            </member>
            <member>
                <name>fax</name>
                <value>
                    <string>`+ accountsDto.fax + `</string>
                </value>
            </member>
            <member>
                <name>alt_phone</name>
                <value>
                    <string>`+ accountsDto.alt_phone + `</string>
                </value>
            </member>
            <member>
                <name>alt_contact</name>
                <value>
                    <string>`+ accountsDto.alt_contact + `</string>
                </value>
            </member>
            <member>
                <name>email</name>
                <value>
                    <string>`+ accountsDto.email + `</string>
                </value>
            </member>
            <member>
                <name>cc</name>
                <value>
                    <string>`+ accountsDto.cc + `</string>
                </value>
            </member>
            <member>
                <name>bcc</name>
                <value>
                    <string>`+ accountsDto.bcc + `</string>
                </value>
            </member>
            <member>
                <name>payment_currency</name>
                <value>
                    <string>`+ accountsDto.payment_currency + `</string>
                </value>
            </member>
            <member>
                <name>payment_method</name>
                <value>
                    <int>`+ accountsDto.payment_method + `</int>
                </value>
            </member>
            <member>
                <name>on_payment_action</name>
                <value>
                    <int>`+ accountsDto.on_payment_action + `</int>
                </value>
            </member>
            <member>
                <name>min_payment_amount</name>
                <value>
                    <double>`+ accountsDto.min_payment_amount + `</double>
                </value>
            </member>
            <member>
                <name>lifetime</name>
                <value>
                    <int>`+ accountsDto.lifetime + `</int>
                </value>
            </member>
            <member>
                <name>preferred_codec</name>
                <value>
                    <int>`+ accountsDto.preferred_codec + `</int>
                </value>
            </member>
            <member>
                <name>use_preferred_codec_only</name>
                <value>
                    <int>`+ accountsDto.use_preferred_codec_only + `</int>
                </value>
            </member>
            <member>
                <name>welcome_call_ivr</name>
                <value>
                    <int>`+ accountsDto.welcome_call_ivr + `</int>
                </value>
            </member>
            </struct>
            </value>
        </param>
    </params>
</methodCall>
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


  async block(idAccount : number): Promise<any> {
    const self = this;
    let resp: any;
    let config: AxiosRequestConfig = {};
    config.headers = { 'X-Requested-With': 'XMLHttpRequest', 'Content-Type': 'application/xml' };
    let body: string = `<?xml version="1.0"?>
    <methodCall>
        <methodName>blockAccount</methodName>
        <params>
            <param>
                <value>
                    <struct>
                        <member>
                            <name>i_account</name>
                            <value>
                                <int>`+ idAccount +`</int>
                            </value>
                        </member>
                        <member>
                        <name>i_customer</name>
                        <value>
                            <int>`+ idAccount +`</int>
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

  async unblock(idAccount : number): Promise<any> {
    const self = this;
    let resp: any;
    let config: AxiosRequestConfig = {};
    config.headers = { 'X-Requested-With': 'XMLHttpRequest', 'Content-Type': 'application/xml' };
    let body: string = `<?xml version="1.0"?>
    <methodCall>
        <methodName>unblockAccount</methodName>
        <params>
            <param>
                <value>
                    <struct>
                        <member>
                            <name>i_account</name>
                            <value>
                                <int>`+ idAccount +`</int>
                            </value>
                        </member>
                        <member>
                        <name>i_customer</name>
                        <value>
                            <int>`+ idAccount +`</int>
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
