import time
import sys
from ProcRow import ProcRow
from ConsolePrinter import ConsolePrinter


def getSelectedRow():
    try:
        rows = ProcRow.getProcRows()
    except LookupError as e:
        raise LookupError("找不到任务管理器窗口或进程列表，请确保任务管理器窗口已打开并处于进程页面中。\n" + str(e))

    selected = [row for row in rows if row.isSelected()]
    if len(selected) == 0:
        raise LookupError("未选中任何进程")
    else:
        return selected[0]


def getRefreshInterval():
    while True:
        interval = input("请输入信息刷新间隔（单位ms，缺省值为1000）：") or "1000"
        try:
            return int(interval) / 1000
        except ValueError:
            print("请输入一个整数")


def sleep(interval):
    if "GraphPrinter" in sys.modules:
        import matplotlib.pyplot as plt

        plt.pause(interval)
    else:
        time.sleep(interval)


def main():
    selectedRow = getSelectedRow()
    interval = getRefreshInterval()
    printers = [ConsolePrinter()]

    # 取消注释，可以显示折线图。但渲染折线图性能开销太大，不建议使用。不知道除了matplotlib外，有没有更好的渲染方案。
    # from GraphPrinter import GraphPrinter
    # printers = [GraphPrinter(), ConsolePrinter()]

    while True:
        if selectedRow.isExists() == False:
            print("进程项已不存在")
            return
        cols = selectedRow.getCols()
        for printer in printers:
            printer.print(cols)
        sleep(interval)


if __name__ == "__main__":
    main()
