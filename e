body{
    width: 100%;
    height: 100%;
    margin: 0px;
    padding: 0px;
    overflow: hidden;
    font-size: 16px;
    background-color: transparent;
    position: absolute;
    -webkit-touch-callout:none;
    -webkit-user-select:none;
}
#ganyiji{
	background-color: #ffffff;
	display:-webkit-box;
	-webkit-box-orient: vertical;
	width:100%;
	height: 100%;
	/* background-image: url('img/beijing.jpg'); */
	/* background-size: 100%; */
	/* background-repeat: no-repeat; */
	/* background-position-y: -20px; */
	z-index: 999;
}

#beijing_test{
   background-image: url('img/beijing.jpg');
   background-size: 100%;
   background-repeat: no-repeat;
   background-position: 143px 0px;
   z-index: 1;
   position: absolute;
   width: 100%;
   height: 100%;
   display: none;
}

#statusBar{
	background-color: transparent;
	height: 20px;
	width: 100%;
	-webkit-box-align: center;
	display: none;
}

#container{
	-webkit-box-flex:1;
	width: 100%;
	-webkit-box-align: center;
	display: -webkit-box;
	-webkit-box-orient: vertical;

}

#title{
	height: 3rem;
	width: 100%;
	display: -webkit-box;
	-webkit-box-orient: horizontal;
	background-color: #36404a;
	display: none;
}

#content{
	-webkit-box-flex:1;
	width: 100%;
	/* background-image:






	-webkit-linear-gradient(135deg,#ffffff,#214474); */
	display:





	-webkit-box;
	-webkit-box-orient: vertical;
	background-color: #20282e;
	float: l;
}

#footer{
	height: 3.125rem;
	width: 100%;
	/* position: fixed; */
	bottom: 0;
	background-color: #2a343c;
	/* opacity: 0.7; */
	/* background-color: rgba(255,255,255,0.2); */
}

#title_btn{
	width: 4.25rem;
	/* margin-left: 12px; */
	background-image: url('img/back.png');
	height: 3.25rem;
	background-repeat: no-repeat;
	background-size: 100%;
	background-position-x: -20px;
	margin-left: 0.75rem;
	/* background-color: red; */
}

#title_info span{
	MARGIN-TOP: 1.375rem;
	FLOAT: LEFT;
	font-family: Microsoft YaHei;
}

#title_name{
	-webkit-box-pack: center;
	-webkit-box-align: center;
	display:-webkit-box;
	-webkit-box-flex: 1;
	color:#ffffff;
	font-size: 20px;
	font-family: 微软雅黑;
	text-align: center;
	margin-left: -2.3125rem;
}

#title_info{
	width: auto;
	color:#ffffff;
	margin-right: 0.75rem;
}

#functionsPage{
	-webkit-box-flex: 1;
	/* float: left; */
	/* display: none; */
}

.footItem{
	width: 25%;
	height: 100%;
	float: left;
}

#appointment{
	/* position: relative; */
	margin-left: 1.5625rem;
	margin-top: 1.5625rem;
	width: 1.5625rem;
	height: 1.5625rem;
	background-image: url('img/appiont.png');
	background-size: 100%;
	z-index: 100;
	position: relative;
}

#first_line{
	width: 100%;
	height: 64px;
	transition: rot;
	transform: rotate(39deg);
	margin-left: 40px;
}

.fc_type{
	width: 5.625rem;
	height: 5.625rem;
	/* margin-right: 30px; */
	/* border: 1px solid #ffffff; */
	/* background: #2ab0de; */
	border-radius: 1.3125rem;
	text-align: center;
	background-size: 100%;*/;
}

.fc_type_first{
	margin-left: 81px;
}

#functions_item{

width: auto;

height: auto;

float: left;

position: relative;

margin-top: -1.375rem;

z-index: 0;

/* display: none; */
}
.fc_one{
    margin-left: 7.25rem;
    float: left;
    background-image: url('img/shirt.png');
    background-size: 100%;
    background-repeat: no-repeat;
    /* background-position: -15px -14px; */
}

.fc_one_focus{
	background-image: url('img/shirt_focus.png');
}

#fc_tandt{
	float:left;
	width: 100%;
}

.fc_two{
	float: left;
	margin-left: 2.3rem;
	background-image: url('img/socks.png');
	/* background-size: 150%; */
	background-repeat: no-repeat;
	/* background-position: -15px -14px; */
}

.fc_two_focus{
	background-image: url('img/socks_focus.png');
}


.fc_three{
	float: left;
	margin-left: 4.3125rem;
	background-image: url('img/underclothes.png');
	/* background-size: 150%; */
	background-repeat: no-repeat;
	/* background-position: -15px -14px; */
}

.fc_three_focus{
	background-image: url('img/underclothes_focus.png');
}

.fc_four{
	float: left;
	margin-left: 7.25rem;
	background-image: url('img/others.png');
	/* background-size: 150%; */
	background-repeat: no-repeat;
	/* background-position: -15px -14px; */
}

.fc_four_focus{
	background-image: url('img/others_focus.png');
}

#action_control{
	float: left;
	width: 100%;
	height: 5rem;
	margin-top: 2.5rem;
}

.control_item{
	float: left;
	height: 100%;
}

#fenggan{
	width: 1.875rem;
	margin-left: 0.9375rem;
}

#btn_control{
	width: 10.75rem;
	margin-left: 0.9375rem;
	background: #757c7f;
	border-radius: 2.375rem;
}

#jiare{
	width: 1.875rem;
	margin-left: 1.875rem;
}

#statusPage{
	-webkit-box-flex: 1;
	background: #1e292e;
	display: none;
}

#bigTime{
	color: #ffffff;
	float: left;
	width: auto;
	height: auto;
	font-size: 3.5rem;
	font-family: STXiHei;
}

#appiontTime{
	color: #c7ced3;
	float: left;
	font-size: 1rem;
	font-family: YouYuan;
}

#lastTime{
	color: #353d43;
	float: left;
	font-size: 1rem;
	margin-top: 0.4rem;
}

#status_time{
	margin-top: 3.125rem;
	height: auto;
	float: left;
	width: 100%;
}

#frontTime{
width: 4.75rem;
height: auto;
float: left;
margin-left: 1.875rem;
font-size: 1.125rem;
margin-top: 0.875rem;
font-family: YouYuan;
}

#canvas_dian{
	float: left;
	width: 100%;
	height: 10rem;
	/* margin-top: 13px; */
}

#cvs{/* width: 100%; *//* height: 10rem; */
position: absolute;/* margin-top: 10px; */}

#current_dian{
color: #ffffff;
position: absolute;top: 13.625rem;left: 7.75rem;font-size: 3.5rem;font-family: STXiHei;}

#dian_below{
top: 17.5rem;
left: 8.5rem;
color: #a6abac;
position: absolute;
font-family: 楷体;
font-family: YouYuan;
}

.danwei{
	position: absolute;
	top: 15.5rem;
	left: 13rem;
	color: #a6abac;
	font-family: YouYuan;
}

#ganyi_img{
    background-image: url('img/ganyi_focus.png');
}

#status_img{
    background-image: url('img/zhuangtai.png');
    background-size: 60%;
    background-position: 1rem -0.5rem;
}

div#status_img {}

#interaction_img{
    background-image: url('img/hudong.png');
    background-size: 44%;
    background-position: 1.4375rem -0.5rem;
}

div#interaction_img {}

#market_img{
    background-image: url('img/shangcheng.png');
    background-size: 49%;
    background-position: 1.25rem -0.5rem;
}

.footItemImg{
	width: 100%;
	height: 52%;
	background-size: 73%;
	background-repeat: no-repeat;
	background-position: 0.875rem -0.5rem;
}

.footItemText{
	text-align: center;
	color: #ffffff;
	font-family: Microsoft YaHei;
	font-size: 14px;
}

#title_name span{
/* margin-top: 31px; */
float: d;position: relative;top: 0.3125rem;font-family: Microsoft YaHei;}

#startOrPause{
	position: absolute;
	width: 4.5rem;
	height: 4.5rem;
	/* background-color: #2bb3e0; */
	border-radius: 2.5rem;
	margin-top: 0.25rem;
	margin-left: 0.25rem;
	transition-duration: 0.3s;
	background-image: url('img/ganyi_start.png');
	background-size: 100%;
}

#fenggan_img{
	width: 100%;
	height: 1.3125rem;
	background-image: url('img/fenggan.png');
	background-size: 100%;
	margin-top: 1.125rem;
}

#fenggan_text{
	width: 200%;
	margin-top: 0.625rem;
	color: #ffffff;
	font-family: YouYuan;
}

#jiare_img{
float: left;
width: 28px;
height: 28px;
/* background: red; */width: 1.875rem;height: 1.3125rem;
background-image: url('img/refeng.png');background-size: 100%;margin-top: 1.125rem;}

#jiare_text{
float: left;
width: 200%;margin-top: 0.625rem;
color: #ffffff;font-family: YouYuan;}

#charts_container{
float: left;
width: 100%;
/* height: 122px; */
margin-top: 48px;
}

#appionmentPage{

-webkit-box-flex: 1;

display: none;
}

#appiontmentClock{

float: left;

margin-top: 1.75rem;

width: 1.5625rem;

height: 1.5625rem;

margin-left: 2rem;

background-image: url('img/clock.png');

background-size: 100%;
}


#time_kedu{

float: left;

width: 75%;

margin-top: 7.6875rem;

height: 15.3125rem;

position: relative;

top: -25.5rem;

/* background: rgba(255,255,255,0.2); */

left: 2.25rem;

/* display: none; */

color: #ffffff;

font-family: YouYuan;
}

#canvas_kedu{
	/* width: 245px; */
	/* height: 600px; */
	/* float: left; */
	/* width: 1000px; */
	margin-top: 2rem;
	/* height: 100%; */
	/* position: absolute; */
	/* background: red; */
}

#start{
  width: 0.125rem;
  height: 12.0625rem;
  position: absolute;
  left: 7.625rem;
  top: 1.5625rem;
  transform: rotate(0deg);
  z-index: 10;
}

#end{
z-index: 100;
width: 0.125rem;
height: 12.0625rem;
position: absolute;
left: 7.625rem;
top: 1.5625rem;
transform: rotate(90deg);
z-index: 10;
}


#time_kedu2{

float: left;

width: 160px;

margin-top: 611px;

height: 160px;

position: absolute;

top: -401px;

background: rgba(255,255,25,0.2);

left: 23%;

border-radius: 122px;

display: none;
}

#start_jiao{
width: 3.375rem;
height: 2.125rem;
position: absolute;
left: -1.3125rem;
background-image: url('img/start_jiao.png');
background-size: 39%;
background-repeat: no-repeat;
/* background-color: red; */
background-position-x: 0.86rem;
z-index: 100;
}

#end_jiao{
	width: 44px;
	height: 45px;
	position: absolute;
	left: 172px;
	background-image: url('img/end_jiao.png');
	background-size: 46%;
	/* top: -22px; */
	background-repeat: no-repeat;
	/* background-color: red; */
	/* background-position-y: 13px; */
	width: 3.375rem;
	height: 2.125rem;
	position: absolute;
	left: -1.3125rem;
	background-image: url('img/start_jiao.png');
	background-size: 39%;
	background-repeat: no-repeat;
	/* background-color: red; */
	background-position-x: 0.86rem;
	z-index: 100;
}

#appionment_start_time{
width: 5rem;
position: absolute;
top: 4rem;
left: 5.5rem;
}

#appionment_end_time{
width: 5rem;
position: absolute;
top: 8.125rem;
left: 5.5625rem;
}

#appionment_start{
font-size: 1rem;
text-align: center;
letter-spacing: 0.25rem;
}

#appionment_start_num{
font-size: 1.75rem;
font-family: STXiHei;
margin-top: 0.125rem;
}

#appionment_end{
text-align: center;
letter-spacing: 0.25rem;
}

#appionment_end_num{
font-size: 1.75rem;
font-family: STXiHei;
}
