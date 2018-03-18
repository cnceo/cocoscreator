import sys
import os;
import os.path;	
import json;
import shutil
import tool

#从外面传进来的参数
filename="../res/localsetting.json";
gcfilename="../res/gameconfig.json";  
xlsx_target_path = '../xlsx_files'


lsfile=file(filename);
lsstr=lsfile.read();
localsetting=json.loads(lsstr);
 

files,data_List = tool.getFileListandDirs(os.path.join(os.getcwd(),xlsx_target_path))
data_List = data_List.values()

#先读取版本信息
class Cls:
	def showLocalSetting(self):
		print u"---------------------当前设置是---------------------";
		statearr=[u"关闭",u"开启"];
		print (u"#日志开关:"+statearr[localsetting["log_enable"]]); 

		print (u"#数据目录标签是:"+localsetting["fs_data_tag"]);
		print (u"#开发模式是:"+localsetting["devmode"]);
		print (u"#显示帧率:"+statearr[localsetting["show_fps"]]);
		print (u"#显示公司logo:"+statearr[localsetting["show_logo"]]);
		print (u"#sl绑定标记:"+statearr[localsetting["show_bindtag"]]);
		print u"-------------------------操作-------------------------";
		# print (u"*按下键盘a设置开发模式");
		print (u"*按下键盘b设置其他选项");
		print (u"*按下键盘c设置语言");
		print (u"*按下键盘d设置数据源");
		print (u"*按下键盘k执行配表转lua");
		print (u"*按q退出");
	def showSettingOption(self):
		while(1):
			self.showLocalSetting();
			a = raw_input();
			# if a == "a":
			# 	self.showASettingOption();
			# 	break;
			if a=='b':
				self.showBSettingOption();
				break;
			if a=='c':
				self.showCSettingOption();
				break;
			if a=='d':
				self.showDSettingOption();
				break;
			if a=='k':
				os.system('python ../xlrd/xlsxToLua.py');
				os.system('pause');
				exit();
				break;
			if a=='q':
				exit();
	# def showASetting(self):
	# 	print u"-------------------------开发选项-------------------------";
	# 	i=0;
	# 	for item ,value in game_conf.iteritems():
	# 		print("%d" %(i+1)+":"+value['name']);
	# 		i=i+1;
	# 	print (u"#输入序号设置开发模式");
	# 	print (u"*如无需设置，按q返回上一级菜单");
	def showCSetting(self):
		print u"-------------------------语言选项-------------------------";
		i=1;
		for item in langsetting:
			print("%d" %(i)+":"+item['des']);
			i=i+1;
		print (u"#输入序号设置语言");
		print (u"*如无需设置，按q返回上一级菜单");
	def saveSetting(self):
		data=json.dumps(localsetting, sort_keys=True, indent=4, ensure_ascii=False);
		openlogTxt=open(filename,'w');
		openlogTxt.writelines(data);
	# def showASettingOption(self):
	# 	while(1):
	# 		self.showASetting();
	# 		a=raw_input();
	# 		needbreak=0;
	# 		i=0;
	# 		for item ,value in game_conf.iteritems():
	# 			if a == "%d" %(i+1):
	# 				localsetting["devmode"]=value['name'];
	# 				self.saveSetting();
	# 				self.showSettingOption();
	# 				needbreak=1;
	# 				break;
	# 			i=i+1;
	# 		if needbreak==1:
	# 			break;
	# 		if a=='q':
	# 			self.showSettingOption();
	# 			break;

	def showBSetting(self):
		print u"-------------------------设置选项-------------------------";
		print (u"1.关闭日志");
		print (u"2.开启日志");
		print (u"3.关闭帧率");
		print (u"4.开启帧率");
		print (u"5.关闭绑定标记");
		print (u"6.开启绑定标记");
		print (u"*如无需设置，按q返回上一级菜单");
	def showBSettingOption(self):
		while(1):
			self.showBSetting();
			a=raw_input();
			if a=='1':
				localsetting["log_enable"]=0;
				self.saveSetting();
				self.showSettingOption();
				break;
			if a=='2':
				localsetting["log_enable"]=1;
				self.saveSetting();
				self.showSettingOption();
				break;
			if a=='3':
				localsetting["show_fps"]=0;
				self.saveSetting();
				self.showSettingOption();
				break;
			if a=='4':
				localsetting["show_fps"]=1;
				self.saveSetting();
				self.showSettingOption();
				break;
			if a=='5':
				localsetting["show_bindtag"]=0;
				self.saveSetting();
				self.showSettingOption();
				break;
			if a=='6':
				localsetting["show_bindtag"]=1;
				self.saveSetting();
				self.showSettingOption();
				break;
			if a=='q':
				self.showSettingOption();
				break;

	def showCSettingOption(self):
		while(1):
			self.showCSetting();
			a=raw_input();
			needbreak=0;
			i=1;
			for item in langsetting: 
				if a == "%d" %(i):
					localsetting["lang_id"]=i;
					self.saveSetting();
					self.showSettingOption();
					needbreak=1;
					break;
				i=i+1;
			if needbreak==1:
				break;
			if a=='q':
				self.showSettingOption();
				break;

	def showDSetting(self):
		print u"-------------------------设置数据目录-------------------------";
		for i in xrange(0,len(data_List)):
			print (i+1,data_List[i])
		print (u"*如无需修改，按q返回上一级菜单");

	def showDSettingOption(self):
		
		
		while(1):
			self.showDSetting();
			a=raw_input();
			if a == '1' or a == '2' or a == '3'or a == '4'or a == '5'or a == '6'or a == '7'or a == '8' or a == '9'or a == '10':
				numbera = int(a)
				if numbera > 0 and numbera <= len(data_List):
					localsetting["fs_data_tag"] = data_List[numbera - 1];
					self.saveSetting();
					return

			if a=='q':
				return

if len(sys.argv) < 2:
	print(u'参数数量不足')
	exit(0)
	
cls = Cls();
lanid= sys.argv[1];
localsetting["lang_id"]=lanid;
cls.showDSettingOption()
print(u"准备切换到"+langsetting[lanid]['des']);
os.chdir("..")
import tool
tool.updateLanguageConfig()
print (u"切换完成")
