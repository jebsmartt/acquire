import pygame
import engine as eng

FPS = 30
window = pygame.display.set_mode((eng.WIDTH, eng.HEIGHT))
pygame.display.set_caption('Aquire')

def main():
    run = True
    clock = pygame.time.Clock()
    board = eng.Board()


    while run:
        clock.tick(FPS)
        
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                run = False

            if event.type == pygame.MOUSEBUTTONDOWN:
                pass
        board.draw_board(window)
        pygame.display.update()

    pygame.quit()
 

main()
