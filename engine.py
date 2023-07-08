import string

NUM_ROWS = 9
NUM_COLS = 10
ROW_SET = string.ascii_uppercase[:NUM_ROWS]

class Space:
    """Model the concept on a single space on the gameboard"""
    def __init__(self,row,col):
        self.row = row
        self.col = col
        self.coord = f'{self.row}{self.col}'
        self.active = False
        
class Row:
    """Model the concept of a row on a the gameboard"""

    def __init__(self,row,numCols):
        self.row = row
        self.numCols = numCols
        self.rowSpaces = []
        self.rowSpaces_pp = []

        for i in range(1,numCols + 1):
            self.rowSpaces.append(Space(row,i))
        
        # Create a pp list for testing
        for i in self.rowSpaces:
            self.rowSpaces_pp.append(i.coord)

class Board:
    """Model the concept of a gameboard"""

    def __init__(self):
        self.gameBoard = []
        
        for letter in ROW_SET:
            self.gameBoard.append(Row(letter,NUM_COLS))
    
    def pretty_print_board(self):
        for row in self.gameBoard:
            print(row.rowSpaces_pp)


    def play_tile(self,letter,number):
        row = ROW_SET.index(letter.upper())
        
        self.gameBoard[row].rowSpaces[number].active = True

        print(f'Updated {self.gameBoard[row].rowSpaces[number].coord} to {self.gameBoard[row].rowSpaces[number].active}')
        
class Hotel:

    def __init__(self, row, col):
        self.row = row
        self.col = col
        self.coord = f'{self.row}{self.col}'

class TileBag:

    def __init__(self):
        self.bag = []
        
        for letter in ROW_SET:
            for number in range(1,NUM_COLS+1):
                self.bag.append(Hotel(letter,number))

    def see_bag(self):
        for t in self.bag:
            print(t.coord)


class HotelChain:
    """Models a hotel chain on the board."""

    def __init__(self) -> None:
        pass
