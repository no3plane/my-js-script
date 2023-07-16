from ProcRow import ProcCol
from datetime import datetime


class ConsolePrinter:
    def __init__(self):
        self.firstPrint = True

    def print(self, cols: list[ProcCol]):
        if self.firstPrint:
            self._printTitle(cols)
            self.firstPrint = False
        self._printValue(cols)

    def _printValue(self, cols: list[ProcCol]):
        timestamp = datetime.now().strftime("%M:%S:%f")[:-3]
        procValues = [timestamp] + [col.value for col in cols]
        print("\t".join(procValues))

    def _printTitle(self, cols: list[ProcCol]):
        procTitles = ["时间戳"] + [infoItem.name for infoItem in cols]
        print("\t".join(procTitles))
