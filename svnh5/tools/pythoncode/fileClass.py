# coding=utf-8

class fileUnit:

    def __init__(self,fileName):
        self.lineIndex = 0
        self.fileName = fileName
        self.readFile()

    def readFile(self):
        text_file = open(self.fileName, "r")
        self.lines = text_file.readlines()
        text_file.close()

    def getLine(self):
        if self.lineIndex < len(self.lines):
            # print (self.lineIndex)
            line = self.lines[self.lineIndex]
            line = line.decode('utf-8')
            self.lineIndex = self.lineIndex + 1
            return line
        else:
            return None
