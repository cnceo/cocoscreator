# coding=utf-8
import time
import os
import tool
import clientXlsxToLua

def update():
    os.chdir("..")
    time1 = time.time()
    if not clientXlsxToLua.clientXlsxToLua():
        return
    tool.updateLanguageConfig()
    print ('time = ',time.time() - time1)

    print (u'更新完成完成！')


update()