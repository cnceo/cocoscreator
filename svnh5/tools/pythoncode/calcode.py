#统计代码数量
import sys; 
import os;
import os.path;	
from string import *; 
import sys; 
import time;
import json; 

 
import zipfile;

filecount=0;

devdir='..'; 
devsdirarr=['src'];
filesize=0;
index = 0;
wdir="";
datalen=0;
import shutil
#忽略的目录
ignoretype=['cocos','MessageFile','protobuf','datatable']
def isIgnore(file):
	for t in ignoretype:
		dirname="src/"+t+"/";
		dirlen=len(dirname);
		if file.endswith(t):
			return True;
	return False; 
for dir in devsdirarr:
	rdir=devdir+'/'+dir;
	index=index+1;
	for root,dirs,files in os.walk(rdir):
		if root.find('.svn')<0:
			wroot=wdir+root[len(rdir):len(root)];
			for file in files:
				fullname=os.path.join(root,file);
				headlen=len(devdir+'/'); 
				name=fullname[headlen:len(fullname)];
				print name
				if name.endswith('.lua'):	
					#读取文件
					input=open(fullname, 'rb');
					datalen=datalen+len(input.readlines());
					input.close();
print "codelines:"
print datalen;
print filesize;
print "complete"


 