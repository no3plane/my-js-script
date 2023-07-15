from ProcRow import ProcRow


class Printer:
    def __init__(self, procRow: ProcRow):
        self.procRow = procRow

    def printValue(self):
        cols = self.procRow.getCols()
        procValues = [col.value for col in cols]
        print("\t".join(procValues))

    def printTitle(self):
        cols = self.procRow.getCols()
        procTitles = [infoItem.name for infoItem in cols]
        print("\t".join(procTitles))
