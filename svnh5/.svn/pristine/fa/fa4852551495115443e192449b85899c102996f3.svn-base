# encoding: utf-8
import sys,os
import re
import tool

post = ".lua"


ignor_dir = ["cocos","datatable","ExcelData","MessageFile","protobuf","ResourceHeader"]
ignor_files = [
    "txtRes",
    "localizetxt",

    "userop",
    "checkversion",
    "SLUI",
    "checkversion",
    "checkversion",

]
cut_keywords = [
    "--",
    "bref:",
    "bref  ",
    "@param"
]

ignor_keywords = [
    "cclog",
    "CCLog",
    "CCLOG",
    "print",
    "dump",
    
    "userop.userop",

    "bindTextView",
    "bindBTN",
    "bindImageTouch",
    "bindTab",
    "bindTabEx",
    "bindLayoutTouch",
    "assert",
    "bindBtn",
]


logTxt = []


def checkKeyWordsInLine(line):
    for keyword in ignor_keywords:
        if keyword in line:
            return True
    return False

def CheckChineseInLine(vaildLine,lineIndex):
    if "--" in vaildLine:
        vaildLine = vaildLine.partition("--")[0]
    else:
        vaildLine = vaildLine



    for cut_keyword in cut_keywords:
       if cut_keyword in vaildLine:
            vaildLine = vaildLine.partition(cut_keyword)[0]
       else:
            vaildLine = vaildLine


    if checkKeyWordsInLine(vaildLine):
        return False

    match = tool.findChinese(vaildLine)
    if match:
        return  True
    else:
        return False


def insertFileName(fileName):
    logTxt.append(fileName + "\n")


def checkFileLine(fileName):
    filepath,longFileName = tool.getFilePath(fileName)

    os.chdir(filepath)
    text_file = open(longFileName, "r")
    lines = text_file.readlines()
    text_file.close()
    fileNameTag = False
    lineIndex = 0
    for line in lines:
        lineIndex = lineIndex + 1
        line = line.decode('utf-8')
        if not CheckChineseInLine(line,lineIndex):
            continue

        if fileNameTag == False:
            insertFileName(fileName)
            fileNameTag = True

        line = line.encode('utf-8')
        lineCount = u"   " + str(lineIndex) + u": "
        logTxt.append(lineCount)
        logTxt.append(line)

    if fileNameTag :
        logTxt.append("\n")
    return fileNameTag

os.chdir("..")
rootDir = os.getcwd()
fileList = []
logTxt.append(rootDir + "\n")

fileList = tool.getFileList(rootDir,None,fileList,ignor_dir)
fileList = tool.getFileType(fileList,post)
fileList = tool.getFileExceptBlackList(fileList,ignor_files)
fileList = tool.checkFileNameInList(fileList)
chnFile = 0
for file in fileList:
    if checkFileLine(file):
        chnFile = chnFile + 1

print (u"\n" + str(len(fileList)) + u" files checked, " + str(chnFile) + u" files has chinese character")


openlogTxt=open(os.path.join(rootDir,"FindResults"),'w+')
openlogTxt.writelines(logTxt)

