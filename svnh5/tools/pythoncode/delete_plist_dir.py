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
while(1):
	print (u"****************************操作****************************");
	print u"#请确认关闭了cocostudio以及不要开启plist_dir文件夹，按y继续，n退出";
	a = raw_input();
	if a == "y":
		break;
	if a=='n':
		exit();
import zipfile;
#先制作备份包
os.chdir("..")#表示上级目录 
projdir=os.getcwd();
def delete_file_folder(src):
		if os.path.isfile(src):	
				try:	
						os.remove(src)	
				except:	
						pass 
		elif os.path.isdir(src):	
				for item in os.listdir(src):	
						itemsrc=os.path.join(src,item)	
						delete_file_folder(itemsrc)	
				try:	
						os.rmdir(src)	
				except:	
						pass
for root,dirs,files in os.walk(projdir):
	if root.find('_PList.Dir') !=-1:
		delete_file_folder(root);
		print (u"正在删除"+root);
print(u'删除了所有_PList.Dir后缀的文件夹');

 