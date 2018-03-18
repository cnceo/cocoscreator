#秘钥
SL_CODE_KEY ="WeAreTheWorld"; 
SL_CODE_SIGN ="KING";
import sys; 
import os;
import os.path;	
from string import *; 
import sys; 
import time;
import json; 
import urllib;
import tool;
import xlrd;
#先读取本地化配置文件
os.chdir("..")#表示上级目录 
filename="res/localsetting.json";
lfile=file(filename);
lstr = lfile.read();	 
localsetting = json.loads(lstr);
#数据包的版本号 
datapackversion=2;


 



def saveSetting():
	data=json.dumps(localsetting,sort_keys=True, indent=4, ensure_ascii=False);
	openlogTxt=open(filename,'w');
	openlogTxt.writelines(data);


import zipfile;
#先制作备份包

f=urllib.urlopen("http://192.168.1.254:1997/pythonclient?opid=getcfg");
totalConf=json.loads(f.read()); 
dirdic=totalConf["dir_conf"];

import time;
#忽略的文件
ignoretype=['.ccb','.h','.cpp','.c','.csd','.ccs','.udf','.proto','.dll','.lib','.exe'\
,'.bat','.cc'];
#判断是否是忽略文件
def isPicEncripted(data):
	#先判断是否混淆过了 
	datalen = len(data);
	if datalen>len(SL_CODE_SIGN):
		checksign=data[len(data)-len(SL_CODE_SIGN):len(data)];
		if checksign==SL_CODE_SIGN:
			return True;
	return False;
def isIgnore(file):
	for t in ignoretype:
		if file.endswith(t):
			return True;
	return False;
def isPic(fullname):
	picends=['.png','.jpg'];
	for i in range(len(picends)):
		if fullname.endswith(picends[i]):
			return True;
	return False;
filesize=0; 
filecount=0; 
for item in dirdic:
	print(u"目录名是:"+item);
def isDataPacketRes(fullname):
	for item in dirdic:
		finaldir=item.replace("/","\\");
		lastpos=fullname.rindex("\\");
		curdir=fullname[0:lastpos];
		if curdir==finaldir:
			return True;
	return False;
def createDataPacket():
	print(u'正在提取数据包');
	zipname="gamedatapacket_%d.zip" % (datapackversion);
	newzip = zipfile.ZipFile(zipname, 'w');
	dir="res";
	for root,dirs,files in os.walk("res"):
		if root.find('.svn') and root.find('_PList.Dir') <0:
			for file in files:
				fullname=os.path.join(root,file);
				if isDataPacketRes(fullname):
					isDataPacketRes(fullname);
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
					if isPic(name):
						if not isPicEncripted(data):
							print(u"资源未混淆");
							exit();
					newzip.writestr(dir+'\\'+name,data);
	newzip.close(); 
	#获取zip大小并写入到localsetting中
	print(u"生成数据包:"+zipname);
	zipsize=os.path.getsize(zipname);
	print(u"大小是:"+"%0.3fM"%(float(zipsize)/1024/1024));
	print(u"将大小写入loacalsetting datapack.length中");
	localsetting['datapack']['length']=zipsize;
	localsetting['datapack']['version']=datapackversion;
	saveSetting();
def clearData():
	print(u'正在移除res中数据包部分的内容');
	for root,dirs,files in os.walk("res"):
		if root.find('.svn') and root.find('_PList.Dir') <0:
			for file in files:
				fullname=os.path.join(root,file);
				if isDataPacketRes(fullname):
					os.remove(fullname);
	print(u"制作完成");
while(1):
	print(u"请输入密码");
	a = raw_input();
	if a == "123":
		break;
while(1):
	print (u"****************************操作****************************");
	print(u"a.为谷歌平台打包准备,去除数据包部分的内容,并制作数据包");
	print(u"b.只是制作数据包,注意需要易混淆的资源,这个工具不会再做一次混淆");
	print(u"按下a键或b键来选择操作选项");
	a = raw_input();
	if a == "a":
		createDataPacket();
		clearData();
		break;
	if a=='b':
		createDataPacket();
		break;
 