# encoding: utf-8
import sys,os
import re
import tool


target_ext_list = ['.plist','.csb']
result_name = ['plist_result','csb_result']
logTxt = []

plistreg = r'<key>.+?/.+?\..+?</key>'
plistre = re.compile(plistreg)

csbreg = '.+?Path=".+?/.+?\..+?"'
csbre = re.compile(csbreg)

def checkLine(line,filere):
    resultList = re.findall(filere,line)
    if len(resultList) > 0 :
        return False
    return True


def insertFileName(fileName):
    logTxt.append(fileName + "\n")


def checkFileLine(fileName,filere):
    filepath,longFileName = tool.getFilePath(fileName)

    os.chdir(filepath)
    text_file = open(longFileName, "r")
    lines = text_file.readlines()
    text_file.close()
    fileNameTag = False
    lineIndex = 0
    for line in lines:
        lineIndex = lineIndex + 1
        if checkLine(line,filere):
            continue

        if fileNameTag == False:
            insertFileName(fileName)
            fileNameTag = True

        lineCount = u"   " + str(lineIndex) + u": "
        logTxt.append(lineCount)
        logTxt.append(line)

    if fileNameTag :
        logTxt.append("\n")
    return fileNameTag

os.chdir("..")
rootDir = os.getcwd()
fileList = tool.getFileList(rootDir,None,[],[])
re_list = [plistre,csbre]

for i in range(0,len(target_ext_list)):
    print (target_ext_list[i] + u' files checking ... ')
    logTxt = []
    logTxt.append(rootDir + "\n")
    target_file_list = tool.getFileType(fileList,target_ext_list[i])
    target_file_list = tool.checkFileNameInList(target_file_list)
    chnFile = 0
    for file in target_file_list:
        if checkFileLine(file,re_list[i]):
            chnFile = chnFile + 1
    print (u"\n" + str(len(target_file_list)) + u" files checked, " + str(chnFile) + u" files has error \n")

    openlogTxt=open(os.path.join(rootDir,result_name[i]),'w+')
    openlogTxt.writelines(logTxt)





