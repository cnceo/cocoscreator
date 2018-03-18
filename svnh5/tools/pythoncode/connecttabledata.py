# coding=utf-8
import xlrd
import os,os.path
import saveSheet
import tool

sourceFileList = [["jineng"],["monster","jineng","jineng","jineng"],["monster"]]
sourceSheetName = [["mian_conf","skill_common_conf"],["main_conf","mian_conf","skill_common_conf","status_conf"],["main_conf","comm_conf"],]
keyValueName = [["skill_common_id","id"],[],["comm_id","id"]]

showSegments = [["id","skills_1_id","skills_2_id","skills_3_id","skills_4_id","general_attack_id"],
                ["id","skill_common_id"],
                ["id","state_1_id","state_2_id","bullet_id","attack_effect_id","hurt_effect_id"],
                ["id","state_effect_id"]]

def GetFileNameWithoutExt(filename):
    (filepath,tempfilename) = os.path.split(filename);
    (shortname,extension) = os.path.splitext(tempfilename);
    return shortname


def CheckHasFileInList(changeFileList,checkFileList):
    for item in changeFileList:
        shortName = GetFileNameWithoutExt(item)
        if shortName in checkFileList:
            (filepath,tempfilename) = os.path.split(item);
            return True,filepath

    return False ,None

def ConnectDic(sourceDic,source_index,targetDic,allowNotFound,defaultList):
    for k,v in sourceDic.items():
        target_index = int( v[source_index])
        if target_index in targetDic.keys():
            v.extend(targetDic[target_index])
        else:
            if target_index != 0:
                print(v[source_index],target_index,v)
            print ('not fond data :' + str(target_index))

            if not allowNotFound :
                return k
            else:
                v.extend(defaultList)
    return 0

def ConnectListandDic(sourcelist,source_index,targetDic,allowNotFound,defaultList):
    for i in range(1,len(sourcelist)):
        v = sourcelist[i]
        target_index = int( v[source_index])
        if target_index in targetDic.keys():
            v.extend(targetDic[target_index])
        else:
            if target_index != 0:
                print(v[source_index],target_index,v)
            print ('not fond data :' + str(target_index))

            if not allowNotFound :
                return i
            else:
                v.extend(defaultList)
    return 0



def ConnectListandList(sourcelist,source_index,targetDic,valueDataList,allowNotFound,defaultList):
    print("len ",len(targetDic),len(valueDataList))
    for i in range(1,len(sourcelist)):
        v = sourcelist[i]
        target_index = int( v[source_index])
        if target_index in targetDic.keys():
            index = list(targetDic.keys()).index(target_index)
            v.extend(valueDataList[index + 1])
        else:
            print ('not fond data :' + str(target_index))

            if not allowNotFound :
                return i
            else:
                v.extend(defaultList)
    return 0


def ConnectP1(filePath,saveDir,replaceCfg,replaceDic):
    fileFullPath = os.path.join(filePath,sourceFileList[0][0] + ".xlsx")
    if not os.path.exists(fileFullPath):
        return False
    sourcebk = xlrd.open_workbook(fileFullPath)

    keySheet = tool.getSheetBySheetCfgName(sourcebk,sourceSheetName[0][0])
    (keySheetData,source_index,source_clos) = saveSheet.getSheetData(keySheet,keyValueName[0][0],[])
    dataList = tool.sheetToList(keySheet)

    findTag = tool.checkInReplaceCfg(sourceFileList[0][0],sourceSheetName[0][0],replaceCfg)
    replaceClosList = []
    if findTag:
        sheetsInfo = replaceCfg[sourceFileList[0][0]]
        for sheet in sheetsInfo:
            if sheet[0] == sourceSheetName[0][0]:
                replaceClosList = sheet[1]
                break
    # 获取替换字段索引
    replaceIndexList = tool.getSegmentIndex(keySheet,replaceClosList)
    # 替换表格字段
    tool.replaceClos(sourceFileList[0][0],sourceSheetName[0][0],replaceIndexList, dataList,replaceDic)

    # 去除无用字段
    dataList =  tool.ListEceptInvalid(keySheet,dataList)


    valueSheet = tool.getSheetBySheetCfgName(sourcebk,sourceSheetName[0][1])
    (valueSheetData,target_index,target_clos) = saveSheet.getSheetData(valueSheet,keyValueName[0][1],[])

    result = ConnectListandDic(dataList,source_index,valueSheetData,False,[])

    if result != 0:
        print ("not found key " + str(result) + " in source sheet")
        return False

    fileName = sourceFileList[0][0] + "_" + sourceSheetName[0][0] + "_" + sourceSheetName[0][1]
    print ('saveFile  ' + fileName)
    saveSheet.saveSheetDataList(fileName,dataList,saveDir,source_clos + target_clos)
    return True

def ConnectP2(filePath,saveDir):

    fileFullPath = os.path.join(filePath,sourceFileList[1][3] + ".xlsx")
    if not os.path.exists(fileFullPath):
        return False
    sourcebk = xlrd.open_workbook(fileFullPath)

    stateSheet = tool.getSheetBySheetCfgName(sourcebk,sourceSheetName[1][3])
    (stateSheetData,source_index,state_clos) = saveSheet.getSheetData(stateSheet,showSegments[3][0],showSegments[3])
    saveSheet.clearSheetCol(stateSheetData,0)
    state_clos = state_clos - 1

    commonjinengSheet = tool.getSheetBySheetCfgName(sourcebk,sourceSheetName[1][2])
    (commonjinengSheetData,source_index,common_jineng_clos) = saveSheet.getSheetData(commonjinengSheet,showSegments[2][0],showSegments[2])
    saveSheet.clearSheetCol(commonjinengSheetData,0)
    common_jineng_clos = common_jineng_clos - 1

    for i in [0,1]:
        ConnectDic(commonjinengSheetData,i,stateSheetData,False,[])
        common_jineng_clos = common_jineng_clos + state_clos


    for i in [1,0]:
        saveSheet.clearSheetCol(commonjinengSheetData,i)
        common_jineng_clos = common_jineng_clos - 1

    jinengSheet = tool.getSheetBySheetCfgName(sourcebk,sourceSheetName[1][1])
    (jinengSheetData,source_index,jineng_clos) = saveSheet.getSheetData(jinengSheet,showSegments[1][0],showSegments[1])
    saveSheet.clearSheetCol(jinengSheetData,0)
    jineng_clos = jineng_clos - 1

    ConnectDic(jinengSheetData,0,commonjinengSheetData,False,[])
    jineng_clos = jineng_clos + common_jineng_clos
    saveSheet.clearSheetCol(jinengSheetData,0)
    jineng_clos = jineng_clos - 1


    fileFullPath = os.path.join(filePath,sourceFileList[1][0] + ".xlsx")
    if not os.path.exists(fileFullPath):
        return False
    sourcebk = xlrd.open_workbook(fileFullPath)
    cardSheet = tool.getSheetBySheetCfgName(sourcebk,sourceSheetName[1][0])
    (cardSheetData,source_index,card_clos) = saveSheet.getSheetData(cardSheet,showSegments[0][0],showSegments[0])

    for i in [1,2,3,4,5]:
        ConnectDic(cardSheetData,i,jinengSheetData,True,["0","0","0","0","0"])
        card_clos = card_clos + jineng_clos

    for i in [5,4,3,2,1]:
        saveSheet.clearSheetCol(cardSheetData,i)
        card_clos = card_clos - 1

    fileName = sourceFileList[1][0] + "_" + sourceSheetName[1][0] + "_" + sourceFileList[1][1] + "_" + sourceSheetName[1][1] +  "_" + sourceFileList[1][2] + "_" + sourceSheetName[1][2] +  "_" + sourceFileList[1][3] + "_" + sourceSheetName[1][3]
    print ('saveFile  ' + fileName)
    saveSheet.saveSheetDataDic(fileName,cardSheetData,saveDir,card_clos)

    return True


def formatSheettoList(keySheet,replaceCfg,replaceDic,fileName,sheetName):
    dataList = tool.sheetToList(keySheet)
    findTag = tool.checkInReplaceCfg(fileName,sheetName,replaceCfg)
    replaceClosList = []
    if findTag:
        sheetsInfo = replaceCfg[fileName]
        for sheet in sheetsInfo:
            if sheet[0] == sheetName:
                replaceClosList = sheet[1]
                break
    # 获取替换字段索引
    replaceIndexList = tool.getSegmentIndex(keySheet,replaceClosList)
    # 替换表格字段
    tool.replaceClos(fileName,sheetName,replaceIndexList, dataList,replaceDic)
    # 去除无用字段
    dataList =  tool.ListEceptInvalid(keySheet,dataList)

    return dataList

def ConnectP3(filePath,saveDir,replaceCfg,replaceDic):
    fileFullPath = os.path.join(filePath,sourceFileList[2][0] + ".xlsx")
    if not os.path.exists(fileFullPath):
        return False
    sourcebk = xlrd.open_workbook(fileFullPath)

    keySheet = tool.getSheetBySheetCfgName(sourcebk,sourceSheetName[2][0])
    (keySheetData,source_index,source_clos) = saveSheet.getSheetData(keySheet,keyValueName[2][0],[])
    dataList = formatSheettoList(keySheet,replaceCfg,replaceDic,sourceFileList[2][0],sourceSheetName[2][0])

    valueSheet = tool.getSheetBySheetCfgName(sourcebk,sourceSheetName[2][1])
    (valueSheetData,target_index,target_clos) = saveSheet.getSheetData(valueSheet,keyValueName[2][1],[])
    valueDataList = formatSheettoList(valueSheet,replaceCfg,replaceDic,sourceFileList[2][0],sourceSheetName[2][1])


    result = ConnectListandList(dataList,source_index,valueSheetData,valueDataList,False,[])

    if result != 0:
        print ("not found key " + str(result) + " in source sheet")
        return False

    fileName = sourceFileList[2][0] + "_" + sourceSheetName[2][0] + "_" + sourceSheetName[2][1]
    print ('saveFile  ' + fileName)
    saveSheet.saveSheetDataList(fileName,dataList,saveDir,source_clos + target_clos)
    return True



def DealXlsxConnect(changeFileList,saveDir,replaceCfg,replaceDic):
    if len(changeFileList) <= 0:
        return False
    #
    (isInlist ,filePath) = CheckHasFileInList(changeFileList,sourceFileList[0])
    if  isInlist :
        print (u'连接表格1')
        result = ConnectP1(filePath,saveDir,replaceCfg,replaceDic)
        if result:
            print (u'连接表格1 ...')
        else:
            print (u'连接表格 1失败')
            return False
    #
    (isInlist ,filePath) = CheckHasFileInList(changeFileList,sourceFileList[1])
    if  isInlist :
        print (u'连接表格2')
        ConnectP2(filePath,saveDir)
        print (u'连接表格2 ...')

    (isInlist ,filePath) = CheckHasFileInList(changeFileList,sourceFileList[2])
    if  isInlist :
        print (u'连接表格3')
        result = ConnectP3(filePath,saveDir,replaceCfg,replaceDic)
        if result:
            print (u'连接表格3 ...')
        else:
            print (u'连接表格 3失败')
            return False

    return True



