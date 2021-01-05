export const unsignText = (text) => {
    let str = text;
    if(str){
        str = str.toLowerCase();
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"); 
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"); 
        str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i"); 
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"); 
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"); 
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"); 
        str = str.replace(/đ/g,"d");
        str = str.replace(/ + /g," ");
        str = str.trim(); 
    }
    return str;
    
};

export const alphabet = (arr, type, props) => {
    let array = []
    if(arr && arr.length > 0){
        if(type === 0){
            array = arr.sort((a,b)=>  typeof a[`${props}`] === "string"  && typeof b[`${props}`] === "string" && (unsignText(a[`${props}`]).toUpperCase() < unsignText(b[`${props}`]).toUpperCase()? -1:0));
        }
        if(type === 1){
            array =  arr.sort((a,b)=>  typeof a[`${props}`] === "string"  && typeof b[`${props}`] === "string" && ( unsignText(a[`${props}`]).toUpperCase() > unsignText(b[`${props}`]).toUpperCase()? -1:0));
        }
        
    }
    return array
   
   
    
}