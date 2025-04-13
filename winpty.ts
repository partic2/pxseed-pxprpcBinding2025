import { RpcExtendClient1, RpcExtendClientCallable, RpcExtendClientObject } from 'pxprpc/extend'
import { getRpcFunctionOn } from 'partic2/pxprpcClient/registry';
export class Invoker {
    rpc__client?: RpcExtendClient1;
    rpc__RemoteFuncs = {} as { [k: string]: RpcExtendClientCallable | undefined | null };
    async useClient(client: RpcExtendClient1) {
        this.rpc__client = client;
        this.rpc__RemoteFuncs = {}
    }
    
    async load_dll(): Promise<void> {
        let __v1 = await getRpcFunctionOn(this.rpc__client!,'pxprpc_winpty.load_dll', '->');
        let __v2 = await __v1!.call();
    }
    async open(agentFlag:number): Promise<RpcExtendClientObject> {
        let __v1 = await getRpcFunctionOn(this.rpc__client!,'pxprpc_winpty.open', 'l->o');
        let __v2 = await __v1!.call(BigInt(agentFlag));
        return __v2;
    }
    async spawn(pty:RpcExtendClientObject,spawnFlag:number,appName:string,cmdline:string,cwd:string): Promise<void> {
        let __v1 = await getRpcFunctionOn(this.rpc__client!,'pxprpc_winpty.spawn', 'olsss->');
        let __v2 = await __v1!.call(pty,BigInt(spawnFlag),appName,cmdline,cwd);
        return __v2;
    }
    async constdio_name(pty:RpcExtendClientObject): Promise<[string,string,string]> {
        let __v1 = await getRpcFunctionOn(this.rpc__client!,'pxprpc_winpty.constdio_name', 'o->sss');
        let __v2 = await __v1!.call(pty);
        return __v2;
    } 
    async set_size(pty:RpcExtendClientObject,cols:number,rows:number): Promise<void> {
        let __v1 = await getRpcFunctionOn(this.rpc__client!,'pxprpc_winpty.set_size', 'oii->');
        let __v2 = await __v1!.call(pty,cols,rows);
    } 
}
