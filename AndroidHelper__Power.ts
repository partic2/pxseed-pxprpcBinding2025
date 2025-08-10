import {RpcExtendClient1,RpcExtendClientCallable,RpcExtendClientObject} from 'pxprpc/extend'

import { getRpcFunctionOn } from 'partic2/pxprpcClient/registry';
import { getRpc4XplatjJavaServer } from 'partic2/pxprpcBinding/rpcregistry';
export class Invoker{
 RemoteName='AndroidHelper.Power';
 rpc__client?:RpcExtendClient1;
 rpc__RemoteFuncs={} as {[k:string]:RpcExtendClientCallable|undefined|null};
 async useClient(client:RpcExtendClient1){
  this.rpc__client=client;
  this.rpc__RemoteFuncs={}
 }
 async ensureFunc(name:string,typedecl:string){
    return await getRpcFunctionOn(this.rpc__client!,this.RemoteName+'.'+name, typedecl);
 }
 async accuireCpuWakeLock():Promise<void>{
  let __v1=await this.ensureFunc('accuireCpuWakeLock','->');
  let __v2=await __v1!.call();
 }
 async accuireScreenWakeLock(keepBright:boolean):Promise<void>{
  let __v1=await this.ensureFunc('accuireScreenWakeLock','c->');
  let __v2=await __v1!.call(keepBright);
 }
 async releaseWakeLock():Promise<void>{
  let __v1=await this.ensureFunc('releaseWakeLock','->');
  let __v2=await __v1!.call();
 }
 async getBatteryState():Promise<Uint8Array>{
  let __v1=await this.ensureFunc('getBatteryState','->b');
  let __v2=await __v1!.call() as any;
  return __v2;
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
        defaultInvoker.useClient(await getRpc4XplatjJavaServer());
    }
}