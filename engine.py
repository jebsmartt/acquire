import string

class space:
    """Model the concept on a single space on the gameboard"""
    def __init__(self,row,col):
        self.row = row
        self.col = col
        self.coord = f'{self.row}{self.col}'

    def giveCoord(self):
        return self.coord
        
class row:
    """Model the concept of a row on a the gameboard"""

    def __init__(self,row,numCols):
        self.row = row
        self.numCols = numCols
        self.rowSpaces = []

        for i in range(1,numCols + 1):
            self.rowSpaces.append(space(row,i))


