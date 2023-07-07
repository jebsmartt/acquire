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
        self.rowSpaces_pp = []

        for i in range(1,numCols + 1):
            self.rowSpaces.append(space(row,i))
        
        # Create a pp list for testing
        for i in self.rowSpaces:
            self.rowSpaces_pp.append(i.coord)

class board:
    """Model the concept of a gameboard"""

    def __init__(self):
        self.numRows = 9
        self.numCols = 10
        self.gameBoard = []
        row_set = string.ascii_uppercase[:self.numRows]

        for letter in row_set:
            self.gameBoard.append(row(letter,self.numCols))

    def pretty_print_board(self):
        for row in self.gameBoard:
            print(row.rowSpaces_pp)
