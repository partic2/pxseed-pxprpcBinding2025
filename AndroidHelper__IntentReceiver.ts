import {RpcExtendClient1,RpcExtendClientCallable,RpcExtendClientObject} from 'pxprpc/extend'

import { getRpcFunctionOn } from 'partic2/pxprpcClient/registry';
import { getRpc4RuntimeBridgeJava0 } from 'partic2/pxprpcBinding/rpcregistry';
export class Invoker{
 RemoteName='AndroidHelper.IntentReceiver';
 rpc__client?:RpcExtendClient1;
 rpc__RemoteFuncs={} as {[k:string]:RpcExtendClientCallable|undefined|null};
 async useClient(client:RpcExtendClient1){
  this.rpc__client=client;
  this.rpc__RemoteFuncs={}
 }
 async ensureFunc(name:string,typedecl:string){
    return await getRpcFunctionOn(this.rpc__client!,this.RemoteName+'.'+name, typedecl);
 }
 async init():Promise<void>{
  let __v1=await this.ensureFunc('init','->');
  let __v2=await __v1!.call();
 }
 async close():Promise<void>{
  let __v1=await this.ensureFunc('close','->');
  let __v2=await __v1!.call();
 }
 async queueIntent(event:string,data:Uint8Array):Promise<void>{
  let __v1=await this.ensureFunc('queueIntent','sb->');
  let __v2=await __v1!.call(event,data);
 }
 async waitIntents(timeoutSec:number):Promise<Uint8Array>{
  let __v1=await this.ensureFunc('waitIntents','i->b');
  let __v2=await __v1!.call(timeoutSec) as any;
  return __v2;
 }
 async eventDispatcher():Promise<RpcExtendClientObject>{
  let __v1=await this.ensureFunc('eventDispatcher','->o');
  let __v2=await __v1!.call() as any;
  return __v2;
 }
 async startListenEvent(action:string):Promise<void>{
  let __v1=await this.ensureFunc('startListenEvent','s->');
  let __v2=await __v1!.call(action);
 }
 async stopListenEvent(action:string):Promise<void>{
  let __v1=await this.ensureFunc('stopListenEvent','s->');
  let __v2=await __v1!.call(action);
 }
}
export let defaultInvoker:Invoker|null=null

export async function ensureDefaultInvoker(){
    if(defaultInvoker==null){
        defaultInvoker=new Invoker();
        defaultInvoker.useClient(await getRpc4RuntimeBridgeJava0());
    }
}