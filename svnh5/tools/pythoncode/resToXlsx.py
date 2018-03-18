# encoding: utf-8
import sys,os
import re
from pyExcelerator import *

fileNamePost = "txtRes.lua"
saveSheetName = u"本地化语言包配置#language_conf#"
saveFileNamePost = "txtres.xlsx"
lineNames = [u"文本ID#id:none:string",u"中文CN#cn:none:string"]


segreg = r'(\w+?)\s+?=\s+?"(.+?)"'
segre = re.compile(segreg)


def getFileContent(fileName):

    contentDic = {}
    text_file = open(fileName, "r")
    lines = text_file.readlines()
    text_file.close()

    for line in lines:
        line = line.decode('utf-8')

        imglist = re.findall(segre,line)
        if len(imglist) > 0 :
            if contentDic.has_key(imglist[0][0]):
                print ("key error:",imglist[0][0])
            else:
                contentDic[imglist[0][0]] = imglist[0][1]

    return contentDic


def saveDic(rootDir,contentDic,fileName,sheetName,titles):

    absulotalyPath = os.path.join(rootDir,fileName)
    if os.path.exists(absulotalyPath):
        print ("delete",absulotalyPath)
        os.remove(absulotalyPath)


    w = Workbook()     #创建一个工作簿
    ws = w.add_sheet(sheetName)     #创建一个工作表
    for i in range(0,len(titles)):
        ws.write(0,i,titles[i])

    row = 1
    for k in contentDic.keys():
        
        ws.write(row,0,k)
        value = contentDic[k]
        ws.write(row,1,value)
        row = row + 1

    w.save(fileName)     #保存



rootDir = os.getcwd()
filePath = os.path.join(rootDir,fileNamePost)
contentDic = getFileContent(filePath)
saveDic(rootDir,contentDic,saveFileNamePost,saveSheetName,lineNames)
os.system("pause")




