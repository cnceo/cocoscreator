
import time;
import urllib2;
import datetime;
import os;
# coding=utf-8
import os,os.path;
from biplist import *;
import time;
import tool;
import xlsdic;
import sys;
import re;
reload(sys);
sys.setdefaultencoding( "utf-8" );
import json;
import urllib2;
import tool;
import updateproject;
os.chdir("..");#表示上级目录
import urllib;
f=urllib.urlopen("http://192.168.1.254:1997/pythonclient?opid=getcfg");
totalConf=json.loads(f.read()); 

ip_conf=totalConf["ip_conf"];
cutline="--------------------------------------------------\n";
keytag="LUA错误:\n";
 
ignore_conf=totalConf["ignore_conf"];
logt={};
ignoresarr=[];
for k,v in ignore_conf.iteritems():
	print(v['ignore_str'])
	ignoresarr.append(v['ignore_str']);
class Cls:
	def inputTime(self):
		while(1):
			print(u"------------------请输入时间-----------------");
			print(u"输入日志起始时间，比如起始时间是2016年9月4日5时，就输入2016-9-4-5"); 
			a=raw_input();
			d=(datetime.datetime.strptime(a,'%Y-%m-%d-%H'));
			iStartTime=int(time.mktime(d.timetuple()));
			iEndTime=int(time.time()); 
			perhour=60*60;
			print(ip_conf['cn_inner_logview']['value']);
			self.calLog(iStartTime,iEndTime,perhour,ip_conf['cn_inner_logview']['value']);
			self.calLog(iStartTime,iEndTime,perhour,ip_conf['cn_outer_logview']['value']);
			break;
	def calLog(self,iStartTime,iEndTime,perhour,urllog):
		for i in range(iStartTime,iEndTime,perhour):
			#将秒转换成时间
			str=time.strftime("%Y-%m-%d_%H", time.localtime(float(i)));
			str=str[2:len(str)];
			url =urllog + str + '.log';
			print(url)
			data = urllib2.urlopen(url);
			if data:
				logstr=data.read();
				isIgnore=False;
				for item in ignoresarr:
					if logstr.find(item)!=-1:
						isIgnore=True;
						break;
				if isIgnore:
					#如果是过滤日志，就不解析
					continue;
				print(u"正在分析"+url+u"错误日志");
				if len(logstr) > 200:
					f = open("out.txt","w");
					logstr = logstr.replace("<br>","");
					f.write(logstr);
					f.close(); 
					#开始分析
					#首先寻找块
					linearr=[];
					iserror=False;
					keystr="缺失日志";
					outfilename="out.txt";
					file = open(outfilename);
					while 1:
						lines = file.readlines(100000)
						if not lines:
							break;
						for line in lines:
							linearr.append(line); 
							if iserror: 
								keystr=line;
								iserror=False;
							else:	
								if line == keytag:	 
									iserror=True; 
								if line== cutline: 
									#分隔符
									#遇到分隔符就开始
									logt[keystr] = {};
									logt[keystr]['url']=url;
									logt[keystr]['content']="";
									for i in range(0,len(linearr)):
										logt[keystr]['content']=logt[keystr]['content'] + linearr[i];	
									linearr=[];
					file.close();
					os.remove(outfilename);
cls = Cls();
cls.inputTime();
total=0;
file=open("log.txt","w");
for key,value in logt.iteritems():
	lstr="问题=\n" + key+"地址\n"+value['url']+"\n" + "描述=\n" + value['content']; 
	file.write(lstr); 
	total=total+1;
file.close();
print(u"bug总数是:"+'%d'%total);
print(u"请使用nodepad++打开统计文件log.txt");