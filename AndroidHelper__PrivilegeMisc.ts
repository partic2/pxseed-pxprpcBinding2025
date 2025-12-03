import {RpcExtendClient1,RpcExtendClientCallable,RpcExtendClientObject} from 'pxprpc/extend'

import { getRpcFunctionOn } from 'partic2/pxprpcClient/registry';
import { getRpc4RuntimeBridgeJava0 } from 'partic2/pxprpcBinding/rpcregistry';
export class Invoker{
 RemoteName='AndroidHelper.PrivilegeMisc';
 rpc__client?:RpcExtendClient1;
 rpc__RemoteFuncs={} as {[k:string]:RpcExtendClientCallable|undefined|null};
 async useClient(client:RpcExtendClient1){
  this.rpc__client=client;
  this.rpc__RemoteFuncs={}
 }
 async ensureFunc(name:string,typedecl:string){
    return await getRpcFunctionOn(this.rpc__client!,this.RemoteName+'.'+name, typedecl);
 }
 async isRooted():Promise<boolean>{
  let __v1=await this.ensureFunc('isRooted','->c');
  let __v2=await __v1!.call() as any;
  return __v2;
 }
 async toggleScreen():Promise<void>{
  let __v1=await this.ensureFunc('toggleScreen','->');
  let __v2=await __v1!.call();
 }
 async tryUnlockScreen():Promise<void>{
  let __v1=await this.ensureFunc('tryUnlockScreen','->');
  let __v2=await __v1!.call();
 }
 async inputKeyEvent(keycode:number):Promise<void>{
  let __v1=await this.ensureFunc('inputKeyEvent','i->');
  let __v2=await __v1!.call(keycode);
 }
 async close():Promise<void>{
  let __v1=await this.ensureFunc('close','->');
  let __v2=await __v1!.call();
 }
}
export let defaultInvoker:Invoker|null=null

export async function ensureDefaultInvoker(){
    if(defaultInvoker==null){
        defaultInvoker=new Invoker();
        defaultInvoker.useClient(await getRpc4RuntimeBridgeJava0());
    }
}