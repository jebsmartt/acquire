import string, random, pygame

WIDTH, HEIGHT = 1000, 900
NUM_ROWS = 9
NUM_COLS = 10
SQUARE_SIZE = WIDTH // NUM_COLS
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

    # Draw board
    def draw_board(self,window):
        # Fill yellow backgroung
        window.fill((232, 221, 169))
        # Draw grid
        for row in range(NUM_ROWS):
            for col in range(NUM_COLS):
                pygame.draw.rect(
                    window,
                    ((0,0,0)),
                    (col*SQUARE_SIZE, row*SQUARE_SIZE, SQUARE_SIZE, SQUARE_SIZE),
                    width= 4)
    
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

    def draw_tile(self):
        random_index = random.randrange(len(self.bag))
        my_tile = self.bag.pop(random_index)
        print(f"{my_tile.coord}\n")
        TileBag.see_bag(self)

class HotelChain:
    """Models a hotel chain on the board."""

    def __init__(self) -> None:
        pass