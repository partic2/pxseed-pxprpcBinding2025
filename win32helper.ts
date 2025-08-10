import { RpcExtendClient1, RpcExtendClientCallable, RpcExtendClientObject, TableSerializer } from 'pxprpc/extend'
import { addClient, getPersistentRegistered, getRpcFunctionOn, ServerHostWorker1RpcName } from 'partic2/pxprpcClient/registry';
import { getRpc4XplatjCServer } from 'partic2/pxprpcBinding/rpcregistry';
export class Invoker {
    rpc__client?: RpcExtendClient1;
    rpc__RemoteFuncs = {} as { [k: string]: RpcExtendClientCallable | undefined | null };
    async useClient(client: RpcExtendClient1) {
        this.rpc__client = client;
        this.rpc__RemoteFuncs = {}
    }
    async TakeScreenShot(memchunk:RpcExtendClientObject): Promise<number> {
        let __v1 = await getRpcFunctionOn(this.rpc__client!,'pxprpc_win32helpers.TakeScreenShot', 'o->i');
        let __v2 = await __v1!.call(memchunk);
        return __v2
    }
    async GetKeyState(keys:number[]): Promise<Uint8Array> {
        let __v1 = await getRpcFunctionOn(this.rpc__client!,'pxprpc_win32helpers.GetKeyState', 'b->b');
        let t1=new Uint8Array(keys);
        let __v2 = await __v1!.call(t1);
        return __v2;
    }
    async CreateKeyboardEventListener(): Promise<RpcExtendClientObject> {
        let __v1 = await getRpcFunctionOn(this.rpc__client!,'pxprpc_win32helpers.CreateKeyboardEventListener', '->o');
        let __v2 = await __v1!.call();
        return __v2;
    }
    async PullKeyboardEvent(listener:RpcExtendClientObject): Promise<number> {
        let __v1 = await getRpcFunctionOn(this.rpc__client!,'pxprpc_win32helpers.PullKeyboardEvent', 'o->i');
        let __v2 = await __v1!.call(listener);
        return __v2;
    }
    async EnumWindows():Promise<Array<{handle:BigInt,title:string,left:number,top:number,right:number,bottom:number}>>{
        let __v1 = await getRpcFunctionOn(this.rpc__client!,'pxprpc_win32helpers.EnumWindows', '->b');
        let __v2 = await __v1!.call();
        let t1=new TableSerializer().load(__v2);
        return t1.toMapArray();
    }
    async SetWindowZIndex(hwnd:BigInt,pos:'topmost'|'top'|'notopmost'|'bottom'):Promise<void>{
        let __v1 = await getRpcFunctionOn(this.rpc__client!,'pxprpc_win32helpers.SetWindowZIndex', 'ls->');
        let __v2 = await __v1!.call(hwnd,pos);
        return
    }
}


export let defaultInvoker:Invoker|null=null

export async function ensureDefaultInvoker(){
    if(defaultInvoker==null){
        defaultInvoker=new Invoker();
        defaultInvoker.useClient(await getRpc4XplatjCServer());
    }
}