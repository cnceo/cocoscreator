# coding=utf-8
import xlrd
import os,os.path
import saveSheet
import time
import tool

 
save_path = ["1\\src","2\\src","3\\src"]
back_path = ["..\\..","..\\..","..\\.."]

sourceFile = "lan"


targetFileName = "lanclient.xlsx"
targetSheetName = "lan_conf"
saveFileName = "localizetxt.lua"


def do():
    time1 = time.time()
    os.chdir(sourceFile)

    dir = os.getcwd()
    path = os.path.join(dir,targetFileName)

    print(path)
    if not os.path.exists(path):
        print(u"not found target file ",path)
        return False

    bk = xlrd.open_workbook(path)
    sheet = tool.getSheetByName(bk,targetSheetName)

    print(sheet,targetSheetName)
    if sheet == None:
        print(u"not found target sheet ",targetSheetName)
        return False
    listofDic = [{},{},{}]

    if not tool.getLanguageDics(sheet,listofDic):
        return False

    for j in range(0,len(listofDic)):
        tool.mkdirs(save_path[j])
        os.chdir(save_path[j])
        saveSheet.saveDicToLua(saveFileName,listofDic[j])
        os.chdir(back_path[j])


    os.chdir("..")
    print ('time = ',time.time() - time1)
    return True

def clientXlsxToLua():
    if do():
        print (u'\n代码配表文本软编码    ...！')
        return True
    else:
        print (u'\n代码配表文本软编码    未完成！')
        return False
