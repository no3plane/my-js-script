import matplotlib.pyplot as plt
from ProcRow import ProcCol


class GraphPrinter:
    def __init__(self):
        self.colValueHistory: dict[str, list[float]] = {}
        plt.ion()  # 开启交互模式

    def print(self, cols: list[ProcCol]):
        drawableCols = [col for col in cols if self._isDrawable(col)]
        for col in drawableCols:
            self._commitToHistory(col.id, self._formatToFloat(col.value))
        self._draw()

    def _commitToHistory(self, colName: str, newValue: float):
        if colName not in self.colValueHistory:
            self.colValueHistory[colName] = []
        self.colValueHistory[colName].append(newValue)

    def _formatToFloat(self, s: str):
        result = s.split(" ")[0].replace("%", "").replace(",", "")
        return float(result)

    def _isDrawable(self, col: ProcCol):
        return col.id in [
            "TmColCPUPercent",
            "TmColGPUPercent",
            "TmColMemory",
            "TmColDisk",
            "TmColNetwork",
        ]

    def _draw(self):
        plt.clf()
        colCount = len(self.colValueHistory.items())
        for i, colName in enumerate(self.colValueHistory.keys()):
            plt.subplot(colCount, 1, i + 1)
            plt.title(colName)
            plt.plot(self.colValueHistory[colName])
