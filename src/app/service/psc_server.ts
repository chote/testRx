import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
//import {Dataservice} from '../app/../shared/dataservice';
import * as _ from "lodash";
//import 'rxjs/add/operator/map';
//import {Pis_test} from './model';
//import {Contacts} from './model';
//import * as myVar from '../shared/globals'; //<==== this one
@Injectable()
export class ProductService {
    opts: RequestOptions;
    product: any;
    token="xx0";
hcode="10972";
    constructor(private _http: Http) {
//this.token=this._dt.token;
    }
    api: string="https://dmfzero.com/api/aclinic/apis.php/";
  //   api: string = "http://dmfzero.com/api/amat/apis.php/";  
   // api: string="http://dmfzero.com/api/serviceplan/apis.1.php/";
 addData(tbl:string,pd:any): Observable<any> {
      let url= this.api+"post/"+tbl;    //console.log(url);
     // pd['updateId']=" id=6021";
        let body = JSON.stringify(pd);
    //    console.log(body);
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    //    let options = new RequestOptions({ headers: headers });
        return this._http.post(url, body, { headers: headers })
           // .map(res => { console.log(res.json()) })
           .map((response: Response) => response.json()) 
    }
 getStoreTable(store,action,list$:Observable<any>,qlist:string){
     let lns=0;
     let sqlStr;
     
    list$.subscribe(ln => { lns = ln.length; });
    if (lns == 0) {
      this.getTlist(qlist).subscribe(response => {
        sqlStr = response[0]['sqlstr'];
       let sql = { sql: sqlStr };
        this.getSql(sql).subscribe(resp => {
        store.dispatch({ type: action, payload: resp });
       
        });
      });
    }
}
getStoreTableReturn(store,action,list$:Observable<any>,qlist:string){
    let lns=0;
    let arObj:any=[];
    let sqlStr;
    let arList:any=[];
   list$.subscribe(ln => { lns = ln.length;arObj=ln; });
   if (lns == 0) {
     this.getTlist(qlist).subscribe(response => {
       sqlStr = response[0]['sqlstr'];
     
       
      let sql = { sql: sqlStr };
      //console.log(sql);
       this.getSql(sql).subscribe(resp => {
           
           arList = resp;  
         //  console.log(arList);
           
       store.dispatch({ type: action, payload: resp });
       return resp;
       });
     });                
   }else{
       arList=arObj; 
       return ["ss","ee"];
   }


  
   
  
}
    dictDoctor = {};

 genDoctor(dc:any){ 
     let sql = {sql:"select * from doctor"};
     this.getSql(sql).subscribe(resp => {
    resp.forEach(e => {
        dc['d' + e.doctorid] = e.doctorname;
      //  console.log( this.dictDoctor['d' + e.doctorid]);
        
         });
    //    console.log(this.dictDoctor);     
    
  
     });  

 }
   
    genLaboffice(dc:any) { 
     let sql = {sql:"select * from laboffice"};
     this.getSql(sql).subscribe(resp => {
    resp.forEach(e => {
         dc['d' + e.labofficeid] = e.labofficename;
    });
    
     });
       }
 rpad(str:string,pad:string,l:number) { 
     while (str.length < l) { 
         str = str + pad;
     }
     return str;
    }
 getencodeHn(ptname: string, surname: string) {
     if (! surname || surname.length<2){surname="กก" }
    var map={
'ก':'0','ข':'0','ค':'0','ฆ':'0',
'จ':1,'ฉ':1,'ง':1,
'ช':2,'ซ':2,'ฌ':2,
'ด':3,'ต':3,'ฎ':3,'ฏ':3,'ฒ':3,
'ถ':4,'ท':4,'ธ':4,'ฐ':4,'ฑ':4,
'พ':5,'ฟ':5,'ภ':5,'ผ':5,'ฝ':5,
'น':6,'ณ':6,'บ':6,'ป':6,'ม':6,'ย':7,'ว':7,'ศ':7,'ษ':7,'ญ':7,
'ล':8,'ร':8,'ฬ':8,'ส':9,'ห':9,'อ':9,'ฮ':9
        }
         let str1:string = ""; let str2:string = "";
    for (let i = 0; i < ptname.length; i++){
        let xx: string = map[ptname[i]];
        if (xx) { 
            str1 += map[ptname[i]];
        }
       // console.log(str1);
       // console.log(ptname[i]);
        
         }
    str1 = this.rpad(str1, '0', 4);  
   // console.log(str1);
      
     for (let i = 0; i < surname.length; i++){
      
        if (map[surname[i]]) { 
            str2 += map[surname[i]];
        }
        //return map[ptname[i]];
    }
      str2 = this.rpad(str2, '0', 2);    
      let str3 = str1.substr(0,4) + '-' + str2.substr(-2);
    return str3;    
}
url:string;
    getLastId(tbl:any,id:any): Observable<any> {
        this.url= this.api+"lastid/"+tbl+"/"+id+"/"+this.token;
 return this._http.get(this.url)//this._productUrlOne)
            .map((response: Response) => response.json())
           // .catch(this.handleError)
}
getTlist(tlistname:string): Observable<any> {
    this.url= this.api+"tlist/"+tlistname+"/" +this.token;
return this._http.get(this.url)//this._productUrlOne)
        .map((response: Response) => response.json())
       // .catch(this.handleError)
}    
    getCopyObj(source,target) {
         for (let k in source) { 
     target[k] =source[k];
        }
     }
    getFdname(db:string,tbl:string): Observable<any> {
        this.url = this.api + "fdname/" + db + "/" + tbl + "/" + this.token;
       // console.log(this.url);
        
         return this._http.get(this.url)//this._productUrlOne)
            .map((response: Response) => response.json())
           // .catch(this.handleError)
    }
    getDelete(st:any){
  let url= this.api+"del/"+this.token;   // console.log(url);
   let body = JSON.stringify(st);
     let headers = new Headers();
     headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
       return this._http.post(url, body, { headers: headers })

    }
        getDeleteStockin(st:any){
  let url= this.api+"delstockin/"+this.token;  
  console.log(url);
    console.log(st);
        console.log('st');
   let body = JSON.stringify(st);
     let headers = new Headers();
     headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
       return this._http.post(url, body, { headers: headers })

    }
    getSqlKey(st:any): Observable<any> {

      let url= this.api+"postrows";  // console.log(url);
     //st['updateId']=" mid="+st['mid'] +' and hcode=' +st['hcode']  ;
        let body = JSON.stringify(st);
     // console.log(body);
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    //    let options = new RequestOptions({ headers: headers });
        return this._http.post(url, body, { headers: headers })
           // .map(res => { console.log(res.json()) })
           .map((response: Response) => response.json()) 
    }
    getHdcReport() {
       //   let url= this.api+"postrows";  // console.log(url);
     //st['updateId']=" mid="+st['mid'] +' and hcode=' +st['hcode']  ;
     //   let body = JSON.stringify(st);
     // console.log(body);
        let headers = new Headers();
         headers.append('Access-Control-Allow-Headers', 'Content-Type');
        headers.append('Access-Control-Allow-Methods', 'GET');
        headers.append('Access-Control-Allow-Origin', '*');
      //  headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        let url = "http://203.157.102.136/hdc/includes/jsonAction.php?nextList=hospcode&amphurID=3606&tambonID=&_=1490245740103 ";

    // let url= this.api+"deleteRpstSubstock/"+mid+"/"+this.token;  //  console.log(url);
     return this._http.get(url, {headers: headers}).map((response: Response) => response.json())
} 
 getdata(st:any): Observable<any> {
{
      let url= this.api+"getdata";  // console.log(url);
     //st['updateId']=" mid="+st['mid'] +' and hcode=' +st['hcode']  ;
        let body = JSON.stringify(st);
     // console.log(body);
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    //    let options = new RequestOptions({ headers: headers });
        return this._http.post(url, body, { headers: headers })
           // .map(res => { console.log(res.json()) })
           .map((response: Response) => response.json()) 
    }
}
getSql(st:any): Observable<any> {
    {
 //   console.log(st);
        
      let url= this.api+"postrows";  // console.log(url);
     //st['updateId']=" mid="+st['mid'] +' and hcode=' +st['hcode']  ;
        let body = JSON.stringify(st);
     // console.log(body);
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    //    let options = new RequestOptions({ headers: headers });
        return this._http.post(url, body, { headers: headers })
           // .map(res => { console.log(res.json()) })
           .map((response: Response) => response.json()) 
    }
}
getHdc(){
     let url= this.api+"hdc";  //  console.log(url);
     return this._http.get(url).map((response: Response) => response.json())
}    
getDeleteRpstSubstock(mid:number){
     let url= this.api+"deleteRpstSubstock/"+mid+"/"+this.token;  //  console.log(url);
     return this._http.get(url).map((response: Response) => response.json())
}
getUpdateStock(soid:number,mid:number,numnow:number,numstockout:number,stockvalue:number){
     let url= this.api+"updatestock/"+soid+"/"+mid+"/"+numnow+"/"+numstockout+"/"+stockvalue+"/"+this.token;    console.log(url);
     return this._http.get(url).map((response: Response) => response.json())
}
getUpdateMainproduct(mid:number,numinstock:number){
     let url= this.api+"updaterpstproductlist/"+mid+"/"+this.token;  //  console.log(url);
     return this._http.get(url).map((response: Response) => response.json())
}
getUpdateRpstProductList(cupcode:string){
     let url= this.api+"updaterpstproductlist/"+cupcode+"/"+this.token;    console.log(url);
     return this._http.get(url).map((response: Response) => response.json())
}
getAdd(st:any,tbl:any): Observable<any> {
{
      let url= this.api+"post/"+tbl+"/"+this.token;   // console.log(url);
     //st['updateId']=" mid="+st['mid'] +' and hcode=' +st['hcode']  ;
        let body = JSON.stringify(st);
  //console.log(body);
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    //    let options = new RequestOptions({ headers: headers });
        return this._http.post(url, body, { headers: headers })
           // .map(res => { console.log(res.json()) })
           .map((response: Response) => response.json()) 
    }
}
getAddLab(st:any,tbl:any): Observable<any> {
    {
          let url= this.api+"postlab/"+tbl+"/"+this.token;   // console.log(url);
         //st['updateId']=" mid="+st['mid'] +' and hcode=' +st['hcode']  ;
            let body = JSON.stringify(st);
      //console.log(body);
            let headers = new Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        //    let options = new RequestOptions({ headers: headers });
            return this._http.post(url, body, { headers: headers })
               // .map(res => { console.log(res.json()) })
               .map((response: Response) => response.json()) 
        }
    }
getAddLastId(st:any,tbl:any,id:any): Observable<any> {
{
      let url= this.api+"postlastid/"+tbl+"/"+id+"/"+this.token;   // console.log(url);
     //st['updateId']=" mid="+st['mid'] +' and hcode=' +st['hcode']  ;
        let body = JSON.stringify(st);
     // console.log(body);
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    //    let options = new RequestOptions({ headers: headers });
        return this._http.post(url, body, { headers: headers })
           // .map(res => { console.log(res.json()) })
           .map((response: Response) => response.json()) 
    }
}
getLastSoid(soid: number, mid: number) {
        
    let url= this.api+"getLastSoid/"+soid+"/"+mid+"/"+this.token;  console.log(url);
 return this._http.get(url)//this._productUrlOne)
            .map((response: Response) => response.json())
     }
getDeleteSoAndUpdateLot2begin(soid:number){
 let url= this.api+"deletesoandupdatelot2begin/"+soid+"/"+this.token;  // console.log(url);
 return this._http.get(url)//this._productUrlOne)
            .map((response: Response) => response.json())
}
getUpdateSubStocknum(mid:number,hcode:string,oldnum:number,newnum:number){
      let url= this.api+"updatesubstocknum/"+mid+"/"+hcode +"/"+oldnum+"/"+newnum+"/"+this.token;  //  console.log(url);
 return this._http.get(url)//this._productUrlOne)
            .map((response: Response) => response.json())

}
getCkregist(hcode:string){
      let url= this.api+"ckregist/"+hcode +"/"+this.token;    //console.log(url);
 return this._http.get(url).map((response: Response) => response.json())

}
getLogin(st:any): Observable<any> {
{
      let url= this.api+"/login";   // console.log(url);
     //st['updateId']=" mid="+st['mid'] +' and hcode=' +st['hcode']  ;
        let body = JSON.stringify(st);
      
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    //    let options = new RequestOptions({ headers: headers });
        return this._http.post(url, body, { headers: headers })
           // .map(res => { console.log(res.json()) })
           .map((response: Response) => response.json()) 
    }
}
getSaveStock(st:any): Observable<any> {
{

    _.forEach(st, function(v) {
  //console.log(value);
  if(v.numinstock == null ){v.numinstock =0;
     // console.log(v.numinstock);
    }
});
      let url= this.api+"postsubstock/"+this.token;  //  console.log(url);
     //st['updateId']=" mid="+st['mid'] +' and hcode=' +st['hcode']  ;
        let body = JSON.stringify(st);
       //console.log(body);
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    //    let options = new RequestOptions({ headers: headers });
        return this._http.post(url, body, { headers: headers })
           // .map(res => { console.log(res.json()) })
           .map((response: Response) => response.json()) 
    }
}
    getRpstList(): Observable<any> {
        this.url= this.api+"rpstlist/"+this.hcode+"/"+this.token;
   //     console.log(this.url);
 return this._http.get(this.url)//this._productUrlOne)
            .map((response: Response) => response.json())
           // .catch(this.handleError)
    }
  getProductList(hcode:string): Observable<any> {
      this.url= this.api+"productlist/"+this.hcode+"/"+this.token;
 return this._http.get(this.url)//this._productUrlOne)
            .map((response: Response) => response.json())
           // .catch(this.handleError)
    }
      getUserList(hcode:string): Observable<any> {
      this.url= this.api+"userlist/"+this.hcode+"/"+this.token;
 return this._http.get(this.url)//this._productUrlOne)
            .map((response: Response) => response.json())
           // .catch(this.handleError)
    }

getRpstOrder(hcode:string): Observable<any> {
      this.url= this.api+"rpstorder/"+hcode+"/"+this.token;
  //    console.log(this.url);
 return this._http.get(this.url)//this._productUrlOne)
            .map((response: Response) => response.json())
           // .catch(this.handleError)
    }
getRpstStock(hcode:string): Observable<any> {
      this.url= this.api+"rpststock/"+hcode+"/"+this.token;
 //     console.log(this.url);
 return this._http.get(this.url)//this._productUrlOne)
            .map((response: Response) => response.json())
           // .catch(this.handleError)
    }
    getpvContacts(khet:number): Observable<any> {
let url= this.api+"pvcontactlist/"+khet;
let url0= this.api+"pvcontactlist/0";
this._http.get(url0);
        return this._http.get(url)//this._productUrlOne)
            .map((response: Response) => response.json())
           // .catch(this.handleError)
    }
    getCommitee(): Observable<any> {

let url= this.api+"pvcommiteelist";
        return this._http.get(url)//this._productUrlOne)
            .map((response: Response) => response.json())
           // .catch(this.handleError)
    }
     getpvContact(id:number): Observable<any> {
         let url0= this.api+"pvcontact/0";
let url= this.api+"pvcontact/"+id;
this._http.get(url0);

        return this._http.get(url)//this._productUrlOne)
            .map((response: Response) => response.json())
           // .catch(this.handleError)
    }
      getpvContactdetail(id:number): Observable<any> {
    let url0= this.api+"pvcontactdetail/0";      
let url= this.api+"pvcontactdetail/"+id;
this._http.get(url0);
 return this._http.get(url)
            .map((response: Response) => response.json())
          
    }
fnGetnow(ymd=true,dot="-"){
var today = new Date();
let dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
let now="";
let mmm=mm.toString();let ddd = dd.toString();
var yyyy = today.getFullYear();
if(dd<10){
    ddd='0'+ dd;
} 
if(mm<10){
    mmm='0'+mm;
} 
if(ymd){now= yyyy+dot+mmm+dot+ddd;}else{
now= ddd+dot+mmm+dot+yyyy;
}
return now;

}
}
export class Appvar{
      public static isAdmin=false;
      public static logDoctorid=0;
      public static apptitle="โปรแกรมบันทึกคลีนิกทันตกรรม";
    
    }

