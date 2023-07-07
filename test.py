import engine as gb

test_row = gb.row('A',10)

for space in test_row.rowSpaces:
    print(space.coord)