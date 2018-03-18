import xxteaModule;
import sys; 
import os;
import os.path;	
from string import *; 
import sys; 
import time;
import json; 
#先判断代码是否混淆了，如果混淆了就运行解混淆
#先判断是否混淆过了 
#秘钥
SL_CODE_KEY ="WeAreTheWorld"; 
SL_CODE_SIGN ="KING";
#读取文件
input=open("../src/main.lua", 'rb');	
data = input.read();
datalen = len(data);	
if datalen>len(SL_CODE_SIGN):
	checksign=data[0:len(SL_CODE_SIGN)];
	if checksign==SL_CODE_SIGN: 
		while(1):
			print (u"代码已经被混淆过了，请解混淆再继续制作更新包");
			print (u"按d键解混淆后继续制作热更新包");
			print (u"按n键退出");
			a = raw_input();
			if a == "d":
				os.system('python demerge.py');
				exit();
			if a=='n':
				exit();
#首先创建热更新管理根目录,不存在就创建
#目录名+_hotupdate就是管理目录了
os.chdir("..")#表示上级目录 
projname=os.getcwd();
flag1=projname.find('\\');
popdir= projname[0:flag1+1];
hotupdatedir = popdir + projname[flag1+1:len(projname)]+"_hotupdate"; 
os.chdir("./")#切换原有目录 
startime=time.time();		
updatekitdir='updatekit';
comkitdir='comkit';
comvdir=hotupdatedir+'\\'+comkitdir;	
hotdir=hotupdatedir+'\\'+updatekitdir;
def _mkdir(dir):
	if(not os.path.exists(dir)):
		os.mkdir(dir);
_mkdir(hotupdatedir);
_mkdir(comvdir);
_mkdir(hotdir); 
fsdzzkithead='fsdzzkit_';
fsdzz='fsdzz_'; 

devvfile='res/versioninfo.json';
 
devsdirarr=['src','res'];
zipfiletype='.zip';
kitarr=[];	
newfilearr=[];
				 
#图片加密秘钥
pickey = "When in the Course of human events, it becomes necessary for one people to dissolve the political bands which have connected them with another, and to assume among the Powers of the earth, the separate and equal station to which the Laws of Nature and of Nature's God entitle them, a decent respect to the opinions of mankind requires that they should declare the causes which impel them to the separation";
luakey = 'nimol_wjsk_wjjh_123456';
luasignment = 'NIMOL';
versionlistname='versionlist.json';
versionlogname="versionlog.txt";
def makeversion(newversion=None): 
	#搜索目录下的代码资源zip文件	 
	versionlist=[];
	for root,dirs,files in os.walk(hotdir):
		for name in files:
			if name.endswith(zipfiletype): 
				tag1=len(fsdzzkithead);	
				tag2=name.find('_',tag1+1);
				tag3=name.find(zipfiletype);
				newvinfo={};
				newvinfo['build']=atoi(name[tag1:tag2]); 
				newvinfo['version']=atoi(name[tag2+1:tag3]); 
				newvinfo['length']=os.path.getsize(root+'/'+name);
				versionlist.append(newvinfo) 
	#开始写入版本信息
	#如果是需要下载完整版本的更新版，那额外直接写入最新的版本号
	if newversion:
		newvinfo={}; 
		newvinfo['build']=newversion['build'];	
		newvinfo['version']=newversion['version']; 
		versionlist.append(newvinfo) 
	jsonstr= json.dumps(versionlist)
	#后面要改成zip了，否则太大了
	versionfile=open(hotupdatedir+'\\'+versionlistname,'wb');
	versionfile.write(jsonstr);
	versionfile.close();
def getVersionInfo(version): 
	tag1=name.find('_');	 
	tag2=name.find('_',tag1+1);
	tag3=name.find(zipfiletype);
	newvinfo={}	
	newvinfo['build']=atoi(name[tag1+1:tag2]);
	newvinfo['version']=atoi(name[tag2+1:tag3]); 
	return newvinfo;

#搜索目录下的代码资源zip文件												 
for root,dirs,files in os.walk(comvdir):
	for name in files:
		if name.endswith(zipfiletype):
			kitarr.append(name);
#选择最新的zip包
maxvint=0;
kitname='';
lastvint=0;
maxversioninfo=None;
for name in kitarr:
	vinfo = getVersionInfo(name);
	vint = vinfo['version']; 
	if vint>maxvint:
		maxversioninfo=vinfo;
		maxvint=vint;
		kitname=name;
if len(kitname)>0:
	#完整的包名
	kitname=comvdir+'/'+kitname; 
	lastvint=maxvint;
#获取现在的开发版的版本号
reloadversion=False; 
jfile=file(devvfile)
jstr = jfile.read()	 
depverinfo = json.loads(jstr)
jfile.close() 
devvint=depverinfo['version'];
if devvint<=lastvint:
	print(u'未发现更高的版本');
	sys.exit();
if maxversioninfo and (depverinfo['build'] > maxversioninfo['build']): 
	#需要重新下载整个包
	reloadversion=True;
#然后开始从开发目录中提取代码和资源
#忽略的文件
ignoretype=['.ccb','.h','.cpp','.c','.proto','.csd','.css','.ccs','.udf','.dll','.lib','.exe'\
,'.bat','.cc','src\\main.lua','src\\gamemgr\\checkversion.lua','res\\cocosstudio\\originalRes\\gamelogo.png','res\\cocosstudio\\originalRes\\img_ty_LOGO.png','res\\cocosstudio\\sheets\\img_ty_kapaibeimian.png'];
#判断是否是忽略文件
def isIgnore(file):
	for t in ignoretype:
		if file.endswith(t):
			return True;
	return False;
#写入zip文件中
import zipfile;
#最新版的备份名
newzipname=comvdir+'/'+fsdzz+'%d'%(depverinfo['build'])+'_'+'%d'%(depverinfo['version'])+'.zip';
#最新版更新包包名
print(u"新的包名是:"+newzipname)
hotziplitname=fsdzzkithead+'%d'%(depverinfo['build'])+'_'+'%d'%(depverinfo['version'])+'.zip';
hotzipname=hotdir+'/'+hotziplitname;
print(u"热更包的名称是:"+hotzipname)
print(u'备份最新版本');
newzip = zipfile.ZipFile(newzipname, 'w');
lastzip=None;
hotzip=None;
print(u'制作最新的更新包');

hotzip = zipfile.ZipFile(hotzipname, 'w',zipfile.ZIP_DEFLATED);
if not reloadversion:
	if lastvint > 0:
		print(u'加载上一次备份的版本' + kitname);		 
		lastzip = zipfile.ZipFile(kitname, 'r'); 
else:
	print(u'当前编译号比上个版本提高了，为全量更新，所以无需比对差异');
def convertdir(name):
	name = list(name);
	namelen = len(name);
	for i in range(0,namelen):
		if name[i]=='\\':
			name[i] = '/';
	name=''.join(name); 
	return name;
def comparetolast(name,data):
	if not lastzip:
		return;	
	olddata=None;	
	for fname in lastzip.namelist():	 
		if len(fname)==len(name):
			name=convertdir(name);
			if name==fname:	
				olddata = lastzip.read(name); 
				break;
	#如果是新文件就写入
	isnewfile=False;
	if not olddata: 
		isnewfile=True;
	elif len(olddata)!=len(data):	
		isnewfile=True;
	else:
		for i in range(0,len(data)):
			if olddata[i]!=data[i]:
				isnewfile=True;
				break;
	if isnewfile:
		newfilearr.append(name);
		print(u'发现了变化或新增的文件:'+name);
		hotzip.writestr(name,data);
def EncriptPic(data): 
	datalen = len(data);
	data = list(data);
	keylen = len(pickey);
	for i in range(0,datalen):
		if i >= keylen:
			break;
		data[i] = chr((ord(data[i])+ord(pickey[i]))&255);
	data=''.join(data);
	data+='NIMOL';
	return data;
def EncriptLua(code):
	encrypt = xxteaModule.encrypt(code,luakey);
	encrypt = luasignment + encrypt;
	return encrypt;
def isPic(fullname):
	#图片不加密
	return False;
#	picends=['.png','.jpg'];
#	for i in range(len(picends)):
#		if fullname.endswith(picends[i]):
#			return True;
#	return False;
print(u'正在扫描资源，请稍等...');
for dir in devsdirarr:
	rdir= dir;
	for root,dirs,files in os.walk(rdir):
		if root.find('.svn') and root.find('_PList.Dir') <0:
			for file in files:
				fullname=os.path.join(root,file);
				headlen=len('../'); 
				if not isIgnore(fullname):
					name=fullname[headlen:len(fullname)];
					#读取文件
					input=open(fullname, 'rb');
					#获取文件大小
					filesize=os.path.getsize(fullname); 
					#这边进行加密
					try:
						data = input.read();
					finally:
						input.close();
						#不加密资源
					newzip.writestr(dir+'\\'+name,data);
					#同时和更新包比较
					comparetolast(dir+'\\'+name,data)
print(u'热更新包制作完成');
newzip.close(); 
hotzip.close();
if lastzip:
	lastzip.close();	
if reloadversion:
	makeversion(depverinfo);
else: 
	makeversion();
usetime=time.time()-startime;	
print(u'总耗时:'+'%d'% usetime+u'秒');
print(u'新增了如下文件');
totalsize='%d'% (os.path.getsize(hotzipname)/1024) +'k';
logfile=open(hotupdatedir+'\\'+versionlogname,"w");
logfile.write("此次更新了如下内容,总大小="+totalsize+"\n");
for name in newfilearr: 
	print(name);
	logfile.write(name+"\n");
logfile.close();
print(u'更新包大小是:'+totalsize);
print(u'打开文件夹'+hotupdatedir+u',再打开目录下的'+updatekitdir);
print(u'将'+updatekitdir+u'文件夹下的'+hotziplitname+u'拷贝到ftp下的');
print(u'完成后再将'+hotupdatedir+u'目录下的'+versionlistname+u'拷贝到ftp下');
os.system("explorer.exe " + hotupdatedir);
os.system("start " + hotupdatedir+'\\'+versionlogname);