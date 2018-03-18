#混淆代码
#秘钥
SL_CODE_KEY ="WeAreTheWorld"; 
SL_CODE_SIGN ="KING";

import xxteaModule;
import sys; 
import os;
import os.path;	
from string import *; 
import sys; 
import time;
import json; 
#先读取版本信息
vfile=file("../res/versioninfo.json");
vstr=vfile.read();
versioninfo=json.loads(vstr);
print u"xxxxxxxxxxxxxxxxxxxxx当前版本号信息xxxxxxxxxxxxxxxxxxxxx";
print u"#版本号是:"+'%d' %versioninfo['version'];
print u"#编译号是:"+'%d' %versioninfo['build'];
print u"#svn版本是:"+'%d' %versioninfo['svn'];
print u"#配表版本是:"+'%d' %versioninfo['data'];
print u"#版本目标是:"+versioninfo['content'];
print u"请仔细检查版本号是否上提了,并且是否在执行此次混淆前做了热更新版本制作";
print u"!!!一定要未混淆版本才能制作热更新版本";
#先读取本地化配置文件
filename="../res/localsetting.json";
lfile=file(filename);
lstr = lfile.read();	 
localsetting = json.loads(lstr);

logstatearr=[u"关闭",u"开启"];

 

def saveSetting():
	data=json.dumps(localsetting);
	openlogTxt=open(filename,'w');
	openlogTxt.writelines(data);


print(u"xxxxxxxxxxxxxxxxxxxxxx当前版本配置xxxxxxxxxxxxxxxxxxxxxx"); 
print(u"#开发模式是:"+localsetting["devmode"]);

print(u"#日志开关状态是:"+logstatearr[localsetting["log_enable"]]);
print(u"xxxxxxxxxxxxxxxxxxxxxxxx温馨提示xxxxxxxxxxxxxxxxxxxxxxxx");
print(u"#如果不是内网测试,开发模式不能是dev");
print(u"#你当前的开发模式指向的服务器配置是否是正确的配置,请检查fsdzzsettings.json");
while(1):
	print (u"****************************操作****************************");
	if localsetting["log_enable"]==1:
		print(u"#开启日志会造成一定的性能损耗,请慎重考虑");
		print(u"#按c键关闭日志");
		print(u"请确认以上信息,再按y继续,n取消并退出,按h键制作热更新包");
	a = raw_input();
	if a == "y":
		break;
	if a=='n':
		exit();
	if a == "c":
		localsetting["log_enable"]=0;
		saveSetting();
		print (u"日志已关闭");
	if a=='h':
		os.system('python start.py');
		exit();
import zipfile;
#先制作备份包
os.chdir("..")#表示上级目录 
devsdirarr=['src','res'];
import time;
print(u'开始混淆并去除禁止发布到玩家手中的文件');
#忽略的文件
ignoretype=['.ccb','.h','.cpp','.c','.csd','.ccs','.udf','.proto','.dll','.lib','.exe'\
,'.bat','.cc'];
#判断是否是忽略文件
def EncriptPic(data):
	#先判断是否混淆过了 
	datalen = len(data);
	if datalen>len(SL_CODE_SIGN):
		checksign=data[len(data)-len(SL_CODE_SIGN):len(data)];
		if checksign==SL_CODE_SIGN:
			return data;#说明混淆过了
	data = list(data);
	keylen = len(SL_CODE_KEY);
	for i in range(0,datalen):
		if i >= keylen:
			break;
		data[i] = chr((ord(data[i])+ord(SL_CODE_KEY[i]))&255);
	data=''.join(data);
	data+=SL_CODE_SIGN;
	return data;
def isIgnore(file):
	for t in ignoretype:
		if file.endswith(t):
			return True;
	return False; 
def EncriptLua(data):
	#先判断是否混淆过了
	datalen = len(data);	
	if datalen>len(SL_CODE_SIGN):
		checksign=data[0:len(SL_CODE_SIGN)];
		if checksign==SL_CODE_SIGN:
			return data;#说明混淆过了	
	data = xxteaModule.encrypt(data,SL_CODE_KEY);
	data = SL_CODE_SIGN + data;
	return data; 
def isPic(fullname):
#	picends=['.png','.jpg'];
#	for i in range(len(picends)):
#		if fullname.endswith(picends[i]):
#			return True;
	return False;
filesize=0; 
filecount=0; 
print(u'正在混淆资源，请稍等...');
for dir in devsdirarr:
	rdir= dir;
	for root,dirs,files in os.walk(rdir):
		if root.find('.svn') and root.find('_PList.Dir') <0:
			for file in files:
				fullname=os.path.join(root,file);
				headlen=len('../');	
				name=fullname[headlen:len(fullname)];
				if not isIgnore(name):
					#统计文件个数
					filecount=filecount+1;
					#获取文件大小
					filesize=filesize+os.path.getsize(fullname);
					if isPic(name) or name.endswith('.lua'):
						#读取文件
						input=open(fullname, 'rb');
						try:
							data = input.read();
						finally:
							input.close();
						#这边进行加密
						if isPic(name):	
							print u'图片:'+name;
							data = EncriptPic(data);
						if name.endswith('.lua'):
							print u'lua代码:'+name;
							data = EncriptLua(data);
						file = open(fullname, 'wb')
						file.write(data);
						file.close();
				else:
					os.remove(fullname);
		else:
			for file in files:
				fullname=os.path.join(root,file);
				os.remove(fullname);
print u'文件总数量:'+'%d'%filecount;
print u'文件总大小:'+'%d'%filesize;
print u'完成混淆'
zipname='packforios_' + time.strftime('%Y%m%d%H%M') + '.zip';
newzip = zipfile.ZipFile(zipname, 'w');
print(u'正在打包res和src给mac下打包ios用，请稍等...');
for dir in devsdirarr:
	rdir= dir;
	for root,dirs,files in os.walk(rdir):
		if root.find('.svn') and root.find('_PList.Dir') <0:
			for file in files:
				fullname=os.path.join(root,file);
				headlen=len('../');	
				name=fullname[headlen:len(fullname)];
				#读取文件
				input=open(fullname, 'rb');
				#获取文件大小
				filesize=os.path.getsize(fullname);	
				try:
					data = input.read();
				finally:
					input.close();
				#不加密资源
				newzip.writestr(dir+'\\'+name,data);
newzip.close();
print(u'ios资源包打包完成');

 