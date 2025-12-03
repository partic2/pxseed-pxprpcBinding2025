import { RpcExtendClient1, RpcExtendClientCallable, RpcExtendClientObject, TableSerializer } from 'pxprpc/extend'
import { addClient, getPersistentRegistered, getRpcFunctionOn, ServerHostWorker1RpcName } from 'partic2/pxprpcClient/registry';
import { getRpc4RuntimeBridge0 } from 'partic2/pxprpcBinding/rpcregistry';
import { Serializer } from 'pxprpc/base';

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
    async CreateKeyboardEventListener(): Promise<RpcExtendClientCallable> {
        let __v1 = await getRpcFunctionOn(this.rpc__client!,'pxprpc_win32helpers.CreateKeyboardEventListener', '->o');
        let __v2 = await (await __v1!.call() as RpcExtendClientObject).asCallable();
        return __v2.typedecl('->i');
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
/*
type:
#define INPUT_MOUSE 0
#define INPUT_KEYBOARD 1
#define INPUT_HARDWARE 2

dwFlags:
#define KEYEVENTF_EXTENDEDKEY 0x0001
#define KEYEVENTF_KEYUP 0x0002
#define KEYEVENTF_UNICODE 0x0004
#define KEYEVENTF_SCANCODE 0x0008

#define MOUSEEVENTF_MOVE 0x0001
#define MOUSEEVENTF_LEFTDOWN 0x0002
#define MOUSEEVENTF_LEFTUP 0x0004
#define MOUSEEVENTF_RIGHTDOWN 0x0008
#define MOUSEEVENTF_RIGHTUP 0x0010
#define MOUSEEVENTF_MIDDLEDOWN 0x0020
#define MOUSEEVENTF_MIDDLEUP 0x0040
#define MOUSEEVENTF_XDOWN 0x0080
#define MOUSEEVENTF_XUP 0x0100
#define MOUSEEVENTF_WHEEL 0x0800
#if _WIN32_WINNT >= 0x0600
#define MOUSEEVENTF_HWHEEL 0x01000
#endif
#if WINVER >= 0x0600
#define MOUSEEVENTF_MOVE_NOCOALESCE 0x2000
#endif
#define MOUSEEVENTF_VIRTUALDESK 0x4000
#define MOUSEEVENTF_ABSOLUTE 0x8000
*/
    async SendInput(events:Array<{type:number,dwFlags:number,ki?:{wVk:number},mi?:{dx:number,dy:number,mouseData:number}}>){
        let ser=new Serializer().prepareSerializing(64);
        ser.putInt(events.length);
        for(let t1 of events){
            ser.putInt(t1.type);
            ser.putInt(t1.dwFlags);
            if(t1.type===1){
                ser.putInt(t1.ki!.wVk);
            }else{
                ser.putInt(t1.mi!.dx);
                ser.putInt(t1.mi!.dy);
                ser.putInt(t1.mi!.mouseData);
            }
        }
        let __v1 = await getRpcFunctionOn(this.rpc__client!,'pxprpc_win32helpers.SendInput', 'b->');
        let __v2 = await __v1!.call(ser.build());
        return
    }
    async SetCursorPos(x:number,y:number){
        let __v1 = await getRpcFunctionOn(this.rpc__client!,'pxprpc_win32helpers.SetCursorPos', 'ii->');
        let __v2 = await __v1!.call(x,y);
        return
    }
}


export let defaultInvoker:Invoker|null=null

export async function ensureDefaultInvoker(){
    if(defaultInvoker==null){
        defaultInvoker=new Invoker();
        defaultInvoker.useClient(await getRpc4RuntimeBridge0());
    }
}