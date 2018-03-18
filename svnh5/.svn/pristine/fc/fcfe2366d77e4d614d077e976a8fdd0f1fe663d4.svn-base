import os
import re

findReg = ["^URL: (.+)","^Revision: (.+)"]
findKey = ["URL","Revision"]


def svnInfo():
    cmd = 'svn info'
    return os.popen(cmd).read()

def logChangeFile(logTxt):
    retInfo = {}
    strList = logTxt.split('\n')
    for line in strList:
        for i in xrange(0,len(findReg)):
            segre = re.compile(findReg[i])
            imglist = re.findall(segre,line)
            if len(imglist) >0 :
                retInfo[findKey[i]] = imglist[0]
                break
    return retInfo
def getSvnInfo():
    changeFile = svnInfo()
    return logChangeFile(changeFile)


# changeFile = svnInfo()
# print(logChangeFile(changeFile))
# raw_input()


