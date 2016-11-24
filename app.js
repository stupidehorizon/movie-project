const path=require('path')
const express=require('express')

const mongoose=require('mongoose')
const Movie=require('./models/movie')

const _=require('underscore')

const port = process.env.PORT||3000
const app=express()

mongoose.connect('mongodb://localhost/movie')

app.set('views','./views')
app.set('view engine','ejs')

// 静态资源请求路径
app.use(express.static(path.join(__dirname,'public')))
app.use(require('body-parser').urlencoded({extended:true})) //表单提交 数据格式化

app.locals.moment=require("moment")

app.listen(port)

console.log('movie started on port' + port)

// index page
app.get('/',(req,res)=>{
    Movie.fetch((err,movies)=>{
      if(err){
        console.log(err);
      }
      res.render('index',{title:'电影-首页',movies:movies});
    })
})

// detail page
app.get('/movie/:id',(req,res)=>{
    let id=req.params.id;

    Movie.findById(id,(err,movie)=>{
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
        res.render('admin',{
          title:'电影后台录入页',
          movie:movie
        })
      })
    }
})

//admin post movie
app.post('/admin/movie/new',(req,res)=>{
  const id=req.body.movie._id;
  const movieObj=req.body.movie;
  var _movie;
  _movie=new Movie({
    director:movieObj.director,
    title:movieObj.title,
    country:movieObj.country,
    language:movieObj.language,
    year:movieObj.year,
    poster:movieObj.poster,
    summary:movieObj.summary,
    flash:movieObj.flash
  })

  _movie.save((err,movie)=>{
    if(err){
        console.log(err)
      }

      res.redirect('/movie/'+movie._id)
  })
})

// list page
app.get('/admin/list',(req,res)=>{
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