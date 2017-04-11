$(function(){                            //页面加载完即执行
    $('.del').click(function(e){          
        var target=$(e.target);
        //HTML标签上添加任意以 "data-*"开头的属性，这些属性页面上是不显示的，
        //它不会影响到你的页面布局和风格，但它却是可读可写的。
        //使用jQuery的.data("*")方法来访问这些"data-*" 属性。
        var id=target.data('id');        
        var tr=$('.item-id-'+id);

        $.ajax({
            type:'DELETE',
            url:'/admin/list?id='+id    //发起一个delete请求 将id作为req.query.id参数传递到服务端
        })
        .done(function(results){        //请求完成拿到返回的res对象作为参数 执行
            console.log(results);
            if(results.success===1){
                if(tr.length>0){
                    tr.remove();         //移除被删除的这一行
                }
            }
        })
    })
})