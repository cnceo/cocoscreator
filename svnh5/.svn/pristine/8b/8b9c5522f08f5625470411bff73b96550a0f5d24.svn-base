# coding=utf-8
import re
import os,os.path
import time
import tool
import fileClass


os.chdir("..")#定位根目录
curDir = os.getcwd()
project_name = tool.getLastPartName(curDir)

target_dir = "res"
post = ".csd"
suffix = ["_korea","_fanti"]


dirreg = r'\\(\w)'
dirre = re.compile(dirreg)

rootNodereg ='<ObjectData Name="(.+?)".+?ctype="(.+?)">'
rootNodere = re.compile(rootNodereg)

nodeNamereg = '<AbstractNodeData Name="(.+?)".+?ctype="(.+?)"'
nodeNamere = re.compile(nodeNamereg)

endnodeNamereg = '</AbstractNodeData>'
endnodeNamere = re.compile(endnodeNamereg)


childrenreg = '<Children>'
childrenre = re.compile(childrenreg)


endchildrenreg = '</Children>'
endchildrenre = re.compile(endchildrenreg)



def isChildrenStart(line):
    math = re.findall(childrenre,line)
    return len(math) > 0

def isChildrenEnd(line):
    math = re.findall(endchildrenre,line)
    return len(math) > 0




def checkFileRootNode(line):
    math = re.findall(rootNodere,line)
    if len(math) > 0:
        return math[0][0],math[0][1]
    return None,None


def checkNode(line):
    math = re.findall(nodeNamere,line)
    if len(math) > 0:
        return math[0][0],math[0][1]
    return None,None

def isNodeEnd(line):
    math = re.findall(endnodeNamere,line)
    return len(math) > 0


def getNode(fileUnit):
    # print("enter getNode")
    childTable ={}

    while(True):
        line = fileUnit.getLine()
        if not line :
            break

        # if isChildrenStart(line):
        #     # print("enter children")
        #     childStart = True
        #     continue

        NodeName,nodeType = checkNode(line)
        if NodeName != None :
            # print("enter node")
            ret = getNode(fileUnit)
            node = {}
            node["type"] = nodeType
            node["name"] = NodeName
            node["children"] = ret
            childTable[NodeName] = node


        if isNodeEnd(line):
            # print("find end node" )
            break


    return childTable

def checkFile(fileName):

    fileUnit = fileClass.fileUnit(fileName)

    rootTable = {}
    while(True):
        line = fileUnit.getLine()
        if not line :
            break

        rootNodeName,nodeType = checkFileRootNode(line)
        if rootNodeName != None :
            ret = getNode(fileUnit)
            node = {}
            # print("create rootNode")
            node["type"] = nodeType
            node["name"] = rootNodeName
            node["children"] = ret
            rootTable [rootNodeName] = node
            return rootTable
        else:
            continue

    tool.backToPath(project_name)
    return rootTable

def getFileDicByExt(files):
    fileDic = {}
    for fileName in files:
        (shortname,extension) = os.path.splitext(fileName);
        if extension == post:
            fileDic[shortname] = {}

    return fileDic

def compareFiles(files,curDir):

    files = getFileDicByExt(files)
    for (k,v)  in files.items():
        if k + suffix[0] in files.keys():
            v[suffix[0]] = k + suffix[0]
        if k + suffix[1] in files.keys():
            v[suffix[1]] = k + suffix[1]

    for (k,v)  in files.items():
        if len(v) == 0:
            continue
        k_table = checkFile(k + post)
        for (m,n) in v.items():
            # print(type(n),n)
            compare_table = checkFile(n + post)
            if k_table == compare_table :
                # print(u"对比结果相同")
                pass
            else:
                tool.saveDicToJson(k_table,k)
                tool.saveDicToJson(compare_table,n)
                print(k + post , n + post)
    return

def checkDir(dir):
    files,dirs = tool.getFileListandDirs(dir)
    compareFiles(files,dir)

    for path in dirs:
        os.chdir(path)
        checkDir(os.path.join(dir,path))
        os.chdir("..")

    return True

time1 = time.time()
os.chdir(target_dir)
ret = checkDir(os.getcwd())
print ('time = ',time.time() - time1)
if ret :
    print (u'检查完成！')
else:
    print(u'检查未完成')


