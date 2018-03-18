# coding=utf-8

import os,os.path
import re
import tool
# from pyExcelerator import *

def getRows(nrows,saveFileName):
    retStr = saveFileName + ".rows=" + str(nrows)  + "\n\n"
    return retStr


def getCols(ncols,saveFileName):
    retStr = saveFileName + ".cols=" + str(ncols) + "\n\n"
    return retStr

def clearSheetCol(sheet,col):
    for value in sheet.values():
        if len(value) > col:
            del value[col]


def getUsedColsList(sheet,ncols,key_name,segmentList):
    closlist = []
    key_index = 0
    for i in range(0,ncols):
        item =  sheet.cell_value(0,i)
        (usedTag,segmentName,_type) = tool.checkUsedSegment(item)
        if usedTag:
            if len(segmentList) > 0 and (not segmentName in segmentList):
                continue
            closlist.append(i)
            print (len(closlist),i,segmentName,_type)
            if key_name!= None and segmentName != None and key_name == segmentName:
                key_index = len(closlist) - 1

    return closlist,key_index

def getUsedColsListFromList(dataList,ncols,key_name,segmentList):
    closlist = []
    key_index = 0
    print(len(dataList))
    for i in range(0,len(dataList[0])):

        item =  dataList[0][i]
        (usedTag,segmentName,_type) = tool.checkUsedSegment(item)
        if usedTag:
            if len(segmentList) > 0 and (not segmentName in segmentList):
                continue
            closlist.append(i)
            print (len(closlist),i,segmentName,_type)
            if key_name!= None and segmentName != None and key_name == segmentName:
                key_index = len(closlist) - 1

    print(len(closlist),closlist,key_index)
    return closlist,key_index


def getHashList(saveFileName,hashList,key_type):
    retStr = saveFileName + ".m_hashmap={\n"
    hashLen = len(hashList)
    for i in range(0,hashLen):
        if key_type == 1:
            retStr = retStr + "[" + hashList[i] + "]=" +  str(i)   + ",\n"
        else:
            retStr = retStr + '["' + hashList[i] + '"]=' +  str(i)   + ',\n'
    retStr = retStr + "};\n\n"
    return retStr

def checkItemChangeLine(str):
    str = re.sub('\n','\\\n',str)
    return str

def getFileData(sheet,saveFileName):
    retStr = saveFileName + "={\n"

    nrows = sheet.nrows

    (closlit,key_index) = getUsedColsList(sheet,sheet.ncols,None,[])

    key_type = tool.checkSegmentTypeInt(sheet.cell_value(0,closlit[0]))

    hash_list = []
    #获取各行数据
    for i in range(1,nrows):
        retStr = retStr +  "[" + str(i-1) +"]={"
        print ('line: ' + str(i))
        index = 0
        for j in closlit:

            item =  sheet.cell_value(i,j)
            isString = not tool.isNum(item)
            if isString :
                if item == None:
                    item = ''
            else:
                item = str(int(item))

            item = checkItemChangeLine(item)
            if j== 0:
                hash_list.append(item)

            item = "[" + str(index) + "] = '" + item + "',"
            retStr = retStr + item
            index = index + 1

        retStr = retStr + '["m_datalen"]=' + str(len(closlit)) + ","
        retStr = retStr + "},\n"
    retStr = retStr + "};\n\n"

    #获取行数
    retStr = retStr +  getRows(nrows - 1,saveFileName)
    #获取列数
    retStr = retStr + getCols(len(closlit),saveFileName)

    retStr = retStr + getHashList(saveFileName,hash_list,key_type)
    return retStr

def getFileDataFromDataList(dataList,saveFileName,nrows,ncols):
    retStr = saveFileName + "={\n"

    (closlit,key_index) = getUsedColsListFromList(dataList,ncols,None,[])

    key_type = tool.checkSegmentTypeInt(dataList[0][closlit[0]])

    hash_list = []
    #获取各行数据
    for i in range(1,nrows):
        retStr = retStr +  "[" + str(i-1) +"]={"
        print ('line: ' + str(i))
        index = 0
        for j in closlit:

            item =  dataList[i][j]
            isString = not tool.isNum(item)
            if isString :
                if item == None:
                    item = ''
            else:
                item = str(int(item))

            item = checkItemChangeLine(item)
            if j== 0:
                hash_list.append(item)

            item = "[" + str(index) + "] = '" + item + "',"
            retStr = retStr + item
            index = index + 1

        retStr = retStr + '["m_datalen"]=' + str(len(closlit)) + ","
        retStr = retStr + "},\n"
    retStr = retStr + "};\n\n"

    #获取行数
    retStr = retStr +  getRows(nrows - 1,saveFileName)
    #获取列数
    retStr = retStr + getCols(len(closlit),saveFileName)

    retStr = retStr + getHashList(saveFileName,hash_list,key_type)
    return retStr

def saveDicToLua(FileName,contentDic):

    data = ''
    for key in contentDic.keys():
        data =  data + key +  ' = "'
        data = data + contentDic[key] + '"'
        data = data + '\r\n'

    print (FileName)
    f = open(FileName, 'wb')
    f.write(data.encode('utf-8'))
    f.close()



def replaceAndSaveSheet(fileName,sheet,saveDir,replaceClosList  ,replaceDic):

    sheetCfgName = tool.getSLsheetName(sheet.name)
    if sheetCfgName == None:
        return

    (closlit,key_index) = getUsedColsList(sheet,sheet.ncols,None,[])
    if len(closlit) <= 0:
        return
    nrows = sheet.nrows
    ncols = sheet.ncols

    replaceIndexList = tool.getSegmentIndex(sheet,replaceClosList)

    dataList = tool.sheetToList(sheet)
    tool.replaceClos(fileName,sheetCfgName,replaceIndexList, dataList,replaceDic)

    print (u'正在生成  xlsx:',fileName,'  sheetName',sheetCfgName)

    saveFileName = fileName+"_"+sheetCfgName+"_"+"CSVFile"
    saveFileData = ""
    # 读取数据
    saveFileData = saveFileData +  getFileDataFromDataList(dataList,saveFileName,nrows,ncols)

    longName = saveFileName+".lua"
    longName = os.path.join(saveDir,longName)

    print("longName",longName)

    if os.path.exists(longName):
        os.remove(longName)
    f = open(longName, 'wb')
    f.write(saveFileData.encode("utf-8"))
    f.close()

def saveSheet(fileName,sheet,saveDir):
    sheetCfgName = tool.getSLsheetName(sheet.name)
    if sheetCfgName == None:
        return

    (closlit,key_index) = getUsedColsList(sheet,sheet.ncols,None,[])
    if len(closlit) <= 0:
        return
    nrows = sheet.nrows
    ncols = sheet.ncols

    print (u'正在生成  xlsx:',fileName,'  sheetName',sheetCfgName)

    saveFileName = fileName+"_"+sheetCfgName+"_"+"CSVFile"
    saveFileData = ""
    # 读取数据
    saveFileData = saveFileData +  getFileData(sheet,saveFileName)
    # if True:
    #     return
    longName = saveFileName+".lua"
    longName = os.path.join(saveDir,longName)

    if os.path.exists(longName):
        os.remove(longName)
    f = open(longName, 'wb')
    f.write(saveFileData.encode("utf-8"))
    f.close()



def getSheetData(sheet,key_name,segmentList):
    data = {}
    nrows = sheet.nrows

    (closlit,key_index) = getUsedColsList(sheet,sheet.ncols,key_name,segmentList)

    #获取各行数据
    clos = 0
    for i in range(1,nrows):
        row_data = []
        col_index = 0

        for j in closlit:
            item =  sheet.cell_value(i,j)
            isString =  not tool.isNum(item)
            if isString :
                if item == None:
                    item = ""
            else:
                item = str(int(item))

            row_data.insert(col_index,item)
            col_index = col_index + 1

        temp = row_data[0]
        data[(int(temp))] = row_data
        clos = max(clos,col_index)

    return data,key_index,clos



def getSheetDataString(sheet,key_name,segmentList):
    data = {}
    nrows = sheet.nrows

    (closlit,key_index) = getUsedColsList(sheet,sheet.ncols,key_name,segmentList)

    #获取各行数据
    clos = 0
    for i in range(1,nrows):
        row_data = []
        col_index = 0

        for j in closlit:
            item =  sheet.cell_value(i,j)
            isString =  not tool.isNum(item)
            if isString :
                if item == None:
                    item = ""
            else:
                item = str(int(item))

            row_data.insert(col_index,item)
            col_index = col_index + 1

        temp = row_data[0]
        data[temp] = row_data

        clos = max(clos,col_index)

    return data,key_index,clos


def saveSheetDataList(FileName,data,saveDir,clos):
    print (u'正在生成  xlsx:',FileName)

    saveFileName = FileName + "_"+"CSVFile"
    nrows = len(data) - 1

    saveFileData = saveFileName + "={\n"
    hash_list = []
    #获取各行数据

    for i in range(1,len(data)):
        itemStr = ""
        itemStr = itemStr +  "[" + str(len(hash_list)) +"]={"
        print ('line: ' + str(len(hash_list)))
        index = 0

        for item in data[i]:
            isString = not tool.isNum(item)
            if isString :
                if item == None:
                    item = ""
            else:
                item = str(int(item))

            if index == 0:
                hash_list.append(item)

            item = checkItemChangeLine(item)
            itemStr = itemStr + "[" + str(index) + '] = "' + item + '",'
            index = index + 1

        itemStr = itemStr + '["m_datalen"]=' + str(clos) + ","
        itemStr = itemStr + "},\n"
        saveFileData = saveFileData + itemStr

    saveFileData = saveFileData + "};\n\n"

    #获取行数
    saveFileData = saveFileData +  getRows(nrows ,saveFileName)
    #获取列数
    saveFileData = saveFileData + getCols(clos,saveFileName)


    saveFileData = saveFileData + getHashList(saveFileName,hash_list,True)
 

    longName = saveFileName+".lua"
    longName = os.path.join(saveDir,longName)
    print (longName)
    f = open(longName, 'wb')
    f.write(saveFileData.encode("utf-8"))
    f.close()


def saveSheetDataDic(FileName,data,saveDir,clos):
    print (u'正在生成  xlsx:',FileName)

    saveFileName = FileName + "_"+"CSVFile"
    nrows = len(data)

    saveFileData = saveFileName + "={\n"
    hash_list = []
    #获取各行数据

    for key in data.keys():
        itemStr = ""
        itemStr = itemStr +  "[" + str(len(hash_list)) +"]={"
        print ('line: ' + str(key))
        index = 0

        for item in data[key]:
            isString = not tool.isNum(item)
            if isString :
                if item == None:
                    item = ""
            else:
                item = str(int(item))

            if index == 0:
                hash_list.append(item)



            item = checkItemChangeLine(item)
            itemStr = itemStr + "[" + str(index) + '] = "' + item + '",'
            index = index + 1

        itemStr = itemStr + '["m_datalen"]=' + str(clos) + ","
        itemStr = itemStr + "},\n"
        saveFileData = saveFileData + itemStr

    saveFileData = saveFileData + "};\n\n"

    #获取行数
    saveFileData = saveFileData +  getRows(nrows ,saveFileName)
    #获取列数
    saveFileData = saveFileData + getCols(clos,saveFileName)


    saveFileData = saveFileData + getHashList(saveFileName,hash_list,True)


    longName = saveFileName+".lua"
    longName = os.path.join(saveDir,longName)
    print (longName)
    f = open(longName, 'wb')
    f.write(saveFileData.encode("utf-8"))
    f.close()
