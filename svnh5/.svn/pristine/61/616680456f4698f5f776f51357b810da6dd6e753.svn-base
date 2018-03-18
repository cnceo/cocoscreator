#解混淆代码
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
#先制作备份包
os.chdir("..")#表示上级目录 
devsdirarr=['src','res'];
import time
zipname='backup_' + time.strftime('%Y%m%d%H%M%S') + '.zip';
 
 
def DecriptPic(data): 
	#先判断是否混淆过了 
	datalen = len(data);
	if datalen>len(SL_CODE_SIGN):
		checksign=data[len(data)-len(SL_CODE_SIGN):len(data)];
		if checksign!=SL_CODE_SIGN:
			return data;#说明未混淆,直接解混淆
	data=data[0:len(data)-len(SL_CODE_SIGN)];
	datalen = len(data);
	data = list(data);
	keylen = len(SL_CODE_KEY);
	for i in range(0,datalen):
		if i >= keylen:
			break;
		data[i] = chr((ord(data[i])-ord(SL_CODE_KEY[i]))&255);
	data=''.join(data);
	return data;
def DecriptLua(data):
	#先判断是否混淆过了
	datalen = len(data);
	if datalen>len(SL_CODE_SIGN):
		checksign=data[0:len(SL_CODE_SIGN)];
		if checksign!=SL_CODE_SIGN:
			return data;#说明混淆过了	
	data=data[len(SL_CODE_SIGN):len(data)];
	data = xxteaModule.decrypt(data,SL_CODE_KEY);
	return data; 
def isPic(fullname):
	picends=['.png','.jpg'];
	for i in range(len(picends)):
		if fullname.endswith(picends[i]):
			return True;
	return False;
filesize=0; 
filecount=0; 
print(u'正在解开混淆，请稍等...');
for dir in devsdirarr:
	rdir= dir;
	for root,dirs,files in os.walk(rdir):
		for file in files:
			fullname=os.path.join(root,file);
			headlen=len('../');	
			name=fullname[headlen:len(fullname)];
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
				#这边进行解混淆			
				if isPic(name):			
					print u'图片:'+name;
					data = DecriptPic(data);				
				if name.endswith('.lua'):
					print u'lua代码:'+name;
					data = DecriptLua(data);
				file = open(fullname, 'wb')	 
				file.write(data);	
				file.close();
print u'文件总数量:'+'%d'%filecount;
print u'文件总大小:'+'%d'%filesize;
print u'完成解混淆'

 