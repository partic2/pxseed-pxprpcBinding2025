import {RpcExtendClient1,RpcExtendClientCallable,RpcExtendClientObject} from 'pxprpc/extend'

import { getRpcFunctionOn } from 'partic2/pxprpcClient/registry';
import { getRpc4XplatjJavaServer } from 'partic2/pxprpcBinding/rpcregistry';
export class Invoker{
 RemoteName='AndroidHelper.Wifi';
 rpc__client?:RpcExtendClient1;
 rpc__RemoteFuncs={} as {[k:string]:RpcExtendClientCallable|undefined|null};
 async useClient(client:RpcExtendClient1){
  this.rpc__client=client;
  this.rpc__RemoteFuncs={}
 }
 async ensureFunc(name:string,typedecl:string){
    return await getRpcFunctionOn(this.rpc__client!,this.RemoteName+'.'+name, typedecl);
 }
 async close():Promise<void>{
  let __v1=await this.ensureFunc('close','->');
  let __v2=await __v1!.call();
 }
 async scan():Promise<void>{
  let __v1=await this.ensureFunc('scan','->');
  let __v2=await __v1!.call();
 }
 async getScanResult():Promise<RpcExtendClientObject>{
  let __v1=await this.ensureFunc('getScanResult','->o');
  let __v2=await __v1!.call() as any;
  return __v2;
 }
 async packScanResult(l:RpcExtendClientObject):Promise<Uint8Array>{
  let __v1=await this.ensureFunc('packScanResult','o->b');
  let __v2=await __v1!.call(l) as any;
  return __v2;
 }
 async getWifiInfo1():Promise<Uint8Array>{
  let __v1=await this.ensureFunc('getWifiInfo1','->b');
  let __v2=await __v1!.call() as any;
  return __v2;
 }
 async getState():Promise<Uint8Array>{
  let __v1=await this.ensureFunc('getState','->b');
  let __v2=await __v1!.call() as any;
  return __v2;
 }
 async setWifiEnable(enable:boolean):Promise<void>{
  let __v1=await this.ensureFunc('setWifiEnable','c->');
  let __v2=await __v1!.call(enable);
 }
 async disconnect():Promise<void>{
  let __v1=await this.ensureFunc('disconnect','->');
  let __v2=await __v1!.call();
 }
 async connectTo(ssid:string,psk:string):Promise<void>{
  let __v1=await this.ensureFunc('connectTo','ss->');
  let __v2=await __v1!.call(ssid,psk);
 }
 async startWifiAp(ssid:string,psk:string):Promise<void>{
  let __v1=await this.ensureFunc('startWifiAp','ss->');
  let __v2=await __v1!.call(ssid,psk);
 }
 async stopWifiAp():Promise<void>{
  let __v1=await this.ensureFunc('stopWifiAp','->');
  let __v2=await __v1!.call();
 }
 async p2pInit():Promise<RpcExtendClientObject>{
  let __v1=await this.ensureFunc('p2pInit','->o');
  let __v2=await __v1!.call() as any;
  return __v2;
 }
 async p2pStartDiscover():Promise<void>{
  let __v1=await this.ensureFunc('p2pStartDiscover','->');
  let __v2=await __v1!.call();
 }
 async p2pStopDiscover():Promise<void>{
  let __v1=await this.ensureFunc('p2pStopDiscover','->');
  let __v2=await __v1!.call();
 }
 async p2pGetPeersList():Promise<RpcExtendClientObject>{
  let __v1=await this.ensureFunc('p2pGetPeersList','->o');
  let __v2=await __v1!.call() as any;
  return __v2;
 }
 async describeP2pPeersInfo(peers:RpcExtendClientObject):Promise<Uint8Array>{
  let __v1=await this.ensureFunc('describeP2pPeersInfo','o->b');
  let __v2=await __v1!.call(peers) as any;
  return __v2;
 }
 async p2pConnect(addr:string):Promise<void>{
  let __v1=await this.ensureFunc('p2pConnect','s->');
  let __v2=await __v1!.call(addr);
 }
 async p2pCancelConnect():Promise<void>{
  let __v1=await this.ensureFunc('p2pCancelConnect','->');
  let __v2=await __v1!.call();
 }
 async p2pDisconnect():Promise<void>{
  let __v1=await this.ensureFunc('p2pDisconnect','->');
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