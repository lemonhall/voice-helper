			var get_time=function(date_time){
				//豆瓣的默认时区是东八区，那么  2012-8-25 10:36的文章
				//如果我在东七区，那么应该显示，2012-8-25 9:36才是正确的
				//1、得到所谓的豆瓣时间。2、将豆瓣时间换算成UTC时间
				//3、
				var d = new Date(date_time);
				var my_d=new Date();
				var offset = -1*(my_d.getTimezoneOffset()/60);
				var localtime = d.getTime();
				//这里的豆瓣时间的offset是一个固定值，-480不用再取
				var localoffset = -480 * 60000;
				var utc = localtime + localoffset;
				var bombay = utc + (3600000*offset);
				var nd = new Date(bombay);
				var newString=nd.toLocaleDateString()+" "+nd.toLocaleTimeString();

				return newString;

			},
			init_timezone=function(){
				$(".created_at").each(function(){
					var date_time=$(this).attr("title");
					var obj_human_date_time=$(this).find("a");
					var new_date_time=get_time(date_time);
					obj_human_date_time.html(new_date_time);
				});
			};