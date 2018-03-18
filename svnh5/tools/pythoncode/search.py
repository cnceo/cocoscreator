# coding=utf-8
import os,os.path,sys

os.chdir("..")#表示上级目录
target_dir=['src','res','frameworks'];
fileList=[]
count=0
i=0

print u"请输入需要搜索的文件后缀："
file_input=raw_input()

for curDir in target_dir:
    for root,dirs,files in os.walk(curDir):
        for f in files:
            if os.path.splitext(f)[1]==file_input:
                count=count+1
                fileroot=os.path.join(root,f)
                fileList.append(fileroot)
                print fileroot

print u"个数：",count
if count>0:
    print u"如需要删除，输入密码并按y："

    while(1):
        serct_input=raw_input()
        if serct_input=='f':
            while(1):
                confi_input=raw_input()
                if confi_input=='y':
                    while i<len(fileList):
                        os.remove(fileList[i])
                        i=i+1
                    exit()
                elif confi_input=='n':
                    exit(0)
                else:
                    print u"请按y进行确认"

        elif serct_input=='n':
            exit()
        else:
            print u"密码错误，请重新输入："
