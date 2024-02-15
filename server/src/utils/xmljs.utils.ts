import { Injectable, Logger } from '@nestjs/common';


@Injectable()
export class XmljsUtils {
  logger = new Logger('XmljsUtils');

  constructor() {}



  public methodCallParser(methodCallArray: any): any {
    if (typeof methodCallArray !== 'object') {
        return;
    }
    const memberArray = this.getWithTagName(methodCallArray, 'member').member;
    let responseValue: string | any = Object.values(memberArray.value)[0];
    const tagType = Object.keys(memberArray.value)[0]
    responseValue = this.typeConvert(responseValue, tagType);
    const methodCallJson = {
        name: methodCallArray.methodName,
        params: {
            name: memberArray.name,
            value: responseValue
        }
    }
    return methodCallJson;
  }
  ResponseMethodParser(methodResponseArray: any): any {
    const ResponseMethodJson: any = {};
    if (typeof methodResponseArray !== 'object') {
        return;
    }
    //const structArray = this.getWithTagName(methodResponseArray, 'member').member;

    let structArray : any = {} ;

    if (methodResponseArray.fault !== undefined){

       structArray = this.getWithTagName(methodResponseArray.fault, 'member').member;

    }

    else {
        structArray = this.getWithTagName(methodResponseArray.params, 'member').member;
 
     }

     if (typeof structArray.name === 'string' && Object.keys(structArray).length === 2){


        ResponseMethodJson[structArray.name] = structArray.value.string;
  
      }
    
   else if (Object.keys(structArray).length > 1) {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const self = this;
        Object.keys(structArray).forEach(function (member: any) {
            
            if (typeof Object.values(structArray[member].value)[0] === 'string') {
                let responseValue: string | any = Object.values(structArray[member].value)[0];
                const tagType = Object.keys(structArray[member].value)[0]
                responseValue = self.typeConvert(responseValue, tagType);
                ResponseMethodJson[structArray[member].name] = responseValue;
  
            }
            else {
                const data: Array<any> = [];
                const structs: Array<any> = [];
                self.getAllWithTagName(structArray[member].value, 'struct', structs);
                Object.keys(structs).forEach(function (member: any) {
                    const memberArray = self.getWithTagName(structs[member], 'member').member;
                    const item: any = {};
                    Object.keys(memberArray).map(function (i: any) {
                        let responseValue: string | any = Object.values(memberArray[i].value)[0];
                        const tagType = Object.keys(memberArray[i].value)[0];
                        responseValue = self.typeConvert(responseValue, tagType);
                        item[memberArray[i].name] = responseValue;
                    });
                    data.push(item);
                });
  
                ResponseMethodJson[structArray[member].name] = data;
  
            }
        });
    }
    return ResponseMethodJson;
  }
  
  getWithTagName(object: any, tagName: string) : any{
  
    if (object.hasOwnProperty(tagName)) {
        return object;
    }
    for (let i = 0; i < Object.keys(object).length; i++) {
        if (typeof object[Object.keys(object)[i]] == "object") {
            const o: any = this.getWithTagName(object[Object.keys(object)[i]], tagName);
            if (o != null)
                return o;
        }
    }
    return null;
  }
  
  getAllWithTagName(object: any, tagName: string, result: Array<any> = []): void {
    if (object.hasOwnProperty('struct')) {
        result.push(object);
    }
    for (let i = 0; i < Object.keys(object).length; i++) {
        if (typeof object[Object.keys(object)[i]] == "object") {
            this.getAllWithTagName(object[Object.keys(object)[i]], tagName, result);
        }
    }
  
  }
  typeConvert(value: string, type: string): string | number | boolean | null {
    let newValue: string | number | boolean | null;
  
    switch (type) {
        case "int":
            newValue = parseInt(value);
            break;
        case "nil":
            newValue = null;
            break;
        case "boolean":
            newValue = (value === '1');
            break;
        case "double":
            newValue = parseFloat(value);
            break;
        default:
            newValue = value.toString();
    }
    return newValue;
  }


}
