

let platform='win32'

type UiEvent={
    type:'key up'|'key down'
    key:number
}|{
    type:'mouse up'|'mouse down',
    key:'left'|'right'|'middle'
}|{
    type:'mouse move absolutely',
    x:number,y:number
}|{
    type:'mouse wheel',
    offset:number
}

export async function sendInput(evts:Array<UiEvent>){
    if(platform==='win32'){
        let win32helper=await import('./win32helper');
        await win32helper.ensureDefaultInvoker();
        let winevent:{type:number,dwFlags:number,ki?:{wVk:number},mi?:{dx:number,dy:number,mouseData:number}}[]=[];
        for(let t1 of evts){
            switch(t1.type){
                case 'key down':
                    winevent.push({type:1,dwFlags:0,ki:{wVk:t1.key}});
                    break;
                case 'key up':
                    winevent.push({type:1,dwFlags:2,ki:{wVk:t1.key}});
                    break;
                case 'mouse up':
                    switch(t1.key){
                        case 'left':
                            winevent.push({type:0,dwFlags:4,mi:{dx:0,dy:0,mouseData:0}});
                            break;
                        case 'right':
                            winevent.push({type:0,dwFlags:0x10,mi:{dx:0,dy:0,mouseData:0}});
                            break;
                        case 'middle':
                            winevent.push({type:0,dwFlags:0x40,mi:{dx:0,dy:0,mouseData:0}});
                            break;
                    }
                    break;
                case 'mouse down':
                    switch(t1.key){
                        case 'left':
                            winevent.push({type:0,dwFlags:2,mi:{dx:0,dy:0,mouseData:0}});
                            break;
                        case 'right':
                            winevent.push({type:0,dwFlags:0x8,mi:{dx:0,dy:0,mouseData:0}});
                            break;
                        case 'middle':
                            winevent.push({type:0,dwFlags:0x20,mi:{dx:0,dy:0,mouseData:0}});
                            break;
                    }
                    break;
                case 'mouse move absolutely':
                    winevent.push({type:0,dwFlags:0x8001,mi:{dx:Math.round(t1.x*0x10000),dy:Math.round(t1.x*0x10000),mouseData:0}});
                    break;
                case 'mouse wheel':
                    winevent.push({type:0,dwFlags:0x0800,mi:{dx:0,dy:0,mouseData:t1.offset}});
                    break;
            }
        }
        await win32helper.defaultInvoker!.SendInput(winevent);
    }
}
