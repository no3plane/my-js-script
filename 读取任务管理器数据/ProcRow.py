import uiautomation as ui
from uiautomation import TreeItemControl, EditControl


class ProcRow:
    def __init__(self, row: TreeItemControl):
        self._rawRow = row
        self._rawColContainer = self._rawRow.PaneControl(
            searchDepth=1, Automation="TmViewRow"
        )

    @staticmethod
    def getProcRows():
        rawProcRow = []
        procTable = (
            ui.WindowControl(searchDepth=1, ClassName="TaskManagerWindow")
            .PaneControl(searchDepth=1, Name="TaskManagerMain")
            .DataGridControl(searchDepth=4, AutomationId="ScrollViewer")
        )
        for child in procTable.GetChildren():
            if child.ControlTypeName == "GroupControl":
                rawProcRow += [
                    treeItem
                    for treeItem in child.GetChildren()
                    if treeItem.ControlTypeName == "TreeItemControl"
                ]
            elif child.ControlTypeName == "TreeItemControl":
                rawProcRow.append(child)
        return [ProcRow(row) for row in rawProcRow]

    def getCols(self):
        rawCols: list[EditControl] = [
            child
            for child in self._rawColContainer.GetChildren()
            if child.ControlTypeName == "EditControl"
        ]
        return [
            ProcCol(rawCol.Name, rawCol.AutomationId, rawCol.GetValuePattern().Value)
            for rawCol in rawCols
        ]

    def isExists(self):
        return self._rawRow.Exists()

    def getName(self):
        return self.getCols()[0].value

    def isSelected(self) -> bool:
        return self._rawRow.GetSelectionItemPattern().IsSelected


class ProcCol:
    def __init__(self, name: str, id: str, value: str):
        self.name = name
        self.id = id
        self.value = value
