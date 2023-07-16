import time
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
            interval = int(interval)
            return interval
        except ValueError:
            print("请输入一个整数")


def main():
    selectedRow = getSelectedRow()
    interval = getRefreshInterval()

    printer = ConsolePrinter()

    while True:
        printer.print(selectedRow.getCols())
        time.sleep(interval / 1000)
        if selectedRow.isExists() == False:
            print("进程项已不存在")
            return


if __name__ == "__main__":
    main()
