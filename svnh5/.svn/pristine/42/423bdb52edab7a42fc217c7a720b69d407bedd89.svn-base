#-*- coding:utf-8 -*-
import sys,os
import re
import os.path
rootdir = sys.path[0] 
dragonBone_Dir	= "..\\res\\texturePacker"
spine_Dir	= "..\\res\\spine"

reload(sys)
sys.setdefaultencoding('utf-8')


eventFileName = os.path.join("..\\src\\DataManager","eventFile.lua")

if os.path.exists(eventFileName):
		os.remove(eventFileName)


def GetFileList(dir, fileList,endstring):
		newDir = dir
		if os.path.isfile(dir):
				if dir.endswith(endstring):
						fileList.append(dir.decode('gbk'))
		elif os.path.isdir(dir):	
				for s in os.listdir(dir):
						newDir=os.path.join(dir,s)
						GetFileList(newDir, fileList,endstring)	
		return fileList 

#=====================龙骨解析=========================
#"fi": 26,
def check_fi(line):
		if ('\"fi\":' in line):
				tmp = line.rpartition("\"fi\": ")
				numstring = tmp[2]
				num = numstring.rpartition(",")
				return num[0]
		else:
				return None	 

def check_evt(line):
		if ('\"evt\":' in line):
				tmp = line.rpartition("\"evt\": ")
				string = tmp[2].rpartition("\"")
				return string[0]+string[1]
		else:
				return None 

def check_animName(line):
		if ('\"name\":' in line):
				tmp = line.rpartition("\"name\": ")
				string = tmp[2].rpartition(",")
				return string[0]
		else:
				return None 

def check_mov_bone_data(line):
		if ('\"mov_bone_data\"' in line):
				return True
		else:
				return False 

def getAnimNameFromAbsolutePath(absolutePath,endstring):
		tmp = absolutePath.rpartition("\\")
		pngNameTemp = tmp[2].rpartition(endstring)
		return pngNameTemp[0]
 
def jsonFileHaveEvt(fileName):
		lines=open(fileName,'r').readlines()
		for line in lines:
				if check_evt(line):
						return True
		return False

def delWithJsonFile(fileName,recode_file):
		fiNum = -1
		boneAnimName = None
		animName = getAnimNameFromAbsolutePath(fileName,".ExportJson")
		recode_file.write("		[\""+animName+"\"] = {\n")
		lines=open(fileName,'r').readlines()
		for line in lines:
				tempAnimName = check_animName(line)
				if tempAnimName:
						boneAnimName = tempAnimName
				elif check_mov_bone_data(line):
						if fiNum!=-1:
								recode_file.write("				},\n")
						recode_file.write("				["+boneAnimName+"] = {\n")
				num = check_fi(line)
				if not num==None:
						fiNum = num
				else:
						evtName = check_evt(line)
						if not evtName==None and	fiNum >= 0:
								recode_file.write("						{"+evtName + ", "+str(int(round(int(fiNum)*1.25)))+"},\n")
		recode_file.write("				},\n")
		recode_file.write("		},\n")
		
#=====================spine解析=========================
def check_evt_spine(line):
		if ('\"events\": [' in line):
				return True
		else:
				return False 

def check_evt_end_spine(line):
		if (']' in line):
				return True
		else:
				return False 

# { "time": 0.8, "name": "attack_target" },
# ["attack_target"] = 33,
def check_evt_Info_spine(line):
		if ('{ \"time\":' in line) and ('\"name\":' in line):
				result = re.search(r"\"time\": (.*), \"name\": (\".*\")",line)
				return "						{"+result.group(2)+", "+str(int(round(float(result.group(1))*30.0)))+"},\n"
		else:
				return None 

def jsonFileHaveEvtSpine(fileName):
		lines=open(fileName,'r').readlines()
		for line in lines:
				if check_evt_spine(line):
						return True
		return False

def check_begin_animations(line):
		if ('\"animations\"' in line):
				return True
		else:
				return False 

def check_slotsString(line):
		if ('\"slots\": {' in line):
				return True
		else:
				return False 
 

def isHaveAnimationName(line):
		result = re.search(r"(\".*\"): \{",line)
		if result:
				return result.group(1)
		else:
				return None


def delWithJsonFileSpine(fileName,recode_file):
		boneAnimName = None
		begin_animations = False
		begin_event = False
		begin_animData = False
		animName = getAnimNameFromAbsolutePath(fileName,".json")
		recode_file.write("		[\""+animName+"\"] = {\n")
		lines=open(fileName,'r').readlines()
		for line in lines:
				if not begin_animations:
						if check_begin_animations(line):
								begin_animations=True
				else:
						if not begin_animData:
								boneAnimName = isHaveAnimationName(line)
								if boneAnimName:
										begin_animData = True
										recode_file.write("				["+boneAnimName+"] = {\n")
						else:
								if begin_event:
										if check_evt_end_spine(line):
												begin_event = False
												begin_animData = False
												recode_file.write("				},\n")
										else:
												evt_Info = check_evt_Info_spine(line)
												if evt_Info:
														recode_file.write(evt_Info)
								else:
										if check_evt_spine(line):
												begin_event = True
		recode_file.write("		},\n")

				
		
#===================================开始调用=========================
#遍历当前路径下所有lua文件
print rootdir

recode_file = open(eventFileName, "w")
recode_file.write("EventData = {\n")
print "==============龙骨===================="
list = GetFileList(dragonBone_Dir, [],".ExportJson")
for fileName in list: 
		print fileName
		if jsonFileHaveEvt(fileName):
				delWithJsonFile(fileName,recode_file)

print "===============spine==================="
spinelist = GetFileList(spine_Dir, [],".json")
for fileName in spinelist: 
		print fileName
		if jsonFileHaveEvtSpine(fileName):
				delWithJsonFileSpine(fileName,recode_file)

recode_file.write("}")
recode_file.close()
		
