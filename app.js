const path=require('path')                               //路径处理相关
const express=require('express')
//mongoose.Promise = require('bluebird');

const mongoose=require('mongoose')
const Movie=require('./models/movie')

const _=require('underscore')                           //验证两个对象是否相等

const port = process.env.PORT||3000
const app=express()

 mongoose.Promise = global.Promise

mongoose.connect('mongodb://localhost/movie')           //数据库连接 默认端口 数据库为movie

app.set('views','./views')
app.set('view engine','ejs')


app.use(express.static(path.join(__dirname,'public')))      // 静态资源请求路径
//app.use(express.static(__dirname + '/public'))             等价于上一条语句
app.use(require('body-parser').urlencoded({extended:true})) //表单提交 数据格式化

app.locals.moment=require("moment")                           //格式化日期

app.listen(port)

console.log('movie started on port' + port)

// index page
app.get('/',(req,res)=>{                                        //es6语法
    Movie.fetch((err,movies)=>{            //整个函数都是fetch的参数（回调函数）
      if(err){ 
        console.log(err);
      }
      res.render('index',{title:'电影-首页',movies:movies});
    })
})

// detail page
app.get('/movie/:id',(req,res)=>{
    let id=req.params.id;      //通过req.params.id来拿到id参数

    Movie.findById(id,(err,movie)=>{
      if(err)
        console.log(err)
      res.render('detail',{title:'详情'+movie.title,movie:movie});
    })
})

// admin page
app.get('/admin/movie',(req,res)=>{
    res.render('admin',{
        title:'movie 后台录入页',
        movie:{
          director:'',
          country:'',
          title:'',
          year:'',
          poster:'',
          language:'',
          flash:'',
          summary:''
        }
    })
})

//admin update movie
app.get('/admin/update/:id',(req,res)=>{
    const id=req.params.id

    if(id){
      Movie.findById(id,(err,movie)=>{
        if(err){
          console.log(err)
        }
        res.render('admin',{
          title:'电影后台录入页',
          movie:movie
        })
        Movie.remove({_id:id},function(err){
          if(err)
            console.log(err)
        })
      })
    }
})

//admin post movie
app.post('/admin/movie/new',(req,res)=>{
  const id=req.body.movie._id;
  const movieObj=req.body.movie;
  var _movie;
  _movie=new Movie({                     //实例化        
    director:movieObj.director,
    title:movieObj.title,
    country:movieObj.country,
    language:movieObj.language,
    year:movieObj.year,
    poster:movieObj.poster,
    summary:movieObj.summary,
    flash:movieObj.flash
  })

  _movie.save((err,movie)=>{              //实例化后可以储存
    if(err){
        console.log(err)
      }

      res.redirect('/movie/'+movie._id)   //储存后跳转到所储存的电影详情页面
  })
})

// list page
app.get('/admin/list',(req,res)=>{        //详情页
    Movie.fetch((err,movies)=>{
      if(err){
        console.log(err);
      }
      res.render('list',{title:'电影-列表页',movies:movies});
    })
})

//list delete movie
app.delete('/admin/list',(req,res)=>{
  const id=req.query.id

  if(id){
    Movie.remove({_id:id},function(err,movie){
      if(err){
        console.log(err)
      }
      else{
        res.json({success:1})
      }
    })
  }
})