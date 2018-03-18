# encoding: utf-8
import os
import re
import tool

post = ".csd"
check_post = ".lua"

TextNodereg ='<AbstractNodeData Name="(.+?)".+?ctype="TextObjectData">'
TextNodere = re.compile(TextNodereg)

symbol1reg = "'(.+?)'"
symbol1re = re.compile(symbol1reg)


symbol2reg = '"(.+?)"'
symbol2re = re.compile(symbol2reg)

os.chdir("..")
rootDir = os.getcwd()
project_name = tool.getLastPartName(rootDir)

def CheckTextObject(vaildLine):
    math = re.findall(TextNodere,vaildLine)
    if len(math) > 0:
        return True,math[0]
    return False,None


def checkFileLine(fileName,usedTextDic):
    filepath,longFileName = tool.getFilePath(fileName)

    os.chdir(filepath)
    text_file = open(longFileName, "r")
    lines = text_file.readlines()
    text_file.close()

    lineIndex = 0
    for line in lines:
        lineIndex = lineIndex + 1
        line = line.decode('utf-8')
        isUsed,textName = CheckTextObject(line)
        if isUsed != True:
            continue
        if textName in usedTextDic.keys():
            nodeDic = usedTextDic[textName]
            if longFileName not in nodeDic.keys():
                nodeDic[longFileName] = 1
        else:
            nodeDic ={}
            nodeDic[longFileName] = 1
            usedTextDic[textName] = nodeDic



def getTextDicList():
    usedTextDic = {}
    fileList = []
    fileList = tool.getFileList(rootDir,None,fileList,[])
    fileList = tool.getFileType(fileList,post)
    fileList = tool.getFileExceptBlackList(fileList,[])
    fileList = tool.checkFileNameInList(fileList)
    for file in fileList:
        checkFileLine(file,usedTextDic)
    return usedTextDic


def CheckLuaLine(vaildLine,usedTextDic):
    math = re.findall(symbol1re,vaildLine)
    if len(math) > 0:
        for item in math:
            matchCHN = tool.findChinese(item)
            if matchCHN:
                continue
            else:
                usedTextDic[item] = 1
    math = re.findall(symbol2re,vaildLine)
    if len(math) > 0:
        for item in math:
            matchCHN = tool.findChinese(item)
            if matchCHN:
                continue
            else:
                usedTextDic[item] = 1


def checkLuaFileLine(fileName,usedTextDic):
    filepath,longFileName = tool.getFilePath(fileName)

    os.chdir(filepath)
    text_file = open(longFileName, "r")
    lines = text_file.readlines()
    text_file.close()

    for line in lines:
        line = line.decode('utf-8')
        CheckLuaLine(line,usedTextDic)



def getTextLuaUsed():
    usedTextDic = {}

    fileList = []
    fileList = tool.getFileList(rootDir,None,fileList,[])
    fileList = tool.getFileType(fileList,check_post)
    fileList = tool.getFileExceptBlackList(fileList,[])
    fileList = tool.checkFileNameInList(fileList)

    for file in fileList:
        checkLuaFileLine(file,usedTextDic)

    return usedTextDic

def compareDic(usedTextDic,LuaUsedTextDic):
    retDic = {}
    for key,item in usedTextDic.items():
        if key not in LuaUsedTextDic.keys():
            retDic[key] = item
    return retDic

usedTextDic = getTextDicList()
LuaUsedTextDic = getTextLuaUsed()
retDic = compareDic(usedTextDic,LuaUsedTextDic)

tool.backToPath(project_name)
tool.saveDicToJson(retDic,"unBindingText.txt")
print(len(retDic))


