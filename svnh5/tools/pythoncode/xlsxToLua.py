# coding=utf-8
import xlrd
import os,os.path
import saveSheet
import time
import tool
import clientXlsxToLua
import xlslConstReplace


os.chdir("..")#定位根目录
rootDir = os.getcwd()
project_name = tool.getLastPartName(rootDir)


xlsx_config_dir = 'fs_resource'
xlsx_target_path = 'xlsx_files'

commonSavePath = 'lan\\src'

commonTemp = 'common'

xlsx_ext = '.xlsx'
md5_ext = '.md5'
md5_file = 'file.md5'

ignor_file = "lannickname.xlsx"

def getFileData(md5):
    if not os.path.exists(md5):
        print (u'不存在')
        return "{}"
    if not os.path.isfile(md5):
        print (u'不是文件')
        return "{}"

    f = open(md5, 'rb')
    data =  f.read()
    f.close()

    return data

def saveFileDataMd5(md5,dic):
    f = open(md5, 'wb')
    data = str(dic)
    f.write(data.encode('utf-8'))
    f.close()

def copyFile():
    xlsx_source_path = os.path.join(rootDir,"..\\" + xlsx_config_dir)
    if os.path.exists(xlsx_source_path):
        for s in os.listdir(xlsx_source_path):
            temp1 = os.path.join(xlsx_source_path,s)
            if os.path.isdir(temp1) and ("svn" not in s) and ("guoshen" != s):
                temp2 = os.path.join(os.getcwd(),xlsx_target_path + "\\"+ s)
                tool.mkdirs(temp2)
                tool.coverCopyDir(temp1 + "\\xlsx" ,temp2)
    else:
        print(u"未发现数据文件目录")

time1 = time.time()
replaceCfg = tool.getReplaceConfig()
copyFile()



os.chdir(xlsx_target_path)#表示表格目录
xlsx_dir = os.getcwd()
files,childdirs = tool.getFileListandDirs(xlsx_dir)

for cDir in childdirs:
    print(os.getcwd(),cDir)

    os.chdir(cDir)
    newDir = os.path.join(xlsx_dir,cDir)

    fileList = tool.getFileList(newDir,None,[],[ignor_file])
    fileList = tool.checkFileNameInList(fileList)
    fileList = tool.getFileType(fileList,xlsx_ext)

    md5data = getFileData(md5_file)
    md5dic = eval(md5data)

    changeFileList = []
    for item in fileList:
        bk = xlrd.open_workbook(item)
        shortName = tool.getFileNameWithoutExt(item)
        fileMd5 =  tool.getFileMd5Value(item)

        if shortName in md5dic.keys() and  md5dic[shortName] == fileMd5 :
            print (u'文件未改动')
        else:
            print (u'重新生成')
            changeFileList.append(item)

            for sheet in bk.sheets():
                sheetCfgName = tool.getSLsheetName(sheet.name)
                if sheetCfgName == None:
                    continue
                findTag = tool.checkInReplaceCfg(shortName,sheetCfgName,replaceCfg)
                if not findTag:
                    saveDir = os.path.join(rootDir,commonSavePath +'\\'+ cDir + '\\' + commonTemp)
                    tool.mkdirs(saveDir)
                    saveSheet.saveSheet(shortName,sheet,saveDir)
            md5dic[shortName] = fileMd5

    saveFileDataMd5(md5_file,md5dic)
    tool.backToPath(project_name)
    os.chdir(commonSavePath +'\\'+ cDir)
    if len(changeFileList) > 0:
        ret = xlslConstReplace.xlslConstReplace(changeFileList,os.getcwd() ,newDir,replaceCfg)
        if ret <= 0:
            exit()
        for i in range(0,ret,1):
            tool.coverCopyDir(os.getcwd() + '\\' + commonTemp,os.getcwd() + '\\' + str(i+1))
    tool.backToPath(project_name)
    os.chdir(xlsx_target_path)#表示表格目录


tool.backToPath(project_name)
if not clientXlsxToLua.clientXlsxToLua():
    exit()

tool.updateLanguageConfig()

print ('time = ',time.time() - time1)
print (u'转表完成！')


