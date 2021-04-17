// gọi express
var express = require('express');
// cấu hình handlebars
var  expressHbs = require('express-handlebars');
// tạo app để cấu hình router , ...
var app = express();
// chạy lên loccal host với port 3000
app.listen(process.env.PORT || '3000');
var  multer = require('multer');
// var mongoose = require('mongoose');
// var  Schema = db.Schema;

// kết nối đến mlab
var urlDB = 'mongodb+srv://admin:<password>@cluster0.jtckl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const mongoose = require('mongoose');
mongoose.connect(urlDB, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log('connected!!!!')
});
var  storage = multer.diskStorage({
    // cb chính kiểm tra file có thể lưu trữ hay không
    // cb được dùng để thay đổi đường dần , thay đổi tên file ,...
    description: function ( req , file , cb ){
        // ta đưa file vào thư mjucj uploads
        cb(null , 'public/data/upload');
    },
    filename: function ( req , file, cb ){
        cb(null, file.originalname);
    }
})
var upload = multer({
    dest: 'public/data/upload',
    storage:storage, limits :{
        fileSize: 1 * 1024 *1024,
    }}).single('avatar');
app.post('/upload',upload,function (req , res){
    console.log(req.file,req.body);
    res.send('oke rồi nhé')
});

app.engine('handlebars',expressHbs({
    layoutsDir: __dirname + '/views/layouts',
    defaultLayout: 'main'

}));
// lưu template vào folder views
app.set('view engine' , 'handlebars');
app.use(express.static('public'));
app.get('/index' , function ( req, res){
    res.render('index')
});
app.get('/', function (req, res){
    res.send('webcome đến với ứng dụng của ninh')
});
// đưa layout vào
app.get('/login', function ( req , res){
   // gọi file login.handlebars trong thư mục view nãy tạo vào
    res.render('login');
});
app.get('/upload', function ( req , res){
    // gọi file login.handlebars trong thư mục view nãy tạo vào
    res.render('upload', {title: 'Express'});
});
app.get('/sigup' , function (reaq , res){
    res.render('sigup');
});
