
/** PORT **/
process.env.PORT = process.env.PORT || 3000;

/** PORT **/
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

/** PORT **/
let urlDB = '';
if(process.env.NODE_ENV === 'dev'){
    urlDB = 'mongodb://localhost:27017/cafe';
}else{
    urlDB = 'mongodb+srv://strider:7nhSYUjJr4ewB8Wb@cluster0-stjvq.mongodb.net/cafe';
}

process.env.urlDB = urlDB;
