# coding=utf-8
import xlrd
import os,os.path
import saveSheet
import time
import tool
import connecttabledata
 
save_path = ["1","2","3"]
back_path = ["..","..",".."]

targetFileName = "lannickname.xlsx"


def replaceDic(dic,fileList,source):
    saveDir = os.getcwd()
    for item in fileList:
        bk = xlrd.open_workbook(item)
        shortName = tool.getFileNameWithoutExt(item)
        sheetsInfo = source[shortName]

        for sheetInfo in sheetsInfo:
            sheet = tool.getSheetBySheetCfgName(bk,sheetInfo[0])
            saveSheet.replaceAndSaveSheet(shortName,sheet,saveDir,sheetInfo[1],dic)
    return True



def do(changeFileList,saveDir,dataDir,replaceCfg):

    # time1 = time.time()
    path = os.path.join(saveDir, dataDir + "\\" + targetFileName)

    print(",saveDir,dataDir",saveDir,dataDir)
    if not os.path.exists(path):
        print("file not exit ",path)
        return 0

    if replaceCfg == None :
        print(u"配置为空")
        return 0

    bk = xlrd.open_workbook(path)
    listofDic = [{},{},{}]
    for sheet in bk.sheets():
        tool.getLanguageDics(sheet,listofDic)

    fileList = tool.getFilesInList(changeFileList,replaceCfg.keys())

    for j in range(0,len(listofDic)):

        tool.mkdirs(save_path[j])
        os.chdir(save_path[j])

        # # 配表文本替换
        ret = replaceDic(listofDic[j],fileList,replaceCfg)
        if not ret:
            print(u"配表替换错误")
            return 0

        # 配表文本连接表格替换
        ret = connecttabledata.DealXlsxConnect(changeFileList,"",replaceCfg,listofDic[j])
        if not ret:
            print(u"配表连接 替换错误")
            return 0

        os.chdir(back_path[j])

    return len(listofDic)

def xlslConstReplace(changeFileList,saveDir,dataDir,replaceCfg):
    ret = do(changeFileList,saveDir,dataDir,replaceCfg)
    if ret > 0:
        print (u'\n表格配置语言 替换 ...！')
        return ret
    else:
        print (u'\n表格配置语言 替换 未完成！')
        return 0
